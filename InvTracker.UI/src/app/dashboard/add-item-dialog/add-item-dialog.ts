import { Component, computed, signal, ChangeDetectionStrategy, OnInit, output, inject } from '@angular/core';
import { CsItem } from '../../shared/types/types';
import {FormsModule} from '@angular/forms';
import { Numberinput } from '../../shared/ui/numberinput/numberinput';
import {form, FormField, pattern, required} from '@angular/forms/signals';
import { Items } from '../../shared/services/items';

interface AddData {
  quantity: string;
  price: string;
}


@Component({
  selector: 'app-add-item-dialog',
  imports: [FormsModule, FormField, Numberinput],
  changeDetection: ChangeDetectionStrategy.Eager,
  templateUrl: './add-item-dialog.html',
})
export class AddItemDialog {
  public itemSerice = inject(Items)

  //ToDo: richtigen datentypen anlegen
  protected selectedItem = signal<any>(null)
  protected testList = signal<CsItem[]>(JSON.parse(localStorage.getItem('skinportItems')!))

  ngOnInit() {
    // console.log(this.itemSerice.itemList())
  }

  public addModel = signal<AddData>({
    quantity: '',
    price: '',
  });

  public addForm = form(this.addModel, (schemaPath) => {
    required(schemaPath.quantity, {message: 'Die Anzahl fehlt'});
    required(schemaPath.price, {message: 'Der Preis fehlt'});
    pattern(schemaPath.price, /^\d+(?:[.,]\d{1,2})?$/, {message: 'falsches Preisformat!!!'})
    pattern(schemaPath.quantity, /^\d+$/, {message: 'falsches Preisformat!!!'})

  });

  protected searchTerm = signal('')

  protected filteredList = computed(() => {
    return this.testList().filter(e => {
      if(e.market_hash_name.toLocaleLowerCase().includes(this.searchTerm())) {
        return e;
      }
      return
    })
  }) 

    protected filteredList2 = computed(() => {
    return this.itemSerice.allItemsNames().filter(e => {
      if(e.includes(this.searchTerm())) {
        return e;
      }
      return
    })
  }) 

  protected test() {
    console.log("test")
  }

  // finden vom itemobjekt
protected addItem(item: string) {

  const it = this.itemSerice.allItems().find(e => {
      return e.display_name === item
  }

)

this.selectedItem.set(it)

  // const storedItems = localStorage.getItem('yourItems');

  // if(storedItems) {
  // const items = Array(...JSON.parse(storedItems), item);
  //   localStorage.setItem('yourItems', JSON.stringify(items))
  // } else {
  //     const items = Array(item)

  // localStorage.setItem('yourItems', JSON.stringify(items))
  // }
}



  protected searchFocused = signal(false);




  public closeModal = output();

  closeDialog() {
    this.closeModal.emit()
  }


}
