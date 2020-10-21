import {Component, OnInit} from '@angular/core';
import {TagsService} from '../services/tags.service';
import {AbstractControl, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Game} from '../models/game';
import {GamesService} from '../services/games.service';
import {Router} from '@angular/router';
import {StateContent} from '../models/stateContent';

@Component({
  selector: 'app-create-new-game',
  templateUrl: './create-new-game.component.html',
  styleUrls: ['./create-new-game.component.css']
})

export class CreateNewGameComponent implements OnInit {
  tags: string[];
  games: Game[];
  newGameForm: FormGroup;

  constructor(private tagsService: TagsService, private fb: FormBuilder, private gamesService: GamesService, private router: Router) {
    this.createForm();
  }

  private createForm(): void {
    this.newGameForm = this.fb.group({
      name: ['', [Validators.required]],
      tags: []
    });
  }

  get _name(): AbstractControl {
    return this.newGameForm.get('name');
  }

  ngOnInit(): void {
    this.gamesService.findAllGames().subscribe(data => {
      this.games = data;
    });
  }

  onTextChange($event: string): void {
    if ($event.length > 2) {
      this.tagsService.search($event).subscribe(data => {
        console.log(data);
        this.tags = data.map(tag => tag.name);
      });
    }
  }

  takenGame(name: string): boolean {
    if (!this.games) {
      return false;
    }
    for (const game of this.games) {
      if (name === game.name) {
        return true;
      }
    }
    return false;
  }

  click(): void {
    const game: Game = new Game();
    const stateContent: StateContent = new StateContent();
    game.name = this.newGameForm.value.name;
    console.log(this.newGameForm.value);
    game.tags = this.newGameForm.value.tags?.map(tag => tag.value);
    console.log(game);
    this.gamesService.save(game).subscribe(data => {
      console.log(data);
    });
    stateContent.name = game.name;
    stateContent.isHost = true;
    this.router.navigate(['/GameField'], {state: {data: stateContent}});
  }
}
