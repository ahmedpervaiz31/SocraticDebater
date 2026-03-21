import json
from schemas.models import LogicalClaim, SocraticQuestion, ClaimRevision, CognitiveTrace, EpistemicScore
from agents.claimant import Claimant
from agents.interrogator import Interrogator
from agents.judge import Judge
from utils.logging import log_event

class EpistemicError(Exception):
    """Raised when a thesis fails the falsifiability gate."""
    pass

class GauntletEngine:
    def __init__(self, client):
        self.claimant = Claimant(client)
        self.interrogator = Interrogator(client)
        self.judge = Judge(client)

    def run(self, thesis: str) -> CognitiveTrace:
        # Step 1: Construction
        initial_claim = self.claimant.construct(thesis)
        log_event(1, "Claimant_Construction", initial_claim.model_dump())
        
        # Falsifiability Gate: Stop immediately if false
        if not initial_claim.falsifiability_check:
            log_event(0, "System", {"error": "Falsifiability Gate Failed", "thesis": thesis})
            raise EpistemicError("Thesis rejected: Statement is not falsifiable.")

        # Step 2: Attack (Context Firewall: Pass only LogicalClaim JSON, no metadata)
        claim_json = initial_claim.model_dump_json(exclude={"falsifiability_check", "claim_id"})
        questions = self.interrogator.attack(claim_json)
        log_event(2, "Interrogator_Attack", [q.model_dump() for q in questions])

        # Step 3: Patch (Receives Step 1 output + Step 2 questions)
        questions_json = json.dumps([q.model_dump() for q in questions])
        revision = self.claimant.patch(initial_claim, questions_json)
        log_event(3, "Claimant_Patch", revision.model_dump())

        # Step 4: Autopsy (Receives all three prior outputs)
        evaluation = self.judge.evaluate(
            step1=initial_claim.model_dump_json(),
            step2=questions_json,
            step3=revision.model_dump_json()
        )
        log_event(4, "Epistemic_Judge", evaluation.model_dump())
        
        return CognitiveTrace(
            thesis_input=thesis,
            model_used="Gemini-3-Flash",
            initial_claim=initial_claim,
            questions=questions,
            revision=revision,
            final_claim=revision.revised_claim,
            score=evaluation.score,
            **evaluation.trace 
        )