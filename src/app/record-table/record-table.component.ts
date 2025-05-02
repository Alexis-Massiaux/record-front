import {AfterViewInit, Component, ViewChild} from '@angular/core';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import {MatSort, MatSortModule} from '@angular/material/sort';

import {Record} from './record.model'

const RECORDS_DATA: Record[] = [
  {name: 'test', description: 'test desc', categories: ['tabtest', 'tabtest2'], date: new Date()}
];

@Component({
  selector: 'app-record-table',
  imports: [MatTableModule, MatSortModule],
  templateUrl: './record-table.component.html',
  styleUrl: './record-table.component.scss'
})
export class RecordTableComponent implements AfterViewInit {

  dataSource = new MatTableDataSource(RECORDS_DATA);
  displayedColumns: string[] = ['name', 'description', 'categories', 'date'];

  @ViewChild(MatSort) sort!: MatSort;

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }

}
