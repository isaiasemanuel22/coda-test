import { MiaFormModalComponent, MiaFormModalConfig } from '@agencycoda/mia-form';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ClientService } from '../../services/client.service';

@Component({
  selector: 'app-remove-client',
  templateUrl: './remove-client.component.html',
  styleUrls: ['./remove-client.component.scss']
})
export class RemoveClientComponent implements OnInit {
  service!:ClientService;
  constructor(
    protected dialogRef: MatDialogRef<MiaFormModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: MiaFormModalConfig
  ) {
    this.service = this.data.service;
  }
  ngOnInit(): void {
  }

  deleteClient(){
    this.service.deleteElement(this.data.item.id).then(() => {
      this.dialogRef.close();
    }).catch((error) => {
      console.error(error);
    });
  }
}
