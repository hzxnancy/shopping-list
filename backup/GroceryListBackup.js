import React, { useEffect, useState } from "react";
import { MdDelete } from "react-icons/md";
import { CiSquareCheck } from "react-icons/ci";
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
    },500);
    return () => clearTimeout(timeoutId);
  },[input]);

  const handleChange = (value) => {
    setInput(value);
  };

  const handleDelete = (index) => {
    setSelectedItems((prevItems) =>
      prevItems.filter((_, idx) => idx !== index)
    );
  };

  const addItem = (item) => {
    setSelectedItems((prevItems) => [
      ...prevItems,
      { name: item, checked: false },
    ]);
    setInput("");
    setResults([]);
  };

  const handleCheck = (index) => {
    setSelectedItems((prevItems) =>
      prevItems.map((item, idx) =>
        idx === index ? { ...item, checked: !item.checked } : item
      )
    );
  };

  return (
    <div className="grocery-list-container">
      <h1>Groceries</h1>
      <input
        placeholder="Add items into your groceries list"
        className="search-bar"
        value={input}
        onChange={(e) => handleChange(e.target.value)}
        cursor
      />
      <ul className="results-list">
        {results.map((item, index) => (
          <div key={index} onClick={() => addItem(item)} className="result-item">
            {item}
          </div>
        ))}
      </ul>
      <h2>Your Current Groceries List:</h2>
      <ul>
        {selectedItems.map((item, index) => (
          <div key={index}>
              <CiSquareCheck
                onClick={() => handleCheck(index)}
                style = {{color: item.checked ? "grey": "black"}}
              />
              <span style={{textDecoration: item.checked ? "line-through": "none", color: item.checked ? "lightgray" : "black"}}>{item.name}</span>
            <MdDelete
              onClick={() => handleDelete(index)}
            />
          </div>
        ))}
      </ul>
    </div>
  );
};

export default GroceryList;
