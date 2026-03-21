from .base_agent import BaseAgent
from schemas.models import LogicalClaim, ClaimRevision
from utils.constants import CLAIMANT_CONSTRUCTION_PROMPT, CLAIMANT_PATCH_PROMPT

class Claimant(BaseAgent):
    def construct(self, thesis: str) -> LogicalClaim:
        prompt = CLAIMANT_CONSTRUCTION_PROMPT.format(thesis=thesis)
        return self.generate(prompt, LogicalClaim)

    def patch(self, original_claim: LogicalClaim, questions: str) -> ClaimRevision:
        prompt = CLAIMANT_PATCH_PROMPT.format(
            claimant_step1_output=original_claim.model_dump_json(),
            interrogator_step2_output=questions
        )
        return self.generate(prompt, ClaimRevision)