export interface HospitalService {
    id: string;
    service_code: string;
    service_name: string;
    category: string;
    rate: number;
    description?: string;
    is_active?: boolean;
}

export interface HospitalProcedure {
    id: string;
    procedure_code: string;
    procedure_name: string;
    category: string;
    rate: number;
    description?: string;
    is_active?: boolean;
}

// Predefined hospital services
export const HOSPITAL_SERVICES_DATA: HospitalService[] = [
    // General Services
    { id: 'svc-001', service_code: 'SVC-001', service_name: 'Nursing Care (per day)', category: 'General', rate: 500, description: 'Daily nursing care charges' },
    { id: 'svc-002', service_code: 'SVC-002', service_name: 'Doctor Visit', category: 'General', rate: 300, description: 'Doctor consultation during IPD stay' },
    { id: 'svc-003', service_code: 'SVC-003', service_name: 'ICU Charges (per day)', category: 'Critical Care', rate: 2500, description: 'Intensive Care Unit daily charges' },
    { id: 'svc-004', service_code: 'SVC-004', service_name: 'Ventilator (per day)', category: 'Critical Care', rate: 1500, description: 'Ventilator usage charges per day' },
    { id: 'svc-005', service_code: 'SVC-005', service_name: 'Oxygen (per hour)', category: 'General', rate: 50, description: 'Oxygen supply per hour' },

    // Diagnostic Services
    { id: 'svc-006', service_code: 'SVC-006', service_name: 'ECG', category: 'Diagnostic', rate: 200, description: 'Electrocardiogram test' },

    // Radiology Services
    { id: 'svc-007', service_code: 'SVC-007', service_name: 'X-Ray (Chest)', category: 'Radiology', rate: 400, description: 'Chest X-Ray' },
    { id: 'svc-008', service_code: 'SVC-008', service_name: 'X-Ray (Other)', category: 'Radiology', rate: 350, description: 'Other X-Ray examinations' },
    { id: 'svc-009', service_code: 'SVC-009', service_name: 'Ultrasound', category: 'Radiology', rate: 800, description: 'Ultrasound examination' },
    { id: 'svc-010', service_code: 'SVC-010', service_name: 'CT Scan', category: 'Radiology', rate: 3500, description: 'CT Scan examination' },
    { id: 'svc-011', service_code: 'SVC-011', service_name: 'MRI Scan', category: 'Radiology', rate: 6000, description: 'MRI Scan examination' },

    // Laboratory Services
    { id: 'svc-012', service_code: 'SVC-012', service_name: 'Blood Test (Complete)', category: 'Laboratory', rate: 500, description: 'Complete blood count and basic tests' },
    { id: 'svc-013', service_code: 'SVC-013', service_name: 'Urine Test', category: 'Laboratory', rate: 150, description: 'Urine analysis' },
    { id: 'svc-014', service_code: 'SVC-014', service_name: 'Stool Test', category: 'Laboratory', rate: 150, description: 'Stool examination' },

    // General Care Services
    { id: 'svc-015', service_code: 'SVC-015', service_name: 'Dressing (Simple)', category: 'General', rate: 200, description: 'Simple wound dressing' },
    { id: 'svc-016', service_code: 'SVC-016', service_name: 'Dressing (Complex)', category: 'General', rate: 500, description: 'Complex wound dressing' },
    { id: 'svc-017', service_code: 'SVC-017', service_name: 'IV Cannulation', category: 'General', rate: 150, description: 'Intravenous cannula insertion' },
    { id: 'svc-018', service_code: 'SVC-018', service_name: 'Catheterization', category: 'General', rate: 300, description: 'Urinary catheter insertion' },
    { id: 'svc-019', service_code: 'SVC-019', service_name: 'Nebulization', category: 'General', rate: 100, description: 'Nebulization therapy' },

    // Therapy & Consultation
    { id: 'svc-020', service_code: 'SVC-020', service_name: 'Physiotherapy Session', category: 'Therapy', rate: 400, description: 'Physiotherapy session' },
    { id: 'svc-022', service_code: 'SVC-022', service_name: 'Dietician Consultation', category: 'Consultation', rate: 300, description: 'Dietician consultation' },

    // Transport
    { id: 'svc-021', service_code: 'SVC-021', service_name: 'Ambulance Service', category: 'Transport', rate: 1000, description: 'Ambulance transportation' },

    // Special Services
    { id: 'svc-023', service_code: 'SVC-023', service_name: 'Blood Transfusion', category: 'General', rate: 1500, description: 'Blood transfusion service' },
    { id: 'svc-024', service_code: 'SVC-024', service_name: 'Dialysis', category: 'Critical Care', rate: 3000, description: 'Dialysis session' },
    { id: 'svc-025', service_code: 'SVC-025', service_name: 'Injection (IM/IV)', category: 'General', rate: 50, description: 'Injection administration' },
];

