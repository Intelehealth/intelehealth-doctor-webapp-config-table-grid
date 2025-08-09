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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2FuY2VsLWFwcG9pbnRtZW50LWNvbmZpcm0uY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvaWgtbGlicmFyeS9zcmMvbGliL21vZGFsLWNvbXBvbmVudHMvY2FuY2VsLWFwcG9pbnRtZW50LWNvbmZpcm0vY2FuY2VsLWFwcG9pbnRtZW50LWNvbmZpcm0uY29tcG9uZW50LnRzIiwiLi4vLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvaWgtbGlicmFyeS9zcmMvbGliL21vZGFsLWNvbXBvbmVudHMvY2FuY2VsLWFwcG9pbnRtZW50LWNvbmZpcm0vY2FuY2VsLWFwcG9pbnRtZW50LWNvbmZpcm0uY29tcG9uZW50Lmh0bWwiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxNQUFNLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDbEQsT0FBTyxFQUFFLFlBQVksRUFBRSxlQUFlLEVBQUUsTUFBTSwwQkFBMEIsQ0FBQztBQUN6RSxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSxxQkFBcUIsQ0FBQztBQUN2RCxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sWUFBWSxDQUFDO0FBRTNDLE9BQU8sRUFBRSxrQkFBa0IsRUFBRSxNQUFNLG9DQUFvQyxDQUFDO0FBQ3hFLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSwrQkFBK0IsQ0FBQztBQUM3RCxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sdUJBQXVCLENBQUM7QUFDdEQsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLGdDQUFnQyxDQUFDOzs7Ozs7OztBQU1oRSxNQUFNLE9BQU8saUNBQWlDO0lBRUE7SUFDbEM7SUFDQTtJQUNBO0lBQ0E7SUFDQTtJQUxWLFlBQTRDLElBQUksRUFDdEMsU0FBMEQsRUFDMUQsa0JBQXNDLEVBQ3RDLE1BQXFCLEVBQ3JCLGdCQUFrQyxFQUNsQyxjQUE4QjtRQUxJLFNBQUksR0FBSixJQUFJLENBQUE7UUFDdEMsY0FBUyxHQUFULFNBQVMsQ0FBaUQ7UUFDMUQsdUJBQWtCLEdBQWxCLGtCQUFrQixDQUFvQjtRQUN0QyxXQUFNLEdBQU4sTUFBTSxDQUFlO1FBQ3JCLHFCQUFnQixHQUFoQixnQkFBZ0IsQ0FBa0I7UUFDbEMsbUJBQWMsR0FBZCxjQUFjLENBQWdCO0lBQ3BDLENBQUM7SUFFTDs7O01BR0U7SUFDRixNQUFNO1FBQ0osTUFBTSxPQUFPLEdBQUc7WUFDZCxFQUFFLEVBQUUsSUFBSSxDQUFDLElBQUksQ0FBQyxFQUFFO1lBQ2hCLFNBQVMsRUFBRSxJQUFJLENBQUMsSUFBSSxDQUFDLFNBQVM7WUFDOUIsTUFBTSxFQUFFLElBQUksQ0FBQyxNQUFNO1NBQ3BCLENBQUM7UUFDRixJQUFJLENBQUMsa0JBQWtCLENBQUMsaUJBQWlCLENBQUMsT0FBTyxDQUFDLENBQUMsU0FBUyxDQUFDLENBQUMsR0FBcUIsRUFBRSxFQUFFO1lBQ25GLElBQUksR0FBRyxFQUFFO2dCQUNQLElBQUksR0FBRyxDQUFDLE1BQU0sRUFBRTtvQkFDZCxJQUFJLENBQUMsY0FBYyxDQUFDLDRCQUE0QixDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztvQkFDNUQsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQztpQkFDbEI7cUJBQU07b0JBQ0wsSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLGdCQUFnQixDQUFDLE9BQU8sQ0FBQyx3Q0FBd0MsQ0FBQyxFQUFFLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxPQUFPLENBQUMsZUFBZSxDQUFDLENBQUMsQ0FBQztvQkFDM0ksSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQztpQkFDbkI7YUFDRjtRQUNMLENBQUMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQztJQUVEOzs7TUFHRTtJQUNGLElBQUksTUFBTTtRQUNSLE9BQU8sWUFBWSxDQUFDLElBQUksRUFBRSxhQUFhLENBQUMsSUFBSSxDQUFDLENBQUMsSUFBSSxDQUFDO0lBQ3JELENBQUM7SUFFRDs7OztNQUlFO0lBQ0YsS0FBSyxDQUFDLEdBQVk7UUFDaEIsSUFBSSxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUM7SUFDNUIsQ0FBQzt1R0FoRFUsaUNBQWlDLGtCQUV4QixlQUFlOzJGQUZ4QixpQ0FBaUMsc0VDZDlDLHdnQ0FjQTs7MkZEQWEsaUNBQWlDO2tCQUo3QyxTQUFTOytCQUNFLGdDQUFnQzs7MEJBSzdCLE1BQU07MkJBQUMsZUFBZSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgSW5qZWN0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IE1hdERpYWxvZ1JlZiwgTUFUX0RJQUxPR19EQVRBIH0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwvZGlhbG9nJztcclxuaW1wb3J0IHsgVHJhbnNsYXRlU2VydmljZSB9IGZyb20gJ0BuZ3gtdHJhbnNsYXRlL2NvcmUnO1xyXG5pbXBvcnQgeyBUb2FzdHJTZXJ2aWNlIH0gZnJvbSAnbmd4LXRvYXN0cic7XHJcbmltcG9ydCB7IEFwaVJlc3BvbnNlTW9kZWwgfSBmcm9tICcuLi8uLi9tb2RlbC9tb2RlbCc7XHJcbmltcG9ydCB7IEFwcG9pbnRtZW50U2VydmljZSB9IGZyb20gJy4uLy4uL3NlcnZpY2VzL2FwcG9pbnRtZW50LnNlcnZpY2UnO1xyXG5pbXBvcnQgeyBnZXRDYWNoZURhdGEgfSBmcm9tICcuLi8uLi91dGlscy91dGlsaXR5LWZ1bmN0aW9ucyc7XHJcbmltcG9ydCB7IGRvY3RvckRldGFpbHMgfSBmcm9tICcuLi8uLi9jb25maWcvY29uc3RhbnQnO1xyXG5pbXBvcnQgeyBNaW5kbWFwU2VydmljZSB9IGZyb20gJy4uLy4uL3NlcnZpY2VzL21pbmRtYXAuc2VydmljZSc7XHJcblxyXG5AQ29tcG9uZW50KHtcclxuICBzZWxlY3RvcjogJ2FwcC1jYW5jZWwtYXBwb2ludG1lbnQtY29uZmlybScsXHJcbiAgdGVtcGxhdGVVcmw6ICcuL2NhbmNlbC1hcHBvaW50bWVudC1jb25maXJtLmNvbXBvbmVudC5odG1sJyxcclxufSlcclxuZXhwb3J0IGNsYXNzIENhbmNlbEFwcG9pbnRtZW50Q29uZmlybUNvbXBvbmVudCB7XHJcblxyXG4gIGNvbnN0cnVjdG9yKEBJbmplY3QoTUFUX0RJQUxPR19EQVRBKSBwdWJsaWMgZGF0YSxcclxuICAgIHByaXZhdGUgZGlhbG9nUmVmOiBNYXREaWFsb2dSZWY8Q2FuY2VsQXBwb2ludG1lbnRDb25maXJtQ29tcG9uZW50PixcclxuICAgIHByaXZhdGUgYXBwb2ludG1lbnRTZXJ2aWNlOiBBcHBvaW50bWVudFNlcnZpY2UsXHJcbiAgICBwcml2YXRlIHRvYXN0cjogVG9hc3RyU2VydmljZSwgXHJcbiAgICBwcml2YXRlIHRyYW5zbGF0ZVNlcnZpY2U6IFRyYW5zbGF0ZVNlcnZpY2UsXHJcbiAgICBwcml2YXRlIG1pbmRtYXBTZXJ2aWNlOiBNaW5kbWFwU2VydmljZVxyXG4gICkgeyB9XHJcblxyXG4gIC8qKlxyXG4gICogQ2FuY2VsIGFwcG9pbnRtZW50XHJcbiAgKiBAcmV0dXJuIHt2b2lkfVxyXG4gICovXHJcbiAgY2FuY2VsKCkge1xyXG4gICAgY29uc3QgcGF5bG9hZCA9IHtcclxuICAgICAgaWQ6IHRoaXMuZGF0YS5pZCxcclxuICAgICAgdmlzaXRVdWlkOiB0aGlzLmRhdGEudmlzaXRVdWlkLFxyXG4gICAgICBod1VVSUQ6IHRoaXMudXNlcklkLFxyXG4gICAgfTtcclxuICAgIHRoaXMuYXBwb2ludG1lbnRTZXJ2aWNlLmNhbmNlbEFwcG9pbnRtZW50KHBheWxvYWQpLnN1YnNjcmliZSgocmVzOiBBcGlSZXNwb25zZU1vZGVsKSA9PiB7XHJcbiAgICAgICAgaWYgKHJlcykge1xyXG4gICAgICAgICAgaWYgKHJlcy5zdGF0dXMpIHtcclxuICAgICAgICAgICAgdGhpcy5taW5kbWFwU2VydmljZS5ub3RpZnlId0ZvckNhbmNlbEFwcG9pbnRtZW50KHRoaXMuZGF0YSk7XHJcbiAgICAgICAgICAgIHRoaXMuY2xvc2UodHJ1ZSk7XHJcbiAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB0aGlzLnRvYXN0ci5lcnJvcih0aGlzLnRyYW5zbGF0ZVNlcnZpY2UuaW5zdGFudCgnWW91IGNhblxcJ3QgY2FuY2VsIHRoZSBwYXN0IGFwcG9pbnRtZW50JyksIHRoaXMudHJhbnNsYXRlU2VydmljZS5pbnN0YW50KCdDYW5cXCd0IENhbmNlbCcpKTtcclxuICAgICAgICAgICAgdGhpcy5jbG9zZShmYWxzZSk7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAqIEdldCB1c2VyIHV1aWQgZnJvbSBsb2NhbHN0b3JhZ2UgdXNlclxyXG4gICogQHJldHVybiB7c3RyaW5nfSAtIFVzZXIgdXVpZFxyXG4gICovXHJcbiAgZ2V0IHVzZXJJZCgpIHtcclxuICAgIHJldHVybiBnZXRDYWNoZURhdGEodHJ1ZSwgZG9jdG9yRGV0YWlscy5VU0VSKS51dWlkO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgKiBDbG9zZSBtb2RhbFxyXG4gICogQHBhcmFtIHtib29sZWFufSB2YWwgLSBEaWFsb2cgcmVzdWx0XHJcbiAgKiBAcmV0dXJuIHt2b2lkfVxyXG4gICovXHJcbiAgY2xvc2UodmFsOiBib29sZWFuKSB7XHJcbiAgICB0aGlzLmRpYWxvZ1JlZi5jbG9zZSh2YWwpO1xyXG4gIH1cclxuXHJcbn1cclxuIiwiPGRpdiBjbGFzcz1cImludGVsLWNvbi1tb2RhbFwiPlxyXG4gIDxkaXYgY2xhc3M9XCJjbG9zZS1idG4tY29uXCI+XHJcbiAgICA8YnV0dG9uIGNsYXNzPVwibW9kYWwtY2xvc2UtYnRuXCIgKGNsaWNrKT1cImNsb3NlKGZhbHNlKVwiPjxpbWcgc3JjPVwiYXNzZXRzL3N2Z3MvQ2xvc2VYLnN2Z1wiIGFsdD1cIlwiIGRhdGEtdGVzdC1pZD1cImJ0bkNsb3NlQ2FuY2VsQXBwQ29uZmlybVwiPjwvYnV0dG9uPlxyXG4gIDwvZGl2PlxyXG4gIDxkaXYgY2xhc3M9XCJtb2RhbC1jb24gbXQtNFwiPlxyXG4gICAgPGltZyBzcmM9XCJhc3NldHMvc3Zncy92aWRlby1waW5rLnN2Z1wiIGFsdD1cIlwiIHdpZHRoPVwiODBweFwiIGhlaWdodD1cIjgwcHhcIj5cclxuICAgIDxoNiBjbGFzcz1cIm10LTNcIj57eydDYW5jZWwgdGhlIGFwcG9pbnRtZW50J3x0cmFuc2xhdGV9fTwvaDY+XHJcbiAgICA8cCBjbGFzcz1cIm10LTIgdGV4dC1jZW50ZXJcIj57eydBcmUgeW91IHN1cmUgeW91IHdhbnQgdG8gY2FuY2VsIHlvdXIgYXBwb2ludG1lbnQgb24nfHRyYW5zbGF0ZX19IDxiPnt7ZGF0YT8uc2xvdEpzRGF0ZXxkYXRlOidkZCBNTU1NJ319PC9iPiB7eydhdCd8dHJhbnNsYXRlfX0gPGI+e3tkYXRhPy5zbG90VGltZX19PC9iPj88L3A+XHJcbiAgPC9kaXY+XHJcbiAgPGRpdiBjbGFzcz1cIm1vZGFsLWFjdGlvbi1idG4tY29uXCI+XHJcbiAgICA8YnV0dG9uIGNsYXNzPVwibW9kYWwtYnRuIHdoaXRlLWJ0biBtci0zXCIgdHlwZT1cImJ1dHRvblwiIChjbGljayk9XCJjbG9zZShmYWxzZSlcIiBkYXRhLXRlc3QtaWQ9XCJidG5Hb0JhY2tDYW5jZWxBcHBDb25maXJtXCI+e3snR28gYmFjayd8dHJhbnNsYXRlfX08L2J1dHRvbj5cclxuICAgIDxidXR0b24gY2xhc3M9XCJtb2RhbC1idG4gYmx1ZS1idG5cIiB0eXBlPVwiYnV0dG9uXCIgKGNsaWNrKT1cImNhbmNlbCgpXCIgZGF0YS10ZXN0LWlkPVwiYnRuQ2FuY2VsQXBwQ29uZmlybVwiPnt7J0NhbmNlbCd8dHJhbnNsYXRlfX08L2J1dHRvbj5cclxuICA8L2Rpdj5cclxuPC9kaXY+XHJcbiJdfQ==