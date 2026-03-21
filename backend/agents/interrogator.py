from .base_agent import BaseAgent
from schemas.models import SocraticQuestion
from pydantic import BaseModel
from utils.constants import INTERROGATOR_ATTACK_PROMPT

class QuestionList(BaseModel):
    questions: list[SocraticQuestion]

class Interrogator(BaseAgent):
    def attack(self, claim_json: str) -> list[SocraticQuestion]:
        prompt = INTERROGATOR_ATTACK_PROMPT.format(claimant_step1_output=claim_json)
        result = self.generate(prompt, QuestionList)
        return result.questions