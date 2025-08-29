import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { Mp3 } from './pages/mp3/mp3';
import { Contact } from './pages/contact/contact';

export const routes: Routes = [
    {
        path:'',
        redirectTo:'home',
        pathMatch:'full'
    },
    {
        path:'home',
        component:Home,
    },
    {
        path:'mp3',
        component:Mp3
    },
    {
        path:'contact',
        component:Contact
    }
];
