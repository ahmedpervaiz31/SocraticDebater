/**
 * CognitiveTrace — Mock data for the Epistemic Gauntlet platform.
 * Each trace represents a full debate analysis pipeline run.
 */

const cognitiveTraces = [
  {
    id: "trace-001",
    thesis_input:
      "Universal Basic Income would eliminate poverty without reducing workforce participation in developed economies.",
    domain: "Economics",
    timestamp: "2026-03-21T14:32:00Z",
    initial_claim: {
      initial_claim_summary:
        "The thesis asserts that a Universal Basic Income (UBI)—a regular, unconditional cash transfer to all citizens—can eradicate poverty while maintaining current levels of workforce engagement in developed nations. This hinges on the assumption that economic security does not diminish the intrinsic motivation to work.",
      assumptions: [
        {
          id: "A1",
          text: "Poverty is primarily a function of insufficient income, not structural inequality.",
          grounding_type: "Empirical",
        },
        {
          id: "A2",
          text: "Workforce participation is driven by factors beyond financial necessity (e.g., purpose, social identity).",
          grounding_type: "Psychological",
        },
        {
          id: "A3",
          text: "Developed economies have sufficient fiscal capacity to fund UBI at poverty-eliminating levels.",
          grounding_type: "Fiscal",
        },
        {
          id: "A4",
          text: "Inflation effects of UBI disbursement are negligible or controllable.",
          grounding_type: "Monetary",
        },
      ],
      inferential_chain: [
        "If every citizen receives income above the poverty line → poverty is mathematically eliminated.",
        "If non-financial motivations dominate labor decisions → workforce participation remains stable.",
        "If fiscal capacity exists → the program is sustainable.",
        "Therefore: UBI eliminates poverty without reducing workforce participation.",
      ],
    },
    questions: [
      {
        id: "Q1",
        target_element_id: "A1",
        question_text:
          "Does your model account for the distinction between absolute poverty (income) and relative poverty (inequality), given that UBI addresses only the former?",
        interrogator_reasoning:
          "A1 conflates income insufficiency with the multidimensional nature of poverty. Structural barriers (housing, healthcare access) persist even with cash transfers.",
      },
      {
        id: "Q2",
        target_element_id: "A2",
        question_text:
          "What empirical evidence supports that intrinsic motivation outweighs the substitution effect of unearned income at scale?",
        interrogator_reasoning:
          "Small-scale UBI pilots (Finland, Stockton) showed mixed results. The assumption may not hold when scaled, especially for marginal workers.",
      },
      {
        id: "Q3",
        target_element_id: "A3",
        question_text:
          "Can you specify the tax restructuring or spending reallocation required, and whether it introduces secondary economic distortions?",
        interrogator_reasoning:
          "A3 hand-waves fiscal feasibility. The funding mechanism itself (e.g., VAT, wealth tax) can create distortions that undermine the claim.",
      },
    ],
    revision: {
      responses: [
        {
          question_id: "Q1",
          response_to_question:
            "The critique is valid. Poverty is multidimensional. UBI addresses the income dimension but must be paired with structural reforms. I revise my claim to reflect this.",
          revision_type: "Concession",
          before:
            "Universal Basic Income would eliminate poverty without reducing workforce participation.",
          after:
            "Universal Basic Income would eliminate income poverty and must be paired with structural reforms to address multidimensional deprivation.",
        },
        {
          question_id: "Q2",
          response_to_question:
            "I defend the assumption partially. While the Finland pilot showed no significant decline in employment, I acknowledge the evidence is limited at scale. I add a qualifier.",
          revision_type: "Qualification",
          before:
            "Workforce participation is driven by factors beyond financial necessity.",
          after:
            "Existing pilot data suggests workforce participation is not significantly reduced, though large-scale evidence remains inconclusive.",
        },
        {
          question_id: "Q3",
          response_to_question:
            "I cannot fully specify a fiscally neutral funding model without introducing distortions. This weakens the unconditional nature of my original claim.",
          revision_type: "Concession",
          before:
            "Developed economies have sufficient fiscal capacity to fund UBI.",
          after:
            "Funding UBI at poverty-eliminating levels requires significant fiscal restructuring whose secondary effects are not yet fully modeled.",
        },
      ],
    },
    score: {
      validity: 72,
      soundness: 58,
      resilience: 65,
      precision: 70,
      composite_score: 66,
      net_improvement_delta: 12,
      judge_commentary:
        "The thesis demonstrated meaningful intellectual honesty through its willingness to concede and qualify. However, the original claim was overconfident relative to its evidential base. The revised thesis is substantially more defensible, though it now makes a weaker claim than originally intended. The arguer should note that 'eliminating poverty' was revised to 'eliminating income poverty'—a significant narrowing.",
      key_inflection:
        "The pivot point was Q1, which forced the distinction between income poverty and multidimensional poverty. This single question cascaded into revisions across all three assumptions.",
      evasion_flags: "CLEAN",
    },
  },
  {
    id: "trace-002",
    thesis_input:
      "Artificial General Intelligence will be achieved within the next decade through scaling transformer architectures.",
    domain: "AI / Computer Science",
    timestamp: "2026-03-20T09:15:00Z",
    initial_claim: {
      initial_claim_summary:
        "The thesis posits that the current trajectory of scaling transformer-based models—increasing parameters, data, and compute—will lead to AGI by approximately 2036. This assumes that intelligence is primarily a function of scale and that emergent capabilities will continue to appear.",
      assumptions: [
        {
          id: "A1",
          text: "Intelligence emerges from scale: more parameters and data yield qualitatively new capabilities.",
          grounding_type: "Empirical (Scaling Laws)",
        },
        {
          id: "A2",
          text: "Transformer architecture is sufficiently general to support AGI-level reasoning.",
          grounding_type: "Architectural",
        },
        {
          id: "A3",
          text: "Compute resources will continue to grow at the required rate.",
          grounding_type: "Industrial",
        },
      ],
      inferential_chain: [
        "Scaling laws show predictable capability growth → extrapolation suggests AGI-level performance.",
        "Emergent abilities (reasoning, planning) appear at scale thresholds → further scaling yields more emergence.",
        "Hardware and investment trends support continued scaling → resources are available.",
        "Therefore: AGI via transformer scaling within 10 years.",
      ],
    },
    questions: [
      {
        id: "Q1",
        target_element_id: "A1",
        question_text:
          "Can you distinguish between performance on benchmarks and genuine understanding? Scaling may improve the former without achieving the latter.",
        interrogator_reasoning:
          "A1 equates benchmark performance with intelligence. This is a category error—systems can score highly on tests without possessing causal reasoning or world models.",
      },
      {
        id: "Q2",
        target_element_id: "A2",
        question_text:
          "What evidence suggests transformers can perform genuine causal reasoning rather than sophisticated pattern matching?",
        interrogator_reasoning:
          "The transformer's attention mechanism excels at statistical correlation but has no built-in mechanism for causal inference or counterfactual reasoning.",
      },
      {
        id: "Q3",
        target_element_id: "A3",
        question_text:
          "Are you accounting for the energy and environmental constraints that may cap compute scaling?",
        interrogator_reasoning:
          "Current trends in energy consumption for AI training are unsustainable. Regulatory and physical limits may halt scaling before AGI is reached.",
      },
    ],
    revision: {
      responses: [
        {
          question_id: "Q1",
          response_to_question:
            "I maintain that benchmark performance is a useful proxy but concede it is not equivalent to general intelligence. I revise to acknowledge this gap.",
          revision_type: "Qualification",
          before:
            "Intelligence emerges from scale: more parameters and data yield qualitatively new capabilities.",
          after:
            "Scaling yields impressive benchmark performance and some emergent behaviors, but whether this constitutes general intelligence remains an open question.",
        },
        {
          question_id: "Q2",
          response_to_question:
            "This is a strong challenge. I cannot provide definitive evidence that transformers perform causal reasoning. I revise the architectural sufficiency assumption.",
          revision_type: "Concession",
          before:
            "Transformer architecture is sufficiently general to support AGI-level reasoning.",
          after:
            "Transformer architecture may require augmentation with causal reasoning modules or hybrid approaches to achieve AGI-level cognition.",
        },
        {
          question_id: "Q3",
          response_to_question:
            "While I believe efficiency improvements will partially offset energy concerns, I concede that physical constraints are a real bottleneck.",
          revision_type: "Qualification",
          before:
            "Compute resources will continue to grow at the required rate.",
          after:
            "Compute growth may be constrained by energy and environmental limits, potentially extending the timeline beyond one decade.",
        },
      ],
    },
    score: {
      validity: 55,
      soundness: 42,
      resilience: 48,
      precision: 60,
      composite_score: 51,
      net_improvement_delta: 18,
      judge_commentary:
        "The original thesis was bold but under-supported. The arguer demonstrated good faith by conceding on the architectural point and qualifying the timeline. However, the core claim was substantially weakened—from 'AGI in 10 years via scaling' to 'maybe, with hybrid approaches, and possibly longer.' The revised position is more honest but barely resembles the original thesis.",
      key_inflection:
        "Q2 was the critical blow. The inability to defend causal reasoning in transformers undermined the entire architectural assumption, which is the load-bearing pillar of the thesis.",
      evasion_flags: "CLEAN",
    },
  },
  {
    id: "trace-003",
    thesis_input:
      "Democratic institutions are inherently more stable than authoritarian regimes over multi-generational timescales.",
    domain: "Political Science",
    timestamp: "2026-03-19T16:45:00Z",
    initial_claim: {
      initial_claim_summary:
        "The thesis argues that democracies, by virtue of their feedback mechanisms (elections, free press, independent judiciary), are structurally more resilient to shocks and maintain stability across generations compared to authoritarian systems that depend on individual leaders or narrow power bases.",
      assumptions: [
        {
          id: "A1",
          text: "Democratic feedback mechanisms (elections, press freedom) provide self-correcting governance.",
          grounding_type: "Institutional",
        },
        {
          id: "A2",
          text: "Authoritarian regimes are inherently fragile due to succession crises and lack of legitimacy.",
          grounding_type: "Historical",
        },
        {
          id: "A3",
          text: "Stability should be measured in multi-generational timescales (50+ years).",
          grounding_type: "Definitional",
        },
      ],
      inferential_chain: [
        "Democratic institutions distribute power → no single point of failure.",
        "Authoritarian regimes concentrate power → vulnerable to succession and legitimacy crises.",
        "Over long timescales, concentrated power structures fail more often → democracies outlast.",
        "Therefore: Democracies are inherently more stable multi-generationally.",
      ],
    },
    questions: [
      {
        id: "Q1",
        target_element_id: "A1",
        question_text:
          "How do you account for democratic backsliding—cases where democratic feedback mechanisms are dismantled from within?",
        interrogator_reasoning:
          "A1 assumes democratic mechanisms are self-sustaining. But erosion of press freedom, judicial independence, and electoral integrity can happen gradually within democracies.",
      },
      {
        id: "Q2",
        target_element_id: "A2",
        question_text:
          "Can you address the counter-example of China, which has maintained authoritarian stability for over 75 years with institutionalized succession?",
        interrogator_reasoning:
          "A2 overgeneralizes authoritarian fragility. Some authoritarian regimes have developed institutional mechanisms that partially replicate democratic stability features.",
      },
      {
        id: "Q3",
        target_element_id: "A3",
        question_text:
          "Is your definition of 'stability' conflating regime persistence with societal well-being?",
        interrogator_reasoning:
          "Stability could mean mere survival of the regime or could encompass broader metrics like human development, civil liberties, and economic resilience. The thesis conflates these.",
      },
    ],
    revision: {
      responses: [
        {
          question_id: "Q1",
          response_to_question:
            "Democratic backsliding is a real and documented phenomenon. I must qualify that democratic stability is conditional on the maintenance of institutional integrity, not inherent.",
          revision_type: "Qualification",
          before:
            "Democratic feedback mechanisms provide self-correcting governance.",
          after:
            "Democratic feedback mechanisms provide self-correcting governance only when institutional integrity is actively maintained and defended.",
        },
        {
          question_id: "Q2",
          response_to_question:
            "China is a legitimate counter-example. However, I would argue that 75 years is not yet multi-generational in the full sense, and the CCP's stability has not yet been tested by a true succession crisis from outside the party apparatus. I partially defend my position.",
          revision_type: "Defense",
          before:
            "Authoritarian regimes are inherently fragile due to succession crises.",
          after:
            "Many authoritarian regimes are fragile due to succession dynamics, though some (like China's CCP) have developed institutional succession mechanisms that extend their longevity.",
        },
        {
          question_id: "Q3",
          response_to_question:
            "I concede that I was conflating regime persistence with broader stability. A regime can persist while its citizens suffer. I narrow my claim to institutional persistence specifically.",
          revision_type: "Concession",
          before: "Democracies are inherently more stable.",
          after:
            "Democracies tend toward longer institutional persistence, though this does not automatically guarantee superior societal outcomes.",
        },
      ],
    },
    score: {
      validity: 68,
      soundness: 62,
      resilience: 71,
      precision: 55,
      composite_score: 64,
      net_improvement_delta: 8,
      judge_commentary:
        "The thesis was well-structured but relied on overgeneralized assumptions. The arguer showed strength in defending against the China counter-example with a nuanced temporal argument, but the concession on conflating stability with well-being revealed a significant definitional weakness. The revised thesis is more precise but also more limited in its claims.",
      key_inflection:
        "Q3's challenge on the definition of stability was the most consequential. It forced the arguer to decompose the concept and admit that institutional persistence and societal well-being are independent variables.",
      evasion_flags: "EVASION_DETECTED",
    },
  },
];

export default cognitiveTraces;
