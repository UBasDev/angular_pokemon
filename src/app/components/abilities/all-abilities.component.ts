import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AllAbilities } from 'src/app/models/all_pokemons_abilities.model';
import { PokemonAbilityService } from 'src/app/services/pokemon-ability.service';

@Component({
  selector: 'app-all-abilities',
  template: `
    <div class='grid grid-cols-24 grid-flow-row gap-3 p-3'>
      <div *ngFor="let ability of current_all_abilities.results; index as index" class='col-span-12 lg:col-span-8 xl:col-span-6 2xl:col-span-4 border-2 border-blue-500 rounded-md bg-blue-500 hover:border-blue-300 hover:bg-blue-300 p-1'>
        <div class='flex items-center justify-start gap-x-1'>
          <p class='text-xs tooltip_wrapper w-max relative flex justify-start items-center'>Ability Name: 
            <span class='text-lg font-bold cursor-pointer hover:underline decoration-double decoration-1 underline-offset-0 active:translate-y-0.5'>{{ability.name | titlecase}}</span>
            <span style='bottom:100%; max-width:180px;' class='tooltip hidden absolute w-max h-max max-h-max bg-white z-10 px-2 py-1 rounded-md'>You can search any ability by NAME or by ID</span>
          </p>
        </div>
      </div>
    </div>
    <div class='col-span-24 text-center'>
    <button (click)='decrease_offset()' *ngIf='current_all_abilities.previous'>Previous</button>
    <button (click)='increase_offset()' *ngIf='current_all_abilities.next'>Next</button>
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
  providers: [PokemonAbilityService]
})
export class AllAbilitiesComponent implements OnInit, OnDestroy {
  spinner_boolean: boolean = false
  current_all_abilities!: AllAbilities;
  initial_abilities_subscription!: Subscription
  previous_abilities_subscription!: Subscription
  next_abilities_subscription!: Subscription
  constructor(private pokemonAbilityService: PokemonAbilityService) { }

  ngOnInit(): void {
    this.initial_abilities_subscription = this.pokemonAbilityService.get_all_abilities().subscribe({
      next: (response: AllAbilities) => {
        this.spinner_boolean = true
        this.current_all_abilities = response
      },
      complete: () => {
        setTimeout(() => {
          this.spinner_boolean = false
        }, 300);
      }
    })
  }
  ngOnDestroy(): void {
    if (this.initial_abilities_subscription) {
      this.initial_abilities_subscription.unsubscribe()
    }
    if (this.previous_abilities_subscription) {
      this.previous_abilities_subscription.unsubscribe()
    }
    if(this.next_abilities_subscription){
      this.next_abilities_subscription.unsubscribe()
    }
  }
  decrease_offset() {
    this.previous_abilities_subscription = this.pokemonAbilityService.change_offset(this.current_all_abilities.previous).subscribe({
      next: (response: AllAbilities) => {
        this.spinner_boolean = true
        this.current_all_abilities = response
      },
      complete: () => {
        setTimeout(() => {
          this.spinner_boolean = false
        }, 300);
      }
    })
  }
  increase_offset() {
    this.next_abilities_subscription = this.pokemonAbilityService.change_offset(this.current_all_abilities.next).subscribe({
      next: (response: AllAbilities) => {
        this.spinner_boolean = true
        this.current_all_abilities = response
      },
      complete: () => {
        setTimeout(() => {
          this.spinner_boolean = false
        }, 300);
      }
    })
  }
}
