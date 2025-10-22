#!/usr/bin/env python3
"""Verify muktzeh mem.ts against mem muktzeh.ini - Version 2"""

import re
import json
from typing import List, Dict, Tuple

def parse_ini_file(filepath: str) -> List[Dict]:
    """Parse INI file entries"""
    entries = []
    with open(filepath, 'r', encoding='utf-8') as f:
        for line_num, line in enumerate(f, 1):
            line = line.strip()
            if not line:
                continue

            # Parse the format: "name - status (source). description"
            # or "name - status. description"
            parts = line.split(' - ', 1)
            if len(parts) < 2:
                continue

            name = parts[0].strip()
            rest = parts[1]

            # Extract status, source, and description
            entry = {
                'name': name,
                'status': '',
                'source': '',
                'description': '',
                'raw': line,
                'line_num': line_num
            }

            # Try to find pattern with parentheses (source)
            source_match = re.search(r'\((.*?)\)', rest)
            if source_match:
                entry['source'] = source_match.group(1)
                # Remove source from rest
                rest_before = rest[:source_match.start()].strip()
                rest_after = rest[source_match.end():].strip()

                # Status is before the source
                if rest_before.endswith('.'):
                    rest_before = rest_before[:-1].strip()
                entry['status'] = rest_before

                # Description is after the source
                if rest_after.startswith('.'):
                    rest_after = rest_after[1:].strip()
                entry['description'] = rest_after
            else:
                # No source, split by first period
                period_pos = rest.find('.')
                if period_pos > 0:
                    entry['status'] = rest[:period_pos].strip()
                    entry['description'] = rest[period_pos+1:].strip()
                else:
                    entry['status'] = rest.strip()

            entries.append(entry)

    return entries

def parse_ts_file(filepath: str) -> List[Dict]:
    """Parse TypeScript file entries - handles multiline format"""
    entries = []
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    # Find the items array section
    items_match = re.search(r'items:\s*\[(.*)\]', content, re.DOTALL)
    if not items_match:
        return entries

    items_content = items_match.group(1)

    # Split by object boundaries: },\n    {
    # More robust: find all complete objects
    current_obj = {}
    in_object = False
    lines = items_content.split('\n')

    for line in lines:
        line = line.strip()

        if line.startswith('{'):
            in_object = True
            current_obj = {}
            continue

        if line.startswith('}'):
            if current_obj:
                entries.append(current_obj)
            current_obj = {}
            in_object = False
            continue

        if in_object:
            # Parse field: value patterns
            # name: "value",
            name_match = re.match(r'name:\s*"([^"]*)"', line)
            if name_match:
                current_obj['name'] = name_match.group(1)
                continue

            status_match = re.match(r'status:\s*"([^"]*)"', line)
            if status_match:
                current_obj['status'] = status_match.group(1)
                continue

            source_match = re.match(r'source:\s*"([^"]*)"', line)
            if source_match:
                current_obj['source'] = source_match.group(1)
                continue

            desc_match = re.match(r'(?:,\s*)?description:\s*"([^"]*)"', line)
            if desc_match:
                current_obj['description'] = desc_match.group(1)
                continue

    return entries

def normalize_text(text: str) -> str:
    """Normalize text for comparison"""
    if not text:
        return ""
    # Remove extra whitespace
    text = ' '.join(text.split())
    # Remove trailing/leading dots
    text = text.strip('.')
    # Remove numbers at end (footnote markers)
    text = re.sub(r'\d+$', '', text)
    return text.strip()

