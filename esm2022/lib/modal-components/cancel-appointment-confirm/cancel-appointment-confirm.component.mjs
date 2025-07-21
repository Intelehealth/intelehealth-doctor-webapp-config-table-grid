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
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "14.3.0", type: CancelAppointmentConfirmComponent, selector: "app-cancel-appointment-confirm", ngImport: i0, template: "<div class=\"intel-con-modal\">\n  <div class=\"close-btn-con\">\n    <button class=\"modal-close-btn\" (click)=\"close(false)\"><img src=\"assets/svgs/CloseX.svg\" alt=\"\" data-test-id=\"btnCloseCancelAppConfirm\"></button>\n  </div>\n  <div class=\"modal-con mt-4\">\n    <img src=\"assets/svgs/video-pink.svg\" alt=\"\" width=\"80px\" height=\"80px\">\n    <h6 class=\"mt-3\">{{'Cancel the appointment'|translate}}</h6>\n    <p class=\"mt-2 text-center\">{{'Are you sure you want to cancel your appointment on'|translate}} <b>{{data?.slotJsDate|date:'dd MMMM'}}</b> {{'at'|translate}} <b>{{data?.slotTime}}</b>?</p>\n  </div>\n  <div class=\"modal-action-btn-con\">\n    <button class=\"modal-btn white-btn mr-3\" type=\"button\" (click)=\"close(false)\" data-test-id=\"btnGoBackCancelAppConfirm\">{{'Go back'|translate}}</button>\n    <button class=\"modal-btn blue-btn\" type=\"button\" (click)=\"cancel()\" data-test-id=\"btnCancelAppConfirm\">{{'Cancel'|translate}}</button>\n  </div>\n</div>\n", dependencies: [{ kind: "pipe", type: i6.DatePipe, name: "date" }, { kind: "pipe", type: i4.TranslatePipe, name: "translate" }] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.3.0", ngImport: i0, type: CancelAppointmentConfirmComponent, decorators: [{
            type: Component,
            args: [{ selector: 'app-cancel-appointment-confirm', template: "<div class=\"intel-con-modal\">\n  <div class=\"close-btn-con\">\n    <button class=\"modal-close-btn\" (click)=\"close(false)\"><img src=\"assets/svgs/CloseX.svg\" alt=\"\" data-test-id=\"btnCloseCancelAppConfirm\"></button>\n  </div>\n  <div class=\"modal-con mt-4\">\n    <img src=\"assets/svgs/video-pink.svg\" alt=\"\" width=\"80px\" height=\"80px\">\n    <h6 class=\"mt-3\">{{'Cancel the appointment'|translate}}</h6>\n    <p class=\"mt-2 text-center\">{{'Are you sure you want to cancel your appointment on'|translate}} <b>{{data?.slotJsDate|date:'dd MMMM'}}</b> {{'at'|translate}} <b>{{data?.slotTime}}</b>?</p>\n  </div>\n  <div class=\"modal-action-btn-con\">\n    <button class=\"modal-btn white-btn mr-3\" type=\"button\" (click)=\"close(false)\" data-test-id=\"btnGoBackCancelAppConfirm\">{{'Go back'|translate}}</button>\n    <button class=\"modal-btn blue-btn\" type=\"button\" (click)=\"cancel()\" data-test-id=\"btnCancelAppConfirm\">{{'Cancel'|translate}}</button>\n  </div>\n</div>\n" }]
        }], ctorParameters: function () { return [{ type: undefined, decorators: [{
                    type: Inject,
                    args: [MAT_DIALOG_DATA]
                }] }, { type: i1.MatDialogRef }, { type: i2.AppointmentService }, { type: i3.ToastrService }, { type: i4.TranslateService }, { type: i5.MindmapService }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2FuY2VsLWFwcG9pbnRtZW50LWNvbmZpcm0uY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvaWgtbGlicmFyeS9zcmMvbGliL21vZGFsLWNvbXBvbmVudHMvY2FuY2VsLWFwcG9pbnRtZW50LWNvbmZpcm0vY2FuY2VsLWFwcG9pbnRtZW50LWNvbmZpcm0uY29tcG9uZW50LnRzIiwiLi4vLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvaWgtbGlicmFyeS9zcmMvbGliL21vZGFsLWNvbXBvbmVudHMvY2FuY2VsLWFwcG9pbnRtZW50LWNvbmZpcm0vY2FuY2VsLWFwcG9pbnRtZW50LWNvbmZpcm0uY29tcG9uZW50Lmh0bWwiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxNQUFNLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDbEQsT0FBTyxFQUFFLFlBQVksRUFBRSxlQUFlLEVBQUUsTUFBTSwwQkFBMEIsQ0FBQztBQUN6RSxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSxxQkFBcUIsQ0FBQztBQUN2RCxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sWUFBWSxDQUFDO0FBRTNDLE9BQU8sRUFBRSxrQkFBa0IsRUFBRSxNQUFNLG9DQUFvQyxDQUFDO0FBQ3hFLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSwrQkFBK0IsQ0FBQztBQUM3RCxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sdUJBQXVCLENBQUM7QUFDdEQsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLGdDQUFnQyxDQUFDOzs7Ozs7OztBQU1oRSxNQUFNLE9BQU8saUNBQWlDO0lBRUE7SUFDbEM7SUFDQTtJQUNBO0lBQ0E7SUFDQztJQUxYLFlBQTRDLElBQUksRUFDdEMsU0FBMEQsRUFDMUQsa0JBQXNDLEVBQ3RDLE1BQXFCLEVBQ3JCLGdCQUFrQyxFQUNqQyxjQUE4QjtRQUxHLFNBQUksR0FBSixJQUFJLENBQUE7UUFDdEMsY0FBUyxHQUFULFNBQVMsQ0FBaUQ7UUFDMUQsdUJBQWtCLEdBQWxCLGtCQUFrQixDQUFvQjtRQUN0QyxXQUFNLEdBQU4sTUFBTSxDQUFlO1FBQ3JCLHFCQUFnQixHQUFoQixnQkFBZ0IsQ0FBa0I7UUFDakMsbUJBQWMsR0FBZCxjQUFjLENBQWdCO0lBQ3JDLENBQUM7SUFFTDs7O01BR0U7SUFDRixNQUFNO1FBQ0osTUFBTSxPQUFPLEdBQUc7WUFDZCxFQUFFLEVBQUUsSUFBSSxDQUFDLElBQUksQ0FBQyxFQUFFO1lBQ2hCLFNBQVMsRUFBRSxJQUFJLENBQUMsSUFBSSxDQUFDLFNBQVM7WUFDOUIsTUFBTSxFQUFFLElBQUksQ0FBQyxNQUFNO1NBQ3BCLENBQUM7UUFDRixJQUFJLENBQUMsa0JBQWtCLENBQUMsaUJBQWlCLENBQUMsT0FBTyxDQUFDLENBQUMsU0FBUyxDQUFDLENBQUMsR0FBcUIsRUFBRSxFQUFFO1lBQ25GLElBQUksR0FBRyxFQUFFO2dCQUNQLElBQUksR0FBRyxDQUFDLE1BQU0sRUFBRTtvQkFDZCxJQUFJLENBQUMsY0FBYyxDQUFDLDRCQUE0QixDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztvQkFDNUQsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQztpQkFDbEI7cUJBQU07b0JBQ0wsSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLGdCQUFnQixDQUFDLE9BQU8sQ0FBQyx3Q0FBd0MsQ0FBQyxFQUFFLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxPQUFPLENBQUMsZUFBZSxDQUFDLENBQUMsQ0FBQztvQkFDM0ksSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQztpQkFDbkI7YUFDRjtRQUNMLENBQUMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQztJQUVEOzs7TUFHRTtJQUNGLElBQUksTUFBTTtRQUNSLE9BQU8sWUFBWSxDQUFDLElBQUksRUFBRSxhQUFhLENBQUMsSUFBSSxDQUFDLENBQUMsSUFBSSxDQUFDO0lBQ3JELENBQUM7SUFFRDs7OztNQUlFO0lBQ0YsS0FBSyxDQUFDLEdBQVk7UUFDaEIsSUFBSSxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUM7SUFDNUIsQ0FBQzt1R0FoRFUsaUNBQWlDLGtCQUV4QixlQUFlOzJGQUZ4QixpQ0FBaUMsc0VDZDlDLDQrQkFjQTs7MkZEQWEsaUNBQWlDO2tCQUo3QyxTQUFTOytCQUNFLGdDQUFnQzs7MEJBSzdCLE1BQU07MkJBQUMsZUFBZSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgSW5qZWN0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBNYXREaWFsb2dSZWYsIE1BVF9ESUFMT0dfREFUQSB9IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsL2RpYWxvZyc7XG5pbXBvcnQgeyBUcmFuc2xhdGVTZXJ2aWNlIH0gZnJvbSAnQG5neC10cmFuc2xhdGUvY29yZSc7XG5pbXBvcnQgeyBUb2FzdHJTZXJ2aWNlIH0gZnJvbSAnbmd4LXRvYXN0cic7XG5pbXBvcnQgeyBBcGlSZXNwb25zZU1vZGVsIH0gZnJvbSAnLi4vLi4vbW9kZWwvbW9kZWwnO1xuaW1wb3J0IHsgQXBwb2ludG1lbnRTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vc2VydmljZXMvYXBwb2ludG1lbnQuc2VydmljZSc7XG5pbXBvcnQgeyBnZXRDYWNoZURhdGEgfSBmcm9tICcuLi8uLi91dGlscy91dGlsaXR5LWZ1bmN0aW9ucyc7XG5pbXBvcnQgeyBkb2N0b3JEZXRhaWxzIH0gZnJvbSAnLi4vLi4vY29uZmlnL2NvbnN0YW50JztcbmltcG9ydCB7IE1pbmRtYXBTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vc2VydmljZXMvbWluZG1hcC5zZXJ2aWNlJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnYXBwLWNhbmNlbC1hcHBvaW50bWVudC1jb25maXJtJyxcbiAgdGVtcGxhdGVVcmw6ICcuL2NhbmNlbC1hcHBvaW50bWVudC1jb25maXJtLmNvbXBvbmVudC5odG1sJyxcbn0pXG5leHBvcnQgY2xhc3MgQ2FuY2VsQXBwb2ludG1lbnRDb25maXJtQ29tcG9uZW50IHtcblxuICBjb25zdHJ1Y3RvcihASW5qZWN0KE1BVF9ESUFMT0dfREFUQSkgcHVibGljIGRhdGEsXG4gICAgcHJpdmF0ZSBkaWFsb2dSZWY6IE1hdERpYWxvZ1JlZjxDYW5jZWxBcHBvaW50bWVudENvbmZpcm1Db21wb25lbnQ+LFxuICAgIHByaXZhdGUgYXBwb2ludG1lbnRTZXJ2aWNlOiBBcHBvaW50bWVudFNlcnZpY2UsXG4gICAgcHJpdmF0ZSB0b2FzdHI6IFRvYXN0clNlcnZpY2UsIFxuICAgIHByaXZhdGUgdHJhbnNsYXRlU2VydmljZTogVHJhbnNsYXRlU2VydmljZSxcbiAgICAgcHJpdmF0ZSBtaW5kbWFwU2VydmljZTogTWluZG1hcFNlcnZpY2VcbiAgKSB7IH1cblxuICAvKipcbiAgKiBDYW5jZWwgYXBwb2ludG1lbnRcbiAgKiBAcmV0dXJuIHt2b2lkfVxuICAqL1xuICBjYW5jZWwoKSB7XG4gICAgY29uc3QgcGF5bG9hZCA9IHtcbiAgICAgIGlkOiB0aGlzLmRhdGEuaWQsXG4gICAgICB2aXNpdFV1aWQ6IHRoaXMuZGF0YS52aXNpdFV1aWQsXG4gICAgICBod1VVSUQ6IHRoaXMudXNlcklkLFxuICAgIH07XG4gICAgdGhpcy5hcHBvaW50bWVudFNlcnZpY2UuY2FuY2VsQXBwb2ludG1lbnQocGF5bG9hZCkuc3Vic2NyaWJlKChyZXM6IEFwaVJlc3BvbnNlTW9kZWwpID0+IHtcbiAgICAgICAgaWYgKHJlcykge1xuICAgICAgICAgIGlmIChyZXMuc3RhdHVzKSB7XG4gICAgICAgICAgICB0aGlzLm1pbmRtYXBTZXJ2aWNlLm5vdGlmeUh3Rm9yQ2FuY2VsQXBwb2ludG1lbnQodGhpcy5kYXRhKTtcbiAgICAgICAgICAgIHRoaXMuY2xvc2UodHJ1ZSk7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMudG9hc3RyLmVycm9yKHRoaXMudHJhbnNsYXRlU2VydmljZS5pbnN0YW50KCdZb3UgY2FuXFwndCBjYW5jZWwgdGhlIHBhc3QgYXBwb2ludG1lbnQnKSwgdGhpcy50cmFuc2xhdGVTZXJ2aWNlLmluc3RhbnQoJ0NhblxcJ3QgQ2FuY2VsJykpO1xuICAgICAgICAgICAgdGhpcy5jbG9zZShmYWxzZSk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfSk7XG4gIH1cblxuICAvKipcbiAgKiBHZXQgdXNlciB1dWlkIGZyb20gbG9jYWxzdG9yYWdlIHVzZXJcbiAgKiBAcmV0dXJuIHtzdHJpbmd9IC0gVXNlciB1dWlkXG4gICovXG4gIGdldCB1c2VySWQoKSB7XG4gICAgcmV0dXJuIGdldENhY2hlRGF0YSh0cnVlLCBkb2N0b3JEZXRhaWxzLlVTRVIpLnV1aWQ7XG4gIH1cblxuICAvKipcbiAgKiBDbG9zZSBtb2RhbFxuICAqIEBwYXJhbSB7Ym9vbGVhbn0gdmFsIC0gRGlhbG9nIHJlc3VsdFxuICAqIEByZXR1cm4ge3ZvaWR9XG4gICovXG4gIGNsb3NlKHZhbDogYm9vbGVhbikge1xuICAgIHRoaXMuZGlhbG9nUmVmLmNsb3NlKHZhbCk7XG4gIH1cblxufVxuIiwiPGRpdiBjbGFzcz1cImludGVsLWNvbi1tb2RhbFwiPlxuICA8ZGl2IGNsYXNzPVwiY2xvc2UtYnRuLWNvblwiPlxuICAgIDxidXR0b24gY2xhc3M9XCJtb2RhbC1jbG9zZS1idG5cIiAoY2xpY2spPVwiY2xvc2UoZmFsc2UpXCI+PGltZyBzcmM9XCJhc3NldHMvc3Zncy9DbG9zZVguc3ZnXCIgYWx0PVwiXCIgZGF0YS10ZXN0LWlkPVwiYnRuQ2xvc2VDYW5jZWxBcHBDb25maXJtXCI+PC9idXR0b24+XG4gIDwvZGl2PlxuICA8ZGl2IGNsYXNzPVwibW9kYWwtY29uIG10LTRcIj5cbiAgICA8aW1nIHNyYz1cImFzc2V0cy9zdmdzL3ZpZGVvLXBpbmsuc3ZnXCIgYWx0PVwiXCIgd2lkdGg9XCI4MHB4XCIgaGVpZ2h0PVwiODBweFwiPlxuICAgIDxoNiBjbGFzcz1cIm10LTNcIj57eydDYW5jZWwgdGhlIGFwcG9pbnRtZW50J3x0cmFuc2xhdGV9fTwvaDY+XG4gICAgPHAgY2xhc3M9XCJtdC0yIHRleHQtY2VudGVyXCI+e3snQXJlIHlvdSBzdXJlIHlvdSB3YW50IHRvIGNhbmNlbCB5b3VyIGFwcG9pbnRtZW50IG9uJ3x0cmFuc2xhdGV9fSA8Yj57e2RhdGE/LnNsb3RKc0RhdGV8ZGF0ZTonZGQgTU1NTSd9fTwvYj4ge3snYXQnfHRyYW5zbGF0ZX19IDxiPnt7ZGF0YT8uc2xvdFRpbWV9fTwvYj4/PC9wPlxuICA8L2Rpdj5cbiAgPGRpdiBjbGFzcz1cIm1vZGFsLWFjdGlvbi1idG4tY29uXCI+XG4gICAgPGJ1dHRvbiBjbGFzcz1cIm1vZGFsLWJ0biB3aGl0ZS1idG4gbXItM1wiIHR5cGU9XCJidXR0b25cIiAoY2xpY2spPVwiY2xvc2UoZmFsc2UpXCIgZGF0YS10ZXN0LWlkPVwiYnRuR29CYWNrQ2FuY2VsQXBwQ29uZmlybVwiPnt7J0dvIGJhY2snfHRyYW5zbGF0ZX19PC9idXR0b24+XG4gICAgPGJ1dHRvbiBjbGFzcz1cIm1vZGFsLWJ0biBibHVlLWJ0blwiIHR5cGU9XCJidXR0b25cIiAoY2xpY2spPVwiY2FuY2VsKClcIiBkYXRhLXRlc3QtaWQ9XCJidG5DYW5jZWxBcHBDb25maXJtXCI+e3snQ2FuY2VsJ3x0cmFuc2xhdGV9fTwvYnV0dG9uPlxuICA8L2Rpdj5cbjwvZGl2PlxuIl19