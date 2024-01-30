import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

    transform(items: any[], filterText: string): any[] {
      if (!items || !filterText) {
        return items;
      }
      filterText = filterText.toLowerCase();
  
      return items.filter(item => item.propertyToFilter.toLowerCase().includes(filterText));
    }
  

}
