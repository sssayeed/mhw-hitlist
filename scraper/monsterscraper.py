import requests
import bs4
import csv
import urllib

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
        print(line.contents[0].contents[0])

fileName = 'monsters.csv'
fields = ['ID','Name']

with open(fileName, 'w') as csvfile:
    csvWriter = csv.writer(csvfile)

    csvWriter.writerow(fields)
    csvWriter.writerows(monsters)
