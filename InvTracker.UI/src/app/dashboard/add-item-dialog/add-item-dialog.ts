import { Component, computed, signal, ChangeDetectionStrategy, output, inject, Input, Output } from '@angular/core';
import { Conditions, CsItem, SchemaItem, Usersitem } from '../../shared/types/types';
import {FormsModule} from '@angular/forms';

import { form, FormField, pattern, required, submit, FormRoot, applyEach } from '@angular/forms/signals';
import { Items } from '../../shared/services/items';
import { Searchbar } from '../../shared/ui/searchbar/searchbar';

interface AddItemModel {
  name: string;
  quantity: string;
  price: string;
  condition: string;
  stattrak: boolean;
  souvenir: boolean;
}

@Component({
  selector: 'app-add-item-dialog',
  imports: [FormsModule, FormField, FormRoot, Searchbar],
  changeDetection: ChangeDetectionStrategy.Eager,
  templateUrl: './add-item-dialog.html',
})
export class AddItemDialog {
  public itemSerice = inject(Items)


  protected selectedItem = signal<SchemaItem | null>(null)
  protected itemTiles = signal<SchemaItem[]>([])
  protected selectedItems = signal<Usersitem[]>([])

  protected totalInvest = computed<any>(() => {
    return  this.addModel().reduce((a,b) => {
        return a + Number(b.price.replace(',', '.')) * Number(b.quantity)
      },0).toFixed(2)
  })

  protected searchFocused = signal(true);
  protected listVisible = signal(false);





  public addModel = signal<AddItemModel[]>([]);

  public addForm = form(this.addModel, (schemaPath) => {
    applyEach(schemaPath, (itemPath) => {
      required(itemPath.quantity, {message: 'Die Anzahl fehlt'});
      required(itemPath.price, {message: 'Der Preis fehlt'});
      pattern(itemPath.price, /^\d+(?:[.,]\d{1,2})?$/, {message: 'falsches Preisformat!!!'})
      pattern(itemPath.quantity, /^\d+$/, {message: 'falsches Preisformat!!!'})
     }) }, {submission: {
    action: async (field) => {

  let alleItems = localStorage.getItem('inventory');

  if(alleItems){
      alleItems = JSON.parse(alleItems);
  }


  this.selectedItems.update(e => {
    const value = field().value();

    const usersItem = value.map(e => ({
      name: e.name,
      condition: e.condition as Conditions,
      stattrak: e.stattrak,
      souvenir: e.souvenir,
      quantity: +e.quantity,
      price: +e.price,
    })
    )
      console.log("alle Items", alleItems)
    console.log("e", e)
    console.log("fieldValue", field().value())
    console.log("userItem", usersItem)
    if(!e) {
      return usersItem
    }
    else {
      if(alleItems === null) {
      return [...e, ...usersItem] as Usersitem[]
      }
      return [...alleItems, ...e, ...usersItem] as Usersitem[]
    }
  })
  localStorage.setItem('inventory', JSON.stringify(this.selectedItems()))
  console.log('addedToInventory')
    }
  }
}
);

  protected searchTerm = signal('')

    protected filteredList = computed(() => {
    return this.itemSerice.allItemsNames().filter(e => {
      if(e.toLocaleLowerCase().includes(this.searchTerm().toLocaleLowerCase())) {
        return e;
      }
      return
    })
  }) 

  


  // finden und Anzeigen vom item im Modal
protected addItem(item: string) {

  const searchedItem = this.itemSerice.allItems().find(e => e.display_name === item) as SchemaItem
const newItem = {
    name: item,
    quantity: '',
    price: '',
    condition: '',
    stattrak: false,
    souvenir: false,
  }

  this.addModel.update(e => {
    console.log("alle e", e);
    console.log("new Item", newItem)
    return    [...e, newItem]
  }
)
  

this.selectedItem.set(searchedItem!)


this.listVisible.set(false)


}



onDeleteItem(index: any) {
  this.addModel.update(e => e.filter((_, i) => i !== index))
}


public closeModal = output();

  closeDialog() {
    this.closeModal.emit();
  }

enabled = false;

}
