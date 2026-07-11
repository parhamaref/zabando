"use client";

import { GameIcon } from "../GameIcon";

interface AlertItem {
  id: string;
  type: "tip" | "warning" | "achievement";
  textEn: string;
  textFa: string;
  date: string;
  icon: string;
}

interface NotificationsCardProps {
  notifications: AlertItem[];
}

export function NotificationsCard({ notifications }: NotificationsCardProps) {
  return (
    <div className="bubble-card p-1 text-slate-800 select-none">
      <div className="bubble-card-inner p-6 bg-gradient-to-b from-teal-50/70 to-emerald-50/70">
        <div className="mb-4 flex justify-between items-center">
          <div>
            <h3 className="font-display font-black text-xs text-slate-400 uppercase tracking-wider">
              AI Smart Alerts
            </h3>
            <h2 className="font-display font-black text-xl text-slate-800">
              Weekly Study Plan Info
            </h2>
          </div>
          <GameIcon name="notif_bell" size={28} className="animate-bounce" />
        </div>

        <div className="flex flex-col gap-3.5">
          {notifications.map((item) => {
            // Map notification types to the registered cartoon icon names
            let cartoonIconName = "notif_bell";
            if (item.type === "achievement") {
              cartoonIconName = "notif_success";
            } else if (item.type === "warning") {
              cartoonIconName = "notif_warning";
            } else if (item.textEn.toLowerCase().includes("boost") || item.textEn.toLowerCase().includes("xp")) {
              cartoonIconName = "notif_xp_boost";
            }

            return (
              <div
                key={item.id}
                className="flex items-start gap-3.5 p-3.5 bg-white border-2 border-slate-700 rounded-2xl shadow-[2px_2px_0px_rgba(0,0,0,0.15)]"
              >
                <span className="flex-shrink-0 mt-0.5 select-none">
                  <GameIcon name={cartoonIconName} size={28} />
                </span>
                <div className="space-y-1 flex-grow">
                  <p className="text-xs font-bold text-slate-700 leading-relaxed">
                    {item.textEn}
                  </p>
                  <p className="text-[11px] font-semibold text-slate-500 leading-relaxed text-right" dir="rtl">
                    {item.textFa}
                  </p>
                  <span className="block text-[9px] font-black text-slate-400 uppercase tracking-wider mt-1">
                    {item.date}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
