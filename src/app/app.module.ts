import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ItemsListComponent } from './items-list/items-list.component';
import { FormsModule } from '@angular/forms';
import { ItemFormComponent } from './item-form/item-form.component';
import { LoginComponent } from './login/login.component';

@NgModule({
  declarations: [
    AppComponent,
    ItemsListComponent,
    ItemFormComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [provideClientHydration()],
  bootstrap: [AppComponent]
})
export class AppModule { }

