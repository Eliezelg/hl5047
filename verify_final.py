#!/usr/bin/env python3
"""Final verification script for muktzeh mem.ts"""

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

            parts = line.split(' - ', 1)
            if len(parts) < 2:
                continue

            name = parts[0].strip()
            rest = parts[1]

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
                rest_before = rest[:source_match.start()].strip()
                rest_after = rest[source_match.end():].strip()

                if rest_before.endswith('.'):
                    rest_before = rest_before[:-1].strip()
                entry['status'] = rest_before

                if rest_after.startswith('.'):
                    rest_after = rest_after[1:].strip()
                entry['description'] = rest_after
            else:
                period_pos = rest.find('.')
                if period_pos > 0:
                    entry['status'] = rest[:period_pos].strip()
                    entry['description'] = rest[period_pos+1:].strip()
                else:
                    entry['status'] = rest.strip()

            entries.append(entry)

    return entries

def parse_ts_file_simple(filepath: str) -> List[Dict]:
    """Parse TypeScript file by extracting field values line by line"""
    entries = []
    current_entry = {}

    with open(filepath, 'r', encoding='utf-8') as f:
        for line in f:
            line = line.strip()

            # Check for field patterns
            if 'name:' in line:
                match = re.search(r'name:\s*"((?:[^"\\]|\\.)*)"', line)
                if match:
                    current_entry['name'] = match.group(1).replace('\\"', '"')

            elif 'status:' in line:
                match = re.search(r'status:\s*"((?:[^"\\]|\\.)*)"', line)
                if match:
                    current_entry['status'] = match.group(1).replace('\\"', '"')

            elif 'source:' in line:
                match = re.search(r'source:\s*"((?:[^"\\]|\\.)*)"', line)
                if match:
                    current_entry['source'] = match.group(1).replace('\\"', '"')

            elif 'description:' in line:
                match = re.search(r'description:\s*"((?:[^"\\]|\\.)*)"', line)
                if match:
                    current_entry['description'] = match.group(1).replace('\\"', '"')

            # Check if we've reached the end of an entry
            elif line.startswith('},') or (line == '}' and current_entry):
                if 'name' in current_entry:
                    # Ensure all fields exist
                    if 'status' not in current_entry:
                        current_entry['status'] = ''
                    if 'source' not in current_entry:
                        current_entry['source'] = ''
                    if 'description' not in current_entry:
                        current_entry['description'] = ''

                    entries.append(current_entry)
                    current_entry = {}

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
    """Compare two entries"""
    differences = []

    # Compare name
    ini_name = normalize_text(ini_entry['name'])
    ts_name = normalize_text(ts_entry.get('name', ''))
    if ini_name != ts_name:
        differences.append(f"Name: '{ini_entry['name']}' ≠ '{ts_entry.get('name', '')}'")

    # Compare status
    ini_status = normalize_text(ini_entry['status'])
    ts_status = normalize_text(ts_entry.get('status', ''))
    if ini_status != ts_status:
        differences.append(f"Status: '{ini_entry['status']}' ≠ '{ts_entry.get('status', '')}'")

    # Compare source
    ini_source = normalize_text(ini_entry['source'])
    ts_source = normalize_text(ts_entry.get('source', ''))
    if ini_source != ts_source:
        differences.append(f"Source: '{ini_entry['source']}' ≠ '{ts_entry.get('source', '')}'")

    # Compare description
    ini_desc = normalize_text(ini_entry['description'])
    ts_desc = normalize_text(ts_entry.get('description', ''))
    if ini_desc != ts_desc:
        differences.append(f"Desc: '{ini_entry['description']}' ≠ '{ts_entry.get('description', '')}'")

    return len(differences) == 0, differences

