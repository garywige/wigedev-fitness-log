import { Component, OnInit } from '@angular/core'
import { EditCycleComponent } from './edit-cycle/edit-cycle.component'
import { UiService } from 'src/app/common/services/ui/ui.service'
import { MatTableDataSource } from '@angular/material/table'
import { ApiService, CyclesElement } from 'src/app/common/services/api/api.service'
import { filter, map, tap } from 'rxjs'

@Component({
  selector: 'app-cycles',
  templateUrl: './cycles.component.html',
  styleUrls: ['./cycles.component.css'],
})
export class CyclesComponent implements OnInit {
  displayedColumns: string[] = ['name', 'modified', 'workoutCount']
  cycles: MatTableDataSource<CyclesElement> = new MatTableDataSource()

  constructor(private uiService: UiService, private api: ApiService) {}

  ngOnInit() {
    this.loadData()
  }

  loadData() {
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
        this.cycles.data = cycleData?.cycles as CyclesElement[]
      })
    ).subscribe()
  }

  openCycleDialog(id?: string) {
    this.uiService.showDialog(EditCycleComponent, {id: id}).afterClosed().pipe(
      tap(output => {
        setTimeout(() => this.loadData(), 1000)
        return output
      }),
      filter(result => result),
      tap(formData => {
        if(id){
          // EDIT MODE
          this.api.updateCycle(id, formData?.name).pipe(
            tap(output => {
              if(output?.message){
                this.uiService.toast('There was an error saving the cycle.')
              }
            })
          ).subscribe()
        } else {
          // ADD MODE
          this.api.createCycle(formData?.name).pipe(
            tap(output => {
              if(output?.message){
                this.uiService.toast('There was an error saving the cycle.')
              }
            })
          ).subscribe()
        }
      })
    ).subscribe()
  }
}
