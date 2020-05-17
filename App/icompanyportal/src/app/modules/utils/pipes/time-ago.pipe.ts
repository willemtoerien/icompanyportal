import { Pipe, PipeTransform } from '@angular/core';
import { timeAgo } from '../helpers';

@Pipe({
  name: 'timeAgo'
})
export class TimeAgoPipe implements PipeTransform {
  transform(value, args?): any {
    let dateValue: Date;
    if (typeof value === 'string') {
      dateValue = new Date(Date.parse(value));
    } else if (typeof value === 'number') {
      dateValue = new Date(value);
    } else {
      dateValue = value;
    }
    return timeAgo(dateValue);
  }
}
