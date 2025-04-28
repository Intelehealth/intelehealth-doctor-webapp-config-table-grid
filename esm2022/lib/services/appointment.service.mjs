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
        return this.http.post(`${this.mindmapURL}/appointment/rescheduleAppointment`, payload);
    }
    /**
    * Cancel appointment
    * @param {string} payload - Payload to cancel appointment
    * @return {Observable<any>}
    */
    cancelAppointment(payload) {
        return this.http.post(`${this.mindmapURL}/appointment/cancelAppointment`, payload);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwb2ludG1lbnQuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL2loLWxpYnJhcnkvc3JjL2xpYi9zZXJ2aWNlcy9hcHBvaW50bWVudC5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxzQkFBc0IsQ0FBQztBQUNsRCxPQUFPLEVBQUUsTUFBTSxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQzs7O0FBUW5ELE1BQU0sT0FBTyxrQkFBa0I7SUFJbkI7SUFIRixVQUFVLENBQUM7SUFFbkIsWUFDVSxJQUFnQixFQUNELFdBQVc7UUFEMUIsU0FBSSxHQUFKLElBQUksQ0FBWTtRQUd4QixJQUFJLENBQUMsVUFBVSxHQUFHLFdBQVcsQ0FBQyxVQUFVLENBQUM7SUFDM0MsQ0FBQztJQUVEOzs7O01BSUU7SUFDRix5QkFBeUIsQ0FBQyxPQUFzQjtRQUM5QyxPQUFPLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUNuQixHQUFHLElBQUksQ0FBQyxVQUFVLHFDQUFxQyxFQUN2RCxPQUFPLENBQ1IsQ0FBQztJQUNKLENBQUM7SUFFRDs7OztNQUlFO0lBQ0YsYUFBYSxDQUFDLE9BQWdGO1FBQzVGLE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQ25CLEdBQUcsSUFBSSxDQUFDLFVBQVUsNEJBQTRCLEVBQzlDLE9BQU8sQ0FDUixDQUFDO0lBQ0osQ0FBQztJQUVEOzs7Ozs7TUFNRTtJQUNGLGlCQUFpQixDQUFDLFFBQWdCLEVBQUUsSUFBWSxFQUFFLEtBQWE7UUFDN0QsT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FDbEIsR0FBRyxJQUFJLENBQUMsVUFBVSw0QkFBNEIsUUFBUSxTQUFTLElBQUksVUFBVSxLQUFLLEVBQUUsQ0FDckYsQ0FBQztJQUNKLENBQUM7SUFFRDs7Ozs7O01BTUU7SUFDRixZQUFZLENBQUMs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QUFVLEVBQUUsRUFDMUYsSUFBSSxDQUNMLENBQUM7SUFDSixDQUFDO3VHQWpMVSxrQkFBa0IsNENBS25CLGFBQWE7MkdBTFosa0JBQWtCLGNBRmpCLE1BQU07OzJGQUVQLGtCQUFrQjtrQkFIOUIsVUFBVTttQkFBQztvQkFDVixVQUFVLEVBQUUsTUFBTTtpQkFDbkI7OzBCQU1JLE1BQU07MkJBQUMsYUFBYSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEh0dHBDbGllbnQgfSBmcm9tIFwiQGFuZ3VsYXIvY29tbW9uL2h0dHBcIjtcclxuaW1wb3J0IHsgSW5qZWN0LCBJbmplY3RhYmxlIH0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcclxuaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gXCJyeGpzXCI7XHJcbmltcG9ydCB7IFNjaGVkdWxlTW9kZWwgfSBmcm9tIFwiLi4vbW9kZWwvbW9kZWxcIjtcclxuaW1wb3J0IHsgQXBwb2ludG1lbnRNb2RlbCB9IGZyb20gXCIuLi9tb2RlbC9tb2RlbFwiO1xyXG5cclxuQEluamVjdGFibGUoe1xyXG4gIHByb3ZpZGVkSW46IFwicm9vdFwiLFxyXG59KVxyXG5leHBvcnQgY2xhc3MgQXBwb2ludG1lbnRTZXJ2aWNlIHtcclxuICBwcml2YXRlIG1pbmRtYXBVUkw7XHJcblxyXG4gIGNvbnN0cnVjdG9yKFxyXG4gICAgcHJpdmF0ZSBodHRwOiBIdHRwQ2xpZW50LFxyXG4gICAgQEluamVjdCgnZW52aXJvbm1lbnQnKSBlbnZpcm9ubWVudFxyXG4gICkge1xyXG4gICAgdGhpcy5taW5kbWFwVVJMID0gZW52aXJvbm1lbnQubWluZG1hcFVSTDtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICogQ3JlYXRlIG9yIHVwZGF0ZSBhcHBvaW50bWVudFxyXG4gICogQHBhcmFtIHthbnl9IHBheWxvYWQgLSBQYXlsb2FkIGZvciBjcmVhdGUgb3IgdXBkYXRlIGFwcG9pbnRtZW50XHJcbiAgKiBAcmV0dXJuIHtPYnNlcnZhYmxlPGFueT59XHJcbiAgKi9cclxuICB1cGRhdGVPckNyZWF0ZUFwcG9pbnRtZW50KHBheWxvYWQ6IFNjaGVkdWxlTW9kZWwpOiBPYnNlcnZhYmxlPGFueT4ge1xyXG4gICAgcmV0dXJuIHRoaXMuaHR0cC5wb3N0KFxyXG4gICAgICBgJHt0aGlzLm1pbmRtYXBVUkx9L2FwcG9pbnRtZW50L2NyZWF0ZU9yVXBkYXRlU2NoZWR1bGVgLFxyXG4gICAgICBwYXlsb2FkXHJcbiAgICApO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgKiBVcGRhdGUgZGF5c09mZnNcclxuICAqIEBwYXJhbSB7YW55fSBwYXlsb2FkIC0gUGF5bG9hZCBmb3IgdXBkYXRlIGRheXNPZmYnc1xyXG4gICogQHJldHVybiB7T2JzZXJ2YWJsZTxhbnk+fVxyXG4gICovXHJcbiAgdXBkYXRlRGF5c09mZihwYXlsb2FkOiB7IHVzZXJVdWlkOiBhbnk7IGRheXNPZmY6IGFueVtdIHwgc3RyaW5nW107IG1vbnRoOiBzdHJpbmc7IHllYXI6IGFueTsgfSk6IE9ic2VydmFibGU8YW55PiB7XHJcbiAgICByZXR1cm4gdGhpcy5odHRwLnBvc3QoXHJcbiAgICAgIGAke3RoaXMubWluZG1hcFVSTH0vYXBwb2ludG1lbnQvdXBkYXRlRGF5c09mZmAsXHJcbiAgICAgIHBheWxvYWRcclxuICAgICk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAqIEdldCB1c2VyIGFwcG9pbnRtZW50c1xyXG4gICogQHBhcmFtIHtzdHJpbmd9IHVzZXJVdWlkIC0gVXNlciB1dWlkXHJcbiAgKiBAcGFyYW0ge3N0cmluZ30geWVhciAtIFllYXJcclxuICAqIEBwYXJhbSB7c3RyaW5nfSBtb250aCAtIE1vbnRoXHJcbiAgKiBAcmV0dXJuIHtPYnNlcnZhYmxlPGFueT59XHJcbiAgKi9cclxuICBnZXRVc2VyQXBwb2l0bWVudCh1c2VyVXVpZDogc3RyaW5nLCB5ZWFyOiBzdHJpbmcsIG1vbnRoOiBzdHJpbmcpOiBPYnNlcnZhYmxlPGFueT4ge1xyXG4gICAgcmV0dXJuIHRoaXMuaHR0cC5nZXQoXHJcbiAgICAgIGAke3RoaXMubWluZG1hcFVSTH0vYXBwb2ludG1lbnQvZ2V0U2NoZWR1bGUvJHt1c2VyVXVpZH0/eWVhcj0ke3llYXJ9Jm1vbnRoPSR7bW9udGh9YFxyXG4gICAgKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICogR2V0IHVzZXIgc2xvdHNcclxuICAqIEBwYXJhbSB7c3RyaW5nfSB1c2VyVXVpZCAtIFVzZXIgdXVpZFxyXG4gICogQHBhcmFtIHtzdHJpbmd9IGZyb21EYXRlIC0gRnJvbSBkYXRlXHJcbiAgKiBAcGFyYW0ge3N0cmluZ30gdG9EYXRlIC0gVG8gZGF0ZVxyXG4gICogQHJldHVybiB7T2JzZXJ2YWJsZTxhbnk+fVxyXG4gICovXHJcbiAgZ2V0VXNlclNsb3RzKHVzZXJVdWlkOiBzdHJpbmcsIGZyb21EYXRlOiBzdHJpbmcsIHRvRGF0ZTogc3RyaW5nLCBzcGVjaWFsaXR5ID0gbnVsbCwgcGVuZGluZ192aXNpdHMgPSBudWxsKTogT2JzZXJ2YWJsZTxhbnk+IHtcclxuICAgIGxldCB1cmwgPSBgJHt0aGlzLm1pbmRtYXBVUkx9L2FwcG9pbnRtZW50L2dldFVzZXJTbG90cy8ke3VzZXJVdWlkfT9mcm9tRGF0ZT0ke2Zyb21EYXRlfSZ0b0RhdGU9JHt0b0RhdGV9YFxyXG4gIFxyXG4gICAgaWYoc3BlY2lhbGl0eSkge1xyXG4gICAgICB1cmwgKz0gYCZzcGVjaWFsaXR5PSR7c3BlY2lhbGl0eX1gO1xyXG4gICAgfVxyXG4gICAgaWYocGVuZGluZ192aXNpdHMgIT0gbnVsbCkge1xyXG4gICAgICB1cmwgKz0gYCZwZW5kaW5nX3Zpc2l0cz1gK3BlbmRpbmdfdmlzaXRzO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIHRoaXMuaHR0cC5nZXQodXJsKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICogR2V0IHVzZXIgYXBwb2ludG1lbnQgc2xvdHNcclxuICAqIEBwYXJhbSB7c3RyaW5nfSBmcm9tRGF0ZSAtIEZyb20gZGF0ZVxyXG4gICogQHBhcmFtIHtzdHJpbmd9IHRvRGF0ZSAtIFRvIGRhdGVcclxuICAqIEBwYXJhbSB7c3RyaW5nfSBzcGVjaWFsaXR5IC0gU3BlY2lhbGl0eVxyXG4gICogQHJldHVybiB7T2JzZXJ2YWJsZTxhbnk+fVxyXG4gICovXHJcbiAgZ2V0QXBwb2ludG1lbnRTbG90cyhmcm9tRGF0ZTogc3RyaW5nLCB0b0RhdGU6IHN0cmluZywgc3BlY2lhbGl0eTogYW55KTogT2JzZXJ2YWJsZTxhbnk+IHtcclxuICAgIHJldHVybiB0aGlzLmh0dHAuZ2V0KFxyXG4gICAgICBgJHt0aGlzLm1pbmRtYXBVUkx9L2FwcG9pbnRtZW50L2dldEFwcG9pbnRtZW50U2xvdHM/ZnJvbURhdGU9JHtmcm9tRGF0ZX0mdG9EYXRlPSR7dG9EYXRlfSZzcGVjaWFsaXR5PSR7c3BlY2lhbGl0eX1gXHJcbiAgICApO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgKiBHZXQgYXBwb2ludG1lbnQgZm9yIGEgdmlzaXRcclxuICAqIEBwYXJhbSB7c3RyaW5nfSB2aXNpdElkIC0gVmlzaXQgdXVpZFxyXG4gICogQHJldHVybiB7T2JzZXJ2YWJsZTxhbnk+fVxyXG4gICovXHJcbiAgZ2V0QXBwb2ludG1lbnQodmlzaXRJZDogc3RyaW5nKTogT2JzZXJ2YWJsZTxhbnk+IHtcclxuICAgIHJldHVybiB0aGlzLmh0dHAuZ2V0KFxyXG4gICAgICBgJHt0aGlzLm1pbmRtYXBVUkx9L2FwcG9pbnRtZW50L2dldEFwcG9pbnRtZW50LyR7dmlzaXRJZH1gXHJcbiAgICApO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgKiBHZXQgc2NoZWR1bGVkIG1vbnRoc1xyXG4gICogQHBhcmFtIHtzdHJpbmd9IHVzZXJVdWlkIC0gVXNlciB1dWlkXHJcbiAgKiBAcGFyYW0ge3N0cmluZ30geWVhciAtIFllYXJcclxuICAqIEBwYXJhbSB7c3RyaW5nfSBzcGVjaWFsaXR5IC0gU3BlY2lhbGl0eVxyXG4gICogQHJldHVybiB7T2JzZXJ2YWJsZTxhbnk+fVxyXG4gICovXHJcbiAgZ2V0U2NoZWR1bGVkTW9udGhzKHVzZXJVdWlkOiBhbnksIHllYXI6IHN0cmluZywgc3BlY2lhbGl0eTogc3RyaW5nID0gbnVsbCk6IE9ic2VydmFibGU8YW55PiB7XHJcbiAgICBsZXQgdXJsID0gYCR7dGhpcy5taW5kbWFwVVJMfS9hcHBvaW50bWVudC9nZXRTY2hlZHVsZWRNb250aHMvJHt1c2VyVXVpZH0/eWVhcj0ke3llYXJ9YDtcclxuICAgIGlmKHNwZWNpYWxpdHkpIHtcclxuICAgICAgdXJsICs9IGAmc3BlY2lhbGl0eT0ke3NwZWNpYWxpdHl9YDtcclxuICAgIH1cclxuICAgIHJldHVybiB0aGlzLmh0dHAuZ2V0KHVybCk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAqIEdldCBmb2xsb3d1cCB2aXNpdHNcclxuICAqIEBwYXJhbSB7c3RyaW5nfSBwcm92aWRlcklkIC0gUHJvdmlkZXIgdXVpZFxyXG4gICogQHJldHVybiB7T2JzZXJ2YWJsZTxhbnk+fVxyXG4gICovXHJcbiAgZ2V0Rm9sbG93VXBWaXNpdChwcm92aWRlcklkOiBzdHJpbmcpOiBPYnNlcnZhYmxlPGFueT4ge1xyXG4gICAgcmV0dXJuIHRoaXMuaHR0cC5nZXQoXHJcbiAgICAgIGAke3RoaXMubWluZG1hcFVSTH0vb3Blbm1ycy9nZXRGb2xsb3dVcFZpc2l0LyR7cHJvdmlkZXJJZH1gXHJcbiAgICApO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgKiBSZXNjaGVkdWxlIGFwcG9pbnRtZW50XHJcbiAgKiBAcGFyYW0ge3N0cmluZ30gcGF5bG9hZCAtIFBheWxvYWQgdG8gcmVzY2hlZHVsZSBhcHBvaW50bWVudFxyXG4gICogQHJldHVybiB7T2JzZXJ2YWJsZTxhbnk+fVxyXG4gICovXHJcbiAgcmVzY2hlZHVsZUFwcG9pbnRtZW50KHBheWxvYWQ6IEFwcG9pbnRtZW50TW9kZWwpOiBPYnNlcnZhYmxlPGFueT4ge1xyXG4gICAgcmV0dXJuIHRoaXMuaHR0cC5wb3N0KFxyXG4gICAgICBgJHt0aGlzLm1pbmRtYXBVUkx9L2FwcG9pbnRtZW50L3Jlc2NoZWR1bGVBcHBvaW50bWVudGAsXHJcbiAgICAgIHBheWxvYWRcclxuICAgICk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAqIENhbmNlbCBhcHBvaW50bWVudFxyXG4gICogQHBhcmFtIHtzdHJpbmd9IHBheWxvYWQgLSBQYXlsb2FkIHRvIGNhbmNlbCBhcHBvaW50bWVudFxyXG4gICogQHJldHVybiB7T2JzZXJ2YWJsZTxhbnk+fVxyXG4gICovXHJcbiAgY2FuY2VsQXBwb2ludG1lbnQocGF5bG9hZDogeyBpZDogYW55OyB2aXNpdFV1aWQ6IGFueTsgaHdVVUlEOiBhbnk7IH0pOiBPYnNlcnZhYmxlPGFueT4ge1xyXG4gICAgcmV0dXJuIHRoaXMuaHR0cC5wb3N0KFxyXG4gICAgICBgJHt0aGlzLm1pbmRtYXBVUkx9L2FwcG9pbnRtZW50L2NhbmNlbEFwcG9pbnRtZW50YCxcclxuICAgICAgcGF5bG9hZFxyXG4gICAgKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICogQ29tcGxldGUgYXBwb2ludG1lbnRcclxuICAqIEBwYXJhbSB7c3RyaW5nfSBwYXlsb2FkIC0gUGF5bG9hZCB0byBjb21wbGV0ZSBhcHBvaW50bWVudFxyXG4gICogQHJldHVybiB7T2JzZXJ2YWJsZTxhbnk+fVxyXG4gICovXHJcbiAgY29tcGxldGVBcHBvaW50bWVudChwYXlsb2FkOiB7IHZpc2l0VXVpZDogc3RyaW5nOyB9KTogT2JzZXJ2YWJsZTxhbnk+IHtcclxuICAgIHJldHVybiB0aGlzLmh0dHAucG9zdChcclxuICAgICAgYCR7dGhpcy5taW5kbWFwVVJMfS9hcHBvaW50bWVudC9jb21wbGV0ZUFwcG9pbnRtZW50YCxcclxuICAgICAgcGF5bG9hZFxyXG4gICAgKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICogQ2hlY2sgYXBwb2ludG1lbnQgcHJlc2VudCBvciBub3RcclxuICAqIEBwYXJhbSB7c3RyaW5nfSB1c2VyVXVpZCAtIFVzZXIgdXVpZFxyXG4gICogQHBhcmFtIHtzdHJpbmd9IGZyb21EYXRlIC0gRnJvbSBkYXRlXHJcbiAgKiBAcGFyYW0ge3N0cmluZ30gdG9EYXRlIC0gVG8gZGF0ZVxyXG4gICogQHBhcmFtIHtzdHJpbmd9IHNwZWNpYWxpdHkgLSBTcGVjaWFsaXR5XHJcbiAgKiBAcmV0dXJuIHtPYnNlcnZhYmxlPGFueT59XHJcbiAgKi9cclxuICBjaGVja0FwcG9pbnRtZW50UHJlc2VudCh1c2VyVXVpZDogc3RyaW5nLCBmcm9tRGF0ZTogc3RyaW5nLCB0b0RhdGU6IHN0cmluZywgc3BlY2lhbGl0eTogc3RyaW5nKTogT2JzZXJ2YWJsZTxhbnk+IHtcclxuICAgIHJldHVybiB0aGlzLmh0dHAuZ2V0KFxyXG4gICAgICBgJHt0aGlzLm1pbmRtYXBVUkx9L2FwcG9pbnRtZW50L2NoZWNrQXBwb2ludG1lbnQvJHt1c2VyVXVpZH0/ZnJvbURhdGU9JHtmcm9tRGF0ZX0mdG9EYXRlPSR7dG9EYXRlfSZzcGVjaWFsaXR5PSR7c3BlY2lhbGl0eX1gXHJcbiAgICApO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgKiBVcGRhdGUgc3BlY2lhbGl0eSBmb3IgdGhlIGNhbGVuZGFyIHNsb3RzXHJcbiAgKiBAcGFyYW0ge3N0cmluZ30gdXNlclV1aWQgLSBVc2VyIHV1aWRcclxuICAqIEBwYXJhbSB7c3RyaW5nfSBzcGVjaWFsaXR5IC0gU3BlY2lhbGl0eVxyXG4gICogQHJldHVybiB7T2JzZXJ2YWJsZTxhbnk+fVxyXG4gICovXHJcbiAgdXBkYXRlU2xvdFNwZWNpYWxpdHkodXNlclV1aWQ6IHN0cmluZywgc3BlY2lhbGl0eTogc3RyaW5nKTogT2JzZXJ2YWJsZTxhbnk+IHtcclxuICAgIHJldHVybiB0aGlzLmh0dHAucHV0KFxyXG4gICAgICBgJHt0aGlzLm1pbmRtYXBVUkx9L2FwcG9pbnRtZW50L3VwZGF0ZVNsb3RTcGVjaWFsaXR5LyR7dXNlclV1aWR9P3NwZWNpYWxpdHk9JHtzcGVjaWFsaXR5fWAsXHJcbiAgICAgIG51bGxcclxuICAgICk7XHJcbiAgfVxyXG59XHJcbiJdfQ==