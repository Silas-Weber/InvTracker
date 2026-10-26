import { computed, OnInit, Service, signal } from '@angular/core';
import programItems from '../program_items.json';


interface ItemList {
  weapons: any[];
  gloves: any[];
  knifeskins: any[];
  weapon_cases: any[];
}






@Service()
export class Items {

public itemList = signal<ItemList>(programItems as ItemList);

public allItemsNames = computed(() =>
  Object.values(this.itemList()).flat().map(e => {
    return e.display_name ?? e.hashname
  })
);

public allItems = computed(() =>
  Object.values(this.itemList()).flat()
);


public weapons = this.itemList().weapons;
public gloves = this.itemList().gloves;
public knifeskins = this.itemList().knifeskins;
public weapon_cases = this.itemList().weapon_cases;



  constructor() {
    console.log("Serice")
    console.log(this.itemList())
    console.log(this.allItems())
    // console.log(this.weapons)
    // console.log(this.gloves)
    // console.log(this.knifeskins)
    // console.log(this.weapon_cases)

    for(const list in this.itemList()) {

      console.log(list)
    }
  }



}
