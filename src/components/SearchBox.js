import React from "react";

const SearchBox = (props) => {
  return (
    <div className="col col-sm-4">
      <input
        onChange={(e) => props.setSearchValue(e.target.value)}
        value={props.value}
        className="form-control"
        placeholder="Type to search..."
      />
    </div>
  );
};

export default SearchBox;
