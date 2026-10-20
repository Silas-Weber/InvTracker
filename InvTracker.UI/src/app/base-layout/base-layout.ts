import { Component } from '@angular/core';
import { App } from '../app';
import { RouterOutlet } from '@angular/router';
import { Header } from './header/header';
import { Dashboard } from '../dashboard/dashboard';

@Component({
  selector: 'app-base-layout',
  imports: [RouterOutlet, Header, Dashboard],
  templateUrl: './base-layout.html',
  host: {
    class: 'block min-h-screen bg-background-ofwhite'
  }
})
export class BaseLayout {

}
