#!/usr/bin/env python3
# -*- coding: utf-8 -*-

import re

# Read source file
with open('/home/eli/Documents/hl5047/docs/tav muktzeh.ini', 'r', encoding='utf-8') as f:
    source_lines = f.readlines()

# Read target file
with open('/home/eli/Documents/hl5047/data/muktzeh/letters/tav.ts', 'r', encoding='utf-8') as f:
    target_content = f.read()

# Extract entries from source
source_entries = []
for line in source_lines:
    line = line.strip()
    if not line or line.startswith('#'):
        continue
    # Remove footnote numbers
    line = re.sub(r'\d+\.', '.', line)
    line = re.sub(r'\d+\)', ')', line)

    # Parse entry
    if ' - ' in line:
        parts = line.split(' - ', 1)
        name = parts[0].strip()
        rest = parts[1] if len(parts) > 1 else ''
        source_entries.append({
            'name': name,
            'full': line
        })

# Extract entries from target
target_entries = []
name_pattern = r'name:\s*"([^"]+)"'
matches = re.finditer(name_pattern, target_content)
for match in matches:
    name = match.group(1)
    target_entries.append(name)

print(f"Source entries: {len(source_entries)}")
print(f"Target entries: {len(target_entries)}")
print()

# Check for missing entries
print("=" * 80)
print("VERIFICATION RESULTS")
print("=" * 80)

missing_in_target = []
for entry in source_entries:
    source_name = entry['name']
    # Check if this name appears in target (allowing for splits and cross-refs)
    found = False
    for target_name in target_entries:
        # Direct match or split match or starts with first word
        if (source_name in target_name or
            target_name.startswith(source_name.split()[0]) or
            source_name.startswith("ראה ")):
            found = True
            break
    if not found:
        missing_in_target.append(source_name)

if missing_in_target:
    print(f"\n❌ MISSING IN TARGET ({len(missing_in_target)} entries):")
    for name in missing_in_target[:20]:  # Show first 20
        print(f"  - {name}")
    if len(missing_in_target) > 20:
        print(f"  ... and {len(missing_in_target) - 20} more")
else:
    print("\n✅ All source entries found in target!")

# Check critical entries
print("\n" + "=" * 80)
print("CRITICAL ENTRIES VERIFICATION")
print("=" * 80)

critical_checks = [
    ("תבנית אפיה", "מלאכתו לאיסור"),
    ("תכשיט", "מותר"),
    ("תפילין", "מלאכתו לאיסור"),
    ("תעודת זהות", "מוקצה מחמת חסרון כיס"),
    ("תרופות ששימושם תדיר/אקמול/נורופן/אופטלגין וכדו'", "מלאכתו להיתר"),
]

for name, expected_status in critical_checks:
    # Find in target
    pattern = rf'name:\s*"{re.escape(name)}"[^}}]*status:\s*"([^"]*)"'
    match = re.search(pattern, target_content)
    if match:
        actual_status = match.group(1)
        if expected_status in actual_status or actual_status == expected_status:
            print(f"✅ {name}: {actual_status}")
        else:
            print(f"❌ {name}: Expected '{expected_status}', got '{actual_status}'")
    else:
        print(f"❌ {name}: NOT FOUND")

# Check for splits
print("\n" + "=" * 80)
print("SPLIT ENTRIES VERIFICATION")
print("=" * 80)

splits = [
    "תג זיהוי לעובדים",
    "תווית מחיר",
    "תופסן למדף בארון",
    "תיק איפור",
    "תיק אמגזית",
    "תיקייה שייחדה למסמכי חול",
    "תלוש משכורת",
    "תמונה שצולמה בשבת על ידי גוי",
    "תעודת תואר",
    "תרופות שאין שימושם תדיר"
]

for split_name in splits:
    matches = [t for t in target_entries if split_name in t]
    if len(matches) > 1:
        print(f"✅ {split_name}: Split into {len(matches)} entries")
    elif len(matches) == 1:
        print(f"⚠️  {split_name}: Found 1 entry (may need split)")
    else:
        print(f"❌ {split_name}: NOT FOUND")

print("\n" + "=" * 80)
print(f"SUMMARY: {len(target_entries)} total entries in tav.ts")
print("=" * 80)
