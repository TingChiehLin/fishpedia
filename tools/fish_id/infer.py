import json
import sys
from pathlib import Path

from PIL import Image
from transformers import pipeline

MODEL_ID = "beercan/fish-classification"

_classifier = None


def get_classifier():
    global _classifier
    if _classifier is None:
        _classifier = pipeline("image-classification", model=MODEL_ID)
    return _classifier


def main() -> int:
    if len(sys.argv) < 2:
        print(json.dumps({"error": "image_path required"}))
        return 1

    image_path = Path(sys.argv[1])
    if not image_path.exists():
        print(json.dumps({"error": "image not found"}))
        return 1

    image = Image.open(image_path).convert("RGB")
    classifier = get_classifier()
    results = classifier(image)

    if not results:
        print(json.dumps({"error": "no results"}))
        return 1

    top = results[0]
    payload = {
        "label": top.get("label"),
        "score": top.get("score"),
        "top5": [
            {"label": r.get("label"), "score": r.get("score")}
            for r in results[:5]
        ],
    }
    print(json.dumps(payload))
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
