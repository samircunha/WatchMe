import { MovieCard } from "./MovieCard";
import {useState, useEffect} from "react";

import { api } from "../services/api";

interface ContentProps {
  selectedGenreId: number;
  selectedGenre: {title: string}
}

interface MovieProps {
  imdbID: string;
  Title: string;
  Poster: string;
  Ratings: Array<{
    Source: string;
    Value: string;
  }>;
  Runtime: string;
}

export function Content(props: ContentProps) {
  const [movies, setMovies] = useState<MovieProps[]>([]);

  useEffect(() => {
    api
      .get<MovieProps[]>(`movies/?Genre_id=${props.selectedGenreId}`)
      .then((response) => {
        setMovies(response.data);
      });
  }, [props.selectedGenreId]);

  return(
    <div className="container">
        <header>
          <span className="category">
            Categoria:<span> {props.selectedGenre.title}</span>
          </span>
        </header>

        <main>
          <div className="movies-list">
            {movies.map((movie) => (
              <MovieCard
                key={movie.imdbID}
                title={movie.Title}
                poster={movie.Poster}
                runtime={movie.Runtime}
                rating={movie.Ratings[0].Value}
              />
            ))}
          </div>
        </main>
      </div>
  )
}