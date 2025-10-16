import { AfterViewInit, Component, ElementRef, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { CustomVisitModel } from 'src/app/model/model';
import { environment } from 'src/environments/environment';
import { AppConfigService } from '../../services/app-config.service';

interface CompletedVisitDisplayModel extends CustomVisitModel {
  patient_name: {
    given_name?: string;
    middle_name?: string;
    family_name?: string;
  };
  person: {
    age?: number;
    gender?: string;
    uuid?: string;
  };
  location?: {
    name: string;
  };
  cheif_complaint?: string;
  prescription_sent?: string;
  visit_ended?: string;
  visit_created?: string;
}

@Component({
  selector: 'app-completed',
  templateUrl: './completed.component.html',
  styleUrls: ['./completed.component.scss']
})
export class CompletedComponent implements OnInit, AfterViewInit, OnChanges {

  displayedColumns: string[] = ['name', 'age', 'visit_created', 'location', 'cheif_complaint', 'prescription_sent', 'visit_ended'];
  dataSource = new MatTableDataSource<CompletedVisitDisplayModel>();
  baseUrl: string = environment.baseURL;
  
  @Input() completedVisits: CustomVisitModel[] = [];
  @Input() completedVisitsCount: number = 0;
  @Output() fetchPageEvent = new EventEmitter<number>();
  
  @ViewChild('completedPaginator') paginator!: MatPaginator;
  @ViewChild('tempPaginator') tempPaginator!: MatPaginator;
  @ViewChild('compSearchInput', { static: true }) searchElement!: ElementRef;
  
  private readonly offset: number = environment.recordsPerPage;
  private readonly pageSize: number = 25;
  
  recordsFetched: number = environment.recordsPerPage;
  pageEvent?: PageEvent;
  pageIndex: number = 0;
  patientRegFields: string[] = [];

  constructor(private appConfigService: AppConfigService) { 
    this.initializePatientRegFields();
    this.initializeDisplayedColumns();
  }

  private initializePatientRegFields(): void {
    this.patientRegFields = this.appConfigService.patientRegFields;
  }

  private initializeDisplayedColumns(): void {
    this.displayedColumns = this.displayedColumns.filter(col => 
      col !== 'age' || this.checkPatientRegField('Age')
    );
  }

  ngOnInit(): void {
    this.dataSource = new MatTableDataSource(this.completedVisits as CompletedVisitDisplayModel[]);
    this.setupFilterPredicate();
  }

  ngAfterViewInit(): void {
    // Additional setup if needed after view initialization
  }

  private setupFilterPredicate(): void {
    this.dataSource.filterPredicate = (data: CompletedVisitDisplayModel, filter: string): boolean => {
      if (!data || !filter) return true;
      
      const searchTerm = filter.toLowerCase().trim();
      
      // Search by patient identifier
      const patientId = data.patient?.identifier?.toLowerCase() || '';
      if (patientId.includes(searchTerm)) return true;
      
      // Search by patient name
      const fullName = this.getPatientFullName(data);
      return fullName.toLowerCase().includes(searchTerm);
    };
  }

  public getPatientFullName(data: CompletedVisitDisplayModel): string {
    const givenName = data.patient_name?.given_name || '';
    const middleName = data.patient_name?.middle_name || '';
    const familyName = data.patient_name?.family_name || '';
    
    const middleNamePart = (middleName && this.checkPatientRegField('Middle Name')) ? ` ${middleName}` : '';
    
    return `${givenName}${middleNamePart} ${familyName}`.trim();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (!changes.completedVisits.firstChange) {
      this.recordsFetched += this.offset;
      this.dataSource.data = [...this.completedVisits] as CompletedVisitDisplayModel[];
    }
  }

  /**
   * Callback for page change event and Get visit for a selected page index and page size
   * @param event - Page event containing pagination information
   * @returns PageEvent for chaining
   */
  public getData(event: PageEvent): PageEvent {
    this.pageIndex = event.pageIndex;
    
    // Reset to first page if filter is applied
    if (this.dataSource.filter) {
      this.paginator?.firstPage();
    }
    
    // Check if we need to fetch more data
    const requiredRecords = (event.pageIndex + 1) * this.pageSize;
    if (requiredRecords > this.recordsFetched) {
      this.fetchPageEvent.emit((this.recordsFetched + this.offset) / this.offset);
    }
    
    return event;
  }

  /**
   * Apply filter on a datasource
   * @param event - Input's change event
   */
  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    this.resetPaginators();
  }

  /**
   * Clear filter from a datasource
   */
  clearFilter(): void {
    this.dataSource.filter = '';
    this.searchElement.nativeElement.value = '';
    this.resetPaginators();
  }

  /**
   * Reset both paginators to first page
   */
  private resetPaginators(): void {
    this.tempPaginator?.firstPage();
    this.paginator?.firstPage();
  }

  /**
   * Check if a patient registration field is enabled
   * @param fieldName - Name of the field to check
   * @returns True if field is enabled, false otherwise
   */
  checkPatientRegField(fieldName: string): boolean {
    return this.patientRegFields.includes(fieldName);
  }

}
