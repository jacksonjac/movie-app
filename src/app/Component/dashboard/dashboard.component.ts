import { Component, OnInit } from '@angular/core';
import { Movie } from '../../Model/movies'; // Replace 'path-to-movie' with the actual path to your Movie model
import { DataService } from 'src/app/Service/data.service';
import { NgbCarouselModule } from '@ng-bootstrap/ng-bootstrap';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})

export class DashboardComponent implements OnInit {
  latestMovie: any;
  popularMovies!: Movie ;
  nowPlayingMovies! :Movie ;
  topRatedMovies!: Movie ;
  trendingMovies!: Movie ;
  upcomingMovies!: Movie ;
  originals!: Movie ;

  

  constructor(private dataService: DataService) { }

  ngOnInit(): void {
    // You can call your service methods here to retrieve data and assign it to the corresponding variables.
    this.getPopularMovies();
    this.getNowPlayingMovies();
    this.getTopRatedMovies();
    this.getUpcomingMovies();
    this.getLatestMovie();
    this.getTrendingMovies();

   
  }
  images = [944, 1011, 984].map((n) => `https://picsum.photos/id/${n}/900/500`);
  getLatestMovie() {
    this.dataService.getLatestMovies().subscribe(res => {
      this.latestMovie = this.changeData(res)
      console.log(this.latestMovie,"latest movies")
    }, err => {
      console.log('Not able to get the latest movie.', err);
    });
  }
  getTrendingMovies(){
    this.dataService.getTrendingMovies().subscribe(res=>{
      this.trendingMovies = this.changeData(res)
      console.log(this.trendingMovies,"trending movie data")
    },err =>{
      console.log("not able to get the latest moviessdf")
    })
  }

  changeData(res: any): any {
    if (!res.backdrop_path) {
      res.backdrop_path = 'https://image.tmdb.org/t/p/original' + res.poster_path + '?api_key=c16ce19c1a5515a800d2d39039ce0d29';
    } else {
      res.backdrop_path = 'https://image.tmdb.org/t/p/original' + res.backdrop_path + '?api_key=c16ce19c1a5515a800d2d39039ce0d29';
    }
    return res;
  }


  getPopularMovies() {
    this.dataService.getPopularMovies().subscribe(res => {
      this.popularMovies = this.modifyData(res);
      console.log(this.popularMovies,"popularmovies")
    }, err => {
      console.log('Error while fetching popular movies.', err);
    });
  }

  getNowPlayingMovies() {
    this.dataService.getNowPlayingMovies().subscribe(res => {
      this.nowPlayingMovies = this.modifyData(res);
      console.log(this.nowPlayingMovies,"now playing movies")
    }, err => {
      console.log('Error while fetching now playing movies.', err);
    });
  }

  getTopRatedMovies() {
    this.dataService.getTopRatedMovies().subscribe(res => {
      this.topRatedMovies = this.modifyData(res);
      console.log(this.topRatedMovies,"toprated")
    }, err => {
      console.log('Error while fetching top-rated movies.', err);
    });
  }

  getUpcomingMovies() {
    this.dataService.getUpcomingMovies().subscribe(res => {
      this.upcomingMovies = this.modifyData(res);
    }, err => {
      console.log('Error while fetching upcoming movies.', err);
    });
  }

  modifyData(movies: Movie): Movie {
    if (movies.results) {
      movies.results.forEach(element => {
        if (element.backdrop_path) {
          element.backdrop_path = `https://image.tmdb.org/t/p/original${element.backdrop_path}?api_key=c16ce19c1a5515a800d2d39039ce0d29`;
        }
        if (!element.title) {
          element.title = element?.name || '';
        }
      });
    }
    return movies;
  }
  }