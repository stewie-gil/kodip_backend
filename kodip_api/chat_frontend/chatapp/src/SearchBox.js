import React, { useState } from 'react';
import './SearchBox.css';

function SearchBox({ searchQuery, setSearchQuery, handleSearch }) {
  const handleInputChange = (event) => {
    const inputValue = event.target.value;
    setSearchQuery(inputValue);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    handleSearch(searchQuery);
  };

  return (
    <div className="search-container">

      <div className='search'>
      <form onSubmit={handleSubmit}>
      
        <div className="search-buttons">
          <input
          type="text"
          placeholder="Search..."
          className="search-buttons"
          value={searchQuery}
          onChange={handleInputChange}
        /> <button onClick={() => handleSearch('Studio Apartments')}>Studio Apartments</button>
         
          <button onClick={() => handleSearch('1 Bedroom')}>1 Bedroom</button>
          <button onClick={() => handleSearch('2 Bedroom')}>2 Bedroom</button>
          <button onClick={() => handleSearch('3 Bedroom')}>3 Bedroom</button>
          <button onClick={() => handleSearch('Airbnbs')}>Airbnbs</button>
        </div>
      </form>
      </div>


    </div>
  );
}

export default SearchBox;
