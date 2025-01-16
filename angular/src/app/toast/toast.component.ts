import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-toast',
  templateUrl: './toast.component.html',
  styleUrls: ['./toast.component.css']
})
export class ToastComponent implements OnInit, OnDestroy {
  @Input() mensaje: string = '';  // Mensaje que se pasará al componente
  @Input() tipo: string = '';  // Tipo de mensaje: 'success' o 'error'
  mostrar: boolean = false;  // Controla si la notificación debe mostrarse

  private timer: any;

  constructor() {}

  ngOnInit(): void {
    this.mostrar = true;
    this.timer = setTimeout(() => {
      this.mostrar = false;  // Ocultar la notificación después de 3 segundos
    }, 3000); // 3000ms = 3 segundos
  }

  ngOnDestroy(): void {
    if (this.timer) {
      clearTimeout(this.timer);
    }
  }
}
