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
    menuTrigger;
    // Date picker ViewChild references
    datePicker;
    startDatePicker;
    endDatePicker;
    filterMenu;
    panelExpanded = true;
    mode = 'date';
    maxDate;
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
        // Paginator will be set when data is loaded
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
                this.totalRecords = res.data?.length || 0;
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
    getAppointmentData(event) {
        this.pageIndex = event.pageIndex;
        this.pageSize = event.pageSize;
        this.currentPage = event.pageIndex;
        this.itemsPerPage = event.pageSize;
        // Handle client-side pagination for already loaded data
        this.handleClientSidePagination();
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
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.3.0", ngImport: i0, type: TableGridComponent, deps: [{ token: i1.AppointmentService }, { token: i2.VisitService }, { token: i3.CoreService }, { token: i4.ToastrService }, { token: i5.TranslateService }, { token: i6.MindmapService }, { token: i7.DomSanitizer }, { token: i8.AppConfigService }, { token: i9.NgxRolesService }, { token: i10.NgxUiLoaderService }, { token: 'environment' }], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "14.3.0", type: TableGridComponent, selector: "lib-table-grid", inputs: { pluginConfigObs: "pluginConfigObs" }, outputs: { visitsCountDate: "visitsCountDate" }, viewQueries: [{ propertyName: "searchElement", first: true, predicate: ["searchInput"], descendants: true, static: true }, { propertyName: "tempPaginator", first: true, predicate: ["tempPaginator"], descendants: true }, { propertyName: "menuTrigger", first: true, predicate: MatMenuTrigger, descendants: true }, { propertyName: "datePicker", first: true, predicate: ["datePicker"], descendants: true }, { propertyName: "startDatePicker", first: true, predicate: ["startDatePicker"], descendants: true }, { propertyName: "endDatePicker", first: true, predicate: ["endDatePicker"], descendants: true }, { propertyName: "filterMenu", first: true, predicate: ["filterMenu"], descendants: true }], usesOnChanges: true, ngImport: i0, template: "<mat-expansion-panel [expanded]=\"true\" data-test-id=\"matExpAppointment\">\r\n  <mat-expansion-panel-header data-test-id=\"matExpHeaderAppointment\">\r\n    <mat-panel-title data-test-id=\"matPanelTitleAppointment\">\r\n      <div id=\"{{pluginConfigObs.anchorId}}\" class=\"anchor-con\" data-test-id=\"divAnchorAppointment\"></div>\r\n      <div class=\"intel-accordion-title\" data-test-id=\"divAccordionTitleAppointment\">\r\n        <img src=\"{{ pluginConfigObs.tableHeaderIcon }}\" alt=\"\" width=\"44px\" data-test-id=\"imgTableHeaderIconAppointment\">\r\n        <h6 class=\"mb-0 ml-2\" [attr.data-test-id]=\"pluginConfigObs.tableHeader\"> \r\n          {{ pluginConfigObs.tableHeader | translate }} ({{ getCurrentTotalCount() }})\r\n        </h6>\r\n        <mat-icon \r\n          aria-hidden=\"false\" \r\n          aria-label=\"help icon\" \r\n          matTooltip=\"{{ (pluginConfigObs.tooltipLabel | translate) }}\" \r\n          matTooltipPosition=\"right\" \r\n          data-test-id=\"icoHelpAppointment\">\r\n          help_outline\r\n        </mat-icon>\r\n\r\n        <!-- Filter button -->\r\n        <div class=\"ml-auto filter-search-container\" data-test-id=\"divFilterContainerAppointment\">\r\n          <button \r\n            *ngIf=\"pluginConfigObs.filterObs.filterFlag\" \r\n            class=\"mat-stroked-button filter-btn\" \r\n            [matMenuTriggerFor]=\"filterMenu\" \r\n            (click)=\"$event.stopPropagation();\" \r\n            data-test-id=\"btnFilterAppointment\">\r\n            <img src=\"{{pluginConfigObs.filterObs.filterIcon}}\" alt=\"\" data-test-id=\"imgFilterIconAppointment\"> \r\n            {{( pluginConfigObs.filterObs.filterLabel| translate)}}\r\n          </button>\r\n\r\n          <!-- Filter Menu -->\r\n          <mat-menu #filterMenu=\"matMenu\" class=\"custom-menu\" [hasBackdrop]=\"true\" xPosition=\"before\" data-test-id=\"menuFilterAppointment\">\r\n            <div class=\"toggle-buttons\" data-test-id=\"divToggleButtonsAppointment\">\r\n              <button \r\n                mat-button \r\n                [class.active]=\"mode === 'date'\" \r\n                (click)=\"setMode('date'); $event.stopPropagation(); resetDate(true)\" \r\n                data-test-id=\"btnDateModeAppointment\">\r\n                {{'Date' | translate}}\r\n              </button>\r\n              <button \r\n                mat-button \r\n                [class.active]=\"mode === 'range'\" \r\n                (click)=\"setMode('range'); $event.stopPropagation(); resetDate(true)\" \r\n                data-test-id=\"btnRangeModeAppointment\">\r\n                {{'Range' | translate}}\r\n              </button>\r\n            </div>\r\n\r\n            <!-- Date Mode -->\r\n            <div *ngIf=\"mode === 'date'\" class=\"date-view\" (click)=\"$event.stopPropagation()\" data-test-id=\"divDateModeAppointment\">\r\n              <form [formGroup]=\"filteredDateAndRangeForm\">\r\n                <div class=\"form-date\">\r\n                  <div class=\"input-date\">\r\n                    <label class=\"label-text\">{{ 'Select date' | translate}}</label>\r\n                    <div class=\"input-wrapper\">\r\n                      <input \r\n                        type=\"text\" \r\n                        class=\"form-control\" \r\n                        [max]=\"maxDate\" \r\n                        formControlName=\"date\" \r\n                        [matDatepicker]=\"datePicker\" \r\n                        placeholder=\"{{'Select date' | translate}}\" \r\n                        aria-label=\"Date\" \r\n                        readonly \r\n                        data-test-id=\"etDate\"/>\r\n                      <mat-datepicker #datePicker></mat-datepicker>\r\n                      <mat-datepicker-toggle \r\n                        matSuffix \r\n                        [for]=\"datePicker\" \r\n                        data-test-id=\"dpDate\" \r\n                        class=\"datepicker-icon\">\r\n                        <img matDatepickerToggleIcon src=\"assets/svgs/calendar-date.svg\" alt=\"\">\r\n                      </mat-datepicker-toggle>\r\n                    </div>\r\n                  </div>\r\n                </div>\r\n              </form>\r\n            </div>\r\n\r\n            <!-- Range Mode -->\r\n            <div *ngIf=\"mode === 'range'\" class=\"range-view\" (click)=\" $event.stopPropagation()\" data-test-id=\"divRangeModeAppointment\">\r\n              <form [formGroup]=\"filteredDateAndRangeForm\">\r\n                <div class=\"form-date\">\r\n                  <div class=\"input-date\">\r\n                    <label class=\"label-text\">{{ 'Start date' | translate }}</label>\r\n                    <div class=\"input-wrapper\">\r\n                      <input \r\n                        type=\"text\" \r\n                        class=\"form-control\" \r\n                        [max]=\"filteredDateAndRangeForm.value.endDate ? filteredDateAndRangeForm.value.endDate : maxDate\" \r\n                        formControlName=\"startDate\" \r\n                        [matDatepicker]=\"startDatePicker\" \r\n                        placeholder=\"{{'Select start date'|translate}}\" \r\n                        readonly \r\n                        data-test-id=\"etSelStartDate\">\r\n                      <mat-datepicker #startDatePicker></mat-datepicker>\r\n                      <mat-datepicker-toggle matSuffix [for]=\"startDatePicker\" class=\"datepicker-icon\" data-test-id=\"dpStartDate\">\r\n                        <img matDatepickerToggleIcon src=\"assets/svgs/calendar-date.svg\" alt=\"\">\r\n                      </mat-datepicker-toggle>\r\n                    </div>\r\n                  </div>\r\n                </div>\r\n                <div class=\"form-date\">\r\n                  <div class=\"input-date\">\r\n                    <label class=\"label-text\">{{ 'End date' | translate }}</label>\r\n                    <div class=\"input-wrapper\">\r\n                      <input \r\n                        type=\"text\" \r\n                        class=\"form-control\" \r\n                        [min]=\"filteredDateAndRangeForm.value.startDate\" \r\n                        [max]=\"maxDate\" \r\n                        formControlName=\"endDate\" \r\n                        [matDatepicker]=\"endDatePicker\" \r\n                        placeholder=\"{{'Select end date'|translate}}\" \r\n                        readonly \r\n                        data-test-id=\"etSelEndDate\">\r\n                      <mat-datepicker #endDatePicker></mat-datepicker>\r\n                      <mat-datepicker-toggle matSuffix [for]=\"endDatePicker\" class=\"datepicker-icon\" data-test-id=\"dpEndDate\">\r\n                        <img matDatepickerToggleIcon src=\"assets/svgs/calendar-date.svg\" alt=\"\">\r\n                      </mat-datepicker-toggle>\r\n                    </div>\r\n                  </div>\r\n                </div>\r\n              </form>\r\n            </div>\r\n\r\n            <div class=\"action-buttons\" data-test-id=\"divFilterActionBtnsAppointment\">\r\n              <button mat-button class=\"reset-btn\" (click)=\"resetDate();\" data-test-id=\"btnResetFilterAppointment\">{{ 'Reset'| translate }}</button>\r\n              <button mat-button class=\"apply-btn\" (click)=\"applyDateOrRangeFilter(pluginConfigObs.filterObs.filterDateField)\" data-test-id=\"btnApplyFilterAppointment\">{{ 'Apply'| translate }}</button>\r\n            </div>\r\n          </mat-menu>\r\n\r\n          <!-- Search -->\r\n          <div class=\"input-group search-bar ml-auto\" (click)=\"$event.stopPropagation();\" data-test-id=\"divSearchAppointment\">\r\n            <input \r\n              type=\"text\" \r\n              #searchInput \r\n              class=\"form-control\" \r\n              placeholder=\"{{ pluginConfigObs.searchPlaceHolder | translate }}\" \r\n              (keyup)=\"applyFilter($event)\" \r\n              (keydown.Space)=\"$event.stopPropagation()\" \r\n              (keydown.Enter)=\"$event.stopPropagation()\" \r\n              data-test-id=\"etSearchAppointmentDashboard\">\r\n            <div class=\"input-group-append\">\r\n              <span class=\"input-group-text\" *ngIf=\"!isFilterApplied\" data-test-id=\"icoSearchAppointment\">\r\n                <img src=\"assets/svgs/search-icon.svg\" alt=\"\" width=\"20px\" height=\"20px\">\r\n              </span>\r\n              <button \r\n                class=\"btnResetApSerach mat-icon-button\" \r\n                aria-label=\"Reset appointment search\"  \r\n                (click)=\"clearFilter()\"  \r\n                *ngIf=\"isFilterApplied\" \r\n                data-test-id=\"btnResetSearchAppointment\">\r\n                <mat-icon class=\"ml-0\">close</mat-icon>\r\n              </button>\r\n            </div>\r\n          </div>\r\n        </div>\r\n      </div>\r\n    </mat-panel-title>\r\n  </mat-expansion-panel-header>\r\n\r\n  <div class=\"mat-elevation-z8\" data-test-id=\"divTableWrapperAppointment\">\r\n    <span *ngIf=\"tableLoader\">\r\n      <ngx-ui-loader \r\n        [loaderId]=\"'table-loader-' + pluginConfigObs.pluginConfigObsFlag\" \r\n        [fgsType]=\"'ball-spin-clockwise'\" \r\n        [fgsColor]=\"'#aba4a4'\" \r\n        [fgsPosition]=\"'center-center'\" \r\n        [fgsSize]=\"50\" \r\n        [overlayColor]=\"'rgb(255, 255, 255)'\" \r\n        [hasProgressBar]=\"false\"\r\n        [text]=\"('Loading'|translate) + ' ' + (pluginConfigObs.pluginConfigObsFlag|translate) + ' ' + ('data'|translate) + '...'\"\r\n        [textColor]=\"'#333'\"\r\n        [textPosition]=\"'center-center'\"\r\n        data-test-id=\"loaderAppointment\"\r\n      ></ngx-ui-loader>\r\n    </span>\r\n    <div class=\"table-container\" id=\"table-container-{{componentId}}\">\r\n      <table mat-table [dataSource]=\"paginatedDataSource\">\r\n\r\n      <ng-container *ngFor=\"let column of displayedAppointmentColumns\" [matColumnDef]=\"column.key\">\r\n        <ng-container *ngIf=\"column.isSortable; else noSort\">\r\n          <th mat-header-cell *matHeaderCellDef (click)=\"handleSort(column.key, 'asc')\" [attr.data-test-id]=\"'th-' + column.key + '-' + pluginConfigObs.pluginConfigObsFlag\" class=\"sortable-header\">\r\n            {{ column.label | translate }}\r\n            <mat-icon class=\"sort-icon\">arrow_upward</mat-icon>\r\n          </th>\r\n        </ng-container>\r\n        <ng-template #noSort>\r\n          <th mat-header-cell *matHeaderCellDef  [attr.data-test-id]=\"'th-' + column.key+ '-' + pluginConfigObs.pluginConfigObsFlag\">\r\n            {{ column.label | translate }}\r\n          </th>\r\n        </ng-template>\r\n\r\n        <td mat-cell *matCellDef=\"let element; let j = index;\"  [attr.data-test-id]=\"'td-' + column.key + '-' + pluginConfigObs.pluginConfigObsFlag + '-' + j\">\r\n          <ng-container *ngIf=\"column.key !== 'patient_name' && column.key !== 'visit_completed'\">\r\n            <div class=\"float-left\" \r\n                [innerHTML]=\"renderHtmlContent(column, element)\" \r\n                [ngClass]=\"getClasses(column, element)\">\r\n            </div>\r\n          </ng-container>\r\n          \r\n          <!-- This is for visit_completed column -->\r\n          <ng-container *ngIf=\"column.key === 'visit_completed'\">\r\n            <div class=\"d-flex align-items-center visit-completed-cell\"   [attr.data-test-id]=\"'td-visit_completed-' + pluginConfigObs.pluginConfigObsFlag + '-' + j\">\r\n              <img src=\"assets/svgs/green-pad.svg\" alt=\"Completed\" class=\"mr-2\" />\r\n              <span class=\"text-success\">\r\n                {{ element.completed }}\r\n              </span>\r\n            </div>\r\n          </ng-container>\r\n\r\n          <!-- Patient Name Column -->\r\n          <ng-container *ngIf=\"column.key === 'patient_name'\">\r\n            <div class=\"d-flex align-items-center\"   [attr.data-test-id]=\"'td-patient_name-' + pluginConfigObs.pluginConfigObsFlag + '-' + j\">\r\n              <img *ngIf=\"element.patientId\" src=\"{{ checkPatientRegField('Profile Photo') ? baseURL + '/personimage/' + element.patientId : '' }}\" alt=\"\" width=\"32px\" height=\"32px\" style=\"border-radius: 50%;\">\r\n              <img *ngIf=\"pluginConfigObs.pluginConfigObsFlag !== 'Appointment'\" src=\"{{ checkPatientRegField('Profile Photo') ? baseURL + '/personimage/' + element.person.uuid : '' }}\" alt=\"\" width=\"32px\" height=\"32px\" style=\"border-radius: 50%;\"  [attr.data-test-id]=\"'td-patient_img-' + pluginConfigObs.pluginConfigObsFlag + '-' + j\">\r\n\r\n              <div class=\"float-left\" \r\n                [innerHTML]=\"renderHtmlContent(column, element)\" \r\n                [ngClass]=\"getClasses(column, element)\">\r\n              </div>\r\n            </div>\r\n          </ng-container>\r\n\r\n          <!-- Telephone Column -->\r\n          <ng-container *ngIf=\"column.key === 'telephone' && element.telephone\">\r\n            <a (click)=\"openWhatsApp($event, element.telephone)\" class=\"float-left icon-btn m-0\" [attr.data-test-id]=\"'linkPatientWhatsApp' + j\">\r\n              <img src=\"assets/svgs/whatsapp-green.svg\" alt=\"WhatsApp\" />\r\n            </a>\r\n          </ng-container>\r\n\r\n          <!-- Actions Column -->\r\n          <ng-container *ngIf=\"column.key === 'actions'\">\r\n            <div class=\"actions-btn-wrap d-flex align-items-center\">\r\n              <button\r\n                *ngFor=\"let action of column.actionButtons; let k = index\"\r\n                [ngStyle]=\"{\r\n                  color: action.style?.color,\r\n                  backgroundColor: action.style?.backgroundColor\r\n                }\"\r\n                class=\"action-btn mr-2\"\r\n                type=\"button\"\r\n                (click)=\"$event.stopPropagation(); handleAction(action, element)\"\r\n                  [attr.data-test-id]=\"'btn-action-' + action.label+'-'+ k\" >\r\n                {{ action.label | translate }}\r\n              </button>\r\n            </div>\r\n          </ng-container>\r\n        </td>\r\n      </ng-container>\r\n    \r\n\r\n      <!-- No Data Row -->\r\n      <tr class=\"mat-row\" *matNoDataRow>\r\n        <td class=\"mat-cell text-center\" [attr.colspan]=\"displayedColumns.length\">\r\n          {{ pluginConfigObs.noRecordFound | translate }}\r\n        </td>\r\n      </tr>\r\n\r\n      <!-- Row Definitions -->\r\n      <tr mat-header-row *matHeaderRowDef=\"displayedColumns\"></tr>\r\n      <tr mat-row *matRowDef=\"let row; let x = index; columns: displayedColumns;\" [attr.data-test-id]=\"'tr' + x\" [routerLink]=\"['/dashboard/visit-summary', row.uuid]\"></tr>\r\n      \r\n      </table>\r\n    </div>\r\n    <mat-paginator \r\n      *ngIf=\"pluginConfigObs?.pluginConfigObsFlag === 'Appointment'\"\r\n      #tempPaginator \r\n      hidePageSize \r\n      [pageSizeOptions]=\"pageSizeOptions\"\r\n      [length]=\"getCurrentTotalCount()\" \r\n      [pageIndex]=\"currentPage\" \r\n      [pageSize]=\"itemsPerPage\"\r\n      [disabled]=\"isPaginationDisabled()\"\r\n      (page)=\"getAppointmentData($event)\" \r\n      aria-label=\"Select page of periodic elements\">\r\n    </mat-paginator>\r\n    <mat-paginator \r\n      #tempPaginator \r\n      *ngIf=\"pluginConfigObs?.pluginConfigObsFlag !== 'Appointment'\"\r\n      hidePageSize \r\n      [pageSizeOptions]=\"pageSizeOptions\"\r\n      [length]=\"getCurrentTotalCount()\" \r\n      [pageIndex]=\"currentPage\" \r\n      [pageSize]=\"itemsPerPage\" \r\n      [disabled]=\"isPaginationDisabled()\"\r\n      (page)=\"pageEvent = getData($event)\"  \r\n      aria-label=\"Select page of periodic elements\">\r\n    </mat-paginator>\r\n  </div>\r\n</mat-expansion-panel>", styles: [".mat-elevation-z8{box-shadow:none;width:100%;overflow-x:auto}.table-container{max-height:440px;overflow-y:auto;overflow-x:auto}table{width:100%;font-family:DM Sans}th.mat-header-cell{border:none;font-size:14px!important;font-weight:700;color:var(--color-gray);height:21px}th.mat-header-cell,td.mat-cell,td.mat-footer-cell{border:none;min-width:60px;white-space:nowrap;padding-right:24px}th.mat-header-cell span.alert-danger,td.mat-cell span.alert-danger,td.mat-footer-cell span.alert-danger{color:var(--color-red);font-weight:700;background:transparent;border:none}th.mat-header-cell span.alert-success,td.mat-cell span.alert-success,td.mat-footer-cell span.alert-success{color:var(--color-green);font-weight:700;background:transparent;border:none}td.mat-cell{font-size:16px}tr.mat-row,tr.mat-footer-row{height:88px;border-radius:8px;cursor:pointer}tr.mat-row.upcoming{background:#e6fff3!important}tr.mat-row:nth-child(odd){background:#f7f7fa}td:first-child,th:first-child{border-radius:8px 0 0 8px}td:last-child,th:last-child{border-radius:0 8px 8px 0}.actions-btn-wrap .action-btn{outline:none;border:none;height:36px;min-width:102px;padding:6px 8px;background:#fff;border-radius:4px;color:var(--color-black);font-family:DM Sans;font-size:16px}.actions-btn-wrap .blue-btn{background:var(--color-lightGray);color:var(--color-darkBlue)}.actions-btn-wrap .pink-btn{background:var(--color-lightPink);color:var(--color-red)}.mat-expansion-panel .mat-expansion-panel-header.mat-expanded .input-group{display:flex}.input-group{background:var(--color-white);border:1px solid rgba(127,123,146,.5);border-radius:6px;height:46px;align-items:center;max-width:60vw;width:300px;display:none}.input-group .input-group-text{background:none;border:none;cursor:default}.input-group .form-control{border:none;outline:none;background:transparent;font-size:16px;line-height:150%;padding-left:16px}.input-group .form-control:focus{box-shadow:none}.mat-expansion-panel{background:#fff;box-shadow:0 4px 24px #1f1c3a14;border-radius:20px!important;padding:24px;margin-bottom:24px}.mat-expansion-panel .mat-expansion-panel-header{padding:0}.mat-expansion-panel .mat-expansion-panel-header .mat-content{align-items:center}.mat-expansion-panel .mat-expansion-panel-header.mat-expanded{height:48px}.mat-expansion-panel .mat-expansion-panel-header:hover{background:transparent!important}.mat-expansion-panel .intel-accordion-title{display:flex;flex-direction:row;align-items:center;justify-content:flex-start;flex-wrap:wrap;width:100%}.mat-expansion-panel .intel-accordion-title .mat-icon{height:20px;width:20px;font-size:20px;color:#461d90;margin-left:8px}.mat-expansion-panel .intel-accordion-title h6{font-size:18px;font-weight:700;color:#000}.mat-expansion-panel .mat-expansion-panel-content .mat-expansion-panel-body{padding:0;margin-top:24px;position:relative}.mat-expansion-panel .mat-expansion-panel-content .mat-expansion-panel-body:after{content:\"\";position:absolute;top:0;height:1px;left:0;right:0;background:#efe8ff}.anchor-con{position:absolute;top:-120px;left:0}.visit-completed-cell{color:green!important;background-color:#d4edda!important}@media (max-width: 768px){.input-group{width:100%;max-width:100%;margin:10px 0}.mat-expansion-panel .mat-expansion-panel-header,.mat-expansion-panel .mat-expansion-panel-header.mat-expanded{height:fit-content}.info-icon{display:none}.anchor-con{top:-100px}}.matIconButton{border:none;background:transparent}::ng-deep .custom-menu{background:var(--color-white);border-radius:8px!important;padding:16px;width:352px;box-shadow:0 4px 8px #7f7b9229}.mat-expansion-panel.mat-expanded .mat-expansion-panel-header .filter-btn{display:flex!important}.btnResetApSerach{display:none}.filter-btn{background:none;align-items:center;border:1px solid rgba(127,123,146,.5);border-radius:6px;color:#2e1e91;font-weight:500;padding:4px 12px;white-space:nowrap;height:46px;display:none;gap:4px}.toggle-buttons{display:flex;justify-content:space-between;margin-bottom:16px;gap:16px}button.mat-button,.action-buttons button.mat-button{flex:1;color:#2e1e91;background:#fff;border-radius:8px;font-family:DM Sans;font-size:14px;font-weight:500;border:1.33px solid #EFE8FF}.action-buttons button.mat-button.reset-btn{font-size:12px;font-weight:700;margin:0 0 0 20px;width:96px}.action-buttons button.mat-button.apply-btn{color:#fff;background:var(--color-darkBlue);font-size:12px;font-weight:700;width:96px}button.mat-button.active{background:#efe8ff;color:#2e1e91}button.mat-button .reset-btn{color:var(--color-darkBlue)}.action-buttons{display:flex;justify-content:space-between;gap:16px}.reset-btn{color:var(--color-darkBlue);background:#f5f5f5;border-radius:8px}.filter-search-container{display:flex;align-items:center;gap:1rem}.form-date{margin-bottom:16px}.input-wrapper{position:relative;display:flex;align-items:center}.input-wrapper .form-control{width:100%;padding-right:40px;border:1px solid rgba(178,175,190,.2);background:transparent;border-radius:8px;height:48px;font-size:16px;color:var(--color-darkestBlue)}.datepicker-icon{position:absolute;right:4px;top:50%;transform:translateY(-50%);cursor:pointer;background:transparent;border:none}.form-control:focus{box-shadow:none}.label-text{font-size:14px;margin-bottom:8px;color:#7f7b92}.userImage{width:32px;height:32px;border-radius:50%}.red-pill{display:flex;flex-direction:row;align-items:center;background:#ffe8e8;border-radius:4px;height:32px;color:#ea315b;padding:4px 6px;width:fit-content}.left{text-align:left}.chip{display:flex;flex-direction:row;align-items:center;border-radius:4px;height:32px;padding:4px 6px;width:fit-content}.chip.green{color:#0fd197}.chip.blue{color:#2e1e91}.chip-item-blue{background:var(--color-lightGray)}.chip-item-green{background:#e6fff3}\n"], dependencies: [{ kind: "directive", type: i11.RouterLink, selector: ":not(a):not(area)[routerLink]", inputs: ["queryParams", "fragment", "queryParamsHandling", "state", "relativeTo", "preserveFragment", "skipLocationChange", "replaceUrl", "routerLink"] }, { kind: "directive", type: i12.NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }, { kind: "directive", type: i12.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { kind: "directive", type: i12.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "directive", type: i12.NgStyle, selector: "[ngStyle]", inputs: ["ngStyle"] }, { kind: "component", type: i13.MatPaginator, selector: "mat-paginator", inputs: ["disabled"], exportAs: ["matPaginator"] }, { kind: "directive", type: i14.MatTooltip, selector: "[matTooltip]", exportAs: ["matTooltip"] }, { kind: "directive", type: i15.MatSuffix, selector: "[matSuffix]" }, { kind: "component", type: i16.MatExpansionPanel, selector: "mat-expansion-panel", inputs: ["disabled", "expanded", "hideToggle", "togglePosition"], outputs: ["opened", "closed", "expandedChange", "afterExpand", "afterCollapse"], exportAs: ["matExpansionPanel"] }, { kind: "component", type: i16.MatExpansionPanelHeader, selector: "mat-expansion-panel-header", inputs: ["tabIndex", "expandedHeight", "collapsedHeight"] }, { kind: "directive", type: i16.MatExpansionPanelTitle, selector: "mat-panel-title" }, { kind: "component", type: i17.MatMenu, selector: "mat-menu", exportAs: ["matMenu"] }, { kind: "directive", type: i17.MatMenuTrigger, selector: "[mat-menu-trigger-for], [matMenuTriggerFor]", exportAs: ["matMenuTrigger"] }, { kind: "component", type: i18.MatTable, selector: "mat-table, table[mat-table]", exportAs: ["matTable"] }, { kind: "directive", type: i18.MatHeaderCellDef, selector: "[matHeaderCellDef]" }, { kind: "directive", type: i18.MatHeaderRowDef, selector: "[matHeaderRowDef]", inputs: ["matHeaderRowDef", "matHeaderRowDefSticky"] }, { kind: "directive", type: i18.MatColumnDef, selector: "[matColumnDef]", inputs: ["sticky", "matColumnDef"] }, { kind: "directive", type: i18.MatCellDef, selector: "[matCellDef]" }, { kind: "directive", type: i18.MatRowDef, selector: "[matRowDef]", inputs: ["matRowDefColumns", "matRowDefWhen"] }, { kind: "directive", type: i18.MatHeaderCell, selector: "mat-header-cell, th[mat-header-cell]" }, { kind: "directive", type: i18.MatCell, selector: "mat-cell, td[mat-cell]" }, { kind: "component", type: i18.MatHeaderRow, selector: "mat-header-row, tr[mat-header-row]", exportAs: ["matHeaderRow"] }, { kind: "component", type: i18.MatRow, selector: "mat-row, tr[mat-row]", exportAs: ["matRow"] }, { kind: "directive", type: i18.MatNoDataRow, selector: "ng-template[matNoDataRow]" }, { kind: "component", type: i19.MatIcon, selector: "mat-icon", inputs: ["color", "inline", "svgIcon", "fontSet", "fontIcon"], exportAs: ["matIcon"] }, { kind: "component", type: i20.MatDatepicker, selector: "mat-datepicker", exportAs: ["matDatepicker"] }, { kind: "directive", type: i20.MatDatepickerInput, selector: "input[matDatepicker]", inputs: ["matDatepicker", "min", "max", "matDatepickerFilter"], exportAs: ["matDatepickerInput"] }, { kind: "component", type: i20.MatDatepickerToggle, selector: "mat-datepicker-toggle", inputs: ["for", "tabIndex", "aria-label", "disabled", "disableRipple"], exportAs: ["matDatepickerToggle"] }, { kind: "directive", type: i20.MatDatepickerToggleIcon, selector: "[matDatepickerToggleIcon]" }, { kind: "directive", type: i21.ɵNgNoValidate, selector: "form:not([ngNoForm]):not([ngNativeValidate])" }, { kind: "directive", type: i21.DefaultValueAccessor, selector: "input:not([type=checkbox])[formControlName],textarea[formControlName],input:not([type=checkbox])[formControl],textarea[formControl],input:not([type=checkbox])[ngModel],textarea[ngModel],[ngDefaultControl]" }, { kind: "directive", type: i21.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { kind: "directive", type: i21.NgControlStatusGroup, selector: "[formGroupName],[formArrayName],[ngModelGroup],[formGroup],form:not([ngNoForm]),[ngForm]" }, { kind: "directive", type: i21.FormGroupDirective, selector: "[formGroup]", inputs: ["formGroup"], outputs: ["ngSubmit"], exportAs: ["ngForm"] }, { kind: "directive", type: i21.FormControlName, selector: "[formControlName]", inputs: ["formControlName", "disabled", "ngModel"], outputs: ["ngModelChange"] }, { kind: "component", type: i10.NgxUiLoaderComponent, selector: "ngx-ui-loader", inputs: ["bgsColor", "bgsOpacity", "bgsPosition", "bgsSize", "bgsTemplate", "bgsType", "fgsColor", "fgsPosition", "fgsSize", "fgsTemplate", "fgsType", "gap", "loaderId", "logoPosition", "logoSize", "logoUrl", "overlayBorderRadius", "overlayColor", "pbColor", "pbDirection", "pbThickness", "hasProgressBar", "text", "textColor", "textPosition"] }, { kind: "directive", type: i22.DefaultImageDirective, selector: "img[src]", inputs: ["src"] }, { kind: "pipe", type: i5.TranslatePipe, name: "translate" }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.3.0", ngImport: i0, type: TableGridComponent, decorators: [{
            type: Component,
            args: [{ selector: 'lib-table-grid', changeDetection: ChangeDetectionStrategy.OnPush, template: "<mat-expansion-panel [expanded]=\"true\" data-test-id=\"matExpAppointment\">\r\n  <mat-expansion-panel-header data-test-id=\"matExpHeaderAppointment\">\r\n    <mat-panel-title data-test-id=\"matPanelTitleAppointment\">\r\n      <div id=\"{{pluginConfigObs.anchorId}}\" class=\"anchor-con\" data-test-id=\"divAnchorAppointment\"></div>\r\n      <div class=\"intel-accordion-title\" data-test-id=\"divAccordionTitleAppointment\">\r\n        <img src=\"{{ pluginConfigObs.tableHeaderIcon }}\" alt=\"\" width=\"44px\" data-test-id=\"imgTableHeaderIconAppointment\">\r\n        <h6 class=\"mb-0 ml-2\" [attr.data-test-id]=\"pluginConfigObs.tableHeader\"> \r\n          {{ pluginConfigObs.tableHeader | translate }} ({{ getCurrentTotalCount() }})\r\n        </h6>\r\n        <mat-icon \r\n          aria-hidden=\"false\" \r\n          aria-label=\"help icon\" \r\n          matTooltip=\"{{ (pluginConfigObs.tooltipLabel | translate) }}\" \r\n          matTooltipPosition=\"right\" \r\n          data-test-id=\"icoHelpAppointment\">\r\n          help_outline\r\n        </mat-icon>\r\n\r\n        <!-- Filter button -->\r\n        <div class=\"ml-auto filter-search-container\" data-test-id=\"divFilterContainerAppointment\">\r\n          <button \r\n            *ngIf=\"pluginConfigObs.filterObs.filterFlag\" \r\n            class=\"mat-stroked-button filter-btn\" \r\n            [matMenuTriggerFor]=\"filterMenu\" \r\n            (click)=\"$event.stopPropagation();\" \r\n            data-test-id=\"btnFilterAppointment\">\r\n            <img src=\"{{pluginConfigObs.filterObs.filterIcon}}\" alt=\"\" data-test-id=\"imgFilterIconAppointment\"> \r\n            {{( pluginConfigObs.filterObs.filterLabel| translate)}}\r\n          </button>\r\n\r\n          <!-- Filter Menu -->\r\n          <mat-menu #filterMenu=\"matMenu\" class=\"custom-menu\" [hasBackdrop]=\"true\" xPosition=\"before\" data-test-id=\"menuFilterAppointment\">\r\n            <div class=\"toggle-buttons\" data-test-id=\"divToggleButtonsAppointment\">\r\n              <button \r\n                mat-button \r\n                [class.active]=\"mode === 'date'\" \r\n                (click)=\"setMode('date'); $event.stopPropagation(); resetDate(true)\" \r\n                data-test-id=\"btnDateModeAppointment\">\r\n                {{'Date' | translate}}\r\n              </button>\r\n              <button \r\n                mat-button \r\n                [class.active]=\"mode === 'range'\" \r\n                (click)=\"setMode('range'); $event.stopPropagation(); resetDate(true)\" \r\n                data-test-id=\"btnRangeModeAppointment\">\r\n                {{'Range' | translate}}\r\n              </button>\r\n            </div>\r\n\r\n            <!-- Date Mode -->\r\n            <div *ngIf=\"mode === 'date'\" class=\"date-view\" (click)=\"$event.stopPropagation()\" data-test-id=\"divDateModeAppointment\">\r\n              <form [formGroup]=\"filteredDateAndRangeForm\">\r\n                <div class=\"form-date\">\r\n                  <div class=\"input-date\">\r\n                    <label class=\"label-text\">{{ 'Select date' | translate}}</label>\r\n                    <div class=\"input-wrapper\">\r\n                      <input \r\n                        type=\"text\" \r\n                        class=\"form-control\" \r\n                        [max]=\"maxDate\" \r\n                        formControlName=\"date\" \r\n                        [matDatepicker]=\"datePicker\" \r\n                        placeholder=\"{{'Select date' | translate}}\" \r\n                        aria-label=\"Date\" \r\n                        readonly \r\n                        data-test-id=\"etDate\"/>\r\n                      <mat-datepicker #datePicker></mat-datepicker>\r\n                      <mat-datepicker-toggle \r\n                        matSuffix \r\n                        [for]=\"datePicker\" \r\n                        data-test-id=\"dpDate\" \r\n                        class=\"datepicker-icon\">\r\n                        <img matDatepickerToggleIcon src=\"assets/svgs/calendar-date.svg\" alt=\"\">\r\n                      </mat-datepicker-toggle>\r\n                    </div>\r\n                  </div>\r\n                </div>\r\n              </form>\r\n            </div>\r\n\r\n            <!-- Range Mode -->\r\n            <div *ngIf=\"mode === 'range'\" class=\"range-view\" (click)=\" $event.stopPropagation()\" data-test-id=\"divRangeModeAppointment\">\r\n              <form [formGroup]=\"filteredDateAndRangeForm\">\r\n                <div class=\"form-date\">\r\n                  <div class=\"input-date\">\r\n                    <label class=\"label-text\">{{ 'Start date' | translate }}</label>\r\n                    <div class=\"input-wrapper\">\r\n                      <input \r\n                        type=\"text\" \r\n                        class=\"form-control\" \r\n                        [max]=\"filteredDateAndRangeForm.value.endDate ? filteredDateAndRangeForm.value.endDate : maxDate\" \r\n                        formControlName=\"startDate\" \r\n                        [matDatepicker]=\"startDatePicker\" \r\n                        placeholder=\"{{'Select start date'|translate}}\" \r\n                        readonly \r\n                        data-test-id=\"etSelStartDate\">\r\n                      <mat-datepicker #startDatePicker></mat-datepicker>\r\n                      <mat-datepicker-toggle matSuffix [for]=\"startDatePicker\" class=\"datepicker-icon\" data-test-id=\"dpStartDate\">\r\n                        <img matDatepickerToggleIcon src=\"assets/svgs/calendar-date.svg\" alt=\"\">\r\n                      </mat-datepicker-toggle>\r\n                    </div>\r\n                  </div>\r\n                </div>\r\n                <div class=\"form-date\">\r\n                  <div class=\"input-date\">\r\n                    <label class=\"label-text\">{{ 'End date' | translate }}</label>\r\n                    <div class=\"input-wrapper\">\r\n                      <input \r\n                        type=\"text\" \r\n                        class=\"form-control\" \r\n                        [min]=\"filteredDateAndRangeForm.value.startDate\" \r\n                        [max]=\"maxDate\" \r\n                        formControlName=\"endDate\" \r\n                        [matDatepicker]=\"endDatePicker\" \r\n                        placeholder=\"{{'Select end date'|translate}}\" \r\n                        readonly \r\n                        data-test-id=\"etSelEndDate\">\r\n                      <mat-datepicker #endDatePicker></mat-datepicker>\r\n                      <mat-datepicker-toggle matSuffix [for]=\"endDatePicker\" class=\"datepicker-icon\" data-test-id=\"dpEndDate\">\r\n                        <img matDatepickerToggleIcon src=\"assets/svgs/calendar-date.svg\" alt=\"\">\r\n                      </mat-datepicker-toggle>\r\n                    </div>\r\n                  </div>\r\n                </div>\r\n              </form>\r\n            </div>\r\n\r\n            <div class=\"action-buttons\" data-test-id=\"divFilterActionBtnsAppointment\">\r\n              <button mat-button class=\"reset-btn\" (click)=\"resetDate();\" data-test-id=\"btnResetFilterAppointment\">{{ 'Reset'| translate }}</button>\r\n              <button mat-button class=\"apply-btn\" (click)=\"applyDateOrRangeFilter(pluginConfigObs.filterObs.filterDateField)\" data-test-id=\"btnApplyFilterAppointment\">{{ 'Apply'| translate }}</button>\r\n            </div>\r\n          </mat-menu>\r\n\r\n          <!-- Search -->\r\n          <div class=\"input-group search-bar ml-auto\" (click)=\"$event.stopPropagation();\" data-test-id=\"divSearchAppointment\">\r\n            <input \r\n              type=\"text\" \r\n              #searchInput \r\n              class=\"form-control\" \r\n              placeholder=\"{{ pluginConfigObs.searchPlaceHolder | translate }}\" \r\n              (keyup)=\"applyFilter($event)\" \r\n              (keydown.Space)=\"$event.stopPropagation()\" \r\n              (keydown.Enter)=\"$event.stopPropagation()\" \r\n              data-test-id=\"etSearchAppointmentDashboard\">\r\n            <div class=\"input-group-append\">\r\n              <span class=\"input-group-text\" *ngIf=\"!isFilterApplied\" data-test-id=\"icoSearchAppointment\">\r\n                <img src=\"assets/svgs/search-icon.svg\" alt=\"\" width=\"20px\" height=\"20px\">\r\n              </span>\r\n              <button \r\n                class=\"btnResetApSerach mat-icon-button\" \r\n                aria-label=\"Reset appointment search\"  \r\n                (click)=\"clearFilter()\"  \r\n                *ngIf=\"isFilterApplied\" \r\n                data-test-id=\"btnResetSearchAppointment\">\r\n                <mat-icon class=\"ml-0\">close</mat-icon>\r\n              </button>\r\n            </div>\r\n          </div>\r\n        </div>\r\n      </div>\r\n    </mat-panel-title>\r\n  </mat-expansion-panel-header>\r\n\r\n  <div class=\"mat-elevation-z8\" data-test-id=\"divTableWrapperAppointment\">\r\n    <span *ngIf=\"tableLoader\">\r\n      <ngx-ui-loader \r\n        [loaderId]=\"'table-loader-' + pluginConfigObs.pluginConfigObsFlag\" \r\n        [fgsType]=\"'ball-spin-clockwise'\" \r\n        [fgsColor]=\"'#aba4a4'\" \r\n        [fgsPosition]=\"'center-center'\" \r\n        [fgsSize]=\"50\" \r\n        [overlayColor]=\"'rgb(255, 255, 255)'\" \r\n        [hasProgressBar]=\"false\"\r\n        [text]=\"('Loading'|translate) + ' ' + (pluginConfigObs.pluginConfigObsFlag|translate) + ' ' + ('data'|translate) + '...'\"\r\n        [textColor]=\"'#333'\"\r\n        [textPosition]=\"'center-center'\"\r\n        data-test-id=\"loaderAppointment\"\r\n      ></ngx-ui-loader>\r\n    </span>\r\n    <div class=\"table-container\" id=\"table-container-{{componentId}}\">\r\n      <table mat-table [dataSource]=\"paginatedDataSource\">\r\n\r\n      <ng-container *ngFor=\"let column of displayedAppointmentColumns\" [matColumnDef]=\"column.key\">\r\n        <ng-container *ngIf=\"column.isSortable; else noSort\">\r\n          <th mat-header-cell *matHeaderCellDef (click)=\"handleSort(column.key, 'asc')\" [attr.data-test-id]=\"'th-' + column.key + '-' + pluginConfigObs.pluginConfigObsFlag\" class=\"sortable-header\">\r\n            {{ column.label | translate }}\r\n            <mat-icon class=\"sort-icon\">arrow_upward</mat-icon>\r\n          </th>\r\n        </ng-container>\r\n        <ng-template #noSort>\r\n          <th mat-header-cell *matHeaderCellDef  [attr.data-test-id]=\"'th-' + column.key+ '-' + pluginConfigObs.pluginConfigObsFlag\">\r\n            {{ column.label | translate }}\r\n          </th>\r\n        </ng-template>\r\n\r\n        <td mat-cell *matCellDef=\"let element; let j = index;\"  [attr.data-test-id]=\"'td-' + column.key + '-' + pluginConfigObs.pluginConfigObsFlag + '-' + j\">\r\n          <ng-container *ngIf=\"column.key !== 'patient_name' && column.key !== 'visit_completed'\">\r\n            <div class=\"float-left\" \r\n                [innerHTML]=\"renderHtmlContent(column, element)\" \r\n                [ngClass]=\"getClasses(column, element)\">\r\n            </div>\r\n          </ng-container>\r\n          \r\n          <!-- This is for visit_completed column -->\r\n          <ng-container *ngIf=\"column.key === 'visit_completed'\">\r\n            <div class=\"d-flex align-items-center visit-completed-cell\"   [attr.data-test-id]=\"'td-visit_completed-' + pluginConfigObs.pluginConfigObsFlag + '-' + j\">\r\n              <img src=\"assets/svgs/green-pad.svg\" alt=\"Completed\" class=\"mr-2\" />\r\n              <span class=\"text-success\">\r\n                {{ element.completed }}\r\n              </span>\r\n            </div>\r\n          </ng-container>\r\n\r\n          <!-- Patient Name Column -->\r\n          <ng-container *ngIf=\"column.key === 'patient_name'\">\r\n            <div class=\"d-flex align-items-center\"   [attr.data-test-id]=\"'td-patient_name-' + pluginConfigObs.pluginConfigObsFlag + '-' + j\">\r\n              <img *ngIf=\"element.patientId\" src=\"{{ checkPatientRegField('Profile Photo') ? baseURL + '/personimage/' + element.patientId : '' }}\" alt=\"\" width=\"32px\" height=\"32px\" style=\"border-radius: 50%;\">\r\n              <img *ngIf=\"pluginConfigObs.pluginConfigObsFlag !== 'Appointment'\" src=\"{{ checkPatientRegField('Profile Photo') ? baseURL + '/personimage/' + element.person.uuid : '' }}\" alt=\"\" width=\"32px\" height=\"32px\" style=\"border-radius: 50%;\"  [attr.data-test-id]=\"'td-patient_img-' + pluginConfigObs.pluginConfigObsFlag + '-' + j\">\r\n\r\n              <div class=\"float-left\" \r\n                [innerHTML]=\"renderHtmlContent(column, element)\" \r\n                [ngClass]=\"getClasses(column, element)\">\r\n              </div>\r\n            </div>\r\n          </ng-container>\r\n\r\n          <!-- Telephone Column -->\r\n          <ng-container *ngIf=\"column.key === 'telephone' && element.telephone\">\r\n            <a (click)=\"openWhatsApp($event, element.telephone)\" class=\"float-left icon-btn m-0\" [attr.data-test-id]=\"'linkPatientWhatsApp' + j\">\r\n              <img src=\"assets/svgs/whatsapp-green.svg\" alt=\"WhatsApp\" />\r\n            </a>\r\n          </ng-container>\r\n\r\n          <!-- Actions Column -->\r\n          <ng-container *ngIf=\"column.key === 'actions'\">\r\n            <div class=\"actions-btn-wrap d-flex align-items-center\">\r\n              <button\r\n                *ngFor=\"let action of column.actionButtons; let k = index\"\r\n                [ngStyle]=\"{\r\n                  color: action.style?.color,\r\n                  backgroundColor: action.style?.backgroundColor\r\n                }\"\r\n                class=\"action-btn mr-2\"\r\n                type=\"button\"\r\n                (click)=\"$event.stopPropagation(); handleAction(action, element)\"\r\n                  [attr.data-test-id]=\"'btn-action-' + action.label+'-'+ k\" >\r\n                {{ action.label | translate }}\r\n              </button>\r\n            </div>\r\n          </ng-container>\r\n        </td>\r\n      </ng-container>\r\n    \r\n\r\n      <!-- No Data Row -->\r\n      <tr class=\"mat-row\" *matNoDataRow>\r\n        <td class=\"mat-cell text-center\" [attr.colspan]=\"displayedColumns.length\">\r\n          {{ pluginConfigObs.noRecordFound | translate }}\r\n        </td>\r\n      </tr>\r\n\r\n      <!-- Row Definitions -->\r\n      <tr mat-header-row *matHeaderRowDef=\"displayedColumns\"></tr>\r\n      <tr mat-row *matRowDef=\"let row; let x = index; columns: displayedColumns;\" [attr.data-test-id]=\"'tr' + x\" [routerLink]=\"['/dashboard/visit-summary', row.uuid]\"></tr>\r\n      \r\n      </table>\r\n    </div>\r\n    <mat-paginator \r\n      *ngIf=\"pluginConfigObs?.pluginConfigObsFlag === 'Appointment'\"\r\n      #tempPaginator \r\n      hidePageSize \r\n      [pageSizeOptions]=\"pageSizeOptions\"\r\n      [length]=\"getCurrentTotalCount()\" \r\n      [pageIndex]=\"currentPage\" \r\n      [pageSize]=\"itemsPerPage\"\r\n      [disabled]=\"isPaginationDisabled()\"\r\n      (page)=\"getAppointmentData($event)\" \r\n      aria-label=\"Select page of periodic elements\">\r\n    </mat-paginator>\r\n    <mat-paginator \r\n      #tempPaginator \r\n      *ngIf=\"pluginConfigObs?.pluginConfigObsFlag !== 'Appointment'\"\r\n      hidePageSize \r\n      [pageSizeOptions]=\"pageSizeOptions\"\r\n      [length]=\"getCurrentTotalCount()\" \r\n      [pageIndex]=\"currentPage\" \r\n      [pageSize]=\"itemsPerPage\" \r\n      [disabled]=\"isPaginationDisabled()\"\r\n      (page)=\"pageEvent = getData($event)\"  \r\n      aria-label=\"Select page of periodic elements\">\r\n    </mat-paginator>\r\n  </div>\r\n</mat-expansion-panel>", styles: [".mat-elevation-z8{box-shadow:none;width:100%;overflow-x:auto}.table-container{max-height:440px;overflow-y:auto;overflow-x:auto}table{width:100%;font-family:DM Sans}th.mat-header-cell{border:none;font-size:14px!important;font-weight:700;color:var(--color-gray);height:21px}th.mat-header-cell,td.mat-cell,td.mat-footer-cell{border:none;min-width:60px;white-space:nowrap;padding-right:24px}th.mat-header-cell span.alert-danger,td.mat-cell span.alert-danger,td.mat-footer-cell span.alert-danger{color:var(--color-red);font-weight:700;background:transparent;border:none}th.mat-header-cell span.alert-success,td.mat-cell span.alert-success,td.mat-footer-cell span.alert-success{color:var(--color-green);font-weight:700;background:transparent;border:none}td.mat-cell{font-size:16px}tr.mat-row,tr.mat-footer-row{height:88px;border-radius:8px;cursor:pointer}tr.mat-row.upcoming{background:#e6fff3!important}tr.mat-row:nth-child(odd){background:#f7f7fa}td:first-child,th:first-child{border-radius:8px 0 0 8px}td:last-child,th:last-child{border-radius:0 8px 8px 0}.actions-btn-wrap .action-btn{outline:none;border:none;height:36px;min-width:102px;padding:6px 8px;background:#fff;border-radius:4px;color:var(--color-black);font-family:DM Sans;font-size:16px}.actions-btn-wrap .blue-btn{background:var(--color-lightGray);color:var(--color-darkBlue)}.actions-btn-wrap .pink-btn{background:var(--color-lightPink);color:var(--color-red)}.mat-expansion-panel .mat-expansion-panel-header.mat-expanded .input-group{display:flex}.input-group{background:var(--color-white);border:1px solid rgba(127,123,146,.5);border-radius:6px;height:46px;align-items:center;max-width:60vw;width:300px;display:none}.input-group .input-group-text{background:none;border:none;cursor:default}.input-group .form-control{border:none;outline:none;background:transparent;font-size:16px;line-height:150%;padding-left:16px}.input-group .form-control:focus{box-shadow:none}.mat-expansion-panel{background:#fff;box-shadow:0 4px 24px #1f1c3a14;border-radius:20px!important;padding:24px;margin-bottom:24px}.mat-expansion-panel .mat-expansion-panel-header{padding:0}.mat-expansion-panel .mat-expansion-panel-header .mat-content{align-items:center}.mat-expansion-panel .mat-expansion-panel-header.mat-expanded{height:48px}.mat-expansion-panel .mat-expansion-panel-header:hover{background:transparent!important}.mat-expansion-panel .intel-accordion-title{display:flex;flex-direction:row;align-items:center;justify-content:flex-start;flex-wrap:wrap;width:100%}.mat-expansion-panel .intel-accordion-title .mat-icon{height:20px;width:20px;font-size:20px;color:#461d90;margin-left:8px}.mat-expansion-panel .intel-accordion-title h6{font-size:18px;font-weight:700;color:#000}.mat-expansion-panel .mat-expansion-panel-content .mat-expansion-panel-body{padding:0;margin-top:24px;position:relative}.mat-expansion-panel .mat-expansion-panel-content .mat-expansion-panel-body:after{content:\"\";position:absolute;top:0;height:1px;left:0;right:0;background:#efe8ff}.anchor-con{position:absolute;top:-120px;left:0}.visit-completed-cell{color:green!important;background-color:#d4edda!important}@media (max-width: 768px){.input-group{width:100%;max-width:100%;margin:10px 0}.mat-expansion-panel .mat-expansion-panel-header,.mat-expansion-panel .mat-expansion-panel-header.mat-expanded{height:fit-content}.info-icon{display:none}.anchor-con{top:-100px}}.matIconButton{border:none;background:transparent}::ng-deep .custom-menu{background:var(--color-white);border-radius:8px!important;padding:16px;width:352px;box-shadow:0 4px 8px #7f7b9229}.mat-expansion-panel.mat-expanded .mat-expansion-panel-header .filter-btn{display:flex!important}.btnResetApSerach{display:none}.filter-btn{background:none;align-items:center;border:1px solid rgba(127,123,146,.5);border-radius:6px;color:#2e1e91;font-weight:500;padding:4px 12px;white-space:nowrap;height:46px;display:none;gap:4px}.toggle-buttons{display:flex;justify-content:space-between;margin-bottom:16px;gap:16px}button.mat-button,.action-buttons button.mat-button{flex:1;color:#2e1e91;background:#fff;border-radius:8px;font-family:DM Sans;font-size:14px;font-weight:500;border:1.33px solid #EFE8FF}.action-buttons button.mat-button.reset-btn{font-size:12px;font-weight:700;margin:0 0 0 20px;width:96px}.action-buttons button.mat-button.apply-btn{color:#fff;background:var(--color-darkBlue);font-size:12px;font-weight:700;width:96px}button.mat-button.active{background:#efe8ff;color:#2e1e91}button.mat-button .reset-btn{color:var(--color-darkBlue)}.action-buttons{display:flex;justify-content:space-between;gap:16px}.reset-btn{color:var(--color-darkBlue);background:#f5f5f5;border-radius:8px}.filter-search-container{display:flex;align-items:center;gap:1rem}.form-date{margin-bottom:16px}.input-wrapper{position:relative;display:flex;align-items:center}.input-wrapper .form-control{width:100%;padding-right:40px;border:1px solid rgba(178,175,190,.2);background:transparent;border-radius:8px;height:48px;font-size:16px;color:var(--color-darkestBlue)}.datepicker-icon{position:absolute;right:4px;top:50%;transform:translateY(-50%);cursor:pointer;background:transparent;border:none}.form-control:focus{box-shadow:none}.label-text{font-size:14px;margin-bottom:8px;color:#7f7b92}.userImage{width:32px;height:32px;border-radius:50%}.red-pill{display:flex;flex-direction:row;align-items:center;background:#ffe8e8;border-radius:4px;height:32px;color:#ea315b;padding:4px 6px;width:fit-content}.left{text-align:left}.chip{display:flex;flex-direction:row;align-items:center;border-radius:4px;height:32px;padding:4px 6px;width:fit-content}.chip.green{color:#0fd197}.chip.blue{color:#2e1e91}.chip-item-blue{background:var(--color-lightGray)}.chip-item-green{background:#e6fff3}\n"] }]
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGFibGUtZ3JpZC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9paC1saWJyYXJ5L3NyYy9saWIvY29tcG9uZW50cy90YWJsZS1ncmlkL3RhYmxlLWdyaWQuY29tcG9uZW50LnRzIiwiLi4vLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvaWgtbGlicmFyeS9zcmMvbGliL2NvbXBvbmVudHMvdGFibGUtZ3JpZC90YWJsZS1ncmlkLmNvbXBvbmVudC5odG1sIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsVUFBVSxFQUFVLFNBQVMsRUFBRSxLQUFLLEVBQWlCLHVCQUF1QixFQUFFLE1BQU0sRUFBRSxNQUFNLEVBQUUsWUFBWSxFQUFnQixNQUFNLGVBQWUsQ0FBQztBQUNwSyxPQUFPLEVBQUUsWUFBWSxFQUFhLE1BQU0sNkJBQTZCLENBQUM7QUFFdEUsT0FBTyxFQUFFLGtCQUFrQixFQUFFLE1BQU0sb0NBQW9DLENBQUM7QUFDeEUsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLDhCQUE4QixDQUFDO0FBQzVELE9BQU8sTUFBTSxNQUFNLFFBQVEsQ0FBQztBQUM1QixPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sNkJBQTZCLENBQUM7QUFDMUQsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLFlBQVksQ0FBQztBQUMzQyxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSxxQkFBcUIsQ0FBQztBQUN2RCxPQUFPLEVBQUUsWUFBWSxFQUFFLHdCQUF3QixFQUFFLGdCQUFnQixFQUFFLE1BQU0sK0JBQStCLENBQUM7QUFDekcsT0FBTyxFQUFFLGFBQWEsRUFBRSxTQUFTLEVBQUUsVUFBVSxFQUFFLE1BQU0sdUJBQXVCLENBQUM7QUFDN0UsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLGdDQUFnQyxDQUFDO0FBQ2hFLE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLG1D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QTJCbEIsY0FBYyxpY0NwRDNCLHM5ZUFvU3NCOzsyRkQzUVQsa0JBQWtCO2tCQU45QixTQUFTOytCQUNFLGdCQUFnQixtQkFHVCx1QkFBdUIsQ0FBQyxNQUFNOzswQkErRjVDLE1BQU07MkJBQUMsYUFBYTs0Q0FuRmQsZUFBZTtzQkFBdkIsS0FBSztnQkFjc0MsYUFBYTtzQkFBeEQsU0FBUzt1QkFBQyxhQUFhLEVBQUUsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFO2dCQUVkLGFBQWE7c0JBQXhDLFNBQVM7dUJBQUMsZUFBZTtnQkFDQyxXQUFXO3NCQUFyQyxTQUFTO3VCQUFDLGNBQWM7Z0JBR0EsVUFBVTtzQkFBbEMsU0FBUzt1QkFBQyxZQUFZO2dCQUNPLGVBQWU7c0JBQTVDLFNBQVM7dUJBQUMsaUJBQWlCO2dCQUNBLGFBQWE7c0JBQXhDLFNBQVM7dUJBQUMsZUFBZTtnQkFDRCxVQUFVO3NCQUFsQyxTQUFTO3VCQUFDLFlBQVk7Z0JBZWIsZUFBZTtzQkFBeEIsTUFBTSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgRWxlbWVudFJlZiwgT25Jbml0LCBWaWV3Q2hpbGQsIElucHV0LCBTaW1wbGVDaGFuZ2VzLCBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSwgSW5qZWN0LCBPdXRwdXQsIEV2ZW50RW1pdHRlciwgQWZ0ZXJWaWV3SW5pdH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IE1hdFBhZ2luYXRvciwgUGFnZUV2ZW50IH0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwvcGFnaW5hdG9yJztcclxuaW1wb3J0IHsgQXBpUmVzcG9uc2VNb2RlbCwgQXBwb2ludG1lbnRNb2RlbCwgQ3VzdG9tRW5jb3VudGVyTW9kZWwsIEN1c3RvbU9ic01vZGVsLCBDdXN0b21WaXNpdE1vZGVsLCBQcm92aWRlckF0dHJpYnV0ZU1vZGVsLCBSZXNjaGVkdWxlQXBwb2ludG1lbnRNb2RhbFJlc3BvbnNlTW9kZWwsIFBhdGllbnRWaXNpdFN1bW1hcnlDb25maWdNb2RlbCB9IGZyb20gJy4uLy4uL21vZGVsL21vZGVsJztcclxuaW1wb3J0IHsgQXBwb2ludG1lbnRTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vc2VydmljZXMvYXBwb2ludG1lbnQuc2VydmljZSc7XHJcbmltcG9ydCB7IFZpc2l0U2VydmljZSB9IGZyb20gJy4uLy4uL3NlcnZpY2VzL3Zpc2l0LnNlcnZpY2UnO1xyXG5pbXBvcnQgbW9tZW50IGZyb20gJ21vbWVudCc7XHJcbmltcG9ydCB7IENvcmVTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vc2VydmljZXMvY29yZS5zZXJ2aWNlJztcclxuaW1wb3J0IHsgVG9hc3RyU2VydmljZSB9IGZyb20gJ25neC10b2FzdHInO1xyXG5pbXBvcnQgeyBUcmFuc2xhdGVTZXJ2aWNlIH0gZnJvbSAnQG5neC10cmFuc2xhdGUvY29yZSc7XHJcbmltcG9ydCB7IGdldENhY2hlRGF0YSwgY2hlY2tJZkRhdGVPbGRUaGFuT25lRGF5LCBpc0ZlYXR1cmVQcmVzZW50IH0gZnJvbSAnLi4vLi4vdXRpbHMvdXRpbGl0eS1mdW5jdGlvbnMnO1xyXG5pbXBvcnQgeyBkb2N0b3JEZXRhaWxzLCBsYW5ndWFnZXMsIHZpc2l0VHlwZXMgfSBmcm9tICcuLi8uLi9jb25maWcvY29uc3RhbnQnO1xyXG5pbXBvcnQgeyBNaW5kbWFwU2VydmljZSB9IGZyb20gJy4uLy4uL3NlcnZpY2VzL21pbmRtYXAuc2VydmljZSc7XHJcbmltcG9ydCB7IEFwcENvbmZpZ1NlcnZpY2UgfSBmcm9tICcuLi8uLi9zZXJ2aWNlcy9hcHAtY29uZmlnLnNlcnZpY2UnO1xyXG5pbXBvcnQgeyBGb3JtQ29udHJvbCwgRm9ybUdyb3VwLCBWYWxpZGF0b3JzIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xyXG5pbXBvcnQgeyBNYXRNZW51VHJpZ2dlciB9IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsL21lbnUnO1xyXG5pbXBvcnQgeyBEb21TYW5pdGl6ZXIgfSBmcm9tICdAYW5ndWxhci9wbGF0Zm9ybS1icm93c2VyJztcclxuaW1wb3J0IHsgTmd4Um9sZXNTZXJ2aWNlIH0gZnJvbSAnbmd4LXBlcm1pc3Npb25zJztcclxuaW1wb3J0IHsgTmd4VWlMb2FkZXJTZXJ2aWNlIH0gZnJvbSAnbmd4LXVpLWxvYWRlcic7XHJcblxyXG5AQ29tcG9uZW50KHtcclxuICBzZWxlY3RvcjogJ2xpYi10YWJsZS1ncmlkJyxcclxuICB0ZW1wbGF0ZVVybDogJy4vdGFibGUtZ3JpZC5jb21wb25lbnQuaHRtbCcsXHJcbiAgc3R5bGVVcmxzOiBbJy4vdGFibGUtZ3JpZC5jb21wb25lbnQuc2NzcyddLFxyXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBUYWJsZUdyaWRDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQsIEFmdGVyVmlld0luaXQge1xyXG4gIFxyXG4gIC8vIENvbnN0YW50c1xyXG4gIHByaXZhdGUgc3RhdGljIHJlYWRvbmx5IERFRkFVTFRfUEFHRV9TSVpFX09QVElPTlMgPSBbNSwgMTAsIDIwLCAyNV07XHJcbiAgcHJpdmF0ZSBzdGF0aWMgcmVhZG9ubHkgQVBQT0lOVE1FTlRfUEFHRV9TSVpFID0gNTtcclxuICBwcml2YXRlIHN0YXRpYyByZWFkb25seSBTUEVDSUFMSVpBVElPTl9VVUlEID0gJ2VkMTcxNWY1LTkzZTItNDA0ZS1iM2M5LTJhMmQ5NjAwZjA2Mic7XHJcbiAgcHJpdmF0ZSBzdGF0aWMgcmVhZG9ubHkgVEVMRVBIT05FX0FUVFJJQlVURV9JRCA9IDg7XHJcbiAgcHJpdmF0ZSBzdGF0aWMgcmVhZG9ubHkgRk9MTE9XX1VQX0NPTkNFUFRfSUQgPSAxNjMzNDU7XHJcbiAgcHJpdmF0ZSBzdGF0aWMgcmVhZG9ubHkgQ0hJRUZfQ09NUExBSU5UX0NPTkNFUFRfSUQgPSAxNjMyMTI7XHJcbiAgXHJcbiAgQElucHV0KCkgcGx1Z2luQ29uZmlnT2JzOiBhbnk7XHJcbiAgZGlzcGxheWVkQXBwb2ludG1lbnRDb2x1bW5zOiBhbnkgPSBbXTtcclxuICBkaXNwbGF5ZWRDb2x1bW5zOiBzdHJpbmdbXSA9IFtdO1xyXG4gIGRhdGFTb3VyY2U6IGFueVtdID0gW107XHJcbiAgZmlsdGVyZWREYXRhU291cmNlOiBhbnlbXSA9IFtdO1xyXG4gIHBhZ2luYXRlZERhdGFTb3VyY2U6IGFueVtdID0gW107XHJcbiAgcGF0aWVudFJlZ0ZpZWxkczogc3RyaW5nW10gPSBbXTtcclxuICBpc01DQ1VzZXIgPSBmYWxzZTtcclxuICBwYWdlU2l6ZU9wdGlvbnMgPSBUYWJsZUdyaWRDb21wb25lbnQuREVGQVVMVF9QQUdFX1NJWkVfT1BUSU9OUztcclxuICBcclxuICAvLyBVbmlxdWUgY29tcG9uZW50IGluc3RhbmNlIElEXHJcbiAgY29tcG9uZW50SWQ6IHN0cmluZztcclxuICBcclxuICAvLyBAVmlld0NoaWxkKE1hdFBhZ2luYXRvcikgcGFnaW5hdG9yOiBNYXRQYWdpbmF0b3I7XHJcbiAgQFZpZXdDaGlsZCgnc2VhcmNoSW5wdXQnLCB7IHN0YXRpYzogdHJ1ZSB9KSBzZWFyY2hFbGVtZW50OiBFbGVtZW50UmVmO1xyXG4gIGZpbHRlcmVkRGF0ZUFuZFJhbmdlRm9ybTogRm9ybUdyb3VwO1xyXG4gIEBWaWV3Q2hpbGQoJ3RlbXBQYWdpbmF0b3InKSB0ZW1wUGFnaW5hdG9yOiBNYXRQYWdpbmF0b3I7XHJcbiAgQFZpZXdDaGlsZChNYXRNZW51VHJpZ2dlcikgbWVudVRyaWdnZXI6IE1hdE1lbnVUcmlnZ2VyO1xyXG4gIFxyXG4gIC8vIERhdGUgcGlja2VyIFZpZXdDaGlsZCByZWZlcmVuY2VzXHJcbiAgQFZpZXdDaGlsZCgnZGF0ZVBpY2tlcicpIGRhdGVQaWNrZXI6IGFueTtcclxuICBAVmlld0NoaWxkKCdzdGFydERhdGVQaWNrZXInKSBzdGFydERhdGVQaWNrZXI6IGFueTtcclxuICBAVmlld0NoaWxkKCdlbmREYXRlUGlja2VyJykgZW5kRGF0ZVBpY2tlcjogYW55O1xyXG4gIEBWaWV3Q2hpbGQoJ2ZpbHRlck1lbnUnKSBmaWx0ZXJNZW51OiBhbnk7XHJcblxyXG5cclxuICBwYW5lbEV4cGFuZGVkOiBib29sZWFuID0gdHJ1ZTtcclxuICBtb2RlOiAnZGF0ZScgfCAncmFuZ2UnID0gJ2RhdGUnO1xyXG4gIG1heERhdGU6IERhdGU7XHJcblxyXG4gIGFwcG9pbnRtZW50czogQXBwb2ludG1lbnRNb2RlbFtdID0gW107XHJcbiAgcHJpb3JpdHlWaXNpdHM6IEN1c3RvbVZpc2l0TW9kZWxbXSA9IFtdO1xyXG4gIGF3YWl0aW5nVmlzaXRzOiBDdXN0b21WaXNpdE1vZGVsW10gPSBbXTtcclxuICBpblByb2dyZXNzVmlzaXRzOiBDdXN0b21WaXNpdE1vZGVsW10gPSBbXTtcclxuICBjb21wbGV0ZWRWaXNpdHM6IEN1c3RvbVZpc2l0TW9kZWxbXSA9IFtdO1xyXG4gIGZvbGxvd1VwVmlzaXRzOiBDdXN0b21WaXNpdE1vZGVsW10gPSBbXTtcclxuXHJcbiAgc3BlY2lhbGl6YXRpb246IHN0cmluZyA9ICcnO1xyXG4gIEBPdXRwdXQoKSB2aXNpdHNDb3VudERhdGUgPSBuZXcgRXZlbnRFbWl0dGVyPGFueT4oKTtcclxuICBwYWdlSW5kZXg6IG51bWJlciA9IDA7XHJcbiAgcGFnZVNpemU6IG51bWJlciA9IDA7XHJcbiAgcGFnZUV2ZW50OiBQYWdlRXZlbnQ7XHJcbiAgcmVjb3Jkc0ZldGNoZWQ6IG51bWJlciA9IDA7XHJcbiAgdG90YWxSZWNvcmRzOiBudW1iZXIgPSAwO1xyXG4gIFxyXG4gIGlzRmlsdGVyQXBwbGllZCA9IGZhbHNlO1xyXG4gIHB2czogUGF0aWVudFZpc2l0U3VtbWFyeUNvbmZpZ01vZGVsO1xyXG4gIGJhc2VVUkw6IGFueTtcclxuICBpc0JyYW5kTmFtZTogc3RyaW5nO1xyXG5cclxuICAvLyB0byBhcHBseSBmaWx0ZXIgd2l0aCBkYXRlIGFuZCB0ZXh0IHNlYXJjaFxyXG4gIGRhdGVGaWVsZDogc3RyaW5nO1xyXG4gIGRhdGVGaWx0ZXI6IHN0cmluZztcclxuICBvcmlnaW5hbERhdGE6IGFueVtdO1xyXG4gIGZpbHRlcmVkRGF0YUFmdGVyRGF0ZTogYW55W107XHJcbiAgdGFibGVMb2FkZXI6IGJvb2xlYW47XHJcbiAgXHJcbiAgLy8gQ3VzdG9tIHBhZ2luYXRpb24gcHJvcGVydGllc1xyXG4gIGN1cnJlbnRQYWdlOiBudW1iZXIgPSAwO1xyXG4gIGl0ZW1zUGVyUGFnZTogbnVtYmVyID0gMDtcclxuICBzZWFyY2hUZXJtOiBzdHJpbmcgPSAnJztcclxuICBjdXJyZW50RGF0ZUZpbHRlcjogYW55ID0gbnVsbDtcclxuICBcclxuICAvLyBGaWx0ZXJlZCBkYXRhIHByb3BlcnRpZXNcclxuICBmaWx0ZXJlZFRvdGFsQ291bnQ6IG51bWJlciA9IDA7XHJcbiAgaXNGaWx0ZXJBY3RpdmU6IGJvb2xlYW4gPSBmYWxzZTtcclxuICBwYWdpbmF0aW9uRGlzYWJsZWQ6IGJvb2xlYW4gPSBmYWxzZTtcclxuXHJcbiAgbmdBZnRlclZpZXdJbml0KCkge1xyXG4gICAgLy8gUGFnaW5hdG9yIHdpbGwgYmUgc2V0IHdoZW4gZGF0YSBpcyBsb2FkZWRcclxuICB9XHJcblxyXG4gIGNvbnN0cnVjdG9yKFxyXG4gICAgcHJpdmF0ZSBhcHBvaW50bWVudFNlcnZpY2U6IEFwcG9pbnRtZW50U2VydmljZSxcclxuICAgIHByaXZhdGUgdmlzaXRTZXJ2aWNlOiBWaXNpdFNlcnZpY2UsXHJcbiAgICBwcml2YXRlIGNvcmVTZXJ2aWNlOiBDb3JlU2VydmljZSxcclxuICAgIHByaXZhdGUgdG9hc3RyOiBUb2FzdHJTZXJ2aWNlLFxyXG4gICAgcHJpdmF0ZSB0cmFuc2xhdGVTZXJ2aWNlOiBUcmFuc2xhdGVTZXJ2aWNlLFxyXG4gICAgcHJpdmF0ZSBtaW5kbWFwU2VydmljZTogTWluZG1hcFNlcnZpY2UsXHJcbiAgICBwcml2YXRlIHNhbml0aXplcjogRG9tU2FuaXRpemVyLFxyXG4gICAgcHJpdmF0ZSBhcHBDb25maWdTZXJ2aWNlOiBBcHBDb25maWdTZXJ2aWNlLFxyXG4gICAgcHJpdmF0ZSByb2xlc1NlcnZpY2U6IE5neFJvbGVzU2VydmljZSxcclxuICAgIHByaXZhdGUgbmd4TG9hZGVyOiBOZ3hVaUxvYWRlclNlcnZpY2UsXHJcbiAgICBASW5qZWN0KCdlbnZpcm9ubWVudCcpIGVudmlyb25tZW50XHJcbiAgKSB7IFxyXG4gICAgLy8gR2VuZXJhdGUgdW5pcXVlIGNvbXBvbmVudCBJRFxyXG4gICAgdGhpcy5jb21wb25lbnRJZCA9ICd0YWJsZS1ncmlkLScgKyBNYXRoLnJhbmRvbSgpLnRvU3RyaW5nKDM2KS5zdWJzdHIoMiwgOSk7XHJcbiAgICBcclxuICAgIHRoaXMudGFibGVMb2FkZXIgPSBpc0ZlYXR1cmVQcmVzZW50KGVudmlyb25tZW50LmZlYXR1cmVMaXN0LCAndGFibGVMb2FkZXInKTtcclxuICAgIHRoaXMuYmFzZVVSTCA9IGVudmlyb25tZW50LmJhc2VVUkw7XHJcbiAgICB0aGlzLnBhZ2VTaXplID0gZW52aXJvbm1lbnQucmVjb3Jkc1BlclBhZ2U7XHJcbiAgICB0aGlzLml0ZW1zUGVyUGFnZSA9IGVudmlyb25tZW50LnJlY29yZHNQZXJQYWdlO1xyXG4gICAgdGhpcy5maWx0ZXJlZERhdGVBbmRSYW5nZUZvcm0gPSB0aGlzLmNyZWF0ZUZpbHRlcmVkRGF0ZVJhbmdlRm9ybSgpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogQ3JlYXRlcyBhIGZpbHRlcmVkIGRhdGUgcmFuZ2UgZm9ybSB3aXRoIHJlcXVpcmVkIGRhdGUgZmllbGRzXHJcbiAgICogQHJldHVybiB7Rm9ybUdyb3VwfSAtIFRoZSBjcmVhdGVkIGZvcm0gZ3JvdXBcclxuICAgKi9cclxuICBjcmVhdGVGaWx0ZXJlZERhdGVSYW5nZUZvcm0oKTogRm9ybUdyb3VwIHtcclxuICAgIHJldHVybiBuZXcgRm9ybUdyb3VwKHtcclxuICAgICAgZGF0ZTogbmV3IEZvcm1Db250cm9sKCcnLCBbVmFsaWRhdG9ycy5yZXF1aXJlZF0pLFxyXG4gICAgICBzdGFydERhdGU6IG5ldyBGb3JtQ29udHJvbChudWxsLCBWYWxpZGF0b3JzLnJlcXVpcmVkKSxcclxuICAgICAgZW5kRGF0ZTogbmV3IEZvcm1Db250cm9sKG51bGwsIFZhbGlkYXRvcnMucmVxdWlyZWQpLFxyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBJbml0aWFsaXplIGNvbXBvbmVudC1zcGVjaWZpYyBzdGF0ZSB0byBwcmV2ZW50IGNvbmZsaWN0cyBiZXR3ZWVuIG11bHRpcGxlIGluc3RhbmNlc1xyXG4gICAqL1xyXG4gIHByaXZhdGUgaW5pdGlhbGl6ZUNvbXBvbmVudFN0YXRlKCk6IHZvaWQge1xyXG4gICAgLy8gUmVzZXQgYWxsIGNvbXBvbmVudC1zcGVjaWZpYyBhcnJheXMgYW5kIG9iamVjdHNcclxuICAgIHRoaXMuYXBwb2ludG1lbnRzID0gW107XHJcbiAgICB0aGlzLnByaW9yaXR5VmlzaXRzID0gW107XHJcbiAgICB0aGlzLmF3YWl0aW5nVmlzaXRzID0gW107XHJcbiAgICB0aGlzLmluUHJvZ3Jlc3NWaXNpdHMgPSBbXTtcclxuICAgIHRoaXMuY29tcGxldGVkVmlzaXRzID0gW107XHJcbiAgICB0aGlzLmZvbGxvd1VwVmlzaXRzID0gW107XHJcbiAgICBcclxuICAgIC8vIFJlc2V0IHBhZ2luYXRpb24gc3RhdGVcclxuICAgIHRoaXMucGFnZUluZGV4ID0gMDtcclxuICAgIHRoaXMucmVjb3Jkc0ZldGNoZWQgPSAwO1xyXG4gICAgdGhpcy50b3RhbFJlY29yZHMgPSAwO1xyXG4gICAgXHJcbiAgICAvLyBSZXNldCBmaWx0ZXIgc3RhdGVcclxuICAgIHRoaXMuaXNGaWx0ZXJBcHBsaWVkID0gZmFsc2U7XHJcbiAgICB0aGlzLmlzRmlsdGVyQWN0aXZlID0gZmFsc2U7XHJcbiAgICB0aGlzLmZpbHRlcmVkVG90YWxDb3VudCA9IDA7XHJcbiAgICB0aGlzLnBhZ2luYXRpb25EaXNhYmxlZCA9IGZhbHNlO1xyXG4gICAgdGhpcy5vcmlnaW5hbERhdGEgPSBbXTtcclxuICAgIHRoaXMuZmlsdGVyZWREYXRhQWZ0ZXJEYXRlID0gW107XHJcbiAgICBcclxuICAgIC8vIFJlc2V0IGRhdGEgYXJyYXlzIGZvciB0aGlzIGluc3RhbmNlXHJcbiAgICB0aGlzLmRhdGFTb3VyY2UgPSBbXTtcclxuICAgIHRoaXMuZmlsdGVyZWREYXRhU291cmNlID0gW107XHJcbiAgICB0aGlzLnBhZ2luYXRlZERhdGFTb3VyY2UgPSBbXTtcclxuICAgIHRoaXMuY3VycmVudFBhZ2UgPSAwO1xyXG4gICAgdGhpcy5zZWFyY2hUZXJtID0gJyc7XHJcbiAgICB0aGlzLmN1cnJlbnREYXRlRmlsdGVyID0gbnVsbDtcclxuICAgXHJcbiAgICBpZih0aGlzLnBsdWdpbkNvbmZpZ09icz8ucGx1Z2luQ29uZmlnT2JzRmxhZyA9PT0gJ0FwcG9pbnRtZW50Jyl7XHJcbiAgICAgIHRoaXMucGFnZVNpemUgPSBUYWJsZUdyaWRDb21wb25lbnQuQVBQT0lOVE1FTlRfUEFHRV9TSVpFO1xyXG4gICAgICB0aGlzLml0ZW1zUGVyUGFnZSA9IFRhYmxlR3JpZENvbXBvbmVudC5BUFBPSU5UTUVOVF9QQUdFX1NJWkU7XHJcbiAgICAgIGNvbnNvbGUubG9nKCdpdGVtc1BlclBhZ2UnLCB0aGlzLml0ZW1zUGVyUGFnZSk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBBcHBseSBjdXN0b20gcGFnaW5hdGlvbiB0byB0aGUgZmlsdGVyZWQgZGF0YVxyXG4gICAqL1xyXG4gIHByaXZhdGUgYXBwbHlQYWdpbmF0aW9uKCk6IHZvaWQge1xyXG4gICAgY29uc3Qgc3RhcnRJbmRleCA9IHRoaXMuY3VycmVudFBhZ2UgKiB0aGlzLml0ZW1zUGVyUGFnZTtcclxuICAgIGNvbnN0IGVuZEluZGV4ID0gc3RhcnRJbmRleCArIHRoaXMuaXRlbXNQZXJQYWdlO1xyXG4gICAgdGhpcy5wYWdpbmF0ZWREYXRhU291cmNlID0gdGhpcy5maWx0ZXJlZERhdGFTb3VyY2Uuc2xpY2Uoc3RhcnRJbmRleCwgZW5kSW5kZXgpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogQ2FsY3VsYXRlIHBhZ2luYXRpb24gaW5kaWNlc1xyXG4gICAqL1xyXG4gIHByaXZhdGUgZ2V0UGFnaW5hdGlvbkluZGljZXMoKTogeyBzdGFydEluZGV4OiBudW1iZXI7IGVuZEluZGV4OiBudW1iZXIgfSB7XHJcbiAgICByZXR1cm4ge1xyXG4gICAgICBzdGFydEluZGV4OiB0aGlzLmN1cnJlbnRQYWdlICogdGhpcy5pdGVtc1BlclBhZ2UsXHJcbiAgICAgIGVuZEluZGV4OiAodGhpcy5jdXJyZW50UGFnZSArIDEpICogdGhpcy5pdGVtc1BlclBhZ2VcclxuICAgIH07XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBSZXN0b3JlIGN1cnJlbnQgcGFnZSBkYXRhIGZyb20gb3JpZ2luYWwgZGF0YVxyXG4gICAqL1xyXG4gIHByaXZhdGUgcmVzdG9yZUN1cnJlbnRQYWdlRGF0YSgpOiB2b2lkIHtcclxuICAgIGNvbnN0IHsgc3RhcnRJbmRleCwgZW5kSW5kZXggfSA9IHRoaXMuZ2V0UGFnaW5hdGlvbkluZGljZXMoKTtcclxuICAgIHRoaXMucGFnaW5hdGVkRGF0YVNvdXJjZSA9IHRoaXMub3JpZ2luYWxEYXRhLnNsaWNlKHN0YXJ0SW5kZXgsIGVuZEluZGV4KTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEFwcGx5IHNlYXJjaCBmaWx0ZXIgdG8gdGhlIGN1cnJlbnQgcGFnZSBkYXRhIG9ubHlcclxuICAgKi9cclxuICBwcml2YXRlIGFwcGx5U2VhcmNoRmlsdGVyKCk6IHZvaWQge1xyXG4gICAgaWYgKCF0aGlzLnNlYXJjaFRlcm0udHJpbSgpKSB7XHJcbiAgICAgIHRoaXMucmVzdG9yZUN1cnJlbnRQYWdlRGF0YSgpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgY29uc3Qgc2VhcmNoTG93ZXIgPSB0aGlzLnNlYXJjaFRlcm0udG9Mb3dlckNhc2UoKTtcclxuICAgICAgdGhpcy5wYWdpbmF0ZWREYXRhU291cmNlID0gdGhpcy5wYWdpbmF0ZWREYXRhU291cmNlLmZpbHRlcigoaXRlbTogYW55KSA9PiBcclxuICAgICAgICB0aGlzLm1hdGNoZXNTZWFyY2hUZXJtKGl0ZW0sIHNlYXJjaExvd2VyKVxyXG4gICAgICApO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogR2V0IGZvcm1hdHRlZCBkYXRlIGZvciBhbiBpdGVtIGJhc2VkIG9uIHRoZSBkYXRlIGZpZWxkXHJcbiAgICovXHJcbiAgcHJpdmF0ZSBnZXRJdGVtRGF0ZShpdGVtOiBhbnksIGRhdGVGaWVsZDogc3RyaW5nKTogc3RyaW5nIHtcclxuICAgIGlmIChkYXRlRmllbGQgPT09ICdmb2xsb3dVcCcpIHtcclxuICAgICAgcmV0dXJuIHRoaXMuZm9ybWF0RGF0ZSh0aGlzLmNvbnZlcnRUb0lTTyhpdGVtLmZvbGxvd1VwKSk7XHJcbiAgICB9IGVsc2UgaWYgKGRhdGVGaWVsZCA9PT0gJ3Nsb3RKc0RhdGUnKSB7XHJcbiAgICAgIHJldHVybiB0aGlzLmZvcm1hdERhdGUoaXRlbVtkYXRlRmllbGRdKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHJldHVybiBpdGVtW2RhdGVGaWVsZF0uaW5jbHVkZXMoJywnKSA/IHRoaXMuZm9ybWF0RGF0ZShpdGVtW2RhdGVGaWVsZF0pIDogdGhpcy5jb252ZXJ0VG9EYXRlKGl0ZW1bZGF0ZUZpZWxkXSk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBDaGVjayBpZiBpdGVtIG1hdGNoZXMgc2VhcmNoIHRlcm1cclxuICAgKi9cclxuICBwcml2YXRlIG1hdGNoZXNTZWFyY2hUZXJtKGl0ZW06IGFueSwgc2VhcmNoTG93ZXI6IHN0cmluZyk6IGJvb2xlYW4ge1xyXG4gICAgaWYgKHRoaXMucGx1Z2luQ29uZmlnT2JzPy5wbHVnaW5Db25maWdPYnNGbGFnID09PSAnQXBwb2ludG1lbnQnKSB7XHJcbiAgICAgIHJldHVybiAoXHJcbiAgICAgICAgaXRlbT8ub3Blbk1yc0lkPy50b0xvd2VyQ2FzZSgpLmluY2x1ZGVzKHNlYXJjaExvd2VyKSB8fFxyXG4gICAgICAgIGl0ZW0/LnBhdGllbnROYW1lPy50b0xvd2VyQ2FzZSgpLmluY2x1ZGVzKHNlYXJjaExvd2VyKSB8fFxyXG4gICAgICAgIGl0ZW0/LlRNSF9wYXRpZW50X2lkPy50b0xvd2VyQ2FzZSgpLmluY2x1ZGVzKHNlYXJjaExvd2VyKVxyXG4gICAgICApO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgcmV0dXJuIChcclxuICAgICAgICBpdGVtPy5wYXRpZW50Py5pZGVudGlmaWVyPy50b0xvd2VyQ2FzZSgpLmluY2x1ZGVzKHNlYXJjaExvd2VyKSB8fFxyXG4gICAgICAgIGl0ZW0/LnBhdGllbnRfbmFtZT8uZ2l2ZW5fbmFtZT8udG9Mb3dlckNhc2UoKS5pbmNsdWRlcyhzZWFyY2hMb3dlcikgfHxcclxuICAgICAgICBpdGVtPy5wYXRpZW50X25hbWU/LmZhbWlseV9uYW1lPy50b0xvd2VyQ2FzZSgpLmluY2x1ZGVzKHNlYXJjaExvd2VyKVxyXG4gICAgICApO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogQXBwbHkgbXVsdGlwbGUgZmlsdGVycyBlZmZpY2llbnRseVxyXG4gICAqL1xyXG4gIHByaXZhdGUgYXBwbHlGaWx0ZXJzKCk6IHZvaWQge1xyXG4gICAgLy8gQ2hlY2sgaWYgYW55IGZpbHRlcnMgYXJlIGFjdGl2ZVxyXG4gICAgdGhpcy5pc0ZpbHRlckFjdGl2ZSA9ICEhKHRoaXMuc2VhcmNoVGVybS50cmltKCkgfHwgdGhpcy5jdXJyZW50RGF0ZUZpbHRlcik7XHJcbiAgICB0aGlzLnBhZ2luYXRpb25EaXNhYmxlZCA9IHRoaXMuaXNGaWx0ZXJBY3RpdmU7XHJcbiAgICBcclxuICAgIC8vIElmIG5vIHNlYXJjaCB0ZXJtIGFuZCBubyBkYXRlIGZpbHRlciwgcmVzdG9yZSBjdXJyZW50IHBhZ2UgZGF0YVxyXG4gICAgaWYgKCF0aGlzLmlzRmlsdGVyQWN0aXZlKSB7XHJcbiAgICAgIHRoaXMucmVzdG9yZUN1cnJlbnRQYWdlRGF0YSgpO1xyXG4gICAgICB0aGlzLnVwZGF0ZVBhZ2luYXRvckxlbmd0aCgpO1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcbiAgICBcclxuICAgIC8vIEFsd2F5cyBzdGFydCB3aXRoIGN1cnJlbnQgcGFnZSBkYXRhIGZyb20gb3JpZ2luYWwgZGF0YSB3aGVuIGFwcGx5aW5nIGZpbHRlcnNcclxuICAgIGNvbnN0IHsgc3RhcnRJbmRleCwgZW5kSW5kZXggfSA9IHRoaXMuZ2V0UGFnaW5hdGlvbkluZGljZXMoKTtcclxuICAgIGxldCBmaWx0ZXJlZERhdGEgPSB0aGlzLm9yaWdpbmFsRGF0YS5zbGljZShzdGFydEluZGV4LCBlbmRJbmRleCk7XHJcbiAgICBcclxuICAgIC8vIEFwcGx5IGRhdGUgZmlsdGVyXHJcbiAgICBpZiAodGhpcy5jdXJyZW50RGF0ZUZpbHRlcikge1xyXG4gICAgICBjb25zdCB7IGRhdGVGaWVsZCwgZmlsdGVyVmFsdWUsIGlzUmFuZ2UsIHN0YXJ0RGF0ZSwgZW5kRGF0ZSB9ID0gdGhpcy5jdXJyZW50RGF0ZUZpbHRlcjtcclxuICAgICAgZmlsdGVyZWREYXRhID0gZmlsdGVyZWREYXRhLmZpbHRlcigoaXRlbTogYW55KSA9PiB7XHJcbiAgICAgICAgY29uc3QgaXRlbURhdGUgPSB0aGlzLmdldEl0ZW1EYXRlKGl0ZW0sIGRhdGVGaWVsZCk7XHJcbiAgICAgICAgXHJcbiAgICAgICAgaWYgKGlzUmFuZ2UgJiYgc3RhcnREYXRlICYmIGVuZERhdGUpIHtcclxuICAgICAgICAgIHJldHVybiBpdGVtRGF0ZSA+PSBzdGFydERhdGUgJiYgaXRlbURhdGUgPD0gZW5kRGF0ZTtcclxuICAgICAgICB9IGVsc2UgaWYgKGZpbHRlclZhbHVlKSB7XHJcbiAgICAgICAgICByZXR1cm4gaXRlbURhdGUgPT09IGZpbHRlclZhbHVlO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgfSk7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIC8vIEFwcGx5IHNlYXJjaCBmaWx0ZXJcclxuICAgIGlmICh0aGlzLnNlYXJjaFRlcm0udHJpbSgpKSB7XHJcbiAgICAgIGNvbnN0IHNlYXJjaExvd2VyID0gdGhpcy5zZWFyY2hUZXJtLnRvTG93ZXJDYXNlKCk7XHJcbiAgICAgIGZpbHRlcmVkRGF0YSA9IGZpbHRlcmVkRGF0YS5maWx0ZXIoKGl0ZW06IGFueSkgPT4gdGhpcy5tYXRjaGVzU2VhcmNoVGVybShpdGVtLCBzZWFyY2hMb3dlcikpO1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICAvLyBVcGRhdGUgZmlsdGVyZWQgY291bnQgZm9yIGN1cnJlbnQgcGFnZVxyXG4gICAgdGhpcy5maWx0ZXJlZFRvdGFsQ291bnQgPSBmaWx0ZXJlZERhdGEubGVuZ3RoO1xyXG4gICAgdGhpcy5wYWdpbmF0ZWREYXRhU291cmNlID0gZmlsdGVyZWREYXRhO1xyXG4gICAgXHJcbiAgICAvLyBVcGRhdGUgcGFnaW5hdG9yIGxlbmd0aFxyXG4gICAgdGhpcy51cGRhdGVQYWdpbmF0b3JMZW5ndGgoKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFVwZGF0ZSBwYWdpbmF0b3IgbGVuZ3RoIGJhc2VkIG9uIGZpbHRlciBzdGF0ZVxyXG4gICAqL1xyXG4gIHByaXZhdGUgdXBkYXRlUGFnaW5hdG9yTGVuZ3RoKCk6IHZvaWQge1xyXG4gICAgaWYgKHRoaXMudGVtcFBhZ2luYXRvcikge1xyXG4gICAgICB0aGlzLnRlbXBQYWdpbmF0b3IubGVuZ3RoID0gdGhpcy5pc0ZpbHRlckFjdGl2ZSA/IHRoaXMuZmlsdGVyZWRUb3RhbENvdW50IDogdGhpcy50b3RhbFJlY29yZHM7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBDaGVjayBpZiBwYWdpbmF0aW9uIHNob3VsZCBiZSBkaXNhYmxlZFxyXG4gICAqL1xyXG4gIHB1YmxpYyBpc1BhZ2luYXRpb25EaXNhYmxlZCgpOiBib29sZWFuIHtcclxuICAgIHJldHVybiB0aGlzLmlzRmlsdGVyQWN0aXZlIHx8IHRoaXMucGFnaW5hdGlvbkRpc2FibGVkO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogR2V0IHRoZSBjdXJyZW50IHRvdGFsIGNvdW50IChmaWx0ZXJlZCBvciBvcmlnaW5hbClcclxuICAgKi9cclxuICBwdWJsaWMgZ2V0Q3VycmVudFRvdGFsQ291bnQoKTogbnVtYmVyIHtcclxuICAgIHJldHVybiB0aGlzLmlzRmlsdGVyQWN0aXZlID8gdGhpcy5maWx0ZXJlZFRvdGFsQ291bnQgOiB0aGlzLnRvdGFsUmVjb3JkcztcclxuICB9XHJcblxyXG4gIG5nT25Jbml0KCk6IHZvaWQge1xyXG4gICAgdGhpcy5pc01DQ1VzZXIgPSAhIXRoaXMucm9sZXNTZXJ2aWNlLmdldFJvbGUoJ09SR0FOSVpBVElPTkFMOk1DQycpO1xyXG4gICAgXHJcbiAgICAvLyBJbml0aWFsaXplIGNvbXBvbmVudC1zcGVjaWZpYyBzdGF0ZVxyXG4gICAgdGhpcy5pbml0aWFsaXplQ29tcG9uZW50U3RhdGUoKTtcclxuXHJcbiAgICB0aGlzLmFwcENvbmZpZ1NlcnZpY2UubG9hZCgpLnRoZW4oKCkgPT4ge1xyXG4gICAgdGhpcy5kaXNwbGF5ZWRDb2x1bW5zID0gdGhpcy5kaXNwbGF5ZWRDb2x1bW5zLmZpbHRlcihjb2w9Pihjb2whPT0nYWdlJyB8fCB0aGlzLmNoZWNrUGF0aWVudFJlZ0ZpZWxkKCdBZ2UnKSkpO1xyXG4gICAgICBPYmplY3Qua2V5cyh0aGlzLmFwcENvbmZpZ1NlcnZpY2UucGF0aWVudF9yZWdpc3RyYXRpb24pLmZvckVhY2gob2JqPT57XHJcbiAgICAgICAgdGhpcy5wYXRpZW50UmVnRmllbGRzLnB1c2goLi4udGhpcy5hcHBDb25maWdTZXJ2aWNlLnBhdGllbnRfcmVnaXN0cmF0aW9uW29ial0uZmlsdGVyKChlOiB7IGlzX2VuYWJsZWQ6IGFueTsgfSk9PmUuaXNfZW5hYmxlZCkubWFwKChlOiB7IG5hbWU6IGFueTsgfSk9PmUubmFtZSkpO1xyXG4gICAgICB9KTtcclxuICAgICAgdGhpcy5wdnMgPSB7IC4uLnRoaXMuYXBwQ29uZmlnU2VydmljZS5wYXRpZW50X3Zpc2l0X3N1bW1hcnkgfTsgXHJcbiAgICAgIHRoaXMucHZzLmFwcG9pbnRtZW50X2J1dHRvbiA9IHRoaXMucHZzLmFwcG9pbnRtZW50X2J1dHRvbjtcclxuICAgICAgdGhpcy5kaXNwbGF5ZWRDb2x1bW5zID0gdGhpcy5kaXNwbGF5ZWRDb2x1bW5zLmZpbHRlcihjb2w9PiB7XHJcbiAgICAgICAgaWYoY29sID09PSAnZHJOYW1lJyAmJiAhdGhpcy5pc01DQ1VzZXIpIHJldHVybiBmYWxzZTtcclxuICAgICAgICBpZihjb2wgPT09ICdhZ2UnKSByZXR1cm4gdGhpcy5jaGVja1BhdGllbnRSZWdGaWVsZCgnQWdlJyk7XHJcbiAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgIH0pO1xyXG5cclxuICAgICAgaWYoIXRoaXMucHZzLmF3YWl0aW5nX3Zpc2l0c19wYXRpZW50X3R5cGVfZGVtYXJjYXRpb24pe1xyXG4gICAgICAgIHRoaXMuZGlzcGxheWVkQ29sdW1ucyA9IHRoaXMuZGlzcGxheWVkQ29sdW1ucy5maWx0ZXIoY29sPT4oY29sIT09J3BhdGllbnRfdHlwZScpKTtcclxuICAgICAgfVxyXG4gICAgfSkuY2F0Y2goKGVycm9yKSA9PiB7XHJcbiAgICAgIGNvbnNvbGUuZXJyb3IoJ0Vycm9yIGxvYWRpbmcgYXBwIGNvbmZpZycsIGVycm9yKTtcclxuICAgIH0pO1xyXG5cclxuICAgIHRoaXMudHJhbnNsYXRlU2VydmljZS51c2UoZ2V0Q2FjaGVEYXRhKGZhbHNlLCBsYW5ndWFnZXMuU0VMRUNURURfTEFOR1VBR0UpKTtcclxuICAgIGxldCBwcm92aWRlciA9IGdldENhY2hlRGF0YSh0cnVlLCBkb2N0b3JEZXRhaWxzLlBST1ZJREVSKTtcclxuICAgIGlmIChwcm92aWRlcikge1xyXG4gICAgICBpZiAocHJvdmlkZXIuYXR0cmlidXRlcy5sZW5ndGgpIHtcclxuICAgICAgICB0aGlzLnNwZWNpYWxpemF0aW9uID0gdGhpcy5nZXRTcGVjaWFsaXphdGlvbihwcm92aWRlci5hdHRyaWJ1dGVzKTtcclxuICAgICAgfVxyXG4gICAgICBpZih0aGlzLnBsdWdpbkNvbmZpZ09icz8ucGx1Z2luQ29uZmlnT2JzRmxhZyA9PT0gXCJBcHBvaW50bWVudFwiKXtcclxuICAgICAgICB0aGlzLmdldEFwcG9pbnRtZW50cygpO1xyXG4gICAgICB9XHJcbiAgICAgIGlmKHRoaXMucGx1Z2luQ29uZmlnT2JzPy5wbHVnaW5Db25maWdPYnNGbGFnID09PSBcIkF3YWl0aW5nXCIpe1xyXG4gICAgICAgIHRoaXMuZ2V0QXdhaXRpbmdWaXNpdHMoMSk7XHJcbiAgICAgIH1cclxuICAgICAgaWYodGhpcy5wbHVnaW5Db25maWdPYnM/LnBsdWdpbkNvbmZpZ09ic0ZsYWcgPT09IFwiUHJpb3JpdHlcIil7XHJcbiAgICAgICAgdGhpcy5nZXRQcmlvcml0eVZpc2l0cygxKTtcclxuICAgICAgfVxyXG4gICAgICBpZih0aGlzLnBsdWdpbkNvbmZpZ09icz8ucGx1Z2luQ29uZmlnT2JzRmxhZyA9PT0gXCJJblByb2dyZXNzXCIpe1xyXG4gICAgICAgIHRoaXMuZ2V0SW5Qcm9ncmVzc1Zpc2l0cygxKTtcclxuICAgICAgfVxyXG4gICAgICBpZih0aGlzLnBsdWdpbkNvbmZpZ09icz8ucGx1Z2luQ29uZmlnT2JzRmxhZyA9PT0gXCJDb21wbGV0ZWRcIil7XHJcbiAgICAgICAgdGhpcy5nZXRDb21wbGV0ZWRWaXNpdHMoMSk7XHJcbiAgICAgIH1pZih0aGlzLnBsdWdpbkNvbmZpZ09icz8ucGx1Z2luQ29uZmlnT2JzRmxhZyA9PT0gXCJGb2xsb3dVcFwiKXtcclxuICAgICAgICB0aGlzLmdldEZvbGxvd1VwVmlzaXQoMSk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICAgIHRoaXMubWF4RGF0ZSA9IHRoaXMucGx1Z2luQ29uZmlnT2JzLmZpbHRlck9icy5maWx0ZXJEYXRlTWF4O1xyXG4gICAgaWYodGhpcy5wbHVnaW5Db25maWdPYnMuaGFzT3duUHJvcGVydHkoXCJwYWdlU2l6ZU9wdGlvbnNcIikpe1xyXG4gICAgICB0aGlzLnBhZ2VTaXplT3B0aW9ucyA9IHRoaXMucGx1Z2luQ29uZmlnT2JzLnBhZ2VTaXplT3B0aW9uc1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogRHlubWFpYyBsYWJlbCBEaXNwbGF5XHJcbiAgICogQHBhcmFtIGNoYW5nZXMgcGx1Z2luQ29uZmlnT2JzIFxyXG4gICAqL1xyXG4gIG5nT25DaGFuZ2VzKGNoYW5nZXM6IFNpbXBsZUNoYW5nZXMpOiB2b2lkIHtcclxuICAgIGlmIChjaGFuZ2VzW1wicGx1Z2luQ29uZmlnT2JzXCJdICYmIGNoYW5nZXNbXCJwbHVnaW5Db25maWdPYnNcIl0uY3VycmVudFZhbHVlKSB7XHJcbiAgICAgIHRoaXMuZGlzcGxheWVkQXBwb2ludG1lbnRDb2x1bW5zID0gWy4uLmNoYW5nZXNbXCJwbHVnaW5Db25maWdPYnNcIl0uY3VycmVudFZhbHVlPy50YWJsZUNvbHVtbnNdXHJcbiAgICAgIHRoaXMuZGlzcGxheWVkQ29sdW1ucyA9IHRoaXMuZGlzcGxheWVkQXBwb2ludG1lbnRDb2x1bW5zLm1hcChjb2x1bW4gPT4gY29sdW1uLmtleSk7XHJcbiAgICB9XHJcbiAgICBpZiggKCFjaGFuZ2VzWydwbHVnaW5Db25maWdPYnMnXS5maXJzdENoYW5nZSkgJiYgdGhpcy5wbHVnaW5Db25maWdPYnMucGx1Z2luQ29uZmlnT2JzRmxhZyA9PSBcIkFwcG9pbnRtZW50XCIgJiYgY2hhbmdlc1tcInBsdWdpbkNvbmZpZ09ic1wiXS5jdXJyZW50VmFsdWU/LnRhYmxlSGVhZGVyICE9PSBjaGFuZ2VzW1wicGx1Z2luQ29uZmlnT2JzXCJdLnByZXZpb3VzVmFsdWU/LnRhYmxlSGVhZGVyKXtcclxuICAgICAgdGhpcy5wYWdlU2l6ZSA9IFRhYmxlR3JpZENvbXBvbmVudC5BUFBPSU5UTUVOVF9QQUdFX1NJWkU7XHJcbiAgICAgIHRoaXMuaXRlbXNQZXJQYWdlID0gVGFibGVHcmlkQ29tcG9uZW50LkFQUE9JTlRNRU5UX1BBR0VfU0laRTtcclxuICAgICAgdGhpcy5nZXRBcHBvaW50bWVudHMoKTtcclxuICAgIH1cclxuICAgIGNvbnN0IHByZXYgPSBjaGFuZ2VzWydwbHVnaW5Db25maWdPYnMnXS5wcmV2aW91c1ZhbHVlO1xyXG4gICAgY29uc3QgY3VyciA9IGNoYW5nZXNbJ3BsdWdpbkNvbmZpZ09icyddLmN1cnJlbnRWYWx1ZTtcclxuICAgIGNvbnN0IHByZXZUeXBlID0gcHJldj8uZmlsdGVyPy5maWx0ZXJUeXBlO1xyXG4gICAgY29uc3QgY3VyclR5cGUgPSBjdXJyPy5maWx0ZXI/LmZpbHRlclR5cGU7XHJcbiAgICBpZiAoIHByZXZUeXBlICE9PSBjdXJyVHlwZSkge1xyXG4gICAgICB0aGlzLnJlc2V0RGF0ZUZvcm0oKTsgLy8gUmVzZXQgb25seSB3aGVuIHR5cGUgaGFzIGNoYW5nZWRcclxuICAgIH1cclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICogUmVzZXQgdGhlIGRhdGUgZm9yIGFwcG9pbnRtZW50cyhUb2RheSdzLHVwY29taW5nLHBlbmRpbmcgYXBwb2lubWVudHMpICBnXHJcbiAgKi9cclxuICByZXNldERhdGVGb3JtKCkge1xyXG4gICAgaWYgKHRoaXMuZmlsdGVyZWREYXRlQW5kUmFuZ2VGb3JtKSB7XHJcbiAgICAgIHRoaXMuZmlsdGVyZWREYXRlQW5kUmFuZ2VGb3JtLnJlc2V0KHtcclxuICAgICAgICBkYXRlOiBudWxsLFxyXG4gICAgICAgIHN0YXJ0RGF0ZTogbnVsbCxcclxuICAgICAgICBlbmREYXRlOiBudWxsXHJcbiAgICAgIH0pO1xyXG4gICAgfVxyXG4gICAgdGhpcy5tb2RlID0gJ2RhdGUnOyBcclxuICAgIGlmICh0aGlzLnNlYXJjaEVsZW1lbnQgJiYgdGhpcy5zZWFyY2hFbGVtZW50Lm5hdGl2ZUVsZW1lbnQpIHtcclxuICAgICAgdGhpcy5zZWFyY2hFbGVtZW50Lm5hdGl2ZUVsZW1lbnQudmFsdWUgPSBcIlwiO1xyXG4gICAgfVxyXG4gICAgdGhpcy5pc0ZpbHRlckFwcGxpZWQgPSBmYWxzZTtcclxuICAgIHRoaXMuZGF0YVNvdXJjZS5maWx0ZXIgPSBudWxsO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgKiBSZXRyZWl2ZSB0aGUgY2hpZWYgY29tcGxhaW50cyBmb3IgdGhlIHZpc2l0XHJcbiAgKiBAcGFyYW0ge0N1c3RvbVZpc2l0TW9kZWx9IHZpc2l0IC0gVmlzaXRcclxuICAqIEByZXR1cm4ge3N0cmluZ1tdfSAtIENoaWVmIGNvbXBsYWludHMgYXJyYXlcclxuICAqL1xyXG4gIGdldENoZWlmQ29tcGxhaW50KHZpc2l0OiBDdXN0b21WaXNpdE1vZGVsKTogc3RyaW5nW10ge1xyXG4gICAgbGV0IHJlY2VudDogc3RyaW5nW10gPSBbXTtcclxuICAgIGNvbnN0IGVuY291bnRlcnMgPSB2aXNpdC5lbmNvdW50ZXJzO1xyXG4gICAgZW5jb3VudGVycy5mb3JFYWNoKChlbmNvdW50ZXI6IEN1c3RvbUVuY291bnRlck1vZGVsKSA9PiB7XHJcbiAgICAgIGNvbnN0IGRpc3BsYXkgPSBlbmNvdW50ZXIudHlwZT8ubmFtZTtcclxuICAgICAgaWYgKGRpc3BsYXkubWF0Y2godmlzaXRUeXBlcy5BRFVMVElOSVRJQUwpICE9PSBudWxsKSB7XHJcbiAgICAgICAgY29uc3Qgb2JzID0gZW5jb3VudGVyLm9icztcclxuICAgICAgICBvYnMuZm9yRWFjaCgoY3VycmVudE9iczogQ3VzdG9tT2JzTW9kZWwpID0+IHtcclxuICAgICAgICAgIGlmIChjdXJyZW50T2JzLmNvbmNlcHRfaWQgPT0gVGFibGVHcmlkQ29tcG9uZW50LkNISUVGX0NPTVBMQUlOVF9DT05DRVBUX0lEKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IGN1cnJlbnRDb21wbGFpbnQgPSB0aGlzLnZpc2l0U2VydmljZS5nZXREYXRhMihjdXJyZW50T2JzKT8udmFsdWVfdGV4dC5yZXBsYWNlKG5ldyBSZWdFeHAoJ+KWuicsICdnJyksICcnKS5zcGxpdCgnPGI+Jyk7XHJcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAxOyBpIDwgY3VycmVudENvbXBsYWludC5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICAgIGNvbnN0IG9iczEgPSBjdXJyZW50Q29tcGxhaW50W2ldLnNwbGl0KCc8Jyk7XHJcbiAgICAgICAgICAgICAgaWYgKCFvYnMxWzBdLm1hdGNoKHZpc2l0VHlwZXMuQVNTT0NJQVRFRF9TWU1QVE9NUykpIHtcclxuICAgICAgICAgICAgICAgIHJlY2VudC5wdXNoKG9iczFbMF0pO1xyXG4gICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgICB9XHJcbiAgICB9KTtcclxuICAgIHJldHVybiByZWNlbnQ7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAqIENoZWNrIGhvdyBvbGQgdGhlIGRhdGUgaXMgZnJvbSBub3dcclxuICAqIEBwYXJhbSB7c3RyaW5nfSBkYXRhIC0gRGF0ZSBpbiBzdHJpbmcgZm9ybWF0XHJcbiAgKiBAcmV0dXJuIHtzdHJpbmd9IC0gUmV0dXJucyBob3cgb2xkIHRoZSBkYXRlIGlzIGZyb20gbm93XHJcbiAgKi9cclxuICBjaGVja0lmRGF0ZU9sZFRoYW5PbmVEYXkoZGF0YTogc3RyaW5nKSB7XHJcbiAgICBsZXQgaG91cnMgPSBtb21lbnQoZGF0YSkuZGlmZihtb21lbnQoKSwgJ2hvdXJzJyk7XHJcbiAgICBsZXQgbWludXRlcyA9IG1vbWVudChkYXRhKS5kaWZmKG1vbWVudCgpLCAnbWludXRlcycpO1xyXG4gICAgaWYoaG91cnMgPiAyNCkge1xyXG4gICAgICByZXR1cm4gbW9tZW50KGRhdGEpLmZvcm1hdCgnREQgTU1NLCBZWVlZIGhoOm1tIEEnKTtcclxuICAgIH07XHJcbiAgICBpZiAoaG91cnMgPCAxKSB7XHJcbiAgICAgIGlmKG1pbnV0ZXMgPCAwKSByZXR1cm4gYER1ZSA6ICR7bW9tZW50KGRhdGEpLmZvcm1hdCgnREQgTU1NLCBZWVlZIGhoOm1tIEEnKX1gO1xyXG4gICAgICByZXR1cm4gYCR7bWludXRlc30gbWludXRlc2A7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gYCR7aG91cnN9IGhyc2A7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAqIFJlc2NoZWR1bGUgYXBwb2ludG1lbnRcclxuICAqIEBwYXJhbSB7QXBwb2ludG1lbnRNb2RlbH0gYXBwb2ludG1lbnQgLSBBcHBvaW50bWVudCB0byBiZSByZXNjaGVkdWxlZFxyXG4gICogQHBhcmFtIHtib29sZWFufSBpc1ZhbGlkYXRpb25SZXF1aXJlZCAtIElmIHRydWUsIHZhbGlkYXRpb24gaXMgcmVxdWlyZWRcclxuICAqIEByZXR1cm4ge3ZvaWR9XHJcbiAgKi9cclxuICByZXNjaGVkdWxlKGFwcG9pbnRtZW50OiBBcHBvaW50bWVudE1vZGVsLCBpc1ZhbGlkYXRpb25SZXF1aXJlZDogYm9vbGVhbikge1xyXG4gICAgY29uc3QgbGVuID0gYXBwb2ludG1lbnQudmlzaXQuZW5jb3VudGVycy5maWx0ZXIoKGU6IEN1c3RvbUVuY291bnRlck1vZGVsKSA9PiB7XHJcbiAgICAgIHJldHVybiAoZS50eXBlLm5hbWUgPT0gdmlzaXRUeXBlcy5QQVRJRU5UX0VYSVRfU1VSVkVZIHx8IGUudHlwZS5uYW1lID09IHZpc2l0VHlwZXMuVklTSVRfQ09NUExFVEUpO1xyXG4gICAgfSkubGVuZ3RoO1xyXG4gICAgY29uc3QgaXNDb21wbGV0ZWQgPSBCb29sZWFuKGxlbik7XHJcbiAgICBpZiAoaXNDb21wbGV0ZWQpIHtcclxuICAgICAgdGhpcy50b2FzdHIuZXJyb3IodGhpcy50cmFuc2xhdGVTZXJ2aWNlLmluc3RhbnQoXCJWaXNpdCBpcyBhbHJlYWR5IGNvbXBsZXRlZCwgaXQgY2FuJ3QgYmUgcmVzY2hlZHVsZWQuXCIpLCB0aGlzLnRyYW5zbGF0ZVNlcnZpY2UuaW5zdGFudCgnUmVzY2hlZHVsaW5nIGZhaWxlZCEnKSk7XHJcbiAgICB9IGVsc2UgaWYoYXBwb2ludG1lbnQudmlzaXRTdGF0dXMgPT0gJ1Zpc2l0IEluIFByb2dyZXNzJyAmJiBpc1ZhbGlkYXRpb25SZXF1aXJlZCkge1xyXG4gICAgICB0aGlzLnRvYXN0ci5lcnJvcih0aGlzLnRyYW5zbGF0ZVNlcnZpY2UuaW5zdGFudChcIlZpc2l0IGlzIGluIHByb2dyZXNzLCBpdCBjYW4ndCBiZSByZXNjaGVkdWxlZC5cIiksIHRoaXMudHJhbnNsYXRlU2VydmljZS5pbnN0YW50KCdSZXNjaGVkdWxpbmcgZmFpbGVkIScpKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHRoaXMuY29yZVNlcnZpY2Uub3BlblJlc2NoZWR1bGVBcHBvaW50bWVudE1vZGFsKGFwcG9pbnRtZW50KS5zdWJzY3JpYmUoKHJlczogUmVzY2hlZHVsZUFwcG9pbnRtZW50TW9kYWxSZXNwb25zZU1vZGVsKSA9PiB7XHJcbiAgICAgICAgaWYgKHJlcykge1xyXG4gICAgICAgICAgbGV0IG5ld1Nsb3QgPSByZXM7XHJcbiAgICAgICAgICB0aGlzLmNvcmVTZXJ2aWNlLm9wZW5SZXNjaGVkdWxlQXBwb2ludG1lbnRDb25maXJtTW9kYWwoeyBhcHBvaW50bWVudCwgbmV3U2xvdCB9KS5zdWJzY3JpYmUoKHJlc3VsdDogYm9vbGVhbikgPT4ge1xyXG4gICAgICAgICAgICBpZiAocmVzdWx0KSB7XHJcbiAgICAgICAgICAgICAgYXBwb2ludG1lbnQuYXBwb2ludG1lbnRJZCA9IGFwcG9pbnRtZW50LmlkO1xyXG4gICAgICAgICAgICAgIGFwcG9pbnRtZW50LnNsb3REYXRlID0gbW9tZW50KG5ld1Nsb3QuZGF0ZSwgXCJZWVlZLU1NLUREXCIpLmZvcm1hdCgnREQvTU0vWVlZWScpO1xyXG4gICAgICAgICAgICAgIGFwcG9pbnRtZW50LnNsb3RUaW1lID0gbmV3U2xvdC5zbG90O1xyXG4gICAgICAgICAgICAgIHRoaXMuYXBwb2ludG1lbnRTZXJ2aWNlLnJlc2NoZWR1bGVBcHBvaW50bWVudChhcHBvaW50bWVudCkuc3Vic2NyaWJlKChyZXM6IEFwaVJlc3BvbnNlTW9kZWwpID0+IHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IG1lc3NhZ2UgPSByZXMubWVzc2FnZTtcclxuICAgICAgICAgICAgICAgIGlmIChyZXMuc3RhdHVzKSB7XHJcbiAgICAgICAgICAgICAgICAgIHRoaXMubWluZG1hcFNlcnZpY2Uubm90aWZ5SHdGb3JSZXNjaGVkdWxlQXBwb2ludG1lbnQoYXBwb2ludG1lbnQpO1xyXG4gICAgICAgICAgICAgICAgICB0aGlzLmdldEFwcG9pbnRtZW50cygpO1xyXG4gICAgICAgICAgICAgICAgICB0aGlzLnRvYXN0ci5zdWNjZXNzKHRoaXMudHJhbnNsYXRlU2VydmljZS5pbnN0YW50KFwiVGhlIGFwcG9pbnRtZW50IGhhcyBiZWVuIHJlc2NoZWR1bGVkIHN1Y2Nlc3NmdWxseSFcIiksIHRoaXMudHJhbnNsYXRlU2VydmljZS5pbnN0YW50KCdSZXNjaGVkdWxpbmcgc3VjY2Vzc2Z1bCEnKSk7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICB0aGlzLnRvYXN0ci5zdWNjZXNzKG1lc3NhZ2UsIHRoaXMudHJhbnNsYXRlU2VydmljZS5pbnN0YW50KCdSZXNjaGVkdWxpbmcgZmFpbGVkIScpKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9KTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICogQ2FuY2VsIGFwcG9pbnRtZW50XHJcbiAgKiBAcGFyYW0ge0FwcG9pbnRtZW50TW9kZWx9IGFwcG9pbnRtZW50IC0gQXBwb2ludG1lbnQgdG8gYmUgcmVzY2hlZHVsZWRcclxuICAqIEBwYXJhbSB7Ym9vbGVhbn0gaXNWYWxpZGF0aW9uUmVxdWlyZWQgLSBJZiB0cnVlLCB2YWxpZGF0aW9uIGlzIHJlcXVpcmVkXHJcbiAgKiBAcmV0dXJuIHt2b2lkfVxyXG4gICovXHJcbiAgY2FuY2VsKGFwcG9pbnRtZW50OiBBcHBvaW50bWVudE1vZGVsLCBpc1ZhbGlkYXRpb25SZXF1aXJlZDogYm9vbGVhbikge1xyXG4gICAgaWYgKGFwcG9pbnRtZW50LnZpc2l0U3RhdHVzID09ICdWaXNpdCBJbiBQcm9ncmVzcycgJiYgaXNWYWxpZGF0aW9uUmVxdWlyZWQpIHtcclxuICAgICAgdGhpcy50b2FzdHIuZXJyb3IodGhpcy50cmFuc2xhdGVTZXJ2aWNlLmluc3RhbnQoXCJWaXNpdCBpcyBpbiBwcm9ncmVzcywgaXQgY2FuJ3QgYmUgY2FuY2VsbGVkLlwiKSwgdGhpcy50cmFuc2xhdGVTZXJ2aWNlLmluc3RhbnQoJ0NhbmNlbGluZyBmYWlsZWQhJykpO1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcbiAgICB0aGlzLmNvcmVTZXJ2aWNlLm9wZW5Db25maXJtQ2FuY2VsQXBwb2ludG1lbnRNb2RhbChhcHBvaW50bWVudCkuc3Vic2NyaWJlKChyZXM6IGJvb2xlYW4pID0+IHtcclxuICAgICAgaWYgKHJlcykge1xyXG4gICAgICAgIHRoaXMudG9hc3RyLnN1Y2Nlc3ModGhpcy50cmFuc2xhdGVTZXJ2aWNlLmluc3RhbnQoJ1RoZSBBcHBvaW50bWVudCBoYXMgYmVlbiBzdWNjZXNzZnVsbHkgY2FuY2VsZWQuJyksdGhpcy50cmFuc2xhdGVTZXJ2aWNlLmluc3RhbnQoJ0NhbmNlbGluZyBzdWNjZXNzZnVsJykpO1xyXG4gICAgICAgIHRoaXMuZ2V0QXBwb2ludG1lbnRzKCk7XHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgKiBHZXQgdXNlciB1dWlkIGZyb20gbG9jYWxzdG9yYWdlIHVzZXJcclxuICAqIEByZXR1cm4ge3N0cmluZ30gLSBVc2VyIHV1aWRcclxuICAqL1xyXG4gIGdldCB1c2VySWQoKTogc3RyaW5nIHtcclxuICAgIHJldHVybiBnZXRDYWNoZURhdGEodHJ1ZSwgZG9jdG9yRGV0YWlscy5VU0VSKS51dWlkO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgKiBBcHBseSBmaWx0ZXIgb24gYSBkYXRhc291cmNlXHJcbiAgKiBAcGFyYW0ge0V2ZW50fSBldmVudCAtIElucHV0J3MgY2hhbmdlIGV2ZW50XHJcbiAgKiBAcmV0dXJuIHt2b2lkfVxyXG4gICovXHJcbiAgYXBwbHlGaWx0ZXIoZXZlbnQ6IEV2ZW50KTogdm9pZCB7XHJcbiAgICB0aGlzLnNlYXJjaFRlcm0gPSAoZXZlbnQudGFyZ2V0IGFzIEhUTUxJbnB1dEVsZW1lbnQpLnZhbHVlLnRyaW0oKTtcclxuICAgIHRoaXMuaXNGaWx0ZXJBcHBsaWVkID0gdGhpcy5zZWFyY2hUZXJtLmxlbmd0aCA+IDA7XHJcbiAgICB0aGlzLmFwcGx5RmlsdGVycygpO1xyXG4gIH1cclxuXHJcbiAgLy8gQ2FsbCB0aGlzIG9uY2UgYWZ0ZXIgbG9hZGluZyBhcHBvaW50bWVudHNcclxuICBzdG9yZU9yaWdpbmFsRGF0YShvcmlnaW5hbERhdGE/OiBhbnlbXSkge1xyXG4gICAgdGhpcy5vcmlnaW5hbERhdGEgPSBvcmlnaW5hbERhdGE/IFsuLi5vcmlnaW5hbERhdGFdOiBbLi4udGhpcy5kYXRhU291cmNlXTsgLy8gQmFja3VwIGZ1bGwgZGF0YVxyXG4gICAgdGhpcy5hcHBseUZpbHRlcnMoKTsgLy8gQXBwbHkgYW55IGV4aXN0aW5nIGZpbHRlcnNcclxuICB9XHJcbiAgLyoqXHJcbiAgKiBDbGVhciBmaWx0ZXIgZnJvbSBjdXJyZW50IHBhZ2UgZGF0YVxyXG4gICogQHJldHVybiB7dm9pZH1cclxuICAqL1xyXG4gIGNsZWFyRmlsdGVyKCk6IHZvaWQge1xyXG4gICAgdGhpcy5zZWFyY2hUZXJtID0gJyc7XHJcbiAgICB0aGlzLmN1cnJlbnREYXRlRmlsdGVyID0gbnVsbDtcclxuICAgIHRoaXMuaXNGaWx0ZXJBcHBsaWVkID0gZmFsc2U7XHJcbiAgICB0aGlzLmlzRmlsdGVyQWN0aXZlID0gZmFsc2U7XHJcbiAgICB0aGlzLmZpbHRlcmVkVG90YWxDb3VudCA9IDA7XHJcbiAgICB0aGlzLnBhZ2luYXRpb25EaXNhYmxlZCA9IGZhbHNlO1xyXG4gICAgXHJcbiAgICBpZiAodGhpcy5zZWFyY2hFbGVtZW50Py5uYXRpdmVFbGVtZW50KSB7XHJcbiAgICAgIHRoaXMuc2VhcmNoRWxlbWVudC5uYXRpdmVFbGVtZW50LnZhbHVlID0gXCJcIjtcclxuICAgIH1cclxuICAgIFxyXG4gICAgdGhpcy5maWx0ZXJlZERhdGVBbmRSYW5nZUZvcm0ucmVzZXQoe1xyXG4gICAgICBkYXRlOiBudWxsLFxyXG4gICAgICBzdGFydERhdGU6IG51bGwsXHJcbiAgICAgIGVuZERhdGU6IG51bGxcclxuICAgIH0pO1xyXG4gICAgXHJcbiAgICB0aGlzLm1vZGUgPSAnZGF0ZSc7XHJcbiAgICB0aGlzLnJlc3RvcmVDdXJyZW50UGFnZURhdGEoKTtcclxuICAgIHRoaXMudXBkYXRlUGFnaW5hdG9yTGVuZ3RoKCk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBDaGVja3MgaWYgdGhlIGZpZWxkIGlzIGluIHBhdGllbnQgcmVnaXN0cmF0aW9uIGZpZWxkc1xyXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBmaWVsZE5hbWUgLSBUaGUgZmllbGQgbmFtZVxyXG4gICAqIEByZXR1cm4ge2Jvb2xlYW59IC0gVHJ1ZSBpZiBwcmVzZW50LCBlbHNlIGZhbHNlXHJcbiAgICovXHJcbiAgY2hlY2tQYXRpZW50UmVnRmllbGQoZmllbGROYW1lOiBzdHJpbmcpOiBib29sZWFuIHtcclxuICAgIHJldHVybiB0aGlzLnBhdGllbnRSZWdGaWVsZHMuaW5kZXhPZihmaWVsZE5hbWUpICE9PSAtMTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICogUmV0dXJucyB0aGUgV2hhdHNBcHAgbGluayBmb3IgYSBnaXZlbiB0ZWxlcGhvbmUgbnVtYmVyXHJcbiAgKiBAcGFyYW0ge3N0cmluZ30gdGVsZXBob25lTnVtYmVyIC0gVGhlIHRlbGVwaG9uZSBudW1iZXIgdG8gZ2VuZXJhdGUgdGhlIGxpbmsgZm9yXHJcbiAgKiBAcmV0dXJuIHtzdHJpbmd9IC0gVGhlIFdoYXRzQXBwIGxpbmtcclxuICAqL1xyXG4gIGdldFdoYXRzQXBwTGluayh0ZWxlcGhvbmVOdW1iZXI6IHN0cmluZyk6IHN0cmluZyB7XHJcbiAgICByZXR1cm4gdGhpcy52aXNpdFNlcnZpY2UuZ2V0V2hhdHNhcHBMaW5rKHRlbGVwaG9uZU51bWJlcik7XHJcbiAgfVxyXG4gIFxyXG4gIC8qKlxyXG4gICAqIFJldHJpZXZlcyB0aGUgdGVsZXBob25lIG51bWJlciBmcm9tIHRoZSBwZXJzb24ncyBhdHRyaWJ1dGVzXHJcbiAgICogQHBhcmFtIHtBcHBvaW50bWVudE1vZGVsWyd2aXNpdCddWydwZXJzb24nXX0gcGVyc29uIC0gVGhlIHBlcnNvbiBvYmplY3QgY29udGFpbmluZyBhdHRyaWJ1dGVzXHJcbiAgICogQHJldHVybiB7c3RyaW5nIHwgdW5kZWZpbmVkfSAtIFRoZSBwZXJzb24ncyB0ZWxlcGhvbmUgbnVtYmVyIG9yIHVuZGVmaW5lZCBpZiBub3QgZm91bmRcclxuICAgKi9cclxuICBnZXRUZWxlcGhvbmVOdW1iZXIocGVyc29uOiBBcHBvaW50bWVudE1vZGVsWyd2aXNpdCddWydwZXJzb24nXSkge1xyXG4gICAgcmV0dXJuIHBlcnNvbj8ucGVyc29uX2F0dHJpYnV0ZS5maW5kKCh2OiB7IHBlcnNvbl9hdHRyaWJ1dGVfdHlwZV9pZDogbnVtYmVyOyB9KSA9PiB2LnBlcnNvbl9hdHRyaWJ1dGVfdHlwZV9pZCA9PSBUYWJsZUdyaWRDb21wb25lbnQuVEVMRVBIT05FX0FUVFJJQlVURV9JRCk/LnZhbHVlO1xyXG4gIH1cclxuXHJcblxyXG4gIC8qKlxyXG4gICAqIENsb3NlcyB0aGUgbWVudSBpZiBpdCdzIG9wZW5cclxuICAgKi9cclxuICBjbG9zZU1lbnUoKSB7XHJcbiAgICBpZiAodGhpcy5tZW51VHJpZ2dlcikge1xyXG4gICAgICB0aGlzLm1lbnVUcmlnZ2VyLmNsb3NlTWVudSgpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcblxyXG4gIC8qKlxyXG4gICAqIFNldHMgdGhlIG1vZGUgZm9yIHRoZSBjb21wb25lbnQgKGVpdGhlciAnZGF0ZScgb3IgJ3JhbmdlJylcclxuICAgKiBAcGFyYW0geydkYXRlJyB8ICdyYW5nZSd9IG1vZGUgLSBUaGUgbW9kZSB0byBzZXRcclxuICAgKi9cclxuICBzZXRNb2RlKG1vZGU6ICdkYXRlJyB8ICdyYW5nZScpIHtcclxuICAgIHRoaXMubW9kZSA9IG1vZGU7XHJcbiAgfVxyXG5cclxuXHJcbiAgLyoqXHJcbiAgICogRm9ybWF0cyBhIGRhdGUgaW50byAnWVlZWS1NTS1ERCcgZm9ybWF0XHJcbiAgICogQHBhcmFtIHthbnl9IGRhdGUgLSBUaGUgZGF0ZSB0byBmb3JtYXRcclxuICAgKiBAcmV0dXJuIHtzdHJpbmd9IC0gVGhlIGZvcm1hdHRlZCBkYXRlXHJcbiAgICovXHJcbiAgZm9ybWF0RGF0ZShkYXRlOiBhbnkpOiBzdHJpbmcge1xyXG4gICAgY29uc3QgbG9jYWxEYXRlID0gbmV3IERhdGUoZGF0ZSk7XHJcbiAgICBjb25zdCB5ZWFyID0gbG9jYWxEYXRlLmdldEZ1bGxZZWFyKCk7XHJcbiAgICBjb25zdCBtb250aCA9IFN0cmluZyhsb2NhbERhdGUuZ2V0TW9udGgoKSArIDEpLnBhZFN0YXJ0KDIsICcwJyk7XHJcbiAgICBjb25zdCBkYXkgPSBTdHJpbmcobG9jYWxEYXRlLmdldERhdGUoKSkucGFkU3RhcnQoMiwgJzAnKTtcclxuICAgIHJldHVybiBgJHt5ZWFyfS0ke21vbnRofS0ke2RheX1gO1xyXG4gIH1cclxuXHJcblxyXG4gIC8qKlxyXG4gICAqIENvbnZlcnRzIGEgcmVsYXRpdmUgdGltZSBzdHJpbmcgKGUuZy4sIFwiMiBob3Vyc1wiLCBcIjEgZGF5XCIpIHRvIGEgZGF0ZSBzdHJpbmdcclxuICAgKiBAcGFyYW0ge3N0cmluZ30gcmVsYXRpdmVUaW1lIC0gVGhlIHJlbGF0aXZlIHRpbWUgc3RyaW5nXHJcbiAgICogQHJldHVybiB7c3RyaW5nfSAtIFRoZSByZXN1bHRpbmcgZGF0ZSBpbiAnWVlZWS1NTS1ERCcgZm9ybWF0XHJcbiAgICogQHRocm93cyB7RXJyb3J9IC0gVGhyb3dzIGVycm9yIGZvciBpbnZhbGlkIHRpbWUgdW5pdHNcclxuICAgKi9cclxuICBjb252ZXJ0VG9EYXRlKHJlbGF0aXZlVGltZTogc3RyaW5nKTogc3RyaW5nIHtcclxuICAgIGNvbnN0IG5vdyA9IG5ldyBEYXRlKCk7XHJcbiAgICBjb25zdCBbdmFsdWUsIHVuaXRdID0gcmVsYXRpdmVUaW1lLnNwbGl0KCcgJyk7XHJcbiAgICBjb25zdCBhbW91bnQgPSBwYXJzZUludCh2YWx1ZSwgMTApOyAgICBcclxuICAgIFxyXG4gICAgaWYgKFsnaG91cicsICdob3VycyddLmluY2x1ZGVzKHVuaXQudG9Mb3dlckNhc2UoKSkpIG5vdy5zZXRIb3Vycyhub3cuZ2V0SG91cnMoKSAtIGFtb3VudCk7XHJcbiAgICBlbHNlIGlmIChbJ21pbnV0ZScsICdtaW51dGVzJ10uaW5jbHVkZXModW5pdC50b0xvd2VyQ2FzZSgpKSkgbm93LnNldE1pbnV0ZXMobm93LmdldE1pbnV0ZXMoKSAtIGFtb3VudCk7XHJcbiAgICBlbHNlIGlmIChbJ2RheScsICdkYXlzJ10uaW5jbHVkZXModW5pdC50b0xvd2VyQ2FzZSgpKSkgbm93LnNldERhdGUobm93LmdldERhdGUoKSAtIGFtb3VudCk7XHJcbiAgICBlbHNlIHRocm93IG5ldyBFcnJvcignSW52YWxpZCB0aW1lIHVuaXQuIE9ubHkgXCJob3Vyc1wiLCBcIm1pbnV0ZXNcIiwgb3IgXCJkYXlzXCIgYXJlIHN1cHBvcnRlZC4nKTtcclxuXHJcbiAgICByZXR1cm4gbm93LnRvSVNPU3RyaW5nKCkuc3BsaXQoJ1QnKVswXTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIENvbnZlcnRzIGEgZm9sbG93LXVwIGRhdGUgc3RyaW5nIHRvIElTTyBmb3JtYXRcclxuICAgKiBAcGFyYW0ge3N0cmluZ30gZm9sbG93VXAgLSBUaGUgZm9sbG93LXVwIGRhdGUgc3RyaW5nXHJcbiAgICogQHJldHVybiB7c3RyaW5nfSAtIFRoZSBmb2xsb3ctdXAgZGF0ZSBpbiBJU08gc3RyaW5nIGZvcm1hdFxyXG4gICAqL1xyXG4gIGNvbnZlcnRUb0lTTyhmb2xsb3dVcDogc3RyaW5nKTogc3RyaW5nIHtcclxuICAgIGNvbnN0IGRhdGUgPSBuZXcgRGF0ZShmb2xsb3dVcCk7XHJcbiAgICBkYXRlLnNldERhdGUoZGF0ZS5nZXREYXRlKCkpO1xyXG4gICAgcmV0dXJuIGRhdGUudG9JU09TdHJpbmcoKTtcclxuICB9XHJcbiAgXHJcbiAgLyoqXHJcbiAgICogQXBwbGllcyBkYXRlIG9yIHJhbmdlIGZpbHRlciB0byB0aGUgZGF0YSBzb3VyY2UgYmFzZWQgb24gc2VsZWN0ZWQgZGF0ZShzKVxyXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBkYXRlRmllbGQgLSBUaGUgZmllbGQgbmFtZSBmb3IgdGhlIGRhdGUgdG8gZmlsdGVyXHJcbiAgICovXHJcbiAgYXBwbHlEYXRlT3JSYW5nZUZpbHRlcihkYXRlRmllbGQ6IHN0cmluZykge1xyXG4gICAgY29uc3Qgc2VsZWN0ZWREYXRlID0gdGhpcy5maWx0ZXJlZERhdGVBbmRSYW5nZUZvcm0uZ2V0KCdkYXRlJyk/LnZhbHVlO1xyXG4gICAgY29uc3Qgc3RhcnREYXRlID0gdGhpcy5maWx0ZXJlZERhdGVBbmRSYW5nZUZvcm0uZ2V0KCdzdGFydERhdGUnKT8udmFsdWU7XHJcbiAgICBjb25zdCBlbmREYXRlID0gdGhpcy5maWx0ZXJlZERhdGVBbmRSYW5nZUZvcm0uZ2V0KCdlbmREYXRlJyk/LnZhbHVlO1xyXG5cclxuICAgIGlmIChzZWxlY3RlZERhdGUpIHtcclxuICAgICAgY29uc3QgZm9ybWF0dGVkRGF0ZSA9IHRoaXMuZm9ybWF0RGF0ZShzZWxlY3RlZERhdGUpO1xyXG4gICAgICB0aGlzLmRhdGVGaWx0ZXIgPSB0aGlzLmZvcm1hdERhdGUoc2VsZWN0ZWREYXRlKTtcclxuICAgICAgdGhpcy5jdXJyZW50RGF0ZUZpbHRlciA9IHtcclxuICAgICAgICBkYXRlRmllbGQsXHJcbiAgICAgICAgZmlsdGVyVmFsdWU6IGZvcm1hdHRlZERhdGUsXHJcbiAgICAgICAgaXNSYW5nZTogZmFsc2VcclxuICAgICAgfTtcclxuICAgIH0gZWxzZSBpZiAoc3RhcnREYXRlICYmIGVuZERhdGUpIHtcclxuICAgICAgY29uc3QgZm9ybWF0dGVkU3RhcnREYXRlID0gdGhpcy5mb3JtYXREYXRlKHN0YXJ0RGF0ZSk7XHJcbiAgICAgIGNvbnN0IGZvcm1hdHRlZEVuZERhdGUgPSB0aGlzLmZvcm1hdERhdGUoZW5kRGF0ZSk7XHJcbiAgICAgIHRoaXMuZGF0ZUZpbHRlciA9IGAke3RoaXMuZm9ybWF0RGF0ZShzdGFydERhdGUpfToke3RoaXMuZm9ybWF0RGF0ZShlbmREYXRlKX1gO1xyXG4gICAgICB0aGlzLmN1cnJlbnREYXRlRmlsdGVyID0ge1xyXG4gICAgICAgIGRhdGVGaWVsZCxcclxuICAgICAgICBzdGFydERhdGU6IGZvcm1hdHRlZFN0YXJ0RGF0ZSxcclxuICAgICAgICBlbmREYXRlOiBmb3JtYXR0ZWRFbmREYXRlLFxyXG4gICAgICAgIGlzUmFuZ2U6IHRydWVcclxuICAgICAgfTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHRoaXMuZGF0ZUZpbHRlciA9ICcnO1xyXG4gICAgICB0aGlzLmN1cnJlbnREYXRlRmlsdGVyID0gbnVsbDtcclxuICAgIH1cclxuICAgIFxyXG4gICAgdGhpcy5kYXRlRmllbGQgPSBkYXRlRmllbGQ7XHJcbiAgICB0aGlzLmFwcGx5RmlsdGVycygpO1xyXG4gICAgdGhpcy5jbG9zZU1lbnUoKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFJlc2V0cyB0aGUgZGF0ZSBmaWx0ZXIgZm9ybSBhbmQgY2xlYXJzIHRoZSBkYXRhIHNvdXJjZSBmaWx0ZXJcclxuICAgKiBAcGFyYW0ge2Jvb2xlYW59IGZsYWcgLSBJZiB0cnVlLCBkb2Vzbid0IGNsb3NlIHRoZSBtZW51XHJcbiAgICovXHJcbiAgcmVzZXREYXRlKGZsYWc6IGJvb2xlYW4gPSBmYWxzZSkge1xyXG4gICAgdGhpcy5maWx0ZXJlZERhdGVBbmRSYW5nZUZvcm0ucmVzZXQoKTtcclxuICAgIHRoaXMuY3VycmVudERhdGVGaWx0ZXIgPSBudWxsO1xyXG4gICAgdGhpcy5hcHBseUZpbHRlcnMoKTtcclxuICAgIGlmICghZmxhZykge1xyXG4gICAgICB0aGlzLmNsb3NlTWVudSgpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcblxyXG4gIC8qKlxyXG4gICAqIFJldHJpZXZlcyBhIHNwZWNpZmljIGF0dHJpYnV0ZSBkYXRhIGZyb20gdGhlIHBlcnNvbidzIGF0dHJpYnV0ZXNcclxuICAgKiBAcGFyYW0ge2FueX0gZGF0YSAtIFRoZSBkYXRhIG9iamVjdCBjb250YWluaW5nIHBlcnNvbiBhdHRyaWJ1dGVzXHJcbiAgICogQHBhcmFtIHtzdHJpbmd9IGF0dHJpYnV0ZU5hbWUgLSBUaGUgbmFtZSBvZiB0aGUgYXR0cmlidXRlIHRvIHJldHJpZXZlXHJcbiAgICogQHJldHVybiB7T2JqZWN0IHwgbnVsbH0gLSBUaGUgYXR0cmlidXRlIG5hbWUgYW5kIHZhbHVlLCBvciBudWxsIGlmIG5vdCBmb3VuZFxyXG4gICAqL1xyXG4gIGdldEF0dHJpYnV0ZURhdGEoZGF0YTogYW55LCBhdHRyaWJ1dGVOYW1lOiBzdHJpbmcpOiB7IG5hbWU6IHN0cmluZzsgdmFsdWU6IHN0cmluZyB9IHwgbnVsbCB7XHJcbiAgICBpZiAoQXJyYXkuaXNBcnJheShkYXRhLnBlcnNvbl9hdHRyaWJ1dGUpKSB7XHJcbiAgICAgIGNvbnN0IGF0dHJpYnV0ZSA9IGRhdGEucGVyc29uX2F0dHJpYnV0ZS5maW5kKFxyXG4gICAgICAgIChhdHRyOiBhbnkpID0+IGF0dHIucGVyc29uX2F0dHJpYnV0ZV90eXBlPy5uYW1lID09PSBhdHRyaWJ1dGVOYW1lXHJcbiAgICAgICk7XHJcbiAgICAgIGlmIChhdHRyaWJ1dGUpIHtcclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgbmFtZTogYXR0cmlidXRlLnBlcnNvbl9hdHRyaWJ1dGVfdHlwZS5uYW1lLFxyXG4gICAgICAgICAgdmFsdWU6IGF0dHJpYnV0ZS52YWx1ZVxyXG4gICAgICAgIH07XHJcbiAgICAgIH1cclxuICAgIH1cclxuICAgIHJldHVybiBudWxsO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgKiBHZXQgYm9va2VkIGFwcG9pbnRtZW50cyBmb3IgYSBsb2dnZWQtaW4gZG9jdG9yIGluIGEgY3VycmVudCB5ZWFyXHJcbiAgKiBAcmV0dXJuIHt2b2lkfVxyXG4gICovXHJcbiAgZ2V0QXBwb2ludG1lbnRzKCk6IHZvaWQge1xyXG4gICAgdGhpcy5uZ3hMb2FkZXIuc3RhcnRMb2FkZXIoJ3RhYmxlLWxvYWRlci0nICsgdGhpcy5wbHVnaW5Db25maWdPYnMucGx1Z2luQ29uZmlnT2JzRmxhZyk7IC8vIFN0YXJ0IHNlY3Rpb24gbG9hZGVyXHJcbiAgICB0aGlzLmFwcG9pbnRtZW50cyA9IFtdO1xyXG4gICAgbGV0IGZyb21EYXRlID0gbW9tZW50KCkuc3RhcnRPZigneWVhcicpLmZvcm1hdCgnREQvTU0vWVlZWScpO1xyXG4gICAgbGV0IHRvRGF0ZSA9IG1vbWVudCgpLmVuZE9mKCd5ZWFyJykuZm9ybWF0KCdERC9NTS9ZWVlZJyk7XHJcbiAgICBsZXQgcGVuZGluZ192aXNpdHMgPSB0aGlzLnBsdWdpbkNvbmZpZ09icy5maWx0ZXI/Lmhhc093blByb3BlcnR5KFwicGVuZGluZ192aXNpdHNcIikgID8gdGhpcy5wbHVnaW5Db25maWdPYnMuZmlsdGVyPy5wZW5kaW5nX3Zpc2l0cyA6IG51bGw7XHJcbiAgICBpZih0aGlzLnBsdWdpbkNvbmZpZ09icz8uZmlsdGVyKXtcclxuICAgICAgZnJvbURhdGUgPSB0aGlzLnBsdWdpbkNvbmZpZ09icz8uZmlsdGVyPy5mcm9tRGF0ZVxyXG4gICAgICB0b0RhdGUgPSB0aGlzLnBsdWdpbkNvbmZpZ09icz8uZmlsdGVyPy50b0RhdGVcclxuICAgIH1cclxuICAgIHRoaXMuYXBwb2ludG1lbnRTZXJ2aWNlLmdldFVzZXJTbG90cyhnZXRDYWNoZURhdGEodHJ1ZSwgZG9jdG9yRGV0YWlscy5VU0VSKS51dWlkLCBmcm9tRGF0ZSwgdG9EYXRlLCB0aGlzLmlzTUNDVXNlciA/IHRoaXMuc3BlY2lhbGl6YXRpb24gOiBudWxsLCBwZW5kaW5nX3Zpc2l0cylcclxuICAgICAgLnN1YnNjcmliZSh7XHJcbiAgICAgICAgbmV4dDogKHJlczogQXBpUmVzcG9uc2VNb2RlbCkgPT4ge1xyXG4gICAgICAgICAgdGhpcy50b3RhbFJlY29yZHMgPSByZXMuZGF0YT8ubGVuZ3RoIHx8IDA7XHJcbiAgICAgICAgICB0aGlzLmVtaXRWaXNpdHNDb3VudCh0aGlzLnRvdGFsUmVjb3Jkcyk7XHJcbiAgICAgICAgICBsZXQgYXBwb2ludG1lbnRzZGF0YSA9IHJlcy5kYXRhO1xyXG4gICAgICAgICAgYXBwb2ludG1lbnRzZGF0YS5mb3JFYWNoKChhcHBvaW50bWVudDogQXBwb2ludG1lbnRNb2RlbCkgPT4ge1xyXG4gICAgICAgICAgICBpZiAoYXBwb2ludG1lbnQuc3RhdHVzID09ICdib29rZWQnICYmIChhcHBvaW50bWVudC52aXNpdFN0YXR1cyA9PSAnQXdhaXRpbmcgQ29uc3VsdCd8fGFwcG9pbnRtZW50LnZpc2l0U3RhdHVzID09ICdWaXNpdCBJbiBQcm9ncmVzcycpKSB7XHJcbiAgICAgICAgICAgICAgaWYgKGFwcG9pbnRtZW50LnZpc2l0KSB7XHJcbiAgICAgICAgICAgICAgICBhcHBvaW50bWVudC5jaGVpZl9jb21wbGFpbnQgPSB0aGlzLmdldENoZWlmQ29tcGxhaW50KGFwcG9pbnRtZW50LnZpc2l0KTtcclxuICAgICAgICAgICAgICAgIGFwcG9pbnRtZW50LnN0YXJ0c19pbiA9IGNoZWNrSWZEYXRlT2xkVGhhbk9uZURheShhcHBvaW50bWVudC5zbG90SnNEYXRlKTtcclxuICAgICAgICAgICAgICAgIGFwcG9pbnRtZW50LnRlbGVwaG9uZSA9IHRoaXMuZ2V0VGVsZXBob25lTnVtYmVyKGFwcG9pbnRtZW50Py52aXNpdD8ucGVyc29uKTtcclxuICAgICAgICAgICAgICAgIGFwcG9pbnRtZW50LlRNSF9wYXRpZW50X2lkID0gdGhpcy5nZXRBdHRyaWJ1dGVEYXRhKGFwcG9pbnRtZW50LnZpc2l0LCBcIlRNSCBDYXNlIE51bWJlclwiKT8udmFsdWU7XHJcbiAgICAgICAgICAgICAgICBhcHBvaW50bWVudC51dWlkID0gYXBwb2ludG1lbnQudmlzaXRVdWlkO1xyXG4gICAgICAgICAgICAgICAgYXBwb2ludG1lbnQubG9jYXRpb24gPSBhcHBvaW50bWVudD8udmlzaXQ/LmxvY2F0aW9uPy5uYW1lO1xyXG4gICAgICAgICAgICAgICAgYXBwb2ludG1lbnQuYWdlID0gYXBwb2ludG1lbnQ/LnBhdGllbnRBZ2UgKyAnICcgKyB0aGlzLnRyYW5zbGF0ZVNlcnZpY2UuaW5zdGFudCgneScpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5hcHBvaW50bWVudHMucHVzaChhcHBvaW50bWVudCk7XHJcbiAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICB9KTtcclxuICAgICAgICAgIHRoaXMuZGF0YVNvdXJjZSA9IFsuLi50aGlzLmFwcG9pbnRtZW50c107XHJcbiAgICAgICAgICB0aGlzLnN0b3JlT3JpZ2luYWxEYXRhKCk7XHJcbiAgICAgICAgfSxcclxuICAgICAgICBjb21wbGV0ZTogKCkgPT4ge1xyXG4gICAgICAgICAgdGhpcy5uZ3hMb2FkZXIuc3RvcExvYWRlcigndGFibGUtbG9hZGVyLScgKyB0aGlzLnBsdWdpbkNvbmZpZ09icy5wbHVnaW5Db25maWdPYnNGbGFnKTsgLy8gU3RvcCBzZWN0aW9uIGxvYWRlclxyXG4gICAgICAgICAgLy8gU2Nyb2xsIHRvIHRvcCBhZnRlciBkYXRhIGlzIGxvYWRlZFxyXG4gICAgICAgICAgdGhpcy5zY3JvbGxUb1RvcCgpO1xyXG4gICAgICAgIH1cclxuICAgIH0pO1xyXG4gIH1cclxuICBcclxuICAvKipcclxuICAqIEdldCBkb2N0b3Igc3BlY2lhbGl0eVxyXG4gICogQHBhcmFtIHtQcm92aWRlckF0dHJpYnV0ZU1vZGVsW119IGF0dHIgLSBBcnJheSBvZiBwcm92aWRlciBhdHRyaWJ1dGVzXHJcbiAgKiBAcmV0dXJuIHtzdHJpbmd9IC0gRG9jdG9yIHNwZWNpYWxpdHlcclxuICAqL1xyXG4gIGdldFNwZWNpYWxpemF0aW9uKGF0dHI6IFByb3ZpZGVyQXR0cmlidXRlTW9kZWxbXSk6IHN0cmluZyB7XHJcbiAgICBsZXQgc3BlY2lhbGl6YXRpb24gPSAnJztcclxuICAgIGF0dHIuZm9yRWFjaCgoYTogUHJvdmlkZXJBdHRyaWJ1dGVNb2RlbCkgPT4ge1xyXG4gICAgICBpZiAoYS5hdHRyaWJ1dGVUeXBlLnV1aWQgPT0gVGFibGVHcmlkQ29tcG9uZW50LlNQRUNJQUxJWkFUSU9OX1VVSUQgJiYgIWEudm9pZGVkKSB7XHJcbiAgICAgICAgc3BlY2lhbGl6YXRpb24gPSBhLnZhbHVlO1xyXG4gICAgICB9XHJcbiAgICB9KTtcclxuICAgIHJldHVybiBzcGVjaWFsaXphdGlvbjtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICogUmV0dXJucyB0aGUgYWdlIGluIHllYXJzIGZyb20gdGhlIGJpcnRoZGF0ZVxyXG4gICogQHBhcmFtIHtzdHJpbmd9IGJpcnRoZGF0ZSAtIERhdGUgaW4gc3RyaW5nIGZvcm1hdFxyXG4gICogQHJldHVybiB7bnVtYmVyfSAtIEFnZVxyXG4gICovXHJcbiAgY2FsY3VsYXRlQWdlKGJpcnRoZGF0ZTogc3RyaW5nKTogbnVtYmVyIHtcclxuICAgIHJldHVybiBtb21lbnQoKS5kaWZmKGJpcnRoZGF0ZSwgJ3llYXJzJyk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAqIFJldHVybnMgdGhlIGNyZWF0ZWQgdGltZSBpbiB3b3JkcyBmcm9tIHRoZSBkYXRlXHJcbiAgKiBAcGFyYW0ge3N0cmluZ30gZGF0YSAtIERhdGVcclxuICAqIEByZXR1cm4ge3N0cmluZ30gLSBDcmVhdGVkIHRpbWUgaW4gd29yZHMgZnJvbSB0aGUgZGF0ZVxyXG4gICovXHJcbiAgZ2V0Q3JlYXRlZEF0KGRhdGE6IHN0cmluZyk6IHN0cmluZyB7XHJcbiAgICBsZXQgaG91cnMgPSBtb21lbnQoKS5kaWZmKG1vbWVudChkYXRhKSwgJ2hvdXJzJyk7XHJcbiAgICBsZXQgbWludXRlcyA9IG1vbWVudCgpLmRpZmYobW9tZW50KGRhdGEpLCAnbWludXRlcycpO1xyXG4gICAgaWYgKGhvdXJzID4gMjQpIHtcclxuICAgICAgcmV0dXJuIG1vbWVudChkYXRhKS5mb3JtYXQoJ0REIE1NTSwgWVlZWScpO1xyXG4gICAgfTtcclxuICAgIGlmIChob3VycyA8IDEpIHtcclxuICAgICAgcmV0dXJuIGAke21pbnV0ZXN9ICR7dGhpcy50cmFuc2xhdGVTZXJ2aWNlLmluc3RhbnQoXCJNaW51dGVzIGFnb1wiKX1gO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIGAke2hvdXJzfSAke3RoaXMudHJhbnNsYXRlU2VydmljZS5pbnN0YW50KFwiSG91cnMgYWdvXCIpfWA7XHJcbiAgfVxyXG4gIFxyXG4gIC8qKlxyXG4gICogR2V0IGVuY291bnRlciBkYXRldGltZSBmb3IgYSBnaXZlbiBlbmNvdW50ZXIgdHlwZVxyXG4gICogQHBhcmFtIHtDdXN0b21WaXNpdE1vZGVsfSB2aXNpdCAtIFZpc2l0XHJcbiAgKiBAcGFyYW0ge3N0cmluZ30gZW5jb3VudGVyTmFtZSAtIEVuY291bnRlciB0eXBlXHJcbiAgKiBAcmV0dXJuIHtzdHJpbmd9IC0gRW5jb3VudGVyIGRhdGV0aW1lXHJcbiAgKi9cclxuICBnZXRFbmNvdW50ZXJDcmVhdGVkKHZpc2l0OiBDdXN0b21WaXNpdE1vZGVsLCBlbmNvdW50ZXJOYW1lOiBzdHJpbmcpOiBzdHJpbmcge1xyXG4gICAgbGV0IGNyZWF0ZWRfYXQgPSAnJztcclxuICAgIGNvbnN0IGVuY291bnRlcnMgPSB2aXNpdC5lbmNvdW50ZXJzO1xyXG4gICAgZW5jb3VudGVycy5mb3JFYWNoKChlbmNvdW50ZXI6IEN1c3RvbUVuY291bnRlck1vZGVsKSA9PiB7XHJcbiAgICAgIGNvbnN0IGRpc3BsYXkgPSBlbmNvdW50ZXIudHlwZT8ubmFtZTtcclxuICAgICAgaWYgKGRpc3BsYXkubWF0Y2goZW5jb3VudGVyTmFtZSkgIT09IG51bGwpIHtcclxuICAgICAgICBjcmVhdGVkX2F0ID0gdGhpcy5nZXRDcmVhdGVkQXQoZW5jb3VudGVyLmVuY291bnRlcl9kYXRldGltZS5yZXBsYWNlKCdaJywnKzA1MzAnKSk7XHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG4gICAgcmV0dXJuIGNyZWF0ZWRfYXQ7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBEZXRlcm1pbmVzIGlmIHRoZSBlbmNvdW50ZXIgaXMgYSBmb2xsb3ctdXAgb3IgbmV3IHZpc2l0XHJcbiAgICogQHBhcmFtIHthbnl9IGVuYyAtIEVuY291bnRlciBkYXRhXHJcbiAgICogQHJldHVybiB7c3RyaW5nfSAtICdGT0xMT1dfVVAnIG9yICdORVcnXHJcbiAgICovXHJcbiAgZ2V0RGVtYXJjYXRpb24oZW5jOiBhbnkpOiBzdHJpbmcge1xyXG4gICAgbGV0IGlzRm9sbG93VXAgPSBmYWxzZTtcclxuICAgIGNvbnN0IGFkbEludGwgPSBlbmM/LmZpbmQ/LihlID0+IGU/LnR5cGU/Lm5hbWUgPT09IHZpc2l0VHlwZXMuQURVTFRJTklUSUFMKTtcclxuICAgIGlmIChBcnJheS5pc0FycmF5KGFkbEludGw/Lm9icykpIHtcclxuICAgICAgYWRsSW50bD8ub2JzLmZvckVhY2gob2JzID0+IHtcclxuICAgICAgICBpZiAoIWlzRm9sbG93VXApXHJcbiAgICAgICAgICBpc0ZvbGxvd1VwID0gb2JzPy52YWx1ZV90ZXh0Py50b0xvd2VyQ2FzZT8uKCk/LmluY2x1ZGVzPy4oXCJmb2xsb3cgdXBcIik7XHJcbiAgICAgIH0pO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIGlzRm9sbG93VXAgPyB2aXNpdFR5cGVzLkZPTExPV19VUCA6IHZpc2l0VHlwZXMuTkVXO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgKiBHZXQgYXdhaXRpbmcgdmlzaXRzIGZvciBhIGdpdmVuIHBhZ2UgbnVtYmVyXHJcbiAgKiBAcGFyYW0ge251bWJlcn0gcGFnZSAtIFBhZ2UgbnVtYmVyXHJcbiAgKiBAcmV0dXJuIHt2b2lkfVxyXG4gICovXHJcbiAgZ2V0QXdhaXRpbmdWaXNpdHMocGFnZTogbnVtYmVyID0gMSk6IHZvaWQge1xyXG4gICAgdGhpcy5sb2FkVmlzaXREYXRhKHBhZ2UsIHRoaXMuYXdhaXRpbmdWaXNpdHMsIHRoaXMudmlzaXRTZXJ2aWNlLmdldEF3YWl0aW5nVmlzaXRzKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICogR2V0IGlucHJvZ3Jlc3MgdmlzaXRzIGZvciBhIGdpdmVuIHBhZ2UgbnVtYmVyXHJcbiAgKiBAcGFyYW0ge251bWJlcn0gcGFnZSAtIFBhZ2UgbnVtYmVyXHJcbiAgKiBAcmV0dXJuIHt2b2lkfVxyXG4gICovXHJcbiAgZ2V0SW5Qcm9ncmVzc1Zpc2l0cyhwYWdlOiBudW1iZXIgPSAxKTogdm9pZCB7XHJcbiAgICB0aGlzLmxvYWRWaXNpdERhdGEoXHJcbiAgICAgIHBhZ2UsIFxyXG4gICAgICB0aGlzLmluUHJvZ3Jlc3NWaXNpdHMsIFxyXG4gICAgICB0aGlzLnZpc2l0U2VydmljZS5nZXRJblByb2dyZXNzVmlzaXRzLFxyXG4gICAgICB2aXNpdFR5cGVzLlZJU0lUX05PVEUsXHJcbiAgICAgIHRoaXMuc29ydEluUHJvZ3Jlc3NWaXNpdHMuYmluZCh0aGlzKVxyXG4gICAgKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICogR2V0IHByaW9yaXR5IHZpc2l0cyBmb3IgYSBnaXZlbiBwYWdlIG51bWJlclxyXG4gICogQHBhcmFtIHtudW1iZXJ9IHBhZ2UgLSBQYWdlIG51bWJlclxyXG4gICogQHJldHVybiB7dm9pZH1cclxuICAqL1xyXG4gIGdldFByaW9yaXR5VmlzaXRzKHBhZ2U6IG51bWJlciA9IDEpOiB2b2lkIHtcclxuICAgIHRoaXMubG9hZFZpc2l0RGF0YShwYWdlLCB0aGlzLnByaW9yaXR5VmlzaXRzLCB0aGlzLnZpc2l0U2VydmljZS5nZXRQcmlvcml0eVZpc2l0cywgdmlzaXRUeXBlcy5GTEFHR0VEKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEdldCBjb21wbGV0ZWQgdmlzaXRzIGNvdW50XHJcbiAgICogQHJldHVybiB7dm9pZH1cclxuICAgKi9cclxuICBnZXRDb21wbGV0ZWRWaXNpdHMocGFnZTogbnVtYmVyID0gMSk6IHZvaWQge1xyXG4gICAgdGhpcy5sb2FkVmlzaXREYXRhKHBhZ2UsIHRoaXMuY29tcGxldGVkVmlzaXRzLCB0aGlzLnZpc2l0U2VydmljZS5nZXRFbmRlZFZpc2l0cywgdmlzaXRUeXBlcy5DT01QTEVURURfVklTSVQpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgKiBHZXQgZm9sbG93LXVwIHZpc2l0cyBmb3IgYSBsb2dnZWQtaW4gZG9jdG9yXHJcbiAgKiBAcmV0dXJuIHt2b2lkfVxyXG4gICovXHJcbiAgZ2V0Rm9sbG93VXBWaXNpdChwYWdlOiBudW1iZXIgPSAxKTogdm9pZCB7XHJcbiAgICB0aGlzLm5neExvYWRlci5zdGFydExvYWRlcigndGFibGUtbG9hZGVyLScgKyB0aGlzLnBsdWdpbkNvbmZpZ09icy5wbHVnaW5Db25maWdPYnNGbGFnKTtcclxuICAgIFxyXG4gICAgaWYgKHBhZ2UgPT09IDEpIHtcclxuICAgICAgdGhpcy5mb2xsb3dVcFZpc2l0cy5sZW5ndGggPSAwO1xyXG4gICAgICB0aGlzLnJlY29yZHNGZXRjaGVkID0gMDtcclxuICAgIH1cclxuICAgIFxyXG4gICAgdGhpcy52aXNpdFNlcnZpY2UuZ2V0Rm9sbG93VXBWaXNpdHModGhpcy5zcGVjaWFsaXphdGlvbiwgcGFnZSkuc3Vic2NyaWJlKHtcclxuICAgICAgbmV4dDogKHJlczogQXBpUmVzcG9uc2VNb2RlbCkgPT4ge1xyXG4gICAgICAgIGlmIChyZXMuc3VjY2Vzcykge1xyXG4gICAgICAgICAgdGhpcy50b3RhbFJlY29yZHMgPSByZXMudG90YWxDb3VudDtcclxuICAgICAgICAgIHRoaXMucmVjb3Jkc0ZldGNoZWQgKz0gdGhpcy5wYWdlU2l6ZTtcclxuICAgICAgICAgIHRoaXMuZW1pdFZpc2l0c0NvdW50KHRoaXMudG90YWxSZWNvcmRzKTtcclxuICAgICAgICAgIFxyXG4gICAgICAgICAgY29uc3QgcHJvY2Vzc2VkVmlzaXRzID0gcmVzLmRhdGFcclxuICAgICAgICAgICAgLm1hcCh2aXNpdCA9PiB0aGlzLnByb2Nlc3NGb2xsb3dVcFZpc2l0RGF0YSh2aXNpdCkpXHJcbiAgICAgICAgICAgIC5maWx0ZXIodmlzaXQgPT4gdmlzaXQgIT09IG51bGwpO1xyXG4gICAgICAgICAgXHJcbiAgICAgICAgICB0aGlzLmZvbGxvd1VwVmlzaXRzLnB1c2goLi4ucHJvY2Vzc2VkVmlzaXRzKTtcclxuICAgICAgICAgIHRoaXMudXBkYXRlRGF0YVNvdXJjZXModGhpcy5mb2xsb3dVcFZpc2l0cywgcHJvY2Vzc2VkVmlzaXRzKTtcclxuICAgICAgICB9XHJcbiAgICAgIH0sXHJcbiAgICAgIGNvbXBsZXRlOiAoKSA9PiB7XHJcbiAgICAgICAgdGhpcy5uZ3hMb2FkZXIuc3RvcExvYWRlcigndGFibGUtbG9hZGVyLScgKyB0aGlzLnBsdWdpbkNvbmZpZ09icy5wbHVnaW5Db25maWdPYnNGbGFnKTtcclxuICAgICAgICB0aGlzLnNjcm9sbFRvVG9wKCk7XHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgKiBHZXQgZW5jb3VudGVyIGRhdGV0aW1lIGZvciBhIGdpdmVuIGVuY291bnRlciB0eXBlXHJcbiAgKiBAcGFyYW0ge0N1c3RvbVZpc2l0TW9kZWx9IHZpc2l0IC0gVmlzaXRcclxuICAqIEBwYXJhbSB7c3RyaW5nfSBlbmNvdW50ZXJOYW1lIC0gRW5jb3VudGVyIHR5cGVcclxuICAqIEByZXR1cm4ge3N0cmluZ30gLSBFbmNvdW50ZXIgZGF0ZXRpbWVcclxuICAqL1xyXG4gIGdldEVuY291bnRlck9icyhlbmNvdW50ZXJzOiBDdXN0b21FbmNvdW50ZXJNb2RlbFtdLCBlbmNvdW50ZXJOYW1lOiBzdHJpbmcsIGNvbmNlcHRJZDogbnVtYmVyKSB7XHJcbiAgICBsZXQgb2JzOiBDdXN0b21PYnNNb2RlbDtcclxuICAgIGVuY291bnRlcnMuZm9yRWFjaCgoZW5jb3VudGVyOiBDdXN0b21FbmNvdW50ZXJNb2RlbCkgPT4ge1xyXG4gICAgICBpZiAoZW5jb3VudGVyLnR5cGU/Lm5hbWUgPT09IGVuY291bnRlck5hbWUpIHtcclxuICAgICAgICBvYnMgPSBlbmNvdW50ZXI/Lm9icz8uZmluZCgobzogQ3VzdG9tT2JzTW9kZWwpID0+IG8uY29uY2VwdF9pZCA9PSBjb25jZXB0SWQpO1xyXG4gICAgICB9XHJcbiAgICB9KTtcclxuICAgIHJldHVybiBvYnM7XHJcbiAgfVxyXG4gIFxyXG4gIC8qKlxyXG4gICAqIFJlbmRlcnMgSFRNTCBjb250ZW50IGZvciBhIGNvbHVtbiwgc2FuaXRpemVkIGZvciBzZWN1cml0eVxyXG4gICAqIEBwYXJhbSB7YW55fSBjb2x1bW4gLSBDb2x1bW4gZGVmaW5pdGlvblxyXG4gICAqIEBwYXJhbSB7YW55fSBlbGVtZW50IC0gRGF0YSBlbGVtZW50IHRvIHJlbmRlclxyXG4gICAqIEByZXR1cm4ge1NhZmVIdG1sIHwgc3RyaW5nfSAtIEZvcm1hdHRlZCBIVE1MIG9yIGVsZW1lbnQgdmFsdWVcclxuICAgKi9cclxuICByZW5kZXJIdG1sQ29udGVudChjb2x1bW46IGFueSwgZWxlbWVudDogYW55KTogaW1wb3J0KCdAYW5ndWxhci9wbGF0Zm9ybS1icm93c2VyJykuU2FmZUh0bWwgfCBzdHJpbmcge1xyXG4gICAgcmV0dXJuIGNvbHVtbi5mb3JtYXRIdG1sICYmIHR5cGVvZiBjb2x1bW4uZm9ybWF0SHRtbCA9PT0gJ2Z1bmN0aW9uJyA/IHRoaXMuc2FuaXRpemVyLmJ5cGFzc1NlY3VyaXR5VHJ1c3RIdG1sKGNvbHVtbi5mb3JtYXRIdG1sKGVsZW1lbnQpKSA6IGVsZW1lbnRbY29sdW1uLmtleV07XHJcbiAgfVxyXG4gICAgXHJcbiAgLyoqXHJcbiAgICogUmV0dXJucyBhIHN0cmluZyBvZiBDU1MgY2xhc3NlcyBmb3IgdGhlIGNvbHVtblxyXG4gICAqIEBwYXJhbSB7YW55fSBjb2x1bW4gLSBDb2x1bW4gZGVmaW5pdGlvblxyXG4gICAqIEByZXR1cm4ge3N0cmluZ30gLSBTcGFjZS1zZXBhcmF0ZWQgY2xhc3MgbmFtZXNcclxuICAgKi9cclxuICBnZXRDbGFzc2VzKGNvbHVtbjogYW55LCBlbGVtZW50OiBhbnkpOiBzdHJpbmcge1xyXG4gICAgbGV0IGNsYXNzTGlzdCA9IFtdO1xyXG5cclxuICAgIC8vIElmIGNvbHVtbiBoYXMgYSBzdGF0aWMgY2xhc3NMaXN0IChhcnJheSBvciBzdHJpbmcpLCBhZGQgaXRcclxuICAgIGlmIChjb2x1bW4uY2xhc3NMaXN0KSB7XHJcbiAgICAgIGNsYXNzTGlzdCA9IHR5cGVvZiBjb2x1bW4uY2xhc3NMaXN0ID09PSBcImZ1bmN0aW9uXCIgPyBjb2x1bW4uY2xhc3NMaXN0KGVsZW1lbnQpIDogY29sdW1uLmNsYXNzTGlzdDtcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gY2xhc3NMaXN0LmpvaW4oXCIgXCIpO1xyXG4gIH1cclxuXHJcblxyXG5cclxuICAvKipcclxuICAgKiBGb3JtYXRzIHRoZSBmb2xsb3ctdXAgZGF0ZSBieSBjbGVhbmluZyB1cCB0aW1lIGRldGFpbHNcclxuICAgKiBAcGFyYW0ge3N0cmluZ30gdmFsdWUgLSBGb2xsb3ctdXAgZGF0ZSBzdHJpbmdcclxuICAgKiBAcmV0dXJuIHtzdHJpbmd9IC0gRm9ybWF0dGVkIGRhdGVcclxuICAgKi9cclxuICBwcm9jZXNzRm9sbG93VXBEYXRlKHZhbHVlOiBzdHJpbmcpOiBzdHJpbmcge1xyXG4gICAgcmV0dXJuIHZhbHVlID8gdmFsdWUuc3BsaXQoJywnKS5sZW5ndGggPiAxID8gYCR7dmFsdWUuc3BsaXQoJywnKVswXX0gJHt2YWx1ZS5zcGxpdCgnLCcpWzFdLnJlcGxhY2UoXCJUaW1lOlwiLCBcIlwiKX1gIDogdmFsdWUgOiAnJztcclxuICB9O1xyXG5cclxuICAvKipcclxuICAgKiBFeGVjdXRlcyB0aGUgYWN0aW9uIGJhc2VkIG9uIGl0cyBsYWJlbCAoUmVzY2hlZHVsZSBvciBDYW5jZWwpXHJcbiAgICogQHBhcmFtIHthbnl9IGFjdGlvbiAtIEFjdGlvbiBvYmplY3RcclxuICAgKiBAcGFyYW0ge2FueX0gZWxlbWVudCAtIEVsZW1lbnQgdG8gcGVyZm9ybSB0aGUgYWN0aW9uIG9uXHJcbiAgICovXHJcbiAgaGFuZGxlQWN0aW9uKGFjdGlvbjogYW55LCBlbGVtZW50OiBhbnkpIHtcclxuICAgIGNvbnN0IGlzVmFsaWRhdGlvblJlcXVpcmVkID0gYWN0aW9uLnZhbGlkYXRpb25SZXF1aXJlZCAhPT0gdW5kZWZpbmVkID8gYWN0aW9uLnZhbGlkYXRpb25SZXF1aXJlZCA6IHRydWU7XHJcbiAgICBcclxuICAgIGlmIChhY3Rpb24ubGFiZWwgPT09ICdSZXNjaGVkdWxlJykge1xyXG4gICAgICB0aGlzLnJlc2NoZWR1bGUoZWxlbWVudCwgaXNWYWxpZGF0aW9uUmVxdWlyZWQpO1xyXG4gICAgfSBlbHNlIGlmIChhY3Rpb24ubGFiZWwgPT09ICdDYW5jZWwnKSB7XHJcbiAgICAgIHRoaXMuY2FuY2VsKGVsZW1lbnQsIGlzVmFsaWRhdGlvblJlcXVpcmVkKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIE9wZW5zIGEgV2hhdHNBcHAgY2hhdCB3aXRoIHRoZSBnaXZlbiBwaG9uZSBudW1iZXJcclxuICAgKiBAcGFyYW0ge01vdXNlRXZlbnR9IGV2ZW50IC0gVGhlIGNsaWNrIGV2ZW50IHRvIHByZXZlbnQgcm93IG5hdmlnYXRpb25cclxuICAgKiBAcGFyYW0ge3N0cmluZ30gdGVsZXBob25lIC0gUGhvbmUgbnVtYmVyIGZvciBXaGF0c0FwcFxyXG4gICAqL1xyXG4gIG9wZW5XaGF0c0FwcChldmVudDogTW91c2VFdmVudCwgdGVsZXBob25lOiBzdHJpbmcpOiB2b2lkIHtcclxuICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpOyAvLyBQcmV2ZW50IHJvdyBuYXZpZ2F0aW9uXHJcbiAgICBjb25zdCB3aGF0c2FwcExpbmsgPSBgaHR0cHM6Ly93YS5tZS8ke3RlbGVwaG9uZX1gO1xyXG4gICAgd2luZG93Lm9wZW4od2hhdHNhcHBMaW5rLCAnX2JsYW5rJywgJ25vb3BlbmVyLG5vcmVmZXJyZXInKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEVtaXRzIHRoZSB2aXNpdHMgY291bnQgZGF0YSB3aXRoIHRoZSBnaXZlbiB0YWJsZSB0YWcgbmFtZSBhbmQgY291bnRcclxuICAgKiBAcGFyYW0ge251bWJlcn0gdmlzaXRzQ291bnQgLSBUaGUgdG90YWwgdmlzaXRzIGNvdW50IGZvciB0aGUgc3BlY2lmaWMgdGFibGVcclxuICAgKi9cclxuICBlbWl0VmlzaXRzQ291bnQodmlzaXRzQ291bnQ6IG51bWJlcik6IHZvaWQge1xyXG4gICAgY29uc3QgdmlzaXRzQ291bnREYXRhID0ge1xyXG4gICAgICB0YWJsZVRhZ05hbWU6IHRoaXMucGx1Z2luQ29uZmlnT2JzLnBsdWdpbkNvbmZpZ09ic0ZsYWcsXHJcbiAgICAgIHZpc2l0c0NvdW50OiB2aXNpdHNDb3VudFxyXG4gICAgfTtcclxuICAgIHRoaXMudmlzaXRzQ291bnREYXRlLmVtaXQodmlzaXRzQ291bnREYXRhKTtcclxuICB9XHJcblxyXG5cclxuICBwdWJsaWMgZ2V0RGF0YShldmVudD86UGFnZUV2ZW50KXtcclxuICAgIHRoaXMucGFnZUluZGV4ID0gZXZlbnQucGFnZUluZGV4O1xyXG4gICAgdGhpcy5wYWdlU2l6ZSA9IGV2ZW50LnBhZ2VTaXplO1xyXG4gICAgdGhpcy5jdXJyZW50UGFnZSA9IGV2ZW50LnBhZ2VJbmRleDtcclxuICAgIHRoaXMuaXRlbXNQZXJQYWdlID0gZXZlbnQucGFnZVNpemU7XHJcbiAgICBcclxuICAgIC8vIElmIGZpbHRlcnMgYXJlIGFjdGl2ZSwgZGlzYWJsZSBwYWdpbmF0aW9uIGFuZCBkb24ndCBtYWtlIEFQSSBjYWxsc1xyXG4gICAgaWYgKHRoaXMuaXNGaWx0ZXJBY3RpdmUgfHwgdGhpcy5wYWdpbmF0aW9uRGlzYWJsZWQpIHtcclxuICAgICAgdGhpcy5zY3JvbGxUb1RvcCgpO1xyXG4gICAgICByZXR1cm4gZXZlbnQ7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIGNvbnN0IHJlcXVpcmVkUmVjb3JkcyA9ICh0aGlzLnBhZ2VJbmRleCArIDEpICogdGhpcy5wYWdlU2l6ZTtcclxuICAgIFxyXG4gICAgLy8gQ2hlY2sgaWYgd2UgbmVlZCB0byBmZXRjaCBtb3JlIGRhdGEgZnJvbSBBUElcclxuICAgIGlmIChyZXF1aXJlZFJlY29yZHMgPiB0aGlzLnJlY29yZHNGZXRjaGVkKSB7XHJcbiAgICAgIHRoaXMuZmV0Y2hNb3JlRGF0YSgpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgLy8gRGF0YSBpcyBhbHJlYWR5IHByZXNlbnQsIGhhbmRsZSBjbGllbnQtc2lkZSBwYWdpbmF0aW9uXHJcbiAgICAgIHRoaXMuaGFuZGxlQ2xpZW50U2lkZVBhZ2luYXRpb24oKTtcclxuICAgIH1cclxuICAgIFxyXG4gICAgLy8gU2Nyb2xsIHRvIHRvcCB3aGVuIHBhZ2luYXRpb24gY2hhbmdlc1xyXG4gICAgdGhpcy5zY3JvbGxUb1RvcCgpO1xyXG4gICAgXHJcbiAgICByZXR1cm4gZXZlbnQ7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgZ2V0QXBwb2ludG1lbnREYXRhKGV2ZW50OiBQYWdlRXZlbnQpOiBQYWdlRXZlbnQge1xyXG4gICAgdGhpcy5wYWdlSW5kZXggPSBldmVudC5wYWdlSW5kZXg7XHJcbiAgICB0aGlzLnBhZ2VTaXplID0gZXZlbnQucGFnZVNpemU7XHJcbiAgICB0aGlzLmN1cnJlbnRQYWdlID0gZXZlbnQucGFnZUluZGV4O1xyXG4gICAgdGhpcy5pdGVtc1BlclBhZ2UgPSBldmVudC5wYWdlU2l6ZTtcclxuICAgIC8vIEhhbmRsZSBjbGllbnQtc2lkZSBwYWdpbmF0aW9uIGZvciBhbHJlYWR5IGxvYWRlZCBkYXRhXHJcbiAgICB0aGlzLmhhbmRsZUNsaWVudFNpZGVQYWdpbmF0aW9uKCk7XHJcbiAgICByZXR1cm4gZXZlbnQ7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBGZXRjaCBtb3JlIGRhdGEgZnJvbSBBUEkgYmFzZWQgb24gY3VycmVudCBwbHVnaW4gdHlwZVxyXG4gICAqL1xyXG4gIHByaXZhdGUgZmV0Y2hNb3JlRGF0YSgpOiB2b2lkIHtcclxuICAgIGNvbnN0IG5leHRQYWdlID0gKHRoaXMucmVjb3Jkc0ZldGNoZWQgKyB0aGlzLnBhZ2VTaXplKSAvIHRoaXMucGFnZVNpemU7XHJcbiAgICBcclxuICAgIHN3aXRjaCh0aGlzLnBsdWdpbkNvbmZpZ09icz8ucGx1Z2luQ29uZmlnT2JzRmxhZykge1xyXG4gICAgICBjYXNlIFwiQXdhaXRpbmdcIjpcclxuICAgICAgICB0aGlzLmdldEF3YWl0aW5nVmlzaXRzKG5leHRQYWdlKTtcclxuICAgICAgICBicmVhaztcclxuICAgICAgY2FzZSBcIlByaW9yaXR5XCI6XHJcbiAgICAgICAgdGhpcy5nZXRQcmlvcml0eVZpc2l0cyhuZXh0UGFnZSk7XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICAgIGNhc2UgXCJJblByb2dyZXNzXCI6XHJcbiAgICAgICAgdGhpcy5nZXRJblByb2dyZXNzVmlzaXRzKG5leHRQYWdlKTtcclxuICAgICAgICBicmVhaztcclxuICAgICAgY2FzZSBcIkNvbXBsZXRlZFwiOlxyXG4gICAgICAgIHRoaXMuZ2V0Q29tcGxldGVkVmlzaXRzKG5leHRQYWdlKTtcclxuICAgICAgICBicmVhaztcclxuICAgICAgY2FzZSBcIkZvbGxvd1VwXCI6XHJcbiAgICAgICAgdGhpcy5nZXRGb2xsb3dVcFZpc2l0KG5leHRQYWdlKTtcclxuICAgICAgICBicmVhaztcclxuICAgIH1cclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEhhbmRsZSBjbGllbnQtc2lkZSBwYWdpbmF0aW9uIGZvciBhbHJlYWR5IGxvYWRlZCBkYXRhXHJcbiAgICovXHJcbiAgcHJpdmF0ZSBoYW5kbGVDbGllbnRTaWRlUGFnaW5hdGlvbigpIHtcclxuICAgIC8vIEVuc3VyZSBmaWx0ZXJlZERhdGFTb3VyY2UgaGFzIGFsbCB0aGUgZGF0YSBmcm9tIG9yaWdpbmFsRGF0YVxyXG4gICAgaWYgKHRoaXMuZmlsdGVyZWREYXRhU291cmNlLmxlbmd0aCA8IHRoaXMub3JpZ2luYWxEYXRhLmxlbmd0aCkge1xyXG4gICAgICB0aGlzLmZpbHRlcmVkRGF0YVNvdXJjZSA9IFsuLi50aGlzLm9yaWdpbmFsRGF0YV07XHJcbiAgICB9XHJcbiAgICBcclxuICAgIC8vIEFwcGx5IHBhZ2luYXRpb24gdG8gdGhlIGZpbHRlcmVkIGRhdGFcclxuICAgIHRoaXMuYXBwbHlQYWdpbmF0aW9uKCk7IFxyXG4gICAgXHJcbiAgICAvLyBVcGRhdGUgcGFnaW5hdG9yIGxlbmd0aCB0byBzaG93IGNvcnJlY3QgdG90YWxcclxuICAgIGlmICh0aGlzLnRlbXBQYWdpbmF0b3IpIHtcclxuICAgICAgdGhpcy50ZW1wUGFnaW5hdG9yLmxlbmd0aCA9IHRoaXMudG90YWxSZWNvcmRzO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogSGFuZGxlIHNvcnRpbmcgZm9yIGN1cnJlbnQgcGFnZSBkYXRhIG9ubHlcclxuICAgKiBAcGFyYW0ge3N0cmluZ30gY29sdW1uIC0gQ29sdW1uIHRvIHNvcnQgYnlcclxuICAgKiBAcGFyYW0ge3N0cmluZ30gZGlyZWN0aW9uIC0gU29ydCBkaXJlY3Rpb24gKCdhc2MnIG9yICdkZXNjJylcclxuICAgKi9cclxuICBoYW5kbGVTb3J0KGNvbHVtbjogc3RyaW5nLCBkaXJlY3Rpb246IHN0cmluZyk6IHZvaWQge1xyXG4gICAgaWYgKCFjb2x1bW4gfHwgIWRpcmVjdGlvbikgcmV0dXJuO1xyXG4gICAgXHJcbiAgICAvLyBTb3J0IG9ubHkgdGhlIGN1cnJlbnQgcGFnZSBkYXRhXHJcbiAgICB0aGlzLnBhZ2luYXRlZERhdGFTb3VyY2Uuc29ydCgoYTogYW55LCBiOiBhbnkpID0+IHtcclxuICAgICAgbGV0IGFWYWx1ZSA9IHRoaXMuZ2V0U29ydFZhbHVlKGEsIGNvbHVtbik7XHJcbiAgICAgIGxldCBiVmFsdWUgPSB0aGlzLmdldFNvcnRWYWx1ZShiLCBjb2x1bW4pO1xyXG4gICAgICBcclxuICAgICAgLy8gQ29udmVydCB0byBzdHJpbmcgZm9yIGNvbXBhcmlzb24gaWYgbmVlZGVkXHJcbiAgICAgIGlmICh0eXBlb2YgYVZhbHVlID09PSAnc3RyaW5nJykgYVZhbHVlID0gYVZhbHVlLnRvTG93ZXJDYXNlKCk7XHJcbiAgICAgIGlmICh0eXBlb2YgYlZhbHVlID09PSAnc3RyaW5nJykgYlZhbHVlID0gYlZhbHVlLnRvTG93ZXJDYXNlKCk7XHJcbiAgICAgIFxyXG4gICAgICByZXR1cm4gZGlyZWN0aW9uID09PSAnYXNjJyBcclxuICAgICAgICA/IChhVmFsdWUgPCBiVmFsdWUgPyAtMSA6IGFWYWx1ZSA+IGJWYWx1ZSA/IDEgOiAwKVxyXG4gICAgICAgIDogKGFWYWx1ZSA+IGJWYWx1ZSA/IC0xIDogYVZhbHVlIDwgYlZhbHVlID8gMSA6IDApO1xyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBHZXQgc29ydCB2YWx1ZSBmb3IgYW4gaXRlbSBiYXNlZCBvbiBjb2x1bW5cclxuICAgKi9cclxuICBwcml2YXRlIGdldFNvcnRWYWx1ZShpdGVtOiBhbnksIGNvbHVtbjogc3RyaW5nKTogYW55IHtcclxuICAgIGlmIChjb2x1bW4gPT09ICdwYXRpZW50X25hbWUnKSB7XHJcbiAgICAgIHJldHVybiAoaXRlbS5wYXRpZW50X25hbWU/LmdpdmVuX25hbWUgfHwgJycpICsgJyAnICsgKGl0ZW0ucGF0aWVudF9uYW1lPy5mYW1pbHlfbmFtZSB8fCAnJyk7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gaXRlbVtjb2x1bW5dO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogUHJvY2VzcyB2aXNpdCBkYXRhIHdpdGggY29tbW9uIGZpZWxkc1xyXG4gICAqL1xyXG4gIHByaXZhdGUgcHJvY2Vzc1Zpc2l0RGF0YSh2aXNpdDogYW55LCBlbmNvdW50ZXJUeXBlPzogc3RyaW5nKTogYW55IHtcclxuICAgIHZpc2l0LmNoZWlmX2NvbXBsYWludCA9IHRoaXMuZ2V0Q2hlaWZDb21wbGFpbnQodmlzaXQpO1xyXG4gICAgdmlzaXQudmlzaXRfY3JlYXRlZCA9IHZpc2l0Py5kYXRlX2NyZWF0ZWQgXHJcbiAgICAgID8gdGhpcy5nZXRDcmVhdGVkQXQodmlzaXQuZGF0ZV9jcmVhdGVkLnJlcGxhY2UoJ1onLCcrMDUzMCcpKSBcclxuICAgICAgOiB0aGlzLmdldEVuY291bnRlckNyZWF0ZWQodmlzaXQsIGVuY291bnRlclR5cGUgfHwgdmlzaXRUeXBlcy5BRFVMVElOSVRJQUwpO1xyXG4gICAgdmlzaXQucGVyc29uLmFnZSA9IHRoaXMuY2FsY3VsYXRlQWdlKHZpc2l0LnBlcnNvbi5iaXJ0aGRhdGUpO1xyXG4gICAgdmlzaXQubG9jYXRpb24gPSB2aXNpdD8ubG9jYXRpb24/Lm5hbWU7XHJcbiAgICB2aXNpdC5hZ2UgPSB2aXNpdD8ucGVyc29uPy5hZ2UgKyAnICcgKyB0aGlzLnRyYW5zbGF0ZVNlcnZpY2UuaW5zdGFudCgneScpO1xyXG4gICAgXHJcbiAgICAvLyBBZGQgc3BlY2lmaWMgZmllbGRzIGJhc2VkIG9uIHZpc2l0IHR5cGVcclxuICAgIGlmIChlbmNvdW50ZXJUeXBlID09PSB2aXNpdFR5cGVzLlZJU0lUX05PVEUpIHtcclxuICAgICAgdmlzaXQucHJlc2NyaXB0aW9uX3N0YXJ0ZWQgPSB0aGlzLmdldEVuY291bnRlckNyZWF0ZWQodmlzaXQsIHZpc2l0VHlwZXMuVklTSVRfTk9URSk7XHJcbiAgICB9XHJcbiAgICBpZiAoZW5jb3VudGVyVHlwZSA9PT0gdmlzaXRUeXBlcy5DT01QTEVURURfVklTSVQpIHtcclxuICAgICAgdmlzaXQuY29tcGxldGVkID0gdmlzaXQ/LmRhdGVfY3JlYXRlZCBcclxuICAgICAgICA/IHRoaXMuZ2V0Q3JlYXRlZEF0KHZpc2l0LmRhdGVfY3JlYXRlZC5yZXBsYWNlKCdaJywgJyswNTMwJykpIFxyXG4gICAgICAgIDogdGhpcy5nZXRFbmNvdW50ZXJDcmVhdGVkKHZpc2l0LCB2aXNpdFR5cGVzLlZJU0lUX0NPTVBMRVRFKTtcclxuICAgIH1cclxuICAgIGlmIChlbmNvdW50ZXJUeXBlID09PSB2aXNpdFR5cGVzLkZMQUdHRUQpIHtcclxuICAgICAgdmlzaXQudmlzaXRfY3JlYXRlZCA9IHZpc2l0Py5kYXRlX2NyZWF0ZWQgXHJcbiAgICAgICAgPyB0aGlzLmdldENyZWF0ZWRBdCh2aXNpdC5kYXRlX2NyZWF0ZWQucmVwbGFjZSgnWicsJyswNTMwJykpIFxyXG4gICAgICAgIDogdGhpcy5nZXRFbmNvdW50ZXJDcmVhdGVkKHZpc2l0LCB2aXNpdFR5cGVzLkZMQUdHRUQpO1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICAvLyBBZGQgY29tbW9uIGZpZWxkc1xyXG4gICAgdmlzaXQuVE1IX3BhdGllbnRfaWQgPSB0aGlzLmdldEF0dHJpYnV0ZURhdGEodmlzaXQsIFwiVE1IIENhc2UgTnVtYmVyXCIpPy52YWx1ZTtcclxuICAgIHZpc2l0LnBhdGllbnRfdHlwZSA9IHRoaXMuZ2V0RGVtYXJjYXRpb24odmlzaXQ/LmVuY291bnRlcnMpO1xyXG4gICAgXHJcbiAgICByZXR1cm4gdmlzaXQ7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBHZW5lcmljIGRhdGEgbG9hZGluZyBtZXRob2RcclxuICAgKi9cclxuICBwcml2YXRlIGxvYWRWaXNpdERhdGEoXHJcbiAgICBwYWdlOiBudW1iZXIsIFxyXG4gICAgdmlzaXRBcnJheTogYW55W10sIFxyXG4gICAgc2VydmljZU1ldGhvZDogKHNwZWNpYWxpemF0aW9uOiBzdHJpbmcsIHBhZ2U6IG51bWJlcikgPT4gYW55LFxyXG4gICAgZW5jb3VudGVyVHlwZT86IHN0cmluZyxcclxuICAgIGN1c3RvbVNvcnRpbmc/OiAodmlzaXRzOiBhbnlbXSkgPT4gYW55W11cclxuICApOiB2b2lkIHtcclxuICAgIHRoaXMubmd4TG9hZGVyLnN0YXJ0TG9hZGVyKCd0YWJsZS1sb2FkZXItJyArIHRoaXMucGx1Z2luQ29uZmlnT2JzLnBsdWdpbkNvbmZpZ09ic0ZsYWcpO1xyXG4gICAgXHJcbiAgICBpZiAocGFnZSA9PT0gMSkge1xyXG4gICAgICB2aXNpdEFycmF5Lmxlbmd0aCA9IDA7IC8vIENsZWFyIGFycmF5IGVmZmljaWVudGx5XHJcbiAgICAgIHRoaXMucmVjb3Jkc0ZldGNoZWQgPSAwO1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICBzZXJ2aWNlTWV0aG9kLmNhbGwodGhpcy52aXNpdFNlcnZpY2UsIHRoaXMuc3BlY2lhbGl6YXRpb24sIHBhZ2UpLnN1YnNjcmliZSh7XHJcbiAgICAgIG5leHQ6IChyZXM6IEFwaVJlc3BvbnNlTW9kZWwpID0+IHtcclxuICAgICAgICBpZiAocmVzLnN1Y2Nlc3MpIHtcclxuICAgICAgICAgIHRoaXMudG90YWxSZWNvcmRzID0gcmVzLnRvdGFsQ291bnQ7XHJcbiAgICAgICAgICB0aGlzLnJlY29yZHNGZXRjaGVkICs9IHRoaXMucGFnZVNpemU7XHJcbiAgICAgICAgICB0aGlzLmVtaXRWaXNpdHNDb3VudCh0aGlzLnRvdGFsUmVjb3Jkcyk7XHJcbiAgICAgICAgICBcclxuICAgICAgICAgIGNvbnN0IHByb2Nlc3NlZFZpc2l0cyA9IHJlcy5kYXRhLm1hcCh2aXNpdCA9PiB0aGlzLnByb2Nlc3NWaXNpdERhdGEodmlzaXQsIGVuY291bnRlclR5cGUpKTtcclxuICAgICAgICAgIFxyXG4gICAgICAgICAgLy8gQXBwbHkgY3VzdG9tIHNvcnRpbmcgaWYgcHJvdmlkZWRcclxuICAgICAgICAgIGNvbnN0IHNvcnRlZFZpc2l0cyA9IGN1c3RvbVNvcnRpbmcgPyBjdXN0b21Tb3J0aW5nKHByb2Nlc3NlZFZpc2l0cykgOiBwcm9jZXNzZWRWaXNpdHM7XHJcbiAgICAgICAgICBcclxuICAgICAgICAgIC8vIEFkZCB0byB2aXNpdCBhcnJheVxyXG4gICAgICAgICAgdmlzaXRBcnJheS5wdXNoKC4uLnNvcnRlZFZpc2l0cyk7XHJcbiAgICAgICAgICBcclxuICAgICAgICAgIC8vIFVwZGF0ZSBkYXRhIHNvdXJjZXNcclxuICAgICAgICAgIHRoaXMudXBkYXRlRGF0YVNvdXJjZXModmlzaXRBcnJheSwgc29ydGVkVmlzaXRzKTtcclxuICAgICAgICB9XHJcbiAgICAgIH0sXHJcbiAgICAgIGNvbXBsZXRlOiAoKSA9PiB7XHJcbiAgICAgICAgdGhpcy5uZ3hMb2FkZXIuc3RvcExvYWRlcigndGFibGUtbG9hZGVyLScgKyB0aGlzLnBsdWdpbkNvbmZpZ09icy5wbHVnaW5Db25maWdPYnNGbGFnKTtcclxuICAgICAgICB0aGlzLnNjcm9sbFRvVG9wKCk7XHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogVXBkYXRlIGFsbCBkYXRhIHNvdXJjZXMgd2l0aCBuZXcgZGF0YVxyXG4gICAqL1xyXG4gIHByaXZhdGUgdXBkYXRlRGF0YVNvdXJjZXModmlzaXRBcnJheTogYW55W10sIHNvcnRlZFZpc2l0cz86IGFueVtdKTogdm9pZCB7XHJcbiAgICB0aGlzLmRhdGFTb3VyY2UgPSBzb3J0ZWRWaXNpdHMgPyBbLi4uc29ydGVkVmlzaXRzXSA6IFsuLi52aXNpdEFycmF5XTtcclxuICAgIHRoaXMub3JpZ2luYWxEYXRhID0gWy4uLnZpc2l0QXJyYXldO1xyXG4gICAgdGhpcy5maWx0ZXJlZERhdGFTb3VyY2UgPSBbLi4udmlzaXRBcnJheV07XHJcbiAgICB0aGlzLmFwcGx5UGFnaW5hdGlvbigpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogQ3VzdG9tIHNvcnRpbmcgZm9yIGluLXByb2dyZXNzIHZpc2l0cyBieSBwcmVzY3JpcHRpb24gdGltZVxyXG4gICAqL1xyXG4gIHByaXZhdGUgc29ydEluUHJvZ3Jlc3NWaXNpdHModmlzaXRzOiBhbnlbXSk6IGFueVtdIHtcclxuICAgIHJldHVybiB2aXNpdHMuc29ydCgoYSwgYikgPT4ge1xyXG4gICAgICBjb25zdCBwYXJzZVRpbWUgPSAodmFsdWU6IHN0cmluZykgPT4ge1xyXG4gICAgICAgIGlmICh2YWx1ZS5pbmNsdWRlcyhcIm1pbnV0ZXMgYWdvXCIpKSB7XHJcbiAgICAgICAgICByZXR1cm4geyB0eXBlOiBcIm1pbnV0ZXNcIiwgdGltZTogcGFyc2VJbnQodmFsdWUpIH07XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICh2YWx1ZS5pbmNsdWRlcyhcIkhvdXJzIGFnb1wiKSkge1xyXG4gICAgICAgICAgcmV0dXJuIHsgdHlwZTogXCJob3Vyc1wiLCB0aW1lOiBwYXJzZUludCh2YWx1ZSkgKiA2MCB9O1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4geyB0eXBlOiBcImRhdGVcIiwgdGltZTogbW9tZW50KHZhbHVlLCBcIkREIE1NTSwgWVlZWVwiKS52YWx1ZU9mKCkgfTtcclxuICAgICAgfTtcclxuXHJcbiAgICAgIGNvbnN0IHZpc2l0QSA9IHBhcnNlVGltZShhLnByZXNjcmlwdGlvbl9zdGFydGVkKTtcclxuICAgICAgY29uc3QgdmlzaXRCID0gcGFyc2VUaW1lKGIucHJlc2NyaXB0aW9uX3N0YXJ0ZWQpO1xyXG4gICAgICBcclxuICAgICAgLy8gU29ydCBtaW51dGVzIGZpcnN0IChhc2NlbmRpbmcpXHJcbiAgICAgIGlmICh2aXNpdEEudHlwZSA9PT0gXCJtaW51dGVzXCIgJiYgdmlzaXRCLnR5cGUgPT09IFwibWludXRlc1wiKSB7XHJcbiAgICAgICAgcmV0dXJuIHZpc2l0QS50aW1lIC0gdmlzaXRCLnRpbWU7XHJcbiAgICAgIH1cclxuICAgICAgLy8gU29ydCBob3VycyBmaXJzdCAoYXNjZW5kaW5nKVxyXG4gICAgICBpZiAodmlzaXRBLnR5cGUgPT09IFwiaG91cnNcIiAmJiB2aXNpdEIudHlwZSA9PT0gXCJob3Vyc1wiKSB7XHJcbiAgICAgICAgcmV0dXJuIHZpc2l0QS50aW1lIC0gdmlzaXRCLnRpbWU7XHJcbiAgICAgIH1cclxuICAgICAgLy8gU29ydCBkYXRlcyAoZGVzY2VuZGluZylcclxuICAgICAgaWYgKHZpc2l0QS50eXBlID09PSBcImRhdGVcIiAmJiB2aXNpdEIudHlwZSA9PT0gXCJkYXRlXCIpIHtcclxuICAgICAgICByZXR1cm4gdmlzaXRCLnRpbWUgLSB2aXNpdEEudGltZTtcclxuICAgICAgfVxyXG4gICAgICAvLyBQcmlvcml0aXplIG1pbnV0ZXMgb3ZlciBob3VycywgYW5kIGhvdXJzIG92ZXIgZGF0ZXNcclxuICAgICAgaWYgKHZpc2l0QS50eXBlID09PSBcIm1pbnV0ZXNcIikgcmV0dXJuIC0xO1xyXG4gICAgICBpZiAodmlzaXRCLnR5cGUgPT09IFwibWludXRlc1wiKSByZXR1cm4gMTtcclxuICAgICAgaWYgKHZpc2l0QS50eXBlID09PSBcImhvdXJzXCIpIHJldHVybiAtMTtcclxuICAgICAgaWYgKHZpc2l0Qi50eXBlID09PSBcImhvdXJzXCIpIHJldHVybiAxO1xyXG5cclxuICAgICAgcmV0dXJuIDA7XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFByb2Nlc3MgZm9sbG93LXVwIHZpc2l0IGRhdGEgd2l0aCBzcGVjaWFsIGhhbmRsaW5nXHJcbiAgICovXHJcbiAgcHJpdmF0ZSBwcm9jZXNzRm9sbG93VXBWaXNpdERhdGEodmlzaXQ6IGFueSk6IGFueSB7XHJcbiAgICBpZiAoIXZpc2l0Py5lbmNvdW50ZXJzPy5sZW5ndGgpIHJldHVybiBudWxsO1xyXG4gICAgXHJcbiAgICB2aXNpdC5jaGVpZl9jb21wbGFpbnQgPSB0aGlzLmdldENoZWlmQ29tcGxhaW50KHZpc2l0KTtcclxuICAgIHZpc2l0LnZpc2l0X2NyZWF0ZWQgPSB2aXNpdD8uZGF0ZV9jcmVhdGVkIFxyXG4gICAgICA/IHRoaXMuZ2V0Q3JlYXRlZEF0KHZpc2l0LmRhdGVfY3JlYXRlZC5yZXBsYWNlKCdaJywgJyswNTMwJykpIFxyXG4gICAgICA6IHRoaXMuZ2V0RW5jb3VudGVyQ3JlYXRlZCh2aXNpdCwgdmlzaXRUeXBlcy5DT01QTEVURURfVklTSVQpO1xyXG4gICAgdmlzaXQucGVyc29uLmFnZSA9IHRoaXMuY2FsY3VsYXRlQWdlKHZpc2l0LnBlcnNvbi5iaXJ0aGRhdGUpO1xyXG4gICAgdmlzaXQuY29tcGxldGVkID0gdGhpcy5nZXRFbmNvdW50ZXJDcmVhdGVkKHZpc2l0LCB2aXNpdFR5cGVzLlZJU0lUX0NPTVBMRVRFKTtcclxuICAgIHZpc2l0LmZvbGxvd1VwID0gdGhpcy5wcm9jZXNzRm9sbG93VXBEYXRlKFxyXG4gICAgICB0aGlzLmdldEVuY291bnRlck9icyh2aXNpdC5lbmNvdW50ZXJzLCB2aXNpdFR5cGVzLlZJU0lUX05PVEUsIFRhYmxlR3JpZENvbXBvbmVudC5GT0xMT1dfVVBfQ09OQ0VQVF9JRCk/LnZhbHVlX3RleHRcclxuICAgICk7XHJcbiAgICB2aXNpdC5sb2NhdGlvbiA9IHZpc2l0Py5sb2NhdGlvbj8ubmFtZTtcclxuICAgIHZpc2l0LmFnZSA9IHZpc2l0Py5wZXJzb24/LmFnZSArICcgJyArIHRoaXMudHJhbnNsYXRlU2VydmljZS5pbnN0YW50KCd5Jyk7XHJcbiAgICBcclxuICAgIHJldHVybiB2aXNpdDtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFNjcm9sbCB0byB0b3Agb2YgdGhlIHRhYmxlIGNvbnRhaW5lclxyXG4gICAqL1xyXG4gIHByaXZhdGUgc2Nyb2xsVG9Ub3AoKSB7XHJcbiAgICAvLyBGaW5kIHRoZSB0YWJsZSBjb250YWluZXIgYW5kIHNjcm9sbCB0byB0b3AgdXNpbmcgdW5pcXVlIGNvbXBvbmVudCBJRFxyXG4gICAgY29uc3QgdGFibGVDb250YWluZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjdGFibGUtY29udGFpbmVyLScgKyB0aGlzLmNvbXBvbmVudElkKTtcclxuICAgIGlmICh0YWJsZUNvbnRhaW5lcikge1xyXG4gICAgICB0YWJsZUNvbnRhaW5lci5zY3JvbGxUb3AgPSAwO1xyXG4gICAgfVxyXG4gIH1cclxufVxyXG5cclxuIiwiPG1hdC1leHBhbnNpb24tcGFuZWwgW2V4cGFuZGVkXT1cInRydWVcIiBkYXRhLXRlc3QtaWQ9XCJtYXRFeHBBcHBvaW50bWVudFwiPlxyXG4gIDxtYXQtZXhwYW5zaW9uLXBhbmVsLWhlYWRlciBkYXRhLXRlc3QtaWQ9XCJtYXRFeHBIZWFkZXJBcHBvaW50bWVudFwiPlxyXG4gICAgPG1hdC1wYW5lbC10aXRsZSBkYXRhLXRlc3QtaWQ9XCJtYXRQYW5lbFRpdGxlQXBwb2ludG1lbnRcIj5cclxuICAgICAgPGRpdiBpZD1cInt7cGx1Z2luQ29uZmlnT2JzLmFuY2hvcklkfX1cIiBjbGFzcz1cImFuY2hvci1jb25cIiBkYXRhLXRlc3QtaWQ9XCJkaXZBbmNob3JBcHBvaW50bWVudFwiPjwvZGl2PlxyXG4gICAgICA8ZGl2IGNsYXNzPVwiaW50ZWwtYWNjb3JkaW9uLXRpdGxlXCIgZGF0YS10ZXN0LWlkPVwiZGl2QWNjb3JkaW9uVGl0bGVBcHBvaW50bWVudFwiPlxyXG4gICAgICAgIDxpbWcgc3JjPVwie3sgcGx1Z2luQ29uZmlnT2JzLnRhYmxlSGVhZGVySWNvbiB9fVwiIGFsdD1cIlwiIHdpZHRoPVwiNDRweFwiIGRhdGEtdGVzdC1pZD1cImltZ1RhYmxlSGVhZGVySWNvbkFwcG9pbnRtZW50XCI+XHJcbiAgICAgICAgPGg2IGNsYXNzPVwibWItMCBtbC0yXCIgW2F0dHIuZGF0YS10ZXN0LWlkXT1cInBsdWdpbkNvbmZpZ09icy50YWJsZUhlYWRlclwiPiBcclxuICAgICAgICAgIHt7IHBsdWdpbkNvbmZpZ09icy50YWJsZUhlYWRlciB8IHRyYW5zbGF0ZSB9fSAoe3sgZ2V0Q3VycmVudFRvdGFsQ291bnQoKSB9fSlcclxuICAgICAgICA8L2g2PlxyXG4gICAgICAgIDxtYXQtaWNvbiBcclxuICAgICAgICAgIGFyaWEtaGlkZGVuPVwiZmFsc2VcIiBcclxuICAgICAgICAgIGFyaWEtbGFiZWw9XCJoZWxwIGljb25cIiBcclxuICAgICAgICAgIG1hdFRvb2x0aXA9XCJ7eyAocGx1Z2luQ29uZmlnT2JzLnRvb2x0aXBMYWJlbCB8IHRyYW5zbGF0ZSkgfX1cIiBcclxuICAgICAgICAgIG1hdFRvb2x0aXBQb3NpdGlvbj1cInJpZ2h0XCIgXHJcbiAgICAgICAgICBkYXRhLXRlc3QtaWQ9XCJpY29IZWxwQXBwb2ludG1lbnRcIj5cclxuICAgICAgICAgIGhlbHBfb3V0bGluZVxyXG4gICAgICAgIDwvbWF0LWljb24+XHJcblxyXG4gICAgICAgIDwhLS0gRmlsdGVyIGJ1dHRvbiAtLT5cclxuICAgICAgICA8ZGl2IGNsYXNzPVwibWwtYXV0byBmaWx0ZXItc2VhcmNoLWNvbnRhaW5lclwiIGRhdGEtdGVzdC1pZD1cImRpdkZpbHRlckNvbnRhaW5lckFwcG9pbnRtZW50XCI+XHJcbiAgICAgICAgICA8YnV0dG9uIFxyXG4gICAgICAgICAgICAqbmdJZj1cInBsdWdpbkNvbmZpZ09icy5maWx0ZXJPYnMuZmlsdGVyRmxhZ1wiIFxyXG4gICAgICAgICAgICBjbGFzcz1cIm1hdC1zdHJva2VkLWJ1dHRvbiBmaWx0ZXItYnRuXCIgXHJcbiAgICAgICAgICAgIFttYXRNZW51VHJpZ2dlckZvcl09XCJmaWx0ZXJNZW51XCIgXHJcbiAgICAgICAgICAgIChjbGljayk9XCIkZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XCIgXHJcbiAgICAgICAgICAgIGRhdGEtdGVzdC1pZD1cImJ0bkZpbHRlckFwcG9pbnRtZW50XCI+XHJcbiAgICAgICAgICAgIDxpbWcgc3JjPVwie3twbHVnaW5Db25maWdPYnMuZmlsdGVyT2JzLmZpbHRlckljb259fVwiIGFsdD1cIlwiIGRhdGEtdGVzdC1pZD1cImltZ0ZpbHRlckljb25BcHBvaW50bWVudFwiPiBcclxuICAgICAgICAgICAge3soIHBsdWdpbkNvbmZpZ09icy5maWx0ZXJPYnMuZmlsdGVyTGFiZWx8IHRyYW5zbGF0ZSl9fVxyXG4gICAgICAgICAgPC9idXR0b24+XHJcblxyXG4gICAgICAgICAgPCEtLSBGaWx0ZXIgTWVudSAtLT5cclxuICAgICAgICAgIDxtYXQtbWVudSAjZmlsdGVyTWVudT1cIm1hdE1lbnVcIiBjbGFzcz1cImN1c3RvbS1tZW51XCIgW2hhc0JhY2tkcm9wXT1cInRydWVcIiB4UG9zaXRpb249XCJiZWZvcmVcIiBkYXRhLXRlc3QtaWQ9XCJtZW51RmlsdGVyQXBwb2ludG1lbnRcIj5cclxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cInRvZ2dsZS1idXR0b25zXCIgZGF0YS10ZXN0LWlkPVwiZGl2VG9nZ2xlQnV0dG9uc0FwcG9pbnRtZW50XCI+XHJcbiAgICAgICAgICAgICAgPGJ1dHRvbiBcclxuICAgICAgICAgICAgICAgIG1hdC1idXR0b24gXHJcbiAgICAgICAgICAgICAgICBbY2xhc3MuYWN0aXZlXT1cIm1vZGUgPT09ICdkYXRlJ1wiIFxyXG4gICAgICAgICAgICAgICAgKGNsaWNrKT1cInNldE1vZGUoJ2RhdGUnKTsgJGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpOyByZXNldERhdGUodHJ1ZSlcIiBcclxuICAgICAgICAgICAgICAgIGRhdGEtdGVzdC1pZD1cImJ0bkRhdGVNb2RlQXBwb2ludG1lbnRcIj5cclxuICAgICAgICAgICAgICAgIHt7J0RhdGUnIHwgdHJhbnNsYXRlfX1cclxuICAgICAgICAgICAgICA8L2J1dHRvbj5cclxuICAgICAgICAgICAgICA8YnV0dG9uIFxyXG4gICAgICAgICAgICAgICAgbWF0LWJ1dHRvbiBcclxuICAgICAgICAgICAgICAgIFtjbGFzcy5hY3RpdmVdPVwibW9kZSA9PT0gJ3JhbmdlJ1wiIFxyXG4gICAgICAgICAgICAgICAgKGNsaWNrKT1cInNldE1vZGUoJ3JhbmdlJyk7ICRldmVudC5zdG9wUHJvcGFnYXRpb24oKTsgcmVzZXREYXRlKHRydWUpXCIgXHJcbiAgICAgICAgICAgICAgICBkYXRhLXRlc3QtaWQ9XCJidG5SYW5nZU1vZGVBcHBvaW50bWVudFwiPlxyXG4gICAgICAgICAgICAgICAge3snUmFuZ2UnIHwgdHJhbnNsYXRlfX1cclxuICAgICAgICAgICAgICA8L2J1dHRvbj5cclxuICAgICAgICAgICAgPC9kaXY+XHJcblxyXG4gICAgICAgICAgICA8IS0tIERhdGUgTW9kZSAtLT5cclxuICAgICAgICAgICAgPGRpdiAqbmdJZj1cIm1vZGUgPT09ICdkYXRlJ1wiIGNsYXNzPVwiZGF0ZS12aWV3XCIgKGNsaWNrKT1cIiRldmVudC5zdG9wUHJvcGFnYXRpb24oKVwiIGRhdGEtdGVzdC1pZD1cImRpdkRhdGVNb2RlQXBwb2ludG1lbnRcIj5cclxuICAgICAgICAgICAgICA8Zm9ybSBbZm9ybUdyb3VwXT1cImZpbHRlcmVkRGF0ZUFuZFJhbmdlRm9ybVwiPlxyXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImZvcm0tZGF0ZVwiPlxyXG4gICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiaW5wdXQtZGF0ZVwiPlxyXG4gICAgICAgICAgICAgICAgICAgIDxsYWJlbCBjbGFzcz1cImxhYmVsLXRleHRcIj57eyAnU2VsZWN0IGRhdGUnIHwgdHJhbnNsYXRlfX08L2xhYmVsPlxyXG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJpbnB1dC13cmFwcGVyXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICA8aW5wdXQgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHR5cGU9XCJ0ZXh0XCIgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzPVwiZm9ybS1jb250cm9sXCIgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFttYXhdPVwibWF4RGF0ZVwiIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBmb3JtQ29udHJvbE5hbWU9XCJkYXRlXCIgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFttYXREYXRlcGlja2VyXT1cImRhdGVQaWNrZXJcIiBcclxuICAgICAgICAgICAgICAgICAgICAgICAgcGxhY2Vob2xkZXI9XCJ7eydTZWxlY3QgZGF0ZScgfCB0cmFuc2xhdGV9fVwiIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBhcmlhLWxhYmVsPVwiRGF0ZVwiIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICByZWFkb25seSBcclxuICAgICAgICAgICAgICAgICAgICAgICAgZGF0YS10ZXN0LWlkPVwiZXREYXRlXCIvPlxyXG4gICAgICAgICAgICAgICAgICAgICAgPG1hdC1kYXRlcGlja2VyICNkYXRlUGlja2VyPjwvbWF0LWRhdGVwaWNrZXI+XHJcbiAgICAgICAgICAgICAgICAgICAgICA8bWF0LWRhdGVwaWNrZXItdG9nZ2xlIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBtYXRTdWZmaXggXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFtmb3JdPVwiZGF0ZVBpY2tlclwiIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBkYXRhLXRlc3QtaWQ9XCJkcERhdGVcIiBcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3M9XCJkYXRlcGlja2VyLWljb25cIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPGltZyBtYXREYXRlcGlja2VyVG9nZ2xlSWNvbiBzcmM9XCJhc3NldHMvc3Zncy9jYWxlbmRhci1kYXRlLnN2Z1wiIGFsdD1cIlwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgPC9tYXQtZGF0ZXBpY2tlci10b2dnbGU+XHJcbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgPC9mb3JtPlxyXG4gICAgICAgICAgICA8L2Rpdj5cclxuXHJcbiAgICAgICAgICAgIDwhLS0gUmFuZ2UgTW9kZSAtLT5cclxuICAgICAgICAgICAgPGRpdiAqbmdJZj1cIm1vZGUgPT09ICdyYW5nZSdcIiBjbGFzcz1cInJhbmdlLXZpZXdcIiAoY2xpY2spPVwiICRldmVudC5zdG9wUHJvcGFnYXRpb24oKVwiIGRhdGEtdGVzdC1pZD1cImRpdlJhbmdlTW9kZUFwcG9pbnRtZW50XCI+XHJcbiAgICAgICAgICAgICAgPGZvcm0gW2Zvcm1Hcm91cF09XCJmaWx0ZXJlZERhdGVBbmRSYW5nZUZvcm1cIj5cclxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJmb3JtLWRhdGVcIj5cclxuICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImlucHV0LWRhdGVcIj5cclxuICAgICAgICAgICAgICAgICAgICA8bGFiZWwgY2xhc3M9XCJsYWJlbC10ZXh0XCI+e3sgJ1N0YXJ0IGRhdGUnIHwgdHJhbnNsYXRlIH19PC9sYWJlbD5cclxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiaW5wdXQtd3JhcHBlclwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgPGlucHV0IFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0eXBlPVwidGV4dFwiIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjbGFzcz1cImZvcm0tY29udHJvbFwiIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBbbWF4XT1cImZpbHRlcmVkRGF0ZUFuZFJhbmdlRm9ybS52YWx1ZS5lbmREYXRlID8gZmlsdGVyZWREYXRlQW5kUmFuZ2VGb3JtLnZhbHVlLmVuZERhdGUgOiBtYXhEYXRlXCIgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGZvcm1Db250cm9sTmFtZT1cInN0YXJ0RGF0ZVwiIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBbbWF0RGF0ZXBpY2tlcl09XCJzdGFydERhdGVQaWNrZXJcIiBcclxuICAgICAgICAgICAgICAgICAgICAgICAgcGxhY2Vob2xkZXI9XCJ7eydTZWxlY3Qgc3RhcnQgZGF0ZSd8dHJhbnNsYXRlfX1cIiBcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmVhZG9ubHkgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGRhdGEtdGVzdC1pZD1cImV0U2VsU3RhcnREYXRlXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICA8bWF0LWRhdGVwaWNrZXIgI3N0YXJ0RGF0ZVBpY2tlcj48L21hdC1kYXRlcGlja2VyPlxyXG4gICAgICAgICAgICAgICAgICAgICAgPG1hdC1kYXRlcGlja2VyLXRvZ2dsZSBtYXRTdWZmaXggW2Zvcl09XCJzdGFydERhdGVQaWNrZXJcIiBjbGFzcz1cImRhdGVwaWNrZXItaWNvblwiIGRhdGEtdGVzdC1pZD1cImRwU3RhcnREYXRlXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxpbWcgbWF0RGF0ZXBpY2tlclRvZ2dsZUljb24gc3JjPVwiYXNzZXRzL3N2Z3MvY2FsZW5kYXItZGF0ZS5zdmdcIiBhbHQ9XCJcIj5cclxuICAgICAgICAgICAgICAgICAgICAgIDwvbWF0LWRhdGVwaWNrZXItdG9nZ2xlPlxyXG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImZvcm0tZGF0ZVwiPlxyXG4gICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiaW5wdXQtZGF0ZVwiPlxyXG4gICAgICAgICAgICAgICAgICAgIDxsYWJlbCBjbGFzcz1cImxhYmVsLXRleHRcIj57eyAnRW5kIGRhdGUnIHwgdHJhbnNsYXRlIH19PC9sYWJlbD5cclxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiaW5wdXQtd3JhcHBlclwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgPGlucHV0IFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0eXBlPVwidGV4dFwiIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjbGFzcz1cImZvcm0tY29udHJvbFwiIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBbbWluXT1cImZpbHRlcmVkRGF0ZUFuZFJhbmdlRm9ybS52YWx1ZS5zdGFydERhdGVcIiBcclxuICAgICAgICAgICAgICAgICAgICAgICAgW21heF09XCJtYXhEYXRlXCIgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGZvcm1Db250cm9sTmFtZT1cImVuZERhdGVcIiBcclxuICAgICAgICAgICAgICAgICAgICAgICAgW21hdERhdGVwaWNrZXJdPVwiZW5kRGF0ZVBpY2tlclwiIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBwbGFjZWhvbGRlcj1cInt7J1NlbGVjdCBlbmQgZGF0ZSd8dHJhbnNsYXRlfX1cIiBcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmVhZG9ubHkgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGRhdGEtdGVzdC1pZD1cImV0U2VsRW5kRGF0ZVwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgPG1hdC1kYXRlcGlja2VyICNlbmREYXRlUGlja2VyPjwvbWF0LWRhdGVwaWNrZXI+XHJcbiAgICAgICAgICAgICAgICAgICAgICA8bWF0LWRhdGVwaWNrZXItdG9nZ2xlIG1hdFN1ZmZpeCBbZm9yXT1cImVuZERhdGVQaWNrZXJcIiBjbGFzcz1cImRhdGVwaWNrZXItaWNvblwiIGRhdGEtdGVzdC1pZD1cImRwRW5kRGF0ZVwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8aW1nIG1hdERhdGVwaWNrZXJUb2dnbGVJY29uIHNyYz1cImFzc2V0cy9zdmdzL2NhbGVuZGFyLWRhdGUuc3ZnXCIgYWx0PVwiXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICA8L21hdC1kYXRlcGlja2VyLXRvZ2dsZT5cclxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICA8L2Zvcm0+XHJcbiAgICAgICAgICAgIDwvZGl2PlxyXG5cclxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cImFjdGlvbi1idXR0b25zXCIgZGF0YS10ZXN0LWlkPVwiZGl2RmlsdGVyQWN0aW9uQnRuc0FwcG9pbnRtZW50XCI+XHJcbiAgICAgICAgICAgICAgPGJ1dHRvbiBtYXQtYnV0dG9uIGNsYXNzPVwicmVzZXQtYnRuXCIgKGNsaWNrKT1cInJlc2V0RGF0ZSgpO1wiIGRhdGEtdGVzdC1pZD1cImJ0blJlc2V0RmlsdGVyQXBwb2ludG1lbnRcIj57eyAnUmVzZXQnfCB0cmFuc2xhdGUgfX08L2J1dHRvbj5cclxuICAgICAgICAgICAgICA8YnV0dG9uIG1hdC1idXR0b24gY2xhc3M9XCJhcHBseS1idG5cIiAoY2xpY2spPVwiYXBwbHlEYXRlT3JSYW5nZUZpbHRlcihwbHVnaW5Db25maWdPYnMuZmlsdGVyT2JzLmZpbHRlckRhdGVGaWVsZClcIiBkYXRhLXRlc3QtaWQ9XCJidG5BcHBseUZpbHRlckFwcG9pbnRtZW50XCI+e3sgJ0FwcGx5J3wgdHJhbnNsYXRlIH19PC9idXR0b24+XHJcbiAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgPC9tYXQtbWVudT5cclxuXHJcbiAgICAgICAgICA8IS0tIFNlYXJjaCAtLT5cclxuICAgICAgICAgIDxkaXYgY2xhc3M9XCJpbnB1dC1ncm91cCBzZWFyY2gtYmFyIG1sLWF1dG9cIiAoY2xpY2spPVwiJGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1wiIGRhdGEtdGVzdC1pZD1cImRpdlNlYXJjaEFwcG9pbnRtZW50XCI+XHJcbiAgICAgICAgICAgIDxpbnB1dCBcclxuICAgICAgICAgICAgICB0eXBlPVwidGV4dFwiIFxyXG4gICAgICAgICAgICAgICNzZWFyY2hJbnB1dCBcclxuICAgICAgICAgICAgICBjbGFzcz1cImZvcm0tY29udHJvbFwiIFxyXG4gICAgICAgICAgICAgIHBsYWNlaG9sZGVyPVwie3sgcGx1Z2luQ29uZmlnT2JzLnNlYXJjaFBsYWNlSG9sZGVyIHwgdHJhbnNsYXRlIH19XCIgXHJcbiAgICAgICAgICAgICAgKGtleXVwKT1cImFwcGx5RmlsdGVyKCRldmVudClcIiBcclxuICAgICAgICAgICAgICAoa2V5ZG93bi5TcGFjZSk9XCIkZXZlbnQuc3RvcFByb3BhZ2F0aW9uKClcIiBcclxuICAgICAgICAgICAgICAoa2V5ZG93bi5FbnRlcik9XCIkZXZlbnQuc3RvcFByb3BhZ2F0aW9uKClcIiBcclxuICAgICAgICAgICAgICBkYXRhLXRlc3QtaWQ9XCJldFNlYXJjaEFwcG9pbnRtZW50RGFzaGJvYXJkXCI+XHJcbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJpbnB1dC1ncm91cC1hcHBlbmRcIj5cclxuICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cImlucHV0LWdyb3VwLXRleHRcIiAqbmdJZj1cIiFpc0ZpbHRlckFwcGxpZWRcIiBkYXRhLXRlc3QtaWQ9XCJpY29TZWFyY2hBcHBvaW50bWVudFwiPlxyXG4gICAgICAgICAgICAgICAgPGltZyBzcmM9XCJhc3NldHMvc3Zncy9zZWFyY2gtaWNvbi5zdmdcIiBhbHQ9XCJcIiB3aWR0aD1cIjIwcHhcIiBoZWlnaHQ9XCIyMHB4XCI+XHJcbiAgICAgICAgICAgICAgPC9zcGFuPlxyXG4gICAgICAgICAgICAgIDxidXR0b24gXHJcbiAgICAgICAgICAgICAgICBjbGFzcz1cImJ0blJlc2V0QXBTZXJhY2ggbWF0LWljb24tYnV0dG9uXCIgXHJcbiAgICAgICAgICAgICAgICBhcmlhLWxhYmVsPVwiUmVzZXQgYXBwb2ludG1lbnQgc2VhcmNoXCIgIFxyXG4gICAgICAgICAgICAgICAgKGNsaWNrKT1cImNsZWFyRmlsdGVyKClcIiAgXHJcbiAgICAgICAgICAgICAgICAqbmdJZj1cImlzRmlsdGVyQXBwbGllZFwiIFxyXG4gICAgICAgICAgICAgICAgZGF0YS10ZXN0LWlkPVwiYnRuUmVzZXRTZWFyY2hBcHBvaW50bWVudFwiPlxyXG4gICAgICAgICAgICAgICAgPG1hdC1pY29uIGNsYXNzPVwibWwtMFwiPmNsb3NlPC9tYXQtaWNvbj5cclxuICAgICAgICAgICAgICA8L2J1dHRvbj5cclxuICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICA8L2Rpdj5cclxuICAgICAgPC9kaXY+XHJcbiAgICA8L21hdC1wYW5lbC10aXRsZT5cclxuICA8L21hdC1leHBhbnNpb24tcGFuZWwtaGVhZGVyPlxyXG5cclxuICA8ZGl2IGNsYXNzPVwibWF0LWVsZXZhdGlvbi16OFwiIGRhdGEtdGVzdC1pZD1cImRpdlRhYmxlV3JhcHBlckFwcG9pbnRtZW50XCI+XHJcbiAgICA8c3BhbiAqbmdJZj1cInRhYmxlTG9hZGVyXCI+XHJcbiAgICAgIDxuZ3gtdWktbG9hZGVyIFxyXG4gICAgICAgIFtsb2FkZXJJZF09XCIndGFibGUtbG9hZGVyLScgKyBwbHVnaW5Db25maWdPYnMucGx1Z2luQ29uZmlnT2JzRmxhZ1wiIFxyXG4gICAgICAgIFtmZ3NUeXBlXT1cIidiYWxsLXNwaW4tY2xvY2t3aXNlJ1wiIFxyXG4gICAgICAgIFtmZ3NDb2xvcl09XCInI2FiYTRhNCdcIiBcclxuICAgICAgICBbZmdzUG9zaXRpb25dPVwiJ2NlbnRlci1jZW50ZXInXCIgXHJcbiAgICAgICAgW2Znc1NpemVdPVwiNTBcIiBcclxuICAgICAgICBbb3ZlcmxheUNvbG9yXT1cIidyZ2IoMjU1LCAyNTUsIDI1NSknXCIgXHJcbiAgICAgICAgW2hhc1Byb2dyZXNzQmFyXT1cImZhbHNlXCJcclxuICAgICAgICBbdGV4dF09XCIoJ0xvYWRpbmcnfHRyYW5zbGF0ZSkgKyAnICcgKyAocGx1Z2luQ29uZmlnT2JzLnBsdWdpbkNvbmZpZ09ic0ZsYWd8dHJhbnNsYXRlKSArICcgJyArICgnZGF0YSd8dHJhbnNsYXRlKSArICcuLi4nXCJcclxuICAgICAgICBbdGV4dENvbG9yXT1cIicjMzMzJ1wiXHJcbiAgICAgICAgW3RleHRQb3NpdGlvbl09XCInY2VudGVyLWNlbnRlcidcIlxyXG4gICAgICAgIGRhdGEtdGVzdC1pZD1cImxvYWRlckFwcG9pbnRtZW50XCJcclxuICAgICAgPjwvbmd4LXVpLWxvYWRlcj5cclxuICAgIDwvc3Bhbj5cclxuICAgIDxkaXYgY2xhc3M9XCJ0YWJsZS1jb250YWluZXJcIiBpZD1cInRhYmxlLWNvbnRhaW5lci17e2NvbXBvbmVudElkfX1cIj5cclxuICAgICAgPHRhYmxlIG1hdC10YWJsZSBbZGF0YVNvdXJjZV09XCJwYWdpbmF0ZWREYXRhU291cmNlXCI+XHJcblxyXG4gICAgICA8bmctY29udGFpbmVyICpuZ0Zvcj1cImxldCBjb2x1bW4gb2YgZGlzcGxheWVkQXBwb2ludG1lbnRDb2x1bW5zXCIgW21hdENvbHVtbkRlZl09XCJjb2x1bW4ua2V5XCI+XHJcbiAgICAgICAgPG5nLWNvbnRhaW5lciAqbmdJZj1cImNvbHVtbi5pc1NvcnRhYmxlOyBlbHNlIG5vU29ydFwiPlxyXG4gICAgICAgICAgPHRoIG1hdC1oZWFkZXItY2VsbCAqbWF0SGVhZGVyQ2VsbERlZiAoY2xpY2spPVwiaGFuZGxlU29ydChjb2x1bW4ua2V5LCAnYXNjJylcIiBbYXR0ci5kYXRhLXRlc3QtaWRdPVwiJ3RoLScgKyBjb2x1bW4ua2V5ICsgJy0nICsgcGx1Z2luQ29uZmlnT2JzLnBsdWdpbkNvbmZpZ09ic0ZsYWdcIiBjbGFzcz1cInNvcnRhYmxlLWhlYWRlclwiPlxyXG4gICAgICAgICAgICB7eyBjb2x1bW4ubGFiZWwgfCB0cmFuc2xhdGUgfX1cclxuICAgICAgICAgICAgPG1hdC1pY29uIGNsYXNzPVwic29ydC1pY29uXCI+YXJyb3dfdXB3YXJkPC9tYXQtaWNvbj5cclxuICAgICAgICAgIDwvdGg+XHJcbiAgICAgICAgPC9uZy1jb250YWluZXI+XHJcbiAgICAgICAgPG5nLXRlbXBsYXRlICNub1NvcnQ+XHJcbiAgICAgICAgICA8dGggbWF0LWhlYWRlci1jZWxsICptYXRIZWFkZXJDZWxsRGVmICBbYXR0ci5kYXRhLXRlc3QtaWRdPVwiJ3RoLScgKyBjb2x1bW4ua2V5KyAnLScgKyBwbHVnaW5Db25maWdPYnMucGx1Z2luQ29uZmlnT2JzRmxhZ1wiPlxyXG4gICAgICAgICAgICB7eyBjb2x1bW4ubGFiZWwgfCB0cmFuc2xhdGUgfX1cclxuICAgICAgICAgIDwvdGg+XHJcbiAgICAgICAgPC9uZy10ZW1wbGF0ZT5cclxuXHJcbiAgICAgICAgPHRkIG1hdC1jZWxsICptYXRDZWxsRGVmPVwibGV0IGVsZW1lbnQ7IGxldCBqID0gaW5kZXg7XCIgIFthdHRyLmRhdGEtdGVzdC1pZF09XCIndGQtJyArIGNvbHVtbi5rZXkgKyAnLScgKyBwbHVnaW5Db25maWdPYnMucGx1Z2luQ29uZmlnT2JzRmxhZyArICctJyArIGpcIj5cclxuICAgICAgICAgIDxuZy1jb250YWluZXIgKm5nSWY9XCJjb2x1bW4ua2V5ICE9PSAncGF0aWVudF9uYW1lJyAmJiBjb2x1bW4ua2V5ICE9PSAndmlzaXRfY29tcGxldGVkJ1wiPlxyXG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwiZmxvYXQtbGVmdFwiIFxyXG4gICAgICAgICAgICAgICAgW2lubmVySFRNTF09XCJyZW5kZXJIdG1sQ29udGVudChjb2x1bW4sIGVsZW1lbnQpXCIgXHJcbiAgICAgICAgICAgICAgICBbbmdDbGFzc109XCJnZXRDbGFzc2VzKGNvbHVtbiwgZWxlbWVudClcIj5cclxuICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICA8L25nLWNvbnRhaW5lcj5cclxuICAgICAgICAgIFxyXG4gICAgICAgICAgPCEtLSBUaGlzIGlzIGZvciB2aXNpdF9jb21wbGV0ZWQgY29sdW1uIC0tPlxyXG4gICAgICAgICAgPG5nLWNvbnRhaW5lciAqbmdJZj1cImNvbHVtbi5rZXkgPT09ICd2aXNpdF9jb21wbGV0ZWQnXCI+XHJcbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJkLWZsZXggYWxpZ24taXRlbXMtY2VudGVyIHZpc2l0LWNvbXBsZXRlZC1jZWxsXCIgICBbYXR0ci5kYXRhLXRlc3QtaWRdPVwiJ3RkLXZpc2l0X2NvbXBsZXRlZC0nICsgcGx1Z2luQ29uZmlnT2JzLnBsdWdpbkNvbmZpZ09ic0ZsYWcgKyAnLScgKyBqXCI+XHJcbiAgICAgICAgICAgICAgPGltZyBzcmM9XCJhc3NldHMvc3Zncy9ncmVlbi1wYWQuc3ZnXCIgYWx0PVwiQ29tcGxldGVkXCIgY2xhc3M9XCJtci0yXCIgLz5cclxuICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cInRleHQtc3VjY2Vzc1wiPlxyXG4gICAgICAgICAgICAgICAge3sgZWxlbWVudC5jb21wbGV0ZWQgfX1cclxuICAgICAgICAgICAgICA8L3NwYW4+XHJcbiAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgPC9uZy1jb250YWluZXI+XHJcblxyXG4gICAgICAgICAgPCEtLSBQYXRpZW50IE5hbWUgQ29sdW1uIC0tPlxyXG4gICAgICAgICAgPG5nLWNvbnRhaW5lciAqbmdJZj1cImNvbHVtbi5rZXkgPT09ICdwYXRpZW50X25hbWUnXCI+XHJcbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJkLWZsZXggYWxpZ24taXRlbXMtY2VudGVyXCIgICBbYXR0ci5kYXRhLXRlc3QtaWRdPVwiJ3RkLXBhdGllbnRfbmFtZS0nICsgcGx1Z2luQ29uZmlnT2JzLnBsdWdpbkNvbmZpZ09ic0ZsYWcgKyAnLScgKyBqXCI+XHJcbiAgICAgICAgICAgICAgPGltZyAqbmdJZj1cImVsZW1lbnQucGF0aWVudElkXCIgc3JjPVwie3sgY2hlY2tQYXRpZW50UmVnRmllbGQoJ1Byb2ZpbGUgUGhvdG8nKSA/IGJhc2VVUkwgKyAnL3BlcnNvbmltYWdlLycgKyBlbGVtZW50LnBhdGllbnRJZCA6ICcnIH19XCIgYWx0PVwiXCIgd2lkdGg9XCIzMnB4XCIgaGVpZ2h0PVwiMzJweFwiIHN0eWxlPVwiYm9yZGVyLXJhZGl1czogNTAlO1wiPlxyXG4gICAgICAgICAgICAgIDxpbWcgKm5nSWY9XCJwbHVnaW5Db25maWdPYnMucGx1Z2luQ29uZmlnT2JzRmxhZyAhPT0gJ0FwcG9pbnRtZW50J1wiIHNyYz1cInt7IGNoZWNrUGF0aWVudFJlZ0ZpZWxkKCdQcm9maWxlIFBob3RvJykgPyBiYXNlVVJMICsgJy9wZXJzb25pbWFnZS8nICsgZWxlbWVudC5wZXJzb24udXVpZCA6ICcnIH19XCIgYWx0PVwiXCIgd2lkdGg9XCIzMnB4XCIgaGVpZ2h0PVwiMzJweFwiIHN0eWxlPVwiYm9yZGVyLXJhZGl1czogNTAlO1wiICBbYXR0ci5kYXRhLXRlc3QtaWRdPVwiJ3RkLXBhdGllbnRfaW1nLScgKyBwbHVnaW5Db25maWdPYnMucGx1Z2luQ29uZmlnT2JzRmxhZyArICctJyArIGpcIj5cclxuXHJcbiAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImZsb2F0LWxlZnRcIiBcclxuICAgICAgICAgICAgICAgIFtpbm5lckhUTUxdPVwicmVuZGVySHRtbENvbnRlbnQoY29sdW1uLCBlbGVtZW50KVwiIFxyXG4gICAgICAgICAgICAgICAgW25nQ2xhc3NdPVwiZ2V0Q2xhc3Nlcyhjb2x1bW4sIGVsZW1lbnQpXCI+XHJcbiAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgPC9uZy1jb250YWluZXI+XHJcblxyXG4gICAgICAgICAgPCEtLSBUZWxlcGhvbmUgQ29sdW1uIC0tPlxyXG4gICAgICAgICAgPG5nLWNvbnRhaW5lciAqbmdJZj1cImNvbHVtbi5rZXkgPT09ICd0ZWxlcGhvbmUnICYmIGVsZW1lbnQudGVsZXBob25lXCI+XHJcbiAgICAgICAgICAgIDxhIChjbGljayk9XCJvcGVuV2hhdHNBcHAoJGV2ZW50LCBlbGVtZW50LnRlbGVwaG9uZSlcIiBjbGFzcz1cImZsb2F0LWxlZnQgaWNvbi1idG4gbS0wXCIgW2F0dHIuZGF0YS10ZXN0LWlkXT1cIidsaW5rUGF0aWVudFdoYXRzQXBwJyArIGpcIj5cclxuICAgICAgICAgICAgICA8aW1nIHNyYz1cImFzc2V0cy9zdmdzL3doYXRzYXBwLWdyZWVuLnN2Z1wiIGFsdD1cIldoYXRzQXBwXCIgLz5cclxuICAgICAgICAgICAgPC9hPlxyXG4gICAgICAgICAgPC9uZy1jb250YWluZXI+XHJcblxyXG4gICAgICAgICAgPCEtLSBBY3Rpb25zIENvbHVtbiAtLT5cclxuICAgICAgICAgIDxuZy1jb250YWluZXIgKm5nSWY9XCJjb2x1bW4ua2V5ID09PSAnYWN0aW9ucydcIj5cclxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cImFjdGlvbnMtYnRuLXdyYXAgZC1mbGV4IGFsaWduLWl0ZW1zLWNlbnRlclwiPlxyXG4gICAgICAgICAgICAgIDxidXR0b25cclxuICAgICAgICAgICAgICAgICpuZ0Zvcj1cImxldCBhY3Rpb24gb2YgY29sdW1uLmFjdGlvbkJ1dHRvbnM7IGxldCBrID0gaW5kZXhcIlxyXG4gICAgICAgICAgICAgICAgW25nU3R5bGVdPVwie1xyXG4gICAgICAgICAgICAgICAgICBjb2xvcjogYWN0aW9uLnN0eWxlPy5jb2xvcixcclxuICAgICAgICAgICAgICAgICAgYmFja2dyb3VuZENvbG9yOiBhY3Rpb24uc3R5bGU/LmJhY2tncm91bmRDb2xvclxyXG4gICAgICAgICAgICAgICAgfVwiXHJcbiAgICAgICAgICAgICAgICBjbGFzcz1cImFjdGlvbi1idG4gbXItMlwiXHJcbiAgICAgICAgICAgICAgICB0eXBlPVwiYnV0dG9uXCJcclxuICAgICAgICAgICAgICAgIChjbGljayk9XCIkZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7IGhhbmRsZUFjdGlvbihhY3Rpb24sIGVsZW1lbnQpXCJcclxuICAgICAgICAgICAgICAgICAgW2F0dHIuZGF0YS10ZXN0LWlkXT1cIididG4tYWN0aW9uLScgKyBhY3Rpb24ubGFiZWwrJy0nKyBrXCIgPlxyXG4gICAgICAgICAgICAgICAge3sgYWN0aW9uLmxhYmVsIHwgdHJhbnNsYXRlIH19XHJcbiAgICAgICAgICAgICAgPC9idXR0b24+XHJcbiAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgPC9uZy1jb250YWluZXI+XHJcbiAgICAgICAgPC90ZD5cclxuICAgICAgPC9uZy1jb250YWluZXI+XHJcbiAgICBcclxuXHJcbiAgICAgIDwhLS0gTm8gRGF0YSBSb3cgLS0+XHJcbiAgICAgIDx0ciBjbGFzcz1cIm1hdC1yb3dcIiAqbWF0Tm9EYXRhUm93PlxyXG4gICAgICAgIDx0ZCBjbGFzcz1cIm1hdC1jZWxsIHRleHQtY2VudGVyXCIgW2F0dHIuY29sc3Bhbl09XCJkaXNwbGF5ZWRDb2x1bW5zLmxlbmd0aFwiPlxyXG4gICAgICAgICAge3sgcGx1Z2luQ29uZmlnT2JzLm5vUmVjb3JkRm91bmQgfCB0cmFuc2xhdGUgfX1cclxuICAgICAgICA8L3RkPlxyXG4gICAgICA8L3RyPlxyXG5cclxuICAgICAgPCEtLSBSb3cgRGVmaW5pdGlvbnMgLS0+XHJcbiAgICAgIDx0ciBtYXQtaGVhZGVyLXJvdyAqbWF0SGVhZGVyUm93RGVmPVwiZGlzcGxheWVkQ29sdW1uc1wiPjwvdHI+XHJcbiAgICAgIDx0ciBtYXQtcm93ICptYXRSb3dEZWY9XCJsZXQgcm93OyBsZXQgeCA9IGluZGV4OyBjb2x1bW5zOiBkaXNwbGF5ZWRDb2x1bW5zO1wiIFthdHRyLmRhdGEtdGVzdC1pZF09XCIndHInICsgeFwiIFtyb3V0ZXJMaW5rXT1cIlsnL2Rhc2hib2FyZC92aXNpdC1zdW1tYXJ5Jywgcm93LnV1aWRdXCI+PC90cj5cclxuICAgICAgXHJcbiAgICAgIDwvdGFibGU+XHJcbiAgICA8L2Rpdj5cclxuICAgIDxtYXQtcGFnaW5hdG9yIFxyXG4gICAgICAqbmdJZj1cInBsdWdpbkNvbmZpZ09icz8ucGx1Z2luQ29uZmlnT2JzRmxhZyA9PT0gJ0FwcG9pbnRtZW50J1wiXHJcbiAgICAgICN0ZW1wUGFnaW5hdG9yIFxyXG4gICAgICBoaWRlUGFnZVNpemUgXHJcbiAgICAgIFtwYWdlU2l6ZU9wdGlvbnNdPVwicGFnZVNpemVPcHRpb25zXCJcclxuICAgICAgW2xlbmd0aF09XCJnZXRDdXJyZW50VG90YWxDb3VudCgpXCIgXHJcbiAgICAgIFtwYWdlSW5kZXhdPVwiY3VycmVudFBhZ2VcIiBcclxuICAgICAgW3BhZ2VTaXplXT1cIml0ZW1zUGVyUGFnZVwiXHJcbiAgICAgIFtkaXNhYmxlZF09XCJpc1BhZ2luYXRpb25EaXNhYmxlZCgpXCJcclxuICAgICAgKHBhZ2UpPVwiZ2V0QXBwb2ludG1lbnREYXRhKCRldmVudClcIiBcclxuICAgICAgYXJpYS1sYWJlbD1cIlNlbGVjdCBwYWdlIG9mIHBlcmlvZGljIGVsZW1lbnRzXCI+XHJcbiAgICA8L21hdC1wYWdpbmF0b3I+XHJcbiAgICA8bWF0LXBhZ2luYXRvciBcclxuICAgICAgI3RlbXBQYWdpbmF0b3IgXHJcbiAgICAgICpuZ0lmPVwicGx1Z2luQ29uZmlnT2JzPy5wbHVnaW5Db25maWdPYnNGbGFnICE9PSAnQXBwb2ludG1lbnQnXCJcclxuICAgICAgaGlkZVBhZ2VTaXplIFxyXG4gICAgICBbcGFnZVNpemVPcHRpb25zXT1cInBhZ2VTaXplT3B0aW9uc1wiXHJcbiAgICAgIFtsZW5ndGhdPVwiZ2V0Q3VycmVudFRvdGFsQ291bnQoKVwiIFxyXG4gICAgICBbcGFnZUluZGV4XT1cImN1cnJlbnRQYWdlXCIgXHJcbiAgICAgIFtwYWdlU2l6ZV09XCJpdGVtc1BlclBhZ2VcIiBcclxuICAgICAgW2Rpc2FibGVkXT1cImlzUGFnaW5hdGlvbkRpc2FibGVkKClcIlxyXG4gICAgICAocGFnZSk9XCJwYWdlRXZlbnQgPSBnZXREYXRhKCRldmVudClcIiAgXHJcbiAgICAgIGFyaWEtbGFiZWw9XCJTZWxlY3QgcGFnZSBvZiBwZXJpb2RpYyBlbGVtZW50c1wiPlxyXG4gICAgPC9tYXQtcGFnaW5hdG9yPlxyXG4gIDwvZGl2PlxyXG48L21hdC1leHBhbnNpb24tcGFuZWw+Il19