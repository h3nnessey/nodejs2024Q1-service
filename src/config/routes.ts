export enum Routes {
  Auth = 'auth',
  Users = 'user',
  Albums = 'album',
  Artists = 'artist',
  Tracks = 'track',
  Favorites = 'favs',
  FavoritesAlbums = Routes.Albums,
  FavoritesTracks = Routes.Tracks,
  FavoritesArtists = Routes.Artists,
}
