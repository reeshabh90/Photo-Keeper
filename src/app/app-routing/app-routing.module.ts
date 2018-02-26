import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from '../app.component';
import { UsersComponent } from '../users/users.component';
import { AlbumsComponent } from '../albums/albums.component';
import { PhotosComponent } from '../photos/photos.component';

const routes: Routes = [
    { path: '', redirectTo: '/users', pathMatch: 'full' },
    {
        path: 'users',
        component: UsersComponent,
        data: { title: 'Users List' }
    },
    {
        path: 'albums/:id',
        component: AlbumsComponent,
        data: { title: 'Album List' }
    },
    {
        path: 'photos',
        component: PhotosComponent,
        data: { title: 'Photo List' }
    },
    { path: '**', redirectTo: '/404' },

];

@NgModule({
    imports: [RouterModule.forRoot(routes, { useHash: true })],
    exports: [RouterModule]
})
export class AppRoutingModule { }
