# Don't Eat That

Don't Eat That is an app where you can create and view recipes. You can copy other people's recipe or import a recipe from another site. If you save allergies, recipes with allergic ingredients are highlighted.

Front-end Deployment: https://donteatthatapp.netlify.com/
Back-end Deployment: https://donteatthat.herokuapp.com/
Wireframe: https://balsamiq.cloud/snv27r3/phc7e1w/rACD7

## Table of Contents

- Team
- Installation
- FAQs
- Tech Stack Rationale
- Security
- Efficiency and Scalability
- Back-end API
- Images
- Contributing

### Team

- McKay Bonham
- Edward Jeong
- Vance Leon
- Peter Pham

### Installation

To install the application in a local dev environment, run `yarn install` in the root folder as well as the client folder. Then, in the root folder you run `yarn server` and in the client folder you run `yarn start`.

Know that the local front-end hits our deployed back-end, not the local back-end. You can change that by setting the variable `URL` at the top of every actions file in `client/src/actions` besides the `index.js` to your localhost or a deployed server.

When testing the local back-end, the POST and PUT recipe, user, allergy, and rating endpoints aren't functional since they have `returning()` statements that aren't used in the local SQLite3 database but are required for the Heroku PostgreSQL server. To make a local PostgreSQL server, look at these instructions: https://github.com/Lambda-School-Labs/Labs8-OfflineReader/wiki/Setting-up-a-PostgreSQL-database-for-local-testing.

The app will break without the proper API keys placed into the app. We hid them in order for our app to have security. Below are the following API keys needed and where to put them along with links to the sites where we got them:

- The firebase API key is required in `client/src/components/firebase/firebase.js` in line 8 for authentication to function in addition to the rest of the config file.
	- Signup for firebase, create a project, allow user authentication through email/google/facebook, go to project settings, under Your Apps click the code icon and you'll get a script you can put into the file above and replace the config portion. (https://firebase.google.com/)
