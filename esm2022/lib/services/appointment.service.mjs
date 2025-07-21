import { HttpClient } from "@angular/common/http";
import { Inject, Injectable } from "@angular/core";
import * as i0 from "@angular/core";
import * as i1 from "@angular/common/http";
export class AppointmentService {
    http;
    mindmapURL;
    constructor(http, environment) {
        this.http = http;
        this.mindmapURL = environment.mindmapURL;
    }
    /**
    * Create or update appointment
    * @param {any} payload - Payload for create or update appointment
    * @return {Observable<any>}
    */
    updateOrCreateAppointment(payload) {
        return this.http.post(`${this.mindmapURL}/appointment/createOrUpdateSchedule`, payload);
    }
    /**
    * Update daysOffs
    * @param {any} payload - Payload for update daysOff's
    * @return {Observable<any>}
    */
    updateDaysOff(payload) {
        return this.http.post(`${this.mindmapURL}/appointment/updateDaysOff`, payload);
    }
    /**
    * Get user appointments
    * @param {string} userUuid - User uuid
    * @param {string} year - Year
    * @param {string} month - Month
    * @return {Observable<any>}
    */
    getUserAppoitment(userUuid, year, month) {
        return this.http.get(`${this.mindmapURL}/appointment/getSchedule/${userUuid}?year=${year}&month=${month}`);
    }
    /**
    * Get user slots
    * @param {string} userUuid - User uuid
    * @param {string} fromDate - From date
    * @param {string} toDate - To date
    * @return {Observable<any>}
    */
    getUserSlots(userUuid, fromDate, toDate, speciality = null, pending_visits = null) {
        let url = `${this.mindmapURL}/appointment/getUserSlots/${userUuid}?fromDate=${fromDate}&toDate=${toDate}`;
        if (speciality) {
            url += `&speciality=${speciality}`;
        }
        if (pending_visits != null) {
            url += `&pending_visits=` + pending_visits;
        }
        return this.http.get(url);
    }
    /**
    * Get user appointment slots
    * @param {string} fromDate - From date
    * @param {string} toDate - To date
    * @param {string} speciality - Speciality
    * @return {Observable<any>}
    */
    getAppointmentSlots(fromDate, toDate, speciality) {
        return this.http.get(`${this.mindmapURL}/appointment/getAppointmentSlots?fromDate=${fromDate}&toDate=${toDate}&speciality=${speciality}`);
    }
    /**
    * Get appointment for a visit
    * @param {string} visitId - Visit uuid
    * @return {Observable<any>}
    */
    getAppointment(visitId) {
        return this.http.get(`${this.mindmapURL}/appointment/getAppointment/${visitId}`);
    }
    /**
    * Get scheduled months
    * @param {string} userUuid - User uuid
    * @param {string} year - Year
    * @param {string} speciality - Speciality
    * @return {Observable<any>}
    */
    getScheduledMonths(userUuid, year, speciality = null) {
        let url = `${this.mindmapURL}/appointment/getScheduledMonths/${userUuid}?year=${year}`;
        if (speciality) {
            url += `&speciality=${speciality}`;
        }
        return this.http.get(url);
    }
    /**
    * Get followup visits
    * @param {string} providerId - Provider uuid
    * @return {Observable<any>}
    */
    getFollowUpVisit(providerId) {
        return this.http.get(`${this.mindmapURL}/openmrs/getFollowUpVisit/${providerId}`);
    }
    /**
    * Reschedule appointment
    * @param {string} payload - Payload to reschedule appointment
    * @return {Observable<any>}
    */
    rescheduleAppointment(payload) {
        return this.http.post(`${this.mindmapURL}/appointment/rescheduleAppointment`, { ...payload, webApp: true });
    }
    /**
    * Cancel appointment
    * @param {string} payload - Payload to cancel appointment
    * @return {Observable<any>}
    */
    cancelAppointment(payload) {
        return this.http.post(`${this.mindmapURL}/appointment/cancelAppointment`, { ...payload, webApp: true });
    }
    /**
    * Complete appointment
    * @param {string} payload - Payload to complete appointment
    * @return {Observable<any>}
    */
    completeAppointment(payload) {
        return this.http.post(`${this.mindmapURL}/appointment/completeAppointment`, payload);
    }
    /**
    * Check appointment present or not
    * @param {string} userUuid - User uuid
    * @param {string} fromDate - From date
    * @param {string} toDate - To date
    * @param {string} speciality - Speciality
    * @return {Observable<any>}
    */
    checkAppointmentPresent(userUuid, fromDate, toDate, speciality) {
        return this.http.get(`${this.mindmapURL}/appointment/checkAppointment/${userUuid}?fromDate=${fromDate}&toDate=${toDate}&speciality=${speciality}`);
    }
    /**
    * Update speciality for the calendar slots
    * @param {string} userUuid - User uuid
    * @param {string} speciality - Speciality
    * @return {Observable<any>}
    */
    updateSlotSpeciality(userUuid, speciality) {
        return this.http.put(`${this.mindmapURL}/appointment/updateSlotSpeciality/${userUuid}?speciality=${speciality}`, null);
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.3.0", ngImport: i0, type: AppointmentService, deps: [{ token: i1.HttpClient }, { token: 'environment' }], target: i0.ɵɵFactoryTarget.Injectable });
    static ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "14.3.0", ngImport: i0, type: AppointmentService, providedIn: "root" });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.3.0", ngImport: i0, type: AppointmentService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: "root",
                }]
        }], ctorParameters: function () { return [{ type: i1.HttpClient }, { type: undefined, decorators: [{
                    type: Inject,
                    args: ['environment']
                }] }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwb2ludG1lbnQuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL2loLWxpYnJhcnkvc3JjL2xpYi9zZXJ2aWNlcy9hcHBvaW50bWVudC5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxzQkFBc0IsQ0FBQztBQUNsRCxPQUFPLEVBQUUsTUFBTSxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQzs7O0FBUW5ELE1BQU0sT0FBTyxrQkFBa0I7SUFJbkI7SUFIRixVQUFVLENBQUM7SUFFbkIsWUFDVSxJQUFnQixFQUNELFdBQVc7UUFEMUIsU0FBSSxHQUFKLElBQUksQ0FBWTtRQUd4QixJQUFJLENBQUMsVUFBVSxHQUFHLFdBQVcsQ0FBQyxVQUFVLENBQUM7SUFDM0MsQ0FBQztJQUVEOzs7O01BSUU7SUFDRix5QkFBeUIsQ0FBQyxPQUFzQjtRQUM5QyxPQUFPLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUNuQixHQUFHLElBQUksQ0FBQyxVQUFVLHFDQUFxQyxFQUN2RCxPQUFPLENBQ1IsQ0FBQztJQUNKLENBQUM7SUFFRDs7OztNQUlFO0lBQ0YsYUFBYSxDQUFDLE9BQWdGO1FBQzVGLE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQ25CLEdBQUcsSUFBSSxDQUFDLFVBQVUsNEJBQTRCLEVBQzlDLE9BQU8sQ0FDUixDQUFDO0lBQ0osQ0FBQztJQUVEOzs7Ozs7TUFNRTtJQUNGLGlCQUFpQixDQUFDLFFBQWdCLEVBQUUsSUFBWSxFQUFFLEtBQWE7UUFDN0QsT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FDbEIsR0FBRyxJQUFJLENBQUMsVUFBVSw0QkFBNEIsUUFBUSxTQUFTLElBQUksVUFBVSxLQUFLLEVBQUUsQ0FDckYsQ0FBQztJQUNKLENBQUM7SUFFRDs7Ozs7O01BTUU7SUFDRixZQUFZLENBQUMs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QU8sSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQ2xCLEdBQUcsSUFBSSxDQUFDLFVBQVUscUNBQXFDLFFBQVEsZUFBZSxVQUFVLEVBQUUsRUFDMUYsSUFBSSxDQUNMLENBQUM7SUFDSixDQUFDO3VHQWpMVSxrQkFBa0IsNENBS25CLGFBQWE7MkdBTFosa0JBQWtCLGNBRmpCLE1BQU07OzJGQUVQLGtCQUFrQjtrQkFIOUIsVUFBVTttQkFBQztvQkFDVixVQUFVLEVBQUUsTUFBTTtpQkFDbkI7OzBCQU1JLE1BQU07MkJBQUMsYUFBYSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEh0dHBDbGllbnQgfSBmcm9tIFwiQGFuZ3VsYXIvY29tbW9uL2h0dHBcIjtcbmltcG9ydCB7IEluamVjdCwgSW5qZWN0YWJsZSB9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XG5pbXBvcnQgeyBPYnNlcnZhYmxlIH0gZnJvbSBcInJ4anNcIjtcbmltcG9ydCB7IFNjaGVkdWxlTW9kZWwgfSBmcm9tIFwiLi4vbW9kZWwvbW9kZWxcIjtcbmltcG9ydCB7IEFwcG9pbnRtZW50TW9kZWwgfSBmcm9tIFwiLi4vbW9kZWwvbW9kZWxcIjtcblxuQEluamVjdGFibGUoe1xuICBwcm92aWRlZEluOiBcInJvb3RcIixcbn0pXG5leHBvcnQgY2xhc3MgQXBwb2ludG1lbnRTZXJ2aWNlIHtcbiAgcHJpdmF0ZSBtaW5kbWFwVVJMO1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIHByaXZhdGUgaHR0cDogSHR0cENsaWVudCxcbiAgICBASW5qZWN0KCdlbnZpcm9ubWVudCcpIGVudmlyb25tZW50XG4gICkge1xuICAgIHRoaXMubWluZG1hcFVSTCA9IGVudmlyb25tZW50Lm1pbmRtYXBVUkw7XG4gIH1cblxuICAvKipcbiAgKiBDcmVhdGUgb3IgdXBkYXRlIGFwcG9pbnRtZW50XG4gICogQHBhcmFtIHthbnl9IHBheWxvYWQgLSBQYXlsb2FkIGZvciBjcmVhdGUgb3IgdXBkYXRlIGFwcG9pbnRtZW50XG4gICogQHJldHVybiB7T2JzZXJ2YWJsZTxhbnk+fVxuICAqL1xuICB1cGRhdGVPckNyZWF0ZUFwcG9pbnRtZW50KHBheWxvYWQ6IFNjaGVkdWxlTW9kZWwpOiBPYnNlcnZhYmxlPGFueT4ge1xuICAgIHJldHVybiB0aGlzLmh0dHAucG9zdChcbiAgICAgIGAke3RoaXMubWluZG1hcFVSTH0vYXBwb2ludG1lbnQvY3JlYXRlT3JVcGRhdGVTY2hlZHVsZWAsXG4gICAgICBwYXlsb2FkXG4gICAgKTtcbiAgfVxuXG4gIC8qKlxuICAqIFVwZGF0ZSBkYXlzT2Zmc1xuICAqIEBwYXJhbSB7YW55fSBwYXlsb2FkIC0gUGF5bG9hZCBmb3IgdXBkYXRlIGRheXNPZmYnc1xuICAqIEByZXR1cm4ge09ic2VydmFibGU8YW55Pn1cbiAgKi9cbiAgdXBkYXRlRGF5c09mZihwYXlsb2FkOiB7IHVzZXJVdWlkOiBhbnk7IGRheXNPZmY6IGFueVtdIHwgc3RyaW5nW107IG1vbnRoOiBzdHJpbmc7IHllYXI6IGFueTsgfSk6IE9ic2VydmFibGU8YW55PiB7XG4gICAgcmV0dXJuIHRoaXMuaHR0cC5wb3N0KFxuICAgICAgYCR7dGhpcy5taW5kbWFwVVJMfS9hcHBvaW50bWVudC91cGRhdGVEYXlzT2ZmYCxcbiAgICAgIHBheWxvYWRcbiAgICApO1xuICB9XG5cbiAgLyoqXG4gICogR2V0IHVzZXIgYXBwb2ludG1lbnRzXG4gICogQHBhcmFtIHtzdHJpbmd9IHVzZXJVdWlkIC0gVXNlciB1dWlkXG4gICogQHBhcmFtIHtzdHJpbmd9IHllYXIgLSBZZWFyXG4gICogQHBhcmFtIHtzdHJpbmd9IG1vbnRoIC0gTW9udGhcbiAgKiBAcmV0dXJuIHtPYnNlcnZhYmxlPGFueT59XG4gICovXG4gIGdldFVzZXJBcHBvaXRtZW50KHVzZXJVdWlkOiBzdHJpbmcsIHllYXI6IHN0cmluZywgbW9udGg6IHN0cmluZyk6IE9ic2VydmFibGU8YW55PiB7XG4gICAgcmV0dXJuIHRoaXMuaHR0cC5nZXQoXG4gICAgICBgJHt0aGlzLm1pbmRtYXBVUkx9L2FwcG9pbnRtZW50L2dldFNjaGVkdWxlLyR7dXNlclV1aWR9P3llYXI9JHt5ZWFyfSZtb250aD0ke21vbnRofWBcbiAgICApO1xuICB9XG5cbiAgLyoqXG4gICogR2V0IHVzZXIgc2xvdHNcbiAgKiBAcGFyYW0ge3N0cmluZ30gdXNlclV1aWQgLSBVc2VyIHV1aWRcbiAgKiBAcGFyYW0ge3N0cmluZ30gZnJvbURhdGUgLSBGcm9tIGRhdGVcbiAgKiBAcGFyYW0ge3N0cmluZ30gdG9EYXRlIC0gVG8gZGF0ZVxuICAqIEByZXR1cm4ge09ic2VydmFibGU8YW55Pn1cbiAgKi9cbiAgZ2V0VXNlclNsb3RzKHVzZXJVdWlkOiBzdHJpbmcsIGZyb21EYXRlOiBzdHJpbmcsIHRvRGF0ZTogc3RyaW5nLCBzcGVjaWFsaXR5ID0gbnVsbCwgcGVuZGluZ192aXNpdHMgPSBudWxsKTogT2JzZXJ2YWJsZTxhbnk+IHtcbiAgICBsZXQgdXJsID0gYCR7dGhpcy5taW5kbWFwVVJMfS9hcHBvaW50bWVudC9nZXRVc2VyU2xvdHMvJHt1c2VyVXVpZH0/ZnJvbURhdGU9JHtmcm9tRGF0ZX0mdG9EYXRlPSR7dG9EYXRlfWBcbiAgXG4gICAgaWYoc3BlY2lhbGl0eSkge1xuICAgICAgdXJsICs9IGAmc3BlY2lhbGl0eT0ke3NwZWNpYWxpdHl9YDtcbiAgICB9XG4gICAgaWYocGVuZGluZ192aXNpdHMgIT0gbnVsbCkge1xuICAgICAgdXJsICs9IGAmcGVuZGluZ192aXNpdHM9YCtwZW5kaW5nX3Zpc2l0cztcbiAgICB9XG4gICAgcmV0dXJuIHRoaXMuaHR0cC5nZXQodXJsKTtcbiAgfVxuXG4gIC8qKlxuICAqIEdldCB1c2VyIGFwcG9pbnRtZW50IHNsb3RzXG4gICogQHBhcmFtIHtzdHJpbmd9IGZyb21EYXRlIC0gRnJvbSBkYXRlXG4gICogQHBhcmFtIHtzdHJpbmd9IHRvRGF0ZSAtIFRvIGRhdGVcbiAgKiBAcGFyYW0ge3N0cmluZ30gc3BlY2lhbGl0eSAtIFNwZWNpYWxpdHlcbiAgKiBAcmV0dXJuIHtPYnNlcnZhYmxlPGFueT59XG4gICovXG4gIGdldEFwcG9pbnRtZW50U2xvdHMoZnJvbURhdGU6IHN0cmluZywgdG9EYXRlOiBzdHJpbmcsIHNwZWNpYWxpdHk6IGFueSk6IE9ic2VydmFibGU8YW55PiB7XG4gICAgcmV0dXJuIHRoaXMuaHR0cC5nZXQoXG4gICAgICBgJHt0aGlzLm1pbmRtYXBVUkx9L2FwcG9pbnRtZW50L2dldEFwcG9pbnRtZW50U2xvdHM/ZnJvbURhdGU9JHtmcm9tRGF0ZX0mdG9EYXRlPSR7dG9EYXRlfSZzcGVjaWFsaXR5PSR7c3BlY2lhbGl0eX1gXG4gICAgKTtcbiAgfVxuXG4gIC8qKlxuICAqIEdldCBhcHBvaW50bWVudCBmb3IgYSB2aXNpdFxuICAqIEBwYXJhbSB7c3RyaW5nfSB2aXNpdElkIC0gVmlzaXQgdXVpZFxuICAqIEByZXR1cm4ge09ic2VydmFibGU8YW55Pn1cbiAgKi9cbiAgZ2V0QXBwb2ludG1lbnQodmlzaXRJZDogc3RyaW5nKTogT2JzZXJ2YWJsZTxhbnk+IHtcbiAgICByZXR1cm4gdGhpcy5odHRwLmdldChcbiAgICAgIGAke3RoaXMubWluZG1hcFVSTH0vYXBwb2ludG1lbnQvZ2V0QXBwb2ludG1lbnQvJHt2aXNpdElkfWBcbiAgICApO1xuICB9XG5cbiAgLyoqXG4gICogR2V0IHNjaGVkdWxlZCBtb250aHNcbiAgKiBAcGFyYW0ge3N0cmluZ30gdXNlclV1aWQgLSBVc2VyIHV1aWRcbiAgKiBAcGFyYW0ge3N0cmluZ30geWVhciAtIFllYXJcbiAgKiBAcGFyYW0ge3N0cmluZ30gc3BlY2lhbGl0eSAtIFNwZWNpYWxpdHlcbiAgKiBAcmV0dXJuIHtPYnNlcnZhYmxlPGFueT59XG4gICovXG4gIGdldFNjaGVkdWxlZE1vbnRocyh1c2VyVXVpZDogYW55LCB5ZWFyOiBzdHJpbmcsIHNwZWNpYWxpdHk6IHN0cmluZyA9IG51bGwpOiBPYnNlcnZhYmxlPGFueT4ge1xuICAgIGxldCB1cmwgPSBgJHt0aGlzLm1pbmRtYXBVUkx9L2FwcG9pbnRtZW50L2dldFNjaGVkdWxlZE1vbnRocy8ke3VzZXJVdWlkfT95ZWFyPSR7eWVhcn1gO1xuICAgIGlmKHNwZWNpYWxpdHkpIHtcbiAgICAgIHVybCArPSBgJnNwZWNpYWxpdHk9JHtzcGVjaWFsaXR5fWA7XG4gICAgfVxuICAgIHJldHVybiB0aGlzLmh0dHAuZ2V0KHVybCk7XG4gIH1cblxuICAvKipcbiAgKiBHZXQgZm9sbG93dXAgdmlzaXRzXG4gICogQHBhcmFtIHtzdHJpbmd9IHByb3ZpZGVySWQgLSBQcm92aWRlciB1dWlkXG4gICogQHJldHVybiB7T2JzZXJ2YWJsZTxhbnk+fVxuICAqL1xuICBnZXRGb2xsb3dVcFZpc2l0KHByb3ZpZGVySWQ6IHN0cmluZyk6IE9ic2VydmFibGU8YW55PiB7XG4gICAgcmV0dXJuIHRoaXMuaHR0cC5nZXQoXG4gICAgICBgJHt0aGlzLm1pbmRtYXBVUkx9L29wZW5tcnMvZ2V0Rm9sbG93VXBWaXNpdC8ke3Byb3ZpZGVySWR9YFxuICAgICk7XG4gIH1cblxuICAvKipcbiAgKiBSZXNjaGVkdWxlIGFwcG9pbnRtZW50XG4gICogQHBhcmFtIHtzdHJpbmd9IHBheWxvYWQgLSBQYXlsb2FkIHRvIHJlc2NoZWR1bGUgYXBwb2ludG1lbnRcbiAgKiBAcmV0dXJuIHtPYnNlcnZhYmxlPGFueT59XG4gICovXG4gIHJlc2NoZWR1bGVBcHBvaW50bWVudChwYXlsb2FkOiBBcHBvaW50bWVudE1vZGVsKTogT2JzZXJ2YWJsZTxhbnk+IHtcbiAgICByZXR1cm4gdGhpcy5odHRwLnBvc3QoXG4gICAgICBgJHt0aGlzLm1pbmRtYXBVUkx9L2FwcG9pbnRtZW50L3Jlc2NoZWR1bGVBcHBvaW50bWVudGAsXG4gICAgICB7Li4ucGF5bG9hZCwgd2ViQXBwOiB0cnVlfVxuICAgICk7XG4gIH1cblxuICAvKipcbiAgKiBDYW5jZWwgYXBwb2ludG1lbnRcbiAgKiBAcGFyYW0ge3N0cmluZ30gcGF5bG9hZCAtIFBheWxvYWQgdG8gY2FuY2VsIGFwcG9pbnRtZW50XG4gICogQHJldHVybiB7T2JzZXJ2YWJsZTxhbnk+fVxuICAqL1xuICBjYW5jZWxBcHBvaW50bWVudChwYXlsb2FkOiB7IGlkOiBhbnk7IHZpc2l0VXVpZDogYW55OyBod1VVSUQ6IGFueTsgfSk6IE9ic2VydmFibGU8YW55PiB7XG4gICAgcmV0dXJuIHRoaXMuaHR0cC5wb3N0KFxuICAgICAgYCR7dGhpcy5taW5kbWFwVVJMfS9hcHBvaW50bWVudC9jYW5jZWxBcHBvaW50bWVudGAsXG4gICAgICB7Li4ucGF5bG9hZCwgd2ViQXBwOiB0cnVlfVxuICAgICk7XG4gIH1cblxuICAvKipcbiAgKiBDb21wbGV0ZSBhcHBvaW50bWVudFxuICAqIEBwYXJhbSB7c3RyaW5nfSBwYXlsb2FkIC0gUGF5bG9hZCB0byBjb21wbGV0ZSBhcHBvaW50bWVudFxuICAqIEByZXR1cm4ge09ic2VydmFibGU8YW55Pn1cbiAgKi9cbiAgY29tcGxldGVBcHBvaW50bWVudChwYXlsb2FkOiB7IHZpc2l0VXVpZDogc3RyaW5nOyB9KTogT2JzZXJ2YWJsZTxhbnk+IHtcbiAgICByZXR1cm4gdGhpcy5odHRwLnBvc3QoXG4gICAgICBgJHt0aGlzLm1pbmRtYXBVUkx9L2FwcG9pbnRtZW50L2NvbXBsZXRlQXBwb2ludG1lbnRgLFxuICAgICAgcGF5bG9hZFxuICAgICk7XG4gIH1cblxuICAvKipcbiAgKiBDaGVjayBhcHBvaW50bWVudCBwcmVzZW50IG9yIG5vdFxuICAqIEBwYXJhbSB7c3RyaW5nfSB1c2VyVXVpZCAtIFVzZXIgdXVpZFxuICAqIEBwYXJhbSB7c3RyaW5nfSBmcm9tRGF0ZSAtIEZyb20gZGF0ZVxuICAqIEBwYXJhbSB7c3RyaW5nfSB0b0RhdGUgLSBUbyBkYXRlXG4gICogQHBhcmFtIHtzdHJpbmd9IHNwZWNpYWxpdHkgLSBTcGVjaWFsaXR5XG4gICogQHJldHVybiB7T2JzZXJ2YWJsZTxhbnk+fVxuICAqL1xuICBjaGVja0FwcG9pbnRtZW50UHJlc2VudCh1c2VyVXVpZDogc3RyaW5nLCBmcm9tRGF0ZTogc3RyaW5nLCB0b0RhdGU6IHN0cmluZywgc3BlY2lhbGl0eTogc3RyaW5nKTogT2JzZXJ2YWJsZTxhbnk+IHtcbiAgICByZXR1cm4gdGhpcy5odHRwLmdldChcbiAgICAgIGAke3RoaXMubWluZG1hcFVSTH0vYXBwb2ludG1lbnQvY2hlY2tBcHBvaW50bWVudC8ke3VzZXJVdWlkfT9mcm9tRGF0ZT0ke2Zyb21EYXRlfSZ0b0RhdGU9JHt0b0RhdGV9JnNwZWNpYWxpdHk9JHtzcGVjaWFsaXR5fWBcbiAgICApO1xuICB9XG5cbiAgLyoqXG4gICogVXBkYXRlIHNwZWNpYWxpdHkgZm9yIHRoZSBjYWxlbmRhciBzbG90c1xuICAqIEBwYXJhbSB7c3RyaW5nfSB1c2VyVXVpZCAtIFVzZXIgdXVpZFxuICAqIEBwYXJhbSB7c3RyaW5nfSBzcGVjaWFsaXR5IC0gU3BlY2lhbGl0eVxuICAqIEByZXR1cm4ge09ic2VydmFibGU8YW55Pn1cbiAgKi9cbiAgdXBkYXRlU2xvdFNwZWNpYWxpdHkodXNlclV1aWQ6IHN0cmluZywgc3BlY2lhbGl0eTogc3RyaW5nKTogT2JzZXJ2YWJsZTxhbnk+IHtcbiAgICByZXR1cm4gdGhpcy5odHRwLnB1dChcbiAgICAgIGAke3RoaXMubWluZG1hcFVSTH0vYXBwb2ludG1lbnQvdXBkYXRlU2xvdFNwZWNpYWxpdHkvJHt1c2VyVXVpZH0/c3BlY2lhbGl0eT0ke3NwZWNpYWxpdHl9YCxcbiAgICAgIG51bGxcbiAgICApO1xuICB9XG59XG4iXX0=