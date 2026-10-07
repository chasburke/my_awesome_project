const test = require("node:test");
const assert = require("node:assert/strict");
const M = require("../../web/members.js");

const SAMPLE =
  "﻿id,first_name,last_name,email,gender,ip_address\r\n" +
  "1,Ada,Lovelace,ada@Example.com,Female,10.0.0.1\r\n" +
  '2,"Turing, Alan","O""Brien",alan@example.org,Male,10.0.0.2\r\n' +
  '3,Grace,"Hop\nper",grace@example.com,Female,10.0.0.3\r\n' +
  "\r\n";

test("parseCSV handles BOM, quotes, commas, newlines and blank lines", () => {
  const { headers, rows } = M.parseCSV(SAMPLE);
  assert.deepEqual(headers, ["id", "first_name", "last_name", "email", "gender", "ip_address"]);
  assert.equal(rows.length, 3);
  assert.equal(rows[1].first_name, "Turing, Alan");
  assert.equal(rows[1].last_name, 'O"Brien');
  assert.equal(rows[2].last_name, "Hop\nper");
});

test("parseCSV fills missing trailing fields and rejects bad input", () => {
  assert.equal(M.parseCSV("a,b\n1").rows[0].b, "");
  assert.throws(() => M.parseCSV(""), /empty/);
  assert.throws(() => M.parseCSV('a,b\n"1,2\n'), /never closed/);
  assert.throws(() => M.parseCSV("a,a\n1,2\n"), /repeats column "a"/);
});

test("addDerivedColumns adds a lowercase email_domain", () => {
  const data = M.addDerivedColumns(M.parseCSV(SAMPLE));
  assert.deepEqual(data.derived, ["email_domain"]);
  assert.equal(data.rows[0].email_domain, "example.com");
  assert.deepEqual(M.addDerivedColumns(M.parseCSV("a\n1\n")).derived, []);
});

test("filterRows combines search and value filters", () => {
  const { headers, rows } = M.parseCSV(SAMPLE);
  const f = (opts) => M.filterRows(rows, { searchColumns: headers, ...opts }).map((r) => r.id);
  assert.deepEqual(f({ valueFilters: { gender: new Set(["Female"]) } }), ["1", "3"]);
  assert.deepEqual(f({ query: "TURING" }), ["2"]);
  assert.deepEqual(f({ query: "example.com", valueFilters: { gender: new Set(["Male"]) } }), []);
  assert.deepEqual(f({ valueFilters: { gender: new Set() } }), ["1", "2", "3"]);
});

test("categoricalColumns picks low-cardinality columns", () => {
  const { headers, rows } = M.parseCSV(SAMPLE);
  assert.deepEqual(M.categoricalColumns(headers, rows), ["gender"]);
});

test("summaryRows counts and computes percentages", () => {
  const { rows } = M.parseCSV(SAMPLE);
  assert.deepEqual(M.summaryRows(rows, "gender"), [
    { gender: "Female", count: 2, percent: 66.7 },
    { gender: "Male", count: 1, percent: 33.3 },
  ]);
});

test("toCSV round-trips through parseCSV and neutralizes formulas", () => {
  const { headers, rows } = M.parseCSV(SAMPLE);
  assert.deepEqual(M.parseCSV(M.toCSV(headers, rows)).rows, rows);
  assert.equal(M.toCSV(["x"], [{ x: "=SUM(A1)" }, { x: "-5" }]), "x\r\n'=SUM(A1)\r\n-5\r\n");
});

test("toJSON keeps only the chosen columns", () => {
  const { rows } = M.parseCSV(SAMPLE);
  assert.deepEqual(JSON.parse(M.toJSON(["id", "email"], rows.slice(0, 1))), [
    { id: "1", email: "ada@Example.com" },
  ]);
});
