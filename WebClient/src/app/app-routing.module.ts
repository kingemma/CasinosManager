import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AccountComponent } from './account/account.component';
import { ContentComponent } from './content/content.component';

const routes: Routes = [
  { path: '', redirectTo: '/account', pathMatch: 'full' },
  {
    path: 'account',
    component: AccountComponent
  },
  {
    path: 'content',
    component: ContentComponent,
    children: [
      {
        path: '',
        loadChildren: './content/content.module#ContentModule'
      },
    ]
  },

];


@NgModule({
  imports: [
    RouterModule.forRoot(routes, { useHash: true })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
