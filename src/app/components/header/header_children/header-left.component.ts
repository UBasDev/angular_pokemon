import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header-left',
  template: `
    <div class='flex items-center justify-between'>
      <a [routerLink]="['/all_pokemons']"><i class="fa-brands fa-angular text-5xl active:translate-y-0.5" title='U_C_B' alt='homepage'></i></a>
      <div class='flex items-center justify-between gap-x-3'>
      <a class='button_style_and_animation1' routerLinkActive='active_nav_tab' [routerLink]="['/all_pokemons']">All Pokemons</a>
      <a class='button_style_and_animation1' routerLinkActive='active_nav_tab' [routerLink]="['/abilities']">Abilities</a>
      <a class='button_style_and_animation1' routerLinkActive='active_nav_tab' [routerLink]="['/about']">About me</a>
      </div>
    </div>
  `,
  styles: [
  ]
})
export class HeaderLeftComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
