import {Observable} from 'rxjs';
import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

import {Record} from '../record.model';

@Injectable({
  providedIn: 'root'
})
export class RecordService {

  private readonly hostUrl = "http://localhost:3089";

  constructor(private http: HttpClient) {
  }

  getAllRecords(): Observable<Record[]> {
    return this.http.get<Record[]>(this.hostUrl + '/records');
  }
}
