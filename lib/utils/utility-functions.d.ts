import { ProviderAttributeModel } from "../model/model";
export declare function getCacheData(parse: boolean, key: string): any;
export declare function setCacheData(key: string, value: string): void;
export declare function deleteCacheData(key: string): void;
export declare function isJsonString(str: any): boolean;
export declare function getEncounterProviderUUID(): any;
export declare function getEncounterUUID(): any;
/**
  * Check how old the date is from now
  * @param {string} data - Date in string format
  * @return {string} - Returns how old the date is from now
  */
export declare function checkIfDateOldThanOneDay(data: string): string;
/**
  * Compare data for sorting
  * @param {number|string} a
  * @param {number|string} b
  * @param {boolean} isAsc
  * @return {number} - Returns order as 1 or -1
  */
export declare function compare(a: number | string, b: number | string, isAsc: boolean): number;
/**
* Get speciality
* @param {ProviderAttributeModel[]} attr - Array of provider attributes
* @return {string} - Speciality
*/
export declare function getSpecialization(attr?: ProviderAttributeModel[]): string;
/**
* Retrieve the appropriate language value from an element.
* @param {any} element - An object containing `lang` and `name`.
* @return {string} - The value in the selected language or the first available one.
* Defaults to `element.name` if no language value is found.
*/
interface ElementLang {
    [key: string]: string;
}
interface Element {
    lang: ElementLang;
    name: string;
}
export declare function getFieldValueByLanguage(element: Element | null | undefined): string;
export declare function calculateBMI(vitals: any, vitalObs: any, _locale?: string): string;
export declare function isFeaturePresent(featureLists: string, featureName: string, notInclude?: boolean): boolean;
export declare function getCallDuration(given_seconds: number): string;
export {};
