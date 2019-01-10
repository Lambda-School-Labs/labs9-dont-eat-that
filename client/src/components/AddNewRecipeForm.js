import React, { Component } from 'react';
import { connect } from 'react-redux';

class AddNewRecipeForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: "",
            description: "",
            numIngredients: 3,
            ingredients: []
        };
    }

    typingHandler = ev => {
        this.setState({
            [ev.target.name]: ev.target.value
        });
    }

    ingHandler = ev => {
        // Get which ingredient form field type is being handled
        let rowType = ev.target.name.slice(0, 4);
        if (rowType === "quty") {
            rowType = 'quantity';
        }
        // Get what number of row on the form is being handled
        let rowNum = Number(ev.target.name.slice(4));

        if (rowNum >= this.state.ingredients.length) { // If the user is creating a new ingredient
            let newObj = { [rowType]: ev.target.value }; // Make a new ingredient object
            this.setState({
                ingredients: [
                    ...this.state.ingredients,
                    newObj                     // Add new ingredient object to end of array in state
                ]
            });
            if (rowNum > this.state.ingredients.length) { 
                ev.target.blur();       // Force them not to skip rows in the table
            }
        } else {                        // If modifying an ingredient that's already in state
            let ingArray = this.state.ingredients;
            let oldObj = ingArray[rowNum];
            let newObj = {
                ...oldObj,
                [rowType]: ev.target.value
            };
            ingArray[rowNum] = newObj;
            this.setState({
                ingredients: ingArray
            });
        }
    }

    submitHandler = ev => {
        ev.preventDefault();
        console.log("Got here, now need to call an action");
        
        // Convert quantities to numbers
        let ingArray = this.state.ingredients;
        for (let i = 0; i < ingArray.length; i++) {
            ingArray[i].quantity = Number(ingArray[i].quantity);
        }

        // Package up the recipe object to be sent to the API
        let recipeObj = {
            name: this.state.name,
            description: this.state.description,
            ingredients: ingArray
        };

        // Call the action to send this object to POST a recipe

    }

    render() {
        // Build the array of HTML inputs that will get inserted into the form
        let ingredientRows = [];
        for (let i = 0; i < this.state.numIngredients; i++) {
            if (i >= this.state.ingredients.length) { // If this is a blank row at the bottom of the table
                ingredientRows.push(<input 
                    type="text" 
                    placeholder="Ingredient Name" 
                    name={`name${i}`} 
                    value="" 
                    onChange={this.ingHandler} 
                />);
                ingredientRows.push(<input 
                    type="text" 
                    placeholder="Ingredient Quantity" 
                    name={`quty${i}`} 
                    value=""
                    onChange={this.ingHandler} 
                />);
                ingredientRows.push(<input 
                    type="text" 
                    placeholder="Ingredient Unit" 
                    name={`unit${i}`} 
                    value="" 
                    onChange={this.ingHandler} 
                />);
                ingredientRows.push(<br />);
            } else {                            // If this row of the table corresponds to an ingredient
                                                // that already has data in state for it
                ingredientRows.push(<input 
                    type="text" 
                    placeholder="Ingredient Name" 
                    name={`name${i}`} 
                    value={this.state.ingredients[i].name}
                    onChange={this.ingHandler} 
                />);
                ingredientRows.push(<input 
                    type="text" 
                    placeholder="Ingredient Quantity" 
                    name={`quty${i}`} 
                    value={this.state.ingredients[i].quantity} 
                    onChange={this.ingHandler} 
                />);
                ingredientRows.push(<input 
                    type="text" 
                    placeholder="Ingredient Unit" 
                    name={`unit${i}`} 
                    value={this.state.ingredients[i].unit} 
                    onChange={this.ingHandler} 
                />);
                ingredientRows.push(<br />);
            }
        }
        return (
            <form onSubmit={this.submitHandler}>
                <h2>Upload New Recipe</h2>
                <input
                    type="text"
                    placeholder="Recipe Name"
                    name="name"
                    value={this.state.name}
                    onChange={this.typingHandler}
                    required
                />
                <textarea
                    placeholder="Recipe Description"
                    name="description"
                    value={this.state.description}
                    onChange={this.typingHandler}
                    required
                />
                <label for='numIngredients'>Number of Ingredients:</label>
                <input
                    type="number"
                    placeholder="3"
                    name="numIngredients"
                    id='numIngredients'
                    value={this.state.numIngredients}
                    onChange={this.typingHandler}
                />
                <br />
                {ingredientRows}
                <button type="submit">Save Recipe</button>
            </form>
        );
    }
}

const mapStateToProps = state => {

}

export default connect(
    mapStateToProps,
    {}
)(AddNewRecipeForm);