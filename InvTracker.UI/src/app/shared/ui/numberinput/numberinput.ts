import { Component, input, signal, ChangeDetectionStrategy } from '@angular/core';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-numberinput',
  imports: [FormsModule],
  templateUrl: './numberinput.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  host: {
    class: 'border-2 border-border-color rounded-lg p-3 focus-within:border-[#697482]'
  }
})

//ToDo: validation Inputs mit Angular anschauen!
export class Numberinput {
  public suffix = input<string>('')

  public price = signal<string>('1')

  isNumeric(event: Event) {
  const input = event.target as HTMLInputElement;

  const cleaned = input.value
    .replace(/\./g, ',')
    .replace(/[^0-9,]/g, '')
    .replace(/(,.*),/g, '$1');

  if (input.value !== cleaned) {
    input.value = cleaned;
  }

  this.price.set(cleaned);
}
}
