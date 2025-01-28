import { Observable } from "rxjs";
import { HttpClient } from "@angular/common/http";
import * as i0 from "@angular/core";
export declare class MindmapService {
    private http;
    constructor(http: HttpClient);
    /**
    * Get mindmap keys
    * @return {Observable<any>}
    */
    getMindmapKey(baseURL: string): Observable<any>;
    /**
    * Post mindmap
    * @param {any} value - Payload for post mindmap
    * @return {Observable<any>}
    */
    postMindmap(baseURL: string, value: any): Observable<any>;
    /**
    * Get mindmap details from key
    * @param {string} key - Mindmap key
    * @return {Observable<any>}
    */
    detailsMindmap(baseURL: string, key: any): Observable<any>;
    /**
    * Add/update mindmap license key
    * @param {any} payload - Payload for mindmap key to add/update
    * @return {Observable<any>}
    */
    addUpdateLicenseKey(baseURL: string, payload: any): Observable<any>;
    /**
    * Update mindmap key image
    * @param {string} key - Mindmap key
    * @param {string} imageName - Image name
    * @param {string} value - Image base64
    * @return {Observable<any>}
    */
    updateImage(baseURL: string, key: any, imageName: any, value: any): Observable<any>;
    /**
    * Delete mindmap
    * @param {string} key - Mindmap key
    * @param {any} data - Mindmap data
    * @return {Observable<any>}
    */
    deleteMindmap(baseURL: string, key: any, data: any): Observable<any>;
    /**
    * Toggle mindmap status
    * @param {any} data - Mindmap data
    * @return {Observable<any>}
    */
    toggleMindmapStatus(baseURL: string, data: any): Observable<any>;
    /**
  * Notify App side
  * @param {any} hwUuid - Healthworker Id
  * @param {any} payload - Notifaication message
  * @return {Observable<any>}
  */
    notifyApp(baseURL: string, hwUuid: any, payload: any): Observable<any>;
    /**
    * Send notification to health worker for available prescription
    * @returns {void}
    */
    notifyHwForRescheduleAppointment(baseURL: string, appointment: any): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<MindmapService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<MindmapService>;
}
