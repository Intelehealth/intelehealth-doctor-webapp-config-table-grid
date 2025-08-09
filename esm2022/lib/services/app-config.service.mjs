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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwLWNvbmZpZy5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvaWgtbGlicmFyeS9zcmMvbGliL3NlcnZpY2VzL2FwcC1jb25maWcuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sc0JBQXNCLENBQUM7QUFDbEQsT0FBTyxFQUFFLE1BQU0sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7OztBQU1uRCxNQUFNLE9BQU8sZ0JBQWdCO0lBc0JqQjtJQXBCRixTQUFTLENBQUM7SUFDWCxPQUFPLENBQVM7SUFDaEIsV0FBVyxDQUFTO0lBQ3BCLGNBQWMsQ0FBd0I7SUFDdEMsUUFBUSxDQUFrQjtJQUMxQixvQkFBb0IsQ0FBdUM7SUFDM0QsWUFBWSxDQUFRO0lBQ3BCLGNBQWMsQ0FBZTtJQUM3QixtQkFBbUIsQ0FBTztJQUMxQixjQUFjLENBQVU7SUFDeEIsTUFBTSxDQUFvQjtJQUMxQixxQkFBcUIsQ0FBaUM7SUFDdEQsc0JBQXNCLENBQVU7SUFDaEMsaUJBQWlCLENBQVU7SUFDM0IsbUJBQW1CLENBQVU7SUFDN0IsWUFBWSxDQUFVO0lBQ3RCLGFBQWEsQ0FBNkI7SUFDMUMsc0JBQXNCLENBQXVCO0lBRXBELFlBQ1UsSUFBZ0IsRUFDRCxXQUFXO1FBRDFCLFNBQUksR0FBSixJQUFJLENBQVk7UUFHeEIsSUFBSSxDQUFDLFNBQVMsR0FBRyxXQUFXLENBQUMsU0FBUyxDQUFDO0lBQ3pDLENBQUM7SUFFRCxJQUFJO1FBQ0YsTUFBTSxPQUFPLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsR0FBRyxJQUFJLENBQUMsU0FBUyw0QkFBNEIsQ0FBQzthQUN6RSxTQUFTLEVBQUU7YUFDWCxJQUFJLENBQUMsQ0FBQyxJQUFJLEVBQUUsRUFBRTtZQUNiLElBQUksQ0FBQyx1QkFBdUIsQ0FBQyxJQUFJLENBQUMsQ0FBQTtZQUNsQyxNQUFNLENBQUMsTUFBTSxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsQ0FBQztZQUMxQixPQUFPLElBQUksQ0FBQztRQUNkLENBQUMsQ0FBQyxDQUFDO1FBQ0wsT0FBTyxPQUFPLENBQUM7SUFDakIsQ0FBQztJQUdELHVCQUF1QixDQUFDLElBQVM7UUFDL0IsSUFBSSxDQUFDLHNCQUFzQixHQUFHLENBQUMsSUFBSSxFQUFFLHNCQUFzQixJQUFJLEVBQUUsQ0FBQzthQUNqRSxHQUFHLENBQUMsQ0FBQyxHQUF3QixFQUFFLEVBQUU7WUFDaEMsT0FBTztnQkFDTCxHQUFHLEdBQUc7Z0JBQ04sSUFBSSxFQUFFLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsT0FBTyxHQUFHLENBQUMsSUFBSSxLQUFLLFFBQVEsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSTthQUN6RixDQUFBO1FBQ0gsQ0FBQyxDQUFDLENBQUE7SUFDSixDQUFDO0lBRUQsSUFBVyxVQUFVO1FBQ25CLElBQUk7WUFDRixPQUFPLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsQ0FBQyxNQUFXLEVBQUUsRUFBRSxDQUFDLE1BQU0sQ0FBQyxHQUFHLEtBQUssa0JBQWtCLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQztTQUNyRztRQUFDLE9BQU8sS0FBSyxFQUFFO1lBQ2QsT0FBTyxJQUFJLENBQUM7U0FDYjtJQUNILENBQUM7SUFFRCxJQUFXLGdCQUFnQjtRQUN6QixNQUFNLE1BQU0sR0FBRyxFQUFFLENBQUM7UUFDbEIsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsb0JBQW9CLENBQUMsQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFBLEVBQUU7WUFDbEQsT0FBTyxDQUFDLEdBQUcsQ0FBQyxHQUFHLEVBQUUsTUFBTSxDQUFDLENBQUM7WUFFekIsTUFBTSxDQUFDLElBQUksQ0FBQyxHQUFHLElBQUksQ0FBQyxvQkFBb0IsQ0FBQyxHQUFHLENBQUM7aUJBQzFDLE1BQU0sQ0FBQyxDQUFDLENBQXVCLEVBQUMsRUFBRSxDQUFBLENBQUMsQ0FBQyxVQUFVLENBQUM7aUJBQy9DLEdBQUcsQ0FBQyxDQUFDLENBQWlCLEVBQUMsRUFBRSxDQUFBLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO1FBQ3ZDLENBQUMsQ0FBQyxDQUFDO1FBQ0gsT0FBTyxNQUFNLENBQUM7SUFDaEIsQ0FBQztJQUVNLG9CQUFvQixDQUFDLFNBQWMsRUFBRSxNQUFzQjtRQUNoRSxPQUFPLE1BQU0sQ0FBQyxPQUFPLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7SUFDMUMsQ0FBQzt1R0F4RVUsZ0JBQWdCLDRDQXVCakIsYUFBYTsyR0F2QlosZ0JBQWdCLGNBRmYsTUFBTTs7MkZBRVAsZ0JBQWdCO2tCQUg1QixVQUFVO21CQUFDO29CQUNWLFVBQVUsRUFBRSxNQUFNO2lCQUNuQjs7MEJBd0JJLE1BQU07MkJBQUMsYUFBYSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEh0dHBDbGllbnQgfSBmcm9tICdAYW5ndWxhci9jb21tb24vaHR0cCc7XHJcbmltcG9ydCB7IEluamVjdCwgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBMYW5ndWFnZU1vZGVsLCBQYXRpZW50UmVnaXN0cmF0aW9uRmllbGRzQ29uZmlnTW9kZWwsIFZpdGFsTW9kZWwsIFNwZWNpYWxpemF0aW9uTW9kZWwsIFdlYlJUQ0NvbmZpZ01vZGVsLCBQYXRpZW50VmlzaXRTdW1tYXJ5Q29uZmlnTW9kZWwsIFBhdGllbnRWaXNpdFNlY3Rpb24gfSBmcm9tICcuLi9tb2RlbC9tb2RlbCc7XHJcblxyXG5ASW5qZWN0YWJsZSh7XHJcbiAgcHJvdmlkZWRJbjogJ3Jvb3QnXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBBcHBDb25maWdTZXJ2aWNlIHtcclxuXHJcbiAgcHJpdmF0ZSBjb25maWdVUkw7XHJcbiAgcHVibGljIHZlcnNpb246IHN0cmluZztcclxuICBwdWJsaWMgYXBpRW5kcG9pbnQ6IHN0cmluZztcclxuICBwdWJsaWMgc3BlY2lhbGl6YXRpb246IFNwZWNpYWxpemF0aW9uTW9kZWxbXTtcclxuICBwdWJsaWMgbGFuZ3VhZ2U6IExhbmd1YWdlTW9kZWxbXTtcclxuICBwdWJsaWMgcGF0aWVudF9yZWdpc3RyYXRpb246IFBhdGllbnRSZWdpc3RyYXRpb25GaWVsZHNDb25maWdNb2RlbDtcclxuICBwdWJsaWMgdGhlbWVfY29uZmlnOiBhbnlbXTtcclxuICBwdWJsaWMgcGF0aWVudF92aXRhbHM6IFZpdGFsTW9kZWxbXTtcclxuICBwdWJsaWMgcGF0aWVudF9kaWFnbm9zdGljczphbnlbXTtcclxuICBwdWJsaWMgd2VicnRjX3NlY3Rpb246IGJvb2xlYW47XHJcbiAgcHVibGljIHdlYnJ0YzogV2ViUlRDQ29uZmlnTW9kZWw7XHJcbiAgcHVibGljIHBhdGllbnRfdmlzaXRfc3VtbWFyeTogUGF0aWVudFZpc2l0U3VtbWFyeUNvbmZpZ01vZGVsO1xyXG4gIHB1YmxpYyBwYXRpZW50X3ZpdGFsc19zZWN0aW9uOiBib29sZWFuO1xyXG4gIHB1YmxpYyBwYXRpZW50X3JlZ19vdGhlcjogYm9vbGVhbjtcclxuICBwdWJsaWMgcGF0aWVudF9yZWdfYWRkcmVzczogYm9vbGVhbjtcclxuICBwdWJsaWMgYWJoYV9zZWN0aW9uOiBib29sZWFuO1xyXG4gIHB1YmxpYyBzaWRlYmFyX21lbnVzOiB7IFtrZXk6IHN0cmluZ106IGJvb2xlYW4gfTtcclxuICBwdWJsaWMgcGF0aWVudF92aXNpdF9zZWN0aW9uczogUGF0aWVudFZpc2l0U2VjdGlvbltdXHJcblxyXG4gIGNvbnN0cnVjdG9yKFxyXG4gICAgcHJpdmF0ZSBodHRwOiBIdHRwQ2xpZW50LFxyXG4gICAgQEluamVjdCgnZW52aXJvbm1lbnQnKSBlbnZpcm9ubWVudFxyXG4gICkge1xyXG4gICAgdGhpcy5jb25maWdVUkwgPSBlbnZpcm9ubWVudC5jb25maWdVUkw7XHJcbiAgfVxyXG5cclxuICBsb2FkKCk6IFByb21pc2U8YW55PiB7XHJcbiAgICBjb25zdCBwcm9taXNlID0gdGhpcy5odHRwLmdldChgJHt0aGlzLmNvbmZpZ1VSTH0vY29uZmlnL2dldFB1Ymxpc2hlZENvbmZpZ2ApXHJcbiAgICAgIC50b1Byb21pc2UoKVxyXG4gICAgICAudGhlbigoZGF0YSkgPT4ge1xyXG4gICAgICAgIHRoaXMuc2V0UGF0aWVudFZpc2l0U2VjdGlvbnMoZGF0YSlcclxuICAgICAgICBPYmplY3QuYXNzaWduKHRoaXMsIGRhdGEpO1xyXG4gICAgICAgIHJldHVybiBkYXRhO1xyXG4gICAgICB9KTtcclxuICAgIHJldHVybiBwcm9taXNlO1xyXG4gIH1cclxuICBcclxuXHJcbiAgc2V0UGF0aWVudFZpc2l0U2VjdGlvbnMoZGF0YTogYW55KSB7XHJcbiAgICBkYXRhLnBhdGllbnRfdmlzaXRfc2VjdGlvbnMgPSAoZGF0YT8ucGF0aWVudF92aXNpdF9zZWN0aW9ucyA/PyBbXSlcclxuICAgIC5tYXAoKHB2czogUGF0aWVudFZpc2l0U2VjdGlvbikgPT4ge1xyXG4gICAgICByZXR1cm4ge1xyXG4gICAgICAgIC4uLnB2cyxcclxuICAgICAgICBsYW5nOiBwdnMubGFuZyA/ICh0eXBlb2YgcHZzLmxhbmcgPT09ICdvYmplY3QnID8gcHZzLmxhbmcgOiBKU09OLnBhcnNlKHB2cy5sYW5nKSkgOiBudWxsLFxyXG4gICAgICB9XHJcbiAgICB9KVxyXG4gIH1cclxuXHJcbiAgcHVibGljIGdldCB0b3VyQ29uZmlnKCl7XHJcbiAgICB0cnkge1xyXG4gICAgICByZXR1cm4gSlNPTi5wYXJzZSh0aGlzLnRoZW1lX2NvbmZpZy5maW5kKChjb25maWc6IGFueSkgPT4gY29uZmlnLmtleSA9PT0gJ2hlbHBfdG91cl9jb25maWcnKS52YWx1ZSk7XHJcbiAgICB9IGNhdGNoIChlcnJvcikge1xyXG4gICAgICByZXR1cm4gbnVsbDtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHB1YmxpYyBnZXQgcGF0aWVudFJlZ0ZpZWxkcygpIHtcclxuICAgIGNvbnN0IGZpZWxkcyA9IFtdO1xyXG4gICAgT2JqZWN0LmtleXModGhpcy5wYXRpZW50X3JlZ2lzdHJhdGlvbikuZm9yRWFjaChvYmo9PntcclxuICAgICAgY29uc29sZS5sb2cob2JqLCBcIk9CSnNcIik7XHJcbiAgICAgIFxyXG4gICAgICBmaWVsZHMucHVzaCguLi50aGlzLnBhdGllbnRfcmVnaXN0cmF0aW9uW29ial1cclxuICAgICAgICAuZmlsdGVyKChlOiB7IGlzX2VuYWJsZWQ6IGFueTsgfSk9PmUuaXNfZW5hYmxlZClcclxuICAgICAgICAubWFwKChlOiB7IG5hbWU6IGFueTsgfSk9PmUubmFtZSkpO1xyXG4gICAgfSk7ICAgIFxyXG4gICAgcmV0dXJuIGZpZWxkcztcclxuICB9XHJcblxyXG4gIHB1YmxpYyBjaGVja1BhdGllbnRSZWdGaWVsZChmaWVsZE5hbWU6IGFueSwgZmllbGRzOiBzdHJpbmcgfCBhbnlbXSk6IGJvb2xlYW57XHJcbiAgICByZXR1cm4gZmllbGRzLmluZGV4T2YoZmllbGROYW1lKSAhPT0gLTE7XHJcbiAgfVxyXG5cclxufVxyXG4gICAgIl19