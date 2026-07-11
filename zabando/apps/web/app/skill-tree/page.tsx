import { SkillTree } from "../../src/components/skill-tree/SkillTree";

// This is a mockup page reflecting the skill tree layout connected to the data layer.
// When database and authentication are wired, this reads directly from Prisma client.

export default async function SkillTreePage() {
  // Static simulation of CEFR skills for initial local development
  const simulatedSkills = [
    {
      id: "skill-vocab-1",
      name: "Greetings",
      order_index: 1,
      cefr_level: "A1",
      mastery_level: 100,
      is_locked: false,
      firstLessonId: "lesson-greet-1"
    },
    {
      id: "skill-vocab-2",
      name: "Basics 1",
      order_index: 2,
      cefr_level: "A1",
      mastery_level: 60,
      is_locked: false,
      firstLessonId: "lesson-basics-1"
    },
    {
      id: "skill-grammar-1",
      name: "Present Tense",
      order_index: 3,
      cefr_level: "A2",
      mastery_level: 0,
      is_locked: false,
      firstLessonId: "lesson-present-1"
    },
    {
      id: "skill-listening-1",
      name: "Travel Talk",
      order_index: 4,
      cefr_level: "B1",
      mastery_level: 0,
      is_locked: true,
      firstLessonId: "lesson-travel-1"
    },
    {
      id: "skill-speaking-1",
      name: "Socializing",
      order_index: 5,
      cefr_level: "B2",
      mastery_level: 0,
      is_locked: true,
      firstLessonId: "lesson-social-1"
    }
  ];

  return (
    <main className="min-h-screen bg-white text-[#4B4B4B] py-10 px-4">
      <div className="max-w-xl mx-auto text-center border-b-2 border-[#E5E5E5] pb-6 mb-8">
        <h1 className="font-display font-black text-3xl text-[#4B4B4B] uppercase tracking-wide">
          🦉 Learning Tree
        </h1>
        <p className="text-sm font-bold text-[#777777] mt-1">
          Master your language target level step-by-step
        </p>
      </div>

      <SkillTree skills={simulatedSkills} />
    </main>
  );
}
