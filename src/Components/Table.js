import React, { useState, useEffect } from "react";
import Row from "./Row";

/**
 * Table component displays a table of users with checkboxes for selection.
 *
 * @component
 * @param {Object} props - The properties that define the Table component.
 * @param {Array} props.users - The list of users to display.
 * @param {Function} props.handleDeleteUser - The function to handle user deletion.
 * @param {Function} props.handleSavingEdit - The function to handle saving user edits.
 * @param {Function} props.handleSelectUser - The function to handle individual user selection.
 * @param {Function} props.handleSelectMultipleUsers - The function to handle multiple user selection.
 * @param {boolean} props.didDeletedPreviously - Indicates if deletion occurred previously.
 * @returns {JSX.Element} Table component JSX.
 */
const Table = ({
  users,
  handleDeleteUser,
  handleSavingEdit,
  handleSelectUser,
  handleSelectMultipleUsers,
  didDeletedPreviously,
}) => {
  const [selectAll, setSelectAll] = useState(false);

  /**
   * Handles the selection of all users.
   *
   * @param {boolean} checked - Indicates whether all users are selected or not.
   */
  const handleSelectAllUsers = (checked) => {
    setSelectAll(checked);
    handleSelectMultipleUsers(users, checked);
  };

  useEffect(() => {
    setSelectAll(false);
  }, [didDeletedPreviously]);

  return (
    <table border={0} width={"100%"} className="table">
      <thead>
        <tr>
          <th scope="col">
            <input
              className="form-check-input"
              type={"checkbox"}
              checked={selectAll}
              onChange={(e) => handleSelectAllUsers(e.target.checked)}
            />
          </th>
          <th scope="col">Name</th>
          <th scope="col">Email</th>
          <th scope="col">Role</th>
          <th scope="col">Actions</th>
        </tr>
      </thead>
      <tbody>
        {users.map((user) => {
          return (
            <Row
              key={user.id}
              name={user.name}
              email={user.email}
              id={user.id}
              role={user.role}
              handleDeleteUser={handleDeleteUser}
              handleSavingEdit={handleSavingEdit}
              handleSelectUser={handleSelectUser}
              isSelected={selectAll}
            />
          );
        })}
      </tbody>
    </table>
  );
};

export default Table;
