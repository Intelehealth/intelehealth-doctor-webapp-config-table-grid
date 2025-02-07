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
            ReactiveFormsModule], exports: [DefaultImageDirective,
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
            ReactiveFormsModule, MatPaginatorModule,
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaWgtbGlicmFyeS5tb2R1bGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9wcm9qZWN0cy9paC1saWJyYXJ5L3NyYy9saWIvaWgtbGlicmFyeS5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLHNCQUFzQixFQUFFLFFBQVEsRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUNuRixPQUFPLEVBQUUsa0JBQWtCLEVBQUUsTUFBTSx3QkFBd0IsQ0FBQztBQUM1RCxPQUFPLEVBQUUsa0JBQWtCLEVBQUUsTUFBTSw4Q0FBOEMsQ0FBQztBQUNsRixPQUFPLEVBQUUsWUFBWSxFQUFFLGtCQUFrQixFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDbkUsT0FBTyxFQUFFLGVBQWUsRUFBRSxlQUFlLEVBQUUsTUFBTSxxQkFBcUIsQ0FBQztBQUN2RSxPQUFPLEVBQUUsbUJBQW1CLEVBQUUsTUFBTSw0QkFBNEIsQ0FBQztBQUNqRSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sc0JBQXNCLENBQUM7QUFDbEQsT0FBTyxRQUFRLE1BQU0sNEJBQTRCLENBQUM7QUFDbEQsT0FBTyxRQUFRLE1BQU0sNEJBQTRCLENBQUM7QUFDbEQsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLFlBQVksQ0FBQztBQUMxQyxPQUFPLEVBQUUsb0JBQW9CLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUN2RCxPQUFPLEVBQUUscUJBQXFCLEVBQUUsTUFBTSw0Q0FBNEMsQ0FBQztBQUNuRixPQUFPLEVBQUUscUJBQXFCLEVBQUUsTUFBTSwyQ0FBMkMsQ0FBQztBQUVsRiwwQkFBMEI7QUFDMUIsT0FBTyxFQUFFLGtCQUFrQixFQUFFLE1BQU0sNkJBQTZCLENBQUM7QUFDakUsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLHlCQUF5QixDQUFDO0FBQ3pELE9BQU8sRUFBRSxrQkFBa0IsRUFBRSxNQUFNLDZCQUE2QixDQUFDO0FBQ2pF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RUFBRSxlQUFlLEVBQUUsUUFBUSxFQUFFLEVBQUUsRUFBRTt3QkFDMUMsRUFBRSxPQUFPLEVBQUUsWUFBWSxFQUFFLFFBQVEsRUFBRSxFQUFFLEVBQUU7cUJBQ3hDO29CQUNELE9BQU8sRUFBRTt3QkFDUCxzQkFBc0I7d0JBQ3RCLGdCQUFnQjtxQkFDakI7aUJBQ0YiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDVVNUT01fRUxFTUVOVFNfU0NIRU1BLCBOZ01vZHVsZSwgTk9fRVJST1JTX1NDSEVNQSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBJaExpYnJhcnlDb21wb25lbnQgfSBmcm9tICcuL2loLWxpYnJhcnkuY29tcG9uZW50JztcclxuaW1wb3J0IHsgVGFibGVHcmlkQ29tcG9uZW50IH0gZnJvbSAnLi9jb21wb25lbnRzL3RhYmxlLWdyaWQvdGFibGUtZ3JpZC5jb21wb25lbnQnO1xyXG5pbXBvcnQgeyBDb21tb25Nb2R1bGUsIHJlZ2lzdGVyTG9jYWxlRGF0YSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XHJcbmltcG9ydCB7IFRyYW5zbGF0ZUxvYWRlciwgVHJhbnNsYXRlTW9kdWxlIH0gZnJvbSBcIkBuZ3gtdHJhbnNsYXRlL2NvcmVcIjtcclxuaW1wb3J0IHsgVHJhbnNsYXRlSHR0cExvYWRlciB9IGZyb20gXCJAbmd4LXRyYW5zbGF0ZS9odHRwLWxvYWRlclwiO1xyXG5pbXBvcnQgeyBIdHRwQ2xpZW50IH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uL2h0dHAnO1xyXG5pbXBvcnQgbG9jYWxlUnUgZnJvbSAnQGFuZ3VsYXIvY29tbW9uL2xvY2FsZXMvcnUnO1xyXG5pbXBvcnQgbG9jYWxlRW4gZnJvbSAnQGFuZ3VsYXIvY29tbW9uL2xvY2FsZXMvZW4nO1xyXG5pbXBvcnQgeyBUb2FzdHJNb2R1bGUgfSBmcm9tIFwibmd4LXRvYXN0clwiO1xyXG5pbXBvcnQgeyBOZ3hQZXJtaXNzaW9uc01vZHVsZSB9IGZyb20gXCJuZ3gtcGVybWlzc2lvbnNcIjtcclxuaW1wb3J0IHsgTW9kYWxDb21wb25lbnRzTW9kdWxlIH0gZnJvbSBcIi4vbW9kYWwtY29tcG9uZW50cy9tb2RhbC1jb21wb25lbnRzLm1vZHVsZVwiO1xyXG5pbXBvcnQgeyBEZWZhdWx0SW1hZ2VEaXJlY3RpdmUgfSBmcm9tICcuL2NvcmUvZGlyZWN0aXZlcy9kZWZhdWx0LWltYWdlLmRpcmVjdGl2ZSc7XHJcblxyXG4vLyBNYXRlcmlhbCBEZXNpZ24gSW1wb3J0c1xyXG5pbXBvcnQgeyBNYXRFeHBhbnNpb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbC9leHBhbnNpb24nO1xyXG5pbXBvcnQgeyBNYXRUYWJsZU1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsL3RhYmxlJztcclxuaW1wb3J0IHsgTWF0UGFnaW5hdG9yTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwvcGFnaW5hdG9yJztcclxuaW1wb3J0IHsgTWF0SWNvbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsL2ljb24nO1xyXG5pbXBvcnQgeyBNYXRUb29sdGlwTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwvdG9vbHRpcCc7XHJcbmltcG9ydCB7IE1hdElucHV0TW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwvaW5wdXQnO1xyXG5pbXBvcnQgeyBNYXRGb3JtRmllbGRNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbC9mb3JtLWZpZWxkJztcclxuaW1wb3J0IHsgTWF0RGlhbG9nTW9kdWxlLCBNYXREaWFsb2dSZWYsIE1BVF9ESUFMT0dfREFUQSB9IGZyb20gXCJAYW5ndWxhci9tYXRlcmlhbC9kaWFsb2dcIjtcclxuaW1wb3J0IHsgQ2RrQWNjb3JkaW9uTW9kdWxlIH0gZnJvbSBcIkBhbmd1bGFyL2Nkay9hY2NvcmRpb25cIjtcclxuaW1wb3J0IHsgTWF0VGFic01vZHVsZSB9IGZyb20gXCJAYW5ndWxhci9tYXRlcmlhbC90YWJzXCI7XHJcbmltcG9ydCB7IE1hdFNpZGVuYXZNb2R1bGUgfSBmcm9tIFwiQGFuZ3VsYXIvbWF0ZXJpYWwvc2lkZW5hdlwiO1xyXG5pbXBvcnQgeyBNYXRNZW51TW9kdWxlIH0gZnJvbSBcIkBhbmd1bGFyL21hdGVyaWFsL21lbnVcIjtcclxuaW1wb3J0IHsgTWF0U25hY2tCYXJNb2R1bGUgfSBmcm9tIFwiQGFuZ3VsYXIvbWF0ZXJpYWwvc25hY2stYmFyXCI7XHJcbmltcG9ydCB7IE1hdEJvdHRvbVNoZWV0TW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwvYm90dG9tLXNoZWV0JztcclxuaW1wb3J0IHsgTWF0RGF0ZXBpY2tlck1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsL2RhdGVwaWNrZXInO1xyXG5pbXBvcnQgeyBNYXROYXRpdmVEYXRlTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwvY29yZSc7XHJcbmltcG9ydCB7IEZvcm1zTW9kdWxlLCBSZWFjdGl2ZUZvcm1zTW9kdWxlIH0gZnJvbSBcIkBhbmd1bGFyL2Zvcm1zXCI7XHJcbmltcG9ydCB7IFJvdXRlck1vZHVsZSB9IGZyb20gXCJAYW5ndWxhci9yb3V0ZXJcIjtcclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBIdHRwTG9hZGVyRmFjdG9yeShodHRwQ2xpZW50OiBIdHRwQ2xpZW50KSB7XHJcbiAgcmV0dXJuIG5ldyBUcmFuc2xhdGVIdHRwTG9hZGVyKGh0dHBDbGllbnQsICcuL2Fzc2V0cy9pMThuLycsICcuanNvbicpO1xyXG59XHJcblxyXG5yZWdpc3RlckxvY2FsZURhdGEobG9jYWxlUnUpO1xyXG5yZWdpc3RlckxvY2FsZURhdGEobG9jYWxlRW4pO1xyXG5cclxuQE5nTW9kdWxlKHtcclxuICBkZWNsYXJhdGlvbnM6IFtcclxuICAgIEloTGlicmFyeUNvbXBvbmVudCxcclxuICAgIFRhYmxlR3JpZENvbXBvbmVudCxcclxuICAgIERlZmF1bHRJbWFnZURpcmVjdGl2ZVxyXG4gIF0sXHJcbiAgaW1wb3J0czogW1xyXG4gICAgTW9kYWxDb21wb25lbnRzTW9kdWxlLFxyXG4gICAgUm91dGVyTW9kdWxlLFxyXG4gICAgQ29tbW9uTW9kdWxlLFxyXG4gICAgVHJhbnNsYXRlTW9kdWxlLmZvclJvb3Qoe1xyXG4gICAgICBsb2FkZXI6IHtcclxuICAgICAgICBwcm92aWRlOiBUcmFuc2xhdGVMb2FkZXIsXHJcbiAgICAgICAgdXNlRmFjdG9yeTogSHR0cExvYWRlckZhY3RvcnksXHJcbiAgICAgICAgZGVwczogW0h0dHBDbGllbnRdXHJcbiAgICAgIH1cclxuICAgIH0pLFxyXG4gICAgVG9hc3RyTW9kdWxlLmZvclJvb3Qoe1xyXG4gICAgICBwb3NpdGlvbkNsYXNzOiAndG9hc3QtYm90dG9tLXJpZ2h0JyxcclxuICAgICAgcHJldmVudER1cGxpY2F0ZXM6IHRydWUsXHJcbiAgICAgIGNsb3NlQnV0dG9uOiB0cnVlLFxyXG4gICAgICB0YXBUb0Rpc21pc3M6IGZhbHNlXHJcbiAgICB9KSxcclxuICAgIE5neFBlcm1pc3Npb25zTW9kdWxlLmZvclJvb3Qoe1xyXG4gICAgICBwZXJtaXNzaW9uc0lzb2xhdGU6IGZhbHNlLFxyXG4gICAgICByb2xlc0lzb2xhdGU6IGZhbHNlLFxyXG4gICAgICBjb25maWd1cmF0aW9uSXNvbGF0ZTogZmFsc2VcclxuICAgIH0pLFxyXG4gICAgTWF0UGFnaW5hdG9yTW9kdWxlLFxyXG4gICAgTWF0VG9vbHRpcE1vZHVsZSxcclxuICAgIE1hdElucHV0TW9kdWxlLFxyXG4gICAgTWF0Rm9ybUZpZWxkTW9kdWxlLFxyXG4gICAgTWF0RXhwYW5zaW9uTW9kdWxlLFxyXG4gICAgTWF0Qm90dG9tU2hlZXRNb2R1bGUsXHJcbiAgICBNYXRTbmFja0Jhck1vZHVsZSxcclxuICAgIE1hdE1lbnVNb2R1bGUsXHJcbiAgICBNYXRUYWJsZU1vZHVsZSxcclxuICAgIE1hdEljb25Nb2R1bGUsXHJcbiAgICBNYXRTaWRlbmF2TW9kdWxlLFxyXG4gICAgTWF0VGFic01vZHVsZSxcclxuICAgIENka0FjY29yZGlvbk1vZHVsZSxcclxuICAgIE1hdERpYWxvZ01vZHVsZSxcclxuICAgIE1hdERhdGVwaWNrZXJNb2R1bGUsXHJcbiAgICBNYXROYXRpdmVEYXRlTW9kdWxlLFxyXG4gICAgRm9ybXNNb2R1bGUsXHJcbiAgICBSZWFjdGl2ZUZvcm1zTW9kdWxlLFxyXG4gIF0sXHJcbiAgZXhwb3J0czogW1xyXG4gICAgRGVmYXVsdEltYWdlRGlyZWN0aXZlLFxyXG4gICAgSWhMaWJyYXJ5Q29tcG9uZW50LFxyXG4gICAgVGFibGVHcmlkQ29tcG9uZW50LFxyXG4gICAgTWF0UGFnaW5hdG9yTW9kdWxlLFxyXG4gICAgTWF0VG9vbHRpcE1vZHVsZSxcclxuICAgIE1hdElucHV0TW9kdWxlLFxyXG4gICAgTWF0Rm9ybUZpZWxkTW9kdWxlLFxyXG4gICAgTWF0RXhwYW5zaW9uTW9kdWxlLFxyXG4gICAgTWF0Qm90dG9tU2hlZXRNb2R1bGUsXHJcbiAgICBNYXRTbmFja0Jhck1vZHVsZSxcclxuICAgIE1hdE1lbnVNb2R1bGUsXHJcbiAgICBNYXRUYWJsZU1vZHVsZSxcclxuICAgIE1hdEljb25Nb2R1bGUsXHJcbiAgICBNYXRTaWRlbmF2TW9kdWxlLFxyXG4gICAgTWF0VGFic01vZHVsZSxcclxuICAgIENka0FjY29yZGlvbk1vZHVsZSxcclxuICAgIE1hdERpYWxvZ01vZHVsZSxcclxuICAgIE1hdERhdGVwaWNrZXJNb2R1bGUsXHJcbiAgICBNYXROYXRpdmVEYXRlTW9kdWxlLFxyXG4gICAgRm9ybXNNb2R1bGUsXHJcbiAgICBSZWFjdGl2ZUZvcm1zTW9kdWxlLFxyXG4gICAgTmd4UGVybWlzc2lvbnNNb2R1bGUsXHJcbiAgICBUb2FzdHJNb2R1bGUsXHJcbiAgICBUcmFuc2xhdGVNb2R1bGVcclxuICBdLFxyXG4gIHByb3ZpZGVyczogW1xyXG4gICAgeyBwcm92aWRlOiBNQVRfRElBTE9HX0RBVEEsIHVzZVZhbHVlOiB7fSB9LFxyXG4gICAgeyBwcm92aWRlOiBNYXREaWFsb2dSZWYsIHVzZVZhbHVlOiB7fSB9LFxyXG4gIF0sXHJcbiAgc2NoZW1hczogW1xyXG4gICAgQ1VTVE9NX0VMRU1FTlRTX1NDSEVNQSxcclxuICAgIE5PX0VSUk9SU19TQ0hFTUFcclxuICBdXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBJaExpYnJhcnlNb2R1bGUgeyB9XHJcbiJdfQ==