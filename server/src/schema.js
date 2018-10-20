'use strict';

const { gql } = require('apollo-server');

const schema = gql`
  type Recipe {
    title: String!
    description: String
    ingredients: [String!]!
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
    createdAt: String
    chef: Chef
    rating: Float
    provider: Provider
    level: LevelType
  }

  enum LevelType {
    easy
    intermediate
    advanced
  }

  type Nutrition {
    title: String
    amountPerServing: String
    calories: Float
    caloriesFromFat: Float
    totalFat: Float
    totalFatDailyValue: Float
    saturatedFat: Float
    saturatedFatDailyValue: Float
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

  type Provider {
    recipeUrl: String
    siteUrl: String
    name: String
    image: String
  }

  input Pagination {
    offset: Int
    limit: Int
  }

  type Query {
    getRecipe(id: ID!): [Recipe]!
    searchRecipes(query: String!, pagination: Pagination): [Recipe]!
    recommendedRecipes(pagination: Pagination): [Recipe]!
  }
`;

module.exports = schema;