def compare_entries(ini_entry: Dict, ts_entry: Dict) -> Tuple[bool, List[str]]:
    """Compare two entries and return if they match and list of differences"""
    differences = []

    # Compare name
    ini_name = normalize_text(ini_entry['name'])
    ts_name = normalize_text(ts_entry.get('name', ''))
    if ini_name != ts_name:
        differences.append(f"Name: '{ini_entry['name']}' vs '{ts_entry.get('name', '')}'")

    # Compare status
    ini_status = normalize_text(ini_entry['status'])
    ts_status = normalize_text(ts_entry.get('status', ''))
    if ini_status != ts_status:
        differences.append(f"Status: '{ini_entry['status']}' vs '{ts_entry.get('status', '')}'")

    # Compare source
    ini_source = normalize_text(ini_entry['source'])
    ts_source = normalize_text(ts_entry.get('source', ''))
    if ini_source != ts_source:
        differences.append(f"Source: '{ini_entry['source']}' vs '{ts_entry.get('source', '')}'")

    # Compare description
    ini_desc = normalize_text(ini_entry['description'])
    ts_desc = normalize_text(ts_entry.get('description', ''))
    if ini_desc != ts_desc:
        differences.append(f"Description: '{ini_entry['description']}' vs '{ts_entry.get('description', '')}'")

    return len(differences) == 0, differences

