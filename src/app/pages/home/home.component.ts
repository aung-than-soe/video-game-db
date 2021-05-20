import { HttpService } from './../../services/http.service';
import { APIResponse, Game, ParentPlatform } from './../../models/models';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { concatMap, filter, map, mergeMap, pluck, tap } from 'rxjs/operators';
import { iif, Observable } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  sort!: string;
  sortOptions: {[prop: string]: string}[] = [
    { value: 'name', label: 'Name'},
    { value: '-released', label: 'Released' },
    { value: '-added', label: 'Added' },
    { value: '-created', label: 'Created' },
    { value: '-updated', label: 'Updated' },
    { value: 'rating', label: 'Rating' },
    { value: 'metacritic', label: 'Metacritic'}
  ]
  games!: Game[];
  games$!: Observable<Game[]>;

  constructor(private httpService: HttpService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.games$ = this.route.params.pipe(
      pluck('game-search'),
      mergeMap(value => iif(() => !!value,
        this.searchGames('metacrit', value),
        this.searchGames('metacrit')
      )),
      pluck('results'),
      tap(console.log)
    );
  }

  private searchGames(type: string, search?: string): Observable<APIResponse<Game>> {
    return this.httpService.getGames(type, search);
  }

  trackById(_: number, gamePlatform: ParentPlatform): number {
    return gamePlatform.platform.id;
  }
}
