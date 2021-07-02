import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormularioContatoComponent } from './formulario-contato/formulario-contato.component';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientInMemoryWebApiModule } from "angular-in-memory-web-api"
import { InMemoryDatabase } from "./in-memory-database";
import { ListaContatosComponent } from './lista-contatos/lista-contatos.component';
import { DeleteContatoComponent } from './delete-contato/delete-contato.component';
import {Ng2BRPipesModule} from 'ng2-brpipes';
import { TextMaskModule } from 'angular2-text-mask';

@NgModule({
  declarations: [
    AppComponent,
    ListaContatosComponent,
    DeleteContatoComponent,
    FormularioContatoComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    Ng2BRPipesModule,
    TextMaskModule,
    HttpClientInMemoryWebApiModule.forRoot(InMemoryDatabase)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
