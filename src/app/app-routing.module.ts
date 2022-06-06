import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AllAbilitiesComponent } from './components/abilities/all-abilities.component';
import { AboutComponent } from './components/about/about.component';
import { HomeComponent } from './components/home.component';
import { SinglePokemonDetailComponent } from './components/single-pokemon-detail.component';

const routes: Routes = [  
  {path:'all_pokemons', component:HomeComponent},
  {path:'pokemon/:id', component:SinglePokemonDetailComponent},
  {path:'abilities', component:AllAbilitiesComponent},
  {path:'about', component:AboutComponent},
  {path:'**', redirectTo:'pokemon/1', pathMatch:'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
