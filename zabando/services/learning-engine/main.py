from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from typing import List, Optional

app = FastAPI(
    title="Zabando Learning Engine",
    description="Adaptive machine learning service for CEFR lesson pathways (inspired by Duolingo's Birdbrain model)",
    version="1.0.0"
)

class UserSessionState(BaseModel):
    user_id: str
    current_level: str  # A1, A2, B1, etc.
    recent_accuracy: float
    streak: int
    failed_skills: List[str]

class ExerciseRecommendation(BaseModel):
    exercise_id: str
    difficulty: int
    skill_category: str
    cefr_level: str
    predicted_probability_correct: float

@app.get("/")
def read_root():
    return {"status": "healthy", "engine": "Zabando Birdbrain v1"}

@app.post("/recommend", response_model=List[ExerciseRecommendation])
def recommend_exercises(state: UserSessionState):
    """
    Predicts and selects the optimal exercises for a user to maintain
    an active 75%-85% target correctness probability.
    """
    try:
        # Simple heuristic simulation of the Birdbrain model
        recommendations = [
            ExerciseRecommendation(
                exercise_id="ex-vocab-9821",
                difficulty=3,
                skill_category="vocabulary",
                cefr_level=state.current_level,
                predicted_probability_correct=0.81
            ),
            ExerciseRecommendation(
                exercise_id="ex-grammar-4389",
                difficulty=2,
                skill_category="grammar",
                cefr_level=state.current_level,
                predicted_probability_correct=0.84
            )
        ]
        return recommendations
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
