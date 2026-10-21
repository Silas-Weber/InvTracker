import { Component, computed, effect, OnDestroy, signal, viewChild } from '@angular/core';
import { Searchbar } from '../../shared/ui/searchbar/searchbar';
import { CsItem } from '../../shared/types/types';

@Component({
  selector: 'app-add-item-dialog',
  imports: [],
  templateUrl: './add-item-dialog.html',
})
export class AddItemDialog implements OnDestroy {


  protected input = viewChild<HTMLInputElement>('inputEl')
  protected searchTerm = computed(() => {
    console.log(this.input)
  })




  protected searchFocused = signal(false);

  protected testList = signal<CsItem[]>(JSON.parse(localStorage.getItem('skinportItems')!))



  ngOnInit(): void {
    console.log("HALLO")
    console.log(this.testList())
  }

  ngOnDestroy(): void {
    console.log("destroyed")
        console.log(this.input())
  }
}
