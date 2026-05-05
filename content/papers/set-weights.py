import os
import re

weight = 1
for file in os.listdir(""):
    with open(file, "r") as f:
        lines = f.readlines()

    with open(file, "w") as f:
        for line in lines:
            if re.search("weight = ", line):
                f.write(f"weight = {weight}")
            else:
                f.write(line)
    weight += 1
