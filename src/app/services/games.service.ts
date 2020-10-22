import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {Game} from '../models/game';

@Injectable({providedIn: 'root'})
export class GamesService {

  GameWithTag: Game[];

  httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  };

  constructor(private http: HttpClient) {
  }

  findAllGames(): Observable<Game[]> {
    return this.http.get<Game[]>('https://ilearning-tic-tac-toe-back.herokuapp.com/games');
  }

  save(game: Game): Observable<Game> {
    return this.http.post<Game>('https://ilearning-tic-tac-toe-back.herokuapp.com/games', game, this.httpOptions);
  }

  delete(game: Game): Observable<void> {
    return this.http.delete<void>(`https://ilearning-tic-tac-toe-back.herokuapp.com/games?name=${game.name}`);
  }

  findGameByTag(tagPattern: string): Observable<Game[]> {
    return  this.http.get<Game[]>(`https://ilearning-tic-tac-toe-back.herokuapp.com/games/search?name=${tagPattern}`);
  }
}
