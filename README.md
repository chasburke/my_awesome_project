# members-cli

[![CI](https://github.com/chasburke/my_awesome_project/actions/workflows/ci.yml/badge.svg)](https://github.com/chasburke/my_awesome_project/actions/workflows/ci.yml)

Tools for listing, searching, summarizing and exporting member records stored in a CSV file: a drag-and-drop **web app** and a **command-line tool**.

## Web app

Open the hosted app at **https://chasburke.github.io/my_awesome_project/**, then drag a CSV onto the page (or click *Try sample data*).

- Filter rows by searching across all columns or by clicking values such as gender.
- Pick which columns to export, including an `email_domain` column derived from `email`.
- See a breakdown of matching rows by any column, and export it as CSV.
- Export the matching rows as CSV or JSON.

Files are read in your browser and never uploaded. The app is plain HTML and JavaScript in [`web/`](web/) with no build step. To run it locally:

```bash
python3 -m http.server 8000
# then open http://localhost:8000/web/
```

The [Deploy web app](.github/workflows/pages.yml) workflow publishes `web/` to GitHub Pages on every push to `main` that touches it. Before the first deploy, set **Settings → Pages → Source** to **GitHub Actions**.

## Command-line tool

### Install

Requires Python 3.9 or newer. There are no runtime dependencies.

```bash
pipx install git+https://github.com/chasburke/my_awesome_project
# or, from a clone:
pip install .
```

### Usage

```bash
members list examples/members.csv
members search examples/members.csv --name smith --gender female
members search examples/members.csv --email gmail --json
members stats examples/members.csv --top 10
members export examples/members.csv --format json -o members.json
```

Run `members --help` or `members COMMAND --help` for every option. On an error (missing file, missing column, bad id) the command prints a message and exits with status 1.

## Input format

A UTF-8 CSV file with a header row containing these columns (extra columns are ignored):

| Column | Example |
| --- | --- |
| `id` | `1` (must be an integer) |
| `first_name` | `Ada` |
| `last_name` | `Lovelace` |
| `email` | `ada@example.com` |
| `gender` | `Female` |
| `ip_address` | `10.0.0.1` |

`examples/members.csv` holds 1,000 synthetic records for trying the tool out. They are randomly generated and are not real people.

## Development

```bash
python3 -m venv .venv && source .venv/bin/activate
pip install -e ".[dev]"
pytest
ruff check . && ruff format --check .
node --test tests/web/   # web app logic (Node 20+)
```

CI runs the Python checks on Python 3.9, 3.11 and 3.13, and the web tests on Node 20, for every push and pull request.

## License

MIT. See [LICENSE](LICENSE).
