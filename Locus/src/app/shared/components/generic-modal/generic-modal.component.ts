import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Button } from 'primeng/button';
import { NgIf } from '@angular/common';
import { PrimeTemplate } from 'primeng/api';
import { DialogModule } from 'primeng/dialog';
import { ModalStyleClassEnum } from 'src/app/core/enums/modal.style.enum';

@Component({
    selector: 'app-generic-modal',
    templateUrl: './generic-modal.component.html',
    styleUrls: ['./generic-modal.component.scss'],
    standalone: true,
    imports: [DialogModule, PrimeTemplate, NgIf, Button]
})
export class GenericModalComponent implements OnInit {

  @Input({ required: true }) visible = false;
  @Input({ required: true }) header? = '';
  @Input() style: any = null;
  @Input() showConfirmButton = true;
  @Input() showCancelButton = true;
  @Input() confirmLabel = 'Salvar';
  @Input() cancelLabel = 'Cancelar';
  @Input() cancelButtonStyleClass = 'p-button-text p-button-danger';
  @Input() confirmButtonStyleClass = 'p-button-primary';
  @Input() isDelete = false;
  @Input() onLoading = false;
  @Input() modalStyle: ModalStyleClassEnum = ModalStyleClassEnum.MEDIUM;

  @Output() onClose = new EventEmitter();
  @Output() onConfirm = new EventEmitter();
  @Output() onVisibleChange = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  emitClose() {
    this.onClose.emit();
  }

  emitConfirm() {
    this.onConfirm.emit();
  }

  emitVisibleChange() {
    this.onVisibleChange.emit();
  }

}
