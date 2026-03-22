import json
import os
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import uvicorn
from core.factory import get_llm_client
from core.orchestrator import GauntletEngine, EpistemicError
from schemas.models import CognitiveTrace

# Resolve cache dir relative to this file so it works from any CWD
CACHE_DIR = os.path.join(os.path.dirname(os.path.abspath(__file__)), "cache")

app = FastAPI(title="Epistemic Gauntlet API")


# 1. Setup CORS so your React Frontend can talk to this API
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# 2. Initialize the Engine
client = get_llm_client()
engine = GauntletEngine(client)

# 3. Request Schema for the Frontend
class DebateRequest(BaseModel):
    thesis: str

# --- ENDPOINTS ---

@app.post("/api/debate", response_model=CognitiveTrace)
async def run_gauntlet(request: DebateRequest):
    """Triggers a live AI debate and returns the full trace."""
    try:
        trace = engine.run(request.thesis)
        
        # Optional: Auto-save to a local 'cache' folder for the Home Page
        os.makedirs(CACHE_DIR, exist_ok=True)
        filename = os.path.join(CACHE_DIR, f"{trace.trace_id[:8]}.json")
        with open(filename, "w", encoding="utf-8") as f:
            f.write(trace.model_dump_json(indent=2))
            
        return trace
    except EpistemicError as e:
        raise HTTPException(status_code=422, detail=str(e))
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Engine Error: {str(e)}")

@app.get("/api/debate/{trace_id}", response_model=CognitiveTrace)
async def get_debate(trace_id: str):
    """Returns the full trace for a specific debate from the cache."""
    # The cache files are named trace_id[:8].json in your current run_gauntlet implementation
    # Let's check both the full trace_id and the 8-char version
    possible_files = [
        os.path.join(CACHE_DIR, f"{trace_id}.json"),
        os.path.join(CACHE_DIR, f"{trace_id[:8]}.json"),
    ]
    
    for filepath in possible_files:
        if os.path.exists(filepath):
            with open(filepath, "r", encoding="utf-8") as f:
                return json.load(f)
    
    raise HTTPException(status_code=404, detail="Debate trace not found")

@app.get("/api/history")
async def get_history():
    """Returns a list of previously run debates from the cache folder."""
    history = []
    if not os.path.exists(CACHE_DIR):
        return history

    for filename in os.listdir(CACHE_DIR):
        if filename.endswith(".json"):
            try:
                with open(os.path.join(CACHE_DIR, filename), "r", encoding="utf-8") as f:
                    data = json.load(f)
                    # Return structure compatible with the frontend HistoryCard
                    history.append({
                        "id": data.get("trace_id"),
                        "thesis_input": data.get("thesis_input"),
                        "domain": data.get("domain"),
                        "score": {
                            "composite_score": data.get("score", {}).get("composite_score", 0)
                        }
                    })
            except Exception:
                continue
    return history

if __name__ == "__main__":
    uvicorn.run(app, host="127.0.0.1", port=8000)