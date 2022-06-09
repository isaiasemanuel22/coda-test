import { Injectable } from '@angular/core';
import { Client } from '../entities/client';
import { MiaBaseCrudHttpService, MiaPagination, MiaQuery } from '@agencycoda/mia-core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable, Subject } from 'rxjs';
import { query } from '@angular/animations';

@Injectable({
  providedIn: 'root'
})
export class ClientService extends MiaBaseCrudHttpService<Client> {


  private listClients: Subject<Client[]> = new Subject<Client[]>();
  private miaQuery: MiaQuery | null = null;
  constructor(
    protected http: HttpClient
  ) {
    super(http);
    this.basePathUrl = environment.baseUrl + 'client';
  }

  getList() {
    this.postOb(this.basePathUrl + '/list', this.getQueryInstance().toParams()).subscribe((response) => {
      this.listClients.next(response.data);
    });
  }

  create(client: Client) {
    return this.save(client).then(() => {
      this.getList();
    });
  }


  deleteElement(id: any) {
    return this.delete(this.basePathUrl + '/remove/' + id).then(() => {
      this.getList();
    })
  }

  getListClients() {
    this.getList()
    return this.listClients.asObservable();
  }

  getQueryInstance() {
    if (this.miaQuery == null) {
      this.miaQuery = new MiaQuery();
    }
    return this.miaQuery;
  }

  update(item: any) {
    return this.save(item).then(() => {
      this.getList();
    })
  }
}