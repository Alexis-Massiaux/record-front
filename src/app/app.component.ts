import {Component} from '@angular/core';
import {RecordTableComponent} from './record-table/record-table.component';

@Component({
  selector: 'app-root',
  imports:[RecordTableComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'record-front';
}
