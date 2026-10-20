import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { BaseLayout } from './base-layout/base-layout';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, BaseLayout],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('CsStonks');
}
