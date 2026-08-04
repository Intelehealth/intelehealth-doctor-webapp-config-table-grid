import { HttpClient } from '@angular/common/http';
import { LanguageModel, PatientRegistrationFieldsConfigModel, VitalModel, SpecializationModel, WebRTCConfigModel, PatientVisitSummaryConfigModel, PatientVisitSection } from '../model/model';
import * as i0 from "@angular/core";
export declare class AppConfigService {
    private http;
    private configURL;
    version: string;
    apiEndpoint: string;
    specialization: SpecializationModel[];
    language: LanguageModel[];
    patient_registration: PatientRegistrationFieldsConfigModel;
    theme_config: any[];
    patient_vitals: VitalModel[];
    patient_diagnostics: any[];
    webrtc_section: boolean;
    webrtc: WebRTCConfigModel;
    patient_visit_summary: PatientVisitSummaryConfigModel;
    patient_vitals_section: boolean;
    patient_reg_other: boolean;
    patient_reg_address: boolean;
    abha_section: boolean;
    sidebar_menus: {
        [key: string]: boolean;
    };
    patient_visit_sections: PatientVisitSection[];
    constructor(http: HttpClient, environment: any);
    load(): Promise<any>;
    setPatientVisitSections(data: any): void;
    get tourConfig(): any;
    get patientRegFields(): any[];
    checkPatientRegField(fieldName: any, fields: string | any[]): boolean;
    static ɵfac: i0.ɵɵFactoryDeclaration<AppConfigService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<AppConfigService>;
}
