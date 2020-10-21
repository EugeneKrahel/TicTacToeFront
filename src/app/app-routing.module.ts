import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HomePageComponent} from './home-page/home-page.component';
import {GameFieldComponent} from './game-field/game-field.component';

const routes: Routes = [
  {path: '', component: HomePageComponent},
  {path: 'GameField', component: GameFieldComponent, pathMatch: 'full'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
