import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from '../app.component';
import { UsersComponent } from '../users/users.component';
import { AlbumsComponent } from '../albums/albums.component';
import { PhotosComponent } from '../photos/photos.component';
import {AuthGuardService as AuthGuard} from '../services/auth-guard.service';

const routes: Routes = [
    { path: '', redirectTo: '/users', pathMatch: 'full' },
    {
        path: 'users',
        component: UsersComponent,
        data: { title: 'Users List',
        canActivate: [AuthGuard]  }
    },
    {
        path: 'albums/:id',
        component: AlbumsComponent,
        data: { title: 'Album List',
        canActivate: [AuthGuard]  }
    },
    {
        path: 'photos',
        component: PhotosComponent,
        data: { title: 'Photo List',
        canActivate: [AuthGuard]  }
    },
    { path: '**', redirectTo: '/404' },

];

@NgModule({
    imports: [RouterModule.forRoot(routes, { useHash: true })],
    exports: [RouterModule]
})
export class AppRoutingModule { }
