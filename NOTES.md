## Recipes API

https://donteatthat.herokuapp.com

## GET https://donteatthat.herokuapp.com/api/recipes/all

Returns an array of all the recipes of all users.

## GET https://donteatthat.herokuapp.com/api/recipes/:userid

Returns an array of all the recipes of a single user.

## GET https://donteatthat.herokuapp.com/api/recipes/one/:id

Returns a json of a recipe and it's details and ingredients.

## POST https://donteatthat.herokuapp.com/api/recipes/create

Returns an id of the recipe created. Needs a recipe name, description, userid, and an ingredient array with each ingredient having a name, quanitity and unit as follows:

```js
{
	"name": "avocado smoothie",
	"description": "Delicious simple avocado smoothie.",
	"userid": 2,
	"ingredients": [{"name": "avocados", "quantity": 2}, {"name": "water", "quantity": 2, "unit": "cups"}]
}
```

## EDIT https://donteatthat.herokuapp.com/api/recipes/edit/:id

Returns the edited object like the one above. Needs a recipe name, description, userid, and an ingredient array with each ingredient having a name, quanitity and unit as follows:

```js
{
	"name": "avocado smoothie",
	"description": "Delicious simple avocado smoothie.",
	"userid": 2,
	"ingredients": [{"name": "avocados", "quantity": 2}, {"name": "water", "quantity": 2, "unit": "cups"}]
}
```

## DELETE https://donteatthat.herokuapp.com/api/recipes/delete/:id

Returns a count of the number of recipes deleted. Needs the recipe id in query to work.

USDA API Key:
Your API key for donteatthat4@gmail.com is:

0PHWZUGimGzADgnsVpt8zYo5R81dxudh3Sl3IBsd
You can start using this key to make web service requests. Simply pass your key in the URL when making a web request. Here's an example:

https://developer.nrel.gov/api/alt-fuel-stations/v1/nearest.json?api_key=0PHWZUGimGzADgnsVpt8zYo5R81dxudh3Sl3IBsd&location=Denver+CO
For additional support, please contact us. When contacting us, please tell us what API you're accessing and provide the following account details so we can quickly find you:

Account Email: donteatthat4@gmail.com
Account ID: 74e53a06-5e65-4d62-a2e8-1706db03e544
