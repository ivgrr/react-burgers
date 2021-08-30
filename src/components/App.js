import React from 'react';
import Header from "./Header";
import Order from "./Order";
import MenuAdmin from "./MenuAdmin";
import sampleBurgers from "../sample-burgers";
import Burger from "../Burger";

class App extends React.Component {

    state = {
        burgers: {},
        order: {}
    };

    addBurger = burger => {
        // Делаем копию объекта state
        const burgers = {...this.state.burgers};
        // Добавить новый бургер в переменную burgers
        burgers[`burger${Date.now()}`] = burger;
        // Записать наш новый объект burgers в state
        this.setState({ burgers });
    };

    loadSampleBurgers = () => {
        this.setState({burgers: sampleBurgers});
    };

    render() {
        return(
            <div className='burger-paradise'>
                <div className='menu'>
                    <Header title='Hot Burgers'/>
                    <ul className='burgers'>
                        {Object.keys(this.state.burgers).map(key => {
                            return <Burger key={key}
                                           index={key}
                                           details={this.state.burgers[key]}
                            />
                        })}
                    </ul>
                </div>
                <Order />
                <MenuAdmin addBurger = {this.addBurger}
                           loadSampleBurgers={this.loadSampleBurgers}/>
            </div>
        );
    };
}

export default App;