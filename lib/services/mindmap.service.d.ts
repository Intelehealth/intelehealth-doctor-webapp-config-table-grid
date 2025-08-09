import { Observable } from "rxjs";
import { HttpClient } from "@angular/common/http";
import * as i0 from "@angular/core";
export declare class MindmapService {
    private http;
    private mindmapURL;
    constructor(http: HttpClient, environment: any);
    /**
    * Get mindmap keys
    * @return {Observable<any>}
    */
    getMindmapKey(): Observable<any>;
    /**
    * Post mindmap
    * @param {any} value - Payload for post mindmap
    * @return {Observable<any>}
    */
    postMindmap(value: any): Observable<any>;
    /**
    * Get mindmap details from key
    * @param {string} key - Mindmap key
    * @return {Observable<any>}
    */
    detailsMindmap(key: any): Observable<any>;
    /**
    * Add/update mindmap license key
    * @param {any} payload - Payload for mindmap key to add/update
    * @return {Observable<any>}
    */
    addUpdateLicenseKey(payload: any): Observable<any>;
    /**
    * Update mindmap key image
    * @param {string} key - Mindmap key
    * @param {string} imageName - Image name
    * @param {string} value - Image base64
    * @return {Observable<any>}
    */
    updateImage(key: any, imageName: any, value: any): Observable<any>;
    /**
    * Delete mindmap
    * @param {string} key - Mindmap key
    * @param {any} data - Mindmap data
    * @return {Observable<any>}
    */
    deleteMindmap(key: any, data: any): Observable<any>;
    /**
    * Toggle mindmap status
    * @param {any} data - Mindmap data
    * @return {Observable<any>}
    */
    toggleMindmapStatus(data: any): Observable<any>;
    /**
  * Notify App side
  * @param {any} hwUuid - Healthworker Id
  * @param {any} payload - Notifaication message
  * @return {Observable<any>}
  */
    notifyApp(hwUuid: any, payload: any): Observable<any>;
    /**
    * Send notification to health worker for available prescription
    * @returns {void}
    */
    notifyHwForRescheduleAppointment(appointment: any): void;
    /**
    * Send cancel notification to health worker
    * @returns {void}
    */
    notifyHwForCancelAppointment(appointment: any): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<MindmapService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<MindmapService>;
}
