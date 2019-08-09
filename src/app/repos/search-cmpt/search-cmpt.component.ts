import { Component, OnInit, OnDestroy } from '@angular/core';
import { SearchService } from '../search.service';
import { Router } from '@angular/router';


@Component({
    selector: 'app-search-cmpt',
    templateUrl: './search-cmpt.component.html',
    styleUrls: ['./search-cmpt.component.scss'],
})
export class SearchCmptComponent implements OnInit, OnDestroy {

    conn;

    constructor(
        private searchService: SearchService,
        private router: Router,
    ) { }

    ngOnInit() {
        this.conn = this.searchService.connect();
    }

    onSearchChange(e) {
        if (e.target.value) {
            if (this.router.url !== '/search-page') {
                this.router.navigateByUrl('/search-page');
                this.conn.send(e.target.value);
                return;
            }
            this.conn.send(e.target.value);
        }
    }

    ngOnDestroy() {
        // console.log('DESTROY CALLED');
    }

}
