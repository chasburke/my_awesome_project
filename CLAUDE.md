# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Overview

This repo has two front ends for member CSVs: a static browser app in `web/`, and a Python package providing a `members` command for listing, searching, summarizing and exporting member records (id, first_name, last_name, email, gender, ip_address) from a CSV file.

## Commands

```bash
pip install -e ".[dev]"     # install with dev tools
members list examples/members.csv
pytest                      # run tests
ruff check . && ruff format --check .
node --test tests/web/      # web app logic tests
python3 -m http.server 8000 # then open http://localhost:8000/web/
```

## Structure

- `src/members_cli/core.py` — `Member` dataclass, `load_members` (validates columns and ids, raises `MembersError`), `search`, `stats`.
- `src/members_cli/cli.py` — argparse CLI with `list`, `search`, `stats`, `export` subcommands; `main()` is the `members` entry point.
- `web/members.js` — pure data functions (CSV parse/export, filtering, counts); works in the browser and under Node for tests. `web/app.js` — DOM wiring; renders CSV content with `textContent` only. `web/index.html` — page and styles. No build step and no dependencies; data never leaves the browser.
- `tests/web/` — `node:test` tests for `web/members.js`.
- `tests/` — pytest tests using a small fixture CSV from `conftest.py`.
- `examples/members.csv` — 1,000 synthetic (not real) records for demos.
- `.github/workflows/ci.yml` — ruff and pytest on Python 3.9/3.11/3.13, plus the Node web tests.
- `.github/workflows/pages.yml` — deploys `web/` (plus `examples/members.csv` as `sample-members.csv`) to GitHub Pages.
