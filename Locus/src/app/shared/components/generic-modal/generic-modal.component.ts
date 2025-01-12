import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-generic-modal',
  templateUrl: './generic-modal.component.html',
  styleUrls: ['./generic-modal.component.scss']
})
export class GenericModalComponent implements OnInit {

  @Input() visible: boolean = false;
  @Input() header = '';
  @Input() style: any = null;
  @Input() showConfirmButton = true;
  @Input() showCancelButton = true;
  @Input() confirmLabel = 'Salvar';
  @Input() cancelLabel = 'Cancelar';
  @Input() cancelButtonStyleClass = 'p-button-text text-danger';
  @Input() confirmButtonStyleClass = 'p-button-primary';
  @Input() onLoading: boolean = false;

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
