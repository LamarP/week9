import { Component, Input } from '@angular/core';

import { Cpu } from '../../cpu.model';

@Component({
  selector: 'app-cpu',
  templateUrl: './cpu.component.html',
  styleUrls: ['./cpu.component.css']
})
export class CpuComponent {
  @Input() computer!: Cpu;
  @Input() id!: number;
}
