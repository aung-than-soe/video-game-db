import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { APIResponse, Game } from '../models/models';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private http: HttpClient) { }

  getGames(ordering: string, search?: string): Observable<APIResponse<Game>> {
    let params = new HttpParams();
    params.set('ordering', ordering);

    if(search) {
      params.set('search', search)
    }

    return this.http.get<APIResponse<Game>>(`${environment.BASE_URL}/games`, { params })
  }
}
