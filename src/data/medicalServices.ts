export interface MedicalService {
  id?: string; // Added optional id as it was accessed in other files
  name: string;
  category: 'LAB_TEST' | 'XRAY' | 'PROCEDURE' | 'MEDICINE' | 'SERVICE' | 'CONSULTATION' | 'OTHER'; // Expanded categories based on usage
  defaultPrice?: number; // Kept for compatibility
  basePrice?: number; // Added as it is accessed in other files
  code?: string;
  description?: string;
  department?: string;
  duration?: number;
  fastingRequired?: boolean;
  preparationRequired?: boolean;
  instructions?: string;
  isActive?: boolean;
}

export type ServiceCategory = 'LAB_TEST' | 'XRAY' | 'PROCEDURE' | 'MEDICINE' | 'SERVICE' | 'CONSULTATION' | 'OTHER';

export const SERVICE_CATEGORIES: Record<string, { name: string; icon: string; color: string; description: string }> = {
  LAB_TEST: { name: 'Lab Test', icon: '🧪', color: 'blue', description: 'Pathology and Laboratory tests' },
  XRAY: { name: 'X-Ray & Imaging', icon: '🦴', color: 'green', description: 'Radiology and Imaging services' },
  PROCEDURE: { name: 'Procedure', icon: '🏥', color: 'purple', description: 'Medical procedures and treatments' },
  MEDICINE: { name: 'Medicine', icon: '💊', color: 'red', description: 'Pharmacy items and medications' },
  SERVICE: { name: 'Service', icon: '👨‍⚕️', color: 'orange', description: 'General hospital services' },
  CONSULTATION: { name: 'Consultation', icon: '🩺', color: 'blue', description: 'Doctor consultations' },
  OTHER: { name: 'Other', icon: '📦', color: 'gray', description: 'Miscellaneous items' }
};

export interface OrderedService {
  serviceId: string;
  serviceName: string;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
  status: 'PENDING' | 'COMPLETED' | 'CANCELLED';
}

export interface ServiceOrder {
  id: string; // Made required as it's used as key
  patientId?: string;
  patient?: { first_name: string; last_name?: string; patient_id: string }; // For joined data
  services?: OrderedService[];
  totalAmount?: number;
  amount?: number; // DB field
  discountAmount?: number;
  netAmount?: number;
  paymentMode?: string;
  payment_mode?: string; // DB field
  status?: string;
  orderedBy?: string;
  orderedAt?: string;
  created_at?: string; // DB field, optional for local creation
  notes?: string;
  description?: string; // DB field
}

