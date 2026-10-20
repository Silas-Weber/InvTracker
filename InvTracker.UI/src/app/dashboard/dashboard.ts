import { Component, inject, OnInit, signal } from '@angular/core';
import { Steam } from '../shared/steam';
import { Button } from '../shared/ui/button/button';
import { Searchbar } from '../shared/ui/searchbar/searchbar';
import { AddItemDialog } from './add-item-dialog/add-item-dialog';

@Component({
  selector: 'app-dashboard',
  imports: [Button, Searchbar, AddItemDialog],
  templateUrl: './dashboard.html',
})
export class Dashboard implements OnInit{

  protected totalValue = signal<string>('2.524,23$')
  protected steam = inject(Steam)

  protected addItemDialog = signal<boolean>(false)

    ngOnInit(): void {
      this.steam.getSkinportItems()
      };


  toggleDialog() {
    this.addItemDialog.set(!this.addItemDialog())
  }
  }
