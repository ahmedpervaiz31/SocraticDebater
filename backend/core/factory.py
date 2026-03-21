import os
from dotenv import load_dotenv

load_dotenv()

def get_llm_client():
    provider = os.getenv("LLM_PROVIDER", "gemini").lower()
    
    if provider == "groq":
        from groq import Groq
        return Groq(api_key=os.getenv("GROQ_API_KEY"))
    
    elif provider == "gemini":
        import google.generativeai as genai
        genai.configure(api_key=os.getenv("GEMINI_API_KEY"))
        return genai.GenerativeModel('gemini-1.5-flash')
    
    raise ValueError(f"Unsupported provider: {provider}")