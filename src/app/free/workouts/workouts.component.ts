import { Component, OnInit } from '@angular/core'
import { map, tap } from 'rxjs'
import { ApiService, CyclesElement } from 'src/app/common/services/api/api.service'
import { UiService } from 'src/app/common/services/ui/ui.service'
import { WorkoutService } from 'src/app/common/services/workout/workout.service'

@Component({
  selector: 'app-workouts',
  templateUrl: './workouts.component.html',
  styleUrls: ['./workouts.component.css'],
})
export class WorkoutsComponent implements OnInit {
  cycles: CyclesElement[] = []
  selectedCycleId: string = ''

  constructor(private api: ApiService, private uiService: UiService, private workoutService: WorkoutService) {}

  ngOnInit() {
    // populate cycles
    this.api.readCycles().pipe(
      map(result => {
      if(result?.message){
        this.uiService.toast('There was an error reading cycles.')
        return []
      }
      else{
        return result?.cycles
      }
    }), tap(cycles => {
      this.cycles = cycles
    }),tap(() => {
      // determine the latest cycle
      let latestCycle = {
        id: '',
        name: '',
        modified: new Date('1970-01-01'),
        workoutCount: 0
      }

      this.cycles?.forEach(cycle => {

        if(latestCycle.name.length < 1 || cycle?.modified > latestCycle.modified){
          latestCycle = cycle
        }
      })

      this.selectedCycleId = latestCycle.id
      this.onSelectionChange()
    })).subscribe()
  }

  onSelectionChange(){
    this.workoutService.selectedCycleId$.next(this.selectedCycleId)
  }
}


