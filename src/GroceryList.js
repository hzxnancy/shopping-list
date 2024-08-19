import React, { useEffect, useState } from "react";
import BasicTable from "./Table";

const GroceryList = () => {
  const [input, setInput] = useState("");
  const [results, setResults] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);

  const fetchData = (value) => {
    fetch(`https://api.frontendeval.com/fake/food/${value}`)
      .then((response) => response.json())
      .then((json) => {
        setResults(json);
      });
  };

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      fetchData(input);
    }, 500);
    return () => clearTimeout(timeoutId);
  }, [input]);

  const handleChange = (value) => {
    setInput(value);
  };

  const addItem = (item) => {
    setSelectedItems((prevItems) => [
      ...prevItems,
      { name: item, checked: false, quantity: 1 },
    ]);
    setInput("");
    setResults([]);
  };

  const handleDelete = (index) => {
    setSelectedItems((prev) => prev.filter((_, idx) => idx !== index));
  };

  return (
      <div className="grocery-list-container">
        <h1 className="title">Shopping List</h1>
        <input
          placeholder="Type to add items into your groceries list..."
          className="search-bar"
          value={input}
          onChange={(e) => handleChange(e.target.value)}
        />
        <ul className="results-list">
          {results.map((item, index) => (
            <div
              key={index}
              onClick={() => addItem(item)}
              className="result-item"
            >
              {item}
            </div>
          ))}
        </ul>
        <BasicTable data={selectedItems} deleteItem={handleDelete} />
      </div>
  );
};

export default GroceryList;
