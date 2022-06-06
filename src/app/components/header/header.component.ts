import { Component, HostListener, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  template: `
    <div (scroll)='onscroll()' [ngClass]="navbarfixed?'sticky_navbar bg-blue-900 rounded-none z-10':'not_sticky_navbar'" class="grid grid-cols-24 grid-flow-row bg-blue-500 rounded-md px-1 items-center">
      <div class="col-span-3 md:col-span-8"><app-header-left></app-header-left></div>
      <div class="col-span-15 md:col-span-8"><app-header-middle></app-header-middle></div>
      <div class="col-span-6 md:col-span-8"><app-header-right></app-header-right></div>
    </div>
  `,
  styles: [
  ]
})
export class HeaderComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
  navbarfixed:boolean = false;
@HostListener('window:scroll',['$event']) onscroll(){
  if(window.scrollY>60){
    this.navbarfixed=true;
  }
  else{
    this.navbarfixed=false;
  }
}
}
