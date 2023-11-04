import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Movie } from '../Model/movies';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  private url: string = 'https://api.themoviedb.org/3';
  private apiKey: string = 'c16ce19c1a5515a800d2d39039ce0d29'; // Replace with your actual API key

  constructor(private http: HttpClient) {}

  getLatestMovies(): Observable<any> {
    return this.http.get<any>(`${this.url}/movie/latest?api_key=${this.apiKey}`);
  }

  getPopularMovies(): Observable<Movie> {
    return this.http.get<Movie>(`${this.url}/movie/popular?api_key=${this.apiKey}`);
  }

  getNowPlayingMovies(): Observable<Movie> {
    return this.http.get<Movie>(`${this.url}/movie/now_playing?api_key=${this.apiKey}`);
  }

  getTopRatedMovies(): Observable<Movie> {
    return this.http.get<Movie>(`${this.url}/movie/top_rated?api_key=${this.apiKey}`);
  }

  getUpcomingMovies(): Observable<Movie> {
    return this.http.get<Movie>(`${this.url}/movie/upcoming?api_key=${this.apiKey}`);
  }

  getTrendingMovies(): Observable<Movie> {
    return this.http.get<Movie>(`${this.url}/trending/all/week?api_key=${this.apiKey}`);
  }

  getOriginals(): Observable<Movie> {
    return this.http.get<Movie>(`${this.url}/discover/tv?api_key=${this.apiKey}`);
  }
}
