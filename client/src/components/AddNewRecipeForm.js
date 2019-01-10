import React, { Component } from 'react';

export default class AddNewRecipeForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: "",
            description: ""
        };
    }

    typingHandler = ev => {
        this.setState({
            [ev.target.name]: ev.target.value
        });
    }

    submitHandler = ev => {
        ev.preventDefault();
        console.log("Got here, now need to do axios stuff");
    }

    render() {
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
                <button type="submit">Save Recipe</button>
            </form>
        );
    }
}