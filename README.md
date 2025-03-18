# IntelehealthUi

This library was generated with [Angular CLI](https://github.com/angular/angular-cli) version 16.2.0.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites
Node.js
   ```
   https://nodejs.org/en/
   ```
   
    
### Installing
A step by step series of examples that tell you how to get a development environment running
1. Clone or download this repository
2. Install all the dependencies.
```
"npm install"
```    
3. Start the server
```
"ng serve"
```

4. Open in browser
```
 "localhost:4200"
```

## Built With

* [Angular](https://angular.io/) - Angular Framework
* [Angular Material](https://material.angular.io/) - Designing
* [BootStrap](https://getbootstrap.com/) - Table, Cards and other UI design

## Commeting Message (Examples)
1.Commit message with description and change in body
```
fix: allow provided config object to extend other configs
```
2.Commit message with scope
```
feat(lang): add language data
```
3.Commit message with optional ! to draw attention to breaking change
```
revert!: drop Node 8 from testing matrix
```

## .env (Create .env in the root folder and use below environment keys)

```
PRODUCTION=false
BASE=XXXXX
BASE_URL=XXXXX
BASE_URL_CORD_APP=XXXXX
BASE_URL_LEGACY=XXXXX
MIND_MAP_URL=XXXXX
CONFIG_URL=XXXXX
NOTIFICATION_URL=XXXXX
SOCKET_URL=XXXXX
CAPTCHA_SITE_KEY=XXXXX
WEB_RTC_SDK_SERVER_URL=XXXXX
WEB_RTC_TOKEN_SERVER_URL=XXXXX
SITE_KEY=XXXXX
EXTERNAL_PRESCRIPTION_CRED=XXXXX
VAPID_PUBLIC_KEY=XXXXX
AUTH_GATE_WAY_URL=XXXXX
FIREBASE_API_KEY=XXXXX
FIREBASE_AUTH_DOMAIN=XXXXX
FIREBASE_PROJECT_ID=XXXXX
FIREBASE_STORAGE_BUCKET=XXXXX
FIREBASE_MESSAGING_SENDER_ID=XXXXX
FIREBASE_APP_ID=XXXXX
SHOW_CAPTCHA=true/false
```

# IhLibrary

This library was generated with [Angular CLI](https://github.com/angular/angular-cli) version 16.2.0.

## Code scaffolding

Run `ng generate component component-name --project ih-library` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module --project ih-library`.
> Note: Don't forget to add `--project ih-library` or else it will be added to the default project in your `angular.json` file. 

## Build

Run `ng build ih-library` to build the project. The build artifacts will be stored in the `dist/` directory.

## Publishing

After building your library with `ng build ih-library`, go to the dist folder `cd dist/ih-library` and run `npm publish`.

## Running unit tests

Run `ng test ih-library` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.

## Installation

To install the Ih Library, run the following command:

### Install from GitHub

```bash
npm install git+https://github.com/Intelehealth/intelehealth-doctor-webapp-config-table-grid.git
```

Note: The --force flag is used to override any dependency conflicts. Use it cautiously to avoid breaking changes in your project.

### Usage
Once the package is installed, you can import the `IhLibraryModule` in your Angular application.

### Import the Module
In your Angular module (e.g., `app.module.ts`), import the `IhLibraryModule`:


```typescript
import { IhLibraryModule } from 'ih-library';

@NgModule({
  declarations: [AppComponent],
  imports: [IhLibraryModule],
  bootstrap: [AppComponent]
})
export class AppModule {}
```

### Using the Component
To use the appointment component, add the <lib-table-grid> selector to your template file:

```html
<lib-table-grid [pluginConfigObs]="pluginConfigObsAwaiting"></lib-table-grid>
```

### Configuration Object Structure

```typescript
pluginConfigObsAwaiting: any = {
  anchorId: "anchor-awaiting",  // Section identifier
  pluginConfigObsFlag: "Awaiting",  // Data flag
  baseURL: "",  // API base URL
  mindmapURL: "",  // Mindmap API URL
  tableHeader: "Awaiting visits",  // Table header text
  tooltipLabel: "General uploaded visits",  // Tooltip text
  searchPlaceHolder: "Search Awaiting Visits",  // Search input placeholder
  noRecordFound: "No any awaiting visits.",  // No records found message
  tableHeaderIcon: "assets/svgs/green-profile.svg",  // Table header icon
  filterObs: {  // Filter settings
    filterFlag: true,
    filterLabel: "Filter",
    filterIcon: "assets/svgs/filter.svg",
    filterDateField: "visit_created",
    filterDateMax: new Date(),
  },
  tableColumns: [  // Table columns configuration
    { label: "Patient", key: "patient_name", formatHtml: (element) => /* custom HTML */ },
    { label: "Age", key: "age", formatHtml: (element) => /* custom HTML */ },
    { label: "Location", key: "location", formatHtml: (element) => /* custom HTML */ },
    { label: "Chief Complaint", key: "cheif_complaint" },
    { label: "Patient Type", key: "patient_type", formatHtml: (element) => /* custom HTML */ },
    { label: "Visit Uploaded", key: "visit_created", formatHtml: (element) => /* custom HTML */ },
  ],
};
```
#### Fields Explanation
- **anchorId**: The ID used to identify the section in the UI where this plugin will be displayed.
- **pluginConfigObsFlag**: The flag used to specify the type of data being displayed (e.g., "Awaiting").
- **baseURL**: The URL for making API calls to retrieve the visit data.
- **mindmapURL**: The URL for the mindmap API to potentially integrate mindmap-related functionality.
- **tableHeader**: The text label displayed as the header of the table showing the awaiting visits.
- **tooltipLabel**: The text shown when hovering over the table header.
- **searchPlaceHolder**: Placeholder text for the search input field.
- **noRecordFound**: The message displayed when no records are found for awaiting visits.
- **tableHeaderIcon**: Path to the icon displayed next to the table header.
- **filterObs**: Contains the filter options such as enabling/disabling filters, filter label, and date field for filtering.
- **tableColumns**: Array of column configurations, each column displays a specific piece of information (e.g., Patient name, Age, Location, etc.) with options to customize the HTML rendering.