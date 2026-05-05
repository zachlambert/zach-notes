import os
import re
from pathlib import Path

weight = 1
root = os.path.dirname(os.path.abspath(__file__))
for child_name in sorted(os.listdir(root), key=str.lower):
    child = Path(root) / child_name
    print(child)
    path = Path(child)
    if not path.is_dir():
        continue
    print(path)

    index = path / "_index.md"
    print(index)
    if not index.exists:
        continue
    print("exists")

    with open(index, "r") as f:
        lines = f.readlines()

    with open(index, "w") as f:
        for line in lines:
            if re.search("weight = ", line):
                f.write(f"weight = {weight}\n")
            else:
                f.write(line)
    weight += 1
