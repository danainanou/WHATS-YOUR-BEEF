const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
const Cuisine = require('../models/cuisine');
const Ingredient = require('../models/ingredient');
const Recipe = require('../models/recipe');
const User = require('../models/user');
const config  = require('../config/env');

mongoose.connect(config.db['development']);

Cuisine.collection.drop();
Recipe.collection.drop();
Ingredient.collection.drop();
User.collection.drop();

// const cuisines =  [
//   {
//     'name': 'Indian',
//     'images': {
//       'small': 'http://www.kilnford.co.uk/wp-content/uploads/2017/03/Kilnford-indian-lamb-curry-5.jpg'
//     }
//   },
//   {
//     'name': 'Mexican',
//     'images': {
//       'small': 'http://www.kilnford.co.uk/wp-content/uploads/2017/03/Kilnford-indian-lamb-curry-5.jpg'
//     }
//   }
// ];

const recipes = [

  {
    'name': 'lamb',
    'instructions': [{
      'index': '1' ,
      'content': 'blah'
    }],
    'ingredients': [{
      'measurement': '1'
    }],
    'images': {
      'small': 'http://www.kilnford.co.uk/wp-content/uploads/2017/03/Kilnford-indian-lamb-curry-5.jpg'
    }
  }
];

const Lamb = new Recipe(
  {
    'name': 'lamb',
    'instructions': [{
      'index': '1' ,
      'content': 'blah'
    }],
    'ingredients': [{
      'measurement': '1'
    }],
    'images': {
      'small': 'http://www.kilnford.co.uk/wp-content/uploads/2017/03/Kilnford-indian-lamb-curry-5.jpg'
    }
  }
);

const ingredients = [
  {
    'name': 'Pepper',
    'images': {
      'small': 'http://www.kilnford.co.uk/wp-content/uploads/2017/03/Kilnford-indian-lamb-curry-5.jpg'
    }
  }
];

const users = [
  {
    'username': 'Sunny',
    'email': 'sunny@sunny.com',
    'password': 'password',
    'passwordConfirmation': 'password'
  }
];



//
// cuisines.forEach(cuisine => {
//   Cuisine
//     .create(cuisine, (err, cuisine) => {
//       console.log(`${cuisine.name} was saved`);
//     });
// });
//
// recipes.forEach(recipe => {
//   Recipe
//     .create(recipe, (err, recipe) => {
//       console.log(`${recipe.name} was saved`);
//     });
// });
//
// ingredients.forEach(ingredient => {
//   Ingredient
//     .create(ingredient, (err, ingredient) => {
//       console.log(`${ingredient.name} was saved`);
//     });
// });

// users.forEach(user => {
//   User
//     .create(user, (err, user) => {
//       console.log(`${user.username} was saved`);
//     });
// });

User
  .create(users)
  .then(users => {
    console.log(`${users.length} users created`);

    return Cuisine
      .create([
        {
          'name': 'Indian',
          'recipes': [Lamb._id],
          'images': {
            'small': 'http://www.kilnford.co.uk/wp-content/uploads/2017/03/Kilnford-indian-lamb-curry-5.jpg'
          }
        },
        {
          'name': 'Mexican',
          'images': {
            'small': 'http://www.kilnford.co.uk/wp-content/uploads/2017/03/Kilnford-indian-lamb-curry-5.jpg'
          }
        }
      ]);
  })
  .then(cuisines => {
    console.log(`${cuisines.length} cuisines created`);

    return Ingredient
      .create(ingredients);
  })
  .then(ingredients => {
    console.log(`${ingredients.length} ingredients created`);

    // return Recipe
    //   .create(recipes);
    return Lamb.save();
  })
  .then(recipe => {
    console.log(`${recipe} recipes created`);
  })
  .finally(() => {
    mongoose.connection.close();
  })
  .catch(err => {
    console.log(err);
  });