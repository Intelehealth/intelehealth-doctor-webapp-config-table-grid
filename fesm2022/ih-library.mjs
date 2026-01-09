import * as i0 from '@angular/core';
import { Injectable, Inject, Component, Directive, Input, EventEmitter, ElementRef, ChangeDetectionStrategy, ViewChild, Output, NgModule, NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import * as i4 from '@ngx-translate/core';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import * as i13 from '@angular/material/paginator';
import { MatPaginatorModule } from '@angular/material/paginator';
import * as i1 from '@angular/common/http';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import moment from 'moment';
import * as i1$1 from '@angular/material/dialog';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import * as i12 from '@angular/common';
import { DecimalPipe, formatDate, CommonModule, registerLocaleData } from '@angular/common';
import * as i3 from 'ngx-toastr';
import { ToastrModule } from 'ngx-toastr';
import { NativeDateAdapter, DateAdapter, MAT_DATE_FORMATS, MatNativeDateModule } from '@angular/material/core';
import * as i5 from '@angular/material/form-field';
import { MatFormFieldModule } from '@angular/material/form-field';
import * as i21 from '@angular/forms';
import { FormGroup, FormControl, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import * as i8 from '@angular/material/datepicker';
import { MatDatepickerModule } from '@angular/material/datepicker';
import * as i17 from '@angular/material/menu';
import { MatMenuTrigger, MatMenuModule } from '@angular/material/menu';
import * as i7 from '@angular/platform-browser';
import * as i9 from 'ngx-permissions';
import { NgxPermissionsModule } from 'ngx-permissions';
import * as i10 from 'ngx-ui-loader';
import { NgxUiLoaderModule } from 'ngx-ui-loader';
import * as i11 from '@angular/router';
import { RouterModule } from '@angular/router';
import * as i14 from '@angular/material/tooltip';
import { MatTooltipModule } from '@angular/material/tooltip';
import * as i16 from '@angular/material/expansion';
import { MatExpansionModule } from '@angular/material/expansion';
import * as i18 from '@angular/material/table';
import { MatTableModule } from '@angular/material/table';
import * as i19 from '@angular/material/icon';
import { MatIconModule } from '@angular/material/icon';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import localeRu from '@angular/common/locales/ru';
import localeEn from '@angular/common/locales/en';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { NgSelectModule } from '@ng-select/ng-select';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatTabsModule } from '@angular/material/tabs';
import { MatInputModule } from '@angular/material/input';
import { CdkAccordionModule } from '@angular/cdk/accordion';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatBottomSheetModule } from '@angular/material/bottom-sheet';
import { MatSortModule } from '@angular/material/sort';

class IhLibraryService {
    constructor() { }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.3.0", ngImport: i0, type: IhLibraryService, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
    static ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "14.3.0", ngImport: i0, type: IhLibraryService, providedIn: 'root' });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.3.0", ngImport: i0, type: IhLibraryService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root'
                }]
        }], ctorParameters: function () { return []; } });

class AppointmentService {
    http;
    mindmapURL;
    constructor(http, environment) {
        this.http = http;
        this.mindmapURL = environment.mindmapURL;
    }
    /**
    * Create or update appointment
    * @param {any} payload - Payload for create or update appointment
    * @return {Observable<any>}
    */
    updateOrCreateAppointment(payload) {
        return this.http.post(`${this.mindmapURL}/appointment/createOrUpdateSchedule`, payload);
    }
    /**
    * Update daysOffs
    * @param {any} payload - Payload for update daysOff's
    * @return {Observable<any>}
    */
    updateDaysOff(payload) {
        return this.http.post(`${this.mindmapURL}/appointment/updateDaysOff`, payload);
    }
    /**
    * Get user appointments
    * @param {string} userUuid - User uuid
    * @param {string} year - Year
    * @param {string} month - Month
    * @return {Observable<any>}
    */
    getUserAppoitment(userUuid, year, month) {
        return this.http.get(`${this.mindmapURL}/appointment/getSchedule/${userUuid}?year=${year}&month=${month}`);
    }
    /**
    * Get user slots
    * @param {string} userUuid - User uuid
    * @param {string} fromDate - From date
    * @param {string} toDate - To date
    * @return {Observable<any>}
    */
    getUserSlots(userUuid, fromDate, toDate, speciality = null, pending_visits = null) {
        let url = `${this.mindmapURL}/appointment/getUserSlots/${userUuid}?fromDate=${fromDate}&toDate=${toDate}`;
        if (speciality) {
            url += `&speciality=${speciality}`;
        }
        if (pending_visits != null) {
            url += `&pending_visits=` + pending_visits;
        }
        return this.http.get(url);
    }
    /**
    * Get user appointment slots
    * @param {string} fromDate - From date
    * @param {string} toDate - To date
    * @param {string} speciality - Speciality
    * @return {Observable<any>}
    */
    getAppointmentSlots(fromDate, toDate, speciality) {
        return this.http.get(`${this.mindmapURL}/appointment/getAppointmentSlots?fromDate=${fromDate}&toDate=${toDate}&speciality=${speciality}`);
    }
    /**
    * Get appointment for a visit
    * @param {string} visitId - Visit uuid
    * @return {Observable<any>}
    */
    getAppointment(visitId) {
        return this.http.get(`${this.mindmapURL}/appointment/getAppointment/${visitId}`);
    }
    /**
    * Get scheduled months
    * @param {string} userUuid - User uuid
    * @param {string} year - Year
    * @param {string} speciality - Speciality
    * @return {Observable<any>}
    */
    getScheduledMonths(userUuid, year, speciality = null) {
        let url = `${this.mindmapURL}/appointment/getScheduledMonths/${userUuid}?year=${year}`;
        if (speciality) {
            url += `&speciality=${speciality}`;
        }
        return this.http.get(url);
    }
    /**
    * Get followup visits
    * @param {string} providerId - Provider uuid
    * @return {Observable<any>}
    */
    getFollowUpVisit(providerId) {
        return this.http.get(`${this.mindmapURL}/openmrs/getFollowUpVisit/${providerId}`);
    }
    /**
    * Reschedule appointment
    * @param {string} payload - Payload to reschedule appointment
    * @return {Observable<any>}
    */
    rescheduleAppointment(payload) {
        return this.http.post(`${this.mindmapURL}/appointment/rescheduleAppointment`, { ...payload, webApp: true });
    }
    /**
    * Cancel appointment
    * @param {string} payload - Payload to cancel appointment
    * @return {Observable<any>}
    */
    cancelAppointment(payload) {
        return this.http.post(`${this.mindmapURL}/appointment/cancelAppointment`, { ...payload, webApp: true });
    }
    /**
    * Complete appointment
    * @param {string} payload - Payload to complete appointment
    * @return {Observable<any>}
    */
    completeAppointment(payload) {
        return this.http.post(`${this.mindmapURL}/appointment/completeAppointment`, payload);
    }
    /**
    * Check appointment present or not
    * @param {string} userUuid - User uuid
    * @param {string} fromDate - From date
    * @param {string} toDate - To date
    * @param {string} speciality - Speciality
    * @return {Observable<any>}
    */
    checkAppointmentPresent(userUuid, fromDate, toDate, speciality) {
        return this.http.get(`${this.mindmapURL}/appointment/checkAppointment/${userUuid}?fromDate=${fromDate}&toDate=${toDate}&speciality=${speciality}`);
    }
    /**
    * Update speciality for the calendar slots
    * @param {string} userUuid - User uuid
    * @param {string} speciality - Speciality
    * @return {Observable<any>}
    */
    updateSlotSpeciality(userUuid, speciality) {
        return this.http.put(`${this.mindmapURL}/appointment/updateSlotSpeciality/${userUuid}?speciality=${speciality}`, null);
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.3.0", ngImport: i0, type: AppointmentService, deps: [{ token: i1.HttpClient }, { token: 'environment' }], target: i0.ɵɵFactoryTarget.Injectable });
    static ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "14.3.0", ngImport: i0, type: AppointmentService, providedIn: "root" });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.3.0", ngImport: i0, type: AppointmentService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: "root",
                }]
        }], ctorParameters: function () { return [{ type: i1.HttpClient }, { type: undefined, decorators: [{
                    type: Inject,
                    args: ['environment']
                }] }]; } });

class VisitService {
    http;
    isVisitSummaryShow = false;
    isHelpButtonShow = false;
    triggerAction = new Subject();
    chatVisitId;
    baseURL;
    mindmapURL;
    baseURLAbha;
    constructor(http, environment) {
        this.http = http;
        this.baseURL = environment.baseURL;
        this.mindmapURL = environment.mindmapURL;
        this.baseURLAbha = environment.baseURLAbha;
    }
    /**
    * Get visit
    * @param {string} uuid - Visit uuid
    * @return {Observable<any>}
    */
    getVisit(uuid) {
        // tslint:disable-next-line:max-line-length
        const url = `${this.baseURL}/visit/${uuid}?includeInactive=false&v=custom:(uuid,patient:(uuid,identifiers:(identifier,identifierType:(name,uuid,display)),person:(display,gender,age,birthdate)),location:(display),encounters:(display,encounterDatetime,voided,encounterType:(display),encounterProviders),attributes)`;
        return this.http.get(url);
    }
    /**
    * Get visits for a patient
    * @param {string} id - Patient uuid
    * @return {Observable<any>}
    */
    recentVisits(id) {
        const url = `${this.baseURL}/visit?patient=${id}&v=full`;
        return this.http.get(url);
    }
    /**
    * Get visit
    * @param {string} uuid - Visit uuid
    * @param {string} v - response version format
    * @return {Observable<any>}
    */
    fetchVisitDetails(uuid, v = "custom:(location:(display),uuid,display,startDatetime,dateCreated,stopDatetime,encounters:(display,uuid,encounterDatetime,encounterType:(display),obs:(display,uuid,value,concept:(uuid,display)),encounterProviders:(display,provider:(uuid,attributes,person:(uuid,display,gender,age)))),patient:(uuid,identifiers:(identifier,identifierType:(name,uuid,display)),attributes,person:(display,gender,age)),attributes)") {
        // tslint:disable-next-line:max-line-length
        const url = `${this.baseURL}/visit/${uuid}?v=${v}`;
        return this.http.get(url);
    }
    /**
    * Get visit
    * @param {string} uuid - Visit uuid
    * @param {string} v - response version format
    * @return {Observable<any>}
    */
    fetchVisitDetails2(externalPrescriptionCred, uuid, v = "custom:(location:(display),uuid,display,startDatetime,dateCreated,stopDatetime,encounters:(display,uuid,encounterDatetime,encounterType:(display),obs:(display,uuid,value,concept:(uuid,display)),encounterProviders:(display,provider:(uuid,attributes,person:(uuid,display,gender,age)))),patient:(uuid,identifiers:(identifier,identifierType:(name,uuid,display)),attributes,person:(display,gender,age)),attributes)") {
        // tslint:disable-next-line:max-line-length
        let headers = new HttpHeaders();
        headers = headers.append('Authorization', 'Basic ' + externalPrescriptionCred);
        const url = `${this.baseURL}/visit/${uuid}?v=${v}`;
        return this.http.get(url, { headers });
    }
    /**
    * Get visit
    * @param {string} uuid - Visit uuid
    * @param {string} v - response format
    * @return {Observable<any>}
    */
    fetchVisitPatient(externalPrescriptionCred, uuid, v = "custom:(uuid,patient:(attributes,identifiers:(identifier,identifierType:(name,uuid,display))))") {
        let headers = new HttpHeaders();
        headers = headers.append('Authorization', 'Basic ' + externalPrescriptionCred);
        const url = `${this.baseURL}/visit/${uuid}?v=${v}`;
        return this.http.get(url, { headers });
    }
    /**
    * Get visit
    * @param {string} uuid - Visit uuid
    * @param {string} v - response version format
    * @return {Observable<any>}
    */
    getVisitDetails(uuid, v = "custom:(location:(display),uuid,display,startDatetime,stopDatetime,encounters:(display,uuid,encounterDatetime,encounterType:(display),obs:(display,uuid,value),encounterProviders:(display,provider:(uuid,person:(uuid,display,gender,age),attributes))),patient:(uuid,identifiers:(identifier,identifierType:(name,uuid,display)),person:(display,gender,age)))") {
        // tslint:disable-next-line:max-line-length
        const url = `${this.baseURL}/visit/${uuid}?v=${v}`;
        return this.http.get(url);
    }
    /**
    * Get visit attributes
    * @param {string} visitId - Visit uuid
    * @return {Observable<any>}
    */
    getAttribute(visitId) {
        const url = `${this.baseURL}/visit/${visitId}/attribute`;
        return this.http.get(url);
    }
    /**
    * Post visit attribute
    * @param {string} visitId - Visit uuid
    * @param {any} json - Attribute payload
    * @return {Observable<any>}
    */
    postAttribute(visitId, json) {
        const url = `${this.baseURL}/visit/${visitId}/attribute`;
        return this.http.post(url, json);
    }
    /**
    * Update visit attribute
    * @param {string} visitId - Visit uuid
    * @param {string} attributeUuid - Visit attribute uuid
    * @param {any} json - Attribute payload
    * @return {Observable<any>}
    */
    updateAttribute(visitId, attributeUuid, json) {
        const url = `${this.baseURL}/visit/${visitId}/attribute/${attributeUuid}`;
        return this.http.post(url, json);
    }
    /**
    * Delete visit attribute
    * @param {string} visitId - Visit uuid
    * @param {string} uuid - Visit attribute uuid
    * @return {Observable<any>}
    */
    deleteAttribute(visitId, uuid) {
        const url = `${this.baseURL}/visit/${visitId}/attribute/${uuid}`;
        return this.http.delete(url);
    }
    /**
    * Get patient details
    * @param {string} id - Patient uuid
    * @param {string} v - response format
    * @return {Observable<any>}
    */
    patientInfo(id, v = 'custom:(uuid,attributes,identifiers,person:(uuid,display,gender,preferredName:(givenName,familyName,middleName),birthdate,age,preferredAddress:(cityVillage,address1,address2,country,stateProvince,countyDistrict,postalCode),attributes:(value,attributeType:(display))))') {
        // tslint:disable-next-line: max-line-length
        const url = `${this.baseURL}/patient/${id}?v=${v}`;
        return this.http.get(url);
    }
    /**
    * Get whatsapp link
    * @param {string} whatsapp - Whatspp number
    * @param {string} msg - Message to be sent
    * @return {Observable<any>}
    */
    getWhatsappLink(whatsapp, msg = `Hello I'm calling for consultation`) {
        let text = encodeURI(msg);
        let whatsappLink = `https://wa.me/${whatsapp}?text=${text}`;
        return whatsappLink;
    }
    /**
    * Parse observation data
    * @param {any} data - Observation data
    * @return {any} - Observation data with parsed value
    */
    getData(data) {
        if (data?.value.toString().startsWith("{")) {
            let value = JSON.parse(data.value.toString());
            data.value = value["en"];
        }
        return data;
    }
    /**
    * Parse custom observation data
    * @param {any} data - Custom observation data
    * @return {any} - Observation data with parsed value
    */
    getData2(data) {
        if (data?.value_text.toString().startsWith("{")) {
            let value = JSON.parse(data.value_text.toString());
            data.value_text = value["en"];
        }
        return data;
    }
    /**
    * Get awaiting visits
    * @param {string} speciality - Visit speciality
    * @param {number} page - Page number
    * @return {Observable<any>}
    */
    getAwaitingVisits(speciality, page = 1) {
        return this.http.get(`${this.mindmapURL}/openmrs/getAwaitingVisits?speciality=${speciality}&page=${page}`);
    }
    /**
    * Get priority visits
    * @param {string} speciality - Visit speciality
    * @param {number} page - Page number
    * @return {Observable<any>}
    */
    getPriorityVisits(speciality, page = 1) {
        return this.http.get(`${this.mindmapURL}/openmrs/getPriorityVisits?speciality=${speciality}&page=${page}`);
    }
    /**
    * Get inprogress visits
    * @param {string} speciality - Visit speciality
    * @param {number} page - Page number
    * @return {Observable<any>}
    */
    getInProgressVisits(speciality, page = 1) {
        return this.http.get(`${this.mindmapURL}/openmrs/getInProgressVisits?speciality=${speciality}&page=${page}`);
    }
    /**
    * Get completed visits
    * @param {string} speciality - Visit speciality
    * @param {number} page - Page number
    * @return {Observable<any>}
    */
    getCompletedVisits(speciality, page = 1, countOnly = false) {
        return this.http.get(`${this.mindmapURL}/openmrs/getCompletedVisits?speciality=${speciality}&page=${page}&countOnly=${countOnly}`);
    }
    /**
     * Get follow up visits
     * @param {string} speciality - Visit speciality
     * @param {number} page - Page number
     * @return {Observable<any>}
     */
    getFollowUpVisits(speciality, page = 1, countOnly = false) {
        return this.http.get(`${this.mindmapURL}/openmrs/getFollowUpVisits?speciality=${speciality}&page=${page}&countOnly=${countOnly}`);
    }
    /**
    * Get ended visits
    * @param {string} speciality - Visit speciality
    * @param {number} page - Page number
    * @return {Observable<any>}
    */
    getEndedVisits(speciality, page = 1) {
        return this.http.get(`${this.mindmapURL}/openmrs/getEndedVisits?speciality=${speciality}&page=${page}`);
    }
    /**
     * Post visit data to abdm
     * @param {any} json - Attribute payload
     * @return {Observable<any>}
     */
    postVisitToABDM(json) {
        const url = `${this.baseURLAbha}/abha/post-care-context`;
        return this.http.post(url, json);
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.3.0", ngImport: i0, type: VisitService, deps: [{ token: i1.HttpClient }, { token: 'environment' }], target: i0.ɵɵFactoryTarget.Injectable });
    static ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "14.3.0", ngImport: i0, type: VisitService, providedIn: "root" });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.3.0", ngImport: i0, type: VisitService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: "root",
                }]
        }], ctorParameters: function () { return [{ type: i1.HttpClient }, { type: undefined, decorators: [{
                    type: Inject,
                    args: ['environment']
                }] }]; } });

class RescheduleAppointmentConfirmComponent {
    data;
    dialogRef;
    constructor(data, dialogRef) {
        this.data = data;
        this.dialogRef = dialogRef;
    }
    /**
    * Close modal
    * @param {boolean} val - Dialog result
    * @return {void}
    */
    close(val) {
        this.dialogRef.close(val);
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.3.0", ngImport: i0, type: RescheduleAppointmentConfirmComponent, deps: [{ token: MAT_DIALOG_DATA }, { token: i1$1.MatDialogRef }], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "14.3.0", type: RescheduleAppointmentConfirmComponent, selector: "app-reschedule-appointment-confirm", ngImport: i0, template: "<div class=\"intel-con-modal\" data-test-id=\"rescheduleConfirmModal\">\r\n  <!-- Close Button -->\r\n  <div class=\"close-btn-con\" data-test-id=\"rescheduleConfirmCloseContainer\">\r\n    <button class=\"modal-close-btn\" (click)=\"close(false)\" data-test-id=\"btnCloseRescheduleConfirm\">\r\n      <img src=\"assets/svgs/CloseX.svg\" alt=\"close icon\" data-test-id=\"rescheduleConfirmCloseIcon\">\r\n    </button>\r\n  </div>\r\n\r\n  <!-- Modal Content -->\r\n  <div class=\"modal-con mt-4\" data-test-id=\"rescheduleConfirmContent\">\r\n    <img src=\"assets/svgs/appointment.svg\" alt=\"appointment icon\" width=\"80px\" height=\"80px\" data-test-id=\"rescheduleConfirmIcon\">\r\n    <h6 class=\"mt-3\" data-test-id=\"rescheduleConfirmTitle\">{{'Reschedule the appointment'|translate}}</h6>\r\n    <p class=\"mt-2 text-center\" data-test-id=\"rescheduleConfirmMessage\">\r\n      {{'Are you sure you want to reschedule appointment?'|translate }}\r\n    </p>\r\n\r\n    <!-- Slot Comparison -->\r\n    <div class=\"slot-con d-flex justify-content-center align-items-center py-3\" data-test-id=\"rescheduleConfirmSlotContainer\">\r\n      <!-- Old Slot -->\r\n      <div class=\"d-flex flex-column align-items-center justify-content-center px-2\" data-test-id=\"rescheduleOldSlot\">\r\n        <b data-test-id=\"rescheduleOldSlotDate\">{{data?.appointment?.slotJsDate|date:'dd MMMM'}}</b>\r\n        <b data-test-id=\"rescheduleOldSlotTime\">{{data?.appointment?.slotTime}}</b>\r\n      </div>\r\n      <!-- To Label -->\r\n      <div class=\"d-flex flex-column align-items-center justify-content-center px-2\" data-test-id=\"rescheduleToLabel\">\r\n        <span class=\"text-muted\">to</span>\r\n      </div>\r\n      <!-- New Slot -->\r\n      <div class=\"d-flex flex-column align-items-center justify-content-center px-2\" data-test-id=\"rescheduleNewSlot\">\r\n        <b data-test-id=\"rescheduleNewSlotDate\">{{data?.newSlot?.date|date:'dd MMMM'}}</b>\r\n        <b data-test-id=\"rescheduleNewSlotTime\">{{data?.newSlot?.slot}}</b>\r\n      </div>\r\n    </div>\r\n  </div>\r\n\r\n  <!-- Action Buttons -->\r\n  <div class=\"modal-action-btn-con\" data-test-id=\"rescheduleConfirmActionContainer\">\r\n    <button class=\"modal-btn white-btn mr-3\" type=\"button\" (click)=\"close(false)\" data-test-id=\"btnCancelRescheduleConfirm\">\r\n      {{'Go Back'|translate}}\r\n    </button>\r\n    <button class=\"modal-btn blue-btn\" type=\"button\" (click)=\"close(true)\" data-test-id=\"btnSubmitRescheduleConfirm\">\r\n      {{'Confirm'|translate}}\r\n    </button>\r\n  </div>\r\n</div>\r\n", styles: [".slot-con{font-size:18px;line-height:150%;color:var(--color-darkestBlue)}\n"], dependencies: [{ kind: "pipe", type: i12.DatePipe, name: "date" }, { kind: "pipe", type: i4.TranslatePipe, name: "translate" }] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.3.0", ngImport: i0, type: RescheduleAppointmentConfirmComponent, decorators: [{
            type: Component,
            args: [{ selector: 'app-reschedule-appointment-confirm', template: "<div class=\"intel-con-modal\" data-test-id=\"rescheduleConfirmModal\">\r\n  <!-- Close Button -->\r\n  <div class=\"close-btn-con\" data-test-id=\"rescheduleConfirmCloseContainer\">\r\n    <button class=\"modal-close-btn\" (click)=\"close(false)\" data-test-id=\"btnCloseRescheduleConfirm\">\r\n      <img src=\"assets/svgs/CloseX.svg\" alt=\"close icon\" data-test-id=\"rescheduleConfirmCloseIcon\">\r\n    </button>\r\n  </div>\r\n\r\n  <!-- Modal Content -->\r\n  <div class=\"modal-con mt-4\" data-test-id=\"rescheduleConfirmContent\">\r\n    <img src=\"assets/svgs/appointment.svg\" alt=\"appointment icon\" width=\"80px\" height=\"80px\" data-test-id=\"rescheduleConfirmIcon\">\r\n    <h6 class=\"mt-3\" data-test-id=\"rescheduleConfirmTitle\">{{'Reschedule the appointment'|translate}}</h6>\r\n    <p class=\"mt-2 text-center\" data-test-id=\"rescheduleConfirmMessage\">\r\n      {{'Are you sure you want to reschedule appointment?'|translate }}\r\n    </p>\r\n\r\n    <!-- Slot Comparison -->\r\n    <div class=\"slot-con d-flex justify-content-center align-items-center py-3\" data-test-id=\"rescheduleConfirmSlotContainer\">\r\n      <!-- Old Slot -->\r\n      <div class=\"d-flex flex-column align-items-center justify-content-center px-2\" data-test-id=\"rescheduleOldSlot\">\r\n        <b data-test-id=\"rescheduleOldSlotDate\">{{data?.appointment?.slotJsDate|date:'dd MMMM'}}</b>\r\n        <b data-test-id=\"rescheduleOldSlotTime\">{{data?.appointment?.slotTime}}</b>\r\n      </div>\r\n      <!-- To Label -->\r\n      <div class=\"d-flex flex-column align-items-center justify-content-center px-2\" data-test-id=\"rescheduleToLabel\">\r\n        <span class=\"text-muted\">to</span>\r\n      </div>\r\n      <!-- New Slot -->\r\n      <div class=\"d-flex flex-column align-items-center justify-content-center px-2\" data-test-id=\"rescheduleNewSlot\">\r\n        <b data-test-id=\"rescheduleNewSlotDate\">{{data?.newSlot?.date|date:'dd MMMM'}}</b>\r\n        <b data-test-id=\"rescheduleNewSlotTime\">{{data?.newSlot?.slot}}</b>\r\n      </div>\r\n    </div>\r\n  </div>\r\n\r\n  <!-- Action Buttons -->\r\n  <div class=\"modal-action-btn-con\" data-test-id=\"rescheduleConfirmActionContainer\">\r\n    <button class=\"modal-btn white-btn mr-3\" type=\"button\" (click)=\"close(false)\" data-test-id=\"btnCancelRescheduleConfirm\">\r\n      {{'Go Back'|translate}}\r\n    </button>\r\n    <button class=\"modal-btn blue-btn\" type=\"button\" (click)=\"close(true)\" data-test-id=\"btnSubmitRescheduleConfirm\">\r\n      {{'Confirm'|translate}}\r\n    </button>\r\n  </div>\r\n</div>\r\n", styles: [".slot-con{font-size:18px;line-height:150%;color:var(--color-darkestBlue)}\n"] }]
        }], ctorParameters: function () { return [{ type: undefined, decorators: [{
                    type: Inject,
                    args: [MAT_DIALOG_DATA]
                }] }, { type: i1$1.MatDialogRef }]; } });

