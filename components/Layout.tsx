
import React from 'react';
import { usePlayer } from '../store/PlayerContext';
import { Home, Music, Grid, ListMusic, Settings, ChevronLeft, Search, Play, Pause, SkipForward } from 'lucide-react';
import { ScreenType } from '../types';

export const TopAppBar: React.FC = () => {
  const { activeScreen, navigateTo } = usePlayer();
  
  const getTitle = () => {
    switch(activeScreen) {
      case 'HOME': return '홈';
      case 'SONGS': return '성가 목록';
      case 'CATEGORIES': return '분류 탐색';
      case 'PLAYLISTS': return '내 리스트';
      case 'SETTINGS': return '설정';
      case 'SONG_DETAIL': return '성가 상세';
      default: return '가톨릭 성가';
    }
  };

  const isDetail = activeScreen === 'SONG_DETAIL';

  return (
    <header className="fixed top-0 left-0 right-0 h-16 bg-white border-b border-slate-200 z-50 flex items-center px-4 safe-top">
      {isDetail && (
        <button onClick={() => navigateTo('SONGS')} className="mr-3 p-1 rounded-full hover:bg-slate-100">
          <ChevronLeft className="w-6 h-6" />
        </button>
      )}
      <h1 className="text-xl font-bold flex-1">{getTitle()}</h1>
      <button className="p-2 rounded-full hover:bg-slate-100">
        <Search className="w-5 h-5 text-slate-600" />
      </button>
    </header>
  );
};

export const MiniPlayerBar: React.FC<{ onExpand: () => void }> = ({ onExpand }) => {
  const { currentSong, isPlaying, togglePlay, nextSong } = usePlayer();
  
  if (!currentSong) return null;

  return (
    <div 
      className="fixed bottom-16 left-0 right-0 h-16 bg-white border-t border-slate-200 shadow-lg flex items-center px-4 z-40 cursor-pointer"
      onClick={onExpand}
    >
      <div className="w-12 h-12 rounded overflow-hidden bg-slate-200 flex-shrink-0">
        <img src={currentSong.sheets[0]} alt="" className="w-full h-full object-cover" />
      </div>
      <div className="ml-3 flex-1 min-w-0">
        <p className="text-sm font-bold truncate">{currentSong.title}</p>
        <p className="text-xs text-slate-500 truncate">성가 {currentSong.number}번</p>
      </div>
      <div className="flex items-center space-x-2" onClick={e => e.stopPropagation()}>
        <button onClick={togglePlay} className="p-2 rounded-full hover:bg-slate-100">
          {isPlaying ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6 fill-current" />}
        </button>
        <button onClick={nextSong} className="p-2 rounded-full hover:bg-slate-100">
          <SkipForward className="w-6 h-6" />
        </button>
      </div>
    </div>
  );
};

export const BottomNavBar: React.FC = () => {
  const { activeScreen, navigateTo } = usePlayer();

  const navItems: { type: ScreenType; icon: React.FC<any>; label: string }[] = [
    { type: 'HOME', icon: Home, label: '홈' },
    { type: 'SONGS', icon: Music, label: '목록' },
    { type: 'CATEGORIES', icon: Grid, label: '분류' },
    { type: 'PLAYLISTS', icon: ListMusic, label: '리스트' },
    { type: 'SETTINGS', icon: Settings, label: '설정' },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 h-16 bg-white border-t border-slate-200 flex justify-around items-center z-50 safe-bottom">
      {navItems.map(item => (
        <button
          key={item.type}
          onClick={() => navigateTo(item.type)}
          className={`flex flex-col items-center justify-center space-y-1 transition-colors ${
            activeScreen === item.type ? 'text-indigo-600' : 'text-slate-400'
          }`}
        >
          <item.icon className="w-6 h-6" />
          <span className="text-[10px] font-medium">{item.label}</span>
        </button>
      ))}
    </nav>
  );
};
