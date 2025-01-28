import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import * as i0 from "@angular/core";
import * as i1 from "@angular/common/http";
export class AppointmentService {
    http;
    // private baseURL = environment.mindmapURL; 'https://dev.intelehealth.org:3004/api'
    constructor(http) {
        this.http = http;
    }
    /**
    * Create or update appointment
    * @param {any} payload - Payload for create or update appointment
    * @return {Observable<any>}
    */
    updateOrCreateAppointment(payload, mindmapURL) {
        return this.http.post(`${mindmapURL}/appointment/createOrUpdateSchedule`, payload);
    }
    /**
    * Update daysOffs
    * @param {any} payload - Payload for update daysOff's
    * @return {Observable<any>}
    */
    updateDaysOff(mindmapURL, payload) {
        return this.http.post(`${mindmapURL}/appointment/updateDaysOff`, payload);
    }
    /**
    * Get user appointments
    * @param {string} userUuid - User uuid
    * @param {string} year - Year
    * @param {string} month - Month
    * @return {Observable<any>}
    */
    getUserAppoitment(mindmapURL, userUuid, year, month) {
        return this.http.get(`${mindmapURL}/appointment/getSchedule/${userUuid}?year=${year}&month=${month}`);
    }
    /**
    * Get user slots
    * @param {string} userUuid - User uuid
    * @param {string} fromDate - From date
    * @param {string} toDate - To date
    * @return {Observable<any>}
    */
    getUserSlots(mindmapURL, userUuid, fromDate, toDate, speciality = null) {
        let url = `${mindmapURL}/appointment/getUserSlots/${userUuid}?fromDate=${fromDate}&toDate=${toDate}`;
        if (speciality) {
            url += `&speciality=${speciality}`;
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
    getAppointmentSlots(mindmapURL, fromDate, toDate, speciality) {
        return this.http.get(`${mindmapURL}/appointment/getAppointmentSlots?fromDate=${fromDate}&toDate=${toDate}&speciality=${speciality}`);
    }
    /**
    * Get appointment for a visit
    * @param {string} visitId - Visit uuid
    * @return {Observable<any>}
    */
    getAppointment(mindmapURL, visitId) {
        return this.http.get(`${mindmapURL}/appointment/getAppointment/${visitId}`);
    }
    /**
    * Get scheduled months
    * @param {string} userUuid - User uuid
    * @param {string} year - Year
    * @param {string} speciality - Speciality
    * @return {Observable<any>}
    */
    getScheduledMonths(mindmapURL, userUuid, year, speciality = null) {
        let url = `${mindmapURL}/appointment/getScheduledMonths/${userUuid}?year=${year}`;
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
    getFollowUpVisit(mindmapURL, providerId) {
        return this.http.get(`${mindmapURL}/openmrs/getFollowUpVisit/${providerId}`);
    }
    /**
    * Reschedule appointment
    * @param {string} payload - Payload to reschedule appointment
    * @return {Observable<any>}
    */
    rescheduleAppointment(mindmapURL, payload) {
        return this.http.post(`${mindmapURL}/appointment/rescheduleAppointment`, payload);
    }
    /**
    * Cancel appointment
    * @param {string} payload - Payload to cancel appointment
    * @return {Observable<any>}
    */
    cancelAppointment(mindmapURL, payload) {
        return this.http.post(`${mindmapURL}/appointment/cancelAppointment`, payload);
    }
    /**
    * Complete appointment
    * @param {string} payload - Payload to complete appointment
    * @return {Observable<any>}
    */
    completeAppointment(mindmapURL, payload) {
        return this.http.post(`${mindmapURL}/appointment/completeAppointment`, payload);
    }
    /**
    * Check appointment present or not
    * @param {string} userUuid - User uuid
    * @param {string} fromDate - From date
    * @param {string} toDate - To date
    * @param {string} speciality - Speciality
    * @return {Observable<any>}
    */
    checkAppointmentPresent(mindmapURL, userUuid, fromDate, toDate, speciality) {
        return this.http.get(`${mindmapURL}/appointment/checkAppointment/${userUuid}?fromDate=${fromDate}&toDate=${toDate}&speciality=${speciality}`);
    }
    /**
    * Update speciality for the calendar slots
    * @param {string} userUuid - User uuid
    * @param {string} speciality - Speciality
    * @return {Observable<any>}
    */
    updateSlotSpeciality(mindmapURL, userUuid, speciality) {
        return this.http.put(`${mindmapURL}/appointment/updateSlotSpeciality/${userUuid}?speciality=${speciality}`, null);
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.3.0", ngImport: i0, type: AppointmentService, deps: [{ token: i1.HttpClient }], target: i0.ɵɵFactoryTarget.Injectable });
    static ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "14.3.0", ngImport: i0, type: AppointmentService, providedIn: "root" });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.3.0", ngImport: i0, type: AppointmentService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: "root",
                }]
        }], ctorParameters: function () { return [{ type: i1.HttpClient }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwb2ludG1lbnQuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL2loLWxpYnJhcnkvc3JjL2xpYi9zZXJ2aWNlcy9hcHBvaW50bWVudC5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxzQkFBc0IsQ0FBQztBQUNsRCxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDOzs7QUFTM0MsTUFBTSxPQUFPLGtCQUFrQjtJQUVUO0lBRHBCLG9GQUFvRjtJQUNwRixZQUFvQixJQUFnQjtRQUFoQixTQUFJLEdBQUosSUFBSSxDQUFZO0lBQUcsQ0FBQztJQUV4Qzs7OztNQUlFO0lBQ0YseUJBQXlCLENBQUMsT0FBc0IsRUFBRSxVQUFrQjtRQUNsRSxPQUFPLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUNuQixHQUFHLFVBQVUscUNBQXFDLEVBQ2xELE9BQU8sQ0FDUixDQUFDO0lBQ0osQ0FBQztJQUVEOzs7O01BSUU7SUFDRixhQUFhLENBQUMsVUFBa0IsRUFBRSxPQUFnRjtRQUNoSCxPQUFPLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUNuQixHQUFHLFVBQVUsNEJBQTRCLEVBQ3pDLE9BQU8sQ0FDUixDQUFDO0lBQ0osQ0FBQztJQUVEOzs7Ozs7TUFNRTtJQUNGLGlCQUFpQixDQUFDLFVBQWtCLEVBQUUsUUFBZ0IsRUFBRSxJQUFZLEVBQUUsS0FBYTtRQUNqRixPQUFPLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUNsQixHQUFHLFVBQVUsNEJBQTRCLFFBQVEsU0FBUyxJQUFJLFVBQVUsS0FBSyxFQUFFLENBQ2hGLENBQUM7SUFDSixDQUFDO0lBRUQ7Ozs7OztNQU1FO0lBQ0YsWUFBWSxDQUFDLFVBQWtCLEVBQUUsUUFBZ0IsRUFBRSxRQUFnQixFQUFFLE1BQWMsRUFBRSxVQUFVLEdBQUcsSUFBSTtRQUNwRyxJ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b250ZW50IjpbImltcG9ydCB7IEh0dHBDbGllbnQgfSBmcm9tIFwiQGFuZ3VsYXIvY29tbW9uL2h0dHBcIjtcclxuaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XHJcbmltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tIFwicnhqc1wiO1xyXG4vLyBpbXBvcnQgeyBlbnZpcm9ubWVudCB9IGZyb20gXCJzcmMvZW52aXJvbm1lbnRzL2Vudmlyb25tZW50XCI7XHJcbmltcG9ydCB7IFNjaGVkdWxlTW9kZWwgfSBmcm9tIFwiLi4vbW9kZWwvbW9kZWxcIjtcclxuaW1wb3J0IHsgQXBwb2ludG1lbnRNb2RlbCB9IGZyb20gXCIuLi9tb2RlbC9tb2RlbFwiO1xyXG5cclxuQEluamVjdGFibGUoe1xyXG4gIHByb3ZpZGVkSW46IFwicm9vdFwiLFxyXG59KVxyXG5leHBvcnQgY2xhc3MgQXBwb2ludG1lbnRTZXJ2aWNlIHtcclxuICAvLyBwcml2YXRlIGJhc2VVUkwgPSBlbnZpcm9ubWVudC5taW5kbWFwVVJMOyAnaHR0cHM6Ly9kZXYuaW50ZWxlaGVhbHRoLm9yZzozMDA0L2FwaSdcclxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIGh0dHA6IEh0dHBDbGllbnQpIHt9XHJcblxyXG4gIC8qKlxyXG4gICogQ3JlYXRlIG9yIHVwZGF0ZSBhcHBvaW50bWVudFxyXG4gICogQHBhcmFtIHthbnl9IHBheWxvYWQgLSBQYXlsb2FkIGZvciBjcmVhdGUgb3IgdXBkYXRlIGFwcG9pbnRtZW50XHJcbiAgKiBAcmV0dXJuIHtPYnNlcnZhYmxlPGFueT59XHJcbiAgKi9cclxuICB1cGRhdGVPckNyZWF0ZUFwcG9pbnRtZW50KHBheWxvYWQ6IFNjaGVkdWxlTW9kZWwsIG1pbmRtYXBVUkw6IHN0cmluZyk6IE9ic2VydmFibGU8YW55PiB7XHJcbiAgICByZXR1cm4gdGhpcy5odHRwLnBvc3QoXHJcbiAgICAgIGAke21pbmRtYXBVUkx9L2FwcG9pbnRtZW50L2NyZWF0ZU9yVXBkYXRlU2NoZWR1bGVgLFxyXG4gICAgICBwYXlsb2FkXHJcbiAgICApO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgKiBVcGRhdGUgZGF5c09mZnNcclxuICAqIEBwYXJhbSB7YW55fSBwYXlsb2FkIC0gUGF5bG9hZCBmb3IgdXBkYXRlIGRheXNPZmYnc1xyXG4gICogQHJldHVybiB7T2JzZXJ2YWJsZTxhbnk+fVxyXG4gICovXHJcbiAgdXBkYXRlRGF5c09mZihtaW5kbWFwVVJMOiBzdHJpbmcsIHBheWxvYWQ6IHsgdXNlclV1aWQ6IGFueTsgZGF5c09mZjogYW55W10gfCBzdHJpbmdbXTsgbW9udGg6IHN0cmluZzsgeWVhcjogYW55OyB9KTogT2JzZXJ2YWJsZTxhbnk+IHtcclxuICAgIHJldHVybiB0aGlzLmh0dHAucG9zdChcclxuICAgICAgYCR7bWluZG1hcFVSTH0vYXBwb2ludG1lbnQvdXBkYXRlRGF5c09mZmAsXHJcbiAgICAgIHBheWxvYWRcclxuICAgICk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAqIEdldCB1c2VyIGFwcG9pbnRtZW50c1xyXG4gICogQHBhcmFtIHtzdHJpbmd9IHVzZXJVdWlkIC0gVXNlciB1dWlkXHJcbiAgKiBAcGFyYW0ge3N0cmluZ30geWVhciAtIFllYXJcclxuICAqIEBwYXJhbSB7c3RyaW5nfSBtb250aCAtIE1vbnRoXHJcbiAgKiBAcmV0dXJuIHtPYnNlcnZhYmxlPGFueT59XHJcbiAgKi9cclxuICBnZXRVc2VyQXBwb2l0bWVudChtaW5kbWFwVVJMOiBzdHJpbmcsIHVzZXJVdWlkOiBzdHJpbmcsIHllYXI6IHN0cmluZywgbW9udGg6IHN0cmluZyk6IE9ic2VydmFibGU8YW55PiB7XHJcbiAgICByZXR1cm4gdGhpcy5odHRwLmdldChcclxuICAgICAgYCR7bWluZG1hcFVSTH0vYXBwb2ludG1lbnQvZ2V0U2NoZWR1bGUvJHt1c2VyVXVpZH0/eWVhcj0ke3llYXJ9Jm1vbnRoPSR7bW9udGh9YFxyXG4gICAgKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICogR2V0IHVzZXIgc2xvdHNcclxuICAqIEBwYXJhbSB7c3RyaW5nfSB1c2VyVXVpZCAtIFVzZXIgdXVpZFxyXG4gICogQHBhcmFtIHtzdHJpbmd9IGZyb21EYXRlIC0gRnJvbSBkYXRlXHJcbiAgKiBAcGFyYW0ge3N0cmluZ30gdG9EYXRlIC0gVG8gZGF0ZVxyXG4gICogQHJldHVybiB7T2JzZXJ2YWJsZTxhbnk+fVxyXG4gICovXHJcbiAgZ2V0VXNlclNsb3RzKG1pbmRtYXBVUkw6IHN0cmluZywgdXNlclV1aWQ6IHN0cmluZywgZnJvbURhdGU6IHN0cmluZywgdG9EYXRlOiBzdHJpbmcsIHNwZWNpYWxpdHkgPSBudWxsKTogT2JzZXJ2YWJsZTxhbnk+IHsgICAgXHJcbiAgICBsZXQgdXJsID0gYCR7bWluZG1hcFVSTH0vYXBwb2ludG1lbnQvZ2V0VXNlclNsb3RzLyR7dXNlclV1aWR9P2Zyb21EYXRlPSR7ZnJvbURhdGV9JnRvRGF0ZT0ke3RvRGF0ZX1gXHJcbiAgXHJcbiAgICBpZihzcGVjaWFsaXR5KSB7XHJcbiAgICAgIHVybCArPSBgJnNwZWNpYWxpdHk9JHtzcGVjaWFsaXR5fWA7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gdGhpcy5odHRwLmdldCh1cmwpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgKiBHZXQgdXNlciBhcHBvaW50bWVudCBzbG90c1xyXG4gICogQHBhcmFtIHtzdHJpbmd9IGZyb21EYXRlIC0gRnJvbSBkYXRlXHJcbiAgKiBAcGFyYW0ge3N0cmluZ30gdG9EYXRlIC0gVG8gZGF0ZVxyXG4gICogQHBhcmFtIHtzdHJpbmd9IHNwZWNpYWxpdHkgLSBTcGVjaWFsaXR5XHJcbiAgKiBAcmV0dXJuIHtPYnNlcnZhYmxlPGFueT59XHJcbiAgKi9cclxuICBnZXRBcHBvaW50bWVudFNsb3RzKG1pbmRtYXBVUkw6IHN0cmluZywgZnJvbURhdGU6IHN0cmluZywgdG9EYXRlOiBzdHJpbmcsIHNwZWNpYWxpdHk6IGFueSk6IE9ic2VydmFibGU8YW55PiB7XHJcbiAgICByZXR1cm4gdGhpcy5odHRwLmdldChcclxuICAgICAgYCR7bWluZG1hcFVSTH0vYXBwb2ludG1lbnQvZ2V0QXBwb2ludG1lbnRTbG90cz9mcm9tRGF0ZT0ke2Zyb21EYXRlfSZ0b0RhdGU9JHt0b0RhdGV9JnNwZWNpYWxpdHk9JHtzcGVjaWFsaXR5fWBcclxuICAgICk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAqIEdldCBhcHBvaW50bWVudCBmb3IgYSB2aXNpdFxyXG4gICogQHBhcmFtIHtzdHJpbmd9IHZpc2l0SWQgLSBWaXNpdCB1dWlkXHJcbiAgKiBAcmV0dXJuIHtPYnNlcnZhYmxlPGFueT59XHJcbiAgKi9cclxuICBnZXRBcHBvaW50bWVudChtaW5kbWFwVVJMOiBzdHJpbmcsIHZpc2l0SWQ6IHN0cmluZyk6IE9ic2VydmFibGU8YW55PiB7XHJcbiAgICByZXR1cm4gdGhpcy5odHRwLmdldChcclxuICAgICAgYCR7bWluZG1hcFVSTH0vYXBwb2ludG1lbnQvZ2V0QXBwb2ludG1lbnQvJHt2aXNpdElkfWBcclxuICAgICk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAqIEdldCBzY2hlZHVsZWQgbW9udGhzXHJcbiAgKiBAcGFyYW0ge3N0cmluZ30gdXNlclV1aWQgLSBVc2VyIHV1aWRcclxuICAqIEBwYXJhbSB7c3RyaW5nfSB5ZWFyIC0gWWVhclxyXG4gICogQHBhcmFtIHtzdHJpbmd9IHNwZWNpYWxpdHkgLSBTcGVjaWFsaXR5XHJcbiAgKiBAcmV0dXJuIHtPYnNlcnZhYmxlPGFueT59XHJcbiAgKi9cclxuICBnZXRTY2hlZHVsZWRNb250aHMobWluZG1hcFVSTDogc3RyaW5nLCB1c2VyVXVpZDogYW55LCB5ZWFyOiBzdHJpbmcsIHNwZWNpYWxpdHk6IHN0cmluZyA9IG51bGwpOiBPYnNlcnZhYmxlPGFueT4ge1xyXG4gICAgbGV0IHVybCA9IGAke21pbmRtYXBVUkx9L2FwcG9pbnRtZW50L2dldFNjaGVkdWxlZE1vbnRocy8ke3VzZXJVdWlkfT95ZWFyPSR7eWVhcn1gO1xyXG4gICAgaWYoc3BlY2lhbGl0eSkge1xyXG4gICAgICB1cmwgKz0gYCZzcGVjaWFsaXR5PSR7c3BlY2lhbGl0eX1gO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIHRoaXMuaHR0cC5nZXQodXJsKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICogR2V0IGZvbGxvd3VwIHZpc2l0c1xyXG4gICogQHBhcmFtIHtzdHJpbmd9IHByb3ZpZGVySWQgLSBQcm92aWRlciB1dWlkXHJcbiAgKiBAcmV0dXJuIHtPYnNlcnZhYmxlPGFueT59XHJcbiAgKi9cclxuICBnZXRGb2xsb3dVcFZpc2l0KG1pbmRtYXBVUkw6IHN0cmluZywgcHJvdmlkZXJJZDogc3RyaW5nKTogT2JzZXJ2YWJsZTxhbnk+IHtcclxuICAgIHJldHVybiB0aGlzLmh0dHAuZ2V0KFxyXG4gICAgICBgJHttaW5kbWFwVVJMfS9vcGVubXJzL2dldEZvbGxvd1VwVmlzaXQvJHtwcm92aWRlcklkfWBcclxuICAgICk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAqIFJlc2NoZWR1bGUgYXBwb2ludG1lbnRcclxuICAqIEBwYXJhbSB7c3RyaW5nfSBwYXlsb2FkIC0gUGF5bG9hZCB0byByZXNjaGVkdWxlIGFwcG9pbnRtZW50XHJcbiAgKiBAcmV0dXJuIHtPYnNlcnZhYmxlPGFueT59XHJcbiAgKi9cclxuICByZXNjaGVkdWxlQXBwb2ludG1lbnQobWluZG1hcFVSTDogc3RyaW5nLCBwYXlsb2FkOiBBcHBvaW50bWVudE1vZGVsKTogT2JzZXJ2YWJsZTxhbnk+IHtcclxuICAgIHJldHVybiB0aGlzLmh0dHAucG9zdChcclxuICAgICAgYCR7bWluZG1hcFVSTH0vYXBwb2ludG1lbnQvcmVzY2hlZHVsZUFwcG9pbnRtZW50YCxcclxuICAgICAgcGF5bG9hZFxyXG4gICAgKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICogQ2FuY2VsIGFwcG9pbnRtZW50XHJcbiAgKiBAcGFyYW0ge3N0cmluZ30gcGF5bG9hZCAtIFBheWxvYWQgdG8gY2FuY2VsIGFwcG9pbnRtZW50XHJcbiAgKiBAcmV0dXJuIHtPYnNlcnZhYmxlPGFueT59XHJcbiAgKi9cclxuICBjYW5jZWxBcHBvaW50bWVudChtaW5kbWFwVVJMOiBzdHJpbmcsIHBheWxvYWQ6IHsgaWQ6IGFueTsgdmlzaXRVdWlkOiBhbnk7IGh3VVVJRDogYW55OyB9KTogT2JzZXJ2YWJsZTxhbnk+IHtcclxuICAgIHJldHVybiB0aGlzLmh0dHAucG9zdChcclxuICAgICAgYCR7bWluZG1hcFVSTH0vYXBwb2ludG1lbnQvY2FuY2VsQXBwb2ludG1lbnRgLFxyXG4gICAgICBwYXlsb2FkXHJcbiAgICApO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgKiBDb21wbGV0ZSBhcHBvaW50bWVudFxyXG4gICogQHBhcmFtIHtzdHJpbmd9IHBheWxvYWQgLSBQYXlsb2FkIHRvIGNvbXBsZXRlIGFwcG9pbnRtZW50XHJcbiAgKiBAcmV0dXJuIHtPYnNlcnZhYmxlPGFueT59XHJcbiAgKi9cclxuICBjb21wbGV0ZUFwcG9pbnRtZW50KG1pbmRtYXBVUkw6IHN0cmluZywgcGF5bG9hZDogeyB2aXNpdFV1aWQ6IHN0cmluZzsgfSk6IE9ic2VydmFibGU8YW55PiB7XHJcbiAgICByZXR1cm4gdGhpcy5odHRwLnBvc3QoXHJcbiAgICAgIGAke21pbmRtYXBVUkx9L2FwcG9pbnRtZW50L2NvbXBsZXRlQXBwb2ludG1lbnRgLFxyXG4gICAgICBwYXlsb2FkXHJcbiAgICApO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgKiBDaGVjayBhcHBvaW50bWVudCBwcmVzZW50IG9yIG5vdFxyXG4gICogQHBhcmFtIHtzdHJpbmd9IHVzZXJVdWlkIC0gVXNlciB1dWlkXHJcbiAgKiBAcGFyYW0ge3N0cmluZ30gZnJvbURhdGUgLSBGcm9tIGRhdGVcclxuICAqIEBwYXJhbSB7c3RyaW5nfSB0b0RhdGUgLSBUbyBkYXRlXHJcbiAgKiBAcGFyYW0ge3N0cmluZ30gc3BlY2lhbGl0eSAtIFNwZWNpYWxpdHlcclxuICAqIEByZXR1cm4ge09ic2VydmFibGU8YW55Pn1cclxuICAqL1xyXG4gIGNoZWNrQXBwb2ludG1lbnRQcmVzZW50KG1pbmRtYXBVUkw6IHN0cmluZywgdXNlclV1aWQ6IHN0cmluZywgZnJvbURhdGU6IHN0cmluZywgdG9EYXRlOiBzdHJpbmcsIHNwZWNpYWxpdHk6IHN0cmluZyk6IE9ic2VydmFibGU8YW55PiB7XHJcbiAgICByZXR1cm4gdGhpcy5odHRwLmdldChcclxuICAgICAgYCR7bWluZG1hcFVSTH0vYXBwb2ludG1lbnQvY2hlY2tBcHBvaW50bWVudC8ke3VzZXJVdWlkfT9mcm9tRGF0ZT0ke2Zyb21EYXRlfSZ0b0RhdGU9JHt0b0RhdGV9JnNwZWNpYWxpdHk9JHtzcGVjaWFsaXR5fWBcclxuICAgICk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAqIFVwZGF0ZSBzcGVjaWFsaXR5IGZvciB0aGUgY2FsZW5kYXIgc2xvdHNcclxuICAqIEBwYXJhbSB7c3RyaW5nfSB1c2VyVXVpZCAtIFVzZXIgdXVpZFxyXG4gICogQHBhcmFtIHtzdHJpbmd9IHNwZWNpYWxpdHkgLSBTcGVjaWFsaXR5XHJcbiAgKiBAcmV0dXJuIHtPYnNlcnZhYmxlPGFueT59XHJcbiAgKi9cclxuICB1cGRhdGVTbG90U3BlY2lhbGl0eShtaW5kbWFwVVJMOiBzdHJpbmcsIHVzZXJVdWlkOiBzdHJpbmcsIHNwZWNpYWxpdHk6IHN0cmluZyk6IE9ic2VydmFibGU8YW55PiB7XHJcbiAgICByZXR1cm4gdGhpcy5odHRwLnB1dChcclxuICAgICAgYCR7bWluZG1hcFVSTH0vYXBwb2ludG1lbnQvdXBkYXRlU2xvdFNwZWNpYWxpdHkvJHt1c2VyVXVpZH0/c3BlY2lhbGl0eT0ke3NwZWNpYWxpdHl9YCxcclxuICAgICAgbnVsbFxyXG4gICAgKTtcclxuICB9XHJcbn1cclxuIl19