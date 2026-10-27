import { Component, computed, signal, ChangeDetectionStrategy, output, inject, Input, Output } from '@angular/core';
import { Conditions, CsItem, SchemaItem, Usersitem } from '../../shared/types/types';
import {FormsModule} from '@angular/forms';

import { form, FormField, pattern, required, submit, FormRoot } from '@angular/forms/signals';
import { Items } from '../../shared/services/items';



@Component({
  selector: 'app-add-item-dialog',
  imports: [FormsModule, FormField, FormRoot],
  changeDetection: ChangeDetectionStrategy.Eager,
  templateUrl: './add-item-dialog.html',
})
export class AddItemDialog {
  public itemSerice = inject(Items)


  protected selectedItem = signal<SchemaItem | null>(null)
  protected selectedItems = signal<Usersitem[]>([])

  protected totalInvest = computed<any>(() => {
      const price = +this.addModel().price.replace(',', '.')
      const quantity = +this.addModel().quantity
    return (price * quantity).toFixed(2)
  })


  protected searchFocused = signal(true);
  protected listVisible = signal(false);



  public addModel = signal({
    name: '',
    quantity: '',
    price: '',
    condition: '',
    stattrak: false,
    souvenir: false,
  });

  public addForm = form(this.addModel, (schemaPath) => {
    required(schemaPath.quantity, {message: 'Die Anzahl fehlt'});
    required(schemaPath.price, {message: 'Der Preis fehlt'});
    pattern(schemaPath.price, /^\d+(?:[.,]\d{1,2})?$/, {message: 'falsches Preisformat!!!'})
    pattern(schemaPath.quantity, /^\d+$/, {message: 'falsches Preisformat!!!'})

  }, {submission: {
    action: async (field) => {
      console.log(field().value())
        let alleItems = localStorage.getItem('inventory');

  if(alleItems){
      alleItems = JSON.parse(alleItems);
  }

  this.selectedItems.update(e => {
    const value = field().value();

  

    const usersItem: Usersitem = {
      name: value.name,
      condition: value.condition as Conditions,
      stattrak: value.stattrak,
      souvenir: value.souvenir,
      quantity: +value.quantity,
      price: +value.price,

    }

    if(!e) {
      return [usersItem]
    }
    else {
      if(alleItems === null) {
      return [...e, usersItem] as Usersitem[]
      }
      return [...alleItems, ...e, usersItem] as Usersitem[]
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
  const searchedItem = this.itemSerice.allItems().find(e => e.display_name === item)
  this.addModel().name = item


              console.log(searchedItem)

this.selectedItem.set(searchedItem!)
this.listVisible.set(false)
}



onDeleteItem() {
  this.selectedItem.set(null)
    console.log(this.addModel())

    console.log(this.addForm())
    this.addForm().reset({
      name:'',
      quantity: '',
      price: '',
     condition: 'Factory New',
      stattrak: false,
      souvenir: false,
    })
}


public closeModal = output();

  closeDialog() {
    this.closeModal.emit();
  }

enabled = false;

}
