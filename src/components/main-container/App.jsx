import React from 'react';
import './App.css';
import AppHeader from "../header/AppHeader";
import BurgerIngredients from "../ingredients/BurgerIngredients";
import BurgerData from "../../burger-data.json";
import BurgerConstructor from "../constructor/BurgerConstructor";
import PropTypes from "prop-types";

function App() {
  return (
    <div className="App">
      <AppHeader />
      <section className={"main-section"}>
          <div className="App">
              <p className="text_type_main-large m-10">
                  Соберите бургер
              </p>
              <section className={"main-content"}>
                  <div className="App">
                      <BurgerIngredients data={BurgerData}/>
                  </div>
                  <div style={{alignSelf: "flex-start"}}>
                      <BurgerConstructor data={BurgerData}/>
                  </div>
              </section>
          </div>
      </section>
    </div>
  );
}

export default App;

App.propTypes = {
    data: PropTypes.arrayOf(
        PropTypes.shape({
            _id: PropTypes.string.isRequired,
            name: PropTypes.string.isRequired,
            type: PropTypes.string.isRequired,
            proteins: PropTypes.number.isRequired,
            fat: PropTypes.number.isRequired,
            carbohydrates: PropTypes.number.isRequired,
            calories: PropTypes.number.isRequired,
            price: PropTypes.number.isRequired,
            image: PropTypes.string.isRequired,
            image_mobile: PropTypes.string.isRequired,
            image_large: PropTypes.string.isRequired
        })
    )
}