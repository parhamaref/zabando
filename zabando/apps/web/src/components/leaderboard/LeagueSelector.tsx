"use client";

interface League {
  id: string;
  name: string;
  color: string;
  icon: string;
}

interface LeagueSelectorProps {
  leagues: League[];
  currentLeague: string;
  onChange: (id: string) => void;
}

export function LeagueSelector({ leagues, currentLeague, onChange }: LeagueSelectorProps) {
  return (
    <div className="w-full bg-white border-2 border-[#E5E5E5] rounded-2xl p-3 flex gap-2 overflow-x-auto scrollbar-none">
      {leagues.map((league) => {
        const isSelected = league.id === currentLeague;
        return (
          <button
            key={league.id}
            onClick={() => onChange(league.id)}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-black text-xs uppercase tracking-wider border-2 transition-all shrink-0 cursor-pointer ${
              isSelected
                ? "bg-[#DDF4FF] border-[#1CB0F6] text-[#1CB0F6] translate-y-[1px]"
                : "bg-white border-transparent text-[#777777] hover:bg-[#F7F7F7]"
            }`}
          >
            <span className="text-sm">{league.icon}</span>
            <span>{league.name}</span>
          </button>
        );
      })}
    </div>
  );
}
