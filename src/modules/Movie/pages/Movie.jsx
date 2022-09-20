import React from "react";
import { useParams } from "react-router-dom";

import Overview from "../components/Overview";
import Showtimes from "../components/Showtimes";

const Movie = () => {
  // useParams là hook để lấy giá trị params trên url
  const { movieId } = useParams();

  return (
    <div>
      <div>
        <Overview movieId={movieId} />
      </div>

      <div style={{ margin: "50px 0px" }}>
        <Showtimes movieId={movieId} />
      </div>
    </div>
  );
};

export default Movie;
