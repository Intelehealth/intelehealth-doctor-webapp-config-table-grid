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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmlzaXQuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL2loLWxpYnJhcnkvc3JjL2xpYi9zZXJ2aWNlcy92aXNpdC5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxNQUFNLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ25ELE9BQU8sRUFBRSxVQUFVLEVBQUUsV0FBVyxFQUFFLE1BQU0sc0JBQXNCLENBQUM7QUFDL0QsT0FBTyxFQUFjLE9BQU8sRUFBRSxNQUFNLE1BQU0sQ0FBQzs7O0FBSzNDLE1BQU0sT0FBTyxZQUFZO0lBV2I7SUFWSCxrQkFBa0IsR0FBWSxLQUFLLENBQUM7SUFDcEMsZ0JBQWdCLEdBQVksS0FBSyxDQUFDO0lBQ2xDLGFBQWEsR0FBaUIsSUFBSSxPQUFPLEVBQUUsQ0FBQztJQUM1QyxXQUFXLENBQVM7SUFFbkIsT0FBTyxDQUFDO0lBQ1IsVUFBVSxDQUFDO0lBQ1gsV0FBVyxDQUFDO0lBRXBCLFlBQ1UsSUFBZ0IsRUFDRCxXQUFXO1FBRDFCLFNBQUksR0FBSixJQUFJLENBQVk7UUFHeEIsSUFBSSxDQUFDLE9BQU8sR0FBRyxXQUFXLENBQUMsT0FBTyxDQUFDO1FBQ25DLElBQUksQ0FBQyxVQUFVLEdBQUcsV0FBVyxDQUFDLFVBQVUsQ0FBQztRQUN6QyxJQUFJLENBQUMsV0FBVyxHQUFHLFdBQVcsQ0FBQyxXQUFXLENBQUM7SUFDN0MsQ0FBQztJQUVEOzs7O01BSUU7SUFDRixRQUFRLENBQUMsSUFBSTtRQUNYLDJDQUEyQztRQUMzQyxNQUFNLEdBQUcsR0FBRyxHQUFHLElBQUksQ0FBQyxPQUFPLFVBQVUsSUFBSSxnUkFBZ1IsQ0FBQztRQUMxVCxPQUFPLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBQzVCLENBQUM7SUFFRDs7OztNQUlFO0lBQ0YsWUFBWSxDQUFDLEVBQUU7UUFD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LE9BQWUsQ0FBQyxFQUFFLFlBQW9CLEtBQUs7UUFDaEYsT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxHQUFHLElBQUksQ0FBQyxVQUFVLHlDQUF5QyxVQUFVLFNBQVMsSUFBSSxjQUFjLFNBQVMsRUFBRSxDQUFDLENBQUM7SUFDbkksQ0FBQztJQUVBOzs7OztNQUtFO0lBQ0YsY0FBYyxDQUFDLFVBQWtCLEVBQUUsT0FBZSxDQUFDO1FBQ2pELE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsR0FBRyxJQUFJLENBQUMsVUFBVSxzQ0FBc0MsVUFBVSxTQUFTLElBQUksRUFBRSxDQUFDLENBQUM7SUFDMUcsQ0FBQztJQUVEOzs7O09BSUc7SUFDSCxlQUFlLENBQUMsSUFBUztRQUN2QixNQUFNLEdBQUcsR0FBRyxHQUFHLElBQUksQ0FBQyxXQUFXLHlCQUF5QixDQUFBO1FBQ3hELE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxFQUFFLElBQUksQ0FBQyxDQUFDO0lBQ25DLENBQUM7dUdBMVFVLFlBQVksNENBWWIsYUFBYTsyR0FaWixZQUFZLGNBRlgsTUFBTTs7MkZBRVAsWUFBWTtrQkFIeEIsVUFBVTttQkFBQztvQkFDVixVQUFVLEVBQUUsTUFBTTtpQkFDbkI7OzBCQWFJLE1BQU07MkJBQUMsYUFBYSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdCwgSW5qZWN0YWJsZSB9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XG5pbXBvcnQgeyBIdHRwQ2xpZW50LCBIdHRwSGVhZGVycyB9IGZyb20gXCJAYW5ndWxhci9jb21tb24vaHR0cFwiO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSwgU3ViamVjdCB9IGZyb20gXCJyeGpzXCI7XG5cbkBJbmplY3RhYmxlKHtcbiAgcHJvdmlkZWRJbjogXCJyb290XCIsXG59KVxuZXhwb3J0IGNsYXNzIFZpc2l0U2VydmljZSB7XG4gIHB1YmxpYyBpc1Zpc2l0U3VtbWFyeVNob3c6IGJvb2xlYW4gPSBmYWxzZTtcbiAgcHVibGljIGlzSGVscEJ1dHRvblNob3c6IGJvb2xlYW4gPSBmYWxzZTtcbiAgcHVibGljIHRyaWdnZXJBY3Rpb246IFN1YmplY3Q8YW55PiA9IG5ldyBTdWJqZWN0KCk7XG4gIHB1YmxpYyBjaGF0VmlzaXRJZDogc3RyaW5nO1xuXG4gIHByaXZhdGUgYmFzZVVSTDtcbiAgcHJpdmF0ZSBtaW5kbWFwVVJMO1xuICBwcml2YXRlIGJhc2VVUkxBYmhhO1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIHByaXZhdGUgaHR0cDogSHR0cENsaWVudCxcbiAgICBASW5qZWN0KCdlbnZpcm9ubWVudCcpIGVudmlyb25tZW50XG4gICkge1xuICAgIHRoaXMuYmFzZVVSTCA9IGVudmlyb25tZW50LmJhc2VVUkw7XG4gICAgdGhpcy5taW5kbWFwVVJMID0gZW52aXJvbm1lbnQubWluZG1hcFVSTDtcbiAgICB0aGlzLmJhc2VVUkxBYmhhID0gZW52aXJvbm1lbnQuYmFzZVVSTEFiaGE7XG4gIH1cblxuICAvKipcbiAgKiBHZXQgdmlzaXRcbiAgKiBAcGFyYW0ge3N0cmluZ30gdXVpZCAtIFZpc2l0IHV1aWRcbiAgKiBAcmV0dXJuIHtPYnNlcnZhYmxlPGFueT59XG4gICovXG4gIGdldFZpc2l0KHV1aWQpOiBPYnNlcnZhYmxlPGFueT4ge1xuICAgIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTptYXgtbGluZS1sZW5ndGhcbiAgICBjb25zdCB1cmwgPSBgJHt0aGlzLmJhc2VVUkx9L3Zpc2l0LyR7dXVpZH0/aW5jbHVkZUluYWN0aXZlPWZhbHNlJnY9Y3VzdG9tOih1dWlkLHBhdGllbnQ6KHV1aWQsaWRlbnRpZmllcnM6KGlkZW50aWZpZXIsaWRlbnRpZmllclR5cGU6KG5hbWUsdXVpZCxkaXNwbGF5KSkscGVyc29uOihkaXNwbGF5LGdlbmRlcixhZ2UsYmlydGhkYXRlKSksbG9jYXRpb246KGRpc3BsYXkpLGVuY291bnRlcnM6KGRpc3BsYXksZW5jb3VudGVyRGF0ZXRpbWUsdm9pZGVkLGVuY291bnRlclR5cGU6KGRpc3BsYXkpLGVuY291bnRlclByb3ZpZGVycyksYXR0cmlidXRlcylgO1xuICAgIHJldHVybiB0aGlzLmh0dHAuZ2V0KHVybCk7XG4gIH1cblxuICAvKipcbiAgKiBHZXQgdmlzaXRzIGZvciBhIHBhdGllbnRcbiAgKiBAcGFyYW0ge3N0cmluZ30gaWQgLSBQYXRpZW50IHV1aWRcbiAgKiBAcmV0dXJuIHtPYnNlcnZhYmxlPGFueT59XG4gICovXG4gIHJlY2VudFZpc2l0cyhpZCk6IE9ic2VydmFibGU8YW55PiB7XG4gICAgY29uc3QgdXJsID0gYCR7dGhpcy5iYXNlVVJMfS92aXNpdD9wYXRpZW50PSR7aWR9JnY9ZnVsbGA7XG4gICAgcmV0dXJuIHRoaXMuaHR0cC5nZXQodXJsKTtcbiAgfVxuXG4gIC8qKlxuICAqIEdldCB2aXNpdFxuICAqIEBwYXJhbSB7c3RyaW5nfSB1dWlkIC0gVmlzaXQgdXVpZFxuICAqIEBwYXJhbSB7c3RyaW5nfSB2IC0gcmVzcG9uc2UgdmVyc2lvbiBmb3JtYXRcbiAgKiBAcmV0dXJuIHtPYnNlcnZhYmxlPGFueT59XG4gICovXG4gIGZldGNoVmlzaXREZXRhaWxzKFxuICAgIFxuICAgIHV1aWQsXG4gICAgdiA9IFwiY3VzdG9tOihsb2NhdGlvbjooZGlzcGxheSksdXVpZCxkaXNwbGF5LHN0YXJ0RGF0ZXRpbWUsZGF0ZUNyZWF0ZWQsc3RvcERhdGV0aW1lLGVuY291bnRlcnM6KGRpc3BsYXksdXVpZCxlbmNvdW50ZXJEYXRldGltZSxlbmNvdW50ZXJUeXBlOihkaXNwbGF5KSxvYnM6KGRpc3BsYXksdXVpZCx2YWx1ZSxjb25jZXB0Oih1dWlkLGRpc3BsYXkpKSxlbmNvdW50ZXJQcm92aWRlcnM6KGRpc3BsYXkscHJvdmlkZXI6KHV1aWQsYXR0cmlidXRlcyxwZXJzb246KHV1aWQsZGlzcGxheSxnZW5kZXIsYWdlKSkpKSxwYXRpZW50Oih1dWlkLGlkZW50aWZpZXJzOihpZGVudGlmaWVyLGlkZW50aWZpZXJUeXBlOihuYW1lLHV1aWQsZGlzcGxheSkpLGF0dHJpYnV0ZXMscGVyc29uOihkaXNwbGF5LGdlbmRlcixhZ2UpKSxhdHRyaWJ1dGVzKVwiXG4gICk6IE9ic2VydmFibGU8YW55PiB7XG4gICAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOm1heC1saW5lLWxlbmd0aFxuICAgIGNvbnN0IHVybCA9IGAke3RoaXMuYmFzZVVSTH0vdmlzaXQvJHt1dWlkfT92PSR7dn1gO1xuICAgIHJldHVybiB0aGlzLmh0dHAuZ2V0KHVybCk7XG4gIH1cblxuICAvKipcbiAgKiBHZXQgdmlzaXRcbiAgKiBAcGFyYW0ge3N0cmluZ30gdXVpZCAtIFZpc2l0IHV1aWRcbiAgKiBAcGFyYW0ge3N0cmluZ30gdiAtIHJlc3BvbnNlIHZlcnNpb24gZm9ybWF0XG4gICogQHJldHVybiB7T2JzZXJ2YWJsZTxhbnk+fVxuICAqL1xuICBmZXRjaFZpc2l0RGV0YWlsczIoXG4gICAgZXh0ZXJuYWxQcmVzY3JpcHRpb25DcmVkOiBzdHJpbmcsXG4gICAgXG4gICAgdXVpZDogc3RyaW5nLFxuICAgIHY6IHN0cmluZyA9IFwiY3VzdG9tOihsb2NhdGlvbjooZGlzcGxheSksdXVpZCxkaXNwbGF5LHN0YXJ0RGF0ZXRpbWUsZGF0ZUNyZWF0ZWQsc3RvcERhdGV0aW1lLGVuY291bnRlcnM6KGRpc3BsYXksdXVpZCxlbmNvdW50ZXJEYXRldGltZSxlbmNvdW50ZXJUeXBlOihkaXNwbGF5KSxvYnM6KGRpc3BsYXksdXVpZCx2YWx1ZSxjb25jZXB0Oih1dWlkLGRpc3BsYXkpKSxlbmNvdW50ZXJQcm92aWRlcnM6KGRpc3BsYXkscHJvdmlkZXI6KHV1aWQsYXR0cmlidXRlcyxwZXJzb246KHV1aWQsZGlzcGxheSxnZW5kZXIsYWdlKSkpKSxwYXRpZW50Oih1dWlkLGlkZW50aWZpZXJzOihpZGVudGlmaWVyLGlkZW50aWZpZXJUeXBlOihuYW1lLHV1aWQsZGlzcGxheSkpLGF0dHJpYnV0ZXMscGVyc29uOihkaXNwbGF5LGdlbmRlcixhZ2UpKSxhdHRyaWJ1dGVzKVwiXG4gICk6IE9ic2VydmFibGU8YW55PiB7XG4gICAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOm1heC1saW5lLWxlbmd0aFxuICAgIGxldCBoZWFkZXJzOiBIdHRwSGVhZGVycyA9IG5ldyBIdHRwSGVhZGVycygpO1xuICAgIGhlYWRlcnMgPSBoZWFkZXJzLmFwcGVuZCgnQXV0aG9yaXphdGlvbicsICdCYXNpYyAnICsgZXh0ZXJuYWxQcmVzY3JpcHRpb25DcmVkKTtcbiAgICBjb25zdCB1cmwgPSBgJHt0aGlzLmJhc2VVUkx9L3Zpc2l0LyR7dXVpZH0/dj0ke3Z9YDtcbiAgICByZXR1cm4gdGhpcy5odHRwLmdldCh1cmwsIHsgaGVhZGVycyB9KTtcbiAgfVxuXG4gIC8qKlxuICAqIEdldCB2aXNpdFxuICAqIEBwYXJhbSB7c3RyaW5nfSB1dWlkIC0gVmlzaXQgdXVpZFxuICAqIEBwYXJhbSB7c3RyaW5nfSB2IC0gcmVzcG9uc2UgZm9ybWF0XG4gICogQHJldHVybiB7T2JzZXJ2YWJsZTxhbnk+fVxuICAqL1xuICBmZXRjaFZpc2l0UGF0aWVudChleHRlcm5hbFByZXNjcmlwdGlvbkNyZWQ6IHN0cmluZywgdXVpZDogc3RyaW5nLCB2OiBzdHJpbmcgPSBcImN1c3RvbToodXVpZCxwYXRpZW50OihhdHRyaWJ1dGVzLGlkZW50aWZpZXJzOihpZGVudGlmaWVyLGlkZW50aWZpZXJUeXBlOihuYW1lLHV1aWQsZGlzcGxheSkpKSlcIik6IE9ic2VydmFibGU8YW55PiB7XG4gICAgbGV0IGhlYWRlcnM6IEh0dHBIZWFkZXJzID0gbmV3IEh0dHBIZWFkZXJzKCk7XG4gICAgaGVhZGVycyA9IGhlYWRlcnMuYXBwZW5kKCdBdXRob3JpemF0aW9uJywgJ0Jhc2ljICcgKyBleHRlcm5hbFByZXNjcmlwdGlvbkNyZWQpO1xuICAgIGNvbnN0IHVybCA9IGAke3RoaXMuYmFzZVVSTH0vdmlzaXQvJHt1dWlkfT92PSR7dn1gO1xuICAgIHJldHVybiB0aGlzLmh0dHAuZ2V0KHVybCwgeyBoZWFkZXJzIH0pO1xuICB9XG5cbiAgLyoqXG4gICogR2V0IHZpc2l0XG4gICogQHBhcmFtIHtzdHJpbmd9IHV1aWQgLSBWaXNpdCB1dWlkXG4gICogQHBhcmFtIHtzdHJpbmd9IHYgLSByZXNwb25zZSB2ZXJzaW9uIGZvcm1hdFxuICAqIEByZXR1cm4ge09ic2VydmFibGU8YW55Pn1cbiAgKi9cbiAgZ2V0VmlzaXREZXRhaWxzKFxuICAgIFxuICAgIHV1aWQ6IHN0cmluZyxcbiAgICB2OiBzdHJpbmcgPSBcImN1c3RvbToobG9jYXRpb246KGRpc3BsYXkpLHV1aWQsZGlzcGxheSxzdGFydERhdGV0aW1lLHN0b3BEYXRldGltZSxlbmNvdW50ZXJzOihkaXNwbGF5LHV1aWQsZW5jb3VudGVyRGF0ZXRpbWUsZW5jb3VudGVyVHlwZTooZGlzcGxheSksb2JzOihkaXNwbGF5LHV1aWQsdmFsdWUpLGVuY291bnRlclByb3ZpZGVyczooZGlzcGxheSxwcm92aWRlcjoodXVpZCxwZXJzb246KHV1aWQsZGlzcGxheSxnZW5kZXIsYWdlKSxhdHRyaWJ1dGVzKSkpLHBhdGllbnQ6KHV1aWQsaWRlbnRpZmllcnM6KGlkZW50aWZpZXIsaWRlbnRpZmllclR5cGU6KG5hbWUsdXVpZCxkaXNwbGF5KSkscGVyc29uOihkaXNwbGF5LGdlbmRlcixhZ2UpKSlcIlxuICApOiBPYnNlcnZhYmxlPGFueT4ge1xuICAgIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTptYXgtbGluZS1sZW5ndGhcbiAgICBjb25zdCB1cmwgPSBgJHt0aGlzLmJhc2VVUkx9L3Zpc2l0LyR7dXVpZH0/dj0ke3Z9YDtcbiAgICByZXR1cm4gdGhpcy5odHRwLmdldCh1cmwpO1xuICB9XG5cbiAgLyoqXG4gICogR2V0IHZpc2l0IGF0dHJpYnV0ZXNcbiAgKiBAcGFyYW0ge3N0cmluZ30gdmlzaXRJZCAtIFZpc2l0IHV1aWRcbiAgKiBAcmV0dXJuIHtPYnNlcnZhYmxlPGFueT59XG4gICovXG4gIGdldEF0dHJpYnV0ZSh2aXNpdElkKTogT2JzZXJ2YWJsZTxhbnk+IHtcbiAgICBjb25zdCB1cmwgPSBgJHt0aGlzLmJhc2VVUkx9L3Zpc2l0LyR7dmlzaXRJZH0vYXR0cmlidXRlYDtcbiAgICByZXR1cm4gdGhpcy5odHRwLmdldCh1cmwpO1xuICB9XG5cbiAgLyoqXG4gICogUG9zdCB2aXNpdCBhdHRyaWJ1dGVcbiAgKiBAcGFyYW0ge3N0cmluZ30gdmlzaXRJZCAtIFZpc2l0IHV1aWRcbiAgKiBAcGFyYW0ge2FueX0ganNvbiAtIEF0dHJpYnV0ZSBwYXlsb2FkXG4gICogQHJldHVybiB7T2JzZXJ2YWJsZTxhbnk+fVxuICAqL1xuICBwb3N0QXR0cmlidXRlKHZpc2l0SWQsIGpzb24pOiBPYnNlcnZhYmxlPGFueT4ge1xuICAgIGNvbnN0IHVybCA9IGAke3RoaXMuYmFzZVVSTH0vdmlzaXQvJHt2aXNpdElkfS9hdHRyaWJ1dGVgO1xuICAgIHJldHVybiB0aGlzLmh0dHAucG9zdCh1cmwsIGpzb24pO1xuICB9XG5cbiAgLyoqXG4gICogVXBkYXRlIHZpc2l0IGF0dHJpYnV0ZVxuICAqIEBwYXJhbSB7c3RyaW5nfSB2aXNpdElkIC0gVmlzaXQgdXVpZFxuICAqIEBwYXJhbSB7c3RyaW5nfSBhdHRyaWJ1dGVVdWlkIC0gVmlzaXQgYXR0cmlidXRlIHV1aWRcbiAgKiBAcGFyYW0ge2FueX0ganNvbiAtIEF0dHJpYnV0ZSBwYXlsb2FkXG4gICogQHJldHVybiB7T2JzZXJ2YWJsZTxhbnk+fVxuICAqL1xuICB1cGRhdGVBdHRyaWJ1dGUodmlzaXRJZCwgYXR0cmlidXRlVXVpZCwganNvbik6IE9ic2VydmFibGU8YW55PiB7XG4gICAgY29uc3QgdXJsID0gYCR7dGhpcy5iYXNlVVJMfS92aXNpdC8ke3Zpc2l0SWR9L2F0dHJpYnV0ZS8ke2F0dHJpYnV0ZVV1aWR9YDtcbiAgICByZXR1cm4gdGhpcy5odHRwLnBvc3QodXJsLCBqc29uKTtcbiAgfVxuXG4gIC8qKlxuICAqIERlbGV0ZSB2aXNpdCBhdHRyaWJ1dGVcbiAgKiBAcGFyYW0ge3N0cmluZ30gdmlzaXRJZCAtIFZpc2l0IHV1aWRcbiAgKiBAcGFyYW0ge3N0cmluZ30gdXVpZCAtIFZpc2l0IGF0dHJpYnV0ZSB1dWlkXG4gICogQHJldHVybiB7T2JzZXJ2YWJsZTxhbnk+fVxuICAqL1xuICBkZWxldGVBdHRyaWJ1dGUodmlzaXRJZCwgdXVpZCk6IE9ic2VydmFibGU8YW55PiB7XG4gICAgY29uc3QgdXJsID0gYCR7dGhpcy5iYXNlVVJMfS92aXNpdC8ke3Zpc2l0SWR9L2F0dHJpYnV0ZS8ke3V1aWR9YDtcbiAgICByZXR1cm4gdGhpcy5odHRwLmRlbGV0ZSh1cmwpO1xuICB9XG5cbiAgLyoqXG4gICogR2V0IHBhdGllbnQgZGV0YWlsc1xuICAqIEBwYXJhbSB7c3RyaW5nfSBpZCAtIFBhdGllbnQgdXVpZFxuICAqIEBwYXJhbSB7c3RyaW5nfSB2IC0gcmVzcG9uc2UgZm9ybWF0XG4gICogQHJldHVybiB7T2JzZXJ2YWJsZTxhbnk+fVxuICAqL1xuICBwYXRpZW50SW5mbyhpZCwgdiA9ICdjdXN0b206KHV1aWQsYXR0cmlidXRlcyxpZGVudGlmaWVycyxwZXJzb246KHV1aWQsZGlzcGxheSxnZW5kZXIscHJlZmVycmVkTmFtZTooZ2l2ZW5OYW1lLGZhbWlseU5hbWUsbWlkZGxlTmFtZSksYmlydGhkYXRlLGFnZSxwcmVmZXJyZWRBZGRyZXNzOihjaXR5VmlsbGFnZSxhZGRyZXNzMSxhZGRyZXNzMixjb3VudHJ5LHN0YXRlUHJvdmluY2UsY291bnR5RGlzdHJpY3QscG9zdGFsQ29kZSksYXR0cmlidXRlczoodmFsdWUsYXR0cmlidXRlVHlwZTooZGlzcGxheSkpKSknKTogT2JzZXJ2YWJsZTxhbnk+IHtcbiAgICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6IG1heC1saW5lLWxlbmd0aFxuICAgIGNvbnN0IHVybCA9IGAke3RoaXMuYmFzZVVSTH0vcGF0aWVudC8ke2lkfT92PSR7dn1gO1xuICAgIHJldHVybiB0aGlzLmh0dHAuZ2V0KHVybCk7XG4gIH1cblxuICAvKipcbiAgKiBHZXQgd2hhdHNhcHAgbGlua1xuICAqIEBwYXJhbSB7c3RyaW5nfSB3aGF0c2FwcCAtIFdoYXRzcHAgbnVtYmVyXG4gICogQHBhcmFtIHtzdHJpbmd9IG1zZyAtIE1lc3NhZ2UgdG8gYmUgc2VudFxuICAqIEByZXR1cm4ge09ic2VydmFibGU8YW55Pn1cbiAgKi9cbiAgZ2V0V2hhdHNhcHBMaW5rKHdoYXRzYXBwOiBzdHJpbmcsIG1zZzogc3RyaW5nID0gYEhlbGxvIEknbSBjYWxsaW5nIGZvciBjb25zdWx0YXRpb25gKSB7XG4gICAgbGV0IHRleHQgPSBlbmNvZGVVUkkobXNnKTtcbiAgICBsZXQgd2hhdHNhcHBMaW5rID0gYGh0dHBzOi8vd2EubWUvJHt3aGF0c2FwcH0/dGV4dD0ke3RleHR9YDtcbiAgICByZXR1cm4gd2hhdHNhcHBMaW5rO1xuICB9XG5cbiAgLyoqXG4gICogUGFyc2Ugb2JzZXJ2YXRpb24gZGF0YVxuICAqIEBwYXJhbSB7YW55fSBkYXRhIC0gT2JzZXJ2YXRpb24gZGF0YVxuICAqIEByZXR1cm4ge2FueX0gLSBPYnNlcnZhdGlvbiBkYXRhIHdpdGggcGFyc2VkIHZhbHVlXG4gICovXG4gIGdldERhdGEoZGF0YTogYW55KSB7XG4gICAgaWYgKGRhdGE/LnZhbHVlLnRvU3RyaW5nKCkuc3RhcnRzV2l0aChcIntcIikpIHtcbiAgICAgIGxldCB2YWx1ZSA9IEpTT04ucGFyc2UoZGF0YS52YWx1ZS50b1N0cmluZygpKTtcbiAgICAgIGRhdGEudmFsdWUgPSB2YWx1ZVtcImVuXCJdO1xuICAgIH1cbiAgICByZXR1cm4gZGF0YTtcbiAgfVxuXG4gIC8qKlxuICAqIFBhcnNlIGN1c3RvbSBvYnNlcnZhdGlvbiBkYXRhXG4gICogQHBhcmFtIHthbnl9IGRhdGEgLSBDdXN0b20gb2JzZXJ2YXRpb24gZGF0YVxuICAqIEByZXR1cm4ge2FueX0gLSBPYnNlcnZhdGlvbiBkYXRhIHdpdGggcGFyc2VkIHZhbHVlXG4gICovXG4gIGdldERhdGEyKGRhdGE6IGFueSkge1xuICAgIGlmIChkYXRhPy52YWx1ZV90ZXh0LnRvU3RyaW5nKCkuc3RhcnRzV2l0aChcIntcIikpIHtcbiAgICAgIGxldCB2YWx1ZSA9IEpTT04ucGFyc2UoZGF0YS52YWx1ZV90ZXh0LnRvU3RyaW5nKCkpO1xuICAgICAgZGF0YS52YWx1ZV90ZXh0ID0gdmFsdWVbXCJlblwiXTtcbiAgICB9XG4gICAgcmV0dXJuIGRhdGE7XG4gIH1cblxuICAvKipcbiAgKiBHZXQgYXdhaXRpbmcgdmlzaXRzXG4gICogQHBhcmFtIHtzdHJpbmd9IHNwZWNpYWxpdHkgLSBWaXNpdCBzcGVjaWFsaXR5XG4gICogQHBhcmFtIHtudW1iZXJ9IHBhZ2UgLSBQYWdlIG51bWJlclxuICAqIEByZXR1cm4ge09ic2VydmFibGU8YW55Pn1cbiAgKi9cbiAgZ2V0QXdhaXRpbmdWaXNpdHMoc3BlY2lhbGl0eTogc3RyaW5nLCBwYWdlOiBudW1iZXIgPSAxKTogT2JzZXJ2YWJsZTxhbnk+IHtcbiAgICByZXR1cm4gdGhpcy5odHRwLmdldChgJHt0aGlzLm1pbmRtYXBVUkx9L29wZW5tcnMvZ2V0QXdhaXRpbmdWaXNpdHM/c3BlY2lhbGl0eT0ke3NwZWNpYWxpdHl9JnBhZ2U9JHtwYWdlfWApO1xuICB9XG5cbiAgLyoqXG4gICogR2V0IHByaW9yaXR5IHZpc2l0c1xuICAqIEBwYXJhbSB7c3RyaW5nfSBzcGVjaWFsaXR5IC0gVmlzaXQgc3BlY2lhbGl0eVxuICAqIEBwYXJhbSB7bnVtYmVyfSBwYWdlIC0gUGFnZSBudW1iZXJcbiAgKiBAcmV0dXJuIHtPYnNlcnZhYmxlPGFueT59XG4gICovXG4gIGdldFByaW9yaXR5VmlzaXRzKHNwZWNpYWxpdHk6IHN0cmluZywgcGFnZTogbnVtYmVyID0gMSk6IE9ic2VydmFibGU8YW55PiB7XG4gICAgcmV0dXJuIHRoaXMuaHR0cC5nZXQoYCR7dGhpcy5taW5kbWFwVVJMfS9vcGVubXJzL2dldFByaW9yaXR5VmlzaXRzP3NwZWNpYWxpdHk9JHtzcGVjaWFsaXR5fSZwYWdlPSR7cGFnZX1gKTtcbiAgfVxuXG4gIC8qKlxuICAqIEdldCBpbnByb2dyZXNzIHZpc2l0c1xuICAqIEBwYXJhbSB7c3RyaW5nfSBzcGVjaWFsaXR5IC0gVmlzaXQgc3BlY2lhbGl0eVxuICAqIEBwYXJhbSB7bnVtYmVyfSBwYWdlIC0gUGFnZSBudW1iZXJcbiAgKiBAcmV0dXJuIHtPYnNlcnZhYmxlPGFueT59XG4gICovXG4gIGdldEluUHJvZ3Jlc3NWaXNpdHMoc3BlY2lhbGl0eTogc3RyaW5nLCBwYWdlOiBudW1iZXIgPSAxKTogT2JzZXJ2YWJsZTxhbnk+IHtcbiAgICByZXR1cm4gdGhpcy5odHRwLmdldChgJHt0aGlzLm1pbmRtYXBVUkx9L29wZW5tcnMvZ2V0SW5Qcm9ncmVzc1Zpc2l0cz9zcGVjaWFsaXR5PSR7c3BlY2lhbGl0eX0mcGFnZT0ke3BhZ2V9YCk7XG4gIH1cblxuICAvKipcbiAgKiBHZXQgY29tcGxldGVkIHZpc2l0c1xuICAqIEBwYXJhbSB7c3RyaW5nfSBzcGVjaWFsaXR5IC0gVmlzaXQgc3BlY2lhbGl0eVxuICAqIEBwYXJhbSB7bnVtYmVyfSBwYWdlIC0gUGFnZSBudW1iZXJcbiAgKiBAcmV0dXJuIHtPYnNlcnZhYmxlPGFueT59XG4gICovXG4gIGdldENvbXBsZXRlZFZpc2l0cyhzcGVjaWFsaXR5OiBzdHJpbmcsIHBhZ2U6IG51bWJlciA9IDEsIGNvdW50T25seTpib29sZWFuID0gZmFsc2UpOiBPYnNlcnZhYmxlPGFueT4ge1xuICAgIHJldHVybiB0aGlzLmh0dHAuZ2V0KGAke3RoaXMubWluZG1hcFVSTH0vb3Blbm1ycy9nZXRDb21wbGV0ZWRWaXNpdHM/c3BlY2lhbGl0eT0ke3NwZWNpYWxpdHl9JnBhZ2U9JHtwYWdlfSZjb3VudE9ubHk9JHtjb3VudE9ubHl9YCk7XG4gIH1cblxuIC8qKlxuICAqIEdldCBmb2xsb3cgdXAgdmlzaXRzXG4gICogQHBhcmFtIHtzdHJpbmd9IHNwZWNpYWxpdHkgLSBWaXNpdCBzcGVjaWFsaXR5XG4gICogQHBhcmFtIHtudW1iZXJ9IHBhZ2UgLSBQYWdlIG51bWJlclxuICAqIEByZXR1cm4ge09ic2VydmFibGU8YW55Pn1cbiAgKi9cbiBnZXRGb2xsb3dVcFZpc2l0cyhzcGVjaWFsaXR5OiBzdHJpbmcsIHBhZ2U6IG51bWJlciA9IDEsIGNvdW50T25seTpib29sZWFuID0gZmFsc2UpOiBPYnNlcnZhYmxlPGFueT4ge1xuICByZXR1cm4gdGhpcy5odHRwLmdldChgJHt0aGlzLm1pbmRtYXBVUkx9L29wZW5tcnMvZ2V0Rm9sbG93VXBWaXNpdHM/c3BlY2lhbGl0eT0ke3NwZWNpYWxpdHl9JnBhZ2U9JHtwYWdlfSZjb3VudE9ubHk9JHtjb3VudE9ubHl9YCk7XG4gfVxuXG4gIC8qKlxuICAqIEdldCBlbmRlZCB2aXNpdHNcbiAgKiBAcGFyYW0ge3N0cmluZ30gc3BlY2lhbGl0eSAtIFZpc2l0IHNwZWNpYWxpdHlcbiAgKiBAcGFyYW0ge251bWJlcn0gcGFnZSAtIFBhZ2UgbnVtYmVyXG4gICogQHJldHVybiB7T2JzZXJ2YWJsZTxhbnk+fVxuICAqL1xuICBnZXRFbmRlZFZpc2l0cyhzcGVjaWFsaXR5OiBzdHJpbmcsIHBhZ2U6IG51bWJlciA9IDEpOiBPYnNlcnZhYmxlPGFueT4ge1xuICAgIHJldHVybiB0aGlzLmh0dHAuZ2V0KGAke3RoaXMubWluZG1hcFVSTH0vb3Blbm1ycy9nZXRFbmRlZFZpc2l0cz9zcGVjaWFsaXR5PSR7c3BlY2lhbGl0eX0mcGFnZT0ke3BhZ2V9YCk7XG4gIH1cblxuICAvKipcbiAgICogUG9zdCB2aXNpdCBkYXRhIHRvIGFiZG1cbiAgICogQHBhcmFtIHthbnl9IGpzb24gLSBBdHRyaWJ1dGUgcGF5bG9hZFxuICAgKiBAcmV0dXJuIHtPYnNlcnZhYmxlPGFueT59XG4gICAqL1xuICBwb3N0VmlzaXRUb0FCRE0oanNvbjogYW55KTogT2JzZXJ2YWJsZTxhbnk+IHtcbiAgICBjb25zdCB1cmwgPSBgJHt0aGlzLmJhc2VVUkxBYmhhfS9hYmhhL3Bvc3QtY2FyZS1jb250ZXh0YFxuICAgIHJldHVybiB0aGlzLmh0dHAucG9zdCh1cmwsIGpzb24pO1xuICB9XG59XG4iXX0=