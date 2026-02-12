
import re

raw_data = """24 Hrs Urinary Albumin	210
24 Hrs Urinary Calcium	210
24 Hrs Urinary Calcium	210
24 Hrs Urinary Electrolyte	630
24 HRS URINARY URIC ACID	210
24 Hrs Urine Chloride	320
24 HRS URINE CREATININE	210
24 Hrs Urine Creatinine Clearance	320
24 Hrs Urine Magnesium	630
24 Hrs Urine Magnesium	320
24 HRS Urine Phosphorous	210
24 Hrs Urine Sodium	320
24 Hrs Urine Urea	320
24 HRS Urine Uric Acid	210
24 Hrs. Urine Albumin	400
24 Hrs. Urine Protein	370
24 Hrs. urine stone analysis	4200
24 Hrs.Urine Albumin/Creatinine Ratio	400
24 Hrs.Urine Calcium/Creatinine Ratio	320
24Hrs Urine Potassium	320
5 DRUGS SENSITIVITY	2630
ABG	2000
Absolute Basophils Count (ABC)	210
Absolute Eosinophil Count (AEC)	210
Absolute Lymphocyte Count (ALC)	210
Absolute Monocytes Count (AMC)	210
Absolute Neutrophil Count (ANC)	210
Absolute Reticulocyte Count (ARC)	210
Activated Partial Thromboplastin Time	380
AFB CUTURE  DRUGS PANEL	5250
AFB SUSCEPTIBILITY 10 DRUG PANEL	4200
Air Culture	530
Albumin (Serum)	160
Alfa Feto Protein (AFP) Fluid	790
Alfa Feto Protein (AFP) Serum	790
ALKALI DENATURATION TEST (ADT)	370
Alkaline Phosphatase	190
ALLERGY PANEL-1 BASIC (27 ALLERGENS)	2600
ALLERGY PANEL-2 PREMIUM (40 ALLERGEN)	3360
ALLERGY PANEL-3 COMPREHENSIVE	4200
Amylase	530
Anaerobic Blood Culture	1580
Anaerobic Swab Culture	1580
Anemia Profile	2520
Anion Gap	1260
Anti - CCP	1700
Anti Cardiolipin Antibodies (IgG)	790
Anti Cardiolipin Antibodies (IgM)	790
Anti HAV IgM	790
Anti HBe	790
Anti HBs	790
Anti HCV	420
Anti HEV IgG	790
Anti HEV IgM	790
ANTI MULLERIAN HORMONE	2300
Anti Nuclear Antibody (ANA)	840
Anti Phospholipid Antibodies (IgG)	790
Anti Phospholipid Antibodies (IgM)	790
Anti SARS-COV-2 IgG	1250
Anti Thyroglobulin Antibody	790
Anti Thyroid Antibody	1160
Anti Thyroid Peroxidase Antibody	790
Antistreptolysin O Titre (ASO)	420
APLA PROFILE	5350
Appavisc Solution Culture	530
Arneth count	160
Arthritis Profile	3830
Ascitic Fluid Biochemistry	320
Ascitic Fluid Culture & Sensitivity	530
Ascitic Fluid Cytology	320
Ascitic Fluid For ADA	420
Ascitic Fluid for Albumin	320
Ascitic fluid for bilirubin	130
Ascitic Fluid for LDH	420
ASLO QUALITATIVE	350
ATT DRUG SENSITIVITY  TEST	5250
Autologus	110
BAL Culture & Sensitivity	530
BAL For Biochemistry	320
BAL For Cytology	530
Bicarbonate (HCO3)	630
Bilirubin-Direct	170
Bilirubin-Indirect	160
Bilirubin-Total	170
Bilirubin-Total ( T & D )	300
Biopsy for AFB	320
Biopsy For Second Opinion 1	1050
Biopsy For Second Opinion 2-4	1580
Biopsy For Second Opinion 5	2100
Biopsy Large	1400
Biopsy Large Complex	2100
Biopsy Medium	1150
Biopsy Small	850
Bleeding Time	50
Blood Bag Culture & Sensitivity	530
Blood Glucose (Fasting)	50
Blood Glucose (PP)	50
Blood Glucose (Random)	50
Blood Glucose 1hrs.	50
Blood Glucose 2hrs.	40
Blood Group ABO	110
Blood Urea Nitrogen (BUN)	110
Body  fluid for bilirubin	130
Body Fluid  Bile Pigment (BP)	110
Body Fluid  Bile Salt (BS)	60
Body Fluid Bile Pigment (BP)	110
Body Fluid Biochemistry	320
Body Fluid Culture & Sensitivity	530
Body Fluid Cytology	420
Body Fluid For ADA	420
Body Fluid KOH	210
BOH Profile	11550
Bone Culture & Sensitivity	530
Bone Health Screening	1310
Bone Marrow Aspiration Cytology	1260
Bone Marrow Biopsy Small	1580
Botanical cafe Packge	370
Bronchial Brushing Cytology	470
Bronchial Fluid Culture & Sensitivity	530
Bronchial Washing  Cytology	370
Buffy Coat for LD Bodies	210
CA - 125 (Ovary)	790
CA 15.3	790
Calcium	170
Calcium-Ionic	170
Calrctinin	1260
CAPD Fluid For Creatinine	470
CAPD Fluid For Cyto	320
CAPD Fluid For Sugar	260
Carcino Emryonic Antigen (CEA)	790
CARDIAC HEALTH SCREEN BASIC-1199	1260
CARDIAC HEALTH SCREEN EXTENSIVE-4999	5250
CARDIAC HEALTH SCREEN PLUS	2100
Cardiac Risk Check	2100
CBC	320
CBC / HAEMOGRAM + ESR	420
CBC/ HAEMOGRAM+PBF	420
Cell Block Preparation	580
CERVICAL CANCER SCREENING	2950
Chloride	190
Chloride-CSF	210
Chloride-Fluid	210
Cholesterol LDL / HDL Ratio	260
Cholesterol Total	170
Cholesterol Total / HDL Ratio	260
Clot Retraction Time (CRT)	110
Clotting Time	50
Coagulation Profile	1580
Comprehensive Health Checkup (Female)	10500
Comprehensive Health Checkup (Male)	10500
Corneal Scrapping Culture & Sensitivity	530
Cpk Total	450
CPK-MB	450
Creatinine	160
CRP Quantitative	500
CRP-High Senstivity	500
CSF Culture & Sensitivity	530
CSF For ADA	370
CSF For Albumin	260
CSF For Ammonia	950
CSF For Billrubin	260
CSF For Biochemistry	320
CSF For Cytology	420
CSF For LDH	370
CSF For Xanthochromia	300
CSF GRAM STAIN	130
CSF Indian INK Stain	300
CSF KOH	110
Culture Aerobic,Biological Indicater	530
Culture Report Other	530
Culture Report Stool	530
Culture Report Urine	530
Cytology Report	580
Cytomegalo Virus IgG	390
Cytomegalo Virus IgG URINE	370
Cytomegalo Virus IgM	390
Cytomegalo Virus IgM URINE	370
D - Dimer	1470
Dengue Antigen & Antibody	1580
Dengue Antigen & Antibody	1580
Dengue IgG & IgM	850
Dengue IgG ELISA	1260
Dengue IgM	850
Dengue IgM ELISA	1260
Dengue NS1 ELISA	1260
Dengue NS1Ag	840
DHEA SULPHATE	750
Diabetes Plus	1890
Differential Leucocyte Count	110
Digital Image Microscopy (1-5)	530
Direct Coombs Test	260
DOG-CBC	420
DOG-CBC/ HAEMOGRAM+PBF	420
Double Marker Screning Test	2500
E.T. Culture & Sensitivity	530
EBNA CYTOLOGY	470
EBUS BIOPSY	2100
EBUS CYTOLOGY	1050
Electrolytes Serum	630
ER/PR/Her-2 neu	5250
ESR	60
ESTIMATED GFR	160
Estradiol (E2)	740
Estriol Unconjugated (E3)	740
Estrogen Receptors ER/Progesterone Recep	3470
EXECUTIVE PLUS	3150
Executive Premium	3680
FENA TEST	890
Ferritin	740
FEVER PROFILE	2600
Fluid for (CEA)	740
Fluid for Albumin	260
Fluid for Alkaline Phosphatase	160
Fluid For Amylase	420
Fluid for cholesterol	260
Fluid for Creatinine	110
Fluid for LDH	370
Fluid For Lipase	530
Fluid for Protein	110
Fluid for Specific Gravity	50
Fluid For Sugar	50
Fluid for Triglycerides	260
Fluid for Uric Acid	160
Fluid PH	110
FNAC	790
FNAC - USG GUIDED	1300
FNAC For Second Opinion	840
Follicle Stimulating Hormone	470
Free BHCG	1050
Free PSA	950
Free PSA/ Total PSA Ratio	1680
Free T3	420
Free T4	420
Fructose (Qualitative)	160
FSH/LH/PROLACTIN	1370
Fungal Smear	320
G6PD (Quantitative)	530
Gastric aspiration for Occult Blood	160
Gene Expert Test	3700
GGTP	370
Globulin	180
Glucose Tolerance Test (GTT)	350
Good Health Plan (Female)	5250
Good Health Plan (Male)	5250
Gram Stain	160
Gram Stain ( BAL )	160
Gram Stain (Ascitic Fluid)	160
Gram Stain (Body Fluid)	160
Gram Stain (CSF)	160
Gram Stain (Pericardial Fluid)	160
Gram Stain (Pleural Fluid)	160
Gram Stain (Pleural Pus)	160
Gram Stain (Pus)	160
Gram Stain (Sputum)	160
Gram Stain (Swab)	160
Gram Stain (Urethral Smear)	160
Gram Stain (Urine)	160
Gram Stain (Vitreous)	160
GUIDED BIOPSY PANEL	4700
Haemoglobin (Hb)	110
HAEMOPHILIA PROFILE	4200
Hairs Scrapping KOH	130
HB Core IgM	790
HbA1c	600
HBe Antigen	790
HBs Ag	350
HBs Ag-ELISA	790
HCT/Hematocrit (Fluid )	110
HDL Cholesterol	210
Health Check Up Profile	1050
HEALTH PACKAGE MRCC	4250
HEALTH PANEL SCREENENING	2600
Hepatitis Profile	1570
Her-2/Neu (CErB2)-IHC	2100
Herpes Simplex Virus 1 & 2 IgG	390
Herpes Simplex Virus 1 & 2 IgM	390
Herpes Simplex Virus 1&2 IgG CSF	390
Herpes Simplex Virus 1&2 IgM CSF	390
HILLS N DUNES Health Package	630
Historiya Royal Health Package	630
HIV 1 & 2  Antibody	420
HIV 1 & 2 Antibody	420
HIV Combo	470
HIV DUO	470
HIV Elisa	530
HLA-B27	2100
HPV DNA PCR	4200
HPV DNA PCR + PAP (LBC)	2940
HSV DNA PCR	6830
I/T Ratio	210
IgG to Chikungunya (Elisa)	790
IgM to Chikungunya	790
IgM to Chikungunya (ELISA)	790
IL - 6 LEVEL	2850
Indian INK Stain	290
Indirect Coombs Test	260
Infection Control Culture	530
INFERTILITY FEMALE PANEL	4200
INFERTILITY MALE PANEL	4200
Inhibin -A	2100
Insulin	500
Insulin Fasting	500
Insulin PP	500
iPTH Intact	1250
Iron	440
IRON PROFILE	2300
IRON PROFILE SCREEN	1580
KOH Mount	210
Lactate	1050
Lactate Dehydrogenase (LDH)	470
Lactate-CSF	1050
LBC (GENITAL PAP SMEAR)	1260
LDL Cholesterol	260
LE Cell Phenomenon	230
Leptospira IgG	1260
Leptospira IgM	1260
LH / FSH RATIO	950
Lipase	530
Lipid Profile	680
Liver Abscess Biochemistry	320
Liver Abscess Cytology	320
Liver Abscess For ADA	370
Liver Function Test	720
LUNG CARCINOMA PROFILE	15750
Luteinising Hormone (LH)	470
Magnesium	420
Malarial Parasite By QBC	270
Malarial Parasite Card	250
Malarial Parasite Identification	160
MDR FOR TB	3350
Mean Corp. Hb (MCH)	160
Mean Corp. Hb Con. (MCHC)	160
Mean Corp. Volume (MCV)	160
Medicine Culture & Sensitivity	530
Mesh Culture & Sensitivity	530
Micro Filaria-Blood Smear	260
MIGRANE PROFILE	3600
Milk Culture & Sensitivity	530
Montoux Test	160
MOTHERS HEALTH PACKAGE	2100
Nails Scrapping KOH	210
Neutrophil to Lymphocyte Ratio	110
NEW BORN SCREENING  ( 3 Conditions)	1050
NT Pro BNP	2520
NTC VENTURES PACKAGE	1680
Obesity Profile	3040
Opthalmic Irrigating Solution Culture	530
Oral Cytology	420
Oral Glucose Challenge Test(OGCT) 01 Hrs	190
Oral Glucose Challenge Test(OGCT)02 Hrs	190
Osmotic Fragility Test	420
OT Culture & Sensitivity	530
PAP SMEAR CYTO	580
PAPP - A	1260
Paraffin Block For Opinion	370
PCR HEPATITIS 'C'VIRUS(QUANTITATIVE)	5250
PCR(DNA)HEPATITIS 'B'VIRUS(QUALITATIVE)	4750
PCV/Hematocrit (HCT)	110
Pericadial Fluid For ADA	370
Pericardial  Fluid for LDH	370
Pericardial Fluid Biochemistry	290
Pericardial Fluid Culture & Sensitivity	530
Pericardial Fluid Cytology	290
Peripheral Blood Smear ( PBF)	260
Peritoneal  Fluid/Serum Billrubin	320
Peritoneal Fluid Biochemistry	320
Peritoneal Fluid Culture & Sensitivity	530
Peritoneal Fluid Cytology	320
Peritoneal Fluid For ADA	420
Peritoneal Fluid For Billrubin	150
PH	70
Phosphorus	160
Platelet Count	210
Platelet Morphology	210
Pleural Brushing	470
Pleural Fluid Biochemistry	320
Pleural Fluid Culture & Sensitivity	530
Pleural Fluid Cytology	420
Pleural Fluid For ADA	370
Pleural Fluid for cholesterol	260
Pleural Fluid for LDH	370
Pleural Fluid for Triglycerides	260
Pleural Fluid KOH	210
Pleural Pus Biochemistry	290
Pleural Pus For Cytology	290
POI-1st	840
Post FOB Cytology	420
Potassium	210
Potassium -Fluid	210
Pre Endoscopy Profile	530
Pre Oprative Profile	1150
Pregnancy profile	2700
Procalcitonin(PCT)	2210
Progesterone	790
Prolactin	470
Protein-CSF	190
Protein-Total	170
Prothrombin Time With INR	230
Protien ( A/G Ratio)	260
PRP Test	1680
PTH	1260
Pus Culture & Sensitivity	530
Pus For ADA	420
Pus For Biochemistry	320
Pus For Cytology	420
Quadruple Test Screening	3400
R.A. Quantitative	420
Rapid B.A.L. Fungal Culture	1580
Rapid Blood Arobic & Fungal Culture	1900
Rapid Blood Culture & Sensitivity	1900
Rapid Body Fluids Culture & Sensitivity	1600
Rapid CSF Aerobic & Fungal Culture	1600
Rapid CSF Culture & Sensitivity	1600
Rapid Ear Swab Culture & Sensitivity	1600
Rapid Endotracheal/Catheter Tips Culture	1600
Rapid fungal Blood Culture & Sensitivity	1600
Rapid Fungal Culture	1600
Rapid Nasal Swab Culture & Sensitivity	1600
Rapid OT Culture & Sensitivity	1600
Rapid Pus Culture & Sensitivity	1600
Rapid Semen Culture & Sensitivity	1600
Rapid Sputum Aerobic Fungal Culture	1600
Rapid Sputum Anaerobic Culture	1600
Rapid Sputum Nocardia Culture	1600
Rapid Stool Culture & Sensitivity	1400
Rapid Swab Culture & Sensitivity	1580
Rapid Throat Swab Culture & Sensitivity	1580
Rapid Tip Culture & Sensitivity	1580
Rapid Urine AFB Culture	1580
Rapid Urine Culture & Sensitivity	950
Rapid Vaginal Swab Culture & Sensitivity	1580
Rapid Water Culture	1050
Red Cell Distribution Width (RDW)	170
Regent Culture & Sensitivity	530
Renal Function Test RFT	580
Reticulocyte Count	190
Rh Antibody Titre	420
Routine Fungal Culture (Aerobic)	530
Rubella IgG	390
Rubella IgM	390
SAAG (Serum  Albumin Ascites Gradient)	530
Salmonella Typhi IgG	230
Salmonella Typhi IgM	240
Scalp Scrapping KOH	210
Scrub Typhus Rapid Test	1310
SEMEN ANALYSIS	320
Semen Culture & Sensitivity	580
SEMEN WASH	2300
SEPSIS SREEN	600
Serum ADA	370
Serum Cortisol	790
Serum Creatinine Clearance	210
Settle Plate Culture & Sensitivity	530
SGOT	160
SGPT	160
Sickling Test	210
Skin Scrapping for AFB	210
Skin Scrapping KOH	210
Smear for Babesia	260
Smear for Fungal Elements	210
Sodium	210
Sodium -Fluid	210
Spot Urinary Calcium	210
Spot Urinary Urea	210
Spot Urine Calcium/Creatinine Ratio	320
Spot Urine Phosphorus/Creatinine Ratio	210
Sputum Culture & Sensitivity	530
Sputum Cytology	320
Sputum Examination for Nocardia	210
Sputum For GENEXPERT / XDR RESISTANCE	4200
Sputum KOH	210
Sputum Occult Blood	160
Stained HP/Cytology Slides For Opinion	1580
Stool Analysis	320
Stool Culture & Sensitivity	580
Stool for Cryptosporidium	160
STOOL FOR FAT GLOBULES	160
Stool for Fungal elements	110
Stool For Hanging Drop	160
Stool Occult Blood	160
Stool PH	170
Stool Reducing Sugar	160
SUPER HEALTH PACKAGE 7	6300
Swab Culture	530
Swab Culture & Sensitivity	530
Swab KOH	110
Synovial Fluid Biochemistry	320
Synovial Fluid Culture & Sensitivity	530
Synovial Fluid Cytology	320
Synovial Fluid For ADA	420
Synovial fluid gram stain	130
TB (Quantiferon) IGRA	2600
TB PCR (DNA) MTB (C.S.F.)	2600
TB PCR (DNA) MTB (Menstrual Blood)	2600
TB PCR (DNA) MTB (Pus)	2600
TB PCR (DNA) MTB (Tissue)	2600
TB PCR (DNA) MTB Body Fluid	2600
TB PCR (DNA) MTB Semen	2600
TB PCR (DNA)MTB (BAL)	2600
TB PCR (DNA)MTB Urine	2600
TB PCR DNA MTB (Sputum)	2600
TBNA CYTOLOGY	530
Throat  Swab For  KLB (Albert stain )	190
Throat Swab Culture & Sensitivity	530
Thyroid Function Test	580
TIP Culture & Sensitivity	530
Tissue Culture & Sensitivity	530
Tissue Processing (Blocks & Slides)	530
TLC/DLC	170
Torch IgG	1150
Torch IgM	1150
Total IgE	680
Total Iron Binding Capicity (TIBC)	420
Total Leucocyte Count (TLC)	170
Total PSA	630
Total Red Blood Cell Count (RBC)	170
Total T3	210
Total T4	210
Total Testosterone	630
Toxoplasma IgG	390
Toxoplasma IgM	390
TPHA	260
TPHA -CSF	260
TPHA Quantitative	630
Triglycerides	210
Triple Marker Screening With Graph	2500
Troponin- I	840
Troponin- I FIA	840
Troponin T hs	840
TSH	320
TTG Antibody IgA	1000
Typhi Dot IgG/IgM	420
TZANCK SMEAR	630
UIBC	320
URE 24 HRS MICROALBUMIN	350
URE 24 HRS PROTEIN:CREATININE RATIO	630
Urea	130
Urethral Smear Gonococci	110
Uric Acid	190
Urine Albumin	70
Urine Albumin/Creatinine Ratio	420
Urine Analysis	150
Urine Bence Jones Protein	320
Urine Bile Pigment (BP)	70
Urine Bile Salt (BS)	70
Urine Chyle	320
Urine Cotinine	1050
Urine Culture & Sensitivity	530
Urine for Amylase	420
Urine for Dysmorphic RBC	130
Urine For Fat Globules	110
Urine for Fungal elements	160
Urine for Occult Blood	70
Urine For Pregnancy Test	110
Urine for RBC	110
Urine for Spermatozoa	110
Urine Hemoglobunuria	60
Urine Ketone Bodies	70
Urine Protein/Creatinine Ratio	320
Urine Reducing Sugar	110
Urine Specific Gravity	70
Urine Spot Chloride	320
Urine Spot Creatinine	210
Urine Spot Magnesium	630
Urine Spot Microalbumin	320
Urine Spot Phosphorus	320
Urine Spot Potassium	320
Urine Spot Sodium	320
Urine Spot Total Protein	320
Urine Sugar	50
Urine Sugar (Fasting)	50
Urine Sugar (PP)	50
UROFLOMETERY	700
V.E.C.	190
Vaginal Swab Culture & Sensitivity	580
Vasculitis Profile	6620
VBG	1900
VDRL	210
VDRL In Dilution	530
VDRL In Dilution-CSF	530
VIRAL FEVER PANEL 1	1290
VIRAL FEVER PANEL 2	4140
Vitamin B12	950
Vitamin D Total (25-Hydroxy)	1700
Vitamin Vita Health	1890
Vitreous Fluid KOH	110
VLDL Cholesterol	160
WBCT-20  (On Spot)	110
Wet mount	160
WHOLE BLOOD CLOTTING TEST(WBCT)	320
Widal Test Slide	190
Widal Tube Test	320
Z N Stain (Ascitic Fluid) for AFB	150
Z N Stain (Bro.Secretion) for AFB	150
Z N Stain (Cryptosporidium) for AFB	160
Z N Stain (CSF) for AFB	150
Z N Stain (Liver Abscess) for AFB	150
Z N Stain (Menstrual Blood) for AFB	150
Z N Stain (Nasal Smear) for AFB	150
Z N Stain (Pericardial Fluid) for AFB	150
Z N Stain (Peritoneal Fluid) for AFB	150
Z N Stain (Pleural Brushing) for AFB	150
Z N Stain (Pleural Fluid) for AFB	150
Z N Stain (Pleural Pus) for AFB	150
Z N Stain (Pus) for AFB	150
Z N Stain (Semen) for AFB	150
Z N Stain (Sputum) for AFB	150
Z N Stain (Suction Tip) for AFB	150
Z N Stain (Swab) for AFB	150
Z N Stain (Synovial Fluid) for AFB	150
Z N Stain (Tracheal Asp.) for AFB	150
Z N Stain (Urine) for AFB	150
Z N Stain for AFB	150
βETA - HCG (βHCG)	800
Allergy Drugs Only	1600"""

