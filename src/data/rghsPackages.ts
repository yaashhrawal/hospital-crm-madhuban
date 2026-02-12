
export interface RGHSPackage {
  id: string;
  code: string;
  name: string;
  rate: number;
  category: string;
  description?: string;
}

export const RGHS_PACKAGES_DATA: RGHSPackage[] = [
  {
    id: 'pkg_rghs-100',
    code: 'RGHS-100',
    name: "Consultation OPD",
    rate: 135,
    category: 'GENERAL___SKIN',
    description: "Consultation OPD"
  },
  {
    id: 'pkg_rghs-101',
    code: 'RGHS-101',
    name: "Consultation for Inpatients",
    rate: 270,
    category: 'GENERAL___SKIN',
    description: "Consultation for Inpatients"
  },
  {
    id: 'pkg_rghs-102',
    code: 'RGHS-102',
    name: "Dressings of wounds",
    rate: 58,
    category: 'GENERAL___SKIN',
    description: "Dressings of wounds"
  },
  {
    id: 'pkg_rghs-103',
    code: 'RGHS-103',
    name: "Suturing of wounds with local anesthesia",
    rate: 112,
    category: 'GENERAL___SKIN',
    description: "Suturing of wounds with local anesthesia"
  },
  {
    id: 'pkg_rghs-104',
    code: 'RGHS-104',
    name: "Aspiration Pleural Effusion (Diagnostic)",
    rate: 138,
    category: 'GENERAL___SKIN',
    description: "Aspiration Pleural Effusion (Diagnostic)"
  },
  {
    id: 'pkg_rghs-105',
    code: 'RGHS-105',
    name: "Aspiration Pleural Effusion (Therapeutic)",
    rate: 200,
    category: 'GENERAL___SKIN',
    description: "Aspiration Pleural Effusion (Therapeutic)"
  },
  {
    id: 'pkg_rghs-106',
    code: 'RGHS-106',
    name: "Abdominal Aspiration (Diagnostic)",
    rate: 358,
    category: 'GENERAL___SKIN',
    description: "Abdominal Aspiration (Diagnostic)"
  },
  {
    id: 'pkg_rghs-107',
    code: 'RGHS-107',
    name: "Abdominal Aspiration (Therapeutic)",
    rate: 476,
    category: 'GENERAL___SKIN',
    description: "Abdominal Aspiration (Therapeutic)"
  },
  {
    id: 'pkg_rghs-108',
    code: 'RGHS-108',
    name: "Pericardial Aspiration",
    rate: 393,
    category: 'GENERAL___SKIN',
    description: "Pericardial Aspiration"
  },
  {
    id: 'pkg_rghs-109',
    code: 'RGHS-109',
    name: "Joint Aspiration",
    rate: 328,
    category: 'GENERAL___SKIN',
    description: "Joint Aspiration"
  },
  {
    id: 'pkg_rghs-110',
    code: 'RGHS-110',
    name: "Skin Biopsy",
    rate: 238,
    category: 'GENERAL___SKIN',
    description: "Skin Biopsy"
  },
  {
    id: 'pkg_rghs-111',
    code: 'RGHS-111',
    name: "Removal of stitches",
    rate: 37,
    category: 'GENERAL___SKIN',
    description: "Removal of stitches"
  },
  {
    id: 'pkg_rghs-112',
    code: 'RGHS-112',
    name: "Venesection",
    rate: 129,
    category: 'GENERAL___SKIN',
    description: "Venesection"
  },
  {
    id: 'pkg_rghs-113',
    code: 'RGHS-113',
    name: "Phimosis under LA",
    rate: 1357,
    category: 'GENERAL___SKIN',
    description: "Phimosis under LA"
  },
  {
    id: 'pkg_rghs-114',
    code: 'RGHS-114',
    name: "Sternal puncture",
    rate: 179,
    category: 'GENERAL___SKIN',
    description: "Sternal puncture"
  },
  {
    id: 'pkg_rghs-115',
    code: 'RGHS-115',
    name: "Injection for haemorrhoids",
    rate: 429,
    category: 'GENERAL___SKIN',
    description: "Injection for haemorrhoids"
  },
  {
    id: 'pkg_rghs-116',
    code: 'RGHS-116',
    name: "Injection for varicose veins",
    rate: 362,
    category: 'GENERAL___SKIN',
    description: "Injection for varicose veins"
  },
  {
    id: 'pkg_rghs-117',
    code: 'RGHS-117',
    name: "Catheterisation",
    rate: 500,
    category: 'GENERAL___SKIN',
    description: "Catheterisation"
  },
  {
    id: 'pkg_rghs-118',
    code: 'RGHS-118',
    name: "Dilatation of urethra",
    rate: 518,
    category: 'GENERAL___SKIN',
    description: "Dilatation of urethra"
  },
  {
    id: 'pkg_rghs-119',
    code: 'RGHS-119',
    name: "Incision and drainage",
    rate: 449,
    category: 'GENERAL___SKIN',
    description: "Incision and drainage"
  },
  {
    id: 'pkg_rghs-120',
    code: 'RGHS-120',
    name: "Intercostal drainage",
    rate: 130,
    category: 'GENERAL___SKIN',
    description: "Intercostal drainage"
  },
  {
    id: 'pkg_rghs-121',
    code: 'RGHS-121',
    name: "Peritoneal dialysis",
    rate: 1517,
    category: 'GENERAL___SKIN',
    description: "Peritoneal dialysis"
  },
  {
    id: 'pkg_rghs-122',
    code: 'RGHS-122',
    name: "Excision of moles",
    rate: 358,
    category: 'GENERAL___SKIN',
    description: "Excision of moles"
  },
  {
    id: 'pkg_rghs-123',
    code: 'RGHS-123',
    name: "Excision of warts",
    rate: 321,
    category: 'GENERAL___SKIN',
    description: "Excision of warts"
  },
  {
    id: 'pkg_rghs-124',
    code: 'RGHS-124',
    name: "Excision of molluscum contagiosum",
    rate: 135,
    category: 'GENERAL___SKIN',
    description: "Excision of molluscum contagiosum"
  },
  {
    id: 'pkg_rghs-125',
    code: 'RGHS-125',
    name: "Excision of venereal warts",
    rate: 166,
    category: 'GENERAL___SKIN',
    description: "Excision of venereal warts"
  },
  {
    id: 'pkg_rghs-126',
    code: 'RGHS-126',
    name: "Excision of corns",
    rate: 145,
    category: 'GENERAL___SKIN',
    description: "Excision of corns"
  },
  {
    id: 'pkg_rghs-127',
    code: 'RGHS-127',
    name: "Intralesional injection for keloid",
    rate: 100,
    category: 'GENERAL___SKIN',
    description: "Intralesional injection for keloid"
  },
  {
    id: 'pkg_rghs-128',
    code: 'RGHS-128',
    name: "Chemical cautery",
    rate: 114,
    category: 'GENERAL___SKIN',
    description: "Chemical cautery"
  },
  {
    id: 'pkg_rghs-129',
    code: 'RGHS-129',
    name: "Subconjunctival / subtenon injection (one eye)",
    rate: 71,
    category: 'OPHTHALMOLOGY',
    description: "Subconjunctival / subtenon injection (one eye)"
  },
  {
    id: 'pkg_rghs-130',
    code: 'RGHS-130',
    name: "Subconjunctival / subtenon injection (both eyes)",
    rate: 143,
    category: 'OPHTHALMOLOGY',
    description: "Subconjunctival / subtenon injection (both eyes)"
  },
  {
    id: 'pkg_rghs-131',
    code: 'RGHS-131',
    name: "Pterygium surgery",
    rate: 6325,
    category: 'OPHTHALMOLOGY',
    description: "Pterygium surgery"
  },
  {
    id: 'pkg_rghs-132',
    code: 'RGHS-132',
    name: "Conjunctival peritomy",
    rate: 60,
    category: 'OPHTHALMOLOGY',
    description: "Conjunctival peritomy"
  },
  {
    id: 'pkg_rghs-133',
    code: 'RGHS-133',
    name: "Conjunctival wound repair",
    rate: 3795,
    category: 'OPHTHALMOLOGY',
    description: "Conjunctival wound repair"
  },
  {
    id: 'pkg_rghs-134',
    code: 'RGHS-134',
    name: "Removal of corneal foreign body",
    rate: 120,
    category: 'OPHTHALMOLOGY',
    description: "Removal of corneal foreign body"
  },
  {
    id: 'pkg_rghs-135',
    code: 'RGHS-135',
    name: "Corneal ulcer cauterization (one eye)",
    rate: 71,
    category: 'OPHTHALMOLOGY',
    description: "Corneal ulcer cauterization (one eye)"
  },
  {
    id: 'pkg_rghs-136',
    code: 'RGHS-136',
    name: "Corneal ulcer cauterization (both eyes)",
    rate: 143,
    category: 'OPHTHALMOLOGY',
    description: "Corneal ulcer cauterization (both eyes)"
  },
  {
    id: 'pkg_rghs-137',
    code: 'RGHS-137',
    name: "Penetrating keratoplasty",
    rate: 5951,
    category: 'OPHTHALMOLOGY',
    description: "Penetrating keratoplasty"
  },
  {
    id: 'pkg_rghs-138',
    code: 'RGHS-138',
    name: "Lamellar keratoplasty",
    rate: 5750,
    category: 'OPHTHALMOLOGY',
    description: "Lamellar keratoplasty"
  },
  {
    id: 'pkg_rghs-139',
    code: 'RGHS-139',
    name: "Cyanoacrylate / fibrin glue application",
    rate: 714,
    category: 'OPHTHALMOLOGY',
    description: "Cyanoacrylate / fibrin glue application"
  },
  {
    id: 'pkg_rghs-140',
    code: 'RGHS-140',
    name: "Bandage contact lens for perforation",
    rate: 476,
    category: 'OPHTHALMOLOGY',
    description: "Bandage contact lens for perforation"
  },
  {
    id: 'pkg_rghs-141',
    code: 'RGHS-141',
    name: "Scleral graft / conjunctival flap",
    rate: 2381,
    category: 'OPHTHALMOLOGY',
    description: "Scleral graft / conjunctival flap"
  },
  {
    id: 'pkg_rghs-142',
    code: 'RGHS-142',
    name: "Keratoconus correction with lenses",
    rate: 1380,
    category: 'OPHTHALMOLOGY',
    description: "Keratoconus correction with lenses"
  },
  {
    id: 'pkg_rghs-143',
    code: 'RGHS-143',
    name: "Extraction per tooth under LA",
    rate: 92,
    category: 'DENTAL',
    description: "Extraction per tooth under LA"
  },
  {
    id: 'pkg_rghs-144',
    code: 'RGHS-144',
    name: "Complicated extraction under LA",
    rate: 115,
    category: 'DENTAL',
    description: "Complicated extraction under LA"
  },
  {
    id: 'pkg_rghs-145',
    code: 'RGHS-145',
    name: "Impacted tooth extraction under LA",
    rate: 184,
    category: 'DENTAL',
    description: "Impacted tooth extraction under LA"
  },
  {
    id: 'pkg_rghs-146',
    code: 'RGHS-146',
    name: "Extraction under short GA (special patients)",
    rate: 972,
    category: 'DENTAL',
    description: "Extraction under short GA (special patients)"
  },
  {
    id: 'pkg_rghs-147',
    code: 'RGHS-147',
    name: "Cyst/tumour excision up to 4 cm under LA",
    rate: 281,
    category: 'DENTAL',
    description: "Cyst/tumour excision up to 4 cm under LA"
  },
  {
    id: 'pkg_rghs-148',
    code: 'RGHS-148',
    name: "Cyst/tumour excision above 4 cm",
    rate: 467,
    category: 'DENTAL',
    description: "Cyst/tumour excision above 4 cm"
  },
  {
    id: 'pkg_rghs-149',
    code: 'RGHS-149',
    name: "Cyst/tumour excision under GA",
    rate: 1150,
    category: 'DENTAL',
    description: "Cyst/tumour excision under GA"
  },
  {
    id: 'pkg_rghs-150',
    code: 'RGHS-150',
    name: "TM joint ankylosis under GA",
    rate: 7763,
    category: 'DENTAL',
    description: "TM joint ankylosis under GA"
  },
  {
    id: 'pkg_rghs-151',
    code: 'RGHS-151',
    name: "Intraoral soft tissue biopsy",
    rate: 388,
    category: 'DENTAL',
    description: "Intraoral soft tissue biopsy"
  },
  {
    id: 'pkg_rghs-152',
    code: 'RGHS-152',
    name: "Intraoral bone biopsy",
    rate: 430,
    category: 'DENTAL',
    description: "Intraoral bone biopsy"
  },
  {
    id: 'pkg_rghs-153',
    code: 'RGHS-153',
    name: "Hemimandibulectomy with graft",
    rate: 21735,
    category: 'DENTAL',
    description: "Hemimandibulectomy with graft"
  },
  {
    id: 'pkg_rghs-154',
    code: 'RGHS-154',
    name: "Hemimandibulectomy without graft",
    rate: 21735,
    category: 'DENTAL',
    description: "Hemimandibulectomy without graft"
  },
  {
    id: 'pkg_rghs-155',
    code: 'RGHS-155',
    name: "Pure tone audiogram",
    rate: 178,
    category: 'ENT',
    description: "Pure tone audiogram"
  },
  {
    id: 'pkg_rghs-156',
    code: 'RGHS-156',
    name: "Impedance audiometry",
    rate: 238,
    category: 'ENT',
    description: "Impedance audiometry"
  },
  {
    id: 'pkg_rghs-157',
    code: 'RGHS-157',
    name: "SISI / Tone decay",
    rate: 137,
    category: 'ENT',
    description: "SISI / Tone decay"
  },
  {
    id: 'pkg_rghs-158',
    code: 'RGHS-158',
    name: "Hearing assessment",
    rate: 120,
    category: 'ENT',
    description: "Hearing assessment"
  },
  {
    id: 'pkg_rghs-159',
    code: 'RGHS-159',
    name: "Speech discrimination score",
    rate: 93,
    category: 'ENT',
    description: "Speech discrimination score"
  },
  {
    id: 'pkg_rghs-160',
    code: 'RGHS-160',
    name: "Speech assessment",
    rate: 124,
    category: 'ENT',
    description: "Speech assessment"
  },
  {
    id: 'pkg_rghs-161',
    code: 'RGHS-161',
    name: "Speech therapy session",
    rate: 136,
    category: 'ENT',
    description: "Speech therapy session"
  },
  {
    id: 'pkg_rghs-162',
    code: 'RGHS-162',
    name: "Cold caloric test",
    rate: 178,
    category: 'ENT',
    description: "Cold caloric test"
  },
  {
    id: 'pkg_rghs-163',
    code: 'RGHS-163',
    name: "Removal of foreign body from nose",
    rate: 358,
    category: 'ENT',
    description: "Removal of foreign body from nose"
  },
  {
    id: 'pkg_rghs-164',
    code: 'RGHS-164',
    name: "Removal of foreign body from ear",
    rate: 238,
    category: 'ENT',
    description: "Removal of foreign body from ear"
  },
  {
    id: 'pkg_rghs-165',
    code: 'RGHS-165',
    name: "Ear syringing",
    rate: 171,
    category: 'ENT',
    description: "Ear syringing"
  },
  {
    id: 'pkg_rghs-166',
    code: 'RGHS-166',
    name: "Polyp removal under LA",
    rate: 596,
    category: 'ENT',
    description: "Polyp removal under LA"
  },
  {
    id: 'pkg_rghs-167',
    code: 'RGHS-167',
    name: "Polyp removal under GA",
    rate: 880,
    category: 'ENT',
    description: "Polyp removal under GA"
  },
  {
    id: 'pkg_rghs-168',
    code: 'RGHS-168',
    name: "Haemorrhoidectomy",
    rate: 24375,
    category: 'GENERAL_SURGERY___GI___ABDOMEN',
    description: "Haemorrhoidectomy"
  },
  {
    id: 'pkg_rghs-169',
    code: 'RGHS-169',
    name: "Stapled haemorrhoidectomy",
    rate: 43700,
    category: 'GENERAL_SURGERY___GI___ABDOMEN',
    description: "Stapled haemorrhoidectomy"
  },
  {
    id: 'pkg_rghs-170',
    code: 'RGHS-170',
    name: "Keloid excision",
    rate: 1265,
    category: 'GENERAL_SURGERY___GI___ABDOMEN',
    description: "Keloid excision"
  },
  {
    id: 'pkg_rghs-171',
    code: 'RGHS-171',
    name: "Varicose vein surgery",
    rate: 11500,
    category: 'GENERAL_SURGERY___GI___ABDOMEN',
    description: "Varicose vein surgery"
  },
  {
    id: 'pkg_rghs-172',
    code: 'RGHS-172',
    name: "Coronary care with monitoring",
    rate: 863,
    category: 'ICU___CARDIAC___VASCULAR',
    description: "Coronary care with monitoring"
  },
  {
    id: 'pkg_rghs-173',
    code: 'RGHS-173',
    name: "Oxygen / compressed air per hour",
    rate: 58,
    category: 'ICU___CARDIAC___VASCULAR',
    description: "Oxygen / compressed air per hour"
  },
  {
    id: 'pkg_rghs-174',
    code: 'RGHS-174',
    name: "Ventilator charges per day",
    rate: 604,
    category: 'ICU___CARDIAC___VASCULAR',
    description: "Ventilator charges per day"
  },
  {
    id: 'pkg_rghs-175',
    code: 'RGHS-175',
    name: "ASD closure",
    rate: 59579,
    category: 'ICU___CARDIAC___VASCULAR',
    description: "ASD closure"
  },
  {
    id: 'pkg_rghs-176',
    code: 'RGHS-176',
    name: "VSD closure",
    rate: 59579,
    category: 'ICU___CARDIAC___VASCULAR',
    description: "VSD closure"
  },
  {
    id: 'pkg_rghs-177',
    code: 'RGHS-177',
    name: "CABG surgery",
    rate: 131523,
    category: 'ICU___CARDIAC___VASCULAR',
    description: "CABG surgery"
  },
  {
    id: 'pkg_rghs-178',
    code: 'RGHS-178',
    name: "Heart transplant",
    rate: 285660,
    category: 'ICU___CARDIAC___VASCULAR',
    description: "Heart transplant"
  },
  {
    id: 'pkg_rghs-179',
    code: 'RGHS-179',
    name: "Normal delivery",
    rate: 8280,
    category: 'ICU___CARDIAC___VASCULAR',
    description: "Normal delivery"
  },
  {
    id: 'pkg_rghs-180',
    code: 'RGHS-180',
    name: "Vacuum delivery",
    rate: 8927,
    category: 'ICU___CARDIAC___VASCULAR',
    description: "Vacuum delivery"
  },
  {
    id: 'pkg_rghs-181',
    code: 'RGHS-181',
    name: "Forceps delivery",
    rate: 9522,
    category: 'ICU___CARDIAC___VASCULAR',
    description: "Forceps delivery"
  },
  {
    id: 'pkg_rghs-182',
    code: 'RGHS-182',
    name: "Cesarean section",
    rate: 15180,
    category: 'ICU___CARDIAC___VASCULAR',
    description: "Cesarean section"
  },
  {
    id: 'pkg_rghs-183',
    code: 'RGHS-183',
    name: "Abdominal hysterectomy",
    rate: 17854,
    category: 'ICU___CARDIAC___VASCULAR',
    description: "Abdominal hysterectomy"
  },
  {
    id: 'pkg_rghs-184',
    code: 'RGHS-184',
    name: "NDVH",
    rate: 17854,
    category: 'ICU___CARDIAC___VASCULAR',
    description: "NDVH"
  },
  {
    id: 'pkg_rghs-185',
    code: 'RGHS-185',
    name: "Total laparoscopic hysterectomy",
    rate: 26565,
    category: 'ICU___CARDIAC___VASCULAR',
    description: "Total laparoscopic hysterectomy"
  },
  {
    id: 'pkg_rghs-186',
    code: 'RGHS-186',
    name: "MTP 1st trimester",
    rate: 3450,
    category: 'ICU___CARDIAC___VASCULAR',
    description: "MTP 1st trimester"
  },
  {
    id: 'pkg_rghs-187',
    code: 'RGHS-187',
    name: "MTP 2nd trimester",
    rate: 5026,
    category: 'ICU___CARDIAC___VASCULAR',
    description: "MTP 2nd trimester"
  },
  {
    id: 'pkg_rghs-188',
    code: 'RGHS-188',
    name: "Operations for Vesicoureteric Reflux (VUR) / Urinary incontinence with bulking agents",
    rate: 21505,
    category: 'ICU___CARDIAC___VASCULAR',
    description: "Operations for Vesicoureteric Reflux (VUR) / Urinary incontinence with bulking agents"
  },
  {
    id: 'pkg_rghs-189',
    code: 'RGHS-189',
    name: "Uretero-colic anastomosis",
    rate: 16560,
    category: 'ICU___CARDIAC___VASCULAR',
    description: "Uretero-colic anastomosis"
  },
  {
    id: 'pkg_rghs-190',
    code: 'RGHS-190',
    name: "Formation of an Ileal Conduit",
    rate: 17854,
    category: 'ICU___CARDIAC___VASCULAR',
    description: "Formation of an Ileal Conduit"
  },
  {
    id: 'pkg_rghs-191',
    code: 'RGHS-191',
    name: "Ureteric catheterisation",
    rate: 10950,
    category: 'ICU___CARDIAC___VASCULAR',
    description: "Ureteric catheterisation"
  },
  {
    id: 'pkg_rghs-192',
    code: 'RGHS-192',
    name: "Biopsy of bladder (cystoscopic)",
    rate: 2530,
    category: 'ICU___CARDIAC___VASCULAR',
    description: "Biopsy of bladder (cystoscopic)"
  },
  {
    id: 'pkg_rghs-193',
    code: 'RGHS-193',
    name: "Cysto-litholapaxy",
    rate: 11308,
    category: 'ICU___CARDIAC___VASCULAR',
    description: "Cysto-litholapaxy"
  },
  {
    id: 'pkg_rghs-194',
    code: 'RGHS-194',
    name: "Operations for injuries of the bladder",
    rate: 11500,
    category: 'ICU___CARDIAC___VASCULAR',
    description: "Operations for injuries of the bladder"
  },
  {
    id: 'pkg_rghs-195',
    code: 'RGHS-195',
    name: "Suprapubic drainage (cystostomy / vesicostomy)",
    rate: 6210,
    category: 'ICU___CARDIAC___VASCULAR',
    description: "Suprapubic drainage (cystostomy / vesicostomy)"
  },
  {
    id: 'pkg_rghs-196',
    code: 'RGHS-196',
    name: "Simple cystectomy",
    rate: 17854,
    category: 'ICU___CARDIAC___VASCULAR',
    description: "Simple cystectomy"
  },
  {
    id: 'pkg_rghs-197',
    code: 'RGHS-197',
    name: "Augmentation cystoplasty",
    rate: 7337,
    category: 'ICU___CARDIAC___VASCULAR',
    description: "Augmentation cystoplasty"
  },
  {
    id: 'pkg_rghs-198',
    code: 'RGHS-198',
    name: "Open suprapubic prostatectomy",
    rate: 21425,
    category: 'ICU___CARDIAC___VASCULAR',
    description: "Open suprapubic prostatectomy"
  },
  {
    id: 'pkg_rghs-199',
    code: 'RGHS-199',
    name: "Open retropubic prostatectomy",
    rate: 20830,
    category: 'ICU___CARDIAC___VASCULAR',
    description: "Open retropubic prostatectomy"
  },
  {
    id: 'pkg_rghs-200',
    code: 'RGHS-200',
    name: "Transurethral resection of prostate (TURP)",
    rate: 19282,
    category: 'ICU___CARDIAC___VASCULAR',
    description: "Transurethral resection of prostate (TURP)"
  },
  {
    id: 'pkg_rghs-201',
    code: 'RGHS-201',
    name: "Urethroscopy / cystopanendoscopy",
    rate: 4761,
    category: 'ICU___CARDIAC___VASCULAR',
    description: "Urethroscopy / cystopanendoscopy"
  },
  {
    id: 'pkg_rghs-202',
    code: 'RGHS-202',
    name: "Substitution urethroplasty (trans-pubic urethroplasty)",
    rate: 21505,
    category: 'ICU___CARDIAC___VASCULAR',
    description: "Substitution urethroplasty (trans-pubic urethroplasty)"
  },
  {
    id: 'pkg_rghs-203',
    code: 'RGHS-203',
    name: "Abdomino-perineal urethroplasty",
    rate: 16100,
    category: 'ICU___CARDIAC___VASCULAR',
    description: "Abdomino-perineal urethroplasty"
  },
  {
    id: 'pkg_rghs-204',
    code: 'RGHS-204',
    name: "Posterior urethral valve fulguration",
    rate: 11664,
    category: 'ICU___CARDIAC___VASCULAR',
    description: "Posterior urethral valve fulguration"
  },
  {
    id: 'pkg_rghs-205',
    code: 'RGHS-205',
    name: "Reduction of paraphimosis",
    rate: 1898,
    category: 'ICU___CARDIAC___VASCULAR',
    description: "Reduction of paraphimosis"
  },
  {
    id: 'pkg_rghs-206',
    code: 'RGHS-206',
    name: "Circumcision",
    rate: 3105,
    category: 'ICU___CARDIAC___VASCULAR',
    description: "Circumcision"
  },
  {
    id: 'pkg_rghs-207',
    code: 'RGHS-207',
    name: "Meatotomy",
    rate: 2428,
    category: 'ICU___CARDIAC___VASCULAR',
    description: "Meatotomy"
  },
  {
    id: 'pkg_rghs-208',
    code: 'RGHS-208',
    name: "Meatoplasty",
    rate: 3333,
    category: 'ICU___CARDIAC___VASCULAR',
    description: "Meatoplasty"
  },
  {
    id: 'pkg_rghs-209',
    code: 'RGHS-209',
    name: "Hypospadias with chordee correction",
    rate: 9522,
    category: 'ICU___CARDIAC___VASCULAR',
    description: "Hypospadias with chordee correction"
  },
  {
    id: 'pkg_rghs-210',
    code: 'RGHS-210',
    name: "Crippled hypospadias repair",
    rate: 12650,
    category: 'ICU___CARDIAC___VASCULAR',
    description: "Crippled hypospadias repair"
  },
];
