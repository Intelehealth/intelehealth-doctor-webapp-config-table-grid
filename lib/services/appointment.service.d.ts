import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { ScheduleModel } from "../model/model";
import { AppointmentModel } from "../model/model";
import * as i0 from "@angular/core";
export declare class AppointmentService {
    private http;
    private mindmapURL;
    constructor(http: HttpClient, environment: any);
    /**
    * Create or update appointment
    * @param {any} payload - Payload for create or update appointment
    * @return {Observable<any>}
    */
    updateOrCreateAppointment(payload: ScheduleModel): Observable<any>;
    /**
    * Update daysOffs
    * @param {any} payload - Payload for update daysOff's
    * @return {Observable<any>}
    */
    updateDaysOff(payload: {
        userUuid: any;
        daysOff: any[] | string[];
        month: string;
        year: any;
    }): Observable<any>;
    /**
    * Get user appointments
    * @param {string} userUuid - User uuid
    * @param {string} year - Year
    * @param {string} month - Month
    * @return {Observable<any>}
    */
    getUserAppoitment(userUuid: string, year: string, month: string): Observable<any>;
    /**
    * Get user slots
    * @param {string} userUuid - User uuid
    * @param {string} fromDate - From date
    * @param {string} toDate - To date
    * @return {Observable<any>}
    */
    getUserSlots(userUuid: string, fromDate: string, toDate: string, speciality?: any): Observable<any>;
    /**
    * Get user appointment slots
    * @param {string} fromDate - From date
    * @param {string} toDate - To date
    * @param {string} speciality - Speciality
    * @return {Observable<any>}
    */
    getAppointmentSlots(fromDate: string, toDate: string, speciality: any): Observable<any>;
    /**
    * Get appointment for a visit
    * @param {string} visitId - Visit uuid
    * @return {Observable<any>}
    */
    getAppointment(visitId: string): Observable<any>;
    /**
    * Get scheduled months
    * @param {string} userUuid - User uuid
    * @param {string} year - Year
    * @param {string} speciality - Speciality
    * @return {Observable<any>}
    */
    getScheduledMonths(userUuid: any, year: string, speciality?: string): Observable<any>;
    /**
    * Get followup visits
    * @param {string} providerId - Provider uuid
    * @return {Observable<any>}
    */
    getFollowUpVisit(providerId: string): Observable<any>;
    /**
    * Reschedule appointment
    * @param {string} payload - Payload to reschedule appointment
    * @return {Observable<any>}
    */
    rescheduleAppointment(payload: AppointmentModel): Observable<any>;
    /**
    * Cancel appointment
    * @param {string} payload - Payload to cancel appointment
    * @return {Observable<any>}
    */
    cancelAppointment(payload: {
        id: any;
        visitUuid: any;
        hwUUID: any;
    }): Observable<any>;
    /**
    * Complete appointment
    * @param {string} payload - Payload to complete appointment
    * @return {Observable<any>}
    */
    completeAppointment(payload: {
        visitUuid: string;
    }): Observable<any>;
    /**
    * Check appointment present or not
    * @param {string} userUuid - User uuid
    * @param {string} fromDate - From date
    * @param {string} toDate - To date
    * @param {string} speciality - Speciality
    * @return {Observable<any>}
    */
    checkAppointmentPresent(userUuid: string, fromDate: string, toDate: string, speciality: string): Observable<any>;
    /**
    * Update speciality for the calendar slots
    * @param {string} userUuid - User uuid
    * @param {string} speciality - Speciality
    * @return {Observable<any>}
    */
    updateSlotSpeciality(userUuid: string, speciality: string): Observable<any>;
    static ɵfac: i0.ɵɵFactoryDeclaration<AppointmentService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<AppointmentService>;
}
