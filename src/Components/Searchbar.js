import React from "react";

/**
 * Searchbar components let us to search through the users list
 *
 * @component
 * @param {function} props.handleSearchUser - Function to handle searches.
 * @returns {JSX.Element} - The rendered component.
 */
const Searchbar = ({ handleSearchUser }) => {
  return (
    <>
      <input
        type={"text"}
        placeholder={"Search by name, email or by role"}
        width={"100%"}
        className="form-control mb-3"
        onChange={(e) => handleSearchUser(e.target.value)}
      />
    </>
  );
};

export default Searchbar;
