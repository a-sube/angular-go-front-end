import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
    { path: '', redirectTo: 'repos', pathMatch: 'full' },
    {
        path: 'repos',
        children: [
            {
                path: '',
                loadChildren: './repos/repos.module#ReposPageModule',
            },
            {
                path: 'detail/:id',
                loadChildren: './repos/repo-detail/repo-detail.module#RepoDetailPageModule',
            }
        ]
    },
    { path: 'search-page', loadChildren: './repos/search-page/search-page.module#SearchPagePageModule' }
];

@NgModule({
    imports: [
        RouterModule.forRoot(routes, {
            preloadingStrategy: PreloadAllModules,
        })
    ],
    exports: [RouterModule]
})
export class AppRoutingModule { }
