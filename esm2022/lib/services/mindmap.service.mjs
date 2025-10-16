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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWluZG1hcC5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvaWgtbGlicmFyeS9zcmMvbGliL3NlcnZpY2VzL21pbmRtYXAuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFDQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sc0JBQXNCLENBQUM7QUFDbEQsT0FBTyxFQUFFLE1BQU0sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7OztBQUtuRCxNQUFNLE9BQU8sY0FBYztJQUlmO0lBSEYsVUFBVSxDQUFDO0lBRW5CLFlBQ1UsSUFBZ0IsRUFDRCxXQUFXO1FBRDFCLFNBQUksR0FBSixJQUFJLENBQVk7UUFHeEIsSUFBSSxDQUFDLFVBQVUsR0FBRyxXQUFXLENBQUMsVUFBVSxDQUFDO0lBQzNDLENBQUM7SUFFRDs7O01BR0U7SUFDRixhQUFhO1FBQ1gsTUFBTSxHQUFHLEdBQUcsR0FBRyxJQUFJLENBQUMsVUFBVSxVQUFVLENBQUM7UUFDekMsT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUM1QixDQUFDO0lBRUQ7Ozs7TUFJRTtJQUNGLFdBQVcsQ0FBQyxLQUFLO1FBQ2YsTUFBTSxHQUFHLEdBQUcsR0FBRyxJQUFJLENBQUMsVUFBVSxpQkFBaUIsQ0FBQztRQUNoRCxPQUFPLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRSxLQUFLLENBQUMsQ0FBQztJQUNwQyxDQUFDO0lBRUQ7Ozs7TUFJRTtJQUNGLGNBQWMsQ0FBQyxHQUFHO1FBQ2hCLE1BQU0sR0FBRyxHQUFHLEdBQUcsSUFBSSxDQUFDLFVBQVUsb0JBQW9CLEdBQUcsRUFBRSxDQUFDO1FBQ3hELE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUM7SUFDNUIsQ0FBQztJQUVEOzs7O01BSUU7SUFDRixtQkFBbUIsQ0FBQyxPQUFPO1FBQ3pCLE1BQU0sR0FBRyxHQUFHLEdBQUcsSUFBSSxDQUFDLFVBQVUsdUJBQXVCLENBQUM7UUFDdEQsT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLEVBQUUsT0FBTyxDQUFDLENBQUM7SUFDdEMsQ0FBQztJQUVEOzs7Ozs7TUFNRTtJQUNGLFdBQVcsQ0FBQyxHQUFHLEVBQUUsU0FBUyxFQUFFLEtBQUs7UUFDL0IsTUFBTSxHQUFHLEdBQUcsR0FBRyxJQUFJLENBQUMsVUFBVSxZQUFZLEdBQUcsSUFBSSxTQUFTLEVBQUUsQ0FBQztRQUM3RCxPQUFPLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEdBQUcsRUFBRSxLQUFLLENBQUMsQ0FBQztJQUNuQyxDQUFDO0lBRUQ7Ozs7O01BS0U7SUFDRixhQUFhLENBQUMsR0FBRyxFQUFFLElBQUk7UUFDckIsTUFBTSxHQUFHLEdBQUcsR0FBRyxJQUFJLENBQUMsVUFBVSxtQkFBbUIsR0FBRyxFQUFFLENBQUM7UUFDdkQsT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLEVBQUUsSUFBSSxDQUFDLENBQUM7SUFDbkMsQ0FBQztJQUVEOzs7O01BSUU7SUFDRixtQkFBbUIsQ0FBQyxJQUFTO1FBQzNCLE1BQU0sR0FBRyxHQUFHLEdBQUcsSUFBSSxDQUFDLFVBQVUsdUJBQXVCLENBQUM7UUFDdEQsT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLEVBQUUsSUFBSSxDQUFDLENBQUM7SUFDbkMsQ0FBQztJQUVDOzs7OztJQUtBO0lBQ0YsU0FBUyxDQUFDLE1BQVcsRUFBRSxPQUFZO1FBQ2pDLE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxJQUFJLENBQUMsVUFBVSx1QkFBdUIsTUFBTSxFQUFFLEVBQUUsT0FBTyxDQUFDLENBQUE7SUFDbkYsQ0FBQztJQUdEOzs7TUFHRTtJQUNGLGdDQUFnQyxDQUFDLFdBQVc7UUFDMUMsTUFBTSxNQUFNLEdBQUcsV0FBVyxFQUFFLE1BQU0sQ0FBQztRQUNuQyxNQUFNLFNBQVMsR0FBRyxXQUFXLEVBQUUsU0FBUyxDQUFDO1FBQ3pDLE1BQU0sT0FBTyxHQUFHO1lBQ2QsS0FBSyxFQUFFLCtCQUErQixXQUFXLEVBQUUsV0FBVyxJQUFJLFNBQVMsRUFBRTtZQUM3RSxJQUFJLEVBQUUsNEJBQTRCO1lBQ2xDLElBQUksRUFBRSxhQUFhO1lBQ25CLElBQUksRUFBRTtnQkFDSixnQkFBZ0IsRUFBRSxXQUFXLEVBQUUsV0FBVyxJQUFJLEVBQUU7Z0JBQ2hELFdBQVcsRUFBRSxXQUFXLEVBQUUsU0FBUztnQkFDbkMsZ0JBQWdCLEVBQUUsU0FBUztnQkFDM0IsU0FBUyxFQUFFLFdBQVcsRUFBRSxTQUFTO2dCQUNqQyxZQUFZLEVBQUUsV0FBVyxFQUFFLFVBQVU7YUFDdEM7U0FDRixDQUFBO1FBQ0QsSUFBSSxDQUFDLFNBQVMsQ0FBQyxNQUFNLEVBQUUsT0FBTyxDQUFDLENBQUMsU0FBUyxFQUFFLENBQUM7SUFDOUMsQ0FBQztJQUVBOzs7S0FHQztJQUNGLDRCQUE0QixDQUFDLFdBQVc7UUFDdEMsTUFBTSxNQUFNLEdBQUcsV0FBVyxFQUFFLE1BQU0sQ0FBQztRQUNuQyxNQUFNLFNBQVMsR0FBRyxXQUFXLEVBQUUsU0FBUyxDQUFDO1FBQ3pDLE1BQU0sT0FBTyxHQUFHO1lBQ2QsS0FBSyxFQUFFLDZCQUE2QixXQUFXLEVBQUUsV0FBVyxJQUFJLFNBQVMsRUFBRTtZQUMzRSxJQUFJLEVBQUUsNEJBQTRCO1lBQ2xDLElBQUksRUFBRSxRQUFRO1lBQ2QsSUFBSSxFQUFFO2dCQUNKLGdCQUFnQixFQUFFLFdBQVcsRUFBRSxXQUFXLElBQUksRUFBRTtnQkFDaEQsV0FBVyxFQUFFLFdBQVcsRUFBRSxTQUFTO2dCQUNuQyxnQkFBZ0IsRUFBRSxTQUFTO2dCQUMzQixTQUFTLEVBQUUsV0FBVyxFQUFFLFNBQVM7Z0JBQ2pDLFlBQVksRUFBRSxXQUFXLEVBQUUsVUFBVTthQUN0QztTQUNGLENBQUE7UUFDRCxJQUFJLENBQUMsU0FBUyxDQUFDLE1BQU0sRUFBRSxPQUFPLENBQUMsQ0FBQyxTQUFTLEVBQUUsQ0FBQztJQUM5QyxDQUFDO3VHQXZJVSxjQUFjLDRDQUtmLGFBQWE7MkdBTFosY0FBYyxjQUZiLE1BQU07OzJGQUVQLGNBQWM7a0JBSDFCLFVBQVU7bUJBQUM7b0JBQ1YsVUFBVSxFQUFFLE1BQU07aUJBQ25COzswQkFNSSxNQUFNOzJCQUFDLGFBQWEiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBPYnNlcnZhYmxlIH0gZnJvbSBcInJ4anNcIjtcclxuaW1wb3J0IHsgSHR0cENsaWVudCB9IGZyb20gXCJAYW5ndWxhci9jb21tb24vaHR0cFwiO1xyXG5pbXBvcnQgeyBJbmplY3QsIEluamVjdGFibGUgfSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xyXG5cclxuQEluamVjdGFibGUoe1xyXG4gIHByb3ZpZGVkSW46IFwicm9vdFwiLFxyXG59KVxyXG5leHBvcnQgY2xhc3MgTWluZG1hcFNlcnZpY2Uge1xyXG4gIHByaXZhdGUgbWluZG1hcFVSTDtcclxuIFxyXG4gIGNvbnN0cnVjdG9yKFxyXG4gICAgcHJpdmF0ZSBodHRwOiBIdHRwQ2xpZW50LFxyXG4gICAgQEluamVjdCgnZW52aXJvbm1lbnQnKSBlbnZpcm9ubWVudFxyXG4gICkge1xyXG4gICAgdGhpcy5taW5kbWFwVVJMID0gZW52aXJvbm1lbnQubWluZG1hcFVSTDtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICogR2V0IG1pbmRtYXAga2V5c1xyXG4gICogQHJldHVybiB7T2JzZXJ2YWJsZTxhbnk+fVxyXG4gICovXHJcbiAgZ2V0TWluZG1hcEtleSgpOiBPYnNlcnZhYmxlPGFueT4ge1xyXG4gICAgY29uc3QgdXJsID0gYCR7dGhpcy5taW5kbWFwVVJMfS9taW5kbWFwYDtcclxuICAgIHJldHVybiB0aGlzLmh0dHAuZ2V0KHVybCk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAqIFBvc3QgbWluZG1hcFxyXG4gICogQHBhcmFtIHthbnl9IHZhbHVlIC0gUGF5bG9hZCBmb3IgcG9zdCBtaW5kbWFwXHJcbiAgKiBAcmV0dXJuIHtPYnNlcnZhYmxlPGFueT59XHJcbiAgKi9cclxuICBwb3N0TWluZG1hcCh2YWx1ZSk6IE9ic2VydmFibGU8YW55PiB7XHJcbiAgICBjb25zdCB1cmwgPSBgJHt0aGlzLm1pbmRtYXBVUkx9L21pbmRtYXAvdXBsb2FkYDtcclxuICAgIHJldHVybiB0aGlzLmh0dHAucG9zdCh1cmwsIHZhbHVlKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICogR2V0IG1pbmRtYXAgZGV0YWlscyBmcm9tIGtleVxyXG4gICogQHBhcmFtIHtzdHJpbmd9IGtleSAtIE1pbmRtYXAga2V5XHJcbiAgKiBAcmV0dXJuIHtPYnNlcnZhYmxlPGFueT59XHJcbiAgKi9cclxuICBkZXRhaWxzTWluZG1hcChrZXkpOiBPYnNlcnZhYmxlPGFueT4ge1xyXG4gICAgY29uc3QgdXJsID0gYCR7dGhpcy5taW5kbWFwVVJMfS9taW5kbWFwL2RldGFpbHMvJHtrZXl9YDtcclxuICAgIHJldHVybiB0aGlzLmh0dHAuZ2V0KHVybCk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAqIEFkZC91cGRhdGUgbWluZG1hcCBsaWNlbnNlIGtleVxyXG4gICogQHBhcmFtIHthbnl9IHBheWxvYWQgLSBQYXlsb2FkIGZvciBtaW5kbWFwIGtleSB0byBhZGQvdXBkYXRlXHJcbiAgKiBAcmV0dXJuIHtPYnNlcnZhYmxlPGFueT59XHJcbiAgKi9cclxuICBhZGRVcGRhdGVMaWNlbnNlS2V5KHBheWxvYWQpOiBPYnNlcnZhYmxlPGFueT4ge1xyXG4gICAgY29uc3QgdXJsID0gYCR7dGhpcy5taW5kbWFwVVJMfS9taW5kbWFwL2FkZFVwZGF0ZWtleWA7XHJcbiAgICByZXR1cm4gdGhpcy5odHRwLnBvc3QodXJsLCBwYXlsb2FkKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICogVXBkYXRlIG1pbmRtYXAga2V5IGltYWdlXHJcbiAgKiBAcGFyYW0ge3N0cmluZ30ga2V5IC0gTWluZG1hcCBrZXlcclxuICAqIEBwYXJhbSB7c3RyaW5nfSBpbWFnZU5hbWUgLSBJbWFnZSBuYW1lXHJcbiAgKiBAcGFyYW0ge3N0cmluZ30gdmFsdWUgLSBJbWFnZSBiYXNlNjRcclxuICAqIEByZXR1cm4ge09ic2VydmFibGU8YW55Pn1cclxuICAqL1xyXG4gIHVwZGF0ZUltYWdlKGtleSwgaW1hZ2VOYW1lLCB2YWx1ZSk6IE9ic2VydmFibGU8YW55PiB7XHJcbiAgICBjb25zdCB1cmwgPSBgJHt0aGlzLm1pbmRtYXBVUkx9L21pbmRtYXAvJHtrZXl9LyR7aW1hZ2VOYW1lfWA7XHJcbiAgICByZXR1cm4gdGhpcy5odHRwLnB1dCh1cmwsIHZhbHVlKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICogRGVsZXRlIG1pbmRtYXBcclxuICAqIEBwYXJhbSB7c3RyaW5nfSBrZXkgLSBNaW5kbWFwIGtleVxyXG4gICogQHBhcmFtIHthbnl9IGRhdGEgLSBNaW5kbWFwIGRhdGFcclxuICAqIEByZXR1cm4ge09ic2VydmFibGU8YW55Pn1cclxuICAqL1xyXG4gIGRlbGV0ZU1pbmRtYXAoa2V5LCBkYXRhKTogT2JzZXJ2YWJsZTxhbnk+IHtcclxuICAgIGNvbnN0IHVybCA9IGAke3RoaXMubWluZG1hcFVSTH0vbWluZG1hcC9kZWxldGUvJHtrZXl9YDtcclxuICAgIHJldHVybiB0aGlzLmh0dHAucG9zdCh1cmwsIGRhdGEpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgKiBUb2dnbGUgbWluZG1hcCBzdGF0dXNcclxuICAqIEBwYXJhbSB7YW55fSBkYXRhIC0gTWluZG1hcCBkYXRhXHJcbiAgKiBAcmV0dXJuIHtPYnNlcnZhYmxlPGFueT59XHJcbiAgKi9cclxuICB0b2dnbGVNaW5kbWFwU3RhdHVzKGRhdGE6IGFueSk6IE9ic2VydmFibGU8YW55PiB7XHJcbiAgICBjb25zdCB1cmwgPSBgJHt0aGlzLm1pbmRtYXBVUkx9L21pbmRtYXAvdG9nZ2xlU3RhdHVzYDtcclxuICAgIHJldHVybiB0aGlzLmh0dHAucG9zdCh1cmwsIGRhdGEpO1xyXG4gIH1cclxuXHJcbiAgICAvKipcclxuICAqIE5vdGlmeSBBcHAgc2lkZVxyXG4gICogQHBhcmFtIHthbnl9IGh3VXVpZCAtIEhlYWx0aHdvcmtlciBJZFxyXG4gICogQHBhcmFtIHthbnl9IHBheWxvYWQgLSBOb3RpZmFpY2F0aW9uIG1lc3NhZ2VcclxuICAqIEByZXR1cm4ge09ic2VydmFibGU8YW55Pn1cclxuICAqL1xyXG4gIG5vdGlmeUFwcChod1V1aWQ6IGFueSwgcGF5bG9hZDogYW55KSA6IE9ic2VydmFibGU8YW55PntcclxuICAgIHJldHVybiB0aGlzLmh0dHAucG9zdChgJHt0aGlzLm1pbmRtYXBVUkx9L21pbmRtYXAvbm90aWZ5LWFwcC8ke2h3VXVpZH1gLCBwYXlsb2FkKVxyXG4gIH1cclxuXHJcblxyXG4gIC8qKlxyXG4gICogU2VuZCBub3RpZmljYXRpb24gdG8gaGVhbHRoIHdvcmtlciBmb3IgYXZhaWxhYmxlIHByZXNjcmlwdGlvblxyXG4gICogQHJldHVybnMge3ZvaWR9XHJcbiAgKi9cclxuICBub3RpZnlId0ZvclJlc2NoZWR1bGVBcHBvaW50bWVudChhcHBvaW50bWVudCk6IHZvaWQge1xyXG4gICAgY29uc3QgaHdVdWlkID0gYXBwb2ludG1lbnQ/Lmh3VVVJRDtcclxuICAgIGNvbnN0IG9wZW5NUlNJRCA9IGFwcG9pbnRtZW50Py5vcGVuTXJzSWQ7XHJcbiAgICBjb25zdCBwYXlsb2FkID0ge1xyXG4gICAgICB0aXRsZTogYEFwcG9pbnRtZW50IHJlc2NoZWR1bGVkIGZvciAke2FwcG9pbnRtZW50Py5wYXRpZW50TmFtZSB8fCAnUGF0aWVudCd9YCxcclxuICAgICAgYm9keTogXCJDbGljayBub3RpZmljYXRpb24gdG8gc2VlIVwiLFxyXG4gICAgICB0eXBlOiBcImFwcG9pbnRtZW50XCIsXHJcbiAgICAgIGRhdGE6IHtcclxuICAgICAgICBwYXRpZW50Rmlyc3ROYW1lOiBhcHBvaW50bWVudD8ucGF0aWVudE5hbWUgPz8gJycsXHJcbiAgICAgICAgcGF0aWVudFV1aWQ6IGFwcG9pbnRtZW50Py5wYXRpZW50SWQsXHJcbiAgICAgICAgcGF0aWVudE9wZW5NcnNJZDogb3Blbk1SU0lELFxyXG4gICAgICAgIHZpc2l0VXVpZDogYXBwb2ludG1lbnQ/LnZpc2l0VXVpZCxcclxuICAgICAgICBzbG90RGF0ZVRpbWU6IGFwcG9pbnRtZW50Py5zbG90SnNEYXRlXHJcbiAgICAgIH1cclxuICAgIH1cclxuICAgIHRoaXMubm90aWZ5QXBwKGh3VXVpZCwgcGF5bG9hZCkuc3Vic2NyaWJlKCk7XHJcbiAgfVxyXG5cclxuICAgLyoqXHJcbiAgKiBTZW5kIGNhbmNlbCBub3RpZmljYXRpb24gdG8gaGVhbHRoIHdvcmtlclxyXG4gICogQHJldHVybnMge3ZvaWR9XHJcbiAgKi9cclxuICBub3RpZnlId0ZvckNhbmNlbEFwcG9pbnRtZW50KGFwcG9pbnRtZW50KTogdm9pZCB7XHJcbiAgICBjb25zdCBod1V1aWQgPSBhcHBvaW50bWVudD8uaHdVVUlEO1xyXG4gICAgY29uc3Qgb3Blbk1SU0lEID0gYXBwb2ludG1lbnQ/Lm9wZW5NcnNJZDtcclxuICAgIGNvbnN0IHBheWxvYWQgPSB7XHJcbiAgICAgIHRpdGxlOiBgQXBwb2ludG1lbnQgY2FuY2VsbGVkIGZvciAke2FwcG9pbnRtZW50Py5wYXRpZW50TmFtZSB8fCAnUGF0aWVudCd9YCxcclxuICAgICAgYm9keTogXCJDbGljayBub3RpZmljYXRpb24gdG8gc2VlIVwiLFxyXG4gICAgICB0eXBlOiBcImNhbmNlbFwiLFxyXG4gICAgICBkYXRhOiB7XHJcbiAgICAgICAgcGF0aWVudEZpcnN0TmFtZTogYXBwb2ludG1lbnQ/LnBhdGllbnROYW1lID8/ICcnLFxyXG4gICAgICAgIHBhdGllbnRVdWlkOiBhcHBvaW50bWVudD8ucGF0aWVudElkLFxyXG4gICAgICAgIHBhdGllbnRPcGVuTXJzSWQ6IG9wZW5NUlNJRCxcclxuICAgICAgICB2aXNpdFV1aWQ6IGFwcG9pbnRtZW50Py52aXNpdFV1aWQsXHJcbiAgICAgICAgc2xvdERhdGVUaW1lOiBhcHBvaW50bWVudD8uc2xvdEpzRGF0ZVxyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgICB0aGlzLm5vdGlmeUFwcChod1V1aWQsIHBheWxvYWQpLnN1YnNjcmliZSgpO1xyXG4gIH1cclxufVxyXG4iXX0=