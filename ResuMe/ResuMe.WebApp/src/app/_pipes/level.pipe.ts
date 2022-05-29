import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'level'
})
export class LevelPipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    let level:string;
    switch(value){
      case 0:
        level='Medium';
        break;
      case 1:
        level='High';
        break;
      case 2:
        level='Expert';
        break;
    }
    return level;
  }

}
