import React, { useState, useEffect } from "react";
import EditableField from "./EditableField";

/**
 * Row component represents a row in the table displaying user information.
 *
 * @component
 * @param {Object} props - The properties that define the Row component.
 * @param {string} props.id - The unique id of the user.
 * @param {string} props.email - The email address of the user.
 * @param {string} props.name - The name of the user.
 * @param {string} props.role - The role of the user.
 * @param {Function} props.handleDeleteUser - The function to handle user deletion.
 * @param {Function} props.handleSavingEdit - The function to handle saving user edits.
 * @param {Function} props.handleSelectUser - The function to handle individual user selection.
 * @param {boolean} props.isSelected - Indicates if the user is selected.
 * @returns {JSX.Element} Row component JSX.
 */

const Row = ({
  id,
  email,
  name,
  role,
  handleDeleteUser,
  handleSavingEdit,
  handleSelectUser,
  isSelected,
}) => {
  const [editRow, setEditRow] = useState(false);
  const [selectUser, setSelectUser] = useState(isSelected);
  const [userRowData, setUserRowData] = useState({
    id: id,
    name: name,
    email: email,
    role: role,
  });

  /**
   * Handles the submit of user data after editing.
   *
   * @param {Object} userData - The user data to be saved.
   */
  const handleSubmitRow = (userData) => {
    handleSavingEdit(userData);
    setEditRow(false);
  };

  /**
   * Handles the change in user checkbox selection.
   *
   * @param {boolean} checked - Indicates whether the user is selected or not.
   */
  const handleChangeUserCheckbox = (checked) => {
    setSelectUser(checked);

    handleSelectUser(id, checked);
  };

  useEffect(() => {
    setSelectUser(isSelected);
  }, [isSelected]);

  return (
    <tr>
      <td>
        <input
          className="form-check-input"
          type="checkbox"
          checked={selectUser}
          onChange={(e) => handleChangeUserCheckbox(e.target.checked)}
        />
      </td>
      <td>
        <EditableField
          value={name}
          name="name"
          editRow={editRow}
          setUserRowData={setUserRowData}
          userRowData={userRowData}
        />
      </td>
      <td>
        <EditableField
          value={email}
          name="email"
          editRow={editRow}
          setUserRowData={setUserRowData}
          userRowData={userRowData}
        />
      </td>
      <td>
        <EditableField
          value={role}
          name="role"
          editRow={editRow}
          setUserRowData={setUserRowData}
          userRowData={userRowData}
        />
      </td>
      <td>
        {editRow ? (
          <>
            <i
              className="fa-regular fa-floppy-disk text-success"
              onClick={() => handleSubmitRow(userRowData)}
            ></i>
            <i
              className="fa-solid fa-xmark text-danger"
              onClick={() => setEditRow(false)}
            ></i>
          </>
        ) : (
          <>
            <i
              className="fa-regular fa-pen-to-square text-primary"
              onClick={() => setEditRow(true)}
            ></i>
            <i
              className="fa-regular fa-trash-can text-danger"
              onClick={() => handleDeleteUser(userRowData)}
            ></i>
          </>
        )}
      </td>
    </tr>
  );
};

export default Row;
