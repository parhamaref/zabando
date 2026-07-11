"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  GraduationCap, 
  Users, 
  BookOpen, 
  Award, 
  Calendar, 
  MessageSquare, 
  Sparkles, 
  Send, 
  CheckCircle, 
  Clock, 
  Plus, 
  Play, 
  PlusCircle, 
  Flame, 
  Heart, 
  UserCheck, 
  Brain, 
  ChevronRight,
  RefreshCw
} from "lucide-react";

// Mock Data for Teacher Dashboard
const INITIAL_CLASSES = [
  { id: "class-1", name: "کلاس بهار (آموزش انگلیسی)", level: "CEFR A1", studentsCount: 18, activeTheme: "Cartoon / Om Nom" },
  { id: "class-2", name: "کلاس پیشرفته آفتاب (فارسی)", level: "CEFR A2", studentsCount: 14, activeTheme: "Interactive Grammar" }
];

const INITIAL_STUDENTS = [
  { id: "s-1", name: "پرهام عارف", username: "parham_aref", level: "A1", xp: 320, streak: 5, lastActive: "امروز", status: "حاضر", avatar: "🦊" },
  { id: "s-2", name: "سارا رضایی", username: "sara_r", level: "A1", xp: 280, streak: 12, lastActive: "دیروز", status: "حاضر", avatar: "🐱" },
  { id: "s-3", name: "کیان محمدی", username: "kian_m", level: "A2", xp: 450, streak: 0, lastActive: "۲ روز پیش", status: "غایب", avatar: "🐨" },
  { id: "s-4", name: "مهرسا کریمی", username: "mehrsa_k", level: "A1", xp: 190, streak: 3, lastActive: "امروز", status: "حاضر", avatar: "🐼" },
  { id: "s-5", name: "امیرحسین رضوی", username: "amir_h", level: "B1", xp: 620, streak: 15, lastActive: "امروز", status: "حاضر", avatar: "🦁" }
];

const INITIAL_ASSIGNMENTS = [
  { id: "a-1", title: "مکالمه احوالپرسی ساده و واژگان", dueDate: "۱۴۰۵/۰۴/۲۵", submissions: 12, total: 18, status: "فعال" },
  { id: "a-2", title: "تمرین افعال ربطی و ترکیبی", dueDate: "۱۴۰۵/۰۴/۲۰", submissions: 18, total: 18, status: "پایان یافته" }
];

