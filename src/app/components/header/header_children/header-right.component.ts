import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header-right',
  template: `
    <div class='flex items-center justify-end gap-x-3 overflow-hidden'>
      <a href='https://github.com/UCB52' target="_blank"><i class="i_flip_style_and_animation fa-brands fa-github text-3xl"></i></a>
      <a href='linkedin.com/in/uğurcan-baş-84b91a206' target="_blank"><i class="i_flip_style_and_animation fa-brands fa-linkedin text-3xl"></i></a>
      <a href='https://www.instagram.com/ugurcanbas_/' target="_blank"><i class="i_flip_style_and_animation fa-brands fa-instagram text-3xl"></i></a>
    </div>
  `,
  styles: [
  ]
})
export class HeaderRightComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
