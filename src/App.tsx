import React from 'react';
import './App.css';
import AppHeader from "./components/AppHeader";
import BurgerIngredients from "./components/BurgerIngredients";
import BurgerData from "./burger-data.json";
import BurgerConstructor from "./components/BurgerConstructor";

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
