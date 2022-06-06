import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AllPokemons } from '../models/all_pokemons.model';
import { PokemonService } from '../services/pokemon.service';

@Component({
  selector: 'app-home',
  template: `
    <div class="grid grid-cols-24 grid-flow-row">
    <div class='col-span-24 text-center md:my-3'>
      <h2>{{title | uppercase}}</h2>
    </div>
    <div class="col-span-24">
      <div *ngIf='all_pokemons' class="grid grid-cols-24 grid-flow-row gap-x-3 gap-y-3 px-3">
        <div *ngFor="let pokemon of all_pokemons['results']; index as index"
          class='pokemons col-span-12 md:col-span-8 xl:col-span-6 2xl:col-span-4 rounded-md p-3 bg-blue-500 hover:bg-blue-300'>
          <div class='flex flex-col'>
            <p class='text-xs md:text-md tooltip_wrapper w-max relative flex justify-center items-center'>
              {{pokemon_name}} :&nbsp;<a [routerLink]="['pokemon/'+(index+1)]"
                class='text-lg font-bold hover:underline decoration-double decoration-1'>{{pokemon.name |
                titlecase}}</a>
              <span style='bottom:100%; max-width:180px;'
                class='tooltip hidden absolute w-max h-max max-h-max bg-white text-xs px-2 py-1 md:px-4 md:py-2 rounded-md z-10'>{{tooltip_text_by_name}}</span>
            </p>
            <p class='tooltip_wrapper w-max text-xs md:text-sm relative flex justify-start items-center '>ID :&nbsp;<a
                [routerLink]="['pokemon/'+(index+1)]"
                class='font-bold hover:underline decoration-double decoration-1'>{{index+1}}</a>
              <span style='bottom:100%;max-width:180px;'
                class='hidden tooltip absolute w-max h-max max-h-max bg-white text-xs px-2 py-1 md:px-4 md:py-2 rounded-md z-10'>{{tooltip_text_by_id}}</span>
            </p>
            <a [routerLink]="['pokemon/'+(index+1)]"
              class='w-max cursor-pointer hover:text-blue-700 text-xs hover:underline decoration-double decoration-1 underline-offset-0 active:translate-y-0.5'>Go
              to details >></a>
          </div>
        </div>
        <div class='flex items-center justify-center col-span-12 md:col-span-8 xl:col-span-6 2xl:col-span-4 rounded-md p-3'>
                  <button (click)='increase_limit_parameter()' class='button_style_and_animation1'>More Pokemons...</button>
        </div>
      </div>
    </div>
  </div>
  <div *ngIf='spinner_boolean' class='spinner_wrapper'>
<div class='spinner_background'></div>
<div class='spinner'></div>
</div>
  `,
  styles: [
    `    
    .tooltip_wrapper:hover .tooltip{
      display:inline
    }
    `
  ],
  providers:[PokemonService]
})
export class HomeComponent implements OnInit, OnDestroy {
  title:string='Pokemons'
  pokemon_name:string='Pokemon Name'
  tooltip_text_by_name:string = 'You can also search the pokemon by NAME'
  tooltip_text_by_id:string = 'You can also search the pokemon by ID'
  all_pokemons!:AllPokemons
  spinner_boolean:boolean=false
  private all_pokemons_initial_subscription!:Subscription
  private all_pokemons_limit_increase_subscription!:Subscription
  private initial_limit_parameter:number = 50
  constructor(private pokemonService:PokemonService) { }  

  ngOnInit(): void {
    this.all_pokemons_initial_subscription = this.pokemonService.get_pokemon_list().subscribe({
      next:(response:AllPokemons)=>{
        this.spinner_boolean=true
        this.all_pokemons = response
      },
      complete:()=>{
        this.spinner_boolean=false
      }
    })    
  }

  ngOnDestroy(): void {
    if(this.all_pokemons_initial_subscription){
      this.all_pokemons_initial_subscription.unsubscribe()
    }
    if(this.all_pokemons_limit_increase_subscription){
      this.all_pokemons_limit_increase_subscription.unsubscribe()
    }
  }
  increase_limit_parameter(){
    let current_screen_y_coordinate = window.pageYOffset
    this.initial_limit_parameter+=50
    this.all_pokemons_limit_increase_subscription = this.pokemonService.get_pokemon_list(this.initial_limit_parameter).subscribe({
      next:(response:AllPokemons)=>{
        this.spinner_boolean=true
        this.all_pokemons = response
      },
      complete:()=>{        
        setTimeout(()=>{window.scrollTo({top:current_screen_y_coordinate, behavior:'auto'})},1)
        this.spinner_boolean=false
      }
    })    
  }  

}