const notifications = {
    ADMIN_UNREAD_COUNT: 'adminUnreadCount',
    GET_ADMIN_UNREAD_COUNT: 'getAdminUnreadCount',
    DOCTOR_UNREAD_COUNT: 'drUnreadCount',
    GET_DOCTOR_UNREAD_COUNT: 'getDrUnreadCount',
    SUPPORT_MESSAGE: 'supportMessage',
    ISREAD_SUPPORT: 'isreadSupport',
    UPDATE_MESSAGE: 'updateMessage',
};
const languages = {
    SELECTED_LANGUAGE: 'selectedLanguage',
};
const visitTypes = {
    VISIT_NOTE_PROVIDER: 'visitNoteProvider',
    PATIENT_VISIT_PROVIDER: 'patientVisitProvider',
    ENDED_VISIT: 'Ended Visit',
    COMPLETED_VISIT: 'Completed Visit',
    IN_PROGRESS_VISIT: 'In-progress Visit',
    PRIORITY_VISIT: 'Priority Visit',
    AWAITING_VISIT: 'Awaiting Visit',
    PATIENT_INTERACTION: 'Patient Interaction',
    HW_INTERACTION: 'HW Interaction',
    GENERAL_PHYSICIAN: 'General Physician',
    ADULTINITIAL: 'ADULTINITIAL',
    ASSOCIATED_SYMPTOMS: 'Associated symptoms',
    CURRENT_COMPLAINT: 'CURRENT COMPLAINT',
    PATIENT_EXIT_SURVEY: 'Patient Exit Survey',
    VISIT_COMPLETE: 'Visit Complete',
    FLAGGED: 'Flagged',
    VITALS: 'Vitals',
    VISIT_NOTE: 'Visit Note',
    MEDICAL_HISTORY: 'MEDICAL HISTORY',
    FAMILY_HISTORY: 'FAMILY HISTORY',
    FOLLOW_UP: 'Follow-up',
    NEW: 'New',
};
const doctorDetails = {
    TELEPHONE_NUMBER: 'Telephone Number',
    SPECIALIZATION: 'specialization',
    PROVIDER: 'provider',
    USER: 'user',
    DOCTOR_NAME: 'doctorName',
    PASSWORD: 'password',
    PHONE_NUMBER: 'phoneNumber',
    WHATS_APP: 'whatsapp',
    BIRTHDATE: 'birthdate',
    ADDRESS: 'address',
    CONSULTATION_LANGUAGE: 'consultationLanguage',
    COUNTRY_CODE: 'countryCode',
    EMAIL_ID: 'emailId',
    FONT_OF_SIGN: 'fontOfSign',
    QUALIFICATION: 'qualification',
    REGISTRATION_NUMBER: 'registrationNumber',
    RESEARCH_EXPERIENCE: 'researchExperience',
    SIGNATURE: 'signature',
    SIGNATURE_TYPE: 'signatureType',
    TEXT_OF_SIGN: 'textOfSign',
    TYPE_OF_PROFESSION: 'typeOfProfession',
    WORK_EXPERIENCE: 'workExperience',
    WORK_EXPERIENCE_DETAILS: 'workExperienceDetails',
    WHATS_APP_NUMBER: 'whatsAppNumber',
    ROLE: 'user_role',
    USER_NAME: 'username',
    IS_NEW_DOCTOR: 'isNewDoctor'
};
const facility = {
    facilities: [
        { id: 1, name: 'HSC' },
        { id: 2, name: 'PHC' },
        { id: 3, name: 'CHC' },
        { id: 4, name: 'SDH' },
        { id: 5, name: 'DH' },
        { id: 6, name: 'TH' },
        { id: 7, name: 'GH' },
        { id: 8, name: 'Private Hospital' },
    ]
};
const specialization = {
    specializations: [
        {
            id: 1,
            name: 'General Physician'
        },
        {
            id: 2,
            name: 'Dermatologist'
        },
        {
            id: 3,
            name: 'Gynecologist'
        },
        {
            id: 4,
            name: 'Pediatrician'
        }
    ]
};
const refer_specialization = {
    refer_specializations: [
        { id: 1, name: 'CHO' },
        { id: 2, name: 'MO' },
        { id: 3, name: 'General Physician' },
        { id: 4, name: 'Obstetrician & Gynecologist' },
        { id: 5, name: 'Pediatrician' },
        { id: 6, name: 'General Surgeon' },
        { id: 7, name: 'Dermatologist' },
        { id: 8, name: 'ENT Specialist' },
        { id: 9, name: 'Eye Specialist' },
        { id: 10, name: 'Dental Surgeon' },
    ]
};
const refer_prioritie = {
    refer_priorities: [
        { id: 1, name: 'Elective' },
        { id: 1, name: 'Urgent' }
    ]
};
const strength = {
    strengthList: [
        {
            id: 1,
            name: '5 Mg'
        },
        {
            id: 2,
            name: '10 Mg'
        },
        {
            id: 3,
            name: '50 Mg'
        },
        {
            id: 4,
            name: '75 Mg'
        },
        {
            id: 5,
            name: '100 Mg'
        },
        {
            id: 6,
            name: '500 Mg'
        },
        {
            id: 7,
            name: '1000 Mg'
        }
    ]
};
const days = {
    daysList: [
        {
            id: 1,
            name: '7'
        },
        {
            id: 2,
            name: '14'
        },
        {
            id: 3,
            name: '20'
        },
        {
            id: 4,
            name: '25'
        },
        {
            id: 5,
            name: '30'
        }
    ]
};
const timing = {
    timingList: [
        {
            id: 1,
            name: '1 - 0 - 0'
        },
        {
            id: 2,
            name: '0 - 1 - 0'
        },
        {
            id: 3,
            name: '0 - 0 - 1'
        },
        {
            id: 4,
            name: '1 - 1 - 0'
        },
        {
            id: 5,
            name: '1 - 0 - 1'
        },
        {
            id: 6,
            name: '0 - 1 - 1'
        },
        {
            id: 7,
            name: '1 - 1 - 1'
        }
    ]
};
const PICK_FORMATS$1 = {
    parse: { dateInput: { month: 'short', year: 'numeric', day: 'numeric' } },
    display: {
        dateInput: 'input',
        monthYearLabel: { year: 'numeric', month: 'short' },
        dateA11yLabel: { year: 'numeric', month: 'long', day: 'numeric' },
        monthYearA11yLabel: { year: 'numeric', month: 'long' }
    }
};
const conceptIds = {
    conceptAdditionlDocument: '07a816ce-ffc0-49b9-ad92-a1bf9bf5e2ba',
    conceptPhysicalExamination: '200b7a45-77bc-4986-b879-cc727f5f7d5b',
    conceptDiagnosis: '537bb20d-d09d-4f88-930b-cc45c7d662df',
    conceptNote: '162169AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA',
    conceptMed: 'c38c0c50-2fd2-4ae3-b7ba-7dd25adca4ca',
    conceptAdvice: '67a050c1-35e5-451c-a4ab-fff9d57b0db1',
    conceptTest: '23601d71-50e6-483f-968d-aeef3031346d',
    conceptReferral: '605b6f15-8f7a-4c45-b06d-14165f6974be',
    conceptFollow: 'e8caffd6-5d22-41c4-8d6a-bc31a44d0c86',
    conceptDDx: 'bc48889e-b461-4e5e-98d1-31eb9dd6160e',
    conceptDiagnosisClass: '8d4918b0-c2cc-11de-8d13-0010c6dffd0f',
    conceptPastMedicalHistoryNotes: 'dc27d56c-f970-4eaa-88d0-46d55c2ab24c',
    conceptFamilyHistoryNotes: '675bafa3-2d9b-4cd1-9d38-55a2f47a69a5',
    conceptFollowUpInstruction: 'e444b5e9-e3b9-4cb1-92ee-29bba00b33d0'
};
const WEBRTC = {
    CHAT_TEXT_LIMIT: 1000
};
const visitAttributeTypes = {
    patientCallDuration: '35e64f4a-d0a5-40bc-8010-8c61d52cc4b1'
};

// import { environment } from "src/environments/environment";
function getCacheData(parse, key) {
    if (parse) {
        try {
            return JSON.parse(localStorage.getItem(key));
        }
        catch (error) {
            return null;
        }
    }
    else {
        return localStorage.getItem(key);
    }
}
function setCacheData(key, value) {
    localStorage.setItem(key, value);
}
function deleteCacheData(key) {
    localStorage.removeItem(key);
}
function isJsonString(str) {
    try {
        const json = JSON.parse(str);
        return (typeof json === 'object');
    }
    catch (e) {
        return false;
    }
}
function getEncounterProviderUUID() {
    return getCacheData(true, visitTypes.VISIT_NOTE_PROVIDER).encounterProviders[0].provider.uuid;
}
function getEncounterUUID() {
    return getCacheData(true, visitTypes.VISIT_NOTE_PROVIDER).uuid;
}
/**
  * Check how old the date is from now
  * @param {string} data - Date in string format
  * @return {string} - Returns how old the date is from now
  */
function checkIfDateOldThanOneDay(data) {
    let hours = moment(data).diff(moment(), 'hours');
    let minutes = moment(data).diff(moment(), 'minutes');
    minutes = minutes - (hours * 60);
    let resString = "";
    if (hours >= 24) {
        resString = moment(data).format('DD MMM, YYYY hh:mm A');
    }
    else {
        if (hours > 1) {
            resString += hours + " Hours";
        }
        else if (hours === 1) {
            resString += hours + " Hour";
        }
        if (minutes < 0) {
            resString = `Due : ${moment(data).format('DD MMM, YYYY hh:mm A')}`;
        }
        else if (minutes === 1) {
            resString += " " + minutes + " Minute";
        }
        else {
            resString += " " + minutes + " Minutes";
        }
    }
    return resString.trim();
}
/**
  * Compare data for sorting
  * @param {number|string} a
  * @param {number|string} b
  * @param {boolean} isAsc
  * @return {number} - Returns order as 1 or -1
  */
function compare(a, b, isAsc) {
    return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}
/**
* Get speciality
* @param {ProviderAttributeModel[]} attr - Array of provider attributes
* @return {string} - Speciality
*/
function getSpecialization(attr = []) {
    let specialization = '';
    for (const a of attr) {
        if (a.attributeType.uuid == 'ed1715f5-93e2-404e-b3c9-2a2d9600f062' && !a.voided) {
            specialization = a.value;
            break;
        }
    }
    return specialization;
}
function getFieldValueByLanguage(element) {
    const selectedLanguage = getCacheData(false, languages.SELECTED_LANGUAGE);
    // Check if selected language exists in the lang object and is not empty
    if (element?.lang?.[selectedLanguage]?.trim()) {
        return element.lang[selectedLanguage].trim();
    }
    // Return the first non-empty language value
    for (const langValue of Object.values(element?.lang || {})) {
        if (langValue.trim()) {
            return langValue.trim();
        }
    }
    // Fallback to element.name if no valid language value found or element is invalid
    return element?.name || "";
}
function calculateBMI(vitals, vitalObs, _locale = 'en') {
    const heightUUID = vitals?.find((v) => v.key === 'height_cm')?.uuid;
    const weightUUID = vitals?.find((v) => v.key === 'weight_kg')?.uuid;
    let height = null, weight = null;
    if (heightUUID && weightUUID) {
        height = vitalObs.find((e) => e.concept.uuid === heightUUID)?.value;
        weight = vitalObs.find((e) => e.concept.uuid === weightUUID)?.value;
    }
    if (height && weight) {
        const decimalPipe = new DecimalPipe(_locale);
        return decimalPipe.transform(weight / ((height / 100) * (height / 100)), "1.2-2");
    }
    return null;
}
function isFeaturePresent(featureLists, featureName, notInclude = false) {
    const featureList = featureLists ?? []; // Extract from ENV file
    if (notInclude)
        return !featureList.includes(featureName);
    return featureList.includes(featureName);
}
function getCallDuration(given_seconds) {
    let dateObj = new Date(given_seconds * 1000);
    let hours = dateObj.getUTCHours();
    let minutes = dateObj.getUTCMinutes();
    let seconds = dateObj.getSeconds();
    return hours.toString().padStart(2, '0') + ':' +
        minutes.toString().padStart(2, '0') + ':' +
        seconds.toString().padStart(2, '0');
}

class MindmapService {
    http;
    mindmapURL;
    constructor(http, environment) {
        this.http = http;
        this.mindmapURL = environment.mindmapURL;
    }
    /**
    * Get mindmap keys
    * @return {Observable<any>}
    */
    getMindmapKey() {
        const url = `${this.mindmapURL}/mindmap`;
        return this.http.get(url);
    }
    /**
    * Post mindmap
    * @param {any} value - Payload for post mindmap
    * @return {Observable<any>}
    */
    postMindmap(value) {
        const url = `${this.mindmapURL}/mindmap/upload`;
        return this.http.post(url, value);
    }
    /**
    * Get mindmap details from key
    * @param {string} key - Mindmap key
    * @return {Observable<any>}
    */
    detailsMindmap(key) {
        const url = `${this.mindmapURL}/mindmap/details/${key}`;
        return this.http.get(url);
    }
    /**
    * Add/update mindmap license key
    * @param {any} payload - Payload for mindmap key to add/update
    * @return {Observable<any>}
    */
    addUpdateLicenseKey(payload) {
        const url = `${this.mindmapURL}/mindmap/addUpdatekey`;
        return this.http.post(url, payload);
    }
    /**
    * Update mindmap key image
    * @param {string} key - Mindmap key
    * @param {string} imageName - Image name
    * @param {string} value - Image base64
    * @return {Observable<any>}
    */
    updateImage(key, imageName, value) {
        const url = `${this.mindmapURL}/mindmap/${key}/${imageName}`;
        return this.http.put(url, value);
    }
    /**
    * Delete mindmap
    * @param {string} key - Mindmap key
    * @param {any} data - Mindmap data
    * @return {Observable<any>}
    */
    deleteMindmap(key, data) {
        const url = `${this.mindmapURL}/mindmap/delete/${key}`;
        return this.http.post(url, data);
    }
    /**
    * Toggle mindmap status
    * @param {any} data - Mindmap data
    * @return {Observable<any>}
    */
    toggleMindmapStatus(data) {
        const url = `${this.mindmapURL}/mindmap/toggleStatus`;
        return this.http.post(url, data);
    }
    /**
  * Notify App side
  * @param {any} hwUuid - Healthworker Id
  * @param {any} payload - Notifaication message
  * @return {Observable<any>}
  */
    notifyApp(hwUuid, payload) {
        return this.http.post(`${this.mindmapURL}/mindmap/notify-app/${hwUuid}`, payload);
    }
    /**
    * Send notification to health worker for available prescription
    * @returns {void}
    */
    notifyHwForRescheduleAppointment(appointment) {
        const hwUuid = appointment?.hwUUID;
        const openMRSID = appointment?.openMrsId;
        const payload = {
            title: `Appointment rescheduled for ${appointment?.patientName || 'Patient'}`,
            body: "Click notification to see!",
            type: "appointment",
            data: {
                patientFirstName: appointment?.patientName ?? '',
                patientUuid: appointment?.patientId,
                patientOpenMrsId: openMRSID,
                visitUuid: appointment?.visitUuid,
                slotDateTime: appointment?.slotJsDate
            }
        };
        this.notifyApp(hwUuid, payload).subscribe();
    }
    /**
   * Send cancel notification to health worker
   * @returns {void}
   */
    notifyHwForCancelAppointment(appointment) {
        const hwUuid = appointment?.hwUUID;
        const openMRSID = appointment?.openMrsId;
        const payload = {
            title: `Appointment cancelled for ${appointment?.patientName || 'Patient'}`,
            body: "Click notification to see!",
            type: "cancel",
            data: {
                patientFirstName: appointment?.patientName ?? '',
                patientUuid: appointment?.patientId,
                patientOpenMrsId: openMRSID,
                visitUuid: appointment?.visitUuid,
                slotDateTime: appointment?.slotJsDate
            }
        };
        this.notifyApp(hwUuid, payload).subscribe();
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.3.0", ngImport: i0, type: MindmapService, deps: [{ token: i1.HttpClient }, { token: 'environment' }], target: i0.ɵɵFactoryTarget.Injectable });
    static ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "14.3.0", ngImport: i0, type: MindmapService, providedIn: "root" });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.3.0", ngImport: i0, type: MindmapService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: "root",
                }]
        }], ctorParameters: function () { return [{ type: i1.HttpClient }, { type: undefined, decorators: [{
                    type: Inject,
                    args: ['environment']
                }] }]; } });

class CancelAppointmentConfirmComponent {
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
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.3.0", ngImport: i0, type: CancelAppointmentConfirmComponent, deps: [{ token: MAT_DIALOG_DATA }, { token: i1$1.MatDialogRef }, { token: AppointmentService }, { token: i3.ToastrService }, { token: i4.TranslateService }, { token: MindmapService }], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "14.3.0", type: CancelAppointmentConfirmComponent, selector: "app-cancel-appointment-confirm", ngImport: i0, template: "<div class=\"intel-con-modal\" data-test-id=\"cancelAppConfirmModal\">\r\n  <div class=\"close-btn-con\" data-test-id=\"cancelAppConfirmCloseContainer\">\r\n    <button class=\"modal-close-btn\" (click)=\"close(false)\" data-test-id=\"btnCloseCancelAppConfirm\">\r\n      <img src=\"assets/svgs/CloseX.svg\" alt=\"close icon\" />\r\n    </button>\r\n  </div>\r\n\r\n  <div class=\"modal-con mt-4\" data-test-id=\"cancelAppConfirmContent\">\r\n    <img src=\"assets/svgs/video-pink.svg\" alt=\"video-icon\" width=\"80px\" height=\"80px\" data-test-id=\"imgCancelAppConfirmIcon\">\r\n    <h6 class=\"mt-3\" data-test-id=\"titleCancelAppConfirm\">{{'Cancel the appointment'|translate}}</h6>\r\n    <p class=\"mt-2 text-center\" data-test-id=\"msgCancelAppConfirm\">\r\n      {{'Are you sure you want to cancel your appointment on'|translate}} \r\n      <b data-test-id=\"cancelAppConfirmDate\">{{data?.slotJsDate|date:'dd MMMM'}}</b> \r\n      {{'at'|translate}} \r\n      <b data-test-id=\"cancelAppConfirmTime\">{{data?.slotTime}}</b>?\r\n    </p>\r\n  </div>\r\n\r\n  <div class=\"modal-action-btn-con\" data-test-id=\"cancelAppConfirmActions\">\r\n    <button class=\"modal-btn white-btn mr-3\" type=\"button\" (click)=\"close(false)\" data-test-id=\"btnGoBackCancelAppConfirm\">\r\n      {{'Go back'|translate}}\r\n    </button>\r\n    <button class=\"modal-btn blue-btn\" type=\"button\" (click)=\"cancel()\" data-test-id=\"btnCancelAppConfirm\">\r\n      {{'Cancel'|translate}}\r\n    </button>\r\n  </div>\r\n</div>\r\n", dependencies: [{ kind: "pipe", type: i12.DatePipe, name: "date" }, { kind: "pipe", type: i4.TranslatePipe, name: "translate" }] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.3.0", ngImport: i0, type: CancelAppointmentConfirmComponent, decorators: [{
            type: Component,
            args: [{ selector: 'app-cancel-appointment-confirm', template: "<div class=\"intel-con-modal\" data-test-id=\"cancelAppConfirmModal\">\r\n  <div class=\"close-btn-con\" data-test-id=\"cancelAppConfirmCloseContainer\">\r\n    <button class=\"modal-close-btn\" (click)=\"close(false)\" data-test-id=\"btnCloseCancelAppConfirm\">\r\n      <img src=\"assets/svgs/CloseX.svg\" alt=\"close icon\" />\r\n    </button>\r\n  </div>\r\n\r\n  <div class=\"modal-con mt-4\" data-test-id=\"cancelAppConfirmContent\">\r\n    <img src=\"assets/svgs/video-pink.svg\" alt=\"video-icon\" width=\"80px\" height=\"80px\" data-test-id=\"imgCancelAppConfirmIcon\">\r\n    <h6 class=\"mt-3\" data-test-id=\"titleCancelAppConfirm\">{{'Cancel the appointment'|translate}}</h6>\r\n    <p class=\"mt-2 text-center\" data-test-id=\"msgCancelAppConfirm\">\r\n      {{'Are you sure you want to cancel your appointment on'|translate}} \r\n      <b data-test-id=\"cancelAppConfirmDate\">{{data?.slotJsDate|date:'dd MMMM'}}</b> \r\n      {{'at'|translate}} \r\n      <b data-test-id=\"cancelAppConfirmTime\">{{data?.slotTime}}</b>?\r\n    </p>\r\n  </div>\r\n\r\n  <div class=\"modal-action-btn-con\" data-test-id=\"cancelAppConfirmActions\">\r\n    <button class=\"modal-btn white-btn mr-3\" type=\"button\" (click)=\"close(false)\" data-test-id=\"btnGoBackCancelAppConfirm\">\r\n      {{'Go back'|translate}}\r\n    </button>\r\n    <button class=\"modal-btn blue-btn\" type=\"button\" (click)=\"cancel()\" data-test-id=\"btnCancelAppConfirm\">\r\n      {{'Cancel'|translate}}\r\n    </button>\r\n  </div>\r\n</div>\r\n" }]
        }], ctorParameters: function () { return [{ type: undefined, decorators: [{
                    type: Inject,
                    args: [MAT_DIALOG_DATA]
                }] }, { type: i1$1.MatDialogRef }, { type: AppointmentService }, { type: i3.ToastrService }, { type: i4.TranslateService }, { type: MindmapService }]; } });

