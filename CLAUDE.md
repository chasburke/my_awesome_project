# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Overview

This is a small, single-purpose project for working with `Members.csv`, a dataset of member records (id, first_name, last_name, email, gender, ip_address).

## Commands

Run the sample script:

```bash
python3 read_members.py
```

There is no build, lint, or test tooling configured in this repository.

## Structure

- `Members.csv` — the member dataset. Contains PII (names, emails, IP addresses) — treat with care and avoid committing any derived files that leak this data unnecessarily.
- `read_members.py` — reads `Members.csv` via `csv.DictReader` and prints each member's full name. Assumes it is run from the repository root (uses a relative path to the CSV).
