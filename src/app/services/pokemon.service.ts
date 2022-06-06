import { HttpClient, HttpParams, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AllPokemons } from '../models/all_pokemons.model';
import { environment as env } from 'src/environments/environment';
import { SinglePokemonData } from '../models/pokemon.model';

@Injectable()
export class PokemonService {

  constructor(private httpClient:HttpClient) { }

  get_pokemon_list(limit:number=25):Observable<AllPokemons>{    
    return this.httpClient.get<AllPokemons>(`${env.BASE_URL}/pokemon`,{
      params: new HttpParams().set('limit',limit).set('offset',0)
    })
  }

  get_single_pokemon(id_or_pokemon_name:string|number):Observable<SinglePokemonData>{
    let base_url = env.BASE_URL    
      base_url +="/pokemon/" + id_or_pokemon_name    
    return this.httpClient.get<SinglePokemonData>(base_url)
  }

}
