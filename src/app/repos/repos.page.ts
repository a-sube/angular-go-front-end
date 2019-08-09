import { Component, OnInit, OnDestroy } from '@angular/core';
import { ReposService } from './repos.service';
import { Repo } from './repos.model';
import { Observable } from 'rxjs';

@Component({
    selector: 'app-repos',
    templateUrl: './repos.page.html',
    styleUrls: ['./repos.page.scss'],
})
export class ReposPage implements OnInit, OnDestroy {

    constructor(
        private repoService: ReposService,
    ) { }

    public repos: Observable<Repo[]>;

    ngOnInit() {
        this.repoService.getNextPage();
        this.repos = this.repoService.repos;
    }

    getNext(event) {
        setTimeout(() => {
            event.target.complete();
            this.repoService.getNextPage();
        }, 300);
    }

    getDetail(id: number) {

    }

    ngOnDestroy() {

    }
}
