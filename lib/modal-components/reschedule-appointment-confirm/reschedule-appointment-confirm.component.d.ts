import { MatDialogRef } from '@angular/material/dialog';
import * as i0 from "@angular/core";
export declare class RescheduleAppointmentConfirmComponent {
    data: any;
    private dialogRef;
    constructor(data: any, dialogRef: MatDialogRef<RescheduleAppointmentConfirmComponent>);
    /**
    * Close modal
    * @param {boolean} val - Dialog result
    * @return {void}
    */
    close(val: boolean): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<RescheduleAppointmentConfirmComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<RescheduleAppointmentConfirmComponent, "app-reschedule-appointment-confirm", never, {}, {}, never, never, false>;
}
