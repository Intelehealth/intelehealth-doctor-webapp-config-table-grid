import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import * as i0 from "@angular/core";
import * as i1 from "@ngx-translate/core";
import * as i2 from "./components/table-grid/table-grid.component";
export class IhLibraryComponent {
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
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.3.0", ngImport: i0, type: IhLibraryComponent, deps: [{ token: i1.TranslateService }], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "14.3.0", type: IhLibraryComponent, selector: "lib-ih-library", ngImport: i0, template: "<lib-table-grid></lib-table-grid>", dependencies: [{ kind: "component", type: i2.TableGridComponent, selector: "lib-table-grid", inputs: ["pluginConfigObs"], outputs: ["visitsCountDate"] }] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.3.0", ngImport: i0, type: IhLibraryComponent, decorators: [{
            type: Component,
            args: [{ selector: 'lib-ih-library', template: "<lib-table-grid></lib-table-grid>" }]
        }], ctorParameters: function () { return [{ type: i1.TranslateService }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaWgtbGlicmFyeS5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9wcm9qZWN0cy9paC1saWJyYXJ5L3NyYy9saWIvaWgtbGlicmFyeS5jb21wb25lbnQudHMiLCIuLi8uLi8uLi8uLi9wcm9qZWN0cy9paC1saWJyYXJ5L3NyYy9saWIvaWgtbGlicmFyeS5jb21wb25lbnQuaHRtbCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsU0FBUyxFQUE0QixNQUFNLGVBQWUsQ0FBQztBQUNwRSxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSxxQkFBcUIsQ0FBQzs7OztBQU12RCxNQUFNLE9BQU8sa0JBQWtCO0lBRVY7SUFBbkIsWUFBbUIsU0FBMkI7UUFBM0IsY0FBUyxHQUFULFNBQVMsQ0FBa0I7UUFDNUMsU0FBUyxDQUFDLFFBQVEsQ0FBQyxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDO1FBQ2pDLFNBQVMsQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLENBQUM7UUFFL0IsTUFBTSxXQUFXLEdBQUcsU0FBUyxDQUFDLGNBQWMsRUFBRSxDQUFDO1FBQy9DLFNBQVMsQ0FBQyxHQUFHLENBQUMsV0FBVyxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUNqRSxDQUFDO0lBRUQsUUFBUTtJQUVSLENBQUM7dUdBWlUsa0JBQWtCOzJGQUFsQixrQkFBa0Isc0RDUC9CLG1DQUFpQzs7MkZET3BCLGtCQUFrQjtrQkFKOUIsU0FBUzsrQkFDRSxnQkFBZ0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCwgVmlld0NvbnRhaW5lclJlZiB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgVHJhbnNsYXRlU2VydmljZSB9IGZyb20gJ0BuZ3gtdHJhbnNsYXRlL2NvcmUnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdsaWItaWgtbGlicmFyeScsXG4gIHRlbXBsYXRlVXJsOiAnLi9paC1saWJyYXJ5LmNvbXBvbmVudC5odG1sJyxcbn0pXG5leHBvcnQgY2xhc3MgSWhMaWJyYXJ5Q29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcblxuICBjb25zdHJ1Y3RvcihwdWJsaWMgdHJhbnNsYXRlOiBUcmFuc2xhdGVTZXJ2aWNlKSB7XG4gICAgdHJhbnNsYXRlLmFkZExhbmdzKFsnZW4nLCAncnUnXSk7XG4gICAgdHJhbnNsYXRlLnNldERlZmF1bHRMYW5nKCdlbicpO1xuXG4gICAgY29uc3QgYnJvd3NlckxhbmcgPSB0cmFuc2xhdGUuZ2V0QnJvd3NlckxhbmcoKTtcbiAgICB0cmFuc2xhdGUudXNlKGJyb3dzZXJMYW5nLm1hdGNoKC9lbnxmci8pID8gYnJvd3NlckxhbmcgOiAnZW4nKTtcbiAgfVxuXG4gIG5nT25Jbml0KCkge1xuXG4gIH1cbn1cbiIsIjxsaWItdGFibGUtZ3JpZD48L2xpYi10YWJsZS1ncmlkPiJdfQ==