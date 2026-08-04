export declare const notifications: {
    ADMIN_UNREAD_COUNT: string;
    GET_ADMIN_UNREAD_COUNT: string;
    DOCTOR_UNREAD_COUNT: string;
    GET_DOCTOR_UNREAD_COUNT: string;
    SUPPORT_MESSAGE: string;
    ISREAD_SUPPORT: string;
    UPDATE_MESSAGE: string;
};
export declare const languages: {
    SELECTED_LANGUAGE: string;
};
export declare const visitTypes: {
    VISIT_NOTE_PROVIDER: string;
    PATIENT_VISIT_PROVIDER: string;
    ENDED_VISIT: string;
    COMPLETED_VISIT: string;
    IN_PROGRESS_VISIT: string;
    PRIORITY_VISIT: string;
    AWAITING_VISIT: string;
    PATIENT_INTERACTION: string;
    HW_INTERACTION: string;
    GENERAL_PHYSICIAN: string;
    ADULTINITIAL: string;
    ASSOCIATED_SYMPTOMS: string;
    CURRENT_COMPLAINT: string;
    PATIENT_EXIT_SURVEY: string;
    VISIT_COMPLETE: string;
    FLAGGED: string;
    VITALS: string;
    VISIT_NOTE: string;
    MEDICAL_HISTORY: string;
    FAMILY_HISTORY: string;
    FOLLOW_UP: string;
    NEW: string;
};
export declare const doctorDetails: {
    TELEPHONE_NUMBER: string;
    SPECIALIZATION: string;
    PROVIDER: string;
    USER: string;
    DOCTOR_NAME: string;
    PASSWORD: string;
    PHONE_NUMBER: string;
    WHATS_APP: string;
    BIRTHDATE: string;
    ADDRESS: string;
    CONSULTATION_LANGUAGE: string;
    COUNTRY_CODE: string;
    EMAIL_ID: string;
    FONT_OF_SIGN: string;
    QUALIFICATION: string;
    REGISTRATION_NUMBER: string;
    RESEARCH_EXPERIENCE: string;
    SIGNATURE: string;
    SIGNATURE_TYPE: string;
    TEXT_OF_SIGN: string;
    TYPE_OF_PROFESSION: string;
    WORK_EXPERIENCE: string;
    WORK_EXPERIENCE_DETAILS: string;
    WHATS_APP_NUMBER: string;
    ROLE: string;
    USER_NAME: string;
    IS_NEW_DOCTOR: string;
};
export declare const facility: {
    facilities: {
        id: number;
        name: string;
    }[];
};
export declare const specialization: {
    specializations: {
        id: number;
        name: string;
    }[];
};
export declare const refer_specialization: {
    refer_specializations: {
        id: number;
        name: string;
    }[];
};
export declare const refer_prioritie: {
    refer_priorities: {
        id: number;
        name: string;
    }[];
};
export declare const strength: {
    strengthList: {
        id: number;
        name: string;
    }[];
};
export declare const days: {
    daysList: {
        id: number;
        name: string;
    }[];
};
export declare const timing: {
    timingList: {
        id: number;
        name: string;
    }[];
};
export declare const PICK_FORMATS: {
    parse: {
        dateInput: {
            month: string;
            year: string;
            day: string;
        };
    };
    display: {
        dateInput: string;
        monthYearLabel: {
            year: string;
            month: string;
        };
        dateA11yLabel: {
            year: string;
            month: string;
            day: string;
        };
        monthYearA11yLabel: {
            year: string;
            month: string;
        };
    };
};
export declare const conceptIds: {
    conceptAdditionlDocument: string;
    conceptPhysicalExamination: string;
    conceptDiagnosis: string;
    conceptNote: string;
    conceptMed: string;
    conceptAdvice: string;
    conceptTest: string;
    conceptReferral: string;
    conceptFollow: string;
    conceptDDx: string;
    conceptDiagnosisClass: string;
    conceptPastMedicalHistoryNotes: string;
    conceptFamilyHistoryNotes: string;
    conceptFollowUpInstruction: string;
};
export declare const WEBRTC: {
    CHAT_TEXT_LIMIT: number;
};
export declare const visitAttributeTypes: {
    patientCallDuration: string;
};
