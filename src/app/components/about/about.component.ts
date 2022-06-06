import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-about',
  template: `
    <div class='grid grid-cols-24 px-1 py-3'>            
      <div class='order-2 xl:order-1 col-span-24 xl:col-span-12'>
        <h1>Hello this is Uğurcan.</h1>
        <p class='inline'>I am a web developer who loves Angular. This is a simple project which includes all pokemon data. I am using a free Pokemon API so that provides all pokemon data to me. Here is the link you can follow </p><a href='https://pokeapi.co/'><i class="fa-solid fa-arrow-up-right-from-square text-2xl"></i></a>        
        <div>
        <p class='inline'>If you interest offerring a job, you can choose one of the links from top-right of screen or you can contact me via mail </p>
        <a [href]="personal_mail"><i class="fa-solid fa-arrow-up-right-from-square text-2xl"></i></a>
        </div>
      </div>      
      <div class='order-1 xl:order-2 col-span-24 xl:col-span-12 flex items-center justify-center'>
        <iframe src="https://giphy.com/embed/13HgwGsXF0aiGY" frameBorder="0" allowFullScreen></iframe>
        <iframe src="https://giphy.com/embed/Dh5q0sShxgp13DwrvG" frameBorder="0" allowFullScreen></iframe>
      </div>
    </div>
  `,
  styles: [
  ]
})
export class AboutComponent implements OnInit {
  personal_mail: string = 'mailto:ugurcanbas52@hotmail.com'
  constructor() { }

  ngOnInit(): void {
  }

}
