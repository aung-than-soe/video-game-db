import { filter, pluck, switchMap, tap } from 'rxjs/operators';
import { HttpService } from './../../services/http.service';
import { Subscription, Observable } from 'rxjs';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Game } from 'src/app/models/models';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-game-detail',
  templateUrl: './game-detail.component.html',
  styleUrls: ['./game-detail.component.scss']
})
export class GameDetailComponent implements OnInit, OnDestroy {

  gameRating: number = 0;
  game!: Game;
  routeSub!: Subscription;

  constructor(private route: ActivatedRoute, private httpService: HttpService) { }

  ngOnInit(): void {
    this.routeSub = this.route.params.pipe(
      pluck("id"),
      filter(id => id && id > 0),
      switchMap(id => this.getGameDetails(id)),
      filter(game => !!game)
    ).subscribe((game: Game) => {
      this.game = game;
    });
  }

  getColor(value: number):string {
    return value > 75 ? '#5ee432' : value> 50 ? '#fffa50' : value > 30 ? '#f7aa38' : '#ef4655';
  }

  private getGameDetails(id: number): Observable<Game> {
    return this.httpService.getGameDetails(id);
  }

  ngOnDestroy(): void {
    this.routeSub?.unsubscribe();
  }

}
