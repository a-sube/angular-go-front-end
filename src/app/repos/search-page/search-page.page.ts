import { Component, OnInit } from '@angular/core';
import { SearchService } from '../search.service';
import { Router, NavigationStart, ActivatedRoute } from '@angular/router';
import { filter, map } from 'rxjs/operators';
import { Repo } from '../repos.model';
import { Observable } from 'rxjs';

@Component({
    selector: 'app-search-page',
    templateUrl: './search-page.page.html',
    styleUrls: ['./search-page.page.scss'],
})
export class SearchPagePage implements OnInit {

    searchResults: Observable<Repo[]>;

    constructor(
        private searchService: SearchService,
        public activatedRoute: ActivatedRoute
    ) { }

    ngOnInit() {
        this.searchResults = this.searchService.searchResults;
    }
}