- The Edamam Food Database API key and id is required in `client/src/components/AddNewRecipeForm.js` in lines 62-63 and in `client/src/components/EditRecipe.js` in lines 54-55 for the ingredient units autocomplete to function.
	- Signup for the Developer plan for the Food Database API, go to your Dashboard, then the Applications tab, next hit View for the API. Here you can get your AppID and AppKey to place on the lines above. (https://developer.edamam.com/food-database-api)
- The Edamam Nutrition Analysis API key and id is required in `client/src/actions/recipeActions.js` in lines 140-141 for nutrition analysis to function.
	- Follow the instructions for the Food Database API to get the AppId and AppKey. (https://developer.edamam.com/edamam-nutrition-api)
- The Stripe API publishable key is required in `client/src/App.js` in line 57 and the secret key in `routes/paymentRouter.js` in line 2 for the payments to function.
	- After signing up for Stripe, go to the Developers tab on the left-side of the dashboard, then go to API keys. There you can find the publishable key and the secret key to insert into the code above. (https://stripe.com/)
	- Now, create a Product in Products under the Billing tab in the dashboard. After creating the product, click on the product to enter a screen where you can create two pricing plans (one $2/month another $10/year). After creating them, click on them to get their IDs. Place them in `routes/paymentRouter.js` on lines 8-9 with the \$2/month planID in silverCode and the other in goldCode.
- The Spoonacular API key is required in `client/src/components/AddFromWeb.js` in line 32 for recipe imports to function and in `client/src/actions/recipeActions.js` in line 168 for ingredients autocomplete to function.
	- Signup at RapidAPI and go to the given url. There, the API key can be found in the Request Snippet section for the example endpoints they have in the header part in the following example: `.header("X-RapidAPI-Key", "{API_Key_Here}")`. (https://rapidapi.com/spoonacular/api/recipe-food-nutrition)
- The AWS API secret access key and access key id are required in `routes/file-upload.js` in lines 15-16 for image upload to function.
	- Follow section 2 of the given article to signup for AWS and get the API keys. (https://medium.freecodecamp.org/how-to-set-up-simple-image-upload-with-node-and-aws-s3-84e609248792)
		- After setting the environment variable, to run a script.js file that uses the SDK, type the following at the command line: `$ AWS_PROFILE=work-account node script.js`
		- You can also explicitly select the profile used by the SDK, either by setting process.env.AWS_PROFILE before loading the SDK, or by selecting the credential provider as shown in the following example:
			- `var credentials = new AWS.SharedIniFileCredentials({profile: 'work-account'});AWS.config.credentials = credentials;`
		- You will need to reconfigure **Public Access Settings**
			- In your AWS console click **Edit public access settings**, and uncheck all boxes that block public access.
		- This should complete the AWS backend process, test again in postman to verify that you received the image URL.
- The Rechaptcha API key is required in `client/src/components/auth/signUp.js` in 176 for signUp to function. 
	- Create an account at Rechaptcha, go to admin console. register your site and get a key. Replace the config portion with the key. (https://www.google.com/recaptcha)

### FAQs

#### What problem does this application solve?

There are a number of recipe sites online already, and a number of nutrition tracking websites, but we want to combine the two ideas. Don’t Eat That is designed to solve the problem of being able to upload and keep track of recipes that meet the user’s nutritional needs. In accordance with its name, it will particularly emphasize allergies: letting users filter by allergic ingredients and/or highlighting those ingredients to be avoided.

##### User Story

Shelly is allergic to shellfish and wants to compile a list of recipes that are suitable for her dietary needs. Luckily, she just downloaded Don’t Eat That! She opens the app and sets she allergy to shellfish in the settings. Then she views a list of recipes already created by other users where recipes with shellfish are highlighted in red so she avoids them. Although impressed by the recipes, she doesn’t find what she’s looking for and wants to add her own. Fortunately, she sees at the bottom of her screen a button to create recipes. So she clicks it, bringing her to a form asking her for a name, description, image, and ingredients. She saves it and now can view the recipe with its nutritional value when she cooks it again!

#### Who are your competitors and how do they solve this problem? List at least three.

allrecipes.com lets people upload, browse and rate recipes.

myfitnesspal.com lets people calculate the nutritional value of various recipes and use that to decide and track what they eat.

Tasty.co lets people upload and browse recipes. Has a tips section from other people that have tried the recipe.

#### Who is your target audience?

A user with dietary restrictions or allergies that wants to save recipes suitable for their needs.

#### How many types of user accounts will you need for this project?

Account Type: Standard (Dishwasher)
Description: Free-subscription accounts for users with limited functionalities
Features:

- All CRUD operations with recipes
- Upload pictures of recipe
- Copy Recipes
- Import Recipes from other sites
- Recipe Reviews
- Allergy Notifications
- Search Recipes

Account Type: Premium (Line Cook or Executive Chef)
Description: With the paid subscription you get all the benefits of the free subscription plus some extra functionalities listed below.
Features:

- Nutritional Analysis of Recipes
- Download Recipes

### Tech Stack Rationale

#### Front End

**Solution:** React, React Router, Redux, Styled Components, Semantic UI
**What problems does this solution solve for this specific project?:**

- Organizes state and manages front-end part of the project, reduces need for page reloads during navigation
- Routing links
- DOM Manipulation
- Reusable components
- Performance
- Documentation and ease-of-use/implementation

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

- Name of recipe (non-nullable)
- Descriptions (or steps) (non-nullable)
- Imageurl
- User_id (non-nullable)

**Recipes-Ingredients table (many-to-many)**

- Recipe_id (non-nullable)
- Ingredient_id (non-nullable)
- Ingredient amount (non-nullable)

**Ingredients Table**

- Name of ingredient
- Unit of ingredient measurement

**Allergies Table**

- Name of allergy

**Users-Allergies Table**

- User_id
- Allergy_id

**Ratings Table**

- Rating
- User_id
- Allergy_id

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

**Solution:** Edamam Nutritional Analysis and Food Database API, Spoonacular API

**Why did you choose this API over others?**

- Great parsing through ingredients with NLP to get nutrient analysis of a recipe (Edamam)
- Ease of use and ok documentation (both)
- Had the specific features needed to implement for app (e.g. Spoonacular: auto-completion of ingredient names and Extract Recipes endpoint)
- Free tier very limited though good enough for our needs

**What other APIs could you have used and why not?**

- USDA: Bad ingredients returned on search, limited API
- Nutritionix: Very limited API

### Security

For authentication we went through Google's Firebase for registering, logging in, and logging out. The registering includes a recaptcha for extra authentication. The log in also allows for third party authorization with Google or Facebook.

Most of our routes utilize the firebaseid given from Firebase after you register or login. We place it in localStorage until the user logs out and send it along to the majority of our backend endpoints that require it in order for the application to function. That way, when the user isn't logged in or registered through our firebase system, they can't access the data on our backend.

There is a security risk if a user happens to steal/chance upon someone else's firebaseid and then can manually `localStorage.setItem('uid')` that firebaseid to access the other person's recipes, allergies, etc., though the likelihood of that isn't great, and they have to know what localStorage variable to set. More probable is if the user forgets to log out, there is no reauthentication after a period of time or token expiration so anyone can just use that person's account without consent.

In terms of our API keys, we hid all of them using a shared .env file we gitignored on the project and posted them on Netlify and Heroku as environmental variables. This way, no one and can through our code and notoriously ping APIs to their limits or charge payments with the Stripe key to ruin our account.

### Efficiency and Scalability

There are some issues with the efficiency and scalability of our app.

First is that we're using an O(n^3) function on line 147 in `client/src/components/DisplayListRecipes.js` to go through the recipes to discover if they're any allergies in them that the user has set in settings. On a small scale of recipes it's less noticeable, but on a large scale the loading times for recipes will be significantly increased unless we introduce a pagination or other solution to remedy such a performance heavy function.

Second is the limitation of our APIs, specifically the Edamam Nutritional Analysis, Edamam Food Database API, and the Spoonacular Autocomplete API. They are a limit to how much they can be used before they are cut-off.

Third is the fact that we're using a SQL database. In development we have to reset our database everytime we make a change to the tables or add another. After production, I don't know how to manage changes in the database so the horizontal scaling will be very difficult. Our endpoints hit the database multiple times to get the necessary data to the front-end, so many read and write queries per second might overload the backend and reduce the scalability of our app.

### Back-end API

#### Recipes

##### GET https://donteatthat.herokuapp.com/api/recipes/all

Returns an array of all the recipes of all users.

##### GET https://donteatthat.herokuapp.com/api/recipes/:firebaseid

Returns an array of all the recipes of the current user.

##### GET https://donteatthat.herokuapp.com/api/recipes/:firebaseid/not

Returuns an array of all the recipes of other users excluding the current user.

##### GET https://donteatthat.herokuapp.com/api/recipes/one/:id

Returns a json of a recipe and it's details.

##### POST https://donteatthat.herokuapp.com/api/recipes/create

Returns the created recipe object. Needs a recipe name, description, firebaseid, and an ingredient array with each ingredient having a name, quanitity and unit with an optional imageUrl as follows:

```
{
	"name": "avocado smoothie",
	"description": "Delicious simple avocado smoothie.",
	"firebaseid": "123asdf23fasdf",
	"imageUrl": "",
	"ingredients": [{"name": "avocados", "quantity": 2}, {"name": "water", "quantity": 2, "unit": "cups"}]
}
```

##### EDIT https://donteatthat.herokuapp.com/api/recipes/edit/:id

Returns the edited object. Needs **one** of the following: recipe name, description, userid, or an ingredient array with each ingredient having a name, quanitity and unit with an optional imageUrl as follows:

```
{
	"name": "avocado smoothie",
	"description": "Delicious simple avocado smoothie.",
	"firebaseid": "123asdf23fasdf",
	"imageUrl": "",
	"ingredients": [{"name": "avocados", "quantity": 2}, {"name": "water", "quantity": 2, "unit": "cups"}]
}
```

##### DELETE https://donteatthat.herokuapp.com/api/recipes/delete/:id

Returns a count of the number of recipes deleted. Needs the recipe id in query to work.

#### Users

##### GET https://donteatthat.herokuapp.com/api/users/all

Returns an array of all the users.

##### GET https://donteatthat.herokuapp.com/api/users/one/:id

Returns object of specified user.

##### POST https://donteatthat.herokuapp.com/api/users/create

Returns the id of the user. Needs a firebase id object sent to create one as follows:

```
{
	"firebaseid": "123asdf23fasdf"
}
```

#### Payments

##### GET https://donteatthat.herokuapp.com/api/payments/plan/:firebaseid

Returns the plan name that the user is subscribed to based off of the subscriptionid of the user, which is found with the firebaseid in the url.

##### POST https://donteatthat.herokuapp.com/api/payments/charge

Charges a user for a subscription to Don't Eat That and returns a subscription object. Needs a token from stripe, a plan that's either 'plan_EKIEXJhyKqBTFd' or 'plan_EKIFbngvwjejux', and a firebase id as follows:

```
{
	"token": "123asafd331adasf",
	"customerPlan": 'plan_EKIEXJhyKqBTFd',
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

#### Ratings

##### POST https://donteatthat.herokuapp.com/api/ratings/

Returns the ratingid and userid. Requires, a firebaseid, recipeid, and the new rating as follows:

```
{
	"firebaseid": "123asdf23fasdf",
	"recipeid": 4,
	"newRating": 5
}
```

#### File Upload

##### POST https://donteatthat.herokuapp.com/api/image-upload/

Returns an imageurl from the AWS database. Requires an image file.

#### External Endpoints

##### POST https://api.edamam.com/api/nutrition-details

Given information about an ingredient (in Body), returns information about that ingredient's nutritional content.

##### GET https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/food/ingredients/autocomplete

Given part of a name of an ingredient, returns guesses at the ingredient's full name.

##### GET https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/extract

Given a URL of a website where a recipe is provided, attempts to parse the website and extract information about the recipe in question.

### Images

Our landing page image was sourced from Unsplash (Brooke Lark) at the following address: https://unsplash.com/photos/08bOYnH_r_E. The favicon main image was sourced from Pexels (Alexander Dummmer) at the following address: https://www.pexels.com/photo/food-plate-chocolate-dessert-132694/. The default image for recipes was also sourced at Pexels (Pixabay) at the following address: https://www.pexels.com/photo/aroma-chili-condiments-cook-357743/. The import recipe photo was sourced at Pexels (Lukasz Dziegel) at the following address: https://www.pexels.com/photo/grilled-dish-with-vegetables-on-round-white-ceramic-plate-1440119/.

The recipe images, other than the default image, are dependant on the user. We have no control of where the images are taken from and their license. 

The Unsplash license is at the following page: https://unsplash.com/license and the license for Pexel is at the following page: https://www.pexels.com/photo-license/.

### Contributing

Contributions are welcome. Please create an Issue if there is a bug or feature request you are interested in adding to the project. If you would like to implement the Pull request for this Issue yourself, please request permission in the Issue commentary and affirm from a Maintainer that you can proceed. Once confirmed, assign yourself the Issue in Github.

Pull requests are made via the git feature branch workflow described [here](https://www.atlassian.com/git/tutorials/comparing-workflows/feature-branch-workflow). Once you are assigned the Issue, you can clone the repo locally, and begin working on the feature branch.

If you are implementing new features, please introduce well-thought out unit/integration tests as needed to ensure the feature works properly. Please also ensure you are running eslint, and eliminating any linting errors before attempting to create a pull request. Please also run Prettier, to ensure you are meeting the formatting standards for this project

Once your feature has been finished, please use `git push -u origin *feature-name*` to create the branch on the remote repository, then create the Pull request in github. As part of the Pull request, please fill out the [pull request template](pull_request_template.md) (this should auto-populate in your pull request). Once completed, you may create your Pull request. A review from a contributor and ultimate merge approval by an admin will be required. If there are requests raised in the review, please address them.
