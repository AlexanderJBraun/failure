import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sum'
})
export class SumPipe implements PipeTransform {

transform(value:number, args:string[]) : any {

        var quantity =  parseFloat(args[0]);
        return quantity * value;
  }

}
