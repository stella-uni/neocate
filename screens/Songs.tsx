
import React, { useState, useMemo } from 'react';
import { MOCK_SONGS } from '../data';
import { TrackRow } from '../components/SongComponents';
import { Search } from 'lucide-react';

export const SongsScreen: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  
  const filteredSongs = useMemo(() => {
    return MOCK_SONGS.filter(s => 
      s.title.includes(searchTerm) || 
      s.number.toString().includes(searchTerm) ||
      s.tags.some(t => t.includes(searchTerm))
    );
  }, [searchTerm]);

  return (
    <div className="p-4 pb-32 space-y-4">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
        <input 
          type="text"
          placeholder="곡명, 성가 번호, 태그 검색..."
          className="w-full pl-10 pr-4 py-3 bg-slate-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20 text-sm"
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="space-y-1">
        {filteredSongs.length > 0 ? (
          filteredSongs.map(song => (
            <TrackRow key={song.id} song={song} />
          ))
        ) : (
          <div className="py-20 text-center text-slate-400 italic">
            검색 결과가 없습니다.
          </div>
        )}
      </div>
    </div>
  );
};
