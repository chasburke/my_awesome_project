(function () {
  "use strict";

  const M = window.Members;
  const PREVIEW_ROWS = 50;
  const SUMMARY_ROWS = 20;
  const SAMPLE_URLS = ["sample-members.csv", "../examples/members.csv"];

  const $ = (id) => document.getElementById(id);
  const fmt = (n) => n.toLocaleString();

  const state = {
    fileName: "",
    headers: [],
    rows: [],
    derived: [],
    selected: new Set(),
    valueFilters: {},
    query: "",
    groupBy: "",
    filtered: [],
  };

  function el(tag, props = {}, children = []) {
    const node = document.createElement(tag);
    Object.assign(node, props);
    for (const child of [].concat(children)) {
      node.append(child instanceof Node ? child : document.createTextNode(String(child)));
    }
    return node;
  }

  function showError(message) {
    $("error").textContent = message;
    $("error").classList.toggle("hidden", !message);
  }

  function baseName(name) {
    return name.replace(/\.[^.]+$/, "") || "members";
  }

  function download(text, fileName, type) {
    const url = URL.createObjectURL(new Blob([text], { type }));
    const a = el("a", { href: url, download: fileName });
    document.body.append(a);
    a.click();
    a.remove();
    setTimeout(() => URL.revokeObjectURL(url), 0);
  }

  // Loading

  function loadText(text, fileName) {
    let data;
    try {
      data = M.addDerivedColumns(M.parseCSV(text));
    } catch (err) {
      showError(`Couldn't read ${fileName}: ${err.message}`);
      return;
    }
    if (!data.rows.length) {
      showError(`${fileName} has a header row but no data rows.`);
      return;
    }
    showError("");

    Object.assign(state, {
      fileName,
      headers: data.headers,
      rows: data.rows,
      derived: data.derived,
      selected: new Set(data.headers.filter((h) => !data.derived.includes(h))),
      valueFilters: {},
      query: "",
    });
    const categorical = M.categoricalColumns(state.headers, state.rows);
    state.groupBy =
      state.headers.find((h) => h.toLowerCase() === "gender") || categorical[0] || state.headers[0];

    $("search").value = "";
    $("filename").value = "";
    $("file-name").textContent = fileName;
    $("file-meta").textContent = `${fmt(state.rows.length)} rows · ${state.headers.length - state.derived.length} columns`;
    $("drop-empty").classList.add("hidden");
    $("drop-loaded").classList.remove("hidden");
    $("replace").classList.remove("hidden");
    $("dropzone").classList.add("compact");
    $("workspace").classList.remove("hidden");

    buildChipFilters(categorical);
    buildColumnList();
    buildGroupBy();
    updateFileName();
    render();
  }

  async function loadFile(file) {
    if (!file) return;
    try {
      loadText(await file.text(), file.name);
    } catch (err) {
      showError(`Couldn't open ${file.name}: ${err.message}`);
    }
  }

  async function loadSample() {
    for (const url of SAMPLE_URLS) {
      try {
        const res = await fetch(url);
        if (res.ok) return loadText(await res.text(), "sample-members.csv");
      } catch (_) {
        // try the next location
      }
    }
    showError("Sample data isn't available here. It loads when the app is served over http, such as on GitHub Pages.");
  }

  // Building controls

  function buildChipFilters(columns) {
    const container = $("chip-filters");
    container.replaceChildren();
    for (const col of columns) {
      const chips = M.countBy(state.rows, col).map(([value, count]) => {
        const chip = el("button", { type: "button", className: "chip" }, [
          value === "" ? "(blank)" : value,
          el("span", { className: "n" }, fmt(count)),
        ]);
        chip.setAttribute("aria-pressed", "false");
        chip.addEventListener("click", () => {
          const values = (state.valueFilters[col] ||= new Set());
          if (values.has(value)) values.delete(value);
          else values.add(value);
          chip.setAttribute("aria-pressed", String(values.has(value)));
          render();
        });
        return chip;
      });
      container.append(
        el("div", { className: "filter-group" }, [
          el("label", { className: "field" }, col),
          el("div", { className: "chips" }, chips),
        ])
      );
    }
  }

  function buildColumnList() {
    const list = $("column-list");
    list.replaceChildren();
    for (const h of state.headers) {
      const box = el("input", { type: "checkbox", checked: state.selected.has(h), value: h });
      box.addEventListener("change", () => {
        if (box.checked) state.selected.add(h);
        else state.selected.delete(h);
        render();
      });
      const parts = [box, h];
      if (state.derived.includes(h)) parts.push(el("span", { className: "tag" }, "added from email"));
      list.append(el("label", {}, parts));
    }
  }

  function buildGroupBy() {
    const select = $("group-by");
    select.replaceChildren(...state.headers.map((h) => el("option", { value: h }, h)));
    select.value = state.groupBy;
  }

  function selectedColumns() {
    return state.headers.filter((h) => state.selected.has(h));
  }

  function format() {
    return document.querySelector('input[name="format"]:checked').value;
  }

  function updateFileName() {
    const current = $("filename").value.trim();
    $("filename").value = current
      ? current.replace(/\.(csv|json)$/i, "") + `.${format()}`
      : `${baseName(state.fileName)}-export.${format()}`;
  }

  // Rendering

  function render() {
    state.filtered = M.filterRows(state.rows, {
      query: state.query,
      searchColumns: state.headers,
      valueFilters: state.valueFilters,
    });
    const cols = selectedColumns();

    $("stat-total").textContent = fmt(state.rows.length);
    $("stat-match").textContent = fmt(state.filtered.length);
    $("stat-cols").textContent = fmt(cols.length);

    const canExport = cols.length > 0 && state.filtered.length > 0;
    $("export-rows").disabled = !canExport;
    $("export-rows").textContent = `Export ${fmt(state.filtered.length)} rows`;
    $("export-note").textContent = !cols.length
      ? "Select at least one column."
      : !state.filtered.length
        ? "No rows match the current filters."
        : `${cols.length} column${cols.length === 1 ? "" : "s"}: ${cols.join(", ")}`;

    renderSummary();
    renderPreview(cols);
  }

  function renderSummary() {
    const summary = M.summaryRows(state.filtered, state.groupBy);
    const max = summary.length ? summary[0].count : 0;
    $("group-col").textContent = state.groupBy;
    $("export-summary").disabled = !summary.length;
    $("summary-body").replaceChildren(
      ...summary.slice(0, SUMMARY_ROWS).map((s) => {
        const value = s[state.groupBy];
        const bar = el("div", { className: "bar" });
        bar.style.width = `${max ? (s.count / max) * 100 : 0}%`;
        return el("tr", {}, [
          el("td", {}, value === "" ? "(blank)" : value),
          el("td", { className: "num" }, fmt(s.count)),
          el("td", { className: "num" }, `${s.percent}%`),
          el("td", { className: "bar-cell" }, bar),
        ]);
      })
    );
    const hidden = summary.length - SUMMARY_ROWS;
    $("summary-note").textContent = !summary.length
      ? "No rows match the current filters."
      : hidden > 0
        ? `Showing the top ${SUMMARY_ROWS} of ${fmt(summary.length)} values. The export includes all of them.`
        : "";
  }

  function renderPreview(cols) {
    $("preview-head").replaceChildren(...cols.map((h) => el("th", {}, h)));
    const shown = state.filtered.slice(0, PREVIEW_ROWS);
    $("preview-body").replaceChildren(
      ...shown.map((r) => el("tr", {}, cols.map((h) => el("td", {}, r[h]))))
    );
    $("preview-note").textContent = !cols.length
      ? "Select columns to preview them."
      : !state.filtered.length
        ? "No rows match the current filters."
        : `Showing ${fmt(shown.length)} of ${fmt(state.filtered.length)} matching rows.`;
  }

  // Exporting

  function exportRows() {
    const cols = selectedColumns();
    const name = $("filename").value.trim() || `${baseName(state.fileName)}-export.${format()}`;
    if (format() === "json") download(M.toJSON(cols, state.filtered), name, "application/json");
    else download(M.toCSV(cols, state.filtered), name, "text/csv");
  }

  function exportSummary() {
    const rows = M.summaryRows(state.filtered, state.groupBy);
    const name = `${baseName(state.fileName)}-by-${state.groupBy}.csv`;
    download(M.toCSV([state.groupBy, "count", "percent"], rows), name, "text/csv");
  }

  // Events

  $("browse").addEventListener("click", () => $("file-input").click());
  $("replace").addEventListener("click", () => $("file-input").click());
  $("sample").addEventListener("click", loadSample);
  $("file-input").addEventListener("change", (e) => {
    loadFile(e.target.files[0]);
    e.target.value = "";
  });

  let dragDepth = 0;
  window.addEventListener("dragenter", (e) => {
    e.preventDefault();
    dragDepth++;
    document.body.classList.add("dragging");
  });
  window.addEventListener("dragleave", () => {
    if (--dragDepth <= 0) {
      dragDepth = 0;
      document.body.classList.remove("dragging");
    }
  });
  window.addEventListener("dragover", (e) => e.preventDefault());
  window.addEventListener("drop", (e) => {
    e.preventDefault();
    dragDepth = 0;
    document.body.classList.remove("dragging");
    loadFile(e.dataTransfer.files[0]);
  });

  $("search").addEventListener("input", (e) => {
    state.query = e.target.value;
    render();
  });
  $("clear-filters").addEventListener("click", () => {
    state.query = "";
    state.valueFilters = {};
    $("search").value = "";
    document.querySelectorAll(".chip").forEach((c) => c.setAttribute("aria-pressed", "false"));
    render();
  });

  function setAllColumns(on) {
    state.selected = new Set(on ? state.headers : []);
    document.querySelectorAll("#column-list input").forEach((b) => (b.checked = on));
    render();
  }
  $("cols-all").addEventListener("click", () => setAllColumns(true));
  $("cols-none").addEventListener("click", () => setAllColumns(false));

  document.querySelectorAll('input[name="format"]').forEach((r) => r.addEventListener("change", updateFileName));
  $("group-by").addEventListener("change", (e) => {
    state.groupBy = e.target.value;
    renderSummary();
  });
  $("export-rows").addEventListener("click", exportRows);
  $("export-summary").addEventListener("click", exportSummary);
})();
