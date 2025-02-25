import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'base64Decode',
  standalone: true
})
export class Base64DecodePipe implements PipeTransform {
  transform(value: string): string {
    try {
      return atob(value);
    } catch (error) {
      return value;
    }
  }
}
