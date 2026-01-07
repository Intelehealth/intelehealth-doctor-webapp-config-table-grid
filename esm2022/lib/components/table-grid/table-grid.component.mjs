import { Component, ElementRef, ViewChild, Input, ChangeDetectionStrategy, Inject, Output, EventEmitter } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { AppointmentService } from '../../services/appointment.service';
import { VisitService } from '../../services/visit.service';
import moment from 'moment';
import { CoreService } from '../../services/core.service';
import { ToastrService } from 'ngx-toastr';
import { TranslateService } from '@ngx-translate/core';
import { getCacheData, checkIfDateOldThanOneDay, isFeaturePresent } from '../../utils/utility-functions';
import { doctorDetails, languages, visitTypes } from '../../config/constant';
import { MindmapService } from '../../services/mindmap.service';
import { AppConfigService } from '../../services/app-config.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatMenuTrigger } from '@angular/material/menu';
import { DomSanitizer } from '@angular/platform-browser';
import { NgxRolesService } from 'ngx-permissions';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import * as i0 from "@angular/core";
import * as i1 from "../../services/appointment.service";
import * as i2 from "../../services/visit.service";
import * as i3 from "../../services/core.service";
import * as i4 from "ngx-toastr";
import * as i5 from "@ngx-translate/core";
import * as i6 from "../../services/mindmap.service";
import * as i7 from "@angular/platform-browser";
import * as i8 from "../../services/app-config.service";
import * as i9 from "ngx-permissions";
import * as i10 from "ngx-ui-loader";
import * as i11 from "@angular/router";
import * as i12 from "@angular/common";
import * as i13 from "@angular/material/paginator";
import * as i14 from "@angular/material/tooltip";
import * as i15 from "@angular/material/form-field";
import * as i16 from "@angular/material/expansion";
import * as i17 from "@angular/material/menu";
import * as i18 from "@angular/material/table";
import * as i19 from "@angular/material/icon";
import * as i20 from "@angular/material/datepicker";
import * as i21 from "@angular/forms";
import * as i22 from "../../core/directives/default-image.directive";
export class TableGridComponent {
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
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.3.0", ngImport: i0, type: TableGridComponent, deps: [{ token: i1.AppointmentService }, { token: i2.VisitService }, { token: i3.CoreService }, { token: i4.ToastrService }, { token: i5.TranslateService }, { token: i6.MindmapService }, { token: i7.DomSanitizer }, { token: i8.AppConfigService }, { token: i9.NgxRolesService }, { token: i10.NgxUiLoaderService }, { token: 'environment' }], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "14.3.0", type: TableGridComponent, selector: "lib-table-grid", inputs: { pluginConfigObs: "pluginConfigObs" }, outputs: { visitsCountDate: "visitsCountDate" }, viewQueries: [{ propertyName: "searchElement", first: true, predicate: ["searchInput"], descendants: true, static: true }, { propertyName: "tempPaginator", first: true, predicate: ["tempPaginator"], descendants: true }, { propertyName: "paginatorEl", first: true, predicate: ["tempPaginator"], descendants: true, read: ElementRef }, { propertyName: "menuTrigger", first: true, predicate: MatMenuTrigger, descendants: true }, { propertyName: "datePicker", first: true, predicate: ["datePicker"], descendants: true }, { propertyName: "startDatePicker", first: true, predicate: ["startDatePicker"], descendants: true }, { propertyName: "endDatePicker", first: true, predicate: ["endDatePicker"], descendants: true }, { propertyName: "filterMenu", first: true, predicate: ["filterMenu"], descendants: true }], usesOnChanges: true, ngImport: i0, template: "<mat-expansion-panel [expanded]=\"true\" data-test-id=\"matExpAppointment\">\r\n  <mat-expansion-panel-header data-test-id=\"matExpHeaderAppointment\">\r\n    <mat-panel-title data-test-id=\"matPanelTitleAppointment\">\r\n      <div id=\"{{pluginConfigObs.anchorId}}\" class=\"anchor-con\" data-test-id=\"divAnchorAppointment\"></div>\r\n      <div class=\"intel-accordion-title\" data-test-id=\"divAccordionTitleAppointment\">\r\n        <img src=\"{{ pluginConfigObs.tableHeaderIcon }}\" alt=\"\" width=\"44px\" data-test-id=\"imgTableHeaderIconAppointment\">\r\n        <h6 class=\"mb-0 ml-2\" [attr.data-test-id]=\"pluginConfigObs.tableHeader\"> \r\n          {{ pluginConfigObs.tableHeader | translate }} ({{ getCurrentTotalCount() }})\r\n        </h6>   \r\n        <mat-icon \r\n          aria-hidden=\"false\" \r\n          aria-label=\"help icon\" \r\n          matTooltip=\"{{ (pluginConfigObs.tooltipLabel | translate) }}\" \r\n          matTooltipPosition=\"right\" \r\n          data-test-id=\"icoHelpAppointment\">\r\n          help_outline\r\n        </mat-icon>\r\n\r\n        <!-- Filter button -->\r\n        <div class=\"ml-auto filter-search-container\" data-test-id=\"divFilterContainerAppointment\">\r\n          <button \r\n            *ngIf=\"pluginConfigObs.filterObs.filterFlag\" \r\n            class=\"mat-stroked-button filter-btn\" \r\n            [matMenuTriggerFor]=\"filterMenu\" \r\n            (click)=\"$event.stopPropagation();\" \r\n            data-test-id=\"btnFilterAppointment\">\r\n            <img src=\"{{pluginConfigObs.filterObs.filterIcon}}\" alt=\"\" data-test-id=\"imgFilterIconAppointment\"> \r\n            {{( pluginConfigObs.filterObs.filterLabel| translate)}}\r\n          </button>\r\n\r\n          <!-- Filter Menu -->\r\n          <mat-menu #filterMenu=\"matMenu\" class=\"custom-menu\" [hasBackdrop]=\"true\" xPosition=\"before\" data-test-id=\"menuFilterAppointment\">\r\n            <div class=\"toggle-buttons\" data-test-id=\"divToggleButtonsAppointment\">\r\n              <button \r\n                mat-button \r\n                [class.active]=\"mode === 'date'\" \r\n                (click)=\"setMode('date'); $event.stopPropagation(); resetDate(true)\" \r\n                data-test-id=\"btnDateModeAppointment\">\r\n                {{'Date' | translate}}\r\n              </button>\r\n              <button \r\n                mat-button \r\n                [class.active]=\"mode === 'range'\" \r\n                (click)=\"setMode('range'); $event.stopPropagation(); resetDate(true)\" \r\n                data-test-id=\"btnRangeModeAppointment\">\r\n                {{'Range' | translate}}\r\n              </button>\r\n            </div>\r\n\r\n            <!-- Date Mode -->\r\n            <div *ngIf=\"mode === 'date'\" class=\"date-view\" (click)=\"$event.stopPropagation()\" data-test-id=\"divDateModeAppointment\">\r\n              <form [formGroup]=\"filteredDateAndRangeForm\" data-test-id=\"formDateFilterAppointment\">\r\n                <div class=\"form-date\" data-test-id=\"divFormDateAppointment\">\r\n                  <div class=\"input-date\" data-test-id=\"divInputDateAppointment\">\r\n                    <label class=\"label-text\" data-test-id=\"lblSelectDateAppointment\">{{ 'Select date' | translate}}</label>\r\n                    <div class=\"input-wrapper\" data-test-id=\"divInputWrapperDateAppointment\">\r\n                      <input\r\n                        type=\"text\"\r\n                        class=\"form-control\"\r\n                        [class.error-border]=\"dateErrorMessage\"\r\n                        [max]=\"maxDate\"\r\n                        formControlName=\"date\"\r\n                        [matDatepicker]=\"datePicker\"\r\n                        [placeholder]=\"filteredDateAndRangeForm.get('date')?.value ? (filteredDateAndRangeForm.get('date')?.value | date: 'dd/MM/yyyy') : ('Select date' | translate)\"\r\n                        aria-label=\"Date\"\r\n                        readonly\r\n                        data-test-id=\"etDate\"/>\r\n                      <mat-datepicker #datePicker (opened)=\"addCalendarNavigationTestIds()\" data-test-id=\"matDatePickerAppointment\"></mat-datepicker>\r\n                      <mat-datepicker-toggle\r\n                        matSuffix\r\n                        [for]=\"datePicker\"\r\n                        data-test-id=\"dpDate\"\r\n                        class=\"datepicker-icon\">\r\n                        <img matDatepickerToggleIcon src=\"assets/svgs/calendar-date.svg\" alt=\"\" data-test-id=\"imgDatePickerIconAppointment\">\r\n                      </mat-datepicker-toggle>\r\n                    </div>\r\n                    <span *ngIf=\"dateErrorMessage\" class=\"error-message\" data-test-id=\"spanDateErrorMessageAppointment\">{{ dateErrorMessage }}</span>\r\n                  </div>\r\n                </div>\r\n              </form>\r\n            </div>\r\n\r\n            <!-- Range Mode -->\r\n            <div *ngIf=\"mode === 'range'\" class=\"range-view\" (click)=\" $event.stopPropagation()\" data-test-id=\"divRangeModeAppointment\">\r\n              <form [formGroup]=\"filteredDateAndRangeForm\" data-test-id=\"formRangeFilterAppointment\">\r\n                <div class=\"form-date\" data-test-id=\"divFormStartDateAppointment\">\r\n                  <div class=\"input-date\" data-test-id=\"divInputStartDateAppointment\">\r\n                    <label class=\"label-text\" data-test-id=\"lblStartDateAppointment\">{{ 'Start date' | translate }}</label>\r\n                    <div class=\"input-wrapper\" data-test-id=\"divInputWrapperStartDateAppointment\">\r\n                      <input\r\n                        type=\"text\"\r\n                        class=\"form-control\"\r\n                        [class.error-border]=\"startDateErrorMessage\"\r\n                        [max]=\"filteredDateAndRangeForm.value.endDate ? filteredDateAndRangeForm.value.endDate : maxDate\"\r\n                        formControlName=\"startDate\"\r\n                        [matDatepicker]=\"startDatePicker\"\r\n                        [placeholder]=\"filteredDateAndRangeForm.get('startDate')?.value ? (filteredDateAndRangeForm.get('startDate')?.value | date: 'dd/MM/yyyy') : ('Select start date'|translate)\"\r\n                        readonly\r\n                        data-test-id=\"etSelStartDate\">\r\n                      <mat-datepicker #startDatePicker (opened)=\"addCalendarNavigationTestIds()\" data-test-id=\"matStartDatePickerAppointment\"></mat-datepicker>\r\n                      <mat-datepicker-toggle matSuffix [for]=\"startDatePicker\" class=\"datepicker-icon\" data-test-id=\"dpStartDate\">\r\n                        <img matDatepickerToggleIcon src=\"assets/svgs/calendar-date.svg\" alt=\"\" data-test-id=\"imgStartDatePickerIconAppointment\">\r\n                      </mat-datepicker-toggle>\r\n                    </div>\r\n                    <span *ngIf=\"startDateErrorMessage\" class=\"error-message\" data-test-id=\"spanStartDateErrorMessageAppointment\">{{ startDateErrorMessage }}</span>\r\n                  </div>\r\n                </div>\r\n                <div class=\"form-date\" data-test-id=\"divFormEndDateAppointment\">\r\n                  <div class=\"input-date\" data-test-id=\"divInputEndDateAppointment\">\r\n                    <label class=\"label-text\" data-test-id=\"lblEndDateAppointment\">{{ 'End date' | translate }}</label>\r\n                    <div class=\"input-wrapper\" data-test-id=\"divInputWrapperEndDateAppointment\">\r\n                      <input\r\n                        type=\"text\"\r\n                        class=\"form-control\"\r\n                        [class.error-border]=\"endDateErrorMessage\"\r\n                        [min]=\"filteredDateAndRangeForm.value.startDate\"\r\n                        [max]=\"maxDate\"\r\n                        formControlName=\"endDate\"\r\n                        [matDatepicker]=\"endDatePicker\"\r\n                        [placeholder]=\"filteredDateAndRangeForm.get('endDate')?.value ? (filteredDateAndRangeForm.get('endDate')?.value | date: 'dd/MM/yyyy') : ('Select end date'|translate)\"\r\n                        readonly\r\n                        data-test-id=\"etSelEndDate\">\r\n                      <mat-datepicker #endDatePicker (opened)=\"addCalendarNavigationTestIds()\" data-test-id=\"matEndDatePickerAppointment\"></mat-datepicker>\r\n                      <mat-datepicker-toggle matSuffix [for]=\"endDatePicker\" class=\"datepicker-icon\" data-test-id=\"dpEndDate\">\r\n                        <img matDatepickerToggleIcon src=\"assets/svgs/calendar-date.svg\" alt=\"\" data-test-id=\"imgEndDatePickerIconAppointment\">\r\n                      </mat-datepicker-toggle>\r\n                    </div>\r\n                    <span *ngIf=\"endDateErrorMessage\" class=\"error-message\" data-test-id=\"spanEndDateErrorMessageAppointment\">{{ endDateErrorMessage }}</span>\r\n                  </div>\r\n                </div>\r\n              </form>\r\n            </div>\r\n\r\n            <div class=\"action-buttons\" data-test-id=\"divFilterActionBtnsAppointment\">\r\n              <button mat-button class=\"reset-btn\" (click)=\"resetDate(true); $event.stopPropagation();\" data-test-id=\"btnResetFilterAppointment\">{{ 'Reset'| translate }}</button>\r\n              <button mat-button class=\"apply-btn\" (click)=\"applyDateOrRangeFilter(pluginConfigObs.filterObs.filterDateField); $event.stopPropagation();\" data-test-id=\"btnApplyFilterAppointment\">{{ 'Apply'| translate }}</button>\r\n            </div>\r\n          </mat-menu>\r\n\r\n          <!-- Search -->\r\n          <div class=\"input-group search-bar ml-auto\" (click)=\"$event.stopPropagation();\" data-test-id=\"divSearchAppointment\">\r\n            <input\r\n              type=\"text\"\r\n              #searchInput\r\n              class=\"form-control\"\r\n              placeholder=\"{{ pluginConfigObs.searchPlaceHolder | translate }}\"\r\n              (keyup)=\"applyFilter($event)\"\r\n              (keydown.Space)=\"$event.stopPropagation()\"\r\n              (keydown.Enter)=\"$event.stopPropagation()\"\r\n              data-test-id=\"etSearchAppointmentDashboard\">\r\n            <div class=\"input-group-append\">\r\n              <button\r\n                class=\"btnResetApSerach mat-icon-button\"\r\n                aria-label=\"Reset appointment search\"\r\n                (click)=\"clearFilter(); $event.stopPropagation();\"\r\n                *ngIf=\"isFilterApplied\"\r\n                data-test-id=\"btnResetSearchAppointment\">\r\n                <mat-icon class=\"ml-0\">close</mat-icon>\r\n              </button>\r\n              <span class=\"input-group-text search-icon-span\" data-test-id=\"icoSearchAppointment\">\r\n                <img src=\"assets/svgs/search-icon.svg\" alt=\"\" width=\"20px\" height=\"20px\" data-test-id=\"imgSearchIconAppointment\">\r\n              </span>\r\n            </div>\r\n          </div>\r\n        </div>\r\n      </div>\r\n    </mat-panel-title>\r\n  </mat-expansion-panel-header>\r\n\r\n  <div class=\"mat-elevation-z8\" data-test-id=\"divTableWrapperAppointment\">\r\n    <span *ngIf=\"tableLoader\">\r\n      <ngx-ui-loader \r\n        [loaderId]=\"'table-loader-' + pluginConfigObs.pluginConfigObsFlag\" \r\n        [fgsType]=\"'ball-spin-clockwise'\" \r\n        [fgsColor]=\"'#aba4a4'\" \r\n        [fgsPosition]=\"'center-center'\" \r\n        [fgsSize]=\"50\" \r\n        [overlayColor]=\"'rgb(255, 255, 255)'\" \r\n        [hasProgressBar]=\"false\"\r\n        [text]=\"('Loading'|translate) + ' ' + (pluginConfigObs.pluginConfigObsFlag|translate) + ' ' + ('data'|translate) + '...'\"\r\n        [textColor]=\"'#333'\"\r\n        [textPosition]=\"'center-center'\"\r\n        data-test-id=\"loaderAppointment\"\r\n      ></ngx-ui-loader>\r\n    </span>\r\n    <div class=\"table-container\" id=\"table-container-{{componentId}}\">\r\n      <table mat-table [dataSource]=\"paginatedDataSource\">\r\n\r\n      <ng-container *ngFor=\"let column of displayedAppointmentColumns\" [matColumnDef]=\"column.key\">\r\n        <ng-container *ngIf=\"column.isSortable; else noSort\">\r\n          <th mat-header-cell *matHeaderCellDef (click)=\"handleSort(column.key, 'asc')\" [attr.data-test-id]=\"'th-' + column.key + '-' + pluginConfigObs.pluginConfigObsFlag\" class=\"sortable-header\">\r\n            {{ column.label | translate }}\r\n            <mat-icon class=\"sort-icon\">arrow_upward</mat-icon>\r\n          </th>\r\n        </ng-container>\r\n        <ng-template #noSort>\r\n          <th mat-header-cell *matHeaderCellDef  [attr.data-test-id]=\"'th-' + column.key+ '-' + pluginConfigObs.pluginConfigObsFlag\">\r\n            {{ column.label | translate }}\r\n          </th>\r\n        </ng-template>\r\n\r\n        <td mat-cell *matCellDef=\"let element; let j = index;\"  [attr.data-test-id]=\"'td-' + column.key + '-' + pluginConfigObs.pluginConfigObsFlag + '-' + j\">\r\n          <ng-container *ngIf=\"column.key !== 'patient_name' && column.key !== 'visit_completed'\">\r\n            <div class=\"float-left\" \r\n                [innerHTML]=\"renderHtmlContent(column, element)\" \r\n                [ngClass]=\"getClasses(column, element)\">\r\n            </div>\r\n          </ng-container>\r\n          \r\n          <!-- This is for visit_completed column -->\r\n          <ng-container *ngIf=\"column.key === 'visit_completed'\">\r\n            <div class=\"d-flex align-items-center visit-completed-cell\"   [attr.data-test-id]=\"'td-visit_completed-' + pluginConfigObs.pluginConfigObsFlag + '-' + j\">\r\n              <img src=\"assets/svgs/green-pad.svg\" alt=\"Completed\" class=\"mr-2\" />\r\n              <span class=\"text-success\">\r\n                {{ element.completed }}\r\n              </span>\r\n            </div>\r\n          </ng-container>\r\n\r\n          <!-- Patient Name Column -->\r\n          <ng-container *ngIf=\"column.key === 'patient_name'\">\r\n            <div class=\"d-flex align-items-center\"   [attr.data-test-id]=\"'td-patient_name-' + pluginConfigObs.pluginConfigObsFlag + '-' + j\">\r\n              <img *ngIf=\"element.patientId\" src=\"{{ checkPatientRegField('Profile Photo') ? baseURL + '/personimage/' + element.patientId : '' }}\" alt=\"\" width=\"32px\" height=\"32px\" style=\"border-radius: 50%;\">\r\n              <img *ngIf=\"pluginConfigObs.pluginConfigObsFlag !== 'Appointment'\" src=\"{{ checkPatientRegField('Profile Photo') ? baseURL + '/personimage/' + element.person.uuid : '' }}\" alt=\"\" width=\"32px\" height=\"32px\" style=\"border-radius: 50%;\"  [attr.data-test-id]=\"'td-patient_img-' + pluginConfigObs.pluginConfigObsFlag + '-' + j\">\r\n\r\n              <div class=\"float-left\" \r\n                [innerHTML]=\"renderHtmlContent(column, element)\" \r\n                [ngClass]=\"getClasses(column, element)\">\r\n              </div>\r\n            </div>\r\n          </ng-container>\r\n\r\n          <!-- Telephone Column -->\r\n          <ng-container *ngIf=\"column.key === 'telephone' && element.telephone\">\r\n            <a (click)=\"openWhatsApp($event, element.telephone)\" class=\"float-left icon-btn m-0\" [attr.data-test-id]=\"'linkPatientWhatsApp' + j\">\r\n              <img src=\"assets/svgs/whatsapp-green.svg\" alt=\"WhatsApp\" />\r\n            </a>\r\n          </ng-container>\r\n\r\n          <!-- Actions Column -->\r\n          <ng-container *ngIf=\"column.key === 'actions'\">\r\n            <div class=\"actions-btn-wrap d-flex align-items-center\">\r\n              <button\r\n                *ngFor=\"let action of column.actionButtons; let k = index\"\r\n                [ngStyle]=\"{\r\n                  color: action.style?.color,\r\n                  backgroundColor: action.style?.backgroundColor\r\n                }\"\r\n                class=\"action-btn mr-2\"\r\n                type=\"button\"\r\n                (click)=\"$event.stopPropagation(); handleAction(action, element)\"\r\n                  [attr.data-test-id]=\"'btn-action-' + action.label+'-'+ k\" >\r\n                {{ action.label | translate }}\r\n              </button>\r\n            </div>\r\n          </ng-container>\r\n        </td>\r\n      </ng-container>\r\n    \r\n\r\n      <!-- No Data Row -->\r\n      <tr class=\"mat-row\" *matNoDataRow>\r\n        <td class=\"mat-cell text-center\" [attr.colspan]=\"displayedColumns.length\">\r\n          {{ pluginConfigObs.noRecordFound | translate }}\r\n        </td>\r\n      </tr>\r\n\r\n      <!-- Row Definitions -->\r\n      <tr mat-header-row *matHeaderRowDef=\"displayedColumns\"></tr>\r\n      <tr mat-row *matRowDef=\"let row; let x = index; columns: displayedColumns;\" [attr.data-test-id]=\"'tr' + x\" [routerLink]=\"['/dashboard/visit-summary', row.uuid]\"></tr>\r\n      \r\n      </table>\r\n    </div>\r\n    <mat-paginator \r\n      *ngIf=\"pluginConfigObs?.pluginConfigObsFlag === 'Appointment'\"\r\n      #tempPaginator \r\n      hidePageSize \r\n      [pageSizeOptions]=\"pageSizeOptions\"\r\n      [length]=\"getCurrentTotalCount()\" \r\n      [pageIndex]=\"currentPage\" \r\n      [pageSize]=\"itemsPerPage\"\r\n      [disabled]=\"isPaginationDisabled()\"\r\n      aria-label=\"Select page of periodic elements\">\r\n    </mat-paginator>\r\n    <mat-paginator \r\n      #tempPaginator \r\n      *ngIf=\"pluginConfigObs?.pluginConfigObsFlag !== 'Appointment'\"\r\n      hidePageSize \r\n      [pageSizeOptions]=\"pageSizeOptions\"\r\n      [length]=\"getCurrentTotalCount()\" \r\n      [pageIndex]=\"currentPage\" \r\n      [pageSize]=\"itemsPerPage\" \r\n      [disabled]=\"isPaginationDisabled()\"\r\n      (page)=\"pageEvent = getData($event)\"  \r\n      aria-label=\"Select page of periodic elements\"\r\n      >\r\n    </mat-paginator>\r\n  </div>\r\n</mat-expansion-panel>", styles: [".mat-elevation-z8{box-shadow:none;width:100%;overflow-x:auto}.table-container{max-height:440px;overflow-y:auto;overflow-x:auto}table{width:100%;font-family:DM Sans}th.mat-header-cell{border:none;font-size:14px!important;font-weight:700;color:var(--color-gray);height:21px}th.mat-header-cell,td.mat-cell,td.mat-footer-cell{border:none;min-width:60px;white-space:nowrap;padding-right:24px}th.mat-header-cell span.alert-danger,td.mat-cell span.alert-danger,td.mat-footer-cell span.alert-danger{color:var(--color-red);font-weight:700;background:transparent;border:none}th.mat-header-cell span.alert-success,td.mat-cell span.alert-success,td.mat-footer-cell span.alert-success{color:var(--color-green);font-weight:700;background:transparent;border:none}td.mat-cell{font-size:16px}tr.mat-row,tr.mat-footer-row{height:88px;border-radius:8px;cursor:pointer}tr.mat-row.upcoming{background:#e6fff3!important}tr.mat-row:nth-child(odd){background:#f7f7fa}td:first-child,th:first-child{border-radius:8px 0 0 8px}td:last-child,th:last-child{border-radius:0 8px 8px 0}.actions-btn-wrap .action-btn{outline:none;border:none;height:36px;min-width:102px;padding:6px 8px;background:#fff;border-radius:4px;color:var(--color-black);font-family:DM Sans;font-size:16px}.actions-btn-wrap .blue-btn{background:var(--color-lightGray);color:var(--color-darkBlue)}.actions-btn-wrap .pink-btn{background:var(--color-lightPink);color:var(--color-red)}.mat-expansion-panel .mat-expansion-panel-header.mat-expanded .input-group{display:flex}.input-group{background:var(--color-white);border:1px solid rgba(127,123,146,.5);border-radius:6px;height:46px;align-items:center;max-width:60vw;width:300px;display:none}.input-group .input-group-text{background:none;border:none;cursor:default}.input-group .form-control{border:none;outline:none;background:transparent;font-size:16px;line-height:150%;padding-left:16px}.input-group .form-control:focus{box-shadow:none}.mat-expansion-panel{background:#fff;box-shadow:0 4px 24px #1f1c3a14;border-radius:20px!important;padding:24px;margin-bottom:24px}.mat-expansion-panel .mat-expansion-panel-header{padding:0}.mat-expansion-panel .mat-expansion-panel-header .mat-content{align-items:center}.mat-expansion-panel .mat-expansion-panel-header.mat-expanded{height:48px}.mat-expansion-panel .mat-expansion-panel-header:hover{background:transparent!important}.mat-expansion-panel .intel-accordion-title{display:flex;flex-direction:row;align-items:center;justify-content:flex-start;flex-wrap:wrap;width:100%}.mat-expansion-panel .intel-accordion-title .mat-icon{height:20px;width:20px;font-size:20px;color:#461d90;margin-left:8px}.mat-expansion-panel .intel-accordion-title h6{font-size:18px;font-weight:700;color:#000}.mat-expansion-panel .mat-expansion-panel-content .mat-expansion-panel-body{padding:0;margin-top:24px;position:relative}.mat-expansion-panel .mat-expansion-panel-content .mat-expansion-panel-body:after{content:\"\";position:absolute;top:0;height:1px;left:0;right:0;background:#efe8ff}.anchor-con{position:absolute;top:-120px;left:0}.visit-completed-cell{color:green!important;background-color:#d4edda!important}@media (max-width: 768px){.input-group{width:100%;max-width:100%;margin:10px 0}.mat-expansion-panel .mat-expansion-panel-header,.mat-expansion-panel .mat-expansion-panel-header.mat-expanded{height:fit-content}.info-icon{display:none}.anchor-con{top:-100px}}.matIconButton{border:none;background:transparent}::ng-deep .custom-menu{background:var(--color-white);border-radius:8px!important;padding:16px;width:352px;box-shadow:0 4px 8px #7f7b9229}.mat-expansion-panel.mat-expanded .mat-expansion-panel-header .filter-btn{display:flex!important}.btnResetApSerach{border:none;background:transparent;cursor:pointer;padding:0;margin-right:4px;display:flex;align-items:center;justify-content:center}.btnResetApSerach .mat-icon{font-size:18px;width:18px;height:18px;color:#7f7b92}.btnResetApSerach:hover .mat-icon{color:#2e1e91}.search-icon-span{pointer-events:none}.filter-btn{background:none;align-items:center;border:1px solid rgba(127,123,146,.5);border-radius:6px;color:#2e1e91;font-weight:500;padding:4px 12px;white-space:nowrap;height:46px;display:none;gap:4px}.toggle-buttons{display:flex;justify-content:space-between;margin-bottom:16px;gap:16px}button.mat-button,.action-buttons button.mat-button{flex:1;color:#2e1e91;background:#fff;border-radius:8px;font-family:DM Sans;font-size:14px;font-weight:500;border:1.33px solid #EFE8FF}.action-buttons button.mat-button.reset-btn{font-size:12px;font-weight:700;margin:0 0 0 20px;width:96px}.action-buttons button.mat-button.apply-btn{color:#fff;background:var(--color-darkBlue);font-size:12px;font-weight:700;width:96px}button.mat-button.active{background:#efe8ff;color:#2e1e91}button.mat-button .reset-btn{color:var(--color-darkBlue)}.action-buttons{display:flex;justify-content:space-between;gap:16px}.reset-btn{color:var(--color-darkBlue);background:#f5f5f5;border-radius:8px}.filter-search-container{display:flex;align-items:center;gap:1rem}.form-date{margin-bottom:16px}.input-wrapper{position:relative;display:flex;align-items:center}.input-wrapper .form-control{width:100%;padding-right:40px;border:1px solid rgba(178,175,190,.2);background:transparent;border-radius:8px;height:48px;font-size:16px;color:var(--color-darkestBlue)}.datepicker-icon{position:absolute;right:4px;top:50%;transform:translateY(-50%);cursor:pointer;background:transparent;border:none}.form-control:focus{box-shadow:none}.label-text{font-size:14px;margin-bottom:8px;color:#7f7b92}.userImage{width:32px;height:32px;border-radius:50%}.red-pill{display:flex;flex-direction:row;align-items:center;background:#ffe8e8;border-radius:4px;height:32px;color:#ea315b;padding:4px 6px;width:fit-content}.left{text-align:left}.chip{display:flex;flex-direction:row;align-items:center;border-radius:4px;height:32px;padding:4px 6px;width:fit-content}.chip.green{color:#0fd197}.chip.blue{color:#2e1e91}.chip-item-blue{background:var(--color-lightGray)}.chip-item-green{background:#e6fff3}.error-message{color:#ea315b;font-size:12px;margin-top:4px;display:block;font-family:DM Sans}.error-border{border-color:#ea315b!important}\n"], dependencies: [{ kind: "directive", type: i11.RouterLink, selector: ":not(a):not(area)[routerLink]", inputs: ["queryParams", "fragment", "queryParamsHandling", "state", "relativeTo", "preserveFragment", "skipLocationChange", "replaceUrl", "routerLink"] }, { kind: "directive", type: i12.NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }, { kind: "directive", type: i12.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { kind: "directive", type: i12.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "directive", type: i12.NgStyle, selector: "[ngStyle]", inputs: ["ngStyle"] }, { kind: "component", type: i13.MatPaginator, selector: "mat-paginator", inputs: ["disabled"], exportAs: ["matPaginator"] }, { kind: "directive", type: i14.MatTooltip, selector: "[matTooltip]", exportAs: ["matTooltip"] }, { kind: "directive", type: i15.MatSuffix, selector: "[matSuffix]" }, { kind: "component", type: i16.MatExpansionPanel, selector: "mat-expansion-panel", inputs: ["disabled", "expanded", "hideToggle", "togglePosition"], outputs: ["opened", "closed", "expandedChange", "afterExpand", "afterCollapse"], exportAs: ["matExpansionPanel"] }, { kind: "component", type: i16.MatExpansionPanelHeader, selector: "mat-expansion-panel-header", inputs: ["tabIndex", "expandedHeight", "collapsedHeight"] }, { kind: "directive", type: i16.MatExpansionPanelTitle, selector: "mat-panel-title" }, { kind: "component", type: i17.MatMenu, selector: "mat-menu", exportAs: ["matMenu"] }, { kind: "directive", type: i17.MatMenuTrigger, selector: "[mat-menu-trigger-for], [matMenuTriggerFor]", exportAs: ["matMenuTrigger"] }, { kind: "component", type: i18.MatTable, selector: "mat-table, table[mat-table]", exportAs: ["matTable"] }, { kind: "directive", type: i18.MatHeaderCellDef, selector: "[matHeaderCellDef]" }, { kind: "directive", type: i18.MatHeaderRowDef, selector: "[matHeaderRowDef]", inputs: ["matHeaderRowDef", "matHeaderRowDefSticky"] }, { kind: "directive", type: i18.MatColumnDef, selector: "[matColumnDef]", inputs: ["sticky", "matColumnDef"] }, { kind: "directive", type: i18.MatCellDef, selector: "[matCellDef]" }, { kind: "directive", type: i18.MatRowDef, selector: "[matRowDef]", inputs: ["matRowDefColumns", "matRowDefWhen"] }, { kind: "directive", type: i18.MatHeaderCell, selector: "mat-header-cell, th[mat-header-cell]" }, { kind: "directive", type: i18.MatCell, selector: "mat-cell, td[mat-cell]" }, { kind: "component", type: i18.MatHeaderRow, selector: "mat-header-row, tr[mat-header-row]", exportAs: ["matHeaderRow"] }, { kind: "component", type: i18.MatRow, selector: "mat-row, tr[mat-row]", exportAs: ["matRow"] }, { kind: "directive", type: i18.MatNoDataRow, selector: "ng-template[matNoDataRow]" }, { kind: "component", type: i19.MatIcon, selector: "mat-icon", inputs: ["color", "inline", "svgIcon", "fontSet", "fontIcon"], exportAs: ["matIcon"] }, { kind: "component", type: i20.MatDatepicker, selector: "mat-datepicker", exportAs: ["matDatepicker"] }, { kind: "directive", type: i20.MatDatepickerInput, selector: "input[matDatepicker]", inputs: ["matDatepicker", "min", "max", "matDatepickerFilter"], exportAs: ["matDatepickerInput"] }, { kind: "component", type: i20.MatDatepickerToggle, selector: "mat-datepicker-toggle", inputs: ["for", "tabIndex", "aria-label", "disabled", "disableRipple"], exportAs: ["matDatepickerToggle"] }, { kind: "directive", type: i20.MatDatepickerToggleIcon, selector: "[matDatepickerToggleIcon]" }, { kind: "directive", type: i21.ɵNgNoValidate, selector: "form:not([ngNoForm]):not([ngNativeValidate])" }, { kind: "directive", type: i21.DefaultValueAccessor, selector: "input:not([type=checkbox])[formControlName],textarea[formControlName],input:not([type=checkbox])[formControl],textarea[formControl],input:not([type=checkbox])[ngModel],textarea[ngModel],[ngDefaultControl]" }, { kind: "directive", type: i21.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { kind: "directive", type: i21.NgControlStatusGroup, selector: "[formGroupName],[formArrayName],[ngModelGroup],[formGroup],form:not([ngNoForm]),[ngForm]" }, { kind: "directive", type: i21.FormGroupDirective, selector: "[formGroup]", inputs: ["formGroup"], outputs: ["ngSubmit"], exportAs: ["ngForm"] }, { kind: "directive", type: i21.FormControlName, selector: "[formControlName]", inputs: ["formControlName", "disabled", "ngModel"], outputs: ["ngModelChange"] }, { kind: "component", type: i10.NgxUiLoaderComponent, selector: "ngx-ui-loader", inputs: ["bgsColor", "bgsOpacity", "bgsPosition", "bgsSize", "bgsTemplate", "bgsType", "fgsColor", "fgsPosition", "fgsSize", "fgsTemplate", "fgsType", "gap", "loaderId", "logoPosition", "logoSize", "logoUrl", "overlayBorderRadius", "overlayColor", "pbColor", "pbDirection", "pbThickness", "hasProgressBar", "text", "textColor", "textPosition"] }, { kind: "directive", type: i22.DefaultImageDirective, selector: "img[src]", inputs: ["src"] }, { kind: "pipe", type: i12.DatePipe, name: "date" }, { kind: "pipe", type: i5.TranslatePipe, name: "translate" }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.3.0", ngImport: i0, type: TableGridComponent, decorators: [{
            type: Component,
            args: [{ selector: 'lib-table-grid', changeDetection: ChangeDetectionStrategy.OnPush, template: "<mat-expansion-panel [expanded]=\"true\" data-test-id=\"matExpAppointment\">\r\n  <mat-expansion-panel-header data-test-id=\"matExpHeaderAppointment\">\r\n    <mat-panel-title data-test-id=\"matPanelTitleAppointment\">\r\n      <div id=\"{{pluginConfigObs.anchorId}}\" class=\"anchor-con\" data-test-id=\"divAnchorAppointment\"></div>\r\n      <div class=\"intel-accordion-title\" data-test-id=\"divAccordionTitleAppointment\">\r\n        <img src=\"{{ pluginConfigObs.tableHeaderIcon }}\" alt=\"\" width=\"44px\" data-test-id=\"imgTableHeaderIconAppointment\">\r\n        <h6 class=\"mb-0 ml-2\" [attr.data-test-id]=\"pluginConfigObs.tableHeader\"> \r\n          {{ pluginConfigObs.tableHeader | translate }} ({{ getCurrentTotalCount() }})\r\n        </h6>   \r\n        <mat-icon \r\n          aria-hidden=\"false\" \r\n          aria-label=\"help icon\" \r\n          matTooltip=\"{{ (pluginConfigObs.tooltipLabel | translate) }}\" \r\n          matTooltipPosition=\"right\" \r\n          data-test-id=\"icoHelpAppointment\">\r\n          help_outline\r\n        </mat-icon>\r\n\r\n        <!-- Filter button -->\r\n        <div class=\"ml-auto filter-search-container\" data-test-id=\"divFilterContainerAppointment\">\r\n          <button \r\n            *ngIf=\"pluginConfigObs.filterObs.filterFlag\" \r\n            class=\"mat-stroked-button filter-btn\" \r\n            [matMenuTriggerFor]=\"filterMenu\" \r\n            (click)=\"$event.stopPropagation();\" \r\n            data-test-id=\"btnFilterAppointment\">\r\n            <img src=\"{{pluginConfigObs.filterObs.filterIcon}}\" alt=\"\" data-test-id=\"imgFilterIconAppointment\"> \r\n            {{( pluginConfigObs.filterObs.filterLabel| translate)}}\r\n          </button>\r\n\r\n          <!-- Filter Menu -->\r\n          <mat-menu #filterMenu=\"matMenu\" class=\"custom-menu\" [hasBackdrop]=\"true\" xPosition=\"before\" data-test-id=\"menuFilterAppointment\">\r\n            <div class=\"toggle-buttons\" data-test-id=\"divToggleButtonsAppointment\">\r\n              <button \r\n                mat-button \r\n                [class.active]=\"mode === 'date'\" \r\n                (click)=\"setMode('date'); $event.stopPropagation(); resetDate(true)\" \r\n                data-test-id=\"btnDateModeAppointment\">\r\n                {{'Date' | translate}}\r\n              </button>\r\n              <button \r\n                mat-button \r\n                [class.active]=\"mode === 'range'\" \r\n                (click)=\"setMode('range'); $event.stopPropagation(); resetDate(true)\" \r\n                data-test-id=\"btnRangeModeAppointment\">\r\n                {{'Range' | translate}}\r\n              </button>\r\n            </div>\r\n\r\n            <!-- Date Mode -->\r\n            <div *ngIf=\"mode === 'date'\" class=\"date-view\" (click)=\"$event.stopPropagation()\" data-test-id=\"divDateModeAppointment\">\r\n              <form [formGroup]=\"filteredDateAndRangeForm\" data-test-id=\"formDateFilterAppointment\">\r\n                <div class=\"form-date\" data-test-id=\"divFormDateAppointment\">\r\n                  <div class=\"input-date\" data-test-id=\"divInputDateAppointment\">\r\n                    <label class=\"label-text\" data-test-id=\"lblSelectDateAppointment\">{{ 'Select date' | translate}}</label>\r\n                    <div class=\"input-wrapper\" data-test-id=\"divInputWrapperDateAppointment\">\r\n                      <input\r\n                        type=\"text\"\r\n                        class=\"form-control\"\r\n                        [class.error-border]=\"dateErrorMessage\"\r\n                        [max]=\"maxDate\"\r\n                        formControlName=\"date\"\r\n                        [matDatepicker]=\"datePicker\"\r\n                        [placeholder]=\"filteredDateAndRangeForm.get('date')?.value ? (filteredDateAndRangeForm.get('date')?.value | date: 'dd/MM/yyyy') : ('Select date' | translate)\"\r\n                        aria-label=\"Date\"\r\n                        readonly\r\n                        data-test-id=\"etDate\"/>\r\n                      <mat-datepicker #datePicker (opened)=\"addCalendarNavigationTestIds()\" data-test-id=\"matDatePickerAppointment\"></mat-datepicker>\r\n                      <mat-datepicker-toggle\r\n                        matSuffix\r\n                        [for]=\"datePicker\"\r\n                        data-test-id=\"dpDate\"\r\n                        class=\"datepicker-icon\">\r\n                        <img matDatepickerToggleIcon src=\"assets/svgs/calendar-date.svg\" alt=\"\" data-test-id=\"imgDatePickerIconAppointment\">\r\n                      </mat-datepicker-toggle>\r\n                    </div>\r\n                    <span *ngIf=\"dateErrorMessage\" class=\"error-message\" data-test-id=\"spanDateErrorMessageAppointment\">{{ dateErrorMessage }}</span>\r\n                  </div>\r\n                </div>\r\n              </form>\r\n            </div>\r\n\r\n            <!-- Range Mode -->\r\n            <div *ngIf=\"mode === 'range'\" class=\"range-view\" (click)=\" $event.stopPropagation()\" data-test-id=\"divRangeModeAppointment\">\r\n              <form [formGroup]=\"filteredDateAndRangeForm\" data-test-id=\"formRangeFilterAppointment\">\r\n                <div class=\"form-date\" data-test-id=\"divFormStartDateAppointment\">\r\n                  <div class=\"input-date\" data-test-id=\"divInputStartDateAppointment\">\r\n                    <label class=\"label-text\" data-test-id=\"lblStartDateAppointment\">{{ 'Start date' | translate }}</label>\r\n                    <div class=\"input-wrapper\" data-test-id=\"divInputWrapperStartDateAppointment\">\r\n                      <input\r\n                        type=\"text\"\r\n                        class=\"form-control\"\r\n                        [class.error-border]=\"startDateErrorMessage\"\r\n                        [max]=\"filteredDateAndRangeForm.value.endDate ? filteredDateAndRangeForm.value.endDate : maxDate\"\r\n                        formControlName=\"startDate\"\r\n                        [matDatepicker]=\"startDatePicker\"\r\n                        [placeholder]=\"filteredDateAndRangeForm.get('startDate')?.value ? (filteredDateAndRangeForm.get('startDate')?.value | date: 'dd/MM/yyyy') : ('Select start date'|translate)\"\r\n                        readonly\r\n                        data-test-id=\"etSelStartDate\">\r\n                      <mat-datepicker #startDatePicker (opened)=\"addCalendarNavigationTestIds()\" data-test-id=\"matStartDatePickerAppointment\"></mat-datepicker>\r\n                      <mat-datepicker-toggle matSuffix [for]=\"startDatePicker\" class=\"datepicker-icon\" data-test-id=\"dpStartDate\">\r\n                        <img matDatepickerToggleIcon src=\"assets/svgs/calendar-date.svg\" alt=\"\" data-test-id=\"imgStartDatePickerIconAppointment\">\r\n                      </mat-datepicker-toggle>\r\n                    </div>\r\n                    <span *ngIf=\"startDateErrorMessage\" class=\"error-message\" data-test-id=\"spanStartDateErrorMessageAppointment\">{{ startDateErrorMessage }}</span>\r\n                  </div>\r\n                </div>\r\n                <div class=\"form-date\" data-test-id=\"divFormEndDateAppointment\">\r\n                  <div class=\"input-date\" data-test-id=\"divInputEndDateAppointment\">\r\n                    <label class=\"label-text\" data-test-id=\"lblEndDateAppointment\">{{ 'End date' | translate }}</label>\r\n                    <div class=\"input-wrapper\" data-test-id=\"divInputWrapperEndDateAppointment\">\r\n                      <input\r\n                        type=\"text\"\r\n                        class=\"form-control\"\r\n                        [class.error-border]=\"endDateErrorMessage\"\r\n                        [min]=\"filteredDateAndRangeForm.value.startDate\"\r\n                        [max]=\"maxDate\"\r\n                        formControlName=\"endDate\"\r\n                        [matDatepicker]=\"endDatePicker\"\r\n                        [placeholder]=\"filteredDateAndRangeForm.get('endDate')?.value ? (filteredDateAndRangeForm.get('endDate')?.value | date: 'dd/MM/yyyy') : ('Select end date'|translate)\"\r\n                        readonly\r\n                        data-test-id=\"etSelEndDate\">\r\n                      <mat-datepicker #endDatePicker (opened)=\"addCalendarNavigationTestIds()\" data-test-id=\"matEndDatePickerAppointment\"></mat-datepicker>\r\n                      <mat-datepicker-toggle matSuffix [for]=\"endDatePicker\" class=\"datepicker-icon\" data-test-id=\"dpEndDate\">\r\n                        <img matDatepickerToggleIcon src=\"assets/svgs/calendar-date.svg\" alt=\"\" data-test-id=\"imgEndDatePickerIconAppointment\">\r\n                      </mat-datepicker-toggle>\r\n                    </div>\r\n                    <span *ngIf=\"endDateErrorMessage\" class=\"error-message\" data-test-id=\"spanEndDateErrorMessageAppointment\">{{ endDateErrorMessage }}</span>\r\n                  </div>\r\n                </div>\r\n              </form>\r\n            </div>\r\n\r\n            <div class=\"action-buttons\" data-test-id=\"divFilterActionBtnsAppointment\">\r\n              <button mat-button class=\"reset-btn\" (click)=\"resetDate(true); $event.stopPropagation();\" data-test-id=\"btnResetFilterAppointment\">{{ 'Reset'| translate }}</button>\r\n              <button mat-button class=\"apply-btn\" (click)=\"applyDateOrRangeFilter(pluginConfigObs.filterObs.filterDateField); $event.stopPropagation();\" data-test-id=\"btnApplyFilterAppointment\">{{ 'Apply'| translate }}</button>\r\n            </div>\r\n          </mat-menu>\r\n\r\n          <!-- Search -->\r\n          <div class=\"input-group search-bar ml-auto\" (click)=\"$event.stopPropagation();\" data-test-id=\"divSearchAppointment\">\r\n            <input\r\n              type=\"text\"\r\n              #searchInput\r\n              class=\"form-control\"\r\n              placeholder=\"{{ pluginConfigObs.searchPlaceHolder | translate }}\"\r\n              (keyup)=\"applyFilter($event)\"\r\n              (keydown.Space)=\"$event.stopPropagation()\"\r\n              (keydown.Enter)=\"$event.stopPropagation()\"\r\n              data-test-id=\"etSearchAppointmentDashboard\">\r\n            <div class=\"input-group-append\">\r\n              <button\r\n                class=\"btnResetApSerach mat-icon-button\"\r\n                aria-label=\"Reset appointment search\"\r\n                (click)=\"clearFilter(); $event.stopPropagation();\"\r\n                *ngIf=\"isFilterApplied\"\r\n                data-test-id=\"btnResetSearchAppointment\">\r\n                <mat-icon class=\"ml-0\">close</mat-icon>\r\n              </button>\r\n              <span class=\"input-group-text search-icon-span\" data-test-id=\"icoSearchAppointment\">\r\n                <img src=\"assets/svgs/search-icon.svg\" alt=\"\" width=\"20px\" height=\"20px\" data-test-id=\"imgSearchIconAppointment\">\r\n              </span>\r\n            </div>\r\n          </div>\r\n        </div>\r\n      </div>\r\n    </mat-panel-title>\r\n  </mat-expansion-panel-header>\r\n\r\n  <div class=\"mat-elevation-z8\" data-test-id=\"divTableWrapperAppointment\">\r\n    <span *ngIf=\"tableLoader\">\r\n      <ngx-ui-loader \r\n        [loaderId]=\"'table-loader-' + pluginConfigObs.pluginConfigObsFlag\" \r\n        [fgsType]=\"'ball-spin-clockwise'\" \r\n        [fgsColor]=\"'#aba4a4'\" \r\n        [fgsPosition]=\"'center-center'\" \r\n        [fgsSize]=\"50\" \r\n        [overlayColor]=\"'rgb(255, 255, 255)'\" \r\n        [hasProgressBar]=\"false\"\r\n        [text]=\"('Loading'|translate) + ' ' + (pluginConfigObs.pluginConfigObsFlag|translate) + ' ' + ('data'|translate) + '...'\"\r\n        [textColor]=\"'#333'\"\r\n        [textPosition]=\"'center-center'\"\r\n        data-test-id=\"loaderAppointment\"\r\n      ></ngx-ui-loader>\r\n    </span>\r\n    <div class=\"table-container\" id=\"table-container-{{componentId}}\">\r\n      <table mat-table [dataSource]=\"paginatedDataSource\">\r\n\r\n      <ng-container *ngFor=\"let column of displayedAppointmentColumns\" [matColumnDef]=\"column.key\">\r\n        <ng-container *ngIf=\"column.isSortable; else noSort\">\r\n          <th mat-header-cell *matHeaderCellDef (click)=\"handleSort(column.key, 'asc')\" [attr.data-test-id]=\"'th-' + column.key + '-' + pluginConfigObs.pluginConfigObsFlag\" class=\"sortable-header\">\r\n            {{ column.label | translate }}\r\n            <mat-icon class=\"sort-icon\">arrow_upward</mat-icon>\r\n          </th>\r\n        </ng-container>\r\n        <ng-template #noSort>\r\n          <th mat-header-cell *matHeaderCellDef  [attr.data-test-id]=\"'th-' + column.key+ '-' + pluginConfigObs.pluginConfigObsFlag\">\r\n            {{ column.label | translate }}\r\n          </th>\r\n        </ng-template>\r\n\r\n        <td mat-cell *matCellDef=\"let element; let j = index;\"  [attr.data-test-id]=\"'td-' + column.key + '-' + pluginConfigObs.pluginConfigObsFlag + '-' + j\">\r\n          <ng-container *ngIf=\"column.key !== 'patient_name' && column.key !== 'visit_completed'\">\r\n            <div class=\"float-left\" \r\n                [innerHTML]=\"renderHtmlContent(column, element)\" \r\n                [ngClass]=\"getClasses(column, element)\">\r\n            </div>\r\n          </ng-container>\r\n          \r\n          <!-- This is for visit_completed column -->\r\n          <ng-container *ngIf=\"column.key === 'visit_completed'\">\r\n            <div class=\"d-flex align-items-center visit-completed-cell\"   [attr.data-test-id]=\"'td-visit_completed-' + pluginConfigObs.pluginConfigObsFlag + '-' + j\">\r\n              <img src=\"assets/svgs/green-pad.svg\" alt=\"Completed\" class=\"mr-2\" />\r\n              <span class=\"text-success\">\r\n                {{ element.completed }}\r\n              </span>\r\n            </div>\r\n          </ng-container>\r\n\r\n          <!-- Patient Name Column -->\r\n          <ng-container *ngIf=\"column.key === 'patient_name'\">\r\n            <div class=\"d-flex align-items-center\"   [attr.data-test-id]=\"'td-patient_name-' + pluginConfigObs.pluginConfigObsFlag + '-' + j\">\r\n              <img *ngIf=\"element.patientId\" src=\"{{ checkPatientRegField('Profile Photo') ? baseURL + '/personimage/' + element.patientId : '' }}\" alt=\"\" width=\"32px\" height=\"32px\" style=\"border-radius: 50%;\">\r\n              <img *ngIf=\"pluginConfigObs.pluginConfigObsFlag !== 'Appointment'\" src=\"{{ checkPatientRegField('Profile Photo') ? baseURL + '/personimage/' + element.person.uuid : '' }}\" alt=\"\" width=\"32px\" height=\"32px\" style=\"border-radius: 50%;\"  [attr.data-test-id]=\"'td-patient_img-' + pluginConfigObs.pluginConfigObsFlag + '-' + j\">\r\n\r\n              <div class=\"float-left\" \r\n                [innerHTML]=\"renderHtmlContent(column, element)\" \r\n                [ngClass]=\"getClasses(column, element)\">\r\n              </div>\r\n            </div>\r\n          </ng-container>\r\n\r\n          <!-- Telephone Column -->\r\n          <ng-container *ngIf=\"column.key === 'telephone' && element.telephone\">\r\n            <a (click)=\"openWhatsApp($event, element.telephone)\" class=\"float-left icon-btn m-0\" [attr.data-test-id]=\"'linkPatientWhatsApp' + j\">\r\n              <img src=\"assets/svgs/whatsapp-green.svg\" alt=\"WhatsApp\" />\r\n            </a>\r\n          </ng-container>\r\n\r\n          <!-- Actions Column -->\r\n          <ng-container *ngIf=\"column.key === 'actions'\">\r\n            <div class=\"actions-btn-wrap d-flex align-items-center\">\r\n              <button\r\n                *ngFor=\"let action of column.actionButtons; let k = index\"\r\n                [ngStyle]=\"{\r\n                  color: action.style?.color,\r\n                  backgroundColor: action.style?.backgroundColor\r\n                }\"\r\n                class=\"action-btn mr-2\"\r\n                type=\"button\"\r\n                (click)=\"$event.stopPropagation(); handleAction(action, element)\"\r\n                  [attr.data-test-id]=\"'btn-action-' + action.label+'-'+ k\" >\r\n                {{ action.label | translate }}\r\n              </button>\r\n            </div>\r\n          </ng-container>\r\n        </td>\r\n      </ng-container>\r\n    \r\n\r\n      <!-- No Data Row -->\r\n      <tr class=\"mat-row\" *matNoDataRow>\r\n        <td class=\"mat-cell text-center\" [attr.colspan]=\"displayedColumns.length\">\r\n          {{ pluginConfigObs.noRecordFound | translate }}\r\n        </td>\r\n      </tr>\r\n\r\n      <!-- Row Definitions -->\r\n      <tr mat-header-row *matHeaderRowDef=\"displayedColumns\"></tr>\r\n      <tr mat-row *matRowDef=\"let row; let x = index; columns: displayedColumns;\" [attr.data-test-id]=\"'tr' + x\" [routerLink]=\"['/dashboard/visit-summary', row.uuid]\"></tr>\r\n      \r\n      </table>\r\n    </div>\r\n    <mat-paginator \r\n      *ngIf=\"pluginConfigObs?.pluginConfigObsFlag === 'Appointment'\"\r\n      #tempPaginator \r\n      hidePageSize \r\n      [pageSizeOptions]=\"pageSizeOptions\"\r\n      [length]=\"getCurrentTotalCount()\" \r\n      [pageIndex]=\"currentPage\" \r\n      [pageSize]=\"itemsPerPage\"\r\n      [disabled]=\"isPaginationDisabled()\"\r\n      aria-label=\"Select page of periodic elements\">\r\n    </mat-paginator>\r\n    <mat-paginator \r\n      #tempPaginator \r\n      *ngIf=\"pluginConfigObs?.pluginConfigObsFlag !== 'Appointment'\"\r\n      hidePageSize \r\n      [pageSizeOptions]=\"pageSizeOptions\"\r\n      [length]=\"getCurrentTotalCount()\" \r\n      [pageIndex]=\"currentPage\" \r\n      [pageSize]=\"itemsPerPage\" \r\n      [disabled]=\"isPaginationDisabled()\"\r\n      (page)=\"pageEvent = getData($event)\"  \r\n      aria-label=\"Select page of periodic elements\"\r\n      >\r\n    </mat-paginator>\r\n  </div>\r\n</mat-expansion-panel>", styles: [".mat-elevation-z8{box-shadow:none;width:100%;overflow-x:auto}.table-container{max-height:440px;overflow-y:auto;overflow-x:auto}table{width:100%;font-family:DM Sans}th.mat-header-cell{border:none;font-size:14px!important;font-weight:700;color:var(--color-gray);height:21px}th.mat-header-cell,td.mat-cell,td.mat-footer-cell{border:none;min-width:60px;white-space:nowrap;padding-right:24px}th.mat-header-cell span.alert-danger,td.mat-cell span.alert-danger,td.mat-footer-cell span.alert-danger{color:var(--color-red);font-weight:700;background:transparent;border:none}th.mat-header-cell span.alert-success,td.mat-cell span.alert-success,td.mat-footer-cell span.alert-success{color:var(--color-green);font-weight:700;background:transparent;border:none}td.mat-cell{font-size:16px}tr.mat-row,tr.mat-footer-row{height:88px;border-radius:8px;cursor:pointer}tr.mat-row.upcoming{background:#e6fff3!important}tr.mat-row:nth-child(odd){background:#f7f7fa}td:first-child,th:first-child{border-radius:8px 0 0 8px}td:last-child,th:last-child{border-radius:0 8px 8px 0}.actions-btn-wrap .action-btn{outline:none;border:none;height:36px;min-width:102px;padding:6px 8px;background:#fff;border-radius:4px;color:var(--color-black);font-family:DM Sans;font-size:16px}.actions-btn-wrap .blue-btn{background:var(--color-lightGray);color:var(--color-darkBlue)}.actions-btn-wrap .pink-btn{background:var(--color-lightPink);color:var(--color-red)}.mat-expansion-panel .mat-expansion-panel-header.mat-expanded .input-group{display:flex}.input-group{background:var(--color-white);border:1px solid rgba(127,123,146,.5);border-radius:6px;height:46px;align-items:center;max-width:60vw;width:300px;display:none}.input-group .input-group-text{background:none;border:none;cursor:default}.input-group .form-control{border:none;outline:none;background:transparent;font-size:16px;line-height:150%;padding-left:16px}.input-group .form-control:focus{box-shadow:none}.mat-expansion-panel{background:#fff;box-shadow:0 4px 24px #1f1c3a14;border-radius:20px!important;padding:24px;margin-bottom:24px}.mat-expansion-panel .mat-expansion-panel-header{padding:0}.mat-expansion-panel .mat-expansion-panel-header .mat-content{align-items:center}.mat-expansion-panel .mat-expansion-panel-header.mat-expanded{height:48px}.mat-expansion-panel .mat-expansion-panel-header:hover{background:transparent!important}.mat-expansion-panel .intel-accordion-title{display:flex;flex-direction:row;align-items:center;justify-content:flex-start;flex-wrap:wrap;width:100%}.mat-expansion-panel .intel-accordion-title .mat-icon{height:20px;width:20px;font-size:20px;color:#461d90;margin-left:8px}.mat-expansion-panel .intel-accordion-title h6{font-size:18px;font-weight:700;color:#000}.mat-expansion-panel .mat-expansion-panel-content .mat-expansion-panel-body{padding:0;margin-top:24px;position:relative}.mat-expansion-panel .mat-expansion-panel-content .mat-expansion-panel-body:after{content:\"\";position:absolute;top:0;height:1px;left:0;right:0;background:#efe8ff}.anchor-con{position:absolute;top:-120px;left:0}.visit-completed-cell{color:green!important;background-color:#d4edda!important}@media (max-width: 768px){.input-group{width:100%;max-width:100%;margin:10px 0}.mat-expansion-panel .mat-expansion-panel-header,.mat-expansion-panel .mat-expansion-panel-header.mat-expanded{height:fit-content}.info-icon{display:none}.anchor-con{top:-100px}}.matIconButton{border:none;background:transparent}::ng-deep .custom-menu{background:var(--color-white);border-radius:8px!important;padding:16px;width:352px;box-shadow:0 4px 8px #7f7b9229}.mat-expansion-panel.mat-expanded .mat-expansion-panel-header .filter-btn{display:flex!important}.btnResetApSerach{border:none;background:transparent;cursor:pointer;padding:0;margin-right:4px;display:flex;align-items:center;justify-content:center}.btnResetApSerach .mat-icon{font-size:18px;width:18px;height:18px;color:#7f7b92}.btnResetApSerach:hover .mat-icon{color:#2e1e91}.search-icon-span{pointer-events:none}.filter-btn{background:none;align-items:center;border:1px solid rgba(127,123,146,.5);border-radius:6px;color:#2e1e91;font-weight:500;padding:4px 12px;white-space:nowrap;height:46px;display:none;gap:4px}.toggle-buttons{display:flex;justify-content:space-between;margin-bottom:16px;gap:16px}button.mat-button,.action-buttons button.mat-button{flex:1;color:#2e1e91;background:#fff;border-radius:8px;font-family:DM Sans;font-size:14px;font-weight:500;border:1.33px solid #EFE8FF}.action-buttons button.mat-button.reset-btn{font-size:12px;font-weight:700;margin:0 0 0 20px;width:96px}.action-buttons button.mat-button.apply-btn{color:#fff;background:var(--color-darkBlue);font-size:12px;font-weight:700;width:96px}button.mat-button.active{background:#efe8ff;color:#2e1e91}button.mat-button .reset-btn{color:var(--color-darkBlue)}.action-buttons{display:flex;justify-content:space-between;gap:16px}.reset-btn{color:var(--color-darkBlue);background:#f5f5f5;border-radius:8px}.filter-search-container{display:flex;align-items:center;gap:1rem}.form-date{margin-bottom:16px}.input-wrapper{position:relative;display:flex;align-items:center}.input-wrapper .form-control{width:100%;padding-right:40px;border:1px solid rgba(178,175,190,.2);background:transparent;border-radius:8px;height:48px;font-size:16px;color:var(--color-darkestBlue)}.datepicker-icon{position:absolute;right:4px;top:50%;transform:translateY(-50%);cursor:pointer;background:transparent;border:none}.form-control:focus{box-shadow:none}.label-text{font-size:14px;margin-bottom:8px;color:#7f7b92}.userImage{width:32px;height:32px;border-radius:50%}.red-pill{display:flex;flex-direction:row;align-items:center;background:#ffe8e8;border-radius:4px;height:32px;color:#ea315b;padding:4px 6px;width:fit-content}.left{text-align:left}.chip{display:flex;flex-direction:row;align-items:center;border-radius:4px;height:32px;padding:4px 6px;width:fit-content}.chip.green{color:#0fd197}.chip.blue{color:#2e1e91}.chip-item-blue{background:var(--color-lightGray)}.chip-item-green{background:#e6fff3}.error-message{color:#ea315b;font-size:12px;margin-top:4px;display:block;font-family:DM Sans}.error-border{border-color:#ea315b!important}\n"] }]
        }], ctorParameters: function () { return [{ type: i1.AppointmentService }, { type: i2.VisitService }, { type: i3.CoreService }, { type: i4.ToastrService }, { type: i5.TranslateService }, { type: i6.MindmapService }, { type: i7.DomSanitizer }, { type: i8.AppConfigService }, { type: i9.NgxRolesService }, { type: i10.NgxUiLoaderService }, { type: undefined, decorators: [{
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGFibGUtZ3JpZC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9paC1saWJyYXJ5L3NyYy9saWIvY29tcG9uZW50cy90YWJsZS1ncmlkL3RhYmxlLWdyaWQuY29tcG9uZW50LnRzIiwiLi4vLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvaWgtbGlicmFyeS9zcmMvbGliL2NvbXBvbmVudHMvdGFibGUtZ3JpZC90YWJsZS1ncmlkLmNvbXBvbmVudC5odG1sIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsVUFBVSxFQUFVLFNBQVMsRUFBRSxLQUFLLEVBQWlCLHVCQUF1QixFQUFFLE1BQU0sRUFBRSxNQUFNLEVBQUUsWUFBWSxFQUFnQixNQUFNLGVBQWUsQ0FBQztBQUNwSyxPQUFPLEVBQUUsWUFBWSxFQUFhLE1BQU0sNkJBQTZCLENBQUM7QUFFdEUsT0FBTyxFQUFFLGtCQUFrQixFQUFFLE1BQU0sb0NBQW9DLENBQUM7QUFDeEUsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLDhCQUE4QixDQUFDO0FBQzVELE9BQU8sTUFBTSxNQUFNLFFBQVEsQ0FBQztBQUM1QixPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sNkJBQTZCLENBQUM7QUFDMUQsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLFlBQVksQ0FBQztBQUMzQyxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSxxQkFBcUIsQ0FBQztBQUN2RCxPQUFPLEVBQUUsWUFBWSxFQUFFLHdCQUF3QixFQUFFLGdCQUFnQixFQUFFLE1BQU0sK0JBQStCLENBQUM7QUFDekcsT0FBTyxFQUFFLGFBQWEsRUFBRSxTQUFTLEVBQUUsVUFBVSxFQUFFLE1BQU0sdUJBQXVCLENBQUM7QUFDN0UsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLGdDQUFnQyxDQUFDO0FBQ2hFLE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLG1D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RWQsYUFBYTtzQkFBeEMsU0FBUzt1QkFBQyxlQUFlO2dCQUU1QixXQUFXO3NCQURSLFNBQVM7dUJBQUMsZUFBZSxFQUFFLEVBQUUsSUFBSSxFQUFFLFVBQVUsRUFBRTtnQkFHckIsV0FBVztzQkFBckMsU0FBUzt1QkFBQyxjQUFjO2dCQUdBLFVBQVU7c0JBQWxDLFNBQVM7dUJBQUMsWUFBWTtnQkFDTyxlQUFlO3NCQUE1QyxTQUFTO3VCQUFDLGlCQUFpQjtnQkFDQSxhQUFhO3NCQUF4QyxTQUFTO3VCQUFDLGVBQWU7Z0JBQ0QsVUFBVTtzQkFBbEMsU0FBUzt1QkFBQyxZQUFZO2dCQWtCYixlQUFlO3NCQUF4QixNQUFNIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBFbGVtZW50UmVmLCBPbkluaXQsIFZpZXdDaGlsZCwgSW5wdXQsIFNpbXBsZUNoYW5nZXMsIENoYW5nZURldGVjdGlvblN0cmF0ZWd5LCBJbmplY3QsIE91dHB1dCwgRXZlbnRFbWl0dGVyLCBBZnRlclZpZXdJbml0fSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgTWF0UGFnaW5hdG9yLCBQYWdlRXZlbnQgfSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbC9wYWdpbmF0b3InO1xyXG5pbXBvcnQgeyBBcGlSZXNwb25zZU1vZGVsLCBBcHBvaW50bWVudE1vZGVsLCBDdXN0b21FbmNvdW50ZXJNb2RlbCwgQ3VzdG9tT2JzTW9kZWwsIEN1c3RvbVZpc2l0TW9kZWwsIFByb3ZpZGVyQXR0cmlidXRlTW9kZWwsIFJlc2NoZWR1bGVBcHBvaW50bWVudE1vZGFsUmVzcG9uc2VNb2RlbCwgUGF0aWVudFZpc2l0U3VtbWFyeUNvbmZpZ01vZGVsIH0gZnJvbSAnLi4vLi4vbW9kZWwvbW9kZWwnO1xyXG5pbXBvcnQgeyBBcHBvaW50bWVudFNlcnZpY2UgfSBmcm9tICcuLi8uLi9zZXJ2aWNlcy9hcHBvaW50bWVudC5zZXJ2aWNlJztcclxuaW1wb3J0IHsgVmlzaXRTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vc2VydmljZXMvdmlzaXQuc2VydmljZSc7XHJcbmltcG9ydCBtb21lbnQgZnJvbSAnbW9tZW50JztcclxuaW1wb3J0IHsgQ29yZVNlcnZpY2UgfSBmcm9tICcuLi8uLi9zZXJ2aWNlcy9jb3JlLnNlcnZpY2UnO1xyXG5pbXBvcnQgeyBUb2FzdHJTZXJ2aWNlIH0gZnJvbSAnbmd4LXRvYXN0cic7XHJcbmltcG9ydCB7IFRyYW5zbGF0ZVNlcnZpY2UgfSBmcm9tICdAbmd4LXRyYW5zbGF0ZS9jb3JlJztcclxuaW1wb3J0IHsgZ2V0Q2FjaGVEYXRhLCBjaGVja0lmRGF0ZU9sZFRoYW5PbmVEYXksIGlzRmVhdHVyZVByZXNlbnQgfSBmcm9tICcuLi8uLi91dGlscy91dGlsaXR5LWZ1bmN0aW9ucyc7XHJcbmltcG9ydCB7IGRvY3RvckRldGFpbHMsIGxhbmd1YWdlcywgdmlzaXRUeXBlcyB9IGZyb20gJy4uLy4uL2NvbmZpZy9jb25zdGFudCc7XHJcbmltcG9ydCB7IE1pbmRtYXBTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vc2VydmljZXMvbWluZG1hcC5zZXJ2aWNlJztcclxuaW1wb3J0IHsgQXBwQ29uZmlnU2VydmljZSB9IGZyb20gJy4uLy4uL3NlcnZpY2VzL2FwcC1jb25maWcuc2VydmljZSc7XHJcbmltcG9ydCB7IEZvcm1Db250cm9sLCBGb3JtR3JvdXAsIFZhbGlkYXRvcnMgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XHJcbmltcG9ydCB7IE1hdE1lbnVUcmlnZ2VyIH0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwvbWVudSc7XHJcbmltcG9ydCB7IERvbVNhbml0aXplciB9IGZyb20gJ0Bhbmd1bGFyL3BsYXRmb3JtLWJyb3dzZXInO1xyXG5pbXBvcnQgeyBOZ3hSb2xlc1NlcnZpY2UgfSBmcm9tICduZ3gtcGVybWlzc2lvbnMnO1xyXG5pbXBvcnQgeyBOZ3hVaUxvYWRlclNlcnZpY2UgfSBmcm9tICduZ3gtdWktbG9hZGVyJztcclxuXHJcbkBDb21wb25lbnQoe1xyXG4gIHNlbGVjdG9yOiAnbGliLXRhYmxlLWdyaWQnLFxyXG4gIHRlbXBsYXRlVXJsOiAnLi90YWJsZS1ncmlkLmNvbXBvbmVudC5odG1sJyxcclxuICBzdHlsZVVybHM6IFsnLi90YWJsZS1ncmlkLmNvbXBvbmVudC5zY3NzJ10sXHJcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2hcclxufSlcclxuZXhwb3J0IGNsYXNzIFRhYmxlR3JpZENvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCwgQWZ0ZXJWaWV3SW5pdCB7XHJcbiAgXHJcbiAgLy8gQ29uc3RhbnRzXHJcbiAgcHJpdmF0ZSBzdGF0aWMgcmVhZG9ubHkgREVGQVVMVF9QQUdFX1NJWkVfT1BUSU9OUyA9IFs1LCAxMCwgMjAsIDI1XTtcclxuICBwcml2YXRlIHN0YXRpYyByZWFkb25seSBBUFBPSU5UTUVOVF9QQUdFX1NJWkUgPSA1O1xyXG4gIHByaXZhdGUgc3RhdGljIHJlYWRvbmx5IFNQRUNJQUxJWkFUSU9OX1VVSUQgPSAnZWQxNzE1ZjUtOTNlMi00MDRlLWIzYzktMmEyZDk2MDBmMDYyJztcclxuICBwcml2YXRlIHN0YXRpYyByZWFkb25seSBURUxFUEhPTkVfQVRUUklCVVRFX0lEID0gODtcclxuICBwcml2YXRlIHN0YXRpYyByZWFkb25seSBGT0xMT1dfVVBfQ09OQ0VQVF9JRCA9IDE2MzM0NTtcclxuICBwcml2YXRlIHN0YXRpYyByZWFkb25seSBDSElFRl9DT01QTEFJTlRfQ09OQ0VQVF9JRCA9IDE2MzIxMjtcclxuICBcclxuICBASW5wdXQoKSBwbHVnaW5Db25maWdPYnM6IGFueTtcclxuICBkaXNwbGF5ZWRBcHBvaW50bWVudENvbHVtbnM6IGFueSA9IFtdO1xyXG4gIGRpc3BsYXllZENvbHVtbnM6IHN0cmluZ1tdID0gW107XHJcbiAgZGF0YVNvdXJjZTogYW55W10gPSBbXTtcclxuICBmaWx0ZXJlZERhdGFTb3VyY2U6IGFueVtdID0gW107XHJcbiAgcGFnaW5hdGVkRGF0YVNvdXJjZTogYW55W10gPSBbXTtcclxuICBwYXRpZW50UmVnRmllbGRzOiBzdHJpbmdbXSA9IFtdO1xyXG4gIGlzTUNDVXNlciA9IGZhbHNlO1xyXG4gIHBhZ2VTaXplT3B0aW9ucyA9IFRhYmxlR3JpZENvbXBvbmVudC5ERUZBVUxUX1BBR0VfU0laRV9PUFRJT05TO1xyXG4gIFxyXG4gIC8vIFVuaXF1ZSBjb21wb25lbnQgaW5zdGFuY2UgSURcclxuICBjb21wb25lbnRJZDogc3RyaW5nO1xyXG4gIFxyXG4gIC8vIEBWaWV3Q2hpbGQoTWF0UGFnaW5hdG9yKSBwYWdpbmF0b3I6IE1hdFBhZ2luYXRvcjtcclxuICBAVmlld0NoaWxkKCdzZWFyY2hJbnB1dCcsIHsgc3RhdGljOiB0cnVlIH0pIHNlYXJjaEVsZW1lbnQ6IEVsZW1lbnRSZWY7XHJcbiAgZmlsdGVyZWREYXRlQW5kUmFuZ2VGb3JtOiBGb3JtR3JvdXA7XHJcbiAgQFZpZXdDaGlsZCgndGVtcFBhZ2luYXRvcicpIHRlbXBQYWdpbmF0b3I6IE1hdFBhZ2luYXRvcjtcclxuICBAVmlld0NoaWxkKCd0ZW1wUGFnaW5hdG9yJywgeyByZWFkOiBFbGVtZW50UmVmIH0pXHJcbnBhZ2luYXRvckVsITogRWxlbWVudFJlZjxIVE1MRWxlbWVudD47XHJcblxyXG4gIEBWaWV3Q2hpbGQoTWF0TWVudVRyaWdnZXIpIG1lbnVUcmlnZ2VyOiBNYXRNZW51VHJpZ2dlcjtcclxuICBcclxuICAvLyBEYXRlIHBpY2tlciBWaWV3Q2hpbGQgcmVmZXJlbmNlc1xyXG4gIEBWaWV3Q2hpbGQoJ2RhdGVQaWNrZXInKSBkYXRlUGlja2VyOiBhbnk7XHJcbiAgQFZpZXdDaGlsZCgnc3RhcnREYXRlUGlja2VyJykgc3RhcnREYXRlUGlja2VyOiBhbnk7XHJcbiAgQFZpZXdDaGlsZCgnZW5kRGF0ZVBpY2tlcicpIGVuZERhdGVQaWNrZXI6IGFueTtcclxuICBAVmlld0NoaWxkKCdmaWx0ZXJNZW51JykgZmlsdGVyTWVudTogYW55O1xyXG5cclxuXHJcbiAgcGFuZWxFeHBhbmRlZDogYm9vbGVhbiA9IHRydWU7XHJcbiAgbW9kZTogJ2RhdGUnIHwgJ3JhbmdlJyA9ICdkYXRlJztcclxuICBtYXhEYXRlOiBEYXRlO1xyXG4gIGRhdGVFcnJvck1lc3NhZ2U6IHN0cmluZyA9ICcnO1xyXG4gIHN0YXJ0RGF0ZUVycm9yTWVzc2FnZTogc3RyaW5nID0gJyc7XHJcbiAgZW5kRGF0ZUVycm9yTWVzc2FnZTogc3RyaW5nID0gJyc7XHJcblxyXG4gIGFwcG9pbnRtZW50czogQXBwb2ludG1lbnRNb2RlbFtdID0gW107XHJcbiAgcHJpb3JpdHlWaXNpdHM6IEN1c3RvbVZpc2l0TW9kZWxbXSA9IFtdO1xyXG4gIGF3YWl0aW5nVmlzaXRzOiBDdXN0b21WaXNpdE1vZGVsW10gPSBbXTtcclxuICBpblByb2dyZXNzVmlzaXRzOiBDdXN0b21WaXNpdE1vZGVsW10gPSBbXTtcclxuICBjb21wbGV0ZWRWaXNpdHM6IEN1c3RvbVZpc2l0TW9kZWxbXSA9IFtdO1xyXG4gIGZvbGxvd1VwVmlzaXRzOiBDdXN0b21WaXNpdE1vZGVsW10gPSBbXTtcclxuXHJcbiAgc3BlY2lhbGl6YXRpb246IHN0cmluZyA9ICcnO1xyXG4gIEBPdXRwdXQoKSB2aXNpdHNDb3VudERhdGUgPSBuZXcgRXZlbnRFbWl0dGVyPGFueT4oKTtcclxuICBwYWdlSW5kZXg6IG51bWJlciA9IDA7XHJcbiAgcGFnZVNpemU6IG51bWJlciA9IDA7XHJcbiAgcGFnZUV2ZW50OiBQYWdlRXZlbnQ7XHJcbiAgcmVjb3Jkc0ZldGNoZWQ6IG51bWJlciA9IDA7XHJcbiAgdG90YWxSZWNvcmRzOiBudW1iZXIgPSAwO1xyXG4gIFxyXG4gIGlzRmlsdGVyQXBwbGllZCA9IGZhbHNlO1xyXG4gIHB2czogUGF0aWVudFZpc2l0U3VtbWFyeUNvbmZpZ01vZGVsO1xyXG4gIGJhc2VVUkw6IGFueTtcclxuICBpc0JyYW5kTmFtZTogc3RyaW5nO1xyXG5cclxuICAvLyB0byBhcHBseSBmaWx0ZXIgd2l0aCBkYXRlIGFuZCB0ZXh0IHNlYXJjaFxyXG4gIGRhdGVGaWVsZDogc3RyaW5nO1xyXG4gIGRhdGVGaWx0ZXI6IHN0cmluZztcclxuICBvcmlnaW5hbERhdGE6IGFueVtdO1xyXG4gIGZpbHRlcmVkRGF0YUFmdGVyRGF0ZTogYW55W107XHJcbiAgdGFibGVMb2FkZXI6IGJvb2xlYW47XHJcbiAgXHJcbiAgLy8gQ3VzdG9tIHBhZ2luYXRpb24gcHJvcGVydGllc1xyXG4gIGN1cnJlbnRQYWdlOiBudW1iZXIgPSAwO1xyXG4gIGl0ZW1zUGVyUGFnZTogbnVtYmVyID0gMDtcclxuICBzZWFyY2hUZXJtOiBzdHJpbmcgPSAnJztcclxuICBjdXJyZW50RGF0ZUZpbHRlcjogYW55ID0gbnVsbDtcclxuICBcclxuICAvLyBGaWx0ZXJlZCBkYXRhIHByb3BlcnRpZXNcclxuICBmaWx0ZXJlZFRvdGFsQ291bnQ6IG51bWJlciA9IDA7XHJcbiAgaXNGaWx0ZXJBY3RpdmU6IGJvb2xlYW4gPSBmYWxzZTtcclxuICBwYWdpbmF0aW9uRGlzYWJsZWQ6IGJvb2xlYW4gPSBmYWxzZTtcclxuXHJcblxyXG5uZ0FmdGVyVmlld0luaXQoKTogdm9pZCB7XHJcbiAgLy8gV2FpdCBmb3IgdGhlIHBhZ2luYXRvciB0byBiZSBmdWxseSBpbml0aWFsaXplZFxyXG4gIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgaWYgKHRoaXMucGFnaW5hdG9yRWwgJiYgdGhpcy5wYWdpbmF0b3JFbC5uYXRpdmVFbGVtZW50KSB7XHJcbiAgICAgIGNvbnN0IGVsID0gdGhpcy5wYWdpbmF0b3JFbC5uYXRpdmVFbGVtZW50O1xyXG4gICAgICBjb25zdCBzdWZmaXggPSB0aGlzLnBsdWdpbkNvbmZpZ09icz8ucGx1Z2luQ29uZmlnT2JzRmxhZyB8fCAnJztcclxuXHJcbiAgICAgIGVsLnF1ZXJ5U2VsZWN0b3IoJy5tYXQtcGFnaW5hdG9yLW5hdmlnYXRpb24tbmV4dCcpXHJcbiAgICAgICAgPy5zZXRBdHRyaWJ1dGUoJ2RhdGEtdGVzdC1pZCcsIGBwYWdpbmF0b3ItbmV4dC0ke3N1ZmZpeH1gKTtcclxuXHJcbiAgICAgIGVsLnF1ZXJ5U2VsZWN0b3IoJy5tYXQtcGFnaW5hdG9yLW5hdmlnYXRpb24tcHJldmlvdXMnKVxyXG4gICAgICAgID8uc2V0QXR0cmlidXRlKCdkYXRhLXRlc3QtaWQnLCBgcGFnaW5hdG9yLXByZXYtJHtzdWZmaXh9YCk7XHJcblxyXG4gICAgICBlbC5xdWVyeVNlbGVjdG9yKCcubWF0LXBhZ2luYXRvci1uYXZpZ2F0aW9uLWZpcnN0JylcclxuICAgICAgICA/LnNldEF0dHJpYnV0ZSgnZGF0YS10ZXN0LWlkJywgYHBhZ2luYXRvci1maXJzdC0ke3N1ZmZpeH1gKTtcclxuXHJcbiAgICAgIGVsLnF1ZXJ5U2VsZWN0b3IoJy5tYXQtcGFnaW5hdG9yLW5hdmlnYXRpb24tbGFzdCcpXHJcbiAgICAgICAgPy5zZXRBdHRyaWJ1dGUoJ2RhdGEtdGVzdC1pZCcsIGBwYWdpbmF0b3ItbGFzdC0ke3N1ZmZpeH1gKTtcclxuXHJcbiAgICAgIGVsLnF1ZXJ5U2VsZWN0b3IoJy5tYXQtcGFnaW5hdG9yLXJhbmdlLWxhYmVsJylcclxuICAgICAgICA/LnNldEF0dHJpYnV0ZSgnZGF0YS10ZXN0LWlkJywgYHBhZ2luYXRvci1yYW5nZS1sYWJlbC0ke3N1ZmZpeH1gKTtcclxuICAgIH1cclxuICB9LCAxMDApO1xyXG59XHJcbiAgY29uc3RydWN0b3IoXHJcbiAgICBwcml2YXRlIGFwcG9pbnRtZW50U2VydmljZTogQXBwb2ludG1lbnRTZXJ2aWNlLFxyXG4gICAgcHJpdmF0ZSB2aXNpdFNlcnZpY2U6IFZpc2l0U2VydmljZSxcclxuICAgIHByaXZhdGUgY29yZVNlcnZpY2U6IENvcmVTZXJ2aWNlLFxyXG4gICAgcHJpdmF0ZSB0b2FzdHI6IFRvYXN0clNlcnZpY2UsXHJcbiAgICBwcml2YXRlIHRyYW5zbGF0ZVNlcnZpY2U6IFRyYW5zbGF0ZVNlcnZpY2UsXHJcbiAgICBwcml2YXRlIG1pbmRtYXBTZXJ2aWNlOiBNaW5kbWFwU2VydmljZSxcclxuICAgIHByaXZhdGUgc2FuaXRpemVyOiBEb21TYW5pdGl6ZXIsXHJcbiAgICBwcml2YXRlIGFwcENvbmZpZ1NlcnZpY2U6IEFwcENvbmZpZ1NlcnZpY2UsXHJcbiAgICBwcml2YXRlIHJvbGVzU2VydmljZTogTmd4Um9sZXNTZXJ2aWNlLFxyXG4gICAgcHJpdmF0ZSBuZ3hMb2FkZXI6IE5neFVpTG9hZGVyU2VydmljZSxcclxuICAgIEBJbmplY3QoJ2Vudmlyb25tZW50JykgZW52aXJvbm1lbnRcclxuICApIHsgXHJcbiAgICAvLyBHZW5lcmF0ZSB1bmlxdWUgY29tcG9uZW50IElEXHJcbiAgICB0aGlzLmNvbXBvbmVudElkID0gJ3RhYmxlLWdyaWQtJyArIE1hdGgucmFuZG9tKCkudG9TdHJpbmcoMzYpLnN1YnN0cigyLCA5KTtcclxuICAgIFxyXG4gICAgdGhpcy50YWJsZUxvYWRlciA9IGlzRmVhdHVyZVByZXNlbnQoZW52aXJvbm1lbnQuZmVhdHVyZUxpc3QsICd0YWJsZUxvYWRlcicpO1xyXG4gICAgdGhpcy5iYXNlVVJMID0gZW52aXJvbm1lbnQuYmFzZVVSTDtcclxuICAgIHRoaXMucGFnZVNpemUgPSBlbnZpcm9ubWVudC5yZWNvcmRzUGVyUGFnZTtcclxuICAgIHRoaXMuaXRlbXNQZXJQYWdlID0gZW52aXJvbm1lbnQucmVjb3Jkc1BlclBhZ2U7XHJcbiAgICB0aGlzLmZpbHRlcmVkRGF0ZUFuZFJhbmdlRm9ybSA9IHRoaXMuY3JlYXRlRmlsdGVyZWREYXRlUmFuZ2VGb3JtKCk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBDcmVhdGVzIGEgZmlsdGVyZWQgZGF0ZSByYW5nZSBmb3JtIHdpdGggcmVxdWlyZWQgZGF0ZSBmaWVsZHNcclxuICAgKiBAcmV0dXJuIHtGb3JtR3JvdXB9IC0gVGhlIGNyZWF0ZWQgZm9ybSBncm91cFxyXG4gICAqL1xyXG4gIGNyZWF0ZUZpbHRlcmVkRGF0ZVJhbmdlRm9ybSgpOiBGb3JtR3JvdXAge1xyXG4gICAgcmV0dXJuIG5ldyBGb3JtR3JvdXAoe1xyXG4gICAgICBkYXRlOiBuZXcgRm9ybUNvbnRyb2woJycsIFtWYWxpZGF0b3JzLnJlcXVpcmVkXSksXHJcbiAgICAgIHN0YXJ0RGF0ZTogbmV3IEZvcm1Db250cm9sKG51bGwsIFZhbGlkYXRvcnMucmVxdWlyZWQpLFxyXG4gICAgICBlbmREYXRlOiBuZXcgRm9ybUNvbnRyb2wobnVsbCwgVmFsaWRhdG9ycy5yZXF1aXJlZCksXHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEluaXRpYWxpemUgY29tcG9uZW50LXNwZWNpZmljIHN0YXRlIHRvIHByZXZlbnQgY29uZmxpY3RzIGJldHdlZW4gbXVsdGlwbGUgaW5zdGFuY2VzXHJcbiAgICovXHJcbiAgcHJpdmF0ZSBpbml0aWFsaXplQ29tcG9uZW50U3RhdGUoKTogdm9pZCB7XHJcbiAgICAvLyBSZXNldCBhbGwgY29tcG9uZW50LXNwZWNpZmljIGFycmF5cyBhbmQgb2JqZWN0c1xyXG4gICAgdGhpcy5hcHBvaW50bWVudHMgPSBbXTtcclxuICAgIHRoaXMucHJpb3JpdHlWaXNpdHMgPSBbXTtcclxuICAgIHRoaXMuYXdhaXRpbmdWaXNpdHMgPSBbXTtcclxuICAgIHRoaXMuaW5Qcm9ncmVzc1Zpc2l0cyA9IFtdO1xyXG4gICAgdGhpcy5jb21wbGV0ZWRWaXNpdHMgPSBbXTtcclxuICAgIHRoaXMuZm9sbG93VXBWaXNpdHMgPSBbXTtcclxuICAgIFxyXG4gICAgLy8gUmVzZXQgcGFnaW5hdGlvbiBzdGF0ZVxyXG4gICAgdGhpcy5wYWdlSW5kZXggPSAwO1xyXG4gICAgdGhpcy5yZWNvcmRzRmV0Y2hlZCA9IDA7XHJcbiAgICB0aGlzLnRvdGFsUmVjb3JkcyA9IDA7XHJcbiAgICBcclxuICAgIC8vIFJlc2V0IGZpbHRlciBzdGF0ZVxyXG4gICAgdGhpcy5pc0ZpbHRlckFwcGxpZWQgPSBmYWxzZTtcclxuICAgIHRoaXMuaXNGaWx0ZXJBY3RpdmUgPSBmYWxzZTtcclxuICAgIHRoaXMuZmlsdGVyZWRUb3RhbENvdW50ID0gMDtcclxuICAgIHRoaXMucGFnaW5hdGlvbkRpc2FibGVkID0gZmFsc2U7XHJcbiAgICB0aGlzLm9yaWdpbmFsRGF0YSA9IFtdO1xyXG4gICAgdGhpcy5maWx0ZXJlZERhdGFBZnRlckRhdGUgPSBbXTtcclxuICAgIFxyXG4gICAgLy8gUmVzZXQgZGF0YSBhcnJheXMgZm9yIHRoaXMgaW5zdGFuY2VcclxuICAgIHRoaXMuZGF0YVNvdXJjZSA9IFtdO1xyXG4gICAgdGhpcy5maWx0ZXJlZERhdGFTb3VyY2UgPSBbXTtcclxuICAgIHRoaXMucGFnaW5hdGVkRGF0YVNvdXJjZSA9IFtdO1xyXG4gICAgdGhpcy5jdXJyZW50UGFnZSA9IDA7XHJcbiAgICB0aGlzLnNlYXJjaFRlcm0gPSAnJztcclxuICAgIHRoaXMuY3VycmVudERhdGVGaWx0ZXIgPSBudWxsO1xyXG4gICBcclxuICAgIGlmKHRoaXMucGx1Z2luQ29uZmlnT2JzPy5wbHVnaW5Db25maWdPYnNGbGFnID09PSAnQXBwb2ludG1lbnQnKXtcclxuICAgICAgdGhpcy5wYWdlU2l6ZSA9IFRhYmxlR3JpZENvbXBvbmVudC5BUFBPSU5UTUVOVF9QQUdFX1NJWkU7XHJcbiAgICAgIHRoaXMuaXRlbXNQZXJQYWdlID0gVGFibGVHcmlkQ29tcG9uZW50LkFQUE9JTlRNRU5UX1BBR0VfU0laRTtcclxuICAgICAgY29uc29sZS5sb2coJ2l0ZW1zUGVyUGFnZScsIHRoaXMuaXRlbXNQZXJQYWdlKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEFwcGx5IGN1c3RvbSBwYWdpbmF0aW9uIHRvIHRoZSBmaWx0ZXJlZCBkYXRhXHJcbiAgICovXHJcbiAgcHJpdmF0ZSBhcHBseVBhZ2luYXRpb24oKTogdm9pZCB7XHJcbiAgICBjb25zdCBzdGFydEluZGV4ID0gdGhpcy5jdXJyZW50UGFnZSAqIHRoaXMuaXRlbXNQZXJQYWdlO1xyXG4gICAgY29uc3QgZW5kSW5kZXggPSBzdGFydEluZGV4ICsgdGhpcy5pdGVtc1BlclBhZ2U7XHJcbiAgICB0aGlzLnBhZ2luYXRlZERhdGFTb3VyY2UgPSB0aGlzLmZpbHRlcmVkRGF0YVNvdXJjZS5zbGljZShzdGFydEluZGV4LCBlbmRJbmRleCk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBDYWxjdWxhdGUgcGFnaW5hdGlvbiBpbmRpY2VzXHJcbiAgICovXHJcbiAgcHJpdmF0ZSBnZXRQYWdpbmF0aW9uSW5kaWNlcygpOiB7IHN0YXJ0SW5kZXg6IG51bWJlcjsgZW5kSW5kZXg6IG51bWJlciB9IHtcclxuICAgIHJldHVybiB7XHJcbiAgICAgIHN0YXJ0SW5kZXg6IHRoaXMuY3VycmVudFBhZ2UgKiB0aGlzLml0ZW1zUGVyUGFnZSxcclxuICAgICAgZW5kSW5kZXg6ICh0aGlzLmN1cnJlbnRQYWdlICsgMSkgKiB0aGlzLml0ZW1zUGVyUGFnZVxyXG4gICAgfTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFJlc3RvcmUgY3VycmVudCBwYWdlIGRhdGEgZnJvbSBvcmlnaW5hbCBkYXRhXHJcbiAgICovXHJcbiAgcHJpdmF0ZSByZXN0b3JlQ3VycmVudFBhZ2VEYXRhKCk6IHZvaWQge1xyXG4gICAgY29uc3QgeyBzdGFydEluZGV4LCBlbmRJbmRleCB9ID0gdGhpcy5nZXRQYWdpbmF0aW9uSW5kaWNlcygpO1xyXG4gICAgdGhpcy5wYWdpbmF0ZWREYXRhU291cmNlID0gdGhpcy5vcmlnaW5hbERhdGEuc2xpY2Uoc3RhcnRJbmRleCwgZW5kSW5kZXgpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogQXBwbHkgc2VhcmNoIGZpbHRlciB0byB0aGUgY3VycmVudCBwYWdlIGRhdGEgb25seVxyXG4gICAqL1xyXG4gIHByaXZhdGUgYXBwbHlTZWFyY2hGaWx0ZXIoKTogdm9pZCB7XHJcbiAgICBpZiAoIXRoaXMuc2VhcmNoVGVybS50cmltKCkpIHtcclxuICAgICAgdGhpcy5yZXN0b3JlQ3VycmVudFBhZ2VEYXRhKCk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBjb25zdCBzZWFyY2hMb3dlciA9IHRoaXMuc2VhcmNoVGVybS50b0xvd2VyQ2FzZSgpO1xyXG4gICAgICB0aGlzLnBhZ2luYXRlZERhdGFTb3VyY2UgPSB0aGlzLnBhZ2luYXRlZERhdGFTb3VyY2UuZmlsdGVyKChpdGVtOiBhbnkpID0+IFxyXG4gICAgICAgIHRoaXMubWF0Y2hlc1NlYXJjaFRlcm0oaXRlbSwgc2VhcmNoTG93ZXIpXHJcbiAgICAgICk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBHZXQgZm9ybWF0dGVkIGRhdGUgZm9yIGFuIGl0ZW0gYmFzZWQgb24gdGhlIGRhdGUgZmllbGRcclxuICAgKi9cclxuICBwcml2YXRlIGdldEl0ZW1EYXRlKGl0ZW06IGFueSwgZGF0ZUZpZWxkOiBzdHJpbmcpOiBzdHJpbmcge1xyXG4gICAgaWYgKGRhdGVGaWVsZCA9PT0gJ2ZvbGxvd1VwJykge1xyXG4gICAgICByZXR1cm4gdGhpcy5mb3JtYXREYXRlKHRoaXMuY29udmVydFRvSVNPKGl0ZW0uZm9sbG93VXApKTtcclxuICAgIH0gZWxzZSBpZiAoZGF0ZUZpZWxkID09PSAnc2xvdEpzRGF0ZScpIHtcclxuICAgICAgcmV0dXJuIHRoaXMuZm9ybWF0RGF0ZShpdGVtW2RhdGVGaWVsZF0pO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgcmV0dXJuIGl0ZW1bZGF0ZUZpZWxkXS5pbmNsdWRlcygnLCcpID8gdGhpcy5mb3JtYXREYXRlKGl0ZW1bZGF0ZUZpZWxkXSkgOiB0aGlzLmNvbnZlcnRUb0RhdGUoaXRlbVtkYXRlRmllbGRdKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIENoZWNrIGlmIGl0ZW0gbWF0Y2hlcyBzZWFyY2ggdGVybVxyXG4gICAqL1xyXG4gIHByaXZhdGUgbWF0Y2hlc1NlYXJjaFRlcm0oaXRlbTogYW55LCBzZWFyY2hMb3dlcjogc3RyaW5nKTogYm9vbGVhbiB7XHJcbiAgICBpZiAodGhpcy5wbHVnaW5Db25maWdPYnM/LnBsdWdpbkNvbmZpZ09ic0ZsYWcgPT09ICdBcHBvaW50bWVudCcpIHtcclxuICAgICAgcmV0dXJuIChcclxuICAgICAgICBpdGVtPy5vcGVuTXJzSWQ/LnRvTG93ZXJDYXNlKCkuaW5jbHVkZXMoc2VhcmNoTG93ZXIpIHx8XHJcbiAgICAgICAgaXRlbT8ucGF0aWVudE5hbWU/LnRvTG93ZXJDYXNlKCkuaW5jbHVkZXMoc2VhcmNoTG93ZXIpIHx8XHJcbiAgICAgICAgaXRlbT8uVE1IX3BhdGllbnRfaWQ/LnRvTG93ZXJDYXNlKCkuaW5jbHVkZXMoc2VhcmNoTG93ZXIpXHJcbiAgICAgICk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICByZXR1cm4gKFxyXG4gICAgICAgIGl0ZW0/LnBhdGllbnQ/LmlkZW50aWZpZXI/LnRvTG93ZXJDYXNlKCkuaW5jbHVkZXMoc2VhcmNoTG93ZXIpIHx8XHJcbiAgICAgICAgaXRlbT8ucGF0aWVudF9uYW1lPy5naXZlbl9uYW1lPy50b0xvd2VyQ2FzZSgpLmluY2x1ZGVzKHNlYXJjaExvd2VyKSB8fFxyXG4gICAgICAgIGl0ZW0/LnBhdGllbnRfbmFtZT8uZmFtaWx5X25hbWU/LnRvTG93ZXJDYXNlKCkuaW5jbHVkZXMoc2VhcmNoTG93ZXIpXHJcbiAgICAgICk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBBcHBseSBtdWx0aXBsZSBmaWx0ZXJzIGVmZmljaWVudGx5XHJcbiAgICovXHJcbiAgcHJpdmF0ZSBhcHBseUZpbHRlcnMoKTogdm9pZCB7XHJcbiAgICAvLyBDaGVjayBpZiBhbnkgZmlsdGVycyBhcmUgYWN0aXZlXHJcbiAgICB0aGlzLmlzRmlsdGVyQWN0aXZlID0gISEodGhpcy5zZWFyY2hUZXJtLnRyaW0oKSB8fCB0aGlzLmN1cnJlbnREYXRlRmlsdGVyKTtcclxuICAgIHRoaXMucGFnaW5hdGlvbkRpc2FibGVkID0gdGhpcy5pc0ZpbHRlckFjdGl2ZTtcclxuICAgIFxyXG4gICAgLy8gSWYgbm8gc2VhcmNoIHRlcm0gYW5kIG5vIGRhdGUgZmlsdGVyLCByZXN0b3JlIGN1cnJlbnQgcGFnZSBkYXRhXHJcbiAgICBpZiAoIXRoaXMuaXNGaWx0ZXJBY3RpdmUpIHtcclxuICAgICAgdGhpcy5yZXN0b3JlQ3VycmVudFBhZ2VEYXRhKCk7XHJcbiAgICAgIHRoaXMudXBkYXRlUGFnaW5hdG9yTGVuZ3RoKCk7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuICAgIFxyXG4gICAgLy8gQWx3YXlzIHN0YXJ0IHdpdGggY3VycmVudCBwYWdlIGRhdGEgZnJvbSBvcmlnaW5hbCBkYXRhIHdoZW4gYXBwbHlpbmcgZmlsdGVyc1xyXG4gICAgY29uc3QgeyBzdGFydEluZGV4LCBlbmRJbmRleCB9ID0gdGhpcy5nZXRQYWdpbmF0aW9uSW5kaWNlcygpO1xyXG4gICAgbGV0IGZpbHRlcmVkRGF0YSA9IHRoaXMub3JpZ2luYWxEYXRhLnNsaWNlKHN0YXJ0SW5kZXgsIGVuZEluZGV4KTtcclxuICAgIFxyXG4gICAgLy8gQXBwbHkgZGF0ZSBmaWx0ZXJcclxuICAgIGlmICh0aGlzLmN1cnJlbnREYXRlRmlsdGVyKSB7XHJcbiAgICAgIGNvbnN0IHsgZGF0ZUZpZWxkLCBmaWx0ZXJWYWx1ZSwgaXNSYW5nZSwgc3RhcnREYXRlLCBlbmREYXRlIH0gPSB0aGlzLmN1cnJlbnREYXRlRmlsdGVyO1xyXG4gICAgICBmaWx0ZXJlZERhdGEgPSBmaWx0ZXJlZERhdGEuZmlsdGVyKChpdGVtOiBhbnkpID0+IHtcclxuICAgICAgICBjb25zdCBpdGVtRGF0ZSA9IHRoaXMuZ2V0SXRlbURhdGUoaXRlbSwgZGF0ZUZpZWxkKTtcclxuICAgICAgICBcclxuICAgICAgICBpZiAoaXNSYW5nZSAmJiBzdGFydERhdGUgJiYgZW5kRGF0ZSkge1xyXG4gICAgICAgICAgcmV0dXJuIGl0ZW1EYXRlID49IHN0YXJ0RGF0ZSAmJiBpdGVtRGF0ZSA8PSBlbmREYXRlO1xyXG4gICAgICAgIH0gZWxzZSBpZiAoZmlsdGVyVmFsdWUpIHtcclxuICAgICAgICAgIHJldHVybiBpdGVtRGF0ZSA9PT0gZmlsdGVyVmFsdWU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICB9KTtcclxuICAgIH1cclxuICAgIFxyXG4gICAgLy8gQXBwbHkgc2VhcmNoIGZpbHRlclxyXG4gICAgaWYgKHRoaXMuc2VhcmNoVGVybS50cmltKCkpIHtcclxuICAgICAgY29uc3Qgc2VhcmNoTG93ZXIgPSB0aGlzLnNlYXJjaFRlcm0udG9Mb3dlckNhc2UoKTtcclxuICAgICAgZmlsdGVyZWREYXRhID0gZmlsdGVyZWREYXRhLmZpbHRlcigoaXRlbTogYW55KSA9PiB0aGlzLm1hdGNoZXNTZWFyY2hUZXJtKGl0ZW0sIHNlYXJjaExvd2VyKSk7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIC8vIFVwZGF0ZSBmaWx0ZXJlZCBjb3VudCBmb3IgY3VycmVudCBwYWdlXHJcbiAgICB0aGlzLmZpbHRlcmVkVG90YWxDb3VudCA9IGZpbHRlcmVkRGF0YS5sZW5ndGg7XHJcbiAgICB0aGlzLnBhZ2luYXRlZERhdGFTb3VyY2UgPSBmaWx0ZXJlZERhdGE7XHJcbiAgICBcclxuICAgIC8vIFVwZGF0ZSBwYWdpbmF0b3IgbGVuZ3RoXHJcbiAgICB0aGlzLnVwZGF0ZVBhZ2luYXRvckxlbmd0aCgpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogVXBkYXRlIHBhZ2luYXRvciBsZW5ndGggYmFzZWQgb24gZmlsdGVyIHN0YXRlXHJcbiAgICovXHJcbiAgcHJpdmF0ZSB1cGRhdGVQYWdpbmF0b3JMZW5ndGgoKTogdm9pZCB7XHJcbiAgICBpZiAodGhpcy50ZW1wUGFnaW5hdG9yKSB7XHJcbiAgICAgIHRoaXMudGVtcFBhZ2luYXRvci5sZW5ndGggPSB0aGlzLmlzRmlsdGVyQWN0aXZlID8gdGhpcy5maWx0ZXJlZFRvdGFsQ291bnQgOiB0aGlzLnRvdGFsUmVjb3JkcztcclxuICAgIH1cclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIENoZWNrIGlmIHBhZ2luYXRpb24gc2hvdWxkIGJlIGRpc2FibGVkXHJcbiAgICovXHJcbiAgcHVibGljIGlzUGFnaW5hdGlvbkRpc2FibGVkKCk6IGJvb2xlYW4ge1xyXG4gICAgcmV0dXJuIHRoaXMuaXNGaWx0ZXJBY3RpdmUgfHwgdGhpcy5wYWdpbmF0aW9uRGlzYWJsZWQ7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBHZXQgdGhlIGN1cnJlbnQgdG90YWwgY291bnQgKGZpbHRlcmVkIG9yIG9yaWdpbmFsKVxyXG4gICAqL1xyXG4gIHB1YmxpYyBnZXRDdXJyZW50VG90YWxDb3VudCgpOiBudW1iZXIge1xyXG4gICAgcmV0dXJuIHRoaXMuaXNGaWx0ZXJBY3RpdmUgPyB0aGlzLmZpbHRlcmVkVG90YWxDb3VudCA6IHRoaXMudG90YWxSZWNvcmRzO1xyXG4gIH1cclxuXHJcbiAgbmdPbkluaXQoKTogdm9pZCB7XHJcbiAgICB0aGlzLmlzTUNDVXNlciA9ICEhdGhpcy5yb2xlc1NlcnZpY2UuZ2V0Um9sZSgnT1JHQU5JWkFUSU9OQUw6TUNDJyk7XHJcbiAgICBcclxuICAgIC8vIEluaXRpYWxpemUgY29tcG9uZW50LXNwZWNpZmljIHN0YXRlXHJcbiAgICB0aGlzLmluaXRpYWxpemVDb21wb25lbnRTdGF0ZSgpO1xyXG5cclxuICAgIHRoaXMuYXBwQ29uZmlnU2VydmljZS5sb2FkKCkudGhlbigoKSA9PiB7XHJcbiAgICB0aGlzLmRpc3BsYXllZENvbHVtbnMgPSB0aGlzLmRpc3BsYXllZENvbHVtbnMuZmlsdGVyKGNvbD0+KGNvbCE9PSdhZ2UnIHx8IHRoaXMuY2hlY2tQYXRpZW50UmVnRmllbGQoJ0FnZScpKSk7XHJcbiAgICAgIE9iamVjdC5rZXlzKHRoaXMuYXBwQ29uZmlnU2VydmljZS5wYXRpZW50X3JlZ2lzdHJhdGlvbikuZm9yRWFjaChvYmo9PntcclxuICAgICAgICB0aGlzLnBhdGllbnRSZWdGaWVsZHMucHVzaCguLi50aGlzLmFwcENvbmZpZ1NlcnZpY2UucGF0aWVudF9yZWdpc3RyYXRpb25bb2JqXS5maWx0ZXIoKGU6IHsgaXNfZW5hYmxlZDogYW55OyB9KT0+ZS5pc19lbmFibGVkKS5tYXAoKGU6IHsgbmFtZTogYW55OyB9KT0+ZS5uYW1lKSk7XHJcbiAgICAgIH0pO1xyXG4gICAgICB0aGlzLnB2cyA9IHsgLi4udGhpcy5hcHBDb25maWdTZXJ2aWNlLnBhdGllbnRfdmlzaXRfc3VtbWFyeSB9OyBcclxuICAgICAgdGhpcy5wdnMuYXBwb2ludG1lbnRfYnV0dG9uID0gdGhpcy5wdnMuYXBwb2ludG1lbnRfYnV0dG9uO1xyXG4gICAgICB0aGlzLmRpc3BsYXllZENvbHVtbnMgPSB0aGlzLmRpc3BsYXllZENvbHVtbnMuZmlsdGVyKGNvbD0+IHtcclxuICAgICAgICBpZihjb2wgPT09ICdkck5hbWUnICYmICF0aGlzLmlzTUNDVXNlcikgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIGlmKGNvbCA9PT0gJ2FnZScpIHJldHVybiB0aGlzLmNoZWNrUGF0aWVudFJlZ0ZpZWxkKCdBZ2UnKTtcclxuICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgfSk7XHJcblxyXG4gICAgICBpZighdGhpcy5wdnMuYXdhaXRpbmdfdmlzaXRzX3BhdGllbnRfdHlwZV9kZW1hcmNhdGlvbil7XHJcbiAgICAgICAgdGhpcy5kaXNwbGF5ZWRDb2x1bW5zID0gdGhpcy5kaXNwbGF5ZWRDb2x1bW5zLmZpbHRlcihjb2w9Pihjb2whPT0ncGF0aWVudF90eXBlJykpO1xyXG4gICAgICB9XHJcbiAgICB9KS5jYXRjaCgoZXJyb3IpID0+IHtcclxuICAgICAgY29uc29sZS5lcnJvcignRXJyb3IgbG9hZGluZyBhcHAgY29uZmlnJywgZXJyb3IpO1xyXG4gICAgfSk7XHJcblxyXG4gICAgdGhpcy50cmFuc2xhdGVTZXJ2aWNlLnVzZShnZXRDYWNoZURhdGEoZmFsc2UsIGxhbmd1YWdlcy5TRUxFQ1RFRF9MQU5HVUFHRSkpO1xyXG4gICAgbGV0IHByb3ZpZGVyID0gZ2V0Q2FjaGVEYXRhKHRydWUsIGRvY3RvckRldGFpbHMuUFJPVklERVIpO1xyXG4gICAgaWYgKHByb3ZpZGVyKSB7XHJcbiAgICAgIGlmIChwcm92aWRlci5hdHRyaWJ1dGVzLmxlbmd0aCkge1xyXG4gICAgICAgIHRoaXMuc3BlY2lhbGl6YXRpb24gPSB0aGlzLmdldFNwZWNpYWxpemF0aW9uKHByb3ZpZGVyLmF0dHJpYnV0ZXMpO1xyXG4gICAgICB9XHJcbiAgICAgIGlmKHRoaXMucGx1Z2luQ29uZmlnT2JzPy5wbHVnaW5Db25maWdPYnNGbGFnID09PSBcIkFwcG9pbnRtZW50XCIpe1xyXG4gICAgICAgIHRoaXMuZ2V0QXBwb2ludG1lbnRzKCk7XHJcbiAgICAgIH1cclxuICAgICAgaWYodGhpcy5wbHVnaW5Db25maWdPYnM/LnBsdWdpbkNvbmZpZ09ic0ZsYWcgPT09IFwiQXdhaXRpbmdcIil7XHJcbiAgICAgICAgdGhpcy5nZXRBd2FpdGluZ1Zpc2l0cygxKTtcclxuICAgICAgfVxyXG4gICAgICBpZih0aGlzLnBsdWdpbkNvbmZpZ09icz8ucGx1Z2luQ29uZmlnT2JzRmxhZyA9PT0gXCJQcmlvcml0eVwiKXtcclxuICAgICAgICB0aGlzLmdldFByaW9yaXR5VmlzaXRzKDEpO1xyXG4gICAgICB9XHJcbiAgICAgIGlmKHRoaXMucGx1Z2luQ29uZmlnT2JzPy5wbHVnaW5Db25maWdPYnNGbGFnID09PSBcIkluUHJvZ3Jlc3NcIil7XHJcbiAgICAgICAgdGhpcy5nZXRJblByb2dyZXNzVmlzaXRzKDEpO1xyXG4gICAgICB9XHJcbiAgICAgIGlmKHRoaXMucGx1Z2luQ29uZmlnT2JzPy5wbHVnaW5Db25maWdPYnNGbGFnID09PSBcIkNvbXBsZXRlZFwiKXtcclxuICAgICAgICB0aGlzLmdldENvbXBsZXRlZFZpc2l0cygxKTtcclxuICAgICAgfWlmKHRoaXMucGx1Z2luQ29uZmlnT2JzPy5wbHVnaW5Db25maWdPYnNGbGFnID09PSBcIkZvbGxvd1VwXCIpe1xyXG4gICAgICAgIHRoaXMuZ2V0Rm9sbG93VXBWaXNpdCgxKTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gICAgdGhpcy5tYXhEYXRlID0gdGhpcy5wbHVnaW5Db25maWdPYnMuZmlsdGVyT2JzLmZpbHRlckRhdGVNYXg7XHJcbiAgICBpZih0aGlzLnBsdWdpbkNvbmZpZ09icy5oYXNPd25Qcm9wZXJ0eShcInBhZ2VTaXplT3B0aW9uc1wiKSl7XHJcbiAgICAgIHRoaXMucGFnZVNpemVPcHRpb25zID0gdGhpcy5wbHVnaW5Db25maWdPYnMucGFnZVNpemVPcHRpb25zXHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBEeW5tYWljIGxhYmVsIERpc3BsYXlcclxuICAgKiBAcGFyYW0gY2hhbmdlcyBwbHVnaW5Db25maWdPYnMgXHJcbiAgICovXHJcbiAgbmdPbkNoYW5nZXMoY2hhbmdlczogU2ltcGxlQ2hhbmdlcyk6IHZvaWQge1xyXG4gICAgaWYgKGNoYW5nZXNbXCJwbHVnaW5Db25maWdPYnNcIl0gJiYgY2hhbmdlc1tcInBsdWdpbkNvbmZpZ09ic1wiXS5jdXJyZW50VmFsdWUpIHtcclxuICAgICAgdGhpcy5kaXNwbGF5ZWRBcHBvaW50bWVudENvbHVtbnMgPSBbLi4uY2hhbmdlc1tcInBsdWdpbkNvbmZpZ09ic1wiXS5jdXJyZW50VmFsdWU/LnRhYmxlQ29sdW1uc11cclxuICAgICAgdGhpcy5kaXNwbGF5ZWRDb2x1bW5zID0gdGhpcy5kaXNwbGF5ZWRBcHBvaW50bWVudENvbHVtbnMubWFwKGNvbHVtbiA9PiBjb2x1bW4ua2V5KTtcclxuICAgIH1cclxuICAgIGlmKCAoIWNoYW5nZXNbJ3BsdWdpbkNvbmZpZ09icyddLmZpcnN0Q2hhbmdlKSAmJiB0aGlzLnBsdWdpbkNvbmZpZ09icy5wbHVnaW5Db25maWdPYnNGbGFnID09IFwiQXBwb2ludG1lbnRcIiAmJiBjaGFuZ2VzW1wicGx1Z2luQ29uZmlnT2JzXCJdLmN1cnJlbnRWYWx1ZT8udGFibGVIZWFkZXIgIT09IGNoYW5nZXNbXCJwbHVnaW5Db25maWdPYnNcIl0ucHJldmlvdXNWYWx1ZT8udGFibGVIZWFkZXIpe1xyXG4gICAgICB0aGlzLnBhZ2VTaXplID0gVGFibGVHcmlkQ29tcG9uZW50LkFQUE9JTlRNRU5UX1BBR0VfU0laRTtcclxuICAgICAgdGhpcy5pdGVtc1BlclBhZ2UgPSBUYWJsZUdyaWRDb21wb25lbnQuQVBQT0lOVE1FTlRfUEFHRV9TSVpFO1xyXG4gICAgICB0aGlzLmdldEFwcG9pbnRtZW50cygpO1xyXG4gICAgfVxyXG4gICAgY29uc3QgcHJldiA9IGNoYW5nZXNbJ3BsdWdpbkNvbmZpZ09icyddLnByZXZpb3VzVmFsdWU7XHJcbiAgICBjb25zdCBjdXJyID0gY2hhbmdlc1sncGx1Z2luQ29uZmlnT2JzJ10uY3VycmVudFZhbHVlO1xyXG4gICAgY29uc3QgcHJldlR5cGUgPSBwcmV2Py5maWx0ZXI/LmZpbHRlclR5cGU7XHJcbiAgICBjb25zdCBjdXJyVHlwZSA9IGN1cnI/LmZpbHRlcj8uZmlsdGVyVHlwZTtcclxuICAgIGlmICggcHJldlR5cGUgIT09IGN1cnJUeXBlKSB7XHJcbiAgICAgIHRoaXMucmVzZXREYXRlRm9ybSgpOyAvLyBSZXNldCBvbmx5IHdoZW4gdHlwZSBoYXMgY2hhbmdlZFxyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgKiBSZXNldCB0aGUgZGF0ZSBmb3IgYXBwb2ludG1lbnRzKFRvZGF5J3MsdXBjb21pbmcscGVuZGluZyBhcHBvaW5tZW50cykgIGdcclxuICAqL1xyXG4gIHJlc2V0RGF0ZUZvcm0oKSB7XHJcbiAgICBpZiAodGhpcy5maWx0ZXJlZERhdGVBbmRSYW5nZUZvcm0pIHtcclxuICAgICAgdGhpcy5maWx0ZXJlZERhdGVBbmRSYW5nZUZvcm0ucmVzZXQoe1xyXG4gICAgICAgIGRhdGU6IG51bGwsXHJcbiAgICAgICAgc3RhcnREYXRlOiBudWxsLFxyXG4gICAgICAgIGVuZERhdGU6IG51bGxcclxuICAgICAgfSk7XHJcbiAgICB9XHJcbiAgICB0aGlzLm1vZGUgPSAnZGF0ZSc7IFxyXG4gICAgaWYgKHRoaXMuc2VhcmNoRWxlbWVudCAmJiB0aGlzLnNlYXJjaEVsZW1lbnQubmF0aXZlRWxlbWVudCkge1xyXG4gICAgICB0aGlzLnNlYXJjaEVsZW1lbnQubmF0aXZlRWxlbWVudC52YWx1ZSA9IFwiXCI7XHJcbiAgICB9XHJcbiAgICB0aGlzLmlzRmlsdGVyQXBwbGllZCA9IGZhbHNlO1xyXG4gICAgdGhpcy5kYXRhU291cmNlLmZpbHRlciA9IG51bGw7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAqIFJldHJlaXZlIHRoZSBjaGllZiBjb21wbGFpbnRzIGZvciB0aGUgdmlzaXRcclxuICAqIEBwYXJhbSB7Q3VzdG9tVmlzaXRNb2RlbH0gdmlzaXQgLSBWaXNpdFxyXG4gICogQHJldHVybiB7c3RyaW5nW119IC0gQ2hpZWYgY29tcGxhaW50cyBhcnJheVxyXG4gICovXHJcbiAgZ2V0Q2hlaWZDb21wbGFpbnQodmlzaXQ6IEN1c3RvbVZpc2l0TW9kZWwpOiBzdHJpbmdbXSB7XHJcbiAgICBsZXQgcmVjZW50OiBzdHJpbmdbXSA9IFtdO1xyXG4gICAgY29uc3QgZW5jb3VudGVycyA9IHZpc2l0LmVuY291bnRlcnM7XHJcbiAgICBlbmNvdW50ZXJzLmZvckVhY2goKGVuY291bnRlcjogQ3VzdG9tRW5jb3VudGVyTW9kZWwpID0+IHtcclxuICAgICAgY29uc3QgZGlzcGxheSA9IGVuY291bnRlci50eXBlPy5uYW1lO1xyXG4gICAgICBpZiAoZGlzcGxheS5tYXRjaCh2aXNpdFR5cGVzLkFEVUxUSU5JVElBTCkgIT09IG51bGwpIHtcclxuICAgICAgICBjb25zdCBvYnMgPSBlbmNvdW50ZXIub2JzO1xyXG4gICAgICAgIG9icy5mb3JFYWNoKChjdXJyZW50T2JzOiBDdXN0b21PYnNNb2RlbCkgPT4ge1xyXG4gICAgICAgICAgaWYgKGN1cnJlbnRPYnMuY29uY2VwdF9pZCA9PSBUYWJsZUdyaWRDb21wb25lbnQuQ0hJRUZfQ09NUExBSU5UX0NPTkNFUFRfSUQpIHtcclxuICAgICAgICAgICAgY29uc3QgY3VycmVudENvbXBsYWludCA9IHRoaXMudmlzaXRTZXJ2aWNlLmdldERhdGEyKGN1cnJlbnRPYnMpPy52YWx1ZV90ZXh0LnJlcGxhY2UobmV3IFJlZ0V4cCgn4pa6JywgJ2cnKSwgJycpLnNwbGl0KCc8Yj4nKTtcclxuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDE7IGkgPCBjdXJyZW50Q29tcGxhaW50Lmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgY29uc3Qgb2JzMSA9IGN1cnJlbnRDb21wbGFpbnRbaV0uc3BsaXQoJzwnKTtcclxuICAgICAgICAgICAgICBpZiAoIW9iczFbMF0ubWF0Y2godmlzaXRUeXBlcy5BU1NPQ0lBVEVEX1NZTVBUT01TKSkge1xyXG4gICAgICAgICAgICAgICAgcmVjZW50LnB1c2gob2JzMVswXSk7XHJcbiAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG4gICAgcmV0dXJuIHJlY2VudDtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICogQ2hlY2sgaG93IG9sZCB0aGUgZGF0ZSBpcyBmcm9tIG5vd1xyXG4gICogQHBhcmFtIHtzdHJpbmd9IGRhdGEgLSBEYXRlIGluIHN0cmluZyBmb3JtYXRcclxuICAqIEByZXR1cm4ge3N0cmluZ30gLSBSZXR1cm5zIGhvdyBvbGQgdGhlIGRhdGUgaXMgZnJvbSBub3dcclxuICAqL1xyXG4gIGNoZWNrSWZEYXRlT2xkVGhhbk9uZURheShkYXRhOiBzdHJpbmcpIHtcclxuICAgIGxldCBob3VycyA9IG1vbWVudChkYXRhKS5kaWZmKG1vbWVudCgpLCAnaG91cnMnKTtcclxuICAgIGxldCBtaW51dGVzID0gbW9tZW50KGRhdGEpLmRpZmYobW9tZW50KCksICdtaW51dGVzJyk7XHJcbiAgICBpZihob3VycyA+IDI0KSB7XHJcbiAgICAgIHJldHVybiBtb21lbnQoZGF0YSkuZm9ybWF0KCdERCBNTU0sIFlZWVkgaGg6bW0gQScpO1xyXG4gICAgfTtcclxuICAgIGlmIChob3VycyA8IDEpIHtcclxuICAgICAgaWYobWludXRlcyA8IDApIHJldHVybiBgRHVlIDogJHttb21lbnQoZGF0YSkuZm9ybWF0KCdERCBNTU0sIFlZWVkgaGg6bW0gQScpfWA7XHJcbiAgICAgIHJldHVybiBgJHttaW51dGVzfSBtaW51dGVzYDtcclxuICAgIH1cclxuICAgIHJldHVybiBgJHtob3Vyc30gaHJzYDtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICogUmVzY2hlZHVsZSBhcHBvaW50bWVudFxyXG4gICogQHBhcmFtIHtBcHBvaW50bWVudE1vZGVsfSBhcHBvaW50bWVudCAtIEFwcG9pbnRtZW50IHRvIGJlIHJlc2NoZWR1bGVkXHJcbiAgKiBAcGFyYW0ge2Jvb2xlYW59IGlzVmFsaWRhdGlvblJlcXVpcmVkIC0gSWYgdHJ1ZSwgdmFsaWRhdGlvbiBpcyByZXF1aXJlZFxyXG4gICogQHJldHVybiB7dm9pZH1cclxuICAqL1xyXG4gIHJlc2NoZWR1bGUoYXBwb2ludG1lbnQ6IEFwcG9pbnRtZW50TW9kZWwsIGlzVmFsaWRhdGlvblJlcXVpcmVkOiBib29sZWFuKSB7XHJcbiAgICBjb25zdCBsZW4gPSBhcHBvaW50bWVudC52aXNpdC5lbmNvdW50ZXJzLmZpbHRlcigoZTogQ3VzdG9tRW5jb3VudGVyTW9kZWwpID0+IHtcclxuICAgICAgcmV0dXJuIChlLnR5cGUubmFtZSA9PSB2aXNpdFR5cGVzLlBBVElFTlRfRVhJVF9TVVJWRVkgfHwgZS50eXBlLm5hbWUgPT0gdmlzaXRUeXBlcy5WSVNJVF9DT01QTEVURSk7XHJcbiAgICB9KS5sZW5ndGg7XHJcbiAgICBjb25zdCBpc0NvbXBsZXRlZCA9IEJvb2xlYW4obGVuKTtcclxuICAgIGlmIChpc0NvbXBsZXRlZCkge1xyXG4gICAgICB0aGlzLnRvYXN0ci5lcnJvcih0aGlzLnRyYW5zbGF0ZVNlcnZpY2UuaW5zdGFudChcIlZpc2l0IGlzIGFscmVhZHkgY29tcGxldGVkLCBpdCBjYW4ndCBiZSByZXNjaGVkdWxlZC5cIiksIHRoaXMudHJhbnNsYXRlU2VydmljZS5pbnN0YW50KCdSZXNjaGVkdWxpbmcgZmFpbGVkIScpKTtcclxuICAgIH0gZWxzZSBpZihhcHBvaW50bWVudC52aXNpdFN0YXR1cyA9PSAnVmlzaXQgSW4gUHJvZ3Jlc3MnICYmIGlzVmFsaWRhdGlvblJlcXVpcmVkKSB7XHJcbiAgICAgIHRoaXMudG9hc3RyLmVycm9yKHRoaXMudHJhbnNsYXRlU2VydmljZS5pbnN0YW50KFwiVmlzaXQgaXMgaW4gcHJvZ3Jlc3MsIGl0IGNhbid0IGJlIHJlc2NoZWR1bGVkLlwiKSwgdGhpcy50cmFuc2xhdGVTZXJ2aWNlLmluc3RhbnQoJ1Jlc2NoZWR1bGluZyBmYWlsZWQhJykpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdGhpcy5jb3JlU2VydmljZS5vcGVuUmVzY2hlZHVsZUFwcG9pbnRtZW50TW9kYWwoYXBwb2ludG1lbnQpLnN1YnNjcmliZSgocmVzOiBSZXNjaGVkdWxlQXBwb2ludG1lbnRNb2RhbFJlc3BvbnNlTW9kZWwpID0+IHtcclxuICAgICAgICBpZiAocmVzKSB7XHJcbiAgICAgICAgICBsZXQgbmV3U2xvdCA9IHJlcztcclxuICAgICAgICAgIHRoaXMuY29yZVNlcnZpY2Uub3BlblJlc2NoZWR1bGVBcHBvaW50bWVudENvbmZpcm1Nb2RhbCh7IGFwcG9pbnRtZW50LCBuZXdTbG90IH0pLnN1YnNjcmliZSgocmVzdWx0OiBib29sZWFuKSA9PiB7XHJcbiAgICAgICAgICAgIGlmIChyZXN1bHQpIHtcclxuICAgICAgICAgICAgICBhcHBvaW50bWVudC5hcHBvaW50bWVudElkID0gYXBwb2ludG1lbnQuaWQ7XHJcbiAgICAgICAgICAgICAgYXBwb2ludG1lbnQuc2xvdERhdGUgPSBtb21lbnQobmV3U2xvdC5kYXRlLCBcIllZWVktTU0tRERcIikuZm9ybWF0KCdERC9NTS9ZWVlZJyk7XHJcbiAgICAgICAgICAgICAgYXBwb2ludG1lbnQuc2xvdFRpbWUgPSBuZXdTbG90LnNsb3Q7XHJcbiAgICAgICAgICAgICAgdGhpcy5hcHBvaW50bWVudFNlcnZpY2UucmVzY2hlZHVsZUFwcG9pbnRtZW50KGFwcG9pbnRtZW50KS5zdWJzY3JpYmUoKHJlczogQXBpUmVzcG9uc2VNb2RlbCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgY29uc3QgbWVzc2FnZSA9IHJlcy5tZXNzYWdlO1xyXG4gICAgICAgICAgICAgICAgaWYgKHJlcy5zdGF0dXMpIHtcclxuICAgICAgICAgICAgICAgICAgdGhpcy5taW5kbWFwU2VydmljZS5ub3RpZnlId0ZvclJlc2NoZWR1bGVBcHBvaW50bWVudChhcHBvaW50bWVudCk7XHJcbiAgICAgICAgICAgICAgICAgIHRoaXMuZ2V0QXBwb2ludG1lbnRzKCk7XHJcbiAgICAgICAgICAgICAgICAgIHRoaXMudG9hc3RyLnN1Y2Nlc3ModGhpcy50cmFuc2xhdGVTZXJ2aWNlLmluc3RhbnQoXCJUaGUgYXBwb2ludG1lbnQgaGFzIGJlZW4gcmVzY2hlZHVsZWQgc3VjY2Vzc2Z1bGx5IVwiKSwgdGhpcy50cmFuc2xhdGVTZXJ2aWNlLmluc3RhbnQoJ1Jlc2NoZWR1bGluZyBzdWNjZXNzZnVsIScpKTtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgIHRoaXMudG9hc3RyLnN1Y2Nlc3MobWVzc2FnZSwgdGhpcy50cmFuc2xhdGVTZXJ2aWNlLmluc3RhbnQoJ1Jlc2NoZWR1bGluZyBmYWlsZWQhJykpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICAgIH0pO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgKiBDYW5jZWwgYXBwb2ludG1lbnRcclxuICAqIEBwYXJhbSB7QXBwb2ludG1lbnRNb2RlbH0gYXBwb2ludG1lbnQgLSBBcHBvaW50bWVudCB0byBiZSByZXNjaGVkdWxlZFxyXG4gICogQHBhcmFtIHtib29sZWFufSBpc1ZhbGlkYXRpb25SZXF1aXJlZCAtIElmIHRydWUsIHZhbGlkYXRpb24gaXMgcmVxdWlyZWRcclxuICAqIEByZXR1cm4ge3ZvaWR9XHJcbiAgKi9cclxuICBjYW5jZWwoYXBwb2ludG1lbnQ6IEFwcG9pbnRtZW50TW9kZWwsIGlzVmFsaWRhdGlvblJlcXVpcmVkOiBib29sZWFuKSB7XHJcbiAgICBpZiAoYXBwb2ludG1lbnQudmlzaXRTdGF0dXMgPT0gJ1Zpc2l0IEluIFByb2dyZXNzJyAmJiBpc1ZhbGlkYXRpb25SZXF1aXJlZCkge1xyXG4gICAgICB0aGlzLnRvYXN0ci5lcnJvcih0aGlzLnRyYW5zbGF0ZVNlcnZpY2UuaW5zdGFudChcIlZpc2l0IGlzIGluIHByb2dyZXNzLCBpdCBjYW4ndCBiZSBjYW5jZWxsZWQuXCIpLCB0aGlzLnRyYW5zbGF0ZVNlcnZpY2UuaW5zdGFudCgnQ2FuY2VsaW5nIGZhaWxlZCEnKSk7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuICAgIHRoaXMuY29yZVNlcnZpY2Uub3BlbkNvbmZpcm1DYW5jZWxBcHBvaW50bWVudE1vZGFsKGFwcG9pbnRtZW50KS5zdWJzY3JpYmUoKHJlczogYm9vbGVhbikgPT4ge1xyXG4gICAgICBpZiAocmVzKSB7XHJcbiAgICAgICAgdGhpcy50b2FzdHIuc3VjY2Vzcyh0aGlzLnRyYW5zbGF0ZVNlcnZpY2UuaW5zdGFudCgnVGhlIEFwcG9pbnRtZW50IGhhcyBiZWVuIHN1Y2Nlc3NmdWxseSBjYW5jZWxlZC4nKSx0aGlzLnRyYW5zbGF0ZVNlcnZpY2UuaW5zdGFudCgnQ2FuY2VsaW5nIHN1Y2Nlc3NmdWwnKSk7XHJcbiAgICAgICAgdGhpcy5nZXRBcHBvaW50bWVudHMoKTtcclxuICAgICAgfVxyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAqIEdldCB1c2VyIHV1aWQgZnJvbSBsb2NhbHN0b3JhZ2UgdXNlclxyXG4gICogQHJldHVybiB7c3RyaW5nfSAtIFVzZXIgdXVpZFxyXG4gICovXHJcbiAgZ2V0IHVzZXJJZCgpOiBzdHJpbmcge1xyXG4gICAgcmV0dXJuIGdldENhY2hlRGF0YSh0cnVlLCBkb2N0b3JEZXRhaWxzLlVTRVIpLnV1aWQ7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAqIEFwcGx5IGZpbHRlciBvbiBhIGRhdGFzb3VyY2VcclxuICAqIEBwYXJhbSB7RXZlbnR9IGV2ZW50IC0gSW5wdXQncyBjaGFuZ2UgZXZlbnRcclxuICAqIEByZXR1cm4ge3ZvaWR9XHJcbiAgKi9cclxuICBhcHBseUZpbHRlcihldmVudDogRXZlbnQpOiB2b2lkIHtcclxuICAgIHRoaXMuc2VhcmNoVGVybSA9IChldmVudC50YXJnZXQgYXMgSFRNTElucHV0RWxlbWVudCkudmFsdWUudHJpbSgpO1xyXG4gICAgdGhpcy5pc0ZpbHRlckFwcGxpZWQgPSB0aGlzLnNlYXJjaFRlcm0ubGVuZ3RoID4gMDtcclxuICAgIHRoaXMuYXBwbHlGaWx0ZXJzKCk7XHJcbiAgfVxyXG5cclxuICAvLyBDYWxsIHRoaXMgb25jZSBhZnRlciBsb2FkaW5nIGFwcG9pbnRtZW50c1xyXG4gIHN0b3JlT3JpZ2luYWxEYXRhKG9yaWdpbmFsRGF0YT86IGFueVtdKSB7XHJcbiAgICB0aGlzLm9yaWdpbmFsRGF0YSA9IG9yaWdpbmFsRGF0YT8gWy4uLm9yaWdpbmFsRGF0YV06IFsuLi50aGlzLmRhdGFTb3VyY2VdOyAvLyBCYWNrdXAgZnVsbCBkYXRhXHJcbiAgICB0aGlzLmFwcGx5RmlsdGVycygpOyAvLyBBcHBseSBhbnkgZXhpc3RpbmcgZmlsdGVyc1xyXG4gIH1cclxuICAvKipcclxuICAqIENsZWFyIGZpbHRlciBmcm9tIGN1cnJlbnQgcGFnZSBkYXRhXHJcbiAgKiBAcmV0dXJuIHt2b2lkfVxyXG4gICovXHJcbiAgY2xlYXJGaWx0ZXIoKTogdm9pZCB7XHJcbiAgICB0aGlzLnNlYXJjaFRlcm0gPSAnJztcclxuICAgIHRoaXMuY3VycmVudERhdGVGaWx0ZXIgPSBudWxsO1xyXG4gICAgdGhpcy5pc0ZpbHRlckFwcGxpZWQgPSBmYWxzZTtcclxuICAgIHRoaXMuaXNGaWx0ZXJBY3RpdmUgPSBmYWxzZTtcclxuICAgIHRoaXMuZmlsdGVyZWRUb3RhbENvdW50ID0gMDtcclxuICAgIHRoaXMucGFnaW5hdGlvbkRpc2FibGVkID0gZmFsc2U7XHJcbiAgICBcclxuICAgIGlmICh0aGlzLnNlYXJjaEVsZW1lbnQ/Lm5hdGl2ZUVsZW1lbnQpIHtcclxuICAgICAgdGhpcy5zZWFyY2hFbGVtZW50Lm5hdGl2ZUVsZW1lbnQudmFsdWUgPSBcIlwiO1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICB0aGlzLmZpbHRlcmVkRGF0ZUFuZFJhbmdlRm9ybS5yZXNldCh7XHJcbiAgICAgIGRhdGU6IG51bGwsXHJcbiAgICAgIHN0YXJ0RGF0ZTogbnVsbCxcclxuICAgICAgZW5kRGF0ZTogbnVsbFxyXG4gICAgfSk7XHJcbiAgICBcclxuICAgIHRoaXMubW9kZSA9ICdkYXRlJztcclxuICAgIHRoaXMucmVzdG9yZUN1cnJlbnRQYWdlRGF0YSgpO1xyXG4gICAgdGhpcy51cGRhdGVQYWdpbmF0b3JMZW5ndGgoKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIENoZWNrcyBpZiB0aGUgZmllbGQgaXMgaW4gcGF0aWVudCByZWdpc3RyYXRpb24gZmllbGRzXHJcbiAgICogQHBhcmFtIHtzdHJpbmd9IGZpZWxkTmFtZSAtIFRoZSBmaWVsZCBuYW1lXHJcbiAgICogQHJldHVybiB7Ym9vbGVhbn0gLSBUcnVlIGlmIHByZXNlbnQsIGVsc2UgZmFsc2VcclxuICAgKi9cclxuICBjaGVja1BhdGllbnRSZWdGaWVsZChmaWVsZE5hbWU6IHN0cmluZyk6IGJvb2xlYW4ge1xyXG4gICAgcmV0dXJuIHRoaXMucGF0aWVudFJlZ0ZpZWxkcy5pbmRleE9mKGZpZWxkTmFtZSkgIT09IC0xO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgKiBSZXR1cm5zIHRoZSBXaGF0c0FwcCBsaW5rIGZvciBhIGdpdmVuIHRlbGVwaG9uZSBudW1iZXJcclxuICAqIEBwYXJhbSB7c3RyaW5nfSB0ZWxlcGhvbmVOdW1iZXIgLSBUaGUgdGVsZXBob25lIG51bWJlciB0byBnZW5lcmF0ZSB0aGUgbGluayBmb3JcclxuICAqIEByZXR1cm4ge3N0cmluZ30gLSBUaGUgV2hhdHNBcHAgbGlua1xyXG4gICovXHJcbiAgZ2V0V2hhdHNBcHBMaW5rKHRlbGVwaG9uZU51bWJlcjogc3RyaW5nKTogc3RyaW5nIHtcclxuICAgIHJldHVybiB0aGlzLnZpc2l0U2VydmljZS5nZXRXaGF0c2FwcExpbmsodGVsZXBob25lTnVtYmVyKTtcclxuICB9XHJcbiAgXHJcbiAgLyoqXHJcbiAgICogUmV0cmlldmVzIHRoZSB0ZWxlcGhvbmUgbnVtYmVyIGZyb20gdGhlIHBlcnNvbidzIGF0dHJpYnV0ZXNcclxuICAgKiBAcGFyYW0ge0FwcG9pbnRtZW50TW9kZWxbJ3Zpc2l0J11bJ3BlcnNvbiddfSBwZXJzb24gLSBUaGUgcGVyc29uIG9iamVjdCBjb250YWluaW5nIGF0dHJpYnV0ZXNcclxuICAgKiBAcmV0dXJuIHtzdHJpbmcgfCB1bmRlZmluZWR9IC0gVGhlIHBlcnNvbidzIHRlbGVwaG9uZSBudW1iZXIgb3IgdW5kZWZpbmVkIGlmIG5vdCBmb3VuZFxyXG4gICAqL1xyXG4gIGdldFRlbGVwaG9uZU51bWJlcihwZXJzb246IEFwcG9pbnRtZW50TW9kZWxbJ3Zpc2l0J11bJ3BlcnNvbiddKSB7XHJcbiAgICByZXR1cm4gcGVyc29uPy5wZXJzb25fYXR0cmlidXRlLmZpbmQoKHY6IHsgcGVyc29uX2F0dHJpYnV0ZV90eXBlX2lkOiBudW1iZXI7IH0pID0+IHYucGVyc29uX2F0dHJpYnV0ZV90eXBlX2lkID09IFRhYmxlR3JpZENvbXBvbmVudC5URUxFUEhPTkVfQVRUUklCVVRFX0lEKT8udmFsdWU7XHJcbiAgfVxyXG5cclxuXHJcbiAgLyoqXHJcbiAgICogQ2xvc2VzIHRoZSBtZW51IGlmIGl0J3Mgb3BlblxyXG4gICAqL1xyXG4gIGNsb3NlTWVudSgpIHtcclxuICAgIGlmICh0aGlzLm1lbnVUcmlnZ2VyKSB7XHJcbiAgICAgIHRoaXMubWVudVRyaWdnZXIuY2xvc2VNZW51KCk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuXHJcbiAgLyoqXHJcbiAgICogU2V0cyB0aGUgbW9kZSBmb3IgdGhlIGNvbXBvbmVudCAoZWl0aGVyICdkYXRlJyBvciAncmFuZ2UnKVxyXG4gICAqIEBwYXJhbSB7J2RhdGUnIHwgJ3JhbmdlJ30gbW9kZSAtIFRoZSBtb2RlIHRvIHNldFxyXG4gICAqL1xyXG4gIHNldE1vZGUobW9kZTogJ2RhdGUnIHwgJ3JhbmdlJykge1xyXG4gICAgdGhpcy5tb2RlID0gbW9kZTtcclxuICAgIC8vIENsZWFyIGVycm9yIG1lc3NhZ2VzIHdoZW4gc3dpdGNoaW5nIG1vZGVzXHJcbiAgICB0aGlzLmRhdGVFcnJvck1lc3NhZ2UgPSAnJztcclxuICAgIHRoaXMuc3RhcnREYXRlRXJyb3JNZXNzYWdlID0gJyc7XHJcbiAgICB0aGlzLmVuZERhdGVFcnJvck1lc3NhZ2UgPSAnJztcclxuICB9XHJcblxyXG5cclxuICAvKipcclxuICAgKiBGb3JtYXRzIGEgZGF0ZSBpbnRvICdZWVlZLU1NLUREJyBmb3JtYXRcclxuICAgKiBAcGFyYW0ge2FueX0gZGF0ZSAtIFRoZSBkYXRlIHRvIGZvcm1hdFxyXG4gICAqIEByZXR1cm4ge3N0cmluZ30gLSBUaGUgZm9ybWF0dGVkIGRhdGVcclxuICAgKi9cclxuICBmb3JtYXREYXRlKGRhdGU6IGFueSk6IHN0cmluZyB7XHJcbiAgICBjb25zdCBsb2NhbERhdGUgPSBuZXcgRGF0ZShkYXRlKTtcclxuICAgIGNvbnN0IHllYXIgPSBsb2NhbERhdGUuZ2V0RnVsbFllYXIoKTtcclxuICAgIGNvbnN0IG1vbnRoID0gU3RyaW5nKGxvY2FsRGF0ZS5nZXRNb250aCgpICsgMSkucGFkU3RhcnQoMiwgJzAnKTtcclxuICAgIGNvbnN0IGRheSA9IFN0cmluZyhsb2NhbERhdGUuZ2V0RGF0ZSgpKS5wYWRTdGFydCgyLCAnMCcpO1xyXG4gICAgcmV0dXJuIGAke3llYXJ9LSR7bW9udGh9LSR7ZGF5fWA7XHJcbiAgfVxyXG5cclxuXHJcbiAgLyoqXHJcbiAgICogQ29udmVydHMgYSByZWxhdGl2ZSB0aW1lIHN0cmluZyAoZS5nLiwgXCIyIGhvdXJzXCIsIFwiMSBkYXlcIikgdG8gYSBkYXRlIHN0cmluZ1xyXG4gICAqIEBwYXJhbSB7c3RyaW5nfSByZWxhdGl2ZVRpbWUgLSBUaGUgcmVsYXRpdmUgdGltZSBzdHJpbmdcclxuICAgKiBAcmV0dXJuIHtzdHJpbmd9IC0gVGhlIHJlc3VsdGluZyBkYXRlIGluICdZWVlZLU1NLUREJyBmb3JtYXRcclxuICAgKiBAdGhyb3dzIHtFcnJvcn0gLSBUaHJvd3MgZXJyb3IgZm9yIGludmFsaWQgdGltZSB1bml0c1xyXG4gICAqL1xyXG4gIGNvbnZlcnRUb0RhdGUocmVsYXRpdmVUaW1lOiBzdHJpbmcpOiBzdHJpbmcge1xyXG4gICAgY29uc3Qgbm93ID0gbmV3IERhdGUoKTtcclxuICAgIGNvbnN0IFt2YWx1ZSwgdW5pdF0gPSByZWxhdGl2ZVRpbWUuc3BsaXQoJyAnKTtcclxuICAgIGNvbnN0IGFtb3VudCA9IHBhcnNlSW50KHZhbHVlLCAxMCk7ICAgIFxyXG4gICAgXHJcbiAgICBpZiAoWydob3VyJywgJ2hvdXJzJ10uaW5jbHVkZXModW5pdC50b0xvd2VyQ2FzZSgpKSkgbm93LnNldEhvdXJzKG5vdy5nZXRIb3VycygpIC0gYW1vdW50KTtcclxuICAgIGVsc2UgaWYgKFsnbWludXRlJywgJ21pbnV0ZXMnXS5pbmNsdWRlcyh1bml0LnRvTG93ZXJDYXNlKCkpKSBub3cuc2V0TWludXRlcyhub3cuZ2V0TWludXRlcygpIC0gYW1vdW50KTtcclxuICAgIGVsc2UgaWYgKFsnZGF5JywgJ2RheXMnXS5pbmNsdWRlcyh1bml0LnRvTG93ZXJDYXNlKCkpKSBub3cuc2V0RGF0ZShub3cuZ2V0RGF0ZSgpIC0gYW1vdW50KTtcclxuICAgIGVsc2UgdGhyb3cgbmV3IEVycm9yKCdJbnZhbGlkIHRpbWUgdW5pdC4gT25seSBcImhvdXJzXCIsIFwibWludXRlc1wiLCBvciBcImRheXNcIiBhcmUgc3VwcG9ydGVkLicpO1xyXG5cclxuICAgIHJldHVybiBub3cudG9JU09TdHJpbmcoKS5zcGxpdCgnVCcpWzBdO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogQ29udmVydHMgYSBmb2xsb3ctdXAgZGF0ZSBzdHJpbmcgdG8gSVNPIGZvcm1hdFxyXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBmb2xsb3dVcCAtIFRoZSBmb2xsb3ctdXAgZGF0ZSBzdHJpbmdcclxuICAgKiBAcmV0dXJuIHtzdHJpbmd9IC0gVGhlIGZvbGxvdy11cCBkYXRlIGluIElTTyBzdHJpbmcgZm9ybWF0XHJcbiAgICovXHJcbiAgY29udmVydFRvSVNPKGZvbGxvd1VwOiBzdHJpbmcpOiBzdHJpbmcge1xyXG4gICAgY29uc3QgZGF0ZSA9IG5ldyBEYXRlKGZvbGxvd1VwKTtcclxuICAgIGRhdGUuc2V0RGF0ZShkYXRlLmdldERhdGUoKSk7XHJcbiAgICByZXR1cm4gZGF0ZS50b0lTT1N0cmluZygpO1xyXG4gIH1cclxuICBcclxuICAvKipcclxuICAgKiBBcHBsaWVzIGRhdGUgb3IgcmFuZ2UgZmlsdGVyIHRvIHRoZSBkYXRhIHNvdXJjZSBiYXNlZCBvbiBzZWxlY3RlZCBkYXRlKHMpXHJcbiAgICogQHBhcmFtIHtzdHJpbmd9IGRhdGVGaWVsZCAtIFRoZSBmaWVsZCBuYW1lIGZvciB0aGUgZGF0ZSB0byBmaWx0ZXJcclxuICAgKi9cclxuICBhcHBseURhdGVPclJhbmdlRmlsdGVyKGRhdGVGaWVsZDogc3RyaW5nKSB7XHJcbiAgICBjb25zdCBzZWxlY3RlZERhdGUgPSB0aGlzLmZpbHRlcmVkRGF0ZUFuZFJhbmdlRm9ybS5nZXQoJ2RhdGUnKT8udmFsdWU7XHJcbiAgICBjb25zdCBzdGFydERhdGUgPSB0aGlzLmZpbHRlcmVkRGF0ZUFuZFJhbmdlRm9ybS5nZXQoJ3N0YXJ0RGF0ZScpPy52YWx1ZTtcclxuICAgIGNvbnN0IGVuZERhdGUgPSB0aGlzLmZpbHRlcmVkRGF0ZUFuZFJhbmdlRm9ybS5nZXQoJ2VuZERhdGUnKT8udmFsdWU7XHJcblxyXG4gICAgLy8gQ2xlYXIgcHJldmlvdXMgZXJyb3IgbWVzc2FnZXNcclxuICAgIHRoaXMuZGF0ZUVycm9yTWVzc2FnZSA9ICcnO1xyXG4gICAgdGhpcy5zdGFydERhdGVFcnJvck1lc3NhZ2UgPSAnJztcclxuICAgIHRoaXMuZW5kRGF0ZUVycm9yTWVzc2FnZSA9ICcnO1xyXG5cclxuICAgIC8vIFZhbGlkYXRpb24gZm9yIGRhdGUgbW9kZVxyXG4gICAgaWYgKHRoaXMubW9kZSA9PT0gJ2RhdGUnICYmICFzZWxlY3RlZERhdGUpIHtcclxuICAgICAgdGhpcy5kYXRlRXJyb3JNZXNzYWdlID0gdGhpcy50cmFuc2xhdGVTZXJ2aWNlLmluc3RhbnQoJ1BsZWFzZSBzZWxlY3QgYSBkYXRlJyk7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuXHJcbiAgICAvLyBWYWxpZGF0aW9uIGZvciByYW5nZSBtb2RlXHJcbiAgICBpZiAodGhpcy5tb2RlID09PSAncmFuZ2UnKSB7XHJcbiAgICAgIGxldCBoYXNFcnJvciA9IGZhbHNlO1xyXG5cclxuICAgICAgaWYgKCFzdGFydERhdGUpIHtcclxuICAgICAgICB0aGlzLnN0YXJ0RGF0ZUVycm9yTWVzc2FnZSA9IHRoaXMudHJhbnNsYXRlU2VydmljZS5pbnN0YW50KCdQbGVhc2Ugc2VsZWN0IHN0YXJ0IGRhdGUnKTtcclxuICAgICAgICBoYXNFcnJvciA9IHRydWU7XHJcbiAgICAgIH1cclxuICAgICAgaWYgKCFlbmREYXRlKSB7XHJcbiAgICAgICAgdGhpcy5lbmREYXRlRXJyb3JNZXNzYWdlID0gdGhpcy50cmFuc2xhdGVTZXJ2aWNlLmluc3RhbnQoJ1BsZWFzZSBzZWxlY3QgZW5kIGRhdGUnKTtcclxuICAgICAgICBoYXNFcnJvciA9IHRydWU7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGlmIChoYXNFcnJvcikge1xyXG4gICAgICAgIHJldHVybjtcclxuICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGlmIChzZWxlY3RlZERhdGUpIHtcclxuICAgICAgY29uc3QgZm9ybWF0dGVkRGF0ZSA9IHRoaXMuZm9ybWF0RGF0ZShzZWxlY3RlZERhdGUpO1xyXG4gICAgICB0aGlzLmRhdGVGaWx0ZXIgPSB0aGlzLmZvcm1hdERhdGUoc2VsZWN0ZWREYXRlKTtcclxuICAgICAgdGhpcy5jdXJyZW50RGF0ZUZpbHRlciA9IHtcclxuICAgICAgICBkYXRlRmllbGQsXHJcbiAgICAgICAgZmlsdGVyVmFsdWU6IGZvcm1hdHRlZERhdGUsXHJcbiAgICAgICAgaXNSYW5nZTogZmFsc2VcclxuICAgICAgfTtcclxuICAgIH0gZWxzZSBpZiAoc3RhcnREYXRlICYmIGVuZERhdGUpIHtcclxuICAgICAgY29uc3QgZm9ybWF0dGVkU3RhcnREYXRlID0gdGhpcy5mb3JtYXREYXRlKHN0YXJ0RGF0ZSk7XHJcbiAgICAgIGNvbnN0IGZvcm1hdHRlZEVuZERhdGUgPSB0aGlzLmZvcm1hdERhdGUoZW5kRGF0ZSk7XHJcbiAgICAgIHRoaXMuZGF0ZUZpbHRlciA9IGAke3RoaXMuZm9ybWF0RGF0ZShzdGFydERhdGUpfToke3RoaXMuZm9ybWF0RGF0ZShlbmREYXRlKX1gO1xyXG4gICAgICB0aGlzLmN1cnJlbnREYXRlRmlsdGVyID0ge1xyXG4gICAgICAgIGRhdGVGaWVsZCxcclxuICAgICAgICBzdGFydERhdGU6IGZvcm1hdHRlZFN0YXJ0RGF0ZSxcclxuICAgICAgICBlbmREYXRlOiBmb3JtYXR0ZWRFbmREYXRlLFxyXG4gICAgICAgIGlzUmFuZ2U6IHRydWVcclxuICAgICAgfTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHRoaXMuZGF0ZUZpbHRlciA9ICcnO1xyXG4gICAgICB0aGlzLmN1cnJlbnREYXRlRmlsdGVyID0gbnVsbDtcclxuICAgIH1cclxuXHJcbiAgICB0aGlzLmRhdGVGaWVsZCA9IGRhdGVGaWVsZDtcclxuICAgIHRoaXMuYXBwbHlGaWx0ZXJzKCk7XHJcbiAgICB0aGlzLmNsb3NlTWVudSgpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogUmVzZXRzIHRoZSBkYXRlIGZpbHRlciBmb3JtIGFuZCBjbGVhcnMgdGhlIGRhdGEgc291cmNlIGZpbHRlclxyXG4gICAqIEBwYXJhbSB7Ym9vbGVhbn0gZmxhZyAtIElmIHRydWUsIGRvZXNuJ3QgY2xvc2UgdGhlIG1lbnVcclxuICAgKi9cclxuICByZXNldERhdGUoZmxhZzogYm9vbGVhbiA9IGZhbHNlKSB7XHJcbiAgICB0aGlzLmZpbHRlcmVkRGF0ZUFuZFJhbmdlRm9ybS5yZXNldCgpO1xyXG4gICAgdGhpcy5jdXJyZW50RGF0ZUZpbHRlciA9IG51bGw7XHJcbiAgICAvLyBDbGVhciBlcnJvciBtZXNzYWdlc1xyXG4gICAgdGhpcy5kYXRlRXJyb3JNZXNzYWdlID0gJyc7XHJcbiAgICB0aGlzLnN0YXJ0RGF0ZUVycm9yTWVzc2FnZSA9ICcnO1xyXG4gICAgdGhpcy5lbmREYXRlRXJyb3JNZXNzYWdlID0gJyc7XHJcbiAgICB0aGlzLmFwcGx5RmlsdGVycygpO1xyXG4gICAgaWYgKCFmbGFnKSB7XHJcbiAgICAgIHRoaXMuY2xvc2VNZW51KCk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuXHJcbiAgLyoqXHJcbiAgICogUmV0cmlldmVzIGEgc3BlY2lmaWMgYXR0cmlidXRlIGRhdGEgZnJvbSB0aGUgcGVyc29uJ3MgYXR0cmlidXRlc1xyXG4gICAqIEBwYXJhbSB7YW55fSBkYXRhIC0gVGhlIGRhdGEgb2JqZWN0IGNvbnRhaW5pbmcgcGVyc29uIGF0dHJpYnV0ZXNcclxuICAgKiBAcGFyYW0ge3N0cmluZ30gYXR0cmlidXRlTmFtZSAtIFRoZSBuYW1lIG9mIHRoZSBhdHRyaWJ1dGUgdG8gcmV0cmlldmVcclxuICAgKiBAcmV0dXJuIHtPYmplY3QgfCBudWxsfSAtIFRoZSBhdHRyaWJ1dGUgbmFtZSBhbmQgdmFsdWUsIG9yIG51bGwgaWYgbm90IGZvdW5kXHJcbiAgICovXHJcbiAgZ2V0QXR0cmlidXRlRGF0YShkYXRhOiBhbnksIGF0dHJpYnV0ZU5hbWU6IHN0cmluZyk6IHsgbmFtZTogc3RyaW5nOyB2YWx1ZTogc3RyaW5nIH0gfCBudWxsIHtcclxuICAgIGlmIChBcnJheS5pc0FycmF5KGRhdGEucGVyc29uX2F0dHJpYnV0ZSkpIHtcclxuICAgICAgY29uc3QgYXR0cmlidXRlID0gZGF0YS5wZXJzb25fYXR0cmlidXRlLmZpbmQoXHJcbiAgICAgICAgKGF0dHI6IGFueSkgPT4gYXR0ci5wZXJzb25fYXR0cmlidXRlX3R5cGU/Lm5hbWUgPT09IGF0dHJpYnV0ZU5hbWVcclxuICAgICAgKTtcclxuICAgICAgaWYgKGF0dHJpYnV0ZSkge1xyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICBuYW1lOiBhdHRyaWJ1dGUucGVyc29uX2F0dHJpYnV0ZV90eXBlLm5hbWUsXHJcbiAgICAgICAgICB2YWx1ZTogYXR0cmlidXRlLnZhbHVlXHJcbiAgICAgICAgfTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIG51bGw7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAqIEdldCBib29rZWQgYXBwb2ludG1lbnRzIGZvciBhIGxvZ2dlZC1pbiBkb2N0b3IgaW4gYSBjdXJyZW50IHllYXJcclxuICAqIEByZXR1cm4ge3ZvaWR9XHJcbiAgKi9cclxuICBnZXRBcHBvaW50bWVudHMoKTogdm9pZCB7XHJcbiAgICB0aGlzLm5neExvYWRlci5zdGFydExvYWRlcigndGFibGUtbG9hZGVyLScgKyB0aGlzLnBsdWdpbkNvbmZpZ09icy5wbHVnaW5Db25maWdPYnNGbGFnKTsgLy8gU3RhcnQgc2VjdGlvbiBsb2FkZXJcclxuICAgIHRoaXMuYXBwb2ludG1lbnRzID0gW107XHJcbiAgICBsZXQgZnJvbURhdGUgPSBtb21lbnQoKS5zdGFydE9mKCd5ZWFyJykuZm9ybWF0KCdERC9NTS9ZWVlZJyk7XHJcbiAgICBsZXQgdG9EYXRlID0gbW9tZW50KCkuZW5kT2YoJ3llYXInKS5mb3JtYXQoJ0REL01NL1lZWVknKTtcclxuICAgIGxldCBwZW5kaW5nX3Zpc2l0cyA9IHRoaXMucGx1Z2luQ29uZmlnT2JzLmZpbHRlcj8uaGFzT3duUHJvcGVydHkoXCJwZW5kaW5nX3Zpc2l0c1wiKSAgPyB0aGlzLnBsdWdpbkNvbmZpZ09icy5maWx0ZXI/LnBlbmRpbmdfdmlzaXRzIDogbnVsbDtcclxuICAgIGlmKHRoaXMucGx1Z2luQ29uZmlnT2JzPy5maWx0ZXIpe1xyXG4gICAgICBmcm9tRGF0ZSA9IHRoaXMucGx1Z2luQ29uZmlnT2JzPy5maWx0ZXI/LmZyb21EYXRlXHJcbiAgICAgIHRvRGF0ZSA9IHRoaXMucGx1Z2luQ29uZmlnT2JzPy5maWx0ZXI/LnRvRGF0ZVxyXG4gICAgfVxyXG4gICAgdGhpcy5hcHBvaW50bWVudFNlcnZpY2UuZ2V0VXNlclNsb3RzKGdldENhY2hlRGF0YSh0cnVlLCBkb2N0b3JEZXRhaWxzLlVTRVIpLnV1aWQsIGZyb21EYXRlLCB0b0RhdGUsIHRoaXMuaXNNQ0NVc2VyID8gdGhpcy5zcGVjaWFsaXphdGlvbiA6IG51bGwsIHBlbmRpbmdfdmlzaXRzKVxyXG4gICAgICAuc3Vic2NyaWJlKHtcclxuICAgICAgICBuZXh0OiAocmVzOiBBcGlSZXNwb25zZU1vZGVsKSA9PiB7ICAgICAgICBcclxuICAgICAgICAgIHRoaXMudG90YWxSZWNvcmRzID0gKHJlcy5kYXRhPy5sZW5ndGggPiAxKSA/IHJlcy5kYXRhPy5sZW5ndGggLSAxIDogcmVzLmRhdGE/Lmxlbmd0aCB8fCAwO1xyXG4gICAgICAgICAgdGhpcy5lbWl0VmlzaXRzQ291bnQodGhpcy50b3RhbFJlY29yZHMpO1xyXG4gICAgICAgICAgbGV0IGFwcG9pbnRtZW50c2RhdGEgPSByZXMuZGF0YTtcclxuICAgICAgICAgIGFwcG9pbnRtZW50c2RhdGEuZm9yRWFjaCgoYXBwb2ludG1lbnQ6IEFwcG9pbnRtZW50TW9kZWwpID0+IHtcclxuICAgICAgICAgICAgaWYgKGFwcG9pbnRtZW50LnN0YXR1cyA9PSAnYm9va2VkJyAmJiAoYXBwb2ludG1lbnQudmlzaXRTdGF0dXMgPT0gJ0F3YWl0aW5nIENvbnN1bHQnfHxhcHBvaW50bWVudC52aXNpdFN0YXR1cyA9PSAnVmlzaXQgSW4gUHJvZ3Jlc3MnKSkge1xyXG4gICAgICAgICAgICAgIGlmIChhcHBvaW50bWVudC52aXNpdCkge1xyXG4gICAgICAgICAgICAgICAgYXBwb2ludG1lbnQuY2hlaWZfY29tcGxhaW50ID0gdGhpcy5nZXRDaGVpZkNvbXBsYWludChhcHBvaW50bWVudC52aXNpdCk7XHJcbiAgICAgICAgICAgICAgICBhcHBvaW50bWVudC5zdGFydHNfaW4gPSBjaGVja0lmRGF0ZU9sZFRoYW5PbmVEYXkoYXBwb2ludG1lbnQuc2xvdEpzRGF0ZSk7XHJcbiAgICAgICAgICAgICAgICBhcHBvaW50bWVudC50ZWxlcGhvbmUgPSB0aGlzLmdldFRlbGVwaG9uZU51bWJlcihhcHBvaW50bWVudD8udmlzaXQ/LnBlcnNvbik7XHJcbiAgICAgICAgICAgICAgICBhcHBvaW50bWVudC5UTUhfcGF0aWVudF9pZCA9IHRoaXMuZ2V0QXR0cmlidXRlRGF0YShhcHBvaW50bWVudC52aXNpdCwgXCJUTUggQ2FzZSBOdW1iZXJcIik/LnZhbHVlO1xyXG4gICAgICAgICAgICAgICAgYXBwb2ludG1lbnQudXVpZCA9IGFwcG9pbnRtZW50LnZpc2l0VXVpZDtcclxuICAgICAgICAgICAgICAgIGFwcG9pbnRtZW50LmxvY2F0aW9uID0gYXBwb2ludG1lbnQ/LnZpc2l0Py5sb2NhdGlvbj8ubmFtZTtcclxuICAgICAgICAgICAgICAgIGFwcG9pbnRtZW50LmFnZSA9IGFwcG9pbnRtZW50Py5wYXRpZW50QWdlICsgJyAnICsgdGhpcy50cmFuc2xhdGVTZXJ2aWNlLmluc3RhbnQoJ3knKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuYXBwb2ludG1lbnRzLnB1c2goYXBwb2ludG1lbnQpO1xyXG4gICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgfSk7XHJcbiAgICAgICAgICB0aGlzLmRhdGFTb3VyY2UgPSBbLi4udGhpcy5hcHBvaW50bWVudHNdO1xyXG4gICAgICAgICAgdGhpcy5zdG9yZU9yaWdpbmFsRGF0YSgpO1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgY29tcGxldGU6ICgpID0+IHtcclxuICAgICAgICAgIHRoaXMubmd4TG9hZGVyLnN0b3BMb2FkZXIoJ3RhYmxlLWxvYWRlci0nICsgdGhpcy5wbHVnaW5Db25maWdPYnMucGx1Z2luQ29uZmlnT2JzRmxhZyk7IC8vIFN0b3Agc2VjdGlvbiBsb2FkZXJcclxuICAgICAgICAgIC8vIFNjcm9sbCB0byB0b3AgYWZ0ZXIgZGF0YSBpcyBsb2FkZWRcclxuICAgICAgICAgIHRoaXMuc2Nyb2xsVG9Ub3AoKTtcclxuICAgICAgICB9XHJcbiAgICB9KTtcclxuICB9XHJcbiAgXHJcbiAgLyoqXHJcbiAgKiBHZXQgZG9jdG9yIHNwZWNpYWxpdHlcclxuICAqIEBwYXJhbSB7UHJvdmlkZXJBdHRyaWJ1dGVNb2RlbFtdfSBhdHRyIC0gQXJyYXkgb2YgcHJvdmlkZXIgYXR0cmlidXRlc1xyXG4gICogQHJldHVybiB7c3RyaW5nfSAtIERvY3RvciBzcGVjaWFsaXR5XHJcbiAgKi9cclxuICBnZXRTcGVjaWFsaXphdGlvbihhdHRyOiBQcm92aWRlckF0dHJpYnV0ZU1vZGVsW10pOiBzdHJpbmcge1xyXG4gICAgbGV0IHNwZWNpYWxpemF0aW9uID0gJyc7XHJcbiAgICBhdHRyLmZvckVhY2goKGE6IFByb3ZpZGVyQXR0cmlidXRlTW9kZWwpID0+IHtcclxuICAgICAgaWYgKGEuYXR0cmlidXRlVHlwZS51dWlkID09IFRhYmxlR3JpZENvbXBvbmVudC5TUEVDSUFMSVpBVElPTl9VVUlEICYmICFhLnZvaWRlZCkge1xyXG4gICAgICAgIHNwZWNpYWxpemF0aW9uID0gYS52YWx1ZTtcclxuICAgICAgfVxyXG4gICAgfSk7XHJcbiAgICByZXR1cm4gc3BlY2lhbGl6YXRpb247XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAqIFJldHVybnMgdGhlIGFnZSBpbiB5ZWFycyBmcm9tIHRoZSBiaXJ0aGRhdGVcclxuICAqIEBwYXJhbSB7c3RyaW5nfSBiaXJ0aGRhdGUgLSBEYXRlIGluIHN0cmluZyBmb3JtYXRcclxuICAqIEByZXR1cm4ge251bWJlcn0gLSBBZ2VcclxuICAqL1xyXG4gIGNhbGN1bGF0ZUFnZShiaXJ0aGRhdGU6IHN0cmluZyk6IG51bWJlciB7XHJcbiAgICByZXR1cm4gbW9tZW50KCkuZGlmZihiaXJ0aGRhdGUsICd5ZWFycycpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgKiBSZXR1cm5zIHRoZSBjcmVhdGVkIHRpbWUgaW4gd29yZHMgZnJvbSB0aGUgZGF0ZVxyXG4gICogQHBhcmFtIHtzdHJpbmd9IGRhdGEgLSBEYXRlXHJcbiAgKiBAcmV0dXJuIHtzdHJpbmd9IC0gQ3JlYXRlZCB0aW1lIGluIHdvcmRzIGZyb20gdGhlIGRhdGVcclxuICAqL1xyXG4gIGdldENyZWF0ZWRBdChkYXRhOiBzdHJpbmcpOiBzdHJpbmcge1xyXG4gICAgbGV0IGhvdXJzID0gbW9tZW50KCkuZGlmZihtb21lbnQoZGF0YSksICdob3VycycpO1xyXG4gICAgbGV0IG1pbnV0ZXMgPSBtb21lbnQoKS5kaWZmKG1vbWVudChkYXRhKSwgJ21pbnV0ZXMnKTtcclxuICAgIGlmIChob3VycyA+IDI0KSB7XHJcbiAgICAgIHJldHVybiBtb21lbnQoZGF0YSkuZm9ybWF0KCdERCBNTU0sIFlZWVknKTtcclxuICAgIH07XHJcbiAgICBpZiAoaG91cnMgPCAxKSB7XHJcbiAgICAgIHJldHVybiBgJHttaW51dGVzfSAke3RoaXMudHJhbnNsYXRlU2VydmljZS5pbnN0YW50KFwiTWludXRlcyBhZ29cIil9YDtcclxuICAgIH1cclxuICAgIHJldHVybiBgJHtob3Vyc30gJHt0aGlzLnRyYW5zbGF0ZVNlcnZpY2UuaW5zdGFudChcIkhvdXJzIGFnb1wiKX1gO1xyXG4gIH1cclxuICBcclxuICAvKipcclxuICAqIEdldCBlbmNvdW50ZXIgZGF0ZXRpbWUgZm9yIGEgZ2l2ZW4gZW5jb3VudGVyIHR5cGVcclxuICAqIEBwYXJhbSB7Q3VzdG9tVmlzaXRNb2RlbH0gdmlzaXQgLSBWaXNpdFxyXG4gICogQHBhcmFtIHtzdHJpbmd9IGVuY291bnRlck5hbWUgLSBFbmNvdW50ZXIgdHlwZVxyXG4gICogQHJldHVybiB7c3RyaW5nfSAtIEVuY291bnRlciBkYXRldGltZVxyXG4gICovXHJcbiAgZ2V0RW5jb3VudGVyQ3JlYXRlZCh2aXNpdDogQ3VzdG9tVmlzaXRNb2RlbCwgZW5jb3VudGVyTmFtZTogc3RyaW5nKTogc3RyaW5nIHtcclxuICAgIGxldCBjcmVhdGVkX2F0ID0gJyc7XHJcbiAgICBjb25zdCBlbmNvdW50ZXJzID0gdmlzaXQuZW5jb3VudGVycztcclxuICAgIGVuY291bnRlcnMuZm9yRWFjaCgoZW5jb3VudGVyOiBDdXN0b21FbmNvdW50ZXJNb2RlbCkgPT4ge1xyXG4gICAgICBjb25zdCBkaXNwbGF5ID0gZW5jb3VudGVyLnR5cGU/Lm5hbWU7XHJcbiAgICAgIGlmIChkaXNwbGF5Lm1hdGNoKGVuY291bnRlck5hbWUpICE9PSBudWxsKSB7XHJcbiAgICAgICAgY3JlYXRlZF9hdCA9IHRoaXMuZ2V0Q3JlYXRlZEF0KGVuY291bnRlci5lbmNvdW50ZXJfZGF0ZXRpbWUucmVwbGFjZSgnWicsJyswNTMwJykpO1xyXG4gICAgICB9XHJcbiAgICB9KTtcclxuICAgIHJldHVybiBjcmVhdGVkX2F0O1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogRGV0ZXJtaW5lcyBpZiB0aGUgZW5jb3VudGVyIGlzIGEgZm9sbG93LXVwIG9yIG5ldyB2aXNpdFxyXG4gICAqIEBwYXJhbSB7YW55fSBlbmMgLSBFbmNvdW50ZXIgZGF0YVxyXG4gICAqIEByZXR1cm4ge3N0cmluZ30gLSAnRk9MTE9XX1VQJyBvciAnTkVXJ1xyXG4gICAqL1xyXG4gIGdldERlbWFyY2F0aW9uKGVuYzogYW55KTogc3RyaW5nIHtcclxuICAgIGxldCBpc0ZvbGxvd1VwID0gZmFsc2U7XHJcbiAgICBjb25zdCBhZGxJbnRsID0gZW5jPy5maW5kPy4oZSA9PiBlPy50eXBlPy5uYW1lID09PSB2aXNpdFR5cGVzLkFEVUxUSU5JVElBTCk7XHJcbiAgICBpZiAoQXJyYXkuaXNBcnJheShhZGxJbnRsPy5vYnMpKSB7XHJcbiAgICAgIGFkbEludGw/Lm9icy5mb3JFYWNoKG9icyA9PiB7XHJcbiAgICAgICAgaWYgKCFpc0ZvbGxvd1VwKVxyXG4gICAgICAgICAgaXNGb2xsb3dVcCA9IG9icz8udmFsdWVfdGV4dD8udG9Mb3dlckNhc2U/LigpPy5pbmNsdWRlcz8uKFwiZm9sbG93IHVwXCIpO1xyXG4gICAgICB9KTtcclxuICAgIH1cclxuICAgIHJldHVybiBpc0ZvbGxvd1VwID8gdmlzaXRUeXBlcy5GT0xMT1dfVVAgOiB2aXNpdFR5cGVzLk5FVztcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICogR2V0IGF3YWl0aW5nIHZpc2l0cyBmb3IgYSBnaXZlbiBwYWdlIG51bWJlclxyXG4gICogQHBhcmFtIHtudW1iZXJ9IHBhZ2UgLSBQYWdlIG51bWJlclxyXG4gICogQHJldHVybiB7dm9pZH1cclxuICAqL1xyXG4gIGdldEF3YWl0aW5nVmlzaXRzKHBhZ2U6IG51bWJlciA9IDEpOiB2b2lkIHtcclxuICAgIHRoaXMubG9hZFZpc2l0RGF0YShwYWdlLCB0aGlzLmF3YWl0aW5nVmlzaXRzLCB0aGlzLnZpc2l0U2VydmljZS5nZXRBd2FpdGluZ1Zpc2l0cyk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAqIEdldCBpbnByb2dyZXNzIHZpc2l0cyBmb3IgYSBnaXZlbiBwYWdlIG51bWJlclxyXG4gICogQHBhcmFtIHtudW1iZXJ9IHBhZ2UgLSBQYWdlIG51bWJlclxyXG4gICogQHJldHVybiB7dm9pZH1cclxuICAqL1xyXG4gIGdldEluUHJvZ3Jlc3NWaXNpdHMocGFnZTogbnVtYmVyID0gMSk6IHZvaWQge1xyXG4gICAgdGhpcy5sb2FkVmlzaXREYXRhKFxyXG4gICAgICBwYWdlLCBcclxuICAgICAgdGhpcy5pblByb2dyZXNzVmlzaXRzLCBcclxuICAgICAgdGhpcy52aXNpdFNlcnZpY2UuZ2V0SW5Qcm9ncmVzc1Zpc2l0cyxcclxuICAgICAgdmlzaXRUeXBlcy5WSVNJVF9OT1RFLFxyXG4gICAgICB0aGlzLnNvcnRJblByb2dyZXNzVmlzaXRzLmJpbmQodGhpcylcclxuICAgICk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAqIEdldCBwcmlvcml0eSB2aXNpdHMgZm9yIGEgZ2l2ZW4gcGFnZSBudW1iZXJcclxuICAqIEBwYXJhbSB7bnVtYmVyfSBwYWdlIC0gUGFnZSBudW1iZXJcclxuICAqIEByZXR1cm4ge3ZvaWR9XHJcbiAgKi9cclxuICBnZXRQcmlvcml0eVZpc2l0cyhwYWdlOiBudW1iZXIgPSAxKTogdm9pZCB7XHJcbiAgICB0aGlzLmxvYWRWaXNpdERhdGEocGFnZSwgdGhpcy5wcmlvcml0eVZpc2l0cywgdGhpcy52aXNpdFNlcnZpY2UuZ2V0UHJpb3JpdHlWaXNpdHMsIHZpc2l0VHlwZXMuRkxBR0dFRCk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBHZXQgY29tcGxldGVkIHZpc2l0cyBjb3VudFxyXG4gICAqIEByZXR1cm4ge3ZvaWR9XHJcbiAgICovXHJcbiAgZ2V0Q29tcGxldGVkVmlzaXRzKHBhZ2U6IG51bWJlciA9IDEpOiB2b2lkIHtcclxuICAgIHRoaXMubG9hZFZpc2l0RGF0YShwYWdlLCB0aGlzLmNvbXBsZXRlZFZpc2l0cywgdGhpcy52aXNpdFNlcnZpY2UuZ2V0RW5kZWRWaXNpdHMsIHZpc2l0VHlwZXMuQ09NUExFVEVEX1ZJU0lUKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICogR2V0IGZvbGxvdy11cCB2aXNpdHMgZm9yIGEgbG9nZ2VkLWluIGRvY3RvclxyXG4gICogQHJldHVybiB7dm9pZH1cclxuICAqL1xyXG4gIGdldEZvbGxvd1VwVmlzaXQocGFnZTogbnVtYmVyID0gMSk6IHZvaWQge1xyXG4gICAgdGhpcy5uZ3hMb2FkZXIuc3RhcnRMb2FkZXIoJ3RhYmxlLWxvYWRlci0nICsgdGhpcy5wbHVnaW5Db25maWdPYnMucGx1Z2luQ29uZmlnT2JzRmxhZyk7XHJcbiAgICBcclxuICAgIGlmIChwYWdlID09PSAxKSB7XHJcbiAgICAgIHRoaXMuZm9sbG93VXBWaXNpdHMubGVuZ3RoID0gMDtcclxuICAgICAgdGhpcy5yZWNvcmRzRmV0Y2hlZCA9IDA7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIHRoaXMudmlzaXRTZXJ2aWNlLmdldEZvbGxvd1VwVmlzaXRzKHRoaXMuc3BlY2lhbGl6YXRpb24sIHBhZ2UpLnN1YnNjcmliZSh7XHJcbiAgICAgIG5leHQ6IChyZXM6IEFwaVJlc3BvbnNlTW9kZWwpID0+IHtcclxuICAgICAgICBpZiAocmVzLnN1Y2Nlc3MpIHtcclxuICAgICAgICAgIHRoaXMudG90YWxSZWNvcmRzID0gcmVzLnRvdGFsQ291bnQ7XHJcbiAgICAgICAgICB0aGlzLnJlY29yZHNGZXRjaGVkICs9IHRoaXMucGFnZVNpemU7XHJcbiAgICAgICAgICB0aGlzLmVtaXRWaXNpdHNDb3VudCh0aGlzLnRvdGFsUmVjb3Jkcyk7XHJcbiAgICAgICAgICBcclxuICAgICAgICAgIGNvbnN0IHByb2Nlc3NlZFZpc2l0cyA9IHJlcy5kYXRhXHJcbiAgICAgICAgICAgIC5tYXAodmlzaXQgPT4gdGhpcy5wcm9jZXNzRm9sbG93VXBWaXNpdERhdGEodmlzaXQpKVxyXG4gICAgICAgICAgICAuZmlsdGVyKHZpc2l0ID0+IHZpc2l0ICE9PSBudWxsKTtcclxuICAgICAgICAgIFxyXG4gICAgICAgICAgdGhpcy5mb2xsb3dVcFZpc2l0cy5wdXNoKC4uLnByb2Nlc3NlZFZpc2l0cyk7XHJcbiAgICAgICAgICB0aGlzLnVwZGF0ZURhdGFTb3VyY2VzKHRoaXMuZm9sbG93VXBWaXNpdHMsIHByb2Nlc3NlZFZpc2l0cyk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9LFxyXG4gICAgICBjb21wbGV0ZTogKCkgPT4ge1xyXG4gICAgICAgIHRoaXMubmd4TG9hZGVyLnN0b3BMb2FkZXIoJ3RhYmxlLWxvYWRlci0nICsgdGhpcy5wbHVnaW5Db25maWdPYnMucGx1Z2luQ29uZmlnT2JzRmxhZyk7XHJcbiAgICAgICAgdGhpcy5zY3JvbGxUb1RvcCgpO1xyXG4gICAgICB9XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICogR2V0IGVuY291bnRlciBkYXRldGltZSBmb3IgYSBnaXZlbiBlbmNvdW50ZXIgdHlwZVxyXG4gICogQHBhcmFtIHtDdXN0b21WaXNpdE1vZGVsfSB2aXNpdCAtIFZpc2l0XHJcbiAgKiBAcGFyYW0ge3N0cmluZ30gZW5jb3VudGVyTmFtZSAtIEVuY291bnRlciB0eXBlXHJcbiAgKiBAcmV0dXJuIHtzdHJpbmd9IC0gRW5jb3VudGVyIGRhdGV0aW1lXHJcbiAgKi9cclxuICBnZXRFbmNvdW50ZXJPYnMoZW5jb3VudGVyczogQ3VzdG9tRW5jb3VudGVyTW9kZWxbXSwgZW5jb3VudGVyTmFtZTogc3RyaW5nLCBjb25jZXB0SWQ6IG51bWJlcikge1xyXG4gICAgbGV0IG9iczogQ3VzdG9tT2JzTW9kZWw7XHJcbiAgICBlbmNvdW50ZXJzLmZvckVhY2goKGVuY291bnRlcjogQ3VzdG9tRW5jb3VudGVyTW9kZWwpID0+IHtcclxuICAgICAgaWYgKGVuY291bnRlci50eXBlPy5uYW1lID09PSBlbmNvdW50ZXJOYW1lKSB7XHJcbiAgICAgICAgb2JzID0gZW5jb3VudGVyPy5vYnM/LmZpbmQoKG86IEN1c3RvbU9ic01vZGVsKSA9PiBvLmNvbmNlcHRfaWQgPT0gY29uY2VwdElkKTtcclxuICAgICAgfVxyXG4gICAgfSk7XHJcbiAgICByZXR1cm4gb2JzO1xyXG4gIH1cclxuICBcclxuICAvKipcclxuICAgKiBSZW5kZXJzIEhUTUwgY29udGVudCBmb3IgYSBjb2x1bW4sIHNhbml0aXplZCBmb3Igc2VjdXJpdHlcclxuICAgKiBAcGFyYW0ge2FueX0gY29sdW1uIC0gQ29sdW1uIGRlZmluaXRpb25cclxuICAgKiBAcGFyYW0ge2FueX0gZWxlbWVudCAtIERhdGEgZWxlbWVudCB0byByZW5kZXJcclxuICAgKiBAcmV0dXJuIHtTYWZlSHRtbCB8IHN0cmluZ30gLSBGb3JtYXR0ZWQgSFRNTCBvciBlbGVtZW50IHZhbHVlXHJcbiAgICovXHJcbiAgcmVuZGVySHRtbENvbnRlbnQoY29sdW1uOiBhbnksIGVsZW1lbnQ6IGFueSk6IGltcG9ydCgnQGFuZ3VsYXIvcGxhdGZvcm0tYnJvd3NlcicpLlNhZmVIdG1sIHwgc3RyaW5nIHtcclxuICAgIHJldHVybiBjb2x1bW4uZm9ybWF0SHRtbCAmJiB0eXBlb2YgY29sdW1uLmZvcm1hdEh0bWwgPT09ICdmdW5jdGlvbicgPyB0aGlzLnNhbml0aXplci5ieXBhc3NTZWN1cml0eVRydXN0SHRtbChjb2x1bW4uZm9ybWF0SHRtbChlbGVtZW50KSkgOiBlbGVtZW50W2NvbHVtbi5rZXldO1xyXG4gIH1cclxuICAgIFxyXG4gIC8qKlxyXG4gICAqIFJldHVybnMgYSBzdHJpbmcgb2YgQ1NTIGNsYXNzZXMgZm9yIHRoZSBjb2x1bW5cclxuICAgKiBAcGFyYW0ge2FueX0gY29sdW1uIC0gQ29sdW1uIGRlZmluaXRpb25cclxuICAgKiBAcmV0dXJuIHtzdHJpbmd9IC0gU3BhY2Utc2VwYXJhdGVkIGNsYXNzIG5hbWVzXHJcbiAgICovXHJcbiAgZ2V0Q2xhc3Nlcyhjb2x1bW46IGFueSwgZWxlbWVudDogYW55KTogc3RyaW5nIHtcclxuICAgIGxldCBjbGFzc0xpc3QgPSBbXTtcclxuXHJcbiAgICAvLyBJZiBjb2x1bW4gaGFzIGEgc3RhdGljIGNsYXNzTGlzdCAoYXJyYXkgb3Igc3RyaW5nKSwgYWRkIGl0XHJcbiAgICBpZiAoY29sdW1uLmNsYXNzTGlzdCkge1xyXG4gICAgICBjbGFzc0xpc3QgPSB0eXBlb2YgY29sdW1uLmNsYXNzTGlzdCA9PT0gXCJmdW5jdGlvblwiID8gY29sdW1uLmNsYXNzTGlzdChlbGVtZW50KSA6IGNvbHVtbi5jbGFzc0xpc3Q7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIGNsYXNzTGlzdC5qb2luKFwiIFwiKTtcclxuICB9XHJcblxyXG5cclxuXHJcbiAgLyoqXHJcbiAgICogRm9ybWF0cyB0aGUgZm9sbG93LXVwIGRhdGUgYnkgY2xlYW5pbmcgdXAgdGltZSBkZXRhaWxzXHJcbiAgICogQHBhcmFtIHtzdHJpbmd9IHZhbHVlIC0gRm9sbG93LXVwIGRhdGUgc3RyaW5nXHJcbiAgICogQHJldHVybiB7c3RyaW5nfSAtIEZvcm1hdHRlZCBkYXRlXHJcbiAgICovXHJcbiAgcHJvY2Vzc0ZvbGxvd1VwRGF0ZSh2YWx1ZTogc3RyaW5nKTogc3RyaW5nIHtcclxuICAgIHJldHVybiB2YWx1ZSA/IHZhbHVlLnNwbGl0KCcsJykubGVuZ3RoID4gMSA/IGAke3ZhbHVlLnNwbGl0KCcsJylbMF19ICR7dmFsdWUuc3BsaXQoJywnKVsxXS5yZXBsYWNlKFwiVGltZTpcIiwgXCJcIil9YCA6IHZhbHVlIDogJyc7XHJcbiAgfTtcclxuXHJcbiAgLyoqXHJcbiAgICogRXhlY3V0ZXMgdGhlIGFjdGlvbiBiYXNlZCBvbiBpdHMgbGFiZWwgKFJlc2NoZWR1bGUgb3IgQ2FuY2VsKVxyXG4gICAqIEBwYXJhbSB7YW55fSBhY3Rpb24gLSBBY3Rpb24gb2JqZWN0XHJcbiAgICogQHBhcmFtIHthbnl9IGVsZW1lbnQgLSBFbGVtZW50IHRvIHBlcmZvcm0gdGhlIGFjdGlvbiBvblxyXG4gICAqL1xyXG4gIGhhbmRsZUFjdGlvbihhY3Rpb246IGFueSwgZWxlbWVudDogYW55KSB7XHJcbiAgICBjb25zdCBpc1ZhbGlkYXRpb25SZXF1aXJlZCA9IGFjdGlvbi52YWxpZGF0aW9uUmVxdWlyZWQgIT09IHVuZGVmaW5lZCA/IGFjdGlvbi52YWxpZGF0aW9uUmVxdWlyZWQgOiB0cnVlO1xyXG4gICAgXHJcbiAgICBpZiAoYWN0aW9uLmxhYmVsID09PSAnUmVzY2hlZHVsZScpIHtcclxuICAgICAgdGhpcy5yZXNjaGVkdWxlKGVsZW1lbnQsIGlzVmFsaWRhdGlvblJlcXVpcmVkKTtcclxuICAgIH0gZWxzZSBpZiAoYWN0aW9uLmxhYmVsID09PSAnQ2FuY2VsJykge1xyXG4gICAgICB0aGlzLmNhbmNlbChlbGVtZW50LCBpc1ZhbGlkYXRpb25SZXF1aXJlZCk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBPcGVucyBhIFdoYXRzQXBwIGNoYXQgd2l0aCB0aGUgZ2l2ZW4gcGhvbmUgbnVtYmVyXHJcbiAgICogQHBhcmFtIHtNb3VzZUV2ZW50fSBldmVudCAtIFRoZSBjbGljayBldmVudCB0byBwcmV2ZW50IHJvdyBuYXZpZ2F0aW9uXHJcbiAgICogQHBhcmFtIHtzdHJpbmd9IHRlbGVwaG9uZSAtIFBob25lIG51bWJlciBmb3IgV2hhdHNBcHBcclxuICAgKi9cclxuICBvcGVuV2hhdHNBcHAoZXZlbnQ6IE1vdXNlRXZlbnQsIHRlbGVwaG9uZTogc3RyaW5nKTogdm9pZCB7XHJcbiAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTsgLy8gUHJldmVudCByb3cgbmF2aWdhdGlvblxyXG4gICAgY29uc3Qgd2hhdHNhcHBMaW5rID0gYGh0dHBzOi8vd2EubWUvJHt0ZWxlcGhvbmV9YDtcclxuICAgIHdpbmRvdy5vcGVuKHdoYXRzYXBwTGluaywgJ19ibGFuaycsICdub29wZW5lcixub3JlZmVycmVyJyk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBFbWl0cyB0aGUgdmlzaXRzIGNvdW50IGRhdGEgd2l0aCB0aGUgZ2l2ZW4gdGFibGUgdGFnIG5hbWUgYW5kIGNvdW50XHJcbiAgICogQHBhcmFtIHtudW1iZXJ9IHZpc2l0c0NvdW50IC0gVGhlIHRvdGFsIHZpc2l0cyBjb3VudCBmb3IgdGhlIHNwZWNpZmljIHRhYmxlXHJcbiAgICovXHJcbiAgZW1pdFZpc2l0c0NvdW50KHZpc2l0c0NvdW50OiBudW1iZXIpOiB2b2lkIHtcclxuICAgIGNvbnN0IHZpc2l0c0NvdW50RGF0YSA9IHtcclxuICAgICAgdGFibGVUYWdOYW1lOiB0aGlzLnBsdWdpbkNvbmZpZ09icy5wbHVnaW5Db25maWdPYnNGbGFnLFxyXG4gICAgICB2aXNpdHNDb3VudDogdmlzaXRzQ291bnRcclxuICAgIH07XHJcbiAgICB0aGlzLnZpc2l0c0NvdW50RGF0ZS5lbWl0KHZpc2l0c0NvdW50RGF0YSk7XHJcbiAgfVxyXG5cclxuXHJcbiAgcHVibGljIGdldERhdGEoZXZlbnQ/OlBhZ2VFdmVudCl7XHJcbiAgICB0aGlzLnBhZ2VJbmRleCA9IGV2ZW50LnBhZ2VJbmRleDtcclxuICAgIHRoaXMucGFnZVNpemUgPSBldmVudC5wYWdlU2l6ZTtcclxuICAgIHRoaXMuY3VycmVudFBhZ2UgPSBldmVudC5wYWdlSW5kZXg7XHJcbiAgICB0aGlzLml0ZW1zUGVyUGFnZSA9IGV2ZW50LnBhZ2VTaXplO1xyXG4gICAgXHJcbiAgICAvLyBJZiBmaWx0ZXJzIGFyZSBhY3RpdmUsIGRpc2FibGUgcGFnaW5hdGlvbiBhbmQgZG9uJ3QgbWFrZSBBUEkgY2FsbHNcclxuICAgIGlmICh0aGlzLmlzRmlsdGVyQWN0aXZlIHx8IHRoaXMucGFnaW5hdGlvbkRpc2FibGVkKSB7XHJcbiAgICAgIHRoaXMuc2Nyb2xsVG9Ub3AoKTtcclxuICAgICAgcmV0dXJuIGV2ZW50O1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICBjb25zdCByZXF1aXJlZFJlY29yZHMgPSAodGhpcy5wYWdlSW5kZXggKyAxKSAqIHRoaXMucGFnZVNpemU7XHJcbiAgICBcclxuICAgIC8vIENoZWNrIGlmIHdlIG5lZWQgdG8gZmV0Y2ggbW9yZSBkYXRhIGZyb20gQVBJXHJcbiAgICBpZiAocmVxdWlyZWRSZWNvcmRzID4gdGhpcy5yZWNvcmRzRmV0Y2hlZCkge1xyXG4gICAgICB0aGlzLmZldGNoTW9yZURhdGEoKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIC8vIERhdGEgaXMgYWxyZWFkeSBwcmVzZW50LCBoYW5kbGUgY2xpZW50LXNpZGUgcGFnaW5hdGlvblxyXG4gICAgICB0aGlzLmhhbmRsZUNsaWVudFNpZGVQYWdpbmF0aW9uKCk7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIC8vIFNjcm9sbCB0byB0b3Agd2hlbiBwYWdpbmF0aW9uIGNoYW5nZXNcclxuICAgIHRoaXMuc2Nyb2xsVG9Ub3AoKTtcclxuICAgIFxyXG4gICAgcmV0dXJuIGV2ZW50O1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogRmV0Y2ggbW9yZSBkYXRhIGZyb20gQVBJIGJhc2VkIG9uIGN1cnJlbnQgcGx1Z2luIHR5cGVcclxuICAgKi9cclxuICBwcml2YXRlIGZldGNoTW9yZURhdGEoKTogdm9pZCB7XHJcbiAgICBjb25zdCBuZXh0UGFnZSA9ICh0aGlzLnJlY29yZHNGZXRjaGVkICsgdGhpcy5wYWdlU2l6ZSkgLyB0aGlzLnBhZ2VTaXplO1xyXG4gICAgXHJcbiAgICBzd2l0Y2godGhpcy5wbHVnaW5Db25maWdPYnM/LnBsdWdpbkNvbmZpZ09ic0ZsYWcpIHtcclxuICAgICAgY2FzZSBcIkF3YWl0aW5nXCI6XHJcbiAgICAgICAgdGhpcy5nZXRBd2FpdGluZ1Zpc2l0cyhuZXh0UGFnZSk7XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICAgIGNhc2UgXCJQcmlvcml0eVwiOlxyXG4gICAgICAgIHRoaXMuZ2V0UHJpb3JpdHlWaXNpdHMobmV4dFBhZ2UpO1xyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgICBjYXNlIFwiSW5Qcm9ncmVzc1wiOlxyXG4gICAgICAgIHRoaXMuZ2V0SW5Qcm9ncmVzc1Zpc2l0cyhuZXh0UGFnZSk7XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICAgIGNhc2UgXCJDb21wbGV0ZWRcIjpcclxuICAgICAgICB0aGlzLmdldENvbXBsZXRlZFZpc2l0cyhuZXh0UGFnZSk7XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICAgIGNhc2UgXCJGb2xsb3dVcFwiOlxyXG4gICAgICAgIHRoaXMuZ2V0Rm9sbG93VXBWaXNpdChuZXh0UGFnZSk7XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBIYW5kbGUgY2xpZW50LXNpZGUgcGFnaW5hdGlvbiBmb3IgYWxyZWFkeSBsb2FkZWQgZGF0YVxyXG4gICAqL1xyXG4gIHByaXZhdGUgaGFuZGxlQ2xpZW50U2lkZVBhZ2luYXRpb24oKSB7XHJcbiAgICAvLyBFbnN1cmUgZmlsdGVyZWREYXRhU291cmNlIGhhcyBhbGwgdGhlIGRhdGEgZnJvbSBvcmlnaW5hbERhdGFcclxuICAgIGlmICh0aGlzLmZpbHRlcmVkRGF0YVNvdXJjZS5sZW5ndGggPCB0aGlzLm9yaWdpbmFsRGF0YS5sZW5ndGgpIHtcclxuICAgICAgdGhpcy5maWx0ZXJlZERhdGFTb3VyY2UgPSBbLi4udGhpcy5vcmlnaW5hbERhdGFdO1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICAvLyBBcHBseSBwYWdpbmF0aW9uIHRvIHRoZSBmaWx0ZXJlZCBkYXRhXHJcbiAgICB0aGlzLmFwcGx5UGFnaW5hdGlvbigpOyBcclxuICAgIFxyXG4gICAgLy8gVXBkYXRlIHBhZ2luYXRvciBsZW5ndGggdG8gc2hvdyBjb3JyZWN0IHRvdGFsXHJcbiAgICBpZiAodGhpcy50ZW1wUGFnaW5hdG9yKSB7XHJcbiAgICAgIHRoaXMudGVtcFBhZ2luYXRvci5sZW5ndGggPSB0aGlzLnRvdGFsUmVjb3JkcztcclxuICAgIH1cclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEhhbmRsZSBzb3J0aW5nIGZvciBjdXJyZW50IHBhZ2UgZGF0YSBvbmx5XHJcbiAgICogQHBhcmFtIHtzdHJpbmd9IGNvbHVtbiAtIENvbHVtbiB0byBzb3J0IGJ5XHJcbiAgICogQHBhcmFtIHtzdHJpbmd9IGRpcmVjdGlvbiAtIFNvcnQgZGlyZWN0aW9uICgnYXNjJyBvciAnZGVzYycpXHJcbiAgICovXHJcbiAgaGFuZGxlU29ydChjb2x1bW46IHN0cmluZywgZGlyZWN0aW9uOiBzdHJpbmcpOiB2b2lkIHtcclxuICAgIGlmICghY29sdW1uIHx8ICFkaXJlY3Rpb24pIHJldHVybjtcclxuICAgIFxyXG4gICAgLy8gU29ydCBvbmx5IHRoZSBjdXJyZW50IHBhZ2UgZGF0YVxyXG4gICAgdGhpcy5wYWdpbmF0ZWREYXRhU291cmNlLnNvcnQoKGE6IGFueSwgYjogYW55KSA9PiB7XHJcbiAgICAgIGxldCBhVmFsdWUgPSB0aGlzLmdldFNvcnRWYWx1ZShhLCBjb2x1bW4pO1xyXG4gICAgICBsZXQgYlZhbHVlID0gdGhpcy5nZXRTb3J0VmFsdWUoYiwgY29sdW1uKTtcclxuICAgICAgXHJcbiAgICAgIC8vIENvbnZlcnQgdG8gc3RyaW5nIGZvciBjb21wYXJpc29uIGlmIG5lZWRlZFxyXG4gICAgICBpZiAodHlwZW9mIGFWYWx1ZSA9PT0gJ3N0cmluZycpIGFWYWx1ZSA9IGFWYWx1ZS50b0xvd2VyQ2FzZSgpO1xyXG4gICAgICBpZiAodHlwZW9mIGJWYWx1ZSA9PT0gJ3N0cmluZycpIGJWYWx1ZSA9IGJWYWx1ZS50b0xvd2VyQ2FzZSgpO1xyXG4gICAgICBcclxuICAgICAgcmV0dXJuIGRpcmVjdGlvbiA9PT0gJ2FzYycgXHJcbiAgICAgICAgPyAoYVZhbHVlIDwgYlZhbHVlID8gLTEgOiBhVmFsdWUgPiBiVmFsdWUgPyAxIDogMClcclxuICAgICAgICA6IChhVmFsdWUgPiBiVmFsdWUgPyAtMSA6IGFWYWx1ZSA8IGJWYWx1ZSA/IDEgOiAwKTtcclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogR2V0IHNvcnQgdmFsdWUgZm9yIGFuIGl0ZW0gYmFzZWQgb24gY29sdW1uXHJcbiAgICovXHJcbiAgcHJpdmF0ZSBnZXRTb3J0VmFsdWUoaXRlbTogYW55LCBjb2x1bW46IHN0cmluZyk6IGFueSB7XHJcbiAgICBpZiAoY29sdW1uID09PSAncGF0aWVudF9uYW1lJykge1xyXG4gICAgICByZXR1cm4gKGl0ZW0ucGF0aWVudF9uYW1lPy5naXZlbl9uYW1lIHx8ICcnKSArICcgJyArIChpdGVtLnBhdGllbnRfbmFtZT8uZmFtaWx5X25hbWUgfHwgJycpO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIGl0ZW1bY29sdW1uXTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFByb2Nlc3MgdmlzaXQgZGF0YSB3aXRoIGNvbW1vbiBmaWVsZHNcclxuICAgKi9cclxuICBwcml2YXRlIHByb2Nlc3NWaXNpdERhdGEodmlzaXQ6IGFueSwgZW5jb3VudGVyVHlwZT86IHN0cmluZyk6IGFueSB7XHJcbiAgICB2aXNpdC5jaGVpZl9jb21wbGFpbnQgPSB0aGlzLmdldENoZWlmQ29tcGxhaW50KHZpc2l0KTtcclxuICAgIHZpc2l0LnZpc2l0X2NyZWF0ZWQgPSB2aXNpdD8uZGF0ZV9jcmVhdGVkIFxyXG4gICAgICA/IHRoaXMuZ2V0Q3JlYXRlZEF0KHZpc2l0LmRhdGVfY3JlYXRlZC5yZXBsYWNlKCdaJywnKzA1MzAnKSkgXHJcbiAgICAgIDogdGhpcy5nZXRFbmNvdW50ZXJDcmVhdGVkKHZpc2l0LCBlbmNvdW50ZXJUeXBlIHx8IHZpc2l0VHlwZXMuQURVTFRJTklUSUFMKTtcclxuICAgIHZpc2l0LnBlcnNvbi5hZ2UgPSB0aGlzLmNhbGN1bGF0ZUFnZSh2aXNpdC5wZXJzb24uYmlydGhkYXRlKTtcclxuICAgIHZpc2l0LmxvY2F0aW9uID0gdmlzaXQ/LmxvY2F0aW9uPy5uYW1lO1xyXG4gICAgdmlzaXQuYWdlID0gdmlzaXQ/LnBlcnNvbj8uYWdlICsgJyAnICsgdGhpcy50cmFuc2xhdGVTZXJ2aWNlLmluc3RhbnQoJ3knKTtcclxuICAgIFxyXG4gICAgLy8gQWRkIHNwZWNpZmljIGZpZWxkcyBiYXNlZCBvbiB2aXNpdCB0eXBlXHJcbiAgICBpZiAoZW5jb3VudGVyVHlwZSA9PT0gdmlzaXRUeXBlcy5WSVNJVF9OT1RFKSB7XHJcbiAgICAgIHZpc2l0LnByZXNjcmlwdGlvbl9zdGFydGVkID0gdGhpcy5nZXRFbmNvdW50ZXJDcmVhdGVkKHZpc2l0LCB2aXNpdFR5cGVzLlZJU0lUX05PVEUpO1xyXG4gICAgfVxyXG4gICAgaWYgKGVuY291bnRlclR5cGUgPT09IHZpc2l0VHlwZXMuQ09NUExFVEVEX1ZJU0lUKSB7XHJcbiAgICAgIHZpc2l0LmNvbXBsZXRlZCA9IHZpc2l0Py5kYXRlX2NyZWF0ZWQgXHJcbiAgICAgICAgPyB0aGlzLmdldENyZWF0ZWRBdCh2aXNpdC5kYXRlX2NyZWF0ZWQucmVwbGFjZSgnWicsICcrMDUzMCcpKSBcclxuICAgICAgICA6IHRoaXMuZ2V0RW5jb3VudGVyQ3JlYXRlZCh2aXNpdCwgdmlzaXRUeXBlcy5WSVNJVF9DT01QTEVURSk7XHJcbiAgICB9XHJcbiAgICBpZiAoZW5jb3VudGVyVHlwZSA9PT0gdmlzaXRUeXBlcy5GTEFHR0VEKSB7XHJcbiAgICAgIHZpc2l0LnZpc2l0X2NyZWF0ZWQgPSB2aXNpdD8uZGF0ZV9jcmVhdGVkIFxyXG4gICAgICAgID8gdGhpcy5nZXRDcmVhdGVkQXQodmlzaXQuZGF0ZV9jcmVhdGVkLnJlcGxhY2UoJ1onLCcrMDUzMCcpKSBcclxuICAgICAgICA6IHRoaXMuZ2V0RW5jb3VudGVyQ3JlYXRlZCh2aXNpdCwgdmlzaXRUeXBlcy5GTEFHR0VEKTtcclxuICAgIH1cclxuICAgIFxyXG4gICAgLy8gQWRkIGNvbW1vbiBmaWVsZHNcclxuICAgIHZpc2l0LlRNSF9wYXRpZW50X2lkID0gdGhpcy5nZXRBdHRyaWJ1dGVEYXRhKHZpc2l0LCBcIlRNSCBDYXNlIE51bWJlclwiKT8udmFsdWU7XHJcbiAgICB2aXNpdC5wYXRpZW50X3R5cGUgPSB0aGlzLmdldERlbWFyY2F0aW9uKHZpc2l0Py5lbmNvdW50ZXJzKTtcclxuICAgIFxyXG4gICAgcmV0dXJuIHZpc2l0O1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogR2VuZXJpYyBkYXRhIGxvYWRpbmcgbWV0aG9kXHJcbiAgICovXHJcbiAgcHJpdmF0ZSBsb2FkVmlzaXREYXRhKFxyXG4gICAgcGFnZTogbnVtYmVyLCBcclxuICAgIHZpc2l0QXJyYXk6IGFueVtdLCBcclxuICAgIHNlcnZpY2VNZXRob2Q6IChzcGVjaWFsaXphdGlvbjogc3RyaW5nLCBwYWdlOiBudW1iZXIpID0+IGFueSxcclxuICAgIGVuY291bnRlclR5cGU/OiBzdHJpbmcsXHJcbiAgICBjdXN0b21Tb3J0aW5nPzogKHZpc2l0czogYW55W10pID0+IGFueVtdXHJcbiAgKTogdm9pZCB7XHJcbiAgICB0aGlzLm5neExvYWRlci5zdGFydExvYWRlcigndGFibGUtbG9hZGVyLScgKyB0aGlzLnBsdWdpbkNvbmZpZ09icy5wbHVnaW5Db25maWdPYnNGbGFnKTtcclxuICAgIFxyXG4gICAgaWYgKHBhZ2UgPT09IDEpIHtcclxuICAgICAgdmlzaXRBcnJheS5sZW5ndGggPSAwOyAvLyBDbGVhciBhcnJheSBlZmZpY2llbnRseVxyXG4gICAgICB0aGlzLnJlY29yZHNGZXRjaGVkID0gMDtcclxuICAgIH1cclxuICAgIFxyXG4gICAgc2VydmljZU1ldGhvZC5jYWxsKHRoaXMudmlzaXRTZXJ2aWNlLCB0aGlzLnNwZWNpYWxpemF0aW9uLCBwYWdlKS5zdWJzY3JpYmUoe1xyXG4gICAgICBuZXh0OiAocmVzOiBBcGlSZXNwb25zZU1vZGVsKSA9PiB7XHJcbiAgICAgICAgaWYgKHJlcy5zdWNjZXNzKSB7XHJcbiAgICAgICAgICB0aGlzLnRvdGFsUmVjb3JkcyA9IHJlcy50b3RhbENvdW50O1xyXG4gICAgICAgICAgdGhpcy5yZWNvcmRzRmV0Y2hlZCArPSB0aGlzLnBhZ2VTaXplO1xyXG4gICAgICAgICAgdGhpcy5lbWl0VmlzaXRzQ291bnQodGhpcy50b3RhbFJlY29yZHMpO1xyXG4gICAgICAgICAgXHJcbiAgICAgICAgICBjb25zdCBwcm9jZXNzZWRWaXNpdHMgPSByZXMuZGF0YS5tYXAodmlzaXQgPT4gdGhpcy5wcm9jZXNzVmlzaXREYXRhKHZpc2l0LCBlbmNvdW50ZXJUeXBlKSk7XHJcbiAgICAgICAgICBcclxuICAgICAgICAgIC8vIEFwcGx5IGN1c3RvbSBzb3J0aW5nIGlmIHByb3ZpZGVkXHJcbiAgICAgICAgICBjb25zdCBzb3J0ZWRWaXNpdHMgPSBjdXN0b21Tb3J0aW5nID8gY3VzdG9tU29ydGluZyhwcm9jZXNzZWRWaXNpdHMpIDogcHJvY2Vzc2VkVmlzaXRzO1xyXG4gICAgICAgICAgXHJcbiAgICAgICAgICAvLyBBZGQgdG8gdmlzaXQgYXJyYXlcclxuICAgICAgICAgIHZpc2l0QXJyYXkucHVzaCguLi5zb3J0ZWRWaXNpdHMpO1xyXG4gICAgICAgICAgXHJcbiAgICAgICAgICAvLyBVcGRhdGUgZGF0YSBzb3VyY2VzXHJcbiAgICAgICAgICB0aGlzLnVwZGF0ZURhdGFTb3VyY2VzKHZpc2l0QXJyYXksIHNvcnRlZFZpc2l0cyk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9LFxyXG4gICAgICBjb21wbGV0ZTogKCkgPT4ge1xyXG4gICAgICAgIHRoaXMubmd4TG9hZGVyLnN0b3BMb2FkZXIoJ3RhYmxlLWxvYWRlci0nICsgdGhpcy5wbHVnaW5Db25maWdPYnMucGx1Z2luQ29uZmlnT2JzRmxhZyk7XHJcbiAgICAgICAgdGhpcy5zY3JvbGxUb1RvcCgpO1xyXG4gICAgICB9XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFVwZGF0ZSBhbGwgZGF0YSBzb3VyY2VzIHdpdGggbmV3IGRhdGFcclxuICAgKi9cclxuICBwcml2YXRlIHVwZGF0ZURhdGFTb3VyY2VzKHZpc2l0QXJyYXk6IGFueVtdLCBzb3J0ZWRWaXNpdHM/OiBhbnlbXSk6IHZvaWQge1xyXG4gICAgdGhpcy5kYXRhU291cmNlID0gc29ydGVkVmlzaXRzID8gWy4uLnNvcnRlZFZpc2l0c10gOiBbLi4udmlzaXRBcnJheV07XHJcbiAgICB0aGlzLm9yaWdpbmFsRGF0YSA9IFsuLi52aXNpdEFycmF5XTtcclxuICAgIHRoaXMuZmlsdGVyZWREYXRhU291cmNlID0gWy4uLnZpc2l0QXJyYXldO1xyXG4gICAgdGhpcy5hcHBseVBhZ2luYXRpb24oKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEN1c3RvbSBzb3J0aW5nIGZvciBpbi1wcm9ncmVzcyB2aXNpdHMgYnkgcHJlc2NyaXB0aW9uIHRpbWVcclxuICAgKi9cclxuICBwcml2YXRlIHNvcnRJblByb2dyZXNzVmlzaXRzKHZpc2l0czogYW55W10pOiBhbnlbXSB7XHJcbiAgICByZXR1cm4gdmlzaXRzLnNvcnQoKGEsIGIpID0+IHtcclxuICAgICAgY29uc3QgcGFyc2VUaW1lID0gKHZhbHVlOiBzdHJpbmcpID0+IHtcclxuICAgICAgICBpZiAodmFsdWUuaW5jbHVkZXMoXCJtaW51dGVzIGFnb1wiKSkge1xyXG4gICAgICAgICAgcmV0dXJuIHsgdHlwZTogXCJtaW51dGVzXCIsIHRpbWU6IHBhcnNlSW50KHZhbHVlKSB9O1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAodmFsdWUuaW5jbHVkZXMoXCJIb3VycyBhZ29cIikpIHtcclxuICAgICAgICAgIHJldHVybiB7IHR5cGU6IFwiaG91cnNcIiwgdGltZTogcGFyc2VJbnQodmFsdWUpICogNjAgfTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHsgdHlwZTogXCJkYXRlXCIsIHRpbWU6IG1vbWVudCh2YWx1ZSwgXCJERCBNTU0sIFlZWVlcIikudmFsdWVPZigpIH07XHJcbiAgICAgIH07XHJcblxyXG4gICAgICBjb25zdCB2aXNpdEEgPSBwYXJzZVRpbWUoYS5wcmVzY3JpcHRpb25fc3RhcnRlZCk7XHJcbiAgICAgIGNvbnN0IHZpc2l0QiA9IHBhcnNlVGltZShiLnByZXNjcmlwdGlvbl9zdGFydGVkKTtcclxuICAgICAgXHJcbiAgICAgIC8vIFNvcnQgbWludXRlcyBmaXJzdCAoYXNjZW5kaW5nKVxyXG4gICAgICBpZiAodmlzaXRBLnR5cGUgPT09IFwibWludXRlc1wiICYmIHZpc2l0Qi50eXBlID09PSBcIm1pbnV0ZXNcIikge1xyXG4gICAgICAgIHJldHVybiB2aXNpdEEudGltZSAtIHZpc2l0Qi50aW1lO1xyXG4gICAgICB9XHJcbiAgICAgIC8vIFNvcnQgaG91cnMgZmlyc3QgKGFzY2VuZGluZylcclxuICAgICAgaWYgKHZpc2l0QS50eXBlID09PSBcImhvdXJzXCIgJiYgdmlzaXRCLnR5cGUgPT09IFwiaG91cnNcIikge1xyXG4gICAgICAgIHJldHVybiB2aXNpdEEudGltZSAtIHZpc2l0Qi50aW1lO1xyXG4gICAgICB9XHJcbiAgICAgIC8vIFNvcnQgZGF0ZXMgKGRlc2NlbmRpbmcpXHJcbiAgICAgIGlmICh2aXNpdEEudHlwZSA9PT0gXCJkYXRlXCIgJiYgdmlzaXRCLnR5cGUgPT09IFwiZGF0ZVwiKSB7XHJcbiAgICAgICAgcmV0dXJuIHZpc2l0Qi50aW1lIC0gdmlzaXRBLnRpbWU7XHJcbiAgICAgIH1cclxuICAgICAgLy8gUHJpb3JpdGl6ZSBtaW51dGVzIG92ZXIgaG91cnMsIGFuZCBob3VycyBvdmVyIGRhdGVzXHJcbiAgICAgIGlmICh2aXNpdEEudHlwZSA9PT0gXCJtaW51dGVzXCIpIHJldHVybiAtMTtcclxuICAgICAgaWYgKHZpc2l0Qi50eXBlID09PSBcIm1pbnV0ZXNcIikgcmV0dXJuIDE7XHJcbiAgICAgIGlmICh2aXNpdEEudHlwZSA9PT0gXCJob3Vyc1wiKSByZXR1cm4gLTE7XHJcbiAgICAgIGlmICh2aXNpdEIudHlwZSA9PT0gXCJob3Vyc1wiKSByZXR1cm4gMTtcclxuXHJcbiAgICAgIHJldHVybiAwO1xyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBQcm9jZXNzIGZvbGxvdy11cCB2aXNpdCBkYXRhIHdpdGggc3BlY2lhbCBoYW5kbGluZ1xyXG4gICAqL1xyXG4gIHByaXZhdGUgcHJvY2Vzc0ZvbGxvd1VwVmlzaXREYXRhKHZpc2l0OiBhbnkpOiBhbnkge1xyXG4gICAgaWYgKCF2aXNpdD8uZW5jb3VudGVycz8ubGVuZ3RoKSByZXR1cm4gbnVsbDtcclxuICAgIFxyXG4gICAgdmlzaXQuY2hlaWZfY29tcGxhaW50ID0gdGhpcy5nZXRDaGVpZkNvbXBsYWludCh2aXNpdCk7XHJcbiAgICB2aXNpdC52aXNpdF9jcmVhdGVkID0gdmlzaXQ/LmRhdGVfY3JlYXRlZCBcclxuICAgICAgPyB0aGlzLmdldENyZWF0ZWRBdCh2aXNpdC5kYXRlX2NyZWF0ZWQucmVwbGFjZSgnWicsICcrMDUzMCcpKSBcclxuICAgICAgOiB0aGlzLmdldEVuY291bnRlckNyZWF0ZWQodmlzaXQsIHZpc2l0VHlwZXMuQ09NUExFVEVEX1ZJU0lUKTtcclxuICAgIHZpc2l0LnBlcnNvbi5hZ2UgPSB0aGlzLmNhbGN1bGF0ZUFnZSh2aXNpdC5wZXJzb24uYmlydGhkYXRlKTtcclxuICAgIHZpc2l0LmNvbXBsZXRlZCA9IHRoaXMuZ2V0RW5jb3VudGVyQ3JlYXRlZCh2aXNpdCwgdmlzaXRUeXBlcy5WSVNJVF9DT01QTEVURSk7XHJcbiAgICB2aXNpdC5mb2xsb3dVcCA9IHRoaXMucHJvY2Vzc0ZvbGxvd1VwRGF0ZShcclxuICAgICAgdGhpcy5nZXRFbmNvdW50ZXJPYnModmlzaXQuZW5jb3VudGVycywgdmlzaXRUeXBlcy5WSVNJVF9OT1RFLCBUYWJsZUdyaWRDb21wb25lbnQuRk9MTE9XX1VQX0NPTkNFUFRfSUQpPy52YWx1ZV90ZXh0XHJcbiAgICApO1xyXG4gICAgdmlzaXQubG9jYXRpb24gPSB2aXNpdD8ubG9jYXRpb24/Lm5hbWU7XHJcbiAgICB2aXNpdC5hZ2UgPSB2aXNpdD8ucGVyc29uPy5hZ2UgKyAnICcgKyB0aGlzLnRyYW5zbGF0ZVNlcnZpY2UuaW5zdGFudCgneScpO1xyXG4gICAgXHJcbiAgICByZXR1cm4gdmlzaXQ7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBTY3JvbGwgdG8gdG9wIG9mIHRoZSB0YWJsZSBjb250YWluZXJcclxuICAgKi9cclxuICBwcml2YXRlIHNjcm9sbFRvVG9wKCkge1xyXG4gICAgLy8gRmluZCB0aGUgdGFibGUgY29udGFpbmVyIGFuZCBzY3JvbGwgdG8gdG9wIHVzaW5nIHVuaXF1ZSBjb21wb25lbnQgSURcclxuICAgIGNvbnN0IHRhYmxlQ29udGFpbmVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3RhYmxlLWNvbnRhaW5lci0nICsgdGhpcy5jb21wb25lbnRJZCk7XHJcbiAgICBpZiAodGFibGVDb250YWluZXIpIHtcclxuICAgICAgdGFibGVDb250YWluZXIuc2Nyb2xsVG9wID0gMDtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEFkZCBkYXRhLXRlc3QtaWRzIHRvIGRhdGVwaWNrZXIgY2FsZW5kYXIgbmF2aWdhdGlvbiBidXR0b25zIGFuZCBkYXRlIGNlbGxzXHJcbiAgICovXHJcbiAgYWRkQ2FsZW5kYXJOYXZpZ2F0aW9uVGVzdElkcygpIHtcclxuICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAvLyBBZGQgdGVzdCBJRHMgdG8gbmF2aWdhdGlvbiBidXR0b25zXHJcbiAgICAgIGNvbnN0IHByZXZCdXR0b24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcubWF0LWNhbGVuZGFyLXByZXZpb3VzLWJ1dHRvbicpO1xyXG4gICAgICBjb25zdCBuZXh0QnV0dG9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLm1hdC1jYWxlbmRhci1uZXh0LWJ1dHRvbicpO1xyXG5cclxuICAgICAgaWYgKHByZXZCdXR0b24gJiYgIXByZXZCdXR0b24uZ2V0QXR0cmlidXRlKCdkYXRhLXRlc3QtaWQnKSkge1xyXG4gICAgICAgIHByZXZCdXR0b24uc2V0QXR0cmlidXRlKCdkYXRhLXRlc3QtaWQnLCAnY2FsZW5kYXJOYXZQcmV2aW91cycpO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBpZiAobmV4dEJ1dHRvbiAmJiAhbmV4dEJ1dHRvbi5nZXRBdHRyaWJ1dGUoJ2RhdGEtdGVzdC1pZCcpKSB7XHJcbiAgICAgICAgbmV4dEJ1dHRvbi5zZXRBdHRyaWJ1dGUoJ2RhdGEtdGVzdC1pZCcsICdjYWxlbmRhck5hdk5leHQnKTtcclxuICAgICAgfVxyXG5cclxuICAgICAgLy8gQWRkIHRlc3QgSURzIHRvIGFsbCBkYXRlIGNlbGxzXHJcbiAgICAgIGNvbnN0IGRhdGVDZWxscyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5tYXQtY2FsZW5kYXItYm9keS1jZWxsJyk7XHJcbiAgICAgIGRhdGVDZWxscy5mb3JFYWNoKChjZWxsOiBFbGVtZW50KSA9PiB7XHJcbiAgICAgICAgaWYgKCFjZWxsLmdldEF0dHJpYnV0ZSgnZGF0YS10ZXN0LWlkJykpIHtcclxuICAgICAgICAgIGNvbnN0IGRhdGVCdXR0b24gPSBjZWxsLnF1ZXJ5U2VsZWN0b3IoJy5tYXQtY2FsZW5kYXItYm9keS1jZWxsLWNvbnRlbnQnKTtcclxuICAgICAgICAgIGlmIChkYXRlQnV0dG9uKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IGRhdGVWYWx1ZSA9IGRhdGVCdXR0b24udGV4dENvbnRlbnQ/LnRyaW0oKTtcclxuICAgICAgICAgICAgaWYgKGRhdGVWYWx1ZSkge1xyXG4gICAgICAgICAgICAgIGNlbGwuc2V0QXR0cmlidXRlKCdkYXRhLXRlc3QtaWQnLCBgY2FsZW5kYXJEYXRlLSR7ZGF0ZVZhbHVlfWApO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICB9KTtcclxuICAgIH0sIDApO1xyXG4gIH1cclxufVxyXG5cclxuIiwiPG1hdC1leHBhbnNpb24tcGFuZWwgW2V4cGFuZGVkXT1cInRydWVcIiBkYXRhLXRlc3QtaWQ9XCJtYXRFeHBBcHBvaW50bWVudFwiPlxyXG4gIDxtYXQtZXhwYW5zaW9uLXBhbmVsLWhlYWRlciBkYXRhLXRlc3QtaWQ9XCJtYXRFeHBIZWFkZXJBcHBvaW50bWVudFwiPlxyXG4gICAgPG1hdC1wYW5lbC10aXRsZSBkYXRhLXRlc3QtaWQ9XCJtYXRQYW5lbFRpdGxlQXBwb2ludG1lbnRcIj5cclxuICAgICAgPGRpdiBpZD1cInt7cGx1Z2luQ29uZmlnT2JzLmFuY2hvcklkfX1cIiBjbGFzcz1cImFuY2hvci1jb25cIiBkYXRhLXRlc3QtaWQ9XCJkaXZBbmNob3JBcHBvaW50bWVudFwiPjwvZGl2PlxyXG4gICAgICA8ZGl2IGNsYXNzPVwiaW50ZWwtYWNjb3JkaW9uLXRpdGxlXCIgZGF0YS10ZXN0LWlkPVwiZGl2QWNjb3JkaW9uVGl0bGVBcHBvaW50bWVudFwiPlxyXG4gICAgICAgIDxpbWcgc3JjPVwie3sgcGx1Z2luQ29uZmlnT2JzLnRhYmxlSGVhZGVySWNvbiB9fVwiIGFsdD1cIlwiIHdpZHRoPVwiNDRweFwiIGRhdGEtdGVzdC1pZD1cImltZ1RhYmxlSGVhZGVySWNvbkFwcG9pbnRtZW50XCI+XHJcbiAgICAgICAgPGg2IGNsYXNzPVwibWItMCBtbC0yXCIgW2F0dHIuZGF0YS10ZXN0LWlkXT1cInBsdWdpbkNvbmZpZ09icy50YWJsZUhlYWRlclwiPiBcclxuICAgICAgICAgIHt7IHBsdWdpbkNvbmZpZ09icy50YWJsZUhlYWRlciB8IHRyYW5zbGF0ZSB9fSAoe3sgZ2V0Q3VycmVudFRvdGFsQ291bnQoKSB9fSlcclxuICAgICAgICA8L2g2PiAgIFxyXG4gICAgICAgIDxtYXQtaWNvbiBcclxuICAgICAgICAgIGFyaWEtaGlkZGVuPVwiZmFsc2VcIiBcclxuICAgICAgICAgIGFyaWEtbGFiZWw9XCJoZWxwIGljb25cIiBcclxuICAgICAgICAgIG1hdFRvb2x0aXA9XCJ7eyAocGx1Z2luQ29uZmlnT2JzLnRvb2x0aXBMYWJlbCB8IHRyYW5zbGF0ZSkgfX1cIiBcclxuICAgICAgICAgIG1hdFRvb2x0aXBQb3NpdGlvbj1cInJpZ2h0XCIgXHJcbiAgICAgICAgICBkYXRhLXRlc3QtaWQ9XCJpY29IZWxwQXBwb2ludG1lbnRcIj5cclxuICAgICAgICAgIGhlbHBfb3V0bGluZVxyXG4gICAgICAgIDwvbWF0LWljb24+XHJcblxyXG4gICAgICAgIDwhLS0gRmlsdGVyIGJ1dHRvbiAtLT5cclxuICAgICAgICA8ZGl2IGNsYXNzPVwibWwtYXV0byBmaWx0ZXItc2VhcmNoLWNvbnRhaW5lclwiIGRhdGEtdGVzdC1pZD1cImRpdkZpbHRlckNvbnRhaW5lckFwcG9pbnRtZW50XCI+XHJcbiAgICAgICAgICA8YnV0dG9uIFxyXG4gICAgICAgICAgICAqbmdJZj1cInBsdWdpbkNvbmZpZ09icy5maWx0ZXJPYnMuZmlsdGVyRmxhZ1wiIFxyXG4gICAgICAgICAgICBjbGFzcz1cIm1hdC1zdHJva2VkLWJ1dHRvbiBmaWx0ZXItYnRuXCIgXHJcbiAgICAgICAgICAgIFttYXRNZW51VHJpZ2dlckZvcl09XCJmaWx0ZXJNZW51XCIgXHJcbiAgICAgICAgICAgIChjbGljayk9XCIkZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XCIgXHJcbiAgICAgICAgICAgIGRhdGEtdGVzdC1pZD1cImJ0bkZpbHRlckFwcG9pbnRtZW50XCI+XHJcbiAgICAgICAgICAgIDxpbWcgc3JjPVwie3twbHVnaW5Db25maWdPYnMuZmlsdGVyT2JzLmZpbHRlckljb259fVwiIGFsdD1cIlwiIGRhdGEtdGVzdC1pZD1cImltZ0ZpbHRlckljb25BcHBvaW50bWVudFwiPiBcclxuICAgICAgICAgICAge3soIHBsdWdpbkNvbmZpZ09icy5maWx0ZXJPYnMuZmlsdGVyTGFiZWx8IHRyYW5zbGF0ZSl9fVxyXG4gICAgICAgICAgPC9idXR0b24+XHJcblxyXG4gICAgICAgICAgPCEtLSBGaWx0ZXIgTWVudSAtLT5cclxuICAgICAgICAgIDxtYXQtbWVudSAjZmlsdGVyTWVudT1cIm1hdE1lbnVcIiBjbGFzcz1cImN1c3RvbS1tZW51XCIgW2hhc0JhY2tkcm9wXT1cInRydWVcIiB4UG9zaXRpb249XCJiZWZvcmVcIiBkYXRhLXRlc3QtaWQ9XCJtZW51RmlsdGVyQXBwb2ludG1lbnRcIj5cclxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cInRvZ2dsZS1idXR0b25zXCIgZGF0YS10ZXN0LWlkPVwiZGl2VG9nZ2xlQnV0dG9uc0FwcG9pbnRtZW50XCI+XHJcbiAgICAgICAgICAgICAgPGJ1dHRvbiBcclxuICAgICAgICAgICAgICAgIG1hdC1idXR0b24gXHJcbiAgICAgICAgICAgICAgICBbY2xhc3MuYWN0aXZlXT1cIm1vZGUgPT09ICdkYXRlJ1wiIFxyXG4gICAgICAgICAgICAgICAgKGNsaWNrKT1cInNldE1vZGUoJ2RhdGUnKTsgJGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpOyByZXNldERhdGUodHJ1ZSlcIiBcclxuICAgICAgICAgICAgICAgIGRhdGEtdGVzdC1pZD1cImJ0bkRhdGVNb2RlQXBwb2ludG1lbnRcIj5cclxuICAgICAgICAgICAgICAgIHt7J0RhdGUnIHwgdHJhbnNsYXRlfX1cclxuICAgICAgICAgICAgICA8L2J1dHRvbj5cclxuICAgICAgICAgICAgICA8YnV0dG9uIFxyXG4gICAgICAgICAgICAgICAgbWF0LWJ1dHRvbiBcclxuICAgICAgICAgICAgICAgIFtjbGFzcy5hY3RpdmVdPVwibW9kZSA9PT0gJ3JhbmdlJ1wiIFxyXG4gICAgICAgICAgICAgICAgKGNsaWNrKT1cInNldE1vZGUoJ3JhbmdlJyk7ICRldmVudC5zdG9wUHJvcGFnYXRpb24oKTsgcmVzZXREYXRlKHRydWUpXCIgXHJcbiAgICAgICAgICAgICAgICBkYXRhLXRlc3QtaWQ9XCJidG5SYW5nZU1vZGVBcHBvaW50bWVudFwiPlxyXG4gICAgICAgICAgICAgICAge3snUmFuZ2UnIHwgdHJhbnNsYXRlfX1cclxuICAgICAgICAgICAgICA8L2J1dHRvbj5cclxuICAgICAgICAgICAgPC9kaXY+XHJcblxyXG4gICAgICAgICAgICA8IS0tIERhdGUgTW9kZSAtLT5cclxuICAgICAgICAgICAgPGRpdiAqbmdJZj1cIm1vZGUgPT09ICdkYXRlJ1wiIGNsYXNzPVwiZGF0ZS12aWV3XCIgKGNsaWNrKT1cIiRldmVudC5zdG9wUHJvcGFnYXRpb24oKVwiIGRhdGEtdGVzdC1pZD1cImRpdkRhdGVNb2RlQXBwb2ludG1lbnRcIj5cclxuICAgICAgICAgICAgICA8Zm9ybSBbZm9ybUdyb3VwXT1cImZpbHRlcmVkRGF0ZUFuZFJhbmdlRm9ybVwiIGRhdGEtdGVzdC1pZD1cImZvcm1EYXRlRmlsdGVyQXBwb2ludG1lbnRcIj5cclxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJmb3JtLWRhdGVcIiBkYXRhLXRlc3QtaWQ9XCJkaXZGb3JtRGF0ZUFwcG9pbnRtZW50XCI+XHJcbiAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJpbnB1dC1kYXRlXCIgZGF0YS10ZXN0LWlkPVwiZGl2SW5wdXREYXRlQXBwb2ludG1lbnRcIj5cclxuICAgICAgICAgICAgICAgICAgICA8bGFiZWwgY2xhc3M9XCJsYWJlbC10ZXh0XCIgZGF0YS10ZXN0LWlkPVwibGJsU2VsZWN0RGF0ZUFwcG9pbnRtZW50XCI+e3sgJ1NlbGVjdCBkYXRlJyB8IHRyYW5zbGF0ZX19PC9sYWJlbD5cclxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiaW5wdXQtd3JhcHBlclwiIGRhdGEtdGVzdC1pZD1cImRpdklucHV0V3JhcHBlckRhdGVBcHBvaW50bWVudFwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgPGlucHV0XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHR5cGU9XCJ0ZXh0XCJcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3M9XCJmb3JtLWNvbnRyb2xcIlxyXG4gICAgICAgICAgICAgICAgICAgICAgICBbY2xhc3MuZXJyb3ItYm9yZGVyXT1cImRhdGVFcnJvck1lc3NhZ2VcIlxyXG4gICAgICAgICAgICAgICAgICAgICAgICBbbWF4XT1cIm1heERhdGVcIlxyXG4gICAgICAgICAgICAgICAgICAgICAgICBmb3JtQ29udHJvbE5hbWU9XCJkYXRlXCJcclxuICAgICAgICAgICAgICAgICAgICAgICAgW21hdERhdGVwaWNrZXJdPVwiZGF0ZVBpY2tlclwiXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFtwbGFjZWhvbGRlcl09XCJmaWx0ZXJlZERhdGVBbmRSYW5nZUZvcm0uZ2V0KCdkYXRlJyk/LnZhbHVlID8gKGZpbHRlcmVkRGF0ZUFuZFJhbmdlRm9ybS5nZXQoJ2RhdGUnKT8udmFsdWUgfCBkYXRlOiAnZGQvTU0veXl5eScpIDogKCdTZWxlY3QgZGF0ZScgfCB0cmFuc2xhdGUpXCJcclxuICAgICAgICAgICAgICAgICAgICAgICAgYXJpYS1sYWJlbD1cIkRhdGVcIlxyXG4gICAgICAgICAgICAgICAgICAgICAgICByZWFkb25seVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBkYXRhLXRlc3QtaWQ9XCJldERhdGVcIi8+XHJcbiAgICAgICAgICAgICAgICAgICAgICA8bWF0LWRhdGVwaWNrZXIgI2RhdGVQaWNrZXIgKG9wZW5lZCk9XCJhZGRDYWxlbmRhck5hdmlnYXRpb25UZXN0SWRzKClcIiBkYXRhLXRlc3QtaWQ9XCJtYXREYXRlUGlja2VyQXBwb2ludG1lbnRcIj48L21hdC1kYXRlcGlja2VyPlxyXG4gICAgICAgICAgICAgICAgICAgICAgPG1hdC1kYXRlcGlja2VyLXRvZ2dsZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBtYXRTdWZmaXhcclxuICAgICAgICAgICAgICAgICAgICAgICAgW2Zvcl09XCJkYXRlUGlja2VyXCJcclxuICAgICAgICAgICAgICAgICAgICAgICAgZGF0YS10ZXN0LWlkPVwiZHBEYXRlXCJcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3M9XCJkYXRlcGlja2VyLWljb25cIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPGltZyBtYXREYXRlcGlja2VyVG9nZ2xlSWNvbiBzcmM9XCJhc3NldHMvc3Zncy9jYWxlbmRhci1kYXRlLnN2Z1wiIGFsdD1cIlwiIGRhdGEtdGVzdC1pZD1cImltZ0RhdGVQaWNrZXJJY29uQXBwb2ludG1lbnRcIj5cclxuICAgICAgICAgICAgICAgICAgICAgIDwvbWF0LWRhdGVwaWNrZXItdG9nZ2xlPlxyXG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgIDxzcGFuICpuZ0lmPVwiZGF0ZUVycm9yTWVzc2FnZVwiIGNsYXNzPVwiZXJyb3ItbWVzc2FnZVwiIGRhdGEtdGVzdC1pZD1cInNwYW5EYXRlRXJyb3JNZXNzYWdlQXBwb2ludG1lbnRcIj57eyBkYXRlRXJyb3JNZXNzYWdlIH19PC9zcGFuPlxyXG4gICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgIDwvZm9ybT5cclxuICAgICAgICAgICAgPC9kaXY+XHJcblxyXG4gICAgICAgICAgICA8IS0tIFJhbmdlIE1vZGUgLS0+XHJcbiAgICAgICAgICAgIDxkaXYgKm5nSWY9XCJtb2RlID09PSAncmFuZ2UnXCIgY2xhc3M9XCJyYW5nZS12aWV3XCIgKGNsaWNrKT1cIiAkZXZlbnQuc3RvcFByb3BhZ2F0aW9uKClcIiBkYXRhLXRlc3QtaWQ9XCJkaXZSYW5nZU1vZGVBcHBvaW50bWVudFwiPlxyXG4gICAgICAgICAgICAgIDxmb3JtIFtmb3JtR3JvdXBdPVwiZmlsdGVyZWREYXRlQW5kUmFuZ2VGb3JtXCIgZGF0YS10ZXN0LWlkPVwiZm9ybVJhbmdlRmlsdGVyQXBwb2ludG1lbnRcIj5cclxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJmb3JtLWRhdGVcIiBkYXRhLXRlc3QtaWQ9XCJkaXZGb3JtU3RhcnREYXRlQXBwb2ludG1lbnRcIj5cclxuICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImlucHV0LWRhdGVcIiBkYXRhLXRlc3QtaWQ9XCJkaXZJbnB1dFN0YXJ0RGF0ZUFwcG9pbnRtZW50XCI+XHJcbiAgICAgICAgICAgICAgICAgICAgPGxhYmVsIGNsYXNzPVwibGFiZWwtdGV4dFwiIGRhdGEtdGVzdC1pZD1cImxibFN0YXJ0RGF0ZUFwcG9pbnRtZW50XCI+e3sgJ1N0YXJ0IGRhdGUnIHwgdHJhbnNsYXRlIH19PC9sYWJlbD5cclxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiaW5wdXQtd3JhcHBlclwiIGRhdGEtdGVzdC1pZD1cImRpdklucHV0V3JhcHBlclN0YXJ0RGF0ZUFwcG9pbnRtZW50XCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICA8aW5wdXRcclxuICAgICAgICAgICAgICAgICAgICAgICAgdHlwZT1cInRleHRcIlxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjbGFzcz1cImZvcm0tY29udHJvbFwiXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFtjbGFzcy5lcnJvci1ib3JkZXJdPVwic3RhcnREYXRlRXJyb3JNZXNzYWdlXCJcclxuICAgICAgICAgICAgICAgICAgICAgICAgW21heF09XCJmaWx0ZXJlZERhdGVBbmRSYW5nZUZvcm0udmFsdWUuZW5kRGF0ZSA/IGZpbHRlcmVkRGF0ZUFuZFJhbmdlRm9ybS52YWx1ZS5lbmREYXRlIDogbWF4RGF0ZVwiXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGZvcm1Db250cm9sTmFtZT1cInN0YXJ0RGF0ZVwiXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFttYXREYXRlcGlja2VyXT1cInN0YXJ0RGF0ZVBpY2tlclwiXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFtwbGFjZWhvbGRlcl09XCJmaWx0ZXJlZERhdGVBbmRSYW5nZUZvcm0uZ2V0KCdzdGFydERhdGUnKT8udmFsdWUgPyAoZmlsdGVyZWREYXRlQW5kUmFuZ2VGb3JtLmdldCgnc3RhcnREYXRlJyk/LnZhbHVlIHwgZGF0ZTogJ2RkL01NL3l5eXknKSA6ICgnU2VsZWN0IHN0YXJ0IGRhdGUnfHRyYW5zbGF0ZSlcIlxyXG4gICAgICAgICAgICAgICAgICAgICAgICByZWFkb25seVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBkYXRhLXRlc3QtaWQ9XCJldFNlbFN0YXJ0RGF0ZVwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgPG1hdC1kYXRlcGlja2VyICNzdGFydERhdGVQaWNrZXIgKG9wZW5lZCk9XCJhZGRDYWxlbmRhck5hdmlnYXRpb25UZXN0SWRzKClcIiBkYXRhLXRlc3QtaWQ9XCJtYXRTdGFydERhdGVQaWNrZXJBcHBvaW50bWVudFwiPjwvbWF0LWRhdGVwaWNrZXI+XHJcbiAgICAgICAgICAgICAgICAgICAgICA8bWF0LWRhdGVwaWNrZXItdG9nZ2xlIG1hdFN1ZmZpeCBbZm9yXT1cInN0YXJ0RGF0ZVBpY2tlclwiIGNsYXNzPVwiZGF0ZXBpY2tlci1pY29uXCIgZGF0YS10ZXN0LWlkPVwiZHBTdGFydERhdGVcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPGltZyBtYXREYXRlcGlja2VyVG9nZ2xlSWNvbiBzcmM9XCJhc3NldHMvc3Zncy9jYWxlbmRhci1kYXRlLnN2Z1wiIGFsdD1cIlwiIGRhdGEtdGVzdC1pZD1cImltZ1N0YXJ0RGF0ZVBpY2tlckljb25BcHBvaW50bWVudFwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgPC9tYXQtZGF0ZXBpY2tlci10b2dnbGU+XHJcbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgPHNwYW4gKm5nSWY9XCJzdGFydERhdGVFcnJvck1lc3NhZ2VcIiBjbGFzcz1cImVycm9yLW1lc3NhZ2VcIiBkYXRhLXRlc3QtaWQ9XCJzcGFuU3RhcnREYXRlRXJyb3JNZXNzYWdlQXBwb2ludG1lbnRcIj57eyBzdGFydERhdGVFcnJvck1lc3NhZ2UgfX08L3NwYW4+XHJcbiAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiZm9ybS1kYXRlXCIgZGF0YS10ZXN0LWlkPVwiZGl2Rm9ybUVuZERhdGVBcHBvaW50bWVudFwiPlxyXG4gICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiaW5wdXQtZGF0ZVwiIGRhdGEtdGVzdC1pZD1cImRpdklucHV0RW5kRGF0ZUFwcG9pbnRtZW50XCI+XHJcbiAgICAgICAgICAgICAgICAgICAgPGxhYmVsIGNsYXNzPVwibGFiZWwtdGV4dFwiIGRhdGEtdGVzdC1pZD1cImxibEVuZERhdGVBcHBvaW50bWVudFwiPnt7ICdFbmQgZGF0ZScgfCB0cmFuc2xhdGUgfX08L2xhYmVsPlxyXG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJpbnB1dC13cmFwcGVyXCIgZGF0YS10ZXN0LWlkPVwiZGl2SW5wdXRXcmFwcGVyRW5kRGF0ZUFwcG9pbnRtZW50XCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICA8aW5wdXRcclxuICAgICAgICAgICAgICAgICAgICAgICAgdHlwZT1cInRleHRcIlxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjbGFzcz1cImZvcm0tY29udHJvbFwiXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFtjbGFzcy5lcnJvci1ib3JkZXJdPVwiZW5kRGF0ZUVycm9yTWVzc2FnZVwiXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFttaW5dPVwiZmlsdGVyZWREYXRlQW5kUmFuZ2VGb3JtLnZhbHVlLnN0YXJ0RGF0ZVwiXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFttYXhdPVwibWF4RGF0ZVwiXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGZvcm1Db250cm9sTmFtZT1cImVuZERhdGVcIlxyXG4gICAgICAgICAgICAgICAgICAgICAgICBbbWF0RGF0ZXBpY2tlcl09XCJlbmREYXRlUGlja2VyXCJcclxuICAgICAgICAgICAgICAgICAgICAgICAgW3BsYWNlaG9sZGVyXT1cImZpbHRlcmVkRGF0ZUFuZFJhbmdlRm9ybS5nZXQoJ2VuZERhdGUnKT8udmFsdWUgPyAoZmlsdGVyZWREYXRlQW5kUmFuZ2VGb3JtLmdldCgnZW5kRGF0ZScpPy52YWx1ZSB8IGRhdGU6ICdkZC9NTS95eXl5JykgOiAoJ1NlbGVjdCBlbmQgZGF0ZSd8dHJhbnNsYXRlKVwiXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlYWRvbmx5XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGRhdGEtdGVzdC1pZD1cImV0U2VsRW5kRGF0ZVwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgPG1hdC1kYXRlcGlja2VyICNlbmREYXRlUGlja2VyIChvcGVuZWQpPVwiYWRkQ2FsZW5kYXJOYXZpZ2F0aW9uVGVzdElkcygpXCIgZGF0YS10ZXN0LWlkPVwibWF0RW5kRGF0ZVBpY2tlckFwcG9pbnRtZW50XCI+PC9tYXQtZGF0ZXBpY2tlcj5cclxuICAgICAgICAgICAgICAgICAgICAgIDxtYXQtZGF0ZXBpY2tlci10b2dnbGUgbWF0U3VmZml4IFtmb3JdPVwiZW5kRGF0ZVBpY2tlclwiIGNsYXNzPVwiZGF0ZXBpY2tlci1pY29uXCIgZGF0YS10ZXN0LWlkPVwiZHBFbmREYXRlXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxpbWcgbWF0RGF0ZXBpY2tlclRvZ2dsZUljb24gc3JjPVwiYXNzZXRzL3N2Z3MvY2FsZW5kYXItZGF0ZS5zdmdcIiBhbHQ9XCJcIiBkYXRhLXRlc3QtaWQ9XCJpbWdFbmREYXRlUGlja2VySWNvbkFwcG9pbnRtZW50XCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICA8L21hdC1kYXRlcGlja2VyLXRvZ2dsZT5cclxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICA8c3BhbiAqbmdJZj1cImVuZERhdGVFcnJvck1lc3NhZ2VcIiBjbGFzcz1cImVycm9yLW1lc3NhZ2VcIiBkYXRhLXRlc3QtaWQ9XCJzcGFuRW5kRGF0ZUVycm9yTWVzc2FnZUFwcG9pbnRtZW50XCI+e3sgZW5kRGF0ZUVycm9yTWVzc2FnZSB9fTwvc3Bhbj5cclxuICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICA8L2Zvcm0+XHJcbiAgICAgICAgICAgIDwvZGl2PlxyXG5cclxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cImFjdGlvbi1idXR0b25zXCIgZGF0YS10ZXN0LWlkPVwiZGl2RmlsdGVyQWN0aW9uQnRuc0FwcG9pbnRtZW50XCI+XHJcbiAgICAgICAgICAgICAgPGJ1dHRvbiBtYXQtYnV0dG9uIGNsYXNzPVwicmVzZXQtYnRuXCIgKGNsaWNrKT1cInJlc2V0RGF0ZSh0cnVlKTsgJGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1wiIGRhdGEtdGVzdC1pZD1cImJ0blJlc2V0RmlsdGVyQXBwb2ludG1lbnRcIj57eyAnUmVzZXQnfCB0cmFuc2xhdGUgfX08L2J1dHRvbj5cclxuICAgICAgICAgICAgICA8YnV0dG9uIG1hdC1idXR0b24gY2xhc3M9XCJhcHBseS1idG5cIiAoY2xpY2spPVwiYXBwbHlEYXRlT3JSYW5nZUZpbHRlcihwbHVnaW5Db25maWdPYnMuZmlsdGVyT2JzLmZpbHRlckRhdGVGaWVsZCk7ICRldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcIiBkYXRhLXRlc3QtaWQ9XCJidG5BcHBseUZpbHRlckFwcG9pbnRtZW50XCI+e3sgJ0FwcGx5J3wgdHJhbnNsYXRlIH19PC9idXR0b24+XHJcbiAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgPC9tYXQtbWVudT5cclxuXHJcbiAgICAgICAgICA8IS0tIFNlYXJjaCAtLT5cclxuICAgICAgICAgIDxkaXYgY2xhc3M9XCJpbnB1dC1ncm91cCBzZWFyY2gtYmFyIG1sLWF1dG9cIiAoY2xpY2spPVwiJGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1wiIGRhdGEtdGVzdC1pZD1cImRpdlNlYXJjaEFwcG9pbnRtZW50XCI+XHJcbiAgICAgICAgICAgIDxpbnB1dFxyXG4gICAgICAgICAgICAgIHR5cGU9XCJ0ZXh0XCJcclxuICAgICAgICAgICAgICAjc2VhcmNoSW5wdXRcclxuICAgICAgICAgICAgICBjbGFzcz1cImZvcm0tY29udHJvbFwiXHJcbiAgICAgICAgICAgICAgcGxhY2Vob2xkZXI9XCJ7eyBwbHVnaW5Db25maWdPYnMuc2VhcmNoUGxhY2VIb2xkZXIgfCB0cmFuc2xhdGUgfX1cIlxyXG4gICAgICAgICAgICAgIChrZXl1cCk9XCJhcHBseUZpbHRlcigkZXZlbnQpXCJcclxuICAgICAgICAgICAgICAoa2V5ZG93bi5TcGFjZSk9XCIkZXZlbnQuc3RvcFByb3BhZ2F0aW9uKClcIlxyXG4gICAgICAgICAgICAgIChrZXlkb3duLkVudGVyKT1cIiRldmVudC5zdG9wUHJvcGFnYXRpb24oKVwiXHJcbiAgICAgICAgICAgICAgZGF0YS10ZXN0LWlkPVwiZXRTZWFyY2hBcHBvaW50bWVudERhc2hib2FyZFwiPlxyXG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwiaW5wdXQtZ3JvdXAtYXBwZW5kXCI+XHJcbiAgICAgICAgICAgICAgPGJ1dHRvblxyXG4gICAgICAgICAgICAgICAgY2xhc3M9XCJidG5SZXNldEFwU2VyYWNoIG1hdC1pY29uLWJ1dHRvblwiXHJcbiAgICAgICAgICAgICAgICBhcmlhLWxhYmVsPVwiUmVzZXQgYXBwb2ludG1lbnQgc2VhcmNoXCJcclxuICAgICAgICAgICAgICAgIChjbGljayk9XCJjbGVhckZpbHRlcigpOyAkZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XCJcclxuICAgICAgICAgICAgICAgICpuZ0lmPVwiaXNGaWx0ZXJBcHBsaWVkXCJcclxuICAgICAgICAgICAgICAgIGRhdGEtdGVzdC1pZD1cImJ0blJlc2V0U2VhcmNoQXBwb2ludG1lbnRcIj5cclxuICAgICAgICAgICAgICAgIDxtYXQtaWNvbiBjbGFzcz1cIm1sLTBcIj5jbG9zZTwvbWF0LWljb24+XHJcbiAgICAgICAgICAgICAgPC9idXR0b24+XHJcbiAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJpbnB1dC1ncm91cC10ZXh0IHNlYXJjaC1pY29uLXNwYW5cIiBkYXRhLXRlc3QtaWQ9XCJpY29TZWFyY2hBcHBvaW50bWVudFwiPlxyXG4gICAgICAgICAgICAgICAgPGltZyBzcmM9XCJhc3NldHMvc3Zncy9zZWFyY2gtaWNvbi5zdmdcIiBhbHQ9XCJcIiB3aWR0aD1cIjIwcHhcIiBoZWlnaHQ9XCIyMHB4XCIgZGF0YS10ZXN0LWlkPVwiaW1nU2VhcmNoSWNvbkFwcG9pbnRtZW50XCI+XHJcbiAgICAgICAgICAgICAgPC9zcGFuPlxyXG4gICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgIDwvZGl2PlxyXG4gICAgICA8L2Rpdj5cclxuICAgIDwvbWF0LXBhbmVsLXRpdGxlPlxyXG4gIDwvbWF0LWV4cGFuc2lvbi1wYW5lbC1oZWFkZXI+XHJcblxyXG4gIDxkaXYgY2xhc3M9XCJtYXQtZWxldmF0aW9uLXo4XCIgZGF0YS10ZXN0LWlkPVwiZGl2VGFibGVXcmFwcGVyQXBwb2ludG1lbnRcIj5cclxuICAgIDxzcGFuICpuZ0lmPVwidGFibGVMb2FkZXJcIj5cclxuICAgICAgPG5neC11aS1sb2FkZXIgXHJcbiAgICAgICAgW2xvYWRlcklkXT1cIid0YWJsZS1sb2FkZXItJyArIHBsdWdpbkNvbmZpZ09icy5wbHVnaW5Db25maWdPYnNGbGFnXCIgXHJcbiAgICAgICAgW2Znc1R5cGVdPVwiJ2JhbGwtc3Bpbi1jbG9ja3dpc2UnXCIgXHJcbiAgICAgICAgW2Znc0NvbG9yXT1cIicjYWJhNGE0J1wiIFxyXG4gICAgICAgIFtmZ3NQb3NpdGlvbl09XCInY2VudGVyLWNlbnRlcidcIiBcclxuICAgICAgICBbZmdzU2l6ZV09XCI1MFwiIFxyXG4gICAgICAgIFtvdmVybGF5Q29sb3JdPVwiJ3JnYigyNTUsIDI1NSwgMjU1KSdcIiBcclxuICAgICAgICBbaGFzUHJvZ3Jlc3NCYXJdPVwiZmFsc2VcIlxyXG4gICAgICAgIFt0ZXh0XT1cIignTG9hZGluZyd8dHJhbnNsYXRlKSArICcgJyArIChwbHVnaW5Db25maWdPYnMucGx1Z2luQ29uZmlnT2JzRmxhZ3x0cmFuc2xhdGUpICsgJyAnICsgKCdkYXRhJ3x0cmFuc2xhdGUpICsgJy4uLidcIlxyXG4gICAgICAgIFt0ZXh0Q29sb3JdPVwiJyMzMzMnXCJcclxuICAgICAgICBbdGV4dFBvc2l0aW9uXT1cIidjZW50ZXItY2VudGVyJ1wiXHJcbiAgICAgICAgZGF0YS10ZXN0LWlkPVwibG9hZGVyQXBwb2ludG1lbnRcIlxyXG4gICAgICA+PC9uZ3gtdWktbG9hZGVyPlxyXG4gICAgPC9zcGFuPlxyXG4gICAgPGRpdiBjbGFzcz1cInRhYmxlLWNvbnRhaW5lclwiIGlkPVwidGFibGUtY29udGFpbmVyLXt7Y29tcG9uZW50SWR9fVwiPlxyXG4gICAgICA8dGFibGUgbWF0LXRhYmxlIFtkYXRhU291cmNlXT1cInBhZ2luYXRlZERhdGFTb3VyY2VcIj5cclxuXHJcbiAgICAgIDxuZy1jb250YWluZXIgKm5nRm9yPVwibGV0IGNvbHVtbiBvZiBkaXNwbGF5ZWRBcHBvaW50bWVudENvbHVtbnNcIiBbbWF0Q29sdW1uRGVmXT1cImNvbHVtbi5rZXlcIj5cclxuICAgICAgICA8bmctY29udGFpbmVyICpuZ0lmPVwiY29sdW1uLmlzU29ydGFibGU7IGVsc2Ugbm9Tb3J0XCI+XHJcbiAgICAgICAgICA8dGggbWF0LWhlYWRlci1jZWxsICptYXRIZWFkZXJDZWxsRGVmIChjbGljayk9XCJoYW5kbGVTb3J0KGNvbHVtbi5rZXksICdhc2MnKVwiIFthdHRyLmRhdGEtdGVzdC1pZF09XCIndGgtJyArIGNvbHVtbi5rZXkgKyAnLScgKyBwbHVnaW5Db25maWdPYnMucGx1Z2luQ29uZmlnT2JzRmxhZ1wiIGNsYXNzPVwic29ydGFibGUtaGVhZGVyXCI+XHJcbiAgICAgICAgICAgIHt7IGNvbHVtbi5sYWJlbCB8IHRyYW5zbGF0ZSB9fVxyXG4gICAgICAgICAgICA8bWF0LWljb24gY2xhc3M9XCJzb3J0LWljb25cIj5hcnJvd191cHdhcmQ8L21hdC1pY29uPlxyXG4gICAgICAgICAgPC90aD5cclxuICAgICAgICA8L25nLWNvbnRhaW5lcj5cclxuICAgICAgICA8bmctdGVtcGxhdGUgI25vU29ydD5cclxuICAgICAgICAgIDx0aCBtYXQtaGVhZGVyLWNlbGwgKm1hdEhlYWRlckNlbGxEZWYgIFthdHRyLmRhdGEtdGVzdC1pZF09XCIndGgtJyArIGNvbHVtbi5rZXkrICctJyArIHBsdWdpbkNvbmZpZ09icy5wbHVnaW5Db25maWdPYnNGbGFnXCI+XHJcbiAgICAgICAgICAgIHt7IGNvbHVtbi5sYWJlbCB8IHRyYW5zbGF0ZSB9fVxyXG4gICAgICAgICAgPC90aD5cclxuICAgICAgICA8L25nLXRlbXBsYXRlPlxyXG5cclxuICAgICAgICA8dGQgbWF0LWNlbGwgKm1hdENlbGxEZWY9XCJsZXQgZWxlbWVudDsgbGV0IGogPSBpbmRleDtcIiAgW2F0dHIuZGF0YS10ZXN0LWlkXT1cIid0ZC0nICsgY29sdW1uLmtleSArICctJyArIHBsdWdpbkNvbmZpZ09icy5wbHVnaW5Db25maWdPYnNGbGFnICsgJy0nICsgalwiPlxyXG4gICAgICAgICAgPG5nLWNvbnRhaW5lciAqbmdJZj1cImNvbHVtbi5rZXkgIT09ICdwYXRpZW50X25hbWUnICYmIGNvbHVtbi5rZXkgIT09ICd2aXNpdF9jb21wbGV0ZWQnXCI+XHJcbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJmbG9hdC1sZWZ0XCIgXHJcbiAgICAgICAgICAgICAgICBbaW5uZXJIVE1MXT1cInJlbmRlckh0bWxDb250ZW50KGNvbHVtbiwgZWxlbWVudClcIiBcclxuICAgICAgICAgICAgICAgIFtuZ0NsYXNzXT1cImdldENsYXNzZXMoY29sdW1uLCBlbGVtZW50KVwiPlxyXG4gICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgIDwvbmctY29udGFpbmVyPlxyXG4gICAgICAgICAgXHJcbiAgICAgICAgICA8IS0tIFRoaXMgaXMgZm9yIHZpc2l0X2NvbXBsZXRlZCBjb2x1bW4gLS0+XHJcbiAgICAgICAgICA8bmctY29udGFpbmVyICpuZ0lmPVwiY29sdW1uLmtleSA9PT0gJ3Zpc2l0X2NvbXBsZXRlZCdcIj5cclxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cImQtZmxleCBhbGlnbi1pdGVtcy1jZW50ZXIgdmlzaXQtY29tcGxldGVkLWNlbGxcIiAgIFthdHRyLmRhdGEtdGVzdC1pZF09XCIndGQtdmlzaXRfY29tcGxldGVkLScgKyBwbHVnaW5Db25maWdPYnMucGx1Z2luQ29uZmlnT2JzRmxhZyArICctJyArIGpcIj5cclxuICAgICAgICAgICAgICA8aW1nIHNyYz1cImFzc2V0cy9zdmdzL2dyZWVuLXBhZC5zdmdcIiBhbHQ9XCJDb21wbGV0ZWRcIiBjbGFzcz1cIm1yLTJcIiAvPlxyXG4gICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwidGV4dC1zdWNjZXNzXCI+XHJcbiAgICAgICAgICAgICAgICB7eyBlbGVtZW50LmNvbXBsZXRlZCB9fVxyXG4gICAgICAgICAgICAgIDwvc3Bhbj5cclxuICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICA8L25nLWNvbnRhaW5lcj5cclxuXHJcbiAgICAgICAgICA8IS0tIFBhdGllbnQgTmFtZSBDb2x1bW4gLS0+XHJcbiAgICAgICAgICA8bmctY29udGFpbmVyICpuZ0lmPVwiY29sdW1uLmtleSA9PT0gJ3BhdGllbnRfbmFtZSdcIj5cclxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cImQtZmxleCBhbGlnbi1pdGVtcy1jZW50ZXJcIiAgIFthdHRyLmRhdGEtdGVzdC1pZF09XCIndGQtcGF0aWVudF9uYW1lLScgKyBwbHVnaW5Db25maWdPYnMucGx1Z2luQ29uZmlnT2JzRmxhZyArICctJyArIGpcIj5cclxuICAgICAgICAgICAgICA8aW1nICpuZ0lmPVwiZWxlbWVudC5wYXRpZW50SWRcIiBzcmM9XCJ7eyBjaGVja1BhdGllbnRSZWdGaWVsZCgnUHJvZmlsZSBQaG90bycpID8gYmFzZVVSTCArICcvcGVyc29uaW1hZ2UvJyArIGVsZW1lbnQucGF0aWVudElkIDogJycgfX1cIiBhbHQ9XCJcIiB3aWR0aD1cIjMycHhcIiBoZWlnaHQ9XCIzMnB4XCIgc3R5bGU9XCJib3JkZXItcmFkaXVzOiA1MCU7XCI+XHJcbiAgICAgICAgICAgICAgPGltZyAqbmdJZj1cInBsdWdpbkNvbmZpZ09icy5wbHVnaW5Db25maWdPYnNGbGFnICE9PSAnQXBwb2ludG1lbnQnXCIgc3JjPVwie3sgY2hlY2tQYXRpZW50UmVnRmllbGQoJ1Byb2ZpbGUgUGhvdG8nKSA/IGJhc2VVUkwgKyAnL3BlcnNvbmltYWdlLycgKyBlbGVtZW50LnBlcnNvbi51dWlkIDogJycgfX1cIiBhbHQ9XCJcIiB3aWR0aD1cIjMycHhcIiBoZWlnaHQ9XCIzMnB4XCIgc3R5bGU9XCJib3JkZXItcmFkaXVzOiA1MCU7XCIgIFthdHRyLmRhdGEtdGVzdC1pZF09XCIndGQtcGF0aWVudF9pbWctJyArIHBsdWdpbkNvbmZpZ09icy5wbHVnaW5Db25maWdPYnNGbGFnICsgJy0nICsgalwiPlxyXG5cclxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiZmxvYXQtbGVmdFwiIFxyXG4gICAgICAgICAgICAgICAgW2lubmVySFRNTF09XCJyZW5kZXJIdG1sQ29udGVudChjb2x1bW4sIGVsZW1lbnQpXCIgXHJcbiAgICAgICAgICAgICAgICBbbmdDbGFzc109XCJnZXRDbGFzc2VzKGNvbHVtbiwgZWxlbWVudClcIj5cclxuICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICA8L25nLWNvbnRhaW5lcj5cclxuXHJcbiAgICAgICAgICA8IS0tIFRlbGVwaG9uZSBDb2x1bW4gLS0+XHJcbiAgICAgICAgICA8bmctY29udGFpbmVyICpuZ0lmPVwiY29sdW1uLmtleSA9PT0gJ3RlbGVwaG9uZScgJiYgZWxlbWVudC50ZWxlcGhvbmVcIj5cclxuICAgICAgICAgICAgPGEgKGNsaWNrKT1cIm9wZW5XaGF0c0FwcCgkZXZlbnQsIGVsZW1lbnQudGVsZXBob25lKVwiIGNsYXNzPVwiZmxvYXQtbGVmdCBpY29uLWJ0biBtLTBcIiBbYXR0ci5kYXRhLXRlc3QtaWRdPVwiJ2xpbmtQYXRpZW50V2hhdHNBcHAnICsgalwiPlxyXG4gICAgICAgICAgICAgIDxpbWcgc3JjPVwiYXNzZXRzL3N2Z3Mvd2hhdHNhcHAtZ3JlZW4uc3ZnXCIgYWx0PVwiV2hhdHNBcHBcIiAvPlxyXG4gICAgICAgICAgICA8L2E+XHJcbiAgICAgICAgICA8L25nLWNvbnRhaW5lcj5cclxuXHJcbiAgICAgICAgICA8IS0tIEFjdGlvbnMgQ29sdW1uIC0tPlxyXG4gICAgICAgICAgPG5nLWNvbnRhaW5lciAqbmdJZj1cImNvbHVtbi5rZXkgPT09ICdhY3Rpb25zJ1wiPlxyXG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwiYWN0aW9ucy1idG4td3JhcCBkLWZsZXggYWxpZ24taXRlbXMtY2VudGVyXCI+XHJcbiAgICAgICAgICAgICAgPGJ1dHRvblxyXG4gICAgICAgICAgICAgICAgKm5nRm9yPVwibGV0IGFjdGlvbiBvZiBjb2x1bW4uYWN0aW9uQnV0dG9uczsgbGV0IGsgPSBpbmRleFwiXHJcbiAgICAgICAgICAgICAgICBbbmdTdHlsZV09XCJ7XHJcbiAgICAgICAgICAgICAgICAgIGNvbG9yOiBhY3Rpb24uc3R5bGU/LmNvbG9yLFxyXG4gICAgICAgICAgICAgICAgICBiYWNrZ3JvdW5kQ29sb3I6IGFjdGlvbi5zdHlsZT8uYmFja2dyb3VuZENvbG9yXHJcbiAgICAgICAgICAgICAgICB9XCJcclxuICAgICAgICAgICAgICAgIGNsYXNzPVwiYWN0aW9uLWJ0biBtci0yXCJcclxuICAgICAgICAgICAgICAgIHR5cGU9XCJidXR0b25cIlxyXG4gICAgICAgICAgICAgICAgKGNsaWNrKT1cIiRldmVudC5zdG9wUHJvcGFnYXRpb24oKTsgaGFuZGxlQWN0aW9uKGFjdGlvbiwgZWxlbWVudClcIlxyXG4gICAgICAgICAgICAgICAgICBbYXR0ci5kYXRhLXRlc3QtaWRdPVwiJ2J0bi1hY3Rpb24tJyArIGFjdGlvbi5sYWJlbCsnLScrIGtcIiA+XHJcbiAgICAgICAgICAgICAgICB7eyBhY3Rpb24ubGFiZWwgfCB0cmFuc2xhdGUgfX1cclxuICAgICAgICAgICAgICA8L2J1dHRvbj5cclxuICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICA8L25nLWNvbnRhaW5lcj5cclxuICAgICAgICA8L3RkPlxyXG4gICAgICA8L25nLWNvbnRhaW5lcj5cclxuICAgIFxyXG5cclxuICAgICAgPCEtLSBObyBEYXRhIFJvdyAtLT5cclxuICAgICAgPHRyIGNsYXNzPVwibWF0LXJvd1wiICptYXROb0RhdGFSb3c+XHJcbiAgICAgICAgPHRkIGNsYXNzPVwibWF0LWNlbGwgdGV4dC1jZW50ZXJcIiBbYXR0ci5jb2xzcGFuXT1cImRpc3BsYXllZENvbHVtbnMubGVuZ3RoXCI+XHJcbiAgICAgICAgICB7eyBwbHVnaW5Db25maWdPYnMubm9SZWNvcmRGb3VuZCB8IHRyYW5zbGF0ZSB9fVxyXG4gICAgICAgIDwvdGQ+XHJcbiAgICAgIDwvdHI+XHJcblxyXG4gICAgICA8IS0tIFJvdyBEZWZpbml0aW9ucyAtLT5cclxuICAgICAgPHRyIG1hdC1oZWFkZXItcm93ICptYXRIZWFkZXJSb3dEZWY9XCJkaXNwbGF5ZWRDb2x1bW5zXCI+PC90cj5cclxuICAgICAgPHRyIG1hdC1yb3cgKm1hdFJvd0RlZj1cImxldCByb3c7IGxldCB4ID0gaW5kZXg7IGNvbHVtbnM6IGRpc3BsYXllZENvbHVtbnM7XCIgW2F0dHIuZGF0YS10ZXN0LWlkXT1cIid0cicgKyB4XCIgW3JvdXRlckxpbmtdPVwiWycvZGFzaGJvYXJkL3Zpc2l0LXN1bW1hcnknLCByb3cudXVpZF1cIj48L3RyPlxyXG4gICAgICBcclxuICAgICAgPC90YWJsZT5cclxuICAgIDwvZGl2PlxyXG4gICAgPG1hdC1wYWdpbmF0b3IgXHJcbiAgICAgICpuZ0lmPVwicGx1Z2luQ29uZmlnT2JzPy5wbHVnaW5Db25maWdPYnNGbGFnID09PSAnQXBwb2ludG1lbnQnXCJcclxuICAgICAgI3RlbXBQYWdpbmF0b3IgXHJcbiAgICAgIGhpZGVQYWdlU2l6ZSBcclxuICAgICAgW3BhZ2VTaXplT3B0aW9uc109XCJwYWdlU2l6ZU9wdGlvbnNcIlxyXG4gICAgICBbbGVuZ3RoXT1cImdldEN1cnJlbnRUb3RhbENvdW50KClcIiBcclxuICAgICAgW3BhZ2VJbmRleF09XCJjdXJyZW50UGFnZVwiIFxyXG4gICAgICBbcGFnZVNpemVdPVwiaXRlbXNQZXJQYWdlXCJcclxuICAgICAgW2Rpc2FibGVkXT1cImlzUGFnaW5hdGlvbkRpc2FibGVkKClcIlxyXG4gICAgICBhcmlhLWxhYmVsPVwiU2VsZWN0IHBhZ2Ugb2YgcGVyaW9kaWMgZWxlbWVudHNcIj5cclxuICAgIDwvbWF0LXBhZ2luYXRvcj5cclxuICAgIDxtYXQtcGFnaW5hdG9yIFxyXG4gICAgICAjdGVtcFBhZ2luYXRvciBcclxuICAgICAgKm5nSWY9XCJwbHVnaW5Db25maWdPYnM/LnBsdWdpbkNvbmZpZ09ic0ZsYWcgIT09ICdBcHBvaW50bWVudCdcIlxyXG4gICAgICBoaWRlUGFnZVNpemUgXHJcbiAgICAgIFtwYWdlU2l6ZU9wdGlvbnNdPVwicGFnZVNpemVPcHRpb25zXCJcclxuICAgICAgW2xlbmd0aF09XCJnZXRDdXJyZW50VG90YWxDb3VudCgpXCIgXHJcbiAgICAgIFtwYWdlSW5kZXhdPVwiY3VycmVudFBhZ2VcIiBcclxuICAgICAgW3BhZ2VTaXplXT1cIml0ZW1zUGVyUGFnZVwiIFxyXG4gICAgICBbZGlzYWJsZWRdPVwiaXNQYWdpbmF0aW9uRGlzYWJsZWQoKVwiXHJcbiAgICAgIChwYWdlKT1cInBhZ2VFdmVudCA9IGdldERhdGEoJGV2ZW50KVwiICBcclxuICAgICAgYXJpYS1sYWJlbD1cIlNlbGVjdCBwYWdlIG9mIHBlcmlvZGljIGVsZW1lbnRzXCJcclxuICAgICAgPlxyXG4gICAgPC9tYXQtcGFnaW5hdG9yPlxyXG4gIDwvZGl2PlxyXG48L21hdC1leHBhbnNpb24tcGFuZWw+Il19