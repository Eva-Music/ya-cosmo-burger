import React from 'react';
import './App.css';
import AppHeader from "./components/AppHeader";
import BurgerIngredients from "./components/BurgerIngredients";
import BurgerData from "./burger-data.json";

function App() {
  return (
    <div className="App">
      <AppHeader />
      <section className={"main-section"}>
          <div className={"inner-section"}>
              <div className={"build-burger"}>
                  <p className={"text_type_main-large"}>
                      Соберите бургер
                  </p>
                  <BurgerIngredients data={BurgerData}/>
              </div>

              {/*<BurgerConstructor/>*/}
          </div>
      </section>
    </div>
  );
}

export default App;