def main():
    ini_file = '/home/eli/Documents/hl5047/docs/mem muktzeh.ini'
    ts_file = '/home/eli/Documents/hl5047/data/muktzeh/letters/mem.ts'

    print("Parsing INI file...")
    ini_entries = parse_ini_file(ini_file)

    print("Parsing TypeScript file...")
    ts_entries = parse_ts_file(ts_file)

    print(f"\n{'='*70}")
    print(f"TOTAL ENTRY COUNTS")
    print(f"{'='*70}")
    print(f"Source INI entries: {len(ini_entries)}")
    print(f"Target TS entries:  {len(ts_entries)}")
    print(f"Difference:         {abs(len(ini_entries) - len(ts_entries))}")

    # Compare first 10
    print(f"\n{'='*70}")
    print(f"FIRST 10 ENTRIES VERIFICATION")
    print(f"{'='*70}")
    first_10_matches = 0
    for i in range(min(10, len(ini_entries), len(ts_entries))):
        match, diffs = compare_entries(ini_entries[i], ts_entries[i])
        if match:
            first_10_matches += 1
            print(f"Entry {i+1}: ✓ MATCH - {ini_entries[i]['name'][:50]}")
        else:
            print(f"Entry {i+1}: ✗ MISMATCH - {ini_entries[i]['name'][:50]}")
            for diff in diffs[:2]:  # Show only first 2 differences
                print(f"  - {diff[:100]}")

    # Compare last 10
    print(f"\n{'='*70}")
    print(f"LAST 10 ENTRIES VERIFICATION")
    print(f"{'='*70}")
    last_10_matches = 0
    start_idx = max(0, min(len(ini_entries), len(ts_entries)) - 10)
    for i in range(start_idx, min(len(ini_entries), len(ts_entries))):
        match, diffs = compare_entries(ini_entries[i], ts_entries[i])
        if match:
            last_10_matches += 1
            print(f"Entry {i+1}: ✓ MATCH - {ini_entries[i]['name'][:50]}")
        else:
            print(f"Entry {i+1}: ✗ MISMATCH - {ini_entries[i]['name'][:50]}")
            for diff in diffs[:2]:
                print(f"  - {diff[:100]}")

    # Sample random entries
    print(f"\n{'='*70}")
    print(f"RANDOM SAMPLE VERIFICATION (40 entries)")
    print(f"{'='*70}")
    import random
    random.seed(42)  # For reproducibility

    sample_size = min(40, len(ini_entries), len(ts_entries))
    sample_indices = sorted(random.sample(range(min(len(ini_entries), len(ts_entries))), sample_size))

    sample_matches = 0
    sample_mismatches = []

    for idx in sample_indices:
        match, diffs = compare_entries(ini_entries[idx], ts_entries[idx])
        if match:
            sample_matches += 1
        else:
            sample_mismatches.append((idx, ini_entries[idx]['name'], diffs))

    print(f"Matches: {sample_matches}/{sample_size}")
    print(f"Mismatches: {len(sample_mismatches)}/{sample_size}")

    if sample_mismatches:
        print(f"\nMismatch details (first 5):")
        for idx, name, diffs in sample_mismatches[:5]:
            print(f"\nEntry {idx+1}: {name[:60]}")
            for diff in diffs[:2]:
                print(f"  - {diff[:150]}")

    # Full comparison if counts match
    print(f"\n{'='*70}")
    print(f"FULL FILE COMPARISON")
    print(f"{'='*70}")

    total_matches = 0
    all_mismatches = []

    max_compare = min(len(ini_entries), len(ts_entries))
    for i in range(max_compare):
        match, diffs = compare_entries(ini_entries[i], ts_entries[i])
        if match:
            total_matches += 1
        else:
            all_mismatches.append((i, ini_entries[i]['name'], diffs))

    accuracy = (total_matches / max_compare) * 100 if max_compare else 0
    print(f"Total matches: {total_matches}/{max_compare}")
    print(f"Total mismatches: {len(all_mismatches)}/{max_compare}")
    print(f"Accuracy: {accuracy:.2f}%")

    if all_mismatches:
        print(f"\nShowing first 10 mismatches:")
        for idx, name, diffs in all_mismatches[:10]:
            print(f"\nEntry {idx+1} (INI line {ini_entries[idx]['line_num']}): {name[:60]}")
            for diff in diffs[:3]:
                print(f"  - {diff[:150]}")

        if len(all_mismatches) > 10:
            print(f"\n... and {len(all_mismatches) - 10} more mismatches")

    # Pattern analysis
    print(f"\n{'='*70}")
    print(f"PATTERN ANALYSIS")
    print(f"{'='*70}")

    # Check for missing entries
    if len(ini_entries) != len(ts_entries):
        print(f"\nEntry count mismatch detected!")
        if len(ini_entries) > len(ts_entries):
            missing_count = len(ini_entries) - len(ts_entries)
            print(f"Missing {missing_count} entries in TS file")
            print(f"\nMissing entries start from position {len(ts_entries)+1}:")
            for i in range(len(ts_entries), min(len(ts_entries) + 10, len(ini_entries))):
                print(f"  {i+1}. {ini_entries[i]['name'][:70]}")
        else:
            print(f"Extra {len(ts_entries) - len(ini_entries)} entries in TS file")

    # Analyze mismatch patterns
    if all_mismatches:
        name_mismatches = sum(1 for _, _, diffs in all_mismatches if any('Name:' in d for d in diffs))
        status_mismatches = sum(1 for _, _, diffs in all_mismatches if any('Status:' in d for d in diffs))
        source_mismatches = sum(1 for _, _, diffs in all_mismatches if any('Source:' in d for d in diffs))
        desc_mismatches = sum(1 for _, _, diffs in all_mismatches if any('Description:' in d for d in diffs))

        print(f"\nMismatch breakdown:")
        print(f"  Name mismatches:        {name_mismatches}")
        print(f"  Status mismatches:      {status_mismatches}")
        print(f"  Source mismatches:      {source_mismatches}")
        print(f"  Description mismatches: {desc_mismatches}")

    # Summary
    print(f"\n{'='*70}")
    print(f"SUMMARY")
    print(f"{'='*70}")
    print(f"Source entries:           {len(ini_entries)}")
    print(f"Target entries:           {len(ts_entries)}")
    print(f"First 10 match rate:      {first_10_matches}/10 ({first_10_matches*10}%)")
    print(f"Last 10 match rate:       {last_10_matches}/10 ({last_10_matches*10}%)")
    print(f"Sample match rate:        {sample_matches}/{sample_size} ({sample_matches/sample_size*100:.1f}%)")
    print(f"Overall accuracy:         {accuracy:.2f}%")

    # Export results to JSON
    results = {
        'source_count': len(ini_entries),
        'target_count': len(ts_entries),
        'first_10_matches': first_10_matches,
        'last_10_matches': last_10_matches,
        'sample_matches': sample_matches,
        'sample_size': sample_size,
        'sample_match_percentage': (sample_matches/sample_size*100) if sample_size > 0 else 0,
        'total_matches': total_matches,
        'total_mismatches': len(all_mismatches),
        'accuracy_percentage': accuracy,
        'missing_entries': len(ini_entries) - len(ts_entries) if len(ini_entries) > len(ts_entries) else 0
    }

    with open('/home/eli/Documents/hl5047/verification_report.json', 'w', encoding='utf-8') as f:
        json.dump(results, f, ensure_ascii=False, indent=2)

    print(f"\nResults exported to verification_report.json")

if __name__ == '__main__':
    main()
