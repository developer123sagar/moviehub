const key = "4ddd7167158405dd58fd136ee7f0a054";

const Requests = {
  requestPopular: `https://api.themoviedb.org/3/movie/popular?api_key=${key}&language=en-US&page=1`,
  requestTopRated: `https://api.themoviedb.org/3/movie/top_rated?api_key=${key}&language=en-US&page=1`,
  requestTrending: `https://api.themoviedb.org/3/movie/popular?api_key=${key}&language=en-US&page=2`,
  requestUpcoming: `https://api.themoviedb.org/3/movie/upcoming?api_key=${key}&language=en-US&page=1`,
  requestRecommendation: `https://api.themoviedb.org/3/movie/2/recommendations?api_key=${key}&language=en-US&page=2`,
  requestSimilarMovies: `https://api.themoviedb.org/3/movie/2/similar?api_key=${key}&language=en-US&page=1`,
};

export default Requests;