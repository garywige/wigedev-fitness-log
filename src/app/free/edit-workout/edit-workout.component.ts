import { Component, OnInit } from '@angular/core';

import { DeleteWorkoutComponent } from '../delete-workout/delete-workout.component';
import { EditSetComponent } from '../edit-set/edit-set.component';
import { MatDialog } from '@angular/material/dialog';
import { Set } from '../set';
import { ExerciseGroup } from './exercise-group';

@Component({
  selector: 'app-edit-workout',
  templateUrl: './edit-workout.component.html',
  styleUrls: ['./edit-workout.component.css']
})
export class EditWorkoutComponent {

  date: Date = new Date()
  groups: ExerciseGroup[] = []
  output: {date: Date, sets: Set[]} | null = null

  constructor(public dialog: MatDialog) { }

  openSetDialog(){
    let dialogRef = this.dialog.open(EditSetComponent)
    dialogRef.afterClosed().subscribe(result => {
      if(result)
        this.addSet(result)
    })
  }

  openDeleteDialog(){
    let dialogRef = this.dialog.open(DeleteWorkoutComponent)
    dialogRef.afterClosed().subscribe(result => {
      if(result){
        // TODO: implement delete workout & close the workout window
        console.log('Deleting workout...')
        this.dialog.closeAll()
      }
    })
  }

  addSet(set: Set){

    if(this.groups.filter(group => group.name === set.exercise).length === 0){
      // add new group
      this.groups.push(new ExerciseGroup(set.exercise, [set]))
    } else {
      // add to existing group
      this.groups.filter(group => group.name === set.exercise)[0]?.sets?.push(set)
    }
  }

  onSubmit(){
    // flatten the data
    this.output = {
      date: this.date,
      sets: []
    }

    this.groups.forEach(group => {
      group.sets.forEach(set => {
        this.output?.sets.push(set)
      })
    })

    // send the data to outer space
    console.log(this.output)
  }
}
