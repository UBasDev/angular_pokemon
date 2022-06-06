import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Subscription } from 'rxjs';
import { SinglePokemonData } from '../models/pokemon.model';
import { PokemonService } from '../services/pokemon.service';

@Component({
  selector: 'app-single-pokemon-detail',
  template: `
  <div class='single_pokemon_container gap-x-3 gap-y-3 px-3'>
    <div class='area_title text-center mt-3'>
      <h1 class='text-2xl font-bold'>
        <span>Pokemon Name: </span>
        <a class='font-bold cursor-pointer hover:underline decoration-double decoration-1 underline-offset-0 active:translate-y-0.5'
          [routerLink]="['/pokemon/'+current_pokemon.id]">{{current_pokemon.name | titlecase}}</a>
      </h1>
    </div>
    <div class='area_name overflow-hidden border-2 border-blue-700 rounded-md'>
      <img class=' hover:scale-110 cursor-pointer w-full' [alt]='current_pokemon.name' [title]='current_pokemon.name'
        [src]='current_pokemon.sprites.front_default'>
      <div class='grid grid-cols-24 grid-flow-row px-1'>
        <div class='col-span-24 text-center'>
          <h2 class='text-xl text-center'>Other Images: </h2>
        </div>
        <div class='col-span-24 flex items-center gap-x-1'>
          <h2 class='text-sm'>Males : </h2>
          <a target='_blank' *ngIf='current_pokemon.sprites.back_default' class='inline'
            [href]='current_pokemon.sprites.back_default'><i class="fa-solid fa-arrow-up-right-from-square"></i></a>
          <a target='_blank' *ngIf='current_pokemon.sprites.back_shiny' class='inline'
            [href]='current_pokemon.sprites.back_shiny'><i class="fa-solid fa-arrow-up-right-from-square"></i></a>
          <a target='_blank' *ngIf='current_pokemon.sprites.front_shiny' class='inline'
            [href]='current_pokemon.sprites.front_shiny'><i class="fa-solid fa-arrow-up-right-from-square"></i></a>
        </div>
        <div class='col-span-24 flex items-center gap-x-1'>
          <h2 class='text-sm whitespace-nowrap'>Female : </h2>
          <a target='_blank' *ngIf='current_pokemon.sprites.back_female' [href]='current_pokemon.sprites.back_female'><i
              class="fa-solid fa-arrow-up-right-from-square"></i></a>
          <a target='_blank' *ngIf='current_pokemon.sprites.back_shiny_female'
            [href]='current_pokemon.sprites.back_shiny_female'><i
              class="fa-solid fa-arrow-up-right-from-square"></i></a>
          <a target='_blank' *ngIf='current_pokemon.sprites.front_female'
            [href]='current_pokemon.sprites.front_female'><i class="fa-solid fa-arrow-up-right-from-square"></i></a>
          <a target='_blank' *ngIf='current_pokemon.sprites.front_shiny_female'
            [href]='current_pokemon.sprites.front_shiny_female'><i
              class="fa-solid fa-arrow-up-right-from-square"></i></a>
          <span class='font-semibold text-red-500 text-xs'
            *ngIf='!current_pokemon.sprites.back_female&&!current_pokemon.sprites.back_shiny_female&&!current_pokemon.sprites.front_female&&!current_pokemon.sprites.front_shiny_female'>There
            is no female images!</span>
        </div>
        <!-- <span>{{current_pokemon.sprites.other}}</span>
        <span>{{current_pokemon.sprites.versions}}</span> -->
      </div>
      <hr class='border-t-blue-700'>
      <h2 class='text-xl text-center'>{{pokemon_all_forms_text}}</h2>
      <div class='grid grid-cols-24 grid-flow-row px-1'>
        <div *ngFor='let form of current_pokemon.forms' class='col-span-24'>
          <div class='flex items-center gap-x-1'>
            <span class='text-xs'>{{pokemon_form_name_text}}</span>
            <a
              class='text-left font-bold text-md cursor-pointer hover:underline decoration-double decoration-1 underline-offset-0 active:translate-y-0.5'>{{form.name
              | titlecase}}</a>
            <!-- <p>{{form.url}}</p> Form tıklarsa URL-->
          </div>
        </div>
      </div>
      <hr class='border-t-blue-700'>
      <div class='grid grid-cols-24 grid-flow-row px-1'>
        <div class='col-span-24'>
          <h2 class='text-xl text-center'>Types:</h2>
        </div>
        <div *ngFor='let type of current_pokemon.types' class='col-span-24'>
          <div class='flex items-center gap-x-1'>
            <span class='text-xs'>Type Slot: </span>
            <span class='text-md font-bold '>{{type.slot}}</span>
          </div>
          <div class='flex items-center gap-x-1'>
            <span class='text-xs'>Type Name: </span>
            <span
              class='text-md font-bold cursor-pointer hover:underline decoration-double decoration-1 underline-offset-0 active:translate-y-0.5'>{{type.type.name
              | titlecase}}</span>
          </div>
          <!-- <span>{{type.type.url}}</span> Eğer type tıklarsa URL -->
        </div>        
      </div>
      <hr class='border-t-blue-700'>
      <div class='grid grid-cols-24 grid-flow-row px-1'>
        <div class='col-span-24'>
          <h2 class='text-xl text-center'>Species:</h2>
        </div>
        <div class='col-span-24'>
          <div class='flex items-center gap-x-1'>
            <span>Specy: </span><span class='font-bold cursor-pointer hover:underline decoration-double decoration-1 underline-offset-0 active:translate-y-0.5'>{{current_pokemon.species.name | titlecase}}</span>
            <!-- <span>Specy Name: </span><span>{{current_pokemon.species.url}}</span> Eğer species tıklarsa URL -->
          </div>
        </div>
      </div>
    </div>
    <div class='area_ability border-2 border-blue-700 rounded-md flex flex-col'>
      <h2 class='text-xl text-center py-1'>{{pokemon_abilities_text}}</h2>
      <hr class='border-t-blue-700'>
      <div *ngFor="let ability of current_pokemon.abilities; index as index"
        class='grid grid-cols-24 grid-flow-row items-center py-1 px-1'>
        <div class='col-span-24 xl:col-span-10'>
          <span class='text-sm'>{{pokemon_ability_name_text}}</span><a
            class='font-bold text-md cursor-pointer hover:underline decoration-double decoration-1 underline-offset-0 active:translate-y-0.5'>{{ability.ability.name
            | titlecase}}</a>
        </div>
        <!-- <p>{{ability.ability.url}}</p> Ability tıklarsa URL -->
        <div class='col-span-24 xl:col-span-8'>
          <span class='text-md'>{{pokemon_ability_is_hidden_text}}</span><span
            class='font-bold text-lg'>{{ability.is_hidden}}</span>
        </div>
        <div class='col-span-24 xl:col-span-6'>
          <span class='text-md'>{{pokemon_ability_ability_slot_text}}</span><span
            class='font-bold text-lg'>{{ability.slot}}</span>
        </div>
      </div>
      <h2 class='text-xl text-center py-1'>Basic Stats:</h2>
      <hr class='border-t-blue-700'>
      <div class='flex items-center px-1'>
        <span>Pokemon ID : </span>&nbsp;
        <a [routerLink]="['/pokemon/'+current_pokemon.id]"
          class='font-bold text-lg'>{{current_pokemon.id}}</a>
      </div>
      <div class='flex items-center px-1'>
        <span>Base Experience : </span>&nbsp;
        <span
          class='font-bold text-lg'>{{current_pokemon.base_experience}}</span>
      </div>
      <div class='flex items-center px-1'>
        <span>Height : </span>&nbsp;
        <span
          class='font-bold text-lg '>{{current_pokemon.height}}</span>
      </div>
      <div class='flex items-center px-1'>
        <span>Weight : </span>&nbsp;
        <span
          class='font-bold text-lg'>{{current_pokemon.weight}}</span>
      </div>
      <!-- <p>{{current_pokemon.location_area_encounters}}</p> Encounter tıklarsa URL -->
      <div class='flex items-center px-1'>
        <span>Order : </span>&nbsp;
        <span
          class='font-bold text-lg cursor-pointer hover:underline decoration-double decoration-1 underline-offset-0 active:translate-y-0.5'>{{current_pokemon.order}}</span>
      </div>
      <div class='grid grid-cols-24 grid-flow-row'>
        <div class='col-span-24'>
          <h2 class='text-xl text-center py-1'>Game Indices:</h2>          
        </div>
        <div *ngFor='let indice of current_pokemon.game_indices' class='col-span-12  border border-blue-700 rounded-md'>
          <div class='flex items-center gap-x-1 px-1'>
            <span>Index: </span><span class='font-bold text-lg'>{{indice.game_index}}</span>
          </div>
          <div class='flex items-center gap-x-1 px-1'>
            <span>Indice Version: </span><a class='font-bold text-lg'>{{indice.version.name}}</a> <!-- <a>{{indice.version.name}}</a> Eğer indice versiyona tıklarsa URL -->
          </div>
        </div>
      </div>
    </div>
    <div [ngClass]="{'flex items-center justify-center':current_pokemon.held_items.length<1}"
      class='area_item border-2 border-blue-700 rounded-md '>
      <div class='grid grid-cols-24 grid-flow-row'>
        <div *ngIf='current_pokemon.held_items.length>0' class='col-span-24'>
          <div *ngFor="let items of current_pokemon.held_items;index as index">
            <div *ngIf='index==0' class='text-center'>
              <h2 class='text-xl text-center py-1'>Items:</h2>
              <span>Total Item Version Count: {{total_item_version_count}}</span>
            </div>
            <div class='text-center py-1'>
              <a
                class='font-bold text-lg cursor-pointer hover:underline decoration-double decoration-1 underline-offset-0 active:translate-y-0.5'>Item
                Name : {{items.item.name | titlecase}}
              </a>
            </div>
            <!-- <h2 class='text-xl text-center py-1'>Item Name : {{items.item.url }}</h2> Eğer iteme tıklarsa URL -->
            <div class='grid grid-cols-24 grid-flow-row'>
              <div class='col-span-12 border border-blue-500 p-1' *ngFor="let version of items.version_details">
                <p class='text-xs'>Item Version Name : <span
                    class='item_version text-sm font-semibold'>{{version.version.name}}</span></p>
                <!-- <span>Item Version Name : <span>{{version.version.url}}</span></span> Eğer version tıklarsa URL -->
                <p class='text-xs'>Item Version Rarity : <span class='text-sm font-semibold'>{{version.rarity}}</span>
                </p>
              </div>
            </div>
          </div>
        </div>
        <div *ngIf='current_pokemon.held_items.length<1' class='col-span-24 mx-auto'>
          <h2 class='font-semibold text-red-500'>There is no item to display!</h2>
        </div>
      </div>
    </div>
    <div class='area_moves border-2 border-blue-700 rounded-md'>
      <div class='text-center py-1'>
        <h2 class='text-xl'>ALL MOVES:</h2>
      </div>
      <div class='grid grid-cols-24 gap-1 p-1'
        *ngFor="let move of current_pokemon.moves;index as index; count as count">
        <div *ngIf='index==0' class='text-center col-span-24'>
              <span>Total Moves Count: {{count}}</span>
            </div>
        <div class='col-span-24 text-center'>
          {{index+1}} - <a
            class='font-bold text-lg cursor-pointer hover:underline decoration-double decoration-1 underline-offset-0 active:translate-y-0.5'>Move
            Name : {{move.move.name | titlecase}}</a>
          <!-- <span>{{move.move.url}}</span> Eğer move tıklarsa URL -->
        </div>
        <div class='col-span-24 sm:col-span-12 md:col-span-12 lg:col-span-8 xl:col-span-6'
          *ngFor='let version_detail of move.version_group_details'>
          <div
            class='grid grid-cols-24 border-2 border-blue-700 rounded-md py-1 sm:p-1 md:p-2 xl:p-2 2xl:p-3 grid-flow-row'>
            <div class='col-span-6 sm:col-span-24'>
              <span class='text-xs'>Learned Level : </span>
              <span class='font-bold text-sm'>{{version_detail.level_learned_at}}</span>
            </div>
            <div class='col-span-8 sm:col-span-24'>
              <span class='text-xs'>Method Name : </span>
              <a
                class='font-bold text-sm cursor-pointer hover:underline decoration-double decoration-1 underline-offset-0 active:translate-y-0.5'>{{version_detail.move_learn_method.name}}</a>
              <!-- <span>{{version_detail.move_learn_method.url}}</span> Eğer move learn method tıklarsa URL -->
            </div>
            <div class='col-span-10 sm:col-span-24'>
              <span class='text-xs'>Group Name : </span>
              <a
                class='font-bold text-sm cursor-pointer hover:underline decoration-double decoration-1 underline-offset-0 active:translate-y-0.5'>{{version_detail.version_group.name}}</a>
              <!-- <span>{{version_detail.version_group.url}}</span> Eğer version group name tıklarsa URL -->
            </div>
          </div>
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
    .area_title{
      grid-area:area_title
    }
    .area_name{
      grid-area:area_name;          
    }
    .area_ability{
      grid-area:area_ability
    }
    .area_item{
      grid-area:area_item
    }
    .area_form{
      grid-area:area_form
    }
    .area_basic{
      grid-area:area_basic;      
    }
    .area_moves{
      grid-area:area_moves;
    }
    .single_pokemon_container{      
      display:grid;      
      grid-template-areas:
      'area_title area_title area_title area_title area_title area_title area_title area_title area_title area_title'
      'area_name area_name area_name area_ability area_ability area_ability area_ability area_ability area_ability area_ability'
      'area_item area_item area_item area_item area_item area_item area_item area_item area_item area_item'            
      'area_moves area_moves area_moves area_moves area_moves area_moves area_moves area_moves area_moves area_moves ';
      grid-template-columns:repeat(10,1fr);
      grid-template-rows:repeat(4,max-content)
    }
    @media only screen and (max-width: 1280px) {
      .single_pokemon_container{
      display:grid;      
      grid-template-areas:
      'area_title area_title area_title area_title area_title area_title area_title area_title area_title area_title'
      'area_name area_name area_name area_ability area_ability area_ability area_ability area_ability area_ability area_ability'
      'area_item area_item area_item area_item area_item area_item area_item area_item area_item area_item'            
      'area_moves area_moves area_moves area_moves area_moves area_moves area_moves area_moves area_moves area_moves ';
      grid-template-columns:repeat(10,1fr);
      grid-template-rows:repeat(4,max-content)
    }
    }
    @media only screen and (max-width: 1024px) {
      .single_pokemon_container{
      display:grid;      
      grid-template-areas:
      'area_title . . . . . . . . .'
      'area_name area_name area_name area_ability area_ability area_ability area_ability area_ability area_ability area_ability '
      'area_item area_item area_item area_item area_item area_item area_item area_item area_item area_item'            
      'area_moves area_moves area_moves area_moves area_moves area_moves area_moves area_moves area_moves area_moves';
      grid-template-columns:repeat(10,1fr);
      grid-template-rows:repeat(4,max-content)
    }
    }
    @media only screen and (max-width: 768px) {
      .single_pokemon_container{
      display:grid;      
      grid-template-areas:
      'area_title . . . . . . . . .'
      'area_name area_name area_name area_name area_name area_name area_name area_name area_name area_name '
      'area_ability area_ability area_ability area_ability area_ability area_ability area_ability area_ability area_ability area_ability'
      'area_item area_item area_item area_item area_item area_item area_item area_item area_item area_item'            
      'area_moves area_moves area_moves area_moves area_moves area_moves area_moves area_moves area_moves area_moves';
      grid-template-columns:repeat(10,1fr);
      grid-template-rows:repeat(5,max-content)
    }
    }

    `
  ],
  providers: [PokemonService]
})
export class SinglePokemonDetailComponent implements OnInit, OnDestroy {  

