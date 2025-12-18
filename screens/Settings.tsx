
import React from 'react';
import { usePlayer } from '../store/PlayerContext';
import { ChevronRight, Shield, Bell, Info, Mail, Share2 } from 'lucide-react';

export const SettingsScreen: React.FC = () => {
  const { playMode, setPlayMode } = usePlayer();

  const MenuItem: React.FC<{ icon: React.FC<any>; label: string; value?: string; onClick?: () => void }> = ({ icon: Icon, label, value, onClick }) => (
    <button onClick={onClick} className="w-full flex items-center p-4 bg-white hover:bg-slate-50 transition-colors">
      <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center text-slate-600 mr-4">
        <Icon className="w-5 h-5" />
      </div>
      <span className="flex-1 text-left font-semibold text-slate-800">{label}</span>
      {value && <span className="text-sm text-slate-400 mr-2">{value}</span>}
      <ChevronRight className="w-5 h-5 text-slate-300" />
    </button>
  );

  return (
    <div className="p-4 pb-32 space-y-6">
      <section className="space-y-2">
        <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest px-4">재생 설정</h3>
        <div className="rounded-2xl overflow-hidden shadow-sm border border-slate-100">
          <MenuItem 
            icon={Shield} 
            label="반복 모드 기본값" 
            value={playMode} 
            onClick={() => setPlayMode(playMode === 'OFF' ? 'ALL' : 'OFF')} 
          />
        </div>
      </section>

      <section className="space-y-2">
        <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest px-4">애플리케이션</h3>
        <div className="rounded-2xl overflow-hidden shadow-sm border border-slate-100">
          <MenuItem icon={Bell} label="알림 설정" />
          <MenuItem icon={Share2} label="앱 공유하기" />
          <MenuItem icon={Mail} label="개발자 문의" />
        </div>
      </section>

      <section className="space-y-2">
        <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest px-4">정보</h3>
        <div className="rounded-2xl overflow-hidden shadow-sm border border-slate-100">
          <MenuItem icon={Info} label="앱 정보" value="v1.0.2" />
          <div className="p-4 bg-slate-50 text-[10px] text-slate-400 leading-relaxed">
            이 앱은 천주교 신자들의 전례 생활을 돕기 위해 제작되었습니다. <br />
            모든 곡의 저작권은 한국천주교주교회의 및 해당 작곡가에게 있습니다.
          </div>
        </div>
      </section>
    </div>
  );
};
