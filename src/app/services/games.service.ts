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
    return this.http.get<Game[]>('http://localhost:3000/games');
  }

  save(game: Game): Observable<Game> {
    return this.http.post<Game>('http://localhost:3000/games', game, this.httpOptions);
  }

  delete(game: Game): Observable<void> {
    return this.http.delete<void>(`http://localhost:3000/games?name=${game.name}`);
  }

  findGameByTag(tagPattern: string): Observable<Game[]> {
    return  this.http.get<Game[]>(`http://localhost:3000/games/search?name=${tagPattern}`);
  }
}
