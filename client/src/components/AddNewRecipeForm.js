import React, { Component } from 'react';

export default class AddNewRecipeForm extends Component {
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
        let rowType = ev.target.name.slice(0, 4);
        if (rowType === "quty") {
            rowType = 'quantity';
        }
        let rowNum = Number(ev.target.name.slice(4));
        if (rowNum >= this.state.ingredients.length) {
            let newObj = { [rowType]: ev.target.value };
            this.setState({
                ingredients: [
                    ...this.state.ingredients,
                    newObj
                ]
            });
            if (rowNum > this.state.ingredients.length) {
                ev.target.blur();
            }
        } else {
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
    }

    render() {
        let ingredientRows = [];
        for (let i = 0; i < this.state.numIngredients; i++) {
            if (i >= this.state.ingredients.length) {
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
            } else {
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
                <input
                    type="number"
                    placeholder="3"
                    name="numIngredients"
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