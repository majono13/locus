import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { StorageKeyEnum } from 'src/app/core/enums/storage-keys.enum';
import { IUser } from 'src/app/core/models/user/user.model';
import { ResponsiveService } from 'src/app/shared/services/responsive.service';
import { SessionDataService } from 'src/app/shared/services/sessionData.service';
import { UtilsService } from 'src/app/shared/services/utils.service';

@Component({
  selector: 'app-public-nav',
  templateUrl: './public-nav.component.html',
  styleUrls: ['./public-nav.component.scss']
})
export class PublicNavComponent implements OnInit, OnDestroy {

  @Input() currentUser?: IUser;
  @Output() onMenuClick = new EventEmitter<boolean>(false);
  isMobile: boolean = false;
  destroy$ = new Subject<void>();
  menuOpen: boolean = false;

  constructor(private utilsService: UtilsService,
    private router: Router,
    private responsiveService: ResponsiveService,
    private sessionData: SessionDataService
    ) { }

  ngOnInit(): void {
    this.observableWidth();
  }

  ngOnDestroy(): void {
    this.utilsService.unsubscribe(this.destroy$);
  }

  onLogout() {
    this.utilsService.confirm({
      header: 'Sair',
      message: 'Você será redirecionado para a tela de login. Deseja continuar?',
      accept: () => this.logout(),
      reject: () => {}
    });
  }

  private logout() {
    this.utilsService.clearStorage(StorageKeyEnum.ACTIVE);
    this.utilsService.clearStorage(StorageKeyEnum.TOKEN);
    this.sessionData.userSub$.next(null);
    this.router.navigate(['public']);
  }

  private observableWidth() {
    this.responsiveService.isMobile$
    .pipe(takeUntil(this.destroy$))
    .subscribe(value => {
      this.isMobile = value;
      if (!this.isMobile) this.menuOpen = false;
    });
  }

  handleVisibilityMenu() {
    this.menuOpen = !this.menuOpen;
    this.onMenuClick.emit(this.menuOpen);
  }

}
