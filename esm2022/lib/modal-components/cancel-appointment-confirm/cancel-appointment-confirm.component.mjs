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
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "14.3.0", type: CancelAppointmentConfirmComponent, selector: "app-cancel-appointment-confirm", ngImport: i0, template: "<div class=\"intel-con-modal\" data-test-id=\"cancelAppConfirmModal\">\r\n  <div class=\"close-btn-con\" data-test-id=\"cancelAppConfirmCloseContainer\">\r\n    <button class=\"modal-close-btn\" (click)=\"close(false)\" data-test-id=\"btnCloseCancelAppConfirm\">\r\n      <img src=\"assets/svgs/CloseX.svg\" alt=\"close icon\" />\r\n    </button>\r\n  </div>\r\n\r\n  <div class=\"modal-con mt-4\" data-test-id=\"cancelAppConfirmContent\">\r\n    <img src=\"assets/svgs/video-pink.svg\" alt=\"video-icon\" width=\"80px\" height=\"80px\" data-test-id=\"imgCancelAppConfirmIcon\">\r\n    <h6 class=\"mt-3\" data-test-id=\"titleCancelAppConfirm\">{{'Cancel the appointment'|translate}}</h6>\r\n    <p class=\"mt-2 text-center\" data-test-id=\"msgCancelAppConfirm\">\r\n      {{'Are you sure you want to cancel your appointment on'|translate}} \r\n      <b data-test-id=\"cancelAppConfirmDate\">{{data?.slotJsDate|date:'dd MMMM'}}</b> \r\n      {{'at'|translate}} \r\n      <b data-test-id=\"cancelAppConfirmTime\">{{data?.slotTime}}</b>?\r\n    </p>\r\n  </div>\r\n\r\n  <div class=\"modal-action-btn-con\" data-test-id=\"cancelAppConfirmActions\">\r\n    <button class=\"modal-btn white-btn mr-3\" type=\"button\" (click)=\"close(false)\" data-test-id=\"btnGoBackCancelAppConfirm\">\r\n      {{'Go back'|translate}}\r\n    </button>\r\n    <button class=\"modal-btn blue-btn\" type=\"button\" (click)=\"cancel()\" data-test-id=\"btnCancelAppConfirm\">\r\n      {{'Cancel'|translate}}\r\n    </button>\r\n  </div>\r\n</div>\r\n", dependencies: [{ kind: "pipe", type: i6.DatePipe, name: "date" }, { kind: "pipe", type: i4.TranslatePipe, name: "translate" }] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.3.0", ngImport: i0, type: CancelAppointmentConfirmComponent, decorators: [{
            type: Component,
            args: [{ selector: 'app-cancel-appointment-confirm', template: "<div class=\"intel-con-modal\" data-test-id=\"cancelAppConfirmModal\">\r\n  <div class=\"close-btn-con\" data-test-id=\"cancelAppConfirmCloseContainer\">\r\n    <button class=\"modal-close-btn\" (click)=\"close(false)\" data-test-id=\"btnCloseCancelAppConfirm\">\r\n      <img src=\"assets/svgs/CloseX.svg\" alt=\"close icon\" />\r\n    </button>\r\n  </div>\r\n\r\n  <div class=\"modal-con mt-4\" data-test-id=\"cancelAppConfirmContent\">\r\n    <img src=\"assets/svgs/video-pink.svg\" alt=\"video-icon\" width=\"80px\" height=\"80px\" data-test-id=\"imgCancelAppConfirmIcon\">\r\n    <h6 class=\"mt-3\" data-test-id=\"titleCancelAppConfirm\">{{'Cancel the appointment'|translate}}</h6>\r\n    <p class=\"mt-2 text-center\" data-test-id=\"msgCancelAppConfirm\">\r\n      {{'Are you sure you want to cancel your appointment on'|translate}} \r\n      <b data-test-id=\"cancelAppConfirmDate\">{{data?.slotJsDate|date:'dd MMMM'}}</b> \r\n      {{'at'|translate}} \r\n      <b data-test-id=\"cancelAppConfirmTime\">{{data?.slotTime}}</b>?\r\n    </p>\r\n  </div>\r\n\r\n  <div class=\"modal-action-btn-con\" data-test-id=\"cancelAppConfirmActions\">\r\n    <button class=\"modal-btn white-btn mr-3\" type=\"button\" (click)=\"close(false)\" data-test-id=\"btnGoBackCancelAppConfirm\">\r\n      {{'Go back'|translate}}\r\n    </button>\r\n    <button class=\"modal-btn blue-btn\" type=\"button\" (click)=\"cancel()\" data-test-id=\"btnCancelAppConfirm\">\r\n      {{'Cancel'|translate}}\r\n    </button>\r\n  </div>\r\n</div>\r\n" }]
        }], ctorParameters: function () { return [{ type: undefined, decorators: [{
                    type: Inject,
                    args: [MAT_DIALOG_DATA]
                }] }, { type: i1.MatDialogRef }, { type: i2.AppointmentService }, { type: i3.ToastrService }, { type: i4.TranslateService }, { type: i5.MindmapService }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2FuY2VsLWFwcG9pbnRtZW50LWNvbmZpcm0uY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvaWgtbGlicmFyeS9zcmMvbGliL21vZGFsLWNvbXBvbmVudHMvY2FuY2VsLWFwcG9pbnRtZW50LWNvbmZpcm0vY2FuY2VsLWFwcG9pbnRtZW50LWNvbmZpcm0uY29tcG9uZW50LnRzIiwiLi4vLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvaWgtbGlicmFyeS9zcmMvbGliL21vZGFsLWNvbXBvbmVudHMvY2FuY2VsLWFwcG9pbnRtZW50LWNvbmZpcm0vY2FuY2VsLWFwcG9pbnRtZW50LWNvbmZpcm0uY29tcG9uZW50Lmh0bWwiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxNQUFNLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDbEQsT0FBTyxFQUFFLFlBQVksRUFBRSxlQUFlLEVBQUUsTUFBTSwwQkFBMEIsQ0FBQztBQUN6RSxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSxxQkFBcUIsQ0FBQztBQUN2RCxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sWUFBWSxDQUFDO0FBRTNDLE9BQU8sRUFBRSxrQkFBa0IsRUFBRSxNQUFNLG9DQUFvQyxDQUFDO0FBQ3hFLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSwrQkFBK0IsQ0FBQztBQUM3RCxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sdUJBQXVCLENBQUM7QUFDdEQsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLGdDQUFnQyxDQUFDOzs7Ozs7OztBQU1oRSxNQUFNLE9BQU8saUNBQWlDO0lBRUE7SUFDbEM7SUFDQTtJQUNBO0lBQ0E7SUFDQTtJQUxWLFlBQTRDLElBQUksRUFDdEMsU0FBMEQsRUFDMUQsa0JBQXNDLEVBQ3RDLE1BQXFCLEVBQ3JCLGdCQUFrQyxFQUNsQyxjQUE4QjtRQUxJLFNBQUksR0FBSixJQUFJLENBQUE7UUFDdEMsY0FBUyxHQUFULFNBQVMsQ0FBaUQ7UUFDMUQsdUJBQWtCLEdBQWxCLGtCQUFrQixDQUFvQjtRQUN0QyxXQUFNLEdBQU4sTUFBTSxDQUFlO1FBQ3JCLHFCQUFnQixHQUFoQixnQkFBZ0IsQ0FBa0I7UUFDbEMsbUJBQWMsR0FBZCxjQUFjLENBQWdCO0lBQ3BDLENBQUM7SUFFTDs7O01BR0U7SUFDRixNQUFNO1FBQ0osTUFBTSxPQUFPLEdBQUc7WUFDZCxFQUFFLEVBQUUsSUFBSSxDQUFDLElBQUksQ0FBQyxFQUFFO1lBQ2hCLFNBQVMsRUFBRSxJQUFJLENBQUMsSUFBSSxDQUFDLFNBQVM7WUFDOUIsTUFBTSxFQUFFLElBQUksQ0FBQyxNQUFNO1NBQ3BCLENBQUM7UUFDRixJQUFJLENBQUMsa0JBQWtCLENBQUMsaUJBQWlCLENBQUMsT0FBTyxDQUFDLENBQUMsU0FBUyxDQUFDLENBQUMsR0FBcUIsRUFBRSxFQUFFO1lBQ25GLElBQUksR0FBRyxFQUFFO2dCQUNQLElBQUksR0FBRyxDQUFDLE1BQU0sRUFBRTtvQkFDZCxJQUFJLENBQUMsY0FBYyxDQUFDLDRCQUE0QixDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztvQkFDNUQsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQztpQkFDbEI7cUJBQU07b0JBQ0wsSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLGdCQUFnQixDQUFDLE9BQU8sQ0FBQyx3Q0FBd0MsQ0FBQyxFQUFFLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxPQUFPLENBQUMsZUFBZSxDQUFDLENBQUMsQ0FBQztvQkFDM0ksSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQztpQkFDbkI7YUFDRjtRQUNMLENBQUMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQztJQUVEOzs7TUFHRTtJQUNGLElBQUksTUFBTTtRQUNSLE9BQU8sWUFBWSxDQUFDLElBQUksRUFBRSxhQUFhLENBQUMsSUFBSSxDQUFDLENBQUMsSUFBSSxDQUFDO0lBQ3JELENBQUM7SUFFRDs7OztNQUlFO0lBQ0YsS0FBSyxDQUFDLEdBQVk7UUFDaEIsSUFBSSxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUM7SUFDNUIsQ0FBQzt1R0FoRFUsaUNBQWlDLGtCQUV4QixlQUFlOzJGQUZ4QixpQ0FBaUMsc0VDZDlDLHMvQ0EyQkE7OzJGRGJhLGlDQUFpQztrQkFKN0MsU0FBUzsrQkFDRSxnQ0FBZ0M7OzBCQUs3QixNQUFNOzJCQUFDLGVBQWUiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIEluamVjdCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBNYXREaWFsb2dSZWYsIE1BVF9ESUFMT0dfREFUQSB9IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsL2RpYWxvZyc7XHJcbmltcG9ydCB7IFRyYW5zbGF0ZVNlcnZpY2UgfSBmcm9tICdAbmd4LXRyYW5zbGF0ZS9jb3JlJztcclxuaW1wb3J0IHsgVG9hc3RyU2VydmljZSB9IGZyb20gJ25neC10b2FzdHInO1xyXG5pbXBvcnQgeyBBcGlSZXNwb25zZU1vZGVsIH0gZnJvbSAnLi4vLi4vbW9kZWwvbW9kZWwnO1xyXG5pbXBvcnQgeyBBcHBvaW50bWVudFNlcnZpY2UgfSBmcm9tICcuLi8uLi9zZXJ2aWNlcy9hcHBvaW50bWVudC5zZXJ2aWNlJztcclxuaW1wb3J0IHsgZ2V0Q2FjaGVEYXRhIH0gZnJvbSAnLi4vLi4vdXRpbHMvdXRpbGl0eS1mdW5jdGlvbnMnO1xyXG5pbXBvcnQgeyBkb2N0b3JEZXRhaWxzIH0gZnJvbSAnLi4vLi4vY29uZmlnL2NvbnN0YW50JztcclxuaW1wb3J0IHsgTWluZG1hcFNlcnZpY2UgfSBmcm9tICcuLi8uLi9zZXJ2aWNlcy9taW5kbWFwLnNlcnZpY2UnO1xyXG5cclxuQENvbXBvbmVudCh7XHJcbiAgc2VsZWN0b3I6ICdhcHAtY2FuY2VsLWFwcG9pbnRtZW50LWNvbmZpcm0nLFxyXG4gIHRlbXBsYXRlVXJsOiAnLi9jYW5jZWwtYXBwb2ludG1lbnQtY29uZmlybS5jb21wb25lbnQuaHRtbCcsXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBDYW5jZWxBcHBvaW50bWVudENvbmZpcm1Db21wb25lbnQge1xyXG5cclxuICBjb25zdHJ1Y3RvcihASW5qZWN0KE1BVF9ESUFMT0dfREFUQSkgcHVibGljIGRhdGEsXHJcbiAgICBwcml2YXRlIGRpYWxvZ1JlZjogTWF0RGlhbG9nUmVmPENhbmNlbEFwcG9pbnRtZW50Q29uZmlybUNvbXBvbmVudD4sXHJcbiAgICBwcml2YXRlIGFwcG9pbnRtZW50U2VydmljZTogQXBwb2ludG1lbnRTZXJ2aWNlLFxyXG4gICAgcHJpdmF0ZSB0b2FzdHI6IFRvYXN0clNlcnZpY2UsIFxyXG4gICAgcHJpdmF0ZSB0cmFuc2xhdGVTZXJ2aWNlOiBUcmFuc2xhdGVTZXJ2aWNlLFxyXG4gICAgcHJpdmF0ZSBtaW5kbWFwU2VydmljZTogTWluZG1hcFNlcnZpY2VcclxuICApIHsgfVxyXG5cclxuICAvKipcclxuICAqIENhbmNlbCBhcHBvaW50bWVudFxyXG4gICogQHJldHVybiB7dm9pZH1cclxuICAqL1xyXG4gIGNhbmNlbCgpIHtcclxuICAgIGNvbnN0IHBheWxvYWQgPSB7XHJcbiAgICAgIGlkOiB0aGlzLmRhdGEuaWQsXHJcbiAgICAgIHZpc2l0VXVpZDogdGhpcy5kYXRhLnZpc2l0VXVpZCxcclxuICAgICAgaHdVVUlEOiB0aGlzLnVzZXJJZCxcclxuICAgIH07XHJcbiAgICB0aGlzLmFwcG9pbnRtZW50U2VydmljZS5jYW5jZWxBcHBvaW50bWVudChwYXlsb2FkKS5zdWJzY3JpYmUoKHJlczogQXBpUmVzcG9uc2VNb2RlbCkgPT4ge1xyXG4gICAgICAgIGlmIChyZXMpIHtcclxuICAgICAgICAgIGlmIChyZXMuc3RhdHVzKSB7XHJcbiAgICAgICAgICAgIHRoaXMubWluZG1hcFNlcnZpY2Uubm90aWZ5SHdGb3JDYW5jZWxBcHBvaW50bWVudCh0aGlzLmRhdGEpO1xyXG4gICAgICAgICAgICB0aGlzLmNsb3NlKHRydWUpO1xyXG4gICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy50b2FzdHIuZXJyb3IodGhpcy50cmFuc2xhdGVTZXJ2aWNlLmluc3RhbnQoJ1lvdSBjYW5cXCd0IGNhbmNlbCB0aGUgcGFzdCBhcHBvaW50bWVudCcpLCB0aGlzLnRyYW5zbGF0ZVNlcnZpY2UuaW5zdGFudCgnQ2FuXFwndCBDYW5jZWwnKSk7XHJcbiAgICAgICAgICAgIHRoaXMuY2xvc2UoZmFsc2UpO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgKiBHZXQgdXNlciB1dWlkIGZyb20gbG9jYWxzdG9yYWdlIHVzZXJcclxuICAqIEByZXR1cm4ge3N0cmluZ30gLSBVc2VyIHV1aWRcclxuICAqL1xyXG4gIGdldCB1c2VySWQoKSB7XHJcbiAgICByZXR1cm4gZ2V0Q2FjaGVEYXRhKHRydWUsIGRvY3RvckRldGFpbHMuVVNFUikudXVpZDtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICogQ2xvc2UgbW9kYWxcclxuICAqIEBwYXJhbSB7Ym9vbGVhbn0gdmFsIC0gRGlhbG9nIHJlc3VsdFxyXG4gICogQHJldHVybiB7dm9pZH1cclxuICAqL1xyXG4gIGNsb3NlKHZhbDogYm9vbGVhbikge1xyXG4gICAgdGhpcy5kaWFsb2dSZWYuY2xvc2UodmFsKTtcclxuICB9XHJcblxyXG59XHJcbiIsIjxkaXYgY2xhc3M9XCJpbnRlbC1jb24tbW9kYWxcIiBkYXRhLXRlc3QtaWQ9XCJjYW5jZWxBcHBDb25maXJtTW9kYWxcIj5cclxuICA8ZGl2IGNsYXNzPVwiY2xvc2UtYnRuLWNvblwiIGRhdGEtdGVzdC1pZD1cImNhbmNlbEFwcENvbmZpcm1DbG9zZUNvbnRhaW5lclwiPlxyXG4gICAgPGJ1dHRvbiBjbGFzcz1cIm1vZGFsLWNsb3NlLWJ0blwiIChjbGljayk9XCJjbG9zZShmYWxzZSlcIiBkYXRhLXRlc3QtaWQ9XCJidG5DbG9zZUNhbmNlbEFwcENvbmZpcm1cIj5cclxuICAgICAgPGltZyBzcmM9XCJhc3NldHMvc3Zncy9DbG9zZVguc3ZnXCIgYWx0PVwiY2xvc2UgaWNvblwiIC8+XHJcbiAgICA8L2J1dHRvbj5cclxuICA8L2Rpdj5cclxuXHJcbiAgPGRpdiBjbGFzcz1cIm1vZGFsLWNvbiBtdC00XCIgZGF0YS10ZXN0LWlkPVwiY2FuY2VsQXBwQ29uZmlybUNvbnRlbnRcIj5cclxuICAgIDxpbWcgc3JjPVwiYXNzZXRzL3N2Z3MvdmlkZW8tcGluay5zdmdcIiBhbHQ9XCJ2aWRlby1pY29uXCIgd2lkdGg9XCI4MHB4XCIgaGVpZ2h0PVwiODBweFwiIGRhdGEtdGVzdC1pZD1cImltZ0NhbmNlbEFwcENvbmZpcm1JY29uXCI+XHJcbiAgICA8aDYgY2xhc3M9XCJtdC0zXCIgZGF0YS10ZXN0LWlkPVwidGl0bGVDYW5jZWxBcHBDb25maXJtXCI+e3snQ2FuY2VsIHRoZSBhcHBvaW50bWVudCd8dHJhbnNsYXRlfX08L2g2PlxyXG4gICAgPHAgY2xhc3M9XCJtdC0yIHRleHQtY2VudGVyXCIgZGF0YS10ZXN0LWlkPVwibXNnQ2FuY2VsQXBwQ29uZmlybVwiPlxyXG4gICAgICB7eydBcmUgeW91IHN1cmUgeW91IHdhbnQgdG8gY2FuY2VsIHlvdXIgYXBwb2ludG1lbnQgb24nfHRyYW5zbGF0ZX19IFxyXG4gICAgICA8YiBkYXRhLXRlc3QtaWQ9XCJjYW5jZWxBcHBDb25maXJtRGF0ZVwiPnt7ZGF0YT8uc2xvdEpzRGF0ZXxkYXRlOidkZCBNTU1NJ319PC9iPiBcclxuICAgICAge3snYXQnfHRyYW5zbGF0ZX19IFxyXG4gICAgICA8YiBkYXRhLXRlc3QtaWQ9XCJjYW5jZWxBcHBDb25maXJtVGltZVwiPnt7ZGF0YT8uc2xvdFRpbWV9fTwvYj4/XHJcbiAgICA8L3A+XHJcbiAgPC9kaXY+XHJcblxyXG4gIDxkaXYgY2xhc3M9XCJtb2RhbC1hY3Rpb24tYnRuLWNvblwiIGRhdGEtdGVzdC1pZD1cImNhbmNlbEFwcENvbmZpcm1BY3Rpb25zXCI+XHJcbiAgICA8YnV0dG9uIGNsYXNzPVwibW9kYWwtYnRuIHdoaXRlLWJ0biBtci0zXCIgdHlwZT1cImJ1dHRvblwiIChjbGljayk9XCJjbG9zZShmYWxzZSlcIiBkYXRhLXRlc3QtaWQ9XCJidG5Hb0JhY2tDYW5jZWxBcHBDb25maXJtXCI+XHJcbiAgICAgIHt7J0dvIGJhY2snfHRyYW5zbGF0ZX19XHJcbiAgICA8L2J1dHRvbj5cclxuICAgIDxidXR0b24gY2xhc3M9XCJtb2RhbC1idG4gYmx1ZS1idG5cIiB0eXBlPVwiYnV0dG9uXCIgKGNsaWNrKT1cImNhbmNlbCgpXCIgZGF0YS10ZXN0LWlkPVwiYnRuQ2FuY2VsQXBwQ29uZmlybVwiPlxyXG4gICAgICB7eydDYW5jZWwnfHRyYW5zbGF0ZX19XHJcbiAgICA8L2J1dHRvbj5cclxuICA8L2Rpdj5cclxuPC9kaXY+XHJcbiJdfQ==