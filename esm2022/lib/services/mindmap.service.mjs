import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import * as i0 from "@angular/core";
import * as i1 from "@angular/common/http";
// import { environment } from "src/environments/environment";
export class MindmapService {
    http;
    // private baseURL = environment.mindmapURL;
    constructor(http) {
        this.http = http;
    }
    /**
    * Get mindmap keys
    * @return {Observable<any>}
    */
    getMindmapKey(baseURL) {
        const url = `${baseURL}/mindmap`;
        return this.http.get(url);
    }
    /**
    * Post mindmap
    * @param {any} value - Payload for post mindmap
    * @return {Observable<any>}
    */
    postMindmap(baseURL, value) {
        const url = `${baseURL}/mindmap/upload`;
        return this.http.post(url, value);
    }
    /**
    * Get mindmap details from key
    * @param {string} key - Mindmap key
    * @return {Observable<any>}
    */
    detailsMindmap(baseURL, key) {
        const url = `${baseURL}/mindmap/details/${key}`;
        return this.http.get(url);
    }
    /**
    * Add/update mindmap license key
    * @param {any} payload - Payload for mindmap key to add/update
    * @return {Observable<any>}
    */
    addUpdateLicenseKey(baseURL, payload) {
        const url = `${baseURL}/mindmap/addUpdatekey`;
        return this.http.post(url, payload);
    }
    /**
    * Update mindmap key image
    * @param {string} key - Mindmap key
    * @param {string} imageName - Image name
    * @param {string} value - Image base64
    * @return {Observable<any>}
    */
    updateImage(baseURL, key, imageName, value) {
        const url = `${baseURL}/mindmap/${key}/${imageName}`;
        return this.http.put(url, value);
    }
    /**
    * Delete mindmap
    * @param {string} key - Mindmap key
    * @param {any} data - Mindmap data
    * @return {Observable<any>}
    */
    deleteMindmap(baseURL, key, data) {
        const url = `${baseURL}/mindmap/delete/${key}`;
        return this.http.post(url, data);
    }
    /**
    * Toggle mindmap status
    * @param {any} data - Mindmap data
    * @return {Observable<any>}
    */
    toggleMindmapStatus(baseURL, data) {
        const url = `${baseURL}/mindmap/toggleStatus`;
        return this.http.post(url, data);
    }
    /**
  * Notify App side
  * @param {any} hwUuid - Healthworker Id
  * @param {any} payload - Notifaication message
  * @return {Observable<any>}
  */
    notifyApp(baseURL, hwUuid, payload) {
        return this.http.post(`${baseURL}/mindmap/notify-app/${hwUuid}`, payload);
    }
    /**
    * Send notification to health worker for available prescription
    * @returns {void}
    */
    notifyHwForRescheduleAppointment(baseURL, appointment) {
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
        this.notifyApp(baseURL, hwUuid, payload).subscribe();
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.3.0", ngImport: i0, type: MindmapService, deps: [{ token: i1.HttpClient }], target: i0.ɵɵFactoryTarget.Injectable });
    static ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "14.3.0", ngImport: i0, type: MindmapService, providedIn: "root" });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.3.0", ngImport: i0, type: MindmapService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: "root",
                }]
        }], ctorParameters: function () { return [{ type: i1.HttpClient }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWluZG1hcC5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvaWgtbGlicmFyeS9zcmMvbGliL3NlcnZpY2VzL21pbmRtYXAuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFDQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sc0JBQXNCLENBQUM7QUFDbEQsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQzs7O0FBQzNDLDhEQUE4RDtBQUs5RCxNQUFNLE9BQU8sY0FBYztJQUdMO0lBRnBCLDRDQUE0QztJQUU1QyxZQUFvQixJQUFnQjtRQUFoQixTQUFJLEdBQUosSUFBSSxDQUFZO0lBQUksQ0FBQztJQUV6Qzs7O01BR0U7SUFDRixhQUFhLENBQUMsT0FBZTtRQUMzQixNQUFNLEdBQUcsR0FBRyxHQUFHLE9BQU8sVUFBVSxDQUFDO1FBQ2pDLE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUM7SUFDNUIsQ0FBQztJQUVEOzs7O01BSUU7SUFDRixXQUFXLENBQUMsT0FBZSxFQUFFLEtBQUs7UUFDaEMsTUFBTSxHQUFHLEdBQUcsR0FBRyxPQUFPLGlCQUFpQixDQUFDO1FBQ3hDLE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxFQUFFLEtBQUssQ0FBQyxDQUFDO0lBQ3BDLENBQUM7SUFFRDs7OztNQUlFO0lBQ0YsY0FBYyxDQUFDLE9BQWUsRUFBRSxHQUFHO1FBQ2pDLE1BQU0sR0FBRyxHQUFHLEdBQUcsT0FBTyxvQkFBb0IsR0FBRyxFQUFFLENBQUM7UUFDaEQsT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUM1QixDQUFDO0lBRUQ7Ozs7TUFJRTtJQUNGLG1CQUFtQixDQUFDLE9BQWUsRUFBRSxPQUFPO1FBQzFDLE1BQU0sR0FBRyxHQUFHLEdBQUcsT0FBTyx1QkFBdUIsQ0FBQztRQUM5QyxPQUFPLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRSxPQUFPLENBQUMsQ0FBQztJQUN0QyxDQUFDO0lBRUQ7Ozs7OztNQU1FO0lBQ0YsV0FBVyxDQUFDLE9BQWUsRUFBRSxHQUFHLEVBQUUsU0FBUyxFQUFFLEtBQUs7UUFDaEQsTUFBTSxHQUFHLEdBQUcsR0FBRyxPQUFPLFlBQVksR0FBRyxJQUFJLFNBQVMsRUFBRSxDQUFDO1FBQ3JELE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsR0FBRyxFQUFFLEtBQUssQ0FBQyxDQUFDO0lBQ25DLENBQUM7SUFFRDs7Ozs7TUFLRTtJQUNGLGFBQWEsQ0FBQyxPQUFlLEVBQUUsR0FBRyxFQUFFLElBQUk7UUFDdEMsTUFBTSxHQUFHLEdBQUcsR0FBRyxPQUFPLG1CQUFtQixHQUFHLEVBQUUsQ0FBQztRQUMvQyxPQUFPLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRSxJQUFJLENBQUMsQ0FBQztJQUNuQyxDQUFDO0lBRUQ7Ozs7TUFJRTtJQUNGLG1CQUFtQixDQUFDLE9BQWUsRUFBRSxJQUFTO1FBQzVDLE1BQU0sR0FBRyxHQUFHLEdBQUcsT0FBTyx1QkFBdUIsQ0FBQztRQUM5QyxPQUFPLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRSxJQUFJLENBQUMsQ0FBQztJQUNuQyxDQUFDO0lBRUM7Ozs7O0lBS0E7SUFDRixTQUFTLENBQUMsT0FBZSxFQUFFLE1BQVcsRUFBRSxPQUFZO1FBQ2xELE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxPQUFPLHVCQUF1QixNQUFNLEVBQUUsRUFBRSxPQUFPLENBQUMsQ0FBQTtJQUMzRSxDQUFDO0lBR0Q7OztNQUdFO0lBQ0YsZ0NBQWdDLENBQUMsT0FBZSxFQUFFLFdBQVc7UUFDM0QsTUFBTSxNQUFNLEdBQUcsV0FBVyxFQUFFLE1BQU0sQ0FBQztRQUNuQyxNQUFNLFNBQVMsR0FBRyxXQUFXLEVBQUUsU0FBUyxDQUFDO1FBQ3pDLE1BQU0sT0FBTyxHQUFHO1lBQ2QsS0FBSyxFQUFFLCtCQUErQixXQUFXLEVBQUUsV0FBVyxJQUFJLFNBQVMsRUFBRTtZQUM3RSxJQUFJLEVBQUUsNEJBQTRCO1lBQ2xDLElBQUksRUFBRSxhQUFhO1lBQ25CLElBQUksRUFBRTtnQkFDSixnQkFBZ0IsRUFBRSxXQUFXLEVBQUUsV0FBVyxJQUFJLEVBQUU7Z0JBQ2hELFdBQVcsRUFBRSxXQUFXLEVBQUUsU0FBUztnQkFDbkMsZ0JBQWdCLEVBQUUsU0FBUztnQkFDM0IsU0FBUyxFQUFFLFdBQVcsRUFBRSxTQUFTO2dCQUNqQyxZQUFZLEVBQUUsV0FBVyxFQUFFLFVBQVU7YUFDdEM7U0FDRixDQUFBO1FBQ0QsSUFBSSxDQUFDLFNBQVMsQ0FBQyxPQUFPLEVBQUUsTUFBTSxFQUFFLE9BQU8sQ0FBQyxDQUFDLFNBQVMsRUFBRSxDQUFDO0lBQ3ZELENBQUM7dUdBNUdVLGNBQWM7MkdBQWQsY0FBYyxjQUZiLE1BQU07OzJGQUVQLGNBQWM7a0JBSDFCLFVBQVU7bUJBQUM7b0JBQ1YsVUFBVSxFQUFFLE1BQU07aUJBQ25CIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gXCJyeGpzXCI7XHJcbmltcG9ydCB7IEh0dHBDbGllbnQgfSBmcm9tIFwiQGFuZ3VsYXIvY29tbW9uL2h0dHBcIjtcclxuaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XHJcbi8vIGltcG9ydCB7IGVudmlyb25tZW50IH0gZnJvbSBcInNyYy9lbnZpcm9ubWVudHMvZW52aXJvbm1lbnRcIjtcclxuXHJcbkBJbmplY3RhYmxlKHtcclxuICBwcm92aWRlZEluOiBcInJvb3RcIixcclxufSlcclxuZXhwb3J0IGNsYXNzIE1pbmRtYXBTZXJ2aWNlIHtcclxuICAvLyBwcml2YXRlIGJhc2VVUkwgPSBlbnZpcm9ubWVudC5taW5kbWFwVVJMO1xyXG5cclxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIGh0dHA6IEh0dHBDbGllbnQpIHsgfVxyXG5cclxuICAvKipcclxuICAqIEdldCBtaW5kbWFwIGtleXNcclxuICAqIEByZXR1cm4ge09ic2VydmFibGU8YW55Pn1cclxuICAqL1xyXG4gIGdldE1pbmRtYXBLZXkoYmFzZVVSTDogc3RyaW5nKTogT2JzZXJ2YWJsZTxhbnk+IHtcclxuICAgIGNvbnN0IHVybCA9IGAke2Jhc2VVUkx9L21pbmRtYXBgO1xyXG4gICAgcmV0dXJuIHRoaXMuaHR0cC5nZXQodXJsKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICogUG9zdCBtaW5kbWFwXHJcbiAgKiBAcGFyYW0ge2FueX0gdmFsdWUgLSBQYXlsb2FkIGZvciBwb3N0IG1pbmRtYXBcclxuICAqIEByZXR1cm4ge09ic2VydmFibGU8YW55Pn1cclxuICAqL1xyXG4gIHBvc3RNaW5kbWFwKGJhc2VVUkw6IHN0cmluZywgdmFsdWUpOiBPYnNlcnZhYmxlPGFueT4ge1xyXG4gICAgY29uc3QgdXJsID0gYCR7YmFzZVVSTH0vbWluZG1hcC91cGxvYWRgO1xyXG4gICAgcmV0dXJuIHRoaXMuaHR0cC5wb3N0KHVybCwgdmFsdWUpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgKiBHZXQgbWluZG1hcCBkZXRhaWxzIGZyb20ga2V5XHJcbiAgKiBAcGFyYW0ge3N0cmluZ30ga2V5IC0gTWluZG1hcCBrZXlcclxuICAqIEByZXR1cm4ge09ic2VydmFibGU8YW55Pn1cclxuICAqL1xyXG4gIGRldGFpbHNNaW5kbWFwKGJhc2VVUkw6IHN0cmluZywga2V5KTogT2JzZXJ2YWJsZTxhbnk+IHtcclxuICAgIGNvbnN0IHVybCA9IGAke2Jhc2VVUkx9L21pbmRtYXAvZGV0YWlscy8ke2tleX1gO1xyXG4gICAgcmV0dXJuIHRoaXMuaHR0cC5nZXQodXJsKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICogQWRkL3VwZGF0ZSBtaW5kbWFwIGxpY2Vuc2Uga2V5XHJcbiAgKiBAcGFyYW0ge2FueX0gcGF5bG9hZCAtIFBheWxvYWQgZm9yIG1pbmRtYXAga2V5IHRvIGFkZC91cGRhdGVcclxuICAqIEByZXR1cm4ge09ic2VydmFibGU8YW55Pn1cclxuICAqL1xyXG4gIGFkZFVwZGF0ZUxpY2Vuc2VLZXkoYmFzZVVSTDogc3RyaW5nLCBwYXlsb2FkKTogT2JzZXJ2YWJsZTxhbnk+IHtcclxuICAgIGNvbnN0IHVybCA9IGAke2Jhc2VVUkx9L21pbmRtYXAvYWRkVXBkYXRla2V5YDtcclxuICAgIHJldHVybiB0aGlzLmh0dHAucG9zdCh1cmwsIHBheWxvYWQpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgKiBVcGRhdGUgbWluZG1hcCBrZXkgaW1hZ2VcclxuICAqIEBwYXJhbSB7c3RyaW5nfSBrZXkgLSBNaW5kbWFwIGtleVxyXG4gICogQHBhcmFtIHtzdHJpbmd9IGltYWdlTmFtZSAtIEltYWdlIG5hbWVcclxuICAqIEBwYXJhbSB7c3RyaW5nfSB2YWx1ZSAtIEltYWdlIGJhc2U2NFxyXG4gICogQHJldHVybiB7T2JzZXJ2YWJsZTxhbnk+fVxyXG4gICovXHJcbiAgdXBkYXRlSW1hZ2UoYmFzZVVSTDogc3RyaW5nLCBrZXksIGltYWdlTmFtZSwgdmFsdWUpOiBPYnNlcnZhYmxlPGFueT4ge1xyXG4gICAgY29uc3QgdXJsID0gYCR7YmFzZVVSTH0vbWluZG1hcC8ke2tleX0vJHtpbWFnZU5hbWV9YDtcclxuICAgIHJldHVybiB0aGlzLmh0dHAucHV0KHVybCwgdmFsdWUpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgKiBEZWxldGUgbWluZG1hcFxyXG4gICogQHBhcmFtIHtzdHJpbmd9IGtleSAtIE1pbmRtYXAga2V5XHJcbiAgKiBAcGFyYW0ge2FueX0gZGF0YSAtIE1pbmRtYXAgZGF0YVxyXG4gICogQHJldHVybiB7T2JzZXJ2YWJsZTxhbnk+fVxyXG4gICovXHJcbiAgZGVsZXRlTWluZG1hcChiYXNlVVJMOiBzdHJpbmcsIGtleSwgZGF0YSk6IE9ic2VydmFibGU8YW55PiB7XHJcbiAgICBjb25zdCB1cmwgPSBgJHtiYXNlVVJMfS9taW5kbWFwL2RlbGV0ZS8ke2tleX1gO1xyXG4gICAgcmV0dXJuIHRoaXMuaHR0cC5wb3N0KHVybCwgZGF0YSk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAqIFRvZ2dsZSBtaW5kbWFwIHN0YXR1c1xyXG4gICogQHBhcmFtIHthbnl9IGRhdGEgLSBNaW5kbWFwIGRhdGFcclxuICAqIEByZXR1cm4ge09ic2VydmFibGU8YW55Pn1cclxuICAqL1xyXG4gIHRvZ2dsZU1pbmRtYXBTdGF0dXMoYmFzZVVSTDogc3RyaW5nLCBkYXRhOiBhbnkpOiBPYnNlcnZhYmxlPGFueT4ge1xyXG4gICAgY29uc3QgdXJsID0gYCR7YmFzZVVSTH0vbWluZG1hcC90b2dnbGVTdGF0dXNgO1xyXG4gICAgcmV0dXJuIHRoaXMuaHR0cC5wb3N0KHVybCwgZGF0YSk7XHJcbiAgfVxyXG5cclxuICAgIC8qKlxyXG4gICogTm90aWZ5IEFwcCBzaWRlXHJcbiAgKiBAcGFyYW0ge2FueX0gaHdVdWlkIC0gSGVhbHRod29ya2VyIElkXHJcbiAgKiBAcGFyYW0ge2FueX0gcGF5bG9hZCAtIE5vdGlmYWljYXRpb24gbWVzc2FnZVxyXG4gICogQHJldHVybiB7T2JzZXJ2YWJsZTxhbnk+fVxyXG4gICovXHJcbiAgbm90aWZ5QXBwKGJhc2VVUkw6IHN0cmluZywgaHdVdWlkOiBhbnksIHBheWxvYWQ6IGFueSkgOiBPYnNlcnZhYmxlPGFueT57XHJcbiAgICByZXR1cm4gdGhpcy5odHRwLnBvc3QoYCR7YmFzZVVSTH0vbWluZG1hcC9ub3RpZnktYXBwLyR7aHdVdWlkfWAsIHBheWxvYWQpXHJcbiAgfVxyXG5cclxuXHJcbiAgLyoqXHJcbiAgKiBTZW5kIG5vdGlmaWNhdGlvbiB0byBoZWFsdGggd29ya2VyIGZvciBhdmFpbGFibGUgcHJlc2NyaXB0aW9uXHJcbiAgKiBAcmV0dXJucyB7dm9pZH1cclxuICAqL1xyXG4gIG5vdGlmeUh3Rm9yUmVzY2hlZHVsZUFwcG9pbnRtZW50KGJhc2VVUkw6IHN0cmluZywgYXBwb2ludG1lbnQpOiB2b2lkIHtcclxuICAgIGNvbnN0IGh3VXVpZCA9IGFwcG9pbnRtZW50Py5od1VVSUQ7XHJcbiAgICBjb25zdCBvcGVuTVJTSUQgPSBhcHBvaW50bWVudD8ub3Blbk1yc0lkO1xyXG4gICAgY29uc3QgcGF5bG9hZCA9IHtcclxuICAgICAgdGl0bGU6IGBBcHBvaW50bWVudCByZXNjaGVkdWxlZCBmb3IgJHthcHBvaW50bWVudD8ucGF0aWVudE5hbWUgfHwgJ1BhdGllbnQnfWAsXHJcbiAgICAgIGJvZHk6IFwiQ2xpY2sgbm90aWZpY2F0aW9uIHRvIHNlZSFcIixcclxuICAgICAgdHlwZTogXCJhcHBvaW50bWVudFwiLFxyXG4gICAgICBkYXRhOiB7XHJcbiAgICAgICAgcGF0aWVudEZpcnN0TmFtZTogYXBwb2ludG1lbnQ/LnBhdGllbnROYW1lID8/ICcnLFxyXG4gICAgICAgIHBhdGllbnRVdWlkOiBhcHBvaW50bWVudD8ucGF0aWVudElkLFxyXG4gICAgICAgIHBhdGllbnRPcGVuTXJzSWQ6IG9wZW5NUlNJRCxcclxuICAgICAgICB2aXNpdFV1aWQ6IGFwcG9pbnRtZW50Py52aXNpdFV1aWQsXHJcbiAgICAgICAgc2xvdERhdGVUaW1lOiBhcHBvaW50bWVudD8uc2xvdEpzRGF0ZVxyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgICB0aGlzLm5vdGlmeUFwcChiYXNlVVJMLCBod1V1aWQsIHBheWxvYWQpLnN1YnNjcmliZSgpO1xyXG4gIH1cclxufVxyXG4iXX0=