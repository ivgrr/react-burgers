import React from 'react'
import restaurants from "../sample-restaurants";

class Landing extends React.Component {
    state = {
        display: false,
        title: '',
        url: ''
    }

displayList = () =>  {
        const { display } = this.state;
        this.setState({display: !display})
}

    render() {
        return(
            <div className='restaurant_select'>
                <div className='restaurant_select_top'>
                    <div onClick={this.displayList} className='restaurant_select_top-header font-effect-outline'>
                        Выберите ресторан
                    </div>
                    <div className='arrow_picker'>
                        <div className='arrow_picker-up'> </div>
                        <div className='arrow_picker-down'> </div>
                    </div>
                </div>
                { this.state.display ? <div className='restaurant_select_bottom'>
                    <ul>
                        {restaurants.map(restaurant => {
                            return <li key={restaurant.id}>{restaurant.title}</li>
                        })}
                    </ul>
                </div> : null}
                <button>Перейти в ресторан</button>
            </div>
        );
    };
}


export default Landing;