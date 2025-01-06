import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { IUser } from 'src/app/core/models/user/user.model';
import { SessionDataService } from 'src/app/shared/services/sessionData.service';
import { UtilsService } from 'src/app/shared/services/utils.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit, OnDestroy {

  user?: IUser;
  private destroy$ = new Subject<void>();

  constructor(private sessionDataService: SessionDataService,
    private utilsService: UtilsService
    ) { }

  ngOnInit(): void {
    this.sessionDataService.userSub$
    .pipe(takeUntil(this.destroy$))
    .subscribe(user => this.user = user);
  }

  ngOnDestroy(): void {
    this.utilsService.unsubscribe(this.destroy$);
  }

}
