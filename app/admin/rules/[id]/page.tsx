"use client";

import React, { useState, useEffect } from "react";
import { motion } from "motion/react";
import { ArrowLeft, Save, AlertTriangle, CheckCircle } from "lucide-react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";

export default function EditRulePage() {
  const { id } = useParams();
  const router = useRouter();
  const [name, setName] = useState("");
  const [trigger, setTrigger] = useState("exercise.completed");
  const [conditionStr, setConditionStr] = useState("{}");
  const [action, setAction] = useState("addXp");
  const [paramsStr, setParamsStr] = useState("{}");
  const [isActive, setIsActive] = useState(true);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    if (!id) return;
    fetch(`/api/rules/${id}`)
      .then((res) => {
        if (!res.ok) throw new Error("Rule not found");
        return res.json();
      })
      .then((data) => {
        setName(data.name || data.id);
        setTrigger(data.trigger);
        setConditionStr(JSON.stringify(data.condition, null, 2));
        setAction(data.action);
        setParamsStr(JSON.stringify(data.params, null, 2));
        setIsActive(data.is_active !== false);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, [id]);

  const handleSave = async () => {
    try {
      setError(null);
      setSuccess(false);
      const parsedCondition = JSON.parse(conditionStr);
      const parsedParams = JSON.parse(paramsStr);

      const res = await fetch(`/api/rules/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          trigger,
          condition: parsedCondition,
          action,
          params: parsedParams,
          is_active: isActive,
        }),
      });

      if (res.ok) {
        setSuccess(true);
        setTimeout(() => {
          router.push("/admin/rules");
        }, 1200);
      } else {
        throw new Error("Failed to save changes.");
      }
    } catch (e: any) {
      setError(e.message || "Invalid JSON formatting.");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-sm font-bold text-gray-500">Loading rule details...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FDFDFD] text-[#3C3C3C] py-12 px-6">
      <div className="max-w-3xl mx-auto space-y-6">
        <Link href="/admin/rules">
          <button className="flex items-center gap-1 text-xs font-black text-gray-500 hover:text-gray-700 uppercase tracking-wider mb-2">
            <ArrowLeft className="w-4 h-4" /> Back to Rules Index
          </button>
        </Link>

        <div className="bg-white border-2 border-[#E5E5E5] border-b-6 rounded-3xl p-6 sm:p-8 space-y-6">
          <h1 className="font-display font-black text-2xl text-[#3C3C3C] border-b pb-3">
            ویرایش Rule: {name}
          </h1>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-xs font-black text-[#777777] uppercase tracking-wider">
                Name
              </label>
              <input
                className="w-full border-2 border-[#E5E5E5] p-3 rounded-xl font-bold text-xs focus:outline-none"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <label className="text-xs font-black text-[#777777] uppercase tracking-wider">
                Trigger
              </label>
              <select
                className="w-full border-2 border-[#E5E5E5] p-3 rounded-xl font-bold text-xs focus:outline-none bg-white"
                value={trigger}
                onChange={(e) => setTrigger(e.target.value)}
              >
                <option value="exercise.completed">exercise.completed</option>
                <option value="lesson.completed">lesson.completed</option>
              </select>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-black text-[#777777] uppercase tracking-wider">
              Condition JSON
            </label>
            <textarea
              className="w-full h-36 bg-[#1E1E1E] text-gray-200 p-4 rounded-xl font-mono text-xs focus:outline-none border-0"
              value={conditionStr}
              onChange={(e) => setConditionStr(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <label className="text-xs font-black text-[#777777] uppercase tracking-wider">
              Params JSON
            </label>
            <textarea
              className="w-full h-36 bg-[#1E1E1E] text-gray-200 p-4 rounded-xl font-mono text-xs focus:outline-none border-0"
              value={paramsStr}
              onChange={(e) => setParamsStr(e.target.value)}
            />
          </div>

          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="isActive"
              checked={isActive}
              onChange={(e) => setIsActive(e.target.checked)}
              className="rounded text-[#58CC02] focus:ring-[#58CC02]"
            />
            <label htmlFor="isActive" className="text-xs font-black text-[#777777] uppercase tracking-wider select-none">
              Active Rule
            </label>
          </div>

          {error && (
            <div className="bg-red-50 text-red-600 border border-red-200 p-3 rounded-xl text-xs font-bold flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 flex-shrink-0" />
              <span>{error}</span>
            </div>
          )}

          {success && (
            <div className="bg-green-50 text-green-600 border border-green-200 p-3 rounded-xl text-xs font-bold flex items-center gap-2">
              <CheckCircle className="w-4 h-4 flex-shrink-0" />
              <span>Rule successfully saved. Redirecting...</span>
            </div>
          )}

          <div className="flex justify-end gap-3 pt-2">
            <Link href="/admin/rules">
              <button className="px-5 py-2.5 rounded-xl border-2 border-[#E5E5E5] border-b-4 hover:bg-gray-50 text-xs font-black uppercase tracking-wider">
                Cancel
              </button>
            </Link>
            <button
              onClick={handleSave}
              className="bg-[#58CC02] hover:bg-[#46A302] border-b-4 border-[#3B8A01] text-white px-5 py-2.5 rounded-xl text-xs font-black uppercase tracking-wider flex items-center gap-1.5 transition-all"
            >
              <Save className="w-4 h-4" /> ذخیره
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
