import { LessonPlayer } from "../../../src/components/lesson-player/LessonPlayer";

interface Exercise {
  id: string;
  type: "mcq" | "translate" | "reorder" | "listening";
  question_text: string;
  answer_text: string;
  options?: { id: string; option_text: string; is_correct: boolean }[];
  difficulty: number;
}

export default async function LessonPage({ params }: { params: { lessonId: string } }) {
  // Simulate standard Duolingo course lesson curriculum data
  const simulatedExercises: Exercise[] = [
    {
      id: "ex-vocab-1",
      type: "mcq",
      question_text: "How do you say 'Hello' in Persian?",
      answer_text: "سلام",
      options: [
        { id: "o1", option_text: "سلام", is_correct: true },
        { id: "o2", option_text: "خداحافظ", is_correct: false },
        { id: "o3", option_text: "صبح بخیر", is_correct: false },
        { id: "o4", option_text: "ممنون", is_correct: false }
      ],
      difficulty: 1,
    },
    {
      id: "ex-translate-1",
      type: "translate",
      question_text: "Translate: 'Thank you very much'",
      answer_text: "خیلی ممنون",
      difficulty: 2,
    },
    {
      id: "ex-reorder-1",
      type: "reorder",
      question_text: "Arrange the words: 'Good morning my friend'",
      answer_text: "صبح بخیر دوست من",
      difficulty: 2,
    },
    {
      id: "ex-listening-1",
      type: "listening",
      question_text: "Welcome",
      answer_text: "Welcome",
      difficulty: 3,
    }
  ];

  return (
    <main className="min-h-screen bg-[#F7F7F7]">
      <LessonPlayer
        lessonTitle="Basic Greetings & Communication"
        exercises={simulatedExercises}
      />
    </main>
  );
}
