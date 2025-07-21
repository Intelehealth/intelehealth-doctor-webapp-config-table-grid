import { CUSTOM_ELEMENTS_SCHEMA, NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { IhLibraryComponent } from './ih-library.component';
import { TableGridComponent } from './components/table-grid/table-grid.component';
import { CommonModule, registerLocaleData } from '@angular/common';
import { TranslateLoader, TranslateModule } from "@ngx-translate/core";
import { TranslateHttpLoader } from "@ngx-translate/http-loader";
import { HttpClient } from '@angular/common/http';
import localeRu from '@angular/common/locales/ru';
import localeEn from '@angular/common/locales/en';
import { ToastrModule } from "ngx-toastr";
import { NgxPermissionsModule } from "ngx-permissions";
import { ModalComponentsModule } from "./modal-components/modal-components.module";
import { DefaultImageDirective } from './core/directives/default-image.directive';
// Material Design Imports
import { MatExpansionModule } from '@angular/material/expansion';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { CdkAccordionModule } from "@angular/cdk/accordion";
import { MatTabsModule } from "@angular/material/tabs";
import { MatSidenavModule } from "@angular/material/sidenav";
import { MatMenuModule } from "@angular/material/menu";
import { MatSnackBarModule } from "@angular/material/snack-bar";
import { MatBottomSheetModule } from '@angular/material/bottom-sheet';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { MatSortModule } from '@angular/material/sort';
import { NgxUiLoaderModule } from 'ngx-ui-loader';
import * as i0 from "@angular/core";
import * as i1 from "@ngx-translate/core";
import * as i2 from "ngx-toastr";
import * as i3 from "ngx-permissions";
export function HttpLoaderFactory(httpClient) {
    return new TranslateHttpLoader(httpClient, './assets/i18n/', '.json');
}
registerLocaleData(localeRu);
registerLocaleData(localeEn);
export class IhLibraryModule {
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.3.0", ngImport: i0, type: IhLibraryModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
    static ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "14.3.0", ngImport: i0, type: IhLibraryModule, declarations: [IhLibraryComponent,
            TableGridComponent,
            DefaultImageDirective], imports: [ModalComponentsModule,
            RouterModule,
            CommonModule, i1.TranslateModule, i2.ToastrModule, i3.NgxPermissionsModule, MatPaginatorModule,
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaWgtbGlicmFyeS5tb2R1bGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9wcm9qZWN0cy9paC1saWJyYXJ5L3NyYy9saWIvaWgtbGlicmFyeS5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLHNCQUFzQixFQUFFLFFBQVEsRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUNuRixPQUFPLEVBQUUsa0JBQWtCLEVBQUUsTUFBTSx3QkFBd0IsQ0FBQztBQUM1RCxPQUFPLEVBQUUsa0JBQWtCLEVBQUUsTUFBTSw4Q0FBOEMsQ0FBQztBQUNsRixPQUFPLEVBQUUsWUFBWSxFQUFFLGtCQUFrQixFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDbkUsT0FBTyxFQUFFLGVBQWUsRUFBRSxlQUFlLEVBQUUsTUFBTSxxQkFBcUIsQ0FBQztBQUN2RSxPQUFPLEVBQUUsbUJBQW1CLEVBQUUsTUFBTSw0QkFBNEIsQ0FBQztBQUNqRSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sc0JBQXNCLENBQUM7QUFDbEQsT0FBTyxRQUFRLE1BQU0sNEJBQTRCLENBQUM7QUFDbEQsT0FBTyxRQUFRLE1BQU0sNEJBQTRCLENBQUM7QUFDbEQsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLFlBQVksQ0FBQztBQUMxQyxPQUFPLEVBQUUsb0JBQW9CLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUN2RCxPQUFPLEVBQUUscUJBQXFCLEVBQUUsTUFBTSw0Q0FBNEMsQ0FBQztBQUNuRixPQUFPLEVBQUUscUJBQXFCLEVBQUUsTUFBTSwyQ0FBMkMsQ0FBQztBQUVsRiwwQkFBMEI7QUFDMUIsT0FBTyxFQUFFLGtCQUFrQixFQUFFLE1BQU0sNkJBQTZCLENBQUM7QUFDakUsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLHlCQUF5QixDQUFDO0FBQ3pELE9BQU8sRUFBRSxrQkFBa0IsRUFBRSxNQUFNLDZCQUE2QixDQUFDO0FBQ2pF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QUFhO3dCQUNiLGtCQUFrQjt3QkFDbEIsZUFBZTt3QkFDZixtQkFBbUI7d0JBQ25CLG1CQUFtQjt3QkFDbkIsV0FBVzt3QkFDWCxtQkFBbUI7d0JBQ25CLG9CQUFvQjt3QkFDcEIsWUFBWTt3QkFDWixlQUFlO3FCQUNoQjtvQkFDRCxTQUFTLEVBQUU7d0JBQ1QsRUFBRSxPQUFPLEVBQUUsZUFBZSxFQUFFLFFBQVEsRUFBRSxFQUFFLEVBQUU7d0JBQzFDLEVBQUUsT0FBTyxFQUFFLFlBQVksRUFBRSxRQUFRLEVBQUUsRUFBRSxFQUFFO3FCQUN4QztvQkFDRCxPQUFPLEVBQUU7d0JBQ1Asc0JBQXNCO3dCQUN0QixnQkFBZ0I7cUJBQ2pCO2lCQUNGIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ1VTVE9NX0VMRU1FTlRTX1NDSEVNQSwgTmdNb2R1bGUsIE5PX0VSUk9SU19TQ0hFTUEgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEloTGlicmFyeUNvbXBvbmVudCB9IGZyb20gJy4vaWgtbGlicmFyeS5jb21wb25lbnQnO1xuaW1wb3J0IHsgVGFibGVHcmlkQ29tcG9uZW50IH0gZnJvbSAnLi9jb21wb25lbnRzL3RhYmxlLWdyaWQvdGFibGUtZ3JpZC5jb21wb25lbnQnO1xuaW1wb3J0IHsgQ29tbW9uTW9kdWxlLCByZWdpc3RlckxvY2FsZURhdGEgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHsgVHJhbnNsYXRlTG9hZGVyLCBUcmFuc2xhdGVNb2R1bGUgfSBmcm9tIFwiQG5neC10cmFuc2xhdGUvY29yZVwiO1xuaW1wb3J0IHsgVHJhbnNsYXRlSHR0cExvYWRlciB9IGZyb20gXCJAbmd4LXRyYW5zbGF0ZS9odHRwLWxvYWRlclwiO1xuaW1wb3J0IHsgSHR0cENsaWVudCB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbi9odHRwJztcbmltcG9ydCBsb2NhbGVSdSBmcm9tICdAYW5ndWxhci9jb21tb24vbG9jYWxlcy9ydSc7XG5pbXBvcnQgbG9jYWxlRW4gZnJvbSAnQGFuZ3VsYXIvY29tbW9uL2xvY2FsZXMvZW4nO1xuaW1wb3J0IHsgVG9hc3RyTW9kdWxlIH0gZnJvbSBcIm5neC10b2FzdHJcIjtcbmltcG9ydCB7IE5neFBlcm1pc3Npb25zTW9kdWxlIH0gZnJvbSBcIm5neC1wZXJtaXNzaW9uc1wiO1xuaW1wb3J0IHsgTW9kYWxDb21wb25lbnRzTW9kdWxlIH0gZnJvbSBcIi4vbW9kYWwtY29tcG9uZW50cy9tb2RhbC1jb21wb25lbnRzLm1vZHVsZVwiO1xuaW1wb3J0IHsgRGVmYXVsdEltYWdlRGlyZWN0aXZlIH0gZnJvbSAnLi9jb3JlL2RpcmVjdGl2ZXMvZGVmYXVsdC1pbWFnZS5kaXJlY3RpdmUnO1xuXG4vLyBNYXRlcmlhbCBEZXNpZ24gSW1wb3J0c1xuaW1wb3J0IHsgTWF0RXhwYW5zaW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwvZXhwYW5zaW9uJztcbmltcG9ydCB7IE1hdFRhYmxlTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwvdGFibGUnO1xuaW1wb3J0IHsgTWF0UGFnaW5hdG9yTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwvcGFnaW5hdG9yJztcbmltcG9ydCB7IE1hdEljb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbC9pY29uJztcbmltcG9ydCB7IE1hdFRvb2x0aXBNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbC90b29sdGlwJztcbmltcG9ydCB7IE1hdElucHV0TW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwvaW5wdXQnO1xuaW1wb3J0IHsgTWF0Rm9ybUZpZWxkTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwvZm9ybS1maWVsZCc7XG5pbXBvcnQgeyBNYXREaWFsb2dNb2R1bGUsIE1hdERpYWxvZ1JlZiwgTUFUX0RJQUxPR19EQVRBIH0gZnJvbSBcIkBhbmd1bGFyL21hdGVyaWFsL2RpYWxvZ1wiO1xuaW1wb3J0IHsgQ2RrQWNjb3JkaW9uTW9kdWxlIH0gZnJvbSBcIkBhbmd1bGFyL2Nkay9hY2NvcmRpb25cIjtcbmltcG9ydCB7IE1hdFRhYnNNb2R1bGUgfSBmcm9tIFwiQGFuZ3VsYXIvbWF0ZXJpYWwvdGFic1wiO1xuaW1wb3J0IHsgTWF0U2lkZW5hdk1vZHVsZSB9IGZyb20gXCJAYW5ndWxhci9tYXRlcmlhbC9zaWRlbmF2XCI7XG5pbXBvcnQgeyBNYXRNZW51TW9kdWxlIH0gZnJvbSBcIkBhbmd1bGFyL21hdGVyaWFsL21lbnVcIjtcbmltcG9ydCB7IE1hdFNuYWNrQmFyTW9kdWxlIH0gZnJvbSBcIkBhbmd1bGFyL21hdGVyaWFsL3NuYWNrLWJhclwiO1xuaW1wb3J0IHsgTWF0Qm90dG9tU2hlZXRNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbC9ib3R0b20tc2hlZXQnO1xuaW1wb3J0IHsgTWF0RGF0ZXBpY2tlck1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsL2RhdGVwaWNrZXInO1xuaW1wb3J0IHsgTWF0TmF0aXZlRGF0ZU1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsL2NvcmUnO1xuaW1wb3J0IHsgRm9ybXNNb2R1bGUsIFJlYWN0aXZlRm9ybXNNb2R1bGUgfSBmcm9tIFwiQGFuZ3VsYXIvZm9ybXNcIjtcbmltcG9ydCB7IFJvdXRlck1vZHVsZSB9IGZyb20gXCJAYW5ndWxhci9yb3V0ZXJcIjtcbmltcG9ydCB7IE1hdFNvcnRNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbC9zb3J0JztcbmltcG9ydCB7IE5neFVpTG9hZGVyTW9kdWxlIH0gZnJvbSAnbmd4LXVpLWxvYWRlcic7XG5cbmV4cG9ydCBmdW5jdGlvbiBIdHRwTG9hZGVyRmFjdG9yeShodHRwQ2xpZW50OiBIdHRwQ2xpZW50KSB7XG4gIHJldHVybiBuZXcgVHJhbnNsYXRlSHR0cExvYWRlcihodHRwQ2xpZW50LCAnLi9hc3NldHMvaTE4bi8nLCAnLmpzb24nKTtcbn1cblxucmVnaXN0ZXJMb2NhbGVEYXRhKGxvY2FsZVJ1KTtcbnJlZ2lzdGVyTG9jYWxlRGF0YShsb2NhbGVFbik7XG5cbkBOZ01vZHVsZSh7XG4gIGRlY2xhcmF0aW9uczogW1xuICAgIEloTGlicmFyeUNvbXBvbmVudCxcbiAgICBUYWJsZUdyaWRDb21wb25lbnQsXG4gICAgRGVmYXVsdEltYWdlRGlyZWN0aXZlXG4gIF0sXG4gIGltcG9ydHM6IFtcbiAgICBNb2RhbENvbXBvbmVudHNNb2R1bGUsXG4gICAgUm91dGVyTW9kdWxlLFxuICAgIENvbW1vbk1vZHVsZSxcbiAgICBUcmFuc2xhdGVNb2R1bGUuZm9yUm9vdCh7XG4gICAgICBsb2FkZXI6IHtcbiAgICAgICAgcHJvdmlkZTogVHJhbnNsYXRlTG9hZGVyLFxuICAgICAgICB1c2VGYWN0b3J5OiBIdHRwTG9hZGVyRmFjdG9yeSxcbiAgICAgICAgZGVwczogW0h0dHBDbGllbnRdXG4gICAgICB9XG4gICAgfSksXG4gICAgVG9hc3RyTW9kdWxlLmZvclJvb3Qoe1xuICAgICAgcG9zaXRpb25DbGFzczogJ3RvYXN0LWJvdHRvbS1yaWdodCcsXG4gICAgICBwcmV2ZW50RHVwbGljYXRlczogdHJ1ZSxcbiAgICAgIGNsb3NlQnV0dG9uOiB0cnVlLFxuICAgICAgdGFwVG9EaXNtaXNzOiBmYWxzZVxuICAgIH0pLFxuICAgIE5neFBlcm1pc3Npb25zTW9kdWxlLmZvclJvb3Qoe1xuICAgICAgcGVybWlzc2lvbnNJc29sYXRlOiBmYWxzZSxcbiAgICAgIHJvbGVzSXNvbGF0ZTogZmFsc2UsXG4gICAgICBjb25maWd1cmF0aW9uSXNvbGF0ZTogZmFsc2VcbiAgICB9KSxcbiAgICBNYXRQYWdpbmF0b3JNb2R1bGUsXG4gICAgTWF0VG9vbHRpcE1vZHVsZSxcbiAgICBNYXRJbnB1dE1vZHVsZSxcbiAgICBNYXRGb3JtRmllbGRNb2R1bGUsXG4gICAgTWF0RXhwYW5zaW9uTW9kdWxlLFxuICAgIE1hdEJvdHRvbVNoZWV0TW9kdWxlLFxuICAgIE1hdFNuYWNrQmFyTW9kdWxlLFxuICAgIE1hdE1lbnVNb2R1bGUsXG4gICAgTWF0VGFibGVNb2R1bGUsXG4gICAgTWF0SWNvbk1vZHVsZSxcbiAgICBNYXRTaWRlbmF2TW9kdWxlLFxuICAgIE1hdFRhYnNNb2R1bGUsXG4gICAgQ2RrQWNjb3JkaW9uTW9kdWxlLFxuICAgIE1hdERpYWxvZ01vZHVsZSxcbiAgICBNYXREYXRlcGlja2VyTW9kdWxlLFxuICAgIE1hdE5hdGl2ZURhdGVNb2R1bGUsXG4gICAgRm9ybXNNb2R1bGUsXG4gICAgUmVhY3RpdmVGb3Jtc01vZHVsZSxcbiAgICBNYXRTb3J0TW9kdWxlLFxuICAgIE5neFVpTG9hZGVyTW9kdWxlXG4gIF0sXG4gIGV4cG9ydHM6IFtcbiAgICBEZWZhdWx0SW1hZ2VEaXJlY3RpdmUsXG4gICAgSWhMaWJyYXJ5Q29tcG9uZW50LFxuICAgIFRhYmxlR3JpZENvbXBvbmVudCxcbiAgICBNYXRQYWdpbmF0b3JNb2R1bGUsXG4gICAgTWF0VG9vbHRpcE1vZHVsZSxcbiAgICBNYXRJbnB1dE1vZHVsZSxcbiAgICBNYXRGb3JtRmllbGRNb2R1bGUsXG4gICAgTWF0RXhwYW5zaW9uTW9kdWxlLFxuICAgIE1hdEJvdHRvbVNoZWV0TW9kdWxlLFxuICAgIE1hdFNuYWNrQmFyTW9kdWxlLFxuICAgIE1hdE1lbnVNb2R1bGUsXG4gICAgTWF0VGFibGVNb2R1bGUsXG4gICAgTWF0SWNvbk1vZHVsZSxcbiAgICBNYXRTaWRlbmF2TW9kdWxlLFxuICAgIE1hdFRhYnNNb2R1bGUsXG4gICAgQ2RrQWNjb3JkaW9uTW9kdWxlLFxuICAgIE1hdERpYWxvZ01vZHVsZSxcbiAgICBNYXREYXRlcGlja2VyTW9kdWxlLFxuICAgIE1hdE5hdGl2ZURhdGVNb2R1bGUsXG4gICAgRm9ybXNNb2R1bGUsXG4gICAgUmVhY3RpdmVGb3Jtc01vZHVsZSxcbiAgICBOZ3hQZXJtaXNzaW9uc01vZHVsZSxcbiAgICBUb2FzdHJNb2R1bGUsXG4gICAgVHJhbnNsYXRlTW9kdWxlXG4gIF0sXG4gIHByb3ZpZGVyczogW1xuICAgIHsgcHJvdmlkZTogTUFUX0RJQUxPR19EQVRBLCB1c2VWYWx1ZToge30gfSxcbiAgICB7IHByb3ZpZGU6IE1hdERpYWxvZ1JlZiwgdXNlVmFsdWU6IHt9IH0sXG4gIF0sXG4gIHNjaGVtYXM6IFtcbiAgICBDVVNUT01fRUxFTUVOVFNfU0NIRU1BLFxuICAgIE5PX0VSUk9SU19TQ0hFTUFcbiAgXVxufSlcbmV4cG9ydCBjbGFzcyBJaExpYnJhcnlNb2R1bGUgeyB9XG4iXX0=