import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
import { AppointmentService } from '../../services/appointment.service';
import { getCacheData } from '../../utils/utility-functions';
import { doctorDetails } from '../../config/constant';
import { MindmapService } from '../../services/mindmap.service';
import * as i0 from "@angular/core";
import * as i1 from "@angular/material/dialog";
import * as i2 from "../../services/appointment.service";
import * as i3 from "ngx-toastr";
import * as i4 from "@ngx-translate/core";
import * as i5 from "../../services/mindmap.service";
import * as i6 from "@angular/common";
export class CancelAppointmentConfirmComponent {
    data;
    dialogRef;
    appointmentService;
    toastr;
    translateService;
    mindmapService;
    constructor(data, dialogRef, appointmentService, toastr, translateService, mindmapService) {
        this.data = data;
        this.dialogRef = dialogRef;
        this.appointmentService = appointmentService;
        this.toastr = toastr;
        this.translateService = translateService;
        this.mindmapService = mindmapService;
    }
    /**
    * Cancel appointment
    * @return {void}
    */
    cancel() {
        const payload = {
            id: this.data.id,
            visitUuid: this.data.visitUuid,
            hwUUID: this.userId,
        };
        this.appointmentService.cancelAppointment(payload).subscribe((res) => {
            if (res) {
                if (res.status) {
                    this.mindmapService.notifyHwForCancelAppointment(this.data);
                    this.close(true);
                }
                else {
                    this.toastr.error(this.translateService.instant('You can\'t cancel the past appointment'), this.translateService.instant('Can\'t Cancel'));
                    this.close(false);
                }
            }
        });
    }
    /**
    * Get user uuid from localstorage user
    * @return {string} - User uuid
    */
    get userId() {
        return getCacheData(true, doctorDetails.USER).uuid;
    }
    /**
    * Close modal
    * @param {boolean} val - Dialog result
    * @return {void}
    */
    close(val) {
        this.dialogRef.close(val);
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.3.0", ngImport: i0, type: CancelAppointmentConfirmComponent, deps: [{ token: MAT_DIALOG_DATA }, { token: i1.MatDialogRef }, { token: i2.AppointmentService }, { token: i3.ToastrService }, { token: i4.TranslateService }, { token: i5.MindmapService }], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "14.3.0", type: CancelAppointmentConfirmComponent, selector: "app-cancel-appointment-confirm", ngImport: i0, template: "<div class=\"intel-con-modal\">\r\n  <div class=\"close-btn-con\">\r\n    <button class=\"modal-close-btn\" (click)=\"close(false)\"><img src=\"assets/svgs/CloseX.svg\" alt=\"\" data-test-id=\"btnCloseCancelAppConfirm\"></button>\r\n  </div>\r\n  <div class=\"modal-con mt-4\">\r\n    <img src=\"assets/svgs/video-pink.svg\" alt=\"\" width=\"80px\" height=\"80px\">\r\n    <h6 class=\"mt-3\">{{'Cancel the appointment'|translate}}</h6>\r\n    <p class=\"mt-2 text-center\">{{'Are you sure you want to cancel your appointment on'|translate}} <b>{{data?.slotJsDate|date:'dd MMMM'}}</b> {{'at'|translate}} <b>{{data?.slotTime}}</b>?</p>\r\n  </div>\r\n  <div class=\"modal-action-btn-con\">\r\n    <button class=\"modal-btn white-btn mr-3\" type=\"button\" (click)=\"close(false)\" data-test-id=\"btnGoBackCancelAppConfirm\">{{'Go back'|translate}}</button>\r\n    <button class=\"modal-btn blue-btn\" type=\"button\" (click)=\"cancel()\" data-test-id=\"btnCancelAppConfirm\">{{'Cancel'|translate}}</button>\r\n  </div>\r\n</div>\r\n", dependencies: [{ kind: "pipe", type: i6.DatePipe, name: "date" }, { kind: "pipe", type: i4.TranslatePipe, name: "translate" }] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.3.0", ngImport: i0, type: CancelAppointmentConfirmComponent, decorators: [{
            type: Component,
            args: [{ selector: 'app-cancel-appointment-confirm', template: "<div class=\"intel-con-modal\">\r\n  <div class=\"close-btn-con\">\r\n    <button class=\"modal-close-btn\" (click)=\"close(false)\"><img src=\"assets/svgs/CloseX.svg\" alt=\"\" data-test-id=\"btnCloseCancelAppConfirm\"></button>\r\n  </div>\r\n  <div class=\"modal-con mt-4\">\r\n    <img src=\"assets/svgs/video-pink.svg\" alt=\"\" width=\"80px\" height=\"80px\">\r\n    <h6 class=\"mt-3\">{{'Cancel the appointment'|translate}}</h6>\r\n    <p class=\"mt-2 text-center\">{{'Are you sure you want to cancel your appointment on'|translate}} <b>{{data?.slotJsDate|date:'dd MMMM'}}</b> {{'at'|translate}} <b>{{data?.slotTime}}</b>?</p>\r\n  </div>\r\n  <div class=\"modal-action-btn-con\">\r\n    <button class=\"modal-btn white-btn mr-3\" type=\"button\" (click)=\"close(false)\" data-test-id=\"btnGoBackCancelAppConfirm\">{{'Go back'|translate}}</button>\r\n    <button class=\"modal-btn blue-btn\" type=\"button\" (click)=\"cancel()\" data-test-id=\"btnCancelAppConfirm\">{{'Cancel'|translate}}</button>\r\n  </div>\r\n</div>\r\n" }]
        }], ctorParameters: function () { return [{ type: undefined, decorators: [{
                    type: Inject,
                    args: [MAT_DIALOG_DATA]
                }] }, { type: i1.MatDialogRef }, { type: i2.AppointmentService }, { type: i3.ToastrService }, { type: i4.TranslateService }, { type: i5.MindmapService }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2FuY2VsLWFwcG9pbnRtZW50LWNvbmZpcm0uY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvaWgtbGlicmFyeS9zcmMvbGliL21vZGFsLWNvbXBvbmVudHMvY2FuY2VsLWFwcG9pbnRtZW50LWNvbmZpcm0vY2FuY2VsLWFwcG9pbnRtZW50LWNvbmZpcm0uY29tcG9uZW50LnRzIiwiLi4vLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvaWgtbGlicmFyeS9zcmMvbGliL21vZGFsLWNvbXBvbmVudHMvY2FuY2VsLWFwcG9pbnRtZW50LWNvbmZpcm0vY2FuY2VsLWFwcG9pbnRtZW50LWNvbmZpcm0uY29tcG9uZW50Lmh0bWwiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxNQUFNLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDbEQsT0FBTyxFQUFFLFlBQVksRUFBRSxlQUFlLEVBQUUsTUFBTSwwQkFBMEIsQ0FBQztBQUN6RSxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSxxQkFBcUIsQ0FBQztBQUN2RCxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sWUFBWSxDQUFDO0FBRTNDLE9BQU8sRUFBRSxrQkFBa0IsRUFBRSxNQUFNLG9DQUFvQyxDQUFDO0FBQ3hFLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSwrQkFBK0IsQ0FBQztBQUM3RCxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sdUJBQXVCLENBQUM7QUFDdEQsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLGdDQUFnQyxDQUFDOzs7Ozs7OztBQU1oRSxNQUFNLE9BQU8saUNBQWlDO0lBRUE7SUFDbEM7SUFDQTtJQUNBO0lBQ0E7SUFDQztJQUxYLFlBQTRDLElBQUksRUFDdEMsU0FBMEQsRUFDMUQsa0JBQXNDLEVBQ3RDLE1BQXFCLEVBQ3JCLGdCQUFrQyxFQUNqQyxjQUE4QjtRQUxHLFNBQUksR0FBSixJQUFJLENBQUE7UUFDdEMsY0FBUyxHQUFULFNBQVMsQ0FBaUQ7UUFDMUQsdUJBQWtCLEdBQWxCLGtCQUFrQixDQUFvQjtRQUN0QyxXQUFNLEdBQU4sTUFBTSxDQUFlO1FBQ3JCLHFCQUFnQixHQUFoQixnQkFBZ0IsQ0FBa0I7UUFDakMsbUJBQWMsR0FBZCxjQUFjLENBQWdCO0lBQ3JDLENBQUM7SUFFTDs7O01BR0U7SUFDRixNQUFNO1FBQ0osTUFBTSxPQUFPLEdBQUc7WUFDZCxFQUFFLEVBQUUsSUFBSSxDQUFDLElBQUksQ0FBQyxFQUFFO1lBQ2hCLFNBQVMsRUFBRSxJQUFJLENBQUMsSUFBSSxDQUFDLFNBQVM7WUFDOUIsTUFBTSxFQUFFLElBQUksQ0FBQyxNQUFNO1NBQ3BCLENBQUM7UUFDRixJQUFJLENBQUMsa0JBQWtCLENBQUMsaUJBQWlCLENBQUMsT0FBTyxDQUFDLENBQUMsU0FBUyxDQUFDLENBQUMsR0FBcUIsRUFBRSxFQUFFO1lBQ25GLElBQUksR0FBRyxFQUFFO2dCQUNQLElBQUksR0FBRyxDQUFDLE1BQU0sRUFBRTtvQkFDZCxJQUFJLENBQUMsY0FBYyxDQUFDLDRCQUE0QixDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztvQkFDNUQsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQztpQkFDbEI7cUJBQU07b0JBQ0wsSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLGdCQUFnQixDQUFDLE9BQU8sQ0FBQyx3Q0FBd0MsQ0FBQyxFQUFFLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxPQUFPLENBQUMsZUFBZSxDQUFDLENBQUMsQ0FBQztvQkFDM0ksSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQztpQkFDbkI7YUFDRjtRQUNMLENBQUMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQztJQUVEOzs7TUFHRTtJQUNGLElBQUksTUFBTTtRQUNSLE9BQU8sWUFBWSxDQUFDLElBQUksRUFBRSxhQUFhLENBQUMsSUFBSSxDQUFDLENBQUMsSUFBSSxDQUFDO0lBQ3JELENBQUM7SUFFRDs7OztNQUlFO0lBQ0YsS0FBSyxDQUFDLEdBQVk7UUFDaEIsSUFBSSxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUM7SUFDNUIsQ0FBQzt1R0FoRFUsaUNBQWlDLGtCQUV4QixlQUFlOzJGQUZ4QixpQ0FBaUMsc0VDZDlDLHdnQ0FjQTs7MkZEQWEsaUNBQWlDO2tCQUo3QyxTQUFTOytCQUNFLGdDQUFnQzs7MEJBSzdCLE1BQU07MkJBQUMsZUFBZSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgSW5qZWN0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IE1hdERpYWxvZ1JlZiwgTUFUX0RJQUxPR19EQVRBIH0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwvZGlhbG9nJztcclxuaW1wb3J0IHsgVHJhbnNsYXRlU2VydmljZSB9IGZyb20gJ0BuZ3gtdHJhbnNsYXRlL2NvcmUnO1xyXG5pbXBvcnQgeyBUb2FzdHJTZXJ2aWNlIH0gZnJvbSAnbmd4LXRvYXN0cic7XHJcbmltcG9ydCB7IEFwaVJlc3BvbnNlTW9kZWwgfSBmcm9tICcuLi8uLi9tb2RlbC9tb2RlbCc7XHJcbmltcG9ydCB7IEFwcG9pbnRtZW50U2VydmljZSB9IGZyb20gJy4uLy4uL3NlcnZpY2VzL2FwcG9pbnRtZW50LnNlcnZpY2UnO1xyXG5pbXBvcnQgeyBnZXRDYWNoZURhdGEgfSBmcm9tICcuLi8uLi91dGlscy91dGlsaXR5LWZ1bmN0aW9ucyc7XHJcbmltcG9ydCB7IGRvY3RvckRldGFpbHMgfSBmcm9tICcuLi8uLi9jb25maWcvY29uc3RhbnQnO1xyXG5pbXBvcnQgeyBNaW5kbWFwU2VydmljZSB9IGZyb20gJy4uLy4uL3NlcnZpY2VzL21pbmRtYXAuc2VydmljZSc7XHJcblxyXG5AQ29tcG9uZW50KHtcclxuICBzZWxlY3RvcjogJ2FwcC1jYW5jZWwtYXBwb2ludG1lbnQtY29uZmlybScsXHJcbiAgdGVtcGxhdGVVcmw6ICcuL2NhbmNlbC1hcHBvaW50bWVudC1jb25maXJtLmNvbXBvbmVudC5odG1sJyxcclxufSlcclxuZXhwb3J0IGNsYXNzIENhbmNlbEFwcG9pbnRtZW50Q29uZmlybUNvbXBvbmVudCB7XHJcblxyXG4gIGNvbnN0cnVjdG9yKEBJbmplY3QoTUFUX0RJQUxPR19EQVRBKSBwdWJsaWMgZGF0YSxcclxuICAgIHByaXZhdGUgZGlhbG9nUmVmOiBNYXREaWFsb2dSZWY8Q2FuY2VsQXBwb2ludG1lbnRDb25maXJtQ29tcG9uZW50PixcclxuICAgIHByaXZhdGUgYXBwb2ludG1lbnRTZXJ2aWNlOiBBcHBvaW50bWVudFNlcnZpY2UsXHJcbiAgICBwcml2YXRlIHRvYXN0cjogVG9hc3RyU2VydmljZSwgXHJcbiAgICBwcml2YXRlIHRyYW5zbGF0ZVNlcnZpY2U6IFRyYW5zbGF0ZVNlcnZpY2UsXHJcbiAgICAgcHJpdmF0ZSBtaW5kbWFwU2VydmljZTogTWluZG1hcFNlcnZpY2VcclxuICApIHsgfVxyXG5cclxuICAvKipcclxuICAqIENhbmNlbCBhcHBvaW50bWVudFxyXG4gICogQHJldHVybiB7dm9pZH1cclxuICAqL1xyXG4gIGNhbmNlbCgpIHtcclxuICAgIGNvbnN0IHBheWxvYWQgPSB7XHJcbiAgICAgIGlkOiB0aGlzLmRhdGEuaWQsXHJcbiAgICAgIHZpc2l0VXVpZDogdGhpcy5kYXRhLnZpc2l0VXVpZCxcclxuICAgICAgaHdVVUlEOiB0aGlzLnVzZXJJZCxcclxuICAgIH07XHJcbiAgICB0aGlzLmFwcG9pbnRtZW50U2VydmljZS5jYW5jZWxBcHBvaW50bWVudChwYXlsb2FkKS5zdWJzY3JpYmUoKHJlczogQXBpUmVzcG9uc2VNb2RlbCkgPT4ge1xyXG4gICAgICAgIGlmIChyZXMpIHtcclxuICAgICAgICAgIGlmIChyZXMuc3RhdHVzKSB7XHJcbiAgICAgICAgICAgIHRoaXMubWluZG1hcFNlcnZpY2Uubm90aWZ5SHdGb3JDYW5jZWxBcHBvaW50bWVudCh0aGlzLmRhdGEpO1xyXG4gICAgICAgICAgICB0aGlzLmNsb3NlKHRydWUpO1xyXG4gICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy50b2FzdHIuZXJyb3IodGhpcy50cmFuc2xhdGVTZXJ2aWNlLmluc3RhbnQoJ1lvdSBjYW5cXCd0IGNhbmNlbCB0aGUgcGFzdCBhcHBvaW50bWVudCcpLCB0aGlzLnRyYW5zbGF0ZVNlcnZpY2UuaW5zdGFudCgnQ2FuXFwndCBDYW5jZWwnKSk7XHJcbiAgICAgICAgICAgIHRoaXMuY2xvc2UoZmFsc2UpO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgKiBHZXQgdXNlciB1dWlkIGZyb20gbG9jYWxzdG9yYWdlIHVzZXJcclxuICAqIEByZXR1cm4ge3N0cmluZ30gLSBVc2VyIHV1aWRcclxuICAqL1xyXG4gIGdldCB1c2VySWQoKSB7XHJcbiAgICByZXR1cm4gZ2V0Q2FjaGVEYXRhKHRydWUsIGRvY3RvckRldGFpbHMuVVNFUikudXVpZDtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICogQ2xvc2UgbW9kYWxcclxuICAqIEBwYXJhbSB7Ym9vbGVhbn0gdmFsIC0gRGlhbG9nIHJlc3VsdFxyXG4gICogQHJldHVybiB7dm9pZH1cclxuICAqL1xyXG4gIGNsb3NlKHZhbDogYm9vbGVhbikge1xyXG4gICAgdGhpcy5kaWFsb2dSZWYuY2xvc2UodmFsKTtcclxuICB9XHJcblxyXG59XHJcbiIsIjxkaXYgY2xhc3M9XCJpbnRlbC1jb24tbW9kYWxcIj5cclxuICA8ZGl2IGNsYXNzPVwiY2xvc2UtYnRuLWNvblwiPlxyXG4gICAgPGJ1dHRvbiBjbGFzcz1cIm1vZGFsLWNsb3NlLWJ0blwiIChjbGljayk9XCJjbG9zZShmYWxzZSlcIj48aW1nIHNyYz1cImFzc2V0cy9zdmdzL0Nsb3NlWC5zdmdcIiBhbHQ9XCJcIiBkYXRhLXRlc3QtaWQ9XCJidG5DbG9zZUNhbmNlbEFwcENvbmZpcm1cIj48L2J1dHRvbj5cclxuICA8L2Rpdj5cclxuICA8ZGl2IGNsYXNzPVwibW9kYWwtY29uIG10LTRcIj5cclxuICAgIDxpbWcgc3JjPVwiYXNzZXRzL3N2Z3MvdmlkZW8tcGluay5zdmdcIiBhbHQ9XCJcIiB3aWR0aD1cIjgwcHhcIiBoZWlnaHQ9XCI4MHB4XCI+XHJcbiAgICA8aDYgY2xhc3M9XCJtdC0zXCI+e3snQ2FuY2VsIHRoZSBhcHBvaW50bWVudCd8dHJhbnNsYXRlfX08L2g2PlxyXG4gICAgPHAgY2xhc3M9XCJtdC0yIHRleHQtY2VudGVyXCI+e3snQXJlIHlvdSBzdXJlIHlvdSB3YW50IHRvIGNhbmNlbCB5b3VyIGFwcG9pbnRtZW50IG9uJ3x0cmFuc2xhdGV9fSA8Yj57e2RhdGE/LnNsb3RKc0RhdGV8ZGF0ZTonZGQgTU1NTSd9fTwvYj4ge3snYXQnfHRyYW5zbGF0ZX19IDxiPnt7ZGF0YT8uc2xvdFRpbWV9fTwvYj4/PC9wPlxyXG4gIDwvZGl2PlxyXG4gIDxkaXYgY2xhc3M9XCJtb2RhbC1hY3Rpb24tYnRuLWNvblwiPlxyXG4gICAgPGJ1dHRvbiBjbGFzcz1cIm1vZGFsLWJ0biB3aGl0ZS1idG4gbXItM1wiIHR5cGU9XCJidXR0b25cIiAoY2xpY2spPVwiY2xvc2UoZmFsc2UpXCIgZGF0YS10ZXN0LWlkPVwiYnRuR29CYWNrQ2FuY2VsQXBwQ29uZmlybVwiPnt7J0dvIGJhY2snfHRyYW5zbGF0ZX19PC9idXR0b24+XHJcbiAgICA8YnV0dG9uIGNsYXNzPVwibW9kYWwtYnRuIGJsdWUtYnRuXCIgdHlwZT1cImJ1dHRvblwiIChjbGljayk9XCJjYW5jZWwoKVwiIGRhdGEtdGVzdC1pZD1cImJ0bkNhbmNlbEFwcENvbmZpcm1cIj57eydDYW5jZWwnfHRyYW5zbGF0ZX19PC9idXR0b24+XHJcbiAgPC9kaXY+XHJcbjwvZGl2PlxyXG4iXX0=