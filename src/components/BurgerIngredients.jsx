import React, {Component} from "react";
import {Tab} from "@ya.praktikum/react-developer-burger-ui-components";
import PropTypes from "prop-types";
import IngredientCard from "./IngredientCard";
import {Element, scroller } from 'react-scroll'
import styles from '../styles/burger-ingredient.module.css'

export default class BurgerIngredients extends Component {

    state = {
        menuList: [
            {
                name: 'Булки',
                type: 'bun'
            },
            {
                name: 'Соусы',
                type: 'sauce'
            },
            {
                name: 'Начинки',
                type: 'main'
            }
            ],
        current: '',
        selected: [
        ]
    }

    componentDidMount() {
        this.setState({ ...this.state, current: this.state.menuList[0].name });
    }

    setCurrent = (e) => {
        this.setState({current: e});

        scroller.scrollTo(e, {
            duration: 1500,
            delay: 100,
            smooth: true
        })
    }

    // addToCart = (id, count) => {
    //     this.setState(prevState => ({...prevState,
    //         selected:[
    //         ...prevState.selected,
    //         { id: {id}, count: {count} }
    //     ]}));
    // }


    render() {
        return (
            <section>
                <div style={{ display: 'flex' }}>
                    {this.state.menuList.map( l => {
                        return <Tab value={l.name} active={this.state.current === l.name}
                                    onClick={this.setCurrent}>
                            {l.name}
                        </Tab>
                    })}
                </div>

                <div style={{height: window.innerHeight}} className={styles.ingredientsList}>
                    {this.state.menuList.map( l => {
                        return <div className={styles.ingredients}>
                                    <Element className="pt-4 pr-10 pb-4 pl-10 text text_type_main-medium" name={l.name}>{l.name}</Element>
                                    <div className={styles.cards}>
                                        {this.props.data.filter(d => d.type === l.type)
                                            .map(d => <IngredientCard price={d.price} name={d.name} img={d.image}/>)}
                                    </div>
                               </div>
                    })}
                </div>
            </section>
        );
    }

}

BurgerIngredients.propTypes = {
    id: PropTypes.string,
    name: PropTypes.string,
    type: PropTypes.string,
    proteins: PropTypes.number,
    fat: PropTypes.number,
    carbohydrates: PropTypes.number,
    calories: PropTypes.number,
    price: PropTypes.number,
    image: PropTypes.string,
    image_mobile: PropTypes.string,
    image_large: PropTypes.string
}