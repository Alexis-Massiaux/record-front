import {Component} from '@angular/core';
import {MatTableModule} from '@angular/material/table';
import {Record} from './record.model'

const RECORDS_DATA: Record[] = [
  {name: 'test', description: 'test desc', categories: ['tabtest', 'tabtest2'], date: new Date()}
];

@Component({
  selector: 'app-record-table',
  imports: [MatTableModule],
  templateUrl: './record-table.component.html',
  styleUrl: './record-table.component.scss'
})
export class RecordTableComponent {

  dataSource = RECORDS_DATA;
  displayedColumns: string[] = ['name', 'description', 'categories', 'date'];

}
