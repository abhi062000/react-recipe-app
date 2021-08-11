import Axios from "axios";
import { useState } from "react";
import "./app.css";
import RecipeTile from "./components/recipe-tile";
require("dotenv").config();
const APP_ID = process.env.REACT_APP_APP_ID;
const APP_KEY = process.env.REACT_APP_APP_KEY;


function App() {
  const [query, setquery] = useState("");
  const [recipes, setrecipes] = useState([]);
  const url = `https://cors-anywhere.herokuapp.com/https://api.edamam.com/search?q=${query}&app_id=${APP_ID}&app_key=${APP_KEY}`;

  const getRecipeInfo = async () => {
    console.log(url);
    var result = await Axios.get(url);
    setrecipes(result.data.hits);
    console.log(result);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    getRecipeInfo();
  };

  return (
    <div className="app">
      <h1 onClick={getRecipeInfo}>Food Recipe Plaza</h1>
      <form className="app__searchForm" onSubmit={onSubmit}>
        <input
          className="app__input"
          type="text"
          placeholder="Enter Ingredient"
          autoComplete="Off"
          value={query}
          onChange={(e) => setquery(e.target.value)}
        />
        <input className="app__submit" type="submit" value="Search" />
      </form>

      <div className="app__recipes">
        {recipes !== [] &&
          recipes.map((recipe, i) => {
            return <RecipeTile recipe={recipe} key={i} />;
          })}
      </div>
    </div>
  );
}

export default App;
