import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddClientComponent } from './add-client/add-client.component';
import { MiaFormModule } from '@agencycoda/mia-form';
import { MiaCoreModule, MIA_GOOGLE_STORAGE_PROVIDER } from '@agencycoda/mia-core';
import { MiaAuthInterceptor, MiaAuthModule, MIA_AUTH_PROVIDER } from '@agencycoda/mia-auth';
import { MiaLoadingModule } from '@agencycoda/mia-loading';
import { MiaTableModule } from '@agencycoda/mia-table';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { RemoveClientComponent } from './remove-client/remove-client.component';



@NgModule({
  declarations: [
    AddClientComponent,
    RemoveClientComponent
  ],
  imports: [
    CommonModule,
    MiaFormModule,
    MatDialogModule,
    MatButtonModule
  ],
  exports:[
    AddClientComponent
  ]
})
export class ComponentsModule { }
