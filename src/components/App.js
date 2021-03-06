import React from 'react';
import PropTypes from 'prop-types';
import Header from "./Header";
import Order from "./Order";
import MenuAdmin from "./MenuAdmin";
import sampleBurgers from "../sample-burgers";
import Burger from "../Burger";
import base from "../base";

class App extends React.Component {

    static propTypes = {
        match: PropTypes.object
    };

    state = {
        burgers: {},
        order: {}
    };

    componentDidMount() {
        const {params} = this.props.match;

        const localStorageRef =localStorage.getItem(params.restaurantId);
        if (localStorageRef) {
            this.setState({order: JSON.parse(localStorageRef)});
        }

        this.ref = base.syncState(`${params.restaurantId}/burgers`, {
            context: this,
            state: 'burgers'
        });
    };

    componentDidUpdate(prevProps, prevState, snapshot) {
        const {params} = this.props.match;
        localStorage.setItem(params.restaurantId, JSON.stringify(this.state.order));
    };

    componentWillUnmount() {
        base.removeBinding(this.ref);
    };

    addBurger = burger => {
        // Делаем копию объекта state
        const burgers = {...this.state.burgers};
        // Добавить новый бургер в переменную burgers
        burgers[`burger${Date.now()}`] = burger;
        // Записать наш новый объект burgers в state
        this.setState({ burgers });
    };

    updateBurger = (key, updateBurger) => {
        // Делаем копию объекта state
        const burgers = { ...this.state.burgers};
        // Обновляем нужный бургер
        burgers[key] = updateBurger;
        // Записать наш новый объект burgers в state
        this.setState({burgers});
    };

    deleteBurger = key => {
        // Делаем копию объекта state
        const burgers = {...this.state.burgers};
        // Удаляем бургер
        burgers[key] = null;
        // Записать наш новый объект в state
        this.setState({burgers});
    };

    loadSampleBurgers = () => {
        this.setState({burgers: sampleBurgers});
    };

    addToOrder = (key) => {
        // Делаем копию объекта state
        const order = {...this.state.order};
        // Добавить ключ к заказу со значением 1, либо обновить текущее значение
        order[key] = order[key] + 1 || 1;
        // Записываем обновленное значение order в объект state
        this.setState({order});
    };

    deleteFromOrder = key => {
        // Делаем копию объекта state
        const order = {...this.state.order};
        // Удаляем бургер
        delete order[key];
        // Записываем обновленное значение order в state
        this.setState({order})


    }

    render() {
        return(
            <div className='burger-paradise'>
                <div className='menu'>
                    <Header title='Hot Burgers'/>
                    <ul className='burgers'>
                        {Object.keys(this.state.burgers).map(key => {
                            return <Burger key={key}
                                           index={key}
                                           addToOrder={this.addToOrder}
                                           details={this.state.burgers[key]}
                            />
                        })}
                    </ul>
                </div>
                <Order deleteFromOrder = {this.deleteFromOrder} burgers={this.state.burgers} order={this.state.order}/>
                <MenuAdmin addBurger = {this.addBurger}
                           loadSampleBurgers={this.loadSampleBurgers}
                           burgers={this.state.burgers}
                           updateBurger={this.updateBurger}
                           deleteBurger={this.deleteBurger}
                />
            </div>
        );
    };
}

export default App;