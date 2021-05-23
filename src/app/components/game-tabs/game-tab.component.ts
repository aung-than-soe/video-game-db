import { Game } from './../../models/models';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-game-tabs',
  templateUrl: './game-tab.component.html',
  styleUrls: ['./game-tab.component.scss']
})
export class GameTabsComponent implements OnInit {


  @Input('game') game!: Game;

  constructor() { }

  ngOnInit(): void {
    console.log(this.game)
  }

}
