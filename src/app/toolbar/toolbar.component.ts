import { Component } from '@angular/core';
import { CategoriesEnum } from '../shared/constants/categories';
import { AppService } from '../app.service';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss'],
})
export class ToolbarComponent {
  categories = Object.values(CategoriesEnum);

  constructor(private service: AppService) {}

  onCategorySelect(event: any): void {
    this.service.selectCategory(event.value);
    this.service.getRequestNewsFeedData(1);
  }

  onSearchClick(searchTerm: string): void {
    this.service.selectCategory(searchTerm);
    this.service.getRequestNewsFeedData(1);
  }
}
