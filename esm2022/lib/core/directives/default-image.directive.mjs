import { Directive, Input } from '@angular/core';
import * as i0 from "@angular/core";
export class DefaultImageDirective {
    src;
    defaultImg = 'assets/svgs/user.svg';
    onError() {
        if (this.src.includes('openmrs'))
            this.src = this.defaultImg;
    }
    checkPath(src) {
        return src || this.defaultImg;
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.3.0", ngImport: i0, type: DefaultImageDirective, deps: [], target: i0.ɵɵFactoryTarget.Directive });
    static ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "14.3.0", type: DefaultImageDirective, selector: "img[src]", inputs: { src: "src" }, host: { listeners: { "error": "onError()" }, properties: { "src": "checkPath(src)" } }, ngImport: i0 });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.3.0", ngImport: i0, type: DefaultImageDirective, decorators: [{
            type: Directive,
            args: [{
                    selector: 'img[src]',
                    host: {
                        '[src]': 'checkPath(src)',
                        '(error)': 'onError()'
                    }
                }]
        }], propDecorators: { src: [{
                type: Input
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGVmYXVsdC1pbWFnZS5kaXJlY3RpdmUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9paC1saWJyYXJ5L3NyYy9saWIvY29yZS9kaXJlY3RpdmVzL2RlZmF1bHQtaW1hZ2UuZGlyZWN0aXZlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsS0FBSyxFQUFFLE1BQU0sZUFBZSxDQUFDOztBQVNqRCxNQUFNLE9BQU8scUJBQXFCO0lBQ3ZCLEdBQUcsQ0FBUztJQUNkLFVBQVUsR0FBVyxzQkFBc0IsQ0FBQztJQUU1QyxPQUFPO1FBQ1osSUFBRyxJQUFJLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQyxTQUFTLENBQUM7WUFDN0IsSUFBSSxDQUFDLEdBQUcsR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDO0lBQy9CLENBQUM7SUFFTSxTQUFTLENBQUMsR0FBVztRQUMxQixPQUFPLEdBQUcsSUFBSSxJQUFJLENBQUMsVUFBVSxDQUFDO0lBQ2hDLENBQUM7dUdBWFUscUJBQXFCOzJGQUFyQixxQkFBcUI7OzJGQUFyQixxQkFBcUI7a0JBUGpDLFNBQVM7bUJBQUM7b0JBQ1QsUUFBUSxFQUFFLFVBQVU7b0JBQ3BCLElBQUksRUFBRTt3QkFDSixPQUFPLEVBQUUsZ0JBQWdCO3dCQUN6QixTQUFTLEVBQUUsV0FBVztxQkFDdkI7aUJBQ0Y7OEJBRVUsR0FBRztzQkFBWCxLQUFLIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgRGlyZWN0aXZlLCBJbnB1dCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5cclxuQERpcmVjdGl2ZSh7XHJcbiAgc2VsZWN0b3I6ICdpbWdbc3JjXScsXHJcbiAgaG9zdDoge1xyXG4gICAgJ1tzcmNdJzogJ2NoZWNrUGF0aChzcmMpJyxcclxuICAgICcoZXJyb3IpJzogJ29uRXJyb3IoKSdcclxuICB9XHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBEZWZhdWx0SW1hZ2VEaXJlY3RpdmUge1xyXG4gIEBJbnB1dCgpIHNyYzogc3RyaW5nO1xyXG4gIHB1YmxpYyBkZWZhdWx0SW1nOiBzdHJpbmcgPSAnYXNzZXRzL3N2Z3MvdXNlci5zdmcnO1xyXG5cclxuICBwdWJsaWMgb25FcnJvcigpIHtcclxuICAgIGlmKHRoaXMuc3JjLmluY2x1ZGVzKCdvcGVubXJzJykpXHJcbiAgICAgIHRoaXMuc3JjID0gdGhpcy5kZWZhdWx0SW1nO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIGNoZWNrUGF0aChzcmM6IHN0cmluZykge1xyXG4gICAgcmV0dXJuIHNyYyB8fCB0aGlzLmRlZmF1bHRJbWc7XHJcbiAgfVxyXG59XHJcbiJdfQ==