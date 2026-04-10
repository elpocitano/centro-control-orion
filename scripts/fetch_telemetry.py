import json, re, datetime, sys

try:
    with open('api/raw_response.json') as f:
        data = json.load(f)
    result = data.get('result', '')
    rg_match = re.search(r'RG=\s*([0-9.E+-]+)', result)
    rr_match = re.search(r'RR=\s*([0-9.E+-]+)', result)
    lt_match = re.search(r'LT=\s*([0-9.E+-]+)', result)

    if not rg_match:
        sys.exit(0)

    output = {
        'timestamp': datetime.datetime.now(datetime.timezone.utc).isoformat(),
        'distance_km': float(rg_match.group(1)),
        'velocity_kmh': abs(float(rr_match.group(1)) * 3600),
        'light_time_sec': float(lt_match.group(1)),
        'source': 'NASA JPL Horizons (Live)',
        'status': 'live'
    }
    with open('api/data.json', 'w') as out:
        json.dump(output, out, indent=2)
    print("Success")
except Exception as e:
    print(e)
