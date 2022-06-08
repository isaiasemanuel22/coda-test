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



@NgModule({
  declarations: [
    AddClientComponent
  ],
  imports: [
    CommonModule,
    MiaFormModule,
    MatDialogModule
  ],
  providers:[
    { 
      provide: MIA_AUTH_PROVIDER, 
      useValue: {
        baseUrl: environment.baseUrl
      }
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: MiaAuthInterceptor,
      multi: true
    },
    {
      provide: MIA_GOOGLE_STORAGE_PROVIDER,
      useValue: {
        bucket: environment.cloudStorageBucket
      }
    }
  ]
  ,
  exports:[
    AddClientComponent
  ]
})
export class ComponentsModule { }
