import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { Subject, takeUntil } from 'rxjs';
import { UserService } from 'src/app/core/entities/user/User.service';
import { IUser } from 'src/app/core/models/user/user.model';
import { ResponsiveService } from 'src/app/shared/services/responsive.service';
import { SessionDataService } from 'src/app/shared/services/sessionData.service';
import { UtilsService } from 'src/app/shared/services/utils.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit, OnDestroy {

  @Output() onMenuClick = new EventEmitter<boolean>(false);

  private destroy$ = new Subject<void>();
  user?: IUser;
  items: MenuItem[] = [];
  showDialogAccount: boolean = false;
  isMobile: boolean = false;
  menuOpen: boolean = false;

  constructor(private sessionDataService: SessionDataService,
    private utilsService: UtilsService,
    private userService: UserService,
    private responsiveService: ResponsiveService,
    ) { }

  ngOnInit(): void {
    this.sessionDataService.userSub$
    .pipe(takeUntil(this.destroy$))
    .subscribe(user => this.user = user);
    this.setMenuOptions();

    this.observableWidth();
  }

  ngOnDestroy(): void {
    this.utilsService.unsubscribe(this.destroy$);
  }

  emitOnMenuClick(event: boolean) {
    this.onMenuClick.emit(event);
  }

  setMenuOptions() {
    this.items = [
      {
        label: 'Opções',
        items: [
          {
            label: 'Conta',
            icon: 'pi pi-user',
            command: () => this.handleVisibilityAccountModal()
          },
          {
          label: 'Sair',
          icon: 'pi pi-sign-out',
          command: () => this.onLogout()
        },
        ]
    }
    ];
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
    this.userService.logout();
  }

  handleVisibilityAccountModal() {
    this.showDialogAccount = !this.showDialogAccount;
  }

  handleVisibilityMenu() {
    this.menuOpen = !this.menuOpen;
    this.onMenuClick.emit(this.menuOpen);
  }

  private observableWidth() {
    this.responsiveService.isMobile$
    .pipe(takeUntil(this.destroy$))
    .subscribe(value => {
      this.isMobile = value;
      if (!this.isMobile) this.menuOpen = false;
    });
  }
}
