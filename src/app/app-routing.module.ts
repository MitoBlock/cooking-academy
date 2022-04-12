import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainPageComponent } from './main-page/main-page.component';
import { ThirdPageComponent } from './third-page/third-page.component';
import { UserPageComponent } from './user-page/user-page.component';

const appRoutes: Routes = [
  { path: '', component: MainPageComponent },
  { path: 'user/:id', component: UserPageComponent },
  { path: 'user/:id/offers', component: ThirdPageComponent },
];

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
