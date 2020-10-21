import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {HttpClientModule} from '@angular/common/http';
import {AutocompleteLibModule} from 'angular-ng-autocomplete';


import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {HomePageComponent} from './home-page/home-page.component';
import {AllGamesComponent} from './all-games/all-games.component';
import {GamesService} from './services/games.service';
import {CreateNewGameComponent} from './create-new-game/create-new-game.component';

import {TagInputModule} from 'ngx-chips';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations'; // this is needed!
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {TagsService} from './services/tags.service';
import {GameFieldComponent} from './game-field/game-field.component';
import {SearchFormComponent} from './search-form/search-form.component';
import { NgModalContentComponent } from './ng-modal-content/ng-modal-content.component';

@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    AllGamesComponent,
    CreateNewGameComponent,
    GameFieldComponent,
    SearchFormComponent,
    NgModalContentComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    AutocompleteLibModule,
    TagInputModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
    GamesService,
    TagsService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
