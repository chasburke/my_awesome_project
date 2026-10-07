"""Entry point for the ``members`` command."""

from __future__ import annotations

import argparse
import csv
import json
import sys
from collections.abc import Sequence

from . import __version__
from .core import REQUIRED_COLUMNS, Member, MembersError, load_members, search, stats


def _print_names(members: list[Member]) -> None:
    for m in members:
        print(m.full_name)


def _cmd_list(args: argparse.Namespace) -> None:
    _print_names(load_members(args.csv_path))


def _cmd_search(args: argparse.Namespace) -> None:
    results = search(
        load_members(args.csv_path), name=args.name, email=args.email, gender=args.gender
    )
    if args.json:
        json.dump([m.to_dict() for m in results], sys.stdout, indent=2)
        print()
    else:
        _print_names(results)


def _cmd_stats(args: argparse.Namespace) -> None:
    summary = stats(load_members(args.csv_path), top=args.top)
    if args.json:
        json.dump(summary, sys.stdout, indent=2)
        print()
        return
    print(f"Total members: {summary['total']}")
    print("\nBy gender:")
    for gender, count in summary["by_gender"].items():
        print(f"  {gender:<15} {count}")
    print(f"\nTop {args.top} email domains:")
    for domain, count in summary["top_email_domains"].items():
        print(f"  {domain:<20} {count}")


def _cmd_export(args: argparse.Namespace) -> None:
    members = load_members(args.csv_path)
    out = open(args.output, "w", newline="", encoding="utf-8") if args.output else sys.stdout
    try:
        if args.format == "json":
            json.dump([m.to_dict() for m in members], out, indent=2)
            out.write("\n")
        else:
            writer = csv.DictWriter(out, fieldnames=REQUIRED_COLUMNS)
            writer.writeheader()
            writer.writerows(m.to_dict() for m in members)
    finally:
        if out is not sys.stdout:
            out.close()


def build_parser() -> argparse.ArgumentParser:
    parser = argparse.ArgumentParser(
        prog="members", description="Work with member records stored in a CSV file."
    )
    parser.add_argument("--version", action="version", version=f"%(prog)s {__version__}")
    sub = parser.add_subparsers(dest="command", required=True, metavar="COMMAND")

    def add(name: str, help: str, func) -> argparse.ArgumentParser:
        p = sub.add_parser(name, help=help, description=help)
        p.add_argument("csv_path", help="path to the member CSV file")
        p.set_defaults(func=func)
        return p

    add("list", "print every member's full name", _cmd_list)

    p = add("search", "find members matching filters", _cmd_search)
    p.add_argument("--name", help="substring of the full name")
    p.add_argument("--email", help="substring of the email address")
    p.add_argument("--gender", help="exact gender value")
    p.add_argument("--json", action="store_true", help="print full records as JSON")

    p = add("stats", "summarize members by gender and email domain", _cmd_stats)
    p.add_argument("--top", type=int, default=5, help="number of email domains (default: 5)")
    p.add_argument("--json", action="store_true", help="print the summary as JSON")

    p = add("export", "convert the file to JSON or normalized CSV", _cmd_export)
    p.add_argument("--format", choices=("json", "csv"), default="json")
    p.add_argument("-o", "--output", help="write to this file instead of stdout")

    return parser


def main(argv: Sequence[str] | None = None) -> int:
    args = build_parser().parse_args(argv)
    try:
        args.func(args)
    except MembersError as e:
        print(f"members: error: {e}", file=sys.stderr)
        return 1
    except BrokenPipeError:
        # e.g. `members list file.csv | head`
        sys.stderr.close()
    return 0


if __name__ == "__main__":
    sys.exit(main())
