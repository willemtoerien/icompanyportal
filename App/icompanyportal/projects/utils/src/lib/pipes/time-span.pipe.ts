import { Pipe, PipeTransform } from '@angular/core';
import { TimeSpan } from '../helpers';

@Pipe({
  name: 'timeSpan'
})
export class TimeSpanPipe implements PipeTransform {
  transform(value: any, ...args: any[]): any {
    if (!value) {
      return '--:--:--';
    }
    return TimeSpan.fromSeconds(value).toString();
  }
}
