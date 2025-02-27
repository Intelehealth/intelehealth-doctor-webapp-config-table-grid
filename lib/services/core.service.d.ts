import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs/internal/Observable';
import * as i0 from "@angular/core";
export declare class CoreService {
    private dialog;
    constructor(dialog: MatDialog);
    /**
    * Open cancel appointment confirmation modal
    * @param {any} data - Dialog data
    * @return {Observable<any>} - Dialog result
    */
    openConfirmCancelAppointmentModal(data: any): Observable<any>;
    /**
    * Open reschedule appointment modal
    * @param {any} data - Dialog data
    * @return {Observable<any>} - Dialog result
    */
    openRescheduleAppointmentModal(data: any): Observable<any>;
    /**
    * Open reschedule appointment confirmation modal
    * @param {any} data - Dialog data
    * @return {Observable<any>} - Dialog result
    */
    openRescheduleAppointmentConfirmModal(data: any): Observable<any>;
    /**
    * Convert blob to base64
    * @param {Blob} blob - Blob  file
    * @return {Promise} - Promise containing base64
    */
    blobToBase64(blob: any): Promise<unknown>;
    static ɵfac: i0.ɵɵFactoryDeclaration<CoreService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<CoreService>;
}
