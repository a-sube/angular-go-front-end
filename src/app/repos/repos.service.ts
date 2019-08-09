import { Injectable, OnDestroy } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Repo } from './repos.model';
import { BehaviorSubject, Subject, Observable, from } from 'rxjs';
import { take, filter, map, last, tap, scan } from 'rxjs/operators';
import { all } from 'q';

@Injectable({
    providedIn: 'root'
})
export class ReposService implements OnDestroy {

    private url = 'http://go-repo.ko-code.com';
    private page = 0;
    private _repos = new BehaviorSubject<Repo[]>([]);

    constructor(
        private http: HttpClient,
    ) { }

    get repos() {
        return this._repos.asObservable();
    }

    getNextPage() {
        this.page++;
        return this.http.get<Repo[]>(this.url + `/page/?page=${this.page}&limit=20`)
            .subscribe(data => {
                this.repos.pipe(take(1)).subscribe(repos => {
                    this._repos.next(repos.concat(data));
                });
            });
    }

    getRepoDetail(id: number, depth: string = '') {
        return this.http.get<Repo>(this.url + `/module/?id=${id}&depth=${depth}`);
    }

    getReadme(id: number) {
        return this.http.get(this.url + `/readme/?id=${id}`);
    }

    search(term: string) {
        return this.http.get(this.url + `/search/?search=${term}`);
    }


    ngOnDestroy() {
        this._repos.unsubscribe();
    }
}
