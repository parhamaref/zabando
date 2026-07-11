"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Play, 
  Plus, 
  Trash2, 
  Save, 
  RotateCcw, 
  CheckCircle, 
  AlertTriangle, 
  ArrowLeft,
  ToggleLeft,
  ToggleRight,
  Code2
} from "lucide-react";
import Link from "next/link";

interface Rule {
  id: string;
  name?: string;
  trigger: string;
  condition: Record<string, any>;
  action: string;
  params: Record<string, any>;
  is_active?: boolean;
}

export default function RulesAdminPage() {
  const [rules, setRules] = useState<Rule[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedRule, setSelectedRule] = useState<Rule | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [selectedType, setSelectedType] = useState<"xp" | "notification">("xp");
  
  // Rule form states
  const [name, setName] = useState("");
  const [trigger, setTrigger] = useState("exercise.completed");
  const [conditionStr, setConditionStr] = useState("{}");
  const [action, setAction] = useState("addXp");
  const [paramsStr, setParamsStr] = useState("{}");
  const [isActive, setIsActive] = useState(true);
  const [validationError, setValidationError] = useState<string | null>(null);

  // Simulation state
  const [simulationEvent, setSimulationEvent] = useState(JSON.stringify({
    userId: "user_test_01",
    isCorrect: true,
    difficulty: 5,
    exerciseId: "exercise_math_01",
    streak: 7,
    dailyXp: 55
  }, null, 2));
  const [simulationLogs, setSimulationLogs] = useState<Array<{ type: string; msg: string }>>([]);

  const fetchRules = async () => {
    try {
      setLoading(true);
      const res = await fetch(`/api/rules?type=${selectedType}`);
      const data = await res.json();
      setRules(data);
    } catch (e) {
      console.error("Failed to load rules:", e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRules();
    setSelectedRule(null);
    setIsCreating(false);
  }, [selectedType]);

  const handleSelectRule = (rule: Rule) => {
    setSelectedRule(rule);
    setIsCreating(false);
    setName(rule.name || rule.id);
    setTrigger(rule.trigger);
    setConditionStr(JSON.stringify(rule.condition, null, 2));
    setAction(rule.action);
    setParamsStr(JSON.stringify(rule.params, null, 2));
    setIsActive(rule.is_active !== false);
    setValidationError(null);
  };

  const handleStartCreate = () => {
    setSelectedRule(null);
    setIsCreating(true);
    if (selectedType === "notification") {
      setName("New Notification Notification Trigger");
      setTrigger("xp.updated");
      setConditionStr(JSON.stringify({ dailyXp_gte: 50 }, null, 2));
      setAction("sendNotification");
      setParamsStr(JSON.stringify({
        type: "xp",
        title: "آفرین! امروز خیلی خوب بودی! ⚡",
        message: "تو امروز بیش از ۵۰ XP گرفتی و رکورد جدیدی ثبت کردی! 👏"
      }, null, 2));
    } else {
      setName("New XP Business Rule");
      setTrigger("exercise.completed");
      setConditionStr(JSON.stringify({ isCorrect: true }, null, 2));
      setAction("addXp");
      setParamsStr(JSON.stringify({ xp: 12 }, null, 2));
    }
    setIsActive(true);
    setValidationError(null);
  };

  const handleSave = async () => {
    try {
      setValidationError(null);
      let parsedCondition = {};
      let parsedParams = {};

      try {
        parsedCondition = JSON.parse(conditionStr);
      } catch (e) {
        setValidationError("Invalid JSON syntax in 'Condition' field.");
        return;
      }

      try {
        parsedParams = JSON.parse(paramsStr);
      } catch (e) {
        setValidationError("Invalid JSON syntax in 'Params' field.");
        return;
      }

      const payload = {
        name,
        trigger,
        condition: parsedCondition,
        action,
        params: parsedParams,
        is_active: isActive
      };

      if (isCreating) {
        const res = await fetch(`/api/rules?type=${selectedType}`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload)
        });
        if (res.ok) {
          setIsCreating(false);
          await fetchRules();
          setSelectedRule(null);
        }
      } else if (selectedRule) {
        const res = await fetch(`/api/rules/${selectedRule.id}?type=${selectedType}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload)
        });
        if (res.ok) {
          await fetchRules();
          setSelectedRule(null);
        }
      }
    } catch (e: any) {
      setValidationError(e.message || "Failed to save rule.");
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this business rule?")) return;
    try {
      const res = await fetch(`/api/rules/${id}?type=${selectedType}`, {
        method: "DELETE"
      });
      if (res.ok) {
        setSelectedRule(null);
        setIsCreating(false);
        await fetchRules();
      }
    } catch (e) {
      console.error(e);
    }
  };

  const handleToggleActive = async (rule: Rule) => {
    try {
      const res = await fetch(`/api/rules/${rule.id}?type=${selectedType}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...rule,
          is_active: rule.is_active === false ? true : false
        })
      });
      if (res.ok) {
        await fetchRules();
      }
    } catch (e) {
      console.error(e);
    }
  };

  const runSimulation = () => {
    try {
      const event = JSON.parse(simulationEvent);
      const logs: Array<{ type: string; msg: string }> = [];
      logs.push({ type: "info", msg: `Received event trigger: '${trigger}' for user '${event.userId || "anonymous"}'` });

      let totalXpAdded = 0;
      let badgesAwarded: string[] = [];

      rules.forEach(rule => {
        if (rule.is_active === false) {
          logs.push({ type: "skip", msg: `Rule '${rule.name || rule.id}' is inactive. Skipping.` });
          return;
        }

        if (rule.trigger !== trigger) {
          return;
        }

        // Match logic
        let isMatch = true;
        const condition = rule.condition;

        for (const key of Object.keys(condition)) {
          if (key.endsWith("_gte")) {
            const field = key.replace("_gte", "");
            if (!(event[field] >= condition[key])) {
              isMatch = false;
              break;
            }
          } else {
            if (event[key] !== condition[key]) {
              isMatch = false;
              break;
            }
          }
        }

        if (isMatch) {
          logs.push({ type: "match", msg: `Rule '${rule.name || rule.id}' matches perfectly!` });
          if (rule.action === "addXp") {
            const xp = rule.params.xp || 0;
            totalXpAdded += xp;
            logs.push({ type: "action", msg: `→ Executed addXp: awarded +${xp} XP` });
          } else if (rule.action === "awardBadge") {
            const badge = rule.params.badge || "UNNAMED";
            badgesAwarded.push(badge);
            logs.push({ type: "action", msg: `→ Executed awardBadge: granted '${badge}' Badge` });
          } else if (rule.action === "sendNotification") {
            const notifTitle = rule.params.title || "نوتیفیکیشن جدید";
            const notifMsg = rule.params.message || "";
            logs.push({ type: "action", msg: `→ Send Notification: [${rule.params.type || "system"}] "${notifTitle}" - "${notifMsg}"` });
          }
        } else {
          logs.push({ type: "no-match", msg: `Rule '${rule.name || rule.id}' did not match condition requirements.` });
        }
      });

      logs.push({ 
        type: "summary", 
        msg: `🎉 Simulation completed. Result: +${totalXpAdded} Total XP, ${badgesAwarded.length} Badges Awarded (${badgesAwarded.join(", ") || "None"})` 
      });

      setSimulationLogs(logs);
    } catch (e) {
      setSimulationLogs([{ type: "error", msg: "Invalid JSON format in the Event Payload editor." }]);
    }
  };

  return (
    <div className="min-h-screen bg-[#FDFDFD] text-[#3C3C3C] pb-24">
      
      {/* Upper Navigation Rail */}
      <div className="bg-white border-b-2 border-[#E5E5E5] px-6 py-4 sticky top-0 z-50 shadow-sm flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href="/gamification">
            <button className="flex items-center gap-1 text-xs font-black text-[#58CC02] hover:text-[#46A302] bg-[#E5F9E5] border-2 border-transparent hover:border-[#58CC02] px-3.5 py-2 rounded-xl transition-all">
              <ArrowLeft className="w-3.5 h-3.5" />
              BACK TO CONSOLE
            </button>
          </Link>
          <div className="h-6 w-0.5 bg-[#E5E5E5]" />
          <div>
            <h1 className="font-display font-black text-lg text-[#3C3C3C] flex items-center gap-2">
              Rule Engine Panel <span className="text-xs bg-[#E5E5E5] text-[#777777] px-2 py-0.5 rounded-full font-mono">v1.2</span>
            </h1>
            <p className="text-[10px] font-bold text-[#777777] uppercase tracking-wider">
              Configure business rules for XP, badges, streaks and leagues in real-time
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Link href="/admin/rules/prompts">
            <button className="flex items-center gap-1.5 text-xs font-black text-[#9333EA] bg-[#FAF5FF] border-2 border-[#E9D5FF] hover:bg-[#F3E8FF] px-4 py-2.5 rounded-xl transition-all active:translate-y-[1px]">
              🎯 پرامپت‌های هوش مصنوعی (AI Prompts)
            </button>
          </Link>

          <Link href="/admin/rules/simulator">
            <button className="flex items-center gap-1.5 text-xs font-black text-[#0891B2] bg-[#ECFEFF] border-2 border-[#A5F3FC] hover:bg-[#CFFAFE] px-4 py-2.5 rounded-xl transition-all active:translate-y-[1px]">
              ⚙️ شبیه‌ساز قوانین (Sandbox)
            </button>
          </Link>

          <button
            onClick={handleStartCreate}
            className="bg-[#58CC02] hover:bg-[#46A302] border-b-4 border-[#3B8A01] text-white px-4 py-2.5 rounded-xl font-display font-black text-xs uppercase tracking-wider flex items-center gap-2 active:border-b-0 active:translate-y-1 transition-all"
          >
            <Plus className="w-4 h-4" /> Add Custom Rule
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8 grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* LEFT COLUMN: Rule Index */}
        <div className="lg:col-span-5 space-y-6">
          
          {/* Rule Type Selector */}
          <div className="grid grid-cols-2 gap-2 bg-[#F3F4F6] p-1.5 rounded-2xl border-2 border-[#E5E5E5]">
            <button
              onClick={() => setSelectedType("xp")}
              className={`py-2 px-3 text-xs font-black uppercase tracking-wider rounded-xl transition-all ${
                selectedType === "xp"
                  ? "bg-white text-[#3C3C3C] shadow-sm"
                  : "text-[#777777] hover:text-[#3C3C3C]"
              }`}
            >
              ⚡ XP/Gamification
            </button>
            <button
              onClick={() => setSelectedType("notification")}
              className={`py-2 px-3 text-xs font-black uppercase tracking-wider rounded-xl transition-all ${
                selectedType === "notification"
                  ? "bg-white text-[#3C3C3C] shadow-sm"
                  : "text-[#777777] hover:text-[#3C3C3C]"
              }`}
            >
              🔔 Notifications
            </button>
          </div>

          <div className="bg-white border-2 border-[#E5E5E5] border-b-6 rounded-3xl p-5 space-y-4">
            <div className="flex justify-between items-center pb-2 border-b border-[#E5E5E5]">
              <h2 className="font-display font-black text-sm uppercase tracking-wider text-[#777777]">
                Active {selectedType === "xp" ? "XP" : "Notif"} Rules ({rules.length})
              </h2>
              <span className="text-[10px] font-bold bg-[#E5FDF4] text-[#059669] px-2 py-0.5 rounded-full border border-[#A7F3D0]">
                Live Sync
              </span>
            </div>

            {loading ? (
              <div className="py-12 text-center text-xs font-bold text-gray-400">Loading active schemas...</div>
            ) : rules.length === 0 ? (
              <div className="py-12 text-center text-xs font-bold text-gray-400">No custom rules configured yet.</div>
            ) : (
              <div className="space-y-3 max-h-[500px] overflow-y-auto pr-1">
                {rules.map((rule) => (
                  <div
                    key={rule.id}
                    onClick={() => handleSelectRule(rule)}
                    className={`p-4 border-2 rounded-2xl cursor-pointer transition-all select-none hover:bg-gray-50 flex justify-between items-center ${
                      selectedRule?.id === rule.id
                        ? "bg-[#F3F4F6] border-gray-400"
                        : "bg-white border-[#E5E5E5]"
                    }`}
                  >
                    <div className="space-y-1 flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <span className={`w-2.5 h-2.5 rounded-full ${rule.is_active !== false ? "bg-[#58CC02]" : "bg-gray-300"}`} />
                        <h3 className="font-display font-black text-sm text-[#3C3C3C] truncate">
                          {rule.name || rule.id}
                        </h3>
                      </div>
                      <div className="flex items-center gap-1.5 text-[10px] font-black text-[#AFAFAF] uppercase tracking-wider pl-4">
                        <span>Trigger: {rule.trigger}</span>
                        <span>•</span>
                        <span>Action: {rule.action}</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-1.5" onClick={(e) => e.stopPropagation()}>
                      <button
                        onClick={() => handleToggleActive(rule)}
                        title={rule.is_active !== false ? "Deactivate Rule" : "Activate Rule"}
                        className="p-1.5 hover:bg-gray-100 rounded-lg text-gray-500 transition-colors"
                      >
                        {rule.is_active !== false ? (
                          <ToggleRight className="w-5 h-5 text-[#58CC02]" />
                        ) : (
                          <ToggleLeft className="w-5 h-5 text-gray-300" />
                        )}
                      </button>
                      <button
                        onClick={() => handleDelete(rule.id)}
                        className="p-1.5 hover:bg-red-50 text-red-500 rounded-lg transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* SIMULATOR COMPONENT */}
          <div className="bg-white border-2 border-[#E5E5E5] border-b-6 rounded-3xl p-5 space-y-4">
            <h2 className="font-display font-black text-sm uppercase tracking-wider text-[#777777] pb-2 border-b border-[#E5E5E5] flex items-center gap-1.5">
              <Code2 className="w-4 h-4 text-[#58CC02]" /> RULE MATCHING SANDBOX
            </h2>
            
            <div className="space-y-2">
              <label className="text-[11px] font-black text-gray-400 uppercase tracking-wide">
                1. Select Event Trigger
              </label>
              <select
                value={trigger}
                onChange={(e) => setTrigger(e.target.value)}
                className="w-full bg-[#F7F7F7] border-2 border-[#E5E5E5] px-3 py-2 rounded-xl text-xs font-bold focus:outline-none"
              >
                <option value="exercise.completed">exercise.completed</option>
                <option value="lesson.completed">lesson.completed</option>
              </select>
            </div>

            <div className="space-y-2">
              <label className="text-[11px] font-black text-gray-400 uppercase tracking-wide">
                2. Edit Event Payload
              </label>
              <textarea
                value={simulationEvent}
                onChange={(e) => setSimulationEvent(e.target.value)}
                className="w-full h-32 bg-[#1E1E1E] text-gray-300 font-mono text-xs p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#58CC02] border-0"
              />
            </div>

            <button
              onClick={runSimulation}
              className="w-full bg-[#1899D6] hover:bg-[#1482B5] border-b-4 border-[#106A94] text-white py-2.5 rounded-xl font-display font-black text-xs uppercase tracking-wider flex items-center justify-center gap-2 active:border-b-0 active:translate-y-1 transition-all"
            >
              <Play className="w-3.5 h-3.5 fill-current" /> RUN SIMULATOR MATCHES
            </button>

            {simulationLogs.length > 0 && (
              <div className="mt-3 bg-gray-50 border-2 border-dashed border-gray-200 rounded-xl p-3 space-y-1.5 max-h-48 overflow-y-auto font-mono text-[10px]">
                {simulationLogs.map((log, i) => (
                  <div
                    key={i}
                    className={`${
                      log.type === "match" ? "text-green-600 font-bold" :
                      log.type === "action" ? "text-blue-600 pl-2" :
                      log.type === "summary" ? "text-purple-700 font-black border-t pt-1.5 mt-1" :
                      log.type === "error" ? "text-red-500 font-bold" : "text-gray-500"
                    }`}
                  >
                    {log.msg}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* RIGHT COLUMN: Configurator View */}
        <div className="lg:col-span-7">
          <AnimatePresence mode="wait">
            {selectedRule || isCreating ? (
              <motion.div
                key={selectedRule?.id || "create_pane"}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="bg-white border-2 border-[#E5E5E5] border-b-6 rounded-3xl p-6 sm:p-8 space-y-6 sticky top-24"
              >
                <div className="flex justify-between items-center pb-3 border-b border-[#E5E5E5]">
                  <div>
                    <h2 className="font-display font-black text-lg text-[#3C3C3C]">
                      {isCreating ? "Design Configurable Rule" : "Edit Configurable Rule"}
                    </h2>
                    <p className="text-xs font-bold text-[#777777] mt-0.5">
                      {isCreating ? "Declare conditions, parameters and triggers dynamically" : `Editing Rule ${selectedRule?.id}`}
                    </p>
                  </div>
                  
                  <span className={`px-2.5 py-1 rounded-xl text-xs font-black uppercase tracking-wider border ${
                    isActive ? "bg-green-50 text-green-700 border-green-200" : "bg-gray-50 text-gray-500 border-gray-200"
                  }`}>
                    {isActive ? "ACTIVE" : "DISABLED"}
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-xs font-black text-[#777777] uppercase tracking-wider">
                      Rule Display Name
                    </label>
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full bg-[#F7F7F7] border-2 border-[#E5E5E5] px-4 py-2.5 rounded-xl text-xs font-bold focus:outline-none"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-black text-[#777777] uppercase tracking-wider">
                      Event Trigger
                    </label>
                    <select
                      value={trigger}
                      onChange={(e) => setTrigger(e.target.value)}
                      className="w-full bg-[#F7F7F7] border-2 border-[#E5E5E5] px-4 py-2.5 rounded-xl text-xs font-bold focus:outline-none"
                    >
                      <option value="exercise.completed">exercise.completed</option>
                      <option value="lesson.completed">lesson.completed</option>
                    </select>
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-black text-[#777777] uppercase tracking-wider">
                      Action Executed
                    </label>
                    <select
                      value={action}
                      onChange={(e) => setAction(e.target.value)}
                      className="w-full bg-[#F7F7F7] border-2 border-[#E5E5E5] px-4 py-2.5 rounded-xl text-xs font-bold focus:outline-none"
                    >
                      <option value="addXp">addXp (Add Experience points)</option>
                      <option value="awardBadge">awardBadge (Award Achievement)</option>
                    </select>
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-black text-[#777777] uppercase tracking-wider">
                      State / Status
                    </label>
                    <div className="flex items-center gap-3 h-10">
                      <button
                        onClick={() => setIsActive(!isActive)}
                        className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-black transition-all border-2 ${
                          isActive 
                            ? "bg-[#ECFDF5] text-[#059669] border-[#A7F3D0]" 
                            : "bg-[#FEF2F2] text-[#DC2626] border-[#FCA5A5]"
                        }`}
                      >
                        {isActive ? <CheckCircle className="w-4 h-4" /> : <AlertTriangle className="w-4 h-4" />}
                        {isActive ? "Enabled" : "Disabled"}
                      </button>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <label className="text-xs font-black text-[#777777] uppercase tracking-wider">
                      Condition JSON schema
                    </label>
                    <span className="text-[10px] text-[#AFAFAF] font-mono">Supports exact Match or field_gte suffix</span>
                  </div>
                  <textarea
                    value={conditionStr}
                    onChange={(e) => setConditionStr(e.target.value)}
                    className="w-full h-32 bg-[#1E1E1E] text-gray-200 font-mono text-xs p-4 rounded-xl focus:outline-none border-0"
                  />
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <label className="text-xs font-black text-[#777777] uppercase tracking-wider">
                      Action parameters JSON (Params)
                    </label>
                    <span className="text-[10px] text-[#AFAFAF] font-mono">e.g. {"{ \"xp\": 10 }"} or {"{ \"badge\": \"HARD_MASTER\" }"}</span>
                  </div>
                  <textarea
                    value={paramsStr}
                    onChange={(e) => setParamsStr(e.target.value)}
                    className="w-full h-32 bg-[#1E1E1E] text-gray-200 font-mono text-xs p-4 rounded-xl focus:outline-none border-0"
                  />
                </div>

                {validationError && (
                  <div className="bg-red-50 text-red-600 border-2 border-red-200 p-3.5 rounded-xl text-xs font-bold flex items-center gap-2">
                    <AlertTriangle className="w-4 h-4 flex-shrink-0" />
                    <span>{validationError}</span>
                  </div>
                )}

                <div className="flex gap-3 justify-end pt-2">
                  <button
                    onClick={() => { setSelectedRule(null); setIsCreating(false); }}
                    className="bg-white hover:bg-gray-50 text-[#3C3C3C] border-2 border-[#E5E5E5] border-b-4 hover:border-gray-300 px-5 py-2.5 rounded-xl font-display font-black text-xs uppercase tracking-wider active:border-b-0 active:translate-y-1 transition-all"
                  >
                    Cancel
                  </button>

                  <button
                    onClick={handleSave}
                    className="bg-[#58CC02] hover:bg-[#46A302] border-b-4 border-[#3B8A01] text-white px-5 py-2.5 rounded-xl font-display font-black text-xs uppercase tracking-wider flex items-center gap-1.5 active:border-b-0 active:translate-y-1 transition-all"
                  >
                    <Save className="w-4 h-4" /> Save Configuration
                  </button>
                </div>
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="bg-[#F9F9F9] border-2 border-dashed border-[#E5E5E5] rounded-3xl p-12 text-center h-[500px] flex flex-col items-center justify-center space-y-4"
              >
                <div className="p-4 bg-white border-2 border-[#E5E5E5] rounded-2xl shadow-sm">
                  ⚙️
                </div>
                <div>
                  <h3 className="font-display font-black text-lg text-[#3C3C3C]">
                    No Rule Selected
                  </h3>
                  <p className="text-xs font-bold text-[#777777] max-w-sm mx-auto mt-1">
                    Select a rule from the registry sidebar on the left to edit it, or design a new rule using the Add Rule command.
                  </p>
                </div>
                <button
                  onClick={handleStartCreate}
                  className="bg-white hover:bg-gray-50 text-[#58CC02] border-2 border-[#E5E5E5] border-b-4 hover:border-[#58CC02] px-4 py-2.5 rounded-xl font-display font-black text-xs uppercase tracking-wider transition-all"
                >
                  Create Rule Now
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

      </div>
    </div>
  );
}
