import { ElementRef, OnInit, SimpleChanges, EventEmitter, AfterViewInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { AppointmentModel, CustomEncounterModel, CustomObsModel, CustomVisitModel, ProviderAttributeModel, PatientVisitSummaryConfigModel } from '../../model/model';
import { AppointmentService } from '../../services/appointment.service';
import { VisitService } from '../../services/visit.service';
import { CoreService } from '../../services/core.service';
import { ToastrService } from 'ngx-toastr';
import { TranslateService } from '@ngx-translate/core';
import { MindmapService } from '../../services/mindmap.service';
import { AppConfigService } from '../../services/app-config.service';
import { FormGroup } from '@angular/forms';
import { MatMenuTrigger } from '@angular/material/menu';
import { DomSanitizer } from '@angular/platform-browser';
import { NgxRolesService } from 'ngx-permissions';
import { MatSort } from '@angular/material/sort';
import * as i0 from "@angular/core";
export declare class TableGridComponent implements OnInit, AfterViewInit {
    private appointmentService;
    private visitService;
    private coreService;
    private toastr;
    private translateService;
    private mindmapService;
    private sanitizer;
    private appConfigService;
    private rolesService;
    pluginConfigObs: any;
    displayedAppointmentColumns: any;
    displayedColumns: string[];
    dataSource: MatTableDataSource<any, MatPaginator>;
    patientRegFields: string[];
    isMCCUser: boolean;
    pageSizeOptions: number[];
    paginator: MatPaginator;
    searchElement: ElementRef;
    filteredDateAndRangeForm: FormGroup;
    tempPaginator: MatPaginator;
    menuTrigger: MatMenuTrigger;
    tableMatSort: MatSort;
    panelExpanded: boolean;
    mode: 'date' | 'range';
    maxDate: Date;
    appointments: AppointmentModel[];
    priorityVisits: CustomVisitModel[];
    awaitingVisits: CustomVisitModel[];
    inProgressVisits: CustomVisitModel[];
    completedVisits: CustomVisitModel[];
    followUpVisits: CustomVisitModel[];
    specialization: string;
    visitsCountDate: EventEmitter<any>;
    visitsLengthCount: number;
    isFilterApplied: boolean;
    pvs: PatientVisitSummaryConfigModel;
    baseURL: any;
    isBrandName: string;
    dateField: string;
    dateFilter: string;
    originalData: any[];
    filteredDataAfterDate: any[];
    ngAfterViewInit(): void;
    constructor(appointmentService: AppointmentService, visitService: VisitService, coreService: CoreService, toastr: ToastrService, translateService: TranslateService, mindmapService: MindmapService, sanitizer: DomSanitizer, appConfigService: AppConfigService, rolesService: NgxRolesService, environment: any);
    /**
     * Creates a filtered date range form with required date fields
     * @return {FormGroup} - The created form group
     */
    createFilteredDateRangeForm(): FormGroup;
    ngOnInit(): void;
    /**
     * Dynmaic label Display
     * @param changes pluginConfigObs
     */
    ngOnChanges(changes: SimpleChanges): void;
    /**
    * Reset the date for appointments(Today's,upcoming,pending appoinments)  g
    */
    resetDateForm(): void;
    /**
    * Retreive the chief complaints for the visit
    * @param {CustomVisitModel} visit - Visit
    * @return {string[]} - Chief complaints array
    */
    getCheifComplaint(visit: CustomVisitModel): string[];
    /**
    * Check how old the date is from now
    * @param {string} data - Date in string format
    * @return {string} - Returns how old the date is from now
    */
    checkIfDateOldThanOneDay(data: string): string;
    /**
    * Reschedule appointment
    * @param {AppointmentModel} appointment - Appointment to be rescheduled
    * @param {boolean} isValidationRequired - If true, validation is required
    * @return {void}
    */
    reschedule(appointment: AppointmentModel, isValidationRequired: boolean): void;
    /**
    * Cancel appointment
    * @param {AppointmentModel} appointment - Appointment to be rescheduled
    * @param {boolean} isValidationRequired - If true, validation is required
    * @return {void}
    */
    cancel(appointment: AppointmentModel, isValidationRequired: boolean): void;
    /**
    * Get user uuid from localstorage user
    * @return {string} - User uuid
    */
    get userId(): string;
    /**
    * Apply filter on a datasource
    * @param {Event} event - Input's change event
    * @return {void}
    */
    applyFilter(event: Event): void;
    storeOriginalData(): void;
    /**
    * Clear filter from a datasource
    * @return {void}
    */
    clearFilter(): void;
    /**
     * Checks if the field is in patient registration fields
     * @param {string} fieldName - The field name
     * @return {boolean} - True if present, else false
     */
    checkPatientRegField(fieldName: string): boolean;
    /**
    * Returns the WhatsApp link for a given telephone number
    * @param {string} telephoneNumber - The telephone number to generate the link for
    * @return {string} - The WhatsApp link
    */
    getWhatsAppLink(telephoneNumber: string): string;
    /**
     * Retrieves the telephone number from the person's attributes
     * @param {AppointmentModel['visit']['person']} person - The person object containing attributes
     * @return {string | undefined} - The person's telephone number or undefined if not found
     */
    getTelephoneNumber(person: AppointmentModel['visit']['person']): any;
    /**
     * Closes the menu if it's open
     */
    closeMenu(): void;
    /**
     * Sets the mode for the component (either 'date' or 'range')
     * @param {'date' | 'range'} mode - The mode to set
     */
    setMode(mode: 'date' | 'range'): void;
    /**
     * Formats a date into 'YYYY-MM-DD' format
     * @param {any} date - The date to format
     * @return {string} - The formatted date
     */
    formatDate(date: any): string;
    /**
     * Converts a relative time string (e.g., "2 hours", "1 day") to a date string
     * @param {string} relativeTime - The relative time string
     * @return {string} - The resulting date in 'YYYY-MM-DD' format
     * @throws {Error} - Throws error for invalid time units
     */
    convertToDate(relativeTime: string): string;
    /**
     * Converts a follow-up date string to ISO format
     * @param {string} followUp - The follow-up date string
     * @return {string} - The follow-up date in ISO string format
     */
    convertToISO(followUp: string): string;
    /**
     * Applies date or range filter to the data source based on selected date(s)
     * @param {string} dateField - The field name for the date to filter
     */
    applyDateOrRangeFilter(dateField: string): void;
    /**
     * Resets the date filter form and clears the data source filter
     * @param {boolean} flag - If true, doesn't close the menu
     */
    resetDate(flag?: boolean): void;
    /**
     * Retrieves a specific attribute data from the person's attributes
     * @param {any} data - The data object containing person attributes
     * @param {string} attributeName - The name of the attribute to retrieve
     * @return {Object | null} - The attribute name and value, or null if not found
     */
    getAttributeData(data: any, attributeName: string): {
        name: string;
        value: string;
    } | null;
    /**
    * Get booked appointments for a logged-in doctor in a current year
    * @return {void}
    */
    getAppointments(): void;
    /**
    * Get doctor speciality
    * @param {ProviderAttributeModel[]} attr - Array of provider attributes
    * @return {string} - Doctor speciality
    */
    getSpecialization(attr: ProviderAttributeModel[]): string;
    /**
    * Returns the age in years from the birthdate
    * @param {string} birthdate - Date in string format
    * @return {number} - Age
    */
    calculateAge(birthdate: string): number;
    /**
    * Returns the created time in words from the date
    * @param {string} data - Date
    * @return {string} - Created time in words from the date
    */
    getCreatedAt(data: string): string;
    /**
    * Get encounter datetime for a given encounter type
    * @param {CustomVisitModel} visit - Visit
    * @param {string} encounterName - Encounter type
    * @return {string} - Encounter datetime
    */
    getEncounterCreated(visit: CustomVisitModel, encounterName: string): string;
    /**
     * Determines if the encounter is a follow-up or new visit
     * @param {any} enc - Encounter data
     * @return {string} - 'FOLLOW_UP' or 'NEW'
     */
    getDemarcation(enc: any): string;
    /**
    * Get awaiting visits for a given page number
    * @param {number} page - Page number
    * @return {void}
    */
    getAwaitingVisits(page?: number): void;
    /**
    * Get inprogress visits for a given page number
    * @param {number} page - Page number
    * @return {void}
    */
    getInProgressVisits(page?: number): void;
    /**
    * Get priority visits for a given page number
    * @param {number} page - Page number
    * @return {void}
    */
    getPriorityVisits(page?: number): void;
    /**
     * Get completed visits count
     * @return {void}
     */
    getCompletedVisits(page?: number): void;
    /**
    * Get follow-up visits for a logged-in doctor
    * @return {void}
    */
    getFollowUpVisit(page?: number): void;
    /**
    * Get encounter datetime for a given encounter type
    * @param {CustomVisitModel} visit - Visit
    * @param {string} encounterName - Encounter type
    * @return {string} - Encounter datetime
    */
    getEncounterObs(encounters: CustomEncounterModel[], encounterName: string, conceptId: number): CustomObsModel;
    /**
     * Renders HTML content for a column, sanitized for security
     * @param {any} column - Column definition
     * @param {any} element - Data element to render
     * @return {string} - Formatted HTML or element value
     */
    renderHtmlContent(column: any, element: any): string;
    /**
     * Returns a string of CSS classes for the column
     * @param {any} column - Column definition
     * @return {string} - Space-separated class names
     */
    getClasses(column: any, element: any): string;
    /**
     * Formats the follow-up date by cleaning up time details
     * @param {string} value - Follow-up date string
     * @return {string} - Formatted date
     */
    processFollowUpDate(value: string): string;
    /**
     * Executes the action based on its label (Reschedule or Cancel)
     * @param {any} action - Action object
     * @param {any} element - Element to perform the action on
     */
    handleAction(action: any, element: any): void;
    /**
     * Opens a WhatsApp chat with the given phone number
     * @param {MouseEvent} event - The click event to prevent row navigation
     * @param {string} telephone - Phone number for WhatsApp
     */
    openWhatsApp(event: MouseEvent, telephone: string): void;
    /**
     * Emits the visits count data with the given table tag name and count
     * @param {number} visitsCount - The total visits count for the specific table
     */
    emitVisitsCount(visitsCount: number): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<TableGridComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<TableGridComponent, "lib-table-grid", never, { "pluginConfigObs": "pluginConfigObs"; }, { "visitsCountDate": "visitsCountDate"; }, never, never, false>;
}
