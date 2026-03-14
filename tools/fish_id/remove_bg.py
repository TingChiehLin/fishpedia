import base64
import json
import sys
from pathlib import Path

from rembg import remove
from PIL import Image


def main() -> int:
    if len(sys.argv) < 2:
        print(json.dumps({"error": "image_path required"}))
        return 1

    image_path = Path(sys.argv[1])
    if not image_path.exists():
        print(json.dumps({"error": "image not found"}))
        return 1

    with open(image_path, "rb") as f:
        data = f.read()

    result = remove(data)
    encoded = base64.b64encode(result).decode("utf-8")
    print(json.dumps({"imageBase64": encoded}))
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
