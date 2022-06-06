import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http'
import { HttpErrorsInterceptor } from './interceptors/http-errors.interceptor';
import { HomeComponent } from './components/home.component';
import { HeaderComponent } from './components/header/header.component';
import { HeaderLeftComponent } from './components/header/header_children/header-left.component';
import { HeaderMiddleComponent } from './components/header/header_children/header-middle.component';
import { HeaderRightComponent } from './components/header/header_children/header-right.component';
import { SinglePokemonDetailComponent } from './components/single-pokemon-detail.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { ReactiveFormsModule } from '@angular/forms';
import { AboutComponent } from './components/about/about.component';
import { AllAbilitiesComponent } from './components/abilities/all-abilities.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
    HeaderLeftComponent,
    HeaderMiddleComponent,
    HeaderRightComponent,
    SinglePokemonDetailComponent,
    AboutComponent,
    AllAbilitiesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ReactiveFormsModule
  ],
  providers: [
    {provide:HTTP_INTERCEPTORS,
      useClass:HttpErrorsInterceptor,
      multi:true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
