import { Injectable, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subject, BehaviorSubject } from 'rxjs';
import { Repo } from './repos.model';
import { first } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class SearchService implements OnDestroy {

    // create single source of data exchange (ws)
    // any other component/page can connect to it, send data
    // and receive it

    private wsURL = 'ws://167.99.235.172/ws'; // 'ws://go-api.localhost:8000/ws'; // nginx related (look conf)
    private conn;
    private interval;
    private _searchResults = new BehaviorSubject<Repo[]>([]);

    constructor() { }

    get searchResults() {
        return this._searchResults.asObservable();
    }

    public connect() {
        if (!this.conn) {
            this.conn = this.createConn();
        }
        return this.conn;
    }

    private createConn() {
        const ws = new WebSocket(this.wsURL);

        ws.onmessage = (msg) => {
            this.searchResults.pipe(first()).subscribe(() => {
                if (msg.data) {
                    const repos = JSON.parse(msg.data);
                    if (repos.Count) {
                        this._searchResults.next(repos.Items);
                    } else {
                        this._searchResults.next([]);
                    }
                }
            });
        };

        ws.onopen = () => {
            this.interval = setInterval(() => {
                ws.send('ping');
            }, 1000 * 30);
        };

        ws.onclose = (e) => {
            // console.log(e);
            clearInterval(this.interval);
        };
        ws.onerror = (e) => {
            // console.log(e);
            clearInterval(this.interval);
        };

        return ws;
    }

    ngOnDestroy() {
        this.conn.close();
        clearInterval(this.interval);
    }

}
