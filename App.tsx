
import React, { useState } from 'react';
import { PlayerProvider, usePlayer } from './store/PlayerContext';
import { TopAppBar, BottomNavBar, MiniPlayerBar } from './components/Layout';
import { HomeScreen } from './screens/Home';
import { SongsScreen } from './screens/Songs';
import { CategoriesScreen } from './screens/Categories';
import { SongDetailScreen } from './screens/SongDetail';
import { SettingsScreen } from './screens/Settings';
import { PlayerFull } from './screens/PlayerFull';

const ScreenRenderer: React.FC = () => {
  const { activeScreen } = usePlayer();

  switch(activeScreen) {
    case 'HOME': return <HomeScreen />;
    case 'SONGS': return <SongsScreen />;
    case 'CATEGORIES': return <CategoriesScreen />;
    case 'SONG_DETAIL': return <SongDetailScreen />;
    case 'SETTINGS': return <SettingsScreen />;
    case 'PLAYLISTS': return (
      <div className="flex flex-col items-center justify-center py-40 space-y-4">
        <div className="w-20 h-20 rounded-full bg-slate-100 flex items-center justify-center text-slate-300">
          <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" /></svg>
        </div>
        <p className="text-slate-400 font-medium">플레이리스트 기능 준비 중...</p>
      </div>
    );
    default: return <HomeScreen />;
  }
};

const MainContent: React.FC = () => {
  const [isPlayerFull, setIsPlayerFull] = useState(false);

  return (
    <div className="relative h-screen flex flex-col bg-slate-50 overflow-hidden">
      <TopAppBar />
      <main className="flex-1 overflow-y-auto no-scrollbar mt-16 pb-16">
        <ScreenRenderer />
      </main>
      <MiniPlayerBar onExpand={() => setIsPlayerFull(true)} />
      <BottomNavBar />
      <PlayerFull isOpen={isPlayerFull} onClose={() => setIsPlayerFull(false)} />
    </div>
  );
};

const App: React.FC = () => {
  return (
    <PlayerProvider>
      <MainContent />
    </PlayerProvider>
  );
};

export default App;
