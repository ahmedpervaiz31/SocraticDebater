from core.factory import get_llm_client
from core.orchestrator import GauntletEngine, EpistemicError

def main():
    # Keys are loaded inside the factory via dotenv
    client = get_llm_client()
    engine = GauntletEngine(client)
    
    thesis = "Universal Basic Income is the only viable solution to structural technological unemployment."
    
    try:
        trace = engine.run(thesis)
        json_str = trace.model_dump_json(indent=2)
        with open("output.json", "w", encoding="utf-8") as f:
            f.write(json_str)
        print("Output saved to output.json")
    except EpistemicError as e:
        print(f"Rejected: {e}")

if __name__ == "__main__":
    main()