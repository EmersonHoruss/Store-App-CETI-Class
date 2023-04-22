import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';

@Pipe({
  name: 'date',
})
export class DatePipe implements PipeTransform {
  transform(value: string, ...args: unknown[]): string {
    const format: string = 'DD [de] MMM [del] YYYY';
    console.log(args);
    if (args.includes('_date')) {
      return moment(value).format(format);
    }

    return value;
  }
}
