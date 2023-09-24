import { Component, OnInit } from '@angular/core';
import { AppService } from '../app.service';
import { Observable } from 'rxjs';
import { NewsFeedResponse } from '../shared/interfaces/newsFeedResponse';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-news-table',
  templateUrl: './news-table.component.html',
  styleUrls: ['./news-table.component.scss'],
})
export class NewsTableComponent implements OnInit {
  newsFeed$: Observable<NewsFeedResponse> = new Observable();
  currentPageIndex: number = 0;

  constructor(private service: AppService) {}

  ngOnInit(): void {
    this.getData();
  }

  onPageChange(event: PageEvent): void {
    this.currentPageIndex = event.pageIndex;
    this.getData();
  }

  private getData(): void {
    this.service.getRequestNewsFeedData(this.currentPageIndex + 1);
    this.newsFeed$ = this.service.getNewsFeedData();
  }
}
