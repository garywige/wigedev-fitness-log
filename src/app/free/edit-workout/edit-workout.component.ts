import { Component, OnInit } from '@angular/core';

import { DeleteWorkoutComponent } from '../delete-workout/delete-workout.component';
import { EditSetComponent } from '../edit-set/edit-set.component';
import { MatDialog } from '@angular/material/dialog';
import { Set } from '../set';

class ExerciseGroup {
  name: string = ''
  sets: Set[] = []

  constructor(exercise: string, sets: Set[]){
    this.name = exercise
    this.sets = sets
  }
}

@Component({
  selector: 'app-edit-workout',
  templateUrl: './edit-workout.component.html',
  styleUrls: ['./edit-workout.component.css']
})
export class EditWorkoutComponent {

  sets: Set[] = []
  groups: ExerciseGroup[] = []

  constructor(public dialog: MatDialog) { }

  openSetDialog(){
    let dialogRef = this.dialog.open(EditSetComponent)
    dialogRef.afterClosed().subscribe(result => {
      this.addSet(result)
    })
  }

  openDeleteDialog(){
    this.dialog.open(DeleteWorkoutComponent)
  }

  addSet(set: Set){
    // add to sets
    this.sets.push(set)

    // reconstruct exercise groups
    this.groups = []
    this.sets.forEach(set => {
      if(this.groups.filter(group => group.name === set.exercise).length === 0){
        // group doesn't exist yet
        this.groups.push(new ExerciseGroup(set.exercise, [set]))
      }
      else {
        // group exists, push this set into it
        this.groups.filter(group => group.name === set.exercise)[0]?.sets?.push(set)
      }
    })

    console.log(JSON.stringify(this.groups))
  }
}
