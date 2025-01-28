import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Subject } from "rxjs";
import * as i0 from "@angular/core";
import * as i1 from "@angular/common/http";
// import { environment } from "src/environments/environment";
export class VisitService {
    http;
    // private baseURL = environment.baseURL; //'https://dev.intelehealth.org/openmrs/ws/rest/v1'
    // private mindmapURL = environment.mindmapURL;
    // private baseURLAbha = environment.abhaURL; 
    isVisitSummaryShow = false;
    isHelpButtonShow = false;
    triggerAction = new Subject();
    chatVisitId;
    constructor(http) {
        this.http = http;
    }
    /**
    * Get visit
    * @param {string} uuid - Visit uuid
    * @return {Observable<any>}
    */
    getVisit(baseURL, uuid) {
        // tslint:disable-next-line:max-line-length
        const url = `${baseURL}/visit/${uuid}?includeInactive=false&v=custom:(uuid,patient:(uuid,identifiers:(identifier,identifierType:(name,uuid,display)),person:(display,gender,age,birthdate)),location:(display),encounters:(display,encounterDatetime,voided,encounterType:(display),encounterProviders),attributes)`;
        return this.http.get(url);
    }
    /**
    * Get visits for a patient
    * @param {string} id - Patient uuid
    * @return {Observable<any>}
    */
    recentVisits(baseURL, id) {
        const url = `${baseURL}/visit?patient=${id}&v=full`;
        return this.http.get(url);
    }
    /**
    * Get visit
    * @param {string} uuid - Visit uuid
    * @param {string} v - response version format
    * @return {Observable<any>}
    */
    fetchVisitDetails(baseURL, uuid, v = "custom:(location:(display),uuid,display,startDatetime,dateCreated,stopDatetime,encounters:(display,uuid,encounterDatetime,encounterType:(display),obs:(display,uuid,value,concept:(uuid,display)),encounterProviders:(display,provider:(uuid,attributes,person:(uuid,display,gender,age)))),patient:(uuid,identifiers:(identifier,identifierType:(name,uuid,display)),attributes,person:(display,gender,age)),attributes)") {
        // tslint:disable-next-line:max-line-length
        const url = `${baseURL}/visit/${uuid}?v=${v}`;
        return this.http.get(url);
    }
    /**
    * Get visit
    * @param {string} uuid - Visit uuid
    * @param {string} v - response version format
    * @return {Observable<any>}
    */
    fetchVisitDetails2(externalPrescriptionCred, baseURL, uuid, v = "custom:(location:(display),uuid,display,startDatetime,dateCreated,stopDatetime,encounters:(display,uuid,encounterDatetime,encounterType:(display),obs:(display,uuid,value,concept:(uuid,display)),encounterProviders:(display,provider:(uuid,attributes,person:(uuid,display,gender,age)))),patient:(uuid,identifiers:(identifier,identifierType:(name,uuid,display)),attributes,person:(display,gender,age)),attributes)") {
        // tslint:disable-next-line:max-line-length
        let headers = new HttpHeaders();
        headers = headers.append('Authorization', 'Basic ' + externalPrescriptionCred);
        const url = `${baseURL}/visit/${uuid}?v=${v}`;
        return this.http.get(url, { headers });
    }
    /**
    * Get visit
    * @param {string} uuid - Visit uuid
    * @param {string} v - response format
    * @return {Observable<any>}
    */
    fetchVisitPatient(externalPrescriptionCred, baseURL, uuid, v = "custom:(uuid,patient:(attributes,identifiers:(identifier,identifierType:(name,uuid,display))))") {
        let headers = new HttpHeaders();
        headers = headers.append('Authorization', 'Basic ' + externalPrescriptionCred);
        const url = `${baseURL}/visit/${uuid}?v=${v}`;
        return this.http.get(url, { headers });
    }
    /**
    * Get visit
    * @param {string} uuid - Visit uuid
    * @param {string} v - response version format
    * @return {Observable<any>}
    */
    getVisitDetails(baseURL, uuid, v = "custom:(location:(display),uuid,display,startDatetime,stopDatetime,encounters:(display,uuid,encounterDatetime,encounterType:(display),obs:(display,uuid,value),encounterProviders:(display,provider:(uuid,person:(uuid,display,gender,age),attributes))),patient:(uuid,identifiers:(identifier,identifierType:(name,uuid,display)),person:(display,gender,age)))") {
        // tslint:disable-next-line:max-line-length
        const url = `${baseURL}/visit/${uuid}?v=${v}`;
        return this.http.get(url);
    }
    /**
    * Get visit attributes
    * @param {string} visitId - Visit uuid
    * @return {Observable<any>}
    */
    getAttribute(baseURL, visitId) {
        const url = `${baseURL}/visit/${visitId}/attribute`;
        return this.http.get(url);
    }
    /**
    * Post visit attribute
    * @param {string} visitId - Visit uuid
    * @param {any} json - Attribute payload
    * @return {Observable<any>}
    */
    postAttribute(baseURL, visitId, json) {
        const url = `${baseURL}/visit/${visitId}/attribute`;
        return this.http.post(url, json);
    }
    /**
    * Update visit attribute
    * @param {string} visitId - Visit uuid
    * @param {string} attributeUuid - Visit attribute uuid
    * @param {any} json - Attribute payload
    * @return {Observable<any>}
    */
    updateAttribute(baseURL, visitId, attributeUuid, json) {
        const url = `${baseURL}/visit/${visitId}/attribute/${attributeUuid}`;
        return this.http.post(url, json);
    }
    /**
    * Delete visit attribute
    * @param {string} visitId - Visit uuid
    * @param {string} uuid - Visit attribute uuid
    * @return {Observable<any>}
    */
    deleteAttribute(baseURL, visitId, uuid) {
        const url = `${baseURL}/visit/${visitId}/attribute/${uuid}`;
        return this.http.delete(url);
    }
    /**
    * Get patient details
    * @param {string} id - Patient uuid
    * @param {string} v - response format
    * @return {Observable<any>}
    */
    patientInfo(baseURL, id, v = 'custom:(uuid,attributes,identifiers,person:(uuid,display,gender,preferredName:(givenName,familyName,middleName),birthdate,age,preferredAddress:(cityVillage,address1,address2,country,stateProvince,countyDistrict,postalCode),attributes:(value,attributeType:(display))))') {
        // tslint:disable-next-line: max-line-length
        const url = `${baseURL}/patient/${id}?v=${v}`;
        return this.http.get(url);
    }
    /**
    * Get whatsapp link
    * @param {string} whatsapp - Whatspp number
    * @param {string} msg - Message to be sent
    * @return {Observable<any>}
    */
    getWhatsappLink(whatsapp, msg = `Hello I'm calling for consultation`) {
        let text = encodeURI(msg);
        let whatsappLink = `https://wa.me/${whatsapp}?text=${text}`;
        return whatsappLink;
    }
    /**
    * Parse observation data
    * @param {any} data - Observation data
    * @return {any} - Observation data with parsed value
    */
    getData(data) {
        if (data?.value.toString().startsWith("{")) {
            let value = JSON.parse(data.value.toString());
            data.value = value["en"];
        }
        return data;
    }
    /**
    * Parse custom observation data
    * @param {any} data - Custom observation data
    * @return {any} - Observation data with parsed value
    */
    getData2(data) {
        if (data?.value_text.toString().startsWith("{")) {
            let value = JSON.parse(data.value_text.toString());
            data.value_text = value["en"];
        }
        return data;
    }
    /**
    * Get awaiting visits
    * @param {string} speciality - Visit speciality
    * @param {number} page - Page number
    * @return {Observable<any>}
    */
    getAwaitingVisits(mindmapURL, speciality, page = 1) {
        return this.http.get(`${mindmapURL}/openmrs/getAwaitingVisits?speciality=${speciality}&page=${page}`);
    }
    /**
    * Get priority visits
    * @param {string} speciality - Visit speciality
    * @param {number} page - Page number
    * @return {Observable<any>}
    */
    getPriorityVisits(mindmapURL, speciality, page = 1) {
        return this.http.get(`${mindmapURL}/openmrs/getPriorityVisits?speciality=${speciality}&page=${page}`);
    }
    /**
    * Get inprogress visits
    * @param {string} speciality - Visit speciality
    * @param {number} page - Page number
    * @return {Observable<any>}
    */
    getInProgressVisits(mindmapURL, speciality, page = 1) {
        return this.http.get(`${mindmapURL}/openmrs/getInProgressVisits?speciality=${speciality}&page=${page}`);
    }
    /**
    * Get completed visits
    * @param {string} speciality - Visit speciality
    * @param {number} page - Page number
    * @return {Observable<any>}
    */
    getCompletedVisits(mindmapURL, speciality, page = 1, countOnly = false) {
        return this.http.get(`${mindmapURL}/openmrs/getCompletedVisits?speciality=${speciality}&page=${page}&countOnly=${countOnly}`);
    }
    /**
     * Get follow up visits
     * @param {string} speciality - Visit speciality
     * @param {number} page - Page number
     * @return {Observable<any>}
     */
    getFollowUpVisits(mindmapURL, speciality, page = 1, countOnly = false) {
        return this.http.get(`${mindmapURL}/openmrs/getFollowUpVisits?speciality=${speciality}&page=${page}&countOnly=${countOnly}`);
    }
    /**
    * Get ended visits
    * @param {string} speciality - Visit speciality
    * @param {number} page - Page number
    * @return {Observable<any>}
    */
    getEndedVisits(mindmapURL, speciality, page = 1) {
        return this.http.get(`${mindmapURL}/openmrs/getEndedVisits?speciality=${speciality}&page=${page}`);
    }
    /**
     * Post visit data to abdm
     * @param {any} json - Attribute payload
     * @return {Observable<any>}
     */
    postVisitToABDM(baseURLAbha, json) {
        const url = `${baseURLAbha}/abha/post-care-context`;
        return this.http.post(url, json);
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.3.0", ngImport: i0, type: VisitService, deps: [{ token: i1.HttpClient }], target: i0.ɵɵFactoryTarget.Injectable });
    static ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "14.3.0", ngImport: i0, type: VisitService, providedIn: "root" });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.3.0", ngImport: i0, type: VisitService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: "root",
                }]
        }], ctorParameters: function () { return [{ type: i1.HttpClient }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmlzaXQuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL2loLWxpYnJhcnkvc3JjL2xpYi9zZXJ2aWNlcy92aXNpdC5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDM0MsT0FBTyxFQUFFLFVBQVUsRUFBRSxXQUFXLEVBQUUsTUFBTSxzQkFBc0IsQ0FBQztBQUMvRCxPQUFPLEVBQWMsT0FBTyxFQUFFLE1BQU0sTUFBTSxDQUFDOzs7QUFDM0MsOERBQThEO0FBSzlELE1BQU0sT0FBTyxZQUFZO0lBVUg7SUFScEIsNkZBQTZGO0lBQzdGLCtDQUErQztJQUMvQyw4Q0FBOEM7SUFDdkMsa0JBQWtCLEdBQVksS0FBSyxDQUFDO0lBQ3BDLGdCQUFnQixHQUFZLEtBQUssQ0FBQztJQUNsQyxhQUFhLEdBQWlCLElBQUksT0FBTyxFQUFFLENBQUM7SUFDNUMsV0FBVyxDQUFTO0lBRTNCLFlBQW9CLElBQWdCO1FBQWhCLFNBQUksR0FBSixJQUFJLENBQVk7SUFBSSxDQUFDO0lBRXpDOzs7O01BSUU7SUFDRixRQUFRLENBQUMsT0FBZSxFQUFFLElBQUk7UUFDNUIsMkNBQTJDO1FBQzNDLE1BQU0sR0FBRyxHQUFHLEdBQUcsT0FBTyxVQUFVLElBQUksZ1JBQWdSLENBQUM7UUFDclQsT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUM1QixDQUFDO0lBRUQ7Ozs7TUFJRTtJQUNGLFlBQVksQ0FBQyxPQUFlLEVBQUUsRUFBRTtRQUM5QixNQUFNLEdBQUcsR0FBRyxHQUFHLE9BQU8sa0JBQWtCLEVBQUUsU0FBUyxDQUFDO1FBQ3BELE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUM7SUFDNUIsQ0FBQztJQUVEOzs7OztNQUtFO0lBQ0YsaUJB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QUM7SUFFQTs7Ozs7TUFLRTtJQUNGLGNBQWMsQ0FBQyxVQUFrQixFQUFFLFVBQWtCLEVBQUUsT0FBZSxDQUFDO1FBQ3JFLE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsR0FBRyxVQUFVLHNDQUFzQyxVQUFVLFNBQVMsSUFBSSxFQUFFLENBQUMsQ0FBQztJQUNyRyxDQUFDO0lBRUQ7Ozs7T0FJRztJQUNILGVBQWUsQ0FBQyxXQUFtQixFQUFFLElBQVM7UUFDNUMsTUFBTSxHQUFHLEdBQUcsR0FBRyxXQUFXLHlCQUF5QixDQUFBO1FBQ25ELE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxFQUFFLElBQUksQ0FBQyxDQUFDO0lBQ25DLENBQUM7dUdBblFVLFlBQVk7MkdBQVosWUFBWSxjQUZYLE1BQU07OzJGQUVQLFlBQVk7a0JBSHhCLFVBQVU7bUJBQUM7b0JBQ1YsVUFBVSxFQUFFLE1BQU07aUJBQ25CIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XHJcbmltcG9ydCB7IEh0dHBDbGllbnQsIEh0dHBIZWFkZXJzIH0gZnJvbSBcIkBhbmd1bGFyL2NvbW1vbi9odHRwXCI7XHJcbmltcG9ydCB7IE9ic2VydmFibGUsIFN1YmplY3QgfSBmcm9tIFwicnhqc1wiO1xyXG4vLyBpbXBvcnQgeyBlbnZpcm9ubWVudCB9IGZyb20gXCJzcmMvZW52aXJvbm1lbnRzL2Vudmlyb25tZW50XCI7XHJcblxyXG5ASW5qZWN0YWJsZSh7XHJcbiAgcHJvdmlkZWRJbjogXCJyb290XCIsXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBWaXNpdFNlcnZpY2Uge1xyXG5cclxuICAvLyBwcml2YXRlIGJhc2VVUkwgPSBlbnZpcm9ubWVudC5iYXNlVVJMOyAvLydodHRwczovL2Rldi5pbnRlbGVoZWFsdGgub3JnL29wZW5tcnMvd3MvcmVzdC92MSdcclxuICAvLyBwcml2YXRlIG1pbmRtYXBVUkwgPSBlbnZpcm9ubWVudC5taW5kbWFwVVJMO1xyXG4gIC8vIHByaXZhdGUgYmFzZVVSTEFiaGEgPSBlbnZpcm9ubWVudC5hYmhhVVJMOyBcclxuICBwdWJsaWMgaXNWaXNpdFN1bW1hcnlTaG93OiBib29sZWFuID0gZmFsc2U7XHJcbiAgcHVibGljIGlzSGVscEJ1dHRvblNob3c6IGJvb2xlYW4gPSBmYWxzZTtcclxuICBwdWJsaWMgdHJpZ2dlckFjdGlvbjogU3ViamVjdDxhbnk+ID0gbmV3IFN1YmplY3QoKTtcclxuICBwdWJsaWMgY2hhdFZpc2l0SWQ6IHN0cmluZztcclxuXHJcbiAgY29uc3RydWN0b3IocHJpdmF0ZSBodHRwOiBIdHRwQ2xpZW50KSB7IH1cclxuXHJcbiAgLyoqXHJcbiAgKiBHZXQgdmlzaXRcclxuICAqIEBwYXJhbSB7c3RyaW5nfSB1dWlkIC0gVmlzaXQgdXVpZFxyXG4gICogQHJldHVybiB7T2JzZXJ2YWJsZTxhbnk+fVxyXG4gICovXHJcbiAgZ2V0VmlzaXQoYmFzZVVSTDogc3RyaW5nLCB1dWlkKTogT2JzZXJ2YWJsZTxhbnk+IHtcclxuICAgIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTptYXgtbGluZS1sZW5ndGhcclxuICAgIGNvbnN0IHVybCA9IGAke2Jhc2VVUkx9L3Zpc2l0LyR7dXVpZH0/aW5jbHVkZUluYWN0aXZlPWZhbHNlJnY9Y3VzdG9tOih1dWlkLHBhdGllbnQ6KHV1aWQsaWRlbnRpZmllcnM6KGlkZW50aWZpZXIsaWRlbnRpZmllclR5cGU6KG5hbWUsdXVpZCxkaXNwbGF5KSkscGVyc29uOihkaXNwbGF5LGdlbmRlcixhZ2UsYmlydGhkYXRlKSksbG9jYXRpb246KGRpc3BsYXkpLGVuY291bnRlcnM6KGRpc3BsYXksZW5jb3VudGVyRGF0ZXRpbWUsdm9pZGVkLGVuY291bnRlclR5cGU6KGRpc3BsYXkpLGVuY291bnRlclByb3ZpZGVycyksYXR0cmlidXRlcylgO1xyXG4gICAgcmV0dXJuIHRoaXMuaHR0cC5nZXQodXJsKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICogR2V0IHZpc2l0cyBmb3IgYSBwYXRpZW50XHJcbiAgKiBAcGFyYW0ge3N0cmluZ30gaWQgLSBQYXRpZW50IHV1aWRcclxuICAqIEByZXR1cm4ge09ic2VydmFibGU8YW55Pn1cclxuICAqL1xyXG4gIHJlY2VudFZpc2l0cyhiYXNlVVJMOiBzdHJpbmcsIGlkKTogT2JzZXJ2YWJsZTxhbnk+IHtcclxuICAgIGNvbnN0IHVybCA9IGAke2Jhc2VVUkx9L3Zpc2l0P3BhdGllbnQ9JHtpZH0mdj1mdWxsYDtcclxuICAgIHJldHVybiB0aGlzLmh0dHAuZ2V0KHVybCk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAqIEdldCB2aXNpdFxyXG4gICogQHBhcmFtIHtzdHJpbmd9IHV1aWQgLSBWaXNpdCB1dWlkXHJcbiAgKiBAcGFyYW0ge3N0cmluZ30gdiAtIHJlc3BvbnNlIHZlcnNpb24gZm9ybWF0XHJcbiAgKiBAcmV0dXJuIHtPYnNlcnZhYmxlPGFueT59XHJcbiAgKi9cclxuICBmZXRjaFZpc2l0RGV0YWlscyhcclxuICAgIGJhc2VVUkw6IHN0cmluZywgXHJcbiAgICB1dWlkLFxyXG4gICAgdiA9IFwiY3VzdG9tOihsb2NhdGlvbjooZGlzcGxheSksdXVpZCxkaXNwbGF5LHN0YXJ0RGF0ZXRpbWUsZGF0ZUNyZWF0ZWQsc3RvcERhdGV0aW1lLGVuY291bnRlcnM6KGRpc3BsYXksdXVpZCxlbmNvdW50ZXJEYXRldGltZSxlbmNvdW50ZXJUeXBlOihkaXNwbGF5KSxvYnM6KGRpc3BsYXksdXVpZCx2YWx1ZSxjb25jZXB0Oih1dWlkLGRpc3BsYXkpKSxlbmNvdW50ZXJQcm92aWRlcnM6KGRpc3BsYXkscHJvdmlkZXI6KHV1aWQsYXR0cmlidXRlcyxwZXJzb246KHV1aWQsZGlzcGxheSxnZW5kZXIsYWdlKSkpKSxwYXRpZW50Oih1dWlkLGlkZW50aWZpZXJzOihpZGVudGlmaWVyLGlkZW50aWZpZXJUeXBlOihuYW1lLHV1aWQsZGlzcGxheSkpLGF0dHJpYnV0ZXMscGVyc29uOihkaXNwbGF5LGdlbmRlcixhZ2UpKSxhdHRyaWJ1dGVzKVwiXHJcbiAgKTogT2JzZXJ2YWJsZTxhbnk+IHtcclxuICAgIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTptYXgtbGluZS1sZW5ndGhcclxuICAgIGNvbnN0IHVybCA9IGAke2Jhc2VVUkx9L3Zpc2l0LyR7dXVpZH0/dj0ke3Z9YDtcclxuICAgIHJldHVybiB0aGlzLmh0dHAuZ2V0KHVybCk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAqIEdldCB2aXNpdFxyXG4gICogQHBhcmFtIHtzdHJpbmd9IHV1aWQgLSBWaXNpdCB1dWlkXHJcbiAgKiBAcGFyYW0ge3N0cmluZ30gdiAtIHJlc3BvbnNlIHZlcnNpb24gZm9ybWF0XHJcbiAgKiBAcmV0dXJuIHtPYnNlcnZhYmxlPGFueT59XHJcbiAgKi9cclxuICBmZXRjaFZpc2l0RGV0YWlsczIoXHJcbiAgICBleHRlcm5hbFByZXNjcmlwdGlvbkNyZWQ6IHN0cmluZyxcclxuICAgIGJhc2VVUkw6IHN0cmluZywgXHJcbiAgICB1dWlkOiBzdHJpbmcsXHJcbiAgICB2OiBzdHJpbmcgPSBcImN1c3RvbToobG9jYXRpb246KGRpc3BsYXkpLHV1aWQsZGlzcGxheSxzdGFydERhdGV0aW1lLGRhdGVDcmVhdGVkLHN0b3BEYXRldGltZSxlbmNvdW50ZXJzOihkaXNwbGF5LHV1aWQsZW5jb3VudGVyRGF0ZXRpbWUsZW5jb3VudGVyVHlwZTooZGlzcGxheSksb2JzOihkaXNwbGF5LHV1aWQsdmFsdWUsY29uY2VwdDoodXVpZCxkaXNwbGF5KSksZW5jb3VudGVyUHJvdmlkZXJzOihkaXNwbGF5LHByb3ZpZGVyOih1dWlkLGF0dHJpYnV0ZXMscGVyc29uOih1dWlkLGRpc3BsYXksZ2VuZGVyLGFnZSkpKSkscGF0aWVudDoodXVpZCxpZGVudGlmaWVyczooaWRlbnRpZmllcixpZGVudGlmaWVyVHlwZToobmFtZSx1dWlkLGRpc3BsYXkpKSxhdHRyaWJ1dGVzLHBlcnNvbjooZGlzcGxheSxnZW5kZXIsYWdlKSksYXR0cmlidXRlcylcIlxyXG4gICk6IE9ic2VydmFibGU8YW55PiB7XHJcbiAgICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6bWF4LWxpbmUtbGVuZ3RoXHJcbiAgICBsZXQgaGVhZGVyczogSHR0cEhlYWRlcnMgPSBuZXcgSHR0cEhlYWRlcnMoKTtcclxuICAgIGhlYWRlcnMgPSBoZWFkZXJzLmFwcGVuZCgnQXV0aG9yaXphdGlvbicsICdCYXNpYyAnICsgZXh0ZXJuYWxQcmVzY3JpcHRpb25DcmVkKTtcclxuICAgIGNvbnN0IHVybCA9IGAke2Jhc2VVUkx9L3Zpc2l0LyR7dXVpZH0/dj0ke3Z9YDtcclxuICAgIHJldHVybiB0aGlzLmh0dHAuZ2V0KHVybCwgeyBoZWFkZXJzIH0pO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgKiBHZXQgdmlzaXRcclxuICAqIEBwYXJhbSB7c3RyaW5nfSB1dWlkIC0gVmlzaXQgdXVpZFxyXG4gICogQHBhcmFtIHtzdHJpbmd9IHYgLSByZXNwb25zZSBmb3JtYXRcclxuICAqIEByZXR1cm4ge09ic2VydmFibGU8YW55Pn1cclxuICAqL1xyXG4gIGZldGNoVmlzaXRQYXRpZW50KGV4dGVybmFsUHJlc2NyaXB0aW9uQ3JlZDogc3RyaW5nLCBiYXNlVVJMOiBzdHJpbmcsIHV1aWQ6IHN0cmluZywgdjogc3RyaW5nID0gXCJjdXN0b206KHV1aWQscGF0aWVudDooYXR0cmlidXRlcyxpZGVudGlmaWVyczooaWRlbnRpZmllcixpZGVudGlmaWVyVHlwZToobmFtZSx1dWlkLGRpc3BsYXkpKSkpXCIpOiBPYnNlcnZhYmxlPGFueT4ge1xyXG4gICAgbGV0IGhlYWRlcnM6IEh0dHBIZWFkZXJzID0gbmV3IEh0dHBIZWFkZXJzKCk7XHJcbiAgICBoZWFkZXJzID0gaGVhZGVycy5hcHBlbmQoJ0F1dGhvcml6YXRpb24nLCAnQmFzaWMgJyArIGV4dGVybmFsUHJlc2NyaXB0aW9uQ3JlZCk7XHJcbiAgICBjb25zdCB1cmwgPSBgJHtiYXNlVVJMfS92aXNpdC8ke3V1aWR9P3Y9JHt2fWA7XHJcbiAgICByZXR1cm4gdGhpcy5odHRwLmdldCh1cmwsIHsgaGVhZGVycyB9KTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICogR2V0IHZpc2l0XHJcbiAgKiBAcGFyYW0ge3N0cmluZ30gdXVpZCAtIFZpc2l0IHV1aWRcclxuICAqIEBwYXJhbSB7c3RyaW5nfSB2IC0gcmVzcG9uc2UgdmVyc2lvbiBmb3JtYXRcclxuICAqIEByZXR1cm4ge09ic2VydmFibGU8YW55Pn1cclxuICAqL1xyXG4gIGdldFZpc2l0RGV0YWlscyhcclxuICAgIGJhc2VVUkw6IHN0cmluZywgXHJcbiAgICB1dWlkOiBzdHJpbmcsXHJcbiAgICB2OiBzdHJpbmcgPSBcImN1c3RvbToobG9jYXRpb246KGRpc3BsYXkpLHV1aWQsZGlzcGxheSxzdGFydERhdGV0aW1lLHN0b3BEYXRldGltZSxlbmNvdW50ZXJzOihkaXNwbGF5LHV1aWQsZW5jb3VudGVyRGF0ZXRpbWUsZW5jb3VudGVyVHlwZTooZGlzcGxheSksb2JzOihkaXNwbGF5LHV1aWQsdmFsdWUpLGVuY291bnRlclByb3ZpZGVyczooZGlzcGxheSxwcm92aWRlcjoodXVpZCxwZXJzb246KHV1aWQsZGlzcGxheSxnZW5kZXIsYWdlKSxhdHRyaWJ1dGVzKSkpLHBhdGllbnQ6KHV1aWQsaWRlbnRpZmllcnM6KGlkZW50aWZpZXIsaWRlbnRpZmllclR5cGU6KG5hbWUsdXVpZCxkaXNwbGF5KSkscGVyc29uOihkaXNwbGF5LGdlbmRlcixhZ2UpKSlcIlxyXG4gICk6IE9ic2VydmFibGU8YW55PiB7XHJcbiAgICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6bWF4LWxpbmUtbGVuZ3RoXHJcbiAgICBjb25zdCB1cmwgPSBgJHtiYXNlVVJMfS92aXNpdC8ke3V1aWR9P3Y9JHt2fWA7XHJcbiAgICByZXR1cm4gdGhpcy5odHRwLmdldCh1cmwpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgKiBHZXQgdmlzaXQgYXR0cmlidXRlc1xyXG4gICogQHBhcmFtIHtzdHJpbmd9IHZpc2l0SWQgLSBWaXNpdCB1dWlkXHJcbiAgKiBAcmV0dXJuIHtPYnNlcnZhYmxlPGFueT59XHJcbiAgKi9cclxuICBnZXRBdHRyaWJ1dGUoYmFzZVVSTDogc3RyaW5nLCB2aXNpdElkKTogT2JzZXJ2YWJsZTxhbnk+IHtcclxuICAgIGNvbnN0IHVybCA9IGAke2Jhc2VVUkx9L3Zpc2l0LyR7dmlzaXRJZH0vYXR0cmlidXRlYDtcclxuICAgIHJldHVybiB0aGlzLmh0dHAuZ2V0KHVybCk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAqIFBvc3QgdmlzaXQgYXR0cmlidXRlXHJcbiAgKiBAcGFyYW0ge3N0cmluZ30gdmlzaXRJZCAtIFZpc2l0IHV1aWRcclxuICAqIEBwYXJhbSB7YW55fSBqc29uIC0gQXR0cmlidXRlIHBheWxvYWRcclxuICAqIEByZXR1cm4ge09ic2VydmFibGU8YW55Pn1cclxuICAqL1xyXG4gIHBvc3RBdHRyaWJ1dGUoYmFzZVVSTDogc3RyaW5nLCB2aXNpdElkLCBqc29uKTogT2JzZXJ2YWJsZTxhbnk+IHtcclxuICAgIGNvbnN0IHVybCA9IGAke2Jhc2VVUkx9L3Zpc2l0LyR7dmlzaXRJZH0vYXR0cmlidXRlYDtcclxuICAgIHJldHVybiB0aGlzLmh0dHAucG9zdCh1cmwsIGpzb24pO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgKiBVcGRhdGUgdmlzaXQgYXR0cmlidXRlXHJcbiAgKiBAcGFyYW0ge3N0cmluZ30gdmlzaXRJZCAtIFZpc2l0IHV1aWRcclxuICAqIEBwYXJhbSB7c3RyaW5nfSBhdHRyaWJ1dGVVdWlkIC0gVmlzaXQgYXR0cmlidXRlIHV1aWRcclxuICAqIEBwYXJhbSB7YW55fSBqc29uIC0gQXR0cmlidXRlIHBheWxvYWRcclxuICAqIEByZXR1cm4ge09ic2VydmFibGU8YW55Pn1cclxuICAqL1xyXG4gIHVwZGF0ZUF0dHJpYnV0ZShiYXNlVVJMOiBzdHJpbmcsIHZpc2l0SWQsIGF0dHJpYnV0ZVV1aWQsIGpzb24pOiBPYnNlcnZhYmxlPGFueT4ge1xyXG4gICAgY29uc3QgdXJsID0gYCR7YmFzZVVSTH0vdmlzaXQvJHt2aXNpdElkfS9hdHRyaWJ1dGUvJHthdHRyaWJ1dGVVdWlkfWA7XHJcbiAgICByZXR1cm4gdGhpcy5odHRwLnBvc3QodXJsLCBqc29uKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICogRGVsZXRlIHZpc2l0IGF0dHJpYnV0ZVxyXG4gICogQHBhcmFtIHtzdHJpbmd9IHZpc2l0SWQgLSBWaXNpdCB1dWlkXHJcbiAgKiBAcGFyYW0ge3N0cmluZ30gdXVpZCAtIFZpc2l0IGF0dHJpYnV0ZSB1dWlkXHJcbiAgKiBAcmV0dXJuIHtPYnNlcnZhYmxlPGFueT59XHJcbiAgKi9cclxuICBkZWxldGVBdHRyaWJ1dGUoYmFzZVVSTDogc3RyaW5nLCB2aXNpdElkLCB1dWlkKTogT2JzZXJ2YWJsZTxhbnk+IHtcclxuICAgIGNvbnN0IHVybCA9IGAke2Jhc2VVUkx9L3Zpc2l0LyR7dmlzaXRJZH0vYXR0cmlidXRlLyR7dXVpZH1gO1xyXG4gICAgcmV0dXJuIHRoaXMuaHR0cC5kZWxldGUodXJsKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICogR2V0IHBhdGllbnQgZGV0YWlsc1xyXG4gICogQHBhcmFtIHtzdHJpbmd9IGlkIC0gUGF0aWVudCB1dWlkXHJcbiAgKiBAcGFyYW0ge3N0cmluZ30gdiAtIHJlc3BvbnNlIGZvcm1hdFxyXG4gICogQHJldHVybiB7T2JzZXJ2YWJsZTxhbnk+fVxyXG4gICovXHJcbiAgcGF0aWVudEluZm8oYmFzZVVSTDogc3RyaW5nLCBpZCwgdiA9ICdjdXN0b206KHV1aWQsYXR0cmlidXRlcyxpZGVudGlmaWVycyxwZXJzb246KHV1aWQsZGlzcGxheSxnZW5kZXIscHJlZmVycmVkTmFtZTooZ2l2ZW5OYW1lLGZhbWlseU5hbWUsbWlkZGxlTmFtZSksYmlydGhkYXRlLGFnZSxwcmVmZXJyZWRBZGRyZXNzOihjaXR5VmlsbGFnZSxhZGRyZXNzMSxhZGRyZXNzMixjb3VudHJ5LHN0YXRlUHJvdmluY2UsY291bnR5RGlzdHJpY3QscG9zdGFsQ29kZSksYXR0cmlidXRlczoodmFsdWUsYXR0cmlidXRlVHlwZTooZGlzcGxheSkpKSknKTogT2JzZXJ2YWJsZTxhbnk+IHtcclxuICAgIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTogbWF4LWxpbmUtbGVuZ3RoXHJcbiAgICBjb25zdCB1cmwgPSBgJHtiYXNlVVJMfS9wYXRpZW50LyR7aWR9P3Y9JHt2fWA7XHJcbiAgICByZXR1cm4gdGhpcy5odHRwLmdldCh1cmwpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgKiBHZXQgd2hhdHNhcHAgbGlua1xyXG4gICogQHBhcmFtIHtzdHJpbmd9IHdoYXRzYXBwIC0gV2hhdHNwcCBudW1iZXJcclxuICAqIEBwYXJhbSB7c3RyaW5nfSBtc2cgLSBNZXNzYWdlIHRvIGJlIHNlbnRcclxuICAqIEByZXR1cm4ge09ic2VydmFibGU8YW55Pn1cclxuICAqL1xyXG4gIGdldFdoYXRzYXBwTGluayh3aGF0c2FwcDogc3RyaW5nLCBtc2c6IHN0cmluZyA9IGBIZWxsbyBJJ20gY2FsbGluZyBmb3IgY29uc3VsdGF0aW9uYCkge1xyXG4gICAgbGV0IHRleHQgPSBlbmNvZGVVUkkobXNnKTtcclxuICAgIGxldCB3aGF0c2FwcExpbmsgPSBgaHR0cHM6Ly93YS5tZS8ke3doYXRzYXBwfT90ZXh0PSR7dGV4dH1gO1xyXG4gICAgcmV0dXJuIHdoYXRzYXBwTGluaztcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICogUGFyc2Ugb2JzZXJ2YXRpb24gZGF0YVxyXG4gICogQHBhcmFtIHthbnl9IGRhdGEgLSBPYnNlcnZhdGlvbiBkYXRhXHJcbiAgKiBAcmV0dXJuIHthbnl9IC0gT2JzZXJ2YXRpb24gZGF0YSB3aXRoIHBhcnNlZCB2YWx1ZVxyXG4gICovXHJcbiAgZ2V0RGF0YShkYXRhOiBhbnkpIHtcclxuICAgIGlmIChkYXRhPy52YWx1ZS50b1N0cmluZygpLnN0YXJ0c1dpdGgoXCJ7XCIpKSB7XHJcbiAgICAgIGxldCB2YWx1ZSA9IEpTT04ucGFyc2UoZGF0YS52YWx1ZS50b1N0cmluZygpKTtcclxuICAgICAgZGF0YS52YWx1ZSA9IHZhbHVlW1wiZW5cIl07XHJcbiAgICB9XHJcbiAgICByZXR1cm4gZGF0YTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICogUGFyc2UgY3VzdG9tIG9ic2VydmF0aW9uIGRhdGFcclxuICAqIEBwYXJhbSB7YW55fSBkYXRhIC0gQ3VzdG9tIG9ic2VydmF0aW9uIGRhdGFcclxuICAqIEByZXR1cm4ge2FueX0gLSBPYnNlcnZhdGlvbiBkYXRhIHdpdGggcGFyc2VkIHZhbHVlXHJcbiAgKi9cclxuICBnZXREYXRhMihkYXRhOiBhbnkpIHtcclxuICAgIGlmIChkYXRhPy52YWx1ZV90ZXh0LnRvU3RyaW5nKCkuc3RhcnRzV2l0aChcIntcIikpIHtcclxuICAgICAgbGV0IHZhbHVlID0gSlNPTi5wYXJzZShkYXRhLnZhbHVlX3RleHQudG9TdHJpbmcoKSk7XHJcbiAgICAgIGRhdGEudmFsdWVfdGV4dCA9IHZhbHVlW1wiZW5cIl07XHJcbiAgICB9XHJcbiAgICByZXR1cm4gZGF0YTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICogR2V0IGF3YWl0aW5nIHZpc2l0c1xyXG4gICogQHBhcmFtIHtzdHJpbmd9IHNwZWNpYWxpdHkgLSBWaXNpdCBzcGVjaWFsaXR5XHJcbiAgKiBAcGFyYW0ge251bWJlcn0gcGFnZSAtIFBhZ2UgbnVtYmVyXHJcbiAgKiBAcmV0dXJuIHtPYnNlcnZhYmxlPGFueT59XHJcbiAgKi9cclxuICBnZXRBd2FpdGluZ1Zpc2l0cyhtaW5kbWFwVVJMOiBzdHJpbmcsIHNwZWNpYWxpdHk6IHN0cmluZywgcGFnZTogbnVtYmVyID0gMSk6IE9ic2VydmFibGU8YW55PiB7XHJcbiAgICByZXR1cm4gdGhpcy5odHRwLmdldChgJHttaW5kbWFwVVJMfS9vcGVubXJzL2dldEF3YWl0aW5nVmlzaXRzP3NwZWNpYWxpdHk9JHtzcGVjaWFsaXR5fSZwYWdlPSR7cGFnZX1gKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICogR2V0IHByaW9yaXR5IHZpc2l0c1xyXG4gICogQHBhcmFtIHtzdHJpbmd9IHNwZWNpYWxpdHkgLSBWaXNpdCBzcGVjaWFsaXR5XHJcbiAgKiBAcGFyYW0ge251bWJlcn0gcGFnZSAtIFBhZ2UgbnVtYmVyXHJcbiAgKiBAcmV0dXJuIHtPYnNlcnZhYmxlPGFueT59XHJcbiAgKi9cclxuICBnZXRQcmlvcml0eVZpc2l0cyhtaW5kbWFwVVJMOiBzdHJpbmcsIHNwZWNpYWxpdHk6IHN0cmluZywgcGFnZTogbnVtYmVyID0gMSk6IE9ic2VydmFibGU8YW55PiB7XHJcbiAgICByZXR1cm4gdGhpcy5odHRwLmdldChgJHttaW5kbWFwVVJMfS9vcGVubXJzL2dldFByaW9yaXR5VmlzaXRzP3NwZWNpYWxpdHk9JHtzcGVjaWFsaXR5fSZwYWdlPSR7cGFnZX1gKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICogR2V0IGlucHJvZ3Jlc3MgdmlzaXRzXHJcbiAgKiBAcGFyYW0ge3N0cmluZ30gc3BlY2lhbGl0eSAtIFZpc2l0IHNwZWNpYWxpdHlcclxuICAqIEBwYXJhbSB7bnVtYmVyfSBwYWdlIC0gUGFnZSBudW1iZXJcclxuICAqIEByZXR1cm4ge09ic2VydmFibGU8YW55Pn1cclxuICAqL1xyXG4gIGdldEluUHJvZ3Jlc3NWaXNpdHMobWluZG1hcFVSTDogc3RyaW5nLCBzcGVjaWFsaXR5OiBzdHJpbmcsIHBhZ2U6IG51bWJlciA9IDEpOiBPYnNlcnZhYmxlPGFueT4ge1xyXG4gICAgcmV0dXJuIHRoaXMuaHR0cC5nZXQoYCR7bWluZG1hcFVSTH0vb3Blbm1ycy9nZXRJblByb2dyZXNzVmlzaXRzP3NwZWNpYWxpdHk9JHtzcGVjaWFsaXR5fSZwYWdlPSR7cGFnZX1gKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICogR2V0IGNvbXBsZXRlZCB2aXNpdHNcclxuICAqIEBwYXJhbSB7c3RyaW5nfSBzcGVjaWFsaXR5IC0gVmlzaXQgc3BlY2lhbGl0eVxyXG4gICogQHBhcmFtIHtudW1iZXJ9IHBhZ2UgLSBQYWdlIG51bWJlclxyXG4gICogQHJldHVybiB7T2JzZXJ2YWJsZTxhbnk+fVxyXG4gICovXHJcbiAgZ2V0Q29tcGxldGVkVmlzaXRzKG1pbmRtYXBVUkw6IHN0cmluZywgc3BlY2lhbGl0eTogc3RyaW5nLCBwYWdlOiBudW1iZXIgPSAxLCBjb3VudE9ubHk6Ym9vbGVhbiA9IGZhbHNlKTogT2JzZXJ2YWJsZTxhbnk+IHtcclxuICAgIHJldHVybiB0aGlzLmh0dHAuZ2V0KGAke21pbmRtYXBVUkx9L29wZW5tcnMvZ2V0Q29tcGxldGVkVmlzaXRzP3NwZWNpYWxpdHk9JHtzcGVjaWFsaXR5fSZwYWdlPSR7cGFnZX0mY291bnRPbmx5PSR7Y291bnRPbmx5fWApO1xyXG4gIH1cclxuXHJcbiAvKipcclxuICAqIEdldCBmb2xsb3cgdXAgdmlzaXRzXHJcbiAgKiBAcGFyYW0ge3N0cmluZ30gc3BlY2lhbGl0eSAtIFZpc2l0IHNwZWNpYWxpdHlcclxuICAqIEBwYXJhbSB7bnVtYmVyfSBwYWdlIC0gUGFnZSBudW1iZXJcclxuICAqIEByZXR1cm4ge09ic2VydmFibGU8YW55Pn1cclxuICAqL1xyXG4gZ2V0Rm9sbG93VXBWaXNpdHMobWluZG1hcFVSTDogc3RyaW5nLCBzcGVjaWFsaXR5OiBzdHJpbmcsIHBhZ2U6IG51bWJlciA9IDEsIGNvdW50T25seTpib29sZWFuID0gZmFsc2UpOiBPYnNlcnZhYmxlPGFueT4ge1xyXG4gIHJldHVybiB0aGlzLmh0dHAuZ2V0KGAke21pbmRtYXBVUkx9L29wZW5tcnMvZ2V0Rm9sbG93VXBWaXNpdHM/c3BlY2lhbGl0eT0ke3NwZWNpYWxpdHl9JnBhZ2U9JHtwYWdlfSZjb3VudE9ubHk9JHtjb3VudE9ubHl9YCk7XHJcbiB9XHJcblxyXG4gIC8qKlxyXG4gICogR2V0IGVuZGVkIHZpc2l0c1xyXG4gICogQHBhcmFtIHtzdHJpbmd9IHNwZWNpYWxpdHkgLSBWaXNpdCBzcGVjaWFsaXR5XHJcbiAgKiBAcGFyYW0ge251bWJlcn0gcGFnZSAtIFBhZ2UgbnVtYmVyXHJcbiAgKiBAcmV0dXJuIHtPYnNlcnZhYmxlPGFueT59XHJcbiAgKi9cclxuICBnZXRFbmRlZFZpc2l0cyhtaW5kbWFwVVJMOiBzdHJpbmcsIHNwZWNpYWxpdHk6IHN0cmluZywgcGFnZTogbnVtYmVyID0gMSk6IE9ic2VydmFibGU8YW55PiB7XHJcbiAgICByZXR1cm4gdGhpcy5odHRwLmdldChgJHttaW5kbWFwVVJMfS9vcGVubXJzL2dldEVuZGVkVmlzaXRzP3NwZWNpYWxpdHk9JHtzcGVjaWFsaXR5fSZwYWdlPSR7cGFnZX1gKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFBvc3QgdmlzaXQgZGF0YSB0byBhYmRtXHJcbiAgICogQHBhcmFtIHthbnl9IGpzb24gLSBBdHRyaWJ1dGUgcGF5bG9hZFxyXG4gICAqIEByZXR1cm4ge09ic2VydmFibGU8YW55Pn1cclxuICAgKi9cclxuICBwb3N0VmlzaXRUb0FCRE0oYmFzZVVSTEFiaGE6IHN0cmluZywganNvbjogYW55KTogT2JzZXJ2YWJsZTxhbnk+IHtcclxuICAgIGNvbnN0IHVybCA9IGAke2Jhc2VVUkxBYmhhfS9hYmhhL3Bvc3QtY2FyZS1jb250ZXh0YFxyXG4gICAgcmV0dXJuIHRoaXMuaHR0cC5wb3N0KHVybCwganNvbik7XHJcbiAgfVxyXG59XHJcbiJdfQ==