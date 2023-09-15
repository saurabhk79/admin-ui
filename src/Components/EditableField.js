import React from "react";

/**
 * EditableField component to display an input field for editing when in edit mode.
 * Displays the value as text when not in edit mode.
 *
 * @component
 * @param {Object} props - The component properties.
 * @param {string} props.name - The name of the field.
 * @param {function} props.setUserRowData - Callback to update user data.
 * @param {boolean} props.editRow - Flag indicating whether the row is in edit mode.
 * @param {string} props.value - The value to display.
 * @param {Object} props.userRowData - The user data object.
 * @returns {JSX.Element} - The rendered component.
 */
const EditableField = ({
  name,
  setUserRowData,
  editRow,
  value,
  userRowData,
}) => {
  /**
   * Handles input change and updates user data.
   *
   * @param {Event} e - The input change event .
   */
  const handleInputChange = (e) => {
    setUserRowData({ ...userRowData, [name]: e.target.value });
  };

  return (
    <>
      {editRow ? (
        <input
          className="form-control"
          type="text"
          name={name}
          value={userRowData[name]}
          onChange={handleInputChange}
        />
      ) : (
        value
      )}
    </>
  );
};

export default EditableField;
