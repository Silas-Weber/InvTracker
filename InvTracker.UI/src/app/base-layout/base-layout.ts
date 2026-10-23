import { Component, ChangeDetectionStrategy } from '@angular/core';
import { Header } from './header/header';
import { Dashboard } from '../dashboard/dashboard';

@Component({
  selector: 'app-base-layout',
  imports: [Header, Dashboard],
  templateUrl: './base-layout.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  host: {
    class: 'block min-h-screen bg-background-ofwhite'
  }
})
export class BaseLayout {

}
