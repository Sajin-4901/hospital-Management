import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { MaterialModule } from './material/material.module';
import { MatButtonModule } from '@angular/material/button';
import { CoreModule } from './core/core.module';
import { HttpClientModule } from '@angular/common/http';
import { EndUserModule } from './end-user/end-user.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    CoreModule,
    MatButtonModule,
    HttpClientModule,
    EndUserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
