import { Component, input, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-searchbar',
  imports: [],
  templateUrl: './searchbar.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  host: {
    class: 'flex justify-between rounded-lg p-1 border-2 border-transparent focus-within:border-[#697482]'
  }
})
export class Searchbar<T> {
  public placeholderText = input.required()

  // public showResults = input<boolean>(false)
  // public results = input<Iterable <T>>([])
  // public displayWith = input<((item: T) => string[])>()
}
