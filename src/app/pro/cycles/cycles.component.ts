import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { EditCycleComponent } from './edit-cycle/edit-cycle.component';

@Component({
  selector: 'app-cycles',
  templateUrl: './cycles.component.html',
  styleUrls: ['./cycles.component.css'],
})
export class CyclesComponent {
  constructor(private dialog: MatDialog) {}

  openCycleDialog(){
    this.dialog.open(EditCycleComponent, {width: '400px'})
  }
}
