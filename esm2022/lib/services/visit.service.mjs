import { Inject, Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Subject } from "rxjs";
import * as i0 from "@angular/core";
import * as i1 from "@angular/common/http";
export class VisitService {
    http;
    isVisitSummaryShow = false;
    isHelpButtonShow = false;
    triggerAction = new Subject();
    chatVisitId;
    baseURL;
    mindmapURL;
    baseURLAbha;
    constructor(http, environment) {
        this.http = http;
        this.baseURL = environment.baseURL;
        this.mindmapURL = environment.mindmapURL;
        this.baseURLAbha = environment.baseURLAbha;
    }
    /**
    * Get visit
    * @param {string} uuid - Visit uuid
    * @return {Observable<any>}
    */
    getVisit(uuid) {
        // tslint:disable-next-line:max-line-length
        const url = `${this.baseURL}/visit/${uuid}?includeInactive=false&v=custom:(uuid,patient:(uuid,identifiers:(identifier,identifierType:(name,uuid,display)),person:(display,gender,age,birthdate)),location:(display),encounters:(display,encounterDatetime,voided,encounterType:(display),encounterProviders),attributes)`;
        return this.http.get(url);
    }
    /**
    * Get visits for a patient
    * @param {string} id - Patient uuid
    * @return {Observable<any>}
    */
    recentVisits(id) {
        const url = `${this.baseURL}/visit?patient=${id}&v=full`;
        return this.http.get(url);
    }
    /**
    * Get visit
    * @param {string} uuid - Visit uuid
    * @param {string} v - response version format
    * @return {Observable<any>}
    */
    fetchVisitDetails(uuid, v = "custom:(location:(display),uuid,display,startDatetime,dateCreated,stopDatetime,encounters:(display,uuid,encounterDatetime,encounterType:(display),obs:(display,uuid,value,concept:(uuid,display)),encounterProviders:(display,provider:(uuid,attributes,person:(uuid,display,gender,age)))),patient:(uuid,identifiers:(identifier,identifierType:(name,uuid,display)),attributes,person:(display,gender,age)),attributes)") {
        // tslint:disable-next-line:max-line-length
        const url = `${this.baseURL}/visit/${uuid}?v=${v}`;
        return this.http.get(url);
    }
    /**
    * Get visit
    * @param {string} uuid - Visit uuid
    * @param {string} v - response version format
    * @return {Observable<any>}
    */
    fetchVisitDetails2(externalPrescriptionCred, uuid, v = "custom:(location:(display),uuid,display,startDatetime,dateCreated,stopDatetime,encounters:(display,uuid,encounterDatetime,encounterType:(display),obs:(display,uuid,value,concept:(uuid,display)),encounterProviders:(display,provider:(uuid,attributes,person:(uuid,display,gender,age)))),patient:(uuid,identifiers:(identifier,identifierType:(name,uuid,display)),attributes,person:(display,gender,age)),attributes)") {
        // tslint:disable-next-line:max-line-length
        let headers = new HttpHeaders();
        headers = headers.append('Authorization', 'Basic ' + externalPrescriptionCred);
        const url = `${this.baseURL}/visit/${uuid}?v=${v}`;
        return this.http.get(url, { headers });
    }
    /**
    * Get visit
    * @param {string} uuid - Visit uuid
    * @param {string} v - response format
    * @return {Observable<any>}
    */
    fetchVisitPatient(externalPrescriptionCred, uuid, v = "custom:(uuid,patient:(attributes,identifiers:(identifier,identifierType:(name,uuid,display))))") {
        let headers = new HttpHeaders();
        headers = headers.append('Authorization', 'Basic ' + externalPrescriptionCred);
        const url = `${this.baseURL}/visit/${uuid}?v=${v}`;
        return this.http.get(url, { headers });
    }
    /**
    * Get visit
    * @param {string} uuid - Visit uuid
    * @param {string} v - response version format
    * @return {Observable<any>}
    */
    getVisitDetails(uuid, v = "custom:(location:(display),uuid,display,startDatetime,stopDatetime,encounters:(display,uuid,encounterDatetime,encounterType:(display),obs:(display,uuid,value),encounterProviders:(display,provider:(uuid,person:(uuid,display,gender,age),attributes))),patient:(uuid,identifiers:(identifier,identifierType:(name,uuid,display)),person:(display,gender,age)))") {
        // tslint:disable-next-line:max-line-length
        const url = `${this.baseURL}/visit/${uuid}?v=${v}`;
        return this.http.get(url);
    }
    /**
    * Get visit attributes
    * @param {string} visitId - Visit uuid
    * @return {Observable<any>}
    */
    getAttribute(visitId) {
        const url = `${this.baseURL}/visit/${visitId}/attribute`;
        return this.http.get(url);
    }
    /**
    * Post visit attribute
    * @param {string} visitId - Visit uuid
    * @param {any} json - Attribute payload
    * @return {Observable<any>}
    */
    postAttribute(visitId, json) {
        const url = `${this.baseURL}/visit/${visitId}/attribute`;
        return this.http.post(url, json);
    }
    /**
    * Update visit attribute
    * @param {string} visitId - Visit uuid
    * @param {string} attributeUuid - Visit attribute uuid
    * @param {any} json - Attribute payload
    * @return {Observable<any>}
    */
    updateAttribute(visitId, attributeUuid, json) {
        const url = `${this.baseURL}/visit/${visitId}/attribute/${attributeUuid}`;
        return this.http.post(url, json);
    }
    /**
    * Delete visit attribute
    * @param {string} visitId - Visit uuid
    * @param {string} uuid - Visit attribute uuid
    * @return {Observable<any>}
    */
    deleteAttribute(visitId, uuid) {
        const url = `${this.baseURL}/visit/${visitId}/attribute/${uuid}`;
        return this.http.delete(url);
    }
    /**
    * Get patient details
    * @param {string} id - Patient uuid
    * @param {string} v - response format
    * @return {Observable<any>}
    */
    patientInfo(id, v = 'custom:(uuid,attributes,identifiers,person:(uuid,display,gender,preferredName:(givenName,familyName,middleName),birthdate,age,preferredAddress:(cityVillage,address1,address2,country,stateProvince,countyDistrict,postalCode),attributes:(value,attributeType:(display))))') {
        // tslint:disable-next-line: max-line-length
        const url = `${this.baseURL}/patient/${id}?v=${v}`;
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
    getAwaitingVisits(speciality, page = 1) {
        return this.http.get(`${this.mindmapURL}/openmrs/getAwaitingVisits?speciality=${speciality}&page=${page}`);
    }
    /**
    * Get priority visits
    * @param {string} speciality - Visit speciality
    * @param {number} page - Page number
    * @return {Observable<any>}
    */
    getPriorityVisits(speciality, page = 1) {
        return this.http.get(`${this.mindmapURL}/openmrs/getPriorityVisits?speciality=${speciality}&page=${page}`);
    }
    /**
    * Get inprogress visits
    * @param {string} speciality - Visit speciality
    * @param {number} page - Page number
    * @return {Observable<any>}
    */
    getInProgressVisits(speciality, page = 1) {
        return this.http.get(`${this.mindmapURL}/openmrs/getInProgressVisits?speciality=${speciality}&page=${page}`);
    }
    /**
    * Get completed visits
    * @param {string} speciality - Visit speciality
    * @param {number} page - Page number
    * @return {Observable<any>}
    */
    getCompletedVisits(speciality, page = 1, countOnly = false) {
        return this.http.get(`${this.mindmapURL}/openmrs/getCompletedVisits?speciality=${speciality}&page=${page}&countOnly=${countOnly}`);
    }
    /**
     * Get follow up visits
     * @param {string} speciality - Visit speciality
     * @param {number} page - Page number
     * @return {Observable<any>}
     */
    getFollowUpVisits(speciality, page = 1, countOnly = false) {
        return this.http.get(`${this.mindmapURL}/openmrs/getFollowUpVisits?speciality=${speciality}&page=${page}&countOnly=${countOnly}`);
    }
    /**
    * Get ended visits
    * @param {string} speciality - Visit speciality
    * @param {number} page - Page number
    * @return {Observable<any>}
    */
    getEndedVisits(speciality, page = 1) {
        return this.http.get(`${this.mindmapURL}/openmrs/getEndedVisits?speciality=${speciality}&page=${page}`);
    }
    /**
     * Post visit data to abdm
     * @param {any} json - Attribute payload
     * @return {Observable<any>}
     */
    postVisitToABDM(json) {
        const url = `${this.baseURLAbha}/abha/post-care-context`;
        return this.http.post(url, json);
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.3.0", ngImport: i0, type: VisitService, deps: [{ token: i1.HttpClient }, { token: 'environment' }], target: i0.ɵɵFactoryTarget.Injectable });
    static ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "14.3.0", ngImport: i0, type: VisitService, providedIn: "root" });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.3.0", ngImport: i0, type: VisitService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: "root",
                }]
        }], ctorParameters: function () { return [{ type: i1.HttpClient }, { type: undefined, decorators: [{
                    type: Inject,
                    args: ['environment']
                }] }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmlzaXQuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL2loLWxpYnJhcnkvc3JjL2xpYi9zZXJ2aWNlcy92aXNpdC5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxNQUFNLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ25ELE9BQU8sRUFBRSxVQUFVLEVBQUUsV0FBVyxFQUFFLE1BQU0sc0JBQXNCLENBQUM7QUFDL0QsT0FBTyxFQUFjLE9BQU8sRUFBRSxNQUFNLE1BQU0sQ0FBQzs7O0FBSzNDLE1BQU0sT0FBTyxZQUFZO0lBV2I7SUFWSCxrQkFBa0IsR0FBWSxLQUFLLENBQUM7SUFDcEMsZ0JBQWdCLEdBQVksS0FBSyxDQUFDO0lBQ2xDLGFBQWEsR0FBaUIsSUFBSSxPQUFPLEVBQUUsQ0FBQztJQUM1QyxXQUFXLENBQVM7SUFFbkIsT0FBTyxDQUFDO0lBQ1IsVUFBVSxDQUFDO0lBQ1gsV0FBVyxDQUFDO0lBRXBCLFlBQ1UsSUFBZ0IsRUFDRCxXQUFXO1FBRDFCLFNBQUksR0FBSixJQUFJLENBQVk7UUFHeEIsSUFBSSxDQUFDLE9BQU8sR0FBRyxXQUFXLENBQUMsT0FBTyxDQUFDO1FBQ25DLElBQUksQ0FBQyxVQUFVLEdBQUcsV0FBVyxDQUFDLFVBQVUsQ0FBQztRQUN6QyxJQUFJLENBQUMsV0FBVyxHQUFHLFdBQVcsQ0FBQyxXQUFXLENBQUM7SUFDN0MsQ0FBQztJQUVEOzs7O01BSUU7SUFDRixRQUFRLENBQUMsSUFBSTtRQUNYLDJDQUEyQztRQUMzQyxNQUFNLEdBQUcsR0FBRyxHQUFHLElBQUksQ0FBQyxPQUFPLFVBQVUsSUFBSSxnUkFBZ1IsQ0FBQztRQUMxVCxPQUFPLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBQzVCLENBQUM7SUFFRDs7OztNQUlFO0lBQ0YsWUFBWSxDQUFDLEVBQUU7UUFD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LE9BQWUsQ0FBQyxFQUFFLFlBQW9CLEtBQUs7UUFDaEYsT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxHQUFHLElBQUksQ0FBQyxVQUFVLHlDQUF5QyxVQUFVLFNBQVMsSUFBSSxjQUFjLFNBQVMsRUFBRSxDQUFDLENBQUM7SUFDbkksQ0FBQztJQUVBOzs7OztNQUtFO0lBQ0YsY0FBYyxDQUFDLFVBQWtCLEVBQUUsT0FBZSxDQUFDO1FBQ2pELE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsR0FBRyxJQUFJLENBQUMsVUFBVSxzQ0FBc0MsVUFBVSxTQUFTLElBQUksRUFBRSxDQUFDLENBQUM7SUFDMUcsQ0FBQztJQUVEOzs7O09BSUc7SUFDSCxlQUFlLENBQUMsSUFBUztRQUN2QixNQUFNLEdBQUcsR0FBRyxHQUFHLElBQUksQ0FBQyxXQUFXLHlCQUF5QixDQUFBO1FBQ3hELE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxFQUFFLElBQUksQ0FBQyxDQUFDO0lBQ25DLENBQUM7dUdBMVFVLFlBQVksNENBWWIsYUFBYTsyR0FaWixZQUFZLGNBRlgsTUFBTTs7MkZBRVAsWUFBWTtrQkFIeEIsVUFBVTttQkFBQztvQkFDVixVQUFVLEVBQUUsTUFBTTtpQkFDbkI7OzBCQWFJLE1BQU07MkJBQUMsYUFBYSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdCwgSW5qZWN0YWJsZSB9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XHJcbmltcG9ydCB7IEh0dHBDbGllbnQsIEh0dHBIZWFkZXJzIH0gZnJvbSBcIkBhbmd1bGFyL2NvbW1vbi9odHRwXCI7XHJcbmltcG9ydCB7IE9ic2VydmFibGUsIFN1YmplY3QgfSBmcm9tIFwicnhqc1wiO1xyXG5cclxuQEluamVjdGFibGUoe1xyXG4gIHByb3ZpZGVkSW46IFwicm9vdFwiLFxyXG59KVxyXG5leHBvcnQgY2xhc3MgVmlzaXRTZXJ2aWNlIHtcclxuICBwdWJsaWMgaXNWaXNpdFN1bW1hcnlTaG93OiBib29sZWFuID0gZmFsc2U7XHJcbiAgcHVibGljIGlzSGVscEJ1dHRvblNob3c6IGJvb2xlYW4gPSBmYWxzZTtcclxuICBwdWJsaWMgdHJpZ2dlckFjdGlvbjogU3ViamVjdDxhbnk+ID0gbmV3IFN1YmplY3QoKTtcclxuICBwdWJsaWMgY2hhdFZpc2l0SWQ6IHN0cmluZztcclxuXHJcbiAgcHJpdmF0ZSBiYXNlVVJMO1xyXG4gIHByaXZhdGUgbWluZG1hcFVSTDtcclxuICBwcml2YXRlIGJhc2VVUkxBYmhhO1xyXG5cclxuICBjb25zdHJ1Y3RvcihcclxuICAgIHByaXZhdGUgaHR0cDogSHR0cENsaWVudCxcclxuICAgIEBJbmplY3QoJ2Vudmlyb25tZW50JykgZW52aXJvbm1lbnRcclxuICApIHtcclxuICAgIHRoaXMuYmFzZVVSTCA9IGVudmlyb25tZW50LmJhc2VVUkw7XHJcbiAgICB0aGlzLm1pbmRtYXBVUkwgPSBlbnZpcm9ubWVudC5taW5kbWFwVVJMO1xyXG4gICAgdGhpcy5iYXNlVVJMQWJoYSA9IGVudmlyb25tZW50LmJhc2VVUkxBYmhhO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgKiBHZXQgdmlzaXRcclxuICAqIEBwYXJhbSB7c3RyaW5nfSB1dWlkIC0gVmlzaXQgdXVpZFxyXG4gICogQHJldHVybiB7T2JzZXJ2YWJsZTxhbnk+fVxyXG4gICovXHJcbiAgZ2V0VmlzaXQodXVpZCk6IE9ic2VydmFibGU8YW55PiB7XHJcbiAgICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6bWF4LWxpbmUtbGVuZ3RoXHJcbiAgICBjb25zdCB1cmwgPSBgJHt0aGlzLmJhc2VVUkx9L3Zpc2l0LyR7dXVpZH0/aW5jbHVkZUluYWN0aXZlPWZhbHNlJnY9Y3VzdG9tOih1dWlkLHBhdGllbnQ6KHV1aWQsaWRlbnRpZmllcnM6KGlkZW50aWZpZXIsaWRlbnRpZmllclR5cGU6KG5hbWUsdXVpZCxkaXNwbGF5KSkscGVyc29uOihkaXNwbGF5LGdlbmRlcixhZ2UsYmlydGhkYXRlKSksbG9jYXRpb246KGRpc3BsYXkpLGVuY291bnRlcnM6KGRpc3BsYXksZW5jb3VudGVyRGF0ZXRpbWUsdm9pZGVkLGVuY291bnRlclR5cGU6KGRpc3BsYXkpLGVuY291bnRlclByb3ZpZGVycyksYXR0cmlidXRlcylgO1xyXG4gICAgcmV0dXJuIHRoaXMuaHR0cC5nZXQodXJsKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICogR2V0IHZpc2l0cyBmb3IgYSBwYXRpZW50XHJcbiAgKiBAcGFyYW0ge3N0cmluZ30gaWQgLSBQYXRpZW50IHV1aWRcclxuICAqIEByZXR1cm4ge09ic2VydmFibGU8YW55Pn1cclxuICAqL1xyXG4gIHJlY2VudFZpc2l0cyhpZCk6IE9ic2VydmFibGU8YW55PiB7XHJcbiAgICBjb25zdCB1cmwgPSBgJHt0aGlzLmJhc2VVUkx9L3Zpc2l0P3BhdGllbnQ9JHtpZH0mdj1mdWxsYDtcclxuICAgIHJldHVybiB0aGlzLmh0dHAuZ2V0KHVybCk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAqIEdldCB2aXNpdFxyXG4gICogQHBhcmFtIHtzdHJpbmd9IHV1aWQgLSBWaXNpdCB1dWlkXHJcbiAgKiBAcGFyYW0ge3N0cmluZ30gdiAtIHJlc3BvbnNlIHZlcnNpb24gZm9ybWF0XHJcbiAgKiBAcmV0dXJuIHtPYnNlcnZhYmxlPGFueT59XHJcbiAgKi9cclxuICBmZXRjaFZpc2l0RGV0YWlscyhcclxuICAgIFxyXG4gICAgdXVpZCxcclxuICAgIHYgPSBcImN1c3RvbToobG9jYXRpb246KGRpc3BsYXkpLHV1aWQsZGlzcGxheSxzdGFydERhdGV0aW1lLGRhdGVDcmVhdGVkLHN0b3BEYXRldGltZSxlbmNvdW50ZXJzOihkaXNwbGF5LHV1aWQsZW5jb3VudGVyRGF0ZXRpbWUsZW5jb3VudGVyVHlwZTooZGlzcGxheSksb2JzOihkaXNwbGF5LHV1aWQsdmFsdWUsY29uY2VwdDoodXVpZCxkaXNwbGF5KSksZW5jb3VudGVyUHJvdmlkZXJzOihkaXNwbGF5LHByb3ZpZGVyOih1dWlkLGF0dHJpYnV0ZXMscGVyc29uOih1dWlkLGRpc3BsYXksZ2VuZGVyLGFnZSkpKSkscGF0aWVudDoodXVpZCxpZGVudGlmaWVyczooaWRlbnRpZmllcixpZGVudGlmaWVyVHlwZToobmFtZSx1dWlkLGRpc3BsYXkpKSxhdHRyaWJ1dGVzLHBlcnNvbjooZGlzcGxheSxnZW5kZXIsYWdlKSksYXR0cmlidXRlcylcIlxyXG4gICk6IE9ic2VydmFibGU8YW55PiB7XHJcbiAgICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6bWF4LWxpbmUtbGVuZ3RoXHJcbiAgICBjb25zdCB1cmwgPSBgJHt0aGlzLmJhc2VVUkx9L3Zpc2l0LyR7dXVpZH0/dj0ke3Z9YDtcclxuICAgIHJldHVybiB0aGlzLmh0dHAuZ2V0KHVybCk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAqIEdldCB2aXNpdFxyXG4gICogQHBhcmFtIHtzdHJpbmd9IHV1aWQgLSBWaXNpdCB1dWlkXHJcbiAgKiBAcGFyYW0ge3N0cmluZ30gdiAtIHJlc3BvbnNlIHZlcnNpb24gZm9ybWF0XHJcbiAgKiBAcmV0dXJuIHtPYnNlcnZhYmxlPGFueT59XHJcbiAgKi9cclxuICBmZXRjaFZpc2l0RGV0YWlsczIoXHJcbiAgICBleHRlcm5hbFByZXNjcmlwdGlvbkNyZWQ6IHN0cmluZyxcclxuICAgIFxyXG4gICAgdXVpZDogc3RyaW5nLFxyXG4gICAgdjogc3RyaW5nID0gXCJjdXN0b206KGxvY2F0aW9uOihkaXNwbGF5KSx1dWlkLGRpc3BsYXksc3RhcnREYXRldGltZSxkYXRlQ3JlYXRlZCxzdG9wRGF0ZXRpbWUsZW5jb3VudGVyczooZGlzcGxheSx1dWlkLGVuY291bnRlckRhdGV0aW1lLGVuY291bnRlclR5cGU6KGRpc3BsYXkpLG9iczooZGlzcGxheSx1dWlkLHZhbHVlLGNvbmNlcHQ6KHV1aWQsZGlzcGxheSkpLGVuY291bnRlclByb3ZpZGVyczooZGlzcGxheSxwcm92aWRlcjoodXVpZCxhdHRyaWJ1dGVzLHBlcnNvbjoodXVpZCxkaXNwbGF5LGdlbmRlcixhZ2UpKSkpLHBhdGllbnQ6KHV1aWQsaWRlbnRpZmllcnM6KGlkZW50aWZpZXIsaWRlbnRpZmllclR5cGU6KG5hbWUsdXVpZCxkaXNwbGF5KSksYXR0cmlidXRlcyxwZXJzb246KGRpc3BsYXksZ2VuZGVyLGFnZSkpLGF0dHJpYnV0ZXMpXCJcclxuICApOiBPYnNlcnZhYmxlPGFueT4ge1xyXG4gICAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOm1heC1saW5lLWxlbmd0aFxyXG4gICAgbGV0IGhlYWRlcnM6IEh0dHBIZWFkZXJzID0gbmV3IEh0dHBIZWFkZXJzKCk7XHJcbiAgICBoZWFkZXJzID0gaGVhZGVycy5hcHBlbmQoJ0F1dGhvcml6YXRpb24nLCAnQmFzaWMgJyArIGV4dGVybmFsUHJlc2NyaXB0aW9uQ3JlZCk7XHJcbiAgICBjb25zdCB1cmwgPSBgJHt0aGlzLmJhc2VVUkx9L3Zpc2l0LyR7dXVpZH0/dj0ke3Z9YDtcclxuICAgIHJldHVybiB0aGlzLmh0dHAuZ2V0KHVybCwgeyBoZWFkZXJzIH0pO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgKiBHZXQgdmlzaXRcclxuICAqIEBwYXJhbSB7c3RyaW5nfSB1dWlkIC0gVmlzaXQgdXVpZFxyXG4gICogQHBhcmFtIHtzdHJpbmd9IHYgLSByZXNwb25zZSBmb3JtYXRcclxuICAqIEByZXR1cm4ge09ic2VydmFibGU8YW55Pn1cclxuICAqL1xyXG4gIGZldGNoVmlzaXRQYXRpZW50KGV4dGVybmFsUHJlc2NyaXB0aW9uQ3JlZDogc3RyaW5nLCB1dWlkOiBzdHJpbmcsIHY6IHN0cmluZyA9IFwiY3VzdG9tOih1dWlkLHBhdGllbnQ6KGF0dHJpYnV0ZXMsaWRlbnRpZmllcnM6KGlkZW50aWZpZXIsaWRlbnRpZmllclR5cGU6KG5hbWUsdXVpZCxkaXNwbGF5KSkpKVwiKTogT2JzZXJ2YWJsZTxhbnk+IHtcclxuICAgIGxldCBoZWFkZXJzOiBIdHRwSGVhZGVycyA9IG5ldyBIdHRwSGVhZGVycygpO1xyXG4gICAgaGVhZGVycyA9IGhlYWRlcnMuYXBwZW5kKCdBdXRob3JpemF0aW9uJywgJ0Jhc2ljICcgKyBleHRlcm5hbFByZXNjcmlwdGlvbkNyZWQpO1xyXG4gICAgY29uc3QgdXJsID0gYCR7dGhpcy5iYXNlVVJMfS92aXNpdC8ke3V1aWR9P3Y9JHt2fWA7XHJcbiAgICByZXR1cm4gdGhpcy5odHRwLmdldCh1cmwsIHsgaGVhZGVycyB9KTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICogR2V0IHZpc2l0XHJcbiAgKiBAcGFyYW0ge3N0cmluZ30gdXVpZCAtIFZpc2l0IHV1aWRcclxuICAqIEBwYXJhbSB7c3RyaW5nfSB2IC0gcmVzcG9uc2UgdmVyc2lvbiBmb3JtYXRcclxuICAqIEByZXR1cm4ge09ic2VydmFibGU8YW55Pn1cclxuICAqL1xyXG4gIGdldFZpc2l0RGV0YWlscyhcclxuICAgIFxyXG4gICAgdXVpZDogc3RyaW5nLFxyXG4gICAgdjogc3RyaW5nID0gXCJjdXN0b206KGxvY2F0aW9uOihkaXNwbGF5KSx1dWlkLGRpc3BsYXksc3RhcnREYXRldGltZSxzdG9wRGF0ZXRpbWUsZW5jb3VudGVyczooZGlzcGxheSx1dWlkLGVuY291bnRlckRhdGV0aW1lLGVuY291bnRlclR5cGU6KGRpc3BsYXkpLG9iczooZGlzcGxheSx1dWlkLHZhbHVlKSxlbmNvdW50ZXJQcm92aWRlcnM6KGRpc3BsYXkscHJvdmlkZXI6KHV1aWQscGVyc29uOih1dWlkLGRpc3BsYXksZ2VuZGVyLGFnZSksYXR0cmlidXRlcykpKSxwYXRpZW50Oih1dWlkLGlkZW50aWZpZXJzOihpZGVudGlmaWVyLGlkZW50aWZpZXJUeXBlOihuYW1lLHV1aWQsZGlzcGxheSkpLHBlcnNvbjooZGlzcGxheSxnZW5kZXIsYWdlKSkpXCJcclxuICApOiBPYnNlcnZhYmxlPGFueT4ge1xyXG4gICAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOm1heC1saW5lLWxlbmd0aFxyXG4gICAgY29uc3QgdXJsID0gYCR7dGhpcy5iYXNlVVJMfS92aXNpdC8ke3V1aWR9P3Y9JHt2fWA7XHJcbiAgICByZXR1cm4gdGhpcy5odHRwLmdldCh1cmwpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgKiBHZXQgdmlzaXQgYXR0cmlidXRlc1xyXG4gICogQHBhcmFtIHtzdHJpbmd9IHZpc2l0SWQgLSBWaXNpdCB1dWlkXHJcbiAgKiBAcmV0dXJuIHtPYnNlcnZhYmxlPGFueT59XHJcbiAgKi9cclxuICBnZXRBdHRyaWJ1dGUodmlzaXRJZCk6IE9ic2VydmFibGU8YW55PiB7XHJcbiAgICBjb25zdCB1cmwgPSBgJHt0aGlzLmJhc2VVUkx9L3Zpc2l0LyR7dmlzaXRJZH0vYXR0cmlidXRlYDtcclxuICAgIHJldHVybiB0aGlzLmh0dHAuZ2V0KHVybCk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAqIFBvc3QgdmlzaXQgYXR0cmlidXRlXHJcbiAgKiBAcGFyYW0ge3N0cmluZ30gdmlzaXRJZCAtIFZpc2l0IHV1aWRcclxuICAqIEBwYXJhbSB7YW55fSBqc29uIC0gQXR0cmlidXRlIHBheWxvYWRcclxuICAqIEByZXR1cm4ge09ic2VydmFibGU8YW55Pn1cclxuICAqL1xyXG4gIHBvc3RBdHRyaWJ1dGUodmlzaXRJZCwganNvbik6IE9ic2VydmFibGU8YW55PiB7XHJcbiAgICBjb25zdCB1cmwgPSBgJHt0aGlzLmJhc2VVUkx9L3Zpc2l0LyR7dmlzaXRJZH0vYXR0cmlidXRlYDtcclxuICAgIHJldHVybiB0aGlzLmh0dHAucG9zdCh1cmwsIGpzb24pO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgKiBVcGRhdGUgdmlzaXQgYXR0cmlidXRlXHJcbiAgKiBAcGFyYW0ge3N0cmluZ30gdmlzaXRJZCAtIFZpc2l0IHV1aWRcclxuICAqIEBwYXJhbSB7c3RyaW5nfSBhdHRyaWJ1dGVVdWlkIC0gVmlzaXQgYXR0cmlidXRlIHV1aWRcclxuICAqIEBwYXJhbSB7YW55fSBqc29uIC0gQXR0cmlidXRlIHBheWxvYWRcclxuICAqIEByZXR1cm4ge09ic2VydmFibGU8YW55Pn1cclxuICAqL1xyXG4gIHVwZGF0ZUF0dHJpYnV0ZSh2aXNpdElkLCBhdHRyaWJ1dGVVdWlkLCBqc29uKTogT2JzZXJ2YWJsZTxhbnk+IHtcclxuICAgIGNvbnN0IHVybCA9IGAke3RoaXMuYmFzZVVSTH0vdmlzaXQvJHt2aXNpdElkfS9hdHRyaWJ1dGUvJHthdHRyaWJ1dGVVdWlkfWA7XHJcbiAgICByZXR1cm4gdGhpcy5odHRwLnBvc3QodXJsLCBqc29uKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICogRGVsZXRlIHZpc2l0IGF0dHJpYnV0ZVxyXG4gICogQHBhcmFtIHtzdHJpbmd9IHZpc2l0SWQgLSBWaXNpdCB1dWlkXHJcbiAgKiBAcGFyYW0ge3N0cmluZ30gdXVpZCAtIFZpc2l0IGF0dHJpYnV0ZSB1dWlkXHJcbiAgKiBAcmV0dXJuIHtPYnNlcnZhYmxlPGFueT59XHJcbiAgKi9cclxuICBkZWxldGVBdHRyaWJ1dGUodmlzaXRJZCwgdXVpZCk6IE9ic2VydmFibGU8YW55PiB7XHJcbiAgICBjb25zdCB1cmwgPSBgJHt0aGlzLmJhc2VVUkx9L3Zpc2l0LyR7dmlzaXRJZH0vYXR0cmlidXRlLyR7dXVpZH1gO1xyXG4gICAgcmV0dXJuIHRoaXMuaHR0cC5kZWxldGUodXJsKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICogR2V0IHBhdGllbnQgZGV0YWlsc1xyXG4gICogQHBhcmFtIHtzdHJpbmd9IGlkIC0gUGF0aWVudCB1dWlkXHJcbiAgKiBAcGFyYW0ge3N0cmluZ30gdiAtIHJlc3BvbnNlIGZvcm1hdFxyXG4gICogQHJldHVybiB7T2JzZXJ2YWJsZTxhbnk+fVxyXG4gICovXHJcbiAgcGF0aWVudEluZm8oaWQsIHYgPSAnY3VzdG9tOih1dWlkLGF0dHJpYnV0ZXMsaWRlbnRpZmllcnMscGVyc29uOih1dWlkLGRpc3BsYXksZ2VuZGVyLHByZWZlcnJlZE5hbWU6KGdpdmVuTmFtZSxmYW1pbHlOYW1lLG1pZGRsZU5hbWUpLGJpcnRoZGF0ZSxhZ2UscHJlZmVycmVkQWRkcmVzczooY2l0eVZpbGxhZ2UsYWRkcmVzczEsYWRkcmVzczIsY291bnRyeSxzdGF0ZVByb3ZpbmNlLGNvdW50eURpc3RyaWN0LHBvc3RhbENvZGUpLGF0dHJpYnV0ZXM6KHZhbHVlLGF0dHJpYnV0ZVR5cGU6KGRpc3BsYXkpKSkpJyk6IE9ic2VydmFibGU8YW55PiB7XHJcbiAgICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6IG1heC1saW5lLWxlbmd0aFxyXG4gICAgY29uc3QgdXJsID0gYCR7dGhpcy5iYXNlVVJMfS9wYXRpZW50LyR7aWR9P3Y9JHt2fWA7XHJcbiAgICByZXR1cm4gdGhpcy5odHRwLmdldCh1cmwpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgKiBHZXQgd2hhdHNhcHAgbGlua1xyXG4gICogQHBhcmFtIHtzdHJpbmd9IHdoYXRzYXBwIC0gV2hhdHNwcCBudW1iZXJcclxuICAqIEBwYXJhbSB7c3RyaW5nfSBtc2cgLSBNZXNzYWdlIHRvIGJlIHNlbnRcclxuICAqIEByZXR1cm4ge09ic2VydmFibGU8YW55Pn1cclxuICAqL1xyXG4gIGdldFdoYXRzYXBwTGluayh3aGF0c2FwcDogc3RyaW5nLCBtc2c6IHN0cmluZyA9IGBIZWxsbyBJJ20gY2FsbGluZyBmb3IgY29uc3VsdGF0aW9uYCkge1xyXG4gICAgbGV0IHRleHQgPSBlbmNvZGVVUkkobXNnKTtcclxuICAgIGxldCB3aGF0c2FwcExpbmsgPSBgaHR0cHM6Ly93YS5tZS8ke3doYXRzYXBwfT90ZXh0PSR7dGV4dH1gO1xyXG4gICAgcmV0dXJuIHdoYXRzYXBwTGluaztcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICogUGFyc2Ugb2JzZXJ2YXRpb24gZGF0YVxyXG4gICogQHBhcmFtIHthbnl9IGRhdGEgLSBPYnNlcnZhdGlvbiBkYXRhXHJcbiAgKiBAcmV0dXJuIHthbnl9IC0gT2JzZXJ2YXRpb24gZGF0YSB3aXRoIHBhcnNlZCB2YWx1ZVxyXG4gICovXHJcbiAgZ2V0RGF0YShkYXRhOiBhbnkpIHtcclxuICAgIGlmIChkYXRhPy52YWx1ZS50b1N0cmluZygpLnN0YXJ0c1dpdGgoXCJ7XCIpKSB7XHJcbiAgICAgIGxldCB2YWx1ZSA9IEpTT04ucGFyc2UoZGF0YS52YWx1ZS50b1N0cmluZygpKTtcclxuICAgICAgZGF0YS52YWx1ZSA9IHZhbHVlW1wiZW5cIl07XHJcbiAgICB9XHJcbiAgICByZXR1cm4gZGF0YTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICogUGFyc2UgY3VzdG9tIG9ic2VydmF0aW9uIGRhdGFcclxuICAqIEBwYXJhbSB7YW55fSBkYXRhIC0gQ3VzdG9tIG9ic2VydmF0aW9uIGRhdGFcclxuICAqIEByZXR1cm4ge2FueX0gLSBPYnNlcnZhdGlvbiBkYXRhIHdpdGggcGFyc2VkIHZhbHVlXHJcbiAgKi9cclxuICBnZXREYXRhMihkYXRhOiBhbnkpIHtcclxuICAgIGlmIChkYXRhPy52YWx1ZV90ZXh0LnRvU3RyaW5nKCkuc3RhcnRzV2l0aChcIntcIikpIHtcclxuICAgICAgbGV0IHZhbHVlID0gSlNPTi5wYXJzZShkYXRhLnZhbHVlX3RleHQudG9TdHJpbmcoKSk7XHJcbiAgICAgIGRhdGEudmFsdWVfdGV4dCA9IHZhbHVlW1wiZW5cIl07XHJcbiAgICB9XHJcbiAgICByZXR1cm4gZGF0YTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICogR2V0IGF3YWl0aW5nIHZpc2l0c1xyXG4gICogQHBhcmFtIHtzdHJpbmd9IHNwZWNpYWxpdHkgLSBWaXNpdCBzcGVjaWFsaXR5XHJcbiAgKiBAcGFyYW0ge251bWJlcn0gcGFnZSAtIFBhZ2UgbnVtYmVyXHJcbiAgKiBAcmV0dXJuIHtPYnNlcnZhYmxlPGFueT59XHJcbiAgKi9cclxuICBnZXRBd2FpdGluZ1Zpc2l0cyhzcGVjaWFsaXR5OiBzdHJpbmcsIHBhZ2U6IG51bWJlciA9IDEpOiBPYnNlcnZhYmxlPGFueT4ge1xyXG4gICAgcmV0dXJuIHRoaXMuaHR0cC5nZXQoYCR7dGhpcy5taW5kbWFwVVJMfS9vcGVubXJzL2dldEF3YWl0aW5nVmlzaXRzP3NwZWNpYWxpdHk9JHtzcGVjaWFsaXR5fSZwYWdlPSR7cGFnZX1gKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICogR2V0IHByaW9yaXR5IHZpc2l0c1xyXG4gICogQHBhcmFtIHtzdHJpbmd9IHNwZWNpYWxpdHkgLSBWaXNpdCBzcGVjaWFsaXR5XHJcbiAgKiBAcGFyYW0ge251bWJlcn0gcGFnZSAtIFBhZ2UgbnVtYmVyXHJcbiAgKiBAcmV0dXJuIHtPYnNlcnZhYmxlPGFueT59XHJcbiAgKi9cclxuICBnZXRQcmlvcml0eVZpc2l0cyhzcGVjaWFsaXR5OiBzdHJpbmcsIHBhZ2U6IG51bWJlciA9IDEpOiBPYnNlcnZhYmxlPGFueT4ge1xyXG4gICAgcmV0dXJuIHRoaXMuaHR0cC5nZXQoYCR7dGhpcy5taW5kbWFwVVJMfS9vcGVubXJzL2dldFByaW9yaXR5VmlzaXRzP3NwZWNpYWxpdHk9JHtzcGVjaWFsaXR5fSZwYWdlPSR7cGFnZX1gKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICogR2V0IGlucHJvZ3Jlc3MgdmlzaXRzXHJcbiAgKiBAcGFyYW0ge3N0cmluZ30gc3BlY2lhbGl0eSAtIFZpc2l0IHNwZWNpYWxpdHlcclxuICAqIEBwYXJhbSB7bnVtYmVyfSBwYWdlIC0gUGFnZSBudW1iZXJcclxuICAqIEByZXR1cm4ge09ic2VydmFibGU8YW55Pn1cclxuICAqL1xyXG4gIGdldEluUHJvZ3Jlc3NWaXNpdHMoc3BlY2lhbGl0eTogc3RyaW5nLCBwYWdlOiBudW1iZXIgPSAxKTogT2JzZXJ2YWJsZTxhbnk+IHtcclxuICAgIHJldHVybiB0aGlzLmh0dHAuZ2V0KGAke3RoaXMubWluZG1hcFVSTH0vb3Blbm1ycy9nZXRJblByb2dyZXNzVmlzaXRzP3NwZWNpYWxpdHk9JHtzcGVjaWFsaXR5fSZwYWdlPSR7cGFnZX1gKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICogR2V0IGNvbXBsZXRlZCB2aXNpdHNcclxuICAqIEBwYXJhbSB7c3RyaW5nfSBzcGVjaWFsaXR5IC0gVmlzaXQgc3BlY2lhbGl0eVxyXG4gICogQHBhcmFtIHtudW1iZXJ9IHBhZ2UgLSBQYWdlIG51bWJlclxyXG4gICogQHJldHVybiB7T2JzZXJ2YWJsZTxhbnk+fVxyXG4gICovXHJcbiAgZ2V0Q29tcGxldGVkVmlzaXRzKHNwZWNpYWxpdHk6IHN0cmluZywgcGFnZTogbnVtYmVyID0gMSwgY291bnRPbmx5OmJvb2xlYW4gPSBmYWxzZSk6IE9ic2VydmFibGU8YW55PiB7XHJcbiAgICByZXR1cm4gdGhpcy5odHRwLmdldChgJHt0aGlzLm1pbmRtYXBVUkx9L29wZW5tcnMvZ2V0Q29tcGxldGVkVmlzaXRzP3NwZWNpYWxpdHk9JHtzcGVjaWFsaXR5fSZwYWdlPSR7cGFnZX0mY291bnRPbmx5PSR7Y291bnRPbmx5fWApO1xyXG4gIH1cclxuXHJcbiAvKipcclxuICAqIEdldCBmb2xsb3cgdXAgdmlzaXRzXHJcbiAgKiBAcGFyYW0ge3N0cmluZ30gc3BlY2lhbGl0eSAtIFZpc2l0IHNwZWNpYWxpdHlcclxuICAqIEBwYXJhbSB7bnVtYmVyfSBwYWdlIC0gUGFnZSBudW1iZXJcclxuICAqIEByZXR1cm4ge09ic2VydmFibGU8YW55Pn1cclxuICAqL1xyXG4gZ2V0Rm9sbG93VXBWaXNpdHMoc3BlY2lhbGl0eTogc3RyaW5nLCBwYWdlOiBudW1iZXIgPSAxLCBjb3VudE9ubHk6Ym9vbGVhbiA9IGZhbHNlKTogT2JzZXJ2YWJsZTxhbnk+IHtcclxuICByZXR1cm4gdGhpcy5odHRwLmdldChgJHt0aGlzLm1pbmRtYXBVUkx9L29wZW5tcnMvZ2V0Rm9sbG93VXBWaXNpdHM/c3BlY2lhbGl0eT0ke3NwZWNpYWxpdHl9JnBhZ2U9JHtwYWdlfSZjb3VudE9ubHk9JHtjb3VudE9ubHl9YCk7XHJcbiB9XHJcblxyXG4gIC8qKlxyXG4gICogR2V0IGVuZGVkIHZpc2l0c1xyXG4gICogQHBhcmFtIHtzdHJpbmd9IHNwZWNpYWxpdHkgLSBWaXNpdCBzcGVjaWFsaXR5XHJcbiAgKiBAcGFyYW0ge251bWJlcn0gcGFnZSAtIFBhZ2UgbnVtYmVyXHJcbiAgKiBAcmV0dXJuIHtPYnNlcnZhYmxlPGFueT59XHJcbiAgKi9cclxuICBnZXRFbmRlZFZpc2l0cyhzcGVjaWFsaXR5OiBzdHJpbmcsIHBhZ2U6IG51bWJlciA9IDEpOiBPYnNlcnZhYmxlPGFueT4ge1xyXG4gICAgcmV0dXJuIHRoaXMuaHR0cC5nZXQoYCR7dGhpcy5taW5kbWFwVVJMfS9vcGVubXJzL2dldEVuZGVkVmlzaXRzP3NwZWNpYWxpdHk9JHtzcGVjaWFsaXR5fSZwYWdlPSR7cGFnZX1gKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFBvc3QgdmlzaXQgZGF0YSB0byBhYmRtXHJcbiAgICogQHBhcmFtIHthbnl9IGpzb24gLSBBdHRyaWJ1dGUgcGF5bG9hZFxyXG4gICAqIEByZXR1cm4ge09ic2VydmFibGU8YW55Pn1cclxuICAgKi9cclxuICBwb3N0VmlzaXRUb0FCRE0oanNvbjogYW55KTogT2JzZXJ2YWJsZTxhbnk+IHtcclxuICAgIGNvbnN0IHVybCA9IGAke3RoaXMuYmFzZVVSTEFiaGF9L2FiaGEvcG9zdC1jYXJlLWNvbnRleHRgXHJcbiAgICByZXR1cm4gdGhpcy5odHRwLnBvc3QodXJsLCBqc29uKTtcclxuICB9XHJcbn1cclxuIl19