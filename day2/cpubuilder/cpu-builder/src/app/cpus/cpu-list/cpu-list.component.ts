import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Cpu } from '../cpu.model';
import { AppState } from 'src/app/app.reducer';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-cpu-list',
  templateUrl: './cpu-list.component.html',
  styleUrls: ['./cpu-list.component.css']
})
export class CpuListComponent implements OnInit {
  constructor(private route: ActivatedRoute, private router: Router, private store: Store<AppState>) { }
  cpusSub!: Subscription;
  cpus!: Cpu[];

  ngOnInit(): void {
    this.cpusSub = this.store.select('cpus')
      .pipe(
        map(state => state.cpus)
      )
      .subscribe((cpus: Cpu[]) => {
        this.cpus = cpus;
      })
  }

  newCpu() {
    this.router.navigate(['new'], { relativeTo: this.route })
  }

}
