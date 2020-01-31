import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AnaisComponent } from './anais/anais.component'
import { AppComponent } from "app/app.component";
import { MainComponent } from "app/main/main.component";


const routes: Routes = [
  { path: '', component: AppComponent,
  children:[
  { path: '', component: MainComponent },
  { path: 'anais', component: AnaisComponent },

  ] },

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports:[RouterModule]
})
export class AppRoutingModule { }
