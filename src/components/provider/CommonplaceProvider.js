import React, { useState, createContext } from "react"

export const CommonplaceContext = createContext()

export const CommonplaceProvider = (props) => {
  // Create arrays/objects and functions that set the contents of those arrays/objects
  const [entries, setEntries] = useState([])
  const [entryById, setEntryById] = useState({})
  const [topics, setTopics] = useState([])
  const [searchResults, setSearchResults] = useState([])

  // Get saved entries from database then set entries array with response
  const getEntries = () => {
    return fetch(`http://localhost:8000/entries`, {
      headers: {
        Authorization: `Token ${localStorage.getItem("lu_token")}`,
      },
    })
      .then((response) => response.json())
      .then(setEntries);
  };

  // Get an entry from the database by an id
  const getEntryById = (entryId) => {
    return fetch(`http://localhost:8000/entries/${entryId}`, {
      headers: {
        Authorization: `Token ${localStorage.getItem("lu_token")}`,
      },
    })
      .then(res => res.json())
      .then(setEntryById)
  }

  // Get entries by using search terms as a parameter to keyword search either the title or body of an entry
  const searchEntries = (query) => {
    return fetch(`http://localhost:8000/entries?title=${query}&body=${query}`, {
      headers: {
        Authorization: `Token ${localStorage.getItem("lu_token")}`,
      },
    })
      .then(res => res.json())
      .then(data => setSearchResults(data))
  }

  // Add an entry to the database
  const addEntry = entryObj => {
    return fetch("http://localhost:8000/entries", {
      method: "POST",
      headers: {
        Authorization: `Token ${localStorage.getItem("lu_token")}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify(entryObj)
    })
      .then((response) => response.json())
      .then((entryObj) => {
        getEntries()
        return entryObj
      });
  };

  // Delete an entry from the database
  const deleteEntry = entryObj => {
    return fetch(`http://localhost:8000/entries/${entryObj.id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Token ${localStorage.getItem("lu_token")}`,
      },
    })
      .then(getEntries)
  }

  // Edit an entry object within database
  const editEntry = entryObj => {
    return fetch(`http://localhost:8000/entries/${entryObj.id}`, {
      method: "PUT",
      headers: {
        Authorization: `Token ${localStorage.getItem("lu_token")}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify(entryObj)
    })
      .then(getEntries)
  }

  // Get saved topics from database
  const getTopics = () => {
    return fetch("http://localhost:8000/topics", {
      headers: {
        Authorization: `Token ${localStorage.getItem("lu_token")}`,
      },
    })
      .then((response) => response.json())
      .then(setTopics);
  };

  // Add a topic to the database
  const addTopic = topicObj => {
    return fetch("http://localhost:8000/topics", {
      method: "POST",
      headers: {
        Authorization: `Token ${localStorage.getItem("lu_token")}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify(topicObj)
    })
      .then((response) => response.json())
      .then(getTopics);
  };

  // Delete a topic from the database
  const deleteTopic = topicId => {
    return fetch(`http://localhost:8000/topics/${topicId}`, {
      method: "DELETE",
      headers: {
        Authorization: `Token ${localStorage.getItem("lu_token")}`,
      },
    })
      .then(getTopics)
  }

  return (
    <CommonplaceContext.Provider value={{
      entries, getEntries, addEntry,
      deleteEntry, editEntry, getEntryById,
      setEntryById, entryById, topics,
      getTopics, addTopic, deleteTopic,
      searchResults, setSearchResults, searchEntries
    }}>
      {props.children}
    </CommonplaceContext.Provider>
  )
}
