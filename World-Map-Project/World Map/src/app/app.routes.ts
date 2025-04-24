import { Routes } from '@angular/router';
import { WorldComponent } from './world-map/world.component';

export const routes: Routes = [
    { path: '', redirectTo: '/world-map', pathMatch: 'full'},
    { path: 'world-map', component: WorldComponent}
];
