import { HttpService } from './../../services/http.service';
import { Game } from './../../models/models';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { pluck, take } from 'rxjs/operators';
import { Subscription } from 'rxjs';

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
    { value: '-rating', label: 'Rating' },
    { value: 'metacrit', label: 'Metacritic'}
  ]
  games!: Game[];
  routeSub!: Subscription;
  gameSub!: Subscription;

  constructor(private router: Router, private httpService: HttpService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.routeSub = this.route.params
    .pipe(pluck('game-search'), take(1))
    .subscribe(val => {
      if(val) {
        this.loadGames('metacrit', val);
      } else {
        this.loadGames('metacrit');
      }
    });
  }

  loadGames(type: string, search?: string): void {
    this.gameSub = this.httpService.getGames(type, search)
    .pipe(pluck('results'))
    .subscribe(games => {
      this.games = [...games];
    });
  }

  trackById(_: number, obj: Game): number {
    return obj.id;
  }

  openGame(id: number) {
    this.router.navigate(['details', id]);
  }

  ngOnDestroy(): void {
    this.gameSub?.unsubscribe();
    this.routeSub?.unsubscribe();
  }
}
