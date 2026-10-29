import { Component, input, ChangeDetectionStrategy, signal, computed, output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Button } from '../button/button';

@Component({
  selector: 'app-searchbar',
  imports: [FormsModule, Button],
  templateUrl: './searchbar.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  host: {
    class: 'bg-[#ffffff]'
  }
})

//Die komponente soll
// - Eine Liste mit items entgegennehmen
// - filtern
// - max x ergebnisse zeigen
// - item mit output zurückggeben
// - erstmal mit liste von strings später dann generisch
export class Searchbar {
  public placeholderText = input.required()

  public list = input.required<string[]>();
  public filteredList = computed(() => {
    return this.list().filter(e => e.toLocaleLowerCase().includes(this.searchTerm().toLocaleLowerCase().trim()) 
    )
  })

  // properties für UI zustände
  protected searchFocused = signal<boolean>(false);
  protected listVisible = signal<boolean>(false);

  protected searchTerm = signal<string>('')

  public addItem = output<string>()


  onItemAdd(item: string) {
    console.log("add ITEM", item)
    this.addItem.emit(item)
  }

  // public showResults = input<boolean>(false)
  // public results = input<Iterable <T>>([])
  // public displayWith = input<((item: T) => string[])>()
}
