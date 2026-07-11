"use client";

interface Notification {
  id: string;
  message: string;
  timestamp: string;
  type?: "info" | "success" | "warning";
}

interface NotificationsCardProps {
  notifications: Notification[];
}

export function NotificationsCard({ notifications }: NotificationsCardProps) {
  return (
    <div id="notifications-card" className="bg-white border-2 border-[#E5E5E5] border-b-6 rounded-2xl p-5 flex flex-col justify-between transition-all hover:translate-y-[-2px] hover:shadow-md">
      <div>
        <div className="flex items-center gap-3 border-b-2 border-[#F1F1F1] pb-3 mb-4">
          <span className="text-3xl">🔔</span>
          <div>
            <h3 className="font-display font-black text-sm text-[#AFAFAF] uppercase tracking-wider">
              Inbox
            </h3>
            <h2 className="font-display font-black text-lg text-[#4B4B4B] uppercase">
              Notifications
            </h2>
          </div>
        </div>

        {notifications.length === 0 ? (
          <div className="py-8 text-center">
            <span className="text-4xl">😴</span>
            <p className="text-sm font-bold text-[#AFAFAF] mt-3">
              All caught up! No new notifications.
            </p>
          </div>
        ) : (
          <div className="flex flex-col gap-3">
            {notifications.map((n) => {
              const accentColor = 
                n.type === "success" 
                  ? "border-[#58CC02] bg-[#E2F6D5] text-[#46A302]" 
                  : n.type === "warning"
                  ? "border-[#FF9600] bg-[#FFF2CC] text-[#D07300]"
                  : "border-[#1CB0F6] bg-[#DDF4FF] text-[#1899D6]";

              return (
                <div 
                  key={n.id} 
                  className={`p-3 rounded-xl border-l-4 border-2 border-y-2 border-r-2 border-[#E5E5E5] bg-[#F7F7F7]/40 flex items-start gap-3 transition-colors hover:bg-[#F7F7F7]`}
                >
                  <div className={`w-2 h-2 rounded-full mt-1.5 shrink-0 ${n.type === "success" ? "bg-[#58CC02]" : n.type === "warning" ? "bg-[#FF9600]" : "bg-[#1CB0F6]"}`} />
                  <div className="flex-1">
                    <p className="text-sm font-bold text-[#4B4B4B]">
                      {n.message}
                    </p>
                    <span className="font-mono text-[9px] font-black text-[#AFAFAF] uppercase block mt-1">
                      {n.timestamp}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      <div className="mt-4 pt-3 border-t border-[#F1F1F1] text-[11px] text-[#AFAFAF] font-bold text-center">
        Stay active to avoid losing your daily streak!
      </div>
    </div>
  );
}
