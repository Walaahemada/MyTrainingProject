import React from "react";


const FilterBar = ({ options, onChange }) => {
  return (
    <select
      className="filter-select"
      onChange={(e) => onChange(e.target.value)}
    >
      {options.map((opt) => (
        <option key={opt.value} value={opt.value}>
          {opt.label}
        </option>
      ))}
    </select>
  );
};

export default FilterBar;
