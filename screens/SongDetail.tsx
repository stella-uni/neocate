
import React from 'react';
import { usePlayer } from '../store/PlayerContext';
import { SheetViewer } from '../components/SongComponents';
import { Play, Pause, SkipBack, SkipForward, Download, Heart } from 'lucide-react';

export const SongDetailScreen: React.FC = () => {
  const { selectedSongDetail, currentSong, isPlaying, togglePlay, nextSong, prevSong, playSong } = usePlayer();
  
  if (!selectedSongDetail) return null;
  
  const isCurrentlyPlaying = currentSong?.id === selectedSongDetail.id;

  return (
    <div className="p-4 pb-40 space-y-6">
      <div className="text-center space-y-1">
        <span className="text-indigo-600 text-xs font-bold px-2 py-0.5 bg-indigo-50 rounded-full">
          가톨릭 성가 {selectedSongDetail.number}번
        </span>
        <h2 className="text-2xl font-black text-slate-900">{selectedSongDetail.title}</h2>
        <p className="text-sm text-slate-500">{selectedSongDetail.composer || '작곡 미상'}</p>
      </div>

      <SheetViewer song={selectedSongDetail} />

      <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100 space-y-8">
        <div className="flex items-center justify-between">
          <button className="text-slate-400 hover:text-red-500"><Heart className="w-6 h-6" /></button>
          <div className="flex items-center space-x-8">
            <button onClick={prevSong} className="text-slate-600 hover:text-indigo-600 transition-colors">
              <SkipBack className="w-8 h-8 fill-current" />
            </button>
            <button 
              onClick={() => isCurrentlyPlaying ? togglePlay() : playSong(selectedSongDetail)}
              className="w-16 h-16 bg-indigo-600 rounded-full flex items-center justify-center text-white shadow-xl shadow-indigo-200 hover:scale-105 active:scale-95 transition-transform"
            >
              {isCurrentlyPlaying && isPlaying ? <Pause className="w-8 h-8 fill-current" /> : <Play className="w-8 h-8 fill-current ml-1" />}
            </button>
            <button onClick={nextSong} className="text-slate-600 hover:text-indigo-600 transition-colors">
              <SkipForward className="w-8 h-8 fill-current" />
            </button>
          </div>
          <button className="text-slate-400 hover:text-indigo-600"><Download className="w-6 h-6" /></button>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div className="bg-slate-50 p-4 rounded-2xl">
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">전례 시기</p>
          <p className="text-sm font-bold text-slate-700">{selectedSongDetail.category}</p>
        </div>
        <div className="bg-slate-50 p-4 rounded-2xl">
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">용도</p>
          <p className="text-sm font-bold text-slate-700">{selectedSongDetail.usage}</p>
        </div>
      </div>
    </div>
  );
};
