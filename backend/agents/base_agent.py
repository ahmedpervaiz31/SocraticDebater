import json
import os
from typing import Type, TypeVar
from pydantic import BaseModel

T = TypeVar("T", bound=BaseModel)

class BaseAgent:
    def __init__(self, client):
        self.client = client

    def _call_llm(self, prompt: str) -> str:
        provider = os.getenv("LLM_PROVIDER", "gemini").lower()
        
        if provider == "groq":
            res = self.client.chat.completions.create(
                model="llama-3.3-70b-versatile",
                messages=[{"role": "user", "content": prompt}],
                response_format={"type": "json_object"}
            )
            return res.choices[0].message.content
        
        res = self.client.generate_content(prompt)
        text = res.text.strip()
        if text.startswith("```json"):
            text = text.split("```json")[1].split("```")[0].strip()
        return text

    def generate(self, prompt: str, schema: Type[T], retry: bool = True) -> T:
        try:
            content = self._call_llm(prompt)
            return schema.model_validate_json(content)
        except Exception as e:
            if retry:
                retry_instruction = "\n\nYour previous response was not valid JSON. Output only the JSON object, no other text."
                return self.generate(prompt + retry_instruction, schema, retry=False)
            raise e