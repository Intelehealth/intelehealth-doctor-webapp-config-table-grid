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
    getUserSlots(userUuid, fromDate, toDate, speciality = null) {
        let url = `${this.mindmapURL}/appointment/getUserSlots/${userUuid}?fromDate=${fromDate}&toDate=${toDate}`;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwb2ludG1lbnQuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL2loLWxpYnJhcnkvc3JjL2xpYi9zZXJ2aWNlcy9hcHBvaW50bWVudC5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxzQkFBc0IsQ0FBQztBQUNsRCxPQUFPLEVBQUUsTUFBTSxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQzs7O0FBUW5ELE1BQU0sT0FBTyxrQkFBa0I7SUFJbkI7SUFIRixVQUFVLENBQUM7SUFFbkIsWUFDVSxJQUFnQixFQUNELFdBQVc7UUFEMUIsU0FBSSxHQUFKLElBQUksQ0FBWTtRQUd4QixJQUFJLENBQUMsVUFBVSxHQUFHLFdBQVcsQ0FBQyxVQUFVLENBQUM7SUFDM0MsQ0FBQztJQUVEOzs7O01BSUU7SUFDRix5QkFBeUIsQ0FBQyxPQUFzQjtRQUM5QyxPQUFPLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUNuQixHQUFHLElBQUksQ0FBQyxVQUFVLHFDQUFxQyxFQUN2RCxPQUFPLENBQ1IsQ0FBQztJQUNKLENBQUM7SUFFRDs7OztNQUlFO0lBQ0YsYUFBYSxDQUFDLE9BQWdGO1FBQzVGLE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQ25CLEdBQUcsSUFBSSxDQUFDLFVBQVUsNEJBQTRCLEVBQzlDLE9BQU8sQ0FDUixDQUFDO0lBQ0osQ0FBQztJQUVEOzs7Ozs7TUFNRTtJQUNGLGlCQUFpQixDQUFDLFFBQWdCLEVBQUUsSUFBWSxFQUFFLEtBQWE7UUFDN0QsT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FDbEIsR0FBRyxJQUFJLENBQUMsVUFBVSw0QkFBNEIsUUFBUSxTQUFTLElBQUksVUFBVSxLQUFLLEVBQUUsQ0FDckYsQ0FBQztJQUNKLENBQUM7SUFFRDs7Ozs7O01BTUU7SUFDRixZQUFZLENBQUMs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RVAsa0JBQWtCO2tCQUg5QixVQUFVO21CQUFDO29CQUNWLFVBQVUsRUFBRSxNQUFNO2lCQUNuQjs7MEJBTUksTUFBTTsyQkFBQyxhQUFhIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSHR0cENsaWVudCB9IGZyb20gXCJAYW5ndWxhci9jb21tb24vaHR0cFwiO1xyXG5pbXBvcnQgeyBJbmplY3QsIEluamVjdGFibGUgfSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xyXG5pbXBvcnQgeyBPYnNlcnZhYmxlIH0gZnJvbSBcInJ4anNcIjtcclxuaW1wb3J0IHsgU2NoZWR1bGVNb2RlbCB9IGZyb20gXCIuLi9tb2RlbC9tb2RlbFwiO1xyXG5pbXBvcnQgeyBBcHBvaW50bWVudE1vZGVsIH0gZnJvbSBcIi4uL21vZGVsL21vZGVsXCI7XHJcblxyXG5ASW5qZWN0YWJsZSh7XHJcbiAgcHJvdmlkZWRJbjogXCJyb290XCIsXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBBcHBvaW50bWVudFNlcnZpY2Uge1xyXG4gIHByaXZhdGUgbWluZG1hcFVSTDtcclxuXHJcbiAgY29uc3RydWN0b3IoXHJcbiAgICBwcml2YXRlIGh0dHA6IEh0dHBDbGllbnQsXHJcbiAgICBASW5qZWN0KCdlbnZpcm9ubWVudCcpIGVudmlyb25tZW50XHJcbiAgKSB7XHJcbiAgICB0aGlzLm1pbmRtYXBVUkwgPSBlbnZpcm9ubWVudC5taW5kbWFwVVJMO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgKiBDcmVhdGUgb3IgdXBkYXRlIGFwcG9pbnRtZW50XHJcbiAgKiBAcGFyYW0ge2FueX0gcGF5bG9hZCAtIFBheWxvYWQgZm9yIGNyZWF0ZSBvciB1cGRhdGUgYXBwb2ludG1lbnRcclxuICAqIEByZXR1cm4ge09ic2VydmFibGU8YW55Pn1cclxuICAqL1xyXG4gIHVwZGF0ZU9yQ3JlYXRlQXBwb2ludG1lbnQocGF5bG9hZDogU2NoZWR1bGVNb2RlbCk6IE9ic2VydmFibGU8YW55PiB7XHJcbiAgICByZXR1cm4gdGhpcy5odHRwLnBvc3QoXHJcbiAgICAgIGAke3RoaXMubWluZG1hcFVSTH0vYXBwb2ludG1lbnQvY3JlYXRlT3JVcGRhdGVTY2hlZHVsZWAsXHJcbiAgICAgIHBheWxvYWRcclxuICAgICk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAqIFVwZGF0ZSBkYXlzT2Zmc1xyXG4gICogQHBhcmFtIHthbnl9IHBheWxvYWQgLSBQYXlsb2FkIGZvciB1cGRhdGUgZGF5c09mZidzXHJcbiAgKiBAcmV0dXJuIHtPYnNlcnZhYmxlPGFueT59XHJcbiAgKi9cclxuICB1cGRhdGVEYXlzT2ZmKHBheWxvYWQ6IHsgdXNlclV1aWQ6IGFueTsgZGF5c09mZjogYW55W10gfCBzdHJpbmdbXTsgbW9udGg6IHN0cmluZzsgeWVhcjogYW55OyB9KTogT2JzZXJ2YWJsZTxhbnk+IHtcclxuICAgIHJldHVybiB0aGlzLmh0dHAucG9zdChcclxuICAgICAgYCR7dGhpcy5taW5kbWFwVVJMfS9hcHBvaW50bWVudC91cGRhdGVEYXlzT2ZmYCxcclxuICAgICAgcGF5bG9hZFxyXG4gICAgKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICogR2V0IHVzZXIgYXBwb2ludG1lbnRzXHJcbiAgKiBAcGFyYW0ge3N0cmluZ30gdXNlclV1aWQgLSBVc2VyIHV1aWRcclxuICAqIEBwYXJhbSB7c3RyaW5nfSB5ZWFyIC0gWWVhclxyXG4gICogQHBhcmFtIHtzdHJpbmd9IG1vbnRoIC0gTW9udGhcclxuICAqIEByZXR1cm4ge09ic2VydmFibGU8YW55Pn1cclxuICAqL1xyXG4gIGdldFVzZXJBcHBvaXRtZW50KHVzZXJVdWlkOiBzdHJpbmcsIHllYXI6IHN0cmluZywgbW9udGg6IHN0cmluZyk6IE9ic2VydmFibGU8YW55PiB7XHJcbiAgICByZXR1cm4gdGhpcy5odHRwLmdldChcclxuICAgICAgYCR7dGhpcy5taW5kbWFwVVJMfS9hcHBvaW50bWVudC9nZXRTY2hlZHVsZS8ke3VzZXJVdWlkfT95ZWFyPSR7eWVhcn0mbW9udGg9JHttb250aH1gXHJcbiAgICApO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgKiBHZXQgdXNlciBzbG90c1xyXG4gICogQHBhcmFtIHtzdHJpbmd9IHVzZXJVdWlkIC0gVXNlciB1dWlkXHJcbiAgKiBAcGFyYW0ge3N0cmluZ30gZnJvbURhdGUgLSBGcm9tIGRhdGVcclxuICAqIEBwYXJhbSB7c3RyaW5nfSB0b0RhdGUgLSBUbyBkYXRlXHJcbiAgKiBAcmV0dXJuIHtPYnNlcnZhYmxlPGFueT59XHJcbiAgKi9cclxuICBnZXRVc2VyU2xvdHModXNlclV1aWQ6IHN0cmluZywgZnJvbURhdGU6IHN0cmluZywgdG9EYXRlOiBzdHJpbmcsIHNwZWNpYWxpdHkgPSBudWxsKTogT2JzZXJ2YWJsZTxhbnk+IHsgICAgXHJcbiAgICBsZXQgdXJsID0gYCR7dGhpcy5taW5kbWFwVVJMfS9hcHBvaW50bWVudC9nZXRVc2VyU2xvdHMvJHt1c2VyVXVpZH0/ZnJvbURhdGU9JHtmcm9tRGF0ZX0mdG9EYXRlPSR7dG9EYXRlfWBcclxuICBcclxuICAgIGlmKHNwZWNpYWxpdHkpIHtcclxuICAgICAgdXJsICs9IGAmc3BlY2lhbGl0eT0ke3NwZWNpYWxpdHl9YDtcclxuICAgIH1cclxuICAgIHJldHVybiB0aGlzLmh0dHAuZ2V0KHVybCk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAqIEdldCB1c2VyIGFwcG9pbnRtZW50IHNsb3RzXHJcbiAgKiBAcGFyYW0ge3N0cmluZ30gZnJvbURhdGUgLSBGcm9tIGRhdGVcclxuICAqIEBwYXJhbSB7c3RyaW5nfSB0b0RhdGUgLSBUbyBkYXRlXHJcbiAgKiBAcGFyYW0ge3N0cmluZ30gc3BlY2lhbGl0eSAtIFNwZWNpYWxpdHlcclxuICAqIEByZXR1cm4ge09ic2VydmFibGU8YW55Pn1cclxuICAqL1xyXG4gIGdldEFwcG9pbnRtZW50U2xvdHMoZnJvbURhdGU6IHN0cmluZywgdG9EYXRlOiBzdHJpbmcsIHNwZWNpYWxpdHk6IGFueSk6IE9ic2VydmFibGU8YW55PiB7XHJcbiAgICByZXR1cm4gdGhpcy5odHRwLmdldChcclxuICAgICAgYCR7dGhpcy5taW5kbWFwVVJMfS9hcHBvaW50bWVudC9nZXRBcHBvaW50bWVudFNsb3RzP2Zyb21EYXRlPSR7ZnJvbURhdGV9JnRvRGF0ZT0ke3RvRGF0ZX0mc3BlY2lhbGl0eT0ke3NwZWNpYWxpdHl9YFxyXG4gICAgKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICogR2V0IGFwcG9pbnRtZW50IGZvciBhIHZpc2l0XHJcbiAgKiBAcGFyYW0ge3N0cmluZ30gdmlzaXRJZCAtIFZpc2l0IHV1aWRcclxuICAqIEByZXR1cm4ge09ic2VydmFibGU8YW55Pn1cclxuICAqL1xyXG4gIGdldEFwcG9pbnRtZW50KHZpc2l0SWQ6IHN0cmluZyk6IE9ic2VydmFibGU8YW55PiB7XHJcbiAgICByZXR1cm4gdGhpcy5odHRwLmdldChcclxuICAgICAgYCR7dGhpcy5taW5kbWFwVVJMfS9hcHBvaW50bWVudC9nZXRBcHBvaW50bWVudC8ke3Zpc2l0SWR9YFxyXG4gICAgKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICogR2V0IHNjaGVkdWxlZCBtb250aHNcclxuICAqIEBwYXJhbSB7c3RyaW5nfSB1c2VyVXVpZCAtIFVzZXIgdXVpZFxyXG4gICogQHBhcmFtIHtzdHJpbmd9IHllYXIgLSBZZWFyXHJcbiAgKiBAcGFyYW0ge3N0cmluZ30gc3BlY2lhbGl0eSAtIFNwZWNpYWxpdHlcclxuICAqIEByZXR1cm4ge09ic2VydmFibGU8YW55Pn1cclxuICAqL1xyXG4gIGdldFNjaGVkdWxlZE1vbnRocyh1c2VyVXVpZDogYW55LCB5ZWFyOiBzdHJpbmcsIHNwZWNpYWxpdHk6IHN0cmluZyA9IG51bGwpOiBPYnNlcnZhYmxlPGFueT4ge1xyXG4gICAgbGV0IHVybCA9IGAke3RoaXMubWluZG1hcFVSTH0vYXBwb2ludG1lbnQvZ2V0U2NoZWR1bGVkTW9udGhzLyR7dXNlclV1aWR9P3llYXI9JHt5ZWFyfWA7XHJcbiAgICBpZihzcGVjaWFsaXR5KSB7XHJcbiAgICAgIHVybCArPSBgJnNwZWNpYWxpdHk9JHtzcGVjaWFsaXR5fWA7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gdGhpcy5odHRwLmdldCh1cmwpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgKiBHZXQgZm9sbG93dXAgdmlzaXRzXHJcbiAgKiBAcGFyYW0ge3N0cmluZ30gcHJvdmlkZXJJZCAtIFByb3ZpZGVyIHV1aWRcclxuICAqIEByZXR1cm4ge09ic2VydmFibGU8YW55Pn1cclxuICAqL1xyXG4gIGdldEZvbGxvd1VwVmlzaXQocHJvdmlkZXJJZDogc3RyaW5nKTogT2JzZXJ2YWJsZTxhbnk+IHtcclxuICAgIHJldHVybiB0aGlzLmh0dHAuZ2V0KFxyXG4gICAgICBgJHt0aGlzLm1pbmRtYXBVUkx9L29wZW5tcnMvZ2V0Rm9sbG93VXBWaXNpdC8ke3Byb3ZpZGVySWR9YFxyXG4gICAgKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICogUmVzY2hlZHVsZSBhcHBvaW50bWVudFxyXG4gICogQHBhcmFtIHtzdHJpbmd9IHBheWxvYWQgLSBQYXlsb2FkIHRvIHJlc2NoZWR1bGUgYXBwb2ludG1lbnRcclxuICAqIEByZXR1cm4ge09ic2VydmFibGU8YW55Pn1cclxuICAqL1xyXG4gIHJlc2NoZWR1bGVBcHBvaW50bWVudChwYXlsb2FkOiBBcHBvaW50bWVudE1vZGVsKTogT2JzZXJ2YWJsZTxhbnk+IHtcclxuICAgIHJldHVybiB0aGlzLmh0dHAucG9zdChcclxuICAgICAgYCR7dGhpcy5taW5kbWFwVVJMfS9hcHBvaW50bWVudC9yZXNjaGVkdWxlQXBwb2ludG1lbnRgLFxyXG4gICAgICBwYXlsb2FkXHJcbiAgICApO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgKiBDYW5jZWwgYXBwb2ludG1lbnRcclxuICAqIEBwYXJhbSB7c3RyaW5nfSBwYXlsb2FkIC0gUGF5bG9hZCB0byBjYW5jZWwgYXBwb2ludG1lbnRcclxuICAqIEByZXR1cm4ge09ic2VydmFibGU8YW55Pn1cclxuICAqL1xyXG4gIGNhbmNlbEFwcG9pbnRtZW50KHBheWxvYWQ6IHsgaWQ6IGFueTsgdmlzaXRVdWlkOiBhbnk7IGh3VVVJRDogYW55OyB9KTogT2JzZXJ2YWJsZTxhbnk+IHtcclxuICAgIHJldHVybiB0aGlzLmh0dHAucG9zdChcclxuICAgICAgYCR7dGhpcy5taW5kbWFwVVJMfS9hcHBvaW50bWVudC9jYW5jZWxBcHBvaW50bWVudGAsXHJcbiAgICAgIHBheWxvYWRcclxuICAgICk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAqIENvbXBsZXRlIGFwcG9pbnRtZW50XHJcbiAgKiBAcGFyYW0ge3N0cmluZ30gcGF5bG9hZCAtIFBheWxvYWQgdG8gY29tcGxldGUgYXBwb2ludG1lbnRcclxuICAqIEByZXR1cm4ge09ic2VydmFibGU8YW55Pn1cclxuICAqL1xyXG4gIGNvbXBsZXRlQXBwb2ludG1lbnQocGF5bG9hZDogeyB2aXNpdFV1aWQ6IHN0cmluZzsgfSk6IE9ic2VydmFibGU8YW55PiB7XHJcbiAgICByZXR1cm4gdGhpcy5odHRwLnBvc3QoXHJcbiAgICAgIGAke3RoaXMubWluZG1hcFVSTH0vYXBwb2ludG1lbnQvY29tcGxldGVBcHBvaW50bWVudGAsXHJcbiAgICAgIHBheWxvYWRcclxuICAgICk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAqIENoZWNrIGFwcG9pbnRtZW50IHByZXNlbnQgb3Igbm90XHJcbiAgKiBAcGFyYW0ge3N0cmluZ30gdXNlclV1aWQgLSBVc2VyIHV1aWRcclxuICAqIEBwYXJhbSB7c3RyaW5nfSBmcm9tRGF0ZSAtIEZyb20gZGF0ZVxyXG4gICogQHBhcmFtIHtzdHJpbmd9IHRvRGF0ZSAtIFRvIGRhdGVcclxuICAqIEBwYXJhbSB7c3RyaW5nfSBzcGVjaWFsaXR5IC0gU3BlY2lhbGl0eVxyXG4gICogQHJldHVybiB7T2JzZXJ2YWJsZTxhbnk+fVxyXG4gICovXHJcbiAgY2hlY2tBcHBvaW50bWVudFByZXNlbnQodXNlclV1aWQ6IHN0cmluZywgZnJvbURhdGU6IHN0cmluZywgdG9EYXRlOiBzdHJpbmcsIHNwZWNpYWxpdHk6IHN0cmluZyk6IE9ic2VydmFibGU8YW55PiB7XHJcbiAgICByZXR1cm4gdGhpcy5odHRwLmdldChcclxuICAgICAgYCR7dGhpcy5taW5kbWFwVVJMfS9hcHBvaW50bWVudC9jaGVja0FwcG9pbnRtZW50LyR7dXNlclV1aWR9P2Zyb21EYXRlPSR7ZnJvbURhdGV9JnRvRGF0ZT0ke3RvRGF0ZX0mc3BlY2lhbGl0eT0ke3NwZWNpYWxpdHl9YFxyXG4gICAgKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICogVXBkYXRlIHNwZWNpYWxpdHkgZm9yIHRoZSBjYWxlbmRhciBzbG90c1xyXG4gICogQHBhcmFtIHtzdHJpbmd9IHVzZXJVdWlkIC0gVXNlciB1dWlkXHJcbiAgKiBAcGFyYW0ge3N0cmluZ30gc3BlY2lhbGl0eSAtIFNwZWNpYWxpdHlcclxuICAqIEByZXR1cm4ge09ic2VydmFibGU8YW55Pn1cclxuICAqL1xyXG4gIHVwZGF0ZVNsb3RTcGVjaWFsaXR5KHVzZXJVdWlkOiBzdHJpbmcsIHNwZWNpYWxpdHk6IHN0cmluZyk6IE9ic2VydmFibGU8YW55PiB7XHJcbiAgICByZXR1cm4gdGhpcy5odHRwLnB1dChcclxuICAgICAgYCR7dGhpcy5taW5kbWFwVVJMfS9hcHBvaW50bWVudC91cGRhdGVTbG90U3BlY2lhbGl0eS8ke3VzZXJVdWlkfT9zcGVjaWFsaXR5PSR7c3BlY2lhbGl0eX1gLFxyXG4gICAgICBudWxsXHJcbiAgICApO1xyXG4gIH1cclxufVxyXG4iXX0=