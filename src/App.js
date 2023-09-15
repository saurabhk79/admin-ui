import React, { useEffect, useState } from "react";
import "./App.css";

import Searchbar from "./Components/Searchbar";
import Table from "./Components/Table";
import Pagination from "./Components/Pagination";

/**
 * App component
 *
 * @component
 * @returns {JSX.Element} - The rendered component.
 */
const App = () => {
  const ITEMS_PER_PAGE = 10;

  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  // To re render the Table Components
  const [didDeletedPreviously, setDidDeletedPreviously] = useState(false);

  /**
   * Fetches user data.
   *
   * @async
   * @returns {Array <Object>} - The fetched user data.
   */
  const getUsers = async () => {
    try {
      const response = await fetch(
        "https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json"
      );
      const usersData = await response.json();

      return usersData;
    } catch (error) {
      console.error(error);
    }
  };

  /**
   * Handles user search.
   *
   * @param {string} searchText - The text to search for.
   */
  const handleSearchUser = (searchText) => {
    if (!searchText) {
      setFilteredUsers(users);
      return;
    }

    const filtered = users.filter((user) => {
      const lowerCaseText = searchText.toLowerCase();

      const nameMatches = user.name.toLowerCase().includes(lowerCaseText);
      const emailMatches = user.email.toLowerCase().includes(lowerCaseText);
      const roleMatches = user.role.toLowerCase().includes(lowerCaseText);

      return nameMatches || emailMatches || roleMatches;
    });

    setFilteredUsers(filtered);
    setCurrentPage(1);
  };

  /**
   * Handles the selection of a user.
   *
   * @param {string} id - The id of the user.
   * @param {boolean} checked - Indicates if the user is selected or not.
   */
  const handleSelectUser = (id, checked) => {
    if (checked) {
      const newSelectedUser = users.find((user) => user.id === id);
      setSelectedUsers([...selectedUsers, newSelectedUser]);
    } else {
      const removedUncheckedUsers = selectedUsers.filter(
        (user) => user.id !== id
      );
      setSelectedUsers(removedUncheckedUsers);
    }
  };

  /**
   * Handles the selection of multiple users.
   *
   * @param {Array} usersArray - An array of users to be selected.
   * @param {boolean} checked - Indicates if the users should be selected or deselected.
   */
  const handleSelectMultipleUsers = (usersArray, checked) => {
    if (checked) {
      setSelectedUsers([...usersArray]);
    } else {
      setSelectedUsers([]);
    }
  };

  /**
   * Handles the deletion of a user.
   *
   * @param {Object} userData - The data of the user to be deleted.
   */
  const handleDeleteUser = (userData) => {
    const usersAfterDeletion = users.filter((user) => user.id !== userData.id);
    setUsers(usersAfterDeletion);
    setFilteredUsers(usersAfterDeletion);
  };

  /**
   * Handles the deletion of selected users.
   */
  const handleSelectedDeleteUser = () => {
    const selectedUserIds = new Set(selectedUsers.map((user) => user.id));
    const newUsersList = users.filter((user) => !selectedUserIds.has(user.id));

    setUsers(newUsersList);
    setFilteredUsers(newUsersList);
    setSelectedUsers([]);

    setDidDeletedPreviously(!didDeletedPreviously);
  };

  /**
   * Handles saving edits made to user data.
   *
   * @param {Object} userData - The updated user data.
   */
  const handleSavingEdit = (userData) => {
    const afterEditUser = users.map((user) => {
      if (user.id === userData.id) {
        return {
          ...user,
          name: userData.name,
          email: userData.email,
          role: userData.role,
        };
      }

      return user;
    });

    setUsers(afterEditUser);
    setFilteredUsers(afterEditUser);
  };

  // Effect hook to fetch user data on component mount
  useEffect(() => {
    const setDataFunction = async () => {
      const usersData = await getUsers();

      if (usersData) {
        setUsers(usersData);
        setFilteredUsers(usersData);
      }
    };

    setDataFunction();
  }, []);

  // Generate users for the single page of the pagination Component
  // Generates based on lastIndex and the firstIndex
  const lastIndex = currentPage * ITEMS_PER_PAGE;
  const firstIndex = lastIndex - ITEMS_PER_PAGE;
  const currentUsers = filteredUsers.slice(firstIndex, lastIndex);

  return (
    <div className="App">
      <Searchbar handleSearchUser={handleSearchUser} />
      <Table
        users={currentUsers}
        handleDeleteUser={handleDeleteUser}
        handleSavingEdit={handleSavingEdit}
        handleSelectUser={handleSelectUser}
        handleSelectMultipleUsers={handleSelectMultipleUsers}
        didDeletedPreviously={didDeletedPreviously}
      />
      <Pagination
        ITEMS_PER_PAGE={ITEMS_PER_PAGE}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        totalItems={filteredUsers.length}
        handleSelectedDeleteUser={handleSelectedDeleteUser}
      />
    </div>
  );
};

export default App;
