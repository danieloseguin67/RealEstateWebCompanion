#!/usr/bin/env python3
"""Refresh the apartments table from the JSON listing file."""

import json
import pyodbc

JSON_FILE = r"g:\My Drive\pubic_images\montreal4rent\data\apartments_listings 2026-03-19.json"
SERVER    = "localhost,14330"
DATABASE  = "realestatewebcompanion"
USERNAME  = "sa"
PASSWORD  = "YourStrong!Passw0rd"

with open(JSON_FILE, encoding="utf-8") as f:
    apartments = json.load(f)

conn = pyodbc.connect(
    f"DRIVER={{ODBC Driver 17 for SQL Server}};SERVER={SERVER};"
    f"DATABASE={DATABASE};UID={USERNAME};PWD={PASSWORD};TrustServerCertificate=yes"
)
cursor = conn.cursor()

cursor.execute("DELETE FROM apartments")
print(f"Table cleared. Inserting {len(apartments)} records...")

INSERT_SQL = """
INSERT INTO apartments (
    Id, Title, TitleEn, UnitTypeName, Bathrooms, SquareFootage, Price, Area,
    Furnished, RoomToRent, CondoRentals, Available, Description, DescriptionEn,
    FeaturesJson, FeaturesEnJson, ImagesJson, ToggleNamesJson
) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)
"""

for apt in apartments:
    cursor.execute(INSERT_SQL,
        apt.get("id", ""),
        apt.get("title", ""),
        apt.get("titleEn", ""),
        apt.get("unit_type_name", ""),
        int(apt.get("bathrooms", 0)),
        int(apt.get("squareFootage", 0)),
        float(apt.get("price", 0)),
        apt.get("area", ""),
        1 if apt.get("furnished") else 0,
        1 if apt.get("roomtorent") else 0,
        1 if apt.get("condorentals") else 0,
        1 if apt.get("available") else 0,
        apt.get("description", ""),
        apt.get("descriptionEn", ""),
        json.dumps(apt.get("features", []), ensure_ascii=False),
        json.dumps(apt.get("featuresEn", []), ensure_ascii=False),
        json.dumps(apt.get("images", []), ensure_ascii=False),
        json.dumps(apt.get("toggle_names", []), ensure_ascii=False),
    )

conn.commit()
cursor.execute("SELECT COUNT(*) FROM apartments")
count = cursor.fetchone()[0]
print(f"Done. {count} rows now in apartments table.")
conn.close()
