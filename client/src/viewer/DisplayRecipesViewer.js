import React, {Component} from "react";
import {Route} from "react-router-dom";
import {connect} from 'react-redux';

class DisplayRecipeViewer extends Component {

    render () {
        return (
            <div className="recipe-view-container">
                <header>
                    this is where the login, logo, and search bar will be
                </header>
                <div className="recipe-body">
                    <main className="recipe-list">this is where the list will populate</main>
                    <nav>Menu items</nav>
                </div>
                <footer>
                    license, disclaimers, links to profiles are here
                </footer>

            </div>
        );
    }


}

export default DisplayRecipeViewer;