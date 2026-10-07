import json

import pytest

from members_cli.cli import main


def test_list(sample_csv, capsys):
    assert main(["list", str(sample_csv)]) == 0
    assert capsys.readouterr().out.splitlines() == ["Ada Lovelace", "Alan Turing", "Grace Hopper"]


def test_search_json(sample_csv, capsys):
    assert main(["search", str(sample_csv), "--name", "alan", "--json"]) == 0
    assert json.loads(capsys.readouterr().out)[0]["email"] == "alan@example.org"


def test_stats_json(sample_csv, capsys):
    assert main(["stats", str(sample_csv), "--json"]) == 0
    assert json.loads(capsys.readouterr().out)["total"] == 3


def test_export_csv_to_file(sample_csv, tmp_path):
    out = tmp_path / "out.csv"
    assert main(["export", str(sample_csv), "--format", "csv", "-o", str(out)]) == 0
    assert out.read_text().splitlines()[0] == "id,first_name,last_name,email,gender,ip_address"


def test_error_exit_code(tmp_path, capsys):
    assert main(["list", str(tmp_path / "missing.csv")]) == 1
    assert "file not found" in capsys.readouterr().err


def test_requires_command():
    with pytest.raises(SystemExit):
        main([])
