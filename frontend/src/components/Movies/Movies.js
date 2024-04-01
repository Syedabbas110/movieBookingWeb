// import { Box, Typography } from "@mui/material";
// import React, { useEffect, useState } from "react";
// import { getAllMovies } from "../../api-helpers/api-helpers";
// import MovieItem from "./MovieItem";

// const Movies = async () => {
//   const [movies, setMovies] = useState([]);
//   useEffect(() => {
//         const data = getAllMovies();
//         console.log("API Response:", data); // Check the response data
//         setMovies(data.movies);
//   }, []);
  
//   console.log("Movies component - Movie IDs:", movies);

//   return (
//     <Box margin={"auto"} marginTop={4}>
//       <Typography
//         margin={"auto"}
//         variant="h4"
//         padding={2}
//         width="40%"
//         bgcolor={"#900C3F"}
//         color="white"
//         textAlign={"center"}
//       >
//         All Movies
//       </Typography>
//       <Box
//         width={"100%"}
//         margin="auto"
//         marginTop={5}
//         display={"flex"}
//         justifyContent="flex-start"
//         flexWrap={"wrap"}
//       >
      
//       {movies &&
//           movies.slice(1, 4).map((movie, index) => (
//             <MovieItem
//               title={movie.title}
//               releaseDate={movie.releaseDate}
//               posterUrl={movie.posterUrl}
//               id={movie._id} 
//               key={index}
//             />
//           ))}
//       </Box>
//     </Box>
//   );
// };

// export default Movies;
import { Box, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { getAllMovies } from "../../api-helpers/api-helpers";
import MovieItem from "./MovieItem";

const Movies = () => { // Removed "async" here
  const [movies, setMovies] = useState([]);
  
  useEffect(() => {
    getAllMovies()
      .then((data) => {
        console.log("API Response:", data);
        setMovies(data.movies);
      })
      .catch((err) => console.log(err));
  }, []);

  console.log("Movies component - Movie IDs:", movies);

  return (
    <Box margin={"auto"} marginTop={4}>
      <Typography
        margin={"auto"}
        variant="h4"
        padding={2}
        width="40%"
        bgcolor={"#900C3F"}
        color="white"
        textAlign={"center"}
      >
        All Movies
      </Typography>
      <Box
        width={"100%"}
        margin="auto"
        marginTop={5}
        display={"flex"}
        justifyContent="flex-start"
        flexWrap={"wrap"}
      >
      
      {movies &&
          movies.map((movie, index) => (
            <MovieItem
              title={movie.title}
              releaseDate={movie.releaseDate}
              posterUrl={movie.posterUrl}
              id={movie._id} 
              key={index}
            />
          ))}
      </Box>
    </Box>
  );
};

export default Movies;
