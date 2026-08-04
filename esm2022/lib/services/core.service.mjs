import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { RescheduleAppointmentConfirmComponent } from '../modal-components/reschedule-appointment-confirm/reschedule-appointment-confirm.component';
import { CancelAppointmentConfirmComponent } from '../modal-components/cancel-appointment-confirm/cancel-appointment-confirm.component';
import { RescheduleAppointmentComponent } from '../modal-components/reschedule-appointment/reschedule-appointment.component';
import * as i0 from "@angular/core";
import * as i1 from "@angular/material/dialog";
export class CoreService {
    dialog;
    constructor(dialog) {
        this.dialog = dialog;
    }
    /**
    * Open cancel appointment confirmation modal
    * @param {any} data - Dialog data
    * @return {Observable<any>} - Dialog result
    */
    openConfirmCancelAppointmentModal(data) {
        const dialogRef = this.dialog.open(CancelAppointmentConfirmComponent, { panelClass: "modal-md", data, hasBackdrop: true, disableClose: true });
        return dialogRef.afterClosed();
    }
    /**
    * Open reschedule appointment modal
    * @param {any} data - Dialog data
    * @return {Observable<any>} - Dialog result
    */
    openRescheduleAppointmentModal(data) {
        const dialogRef = this.dialog.open(RescheduleAppointmentComponent, { panelClass: "modal-md", data, hasBackdrop: true, disableClose: true });
        return dialogRef.afterClosed();
    }
    /**
    * Open reschedule appointment confirmation modal
    * @param {any} data - Dialog data
    * @return {Observable<any>} - Dialog result
    */
    openRescheduleAppointmentConfirmModal(data) {
        const dialogRef = this.dialog.open(RescheduleAppointmentConfirmComponent, { panelClass: "modal-md", data, hasBackdrop: true, disableClose: true });
        return dialogRef.afterClosed();
    }
    /**
    * Convert blob to base64
    * @param {Blob} blob - Blob  file
    * @return {Promise} - Promise containing base64
    */
    blobToBase64(blob) {
        return new Promise((resolve, _) => {
            const reader = new FileReader();
            reader.onloadend = () => resolve(reader.result);
            reader.readAsDataURL(blob);
        });
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.3.0", ngImport: i0, type: CoreService, deps: [{ token: i1.MatDialog }], target: i0.ɵɵFactoryTarget.Injectable });
    static ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "14.3.0", ngImport: i0, type: CoreService, providedIn: 'root' });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.3.0", ngImport: i0, type: CoreService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root'
                }]
        }], ctorParameters: function () { return [{ type: i1.MatDialog }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29yZS5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvaWgtbGlicmFyeS9zcmMvbGliL3NlcnZpY2VzL2NvcmUuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzNDLE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSwwQkFBMEIsQ0FBQztBQUVyRCxPQUFPLEVBQUUscUNBQXFDLEVBQUUsTUFBTSw2RkFBNkYsQ0FBQztBQUNwSixPQUFPLEVBQUUsaUNBQWlDLEVBQUUsTUFBTSxxRkFBcUYsQ0FBQztBQUN4SSxPQUFPLEVBQUUsOEJBQThCLEVBQUUsTUFBTSw2RUFBNkUsQ0FBQzs7O0FBSzdILE1BQU0sT0FBTyxXQUFXO0lBRUY7SUFBcEIsWUFBb0IsTUFBaUI7UUFBakIsV0FBTSxHQUFOLE1BQU0sQ0FBVztJQUFJLENBQUM7SUFFMUM7Ozs7TUFJRTtJQUNGLGlDQUFpQyxDQUFDLElBQVM7UUFDekMsTUFBTSxTQUFTLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsaUNBQWlDLEVBQUUsRUFBRSxVQUFVLEVBQUUsVUFBVSxFQUFFLElBQUksRUFBRSxXQUFXLEVBQUUsSUFBSSxFQUFFLFlBQVksRUFBRSxJQUFJLEVBQUUsQ0FBQyxDQUFDO1FBQy9JLE9BQU8sU0FBUyxDQUFDLFdBQVcsRUFBRSxDQUFDO0lBQ2pDLENBQUM7SUFFRDs7OztNQUlFO0lBQ0YsOEJBQThCLENBQUMsSUFBUztRQUN0QyxNQUFNLFNBQVMsR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyw4QkFBOEIsRUFBRSxFQUFFLFVBQVUsRUFBRSxVQUFVLEVBQUUsSUFBSSxFQUFFLFdBQVcsRUFBRSxJQUFJLEVBQUUsWUFBWSxFQUFFLElBQUksRUFBRSxDQUFDLENBQUM7UUFDNUksT0FBTyxTQUFTLENBQUMsV0FBVyxFQUFFLENBQUM7SUFDakMsQ0FBQztJQUVEOzs7O01BSUU7SUFDRixxQ0FBcUMsQ0FBQyxJQUFTO1FBQzdDLE1BQU0sU0FBUyxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLHFDQUFxQyxFQUFFLEVBQUUsVUFBVSxFQUFFLFVBQVUsRUFBRSxJQUFJLEVBQUUsV0FBVyxFQUFFLElBQUksRUFBRSxZQUFZLEVBQUUsSUFBSSxFQUFFLENBQUMsQ0FBQztRQUNuSixPQUFPLFNBQVMsQ0FBQyxXQUFXLEVBQUUsQ0FBQztJQUNqQyxDQUFDO0lBRUQ7Ozs7TUFJRTtJQUNGLFlBQVksQ0FBQyxJQUFJO1FBQ2YsT0FBTyxJQUFJLE9BQU8sQ0FBQyxDQUFDLE9BQU8sRUFBRSxDQUFDLEVBQUUsRUFBRTtZQUNoQyxNQUFNLE1BQU0sR0FBRyxJQUFJLFVBQVUsRUFBRSxDQUFDO1lBQ2hDLE1BQU0sQ0FBQyxTQUFTLEdBQUcsR0FBRyxFQUFFLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQztZQUNoRCxNQUFNLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQzdCLENBQUMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQzt1R0E3Q1UsV0FBVzsyR0FBWCxXQUFXLGNBRlYsTUFBTTs7MkZBRVAsV0FBVztrQkFIdkIsVUFBVTttQkFBQztvQkFDVixVQUFVLEVBQUUsTUFBTTtpQkFDbkIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IE1hdERpYWxvZyB9IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsL2RpYWxvZyc7XHJcbmltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tICdyeGpzL2ludGVybmFsL09ic2VydmFibGUnO1xyXG5pbXBvcnQgeyBSZXNjaGVkdWxlQXBwb2ludG1lbnRDb25maXJtQ29tcG9uZW50IH0gZnJvbSAnLi4vbW9kYWwtY29tcG9uZW50cy9yZXNjaGVkdWxlLWFwcG9pbnRtZW50LWNvbmZpcm0vcmVzY2hlZHVsZS1hcHBvaW50bWVudC1jb25maXJtLmNvbXBvbmVudCc7XHJcbmltcG9ydCB7IENhbmNlbEFwcG9pbnRtZW50Q29uZmlybUNvbXBvbmVudCB9IGZyb20gJy4uL21vZGFsLWNvbXBvbmVudHMvY2FuY2VsLWFwcG9pbnRtZW50LWNvbmZpcm0vY2FuY2VsLWFwcG9pbnRtZW50LWNvbmZpcm0uY29tcG9uZW50JztcclxuaW1wb3J0IHsgUmVzY2hlZHVsZUFwcG9pbnRtZW50Q29tcG9uZW50IH0gZnJvbSAnLi4vbW9kYWwtY29tcG9uZW50cy9yZXNjaGVkdWxlLWFwcG9pbnRtZW50L3Jlc2NoZWR1bGUtYXBwb2ludG1lbnQuY29tcG9uZW50JztcclxuXHJcbkBJbmplY3RhYmxlKHtcclxuICBwcm92aWRlZEluOiAncm9vdCdcclxufSlcclxuZXhwb3J0IGNsYXNzIENvcmVTZXJ2aWNlIHtcclxuXHJcbiAgY29uc3RydWN0b3IocHJpdmF0ZSBkaWFsb2c6IE1hdERpYWxvZykgeyB9XHJcblxyXG4gIC8qKlxyXG4gICogT3BlbiBjYW5jZWwgYXBwb2ludG1lbnQgY29uZmlybWF0aW9uIG1vZGFsXHJcbiAgKiBAcGFyYW0ge2FueX0gZGF0YSAtIERpYWxvZyBkYXRhXHJcbiAgKiBAcmV0dXJuIHtPYnNlcnZhYmxlPGFueT59IC0gRGlhbG9nIHJlc3VsdFxyXG4gICovXHJcbiAgb3BlbkNvbmZpcm1DYW5jZWxBcHBvaW50bWVudE1vZGFsKGRhdGE6IGFueSk6IE9ic2VydmFibGU8YW55PiB7XHJcbiAgICBjb25zdCBkaWFsb2dSZWYgPSB0aGlzLmRpYWxvZy5vcGVuKENhbmNlbEFwcG9pbnRtZW50Q29uZmlybUNvbXBvbmVudCwgeyBwYW5lbENsYXNzOiBcIm1vZGFsLW1kXCIsIGRhdGEsIGhhc0JhY2tkcm9wOiB0cnVlLCBkaXNhYmxlQ2xvc2U6IHRydWUgfSk7XHJcbiAgICByZXR1cm4gZGlhbG9nUmVmLmFmdGVyQ2xvc2VkKCk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAqIE9wZW4gcmVzY2hlZHVsZSBhcHBvaW50bWVudCBtb2RhbFxyXG4gICogQHBhcmFtIHthbnl9IGRhdGEgLSBEaWFsb2cgZGF0YVxyXG4gICogQHJldHVybiB7T2JzZXJ2YWJsZTxhbnk+fSAtIERpYWxvZyByZXN1bHRcclxuICAqL1xyXG4gIG9wZW5SZXNjaGVkdWxlQXBwb2ludG1lbnRNb2RhbChkYXRhOiBhbnkpOiBPYnNlcnZhYmxlPGFueT4ge1xyXG4gICAgY29uc3QgZGlhbG9nUmVmID0gdGhpcy5kaWFsb2cub3BlbihSZXNjaGVkdWxlQXBwb2ludG1lbnRDb21wb25lbnQsIHsgcGFuZWxDbGFzczogXCJtb2RhbC1tZFwiLCBkYXRhLCBoYXNCYWNrZHJvcDogdHJ1ZSwgZGlzYWJsZUNsb3NlOiB0cnVlIH0pO1xyXG4gICAgcmV0dXJuIGRpYWxvZ1JlZi5hZnRlckNsb3NlZCgpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgKiBPcGVuIHJlc2NoZWR1bGUgYXBwb2ludG1lbnQgY29uZmlybWF0aW9uIG1vZGFsXHJcbiAgKiBAcGFyYW0ge2FueX0gZGF0YSAtIERpYWxvZyBkYXRhXHJcbiAgKiBAcmV0dXJuIHtPYnNlcnZhYmxlPGFueT59IC0gRGlhbG9nIHJlc3VsdFxyXG4gICovXHJcbiAgb3BlblJlc2NoZWR1bGVBcHBvaW50bWVudENvbmZpcm1Nb2RhbChkYXRhOiBhbnkpOiBPYnNlcnZhYmxlPGFueT4ge1xyXG4gICAgY29uc3QgZGlhbG9nUmVmID0gdGhpcy5kaWFsb2cub3BlbihSZXNjaGVkdWxlQXBwb2ludG1lbnRDb25maXJtQ29tcG9uZW50LCB7IHBhbmVsQ2xhc3M6IFwibW9kYWwtbWRcIiwgZGF0YSwgaGFzQmFja2Ryb3A6IHRydWUsIGRpc2FibGVDbG9zZTogdHJ1ZSB9KTtcclxuICAgIHJldHVybiBkaWFsb2dSZWYuYWZ0ZXJDbG9zZWQoKTtcclxuICB9XHJcbiAgICBcclxuICAvKipcclxuICAqIENvbnZlcnQgYmxvYiB0byBiYXNlNjRcclxuICAqIEBwYXJhbSB7QmxvYn0gYmxvYiAtIEJsb2IgIGZpbGVcclxuICAqIEByZXR1cm4ge1Byb21pc2V9IC0gUHJvbWlzZSBjb250YWluaW5nIGJhc2U2NFxyXG4gICovXHJcbiAgYmxvYlRvQmFzZTY0KGJsb2IpIHtcclxuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgXykgPT4ge1xyXG4gICAgICBjb25zdCByZWFkZXIgPSBuZXcgRmlsZVJlYWRlcigpO1xyXG4gICAgICByZWFkZXIub25sb2FkZW5kID0gKCkgPT4gcmVzb2x2ZShyZWFkZXIucmVzdWx0KTtcclxuICAgICAgcmVhZGVyLnJlYWRBc0RhdGFVUkwoYmxvYik7XHJcbiAgICB9KTtcclxuICB9XHJcbn1cclxuIl19