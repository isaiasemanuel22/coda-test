import { MiaFormComponent, MiaFormModalComponent, MiaFormModalConfig } from '@agencycoda/mia-form';
import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ClientService } from '../../services/client.service';



@Component({
  selector: 'app-add-client',
  templateUrl: './add-client.component.html',
  styleUrls: ['./add-client.component.scss']
})
export class AddClientComponent implements OnInit {

  @ViewChild('form') form!: MiaFormComponent;


  isSending = false;
  isShowButtons = true;
  isShowHeader = true;

  errorMessage = '';
  service!: ClientService;
  constructor(
    protected dialogRef: MatDialogRef<MiaFormModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: MiaFormModalConfig
  ) { }

  ngOnInit(): void {
    this.service = this.data.service;
  }

  addClientService(item: any) {
    this.service.create(item).then(() => {
      this.dialogRef.close();
    }).catch(error => {
      console.error(error);
    });

  }

  save(item: any, create: boolean) {
    if (this.isSending) {
      return;
    }
    this.isSending = true;
    if (create) {
      this.addClientService(item);
    } else {
      this.updateClientService(item);
    }
  }

  updateClientService(item: any) {
    this.service.update(item);
    this.dialogRef.close();
  }

  onClickSave() {
    this.form.submit().subscribe(result => {
      this.save(result, result.id == 0);
    });
  }

}
