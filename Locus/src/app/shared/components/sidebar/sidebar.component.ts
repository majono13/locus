import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MENU_OPTIONS, MenuOptions } from 'src/app/core/consts/menu-options.const';
import { NgFor, NgClass, NgIf } from '@angular/common';

@Component({
    selector: 'app-sidebar',
    templateUrl: './sidebar.component.html',
    styleUrls: ['./sidebar.component.scss'],
    standalone: true,
    imports: [NgFor, NgClass, NgIf]
})
export class SidebarComponent implements OnInit {

  menu = MENU_OPTIONS;
  expandedItemId: string;
  activeItemId: string;

  constructor(private router: Router) { }

  ngOnInit() {
    this.getActiveItem();
  }

  onClickItem(item: MenuOptions) {
  
    if (item.main && item.children.length > 0) {
      if (this.expandedItemId !== item.id) this.expandedItemId = item.id;
      else this.expandedItemId = null;
    } else {
      this.activeItemId = item.id;
      this.router.navigate([item.router]);
    }
  }

  private getActiveItem() {
    const url = this.router.url;
    for (let item of this.menu) {
      if (item.router === url) {
        this.activeItemId = item.id;
        return;
      }
      const sub = item.children.find(c => c.router === url);

      if (sub) {
        this.activeItemId = sub.id;
        return;
      }
    }
  }

}
