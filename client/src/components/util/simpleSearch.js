// SimpleSearchInput has an input field 
// for Simple Search.
// Simple Search looks for search keywords in recipe and ingredient
// and returns matching recipes


import React, { Component } from "react";


class SimpleSearchInput extends Component {



  render() {
    return (
      <form className="searchNote">
        <input
          type="input"
          onChange={this.props.handleInputChange}
          value={this.props.query}
          name="query"
          placeholder="Search keyword or ingredient"
          size="30"
        />
      </form>
    );
  }
}

export default SimpleSearchInput;
