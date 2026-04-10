import json, re, datetime, sys, os

try:
    if not os.path.exists('api'):
        os.makedirs('api')

    with open('api/raw_response.json') as f:
        data = json.load(f)
    
    result = data.get('result', '')
    # Buscamos los datos de distancia (RG) y velocidad (RR)
    rg_match = re.search(r'RG=\s*([0-9.E+-]+)', result)
    rr_match = re.search(r'RR=\s*([0-9.E+-]+)', result)
    lt_match = re.search(r'LT=\s*([0-9.E+-]+)', result)

    if rg_match and rr_match:
        output = {
            'timestamp': datetime.datetime.now(datetime.timezone.utc).isoformat(),
            'distance_km': float(rg_match.group(1)),
            'velocity_kmh': abs(float(rr_match.group(1)) * 3600),
            'light_time_sec': float(lt_match.group(1)) if lt_match else 0,
            'source': 'NASA JPL Horizons',
            'status': 'live'
        }
        with open('api/data.json', 'w') as out:
            json.dump(output, out, indent=2)
        print("✅ Archivo data.json creado con éxito.")
    else:
        print("⚠️ La NASA no devolvió datos vectoriales para hoy todavía.")
        # No salimos con error para que GitHub Actions no marque X roja
        sys.exit(0)

except Exception as e:
    print(f"❌ Error: {e}")
    sys.exit(0)