const PICK_FORMATS = {
    parse: { dateInput: { month: 'short', year: 'numeric', day: 'numeric' } },
    display: {
        dateInput: 'input',
        monthYearLabel: { year: 'numeric', month: 'short' },
        dateA11yLabel: { year: 'numeric', month: 'long', day: 'numeric' },
        monthYearA11yLabel: { year: 'numeric', month: 'long' }
    }
};
class PickDateAdapter extends NativeDateAdapter {
    format(date, displayFormat) {
        if (displayFormat === 'input') {
            return formatDate(date, 'dd MMMM yyyy', this.locale);
        }
        else {
            return date.toDateString();
        }
    }
}
class RescheduleAppointmentComponent {
    data;
    dialogRef;
    appointmentService;
    toastr;
    translate;
    minDate;
    scheduleData = {
        morning: [],
        afternoon: [],
        evening: []
    };
    selectedDate = moment().format("YYYY-MM-DD");
    slots = [];
    selectedSlot;
    constructor(data, dialogRef, appointmentService, toastr, translate) {
        this.data = data;
        this.dialogRef = dialogRef;
        this.appointmentService = appointmentService;
        this.toastr = toastr;
        this.translate = translate;
        this.minDate = new Date();
    }
    ngOnInit() {
        this.getAppointmentSlots();
    }
    /**
    * Callback for date change event
    * @param {Event} event - Date changed event
    * @return {void}
    */
    dateChanged(event) {
        this.selectedSlot = null;
        this.selectedDate = moment(event.target.value).format("YYYY-MM-DD");
        this.getAppointmentSlots();
    }
    /**
    * Get appointment slots for a given speciality, from and to date
    * @param {string} fromDate - From date
    * @param {string} toDate - To date
    * @param {string} speciality - Speciality
    * @return {void}
    */
    getAppointmentSlots(fromDate = this.selectedDate, toDate = this.selectedDate, speciality = this.data?.speciality) {
        this.scheduleData = {
            morning: [],
            afternoon: [],
            evening: []
        };
        this.appointmentService.getAppointmentSlots(moment(fromDate).format("DD/MM/YYYY"), moment(toDate).format("DD/MM/YYYY"), speciality).subscribe((res) => {
            this.slots = res.dates;
            this.slots.forEach((slot) => {
                if (moment(slot.slotTime, "LT").isBefore(moment("12:00 PM", "LT"))) {
                    this.scheduleData.morning.push(slot.slotTime);
                }
                else if (moment(slot.slotTime, "LT").isBetween(moment("11:30 AM", "LT"), moment("5:00 PM", "LT"))) {
                    this.scheduleData.afternoon.push(slot.slotTime);
                }
                else {
                    this.scheduleData.evening.push(slot.slotTime);
                }
            });
        });
    }
    /**
    * Reschedule appointment
    * @return {void}
    */
    reschedule() {
        if (this.selectedDate && this.selectedSlot) {
            this.close({ date: this.selectedDate, slot: this.selectedSlot });
        }
        else {
            this.toastr.warning(this.translate.instant("Please select slot to reschedule."), this.translate.instant("Select Slot"));
        }
    }
    /**
    * Close modal
    * @param {boolean|RescheduleAppointmentModalResponseModel} val - Dialog result
    * @return {void}
    */
    close(val) {
        this.dialogRef.close(val);
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.3.0", ngImport: i0, type: RescheduleAppointmentComponent, deps: [{ token: MAT_DIALOG_DATA }, { token: i1$1.MatDialogRef }, { token: AppointmentService }, { token: i3.ToastrService }, { token: i4.TranslateService }], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "14.3.0", type: RescheduleAppointmentComponent, selector: "app-reschedule-appointment", providers: [
            { provide: DateAdapter, useClass: PickDateAdapter },
            { provide: MAT_DATE_FORMATS, useValue: PICK_FORMATS }
        ], ngImport: i0, template: "<div class=\"reschedule-modal\" data-test-id=\"rescheduleModal\">\r\n  <div class=\"modal-title\" data-test-id=\"rescheduleModalTitleContainer\">\r\n    <h6 class=\"mb-0\" data-test-id=\"rescheduleModalTitle\">{{ 'Reschedule appointment' | translate }}</h6>\r\n    <button class=\"modal-close-btn\" (click)=\"close(false)\" data-test-id=\"btnCloseRescheduleModal\">\r\n      <img src=\"assets/svgs/Close.svg\" alt=\"close icon\">\r\n    </button>\r\n  </div>\r\n\r\n  <div class=\"modal-body\" data-test-id=\"rescheduleModalBody\">\r\n    <div class=\"container-fluid\" data-test-id=\"rescheduleModalContainer\">\r\n      <div class=\"row\" data-test-id=\"rescheduleModalRow\">\r\n        <div class=\"col-md-12 p-0\" data-test-id=\"rescheduleModalCol\">\r\n\r\n          <div class=\"select-date-con\" data-test-id=\"dateSelectionContainer\">\r\n            <div class=\"form-group row\" data-test-id=\"dateSelectionFormGroup\">\r\n              <label for=\"expiryDate\" class=\"col-sm-3 col-form-label\" data-test-id=\"lblSelectDate\">\r\n                {{ 'Select Date' | translate }}\r\n              </label>\r\n              <div class=\"col-sm-6\" data-test-id=\"dateInputCol\">\r\n                <div class=\"input-group\" data-test-id=\"dateInputGroup\">\r\n                  <input\r\n                    type=\"text\"\r\n                    class=\"form-control\"\r\n                    [(ngModel)]=\"selectedDate\"\r\n                    (dateChange)=\"dateChanged($event)\"\r\n                    [min]=\"minDate\"\r\n                    [matDatepicker]=\"dp1\"\r\n                    placeholder=\"{{'Select date'|translate}}\"\r\n                    aria-label=\"Date\"\r\n                    aria-describedby=\"basic-addon1\"\r\n                    readonly\r\n                    data-test-id=\"etDate\"\r\n                  >\r\n                  <mat-datepicker #dp1 data-test-id=\"matDatepicker\"></mat-datepicker>\r\n                  <div class=\"input-group-append\" data-test-id=\"datePickerAppend\">\r\n                    <span class=\"input-group-text\" id=\"basic-addon1\" data-test-id=\"datePickerIconWrapper\">\r\n                      <mat-datepicker-toggle matSuffix [for]=\"dp1\" data-test-id=\"dpDate\">\r\n                        <img matDatepickerToggleIcon src=\"assets/svgs/calendar-date.svg\" alt=\"calendar icon\" data-test-id=\"dpDateIcon\">\r\n                      </mat-datepicker-toggle>\r\n                    </span>\r\n                  </div>\r\n                </div>\r\n              </div>\r\n            </div>\r\n          </div>\r\n\r\n          <div class=\"slots-con\" data-test-id=\"slotsContainer\">\r\n            <h6 data-test-id=\"slotsTitle\">{{ 'Select a timeslot' | translate }}</h6>\r\n\r\n            <div class=\"slot-section\" *ngIf=\"scheduleData.morning.length;\" data-test-id=\"slotSectionMorning\">\r\n              <h6 data-test-id=\"slotMorningTitle\">\r\n                <img src=\"assets/svgs/sunrise.svg\" alt=\"morning icon\" class=\"mr-2\" data-test-id=\"slotMorningIcon\" />\r\n                {{ 'Morning' | translate }}\r\n              </h6>\r\n              <div class=\"slot-chips\" data-test-id=\"slotMorningChips\">\r\n                <div\r\n                  class=\"slot-chip-item\"\r\n                  [class.selected]=\"selectedSlot == s\"\r\n                  *ngFor=\"let s of scheduleData.morning;\"\r\n                  (click)=\"selectedSlot = s\"\r\n                  data-test-id=\"slotMorningChip\"\r\n                >\r\n                  {{s}}\r\n                </div>\r\n              </div>\r\n            </div>\r\n\r\n            <div class=\"slot-section\" *ngIf=\"scheduleData.afternoon.length;\" data-test-id=\"slotSectionAfternoon\">\r\n              <h6 data-test-id=\"slotAfternoonTitle\">\r\n                <img src=\"assets/svgs/sun.svg\" alt=\"afternoon icon\" class=\"mr-2\" data-test-id=\"slotAfternoonIcon\" />\r\n                {{ 'Afternoon' | translate }}\r\n              </h6>\r\n              <div class=\"slot-chips\" data-test-id=\"slotAfternoonChips\">\r\n                <div\r\n                  class=\"slot-chip-item\"\r\n                  [class.selected]=\"selectedSlot == s\"\r\n                  *ngFor=\"let s of scheduleData.afternoon;\"\r\n                  (click)=\"selectedSlot = s\"\r\n                  data-test-id=\"slotAfternoonChip\"\r\n                >\r\n                  {{s}}\r\n                </div>\r\n              </div>\r\n            </div>\r\n\r\n            <div class=\"slot-section\" *ngIf=\"scheduleData.evening.length;\" data-test-id=\"slotSectionEvening\">\r\n              <h6 data-test-id=\"slotEveningTitle\">\r\n                <img src=\"assets/svgs/sunset.svg\" alt=\"evening icon\" class=\"mr-2\" data-test-id=\"slotEveningIcon\" />\r\n                {{ 'Evening' | translate }}\r\n              </h6>\r\n              <div class=\"slot-chips\" data-test-id=\"slotEveningChips\">\r\n                <div\r\n                  class=\"slot-chip-item\"\r\n                  [class.selected]=\"selectedSlot == s\"\r\n                  *ngFor=\"let s of scheduleData.evening;\"\r\n                  (click)=\"selectedSlot = s\"\r\n                  data-test-id=\"slotEveningChip\"\r\n                >\r\n                  {{s}}\r\n                </div>\r\n              </div>\r\n            </div>\r\n          </div>\r\n\r\n          <div class=\"d-flex justify-content-center py-2\" data-test-id=\"rescheduleActionContainer\">\r\n            <button class=\"confirm-btn\" type=\"button\" (click)=\"reschedule()\" data-test-id=\"btnSubmitRescheduleModal\">\r\n              {{ 'Reschedule' | translate }}\r\n            </button>\r\n          </div>\r\n\r\n        </div>\r\n      </div>\r\n    </div>\r\n  </div>\r\n</div>\r\n", styles: [".reschedule-modal{font-family:DM Sans}.reschedule-modal .modal-title{display:flex;flex-direction:row;align-items:center;justify-content:space-between;padding:24px;width:100%;height:70px;background:var(--color-lightGray)}.reschedule-modal .modal-title h6{font-weight:700;font-size:20px;color:var(--color-darkestBlue)}.reschedule-modal .modal-title .modal-close-btn{border:none;background:transparent}.reschedule-modal .modal-body{padding:24px}.reschedule-modal .modal-body .select-date-con{border-bottom:1px solid rgba(178,175,190,.2);margin:10px 0}.reschedule-modal .modal-body .slots-con{max-height:55vh;overflow:auto}.reschedule-modal .modal-body .slots-con h6{font-weight:700;font-size:16px;color:var(--color-darkestBlue);display:flex;align-items:center}.reschedule-modal .modal-body .slots-con .slot-section{padding:10px 0}.reschedule-modal .modal-body .slots-con .slot-section .slot-chips{display:flex;flex-wrap:wrap;align-items:center}.reschedule-modal .modal-body .slots-con .slot-section .slot-chips .slot-chip-item{padding:8px;background:var(--color-lightGray);border:1px solid rgba(178,175,190,.2);border-radius:6px;font-size:14px;line-height:150%;color:var(--color-darkestBlue);margin-right:5px;margin-bottom:5px;cursor:pointer}.reschedule-modal .modal-body .slots-con .slot-section .slot-chips .slot-chip-item.selected{background:var(--color-darkBlue);border:none;border-radius:6px;color:var(--color-white)}.cancel-btn{padding:8px 24px;min-width:119px;height:48px;background:var(--color-white);border:1px solid var(--color-lightGray);border-radius:8px;font-size:18px;line-height:150%;color:var(--color-darkBlue);font-weight:700}.confirm-btn{padding:8px 24px;min-width:119px;height:48px;background:var(--color-darkBlue);border:1px solid var(--color-darkBlue);border-radius:8px;font-size:18px;line-height:150%;color:var(--color-white);font-weight:700}.form-group label{font-size:14px;color:var(--color-darkestBlue);font-weight:700}.form-group .input-group{border:1px solid rgba(178,175,190,.2);background:var(--color-offWhite);border-radius:8px;height:48px}.form-group .input-group .form-control{padding:14px 16px;height:48px;font-size:16px;color:var(--color-darkestBlue);border:none;background:transparent}.form-group .input-group .form-control:focus{box-shadow:none}.form-group .input-group .input-group-append .input-group-text{background:transparent;border:none;padding:0}\n"], dependencies: [{ kind: "directive", type: i5.MatSuffix, selector: "[matSuffix]" }, { kind: "directive", type: i12.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { kind: "directive", type: i12.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "directive", type: i21.DefaultValueAccessor, selector: "input:not([type=checkbox])[formControlName],textarea[formControlName],input:not([type=checkbox])[formControl],textarea[formControl],input:not([type=checkbox])[ngModel],textarea[ngModel],[ngDefaultControl]" }, { kind: "directive", type: i21.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { kind: "directive", type: i21.NgModel, selector: "[ngModel]:not([formControlName]):not([formControl])", inputs: ["name", "disabled", "ngModel", "ngModelOptions"], outputs: ["ngModelChange"], exportAs: ["ngModel"] }, { kind: "component", type: i8.MatDatepicker, selector: "mat-datepicker", exportAs: ["matDatepicker"] }, { kind: "directive", type: i8.MatDatepickerInput, selector: "input[matDatepicker]", inputs: ["matDatepicker", "min", "max", "matDatepickerFilter"], exportAs: ["matDatepickerInput"] }, { kind: "component", type: i8.MatDatepickerToggle, selector: "mat-datepicker-toggle", inputs: ["for", "tabIndex", "aria-label", "disabled", "disableRipple"], exportAs: ["matDatepickerToggle"] }, { kind: "directive", type: i8.MatDatepickerToggleIcon, selector: "[matDatepickerToggleIcon]" }, { kind: "pipe", type: i4.TranslatePipe, name: "translate" }] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.3.0", ngImport: i0, type: RescheduleAppointmentComponent, decorators: [{
            type: Component,
            args: [{ selector: 'app-reschedule-appointment', providers: [
                        { provide: DateAdapter, useClass: PickDateAdapter },
                        { provide: MAT_DATE_FORMATS, useValue: PICK_FORMATS }
                    ], template: "<div class=\"reschedule-modal\" data-test-id=\"rescheduleModal\">\r\n  <div class=\"modal-title\" data-test-id=\"rescheduleModalTitleContainer\">\r\n    <h6 class=\"mb-0\" data-test-id=\"rescheduleModalTitle\">{{ 'Reschedule appointment' | translate }}</h6>\r\n    <button class=\"modal-close-btn\" (click)=\"close(false)\" data-test-id=\"btnCloseRescheduleModal\">\r\n      <img src=\"assets/svgs/Close.svg\" alt=\"close icon\">\r\n    </button>\r\n  </div>\r\n\r\n  <div class=\"modal-body\" data-test-id=\"rescheduleModalBody\">\r\n    <div class=\"container-fluid\" data-test-id=\"rescheduleModalContainer\">\r\n      <div class=\"row\" data-test-id=\"rescheduleModalRow\">\r\n        <div class=\"col-md-12 p-0\" data-test-id=\"rescheduleModalCol\">\r\n\r\n          <div class=\"select-date-con\" data-test-id=\"dateSelectionContainer\">\r\n            <div class=\"form-group row\" data-test-id=\"dateSelectionFormGroup\">\r\n              <label for=\"expiryDate\" class=\"col-sm-3 col-form-label\" data-test-id=\"lblSelectDate\">\r\n                {{ 'Select Date' | translate }}\r\n              </label>\r\n              <div class=\"col-sm-6\" data-test-id=\"dateInputCol\">\r\n                <div class=\"input-group\" data-test-id=\"dateInputGroup\">\r\n                  <input\r\n                    type=\"text\"\r\n                    class=\"form-control\"\r\n                    [(ngModel)]=\"selectedDate\"\r\n                    (dateChange)=\"dateChanged($event)\"\r\n                    [min]=\"minDate\"\r\n                    [matDatepicker]=\"dp1\"\r\n                    placeholder=\"{{'Select date'|translate}}\"\r\n                    aria-label=\"Date\"\r\n                    aria-describedby=\"basic-addon1\"\r\n                    readonly\r\n                    data-test-id=\"etDate\"\r\n                  >\r\n                  <mat-datepicker #dp1 data-test-id=\"matDatepicker\"></mat-datepicker>\r\n                  <div class=\"input-group-append\" data-test-id=\"datePickerAppend\">\r\n                    <span class=\"input-group-text\" id=\"basic-addon1\" data-test-id=\"datePickerIconWrapper\">\r\n                      <mat-datepicker-toggle matSuffix [for]=\"dp1\" data-test-id=\"dpDate\">\r\n                        <img matDatepickerToggleIcon src=\"assets/svgs/calendar-date.svg\" alt=\"calendar icon\" data-test-id=\"dpDateIcon\">\r\n                      </mat-datepicker-toggle>\r\n                    </span>\r\n                  </div>\r\n                </div>\r\n              </div>\r\n            </div>\r\n          </div>\r\n\r\n          <div class=\"slots-con\" data-test-id=\"slotsContainer\">\r\n            <h6 data-test-id=\"slotsTitle\">{{ 'Select a timeslot' | translate }}</h6>\r\n\r\n            <div class=\"slot-section\" *ngIf=\"scheduleData.morning.length;\" data-test-id=\"slotSectionMorning\">\r\n              <h6 data-test-id=\"slotMorningTitle\">\r\n                <img src=\"assets/svgs/sunrise.svg\" alt=\"morning icon\" class=\"mr-2\" data-test-id=\"slotMorningIcon\" />\r\n                {{ 'Morning' | translate }}\r\n              </h6>\r\n              <div class=\"slot-chips\" data-test-id=\"slotMorningChips\">\r\n                <div\r\n                  class=\"slot-chip-item\"\r\n                  [class.selected]=\"selectedSlot == s\"\r\n                  *ngFor=\"let s of scheduleData.morning;\"\r\n                  (click)=\"selectedSlot = s\"\r\n                  data-test-id=\"slotMorningChip\"\r\n                >\r\n                  {{s}}\r\n                </div>\r\n              </div>\r\n            </div>\r\n\r\n            <div class=\"slot-section\" *ngIf=\"scheduleData.afternoon.length;\" data-test-id=\"slotSectionAfternoon\">\r\n              <h6 data-test-id=\"slotAfternoonTitle\">\r\n                <img src=\"assets/svgs/sun.svg\" alt=\"afternoon icon\" class=\"mr-2\" data-test-id=\"slotAfternoonIcon\" />\r\n                {{ 'Afternoon' | translate }}\r\n              </h6>\r\n              <div class=\"slot-chips\" data-test-id=\"slotAfternoonChips\">\r\n                <div\r\n                  class=\"slot-chip-item\"\r\n                  [class.selected]=\"selectedSlot == s\"\r\n                  *ngFor=\"let s of scheduleData.afternoon;\"\r\n                  (click)=\"selectedSlot = s\"\r\n                  data-test-id=\"slotAfternoonChip\"\r\n                >\r\n                  {{s}}\r\n                </div>\r\n              </div>\r\n            </div>\r\n\r\n            <div class=\"slot-section\" *ngIf=\"scheduleData.evening.length;\" data-test-id=\"slotSectionEvening\">\r\n              <h6 data-test-id=\"slotEveningTitle\">\r\n                <img src=\"assets/svgs/sunset.svg\" alt=\"evening icon\" class=\"mr-2\" data-test-id=\"slotEveningIcon\" />\r\n                {{ 'Evening' | translate }}\r\n              </h6>\r\n              <div class=\"slot-chips\" data-test-id=\"slotEveningChips\">\r\n                <div\r\n                  class=\"slot-chip-item\"\r\n                  [class.selected]=\"selectedSlot == s\"\r\n                  *ngFor=\"let s of scheduleData.evening;\"\r\n                  (click)=\"selectedSlot = s\"\r\n                  data-test-id=\"slotEveningChip\"\r\n                >\r\n                  {{s}}\r\n                </div>\r\n              </div>\r\n            </div>\r\n          </div>\r\n\r\n          <div class=\"d-flex justify-content-center py-2\" data-test-id=\"rescheduleActionContainer\">\r\n            <button class=\"confirm-btn\" type=\"button\" (click)=\"reschedule()\" data-test-id=\"btnSubmitRescheduleModal\">\r\n              {{ 'Reschedule' | translate }}\r\n            </button>\r\n          </div>\r\n\r\n        </div>\r\n      </div>\r\n    </div>\r\n  </div>\r\n</div>\r\n", styles: [".reschedule-modal{font-family:DM Sans}.reschedule-modal .modal-title{display:flex;flex-direction:row;align-items:center;justify-content:space-between;padding:24px;width:100%;height:70px;background:var(--color-lightGray)}.reschedule-modal .modal-title h6{font-weight:700;font-size:20px;color:var(--color-darkestBlue)}.reschedule-modal .modal-title .modal-close-btn{border:none;background:transparent}.reschedule-modal .modal-body{padding:24px}.reschedule-modal .modal-body .select-date-con{border-bottom:1px solid rgba(178,175,190,.2);margin:10px 0}.reschedule-modal .modal-body .slots-con{max-height:55vh;overflow:auto}.reschedule-modal .modal-body .slots-con h6{font-weight:700;font-size:16px;color:var(--color-darkestBlue);display:flex;align-items:center}.reschedule-modal .modal-body .slots-con .slot-section{padding:10px 0}.reschedule-modal .modal-body .slots-con .slot-section .slot-chips{display:flex;flex-wrap:wrap;align-items:center}.reschedule-modal .modal-body .slots-con .slot-section .slot-chips .slot-chip-item{padding:8px;background:var(--color-lightGray);border:1px solid rgba(178,175,190,.2);border-radius:6px;font-size:14px;line-height:150%;color:var(--color-darkestBlue);margin-right:5px;margin-bottom:5px;cursor:pointer}.reschedule-modal .modal-body .slots-con .slot-section .slot-chips .slot-chip-item.selected{background:var(--color-darkBlue);border:none;border-radius:6px;color:var(--color-white)}.cancel-btn{padding:8px 24px;min-width:119px;height:48px;background:var(--color-white);border:1px solid var(--color-lightGray);border-radius:8px;font-size:18px;line-height:150%;color:var(--color-darkBlue);font-weight:700}.confirm-btn{padding:8px 24px;min-width:119px;height:48px;background:var(--color-darkBlue);border:1px solid var(--color-darkBlue);border-radius:8px;font-size:18px;line-height:150%;color:var(--color-white);font-weight:700}.form-group label{font-size:14px;color:var(--color-darkestBlue);font-weight:700}.form-group .input-group{border:1px solid rgba(178,175,190,.2);background:var(--color-offWhite);border-radius:8px;height:48px}.form-group .input-group .form-control{padding:14px 16px;height:48px;font-size:16px;color:var(--color-darkestBlue);border:none;background:transparent}.form-group .input-group .form-control:focus{box-shadow:none}.form-group .input-group .input-group-append .input-group-text{background:transparent;border:none;padding:0}\n"] }]
        }], ctorParameters: function () { return [{ type: undefined, decorators: [{
                    type: Inject,
                    args: [MAT_DIALOG_DATA]
                }] }, { type: i1$1.MatDialogRef }, { type: AppointmentService }, { type: i3.ToastrService }, { type: i4.TranslateService }]; } });

