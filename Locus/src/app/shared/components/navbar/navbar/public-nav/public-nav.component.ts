import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StorageKeyEnum } from 'src/app/core/enums/storage-keys.enum';
import { IUser } from 'src/app/core/models/user/user.model';
import { UtilsService } from 'src/app/shared/services/utils.service';

@Component({
  selector: 'app-public-nav',
  templateUrl: './public-nav.component.html',
  styleUrls: ['./public-nav.component.scss']
})
export class PublicNavComponent implements OnInit {

  @Input() currentUser?: IUser;

  constructor(private utilsService: UtilsService,
    private router: Router
    ) { }

  ngOnInit(): void {
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
    this.router.navigate(['public']);
  }

}
