import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'contrastColor'
})
export class ContrastColorPipe implements PipeTransform {

  transform(value: string, ...args: unknown[]): unknown {
    return (value == "purple" || value == "blue" || value == "green")? "white" : "black";
  }
}
