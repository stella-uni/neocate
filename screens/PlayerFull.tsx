
import React from 'react';
import { usePlayer } from '../store/PlayerContext';
import { Play, Pause, SkipBack, SkipForward, ChevronDown, Repeat, Repeat1, Shuffle, ListMusic } from 'lucide-react';

export const PlayerFull: React.FC<{ isOpen: boolean; onClose: () => void }> = ({ isOpen, onClose }) => {
  const { currentSong, isPlaying, togglePlay, nextSong, prevSong, playMode, setPlayMode } = usePlayer();
  
  if (!currentSong) return null;

  const cyclePlayMode = () => {
    if (playMode === 'OFF') setPlayMode('ALL');
    else if (playMode === 'ALL') setPlayMode('ONE');
    else setPlayMode('OFF');
  };

  const getPlayModeIcon = () => {
    switch(playMode) {
      case 'ALL': return <Repeat className="w-6 h-6 text-indigo-600" />;
      case 'ONE': return <Repeat1 className="w-6 h-6 text-indigo-600" />;
      default: return <Repeat className="w-6 h-6 text-slate-400" />;
    }
  };

  return (
    <div 
      className={`fixed inset-0 bg-white z-[60] transition-transform duration-500 ease-in-out flex flex-col ${
        isOpen ? 'translate-y-0' : 'translate-y-full'
      } safe-top safe-bottom`}
    >
      <header className="h-16 flex items-center px-4">
        <button onClick={onClose} className="p-2 -ml-2 rounded-full hover:bg-slate-100">
          <ChevronDown className="w-6 h-6" />
        </button>
        <p className="flex-1 text-center font-bold text-sm text-slate-500 uppercase tracking-widest">Now Playing</p>
        <button className="p-2 -mr-2 rounded-full hover:bg-slate-100 opacity-0">
          <ChevronDown className="w-6 h-6" />
        </button>
      </header>

      <div className="flex-1 flex flex-col px-8 pt-8 pb-12 space-y-10">
        <div className="aspect-square w-full rounded-[40px] overflow-hidden shadow-2xl shadow-indigo-100">
          <img src={currentSong.sheets[0]} alt="" className="w-full h-full object-cover" />
        </div>

        <div className="space-y-2">
          <h2 className="text-2xl font-black text-slate-900 text-center">{currentSong.title}</h2>
          <p className="text-slate-500 font-medium text-center">성가 {currentSong.number}번 • {currentSong.composer}</p>
        </div>

        <div className="space-y-4">
          <div className="relative h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
            <div className="absolute top-0 left-0 h-full w-1/3 bg-indigo-600 rounded-full" />
          </div>
          <div className="flex justify-between text-[10px] font-bold text-slate-400">
            <span>1:24</span>
            <span>4:15</span>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <button onClick={cyclePlayMode}>{getPlayModeIcon()}</button>
          <div className="flex items-center space-x-10">
            <button onClick={prevSong}><SkipBack className="w-10 h-10 fill-current text-slate-800" /></button>
            <button 
              onClick={togglePlay}
              className="w-20 h-20 bg-slate-900 rounded-full flex items-center justify-center text-white shadow-xl active:scale-90 transition-transform"
            >
              {isPlaying ? <Pause className="w-10 h-10 fill-current" /> : <Play className="w-10 h-10 fill-current ml-1" />}
            </button>
            <button onClick={nextSong}><SkipForward className="w-10 h-10 fill-current text-slate-800" /></button>
          </div>
          <button><Shuffle className="w-6 h-6 text-slate-400" /></button>
        </div>

        <div className="flex justify-center pt-4">
          <button className="flex items-center space-x-2 text-slate-500 hover:text-indigo-600 px-4 py-2 rounded-full border border-slate-100">
            <ListMusic className="w-5 h-5" />
            <span className="text-xs font-bold">다음 재생 목록</span>
          </button>
        </div>
      </div>
    </div>
  );
};
