import {Component, Input, OnInit} from '@angular/core';
import {GamesService} from '../services/games.service';
import {Game} from '../models/game';
import {Router} from '@angular/router';
import {StateContent} from '../models/stateContent';

@Component({
  selector: 'app-all-games',
  templateUrl: './all-games.component.html',
  styleUrls: ['./all-games.component.css']
})
export class AllGamesComponent implements OnInit {

  @Input() games: Game[];
  constructor(private gamesService: GamesService, private router: Router) {
  }

  ngOnInit(): void {
    this.gamesService.findAllGames().subscribe(data => {
      console.log(data);
      this.games = data;
    });
  }

  click(game: Game): void {
    const stateContent: StateContent = new StateContent();
    stateContent.name = game.name;
    stateContent.isHost = false;
    this.router.navigate(['/GameField'], {state: {data: stateContent}});
    this.gamesService.delete(game).subscribe(data => {
      console.log(data);
    });
  }
}
