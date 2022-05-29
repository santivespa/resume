import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'languagePipe'
})
export class LanguagePipe implements PipeTransform {

  transform(value: number, ...args: unknown[]): unknown {
    
    let language:string;
    switch(value){
      case 0:
        language='Beginner';
        break;
      case 1:
        language='Medium';
        break;
      case 2:
        language='Native';
        break;
    }
    return language;
  }

}
