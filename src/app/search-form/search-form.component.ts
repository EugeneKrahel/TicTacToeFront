import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Game} from '../models/game';
import {TagsService} from '../services/tags.service';
import {GamesService} from '../services/games.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-search-form',
  templateUrl: './search-form.component.html',
  styleUrls: ['./search-form.component.css']
})
export class SearchFormComponent implements OnInit {
  newGameForm: FormGroup;
  @Output() games: EventEmitter<Game[]> = new EventEmitter<Game[]>();
  public searchTag: string;
  constructor(private tagsService: TagsService, private fb: FormBuilder, private gamesService: GamesService, private router: Router) {
    this.createForm();
  }

  private createForm(): void {
    this.newGameForm = this.fb.group({
      name: ['', [Validators.required]],
      tags: []
    });
  }

  ngOnInit(): void {
  }

  search(): void {
    this.gamesService.findGameByTag(this.searchTag).subscribe(data => {
      console.log(data);
      this.games.emit(data);
    });
  }
}
