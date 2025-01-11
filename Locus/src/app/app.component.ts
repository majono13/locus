import { Component, HostListener, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter, map } from 'rxjs';
import { ResponsiveService } from './shared/services/responsive.service';
import { SessionDataService } from './shared/services/sessionData.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  title = 'Locus';
  showSidebar: boolean = false;
  isLogged: boolean = false;

  constructor(
    private router: Router,
    private responsiveService: ResponsiveService,
    private sessionDataService: SessionDataService
    ) {
  }

  ngOnInit(): void {
    this.onResize();
    this.checkRouter();
    this.checkSession();
  }

  private checkRouter() {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        const router = event.urlAfterRedirects.split('/');
        const menuRouters = ['commun', 'admin'];
        const width = window.innerWidth;
        this.showSidebar = router.some(route => menuRouters.includes(route)) && width > 992;
      }
    });
  }

  @HostListener('window: resize', ['$event'])
  onResize(event?: Event) {
    const width = window.innerWidth;
    this.responsiveService.screenWidth$.next(width);
    this.responsiveService.isMobile$.next(width <= 992);

    if (width > 992 && this.isLogged) this.showSidebar = true;
    else this.showSidebar = false;
  }

  handleVisibilitySidebar() {
    this.showSidebar = !this.showSidebar;
  }

  private checkSession() {
    this.sessionDataService.userSub$.subscribe(user => {
      this.isLogged = user?.id !== null && user?.id !== undefined;
    });
  }
}
