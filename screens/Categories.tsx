
import React, { useState } from 'react';
import { CATEGORIES, MOCK_SONGS } from '../data';
import { TrackRow } from '../components/SongComponents';

type TabType = 'SEASON' | 'USAGE' | 'TAG';

export const CategoriesScreen: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabType>('SEASON');
  const [selectedFilter, setSelectedFilter] = useState<string | null>(null);

  const filteredSongs = MOCK_SONGS.filter(s => {
    if (!selectedFilter) return false;
    if (activeTab === 'SEASON') return s.category === selectedFilter;
    if (activeTab === 'USAGE') return s.usage === selectedFilter;
    if (activeTab === 'TAG') return s.tags.includes(selectedFilter);
    return false;
  });

  const renderFilterGrid = (items: string[]) => (
    <div className="grid grid-cols-2 gap-3 mt-4">
      {items.map(item => (
        <button
          key={item}
          onClick={() => setSelectedFilter(item)}
          className={`p-4 rounded-2xl text-sm font-bold transition-all border ${
            selectedFilter === item 
              ? 'bg-indigo-600 text-white border-indigo-600 shadow-lg shadow-indigo-200' 
              : 'bg-white text-slate-600 border-slate-100 hover:border-indigo-200'
          }`}
        >
          {item}
        </button>
      ))}
    </div>
  );

  return (
    <div className="p-4 pb-32 space-y-6">
      <div className="flex bg-slate-100 p-1 rounded-xl">
        {(['SEASON', 'USAGE', 'TAG'] as const).map(tab => (
          <button
            key={tab}
            onClick={() => { setActiveTab(tab); setSelectedFilter(null); }}
            className={`flex-1 py-2 rounded-lg text-xs font-bold transition-all ${
              activeTab === tab ? 'bg-white text-indigo-600 shadow-sm' : 'text-slate-500'
            }`}
          >
            {tab === 'SEASON' ? '전례 시기' : tab === 'USAGE' ? '용도' : '태그'}
          </button>
        ))}
      </div>

      {!selectedFilter ? (
        <>
          {activeTab === 'SEASON' && renderFilterGrid(CATEGORIES.seasons)}
          {activeTab === 'USAGE' && renderFilterGrid(CATEGORIES.usages)}
          {activeTab === 'TAG' && (
            <div className="flex flex-wrap gap-2 mt-4">
              {CATEGORIES.tags.map(tag => (
                <button
                  key={tag}
                  onClick={() => setSelectedFilter(tag)}
                  className="px-4 py-2 bg-white border border-slate-100 rounded-full text-xs font-medium text-slate-600 hover:border-indigo-500"
                >
                  #{tag}
                </button>
              ))}
            </div>
          )}
        </>
      ) : (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-bold">"{selectedFilter}" 결과</h3>
            <button onClick={() => setSelectedFilter(null)} className="text-xs text-indigo-600 font-bold">초기화</button>
          </div>
          <div className="space-y-1">
            {filteredSongs.length > 0 ? (
              filteredSongs.map(song => <TrackRow key={song.id} song={song} />)
            ) : (
              <p className="py-20 text-center text-slate-400 italic">해당 카테고리의 곡이 없습니다.</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
