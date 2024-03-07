export class Track {
  id: string; // uuid v4
  name: string;
  artistId: string | null; // refers to Artist uuid v4
  albumId: string | null; // refers to Album uuid v4
  duration: number; // integer number
}
