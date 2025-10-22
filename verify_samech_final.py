#!/usr/bin/env python3
# -*- coding: utf-8 -*-

import re

# Read source file
with open('/home/eli/Documents/hl5047/docs/sameh muktzeh.ini', 'r', encoding='utf-8') as f:
    source_lines = f.readlines()

# Read target file
with open('/home/eli/Documents/hl5047/data/muktzeh/letters/samech.ts', 'r', encoding='utf-8') as f:
    target_content = f.read()

# Count source entries
source_count = len([l for l in source_lines if l.strip() and not l.strip().startswith('#')])

# Extract entries from target
target_entries = []
name_pattern = r'name:\s*"([^"]+)"'
status_pattern = r'status:\s*"([^"]*)"'
matches = re.finditer(name_pattern, target_content)
for match in matches:
    name = match.group(1)
    target_entries.append(name)

print(f"Source entries: {source_count}")
print(f"Target entries: {len(target_entries)}")
print()

# Check critical entry that had error
print("=" * 80)
print("CRITICAL ENTRY VERIFICATION")
print("=" * 80)

# סכו"ם שהתעקם should be "אינו מוקצה" not "מוקצה"
pattern = r'name:\s*"סכו\\"ם שהתעקם"[^}}]*status:\s*"([^"]*)"'
match = re.search(pattern, target_content)
if match:
    status = match.group(1)
    if "אינו מוקצה" in status:
        print(f"✅ סכו\"ם שהתעקם: {status} (CORRECT)")
    else:
        print(f"❌ סכו\"ם שהתעקם: {status} (WRONG - should be 'אינו מוקצה')")
else:
    print(f"❌ סכו\"ם שהתעקם: NOT FOUND")

# Check splits for Sephardi/Ashkenazi
print("\n" + "=" * 80)
print("SEPHARDI/ASHKENAZI SPLITS")
print("=" * 80)

splits_to_check = [
    "סבון מוצק",
    "סבוניה ריקה",
    "סכו\"ם רגיל וחד פעמי",
]

for base_name in splits_to_check:
    pattern = rf'name:\s*"({re.escape(base_name)}[^"]*)"'
    matches = re.findall(pattern, target_content)
    if matches:
        print(f"\n{base_name}:")
        for name in matches:
            print(f"  - {name}")
    else:
        print(f"\n❌ {base_name}: NOT FOUND")

# Check סלסלת עיתונים split
print("\n" + "=" * 80)
print("סלסלת עיתונים SPLITS")
print("=" * 80)

pattern = r'name:\s*"(סלסלת עיתונים[^"]*)"[^}}]*status:\s*"([^"]*)"'
matches = re.findall(pattern, target_content)
for name, status in matches:
    print(f"  {name}: {status}")

print("\n" + "=" * 80)
print(f"SUMMARY: {len(target_entries)} total entries in target")
print("=" * 80)
