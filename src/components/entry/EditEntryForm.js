import React, { useContext, useState } from "react"
import { useHistory } from 'react-router-dom';
import { CommonplaceContext } from "./CommonplaceProvider.js"
import "./Commonplace.css"
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

export const EditEntryForm = () => {
  const { editEntry, entryById } = useContext(CommonplaceContext)
  const history = useHistory();

  // Create new object for form to update and add to database
  const [entryToEdit, setEntryToEdit] = useState({
    id: entryById.id,
    title: entryById.title,
    body: entryById.body
  });

  // Update entryToEdit object with values entered into form inputs
  const handleControlledInputChange = (event) => {
    const newEntryToEdit = { ...entryToEdit }
    newEntryToEdit[event.target.id] = event.target.value
    setEntryToEdit(newEntryToEdit)
  }

  // Edit entry object in database, then change page to the Entry Detail page
  const handleClickEditEntry = (event) => {
    event.preventDefault()
    const entry = entryToEdit
    editEntry(entry).then(() => history.push(`entries/detail/${entry.id}`))
    }

  return (
    <div className="form">
    <Container>
      <Form className="text-center">
        <h2 className="page_title"> Edit Entry </h2>

        <Form.Group className="mb-3">
          <Form.Control type="text" id="title" placeholder="Title" value={entryToEdit.title} onChange={handleControlledInputChange} />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Control type="text" id="body" placeholder="Body" value={entryToEdit.body} onChange={handleControlledInputChange} />
        </Form.Group>
        
        <Button variant="dark" type="submit" onClick={handleClickEditEntry}>
          Save Entry
        </Button>
        <Button className="form_button" variant="dark" type="submit" onClick={() => history.push("/")}>
          Cancel
        </Button>
      </Form>
    </Container>
    </div>
  )
}
