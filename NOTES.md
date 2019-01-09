## Recipes API

https://donteatthat.herokuapp.com

## GET https://donteatthat.herokuapp.com/api/recipes/all

Returns an array of all the recipes of all users.

## GET https://donteatthat.herokuapp.com/api/recipes/:userid

Returns an array of all the recipes of a single user.

## GET https://donteatthat.herokuapp.com/api/recipes/one/:id

Returns a json of a recipe and it's details and ingredients.

## POST https://donteatthat.herokuapp.com/api/recipes/

Returns an id of the recipe created. Needs a recipe name, description, userid, and an ingredient array with each ingredient having a name, quanitity and unit as follows:

```js
{
	"name": "avocado smoothie",
	"description": "Delicious simple avocado smoothie.",
	"userid": 2,
	"ingredients": [{"name": "avocados", "quantity": 2}, {"name": "water", "quantity": 2, "unit": "cups"}]
}
```