class CoreService {
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
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.3.0", ngImport: i0, type: CoreService, deps: [{ token: i1$1.MatDialog }], target: i0.ɵɵFactoryTarget.Injectable });
    static ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "14.3.0", ngImport: i0, type: CoreService, providedIn: 'root' });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.3.0", ngImport: i0, type: CoreService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root'
                }]
        }], ctorParameters: function () { return [{ type: i1$1.MatDialog }]; } });

class AppConfigService {
    http;
    configURL;
    version;
    apiEndpoint;
    specialization;
    language;
    patient_registration;
    theme_config;
    patient_vitals;
    patient_diagnostics;
    webrtc_section;
    webrtc;
    patient_visit_summary;
    patient_vitals_section;
    patient_reg_other;
    patient_reg_address;
    abha_section;
    sidebar_menus;
    patient_visit_sections;
    constructor(http, environment) {
        this.http = http;
        this.configURL = environment.configURL;
    }
    load() {
        const promise = this.http.get(`${this.configURL}/config/getPublishedConfig`)
            .toPromise()
            .then((data) => {
            this.setPatientVisitSections(data);
            Object.assign(this, data);
            return data;
        });
        return promise;
    }
    setPatientVisitSections(data) {
        data.patient_visit_sections = (data?.patient_visit_sections ?? [])
            .map((pvs) => {
            return {
                ...pvs,
                lang: pvs.lang ? (typeof pvs.lang === 'object' ? pvs.lang : JSON.parse(pvs.lang)) : null,
            };
        });
    }
    get tourConfig() {
        try {
            return JSON.parse(this.theme_config.find((config) => config.key === 'help_tour_config').value);
        }
        catch (error) {
            return null;
        }
    }
    get patientRegFields() {
        const fields = [];
        Object.keys(this.patient_registration).forEach(obj => {
            console.log(obj, "OBJs");
            fields.push(...this.patient_registration[obj]
                .filter((e) => e.is_enabled)
                .map((e) => e.name));
        });
        return fields;
    }
    checkPatientRegField(fieldName, fields) {
        return fields.indexOf(fieldName) !== -1;
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.3.0", ngImport: i0, type: AppConfigService, deps: [{ token: i1.HttpClient }, { token: 'environment' }], target: i0.ɵɵFactoryTarget.Injectable });
    static ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "14.3.0", ngImport: i0, type: AppConfigService, providedIn: 'root' });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.3.0", ngImport: i0, type: AppConfigService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root'
                }]
        }], ctorParameters: function () { return [{ type: i1.HttpClient }, { type: undefined, decorators: [{
                    type: Inject,
                    args: ['environment']
                }] }]; } });

class DefaultImageDirective {
    src;
    defaultImg = 'assets/svgs/user.svg';
    onError() {
        if (this.src.includes('openmrs'))
            this.src = this.defaultImg;
    }
    checkPath(src) {
        return src || this.defaultImg;
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.3.0", ngImport: i0, type: DefaultImageDirective, deps: [], target: i0.ɵɵFactoryTarget.Directive });
    static ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "14.3.0", type: DefaultImageDirective, selector: "img[src]", inputs: { src: "src" }, host: { listeners: { "error": "onError()" }, properties: { "src": "checkPath(src)" } }, ngImport: i0 });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.3.0", ngImport: i0, type: DefaultImageDirective, decorators: [{
            type: Directive,
            args: [{
                    selector: 'img[src]',
                    host: {
                        '[src]': 'checkPath(src)',
                        '(error)': 'onError()'
                    }
                }]
        }], propDecorators: { src: [{
                type: Input
            }] } });

