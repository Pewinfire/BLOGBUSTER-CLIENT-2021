import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'checking'
})
export class CheckPipe implements PipeTransform {

    transform(visible: boolean):string {
        if (visible) {
            return "fas fa-check ";

        }else{
            return "fas fa-times";
        }
    }
}

