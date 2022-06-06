import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AllAbilities } from '../models/all_pokemons_abilities.model';
import { environment as env } from 'src/environments/environment';
import { SinglePokemonAbilityData } from '../models/single_pokemon_ability.model';

@Injectable()
export class PokemonAbilityService {
  
  constructor(private httpClient:HttpClient) { }

  get_all_abilities(offset:number=0,limit:number=25):Observable<AllAbilities>{      
    return this.httpClient.get<AllAbilities>(`${env.BASE_URL}/ability`,{
      params: new HttpParams().set('limit',limit).set('offset',offset)
    })
  }

  change_offset(url:string):Observable<AllAbilities>{
    return this.httpClient.get<AllAbilities>(url)
  }

  get_single_ability(ability_name:string):Observable<SinglePokemonAbilityData>{
    return this.httpClient.get<SinglePokemonAbilityData>(`env.BASE_URL/ability/`+ability_name)
  }

}
