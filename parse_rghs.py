
import re

def parse_rghs_list(file_path):
    packages = []
    current_category = "GENERAL"
    count = 100  # Starting ID

    with open(file_path, 'r') as f:
        for line in f:
            line = line.strip()
            if not line:
                continue
            
            # Check if it's a category header (ALL CAPS)
            if line.isupper() and "PROCEDURES" in line or line.isupper() and "/" in line:
                current_category = line.split("PROCEDURES")[0].strip().replace("/", "_").replace(" ", "_").upper()
                continue
            
            # Parse line: Name – Rate – Rate – Rate – Rate
            # Regex to find the rates at the end
            parts = line.split(' – ')
            if len(parts) >= 2:
                name = parts[0].strip()
                # Rates are the subsequent parts. We'll take the first one as standard rate
                try:
                    rate = int(parts[1].strip())
                except ValueError:
                    continue # Skip if rate is not a number

                code = f"RGHS-{count:03d}"
                count += 1

                packages.append({
                    "id": f"pkg_{code.lower()}",
                    "code": code,
                    "name": name,
                    "rate": rate,
                    "category": current_category,
                    "description": name
                })

    return packages

def generate_ts_file(packages, output_file):
    ts_content = """
export interface RGHSPackage {
  id: string;
  code: string;
  name: string;
  rate: number;
  category: string;
  description?: string;
}

export const RGHS_PACKAGES_DATA: RGHSPackage[] = [
"""
    
    for pkg in packages:
        ts_content += "  {\n"
        ts_content += f"    id: '{pkg['id']}',\n"
        ts_content += f"    code: '{pkg['code']}',\n"
        ts_content += f"    name: \"{pkg['name']}\",\n"
        ts_content += f"    rate: {pkg['rate']},\n"
        ts_content += f"    category: '{pkg['category']}',\n"
        ts_content += f"    description: \"{pkg['description']}\"\n"
        ts_content += "  },\n"
    
    ts_content += "];\n"

    with open(output_file, 'w') as f:
        f.write(ts_content)

packages = parse_rghs_list('temp_rghs_list.txt')
generate_ts_file(packages, 'src/data/rghsPackages.ts')
print(f"Generated {len(packages)} packages.")
