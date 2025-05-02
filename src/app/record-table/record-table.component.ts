import {AfterViewInit, Component, ViewChild} from '@angular/core';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import {MatSort, MatSortModule} from '@angular/material/sort';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSelectModule} from '@angular/material/select';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {provideNativeDateAdapter} from '@angular/material/core';

import {Record} from './record.model'

const RECORDS_DATA: Record[] = [
  {name: 'test', description: 'test desc', categories: ['categoryTest1', 'categoryTest2'], date: new Date()},
  {name: 'tron', description: 'desc tron', categories: ['categoryTest1'], date: new Date()},
  {name: 'pokemon', description: 'pokemon desc', categories: ['categoryTest2'], date: new Date()}
];

@Component({
  selector: 'app-record-table',
  imports: [MatTableModule, MatSortModule, MatInputModule, MatFormFieldModule, MatSelectModule, MatDatepickerModule],
  templateUrl: './record-table.component.html',
  providers: [provideNativeDateAdapter()],
  styleUrl: './record-table.component.scss'
})
export class RecordTableComponent implements AfterViewInit {

  dataSource = new MatTableDataSource(RECORDS_DATA);
  displayedColumns: string[] = ['name', 'description', 'categories', 'date'];
  categories: string[] = ['categoryTest1', 'categoryTest2' ]
  filterValue: string = '';
  selectedCategory: string | null = null;
  selectedDate: Date | null = null;

  @ViewChild(MatSort) sort!: MatSort;

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.filterValue = filterValue.trim().toLowerCase();
    this.filterData();
  }

  onCategoryChange(category: string | null) {
    this.selectedCategory = category;
    this.filterData();
  }

  onDateChange(event: any) {
    this.selectedDate = event.value;
    this.filterData();
  }

  filterData() {
    this.dataSource.filterPredicate = (data: Record) => {
      return this.isLineMatchWithTextFilter(data)
        && this.isLineMatchWithCategoryFilter(data)
        && this.isLineMatchWithDateFilter(data);
    };
    this.dataSource.filter = 'filter';
  }

  isLineMatchWithTextFilter(data: Record) {
    return this.filterValue ?
      (data.name.toLowerCase().includes(this.filterValue)
        || data.description.toLowerCase().includes(this.filterValue))
      : true;
  }

  isLineMatchWithCategoryFilter(data: Record) {
    return this.selectedCategory ?
      data.categories.map(category => category.toLowerCase())
        .includes(this.selectedCategory.toLowerCase())
      : true;
  }

  isLineMatchWithDateFilter(data: Record) {
    if (!this.selectedDate) {
      return true;
    }

    const selectedDateString = this.selectedDate.toLocaleDateString('fr-FR');
    const dataDateString = data.date.toLocaleDateString('fr-FR');

    return dataDateString === selectedDateString;
  }

}
