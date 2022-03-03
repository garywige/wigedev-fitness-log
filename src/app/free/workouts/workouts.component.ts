import { Component, OnInit } from '@angular/core'
import { map, tap } from 'rxjs'
import { ApiService, readCyclesElement } from 'src/app/common/services/api/api.service'
import { UiService } from 'src/app/common/services/ui/ui.service'

@Component({
  selector: 'app-workouts',
  templateUrl: './workouts.component.html',
  styleUrls: ['./workouts.component.css'],
})
export class WorkoutsComponent implements OnInit {
  cycles: readCyclesElement[] = []

  constructor(private api: ApiService, private uiService: UiService) {}

  ngOnInit() {
    // populate cycles
    this.api.readCycles().pipe(map(result => {
      if(result?.message){
        this.uiService.toast('There was an error reading cycles.')
        return []
      }
      else{
        return result?.cycles
      }
    }), tap(cycles => {
      this.cycles = cycles
    })).subscribe()
  }
}


