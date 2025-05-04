import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {MatSort, MatSortModule} from '@angular/material/sort';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSelectModule} from '@angular/material/select';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {provideNativeDateAdapter} from '@angular/material/core';

import {Record} from './record.model'
import {RecordService} from './services/record.service';

@Component({
  selector: 'app-record-table',
  imports: [MatTableModule, MatPaginatorModule, MatSortModule, MatInputModule, MatFormFieldModule, MatSelectModule, MatDatepickerModule],
  templateUrl: './record-table.component.html',
  providers: [provideNativeDateAdapter()],
  styleUrl: './record-table.component.scss'
})
export class RecordTableComponent implements OnInit, AfterViewInit {

  dataSource: MatTableDataSource<Record> = new MatTableDataSource();
  displayedColumns: string[] = ['name', 'description', 'categories', 'date'];
  categories: string[] = ['categoryTest1', 'categoryTest2' ]
  filterValue: string = '';
  selectedCategory: string | null = null;
  selectedDate: Date | null = null;

  constructor(private recordService: RecordService) {
  }

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  ngOnInit() {
    this.recordService.getAllRecords().subscribe(records => this.dataSource.data = records);
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.setFilterPredicateToDataSource()
  }

  private setFilterPredicateToDataSource() {
    this.dataSource.filterPredicate = (data: Record) => {
      return this.isLineMatchWithTextFilter(data)
        && this.isLineMatchWithCategoryFilter(data)
        && this.isLineMatchWithDateFilter(data);
    };
  }

  private isLineMatchWithTextFilter(data: Record) {
    return this.filterValue ?
      (data.name.toLowerCase().includes(this.filterValue)
        || data.description.toLowerCase().includes(this.filterValue))
      : true;
  }

  private isLineMatchWithCategoryFilter(data: Record) {
    return this.selectedCategory ?
      data.categories.map(category => category.toLowerCase())
        .includes(this.selectedCategory.toLowerCase())
      : true;
  }

  private isLineMatchWithDateFilter(data: Record) {
    if (!this.selectedDate) {
      return true;
    }

    const selectedDateString = this.selectedDate.toLocaleDateString('fr-FR');
    const dataDateString = new Date(data.date).toLocaleDateString('fr-FR');

    return dataDateString === selectedDateString;
  }

  protected applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.filterValue = filterValue.trim().toLowerCase();
    this.launchFilterAction();
  }

  protected onCategoryChange(category: string | null) {
    this.selectedCategory = category;
    this.launchFilterAction();
  }

  protected onDateChange(event: any) {
    this.selectedDate = event.value;
    this.launchFilterAction();
  }

  /**
   * Setting something on the filter variable will launch the filter action
   * without which nothing happens
   */
  private launchFilterAction() {
    this.dataSource.filter = 'filter';
  }

}
