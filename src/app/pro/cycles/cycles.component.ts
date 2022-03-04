import { Component, OnInit } from '@angular/core'
import { EditCycleComponent } from './edit-cycle/edit-cycle.component'
import { UiService } from 'src/app/common/services/ui/ui.service'
import { MatTableDataSource } from '@angular/material/table'
import { ApiService, readCyclesElement } from 'src/app/common/services/api/api.service'
import { filter, map, tap } from 'rxjs'

@Component({
  selector: 'app-cycles',
  templateUrl: './cycles.component.html',
  styleUrls: ['./cycles.component.css'],
})
export class CyclesComponent implements OnInit {
  displayedColumns: string[] = ['name', 'modified', 'workoutCount']
  cycles: MatTableDataSource<readCyclesElement> = new MatTableDataSource()

  constructor(private uiService: UiService, private api: ApiService) {}

  ngOnInit() {
    this.api.readCycles().pipe(
      map(output => {
        if(output?.message){
          this.uiService.toast('There was an error reading cycles.')
          return null
        }

        return output
      }),
      filter(data => data !== null),
      tap(cycleData => {
        this.loadData(cycleData?.cycles as readCyclesElement[])
      })
    ).subscribe()
  }

  loadData(cycles: readCyclesElement[]) {
    this.cycles.data = cycles
  }

  openCycleDialog(id?: string) {
    this.uiService.showDialog(EditCycleComponent, {id: id})
  }
}
