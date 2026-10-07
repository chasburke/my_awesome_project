import pytest

from members_cli.core import MembersError, load_members, search, stats


def test_load_members(sample_csv):
    members = load_members(sample_csv)
    assert [m.full_name for m in members] == ["Ada Lovelace", "Alan Turing", "Grace Hopper"]
    assert members[0].id == 1


def test_missing_file(tmp_path):
    with pytest.raises(MembersError, match="file not found"):
        load_members(tmp_path / "nope.csv")


def test_missing_column(tmp_path):
    path = tmp_path / "bad.csv"
    path.write_text("id,first_name\n1,Ada\n")
    with pytest.raises(MembersError, match="missing column"):
        load_members(path)


def test_invalid_id(tmp_path):
    path = tmp_path / "bad.csv"
    path.write_text("id,first_name,last_name,email,gender,ip_address\nx,A,B,a@b.c,F,1.1.1.1\n")
    with pytest.raises(MembersError, match="invalid id"):
        load_members(path)


def test_search_filters(sample_csv):
    members = load_members(sample_csv)
    assert [m.id for m in search(members, gender="female")] == [1, 3]
    assert [m.id for m in search(members, name="TUR")] == [2]
    assert [m.id for m in search(members, email="example.com", name="grace")] == [3]
    assert search(members, name="nobody") == []


def test_stats(sample_csv):
    summary = stats(load_members(sample_csv))
    assert summary["total"] == 3
    assert summary["by_gender"] == {"Female": 2, "Male": 1}
    assert summary["top_email_domains"] == {"example.com": 2, "example.org": 1}
