# Recipe App

## Server
WIP

## Scraping
Directory for all scraping resources, materials, and associated data

### Sample Scrape Recipe Object

```
{
  title: 'Parmesan Risotto',
  description: `Slowly stirring hot broth into creamy white rice soothes the soul--and the result comforts the body. This parmesan risotto recipe make take some time to prepare but the finished dish will be well worth the effort.`,
  ingridients: [
    '10 to 12 cups reduced-sodium or homemade chicken broth*',
    '2 tablespoons olive oil',
    '2 tablespoons plus 1 tsp. butter, divided',
    '1 medium onion, chopped (about 1 1/2 cups)',
    '2 1/2 cups risotto rice (see note)',
    '3/4 cup dry white wine',
    'About 1/2 tsp. salt',
    '1/2 cup freshly grated parmesan cheese, plus more for serving',
    '1/2 teaspoon freshly ground black pepper',
    '1/4 cup chopped flat-leaf parsley'
  ],
  directions: [
    'Bring chicken broth to a simmer in a medium pot. Keep at a simmer, covered, over low heat.',
    'Heat the olive oil and 2 tbsp. butter over medium heat in a heavy-bottomed 8-qt. pot. Add onion and sauté, stirring occasionally, until translucent and beginning to turn golden, about 10 minutes. Add rice and sauté, stirring constantly, until just the edges of the grains look translucent, about 3 minutes.',
    'Add wine and 1/2 tsp. salt and cook, stirring, until wine is completely absorbed by rice. Add about 1/2 cup hot broth to rice and cook, stirring constantly, until broth is completely absorbed by rice; reduce heat to medium-low if mixture starts to boil. Continue adding broth 1/2 cup at a time, stirring until each addition is absorbed before adding the next, until rice is just tender to the bite (15 to 30 minutes; you will have broth left over). Keep rice at a constant simmer.',
    'Remove rice from heat and stir in parmesan, pepper, parsley, remaining 1 tsp. butter, and salt to taste. For a looser risotto, stir in 1 to 2 cups remaining broth. Serve immediately, with more parmesan on the side for sprinkling.',
    'Risotto\'s characteristic creaminess and chewiness come from the rice itself, and risotto rice is no ordinary rice. It contains two different starches: an amylopectin exterior, which softens faster--especially under the pressure of constant stirring--to create a creamy sensation in the mouth; and an amylose interior, which stays relatively firm during cooking to give you that al dente bite.',
    `Arborio is the starchiest of the three popular risotto types, and it's the most prone to getting gummy as it cooks; inside, the grains tend to be chalky and crumbly. Widely available.`
    `Our favorite, Carnaroli has longer, narrow grains that cook the most evenly and have the best texture--creamy without being gluey, and a good chewy interior. Find at Whole Foods Markets, A.G. Ferrari Foods (agferrari.com), and gourmet grocery stores.`,
    `Vialone Nano grains are smaller, oval-shaped, and produce a delicate risotto with a nutty flavor. Find at A.G. Ferrari Foods (see above) and specialty stores.`,
    `Surprise: Sushi rice. Medium-grain Nishiki brand is creamy and chewy, and so much like Arborio that half our tasting panel couldn't tell the difference. Plus, it costs less than any Italian risotto rice.`
  ],
  image: 'https://imagesvc.timeincapp.com/v3/mm/image?url=https%3A%2F%2Fcdn-image.myrecipes.com%2Fsites%2Fdefault%2Ffiles%2Fstyles%2Fmedium_2x%2Fpublic%2Fimage%2Frecipes%2Fsu%2F09%2F02%2Fparmesan-risotto-su-1873423-x.jpg%3Fitok%3DA6i8zol2&w=800&q=85',
  totalTime: 50,
  servings: 8,
  nutrition: {
    calories: 307,
    caloriesFromFat: 27,
    protein: 10,
    fat: 9.2,
    saturatedFat: 3.7,
    carbohydrates: 46,
    fiber: 4.3,
    sodium: 1008,
    cholesterol: 14 
  },
  url: 'https://www.myrecipes.com/recipe/parmesan-risotto',
  review: 4.9,
  chef: {
    name: 'Chef John'
    avatar: 'https://secureimages.allrecipes.com/userphotos/250x250/2267470.jpg',
    url: 'https://www.allrecipes.com/cook/foodwisheswithchefjohn/'
  }
}
```

### Recipe GraphQL Schema

```
type Recipe {
  title: String!
  description: String
  ingridients: [String!]!
  directions: [String!]!
  tags: [String]
  image: String
  images: [String]
  url: String
  nutrition: Nutrition
  prepTime: Float
  cookTime: Float
  totalTime: Float
  servings: Float
  cusine: String
  course: String
  createdAt: String!
  chef: Chef
  review: Float
}

type Nutrition {
  title: String!
  amountPerServing: String!
  calories: Float
  caloriesFromFat: Float
  totalFat: Float
  totalFatDailyValue: Float
  saturatedFat: Float
  saturatedFateDailyValue: Float
  cholesterol: Float
  cholesterolDailyValue: Float
  sodium: Float
  sodiumDailyValue: Float
  potassium: Float
  potassiumDailyValue: Float
  carbohydrates: Float
  carbohydratesDailyValue: Float
  fiber: Float
  fiberDailyValue: Float
  sugars: Float
  sugarsDailyValue: Float
  protein: Float
  proteinDailyValue: Float
  vitaminA: Float
  vitaminADailyValue: Float
  vitaminC: Float
  vitaminCDailyValue: Float
  iron: Float
  ironDailyValue: Float
}

type Chef {
  name: String
  avatar: String
  url: String
}
```