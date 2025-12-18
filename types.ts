
export type PlayMode = 'OFF' | 'ONE' | 'ALL';

export interface Song {
  id: string;
  number: number;
  title: string;
  category: string; // e.g., Advent, Christmas
  usage: string; // e.g., Entrance, Offertory
  tags: string[];
  sheets: string[]; // Image URLs
  audioUrl?: string;
  composer?: string;
}

export interface Playlist {
  id: string;
  name: string;
  songIds: string[];
}

export type ScreenType = 'HOME' | 'SONGS' | 'CATEGORIES' | 'PLAYLISTS' | 'SETTINGS' | 'SONG_DETAIL';
