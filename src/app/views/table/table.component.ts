import { MiaPagination } from '@agencycoda/mia-core';
import { Component, OnInit } from '@angular/core';
import { MiaTableConfig } from '@agencycoda/mia-table';
import { ClientService } from '../../services/client.service';
import { Client } from 'src/app/entities/client';
import { MiaFormModalConfig, MiaFormConfig, MiaField } from '@agencycoda/mia-form';
import { Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { AddClientComponent } from '../../components/add-client/add-client.component';
import { ComponentType } from '@angular/cdk/portal';
import { RemoveClientComponent } from '../../components/remove-client/remove-client.component';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit {

  tableConfig: MiaTableConfig = new MiaTableConfig();
  tableDataEditable: Array<any> = [];
  mockData?: MiaPagination<any>;

  constructor(
    protected dialog: MatDialog,
    public testService: ClientService
  ) { }

  ngOnInit(): void {
    this.loadConfig();
    this.testService.getListClients().subscribe((response) => {
      this.mockData!.data = response;
    })
  }

  //ConfigTable
  loadConfig() {
    this.tableConfig.id = 'table-test';
    this.tableConfig.loadingColor = 'red';
    this.tableConfig.hasEmptyScreen = true;
    this.tableConfig.emptyScreenTitle = 'No hay elementos en la tabla';
    this.tableConfig.onClick.subscribe(result => {
      this.switchAction(result.key, result.item);
    });
    this.configColums();
    this.configDataTable();
  }

  configColums() {
    this.tableConfig.columns = [
      { key: 'firstname', type: 'string', title: 'Nombre', field_key: 'firstname' },
      { key: 'lastname', type: 'string', title: 'Apellido', field_key: 'lastname' },
      { key: 'email', type: 'string', title: 'Mail', field_key: 'email' },
      {
        key: 'more', type: 'more', title: '', extra: {
          actions: [
            { icon: 'visibility', title: 'View', key: 'view' },
            { icon: 'create', title: 'Edit', key: 'edit' },
            { icon: 'delete', title: 'Delete', key: 'remove' },
          ]
        }
      }
    ]
  }

  configDataTable() {
    this.mockData = {
      current_page: 1,
      first_page_url: '',
      from: '',
      last_page: 1,
      last_page_url: '',
      next_page_url: '',
      path: '',
      per_page: 50,
      prev_page_url: '',
      to: '',
      total: 1,
      data: []
    };
  }

  //modal

  addClient(item?: Client) {
    let data = new MiaFormModalConfig();
    data.item = item != undefined ? item : new Client();
    data.service = this.testService;
    data.titleNew = 'Create Contact';
    data.titleEdit = 'Edit Contact';
    data.config = this.configClientMiaForm();

    this.openModal(data, AddClientComponent);
  }

  configClientMiaForm() {
    let config = new MiaFormConfig();
    config.hasSubmit = false;
    config.fields = [
      {
        key: 'firstname', type: MiaField.TYPE_STRING, label: 'Nombre', validators:
          [Validators.required]
      },
      {
        key: 'lastname', type: MiaField.TYPE_STRING, label: 'Apellido', validators:
          [Validators.required]
      },
      {
        key: 'email', type: MiaField.TYPE_STRING, label: 'Email', validators:
          [Validators.required , Validators.email]
      },
    ];
    config.errorMessages = [
      { key: 'required', message: 'El "%label%" es obligatorio.' },
      { key:'email' , message:'Debe ser un correo real'}
    ];

    return config;
  }

  openModal(data: MiaFormModalConfig, component: ComponentType<unknown>) {
    return this.dialog.open(component, {
      width: '520px',
      panelClass: 'modal-full-width-mobile',
      data: data
    }).afterClosed();
  }

  dropTable(arrayElements: any) {
    arrayElements.forEach((element: Client) => {
      console.log(element.id);
      this.testService.deleteElement(element.id);
    });
  }

  switchAction(key: string, item: Client) {
    switch (key) {
      case 'remove': {
        this.removeItem(item);
        break;
      }
      case 'edit': {
        this.addClient(item);
      }
    }
  }

  removeItem(item:Client){
    let data = new MiaFormModalConfig();
    data.item = item;
    data.service = this.testService;
    this.openModal(data, RemoveClientComponent);
  }

}
