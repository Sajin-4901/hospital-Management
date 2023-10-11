import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '../component/dialog/dialog.component';

@Injectable({
  providedIn: 'root'
})
export class DialogService {

  constructor(public dialog: MatDialog) { }
  openDialog(dialogData: any) {
    const dialogRef = this.dialog.open(DialogComponent, {
      data: dialogData
    })
    return dialogRef;
  }
}