def main():
    ini_file = '/home/eli/Documents/hl5047/docs/mem muktzeh.ini'
    ts_file = '/home/eli/Documents/hl5047/data/muktzeh/letters/mem.ts'

    print("="*80)
    print("MUKTZEH MEM.TS VERIFICATION REPORT")
    print("="*80)

    print("\nParsing files...")
    ini_entries = parse_ini_file(ini_file)
    ts_entries = parse_ts_file_simple(ts_file)

    print(f"\n{'='*80}")
    print(f"ENTRY COUNT")
    print(f"{'='*80}")
    print(f"Source INI file:  {len(ini_entries)} entries")
    print(f"Target TS file:   {len(ts_entries)} entries")
    print(f"Difference:       {abs(len(ini_entries) - len(ts_entries))} entries")

    if len(ini_entries) == len(ts_entries):
        print("✓ Entry count matches perfectly!")
    else:
        if len(ini_entries) > len(ts_entries):
            print(f"✗ {len(ini_entries) - len(ts_entries)} entries missing in TS file")
        else:
            print(f"✗ {len(ts_entries) - len(ini_entries)} extra entries in TS file")

    # Full comparison
    max_compare = min(len(ini_entries), len(ts_entries))
    total_matches = 0
    all_mismatches = []

    for i in range(max_compare):
        match, diffs = compare_entries(ini_entries[i], ts_entries[i])
        if match:
            total_matches += 1
        else:
            all_mismatches.append((i, ini_entries[i]['name'], diffs))

    accuracy = (total_matches / max_compare) * 100 if max_compare else 0

    # First 10 check
    print(f"\n{'='*80}")
    print("FIRST 10 ENTRIES")
    print(f"{'='*80}")
    first_10_matches = 0
    for i in range(min(10, max_compare)):
        match, diffs = compare_entries(ini_entries[i], ts_entries[i])
        if match:
            first_10_matches += 1
            print(f"{i+1:3}. ✓ {ini_entries[i]['name'][:65]}")
        else:
            print(f"{i+1:3}. ✗ {ini_entries[i]['name'][:65]}")
            for diff in diffs[:1]:
                print(f"       {diff[:75]}")

    # Last 10 check
    print(f"\n{'='*80}")
    print("LAST 10 ENTRIES")
    print(f"{'='*80}")
    last_10_matches = 0
    start_idx = max(0, max_compare - 10)
    for i in range(start_idx, max_compare):
        match, diffs = compare_entries(ini_entries[i], ts_entries[i])
        if match:
            last_10_matches += 1
            print(f"{i+1:3}. ✓ {ini_entries[i]['name'][:65]}")
        else:
            print(f"{i+1:3}. ✗ {ini_entries[i]['name'][:65]}")
            for diff in diffs[:1]:
                print(f"       {diff[:75]}")

    # Random sample
    print(f"\n{'='*80}")
    print("RANDOM SAMPLE (40 entries from different sections)")
    print(f"{'='*80}")
    import random
    random.seed(42)
    sample_size = min(40, max_compare)
    sample_indices = sorted(random.sample(range(max_compare), sample_size))

    sample_matches = 0
    for idx in sample_indices:
        match, _ = compare_entries(ini_entries[idx], ts_entries[idx])
        if match:
            sample_matches += 1

    print(f"Sample matches: {sample_matches}/{sample_size} ({sample_matches/sample_size*100:.1f}%)")

    # Overall results
    print(f"\n{'='*80}")
    print("OVERALL ACCURACY")
    print(f"{'='*80}")
    print(f"Total matched entries: {total_matches:,}/{max_compare:,}")
    print(f"Total mismatches:      {len(all_mismatches):,}/{max_compare:,}")
    print(f"Accuracy percentage:   {accuracy:.2f}%")

    # Pattern analysis
    if all_mismatches:
        print(f"\n{'='*80}")
        print("MISMATCH BREAKDOWN")
        print(f"{'='*80}")

        name_mismatches = sum(1 for _, _, diffs in all_mismatches if any('Name:' in d for d in diffs))
        status_mismatches = sum(1 for _, _, diffs in all_mismatches if any('Status:' in d for d in diffs))
        source_mismatches = sum(1 for _, _, diffs in all_mismatches if any('Source:' in d for d in diffs))
        desc_mismatches = sum(1 for _, _, diffs in all_mismatches if any('Desc:' in d for d in diffs))

        print(f"Name field issues:        {name_mismatches:3} ({name_mismatches/max_compare*100:5.1f}%)")
        print(f"Status field issues:      {status_mismatches:3} ({status_mismatches/max_compare*100:5.1f}%)")
        print(f"Source field issues:      {source_mismatches:3} ({source_mismatches/max_compare*100:5.1f}%)")
        print(f"Description field issues: {desc_mismatches:3} ({desc_mismatches/max_compare*100:5.1f}%)")

        # Show some examples
        print(f"\n{'='*80}")
        print("EXAMPLE MISMATCHES (first 10)")
        print(f"{'='*80}")
        for idx, name, diffs in all_mismatches[:10]:
            print(f"\n#{idx+1} (INI line {ini_entries[idx]['line_num']}): {name}")
            for diff in diffs[:2]:
                print(f"  • {diff}")

    # Missing entries
    if len(ini_entries) > len(ts_entries):
        print(f"\n{'='*80}")
        print(f"MISSING ENTRIES IN TS FILE ({len(ini_entries) - len(ts_entries)} total)")
        print(f"{'='*80}")
        print("First 20 missing entries:")
        for i in range(len(ts_entries), min(len(ts_entries) + 20, len(ini_entries))):
            print(f"  {i+1:3}. {ini_entries[i]['name']}")

    # Summary
    print(f"\n{'='*80}")
    print("SUMMARY")
    print(f"{'='*80}")
    print(f"Total source entries:     {len(ini_entries)}")
    print(f"Total target entries:     {len(ts_entries)}")
    print(f"Entry count match:        {'YES ✓' if len(ini_entries) == len(ts_entries) else 'NO ✗'}")
    print(f"First 10 match rate:      {first_10_matches}/10 ({first_10_matches*10}%)")
    print(f"Last 10 match rate:       {last_10_matches}/10 ({last_10_matches*10}%)")
    print(f"Sample match rate:        {sample_matches}/{sample_size} ({sample_matches/sample_size*100:.1f}%)")
    print(f"Overall accuracy:         {accuracy:.2f}%")

    if accuracy >= 95:
        quality = "EXCELLENT ✓✓✓"
    elif accuracy >= 85:
        quality = "GOOD ✓✓ (minor issues)"
    elif accuracy >= 70:
        quality = "FAIR ✓ (moderate issues)"
    else:
        quality = "POOR ✗ (significant issues)"

    print(f"\nQuality Assessment:       {quality}")

    # Export results
    results = {
        'source_count': len(ini_entries),
        'target_count': len(ts_entries),
        'entry_count_match': len(ini_entries) == len(ts_entries),
        'first_10_matches': first_10_matches,
        'last_10_matches': last_10_matches,
        'sample_matches': sample_matches,
        'sample_size': sample_size,
        'sample_match_percentage': (sample_matches/sample_size*100) if sample_size > 0 else 0,
        'total_matches': total_matches,
        'total_mismatches': len(all_mismatches),
        'accuracy_percentage': accuracy,
        'missing_entries': max(0, len(ini_entries) - len(ts_entries)),
        'extra_entries': max(0, len(ts_entries) - len(ini_entries)),
        'quality': quality
    }

    if all_mismatches:
        results['mismatch_types'] = {
            'name': name_mismatches,
            'status': status_mismatches,
            'source': source_mismatches,
            'description': desc_mismatches
        }

    with open('/home/eli/Documents/hl5047/verification_report.json', 'w', encoding='utf-8') as f:
        json.dump(results, f, ensure_ascii=False, indent=2)

    print(f"\n{'='*80}")
    print("Detailed results saved to: verification_report.json")
    print(f"{'='*80}\n")

if __name__ == '__main__':
    main()
