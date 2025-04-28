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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWluZG1hcC5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvaWgtbGlicmFyeS9zcmMvbGliL3NlcnZpY2VzL21pbmRtYXAuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFDQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sc0JBQXNCLENBQUM7QUFDbEQsT0FBTyxFQUFFLE1BQU0sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7OztBQUtuRCxNQUFNLE9BQU8sY0FBYztJQUlmO0lBSEYsVUFBVSxDQUFDO0lBRW5CLFlBQ1UsSUFBZ0IsRUFDRCxXQUFXO1FBRDFCLFNBQUksR0FBSixJQUFJLENBQVk7UUFHeEIsSUFBSSxDQUFDLFVBQVUsR0FBRyxXQUFXLENBQUMsVUFBVSxDQUFDO0lBQzNDLENBQUM7SUFFRDs7O01BR0U7SUFDRixhQUFhO1FBQ1gsTUFBTSxHQUFHLEdBQUcsR0FBRyxJQUFJLENBQUMsVUFBVSxVQUFVLENBQUM7UUFDekMsT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUM1QixDQUFDO0lBRUQ7Ozs7TUFJRTtJQUNGLFdBQVcsQ0FBQyxLQUFLO1FBQ2YsTUFBTSxHQUFHLEdBQUcsR0FBRyxJQUFJLENBQUMsVUFBVSxpQkFBaUIsQ0FBQztRQUNoRCxPQUFPLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRSxLQUFLLENBQUMsQ0FBQztJQUNwQyxDQUFDO0lBRUQ7Ozs7TUFJRTtJQUNGLGNBQWMsQ0FBQyxHQUFHO1FBQ2hCLE1BQU0sR0FBRyxHQUFHLEdBQUcsSUFBSSxDQUFDLFVBQVUsb0JBQW9CLEdBQUcsRUFBRSxDQUFDO1FBQ3hELE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUM7SUFDNUIsQ0FBQztJQUVEOzs7O01BSUU7SUFDRixtQkFBbUIsQ0FBQyxPQUFPO1FBQ3pCLE1BQU0sR0FBRyxHQUFHLEdBQUcsSUFBSSxDQUFDLFVBQVUsdUJBQXVCLENBQUM7UUFDdEQsT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLEVBQUUsT0FBTyxDQUFDLENBQUM7SUFDdEMsQ0FBQztJQUVEOzs7Ozs7TUFNRTtJQUNGLFdBQVcsQ0FBQyxHQUFHLEVBQUUsU0FBUyxFQUFFLEtBQUs7UUFDL0IsTUFBTSxHQUFHLEdBQUcsR0FBRyxJQUFJLENBQUMsVUFBVSxZQUFZLEdBQUcsSUFBSSxTQUFTLEVBQUUsQ0FBQztRQUM3RCxPQUFPLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEdBQUcsRUFBRSxLQUFLLENBQUMsQ0FBQztJQUNuQyxDQUFDO0lBRUQ7Ozs7O01BS0U7SUFDRixhQUFhLENBQUMsR0FBRyxFQUFFLElBQUk7UUFDckIsTUFBTSxHQUFHLEdBQUcsR0FBRyxJQUFJLENBQUMsVUFBVSxtQkFBbUIsR0FBRyxFQUFFLENBQUM7UUFDdkQsT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLEVBQUUsSUFBSSxDQUFDLENBQUM7SUFDbkMsQ0FBQztJQUVEOzs7O01BSUU7SUFDRixtQkFBbUIsQ0FBQyxJQUFTO1FBQzNCLE1BQU0sR0FBRyxHQUFHLEdBQUcsSUFBSSxDQUFDLFVBQVUsdUJBQXVCLENBQUM7UUFDdEQsT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLEVBQUUsSUFBSSxDQUFDLENBQUM7SUFDbkMsQ0FBQztJQUVDOzs7OztJQUtBO0lBQ0YsU0FBUyxDQUFDLE1BQVcsRUFBRSxPQUFZO1FBQ2pDLE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxJQUFJLENBQUMsVUFBVSx1QkFBdUIsTUFBTSxFQUFFLEVBQUUsT0FBTyxDQUFDLENBQUE7SUFDbkYsQ0FBQztJQUdEOzs7TUFHRTtJQUNGLGdDQUFnQyxDQUFDLFdBQVc7UUFDMUMsTUFBTSxNQUFNLEdBQUcsV0FBVyxFQUFFLE1BQU0sQ0FBQztRQUNuQyxNQUFNLFNBQVMsR0FBRyxXQUFXLEVBQUUsU0FBUyxDQUFDO1FBQ3pDLE1BQU0sT0FBTyxHQUFHO1lBQ2QsS0FBSyxFQUFFLCtCQUErQixXQUFXLEVBQUUsV0FBVyxJQUFJLFNBQVMsRUFBRTtZQUM3RSxJQUFJLEVBQUUsNEJBQTRCO1lBQ2xDLElBQUksRUFBRSxhQUFhO1lBQ25CLElBQUksRUFBRTtnQkFDSixnQkFBZ0IsRUFBRSxXQUFXLEVBQUUsV0FBVyxJQUFJLEVBQUU7Z0JBQ2hELFdBQVcsRUFBRSxXQUFXLEVBQUUsU0FBUztnQkFDbkMsZ0JBQWdCLEVBQUUsU0FBUztnQkFDM0IsU0FBUyxFQUFFLFdBQVcsRUFBRSxTQUFTO2dCQUNqQyxZQUFZLEVBQUUsV0FBVyxFQUFFLFVBQVU7YUFDdEM7U0FDRixDQUFBO1FBQ0QsSUFBSSxDQUFDLFNBQVMsQ0FBQyxNQUFNLEVBQUUsT0FBTyxDQUFDLENBQUMsU0FBUyxFQUFFLENBQUM7SUFDOUMsQ0FBQzt1R0FqSFUsY0FBYyw0Q0FLZixhQUFhOzJHQUxaLGNBQWMsY0FGYixNQUFNOzsyRkFFUCxjQUFjO2tCQUgxQixVQUFVO21CQUFDO29CQUNWLFVBQVUsRUFBRSxNQUFNO2lCQUNuQjs7MEJBTUksTUFBTTsyQkFBQyxhQUFhIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gXCJyeGpzXCI7XG5pbXBvcnQgeyBIdHRwQ2xpZW50IH0gZnJvbSBcIkBhbmd1bGFyL2NvbW1vbi9odHRwXCI7XG5pbXBvcnQgeyBJbmplY3QsIEluamVjdGFibGUgfSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xuXG5ASW5qZWN0YWJsZSh7XG4gIHByb3ZpZGVkSW46IFwicm9vdFwiLFxufSlcbmV4cG9ydCBjbGFzcyBNaW5kbWFwU2VydmljZSB7XG4gIHByaXZhdGUgbWluZG1hcFVSTDtcbiBcbiAgY29uc3RydWN0b3IoXG4gICAgcHJpdmF0ZSBodHRwOiBIdHRwQ2xpZW50LFxuICAgIEBJbmplY3QoJ2Vudmlyb25tZW50JykgZW52aXJvbm1lbnRcbiAgKSB7XG4gICAgdGhpcy5taW5kbWFwVVJMID0gZW52aXJvbm1lbnQubWluZG1hcFVSTDtcbiAgfVxuXG4gIC8qKlxuICAqIEdldCBtaW5kbWFwIGtleXNcbiAgKiBAcmV0dXJuIHtPYnNlcnZhYmxlPGFueT59XG4gICovXG4gIGdldE1pbmRtYXBLZXkoKTogT2JzZXJ2YWJsZTxhbnk+IHtcbiAgICBjb25zdCB1cmwgPSBgJHt0aGlzLm1pbmRtYXBVUkx9L21pbmRtYXBgO1xuICAgIHJldHVybiB0aGlzLmh0dHAuZ2V0KHVybCk7XG4gIH1cblxuICAvKipcbiAgKiBQb3N0IG1pbmRtYXBcbiAgKiBAcGFyYW0ge2FueX0gdmFsdWUgLSBQYXlsb2FkIGZvciBwb3N0IG1pbmRtYXBcbiAgKiBAcmV0dXJuIHtPYnNlcnZhYmxlPGFueT59XG4gICovXG4gIHBvc3RNaW5kbWFwKHZhbHVlKTogT2JzZXJ2YWJsZTxhbnk+IHtcbiAgICBjb25zdCB1cmwgPSBgJHt0aGlzLm1pbmRtYXBVUkx9L21pbmRtYXAvdXBsb2FkYDtcbiAgICByZXR1cm4gdGhpcy5odHRwLnBvc3QodXJsLCB2YWx1ZSk7XG4gIH1cblxuICAvKipcbiAgKiBHZXQgbWluZG1hcCBkZXRhaWxzIGZyb20ga2V5XG4gICogQHBhcmFtIHtzdHJpbmd9IGtleSAtIE1pbmRtYXAga2V5XG4gICogQHJldHVybiB7T2JzZXJ2YWJsZTxhbnk+fVxuICAqL1xuICBkZXRhaWxzTWluZG1hcChrZXkpOiBPYnNlcnZhYmxlPGFueT4ge1xuICAgIGNvbnN0IHVybCA9IGAke3RoaXMubWluZG1hcFVSTH0vbWluZG1hcC9kZXRhaWxzLyR7a2V5fWA7XG4gICAgcmV0dXJuIHRoaXMuaHR0cC5nZXQodXJsKTtcbiAgfVxuXG4gIC8qKlxuICAqIEFkZC91cGRhdGUgbWluZG1hcCBsaWNlbnNlIGtleVxuICAqIEBwYXJhbSB7YW55fSBwYXlsb2FkIC0gUGF5bG9hZCBmb3IgbWluZG1hcCBrZXkgdG8gYWRkL3VwZGF0ZVxuICAqIEByZXR1cm4ge09ic2VydmFibGU8YW55Pn1cbiAgKi9cbiAgYWRkVXBkYXRlTGljZW5zZUtleShwYXlsb2FkKTogT2JzZXJ2YWJsZTxhbnk+IHtcbiAgICBjb25zdCB1cmwgPSBgJHt0aGlzLm1pbmRtYXBVUkx9L21pbmRtYXAvYWRkVXBkYXRla2V5YDtcbiAgICByZXR1cm4gdGhpcy5odHRwLnBvc3QodXJsLCBwYXlsb2FkKTtcbiAgfVxuXG4gIC8qKlxuICAqIFVwZGF0ZSBtaW5kbWFwIGtleSBpbWFnZVxuICAqIEBwYXJhbSB7c3RyaW5nfSBrZXkgLSBNaW5kbWFwIGtleVxuICAqIEBwYXJhbSB7c3RyaW5nfSBpbWFnZU5hbWUgLSBJbWFnZSBuYW1lXG4gICogQHBhcmFtIHtzdHJpbmd9IHZhbHVlIC0gSW1hZ2UgYmFzZTY0XG4gICogQHJldHVybiB7T2JzZXJ2YWJsZTxhbnk+fVxuICAqL1xuICB1cGRhdGVJbWFnZShrZXksIGltYWdlTmFtZSwgdmFsdWUpOiBPYnNlcnZhYmxlPGFueT4ge1xuICAgIGNvbnN0IHVybCA9IGAke3RoaXMubWluZG1hcFVSTH0vbWluZG1hcC8ke2tleX0vJHtpbWFnZU5hbWV9YDtcbiAgICByZXR1cm4gdGhpcy5odHRwLnB1dCh1cmwsIHZhbHVlKTtcbiAgfVxuXG4gIC8qKlxuICAqIERlbGV0ZSBtaW5kbWFwXG4gICogQHBhcmFtIHtzdHJpbmd9IGtleSAtIE1pbmRtYXAga2V5XG4gICogQHBhcmFtIHthbnl9IGRhdGEgLSBNaW5kbWFwIGRhdGFcbiAgKiBAcmV0dXJuIHtPYnNlcnZhYmxlPGFueT59XG4gICovXG4gIGRlbGV0ZU1pbmRtYXAoa2V5LCBkYXRhKTogT2JzZXJ2YWJsZTxhbnk+IHtcbiAgICBjb25zdCB1cmwgPSBgJHt0aGlzLm1pbmRtYXBVUkx9L21pbmRtYXAvZGVsZXRlLyR7a2V5fWA7XG4gICAgcmV0dXJuIHRoaXMuaHR0cC5wb3N0KHVybCwgZGF0YSk7XG4gIH1cblxuICAvKipcbiAgKiBUb2dnbGUgbWluZG1hcCBzdGF0dXNcbiAgKiBAcGFyYW0ge2FueX0gZGF0YSAtIE1pbmRtYXAgZGF0YVxuICAqIEByZXR1cm4ge09ic2VydmFibGU8YW55Pn1cbiAgKi9cbiAgdG9nZ2xlTWluZG1hcFN0YXR1cyhkYXRhOiBhbnkpOiBPYnNlcnZhYmxlPGFueT4ge1xuICAgIGNvbnN0IHVybCA9IGAke3RoaXMubWluZG1hcFVSTH0vbWluZG1hcC90b2dnbGVTdGF0dXNgO1xuICAgIHJldHVybiB0aGlzLmh0dHAucG9zdCh1cmwsIGRhdGEpO1xuICB9XG5cbiAgICAvKipcbiAgKiBOb3RpZnkgQXBwIHNpZGVcbiAgKiBAcGFyYW0ge2FueX0gaHdVdWlkIC0gSGVhbHRod29ya2VyIElkXG4gICogQHBhcmFtIHthbnl9IHBheWxvYWQgLSBOb3RpZmFpY2F0aW9uIG1lc3NhZ2VcbiAgKiBAcmV0dXJuIHtPYnNlcnZhYmxlPGFueT59XG4gICovXG4gIG5vdGlmeUFwcChod1V1aWQ6IGFueSwgcGF5bG9hZDogYW55KSA6IE9ic2VydmFibGU8YW55PntcbiAgICByZXR1cm4gdGhpcy5odHRwLnBvc3QoYCR7dGhpcy5taW5kbWFwVVJMfS9taW5kbWFwL25vdGlmeS1hcHAvJHtod1V1aWR9YCwgcGF5bG9hZClcbiAgfVxuXG5cbiAgLyoqXG4gICogU2VuZCBub3RpZmljYXRpb24gdG8gaGVhbHRoIHdvcmtlciBmb3IgYXZhaWxhYmxlIHByZXNjcmlwdGlvblxuICAqIEByZXR1cm5zIHt2b2lkfVxuICAqL1xuICBub3RpZnlId0ZvclJlc2NoZWR1bGVBcHBvaW50bWVudChhcHBvaW50bWVudCk6IHZvaWQge1xuICAgIGNvbnN0IGh3VXVpZCA9IGFwcG9pbnRtZW50Py5od1VVSUQ7XG4gICAgY29uc3Qgb3Blbk1SU0lEID0gYXBwb2ludG1lbnQ/Lm9wZW5NcnNJZDtcbiAgICBjb25zdCBwYXlsb2FkID0ge1xuICAgICAgdGl0bGU6IGBBcHBvaW50bWVudCByZXNjaGVkdWxlZCBmb3IgJHthcHBvaW50bWVudD8ucGF0aWVudE5hbWUgfHwgJ1BhdGllbnQnfWAsXG4gICAgICBib2R5OiBcIkNsaWNrIG5vdGlmaWNhdGlvbiB0byBzZWUhXCIsXG4gICAgICB0eXBlOiBcImFwcG9pbnRtZW50XCIsXG4gICAgICBkYXRhOiB7XG4gICAgICAgIHBhdGllbnRGaXJzdE5hbWU6IGFwcG9pbnRtZW50Py5wYXRpZW50TmFtZSA/PyAnJyxcbiAgICAgICAgcGF0aWVudFV1aWQ6IGFwcG9pbnRtZW50Py5wYXRpZW50SWQsXG4gICAgICAgIHBhdGllbnRPcGVuTXJzSWQ6IG9wZW5NUlNJRCxcbiAgICAgICAgdmlzaXRVdWlkOiBhcHBvaW50bWVudD8udmlzaXRVdWlkLFxuICAgICAgICBzbG90RGF0ZVRpbWU6IGFwcG9pbnRtZW50Py5zbG90SnNEYXRlXG4gICAgICB9XG4gICAgfVxuICAgIHRoaXMubm90aWZ5QXBwKGh3VXVpZCwgcGF5bG9hZCkuc3Vic2NyaWJlKCk7XG4gIH1cbn1cbiJdfQ==