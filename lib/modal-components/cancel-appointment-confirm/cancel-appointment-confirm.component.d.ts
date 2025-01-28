import { MatDialogRef } from '@angular/material/dialog';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
import { AppointmentService } from '../../services/appointment.service';
import * as i0 from "@angular/core";
export declare class CancelAppointmentConfirmComponent {
    data: any;
    private dialogRef;
    private appointmentService;
    private toastr;
    private translateService;
    constructor(data: any, dialogRef: MatDialogRef<CancelAppointmentConfirmComponent>, appointmentService: AppointmentService, toastr: ToastrService, translateService: TranslateService);
    /**
    * Cancel appointment
    * @return {void}
    */
    cancel(): void;
    /**
    * Get user uuid from localstorage user
    * @return {string} - User uuid
    */
    get userId(): any;
    /**
    * Close modal
    * @param {boolean} val - Dialog result
    * @return {void}
    */
    close(val: boolean): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<CancelAppointmentConfirmComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<CancelAppointmentConfirmComponent, "app-cancel-appointment-confirm", never, {}, {}, never, never, false>;
}
