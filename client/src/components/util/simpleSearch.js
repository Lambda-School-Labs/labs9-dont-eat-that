// SimpleSearchInput has an input field
// for Simple Search.
// Simple Search looks for search keywords in recipe and ingredient
// and returns matching recipes

import { Input } from 'semantic-ui-react';

import React, { Component } from 'react';

class SimpleSearchInput extends Component {
  render() {
    return (
      <form className="searchNote">
        <Input
          type="input"
          onChange={this.props.handleInputChange}
          value={this.props.query}
          name="query"
          placeholder="Search recipe title or ingredient"
          size="30"
        />
      </form>
    );
  }
}

export default SimpleSearchInput;
