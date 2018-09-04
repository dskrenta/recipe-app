import urllib2
from bs4 import BeautifulSoup

file = open("recipes.txt", "r")
lines = [s.strip() for s in file.readlines()]

# print lines

recipe = {}

page = urllib2.urlopen(lines[0])
soup = BeautifulSoup(page, "html.parser")

title = soup.find("h1", {
    "class": "title"
})

print title
