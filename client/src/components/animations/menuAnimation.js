import React, {Component} from 'react';
import {TweenLite, Expo} from 'gsap';

class MenuAnimation extends Component{
    constructor() {
        super();
        this.state = {  
            loaderWrap: null,
            loaderTween: null,
            toggleMenuBtn: null,
            toggle: false,
        }
    }
    componentDidMount() {
        this.loaderTween = TweenLite.to(this.loaderWrap, 1, {
			y: "100%", ease: Expo.easeInOut, delay: 2,
			onComplete: () => {
				TweenLite.to( this.toggleBtn, 0.2, { autoAlpha: 1 } );
			}
		});
	}

    render() {
        return(
            <div className="menuAnimationContainer">
                testing
            </div>
        )
    }


}
export default MenuAnimation;

// dom screen size event listeners for mobile changes
// find best solution for integrating sideMenu animation
