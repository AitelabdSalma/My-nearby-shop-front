import {  Pipe, PipeTransform } from '@angular/core'


@Pipe({
    name: 'selectbox'
})

export class SelectboxPipe implements PipeTransform {
    transform(opt: any, selected?: any): any {
        console.log('selected', selected);
        return (opt || opt === 'null') ? opt.filter(sal => { return sal.nomManager == selected }) : opt;
    }
}