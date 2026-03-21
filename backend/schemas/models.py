from pydantic import BaseModel, Field
from typing import Literal, Optional
from datetime import datetime
import uuid

class Assumption(BaseModel):
    id: str                            # "A1", "A2", etc.
    text: str
    grounding: Optional[str]
    grounding_type: Literal[
        "empirical", "definitional", "axiomatic", "ungrounded"
    ]

class InferentialStep(BaseModel):
    id: str                            # "I1", "I2", etc.
    from_premise: str
    to_conclusion: str
    inference_type: Literal[
        "deductive", "inductive", "abductive", "analogical"
    ]
    logical_gap_score: float           # 0.0 tight → 1.0 loose

class LogicalClaim(BaseModel):
    claim_id: str = Field(default_factory=lambda: str(uuid.uuid4())[:8])
    central_claim: str
    scope: str
    assumptions: list[Assumption]      # min 3, max 5
    inferential_chain: list[InferentialStep]  # min 2
    stated_evidence: list[str]         # min 2, max 4
    falsifiability_check: bool

class SocraticQuestion(BaseModel):
    question_id: str                   # "Q1", "Q2", "Q3"
    layer: Literal["FOUNDATION", "MACHINERY", "PERIMETER"]
    target_element_id: str             # "A1", "I2", "SCOPE", etc.
    question_text: str
    failure_mode_targeted: str
    interrogator_reasoning: str        # Why this is the weakest point

class QuestionResponse(BaseModel):
    question_id: str
    question_verbatim: str             # Must be exact quote — no paraphrase
    revision_type: Literal[
        "patch_assumption",
        "narrow_scope",
        "restructure_inference",
        "concede_and_reframe",
        "evidence_addition"
    ]
    element_modified: str # Must reference a specific ID (e.g., 'A1', 'I2') or 'SCOPE'.
    before: str
    after: str
    response_to_question: str          # min 2 sentences
    self_assessed_revision_strength: float  # 0.0–1.0, Claimant's own score

class ClaimRevision(BaseModel):
    revision_id: str = Field(default_factory=lambda: str(uuid.uuid4())[:8])
    prior_claim_id: str
    responses: list[QuestionResponse]  # exactly 3
    revised_claim: LogicalClaim

class EpistemicScore(BaseModel):
    validity_score: float
    soundness_score: float
    resilience_score: float
    precision_score: float
    composite_score: float
    evasion_flags: list[str]           # "Q1: CLEAN", "Q2: EVASION_DETECTED"
    judge_commentary: str

class CognitiveTrace(BaseModel):
    trace_id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    thesis_input: str
    domain: str
    model_used: str
    initial_claim: LogicalClaim
    questions: list[SocraticQuestion]  # exactly 3
    revision: ClaimRevision
    final_claim: LogicalClaim
    score: EpistemicScore
    initial_claim_summary: str
    attack_summary: str
    revision_summary: str
    final_claim_summary: str
    net_improvement_delta: float
    key_inflection: str
    collapse_detected: bool
    collapse_reason: Optional[str] = None
    baseline_comparison_id: Optional[str] = None