import { OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
import { RescheduleAppointmentModalResponseModel, ScheduleDataModel, SlotModel } from '../../model/model';
import { AppointmentService } from '../../services/appointment.service';
import * as i0 from "@angular/core";
export declare const PICK_FORMATS: {
    parse: {
        dateInput: {
            month: string;
            year: string;
            day: string;
        };
    };
    display: {
        dateInput: string;
        monthYearLabel: {
            year: string;
            month: string;
        };
        dateA11yLabel: {
            year: string;
            month: string;
            day: string;
        };
        monthYearA11yLabel: {
            year: string;
            month: string;
        };
    };
};
export declare class RescheduleAppointmentComponent implements OnInit {
    data: any;
    private dialogRef;
    private appointmentService;
    private toastr;
    private translate;
    minDate: Date;
    scheduleData: ScheduleDataModel;
    selectedDate: string;
    slots: SlotModel[];
    selectedSlot: SlotModel;
    constructor(data: any, dialogRef: MatDialogRef<RescheduleAppointmentComponent>, appointmentService: AppointmentService, toastr: ToastrService, translate: TranslateService);
    ngOnInit(): void;
    /**
    * Callback for date change event
    * @param {Event} event - Date changed event
    * @return {void}
    */
    dateChanged(event: any): void;
    /**
    * Get appointment slots for a given speciality, from and to date
    * @param {string} fromDate - From date
    * @param {string} toDate - To date
    * @param {string} speciality - Speciality
    * @return {void}
    */
    getAppointmentSlots(fromDate?: string, toDate?: string, speciality?: any): void;
    /**
    * Reschedule appointment
    * @return {void}
    */
    reschedule(): void;
    /**
    * Close modal
    * @param {boolean|RescheduleAppointmentModalResponseModel} val - Dialog result
    * @return {void}
    */
    close(val: boolean | RescheduleAppointmentModalResponseModel): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<RescheduleAppointmentComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<RescheduleAppointmentComponent, "app-reschedule-appointment", never, {}, {}, never, never, false>;
}
