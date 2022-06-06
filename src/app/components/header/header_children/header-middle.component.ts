import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header-middle',
  template: `
    <div class='flex items-center justify-center md:gap-x-3'>
      <input [formControl]='get_search_input' type='text' [placeholder]="search_input_placeholder">
      <button (click)='test1()' class='button_style_and_animation' type='button'>Search</button>
    </div>
  `,
  styles: [
  ]
})
export class HeaderMiddleComponent implements OnInit {
  search_input_placeholder:string='Search pokemons..'
  constructor(private formBuilder:FormBuilder, private router:Router) { }

  ngOnInit(): void {
  }
  search_input:FormControl = this.formBuilder.control('',Validators.compose([Validators.required,Validators.maxLength(30),Validators.minLength(1)]))

  get get_search_input(){
    return this.search_input
  }
  test1(){
    this.router.navigate(['/pokemon/'+this.get_search_input.value])
  }
}