class TableGridComponent {
    appointmentService;
    visitService;
    coreService;
    toastr;
    translateService;
    mindmapService;
    sanitizer;
    appConfigService;
    rolesService;
    ngxLoader;
    // Constants
    static DEFAULT_PAGE_SIZE_OPTIONS = [5, 10, 20, 25];
    static APPOINTMENT_PAGE_SIZE = 5;
    static SPECIALIZATION_UUID = 'ed1715f5-93e2-404e-b3c9-2a2d9600f062';
    static TELEPHONE_ATTRIBUTE_ID = 8;
    static FOLLOW_UP_CONCEPT_ID = 163345;
    static CHIEF_COMPLAINT_CONCEPT_ID = 163212;
    pluginConfigObs;
    displayedAppointmentColumns = [];
    displayedColumns = [];
    dataSource = [];
    filteredDataSource = [];
    paginatedDataSource = [];
    patientRegFields = [];
    isMCCUser = false;
    pageSizeOptions = TableGridComponent.DEFAULT_PAGE_SIZE_OPTIONS;
    // Unique component instance ID
    componentId;
    // @ViewChild(MatPaginator) paginator: MatPaginator;
    searchElement;
    filteredDateAndRangeForm;
    tempPaginator;
    paginatorEl;
    menuTrigger;
    // Date picker ViewChild references
    datePicker;
    startDatePicker;
    endDatePicker;
    filterMenu;
    panelExpanded = true;
    mode = 'date';
    maxDate;
    dateErrorMessage = '';
    startDateErrorMessage = '';
    endDateErrorMessage = '';
    appointments = [];
    priorityVisits = [];
    awaitingVisits = [];
    inProgressVisits = [];
    completedVisits = [];
    followUpVisits = [];
    specialization = '';
    visitsCountDate = new EventEmitter();
    pageIndex = 0;
    pageSize = 0;
    pageEvent;
    recordsFetched = 0;
    totalRecords = 0;
    isFilterApplied = false;
    pvs;
    baseURL;
    isBrandName;
    // to apply filter with date and text search
    dateField;
    dateFilter;
    originalData;
    filteredDataAfterDate;
    tableLoader;
    // Custom pagination properties
    currentPage = 0;
    itemsPerPage = 0;
    searchTerm = '';
    currentDateFilter = null;
    // Filtered data properties
    filteredTotalCount = 0;
    isFilterActive = false;
    paginationDisabled = false;
    ngAfterViewInit() {
        // Wait for the paginator to be fully initialized
        setTimeout(() => {
            if (this.paginatorEl && this.paginatorEl.nativeElement) {
                const el = this.paginatorEl.nativeElement;
                const suffix = this.pluginConfigObs?.pluginConfigObsFlag || '';
                el.querySelector('.mat-paginator-navigation-next')
                    ?.setAttribute('data-test-id', `paginator-next-${suffix}`);
                el.querySelector('.mat-paginator-navigation-previous')
                    ?.setAttribute('data-test-id', `paginator-prev-${suffix}`);
                el.querySelector('.mat-paginator-navigation-first')
                    ?.setAttribute('data-test-id', `paginator-first-${suffix}`);
                el.querySelector('.mat-paginator-navigation-last')
                    ?.setAttribute('data-test-id', `paginator-last-${suffix}`);
                el.querySelector('.mat-paginator-range-label')
                    ?.setAttribute('data-test-id', `paginator-range-label-${suffix}`);
            }
        }, 100);
    }
    constructor(appointmentService, visitService, coreService, toastr, translateService, mindmapService, sanitizer, appConfigService, rolesService, ngxLoader, environment) {
        this.appointmentService = appointmentService;
        this.visitService = visitService;
        this.coreService = coreService;
        this.toastr = toastr;
        this.translateService = translateService;
        this.mindmapService = mindmapService;
        this.sanitizer = sanitizer;
        this.appConfigService = appConfigService;
        this.rolesService = rolesService;
        this.ngxLoader = ngxLoader;
        // Generate unique component ID
        this.componentId = 'table-grid-' + Math.random().toString(36).substr(2, 9);
        this.tableLoader = isFeaturePresent(environment.featureList, 'tableLoader');
        this.baseURL = environment.baseURL;
        this.pageSize = environment.recordsPerPage;
        this.itemsPerPage = environment.recordsPerPage;
        this.filteredDateAndRangeForm = this.createFilteredDateRangeForm();
    }
    /**
     * Creates a filtered date range form with required date fields
     * @return {FormGroup} - The created form group
     */
    createFilteredDateRangeForm() {
        return new FormGroup({
            date: new FormControl('', [Validators.required]),
            startDate: new FormControl(null, Validators.required),
            endDate: new FormControl(null, Validators.required),
        });
    }
    /**
     * Initialize component-specific state to prevent conflicts between multiple instances
     */
    initializeComponentState() {
        // Reset all component-specific arrays and objects
        this.appointments = [];
        this.priorityVisits = [];
        this.awaitingVisits = [];
        this.inProgressVisits = [];
        this.completedVisits = [];
        this.followUpVisits = [];
        // Reset pagination state
        this.pageIndex = 0;
        this.recordsFetched = 0;
        this.totalRecords = 0;
        // Reset filter state
        this.isFilterApplied = false;
        this.isFilterActive = false;
        this.filteredTotalCount = 0;
        this.paginationDisabled = false;
        this.originalData = [];
        this.filteredDataAfterDate = [];
        // Reset data arrays for this instance
        this.dataSource = [];
        this.filteredDataSource = [];
        this.paginatedDataSource = [];
        this.currentPage = 0;
        this.searchTerm = '';
        this.currentDateFilter = null;
        if (this.pluginConfigObs?.pluginConfigObsFlag === 'Appointment') {
            this.pageSize = TableGridComponent.APPOINTMENT_PAGE_SIZE;
            this.itemsPerPage = TableGridComponent.APPOINTMENT_PAGE_SIZE;
            console.log('itemsPerPage', this.itemsPerPage);
        }
    }
    /**
     * Apply custom pagination to the filtered data
     */
    applyPagination() {
        const startIndex = this.currentPage * this.itemsPerPage;
        const endIndex = startIndex + this.itemsPerPage;
        this.paginatedDataSource = this.filteredDataSource.slice(startIndex, endIndex);
    }
    /**
     * Calculate pagination indices
     */
    getPaginationIndices() {
        return {
            startIndex: this.currentPage * this.itemsPerPage,
            endIndex: (this.currentPage + 1) * this.itemsPerPage
        };
    }
    /**
     * Restore current page data from original data
     */
    restoreCurrentPageData() {
        const { startIndex, endIndex } = this.getPaginationIndices();
        this.paginatedDataSource = this.originalData.slice(startIndex, endIndex);
    }
    /**
     * Apply search filter to the current page data only
     */
    applySearchFilter() {
        if (!this.searchTerm.trim()) {
            this.restoreCurrentPageData();
        }
        else {
            const searchLower = this.searchTerm.toLowerCase();
            this.paginatedDataSource = this.paginatedDataSource.filter((item) => this.matchesSearchTerm(item, searchLower));
        }
    }
    /**
     * Get formatted date for an item based on the date field
     */
    getItemDate(item, dateField) {
        if (dateField === 'followUp') {
            return this.formatDate(this.convertToISO(item.followUp));
        }
        else if (dateField === 'slotJsDate') {
            return this.formatDate(item[dateField]);
        }
        else {
            return item[dateField].includes(',') ? this.formatDate(item[dateField]) : this.convertToDate(item[dateField]);
        }
    }
    /**
     * Check if item matches search term
     */
    matchesSearchTerm(item, searchLower) {
        if (this.pluginConfigObs?.pluginConfigObsFlag === 'Appointment') {
            return (item?.openMrsId?.toLowerCase().includes(searchLower) ||
                item?.patientName?.toLowerCase().includes(searchLower) ||
                item?.TMH_patient_id?.toLowerCase().includes(searchLower));
        }
        else {
            return (item?.patient?.identifier?.toLowerCase().includes(searchLower) ||
                item?.patient_name?.given_name?.toLowerCase().includes(searchLower) ||
                item?.patient_name?.family_name?.toLowerCase().includes(searchLower));
        }
    }
    /**
     * Apply multiple filters efficiently
     */
    applyFilters() {
        // Check if any filters are active
        this.isFilterActive = !!(this.searchTerm.trim() || this.currentDateFilter);
        this.paginationDisabled = this.isFilterActive;
        // If no search term and no date filter, restore current page data
        if (!this.isFilterActive) {
            this.restoreCurrentPageData();
            this.updatePaginatorLength();
            return;
        }
        // Always start with current page data from original data when applying filters
        const { startIndex, endIndex } = this.getPaginationIndices();
        let filteredData = this.originalData.slice(startIndex, endIndex);
        // Apply date filter
        if (this.currentDateFilter) {
            const { dateField, filterValue, isRange, startDate, endDate } = this.currentDateFilter;
            filteredData = filteredData.filter((item) => {
                const itemDate = this.getItemDate(item, dateField);
                if (isRange && startDate && endDate) {
                    return itemDate >= startDate && itemDate <= endDate;
                }
                else if (filterValue) {
                    return itemDate === filterValue;
                }
                return true;
            });
        }
        // Apply search filter
        if (this.searchTerm.trim()) {
            const searchLower = this.searchTerm.toLowerCase();
            filteredData = filteredData.filter((item) => this.matchesSearchTerm(item, searchLower));
        }
        // Update filtered count for current page
        this.filteredTotalCount = filteredData.length;
        this.paginatedDataSource = filteredData;
        // Update paginator length
        this.updatePaginatorLength();
    }
    /**
     * Update paginator length based on filter state
     */
    updatePaginatorLength() {
        if (this.tempPaginator) {
            this.tempPaginator.length = this.isFilterActive ? this.filteredTotalCount : this.totalRecords;
        }
    }
    /**
     * Check if pagination should be disabled
     */
    isPaginationDisabled() {
        return this.isFilterActive || this.paginationDisabled;
    }
    /**
     * Get the current total count (filtered or original)
     */
    getCurrentTotalCount() {
        return this.isFilterActive ? this.filteredTotalCount : this.totalRecords;
    }
    ngOnInit() {
        this.isMCCUser = !!this.rolesService.getRole('ORGANIZATIONAL:MCC');
        // Initialize component-specific state
        this.initializeComponentState();
        this.appConfigService.load().then(() => {
            this.displayedColumns = this.displayedColumns.filter(col => (col !== 'age' || this.checkPatientRegField('Age')));
            Object.keys(this.appConfigService.patient_registration).forEach(obj => {
                this.patientRegFields.push(...this.appConfigService.patient_registration[obj].filter((e) => e.is_enabled).map((e) => e.name));
            });
            this.pvs = { ...this.appConfigService.patient_visit_summary };
            this.pvs.appointment_button = this.pvs.appointment_button;
            this.displayedColumns = this.displayedColumns.filter(col => {
                if (col === 'drName' && !this.isMCCUser)
                    return false;
                if (col === 'age')
                    return this.checkPatientRegField('Age');
                return true;
            });
            if (!this.pvs.awaiting_visits_patient_type_demarcation) {
                this.displayedColumns = this.displayedColumns.filter(col => (col !== 'patient_type'));
            }
        }).catch((error) => {
            console.error('Error loading app config', error);
        });
        this.translateService.use(getCacheData(false, languages.SELECTED_LANGUAGE));
        let provider = getCacheData(true, doctorDetails.PROVIDER);
        if (provider) {
            if (provider.attributes.length) {
                this.specialization = this.getSpecialization(provider.attributes);
            }
            if (this.pluginConfigObs?.pluginConfigObsFlag === "Appointment") {
                this.getAppointments();
            }
            if (this.pluginConfigObs?.pluginConfigObsFlag === "Awaiting") {
                this.getAwaitingVisits(1);
            }
            if (this.pluginConfigObs?.pluginConfigObsFlag === "Priority") {
                this.getPriorityVisits(1);
            }
            if (this.pluginConfigObs?.pluginConfigObsFlag === "InProgress") {
                this.getInProgressVisits(1);
            }
            if (this.pluginConfigObs?.pluginConfigObsFlag === "Completed") {
                this.getCompletedVisits(1);
            }
            if (this.pluginConfigObs?.pluginConfigObsFlag === "FollowUp") {
                this.getFollowUpVisit(1);
            }
        }
        this.maxDate = this.pluginConfigObs.filterObs.filterDateMax;
        if (this.pluginConfigObs.hasOwnProperty("pageSizeOptions")) {
            this.pageSizeOptions = this.pluginConfigObs.pageSizeOptions;
        }
    }
    /**
     * Dynmaic label Display
     * @param changes pluginConfigObs
     */
    ngOnChanges(changes) {
        if (changes["pluginConfigObs"] && changes["pluginConfigObs"].currentValue) {
            this.displayedAppointmentColumns = [...changes["pluginConfigObs"].currentValue?.tableColumns];
            this.displayedColumns = this.displayedAppointmentColumns.map(column => column.key);
        }
        if ((!changes['pluginConfigObs'].firstChange) && this.pluginConfigObs.pluginConfigObsFlag == "Appointment" && changes["pluginConfigObs"].currentValue?.tableHeader !== changes["pluginConfigObs"].previousValue?.tableHeader) {
            this.pageSize = TableGridComponent.APPOINTMENT_PAGE_SIZE;
            this.itemsPerPage = TableGridComponent.APPOINTMENT_PAGE_SIZE;
            this.getAppointments();
        }
        const prev = changes['pluginConfigObs'].previousValue;
        const curr = changes['pluginConfigObs'].currentValue;
        const prevType = prev?.filter?.filterType;
        const currType = curr?.filter?.filterType;
        if (prevType !== currType) {
            this.resetDateForm(); // Reset only when type has changed
        }
    }
    /**
    * Reset the date for appointments(Today's,upcoming,pending appoinments)  g
    */
    resetDateForm() {
        if (this.filteredDateAndRangeForm) {
            this.filteredDateAndRangeForm.reset({
                date: null,
                startDate: null,
                endDate: null
            });
        }
        this.mode = 'date';
        if (this.searchElement && this.searchElement.nativeElement) {
            this.searchElement.nativeElement.value = "";
        }
        this.isFilterApplied = false;
        this.dataSource.filter = null;
    }
    /**
    * Retreive the chief complaints for the visit
    * @param {CustomVisitModel} visit - Visit
    * @return {string[]} - Chief complaints array
    */
    getCheifComplaint(visit) {
        let recent = [];
        const encounters = visit.encounters;
        encounters.forEach((encounter) => {
            const display = encounter.type?.name;
            if (display.match(visitTypes.ADULTINITIAL) !== null) {
                const obs = encounter.obs;
                obs.forEach((currentObs) => {
                    if (currentObs.concept_id == TableGridComponent.CHIEF_COMPLAINT_CONCEPT_ID) {
                        const currentComplaint = this.visitService.getData2(currentObs)?.value_text.replace(new RegExp('►', 'g'), '').split('<b>');
                        for (let i = 1; i < currentComplaint.length; i++) {
                            const obs1 = currentComplaint[i].split('<');
                            if (!obs1[0].match(visitTypes.ASSOCIATED_SYMPTOMS)) {
                                recent.push(obs1[0]);
                            }
                        }
                    }
                });
            }
        });
        return recent;
    }
    /**
    * Check how old the date is from now
    * @param {string} data - Date in string format
    * @return {string} - Returns how old the date is from now
    */
    checkIfDateOldThanOneDay(data) {
        let hours = moment(data).diff(moment(), 'hours');
        let minutes = moment(data).diff(moment(), 'minutes');
        if (hours > 24) {
            return moment(data).format('DD MMM, YYYY hh:mm A');
        }
        ;
        if (hours < 1) {
            if (minutes < 0)
                return `Due : ${moment(data).format('DD MMM, YYYY hh:mm A')}`;
            return `${minutes} minutes`;
        }
        return `${hours} hrs`;
    }
    /**
    * Reschedule appointment
    * @param {AppointmentModel} appointment - Appointment to be rescheduled
    * @param {boolean} isValidationRequired - If true, validation is required
    * @return {void}
    */
    reschedule(appointment, isValidationRequired) {
        const len = appointment.visit.encounters.filter((e) => {
            return (e.type.name == visitTypes.PATIENT_EXIT_SURVEY || e.type.name == visitTypes.VISIT_COMPLETE);
        }).length;
        const isCompleted = Boolean(len);
        if (isCompleted) {
            this.toastr.error(this.translateService.instant("Visit is already completed, it can't be rescheduled."), this.translateService.instant('Rescheduling failed!'));
        }
        else if (appointment.visitStatus == 'Visit In Progress' && isValidationRequired) {
            this.toastr.error(this.translateService.instant("Visit is in progress, it can't be rescheduled."), this.translateService.instant('Rescheduling failed!'));
        }
        else {
            this.coreService.openRescheduleAppointmentModal(appointment).subscribe((res) => {
                if (res) {
                    let newSlot = res;
                    this.coreService.openRescheduleAppointmentConfirmModal({ appointment, newSlot }).subscribe((result) => {
                        if (result) {
                            appointment.appointmentId = appointment.id;
                            appointment.slotDate = moment(newSlot.date, "YYYY-MM-DD").format('DD/MM/YYYY');
                            appointment.slotTime = newSlot.slot;
                            this.appointmentService.rescheduleAppointment(appointment).subscribe((res) => {
                                const message = res.message;
                                if (res.status) {
                                    this.mindmapService.notifyHwForRescheduleAppointment(appointment);
                                    this.getAppointments();
                                    this.toastr.success(this.translateService.instant("The appointment has been rescheduled successfully!"), this.translateService.instant('Rescheduling successful!'));
                                }
                                else {
                                    this.toastr.success(message, this.translateService.instant('Rescheduling failed!'));
                                }
                            });
                        }
                    });
                }
            });
        }
    }
    /**
    * Cancel appointment
    * @param {AppointmentModel} appointment - Appointment to be rescheduled
    * @param {boolean} isValidationRequired - If true, validation is required
    * @return {void}
    */
    cancel(appointment, isValidationRequired) {
        if (appointment.visitStatus == 'Visit In Progress' && isValidationRequired) {
            this.toastr.error(this.translateService.instant("Visit is in progress, it can't be cancelled."), this.translateService.instant('Canceling failed!'));
            return;
        }
        this.coreService.openConfirmCancelAppointmentModal(appointment).subscribe((res) => {
            if (res) {
                this.toastr.success(this.translateService.instant('The Appointment has been successfully canceled.'), this.translateService.instant('Canceling successful'));
                this.getAppointments();
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
    * Apply filter on a datasource
    * @param {Event} event - Input's change event
    * @return {void}
    */
    applyFilter(event) {
        this.searchTerm = event.target.value.trim();
        this.isFilterApplied = this.searchTerm.length > 0;
        this.applyFilters();
    }
    // Call this once after loading appointments
    storeOriginalData(originalData) {
        this.originalData = originalData ? [...originalData] : [...this.dataSource]; // Backup full data
        this.applyFilters(); // Apply any existing filters
    }
    /**
    * Clear filter from current page data
    * @return {void}
    */
    clearFilter() {
        this.searchTerm = '';
        this.currentDateFilter = null;
        this.isFilterApplied = false;
        this.isFilterActive = false;
        this.filteredTotalCount = 0;
        this.paginationDisabled = false;
        if (this.searchElement?.nativeElement) {
            this.searchElement.nativeElement.value = "";
        }
        this.filteredDateAndRangeForm.reset({
            date: null,
            startDate: null,
            endDate: null
        });
        this.mode = 'date';
        this.restoreCurrentPageData();
        this.updatePaginatorLength();
    }
    /**
     * Checks if the field is in patient registration fields
     * @param {string} fieldName - The field name
     * @return {boolean} - True if present, else false
     */
    checkPatientRegField(fieldName) {
        return this.patientRegFields.indexOf(fieldName) !== -1;
    }
    /**
    * Returns the WhatsApp link for a given telephone number
    * @param {string} telephoneNumber - The telephone number to generate the link for
    * @return {string} - The WhatsApp link
    */
    getWhatsAppLink(telephoneNumber) {
        return this.visitService.getWhatsappLink(telephoneNumber);
    }
    /**
     * Retrieves the telephone number from the person's attributes
     * @param {AppointmentModel['visit']['person']} person - The person object containing attributes
     * @return {string | undefined} - The person's telephone number or undefined if not found
     */
    getTelephoneNumber(person) {
        return person?.person_attribute.find((v) => v.person_attribute_type_id == TableGridComponent.TELEPHONE_ATTRIBUTE_ID)?.value;
    }
    /**
     * Closes the menu if it's open
     */
    closeMenu() {
        if (this.menuTrigger) {
            this.menuTrigger.closeMenu();
        }
    }
    /**
     * Sets the mode for the component (either 'date' or 'range')
     * @param {'date' | 'range'} mode - The mode to set
     */
    setMode(mode) {
        this.mode = mode;
        // Clear error messages when switching modes
        this.dateErrorMessage = '';
        this.startDateErrorMessage = '';
        this.endDateErrorMessage = '';
    }
    /**
     * Formats a date into 'YYYY-MM-DD' format
     * @param {any} date - The date to format
     * @return {string} - The formatted date
     */
    formatDate(date) {
        const localDate = new Date(date);
        const year = localDate.getFullYear();
        const month = String(localDate.getMonth() + 1).padStart(2, '0');
        const day = String(localDate.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    }
    /**
     * Converts a relative time string (e.g., "2 hours", "1 day") to a date string
     * @param {string} relativeTime - The relative time string
     * @return {string} - The resulting date in 'YYYY-MM-DD' format
     * @throws {Error} - Throws error for invalid time units
     */
    convertToDate(relativeTime) {
        const now = new Date();
        const [value, unit] = relativeTime.split(' ');
        const amount = parseInt(value, 10);
        if (['hour', 'hours'].includes(unit.toLowerCase()))
            now.setHours(now.getHours() - amount);
        else if (['minute', 'minutes'].includes(unit.toLowerCase()))
            now.setMinutes(now.getMinutes() - amount);
        else if (['day', 'days'].includes(unit.toLowerCase()))
            now.setDate(now.getDate() - amount);
        else
            throw new Error('Invalid time unit. Only "hours", "minutes", or "days" are supported.');
        return now.toISOString().split('T')[0];
    }
    /**
     * Converts a follow-up date string to ISO format
     * @param {string} followUp - The follow-up date string
     * @return {string} - The follow-up date in ISO string format
     */
    convertToISO(followUp) {
        const date = new Date(followUp);
        date.setDate(date.getDate());
        return date.toISOString();
    }
    /**
     * Applies date or range filter to the data source based on selected date(s)
     * @param {string} dateField - The field name for the date to filter
     */
    applyDateOrRangeFilter(dateField) {
        const selectedDate = this.filteredDateAndRangeForm.get('date')?.value;
        const startDate = this.filteredDateAndRangeForm.get('startDate')?.value;
        const endDate = this.filteredDateAndRangeForm.get('endDate')?.value;
        // Clear previous error messages
        this.dateErrorMessage = '';
        this.startDateErrorMessage = '';
        this.endDateErrorMessage = '';
        // Validation for date mode
        if (this.mode === 'date' && !selectedDate) {
            this.dateErrorMessage = this.translateService.instant('Please select a date');
            return;
        }
        // Validation for range mode
        if (this.mode === 'range') {
            let hasError = false;
            if (!startDate) {
                this.startDateErrorMessage = this.translateService.instant('Please select start date');
                hasError = true;
            }
            if (!endDate) {
                this.endDateErrorMessage = this.translateService.instant('Please select end date');
                hasError = true;
            }
            if (hasError) {
                return;
            }
        }
        if (selectedDate) {
            const formattedDate = this.formatDate(selectedDate);
            this.dateFilter = this.formatDate(selectedDate);
            this.currentDateFilter = {
                dateField,
                filterValue: formattedDate,
                isRange: false
            };
        }
        else if (startDate && endDate) {
            const formattedStartDate = this.formatDate(startDate);
            const formattedEndDate = this.formatDate(endDate);
            this.dateFilter = `${this.formatDate(startDate)}:${this.formatDate(endDate)}`;
            this.currentDateFilter = {
                dateField,
                startDate: formattedStartDate,
                endDate: formattedEndDate,
                isRange: true
            };
        }
        else {
            this.dateFilter = '';
            this.currentDateFilter = null;
        }
        this.dateField = dateField;
        this.applyFilters();
        this.closeMenu();
    }
    /**
     * Resets the date filter form and clears the data source filter
     * @param {boolean} flag - If true, doesn't close the menu
     */
    resetDate(flag = false) {
        this.filteredDateAndRangeForm.reset();
        this.currentDateFilter = null;
        // Clear error messages
        this.dateErrorMessage = '';
        this.startDateErrorMessage = '';
        this.endDateErrorMessage = '';
        this.applyFilters();
        if (!flag) {
            this.closeMenu();
        }
    }
    /**
     * Retrieves a specific attribute data from the person's attributes
     * @param {any} data - The data object containing person attributes
     * @param {string} attributeName - The name of the attribute to retrieve
     * @return {Object | null} - The attribute name and value, or null if not found
     */
    getAttributeData(data, attributeName) {
        if (Array.isArray(data.person_attribute)) {
            const attribute = data.person_attribute.find((attr) => attr.person_attribute_type?.name === attributeName);
            if (attribute) {
                return {
                    name: attribute.person_attribute_type.name,
                    value: attribute.value
                };
            }
        }
        return null;
    }
    /**
    * Get booked appointments for a logged-in doctor in a current year
    * @return {void}
    */
    getAppointments() {
        this.ngxLoader.startLoader('table-loader-' + this.pluginConfigObs.pluginConfigObsFlag); // Start section loader
        this.appointments = [];
        let fromDate = moment().startOf('year').format('DD/MM/YYYY');
        let toDate = moment().endOf('year').format('DD/MM/YYYY');
        let pending_visits = this.pluginConfigObs.filter?.hasOwnProperty("pending_visits") ? this.pluginConfigObs.filter?.pending_visits : null;
        if (this.pluginConfigObs?.filter) {
            fromDate = this.pluginConfigObs?.filter?.fromDate;
            toDate = this.pluginConfigObs?.filter?.toDate;
        }
        this.appointmentService.getUserSlots(getCacheData(true, doctorDetails.USER).uuid, fromDate, toDate, this.isMCCUser ? this.specialization : null, pending_visits)
            .subscribe({
            next: (res) => {
                this.totalRecords = (res.data?.length > 1) ? res.data?.length - 1 : res.data?.length || 0;
                this.emitVisitsCount(this.totalRecords);
                let appointmentsdata = res.data;
                appointmentsdata.forEach((appointment) => {
                    if (appointment.status == 'booked' && (appointment.visitStatus == 'Awaiting Consult' || appointment.visitStatus == 'Visit In Progress')) {
                        if (appointment.visit) {
                            appointment.cheif_complaint = this.getCheifComplaint(appointment.visit);
                            appointment.starts_in = checkIfDateOldThanOneDay(appointment.slotJsDate);
                            appointment.telephone = this.getTelephoneNumber(appointment?.visit?.person);
                            appointment.TMH_patient_id = this.getAttributeData(appointment.visit, "TMH Case Number")?.value;
                            appointment.uuid = appointment.visitUuid;
                            appointment.location = appointment?.visit?.location?.name;
                            appointment.age = appointment?.patientAge + ' ' + this.translateService.instant('y');
                            this.appointments.push(appointment);
                        }
                    }
                });
                this.dataSource = [...this.appointments];
                this.storeOriginalData();
            },
            complete: () => {
                this.ngxLoader.stopLoader('table-loader-' + this.pluginConfigObs.pluginConfigObsFlag); // Stop section loader
                // Scroll to top after data is loaded
                this.scrollToTop();
            }
        });
    }
    /**
    * Get doctor speciality
    * @param {ProviderAttributeModel[]} attr - Array of provider attributes
    * @return {string} - Doctor speciality
    */
    getSpecialization(attr) {
        let specialization = '';
        attr.forEach((a) => {
            if (a.attributeType.uuid == TableGridComponent.SPECIALIZATION_UUID && !a.voided) {
                specialization = a.value;
            }
        });
        return specialization;
    }
    /**
    * Returns the age in years from the birthdate
    * @param {string} birthdate - Date in string format
    * @return {number} - Age
    */
    calculateAge(birthdate) {
        return moment().diff(birthdate, 'years');
    }
    /**
    * Returns the created time in words from the date
    * @param {string} data - Date
    * @return {string} - Created time in words from the date
    */
    getCreatedAt(data) {
        let hours = moment().diff(moment(data), 'hours');
        let minutes = moment().diff(moment(data), 'minutes');
        if (hours > 24) {
            return moment(data).format('DD MMM, YYYY');
        }
        ;
        if (hours < 1) {
            return `${minutes} ${this.translateService.instant("Minutes ago")}`;
        }
        return `${hours} ${this.translateService.instant("Hours ago")}`;
    }
    /**
    * Get encounter datetime for a given encounter type
    * @param {CustomVisitModel} visit - Visit
    * @param {string} encounterName - Encounter type
    * @return {string} - Encounter datetime
    */
    getEncounterCreated(visit, encounterName) {
        let created_at = '';
        const encounters = visit.encounters;
        encounters.forEach((encounter) => {
            const display = encounter.type?.name;
            if (display.match(encounterName) !== null) {
                created_at = this.getCreatedAt(encounter.encounter_datetime.replace('Z', '+0530'));
            }
        });
        return created_at;
    }
    /**
     * Determines if the encounter is a follow-up or new visit
     * @param {any} enc - Encounter data
     * @return {string} - 'FOLLOW_UP' or 'NEW'
     */
    getDemarcation(enc) {
        let isFollowUp = false;
        const adlIntl = enc?.find?.(e => e?.type?.name === visitTypes.ADULTINITIAL);
        if (Array.isArray(adlIntl?.obs)) {
            adlIntl?.obs.forEach(obs => {
                if (!isFollowUp)
                    isFollowUp = obs?.value_text?.toLowerCase?.()?.includes?.("follow up");
            });
        }
        return isFollowUp ? visitTypes.FOLLOW_UP : visitTypes.NEW;
    }
    /**
    * Get awaiting visits for a given page number
    * @param {number} page - Page number
    * @return {void}
    */
    getAwaitingVisits(page = 1) {
        this.loadVisitData(page, this.awaitingVisits, this.visitService.getAwaitingVisits);
    }
    /**
    * Get inprogress visits for a given page number
    * @param {number} page - Page number
    * @return {void}
    */
    getInProgressVisits(page = 1) {
        this.loadVisitData(page, this.inProgressVisits, this.visitService.getInProgressVisits, visitTypes.VISIT_NOTE, this.sortInProgressVisits.bind(this));
    }
    /**
    * Get priority visits for a given page number
    * @param {number} page - Page number
    * @return {void}
    */
    getPriorityVisits(page = 1) {
        this.loadVisitData(page, this.priorityVisits, this.visitService.getPriorityVisits, visitTypes.FLAGGED);
    }
    /**
     * Get completed visits count
     * @return {void}
     */
    getCompletedVisits(page = 1) {
        this.loadVisitData(page, this.completedVisits, this.visitService.getEndedVisits, visitTypes.COMPLETED_VISIT);
    }
    /**
    * Get follow-up visits for a logged-in doctor
    * @return {void}
    */
    getFollowUpVisit(page = 1) {
        this.ngxLoader.startLoader('table-loader-' + this.pluginConfigObs.pluginConfigObsFlag);
        if (page === 1) {
            this.followUpVisits.length = 0;
            this.recordsFetched = 0;
        }
        this.visitService.getFollowUpVisits(this.specialization, page).subscribe({
            next: (res) => {
                if (res.success) {
                    this.totalRecords = res.totalCount;
                    this.recordsFetched += this.pageSize;
                    this.emitVisitsCount(this.totalRecords);
                    const processedVisits = res.data
                        .map(visit => this.processFollowUpVisitData(visit))
                        .filter(visit => visit !== null);
                    this.followUpVisits.push(...processedVisits);
                    this.updateDataSources(this.followUpVisits, processedVisits);
                }
            },
            complete: () => {
                this.ngxLoader.stopLoader('table-loader-' + this.pluginConfigObs.pluginConfigObsFlag);
                this.scrollToTop();
            }
        });
    }
    /**
    * Get encounter datetime for a given encounter type
    * @param {CustomVisitModel} visit - Visit
    * @param {string} encounterName - Encounter type
    * @return {string} - Encounter datetime
    */
    getEncounterObs(encounters, encounterName, conceptId) {
        let obs;
        encounters.forEach((encounter) => {
            if (encounter.type?.name === encounterName) {
                obs = encounter?.obs?.find((o) => o.concept_id == conceptId);
            }
        });
        return obs;
    }
    /**
     * Renders HTML content for a column, sanitized for security
     * @param {any} column - Column definition
     * @param {any} element - Data element to render
     * @return {SafeHtml | string} - Formatted HTML or element value
     */
    renderHtmlContent(column, element) {
        return column.formatHtml && typeof column.formatHtml === 'function' ? this.sanitizer.bypassSecurityTrustHtml(column.formatHtml(element)) : element[column.key];
    }
    /**
     * Returns a string of CSS classes for the column
     * @param {any} column - Column definition
     * @return {string} - Space-separated class names
     */
    getClasses(column, element) {
        let classList = [];
        // If column has a static classList (array or string), add it
        if (column.classList) {
            classList = typeof column.classList === "function" ? column.classList(element) : column.classList;
        }
        return classList.join(" ");
    }
    /**
     * Formats the follow-up date by cleaning up time details
     * @param {string} value - Follow-up date string
     * @return {string} - Formatted date
     */
    processFollowUpDate(value) {
        return value ? value.split(',').length > 1 ? `${value.split(',')[0]} ${value.split(',')[1].replace("Time:", "")}` : value : '';
    }
    ;
    /**
     * Executes the action based on its label (Reschedule or Cancel)
     * @param {any} action - Action object
     * @param {any} element - Element to perform the action on
     */
    handleAction(action, element) {
        const isValidationRequired = action.validationRequired !== undefined ? action.validationRequired : true;
        if (action.label === 'Reschedule') {
            this.reschedule(element, isValidationRequired);
        }
        else if (action.label === 'Cancel') {
            this.cancel(element, isValidationRequired);
        }
    }
    /**
     * Opens a WhatsApp chat with the given phone number
     * @param {MouseEvent} event - The click event to prevent row navigation
     * @param {string} telephone - Phone number for WhatsApp
     */
    openWhatsApp(event, telephone) {
        event.stopPropagation(); // Prevent row navigation
        const whatsappLink = `https://wa.me/${telephone}`;
        window.open(whatsappLink, '_blank', 'noopener,noreferrer');
    }
    /**
     * Emits the visits count data with the given table tag name and count
     * @param {number} visitsCount - The total visits count for the specific table
     */
    emitVisitsCount(visitsCount) {
        const visitsCountData = {
            tableTagName: this.pluginConfigObs.pluginConfigObsFlag,
            visitsCount: visitsCount
        };
        this.visitsCountDate.emit(visitsCountData);
    }
    getData(event) {
        this.pageIndex = event.pageIndex;
        this.pageSize = event.pageSize;
        this.currentPage = event.pageIndex;
        this.itemsPerPage = event.pageSize;
        // If filters are active, disable pagination and don't make API calls
        if (this.isFilterActive || this.paginationDisabled) {
            this.scrollToTop();
            return event;
        }
        const requiredRecords = (this.pageIndex + 1) * this.pageSize;
        // Check if we need to fetch more data from API
        if (requiredRecords > this.recordsFetched) {
            this.fetchMoreData();
        }
        else {
            // Data is already present, handle client-side pagination
            this.handleClientSidePagination();
        }
        // Scroll to top when pagination changes
        this.scrollToTop();
        return event;
    }
    /**
     * Fetch more data from API based on current plugin type
     */
    fetchMoreData() {
        const nextPage = (this.recordsFetched + this.pageSize) / this.pageSize;
        switch (this.pluginConfigObs?.pluginConfigObsFlag) {
            case "Awaiting":
                this.getAwaitingVisits(nextPage);
                break;
            case "Priority":
                this.getPriorityVisits(nextPage);
                break;
            case "InProgress":
                this.getInProgressVisits(nextPage);
                break;
            case "Completed":
                this.getCompletedVisits(nextPage);
                break;
            case "FollowUp":
                this.getFollowUpVisit(nextPage);
                break;
        }
    }
    /**
     * Handle client-side pagination for already loaded data
     */
    handleClientSidePagination() {
        // Ensure filteredDataSource has all the data from originalData
        if (this.filteredDataSource.length < this.originalData.length) {
            this.filteredDataSource = [...this.originalData];
        }
        // Apply pagination to the filtered data
        this.applyPagination();
        // Update paginator length to show correct total
        if (this.tempPaginator) {
            this.tempPaginator.length = this.totalRecords;
        }
    }
    /**
     * Handle sorting for current page data only
     * @param {string} column - Column to sort by
     * @param {string} direction - Sort direction ('asc' or 'desc')
     */
    handleSort(column, direction) {
        if (!column || !direction)
            return;
        // Sort only the current page data
        this.paginatedDataSource.sort((a, b) => {
            let aValue = this.getSortValue(a, column);
            let bValue = this.getSortValue(b, column);
            // Convert to string for comparison if needed
            if (typeof aValue === 'string')
                aValue = aValue.toLowerCase();
            if (typeof bValue === 'string')
                bValue = bValue.toLowerCase();
            return direction === 'asc'
                ? (aValue < bValue ? -1 : aValue > bValue ? 1 : 0)
                : (aValue > bValue ? -1 : aValue < bValue ? 1 : 0);
        });
    }
    /**
     * Get sort value for an item based on column
     */
    getSortValue(item, column) {
        if (column === 'patient_name') {
            return (item.patient_name?.given_name || '') + ' ' + (item.patient_name?.family_name || '');
        }
        return item[column];
    }
    /**
     * Process visit data with common fields
     */
    processVisitData(visit, encounterType) {
        visit.cheif_complaint = this.getCheifComplaint(visit);
        visit.visit_created = visit?.date_created
            ? this.getCreatedAt(visit.date_created.replace('Z', '+0530'))
            : this.getEncounterCreated(visit, encounterType || visitTypes.ADULTINITIAL);
        visit.person.age = this.calculateAge(visit.person.birthdate);
        visit.location = visit?.location?.name;
        visit.age = visit?.person?.age + ' ' + this.translateService.instant('y');
        // Add specific fields based on visit type
        if (encounterType === visitTypes.VISIT_NOTE) {
            visit.prescription_started = this.getEncounterCreated(visit, visitTypes.VISIT_NOTE);
        }
        if (encounterType === visitTypes.COMPLETED_VISIT) {
            visit.completed = visit?.date_created
                ? this.getCreatedAt(visit.date_created.replace('Z', '+0530'))
                : this.getEncounterCreated(visit, visitTypes.VISIT_COMPLETE);
        }
        if (encounterType === visitTypes.FLAGGED) {
            visit.visit_created = visit?.date_created
                ? this.getCreatedAt(visit.date_created.replace('Z', '+0530'))
                : this.getEncounterCreated(visit, visitTypes.FLAGGED);
        }
        // Add common fields
        visit.TMH_patient_id = this.getAttributeData(visit, "TMH Case Number")?.value;
        visit.patient_type = this.getDemarcation(visit?.encounters);
        return visit;
    }
    /**
     * Generic data loading method
     */
    loadVisitData(page, visitArray, serviceMethod, encounterType, customSorting) {
        this.ngxLoader.startLoader('table-loader-' + this.pluginConfigObs.pluginConfigObsFlag);
        if (page === 1) {
            visitArray.length = 0; // Clear array efficiently
            this.recordsFetched = 0;
        }
        serviceMethod.call(this.visitService, this.specialization, page).subscribe({
            next: (res) => {
                if (res.success) {
                    this.totalRecords = res.totalCount;
                    this.recordsFetched += this.pageSize;
                    this.emitVisitsCount(this.totalRecords);
                    const processedVisits = res.data.map(visit => this.processVisitData(visit, encounterType));
                    // Apply custom sorting if provided
                    const sortedVisits = customSorting ? customSorting(processedVisits) : processedVisits;
                    // Add to visit array
                    visitArray.push(...sortedVisits);
                    // Update data sources
                    this.updateDataSources(visitArray, sortedVisits);
                }
            },
            complete: () => {
                this.ngxLoader.stopLoader('table-loader-' + this.pluginConfigObs.pluginConfigObsFlag);
                this.scrollToTop();
            }
        });
    }
    /**
     * Update all data sources with new data
     */
    updateDataSources(visitArray, sortedVisits) {
        this.dataSource = sortedVisits ? [...sortedVisits] : [...visitArray];
        this.originalData = [...visitArray];
        this.filteredDataSource = [...visitArray];
        this.applyPagination();
    }
    /**
     * Custom sorting for in-progress visits by prescription time
     */
    sortInProgressVisits(visits) {
        return visits.sort((a, b) => {
            const parseTime = (value) => {
                if (value.includes("minutes ago")) {
                    return { type: "minutes", time: parseInt(value) };
                }
                if (value.includes("Hours ago")) {
                    return { type: "hours", time: parseInt(value) * 60 };
                }
                return { type: "date", time: moment(value, "DD MMM, YYYY").valueOf() };
            };
            const visitA = parseTime(a.prescription_started);
            const visitB = parseTime(b.prescription_started);
            // Sort minutes first (ascending)
            if (visitA.type === "minutes" && visitB.type === "minutes") {
                return visitA.time - visitB.time;
            }
            // Sort hours first (ascending)
            if (visitA.type === "hours" && visitB.type === "hours") {
                return visitA.time - visitB.time;
            }
            // Sort dates (descending)
            if (visitA.type === "date" && visitB.type === "date") {
                return visitB.time - visitA.time;
            }
            // Prioritize minutes over hours, and hours over dates
            if (visitA.type === "minutes")
                return -1;
            if (visitB.type === "minutes")
                return 1;
            if (visitA.type === "hours")
                return -1;
            if (visitB.type === "hours")
                return 1;
            return 0;
        });
    }
    /**
     * Process follow-up visit data with special handling
     */
    processFollowUpVisitData(visit) {
        if (!visit?.encounters?.length)
            return null;
        visit.cheif_complaint = this.getCheifComplaint(visit);
        visit.visit_created = visit?.date_created
            ? this.getCreatedAt(visit.date_created.replace('Z', '+0530'))
            : this.getEncounterCreated(visit, visitTypes.COMPLETED_VISIT);
        visit.person.age = this.calculateAge(visit.person.birthdate);
        visit.completed = this.getEncounterCreated(visit, visitTypes.VISIT_COMPLETE);
        visit.followUp = this.processFollowUpDate(this.getEncounterObs(visit.encounters, visitTypes.VISIT_NOTE, TableGridComponent.FOLLOW_UP_CONCEPT_ID)?.value_text);
        visit.location = visit?.location?.name;
        visit.age = visit?.person?.age + ' ' + this.translateService.instant('y');
        return visit;
    }
    /**
     * Scroll to top of the table container
     */
    scrollToTop() {
        // Find the table container and scroll to top using unique component ID
        const tableContainer = document.querySelector('#table-container-' + this.componentId);
        if (tableContainer) {
            tableContainer.scrollTop = 0;
        }
    }
    /**
     * Add data-test-ids to datepicker calendar navigation buttons and date cells
     */
    addCalendarNavigationTestIds() {
        setTimeout(() => {
            // Add test IDs to navigation buttons
            const prevButton = document.querySelector('.mat-calendar-previous-button');
            const nextButton = document.querySelector('.mat-calendar-next-button');
            if (prevButton && !prevButton.getAttribute('data-test-id')) {
                prevButton.setAttribute('data-test-id', 'calendarNavPrevious');
            }
            if (nextButton && !nextButton.getAttribute('data-test-id')) {
                nextButton.setAttribute('data-test-id', 'calendarNavNext');
            }
            // Add test IDs to all date cells
            const dateCells = document.querySelectorAll('.mat-calendar-body-cell');
            dateCells.forEach((cell) => {
                if (!cell.getAttribute('data-test-id')) {
                    const dateButton = cell.querySelector('.mat-calendar-body-cell-content');
                    if (dateButton) {
                        const dateValue = dateButton.textContent?.trim();
                        if (dateValue) {
                            cell.setAttribute('data-test-id', `calendarDate-${dateValue}`);
                        }
                    }
                }
            });
        }, 0);
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.3.0", ngImport: i0, type: TableGridComponent, deps: [{ token: AppointmentService }, { token: VisitService }, { token: CoreService }, { token: i3.ToastrService }, { token: i4.TranslateService }, { token: MindmapService }, { token: i7.DomSanitizer }, { token: AppConfigService }, { token: i9.NgxRolesService }, { token: i10.NgxUiLoaderService }, { token: 'environment' }], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "14.3.0", type: TableGridComponent, selector: "lib-table-grid", inputs: { pluginConfigObs: "pluginConfigObs" }, outputs: { visitsCountDate: "visitsCountDate" }, viewQueries: [{ propertyName: "searchElement", first: true, predicate: ["searchInput"], descendants: true, static: true }, { propertyName: "tempPaginator", first: true, predicate: ["tempPaginator"], descendants: true }, { propertyName: "paginatorEl", first: true, predicate: ["tempPaginator"], descendants: true, read: ElementRef }, { propertyName: "menuTrigger", first: true, predicate: MatMenuTrigger, descendants: true }, { propertyName: "datePicker", first: true, predicate: ["datePicker"], descendants: true }, { propertyName: "startDatePicker", first: true, predicate: ["startDatePicker"], descendants: true }, { propertyName: "endDatePicker", first: true, predicate: ["endDatePicker"], descendants: true }, { propertyName: "filterMenu", first: true, predicate: ["filterMenu"], descendants: true }], usesOnChanges: true, ngImport: i0, template: "<mat-expansion-panel [expanded]=\"true\" data-test-id=\"matExpAppointment\">\r\n  <mat-expansion-panel-header data-test-id=\"matExpHeaderAppointment\">\r\n    <mat-panel-title data-test-id=\"matPanelTitleAppointment\">\r\n      <div id=\"{{pluginConfigObs.anchorId}}\" class=\"anchor-con\" data-test-id=\"divAnchorAppointment\"></div>\r\n      <div class=\"intel-accordion-title\" data-test-id=\"divAccordionTitleAppointment\">\r\n        <img src=\"{{ pluginConfigObs.tableHeaderIcon }}\" alt=\"\" width=\"44px\" data-test-id=\"imgTableHeaderIconAppointment\">\r\n        <h6 class=\"mb-0 ml-2\" [attr.data-test-id]=\"pluginConfigObs.tableHeader\"> \r\n          {{ pluginConfigObs.tableHeader | translate }} ({{ getCurrentTotalCount() }})\r\n        </h6>   \r\n        <mat-icon \r\n          aria-hidden=\"false\" \r\n          aria-label=\"help icon\" \r\n          matTooltip=\"{{ (pluginConfigObs.tooltipLabel | translate) }}\" \r\n          matTooltipPosition=\"right\" \r\n          data-test-id=\"icoHelpAppointment\">\r\n          help_outline\r\n        </mat-icon>\r\n\r\n        <!-- Filter button -->\r\n        <div class=\"ml-auto filter-search-container\" data-test-id=\"divFilterContainerAppointment\">\r\n          <button \r\n            *ngIf=\"pluginConfigObs.filterObs.filterFlag\" \r\n            class=\"mat-stroked-button filter-btn\" \r\n            [matMenuTriggerFor]=\"filterMenu\" \r\n            (click)=\"$event.stopPropagation();\" \r\n            data-test-id=\"btnFilterAppointment\">\r\n            <img src=\"{{pluginConfigObs.filterObs.filterIcon}}\" alt=\"\" data-test-id=\"imgFilterIconAppointment\"> \r\n            shaheen{{( pluginConfigObs.filterObs.filterLabel| translate)}}\r\n          </button>\r\n\r\n          <!-- Filter Menu -->\r\n          <mat-menu #filterMenu=\"matMenu\" class=\"custom-menu\" [hasBackdrop]=\"true\" xPosition=\"before\" data-test-id=\"menuFilterAppointment\">\r\n            <div class=\"toggle-buttons\" data-test-id=\"divToggleButtonsAppointment\">\r\n              <button \r\n                mat-button \r\n                [class.active]=\"mode === 'date'\" \r\n                (click)=\"setMode('date'); $event.stopPropagation(); resetDate(true)\" \r\n                data-test-id=\"btnDateModeAppointment\">\r\n                {{'Date' | translate}}\r\n              </button>\r\n              <button \r\n                mat-button \r\n                [class.active]=\"mode === 'range'\" \r\n                (click)=\"setMode('range'); $event.stopPropagation(); resetDate(true)\" \r\n                data-test-id=\"btnRangeModeAppointment\">\r\n                {{'Range' | translate}}\r\n              </button>\r\n            </div>\r\n\r\n            <!-- Date Mode -->\r\n            <div *ngIf=\"mode === 'date'\" class=\"date-view\" (click)=\"$event.stopPropagation()\" data-test-id=\"divDateModeAppointment\">\r\n              <form [formGroup]=\"filteredDateAndRangeForm\" data-test-id=\"formDateFilterAppointment\">\r\n                <div class=\"form-date\" data-test-id=\"divFormDateAppointment\">\r\n                  <div class=\"input-date\" data-test-id=\"divInputDateAppointment\">\r\n                    <label class=\"label-text\" data-test-id=\"lblSelectDateAppointment\">{{ 'Select date' | translate}}</label>\r\n                    <div class=\"input-wrapper\" data-test-id=\"divInputWrapperDateAppointment\">\r\n                      <input\r\n                        type=\"text\"\r\n                        class=\"form-control\"\r\n                        [class.error-border]=\"dateErrorMessage\"\r\n                        [max]=\"maxDate\"\r\n                        formControlName=\"date\"\r\n                        [matDatepicker]=\"datePicker\"\r\n                        [placeholder]=\"filteredDateAndRangeForm.get('date')?.value ? (filteredDateAndRangeForm.get('date')?.value | date: 'dd/MM/yyyy') : ('Select date' | translate)\"\r\n                        aria-label=\"Date\"\r\n                        readonly\r\n                        data-test-id=\"etDate\"/>\r\n                      <mat-datepicker #datePicker (opened)=\"addCalendarNavigationTestIds()\" data-test-id=\"matDatePickerAppointment\"></mat-datepicker>\r\n                      <mat-datepicker-toggle\r\n                        matSuffix\r\n                        [for]=\"datePicker\"\r\n                        data-test-id=\"dpDate\"\r\n                        class=\"datepicker-icon\">\r\n                        <img matDatepickerToggleIcon src=\"assets/svgs/calendar-date.svg\" alt=\"\" data-test-id=\"imgDatePickerIconAppointment\">\r\n                      </mat-datepicker-toggle>\r\n                    </div>\r\n                    <span *ngIf=\"dateErrorMessage\" class=\"error-message\" data-test-id=\"spanDateErrorMessageAppointment\">{{ dateErrorMessage }}</span>\r\n                  </div>\r\n                </div>\r\n              </form>\r\n            </div>\r\n\r\n            <!-- Range Mode -->\r\n            <div *ngIf=\"mode === 'range'\" class=\"range-view\" (click)=\" $event.stopPropagation()\" data-test-id=\"divRangeModeAppointment\">\r\n              <form [formGroup]=\"filteredDateAndRangeForm\" data-test-id=\"formRangeFilterAppointment\">\r\n                <div class=\"form-date\" data-test-id=\"divFormStartDateAppointment\">\r\n                  <div class=\"input-date\" data-test-id=\"divInputStartDateAppointment\">\r\n                    <label class=\"label-text\" data-test-id=\"lblStartDateAppointment\">{{ 'Start date' | translate }}</label>\r\n                    <div class=\"input-wrapper\" data-test-id=\"divInputWrapperStartDateAppointment\">\r\n                      <input\r\n                        type=\"text\"\r\n                        class=\"form-control\"\r\n                        [class.error-border]=\"startDateErrorMessage\"\r\n                        [max]=\"filteredDateAndRangeForm.value.endDate ? filteredDateAndRangeForm.value.endDate : maxDate\"\r\n                        formControlName=\"startDate\"\r\n                        [matDatepicker]=\"startDatePicker\"\r\n                        [placeholder]=\"filteredDateAndRangeForm.get('startDate')?.value ? (filteredDateAndRangeForm.get('startDate')?.value | date: 'dd/MM/yyyy') : ('Select start date'|translate)\"\r\n                        readonly\r\n                        data-test-id=\"etSelStartDate\">\r\n                      <mat-datepicker #startDatePicker (opened)=\"addCalendarNavigationTestIds()\" data-test-id=\"matStartDatePickerAppointment\"></mat-datepicker>\r\n                      <mat-datepicker-toggle matSuffix [for]=\"startDatePicker\" class=\"datepicker-icon\" data-test-id=\"dpStartDate\">\r\n                        <img matDatepickerToggleIcon src=\"assets/svgs/calendar-date.svg\" alt=\"\" data-test-id=\"imgStartDatePickerIconAppointment\">\r\n                      </mat-datepicker-toggle>\r\n                    </div>\r\n                    <span *ngIf=\"startDateErrorMessage\" class=\"error-message\" data-test-id=\"spanStartDateErrorMessageAppointment\">{{ startDateErrorMessage }}</span>\r\n                  </div>\r\n                </div>\r\n                <div class=\"form-date\" data-test-id=\"divFormEndDateAppointment\">\r\n                  <div class=\"input-date\" data-test-id=\"divInputEndDateAppointment\">\r\n                    <label class=\"label-text\" data-test-id=\"lblEndDateAppointment\">{{ 'End date' | translate }}</label>\r\n                    <div class=\"input-wrapper\" data-test-id=\"divInputWrapperEndDateAppointment\">\r\n                      <input\r\n                        type=\"text\"\r\n                        class=\"form-control\"\r\n                        [class.error-border]=\"endDateErrorMessage\"\r\n                        [min]=\"filteredDateAndRangeForm.value.startDate\"\r\n                        [max]=\"maxDate\"\r\n                        formControlName=\"endDate\"\r\n                        [matDatepicker]=\"endDatePicker\"\r\n                        [placeholder]=\"filteredDateAndRangeForm.get('endDate')?.value ? (filteredDateAndRangeForm.get('endDate')?.value | date: 'dd/MM/yyyy') : ('Select end date'|translate)\"\r\n                        readonly\r\n                        data-test-id=\"etSelEndDate\">\r\n                      <mat-datepicker #endDatePicker (opened)=\"addCalendarNavigationTestIds()\" data-test-id=\"matEndDatePickerAppointment\"></mat-datepicker>\r\n                      <mat-datepicker-toggle matSuffix [for]=\"endDatePicker\" class=\"datepicker-icon\" data-test-id=\"dpEndDate\">\r\n                        <img matDatepickerToggleIcon src=\"assets/svgs/calendar-date.svg\" alt=\"\" data-test-id=\"imgEndDatePickerIconAppointment\">\r\n                      </mat-datepicker-toggle>\r\n                    </div>\r\n                    <span *ngIf=\"endDateErrorMessage\" class=\"error-message\" data-test-id=\"spanEndDateErrorMessageAppointment\">{{ endDateErrorMessage }}</span>\r\n                  </div>\r\n                </div>\r\n              </form>\r\n            </div>\r\n\r\n            <div class=\"action-buttons\" data-test-id=\"divFilterActionBtnsAppointment\">\r\n              <button mat-button class=\"reset-btn\" (click)=\"resetDate(true); $event.stopPropagation();\" data-test-id=\"btnResetFilterAppointment\">{{ 'Reset'| translate }}</button>\r\n              <button mat-button class=\"apply-btn\" (click)=\"applyDateOrRangeFilter(pluginConfigObs.filterObs.filterDateField); $event.stopPropagation();\" data-test-id=\"btnApplyFilterAppointment\">{{ 'Apply'| translate }}</button>\r\n            </div>\r\n          </mat-menu>\r\n\r\n          <!-- Search -->\r\n          <div class=\"input-group search-bar ml-auto\" (click)=\"$event.stopPropagation();\" data-test-id=\"divSearchAppointment\">\r\n            <input\r\n              type=\"text\"\r\n              #searchInput\r\n              class=\"form-control\"\r\n              placeholder=\"{{ pluginConfigObs.searchPlaceHolder | translate }}\"\r\n              (keyup)=\"applyFilter($event)\"\r\n              (keydown.Space)=\"$event.stopPropagation()\"\r\n              (keydown.Enter)=\"$event.stopPropagation()\"\r\n              [attr.data-test-id]=\"'etSearch_'+pluginConfigObs.tableHeader\"\r\n              >\r\n            <div class=\"input-group-append\">\r\n              <button\r\n                class=\"btnResetApSerach mat-icon-button\"\r\n                aria-label=\"Reset appointment search\"\r\n                (click)=\"clearFilter(); $event.stopPropagation();\"\r\n                *ngIf=\"isFilterApplied\"\r\n                data-test-id=\"btnResetSearchAppointment\">\r\n                <mat-icon class=\"ml-0\">close</mat-icon>\r\n              </button>\r\n              <span class=\"input-group-text search-icon-span\" data-test-id=\"icoSearchAppointment\">\r\n                <img src=\"assets/svgs/search-icon.svg\" alt=\"\" width=\"20px\" height=\"20px\" data-test-id=\"imgSearchIconAppointment\">\r\n              </span>\r\n            </div>\r\n          </div>\r\n        </div>\r\n      </div>\r\n    </mat-panel-title>\r\n  </mat-expansion-panel-header>\r\n\r\n  <div class=\"mat-elevation-z8\" data-test-id=\"divTableWrapperAppointment\">\r\n    <span *ngIf=\"tableLoader\">\r\n      <ngx-ui-loader \r\n        [loaderId]=\"'table-loader-' + pluginConfigObs.pluginConfigObsFlag\" \r\n        [fgsType]=\"'ball-spin-clockwise'\" \r\n        [fgsColor]=\"'#aba4a4'\" \r\n        [fgsPosition]=\"'center-center'\" \r\n        [fgsSize]=\"50\" \r\n        [overlayColor]=\"'rgb(255, 255, 255)'\" \r\n        [hasProgressBar]=\"false\"\r\n        [text]=\"('Loading'|translate) + ' ' + (pluginConfigObs.pluginConfigObsFlag|translate) + ' ' + ('data'|translate) + '...'\"\r\n        [textColor]=\"'#333'\"\r\n        [textPosition]=\"'center-center'\"\r\n        data-test-id=\"loaderAppointment\"\r\n      ></ngx-ui-loader>\r\n    </span>\r\n    <div class=\"table-container\" id=\"table-container-{{componentId}}\">\r\n      <table mat-table [dataSource]=\"paginatedDataSource\">\r\n\r\n      <ng-container *ngFor=\"let column of displayedAppointmentColumns\" [matColumnDef]=\"column.key\">\r\n        <ng-container *ngIf=\"column.isSortable; else noSort\">\r\n          <th mat-header-cell *matHeaderCellDef (click)=\"handleSort(column.key, 'asc')\" [attr.data-test-id]=\"'th-' + column.key + '-' + pluginConfigObs.pluginConfigObsFlag\" class=\"sortable-header\">\r\n            {{ column.label | translate }}\r\n            <mat-icon class=\"sort-icon\">arrow_upward</mat-icon>\r\n          </th>\r\n        </ng-container>\r\n        <ng-template #noSort>\r\n          <th mat-header-cell *matHeaderCellDef  [attr.data-test-id]=\"'th-' + column.key+ '-' + pluginConfigObs.pluginConfigObsFlag\">\r\n            {{ column.label | translate }}\r\n          </th>\r\n        </ng-template>\r\n\r\n        <td mat-cell *matCellDef=\"let element; let j = index;\"  [attr.data-test-id]=\"'td-' + column.key + '-' + pluginConfigObs.pluginConfigObsFlag + '-' + j\">\r\n          <ng-container *ngIf=\"column.key !== 'patient_name' && column.key !== 'visit_completed'\">\r\n            <div class=\"float-left\" \r\n                [innerHTML]=\"renderHtmlContent(column, element)\" \r\n                [ngClass]=\"getClasses(column, element)\">\r\n            </div>\r\n          </ng-container>\r\n          \r\n          <!-- This is for visit_completed column -->\r\n          <ng-container *ngIf=\"column.key === 'visit_completed'\">\r\n            <div class=\"d-flex align-items-center visit-completed-cell\"   [attr.data-test-id]=\"'td-visit_completed-' + pluginConfigObs.pluginConfigObsFlag + '-' + j\">\r\n              <img src=\"assets/svgs/green-pad.svg\" alt=\"Completed\" class=\"mr-2\" />\r\n              <span class=\"text-success\">\r\n                {{ element.completed }}\r\n              </span>\r\n            </div>\r\n          </ng-container>\r\n\r\n          <!-- Patient Name Column -->\r\n          <ng-container *ngIf=\"column.key === 'patient_name'\">\r\n            <div class=\"d-flex align-items-center\"   [attr.data-test-id]=\"'td-patient_name-' + pluginConfigObs.pluginConfigObsFlag + '-' + j\">\r\n              <img *ngIf=\"element.patientId\" src=\"{{ checkPatientRegField('Profile Photo') ? baseURL + '/personimage/' + element.patientId : '' }}\" alt=\"\" width=\"32px\" height=\"32px\" style=\"border-radius: 50%;\">\r\n              <img *ngIf=\"pluginConfigObs.pluginConfigObsFlag !== 'Appointment'\" src=\"{{ checkPatientRegField('Profile Photo') ? baseURL + '/personimage/' + element.person.uuid : '' }}\" alt=\"\" width=\"32px\" height=\"32px\" style=\"border-radius: 50%;\"  [attr.data-test-id]=\"'td-patient_img-' + pluginConfigObs.pluginConfigObsFlag + '-' + j\">\r\n\r\n              <div class=\"float-left\" \r\n                [innerHTML]=\"renderHtmlContent(column, element)\" \r\n                [ngClass]=\"getClasses(column, element)\">\r\n              </div>\r\n            </div>\r\n          </ng-container>\r\n\r\n          <!-- Telephone Column -->\r\n          <ng-container *ngIf=\"column.key === 'telephone' && element.telephone\">\r\n            <a (click)=\"openWhatsApp($event, element.telephone)\" class=\"float-left icon-btn m-0\" [attr.data-test-id]=\"'linkPatientWhatsApp' + j\">\r\n              <img src=\"assets/svgs/whatsapp-green.svg\" alt=\"WhatsApp\" />\r\n            </a>\r\n          </ng-container>\r\n\r\n          <!-- Actions Column -->\r\n          <ng-container *ngIf=\"column.key === 'actions'\">\r\n            <div class=\"actions-btn-wrap d-flex align-items-center\">\r\n              <button\r\n                *ngFor=\"let action of column.actionButtons; let k = index\"\r\n                [ngStyle]=\"{\r\n                  color: action.style?.color,\r\n                  backgroundColor: action.style?.backgroundColor\r\n                }\"\r\n                class=\"action-btn mr-2\"\r\n                type=\"button\"\r\n                (click)=\"$event.stopPropagation(); handleAction(action, element)\"\r\n                  [attr.data-test-id]=\"'btn-action-' + action.label+'-'+ k\" >\r\n                {{ action.label | translate }}\r\n              </button>\r\n            </div>\r\n          </ng-container>\r\n        </td>\r\n      </ng-container>\r\n    \r\n\r\n      <!-- No Data Row -->\r\n      <tr class=\"mat-row\" *matNoDataRow>\r\n        <td class=\"mat-cell text-center\" [attr.colspan]=\"displayedColumns.length\">\r\n          {{ pluginConfigObs.noRecordFound | translate }}\r\n        </td>\r\n      </tr>\r\n\r\n      <!-- Row Definitions -->\r\n      <tr mat-header-row *matHeaderRowDef=\"displayedColumns\"></tr>\r\n      <tr mat-row *matRowDef=\"let row; let x = index; columns: displayedColumns;\" [attr.data-test-id]=\"'tr' + x\" [routerLink]=\"['/dashboard/visit-summary', row.uuid]\"></tr>\r\n      \r\n      </table>\r\n    </div>\r\n    <mat-paginator \r\n      *ngIf=\"pluginConfigObs?.pluginConfigObsFlag === 'Appointment'\"\r\n      #tempPaginator \r\n      hidePageSize \r\n      [pageSizeOptions]=\"pageSizeOptions\"\r\n      [length]=\"getCurrentTotalCount()\" \r\n      [pageIndex]=\"currentPage\" \r\n      [pageSize]=\"itemsPerPage\"\r\n      [disabled]=\"isPaginationDisabled()\"\r\n      aria-label=\"Select page of periodic elements\">\r\n    </mat-paginator>\r\n    <mat-paginator \r\n      #tempPaginator \r\n      *ngIf=\"pluginConfigObs?.pluginConfigObsFlag !== 'Appointment'\"\r\n      hidePageSize \r\n      [pageSizeOptions]=\"pageSizeOptions\"\r\n      [length]=\"getCurrentTotalCount()\" \r\n      [pageIndex]=\"currentPage\" \r\n      [pageSize]=\"itemsPerPage\" \r\n      [disabled]=\"isPaginationDisabled()\"\r\n      (page)=\"pageEvent = getData($event)\"  \r\n      aria-label=\"Select page of periodic elements\"\r\n      >\r\n    </mat-paginator>\r\n  </div>\r\n</mat-expansion-panel>", styles: [".mat-elevation-z8{box-shadow:none;width:100%;overflow-x:auto}.table-container{max-height:440px;overflow-y:auto;overflow-x:auto}table{width:100%;font-family:DM Sans}th.mat-header-cell{border:none;font-size:14px!important;font-weight:700;color:var(--color-gray);height:21px}th.mat-header-cell,td.mat-cell,td.mat-footer-cell{border:none;min-width:60px;white-space:nowrap;padding-right:24px}th.mat-header-cell span.alert-danger,td.mat-cell span.alert-danger,td.mat-footer-cell span.alert-danger{color:var(--color-red);font-weight:700;background:transparent;border:none}th.mat-header-cell span.alert-success,td.mat-cell span.alert-success,td.mat-footer-cell span.alert-success{color:var(--color-green);font-weight:700;background:transparent;border:none}td.mat-cell{font-size:16px}tr.mat-row,tr.mat-footer-row{height:88px;border-radius:8px;cursor:pointer}tr.mat-row.upcoming{background:#e6fff3!important}tr.mat-row:nth-child(odd){background:#f7f7fa}td:first-child,th:first-child{border-radius:8px 0 0 8px}td:last-child,th:last-child{border-radius:0 8px 8px 0}.actions-btn-wrap .action-btn{outline:none;border:none;height:36px;min-width:102px;padding:6px 8px;background:#fff;border-radius:4px;color:var(--color-black);font-family:DM Sans;font-size:16px}.actions-btn-wrap .blue-btn{background:var(--color-lightGray);color:var(--color-darkBlue)}.actions-btn-wrap .pink-btn{background:var(--color-lightPink);color:var(--color-red)}.mat-expansion-panel .mat-expansion-panel-header.mat-expanded .input-group{display:flex}.input-group{background:var(--color-white);border:1px solid rgba(127,123,146,.5);border-radius:6px;height:46px;align-items:center;max-width:60vw;width:300px;display:none}.input-group .input-group-text{background:none;border:none;cursor:default}.input-group .form-control{border:none;outline:none;background:transparent;font-size:16px;line-height:150%;padding-left:16px}.input-group .form-control:focus{box-shadow:none}.mat-expansion-panel{background:#fff;box-shadow:0 4px 24px #1f1c3a14;border-radius:20px!important;padding:24px;margin-bottom:24px}.mat-expansion-panel .mat-expansion-panel-header{padding:0}.mat-expansion-panel .mat-expansion-panel-header .mat-content{align-items:center}.mat-expansion-panel .mat-expansion-panel-header.mat-expanded{height:48px}.mat-expansion-panel .mat-expansion-panel-header:hover{background:transparent!important}.mat-expansion-panel .intel-accordion-title{display:flex;flex-direction:row;align-items:center;justify-content:flex-start;flex-wrap:wrap;width:100%}.mat-expansion-panel .intel-accordion-title .mat-icon{height:20px;width:20px;font-size:20px;color:#461d90;margin-left:8px}.mat-expansion-panel .intel-accordion-title h6{font-size:18px;font-weight:700;color:#000}.mat-expansion-panel .mat-expansion-panel-content .mat-expansion-panel-body{padding:0;margin-top:24px;position:relative}.mat-expansion-panel .mat-expansion-panel-content .mat-expansion-panel-body:after{content:\"\";position:absolute;top:0;height:1px;left:0;right:0;background:#efe8ff}.anchor-con{position:absolute;top:-120px;left:0}.visit-completed-cell{color:green!important;background-color:#d4edda!important}@media (max-width: 768px){.input-group{width:100%;max-width:100%;margin:10px 0}.mat-expansion-panel .mat-expansion-panel-header,.mat-expansion-panel .mat-expansion-panel-header.mat-expanded{height:fit-content}.info-icon{display:none}.anchor-con{top:-100px}}.matIconButton{border:none;background:transparent}::ng-deep .custom-menu{background:var(--color-white);border-radius:8px!important;padding:16px;width:352px;box-shadow:0 4px 8px #7f7b9229}.mat-expansion-panel.mat-expanded .mat-expansion-panel-header .filter-btn{display:flex!important}.btnResetApSerach{border:none;background:transparent;cursor:pointer;padding:0;margin-right:4px;display:flex;align-items:center;justify-content:center}.btnResetApSerach .mat-icon{font-size:18px;width:18px;height:18px;color:#7f7b92}.btnResetApSerach:hover .mat-icon{color:#2e1e91}.search-icon-span{pointer-events:none}.filter-btn{background:none;align-items:center;border:1px solid rgba(127,123,146,.5);border-radius:6px;color:#2e1e91;font-weight:500;padding:4px 12px;white-space:nowrap;height:46px;display:none;gap:4px}.toggle-buttons{display:flex;justify-content:space-between;margin-bottom:16px;gap:16px}button.mat-button,.action-buttons button.mat-button{flex:1;color:#2e1e91;background:#fff;border-radius:8px;font-family:DM Sans;font-size:14px;font-weight:500;border:1.33px solid #EFE8FF}.action-buttons button.mat-button.reset-btn{font-size:12px;font-weight:700;margin:0 0 0 20px;width:96px}.action-buttons button.mat-button.apply-btn{color:#fff;background:var(--color-darkBlue);font-size:12px;font-weight:700;width:96px}button.mat-button.active{background:#efe8ff;color:#2e1e91}button.mat-button .reset-btn{color:var(--color-darkBlue)}.action-buttons{display:flex;justify-content:space-between;gap:16px}.reset-btn{color:var(--color-darkBlue);background:#f5f5f5;border-radius:8px}.filter-search-container{display:flex;align-items:center;gap:1rem}.form-date{margin-bottom:16px}.input-wrapper{position:relative;display:flex;align-items:center}.input-wrapper .form-control{width:100%;padding-right:40px;border:1px solid rgba(178,175,190,.2);background:transparent;border-radius:8px;height:48px;font-size:16px;color:var(--color-darkestBlue)}.datepicker-icon{position:absolute;right:4px;top:50%;transform:translateY(-50%);cursor:pointer;background:transparent;border:none}.form-control:focus{box-shadow:none}.label-text{font-size:14px;margin-bottom:8px;color:#7f7b92}.userImage{width:32px;height:32px;border-radius:50%}.red-pill{display:flex;flex-direction:row;align-items:center;background:#ffe8e8;border-radius:4px;height:32px;color:#ea315b;padding:4px 6px;width:fit-content}.left{text-align:left}.chip{display:flex;flex-direction:row;align-items:center;border-radius:4px;height:32px;padding:4px 6px;width:fit-content}.chip.green{color:#0fd197}.chip.blue{color:#2e1e91}.chip-item-blue{background:var(--color-lightGray)}.chip-item-green{background:#e6fff3}.error-message{color:#ea315b;font-size:12px;margin-top:4px;display:block;font-family:DM Sans}.error-border{border-color:#ea315b!important}\n"], dependencies: [{ kind: "directive", type: i11.RouterLink, selector: ":not(a):not(area)[routerLink]", inputs: ["queryParams", "fragment", "queryParamsHandling", "state", "relativeTo", "preserveFragment", "skipLocationChange", "replaceUrl", "routerLink"] }, { kind: "directive", type: i12.NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }, { kind: "directive", type: i12.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { kind: "directive", type: i12.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "directive", type: i12.NgStyle, selector: "[ngStyle]", inputs: ["ngStyle"] }, { kind: "component", type: i13.MatPaginator, selector: "mat-paginator", inputs: ["disabled"], exportAs: ["matPaginator"] }, { kind: "directive", type: i14.MatTooltip, selector: "[matTooltip]", exportAs: ["matTooltip"] }, { kind: "directive", type: i5.MatSuffix, selector: "[matSuffix]" }, { kind: "component", type: i16.MatExpansionPanel, selector: "mat-expansion-panel", inputs: ["disabled", "expanded", "hideToggle", "togglePosition"], outputs: ["opened", "closed", "expandedChange", "afterExpand", "afterCollapse"], exportAs: ["matExpansionPanel"] }, { kind: "component", type: i16.MatExpansionPanelHeader, selector: "mat-expansion-panel-header", inputs: ["tabIndex", "expandedHeight", "collapsedHeight"] }, { kind: "directive", type: i16.MatExpansionPanelTitle, selector: "mat-panel-title" }, { kind: "component", type: i17.MatMenu, selector: "mat-menu", exportAs: ["matMenu"] }, { kind: "directive", type: i17.MatMenuTrigger, selector: "[mat-menu-trigger-for], [matMenuTriggerFor]", exportAs: ["matMenuTrigger"] }, { kind: "component", type: i18.MatTable, selector: "mat-table, table[mat-table]", exportAs: ["matTable"] }, { kind: "directive", type: i18.MatHeaderCellDef, selector: "[matHeaderCellDef]" }, { kind: "directive", type: i18.MatHeaderRowDef, selector: "[matHeaderRowDef]", inputs: ["matHeaderRowDef", "matHeaderRowDefSticky"] }, { kind: "directive", type: i18.MatColumnDef, selector: "[matColumnDef]", inputs: ["sticky", "matColumnDef"] }, { kind: "directive", type: i18.MatCellDef, selector: "[matCellDef]" }, { kind: "directive", type: i18.MatRowDef, selector: "[matRowDef]", inputs: ["matRowDefColumns", "matRowDefWhen"] }, { kind: "directive", type: i18.MatHeaderCell, selector: "mat-header-cell, th[mat-header-cell]" }, { kind: "directive", type: i18.MatCell, selector: "mat-cell, td[mat-cell]" }, { kind: "component", type: i18.MatHeaderRow, selector: "mat-header-row, tr[mat-header-row]", exportAs: ["matHeaderRow"] }, { kind: "component", type: i18.MatRow, selector: "mat-row, tr[mat-row]", exportAs: ["matRow"] }, { kind: "directive", type: i18.MatNoDataRow, selector: "ng-template[matNoDataRow]" }, { kind: "component", type: i19.MatIcon, selector: "mat-icon", inputs: ["color", "inline", "svgIcon", "fontSet", "fontIcon"], exportAs: ["matIcon"] }, { kind: "component", type: i8.MatDatepicker, selector: "mat-datepicker", exportAs: ["matDatepicker"] }, { kind: "directive", type: i8.MatDatepickerInput, selector: "input[matDatepicker]", inputs: ["matDatepicker", "min", "max", "matDatepickerFilter"], exportAs: ["matDatepickerInput"] }, { kind: "component", type: i8.MatDatepickerToggle, selector: "mat-datepicker-toggle", inputs: ["for", "tabIndex", "aria-label", "disabled", "disableRipple"], exportAs: ["matDatepickerToggle"] }, { kind: "directive", type: i8.MatDatepickerToggleIcon, selector: "[matDatepickerToggleIcon]" }, { kind: "directive", type: i21.ɵNgNoValidate, selector: "form:not([ngNoForm]):not([ngNativeValidate])" }, { kind: "directive", type: i21.DefaultValueAccessor, selector: "input:not([type=checkbox])[formControlName],textarea[formControlName],input:not([type=checkbox])[formControl],textarea[formControl],input:not([type=checkbox])[ngModel],textarea[ngModel],[ngDefaultControl]" }, { kind: "directive", type: i21.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { kind: "directive", type: i21.NgControlStatusGroup, selector: "[formGroupName],[formArrayName],[ngModelGroup],[formGroup],form:not([ngNoForm]),[ngForm]" }, { kind: "directive", type: i21.FormGroupDirective, selector: "[formGroup]", inputs: ["formGroup"], outputs: ["ngSubmit"], exportAs: ["ngForm"] }, { kind: "directive", type: i21.FormControlName, selector: "[formControlName]", inputs: ["formControlName", "disabled", "ngModel"], outputs: ["ngModelChange"] }, { kind: "component", type: i10.NgxUiLoaderComponent, selector: "ngx-ui-loader", inputs: ["bgsColor", "bgsOpacity", "bgsPosition", "bgsSize", "bgsTemplate", "bgsType", "fgsColor", "fgsPosition", "fgsSize", "fgsTemplate", "fgsType", "gap", "loaderId", "logoPosition", "logoSize", "logoUrl", "overlayBorderRadius", "overlayColor", "pbColor", "pbDirection", "pbThickness", "hasProgressBar", "text", "textColor", "textPosition"] }, { kind: "directive", type: DefaultImageDirective, selector: "img[src]", inputs: ["src"] }, { kind: "pipe", type: i12.DatePipe, name: "date" }, { kind: "pipe", type: i4.TranslatePipe, name: "translate" }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.3.0", ngImport: i0, type: TableGridComponent, decorators: [{
            type: Component,
            args: [{ selector: 'lib-table-grid', changeDetection: ChangeDetectionStrategy.OnPush, template: "<mat-expansion-panel [expanded]=\"true\" data-test-id=\"matExpAppointment\">\r\n  <mat-expansion-panel-header data-test-id=\"matExpHeaderAppointment\">\r\n    <mat-panel-title data-test-id=\"matPanelTitleAppointment\">\r\n      <div id=\"{{pluginConfigObs.anchorId}}\" class=\"anchor-con\" data-test-id=\"divAnchorAppointment\"></div>\r\n      <div class=\"intel-accordion-title\" data-test-id=\"divAccordionTitleAppointment\">\r\n        <img src=\"{{ pluginConfigObs.tableHeaderIcon }}\" alt=\"\" width=\"44px\" data-test-id=\"imgTableHeaderIconAppointment\">\r\n        <h6 class=\"mb-0 ml-2\" [attr.data-test-id]=\"pluginConfigObs.tableHeader\"> \r\n          {{ pluginConfigObs.tableHeader | translate }} ({{ getCurrentTotalCount() }})\r\n        </h6>   \r\n        <mat-icon \r\n          aria-hidden=\"false\" \r\n          aria-label=\"help icon\" \r\n          matTooltip=\"{{ (pluginConfigObs.tooltipLabel | translate) }}\" \r\n          matTooltipPosition=\"right\" \r\n          data-test-id=\"icoHelpAppointment\">\r\n          help_outline\r\n        </mat-icon>\r\n\r\n        <!-- Filter button -->\r\n        <div class=\"ml-auto filter-search-container\" data-test-id=\"divFilterContainerAppointment\">\r\n          <button \r\n            *ngIf=\"pluginConfigObs.filterObs.filterFlag\" \r\n            class=\"mat-stroked-button filter-btn\" \r\n            [matMenuTriggerFor]=\"filterMenu\" \r\n            (click)=\"$event.stopPropagation();\" \r\n            data-test-id=\"btnFilterAppointment\">\r\n            <img src=\"{{pluginConfigObs.filterObs.filterIcon}}\" alt=\"\" data-test-id=\"imgFilterIconAppointment\"> \r\n            shaheen{{( pluginConfigObs.filterObs.filterLabel| translate)}}\r\n          </button>\r\n\r\n          <!-- Filter Menu -->\r\n          <mat-menu #filterMenu=\"matMenu\" class=\"custom-menu\" [hasBackdrop]=\"true\" xPosition=\"before\" data-test-id=\"menuFilterAppointment\">\r\n            <div class=\"toggle-buttons\" data-test-id=\"divToggleButtonsAppointment\">\r\n              <button \r\n                mat-button \r\n                [class.active]=\"mode === 'date'\" \r\n                (click)=\"setMode('date'); $event.stopPropagation(); resetDate(true)\" \r\n                data-test-id=\"btnDateModeAppointment\">\r\n                {{'Date' | translate}}\r\n              </button>\r\n              <button \r\n                mat-button \r\n                [class.active]=\"mode === 'range'\" \r\n                (click)=\"setMode('range'); $event.stopPropagation(); resetDate(true)\" \r\n                data-test-id=\"btnRangeModeAppointment\">\r\n                {{'Range' | translate}}\r\n              </button>\r\n            </div>\r\n\r\n            <!-- Date Mode -->\r\n            <div *ngIf=\"mode === 'date'\" class=\"date-view\" (click)=\"$event.stopPropagation()\" data-test-id=\"divDateModeAppointment\">\r\n              <form [formGroup]=\"filteredDateAndRangeForm\" data-test-id=\"formDateFilterAppointment\">\r\n                <div class=\"form-date\" data-test-id=\"divFormDateAppointment\">\r\n                  <div class=\"input-date\" data-test-id=\"divInputDateAppointment\">\r\n                    <label class=\"label-text\" data-test-id=\"lblSelectDateAppointment\">{{ 'Select date' | translate}}</label>\r\n                    <div class=\"input-wrapper\" data-test-id=\"divInputWrapperDateAppointment\">\r\n                      <input\r\n                        type=\"text\"\r\n                        class=\"form-control\"\r\n                        [class.error-border]=\"dateErrorMessage\"\r\n                        [max]=\"maxDate\"\r\n                        formControlName=\"date\"\r\n                        [matDatepicker]=\"datePicker\"\r\n                        [placeholder]=\"filteredDateAndRangeForm.get('date')?.value ? (filteredDateAndRangeForm.get('date')?.value | date: 'dd/MM/yyyy') : ('Select date' | translate)\"\r\n                        aria-label=\"Date\"\r\n                        readonly\r\n                        data-test-id=\"etDate\"/>\r\n                      <mat-datepicker #datePicker (opened)=\"addCalendarNavigationTestIds()\" data-test-id=\"matDatePickerAppointment\"></mat-datepicker>\r\n                      <mat-datepicker-toggle\r\n                        matSuffix\r\n                        [for]=\"datePicker\"\r\n                        data-test-id=\"dpDate\"\r\n                        class=\"datepicker-icon\">\r\n                        <img matDatepickerToggleIcon src=\"assets/svgs/calendar-date.svg\" alt=\"\" data-test-id=\"imgDatePickerIconAppointment\">\r\n                      </mat-datepicker-toggle>\r\n                    </div>\r\n                    <span *ngIf=\"dateErrorMessage\" class=\"error-message\" data-test-id=\"spanDateErrorMessageAppointment\">{{ dateErrorMessage }}</span>\r\n                  </div>\r\n                </div>\r\n              </form>\r\n            </div>\r\n\r\n            <!-- Range Mode -->\r\n            <div *ngIf=\"mode === 'range'\" class=\"range-view\" (click)=\" $event.stopPropagation()\" data-test-id=\"divRangeModeAppointment\">\r\n              <form [formGroup]=\"filteredDateAndRangeForm\" data-test-id=\"formRangeFilterAppointment\">\r\n                <div class=\"form-date\" data-test-id=\"divFormStartDateAppointment\">\r\n                  <div class=\"input-date\" data-test-id=\"divInputStartDateAppointment\">\r\n                    <label class=\"label-text\" data-test-id=\"lblStartDateAppointment\">{{ 'Start date' | translate }}</label>\r\n                    <div class=\"input-wrapper\" data-test-id=\"divInputWrapperStartDateAppointment\">\r\n                      <input\r\n                        type=\"text\"\r\n                        class=\"form-control\"\r\n                        [class.error-border]=\"startDateErrorMessage\"\r\n                        [max]=\"filteredDateAndRangeForm.value.endDate ? filteredDateAndRangeForm.value.endDate : maxDate\"\r\n                        formControlName=\"startDate\"\r\n                        [matDatepicker]=\"startDatePicker\"\r\n                        [placeholder]=\"filteredDateAndRangeForm.get('startDate')?.value ? (filteredDateAndRangeForm.get('startDate')?.value | date: 'dd/MM/yyyy') : ('Select start date'|translate)\"\r\n                        readonly\r\n                        data-test-id=\"etSelStartDate\">\r\n                      <mat-datepicker #startDatePicker (opened)=\"addCalendarNavigationTestIds()\" data-test-id=\"matStartDatePickerAppointment\"></mat-datepicker>\r\n                      <mat-datepicker-toggle matSuffix [for]=\"startDatePicker\" class=\"datepicker-icon\" data-test-id=\"dpStartDate\">\r\n                        <img matDatepickerToggleIcon src=\"assets/svgs/calendar-date.svg\" alt=\"\" data-test-id=\"imgStartDatePickerIconAppointment\">\r\n                      </mat-datepicker-toggle>\r\n                    </div>\r\n                    <span *ngIf=\"startDateErrorMessage\" class=\"error-message\" data-test-id=\"spanStartDateErrorMessageAppointment\">{{ startDateErrorMessage }}</span>\r\n                  </div>\r\n                </div>\r\n                <div class=\"form-date\" data-test-id=\"divFormEndDateAppointment\">\r\n                  <div class=\"input-date\" data-test-id=\"divInputEndDateAppointment\">\r\n                    <label class=\"label-text\" data-test-id=\"lblEndDateAppointment\">{{ 'End date' | translate }}</label>\r\n                    <div class=\"input-wrapper\" data-test-id=\"divInputWrapperEndDateAppointment\">\r\n                      <input\r\n                        type=\"text\"\r\n                        class=\"form-control\"\r\n                        [class.error-border]=\"endDateErrorMessage\"\r\n                        [min]=\"filteredDateAndRangeForm.value.startDate\"\r\n                        [max]=\"maxDate\"\r\n                        formControlName=\"endDate\"\r\n                        [matDatepicker]=\"endDatePicker\"\r\n                        [placeholder]=\"filteredDateAndRangeForm.get('endDate')?.value ? (filteredDateAndRangeForm.get('endDate')?.value | date: 'dd/MM/yyyy') : ('Select end date'|translate)\"\r\n                        readonly\r\n                        data-test-id=\"etSelEndDate\">\r\n                      <mat-datepicker #endDatePicker (opened)=\"addCalendarNavigationTestIds()\" data-test-id=\"matEndDatePickerAppointment\"></mat-datepicker>\r\n                      <mat-datepicker-toggle matSuffix [for]=\"endDatePicker\" class=\"datepicker-icon\" data-test-id=\"dpEndDate\">\r\n                        <img matDatepickerToggleIcon src=\"assets/svgs/calendar-date.svg\" alt=\"\" data-test-id=\"imgEndDatePickerIconAppointment\">\r\n                      </mat-datepicker-toggle>\r\n                    </div>\r\n                    <span *ngIf=\"endDateErrorMessage\" class=\"error-message\" data-test-id=\"spanEndDateErrorMessageAppointment\">{{ endDateErrorMessage }}</span>\r\n                  </div>\r\n                </div>\r\n              </form>\r\n            </div>\r\n\r\n            <div class=\"action-buttons\" data-test-id=\"divFilterActionBtnsAppointment\">\r\n              <button mat-button class=\"reset-btn\" (click)=\"resetDate(true); $event.stopPropagation();\" data-test-id=\"btnResetFilterAppointment\">{{ 'Reset'| translate }}</button>\r\n              <button mat-button class=\"apply-btn\" (click)=\"applyDateOrRangeFilter(pluginConfigObs.filterObs.filterDateField); $event.stopPropagation();\" data-test-id=\"btnApplyFilterAppointment\">{{ 'Apply'| translate }}</button>\r\n            </div>\r\n          </mat-menu>\r\n\r\n          <!-- Search -->\r\n          <div class=\"input-group search-bar ml-auto\" (click)=\"$event.stopPropagation();\" data-test-id=\"divSearchAppointment\">\r\n            <input\r\n              type=\"text\"\r\n              #searchInput\r\n              class=\"form-control\"\r\n              placeholder=\"{{ pluginConfigObs.searchPlaceHolder | translate }}\"\r\n              (keyup)=\"applyFilter($event)\"\r\n              (keydown.Space)=\"$event.stopPropagation()\"\r\n              (keydown.Enter)=\"$event.stopPropagation()\"\r\n              [attr.data-test-id]=\"'etSearch_'+pluginConfigObs.tableHeader\"\r\n              >\r\n            <div class=\"input-group-append\">\r\n              <button\r\n                class=\"btnResetApSerach mat-icon-button\"\r\n                aria-label=\"Reset appointment search\"\r\n                (click)=\"clearFilter(); $event.stopPropagation();\"\r\n                *ngIf=\"isFilterApplied\"\r\n                data-test-id=\"btnResetSearchAppointment\">\r\n                <mat-icon class=\"ml-0\">close</mat-icon>\r\n              </button>\r\n              <span class=\"input-group-text search-icon-span\" data-test-id=\"icoSearchAppointment\">\r\n                <img src=\"assets/svgs/search-icon.svg\" alt=\"\" width=\"20px\" height=\"20px\" data-test-id=\"imgSearchIconAppointment\">\r\n              </span>\r\n            </div>\r\n          </div>\r\n        </div>\r\n      </div>\r\n    </mat-panel-title>\r\n  </mat-expansion-panel-header>\r\n\r\n  <div class=\"mat-elevation-z8\" data-test-id=\"divTableWrapperAppointment\">\r\n    <span *ngIf=\"tableLoader\">\r\n      <ngx-ui-loader \r\n        [loaderId]=\"'table-loader-' + pluginConfigObs.pluginConfigObsFlag\" \r\n        [fgsType]=\"'ball-spin-clockwise'\" \r\n        [fgsColor]=\"'#aba4a4'\" \r\n        [fgsPosition]=\"'center-center'\" \r\n        [fgsSize]=\"50\" \r\n        [overlayColor]=\"'rgb(255, 255, 255)'\" \r\n        [hasProgressBar]=\"false\"\r\n        [text]=\"('Loading'|translate) + ' ' + (pluginConfigObs.pluginConfigObsFlag|translate) + ' ' + ('data'|translate) + '...'\"\r\n        [textColor]=\"'#333'\"\r\n        [textPosition]=\"'center-center'\"\r\n        data-test-id=\"loaderAppointment\"\r\n      ></ngx-ui-loader>\r\n    </span>\r\n    <div class=\"table-container\" id=\"table-container-{{componentId}}\">\r\n      <table mat-table [dataSource]=\"paginatedDataSource\">\r\n\r\n      <ng-container *ngFor=\"let column of displayedAppointmentColumns\" [matColumnDef]=\"column.key\">\r\n        <ng-container *ngIf=\"column.isSortable; else noSort\">\r\n          <th mat-header-cell *matHeaderCellDef (click)=\"handleSort(column.key, 'asc')\" [attr.data-test-id]=\"'th-' + column.key + '-' + pluginConfigObs.pluginConfigObsFlag\" class=\"sortable-header\">\r\n            {{ column.label | translate }}\r\n            <mat-icon class=\"sort-icon\">arrow_upward</mat-icon>\r\n          </th>\r\n        </ng-container>\r\n        <ng-template #noSort>\r\n          <th mat-header-cell *matHeaderCellDef  [attr.data-test-id]=\"'th-' + column.key+ '-' + pluginConfigObs.pluginConfigObsFlag\">\r\n            {{ column.label | translate }}\r\n          </th>\r\n        </ng-template>\r\n\r\n        <td mat-cell *matCellDef=\"let element; let j = index;\"  [attr.data-test-id]=\"'td-' + column.key + '-' + pluginConfigObs.pluginConfigObsFlag + '-' + j\">\r\n          <ng-container *ngIf=\"column.key !== 'patient_name' && column.key !== 'visit_completed'\">\r\n            <div class=\"float-left\" \r\n                [innerHTML]=\"renderHtmlContent(column, element)\" \r\n                [ngClass]=\"getClasses(column, element)\">\r\n            </div>\r\n          </ng-container>\r\n          \r\n          <!-- This is for visit_completed column -->\r\n          <ng-container *ngIf=\"column.key === 'visit_completed'\">\r\n            <div class=\"d-flex align-items-center visit-completed-cell\"   [attr.data-test-id]=\"'td-visit_completed-' + pluginConfigObs.pluginConfigObsFlag + '-' + j\">\r\n              <img src=\"assets/svgs/green-pad.svg\" alt=\"Completed\" class=\"mr-2\" />\r\n              <span class=\"text-success\">\r\n                {{ element.completed }}\r\n              </span>\r\n            </div>\r\n          </ng-container>\r\n\r\n          <!-- Patient Name Column -->\r\n          <ng-container *ngIf=\"column.key === 'patient_name'\">\r\n            <div class=\"d-flex align-items-center\"   [attr.data-test-id]=\"'td-patient_name-' + pluginConfigObs.pluginConfigObsFlag + '-' + j\">\r\n              <img *ngIf=\"element.patientId\" src=\"{{ checkPatientRegField('Profile Photo') ? baseURL + '/personimage/' + element.patientId : '' }}\" alt=\"\" width=\"32px\" height=\"32px\" style=\"border-radius: 50%;\">\r\n              <img *ngIf=\"pluginConfigObs.pluginConfigObsFlag !== 'Appointment'\" src=\"{{ checkPatientRegField('Profile Photo') ? baseURL + '/personimage/' + element.person.uuid : '' }}\" alt=\"\" width=\"32px\" height=\"32px\" style=\"border-radius: 50%;\"  [attr.data-test-id]=\"'td-patient_img-' + pluginConfigObs.pluginConfigObsFlag + '-' + j\">\r\n\r\n              <div class=\"float-left\" \r\n                [innerHTML]=\"renderHtmlContent(column, element)\" \r\n                [ngClass]=\"getClasses(column, element)\">\r\n              </div>\r\n            </div>\r\n          </ng-container>\r\n\r\n          <!-- Telephone Column -->\r\n          <ng-container *ngIf=\"column.key === 'telephone' && element.telephone\">\r\n            <a (click)=\"openWhatsApp($event, element.telephone)\" class=\"float-left icon-btn m-0\" [attr.data-test-id]=\"'linkPatientWhatsApp' + j\">\r\n              <img src=\"assets/svgs/whatsapp-green.svg\" alt=\"WhatsApp\" />\r\n            </a>\r\n          </ng-container>\r\n\r\n          <!-- Actions Column -->\r\n          <ng-container *ngIf=\"column.key === 'actions'\">\r\n            <div class=\"actions-btn-wrap d-flex align-items-center\">\r\n              <button\r\n                *ngFor=\"let action of column.actionButtons; let k = index\"\r\n                [ngStyle]=\"{\r\n                  color: action.style?.color,\r\n                  backgroundColor: action.style?.backgroundColor\r\n                }\"\r\n                class=\"action-btn mr-2\"\r\n                type=\"button\"\r\n                (click)=\"$event.stopPropagation(); handleAction(action, element)\"\r\n                  [attr.data-test-id]=\"'btn-action-' + action.label+'-'+ k\" >\r\n                {{ action.label | translate }}\r\n              </button>\r\n            </div>\r\n          </ng-container>\r\n        </td>\r\n      </ng-container>\r\n    \r\n\r\n      <!-- No Data Row -->\r\n      <tr class=\"mat-row\" *matNoDataRow>\r\n        <td class=\"mat-cell text-center\" [attr.colspan]=\"displayedColumns.length\">\r\n          {{ pluginConfigObs.noRecordFound | translate }}\r\n        </td>\r\n      </tr>\r\n\r\n      <!-- Row Definitions -->\r\n      <tr mat-header-row *matHeaderRowDef=\"displayedColumns\"></tr>\r\n      <tr mat-row *matRowDef=\"let row; let x = index; columns: displayedColumns;\" [attr.data-test-id]=\"'tr' + x\" [routerLink]=\"['/dashboard/visit-summary', row.uuid]\"></tr>\r\n      \r\n      </table>\r\n    </div>\r\n    <mat-paginator \r\n      *ngIf=\"pluginConfigObs?.pluginConfigObsFlag === 'Appointment'\"\r\n      #tempPaginator \r\n      hidePageSize \r\n      [pageSizeOptions]=\"pageSizeOptions\"\r\n      [length]=\"getCurrentTotalCount()\" \r\n      [pageIndex]=\"currentPage\" \r\n      [pageSize]=\"itemsPerPage\"\r\n      [disabled]=\"isPaginationDisabled()\"\r\n      aria-label=\"Select page of periodic elements\">\r\n    </mat-paginator>\r\n    <mat-paginator \r\n      #tempPaginator \r\n      *ngIf=\"pluginConfigObs?.pluginConfigObsFlag !== 'Appointment'\"\r\n      hidePageSize \r\n      [pageSizeOptions]=\"pageSizeOptions\"\r\n      [length]=\"getCurrentTotalCount()\" \r\n      [pageIndex]=\"currentPage\" \r\n      [pageSize]=\"itemsPerPage\" \r\n      [disabled]=\"isPaginationDisabled()\"\r\n      (page)=\"pageEvent = getData($event)\"  \r\n      aria-label=\"Select page of periodic elements\"\r\n      >\r\n    </mat-paginator>\r\n  </div>\r\n</mat-expansion-panel>", styles: [".mat-elevation-z8{box-shadow:none;width:100%;overflow-x:auto}.table-container{max-height:440px;overflow-y:auto;overflow-x:auto}table{width:100%;font-family:DM Sans}th.mat-header-cell{border:none;font-size:14px!important;font-weight:700;color:var(--color-gray);height:21px}th.mat-header-cell,td.mat-cell,td.mat-footer-cell{border:none;min-width:60px;white-space:nowrap;padding-right:24px}th.mat-header-cell span.alert-danger,td.mat-cell span.alert-danger,td.mat-footer-cell span.alert-danger{color:var(--color-red);font-weight:700;background:transparent;border:none}th.mat-header-cell span.alert-success,td.mat-cell span.alert-success,td.mat-footer-cell span.alert-success{color:var(--color-green);font-weight:700;background:transparent;border:none}td.mat-cell{font-size:16px}tr.mat-row,tr.mat-footer-row{height:88px;border-radius:8px;cursor:pointer}tr.mat-row.upcoming{background:#e6fff3!important}tr.mat-row:nth-child(odd){background:#f7f7fa}td:first-child,th:first-child{border-radius:8px 0 0 8px}td:last-child,th:last-child{border-radius:0 8px 8px 0}.actions-btn-wrap .action-btn{outline:none;border:none;height:36px;min-width:102px;padding:6px 8px;background:#fff;border-radius:4px;color:var(--color-black);font-family:DM Sans;font-size:16px}.actions-btn-wrap .blue-btn{background:var(--color-lightGray);color:var(--color-darkBlue)}.actions-btn-wrap .pink-btn{background:var(--color-lightPink);color:var(--color-red)}.mat-expansion-panel .mat-expansion-panel-header.mat-expanded .input-group{display:flex}.input-group{background:var(--color-white);border:1px solid rgba(127,123,146,.5);border-radius:6px;height:46px;align-items:center;max-width:60vw;width:300px;display:none}.input-group .input-group-text{background:none;border:none;cursor:default}.input-group .form-control{border:none;outline:none;background:transparent;font-size:16px;line-height:150%;padding-left:16px}.input-group .form-control:focus{box-shadow:none}.mat-expansion-panel{background:#fff;box-shadow:0 4px 24px #1f1c3a14;border-radius:20px!important;padding:24px;margin-bottom:24px}.mat-expansion-panel .mat-expansion-panel-header{padding:0}.mat-expansion-panel .mat-expansion-panel-header .mat-content{align-items:center}.mat-expansion-panel .mat-expansion-panel-header.mat-expanded{height:48px}.mat-expansion-panel .mat-expansion-panel-header:hover{background:transparent!important}.mat-expansion-panel .intel-accordion-title{display:flex;flex-direction:row;align-items:center;justify-content:flex-start;flex-wrap:wrap;width:100%}.mat-expansion-panel .intel-accordion-title .mat-icon{height:20px;width:20px;font-size:20px;color:#461d90;margin-left:8px}.mat-expansion-panel .intel-accordion-title h6{font-size:18px;font-weight:700;color:#000}.mat-expansion-panel .mat-expansion-panel-content .mat-expansion-panel-body{padding:0;margin-top:24px;position:relative}.mat-expansion-panel .mat-expansion-panel-content .mat-expansion-panel-body:after{content:\"\";position:absolute;top:0;height:1px;left:0;right:0;background:#efe8ff}.anchor-con{position:absolute;top:-120px;left:0}.visit-completed-cell{color:green!important;background-color:#d4edda!important}@media (max-width: 768px){.input-group{width:100%;max-width:100%;margin:10px 0}.mat-expansion-panel .mat-expansion-panel-header,.mat-expansion-panel .mat-expansion-panel-header.mat-expanded{height:fit-content}.info-icon{display:none}.anchor-con{top:-100px}}.matIconButton{border:none;background:transparent}::ng-deep .custom-menu{background:var(--color-white);border-radius:8px!important;padding:16px;width:352px;box-shadow:0 4px 8px #7f7b9229}.mat-expansion-panel.mat-expanded .mat-expansion-panel-header .filter-btn{display:flex!important}.btnResetApSerach{border:none;background:transparent;cursor:pointer;padding:0;margin-right:4px;display:flex;align-items:center;justify-content:center}.btnResetApSerach .mat-icon{font-size:18px;width:18px;height:18px;color:#7f7b92}.btnResetApSerach:hover .mat-icon{color:#2e1e91}.search-icon-span{pointer-events:none}.filter-btn{background:none;align-items:center;border:1px solid rgba(127,123,146,.5);border-radius:6px;color:#2e1e91;font-weight:500;padding:4px 12px;white-space:nowrap;height:46px;display:none;gap:4px}.toggle-buttons{display:flex;justify-content:space-between;margin-bottom:16px;gap:16px}button.mat-button,.action-buttons button.mat-button{flex:1;color:#2e1e91;background:#fff;border-radius:8px;font-family:DM Sans;font-size:14px;font-weight:500;border:1.33px solid #EFE8FF}.action-buttons button.mat-button.reset-btn{font-size:12px;font-weight:700;margin:0 0 0 20px;width:96px}.action-buttons button.mat-button.apply-btn{color:#fff;background:var(--color-darkBlue);font-size:12px;font-weight:700;width:96px}button.mat-button.active{background:#efe8ff;color:#2e1e91}button.mat-button .reset-btn{color:var(--color-darkBlue)}.action-buttons{display:flex;justify-content:space-between;gap:16px}.reset-btn{color:var(--color-darkBlue);background:#f5f5f5;border-radius:8px}.filter-search-container{display:flex;align-items:center;gap:1rem}.form-date{margin-bottom:16px}.input-wrapper{position:relative;display:flex;align-items:center}.input-wrapper .form-control{width:100%;padding-right:40px;border:1px solid rgba(178,175,190,.2);background:transparent;border-radius:8px;height:48px;font-size:16px;color:var(--color-darkestBlue)}.datepicker-icon{position:absolute;right:4px;top:50%;transform:translateY(-50%);cursor:pointer;background:transparent;border:none}.form-control:focus{box-shadow:none}.label-text{font-size:14px;margin-bottom:8px;color:#7f7b92}.userImage{width:32px;height:32px;border-radius:50%}.red-pill{display:flex;flex-direction:row;align-items:center;background:#ffe8e8;border-radius:4px;height:32px;color:#ea315b;padding:4px 6px;width:fit-content}.left{text-align:left}.chip{display:flex;flex-direction:row;align-items:center;border-radius:4px;height:32px;padding:4px 6px;width:fit-content}.chip.green{color:#0fd197}.chip.blue{color:#2e1e91}.chip-item-blue{background:var(--color-lightGray)}.chip-item-green{background:#e6fff3}.error-message{color:#ea315b;font-size:12px;margin-top:4px;display:block;font-family:DM Sans}.error-border{border-color:#ea315b!important}\n"] }]
        }], ctorParameters: function () { return [{ type: AppointmentService }, { type: VisitService }, { type: CoreService }, { type: i3.ToastrService }, { type: i4.TranslateService }, { type: MindmapService }, { type: i7.DomSanitizer }, { type: AppConfigService }, { type: i9.NgxRolesService }, { type: i10.NgxUiLoaderService }, { type: undefined, decorators: [{
                    type: Inject,
                    args: ['environment']
                }] }]; }, propDecorators: { pluginConfigObs: [{
                type: Input
            }], searchElement: [{
                type: ViewChild,
                args: ['searchInput', { static: true }]
            }], tempPaginator: [{
                type: ViewChild,
                args: ['tempPaginator']
            }], paginatorEl: [{
                type: ViewChild,
                args: ['tempPaginator', { read: ElementRef }]
            }], menuTrigger: [{
                type: ViewChild,
                args: [MatMenuTrigger]
            }], datePicker: [{
                type: ViewChild,
                args: ['datePicker']
            }], startDatePicker: [{
                type: ViewChild,
                args: ['startDatePicker']
            }], endDatePicker: [{
                type: ViewChild,
                args: ['endDatePicker']
            }], filterMenu: [{
                type: ViewChild,
                args: ['filterMenu']
            }], visitsCountDate: [{
                type: Output
            }] } });

class IhLibraryComponent {
    translate;
    constructor(translate) {
        this.translate = translate;
        translate.addLangs(['en', 'ru']);
        translate.setDefaultLang('en');
        const browserLang = translate.getBrowserLang();
        translate.use(browserLang.match(/en|fr/) ? browserLang : 'en');
    }
    ngOnInit() {
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.3.0", ngImport: i0, type: IhLibraryComponent, deps: [{ token: i4.TranslateService }], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "14.3.0", type: IhLibraryComponent, selector: "lib-ih-library", ngImport: i0, template: "<lib-table-grid></lib-table-grid>", dependencies: [{ kind: "component", type: TableGridComponent, selector: "lib-table-grid", inputs: ["pluginConfigObs"], outputs: ["visitsCountDate"] }] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.3.0", ngImport: i0, type: IhLibraryComponent, decorators: [{
            type: Component,
            args: [{ selector: 'lib-ih-library', template: "<lib-table-grid></lib-table-grid>" }]
        }], ctorParameters: function () { return [{ type: i4.TranslateService }]; } });

class ModalComponentsModule {
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.3.0", ngImport: i0, type: ModalComponentsModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
    static ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "14.3.0", ngImport: i0, type: ModalComponentsModule, declarations: [RescheduleAppointmentComponent,
            RescheduleAppointmentConfirmComponent,
            CancelAppointmentConfirmComponent], imports: [MatFormFieldModule,
            MatInputModule,
            CommonModule,
            MatDialogModule,
            FormsModule,
            ReactiveFormsModule,
            MatIconModule,
            MatButtonModule,
            MatListModule,
            MatDatepickerModule,
            NgSelectModule,
            MatProgressBarModule,
            MatTabsModule,
            MatTableModule,
            TranslateModule] });
    static ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "14.3.0", ngImport: i0, type: ModalComponentsModule, imports: [MatFormFieldModule,
            MatInputModule,
            CommonModule,
            MatDialogModule,
            FormsModule,
            ReactiveFormsModule,
            MatIconModule,
            MatButtonModule,
            MatListModule,
            MatDatepickerModule,
            NgSelectModule,
            MatProgressBarModule,
            MatTabsModule,
            MatTableModule,
            TranslateModule] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.3.0", ngImport: i0, type: ModalComponentsModule, decorators: [{
            type: NgModule,
            args: [{
                    declarations: [
                        RescheduleAppointmentComponent,
                        RescheduleAppointmentConfirmComponent,
                        CancelAppointmentConfirmComponent,
                    ],
                    imports: [
                        MatFormFieldModule,
                        MatInputModule,
                        CommonModule,
                        MatDialogModule,
                        FormsModule,
                        ReactiveFormsModule,
                        MatIconModule,
                        MatButtonModule,
                        MatListModule,
                        MatDatepickerModule,
                        NgSelectModule,
                        MatProgressBarModule,
                        MatTabsModule,
                        MatTableModule,
                        TranslateModule
                    ],
                    schemas: [NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA]
                }]
        }] });

function HttpLoaderFactory(httpClient) {
    return new TranslateHttpLoader(httpClient, './assets/i18n/', '.json');
}
registerLocaleData(localeRu);
registerLocaleData(localeEn);
class IhLibraryModule {
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.3.0", ngImport: i0, type: IhLibraryModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
    static ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "14.3.0", ngImport: i0, type: IhLibraryModule, declarations: [IhLibraryComponent,
            TableGridComponent,
            DefaultImageDirective], imports: [ModalComponentsModule,
            RouterModule,
            CommonModule, i4.TranslateModule, i3.ToastrModule, i9.NgxPermissionsModule, MatPaginatorModule,
            MatTooltipModule,
            MatInputModule,
            MatFormFieldModule,
            MatExpansionModule,
            MatBottomSheetModule,
            MatSnackBarModule,
            MatMenuModule,
            MatTableModule,
            MatIconModule,
            MatSidenavModule,
            MatTabsModule,
            CdkAccordionModule,
            MatDialogModule,
            MatDatepickerModule,
            MatNativeDateModule,
            FormsModule,
            ReactiveFormsModule,
            MatSortModule,
            NgxUiLoaderModule], exports: [DefaultImageDirective,
            IhLibraryComponent,
            TableGridComponent,
            MatPaginatorModule,
            MatTooltipModule,
            MatInputModule,
            MatFormFieldModule,
            MatExpansionModule,
            MatBottomSheetModule,
            MatSnackBarModule,
            MatMenuModule,
            MatTableModule,
            MatIconModule,
            MatSidenavModule,
            MatTabsModule,
            CdkAccordionModule,
            MatDialogModule,
            MatDatepickerModule,
            MatNativeDateModule,
            FormsModule,
            ReactiveFormsModule,
            NgxPermissionsModule,
            ToastrModule,
            TranslateModule] });
    static ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "14.3.0", ngImport: i0, type: IhLibraryModule, providers: [
            { provide: MAT_DIALOG_DATA, useValue: {} },
            { provide: MatDialogRef, useValue: {} },
        ], imports: [ModalComponentsModule,
            RouterModule,
            CommonModule,
            TranslateModule.forRoot({
                loader: {
                    provide: TranslateLoader,
                    useFactory: HttpLoaderFactory,
                    deps: [HttpClient]
                }
            }),
            ToastrModule.forRoot({
                positionClass: 'toast-bottom-right',
                preventDuplicates: true,
                closeButton: true,
                tapToDismiss: false
            }),
            NgxPermissionsModule.forRoot({
                permissionsIsolate: false,
                rolesIsolate: false,
                configurationIsolate: false
            }),
            MatPaginatorModule,
            MatTooltipModule,
            MatInputModule,
            MatFormFieldModule,
            MatExpansionModule,
            MatBottomSheetModule,
            MatSnackBarModule,
            MatMenuModule,
            MatTableModule,
            MatIconModule,
            MatSidenavModule,
            MatTabsModule,
            CdkAccordionModule,
            MatDialogModule,
            MatDatepickerModule,
            MatNativeDateModule,
            FormsModule,
            ReactiveFormsModule,
            MatSortModule,
            NgxUiLoaderModule, MatPaginatorModule,
            MatTooltipModule,
            MatInputModule,
            MatFormFieldModule,
            MatExpansionModule,
            MatBottomSheetModule,
            MatSnackBarModule,
            MatMenuModule,
            MatTableModule,
            MatIconModule,
            MatSidenavModule,
            MatTabsModule,
            CdkAccordionModule,
            MatDialogModule,
            MatDatepickerModule,
            MatNativeDateModule,
            FormsModule,
            ReactiveFormsModule,
            NgxPermissionsModule,
            ToastrModule,
            TranslateModule] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.3.0", ngImport: i0, type: IhLibraryModule, decorators: [{
            type: NgModule,
            args: [{
                    declarations: [
                        IhLibraryComponent,
                        TableGridComponent,
                        DefaultImageDirective
                    ],
                    imports: [
                        ModalComponentsModule,
                        RouterModule,
                        CommonModule,
                        TranslateModule.forRoot({
                            loader: {
                                provide: TranslateLoader,
                                useFactory: HttpLoaderFactory,
                                deps: [HttpClient]
                            }
                        }),
                        ToastrModule.forRoot({
                            positionClass: 'toast-bottom-right',
                            preventDuplicates: true,
                            closeButton: true,
                            tapToDismiss: false
                        }),
                        NgxPermissionsModule.forRoot({
                            permissionsIsolate: false,
                            rolesIsolate: false,
                            configurationIsolate: false
                        }),
                        MatPaginatorModule,
                        MatTooltipModule,
                        MatInputModule,
                        MatFormFieldModule,
                        MatExpansionModule,
                        MatBottomSheetModule,
                        MatSnackBarModule,
                        MatMenuModule,
                        MatTableModule,
                        MatIconModule,
                        MatSidenavModule,
                        MatTabsModule,
                        CdkAccordionModule,
                        MatDialogModule,
                        MatDatepickerModule,
                        MatNativeDateModule,
                        FormsModule,
                        ReactiveFormsModule,
                        MatSortModule,
                        NgxUiLoaderModule
                    ],
                    exports: [
                        DefaultImageDirective,
                        IhLibraryComponent,
                        TableGridComponent,
                        MatPaginatorModule,
                        MatTooltipModule,
                        MatInputModule,
                        MatFormFieldModule,
                        MatExpansionModule,
                        MatBottomSheetModule,
                        MatSnackBarModule,
                        MatMenuModule,
                        MatTableModule,
                        MatIconModule,
                        MatSidenavModule,
                        MatTabsModule,
                        CdkAccordionModule,
                        MatDialogModule,
                        MatDatepickerModule,
                        MatNativeDateModule,
                        FormsModule,
                        ReactiveFormsModule,
                        NgxPermissionsModule,
                        ToastrModule,
                        TranslateModule
                    ],
                    providers: [
                        { provide: MAT_DIALOG_DATA, useValue: {} },
                        { provide: MatDialogRef, useValue: {} },
                    ],
                    schemas: [
                        CUSTOM_ELEMENTS_SCHEMA,
                        NO_ERRORS_SCHEMA
                    ]
                }]
        }] });

/*
 * Public API Surface of ih-library
 */

/**
 * Generated bundle index. Do not edit.
 */

export { DefaultImageDirective, HttpLoaderFactory, IhLibraryComponent, IhLibraryModule, IhLibraryService, TableGridComponent };
//# sourceMappingURL=ih-library.mjs.map
