import { MiaFormComponent, MiaFormModalComponent, MiaFormModalConfig } from '@agencycoda/mia-form';
import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';



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

  constructor(
    protected dialogRef: MatDialogRef<MiaFormModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: MiaFormModalConfig
  ) { }

  ngOnInit(): void {

    this.dialogRef.beforeClosed().subscribe(res => {
      this.form.submit().subscribe();
    });

  }

  processWithBaseService(item: any) {
    this.data.service.create(item);
    this.dialogRef.close();
  }

  processWithInternal(item: any) {
    this.data.nextProcess!.next(item);
    this.data.resultProcess?.subscribe(result => {
      if (result) {
        this.dialogRef.close(result);
      }
      this.isSending = false;
    }, error => {
      if (error.error && error.error.message) {
        this.errorMessage = error.error.message;
      } else if (error.message) {
        this.errorMessage = error.message;
      }
      this.isSending = false;
    });
  }

  save(item: any) {
    if (this.isSending) {
      return;
    }

    this.isSending = true;
    console.log(item)
    this.processWithBaseService(item);

  }

  onClickSave() {
    this.form.submit().subscribe(result => {
      console.log(result);
      this.save(result);
    });
  }

  setErrorMessage(error: string) {
    this.errorMessage = error;
    this.isSending = false;
  }

  cleanErrors() {
    this.errorMessage = '';
  }

}
