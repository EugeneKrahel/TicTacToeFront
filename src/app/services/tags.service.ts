import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Tag} from '../models/tag';
import {Injectable} from '@angular/core';

@Injectable({providedIn: 'root'})
export class TagsService {

  httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  };

  constructor(private http: HttpClient) {
  }

  findAllTags(): Observable<Tag[]> {
    return this.http.get<Tag[]>('https://ilearning-tic-tac-toe-back.herokuapp.com/tags');
  }

  search(namePattern: string): Observable<Tag[]> {
    return  this.http.get<Tag[]>(`https://ilearning-tic-tac-toe-back.herokuapp.com/tags/search?name=${namePattern}`);
  }

  save(tag: Tag): Observable<Tag> {
    return this.http.post<Tag>('https://ilearning-tic-tac-toe-back.herokuapp.com/tags', tag, this.httpOptions);
  }

}
