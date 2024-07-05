import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'playerName',
  standalone: true
})
export class PlayerNamePipe implements PipeTransform {

  transform(value: string): string {
    return value === 'X' ? "Player X " : value === 'O' ? "Player O " : '';
  }

}
