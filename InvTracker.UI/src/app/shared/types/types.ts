export interface CsItem {
  market_hash_name: string;
  min_price: number;
}

//itemtype 
export interface CsItem2 {
  itemType: string;

  skinname: string;
}




export type Conditions = 
        "Factory New" |
        "Minimal Wear" |
        "Field-Tested" |
        "Well-Worn" |
        "Battle-Scarred"


export interface IntemVariant {    
        condition: Conditions | null,
        market_hash_name: string,
        url: string 
      }

export interface SchemaItem {
  display_name: string;
  weapon_type: string;
  rarity: "consumer" | "industrial" | "mil-spec" | "restricted" | "classified" | "covert" | "extraordinary" | "contraband";
  conditions: Conditions[]
  normal: IntemVariant[] | null;
  stattrak: IntemVariant[] | null;
  souvenir: IntemVariant[] | null;
}


//Inventory item
export interface Usersitem {
  name: string,
  condition: 'Factory New' | 'Minimal Wear' | 'Field-Tested' | 'Well-Worn' | 'Battle-Scarred'
  stattrak: boolean,
  souvenir: boolean
  quantity: number | string,
  price: number | string
}
