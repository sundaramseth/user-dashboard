import { Routes } from '@angular/router';
import { Users } from './users/users';

export const routes: Routes = [
   {
    path: '',
    redirectTo: 'user',
    pathMatch: 'full'
   },
    {
        path:'user',
        component:Users
    }
];
