// FilterSidebar.jsx

import React, { useState } from 'react';
import './Filtersidebar.css'; // Import the CSS file

const FilterSidebar = ({ data, setFilteredData }) => {
  const [filters, setFilters] = useState({
    uploaderName: '',
    animal: '',
    breed: '',
  });

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prevFilters) => ({ ...prevFilters, [name]: value }));
  };

  const applyFilters = () => {
    let filteredResult = data.filter((item) => {
      // Customize this logic based on your filtering needs
      return (
        item.uploader_name.includes(filters.uploaderName) &&
        item.animal.includes(filters.animal) &&
        item.breed.includes(filters.breed)
      );
    });

    setFilteredData(filteredResult);
  };

  const resetFilters = () => {
    setFilters({
      uploaderName: '',
      animal: '',
      breed: '',
    });
    setFilteredData(data);
  };

  return (
    <div className="FilterSidebar">
      <h2>Filters</h2>
      <label>
        Uploader Name:
        <input type="text" name="uploaderName" value={filters.uploaderName} onChange={handleFilterChange} />
      </label>
      <label>
        Animal:
        <input type="text" name="animal" value={filters.animal} onChange={handleFilterChange} />
      </label>
      <label>
        Breed:
        <input type="text" name="breed" value={filters.breed} onChange={handleFilterChange} />
      </label>
      <button onClick={applyFilters}>Apply Filters</button>
      <button onClick={resetFilters}>Reset Filters</button>
    </div>
  );
};

export default FilterSidebar;
