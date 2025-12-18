
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Song, PlayMode, ScreenType, Playlist } from '../types';
import { MOCK_SONGS } from '../data';

interface PlayerContextType {
  currentSong: Song | null;
  isPlaying: boolean;
  playMode: PlayMode;
  queue: Song[];
  recentSongs: Song[];
  activeScreen: ScreenType;
  selectedSongDetail: Song | null;
  playlists: Playlist[];
  
  playSong: (song: Song) => void;
  togglePlay: () => void;
  nextSong: () => void;
  prevSong: () => void;
  setPlayMode: (mode: PlayMode) => void;
  navigateTo: (screen: ScreenType, song?: Song) => void;
  addToPlaylist: (playlistId: string, songId: string) => void;
  createPlaylist: (name: string) => void;
}

const PlayerContext = createContext<PlayerContextType | undefined>(undefined);

export const PlayerProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [currentSong, setCurrentSong] = useState<Song | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [playMode, setPlayMode] = useState<PlayMode>('OFF');
  const [queue, setQueue] = useState<Song[]>(MOCK_SONGS);
  const [recentSongs, setRecentSongs] = useState<Song[]>([]);
  const [activeScreen, setActiveScreen] = useState<ScreenType>('HOME');
  const [selectedSongDetail, setSelectedSongDetail] = useState<Song | null>(null);
  const [playlists, setPlaylists] = useState<Playlist[]>([
    { id: 'fav', name: '즐겨찾기', songIds: [] }
  ]);

  const playSong = (song: Song) => {
    setCurrentSong(song);
    setIsPlaying(true);
    setRecentSongs(prev => {
      const filtered = prev.filter(s => s.id !== song.id);
      return [song, ...filtered].slice(0, 10);
    });
  };

  const togglePlay = () => setIsPlaying(!isPlaying);

  const nextSong = () => {
    if (!currentSong) return;
    const idx = queue.findIndex(s => s.id === currentSong.id);
    const nextIdx = (idx + 1) % queue.length;
    playSong(queue[nextIdx]);
  };

  const prevSong = () => {
    if (!currentSong) return;
    const idx = queue.findIndex(s => s.id === currentSong.id);
    const prevIdx = (idx - 1 + queue.length) % queue.length;
    playSong(queue[prevIdx]);
  };

  const navigateTo = (screen: ScreenType, song?: Song) => {
    if (song) setSelectedSongDetail(song);
    setActiveScreen(screen);
  };

  const addToPlaylist = (playlistId: string, songId: string) => {
    setPlaylists(prev => prev.map(pl => 
      pl.id === playlistId 
        ? { ...pl, songIds: pl.songIds.includes(songId) ? pl.songIds : [...pl.songIds, songId] }
        : pl
    ));
  };

  const createPlaylist = (name: string) => {
    setPlaylists(prev => [...prev, { id: Date.now().toString(), name, songIds: [] }]);
  };

  return (
    <PlayerContext.Provider value={{
      currentSong, isPlaying, playMode, queue, recentSongs, activeScreen, selectedSongDetail, playlists,
      playSong, togglePlay, nextSong, prevSong, setPlayMode, navigateTo, addToPlaylist, createPlaylist
    }}>
      {children}
    </PlayerContext.Provider>
  );
};

export const usePlayer = () => {
  const context = useContext(PlayerContext);
  if (!context) throw new Error('usePlayer must be used within a PlayerProvider');
  return context;
};
