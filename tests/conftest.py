import pytest

SAMPLE = """id,first_name,last_name,email,gender,ip_address
1,Ada,Lovelace,ada@example.com,Female,10.0.0.1
2,Alan,Turing,alan@example.org,Male,10.0.0.2
3,Grace,Hopper,grace@Example.com,Female,10.0.0.3
"""


@pytest.fixture
def sample_csv(tmp_path):
    path = tmp_path / "members.csv"
    path.write_text(SAMPLE, encoding="utf-8")
    return path
