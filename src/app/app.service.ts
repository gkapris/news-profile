import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpErrorResponse,
  HttpParams,
} from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { APIKey, GetNewsFeedURL } from './shared/constants/API related';
import { NewsFeedResponse } from './shared/interfaces/newsFeedResponse';
import { CategoriesEnum } from './shared/constants/categories';

@Injectable({
  providedIn: 'root',
})
export class AppService {
  private newsFeedData: Subject<NewsFeedResponse> = new Subject();
  private selectedCategory: CategoriesEnum | string = CategoriesEnum.GENERAL;

  constructor(private http: HttpClient) {}

  getNewsFeedData(): Observable<NewsFeedResponse> {
    return this.newsFeedData.asObservable();
  }

  getRequestNewsFeedData(pageIndex: number): void {
    const params = new HttpParams()
      .set('q', this.selectedCategory)
      .set('page', pageIndex.toString())
      .set('pageSize', '6')
      .set('apiKey', APIKey);

    this.http.get<NewsFeedResponse>(GetNewsFeedURL, { params }).subscribe(
      (response) => {
        this.newsFeedData.next(response);
      },
      (err: HttpErrorResponse) => {
        window.alert(`${err.status} ${err.statusText}`);
      }
    );
  }

  selectCategory(category: CategoriesEnum | string): void {
    this.selectedCategory = category;
  }
}
