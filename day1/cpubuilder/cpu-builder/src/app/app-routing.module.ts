import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { CpusComponent } from './cpus/cpus.component';
import { AuthenticationComponent } from './authentication/authentication.component';
import { CpuPartsListComponent } from './cpu-parts-list/cpu-parts-list.component';
import { AuthGuard } from "./auth.guard";

const routes: Routes = [
  {
    path: '',
    redirectTo: '/authentication',
    pathMatch: 'full'
  },
  {
    path: 'cpus',
    component: CpusComponent,
    // canActivate: [AuthGuard]
  },
  {
    path: 'cpu-parts-list',
    component: CpuPartsListComponent
  },
  {
    path: 'authentication',
    component: AuthenticationComponent,
    canActivate: [AuthGuard],
    data: { navigateAwayFromAuth: true }
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule {}
