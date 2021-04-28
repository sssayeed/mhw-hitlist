import requests
import bs4
import csv

req = requests.get('https://mhworld.kiranico.com/monsters')

soup = bs4.BeautifulSoup(req.text, 'html.parser')
tables = soup.find_all('table')
rows = tables[0].find_all('tr')

monsters = []
count = 0

#scrape monster names

for row in rows:
    entries = row.find_all('span')
    count = count + 1
    for line in entries:
        entry = []
        entry.append(count)
        entry.append(line.contents[0].contents[0].string)
        monsters.append(entry)

#scrape images
count = 0
for row in rows:
    links = row.find_all('img')
    img_link = links[0].get('src')
    img_data = requests.get(img_link).content
    print(monsters[count][1])
    with open("img/" + str(count) + ".png", 'wb') as handler:
        handler.write(img_data)
    count = count + 1