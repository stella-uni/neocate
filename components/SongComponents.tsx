
import React from 'react';
import { Song } from '../types';
import { Play, MoreVertical } from 'lucide-react';
import { usePlayer } from '../store/PlayerContext';

export const TrackRow: React.FC<{ song: Song }> = ({ song }) => {
  const { playSong, navigateTo, currentSong } = usePlayer();
  const isActive = currentSong?.id === song.id;

  return (
    <div 
      className={`group flex items-center p-3 rounded-xl transition-all cursor-pointer hover:bg-indigo-50 ${isActive ? 'bg-indigo-50/50' : 'bg-white'}`}
      onClick={() => navigateTo('SONG_DETAIL', song)}
    >
      <div className="w-10 h-10 rounded-lg bg-slate-100 flex items-center justify-center font-bold text-slate-500 mr-4">
        {song.number}
      </div>
      <div className="flex-1 min-w-0">
        <h4 className={`text-sm font-semibold truncate ${isActive ? 'text-indigo-600' : 'text-slate-900'}`}>
          {song.title}
        </h4>
        <div className="flex gap-2 mt-0.5">
          <span className="text-[10px] bg-slate-100 text-slate-500 px-1.5 py-0.5 rounded-sm">{song.category}</span>
          <span className="text-[10px] bg-indigo-100 text-indigo-600 px-1.5 py-0.5 rounded-sm">{song.usage}</span>
        </div>
      </div>
      <div className="flex items-center space-x-1" onClick={e => e.stopPropagation()}>
        <button 
          onClick={() => playSong(song)}
          className="p-2 rounded-full hover:bg-white text-indigo-600 transition-opacity"
        >
          <Play className="w-5 h-5 fill-current" />
        </button>
        <button className="p-2 rounded-full hover:bg-white text-slate-400">
          <MoreVertical className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

export const SheetViewer: React.FC<{ song: Song }> = ({ song }) => {
  const [page, setPage] = React.useState(0);
  
  return (
    <div className="relative aspect-[3/4] bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
      <img 
        src={song.sheets[page]} 
        alt={`${song.title} page ${page + 1}`} 
        className="w-full h-full object-contain p-4"
      />
      {song.sheets.length > 1 && (
        <div className="absolute bottom-4 left-0 right-0 flex justify-center items-center space-x-4">
          <button 
            disabled={page === 0}
            onClick={() => setPage(p => p - 1)}
            className="w-10 h-10 rounded-full bg-white/90 shadow-lg flex items-center justify-center disabled:opacity-30"
          >
            ←
          </button>
          <span className="bg-white/90 px-3 py-1 rounded-full text-xs font-bold shadow-sm">
            {page + 1} / {song.sheets.length}
          </span>
          <button 
            disabled={page === song.sheets.length - 1}
            onClick={() => setPage(p => p + 1)}
            className="w-10 h-10 rounded-full bg-white/90 shadow-lg flex items-center justify-center disabled:opacity-30"
          >
            →
          </button>
        </div>
      )}
    </div>
  );
};
