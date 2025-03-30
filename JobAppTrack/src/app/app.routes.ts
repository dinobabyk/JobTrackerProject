import { Routes } from '@angular/router';
import { AuthGuard } from './auth-guard.guard';
import { LoginComponent } from './login/login.component';
import { JobListComponent } from './Jobs/job-list/job-list.component';
import { JobFormComponent } from './Jobs/job-form/job-form.component';
import { JobViewComponent } from './Jobs/job-view/job-view.component';
import { AppLayoutComponent } from './app-layout/app-layout.component';
import { DashboardComponent } from './dashboard/dashboard.component';

export const routes: Routes = [
    {

        path: '',
        component: AppLayoutComponent,
        canActivate: [AuthGuard],
        children: [{
            path: 'dashboard',
            component: DashboardComponent,
            title: 'Dashboard'
        },
        {
            path: 'job-list',
            component: JobListComponent
        },
        {
            path: 'job-form',
            component: JobFormComponent
        },
        {
            path: 'job-view',
            component: JobViewComponent
        }
        ]
    }, {
        path: 'login',
        component: LoginComponent
    },
];
