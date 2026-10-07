"""Loading, filtering and summarizing member records."""

from __future__ import annotations

import csv
from collections import Counter
from collections.abc import Iterable
from dataclasses import asdict, dataclass
from pathlib import Path

REQUIRED_COLUMNS = ("id", "first_name", "last_name", "email", "gender", "ip_address")


class MembersError(Exception):
    """Raised when a members file cannot be read or is malformed."""


@dataclass(frozen=True)
class Member:
    id: int
    first_name: str
    last_name: str
    email: str
    gender: str
    ip_address: str

    @property
    def full_name(self) -> str:
        return f"{self.first_name} {self.last_name}"

    @property
    def email_domain(self) -> str:
        return self.email.rpartition("@")[2].lower()

    def to_dict(self) -> dict:
        return asdict(self)


def load_members(path: str | Path) -> list[Member]:
    """Read and validate every member in the CSV at ``path``."""
    path = Path(path)
    try:
        with path.open(newline="", encoding="utf-8") as f:
            reader = csv.DictReader(f)
            missing = [c for c in REQUIRED_COLUMNS if c not in (reader.fieldnames or [])]
            if missing:
                raise MembersError(f"{path}: missing column(s): {', '.join(missing)}")
            return [_parse_row(row, path, reader.line_num) for row in reader]
    except FileNotFoundError:
        raise MembersError(f"file not found: {path}") from None
    except UnicodeDecodeError:
        raise MembersError(f"{path}: not a UTF-8 text file") from None


def _parse_row(row: dict, path: Path, line: int) -> Member:
    try:
        member_id = int(row["id"])
    except (TypeError, ValueError):
        raise MembersError(f"{path}:{line}: invalid id {row['id']!r}") from None
    return Member(
        id=member_id,
        first_name=row["first_name"] or "",
        last_name=row["last_name"] or "",
        email=row["email"] or "",
        gender=row["gender"] or "",
        ip_address=row["ip_address"] or "",
    )


def search(
    members: Iterable[Member],
    *,
    name: str | None = None,
    email: str | None = None,
    gender: str | None = None,
) -> list[Member]:
    """Return members matching every given filter (case-insensitive).

    ``name`` and ``email`` match substrings; ``gender`` must match exactly.
    """
    results = []
    for m in members:
        if name and name.lower() not in m.full_name.lower():
            continue
        if email and email.lower() not in m.email.lower():
            continue
        if gender and gender.lower() != m.gender.lower():
            continue
        results.append(m)
    return results


def stats(members: Iterable[Member], top: int = 5) -> dict:
    """Summarize member counts overall, by gender and by top email domains."""
    members = list(members)
    return {
        "total": len(members),
        "by_gender": dict(Counter(m.gender for m in members).most_common()),
        "top_email_domains": dict(Counter(m.email_domain for m in members).most_common(top)),
    }
