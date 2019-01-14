# Don't Eat That

Don't Eat That is an app where you can create and view recipes.

Front-end Deployment: https://donteatthatapp.netlify.com/
Back-end Deployment: https://donteatthat.herokuapp.com/
Wireframe: https://balsamiq.cloud/snv27r3/phc7e1w/rACD7

## Table of Contents

- Team
- Installation
- FAQs
- Tech Stack Rationale
- Back-end API
- Contributing

### Team

- McKay Bonham
- Edward Jeong
- Vance Leon
- Peter Pham

### Installation

To install the application in a local dev environment, run `yarn install` in the root folder as well as the client folder. Then, in the root folder you run `yarn server` and in the client folder you run `yarn start`.

Know that the local front-end hits our deployed back-end, not the local back-end.

When testing the local back-end, the POST and PUT recipe endpoints aren't functional since they have `returning()` statements that aren't used in the local SQLite3 database but are required for the Heroku PostgreSQL server.

### FAQs

#### What problem does this application solve?

There are a number of recipe sites online already, and a number of nutrition tracking websites, but we want to combine the two ideas. Don’t Eat That is designed to solve the problem of being able to upload and keep track of recipes that meet the user’s nutritional needs. In accordance with its name, it will particularly emphasize allergies: letting users filter by allergic ingredients and/or highlighting those ingredients to be avoided.

##### User Story

Shelly is allergic to shellfish and wants to compile a list of recipes that are suitable for her dietary needs. Luckily, she just downloaded Don’t Eat That! She opens the app and sets she allergy to shellfish in the settings. Then she views a list of recipes already created by other users that don’t include shellfish. Although impressed, she doesn’t find what she’s looking for and wants to add her own. Fortunately, she sees at the bottom of her screen a button to create recipes. So she clicks it, bringing her to a modal asking her what ingredients she wants to add. First off she marks off allergies, and then she adds ingredients. She saves it and now can view the recipe anything she needs when she cooks it again!

#### Who are your competitors and how do they solve this problem? List at least three.

allrecipes.com lets people upload, browse and rate recipes.

myfitnesspal.com lets people calculate the nutritional value of various recipes and use that to decide and track what they eat.

Tasty.co lets people upload and browse recipes. Has a tips section from other people that have tried the recipe.

#### Who is your target audience?

A user with dietary restrictions or allergies that wants to save recipes suitary for their needs.

#### How many types of user accounts will you need for this project?

Account Type: Standard
Description: Free-subscription accounts for users with limited functionalities
Needs:.  
Create recipes, all CRUD operations (MVP)
Upload pictures of recipe?
Nutritional breakdown (total calories) (MVP)
Search Recipes

Account Type: Premium
Description: With the paid subscription you get all the benefits of the free subscription plus some extra functionalities listed below.
Needs:
Dietary/Allergy awareness (MVP) unlimited

### Tech Stack Rationale

#### Front End

**Solution:** React, React Router, Redux, Styled Components, Material UI
**What problems does this solution solve for this specific project?:**

- Organizes state and manages front-end part of the project, reduces need for page reloads during navigation
- Routing links
- DOM Manipulation

**What are the costs of using this solution?**

- Search engine optimization is not up to par yet for single page applications.
- Dependencies we’ll use such as Router and Redux maintained by people that didn’t create React.

#### Back End

**Solution:** Node, Express
**What problems does this solution solve for this specific project?:**

- JavaScript on the front and back end
- Reduces server-side logic complexity -> faster development
- Minimalist and un-opinionated framework
- Performance and cross-platform coverage

**What are the costs of using this solution?**

- Single-threaded framework with event-driven nature with callbacks

#### Database

**Solution:** SQLite for dev and PostgreSQL for prod, Knex, Firebase
**What problems does this solution solve for this specific project?:**

- Structured schemas to define data
- Relationships between data
- Spread data across tables
- Able to query tables

**What are the costs of using this solution?**

- Very difficult horizontal scaling
- Limitations for lots of read and write queries per second

##### Tables

**Users table**

- Firebase ID (non-nullable)
- Customer ID
- Subscription ID

**Recipes table (many-to-one with users)**

- Recipe name (non-nullable)
- Descriptions (or steps) (non-nullable)
- User_id (non-nullable)

**Recipes-Ingredients table (many-to-many)**

- Recipe_id (non-nullable)
- Ingredient_id (non-nullable)
- Ingredient amount (non-nullable)

**Ingredients Table**

- Name of ingredient
- Unit of ingredient measurement

#### Deployment

**Solution:** Netlify and Heroku
**What problems does this solution solve for this specific project?:**

