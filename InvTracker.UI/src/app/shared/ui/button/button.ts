import { Component } from '@angular/core';


@Component({
  selector: 'button[addButton]',
  imports: [],
  templateUrl: './button.html',
host: {
  class: 'inline-flex items-center justify-center h-12 w-12 rounded-[5px] bg-[#69d9ab] text-2xl cursor-pointer hover:brightness-95'
}

})
export class Button {

}