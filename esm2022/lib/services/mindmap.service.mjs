import { HttpClient } from "@angular/common/http";
import { Inject, Injectable } from "@angular/core";
import * as i0 from "@angular/core";
import * as i1 from "@angular/common/http";
export class MindmapService {
    http;
    mindmapURL;
    constructor(http, environment) {
        this.http = http;
        this.mindmapURL = environment.mindmapURL;
    }
    /**
    * Get mindmap keys
    * @return {Observable<any>}
    */
    getMindmapKey() {
        const url = `${this.mindmapURL}/mindmap`;
        return this.http.get(url);
    }
    /**
    * Post mindmap
    * @param {any} value - Payload for post mindmap
    * @return {Observable<any>}
    */
    postMindmap(value) {
        const url = `${this.mindmapURL}/mindmap/upload`;
        return this.http.post(url, value);
    }
    /**
    * Get mindmap details from key
    * @param {string} key - Mindmap key
    * @return {Observable<any>}
    */
    detailsMindmap(key) {
        const url = `${this.mindmapURL}/mindmap/details/${key}`;
        return this.http.get(url);
    }
    /**
    * Add/update mindmap license key
    * @param {any} payload - Payload for mindmap key to add/update
    * @return {Observable<any>}
    */
    addUpdateLicenseKey(payload) {
        const url = `${this.mindmapURL}/mindmap/addUpdatekey`;
        return this.http.post(url, payload);
    }
    /**
    * Update mindmap key image
    * @param {string} key - Mindmap key
    * @param {string} imageName - Image name
    * @param {string} value - Image base64
    * @return {Observable<any>}
    */
    updateImage(key, imageName, value) {
        const url = `${this.mindmapURL}/mindmap/${key}/${imageName}`;
        return this.http.put(url, value);
    }
    /**
    * Delete mindmap
    * @param {string} key - Mindmap key
    * @param {any} data - Mindmap data
    * @return {Observable<any>}
    */
    deleteMindmap(key, data) {
        const url = `${this.mindmapURL}/mindmap/delete/${key}`;
        return this.http.post(url, data);
    }
    /**
    * Toggle mindmap status
    * @param {any} data - Mindmap data
    * @return {Observable<any>}
    */
    toggleMindmapStatus(data) {
        const url = `${this.mindmapURL}/mindmap/toggleStatus`;
        return this.http.post(url, data);
    }
    /**
  * Notify App side
  * @param {any} hwUuid - Healthworker Id
  * @param {any} payload - Notifaication message
  * @return {Observable<any>}
  */
    notifyApp(hwUuid, payload) {
        return this.http.post(`${this.mindmapURL}/mindmap/notify-app/${hwUuid}`, payload);
    }
    /**
    * Send notification to health worker for available prescription
    * @returns {void}
    */
    notifyHwForRescheduleAppointment(appointment) {
        const hwUuid = appointment?.hwUUID;
        const openMRSID = appointment?.openMrsId;
        const payload = {
            title: `Appointment rescheduled for ${appointment?.patientName || 'Patient'}`,
            body: "Click notification to see!",
            type: "appointment",
            data: {
                patientFirstName: appointment?.patientName ?? '',
                patientUuid: appointment?.patientId,
                patientOpenMrsId: openMRSID,
                visitUuid: appointment?.visitUuid,
                slotDateTime: appointment?.slotJsDate
            }
        };
        this.notifyApp(hwUuid, payload).subscribe();
    }
    /**
   * Send cancel notification to health worker
   * @returns {void}
   */
    notifyHwForCancelAppointment(appointment) {
        const hwUuid = appointment?.hwUUID;
        const openMRSID = appointment?.openMrsId;
        const payload = {
            title: `Appointment cancelled for ${appointment?.patientName || 'Patient'}`,
            body: "Click notification to see!",
            type: "cancel",
            data: {
                patientFirstName: appointment?.patientName ?? '',
                patientUuid: appointment?.patientId,
                patientOpenMrsId: openMRSID,
                visitUuid: appointment?.visitUuid,
                slotDateTime: appointment?.slotJsDate
            }
        };
        this.notifyApp(hwUuid, payload).subscribe();
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.3.0", ngImport: i0, type: MindmapService, deps: [{ token: i1.HttpClient }, { token: 'environment' }], target: i0.ɵɵFactoryTarget.Injectable });
    static ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "14.3.0", ngImport: i0, type: MindmapService, providedIn: "root" });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.3.0", ngImport: i0, type: MindmapService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: "root",
                }]
        }], ctorParameters: function () { return [{ type: i1.HttpClient }, { type: undefined, decorators: [{
                    type: Inject,
                    args: ['environment']
                }] }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWluZG1hcC5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvaWgtbGlicmFyeS9zcmMvbGliL3NlcnZpY2VzL21pbmRtYXAuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFDQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sc0JBQXNCLENBQUM7QUFDbEQsT0FBTyxFQUFFLE1BQU0sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7OztBQUtuRCxNQUFNLE9BQU8sY0FBYztJQUlmO0lBSEYsVUFBVSxDQUFDO0lBRW5CLFlBQ1UsSUFBZ0IsRUFDRCxXQUFXO1FBRDFCLFNBQUksR0FBSixJQUFJLENBQVk7UUFHeEIsSUFBSSxDQUFDLFVBQVUsR0FBRyxXQUFXLENBQUMsVUFBVSxDQUFDO0lBQzNDLENBQUM7SUFFRDs7O01BR0U7SUFDRixhQUFhO1FBQ1gsTUFBTSxHQUFHLEdBQUcsR0FBRyxJQUFJLENBQUMsVUFBVSxVQUFVLENBQUM7UUFDekMsT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUM1QixDQUFDO0lBRUQ7Ozs7TUFJRTtJQUNGLFdBQVcsQ0FBQyxLQUFLO1FBQ2YsTUFBTSxHQUFHLEdBQUcsR0FBRyxJQUFJLENBQUMsVUFBVSxpQkFBaUIsQ0FBQztRQUNoRCxPQUFPLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRSxLQUFLLENBQUMsQ0FBQztJQUNwQyxDQUFDO0lBRUQ7Ozs7TUFJRTtJQUNGLGNBQWMsQ0FBQyxHQUFHO1FBQ2hCLE1BQU0sR0FBRyxHQUFHLEdBQUcsSUFBSSxDQUFDLFVBQVUsb0JBQW9CLEdBQUcsRUFBRSxDQUFDO1FBQ3hELE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUM7SUFDNUIsQ0FBQztJQUVEOzs7O01BSUU7SUFDRixtQkFBbUIs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LE1BQU0sRUFBRSxPQUFPLENBQUMsQ0FBQyxTQUFTLEVBQUUsQ0FBQztJQUM5QyxDQUFDO3VHQXZJVSxjQUFjLDRDQUtmLGFBQWE7MkdBTFosY0FBYyxjQUZiLE1BQU07OzJGQUVQLGNBQWM7a0JBSDFCLFVBQVU7bUJBQUM7b0JBQ1YsVUFBVSxFQUFFLE1BQU07aUJBQ25COzswQkFNSSxNQUFNOzJCQUFDLGFBQWEiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBPYnNlcnZhYmxlIH0gZnJvbSBcInJ4anNcIjtcbmltcG9ydCB7IEh0dHBDbGllbnQgfSBmcm9tIFwiQGFuZ3VsYXIvY29tbW9uL2h0dHBcIjtcbmltcG9ydCB7IEluamVjdCwgSW5qZWN0YWJsZSB9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XG5cbkBJbmplY3RhYmxlKHtcbiAgcHJvdmlkZWRJbjogXCJyb290XCIsXG59KVxuZXhwb3J0IGNsYXNzIE1pbmRtYXBTZXJ2aWNlIHtcbiAgcHJpdmF0ZSBtaW5kbWFwVVJMO1xuIFxuICBjb25zdHJ1Y3RvcihcbiAgICBwcml2YXRlIGh0dHA6IEh0dHBDbGllbnQsXG4gICAgQEluamVjdCgnZW52aXJvbm1lbnQnKSBlbnZpcm9ubWVudFxuICApIHtcbiAgICB0aGlzLm1pbmRtYXBVUkwgPSBlbnZpcm9ubWVudC5taW5kbWFwVVJMO1xuICB9XG5cbiAgLyoqXG4gICogR2V0IG1pbmRtYXAga2V5c1xuICAqIEByZXR1cm4ge09ic2VydmFibGU8YW55Pn1cbiAgKi9cbiAgZ2V0TWluZG1hcEtleSgpOiBPYnNlcnZhYmxlPGFueT4ge1xuICAgIGNvbnN0IHVybCA9IGAke3RoaXMubWluZG1hcFVSTH0vbWluZG1hcGA7XG4gICAgcmV0dXJuIHRoaXMuaHR0cC5nZXQodXJsKTtcbiAgfVxuXG4gIC8qKlxuICAqIFBvc3QgbWluZG1hcFxuICAqIEBwYXJhbSB7YW55fSB2YWx1ZSAtIFBheWxvYWQgZm9yIHBvc3QgbWluZG1hcFxuICAqIEByZXR1cm4ge09ic2VydmFibGU8YW55Pn1cbiAgKi9cbiAgcG9zdE1pbmRtYXAodmFsdWUpOiBPYnNlcnZhYmxlPGFueT4ge1xuICAgIGNvbnN0IHVybCA9IGAke3RoaXMubWluZG1hcFVSTH0vbWluZG1hcC91cGxvYWRgO1xuICAgIHJldHVybiB0aGlzLmh0dHAucG9zdCh1cmwsIHZhbHVlKTtcbiAgfVxuXG4gIC8qKlxuICAqIEdldCBtaW5kbWFwIGRldGFpbHMgZnJvbSBrZXlcbiAgKiBAcGFyYW0ge3N0cmluZ30ga2V5IC0gTWluZG1hcCBrZXlcbiAgKiBAcmV0dXJuIHtPYnNlcnZhYmxlPGFueT59XG4gICovXG4gIGRldGFpbHNNaW5kbWFwKGtleSk6IE9ic2VydmFibGU8YW55PiB7XG4gICAgY29uc3QgdXJsID0gYCR7dGhpcy5taW5kbWFwVVJMfS9taW5kbWFwL2RldGFpbHMvJHtrZXl9YDtcbiAgICByZXR1cm4gdGhpcy5odHRwLmdldCh1cmwpO1xuICB9XG5cbiAgLyoqXG4gICogQWRkL3VwZGF0ZSBtaW5kbWFwIGxpY2Vuc2Uga2V5XG4gICogQHBhcmFtIHthbnl9IHBheWxvYWQgLSBQYXlsb2FkIGZvciBtaW5kbWFwIGtleSB0byBhZGQvdXBkYXRlXG4gICogQHJldHVybiB7T2JzZXJ2YWJsZTxhbnk+fVxuICAqL1xuICBhZGRVcGRhdGVMaWNlbnNlS2V5KHBheWxvYWQpOiBPYnNlcnZhYmxlPGFueT4ge1xuICAgIGNvbnN0IHVybCA9IGAke3RoaXMubWluZG1hcFVSTH0vbWluZG1hcC9hZGRVcGRhdGVrZXlgO1xuICAgIHJldHVybiB0aGlzLmh0dHAucG9zdCh1cmwsIHBheWxvYWQpO1xuICB9XG5cbiAgLyoqXG4gICogVXBkYXRlIG1pbmRtYXAga2V5IGltYWdlXG4gICogQHBhcmFtIHtzdHJpbmd9IGtleSAtIE1pbmRtYXAga2V5XG4gICogQHBhcmFtIHtzdHJpbmd9IGltYWdlTmFtZSAtIEltYWdlIG5hbWVcbiAgKiBAcGFyYW0ge3N0cmluZ30gdmFsdWUgLSBJbWFnZSBiYXNlNjRcbiAgKiBAcmV0dXJuIHtPYnNlcnZhYmxlPGFueT59XG4gICovXG4gIHVwZGF0ZUltYWdlKGtleSwgaW1hZ2VOYW1lLCB2YWx1ZSk6IE9ic2VydmFibGU8YW55PiB7XG4gICAgY29uc3QgdXJsID0gYCR7dGhpcy5taW5kbWFwVVJMfS9taW5kbWFwLyR7a2V5fS8ke2ltYWdlTmFtZX1gO1xuICAgIHJldHVybiB0aGlzLmh0dHAucHV0KHVybCwgdmFsdWUpO1xuICB9XG5cbiAgLyoqXG4gICogRGVsZXRlIG1pbmRtYXBcbiAgKiBAcGFyYW0ge3N0cmluZ30ga2V5IC0gTWluZG1hcCBrZXlcbiAgKiBAcGFyYW0ge2FueX0gZGF0YSAtIE1pbmRtYXAgZGF0YVxuICAqIEByZXR1cm4ge09ic2VydmFibGU8YW55Pn1cbiAgKi9cbiAgZGVsZXRlTWluZG1hcChrZXksIGRhdGEpOiBPYnNlcnZhYmxlPGFueT4ge1xuICAgIGNvbnN0IHVybCA9IGAke3RoaXMubWluZG1hcFVSTH0vbWluZG1hcC9kZWxldGUvJHtrZXl9YDtcbiAgICByZXR1cm4gdGhpcy5odHRwLnBvc3QodXJsLCBkYXRhKTtcbiAgfVxuXG4gIC8qKlxuICAqIFRvZ2dsZSBtaW5kbWFwIHN0YXR1c1xuICAqIEBwYXJhbSB7YW55fSBkYXRhIC0gTWluZG1hcCBkYXRhXG4gICogQHJldHVybiB7T2JzZXJ2YWJsZTxhbnk+fVxuICAqL1xuICB0b2dnbGVNaW5kbWFwU3RhdHVzKGRhdGE6IGFueSk6IE9ic2VydmFibGU8YW55PiB7XG4gICAgY29uc3QgdXJsID0gYCR7dGhpcy5taW5kbWFwVVJMfS9taW5kbWFwL3RvZ2dsZVN0YXR1c2A7XG4gICAgcmV0dXJuIHRoaXMuaHR0cC5wb3N0KHVybCwgZGF0YSk7XG4gIH1cblxuICAgIC8qKlxuICAqIE5vdGlmeSBBcHAgc2lkZVxuICAqIEBwYXJhbSB7YW55fSBod1V1aWQgLSBIZWFsdGh3b3JrZXIgSWRcbiAgKiBAcGFyYW0ge2FueX0gcGF5bG9hZCAtIE5vdGlmYWljYXRpb24gbWVzc2FnZVxuICAqIEByZXR1cm4ge09ic2VydmFibGU8YW55Pn1cbiAgKi9cbiAgbm90aWZ5QXBwKGh3VXVpZDogYW55LCBwYXlsb2FkOiBhbnkpIDogT2JzZXJ2YWJsZTxhbnk+e1xuICAgIHJldHVybiB0aGlzLmh0dHAucG9zdChgJHt0aGlzLm1pbmRtYXBVUkx9L21pbmRtYXAvbm90aWZ5LWFwcC8ke2h3VXVpZH1gLCBwYXlsb2FkKVxuICB9XG5cblxuICAvKipcbiAgKiBTZW5kIG5vdGlmaWNhdGlvbiB0byBoZWFsdGggd29ya2VyIGZvciBhdmFpbGFibGUgcHJlc2NyaXB0aW9uXG4gICogQHJldHVybnMge3ZvaWR9XG4gICovXG4gIG5vdGlmeUh3Rm9yUmVzY2hlZHVsZUFwcG9pbnRtZW50KGFwcG9pbnRtZW50KTogdm9pZCB7XG4gICAgY29uc3QgaHdVdWlkID0gYXBwb2ludG1lbnQ/Lmh3VVVJRDtcbiAgICBjb25zdCBvcGVuTVJTSUQgPSBhcHBvaW50bWVudD8ub3Blbk1yc0lkO1xuICAgIGNvbnN0IHBheWxvYWQgPSB7XG4gICAgICB0aXRsZTogYEFwcG9pbnRtZW50IHJlc2NoZWR1bGVkIGZvciAke2FwcG9pbnRtZW50Py5wYXRpZW50TmFtZSB8fCAnUGF0aWVudCd9YCxcbiAgICAgIGJvZHk6IFwiQ2xpY2sgbm90aWZpY2F0aW9uIHRvIHNlZSFcIixcbiAgICAgIHR5cGU6IFwiYXBwb2ludG1lbnRcIixcbiAgICAgIGRhdGE6IHtcbiAgICAgICAgcGF0aWVudEZpcnN0TmFtZTogYXBwb2ludG1lbnQ/LnBhdGllbnROYW1lID8/ICcnLFxuICAgICAgICBwYXRpZW50VXVpZDogYXBwb2ludG1lbnQ/LnBhdGllbnRJZCxcbiAgICAgICAgcGF0aWVudE9wZW5NcnNJZDogb3Blbk1SU0lELFxuICAgICAgICB2aXNpdFV1aWQ6IGFwcG9pbnRtZW50Py52aXNpdFV1aWQsXG4gICAgICAgIHNsb3REYXRlVGltZTogYXBwb2ludG1lbnQ/LnNsb3RKc0RhdGVcbiAgICAgIH1cbiAgICB9XG4gICAgdGhpcy5ub3RpZnlBcHAoaHdVdWlkLCBwYXlsb2FkKS5zdWJzY3JpYmUoKTtcbiAgfVxuXG4gICAvKipcbiAgKiBTZW5kIGNhbmNlbCBub3RpZmljYXRpb24gdG8gaGVhbHRoIHdvcmtlclxuICAqIEByZXR1cm5zIHt2b2lkfVxuICAqL1xuICBub3RpZnlId0ZvckNhbmNlbEFwcG9pbnRtZW50KGFwcG9pbnRtZW50KTogdm9pZCB7XG4gICAgY29uc3QgaHdVdWlkID0gYXBwb2ludG1lbnQ/Lmh3VVVJRDtcbiAgICBjb25zdCBvcGVuTVJTSUQgPSBhcHBvaW50bWVudD8ub3Blbk1yc0lkO1xuICAgIGNvbnN0IHBheWxvYWQgPSB7XG4gICAgICB0aXRsZTogYEFwcG9pbnRtZW50IGNhbmNlbGxlZCBmb3IgJHthcHBvaW50bWVudD8ucGF0aWVudE5hbWUgfHwgJ1BhdGllbnQnfWAsXG4gICAgICBib2R5OiBcIkNsaWNrIG5vdGlmaWNhdGlvbiB0byBzZWUhXCIsXG4gICAgICB0eXBlOiBcImNhbmNlbFwiLFxuICAgICAgZGF0YToge1xuICAgICAgICBwYXRpZW50Rmlyc3ROYW1lOiBhcHBvaW50bWVudD8ucGF0aWVudE5hbWUgPz8gJycsXG4gICAgICAgIHBhdGllbnRVdWlkOiBhcHBvaW50bWVudD8ucGF0aWVudElkLFxuICAgICAgICBwYXRpZW50T3Blbk1yc0lkOiBvcGVuTVJTSUQsXG4gICAgICAgIHZpc2l0VXVpZDogYXBwb2ludG1lbnQ/LnZpc2l0VXVpZCxcbiAgICAgICAgc2xvdERhdGVUaW1lOiBhcHBvaW50bWVudD8uc2xvdEpzRGF0ZVxuICAgICAgfVxuICAgIH1cbiAgICB0aGlzLm5vdGlmeUFwcChod1V1aWQsIHBheWxvYWQpLnN1YnNjcmliZSgpO1xuICB9XG59XG4iXX0=