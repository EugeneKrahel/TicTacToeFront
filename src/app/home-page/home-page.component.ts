import {Component, OnInit} from '@angular/core';
import {Game} from '../models/game';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {

  games: Game[] = [];

  constructor() {
  }

  ngOnInit(): void {
  }

}
