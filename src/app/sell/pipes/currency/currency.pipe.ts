import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'currency',
})
export class CurrencyPipe implements PipeTransform {
  transform(value: string, ...args: unknown[]): unknown {
    const format: string = 'S/ ';

    if (args.includes('_total')) {
      if (!JSON.stringify(value).includes('.')) {
        return format + value + '.00';
      }

      return format + value;
    }

    return value;
  }
}
