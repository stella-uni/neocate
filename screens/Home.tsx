
import React from 'react';
import { usePlayer } from '../store/PlayerContext';
import { TrackRow } from '../components/SongComponents';
import { Play } from 'lucide-react';

export const HomeScreen: React.FC = () => {
  const { recentSongs, navigateTo, playSong } = usePlayer();
  const mostRecent = recentSongs[0];

  return (
    <div className="p-4 space-y-8 pb-32">
      <section>
        <h2 className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-4">가장 최근에 부른 곡</h2>
        {mostRecent ? (
          <div 
            className="relative h-48 rounded-2xl overflow-hidden shadow-xl cursor-pointer group"
            onClick={() => navigateTo('SONG_DETAIL', mostRecent)}
          >
            <img src={mostRecent.sheets[0]} alt="" className="w-full h-full object-cover blur-[2px] scale-110 group-hover:scale-125 transition-transform duration-700" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-black/20" />
            <div className="absolute bottom-6 left-6 right-6 flex items-end justify-between">
              <div>
                <p className="text-white/70 text-xs font-medium mb-1">성가 {mostRecent.number}번</p>
                <h3 className="text-white text-2xl font-bold">{mostRecent.title}</h3>
              </div>
              <button 
                onClick={(e) => { e.stopPropagation(); playSong(mostRecent); }}
                className="w-14 h-14 bg-white rounded-full flex items-center justify-center shadow-lg hover:scale-105 active:scale-95 transition-transform"
              >
                <Play className="w-7 h-7 text-indigo-600 fill-current ml-1" />
              </button>
            </div>
          </div>
        ) : (
          <div className="h-48 rounded-2xl border-2 border-dashed border-slate-200 flex flex-col items-center justify-center text-slate-400">
            <p>최근 재생한 성가가 없습니다.</p>
            <p className="text-xs">마음에 드는 성가를 먼저 찾아보세요.</p>
          </div>
        )}
      </section>

      <section>
        <div className="flex justify-between items-end mb-4">
          <h2 className="text-sm font-bold text-slate-500 uppercase tracking-wider">최근 목록</h2>
          <button onClick={() => navigateTo('SONGS')} className="text-xs font-bold text-indigo-600">더보기</button>
        </div>
        <div className="space-y-1">
          {recentSongs.slice(1, 6).map(song => (
            <TrackRow key={song.id} song={song} />
          ))}
          {recentSongs.length <= 1 && (
            <p className="text-center py-10 text-slate-400 text-sm italic">탐색을 시작해 보세요!</p>
          )}
        </div>
      </section>
    </div>
  );
};
