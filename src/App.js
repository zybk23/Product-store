import React, { useEffect } from "react";
import "./App.css";
import Header from "./components/Header/Header";
import Layout from "./components/Layout/Layout";
import { products } from "./services/product";

const App = () => {
  useEffect(() => {
    localStorage.setItem("products", JSON.stringify(products));
  }, []);

  return (
    <div className="App">
      <Header />
      <Layout />
    </div>
  );
};

export default App;
