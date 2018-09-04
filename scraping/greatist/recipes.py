import urllib2
from bs4 import BeautifulSoup

file = open("recipes.txt", "a")
urls = []

for page_num in range(15):
    my_url = "https://greatist.com/eat/recipes?page=%d" %(page_num)
    page = urllib2.urlopen(my_url)
    print my_url
    soup = BeautifulSoup(page, "html.parser")
    # for num in range(1, 26):
        # cards = soup.findAll("div", {"class": "card card%d card-content card-recipe" %(num)})
    links = soup.select("h2 > a")
    for link in links:
        url = link['href']
        print url
        if url not in urls:
            urls.append(url)

for url in urls:
    file.write(url + "\n")

file.close()
