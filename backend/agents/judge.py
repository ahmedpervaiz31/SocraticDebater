from .base_agent import BaseAgent
from pydantic import BaseModel
from schemas.models import EpistemicScore, CognitiveTrace
from utils.constants import JUDGE_AUTOPSY_PROMPT

class JudgeOutput(BaseModel):
    score: EpistemicScore
    trace: dict # Temporary dict to hold trace fields for orchestrator synthesis

class Judge(BaseAgent):
    def evaluate(self, step1, step2, step3) -> JudgeOutput:
        prompt = JUDGE_AUTOPSY_PROMPT.format(
            claimant_step1_output=step1,
            interrogator_step2_output=step2,
            claimant_step3_output=step3
        )
        return self.generate(prompt, JudgeOutput)