from bs4 import BeautifulSoup
import json
with open("./data.txt", "r") as text:
    data = text.read()

soup = BeautifulSoup(data, "html.parser")

tr_tags = soup.find_all("tr")
temp = ""
data_dict = {}
for tr in tr_tags:
    for child in tr.children:
        if child.name == "td":
            try:
                child["class"] == "kgm3" # tests to see if the class exists
                data_dict[temp] = float("".join(child.contents))
            except KeyError:
                temp = "".join(child.contents)

print(data_dict)

with open("./jsondata.json", "w") as file:
    file.write(json.dumps(data_dict, indent=4, sort_keys=True))
