import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { Repo } from '../repos.model';
import { NavController } from '@ionic/angular';
import { Subscription, Observable, pipe } from 'rxjs';
import { take, filter, map, last, tap, scan } from 'rxjs/operators';
import { ReposService } from '../repos.service';
import { SegmentChangeEventDetail } from '@ionic/core';


function ceateModuleTree(repo: Repo, start, level) {

    // dfs-like
    if (start < level) {
        start++;
        const ul = document.createElement('ul');

        if (repo.modules) {

            const modules = repo.modules.slice() || []; // copy

            for (const mod of modules) {
                const li = document.createElement('li');

                li.innerHTML = `level-${start}: ${mod.full_name} | stars: ${mod.stargazers_count} | forks: ${mod.forks_count}`;

                const childUL = ceateModuleTree(mod, start, level);
                if (childUL) { li.appendChild(childUL); }

                ul.appendChild(li);
            }

        }
        return ul;
    }
}

@Component({
    selector: 'app-repo-detail',
    templateUrl: './repo-detail.page.html',
    styleUrls: ['./repo-detail.page.scss'],
})
export class RepoDetailPage implements OnInit, OnDestroy {

    repo: Repo;
    modfile;
    repoLoading = true;
    readmeLoading = true;
    readme: Object;

    infoPage = false;
    modulesPage = false;
    treePage = false;

    firstEnter = true;

    level = 1;

    constructor(
        private activatedRoute: ActivatedRoute,
        private repoService: ReposService,
        private router: Router,
    ) { }

    ngOnInit() {
        this.activatedRoute.paramMap.subscribe(paramMap => {
            if (paramMap.has('id')) {
                const id = +paramMap.get('id');

                this.repoService.getRepoDetail(id, '5')
                    .subscribe(obs => {
                        this.repo = obs;
                        this.modfile = `https://github.com/${this.repo.full_name}/blob/master/go.mod`;
                        this.repoLoading = false;
                    });

                this.repoService.getReadme(id)
                    .subscribe(readme => {
                        this.readme = readme;
                        this.readmeLoading = false;
                    });
            }
        });

        // navigate to anchor when anchor tag is in url
        // https://stackoverflow.com/questions/36101756/angular2-routing-with-hashtag-to-page-anchor
        this.router.events.subscribe(s => {
            if (s instanceof NavigationEnd) {
                const tree = this.router.parseUrl(this.router.url);
                if (tree.fragment && this.firstEnter) {
                    this.firstEnter = false;
                    setTimeout(() => {
                        const element = document.querySelector(`.${tree.fragment}`);
                        if (element) {
                            element.scrollIntoView({ behavior: 'smooth' });
                        }
                    }, 500);

                }
            }
        });
    }

    ionViewDidEnter() {
        document.querySelectorAll('.nav-link').forEach(element => {
            element.addEventListener('click', this.onAnchorClick);
        });
    }

    onSegmentChange(event: CustomEvent<SegmentChangeEventDetail>) {
        if (event.detail.value === 'infoPage') {
            this.infoPage = true;
            this.modulesPage = false;
            this.treePage = false;
        }
        if (event.detail.value === 'modulesPage') {
            this.infoPage = false;
            this.modulesPage = true;
            this.treePage = false;
        }
        if (event.detail.value === 'treePage') {
            this.infoPage = false;
            this.modulesPage = false;
            this.treePage = true;
        }
    }

    onAnchorClick(event, urlInput = '') {
        let hash = event.target.hash;
        hash = hash.slice(1);
        const element = document.querySelector(`.${hash}`);
        if (element) { element.scrollIntoView({ behavior: 'smooth' }); }
    }

    modulesTree() {
        const container = document.createElement('div');
        const root = document.createElement('p');
        root.innerHTML = `root: ${this.repo.name} | stars: ${this.repo.stargazers_count} | forks: ${this.repo.forks_count}`;

        const levelOneUL = ceateModuleTree(this.repo, 0, this.level);

        container.appendChild(root);
        container.appendChild(levelOneUL);

        return container.outerHTML;
    }

    onRangeChange(e) {
        this.level = e.target.value;
        this.modulesTree();
    }

    ngOnDestroy() {

    }

}
