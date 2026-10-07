// Pure data functions for the web app: CSV parsing, filtering, counting and export.
// Loaded as a plain <script> in the browser (window.Members) and via require() in tests.
(function (root) {
  "use strict";

  function parseCSV(text) {
    if (text.charCodeAt(0) === 0xfeff) text = text.slice(1);
    const records = [];
    let record = [];
    let field = "";
    let inQuotes = false;
    let i = 0;
    while (i < text.length) {
      const c = text[i];
      if (inQuotes) {
        if (c === '"') {
          if (text[i + 1] === '"') {
            field += '"';
            i += 2;
            continue;
          }
          inQuotes = false;
        } else {
          field += c;
        }
        i++;
        continue;
      }
      if (c === '"' && field === "") {
        inQuotes = true;
      } else if (c === ",") {
        record.push(field);
        field = "";
      } else if (c === "\r" || c === "\n") {
        record.push(field);
        records.push(record);
        record = [];
        field = "";
        if (c === "\r" && text[i + 1] === "\n") i++;
      } else {
        field += c;
      }
      i++;
    }
    if (inQuotes) throw new Error("The file has a quoted value that is never closed.");
    if (field !== "" || record.length) {
      record.push(field);
      records.push(record);
    }

    const nonEmpty = records.filter((r) => !(r.length === 1 && r[0].trim() === ""));
    if (!nonEmpty.length) throw new Error("The file is empty.");
    const headers = nonEmpty[0].map((h) => h.trim());
    if (headers.some((h) => !h)) throw new Error("The header row has an empty column name.");
    const dupes = headers.filter((h, j) => headers.indexOf(h) !== j);
    if (dupes.length) throw new Error(`The header row repeats column "${dupes[0]}".`);

    const rows = nonEmpty.slice(1).map((r) => {
      const row = {};
      headers.forEach((h, j) => {
        row[h] = r[j] === undefined ? "" : r[j];
      });
      return row;
    });
    return { headers, rows };
  }

  function emailDomain(email) {
    const at = email.lastIndexOf("@");
    return at === -1 ? "" : email.slice(at + 1).trim().toLowerCase();
  }

  // Adds an email_domain column when the file has an email column.
  function addDerivedColumns(data) {
    const emailCol = data.headers.find((h) => h.toLowerCase() === "email");
    if (!emailCol || data.headers.includes("email_domain")) return { ...data, derived: [] };
    return {
      headers: [...data.headers, "email_domain"],
      rows: data.rows.map((r) => ({ ...r, email_domain: emailDomain(r[emailCol]) })),
      derived: ["email_domain"],
    };
  }

  // Columns with few distinct values (like gender) that make sense as filter chips.
  function categoricalColumns(headers, rows, maxValues = 20) {
    const limit = Math.min(maxValues, Math.max(2, Math.floor(rows.length / 2)));
    return headers.filter((h) => {
      const seen = new Set();
      for (const r of rows) {
        seen.add(r[h]);
        if (seen.size > limit) return false;
      }
      return seen.size > 1;
    });
  }

  // query matches a substring of any of searchColumns; valueFilters maps column -> Set of allowed values.
  function filterRows(rows, { query = "", searchColumns = [], valueFilters = {} } = {}) {
    const q = query.trim().toLowerCase();
    const active = Object.entries(valueFilters).filter(([, values]) => values && values.size);
    return rows.filter((r) => {
      for (const [col, values] of active) if (!values.has(r[col])) return false;
      return !q || searchColumns.some((c) => String(r[c]).toLowerCase().includes(q));
    });
  }

  // Returns [value, count] pairs, most common first.
  function countBy(rows, column) {
    const counts = new Map();
    for (const r of rows) counts.set(r[column], (counts.get(r[column]) || 0) + 1);
    return [...counts.entries()].sort((a, b) => b[1] - a[1] || String(a[0]).localeCompare(String(b[0])));
  }

  function csvCell(value) {
    let s = value == null ? "" : String(value);
    // Stop spreadsheet apps from running cell text as a formula.
    if (/^[=+@\t\r]/.test(s) || (s.startsWith("-") && isNaN(Number(s)))) s = "'" + s;
    return /[",\r\n]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s;
  }

  function toCSV(headers, rows) {
    const lines = [headers, ...rows.map((r) => headers.map((h) => r[h]))];
    return lines.map((line) => line.map(csvCell).join(",")).join("\r\n") + "\r\n";
  }

  function toJSON(headers, rows) {
    const picked = rows.map((r) => Object.fromEntries(headers.map((h) => [h, r[h]])));
    return JSON.stringify(picked, null, 2) + "\n";
  }

  function summaryRows(rows, column) {
    const total = rows.length;
    return countBy(rows, column).map(([value, count]) => ({
      [column]: value,
      count,
      percent: total ? Math.round((count / total) * 1000) / 10 : 0,
    }));
  }

  const api = {
    parseCSV,
    emailDomain,
    addDerivedColumns,
    categoricalColumns,
    filterRows,
    countBy,
    toCSV,
    toJSON,
    summaryRows,
  };
  if (typeof module === "object" && module.exports) module.exports = api;
  else root.Members = api;
})(this);
