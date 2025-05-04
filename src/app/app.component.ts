import {Component} from '@angular/core';
import {RecordTableComponent} from './record-table/record-table.component';
import { MAT_DATE_LOCALE } from '@angular/material/core';

@Component({
  selector: 'app-root',
  imports:[RecordTableComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  providers: [
    { provide: MAT_DATE_LOCALE, useValue: 'fr-FR' }
  ],
})
export class AppComponent {
  title = 'record-front';
}