lines = raw_data.strip().split('\n')
services = []

def get_category(name):
    lower_name = name.lower()
    if any(k in lower_name for k in ['test', 'profile', 'culture', 'stain', 'smear', 'analysis', 'count', 'serum', 'urine', 'fluid', 'aspirat', 'cytology', 'pcr', 'elisa', 'hemogram', 'blood']):
        return 'LAB_TEST'
    if any(k in lower_name for k in ['x-ray', 'xray', 'ct scan', 'mri', 'usg', 'ultrasound', 'doppler']):
        return 'XRAY'
    if any(k in lower_name for k in ['biopsy', 'fnac', 'aspirat', 'drainage', 'dressing', 'suture', 'removal']):
        return 'PROCEDURE'
    return 'LAB_TEST' # Default to LAB_TEST as most items seem to be labs

seen_names = set()

for line in lines:
    parts = line.split('\t')
    if len(parts) >= 2:
        name = parts[0].strip()
        if name in seen_names:
            continue
        seen_names.add(name)
        
        try:
            price = float(re.sub(r'[^\d.]', '', parts[1]))
        except ValueError:
            continue
            
        category = get_category(name)
        services.append({
            'name': name,
            'category': category,
            'defaultPrice': price
        })

# Generate TypeScript file
ts_content = """export interface MedicalService {
  name: string;
  category: 'LAB_TEST' | 'XRAY' | 'PROCEDURE' | 'MEDICINE' | 'SERVICE';
  defaultPrice: number;
}

export const MEDICAL_SERVICES_DATA: MedicalService[] = [
"""

for service in services:
    ts_content += f"  {{ name: `{service['name']}`, category: '{service['category']}', defaultPrice: {service['defaultPrice']} }},\n"

ts_content += "];\n"

with open('src/data/medicalServices.ts', 'w') as f:
    f.write(ts_content)

print(f"Generated src/data/medicalServices.ts with {len(services)} services.")
