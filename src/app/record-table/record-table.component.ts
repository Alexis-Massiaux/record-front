import {AfterViewInit, Component, ViewChild} from '@angular/core';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import {MatSort, MatSortModule} from '@angular/material/sort';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';

import {Record} from './record.model'

const RECORDS_DATA: Record[] = [
  {name: 'test', description: 'test desc', categories: ['tabtest', 'tabtest2'], date: new Date()}
];

@Component({
  selector: 'app-record-table',
  imports: [MatTableModule, MatSortModule, MatInputModule, MatFormFieldModule],
  templateUrl: './record-table.component.html',
  styleUrl: './record-table.component.scss'
})
export class RecordTableComponent implements AfterViewInit {

  dataSource = new MatTableDataSource(RECORDS_DATA);
  displayedColumns: string[] = ['name', 'description', 'categories', 'date'];

  @ViewChild(MatSort) sort!: MatSort;

  ngOnInit() {
    this.dataSource.filterPredicate = this.customFilterPredicate.bind(this);
  }

  customFilterPredicate(data: Record, filter: string): boolean {
    const filterValue = filter.trim().toLowerCase();
    return data.name.toLowerCase().includes(filterValue) ||
      data.description.toLowerCase().includes(filterValue);
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

}
