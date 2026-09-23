import argparse
import csv
import sys


def main() -> int:
    parser = argparse.ArgumentParser(description="Print full names from a member CSV file.")
    parser.add_argument(
        "csv_path",
        nargs="?",
        default="Members.csv",
        help="Path to the member CSV file (default: Members.csv)",
    )
    args = parser.parse_args()

    try:
        with open(args.csv_path, newline="") as f:
            reader = csv.DictReader(f)
            for row in reader:
                print(f"{row['first_name']} {row['last_name']}")
    except FileNotFoundError:
        print(f"Error: file not found: {args.csv_path}", file=sys.stderr)
        return 1
    except KeyError as e:
        print(f"Error: missing expected column {e} in {args.csv_path}", file=sys.stderr)
        return 1

    return 0


if __name__ == "__main__":
    sys.exit(main())
