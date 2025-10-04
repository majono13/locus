import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss'],
    standalone: true
})
export class HomeComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    setTimeout(() => {
      const teste = document.querySelector("#path22") as any;
      console.log(teste.getTotalLength())
    }, 2000)
  }

}
