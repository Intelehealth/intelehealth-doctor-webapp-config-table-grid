import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common/http";
export class AppConfigService {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwLWNvbmZpZy5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvaWgtbGlicmFyeS9zcmMvbGliL3NlcnZpY2VzL2FwcC1jb25maWcuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sc0JBQXNCLENBQUM7QUFDbEQsT0FBTyxFQUFFLE1BQU0sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7OztBQU1uRCxNQUFNLE9BQU8sZ0JBQWdCO0lBc0JqQjtJQXBCRixTQUFTLENBQUM7SUFDWCxPQUFPLENBQVM7SUFDaEIsV0FBVyxDQUFTO0lBQ3BCLGNBQWMsQ0FBd0I7SUFDdEMsUUFBUSxDQUFrQjtJQUMxQixvQkFBb0IsQ0FBdUM7SUFDM0QsWUFBWSxDQUFRO0lBQ3BCLGNBQWMsQ0FBZTtJQUM3QixtQkFBbUIsQ0FBTztJQUMxQixjQUFjLENBQVU7SUFDeEIsTUFBTSxDQUFvQjtJQUMxQixxQkFBcUIsQ0FBaUM7SUFDdEQsc0JBQXNCLENBQVU7SUFDaEMsaUJBQWlCLENBQVU7SUFDM0IsbUJBQW1CLENBQVU7SUFDN0IsWUFBWSxDQUFVO0lBQ3RCLGFBQWEsQ0FBNkI7SUFDMUMsc0JBQXNCLENBQXVCO0lBRXBELFlBQ1UsSUFBZ0IsRUFDRCxXQUFXO1FBRDFCLFNBQUksR0FBSixJQUFJLENBQVk7UUFHeEIsSUFBSSxDQUFDLFNBQVMsR0FBRyxXQUFXLENBQUMsU0FBUyxDQUFDO0lBQ3pDLENBQUM7SUFFRCxJQUFJO1FBQ0YsTUFBTSxPQUFPLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsR0FBRyxJQUFJLENBQUMsU0FBUyw0QkFBNEIsQ0FBQzthQUN6RSxTQUFTLEVBQUU7YUFDWCxJQUFJLENBQUMsQ0FBQyxJQUFJLEVBQUUsRUFBRTtZQUNiLElBQUksQ0FBQyx1QkFBdUIsQ0FBQyxJQUFJLENBQUMsQ0FBQTtZQUNsQyxNQUFNLENBQUMsTUFBTSxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsQ0FBQztZQUMxQixPQUFPLElBQUksQ0FBQztRQUNkLENBQUMsQ0FBQyxDQUFDO1FBQ0wsT0FBTyxPQUFPLENBQUM7SUFDakIsQ0FBQztJQUdELHVCQUF1QixDQUFDLElBQVM7UUFDL0IsSUFBSSxDQUFDLHNCQUFzQixHQUFHLENBQUMsSUFBSSxFQUFFLHNCQUFzQixJQUFJLEVBQUUsQ0FBQzthQUNqRSxHQUFHLENBQUMsQ0FBQyxHQUF3QixFQUFFLEVBQUU7WUFDaEMsT0FBTztnQkFDTCxHQUFHLEdBQUc7Z0JBQ04sSUFBSSxFQUFFLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsT0FBTyxHQUFHLENBQUMsSUFBSSxLQUFLLFFBQVEsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSTthQUN6RixDQUFBO1FBQ0gsQ0FBQyxDQUFDLENBQUE7SUFDSixDQUFDO0lBRUQsSUFBVyxVQUFVO1FBQ25CLElBQUk7WUFDRixPQUFPLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsQ0FBQyxNQUFXLEVBQUUsRUFBRSxDQUFDLE1BQU0sQ0FBQyxHQUFHLEtBQUssa0JBQWtCLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQztTQUNyRztRQUFDLE9BQU8sS0FBSyxFQUFFO1lBQ2QsT0FBTyxJQUFJLENBQUM7U0FDYjtJQUNILENBQUM7SUFFRCxJQUFXLGdCQUFnQjtRQUN6QixNQUFNLE1BQU0sR0FBRyxFQUFFLENBQUM7UUFDbEIsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsb0JBQW9CLENBQUMsQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFBLEVBQUU7WUFDbEQsT0FBTyxDQUFDLEdBQUcsQ0FBQyxHQUFHLEVBQUUsTUFBTSxDQUFDLENBQUM7WUFFekIsTUFBTSxDQUFDLElBQUksQ0FBQyxHQUFHLElBQUksQ0FBQyxvQkFBb0IsQ0FBQyxHQUFHLENBQUM7aUJBQzFDLE1BQU0sQ0FBQyxDQUFDLENBQXVCLEVBQUMsRUFBRSxDQUFBLENBQUMsQ0FBQyxVQUFVLENBQUM7aUJBQy9DLEdBQUcsQ0FBQyxDQUFDLENBQWlCLEVBQUMsRUFBRSxDQUFBLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO1FBQ3ZDLENBQUMsQ0FBQyxDQUFDO1FBQ0gsT0FBTyxNQUFNLENBQUM7SUFDaEIsQ0FBQztJQUVNLG9CQUFvQixDQUFDLFNBQWMsRUFBRSxNQUFzQjtRQUNoRSxPQUFPLE1BQU0sQ0FBQyxPQUFPLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7SUFDMUMsQ0FBQzt1R0F4RVUsZ0JBQWdCLDRDQXVCakIsYUFBYTsyR0F2QlosZ0JBQWdCLGNBRmYsTUFBTTs7MkZBRVAsZ0JBQWdCO2tCQUg1QixVQUFVO21CQUFDO29CQUNWLFVBQVUsRUFBRSxNQUFNO2lCQUNuQjs7MEJBd0JJLE1BQU07MkJBQUMsYUFBYSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEh0dHBDbGllbnQgfSBmcm9tICdAYW5ndWxhci9jb21tb24vaHR0cCc7XG5pbXBvcnQgeyBJbmplY3QsIEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IExhbmd1YWdlTW9kZWwsIFBhdGllbnRSZWdpc3RyYXRpb25GaWVsZHNDb25maWdNb2RlbCwgVml0YWxNb2RlbCwgU3BlY2lhbGl6YXRpb25Nb2RlbCwgV2ViUlRDQ29uZmlnTW9kZWwsIFBhdGllbnRWaXNpdFN1bW1hcnlDb25maWdNb2RlbCwgUGF0aWVudFZpc2l0U2VjdGlvbiB9IGZyb20gJy4uL21vZGVsL21vZGVsJztcblxuQEluamVjdGFibGUoe1xuICBwcm92aWRlZEluOiAncm9vdCdcbn0pXG5leHBvcnQgY2xhc3MgQXBwQ29uZmlnU2VydmljZSB7XG5cbiAgcHJpdmF0ZSBjb25maWdVUkw7XG4gIHB1YmxpYyB2ZXJzaW9uOiBzdHJpbmc7XG4gIHB1YmxpYyBhcGlFbmRwb2ludDogc3RyaW5nO1xuICBwdWJsaWMgc3BlY2lhbGl6YXRpb246IFNwZWNpYWxpemF0aW9uTW9kZWxbXTtcbiAgcHVibGljIGxhbmd1YWdlOiBMYW5ndWFnZU1vZGVsW107XG4gIHB1YmxpYyBwYXRpZW50X3JlZ2lzdHJhdGlvbjogUGF0aWVudFJlZ2lzdHJhdGlvbkZpZWxkc0NvbmZpZ01vZGVsO1xuICBwdWJsaWMgdGhlbWVfY29uZmlnOiBhbnlbXTtcbiAgcHVibGljIHBhdGllbnRfdml0YWxzOiBWaXRhbE1vZGVsW107XG4gIHB1YmxpYyBwYXRpZW50X2RpYWdub3N0aWNzOmFueVtdO1xuICBwdWJsaWMgd2VicnRjX3NlY3Rpb246IGJvb2xlYW47XG4gIHB1YmxpYyB3ZWJydGM6IFdlYlJUQ0NvbmZpZ01vZGVsO1xuICBwdWJsaWMgcGF0aWVudF92aXNpdF9zdW1tYXJ5OiBQYXRpZW50VmlzaXRTdW1tYXJ5Q29uZmlnTW9kZWw7XG4gIHB1YmxpYyBwYXRpZW50X3ZpdGFsc19zZWN0aW9uOiBib29sZWFuO1xuICBwdWJsaWMgcGF0aWVudF9yZWdfb3RoZXI6IGJvb2xlYW47XG4gIHB1YmxpYyBwYXRpZW50X3JlZ19hZGRyZXNzOiBib29sZWFuO1xuICBwdWJsaWMgYWJoYV9zZWN0aW9uOiBib29sZWFuO1xuICBwdWJsaWMgc2lkZWJhcl9tZW51czogeyBba2V5OiBzdHJpbmddOiBib29sZWFuIH07XG4gIHB1YmxpYyBwYXRpZW50X3Zpc2l0X3NlY3Rpb25zOiBQYXRpZW50VmlzaXRTZWN0aW9uW11cblxuICBjb25zdHJ1Y3RvcihcbiAgICBwcml2YXRlIGh0dHA6IEh0dHBDbGllbnQsXG4gICAgQEluamVjdCgnZW52aXJvbm1lbnQnKSBlbnZpcm9ubWVudFxuICApIHtcbiAgICB0aGlzLmNvbmZpZ1VSTCA9IGVudmlyb25tZW50LmNvbmZpZ1VSTDtcbiAgfVxuXG4gIGxvYWQoKTogUHJvbWlzZTxhbnk+IHtcbiAgICBjb25zdCBwcm9taXNlID0gdGhpcy5odHRwLmdldChgJHt0aGlzLmNvbmZpZ1VSTH0vY29uZmlnL2dldFB1Ymxpc2hlZENvbmZpZ2ApXG4gICAgICAudG9Qcm9taXNlKClcbiAgICAgIC50aGVuKChkYXRhKSA9PiB7XG4gICAgICAgIHRoaXMuc2V0UGF0aWVudFZpc2l0U2VjdGlvbnMoZGF0YSlcbiAgICAgICAgT2JqZWN0LmFzc2lnbih0aGlzLCBkYXRhKTtcbiAgICAgICAgcmV0dXJuIGRhdGE7XG4gICAgICB9KTtcbiAgICByZXR1cm4gcHJvbWlzZTtcbiAgfVxuICBcblxuICBzZXRQYXRpZW50VmlzaXRTZWN0aW9ucyhkYXRhOiBhbnkpIHtcbiAgICBkYXRhLnBhdGllbnRfdmlzaXRfc2VjdGlvbnMgPSAoZGF0YT8ucGF0aWVudF92aXNpdF9zZWN0aW9ucyA/PyBbXSlcbiAgICAubWFwKChwdnM6IFBhdGllbnRWaXNpdFNlY3Rpb24pID0+IHtcbiAgICAgIHJldHVybiB7XG4gICAgICAgIC4uLnB2cyxcbiAgICAgICAgbGFuZzogcHZzLmxhbmcgPyAodHlwZW9mIHB2cy5sYW5nID09PSAnb2JqZWN0JyA/IHB2cy5sYW5nIDogSlNPTi5wYXJzZShwdnMubGFuZykpIDogbnVsbCxcbiAgICAgIH1cbiAgICB9KVxuICB9XG5cbiAgcHVibGljIGdldCB0b3VyQ29uZmlnKCl7XG4gICAgdHJ5IHtcbiAgICAgIHJldHVybiBKU09OLnBhcnNlKHRoaXMudGhlbWVfY29uZmlnLmZpbmQoKGNvbmZpZzogYW55KSA9PiBjb25maWcua2V5ID09PSAnaGVscF90b3VyX2NvbmZpZycpLnZhbHVlKTtcbiAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuICB9XG5cbiAgcHVibGljIGdldCBwYXRpZW50UmVnRmllbGRzKCkge1xuICAgIGNvbnN0IGZpZWxkcyA9IFtdO1xuICAgIE9iamVjdC5rZXlzKHRoaXMucGF0aWVudF9yZWdpc3RyYXRpb24pLmZvckVhY2gob2JqPT57XG4gICAgICBjb25zb2xlLmxvZyhvYmosIFwiT0JKc1wiKTtcbiAgICAgIFxuICAgICAgZmllbGRzLnB1c2goLi4udGhpcy5wYXRpZW50X3JlZ2lzdHJhdGlvbltvYmpdXG4gICAgICAgIC5maWx0ZXIoKGU6IHsgaXNfZW5hYmxlZDogYW55OyB9KT0+ZS5pc19lbmFibGVkKVxuICAgICAgICAubWFwKChlOiB7IG5hbWU6IGFueTsgfSk9PmUubmFtZSkpO1xuICAgIH0pOyAgICBcbiAgICByZXR1cm4gZmllbGRzO1xuICB9XG5cbiAgcHVibGljIGNoZWNrUGF0aWVudFJlZ0ZpZWxkKGZpZWxkTmFtZTogYW55LCBmaWVsZHM6IHN0cmluZyB8IGFueVtdKTogYm9vbGVhbntcbiAgICByZXR1cm4gZmllbGRzLmluZGV4T2YoZmllbGROYW1lKSAhPT0gLTE7XG4gIH1cblxufVxuICAgICJdfQ==