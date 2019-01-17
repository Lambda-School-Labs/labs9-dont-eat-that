import React, { Component } from 'react';
import { connect } from 'react-redux';
import ReactQuill from 'react-quill';
import { addRecipe, autoComIng, resetAutoCom, getAllergies } from '../actions';
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

  componentDidMount() {
    this.props.getAllergies();
  }

  quillHandler = html => {
    this.setState({ description: html });
  };

  typingHandler = e => {
    if (e.target.name === 'numIngredients') {
      // numIngredients needs certain logic
      let prevNumIng;
      const value = e.target.value; // declared since lost in async setState
      this.setState(prevState => {
        prevNumIng = prevState.numIngredients; // getting prevNumIng for later use
        if (prevNumIng > value) {
          return {
            numIngredients: value,
            ingredients: this.state.ingredients.slice(0, value),
            focuses: this.state.focuses.slice(0, value)
          };
        } else if (prevNumIng < value) {
          let otherIng = [];
          let otherFoc = [];
          for (let i = 0; i < value - prevNumIng; i++) {
            // getting extra rows for ing and foc
            otherIng.push({ name: '', quantity: '', unit: '' });
            otherFoc.push({ focus: false });
          }
          return {
            numIngredients: value,
            ingredients: [...this.state.ingredients, ...otherIng],
            focuses: [...this.state.focuses, ...otherFoc]
          };
        } else {
          return { numIngredients: value };
        }
      });
    } else {
      this.setState({ [e.target.name]: e.target.value });
    }
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
    let ingredients = this.state.ingredients.slice();
    ingredients[i].name = item;
    console.log('here');
    this.setState({ ingredients }); // changing ingredient in state
    this.props.resetAutoCom(); // resets autoCom so menu will disappear
    this.onBlur(i); // changes focus to false
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

  ingAllergyWarning = index => {
    const boolArr = this.props.allergies.map(
      allergy => allergy === this.state.ingredients[index].name
    );
    if (boolArr.includes(true)) {
      return { background: 'red' };
    } else {
      return {};
    }
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
              onChange={e => {
                this.ingHandler(e);
                this.props.autoComIng(this.state.ingredients[i].name);
              }}
              onFocus={() => this.onFocus(i)}
              style={this.ingAllergyWarning(i)}
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
            onFocus={() => this.onBlur(i)}
          />
          <input
            type="text"
            placeholder="Ingredient Unit"
            name={`unit${i}`}
            value={this.state.ingredients[i].unit}
            onChange={this.ingHandler}
            onFocus={() => this.onBlur(i)}
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
        <ReactQuill
          value={this.state.description}
          onChange={html => this.quillHandler(html)}
          modules={AddNewRecipeForm.modules}
          formats={AddNewRecipeForm.formats}
        />
        <br />
        {(!this.state.name || !this.state.description) && (
          <p>
            Please provide a name, description, and ingredients before
            submitting a recipe!
          </p>
        )}
        {localStorage.getItem('uid') ? (
          <button type="submit">Save Recipe</button>
        ) : (
          <React.Fragment>
            <button type="submit" disabled>
              Save Recipe
            </button>
            <p>Please Log In to Add a Recipe!</p>
          </React.Fragment>
        )}
      </form>
    );
  }
}

AddNewRecipeForm.modules = {
  toolbar: [
    [{ header: '1' }, { header: '2' }, { font: [] }],
    [{ size: [] }],
    ['bold', 'italic', 'underline', 'strike', 'blockquote'],
    [
      { list: 'ordered' },
      { list: 'bullet' },
      { indent: '-1' },
      { indent: '+1' }
    ],
    ['link'],
    ['clean']
  ],
  clipboard: {
    // toggle to add extra line breaks when pasting HTML:
    matchVisual: false
  }
};
AddNewRecipeForm.formats = [
  'header',
  'font',
  'size',
  'bold',
  'italic',
  'underline',
  'strike',
  'blockquote',
  'list',
  'bullet',
  'indent',
  'link'
];

const mapStateToProps = state => {
  return {
    autoCom: state.nutritionReducer.autoComIng,
    allergies: state.usersReducer.user.allergies
  };
};

export default connect(
  mapStateToProps,
  { addRecipe, autoComIng, resetAutoCom, getAllergies }
)(AddNewRecipeForm);
