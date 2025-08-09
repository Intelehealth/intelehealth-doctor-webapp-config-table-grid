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
        console.log("inside cancell notification");
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWluZG1hcC5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvaWgtbGlicmFyeS9zcmMvbGliL3NlcnZpY2VzL21pbmRtYXAuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFDQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sc0JBQXNCLENBQUM7QUFDbEQsT0FBTyxFQUFFLE1BQU0sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7OztBQUtuRCxNQUFNLE9BQU8sY0FBYztJQUlmO0lBSEYsVUFBVSxDQUFDO0lBRW5CLFlBQ1UsSUFBZ0IsRUFDRCxXQUFXO1FBRDFCLFNBQUksR0FBSixJQUFJLENBQVk7UUFHeEIsSUFBSSxDQUFDLFVBQVUsR0FBRyxXQUFXLENBQUMsVUFBVSxDQUFDO0lBQzNDLENBQUM7SUFFRDs7O01BR0U7SUFDRixhQUFhO1FBQ1gsTUFBTSxHQUFHLEdBQUcsR0FBRyxJQUFJLENBQUMsVUFBVSxVQUFVLENBQUM7UUFDekMsT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUM1QixDQUFDO0lBRUQ7Ozs7TUFJRTtJQUNGLFdBQVcsQ0FBQyxLQUFLO1FBQ2YsTUFBTSxHQUFHLEdBQUcsR0FBRyxJQUFJLENBQUMsVUFBVSxpQkFBaUIsQ0FBQztRQUNoRCxPQUFPLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRSxLQUFLLENBQUMsQ0FBQztJQUNwQyxDQUFDO0lBRUQ7Ozs7TUFJRTtJQUNGLGNBQWMsQ0FBQyxHQUFHO1FBQ2hCLE1BQU0sR0FBRyxHQUFHLEdBQUcsSUFBSSxDQUFDLFVBQVUsb0JBQW9CLEdBQUcsRUFBRSxDQUFDO1FBQ3hELE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUM7SUFDNUIsQ0FBQztJQUVEOzs7O01BSUU7SUFDRixtQkFBbUIs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QVU7YUFDdEM7U0FDRixDQUFBO1FBQ0QsSUFBSSxDQUFDLFNBQVMsQ0FBQyxNQUFNLEVBQUUsT0FBTyxDQUFDLENBQUMsU0FBUyxFQUFFLENBQUM7SUFDOUMsQ0FBQzt1R0F2SVUsY0FBYyw0Q0FLZixhQUFhOzJHQUxaLGNBQWMsY0FGYixNQUFNOzsyRkFFUCxjQUFjO2tCQUgxQixVQUFVO21CQUFDO29CQUNWLFVBQVUsRUFBRSxNQUFNO2lCQUNuQjs7MEJBTUksTUFBTTsyQkFBQyxhQUFhIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gXCJyeGpzXCI7XHJcbmltcG9ydCB7IEh0dHBDbGllbnQgfSBmcm9tIFwiQGFuZ3VsYXIvY29tbW9uL2h0dHBcIjtcclxuaW1wb3J0IHsgSW5qZWN0LCBJbmplY3RhYmxlIH0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcclxuXHJcbkBJbmplY3RhYmxlKHtcclxuICBwcm92aWRlZEluOiBcInJvb3RcIixcclxufSlcclxuZXhwb3J0IGNsYXNzIE1pbmRtYXBTZXJ2aWNlIHtcclxuICBwcml2YXRlIG1pbmRtYXBVUkw7XHJcbiBcclxuICBjb25zdHJ1Y3RvcihcclxuICAgIHByaXZhdGUgaHR0cDogSHR0cENsaWVudCxcclxuICAgIEBJbmplY3QoJ2Vudmlyb25tZW50JykgZW52aXJvbm1lbnRcclxuICApIHtcclxuICAgIHRoaXMubWluZG1hcFVSTCA9IGVudmlyb25tZW50Lm1pbmRtYXBVUkw7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAqIEdldCBtaW5kbWFwIGtleXNcclxuICAqIEByZXR1cm4ge09ic2VydmFibGU8YW55Pn1cclxuICAqL1xyXG4gIGdldE1pbmRtYXBLZXkoKTogT2JzZXJ2YWJsZTxhbnk+IHtcclxuICAgIGNvbnN0IHVybCA9IGAke3RoaXMubWluZG1hcFVSTH0vbWluZG1hcGA7XHJcbiAgICByZXR1cm4gdGhpcy5odHRwLmdldCh1cmwpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgKiBQb3N0IG1pbmRtYXBcclxuICAqIEBwYXJhbSB7YW55fSB2YWx1ZSAtIFBheWxvYWQgZm9yIHBvc3QgbWluZG1hcFxyXG4gICogQHJldHVybiB7T2JzZXJ2YWJsZTxhbnk+fVxyXG4gICovXHJcbiAgcG9zdE1pbmRtYXAodmFsdWUpOiBPYnNlcnZhYmxlPGFueT4ge1xyXG4gICAgY29uc3QgdXJsID0gYCR7dGhpcy5taW5kbWFwVVJMfS9taW5kbWFwL3VwbG9hZGA7XHJcbiAgICByZXR1cm4gdGhpcy5odHRwLnBvc3QodXJsLCB2YWx1ZSk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAqIEdldCBtaW5kbWFwIGRldGFpbHMgZnJvbSBrZXlcclxuICAqIEBwYXJhbSB7c3RyaW5nfSBrZXkgLSBNaW5kbWFwIGtleVxyXG4gICogQHJldHVybiB7T2JzZXJ2YWJsZTxhbnk+fVxyXG4gICovXHJcbiAgZGV0YWlsc01pbmRtYXAoa2V5KTogT2JzZXJ2YWJsZTxhbnk+IHtcclxuICAgIGNvbnN0IHVybCA9IGAke3RoaXMubWluZG1hcFVSTH0vbWluZG1hcC9kZXRhaWxzLyR7a2V5fWA7XHJcbiAgICByZXR1cm4gdGhpcy5odHRwLmdldCh1cmwpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgKiBBZGQvdXBkYXRlIG1pbmRtYXAgbGljZW5zZSBrZXlcclxuICAqIEBwYXJhbSB7YW55fSBwYXlsb2FkIC0gUGF5bG9hZCBmb3IgbWluZG1hcCBrZXkgdG8gYWRkL3VwZGF0ZVxyXG4gICogQHJldHVybiB7T2JzZXJ2YWJsZTxhbnk+fVxyXG4gICovXHJcbiAgYWRkVXBkYXRlTGljZW5zZUtleShwYXlsb2FkKTogT2JzZXJ2YWJsZTxhbnk+IHtcclxuICAgIGNvbnN0IHVybCA9IGAke3RoaXMubWluZG1hcFVSTH0vbWluZG1hcC9hZGRVcGRhdGVrZXlgO1xyXG4gICAgcmV0dXJuIHRoaXMuaHR0cC5wb3N0KHVybCwgcGF5bG9hZCk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAqIFVwZGF0ZSBtaW5kbWFwIGtleSBpbWFnZVxyXG4gICogQHBhcmFtIHtzdHJpbmd9IGtleSAtIE1pbmRtYXAga2V5XHJcbiAgKiBAcGFyYW0ge3N0cmluZ30gaW1hZ2VOYW1lIC0gSW1hZ2UgbmFtZVxyXG4gICogQHBhcmFtIHtzdHJpbmd9IHZhbHVlIC0gSW1hZ2UgYmFzZTY0XHJcbiAgKiBAcmV0dXJuIHtPYnNlcnZhYmxlPGFueT59XHJcbiAgKi9cclxuICB1cGRhdGVJbWFnZShrZXksIGltYWdlTmFtZSwgdmFsdWUpOiBPYnNlcnZhYmxlPGFueT4ge1xyXG4gICAgY29uc3QgdXJsID0gYCR7dGhpcy5taW5kbWFwVVJMfS9taW5kbWFwLyR7a2V5fS8ke2ltYWdlTmFtZX1gO1xyXG4gICAgcmV0dXJuIHRoaXMuaHR0cC5wdXQodXJsLCB2YWx1ZSk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAqIERlbGV0ZSBtaW5kbWFwXHJcbiAgKiBAcGFyYW0ge3N0cmluZ30ga2V5IC0gTWluZG1hcCBrZXlcclxuICAqIEBwYXJhbSB7YW55fSBkYXRhIC0gTWluZG1hcCBkYXRhXHJcbiAgKiBAcmV0dXJuIHtPYnNlcnZhYmxlPGFueT59XHJcbiAgKi9cclxuICBkZWxldGVNaW5kbWFwKGtleSwgZGF0YSk6IE9ic2VydmFibGU8YW55PiB7XHJcbiAgICBjb25zdCB1cmwgPSBgJHt0aGlzLm1pbmRtYXBVUkx9L21pbmRtYXAvZGVsZXRlLyR7a2V5fWA7XHJcbiAgICByZXR1cm4gdGhpcy5odHRwLnBvc3QodXJsLCBkYXRhKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICogVG9nZ2xlIG1pbmRtYXAgc3RhdHVzXHJcbiAgKiBAcGFyYW0ge2FueX0gZGF0YSAtIE1pbmRtYXAgZGF0YVxyXG4gICogQHJldHVybiB7T2JzZXJ2YWJsZTxhbnk+fVxyXG4gICovXHJcbiAgdG9nZ2xlTWluZG1hcFN0YXR1cyhkYXRhOiBhbnkpOiBPYnNlcnZhYmxlPGFueT4ge1xyXG4gICAgY29uc3QgdXJsID0gYCR7dGhpcy5taW5kbWFwVVJMfS9taW5kbWFwL3RvZ2dsZVN0YXR1c2A7XHJcbiAgICByZXR1cm4gdGhpcy5odHRwLnBvc3QodXJsLCBkYXRhKTtcclxuICB9XHJcblxyXG4gICAgLyoqXHJcbiAgKiBOb3RpZnkgQXBwIHNpZGVcclxuICAqIEBwYXJhbSB7YW55fSBod1V1aWQgLSBIZWFsdGh3b3JrZXIgSWRcclxuICAqIEBwYXJhbSB7YW55fSBwYXlsb2FkIC0gTm90aWZhaWNhdGlvbiBtZXNzYWdlXHJcbiAgKiBAcmV0dXJuIHtPYnNlcnZhYmxlPGFueT59XHJcbiAgKi9cclxuICBub3RpZnlBcHAoaHdVdWlkOiBhbnksIHBheWxvYWQ6IGFueSkgOiBPYnNlcnZhYmxlPGFueT57XHJcbiAgICByZXR1cm4gdGhpcy5odHRwLnBvc3QoYCR7dGhpcy5taW5kbWFwVVJMfS9taW5kbWFwL25vdGlmeS1hcHAvJHtod1V1aWR9YCwgcGF5bG9hZClcclxuICB9XHJcblxyXG5cclxuICAvKipcclxuICAqIFNlbmQgbm90aWZpY2F0aW9uIHRvIGhlYWx0aCB3b3JrZXIgZm9yIGF2YWlsYWJsZSBwcmVzY3JpcHRpb25cclxuICAqIEByZXR1cm5zIHt2b2lkfVxyXG4gICovXHJcbiAgbm90aWZ5SHdGb3JSZXNjaGVkdWxlQXBwb2ludG1lbnQoYXBwb2ludG1lbnQpOiB2b2lkIHtcclxuICAgIGNvbnN0IGh3VXVpZCA9IGFwcG9pbnRtZW50Py5od1VVSUQ7XHJcbiAgICBjb25zdCBvcGVuTVJTSUQgPSBhcHBvaW50bWVudD8ub3Blbk1yc0lkO1xyXG4gICAgY29uc3QgcGF5bG9hZCA9IHtcclxuICAgICAgdGl0bGU6IGBBcHBvaW50bWVudCByZXNjaGVkdWxlZCBmb3IgJHthcHBvaW50bWVudD8ucGF0aWVudE5hbWUgfHwgJ1BhdGllbnQnfWAsXHJcbiAgICAgIGJvZHk6IFwiQ2xpY2sgbm90aWZpY2F0aW9uIHRvIHNlZSFcIixcclxuICAgICAgdHlwZTogXCJhcHBvaW50bWVudFwiLFxyXG4gICAgICBkYXRhOiB7XHJcbiAgICAgICAgcGF0aWVudEZpcnN0TmFtZTogYXBwb2ludG1lbnQ/LnBhdGllbnROYW1lID8/ICcnLFxyXG4gICAgICAgIHBhdGllbnRVdWlkOiBhcHBvaW50bWVudD8ucGF0aWVudElkLFxyXG4gICAgICAgIHBhdGllbnRPcGVuTXJzSWQ6IG9wZW5NUlNJRCxcclxuICAgICAgICB2aXNpdFV1aWQ6IGFwcG9pbnRtZW50Py52aXNpdFV1aWQsXHJcbiAgICAgICAgc2xvdERhdGVUaW1lOiBhcHBvaW50bWVudD8uc2xvdEpzRGF0ZVxyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgICB0aGlzLm5vdGlmeUFwcChod1V1aWQsIHBheWxvYWQpLnN1YnNjcmliZSgpO1xyXG4gIH1cclxuICAvKipcclxuICAqIFNlbmQgY2FuY2VsIG5vdGlmaWNhdGlvbiB0byBoZWFsdGggd29ya2VyXHJcbiAgKiBAcmV0dXJucyB7dm9pZH1cclxuICAqL1xyXG4gIG5vdGlmeUh3Rm9yQ2FuY2VsQXBwb2ludG1lbnQoYXBwb2ludG1lbnQpOiB2b2lkIHtcclxuICAgIGNvbnNvbGUubG9nKFwiaW5zaWRlIGNhbmNlbGwgbm90aWZpY2F0aW9uXCIpO1xyXG4gICAgY29uc3QgaHdVdWlkID0gYXBwb2ludG1lbnQ/Lmh3VVVJRDtcclxuICAgIGNvbnN0IG9wZW5NUlNJRCA9IGFwcG9pbnRtZW50Py5vcGVuTXJzSWQ7XHJcbiAgICBjb25zdCBwYXlsb2FkID0ge1xyXG4gICAgICB0aXRsZTogYEFwcG9pbnRtZW50IGNhbmNlbGxlZCBmb3IgJHthcHBvaW50bWVudD8ucGF0aWVudE5hbWUgfHwgJ1BhdGllbnQnfWAsXHJcbiAgICAgIGJvZHk6IFwiQ2xpY2sgbm90aWZpY2F0aW9uIHRvIHNlZSFcIixcclxuICAgICAgdHlwZTogXCJjYW5jZWxcIixcclxuICAgICAgZGF0YToge1xyXG4gICAgICAgIHBhdGllbnRGaXJzdE5hbWU6IGFwcG9pbnRtZW50Py5wYXRpZW50TmFtZSA/PyAnJyxcclxuICAgICAgICBwYXRpZW50VXVpZDogYXBwb2ludG1lbnQ/LnBhdGllbnRJZCxcclxuICAgICAgICBwYXRpZW50T3Blbk1yc0lkOiBvcGVuTVJTSUQsXHJcbiAgICAgICAgdmlzaXRVdWlkOiBhcHBvaW50bWVudD8udmlzaXRVdWlkLFxyXG4gICAgICAgIHNsb3REYXRlVGltZTogYXBwb2ludG1lbnQ/LnNsb3RKc0RhdGVcclxuICAgICAgfVxyXG4gICAgfVxyXG4gICAgdGhpcy5ub3RpZnlBcHAoaHdVdWlkLCBwYXlsb2FkKS5zdWJzY3JpYmUoKTtcclxuICB9XHJcbn1cclxuIl19