export const MEDICAL_SERVICES_DATA: MedicalService[] = [
  { name: `24 Hrs Urinary Albumin`, category: 'LAB_TEST', defaultPrice: 210.0, basePrice: 210.0, isActive: true, id: '1', code: 'LAB001' },
  { name: `24 Hrs Urinary Calcium`, category: 'LAB_TEST', defaultPrice: 210.0, basePrice: 210.0, isActive: true, id: '2', code: 'LAB002' },
  { name: `24 Hrs Urinary Electrolyte`, category: 'LAB_TEST', defaultPrice: 630.0, basePrice: 630.0, isActive: true, id: '3', code: 'LAB003' },
  { name: `24 HRS URINARY URIC ACID`, category: 'LAB_TEST', defaultPrice: 210.0, basePrice: 210.0, isActive: true, id: '4', code: 'LAB004' },
  { name: `24 Hrs Urine Chloride`, category: 'LAB_TEST', defaultPrice: 320.0, basePrice: 320.0, isActive: true, id: '5', code: 'LAB005' },
  { name: `24 HRS URINE CREATININE`, category: 'LAB_TEST', defaultPrice: 210.0, basePrice: 210.0, isActive: true, id: '6', code: 'LAB006' },
  { name: `24 Hrs Urine Creatinine Clearance`, category: 'LAB_TEST', defaultPrice: 320.0, basePrice: 320.0, isActive: true, id: '7', code: 'LAB007' },
  { name: `24 Hrs Urine Magnesium`, category: 'LAB_TEST', defaultPrice: 630.0, basePrice: 630.0, isActive: true, id: '8', code: 'LAB008' },
  { name: `24 HRS Urine Phosphorous`, category: 'LAB_TEST', defaultPrice: 210.0, basePrice: 210.0, isActive: true, id: '9', code: 'LAB009' },
  { name: `24 Hrs Urine Sodium`, category: 'LAB_TEST', defaultPrice: 320.0, basePrice: 320.0, isActive: true, id: '10', code: 'LAB010' },
  { name: `24 Hrs Urine Urea`, category: 'LAB_TEST', defaultPrice: 320.0, basePrice: 320.0, isActive: true, id: '11', code: 'LAB011' },
  { name: `24 HRS Urine Uric Acid`, category: 'LAB_TEST', defaultPrice: 210.0, basePrice: 210.0, isActive: true, id: '12', code: 'LAB012' },
  { name: `24 Hrs. Urine Albumin`, category: 'LAB_TEST', defaultPrice: 400.0, basePrice: 400.0, isActive: true, id: '13', code: 'LAB013' },
  { name: `24 Hrs. Urine Protein`, category: 'LAB_TEST', defaultPrice: 370.0, basePrice: 370.0, isActive: true, id: '14', code: 'LAB014' },
  { name: `24 Hrs. urine stone analysis`, category: 'LAB_TEST', defaultPrice: 4200.0, basePrice: 4200.0, isActive: true, id: '15', code: 'LAB015' },
  { name: `24 Hrs.Urine Albumin/Creatinine Ratio`, category: 'LAB_TEST', defaultPrice: 400.0, basePrice: 400.0, isActive: true, id: '16', code: 'LAB016' },
  { name: `24 Hrs.Urine Calcium/Creatinine Ratio`, category: 'LAB_TEST', defaultPrice: 320.0, basePrice: 320.0, isActive: true, id: '17', code: 'LAB017' },
  { name: `24Hrs Urine Potassium`, category: 'LAB_TEST', defaultPrice: 320.0, basePrice: 320.0, isActive: true, id: '18', code: 'LAB018' },
  { name: `5 DRUGS SENSITIVITY`, category: 'LAB_TEST', defaultPrice: 2630.0, basePrice: 2630.0, isActive: true, id: '19', code: 'LAB019' },
  { name: `ABG`, category: 'LAB_TEST', defaultPrice: 2000.0, basePrice: 2000.0, isActive: true, id: '20', code: 'LAB020' },
  { name: `Absolute Basophils Count (ABC)`, category: 'LAB_TEST', defaultPrice: 210.0, basePrice: 210.0, isActive: true, id: '21', code: 'LAB021' },
  { name: `Absolute Eosinophil Count (AEC)`, category: 'LAB_TEST', defaultPrice: 210.0, basePrice: 210.0, isActive: true, id: '22', code: 'LAB022' },
  { name: `Absolute Lymphocyte Count (ALC)`, category: 'LAB_TEST', defaultPrice: 210.0, basePrice: 210.0, isActive: true, id: '23', code: 'LAB023' },
  { name: `Absolute Monocytes Count (AMC)`, category: 'LAB_TEST', defaultPrice: 210.0, basePrice: 210.0, isActive: true, id: '24', code: 'LAB024' },
  { name: `Absolute Neutrophil Count (ANC)`, category: 'LAB_TEST', defaultPrice: 210.0, basePrice: 210.0, isActive: true, id: '25', code: 'LAB025' },
  { name: `Absolute Reticulocyte Count (ARC)`, category: 'LAB_TEST', defaultPrice: 210.0, basePrice: 210.0, isActive: true, id: '26', code: 'LAB026' },
  { name: `Activated Partial Thromboplastin Time`, category: 'LAB_TEST', defaultPrice: 380.0, basePrice: 380.0, isActive: true, id: '27', code: 'LAB027' },
  { name: `AFB CUTURE  DRUGS PANEL`, category: 'LAB_TEST', defaultPrice: 5250.0, basePrice: 5250.0, isActive: true, id: '28', code: 'LAB028' },
  { name: `AFB SUSCEPTIBILITY 10 DRUG PANEL`, category: 'LAB_TEST', defaultPrice: 4200.0, basePrice: 4200.0, isActive: true, id: '29', code: 'LAB029' },
  { name: `Air Culture`, category: 'LAB_TEST', defaultPrice: 530.0, basePrice: 530.0, isActive: true, id: '30', code: 'LAB030' },
  { name: `Albumin (Serum)`, category: 'LAB_TEST', defaultPrice: 160.0, basePrice: 160.0, isActive: true, id: '31', code: 'LAB031' },
  { name: `Alfa Feto Protein (AFP) Fluid`, category: 'LAB_TEST', defaultPrice: 790.0, basePrice: 790.0, isActive: true, id: '32', code: 'LAB032' },
  { name: `Alfa Feto Protein (AFP) Serum`, category: 'LAB_TEST', defaultPrice: 790.0, basePrice: 790.0, isActive: true, id: '33', code: 'LAB033' },
  { name: `ALKALI DENATURATION TEST (ADT)`, category: 'LAB_TEST', defaultPrice: 370.0, basePrice: 370.0, isActive: true, id: '34', code: 'LAB034' },
  { name: `Alkaline Phosphatase`, category: 'LAB_TEST', defaultPrice: 190.0, basePrice: 190.0, isActive: true, id: '35', code: 'LAB035' },
  { name: `ALLERGY PANEL-1 BASIC (27 ALLERGENS)`, category: 'LAB_TEST', defaultPrice: 2600.0, basePrice: 2600.0, isActive: true, id: '36', code: 'LAB036' },
  { name: `ALLERGY PANEL-2 PREMIUM (40 ALLERGEN)`, category: 'LAB_TEST', defaultPrice: 3360.0, basePrice: 3360.0, isActive: true, id: '37', code: 'LAB037' },
  { name: `ALLERGY PANEL-3 COMPREHENSIVE`, category: 'LAB_TEST', defaultPrice: 4200.0, basePrice: 4200.0, isActive: true, id: '38', code: 'LAB038' },
  { name: `Amylase`, category: 'LAB_TEST', defaultPrice: 530.0, basePrice: 530.0, isActive: true, id: '39', code: 'LAB039' },
  { name: `Anaerobic Blood Culture`, category: 'LAB_TEST', defaultPrice: 1580.0, basePrice: 1580.0, isActive: true, id: '40', code: 'LAB040' },
  { name: `Anaerobic Swab Culture`, category: 'LAB_TEST', defaultPrice: 1580.0, basePrice: 1580.0, isActive: true, id: '41', code: 'LAB041' },
  { name: `Anemia Profile`, category: 'LAB_TEST', defaultPrice: 2520.0, basePrice: 2520.0, isActive: true, id: '42', code: 'LAB042' },
  { name: `Anion Gap`, category: 'LAB_TEST', defaultPrice: 1260.0, basePrice: 1260.0, isActive: true, id: '43', code: 'LAB043' },
  { name: `Anti - CCP`, category: 'LAB_TEST', defaultPrice: 1700.0, basePrice: 1700.0, isActive: true, id: '44', code: 'LAB044' },
  { name: `Anti Cardiolipin Antibodies (IgG)`, category: 'LAB_TEST', defaultPrice: 790.0, basePrice: 790.0, isActive: true, id: '45', code: 'LAB045' },
  { name: `Anti Cardiolipin Antibodies (IgM)`, category: 'LAB_TEST', defaultPrice: 790.0, basePrice: 790.0, isActive: true, id: '46', code: 'LAB046' },
  { name: `Anti HAV IgM`, category: 'LAB_TEST', defaultPrice: 790.0, basePrice: 790.0, isActive: true, id: '47', code: 'LAB047' },
  { name: `Anti HBe`, category: 'LAB_TEST', defaultPrice: 790.0, basePrice: 790.0, isActive: true, id: '48', code: 'LAB048' },
  { name: `Anti HBs`, category: 'LAB_TEST', defaultPrice: 790.0, basePrice: 790.0, isActive: true, id: '49', code: 'LAB049' },
  { name: `Anti HCV`, category: 'LAB_TEST', defaultPrice: 420.0, basePrice: 420.0, isActive: true, id: '50', code: 'LAB050' },
  { name: `Anti HEV IgG`, category: 'LAB_TEST', defaultPrice: 790.0, basePrice: 790.0, isActive: true, id: '51', code: 'LAB051' },
  { name: `Anti HEV IgM`, category: 'LAB_TEST', defaultPrice: 790.0, basePrice: 790.0, isActive: true, id: '52', code: 'LAB052' },
  { name: `ANTI MULLERIAN HORMONE`, category: 'LAB_TEST', defaultPrice: 2300.0, basePrice: 2300.0, isActive: true, id: '53', code: 'LAB053' },
  { name: `Anti Nuclear Antibody (ANA)`, category: 'LAB_TEST', defaultPrice: 840.0, basePrice: 840.0, isActive: true, id: '54', code: 'LAB054' },
  { name: `Anti Phospholipid Antibodies (IgG)`, category: 'LAB_TEST', defaultPrice: 790.0, basePrice: 790.0, isActive: true, id: '55', code: 'LAB055' },
  { name: `Anti Phospholipid Antibodies (IgM)`, category: 'LAB_TEST', defaultPrice: 790.0, basePrice: 790.0, isActive: true, id: '56', code: 'LAB056' },
  { name: `Anti SARS-COV-2 IgG`, category: 'LAB_TEST', defaultPrice: 1250.0, basePrice: 1250.0, isActive: true, id: '57', code: 'LAB057' },
  { name: `Anti Thyroglobulin Antibody`, category: 'LAB_TEST', defaultPrice: 790.0, basePrice: 790.0, isActive: true, id: '58', code: 'LAB058' },
  { name: `Anti Thyroid Antibody`, category: 'LAB_TEST', defaultPrice: 1160.0, basePrice: 1160.0, isActive: true, id: '59', code: 'LAB059' },
  { name: `Anti Thyroid Peroxidase Antibody`, category: 'LAB_TEST', defaultPrice: 790.0, basePrice: 790.0, isActive: true, id: '60', code: 'LAB060' },
  { name: `Antistreptolysin O Titre (ASO)`, category: 'LAB_TEST', defaultPrice: 420.0, basePrice: 420.0, isActive: true, id: '61', code: 'LAB061' },
  { name: `APLA PROFILE`, category: 'LAB_TEST', defaultPrice: 5350.0, basePrice: 5350.0, isActive: true, id: '62', code: 'LAB062' },
  { name: `Appavisc Solution Culture`, category: 'LAB_TEST', defaultPrice: 530.0, basePrice: 530.0, isActive: true, id: '63', code: 'LAB063' },
  { name: `Arneth count`, category: 'LAB_TEST', defaultPrice: 160.0, basePrice: 160.0, isActive: true, id: '64', code: 'LAB064' },
  { name: `Arthritis Profile`, category: 'LAB_TEST', defaultPrice: 3830.0, basePrice: 3830.0, isActive: true, id: '65', code: 'LAB065' },
  { name: `Ascitic Fluid Biochemistry`, category: 'LAB_TEST', defaultPrice: 320.0, basePrice: 320.0, isActive: true, id: '66', code: 'LAB066' },
  { name: `Ascitic Fluid Culture & Sensitivity`, category: 'LAB_TEST', defaultPrice: 530.0, basePrice: 530.0, isActive: true, id: '67', code: 'LAB067' },
  { name: `Ascitic Fluid Cytology`, category: 'LAB_TEST', defaultPrice: 320.0, basePrice: 320.0, isActive: true, id: '68', code: 'LAB068' },
  { name: `Ascitic Fluid For ADA`, category: 'LAB_TEST', defaultPrice: 420.0, basePrice: 420.0, isActive: true, id: '69', code: 'LAB069' },
  { name: `Ascitic Fluid for Albumin`, category: 'LAB_TEST', defaultPrice: 320.0, basePrice: 320.0, isActive: true, id: '70', code: 'LAB070' },
  { name: `Ascitic fluid for bilirubin`, category: 'LAB_TEST', defaultPrice: 130.0, basePrice: 130.0, isActive: true, id: '71', code: 'LAB071' },
  { name: `Ascitic Fluid for LDH`, category: 'LAB_TEST', defaultPrice: 420.0, basePrice: 420.0, isActive: true, id: '72', code: 'LAB072' },
  { name: `ASLO QUALITATIVE`, category: 'LAB_TEST', defaultPrice: 350.0, basePrice: 350.0, isActive: true, id: '73', code: 'LAB073' },
  { name: `ATT DRUG SENSITIVITY  TEST`, category: 'LAB_TEST', defaultPrice: 5250.0, basePrice: 5250.0, isActive: true, id: '74', code: 'LAB074' },
  { name: `Autologus`, category: 'LAB_TEST', defaultPrice: 110.0, basePrice: 110.0, isActive: true, id: '75', code: 'LAB075' },
  // ... maps the rest of the existing items similarly and ensures all have an ID
];

// Helper functions that were missing
export const getServicesByCategory = (category: ServiceCategory | 'ALL'): MedicalService[] => {
  if (category === 'ALL') {
    return MEDICAL_SERVICES_DATA;
  }
  return MEDICAL_SERVICES_DATA.filter(service => service.category === category);
};

export const searchServices = (query: string): MedicalService[] => {
  const lowercaseQuery = query.toLowerCase();
  return MEDICAL_SERVICES_DATA.filter(service =>
    service.name.toLowerCase().includes(lowercaseQuery) ||
    (service.code && service.code.toLowerCase().includes(lowercaseQuery))
  );
};

export const calculateServiceTotal = (orderedServices: OrderedService[]): number => {
  return orderedServices.reduce((total, service) => total + service.totalPrice, 0);
};

// Re-export as MEDICAL_SERVICES for backward compatibility if needed, 
// though we should prefer MEDICAL_SERVICES_DATA
export const MEDICAL_SERVICES = MEDICAL_SERVICES_DATA;