- Free deployment for your Github repos
- Continuous Deployment
- Versioning and Rollbacks
- Previews for each branch and pull requests
- Asset optimization
- Standard tools to build application so no lock-in to migrate to another service
- Single-click SSL, easy redirection for encryption
- Support for many static website generators

**What are the costs and benefits of using this solution?**

- Deployment is not automatic (need to push to update)
- Branch Merge conflicts
- Charge premium for high volume applications
- Code base is exposed to the world to see
- Using added on domain name so less professional

#### Food API

**Solution:** Edamam Nutritional Analysis API, Spoonacular API
**Why did you choose this API over others?**

- Great parsing through ingredients with NLP to get nutrient analysis of a recipe (Edamam)
- Ease of use and ok documentation (both)
- Had the specific features needed to implement for app
- Free tier very limited, applied for developer tier (Edamam) and student tier (Spoonacular)

**What other APIs could you have used and why not?**

- USDA: Bad ingredients returned on search, limited API
- Nutritionix: Very limited API

### Back-end API

#### Recipes

##### GET https://donteatthat.herokuapp.com/api/recipes/all

Returns an array of all the recipes of all users.

##### GET https://donteatthat.herokuapp.com/api/recipes/:userid

Returns an array of all the recipes of a single user.

##### GET https://donteatthat.herokuapp.com/api/recipes/one/:id

Returns a json of a recipe and it's details and ingredients.

##### POST https://donteatthat.herokuapp.com/api/recipes/create

Returns an id of the recipe created. Needs a recipe name, description, firebaseid, and an ingredient array with each ingredient having a name, quanitity and unit as follows:

```
{
	"name": "avocado smoothie",
	"description": "Delicious simple avocado smoothie.",
	"firebaseid": "123asdf23fasdf",
	"ingredients": [{"name": "avocados", "quantity": 2}, {"name": "water", "quantity": 2, "unit": "cups"}]
}
```

##### EDIT https://donteatthat.herokuapp.com/api/recipes/edit/:id

Returns the edited object like the one above. Needs **one** of the following: recipe name, description, userid, or an ingredient array with each ingredient having a name, quanitity and unit as follows:

```
{
	"name": "avocado smoothie",
	"description": "Delicious simple avocado smoothie.",
	"firebaseid": "123asdf23fasdf",
	"ingredients": [{"name": "avocados", "quantity": 2}, {"name": "water", "quantity": 2, "unit": "cups"}]
}
```

##### DELETE https://donteatthat.herokuapp.com/api/recipes/delete/:id

Returns a count of the number of recipes deleted. Needs the recipe id in query to work.

#### Users

##### GET https://donteatthat.herokuapp.com/api/users/all

Returns an array of all the users.

##### GET https://donteatthat.herokuapp.com/api/users/one/:id

Returns specified user.

##### POST https://donteatthat.herokuapp.com/api/users/create

Returns the id of the user. Needs a firebase id object sent to create one as follows:

```
{
	"firebaseid": "123asdf23fasdf"
}
```

#### Payments

##### POST https://donteatthat.herokuapp.com/api/payments/charge

Charges a user for a subscription to Don't Eat That and returns a subscription object. Needs a token from stripe, a plan that's either 'silver' or 'gold', and a firebase id as follows:

```
{
	"token": "123asafd331adasf",
	"customerPlan": 'silver',
	"firebaseid": "123asdf23fasdf"
}
```

##### POST https://donteatthat.herokuapp.com/api/payments/cancel

Cancels a subscription and returns a subscription object. Requires a firebaseid sent that is linked to a user account that has a subscription as follows:

```
{
	"firebaseid": "123asdf23fasdf"
}
```

### Contributing

Contributions are welcome. Please create an Issue if there is a bug or feature request you are interested in adding to the project. If you would like to implement the Pull request for this Issue yourself, please request permission in the Issue commentary and affirm from a Maintainer that you can proceed. Once confirmed, assign yourself the Issue in Github.

Pull requests are made via the git feature branch workflow described [here](https://www.atlassian.com/git/tutorials/comparing-workflows/feature-branch-workflow). Once you are assigned the Issue, you can clone the repo locally, and begin working on the feature branch.

If you are implementing new features, please introduce well-thought out unit/integration tests as needed to ensure the feature works properly. Please also ensure you are running eslint, and eliminating any linting errors before attempting to create a pull request. Please also run Prettier, to ensure you are meeting the formatting standards for this project

Once your feature has been finished, please use `git push -u origin *feature-name*` to create the branch on the remote repository, then create the Pull request in github. As part of the Pull request, please fill out the [pull request template](pull_request_template.md) (this should auto-populate in your pull request). Once completed, you may create your Pull request. A review from a contributor and ultimate merge approval by an admin will be required. If there are requests raised in the review, please address them.