  pokemon_abilities_text:string='Abilities:'
  pokemon_ability_name_text:string='Ability Name : '
  pokemon_ability_is_hidden_text:string='Is Hidden : '
  pokemon_ability_ability_slot_text:string='Ability Slot : '
  pokemon_all_forms_text:string='All Forms: '
  pokemon_form_name_text:string='Form Name : '
  total_item_version_count:number=0
  current_pokemon!: SinglePokemonData;
  spinner_boolean:boolean=false
  private current_id_parameter_subscription!: Subscription;
  private current_pokemon_subscription!: Subscription;
  constructor(private pokemonService: PokemonService, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {    
    this.current_id_parameter_subscription = this.activatedRoute.params.subscribe({
      next: (params: Params) => {
        this.spinner_boolean=true
        console.log(params['id'])
        this.current_pokemon_subscription = this.pokemonService.get_single_pokemon(params['id']).subscribe({
          next: (single_pokemon_data: SinglePokemonData) => {
            this.current_pokemon = single_pokemon_data            
          }
        })
        setTimeout(() => {
          this.total_item_version_count = document.getElementsByClassName('item_version').length
          this.spinner_boolean=false                
          window.scrollTo({top:0,behavior:'smooth'})
        }, 300);
        
      }
    })
    
  }
  ngOnDestroy(): void {
    if(this.current_id_parameter_subscription){
      this.current_id_parameter_subscription.unsubscribe()
    }
    if(this.current_pokemon_subscription){
      this.current_pokemon_subscription.unsubscribe()
    }
  }

}
