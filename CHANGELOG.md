# Changelog

## 0.1.0 — unreleased

- Add a drag-and-drop web app (`web/`) for filtering, summarizing and exporting member CSVs in the browser, deployed to GitHub Pages.
- Package the project as `members-cli` with a `members` command.
- Add `list`, `search`, `stats` and `export` subcommands.
- Validate CSV columns and ids, with clear error messages and exit codes.
- Add tests, ruff configuration and GitHub Actions CI.
- Move the synthetic dataset to `examples/members.csv`; remove `read_members.py`.
