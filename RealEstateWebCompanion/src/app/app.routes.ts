import { Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ListingsComponent } from './components/listings/listings.component';
import { AreasComponent } from './components/areas/areas.component';
import { UnitTypesComponent } from './components/unit-types/unit-types.component';
import { TogglesComponent } from './components/toggles/toggles.component';
import { LoginComponent } from './components/login/login.component';
import { HelpComponent } from './components/help/help.component';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'dashboard', component: DashboardComponent, canActivate: [authGuard] },
  { path: 'listings', component: ListingsComponent, canActivate: [authGuard] },
  { path: 'areas', component: AreasComponent, canActivate: [authGuard] },
  { path: 'unit-types', component: UnitTypesComponent, canActivate: [authGuard] },
  { path: 'toggles', component: TogglesComponent, canActivate: [authGuard] },
  { path: 'help', component: HelpComponent, canActivate: [authGuard] }
];
