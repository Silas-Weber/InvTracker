import { Component, OnDestroy } from '@angular/core';
import { Searchbar } from '../../shared/ui/searchbar/searchbar';

@Component({
  selector: 'app-add-item-dialog',
  imports: [Searchbar],
  templateUrl: './add-item-dialog.html',
})
export class AddItemDialog implements OnDestroy {



  ngOnDestroy(): void {
    console.log("destroyed")
  }
}
