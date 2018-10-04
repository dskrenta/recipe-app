import urllib2
from bs4 import BeautifulSoup

file = open("images.txt", "a")
sources = []

for page_num in range(14):
    my_url = "https://greatist.com/eat/recipes?page=%d" %(page_num)
    page = urllib2.urlopen(my_url)
    soup = BeautifulSoup(page, "html.parser")
    images = soup.select("picture > img")
    for image in images:
        #srcset = image.find('img', 'srcset')
        #print image
        source = image.get('data-srcset')
        sources.append(source)

for source in sources:
    file.write(source + "\n")

file.close()
