import { CollectionsComponent } from './components/collections/collections.component';
import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { authGuard } from './guards/auth.guard';
import { StatsComponent } from './components/stats/stats.component';
import { LoginComponent } from './components/login/login.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { RegisterComponent } from './components/register/register.component';
import { CollectionDetailsComponent } from './components/collection-details/collection-details.component';
import { BookComponent } from './components/book/book.component';

export const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'register',
    component: RegisterComponent,
  },
  {
    path: 'home',
    component: HomeComponent,
    canActivate: [authGuard],
    children: [
      {
        path: '',
        component: CollectionsComponent,
      },
      {
        path: 'collection/:collectionName',
        component: CollectionDetailsComponent,
      },
      {
        path: 'collection/:collectionName/book/:bookIsbn',
        component: BookComponent,
      },
      {
        path: 'stats',
        component: StatsComponent,
      },
    ],
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: '**',
    component: NotFoundComponent,
  },
];
