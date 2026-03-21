import logging
import json
from datetime import datetime

# Standard config
logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s | %(levelname)s | %(message)s"
)
logger = logging.getLogger("SocraticGauntlet")

def log_event(step: int, agent: str, data: dict):
    """Logs the JSON payload for forensic observability."""
    timestamp = datetime.now().isoformat()
    log_entry = {
        "timestamp": timestamp,
        "step": step,
        "agent": agent,
        "payload": data
    }
    # Log as stringified JSON for easy parsing by log aggregators
    logger.info(f"GAUNTLET_TRACE: {json.dumps(log_entry)}")