export default function TeacherDashboard() {
  const [classes, setClasses] = useState(INITIAL_CLASSES);
  const [selectedClassId, setSelectedClassId] = useState("class-1");
  const [students, setStudents] = useState(INITIAL_STUDENTS);
  const [assignments, setAssignments] = useState(INITIAL_ASSIGNMENTS);

  // Form states for new assignments
  const [newTitle, setNewTitle] = useState("");
  const [newDueDate, setNewDueDate] = useState("");

  // Virtual classroom state
  const [isClassActive, setIsClassActive] = useState(false);
  const [classroomSlide, setClassroomSlide] = useState(1);
  const [omNomStatus, setOmNomStatus] = useState("خوشحال و منتظر سوال! 🍭");
  const [liveQuestion, setLiveQuestion] = useState("چطور می‌گویی: 'Hello, how are you?'");
  const [studentAnswers, setStudentAnswers] = useState([
    { student: "پرهام عارف", answer: "سلام، چطوری؟ (Salam, chetori?)", isCorrect: true, awardXp: 15 },
    { student: "سارا رضایی", answer: "سلام، حال شما چطور است؟", isCorrect: true, awardXp: 15 },
    { student: "مهرسا کریمی", answer: "روز بخیر", isCorrect: false, awardXp: 0 }
  ]);
  const [aiGenerating, setAiGenerating] = useState(false);

  // Parent Message box states
  const [messageRecipient, setMessageRecipient] = useState("والدین پرهام عارف");
  const [messageContent, setMessageContent] = useState("");
  const [sentMessages, setSentMessages] = useState<Array<{ id: string; recipient: string; content: string; date: string }>>([]);

  const handleCreateAssignment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle) return;
    const newAssign = {
      id: `a-${Date.now()}`,
      title: newTitle,
      dueDate: newDueDate || "۱۴۰۵/۰۴/۳۰",
      submissions: 0,
      total: students.length,
      status: "فعال"
    };
    setAssignments([newAssign, ...assignments]);
    setNewTitle("");
    setNewDueDate("");
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!messageContent) return;
    const newMsg = {
      id: `m-${Date.now()}`,
      recipient: messageRecipient,
      content: messageContent,
      date: "همین الان"
    };
    setSentMessages([newMsg, ...sentMessages]);
    setMessageContent("");
  };

  const handleGenerateQuestionWithGemini = async () => {
    setAiGenerating(true);
    setOmNomStatus("در حال فکر کردن به یک سوال عالی... 🧠🍬");

    try {
      const response = await fetch("/api/gemini/generate-teacher-dashboard", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          cefr: "A1",
          schoolLevel: "Primary",
          layoutMode: "Tablet"
        })
      });
      const data = await response.json();
      
      // Let's use simple prompt generators if parsed is null, or extract nice questions
      setTimeout(() => {
        const questions = [
          "چطور می‌گویید 'Thank you very much' به فارسی مؤدبانه؟",
          "کدام کلمه یعنی 'Breakfast'؟ (صبحانه / ناهار / شام)",
          "تفاوت 'من' و 'ما' در چیست؟ یک جمله کوتاه بسازید.",
          "کلمه مناسب برای کامل کردن جمله را بگویید: 'من فردا به مدرسه ...' (می‌روم / رفتم)"
        ];
        const randomQ = questions[Math.floor(Math.random() * questions.length)];
        setLiveQuestion(randomQ);
        setOmNomStatus("سوال با موفقیت توسط جمینای ساخته شد! 🎉🍭");
        
        // Reset student answers for the new question
        setStudentAnswers([
          { student: "پرهام عارف", answer: "پاسخی ثبت نکرده است...", isCorrect: null, awardXp: 0 },
          { student: "سارا رضایی", answer: "منتظر پاسخ...", isCorrect: null, awardXp: 0 },
          { student: "کیان محمدی", answer: "منتظر پاسخ...", isCorrect: null, awardXp: 0 }
        ]);
        setAiGenerating(false);
      }, 1000);
    } catch (err) {
      console.error(err);
      setLiveQuestion("معنی کلمه 'Friend' در فارسی چیست؟");
      setAiGenerating(false);
    }
  };

  const awardStudentXp = (index: number) => {
    const updated = [...studentAnswers];
    updated[index].isCorrect = true;
    updated[index].awardXp = 15;
    setStudentAnswers(updated);

    // Add XP to the actual student
    const studentName = updated[index].student;
    setStudents(prev => prev.map(s => {
      if (s.name === studentName) {
        return { ...s, xp: s.xp + 15, streak: s.streak + 1 };
      }
      return s;
    }));
  };

  return (
    <main className="min-h-screen bg-[#F0F4F8] text-[#3C3C3C] py-8 px-4 sm:px-6 lg:px-8 text-right" dir="rtl">
      <div className="max-w-6xl mx-auto space-y-8">
        
        {/* Header section with school statistics */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b-4 border-slate-300 bg-white p-6 rounded-3xl shadow-[4px_4px_0px_0px_rgba(0,0,0,0.1)]">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 bg-blue-100 border-4 border-blue-500 rounded-2xl flex items-center justify-center text-3xl">
              👩‍🏫
            </div>
            <div>
              <h1 className="font-display font-black text-2xl text-slate-800">داشبورد مدیریت معلمان مدارس</h1>
              <p className="text-xs font-bold text-slate-500 mt-1">پنل مدیریت کلاسی، رصد فعالیت دانش‌آموزان و هدایت کلاس مجازی گیمیفای شده</p>
            </div>
          </div>

          <div className="flex gap-2">
            <button
              onClick={() => setIsClassActive(!isClassActive)}
              className={`px-5 py-3 text-xs font-black rounded-2xl flex items-center gap-2 border-2 border-b-4 border-gray-950 active:translate-y-[2px] active:border-b-2 transition-all shadow-[2px_2px_0px_rgba(0,0,0,0.15)] ${
                isClassActive 
                  ? "bg-rose-500 hover:bg-rose-600 text-white" 
                  : "bg-emerald-500 hover:bg-emerald-600 text-white"
              }`}
            >
              <Play className="w-4 h-4" />
              <span>{isClassActive ? "خروج از کلاس مجازی" : "شروع کلاس آنلاین (Om Nom)"}</span>
            </button>
          </div>
        </div>

        {/* Dynamic Class Cards / Statistics Summary */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-white p-5 rounded-2xl border-2 border-slate-200 shadow-sm flex items-center justify-between">
            <div>
              <span className="text-[10px] text-slate-400 font-bold uppercase block">کلاس‌های فعال</span>
              <span className="font-display font-black text-2xl text-blue-600">۲ کلاس</span>
            </div>
            <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center text-blue-600">
              <GraduationCap className="w-5 h-5" />
            </div>
          </div>
          <div className="bg-white p-5 rounded-2xl border-2 border-slate-200 shadow-sm flex items-center justify-between">
            <div>
              <span className="text-[10px] text-slate-400 font-bold uppercase block">کل دانش‌آموزان</span>
              <span className="font-display font-black text-2xl text-emerald-600">۳۲ نفر</span>
            </div>
            <div className="w-10 h-10 bg-emerald-50 rounded-xl flex items-center justify-center text-emerald-600">
              <Users className="w-5 h-5" />
            </div>
          </div>
          <div className="bg-white p-5 rounded-2xl border-2 border-slate-200 shadow-sm flex items-center justify-between">
            <div>
              <span className="text-[10px] text-slate-400 font-bold uppercase block">تکالیف در جریان</span>
              <span className="font-display font-black text-2xl text-amber-600">۳ تکلیف</span>
            </div>
            <div className="w-10 h-10 bg-amber-50 rounded-xl flex items-center justify-center text-amber-600">
              <BookOpen className="w-5 h-5" />
            </div>
          </div>
          <div className="bg-white p-5 rounded-2xl border-2 border-slate-200 shadow-sm flex items-center justify-between">
            <div>
              <span className="text-[10px] text-slate-400 font-bold uppercase block">میانگین پیشرفت هفتگی</span>
              <span className="font-display font-black text-2xl text-rose-600">۸۴٪ XP</span>
            </div>
            <div className="w-10 h-10 bg-rose-50 rounded-xl flex items-center justify-center text-rose-600">
              <Award className="w-5 h-5" />
            </div>
          </div>
        </div>

        {/* Interactive Classroom Overlay (Om Nom Theme!) */}
        <AnimatePresence>
          {isClassActive && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              className="bubble-card p-1"
            >
              <div className="bubble-card-inner p-6 bg-gradient-to-b from-[#7FDF00]/20 to-[#58CC02]/10 rounded-[24px] border-4 border-[#58CC02]">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b-2 border-[#58CC02]/30 pb-4 mb-6">
                  <div>
                    <span className="text-[10px] bg-[#58CC02] text-white px-2 py-0.5 rounded-full font-black uppercase tracking-wider">کلاس تعاملی فعال با اوم‌نام (Om Nom)</span>
                    <h2 className="font-display font-black text-xl text-slate-800 mt-1">اتاق تمرین زنده و چالش‌های پویای صوتی-شنیداری</h2>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-xs font-bold text-slate-600">
                      وضعیت اوم‌نام: <strong className="text-emerald-700">{omNomStatus}</strong>
                    </span>
                    <span className="text-3xl animate-bounce">🟢</span>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
                  {/* Cartoon Blackboard Area */}
                  <div className="md:col-span-7 bg-[#1C3A27] text-emerald-100 p-6 rounded-3xl border-4 border-[#3D2515] shadow-inner relative min-h-[300px] flex flex-col justify-between">
                    <div className="absolute top-3 left-3 bg-white/10 px-2 py-0.5 rounded-lg text-[10px] font-mono text-emerald-300">
                      VIRTUAL BOARD v1.2
                    </div>

                    <div className="space-y-4 my-auto text-center">
                      <span className="text-5xl block animate-bounce">🟢🍬</span>
                      <p className="text-xs font-bold text-emerald-300 tracking-wider">چالش زنده دانش‌آموزان</p>
                      <h3 className="font-display font-black text-xl text-white leading-relaxed">
                        {liveQuestion}
                      </h3>
                      <p className="text-[10px] text-emerald-200">دانش‌آموزان با ورود به اکانت خود می‌توانند پاسخ دهند.</p>
                    </div>

                    <div className="flex flex-wrap justify-between items-center gap-3 mt-4 border-t border-emerald-800/60 pt-4">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={handleGenerateQuestionWithGemini}
                          disabled={aiGenerating}
                          className="bg-[#58CC02] hover:bg-[#46A302] text-white font-black text-xs px-3.5 py-2 rounded-xl border-2 border-b-4 border-emerald-950 active:translate-y-[1px] active:border-b-2 transition-all flex items-center gap-1"
                        >
                          {aiGenerating ? <RefreshCw className="w-3.5 h-3.5 animate-spin" /> : <Sparkles className="w-3.5 h-3.5 text-yellow-200" />}
                          <span>سوال بعدی با هوش مصنوعی (Gemini)</span>
                        </button>
                      </div>
                      <span className="text-[11px] text-emerald-300 font-bold">زبان فعال: انگلیسی/فارسی مقدماتی</span>
                    </div>
                  </div>

                  {/* Student submissions list */}
                  <div className="md:col-span-5 bg-white p-5 rounded-2xl border-2 border-slate-200 flex flex-col justify-between">
                    <div>
                      <h4 className="font-display font-black text-xs text-slate-500 uppercase tracking-wider mb-3">پاسخ‌های ثبت شده دانش‌آموزان:</h4>
                      <div className="space-y-3">
                        {studentAnswers.map((ans, i) => (
                          <div key={i} className="flex items-start justify-between gap-3 bg-slate-50 p-3 rounded-xl border border-slate-200">
                            <div>
                              <p className="text-xs font-black text-slate-800">{ans.student}</p>
                              <p className="text-xs text-slate-600 mt-1 italic">"{ans.answer}"</p>
                            </div>

                            <div>
                              {ans.isCorrect === null ? (
                                <button
                                  onClick={() => awardStudentXp(i)}
                                  className="bg-emerald-100 hover:bg-emerald-200 text-emerald-700 text-[10px] font-black px-2.5 py-1.5 rounded-lg border border-emerald-300 flex items-center gap-1"
                                >
                                  <Award className="w-3 h-3" />
                                  <span>تایید و هدیه XP</span>
                                </button>
                              ) : ans.isCorrect ? (
                                <span className="bg-emerald-500 text-white text-[10px] font-black px-2.5 py-1 rounded-full flex items-center gap-1">
                                  <CheckCircle className="w-3 h-3" />
                                  <span>{ans.awardXp}+ XP هدیه شد</span>
                                </span>
                              ) : (
                                <span className="text-[10px] text-rose-500 font-bold">اشتباه</span>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="bg-[#EAFBEA] p-3 rounded-xl border border-emerald-200 mt-4 text-center">
                      <p className="text-[11px] text-slate-600 font-bold">به ازای هر پاسخ درست، ۱۵ امتیاز زنده به صندوق دانش‌آموز واریز می‌شود.</p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Standard Management Tabs */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Right Column: Class and Student Management */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white p-6 rounded-3xl border-2 border-slate-200 shadow-sm">
              <div className="flex justify-between items-center border-b pb-4 mb-4">
                <h3 className="font-display font-black text-lg text-slate-800 flex items-center gap-2">
                  <span>🧑‍🎓</span>
                  <span>لیست دانش‌آموزان و مانیتورینگ CEFR</span>
                </h3>
                <span className="text-[10px] bg-blue-50 text-blue-700 px-2.5 py-1 rounded-full font-bold">
                  {students.length} هنرجو ثبت‌نام شده
                </span>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-right">
                  <thead>
                    <tr className="text-xs text-slate-400 border-b border-slate-100 font-black">
                      <th className="pb-3 text-right">دانش‌آموز</th>
                      <th className="pb-3 text-center">سطح CEFR</th>
                      <th className="pb-3 text-center">امتیاز (XP)</th>
                      <th className="pb-3 text-center">روزهای متوالی</th>
                      <th className="pb-3 text-center">آخرین فعالیت</th>
                      <th className="pb-3 text-center">حضور</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {students.map((student) => (
                      <tr key={student.id} className="text-xs font-bold hover:bg-slate-50/50 transition-colors">
                        <td className="py-4 flex items-center gap-2.5">
                          <span className="text-2xl">{student.avatar}</span>
                          <div>
                            <p className="font-black text-slate-800">{student.name}</p>
                            <p className="text-[10px] text-slate-400">@{student.username}</p>
                          </div>
                        </td>
                        <td className="py-4 text-center">
                          <span className="bg-purple-100 text-purple-700 font-black px-2.5 py-0.5 rounded-full text-[10px]">
                            سطح {student.level}
                          </span>
                        </td>
                        <td className="py-4 text-center font-mono font-black text-blue-600">
                          {student.xp} XP
                        </td>
                        <td className="py-4 text-center text-orange-600 font-black font-mono">
                          <div className="flex items-center justify-center gap-0.5">
                            <Flame className="w-3.5 h-3.5 fill-orange-500 text-orange-500" />
                            <span>{student.streak} روز</span>
                          </div>
                        </td>
                        <td className="py-4 text-center text-slate-500">
                          {student.lastActive}
                        </td>
                        <td className="py-4 text-center">
                          <span className={`px-2 py-0.5 rounded-full text-[9px] font-black ${
                            student.status === "حاضر" ? "bg-emerald-50 text-emerald-700 border border-emerald-200" : "bg-red-50 text-red-700 border border-red-200"
                          }`}>
                            {student.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Parent Communication Console */}
            <div className="bg-white p-6 rounded-3xl border-2 border-slate-200 shadow-sm">
              <h3 className="font-display font-black text-lg text-slate-800 border-b pb-4 mb-4 flex items-center gap-2">
                <span>💬</span>
                <span>ارسال گزارش و ارتباط مستقیم با اولیاء</span>
              </h3>

              <form onSubmit={handleSendMessage} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-black text-slate-600 mb-1">گیرنده گزارش</label>
                    <select
                      className="w-full bg-slate-50 border-2 border-slate-200 focus:border-blue-500 rounded-xl p-3 text-xs font-bold text-slate-700 outline-none"
                      value={messageRecipient}
                      onChange={(e) => setMessageRecipient(e.target.value)}
                    >
                      <option value="والدین پرهام عارف">والدین پرهام عارف (پروانه عارف)</option>
                      <option value="والدین سارا رضایی">والدین سارا رضایی (علی رضایی)</option>
                      <option value="والدین کیان محمدی">والدین کیان محمدی (فریبا محمدی)</option>
                    </select>
                  </div>
                  <div className="flex items-end">
                    <p className="text-[11px] text-slate-500 leading-relaxed font-bold">
                      پیام شما به صورت نوتیفیکیشن اختصاصی در اپلیکیشن برای والدین فرزند نمایش داده خواهد شد.
                    </p>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-black text-slate-600 mb-1">متن گزارش تحصیلی</label>
                  <textarea
                    rows={3}
                    required
                    className="w-full bg-slate-50 border-2 border-slate-200 focus:border-blue-500 rounded-2xl p-4 text-xs font-bold text-slate-700 outline-none resize-none leading-relaxed"
                    placeholder="مثال: پرهام امروز پیشرفت بسیار خوبی در درس احوالپرسی داشت و توانست در لیگ رتبه خود را ارتقا دهد..."
                    value={messageContent}
                    onChange={(e) => setMessageContent(e.target.value)}
                  />
                </div>

                <div className="flex justify-end">
                  <button
                    type="submit"
                    className="bg-blue-600 hover:bg-blue-700 text-white font-black text-xs px-5 py-3 rounded-2xl border-2 border-b-4 border-slate-950 active:translate-y-[1px] active:border-b-2 transition-all flex items-center gap-1.5 shadow-[2px_2px_0px_rgba(0,0,0,0.15)]"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>ارسال گزارش تحصیلی</span>
                  </button>
                </div>
              </form>

              {sentMessages.length > 0 && (
                <div className="mt-6 pt-5 border-t border-slate-100">
                  <h4 className="font-display font-black text-xs text-slate-400 mb-3">گزارش‌های ارسال شده اخیر:</h4>
                  <div className="space-y-3">
                    {sentMessages.map((msg) => (
                      <div key={msg.id} className="bg-slate-50 p-3.5 rounded-xl border border-slate-200 flex flex-col gap-1 text-xs">
                        <div className="flex justify-between">
                          <strong className="text-slate-700">{msg.recipient}</strong>
                          <span className="text-[10px] text-slate-400">{msg.date}</span>
                        </div>
                        <p className="text-slate-600 leading-relaxed">"{msg.content}"</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Left Column: Homework / Assignment Manager */}
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-3xl border-2 border-slate-200 shadow-sm">
              <h3 className="font-display font-black text-lg text-slate-800 border-b pb-4 mb-4 flex items-center gap-2">
                <span>📝</span>
                <span>تکالیف جدید و واگذاری مشق</span>
              </h3>

              <form onSubmit={handleCreateAssignment} className="space-y-4">
                <div>
                  <label className="block text-xs font-black text-slate-600 mb-1">عنوان تکلیف</label>
                  <input
                    type="text"
                    required
                    className="w-full bg-slate-50 border-2 border-slate-200 focus:border-blue-500 rounded-xl p-3 text-xs font-bold text-slate-700 outline-none"
                    placeholder="مثال: واژگان فصل اول و گرامر زمان حال"
                    value={newTitle}
                    onChange={(e) => setNewTitle(e.target.value)}
                  />
                </div>

                <div>
                  <label className="block text-xs font-black text-slate-600 mb-1">مهلت ارسال (ددلاین)</label>
                  <input
                    type="text"
                    className="w-full bg-slate-50 border-2 border-slate-200 focus:border-blue-500 rounded-xl p-3 text-xs font-bold text-slate-700 outline-none"
                    placeholder="مثال: ۱۴۰۵/۰۴/۲۸"
                    value={newDueDate}
                    onChange={(e) => setNewDueDate(e.target.value)}
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-amber-500 hover:bg-amber-600 text-white font-black text-xs py-3 rounded-2xl border-2 border-b-4 border-slate-950 active:translate-y-[1px] active:border-b-2 transition-all flex items-center justify-center gap-1.5 shadow-[2px_2px_0px_rgba(0,0,0,0.15)]"
                >
                  <Plus className="w-4 h-4" />
                  <span>ثبت تکلیف جدید کلاسی</span>
                </button>
              </form>
            </div>

            <div className="bg-white p-6 rounded-3xl border-2 border-slate-200 shadow-sm">
              <h3 className="font-display font-black text-lg text-slate-800 border-b pb-4 mb-4 flex items-center gap-2">
                <span>📂</span>
                <span>تکالیف گذشته و وضعیت ارسال‌ها</span>
              </h3>

              <div className="space-y-3.5">
                {assignments.map((assign) => (
                  <div key={assign.id} className="p-4 rounded-2xl border-2 border-slate-100 bg-slate-50/50 flex flex-col justify-between gap-3">
                    <div>
                      <h4 className="font-display font-black text-xs text-slate-800">{assign.title}</h4>
                      <p className="text-[10px] text-slate-400 font-bold mt-1">مهلت ارسال: {assign.dueDate}</p>
                    </div>

                    <div className="flex items-center justify-between border-t border-slate-100 pt-2 text-[10px] font-black">
                      <span className="text-slate-600">
                        {assign.submissions} از {assign.total} ارسال شده
                      </span>
                      <span className={`px-2 py-0.5 rounded-full ${
                        assign.status === "فعال" ? "bg-emerald-50 text-emerald-700 border border-emerald-200" : "bg-slate-100 text-slate-600"
                      }`}>
                        {assign.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

        </div>

      </div>
    </main>
  );
}
