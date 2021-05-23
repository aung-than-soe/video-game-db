import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { forkJoin, Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { APIResponse, Game } from '../models/models';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private http: HttpClient) { }

  getGames(ordering: string, search?: string): Observable<APIResponse<Game>> {
    let params = new HttpParams();
    params = params.append('ordering', ordering);

    if(search) {
      params = params.appendAll({'ordering': ordering, 'search': search})
    }
    return this.http.get<APIResponse<Game>>(`${environment.BASE_URL}/games`, { params: params }).pipe(tap(console.log))
  }

  getGameDetails(id: number): Observable<Game> {
    const gameInfo = this.http.get<Game>(`${environment.BASE_URL}/games/${id}`);
    const gameTrailers = this.http.get(`${environment.BASE_URL}/games/${id}/movies`);
    const gameScreenShots = this.http.get(`${environment.BASE_URL}/games/${id}/screenshots`);
    return forkJoin({
      info: gameInfo,
      trailers: gameTrailers,
      screenShots: gameScreenShots
    }).pipe(
      map((res: any) => ({
        ...res['info'],
      screenshots: res['screenShots']?.results,
      trailers: res['trailers']?.results}))
    )
  }
}