// Predefined hospital procedures
export const HOSPITAL_PROCEDURES_DATA: HospitalProcedure[] = [
    // General Surgery
    { id: 'proc-001', procedure_code: 'PROC-001', procedure_name: 'Appendectomy', category: 'General Surgery', rate: 35000, description: 'Appendix removal surgery' },
    { id: 'proc-002', procedure_code: 'PROC-002', procedure_name: 'Hernia Repair', category: 'General Surgery', rate: 30000, description: 'Hernia repair surgery' },
    { id: 'proc-003', procedure_code: 'PROC-003', procedure_name: 'Cholecystectomy', category: 'General Surgery', rate: 45000, description: 'Gallbladder removal' },
    { id: 'proc-016', procedure_code: 'PROC-016', procedure_name: 'Laparoscopic Surgery', category: 'General Surgery', rate: 40000, description: 'Laparoscopic surgical procedure' },
    { id: 'proc-022', procedure_code: 'PROC-022', procedure_name: 'Abscess Drainage', category: 'General Surgery', rate: 3000, description: 'Abscess incision and drainage' },

    // Obstetrics & Gynecology
    { id: 'proc-004', procedure_code: 'PROC-004', procedure_name: 'Cesarean Section', category: 'Obstetrics', rate: 40000, description: 'C-section delivery' },
    { id: 'proc-005', procedure_code: 'PROC-005', procedure_name: 'Normal Delivery', category: 'Obstetrics', rate: 20000, description: 'Normal vaginal delivery' },
    { id: 'proc-006', procedure_code: 'PROC-006', procedure_name: 'Hysterectomy', category: 'Gynecology', rate: 50000, description: 'Uterus removal surgery' },

    // Ophthalmology
    { id: 'proc-007', procedure_code: 'PROC-007', procedure_name: 'Cataract Surgery', category: 'Ophthalmology', rate: 25000, description: 'Cataract removal with lens implant' },

    // ENT
    { id: 'proc-008', procedure_code: 'PROC-008', procedure_name: 'Tonsillectomy', category: 'ENT', rate: 20000, description: 'Tonsil removal surgery' },
    { id: 'proc-009', procedure_code: 'PROC-009', procedure_name: 'Adenoidectomy', category: 'ENT', rate: 18000, description: 'Adenoid removal surgery' },

    // Orthopedics
    { id: 'proc-010', procedure_code: 'PROC-010', procedure_name: 'Fracture Fixation (Simple)', category: 'Orthopedics', rate: 30000, description: 'Simple fracture fixation' },
    { id: 'proc-011', procedure_code: 'PROC-011', procedure_name: 'Fracture Fixation (Complex)', category: 'Orthopedics', rate: 60000, description: 'Complex fracture fixation' },
    { id: 'proc-012', procedure_code: 'PROC-012', procedure_name: 'Joint Replacement (Knee)', category: 'Orthopedics', rate: 150000, description: 'Knee replacement surgery' },
    { id: 'proc-013', procedure_code: 'PROC-013', procedure_name: 'Joint Replacement (Hip)', category: 'Orthopedics', rate: 180000, description: 'Hip replacement surgery' },

    // Cardiology
    { id: 'proc-014', procedure_code: 'PROC-014', procedure_name: 'Angioplasty', category: 'Cardiology', rate: 120000, description: 'Coronary angioplasty' },
    { id: 'proc-015', procedure_code: 'PROC-015', procedure_name: 'Pacemaker Implantation', category: 'Cardiology', rate: 200000, description: 'Pacemaker implantation' },

    // Gastroenterology
    { id: 'proc-017', procedure_code: 'PROC-017', procedure_name: 'Endoscopy', category: 'Gastroenterology', rate: 5000, description: 'Endoscopic examination' },
    { id: 'proc-018', procedure_code: 'PROC-018', procedure_name: 'Colonoscopy', category: 'Gastroenterology', rate: 6000, description: 'Colonoscopy examination' },

    // General Procedures
    { id: 'proc-019', procedure_code: 'PROC-019', procedure_name: 'Biopsy', category: 'General', rate: 3000, description: 'Tissue biopsy' },
    { id: 'proc-020', procedure_code: 'PROC-020', procedure_name: 'Suturing (Minor)', category: 'General', rate: 1500, description: 'Minor wound suturing' },
    { id: 'proc-021', procedure_code: 'PROC-021', procedure_name: 'Suturing (Major)', category: 'General', rate: 5000, description: 'Major wound suturing' },

    // Urology
    { id: 'proc-023', procedure_code: 'PROC-023', procedure_name: 'Circumcision', category: 'Urology', rate: 8000, description: 'Circumcision procedure' },

    // Dental
    { id: 'proc-024', procedure_code: 'PROC-024', procedure_name: 'Dental Extraction', category: 'Dental', rate: 500, description: 'Tooth extraction' },
    { id: 'proc-025', procedure_code: 'PROC-025', procedure_name: 'Root Canal Treatment', category: 'Dental', rate: 3000, description: 'Root canal therapy' },
];
