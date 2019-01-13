import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addRecipe, autoComIng, resetAutoCom } from '../actions';
import styled from 'styled-components';

const AutoComDiv = styled.div`
  position: relative;
  display: inline-block;
`;

const AutoComItemsDiv = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  border: 1px solid #d4d4d4;
  z-index: 10;

  div {
    cursor: pointer;
    background-color: #fff;
    border-bottom: 1px solid #d4d4d4;
  }
`;

class AddNewRecipeForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      description: '',
      numIngredients: 3,
      ingredients: [
        { name: '', quantity: '', unit: '' },
        { name: '', quantity: '', unit: '' },
        { name: '', quantity: '', unit: '' }
      ],
      focuses: [{ focus: false }, { focus: false }, { focus: false }]
    };
  }

  typingHandler = ev => {
    this.setState({
      [ev.target.name]: ev.target.value,
      ingredients: [
        ...this.state.ingredients,
        { name: '', quantity: '', unit: '' }
      ],
      focuses: [...this.state.focus, { focus: false }]
    });
  };

  ingHandler = ev => {
    // Get which ingredient form field type is being handled: name, quty, or unit
    let rowType = ev.target.name.slice(0, 4);
    if (rowType === 'quty') {
      rowType = 'quantity';
    }
    // Get what number of row on the form is being handled
    let rowNum = Number(ev.target.name.slice(4));

    if (rowNum >= this.state.ingredients.length) {
      // If the user is creating a new ingredient
      let newObj = { [rowType]: ev.target.value }; // Make a new ingredient object
      this.setState({
        ingredients: [
          ...this.state.ingredients,
          newObj // Add new ingredient object to end of array in state
        ]
      });
      if (rowNum > this.state.ingredients.length) {
        ev.target.blur(); // Force them not to skip rows in the table
      }
    } else {
      // If modifying an ingredient that's already in state
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
  };

  submitHandler = ev => {
    ev.preventDefault();
    // Convert quantities to numbers
    let ingArray = this.state.ingredients;
    for (let i = 0; i < ingArray.length; i++) {
      ingArray[i].quantity = Number(ingArray[i].quantity);
    }

    // Package up the recipe object to be sent to the API
    // eslint-disable-next-line
    const firebaseid = localStorage.getItem('uid');
    let recipeObj = {
      name: this.state.name,
      description: this.state.description,
      firebaseid,
      ingredients: ingArray
    };
    // Call the action to send this object to POST a recipe
    this.props.addRecipe(recipeObj);
    this.setState({ name: '', description: '', ingredients: [] });
    this.props.history.push('/recipes');
  };

  onClickAutocomplete = (i, item) => {
    if (this.state.ingredients[i].name !== item) {
      let ingredients = this.state.ingredients.slice();
      ingredients[i].name = item;
      this.setState({ ingredients });
      this.props.resetAutoCom();
      this.onBlur(i);
      console.log('inside onclickautocomplete');
    }
  };

  onFocus = index => {
    let focuses = this.state.focuses.slice();
    focuses[index].focus = true;
    this.setState({ focuses });
  };

  onBlur = index => {
    let focuses = this.state.focuses.slice();
    focuses[index].focus = false;
    this.setState({ focuses });
  };

  render() {
    // Build the array of HTML inputs that will get inserted into the form
    let ingredientRows = [];
    for (let i = 0; i < this.state.numIngredients; i++) {
      ingredientRows.push(
        <div key={`row${i}`}>
          <AutoComDiv>
            <input
              type="text"
              placeholder="Ingredient Name"
              name={`name${i}`}
              value={this.state.ingredients[i].name}
              autoComplete="new-password"
              onFocus={() => this.onFocus(i)}
              onChange={e => {
                this.ingHandler(e);
                this.props.autoComIng(this.state.ingredients[i].name);
              }}
            />
            {this.props.autoCom && this.state.focuses[i].focus && (
              <AutoComItemsDiv>
                {this.props.autoCom.map(item => {
                  return (
                    <div
                      key={item}
                      onClick={() => this.onClickAutocomplete(i, item)}
                    >
                      {item}
                    </div>
                  );
                })}
              </AutoComItemsDiv>
            )}
          </AutoComDiv>
          <input
            type="text"
            placeholder="Ingredient Quantity"
            name={`quty${i}`}
            value={this.state.ingredients[i].quantity}
            onChange={this.ingHandler}
          />
          <input
            type="text"
            placeholder="Ingredient Unit"
            name={`unit${i}`}
            value={this.state.ingredients[i].unit}
            onChange={this.ingHandler}
          />
          <br />
        </div>
      );
    }
    return (
      <form onSubmit={this.submitHandler} autoComplete="off">
        <h2>Upload New Recipe</h2>
        <input
          type="text"
          placeholder="Recipe Name"
          name="name"
          value={this.state.name}
          onChange={this.typingHandler}
          required
        />
        <br />
        <textarea
          placeholder="Recipe Description"
          name="description"
          value={this.state.description}
          onChange={this.typingHandler}
          required
        />
        <br />
        <label htmlFor="numIngredients">Number of Ingredients:</label>
        <input
          type="number"
          placeholder="3"
          name="numIngredients"
          id="numIngredients"
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
  return {
    autoCom: state.nutritionReducer.autoComIng
  };
};

export default connect(
  mapStateToProps,
  { addRecipe, autoComIng, resetAutoCom }
)(AddNewRecipeForm);
