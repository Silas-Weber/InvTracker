import { Component, computed, effect, ElementRef, OnDestroy, signal, viewChild } from '@angular/core';
import { Searchbar } from '../../shared/ui/searchbar/searchbar';
import { CsItem } from '../../shared/types/types';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-add-item-dialog',
  imports: [FormsModule],
  templateUrl: './add-item-dialog.html',
})
export class AddItemDialog {



  protected searchTerm = signal('')

  protected filteredList = computed(() => {
    return this.testList().filter(e => {
      if(e.market_hash_name.toLocaleLowerCase().includes(this.searchTerm())) {
        return e;
      }
      return
    })
  }) 

  protected test() {
    console.log("test")
  }

  // items werden dem localstorage hinzugefügt
protected addItem(item: CsItem) {

  const storedItems = localStorage.getItem('yourItems');

  if(storedItems) {
  const items = Array(...JSON.parse(storedItems), item);
    localStorage.setItem('yourItems', JSON.stringify(items))
  } else {
      const items = Array(item)

  localStorage.setItem('yourItems', JSON.stringify(items))
  }
}



  protected searchFocused = signal(false);

  protected testList = signal<CsItem[]>(JSON.parse(localStorage.getItem('skinportItems')!))





}
