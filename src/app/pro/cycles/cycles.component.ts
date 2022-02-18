import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { EditCycleComponent } from './edit-cycle/edit-cycle.component';
import { Cycle } from './cycle';

@Component({
  selector: 'app-cycles',
  templateUrl: './cycles.component.html',
  styleUrls: ['./cycles.component.css'],
})
export class CyclesComponent implements OnInit {
  displayedColumns: string[] = ['name', 'modified', 'workoutCount']
  cycles: Cycle[] = []

  constructor(private dialog: MatDialog) {}

  ngOnInit(){
      this.loadData()
  }

  loadData(){
    this.cycles = [
      {id: 1, name: 'Free', modified: new Date(), workoutCount: 24},
      {id: 2, name: 'Starting Strength', modified: new Date(), workoutCount: 2}
    ]
  }

  openCycleDialog(){
    this.dialog.open(EditCycleComponent, {width: '400px'})
  }
}
