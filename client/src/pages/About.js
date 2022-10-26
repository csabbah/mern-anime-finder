import React, { useState, useEffect } from "react";

import { useMutation } from "@apollo/client";
import { ADD_NOTE, REMOVE_NOTE, UPDATE_NOTE } from "../utils/mutations";

import { useQuery } from "@apollo/client";
import { GET_ME } from "../utils/queries";

import Auth from "../utils/auth";

const About = () => {
  // ----------------------------- IMPORT QUERY & MUTATIONS / DECLARE STATE OBJECTS
  const [addNote, { error }] = useMutation(ADD_NOTE);
  const [removeNote, { errorRemove }] = useMutation(REMOVE_NOTE);
  const [updateNote, { errorUpdate }] = useMutation(UPDATE_NOTE);

  // 'newText' will be used as the new note value to update the chosen message
  const [newText, setNewtext] = useState("");
  // newTextErr will be used to display an error message if user leaves the field blank
  const [newTextErr, setNewTextErr] = useState("");
  // 'showEdit' will be used as a conditional to render the edit input for the chosen note
  const [showEdit, setShowEdit] = useState([false, ""]);

  // 'note' will contain the note that will be posted along with the user id
  const [note, setNote] = useState({ text: "", userId: "" });
  // 'errorMessage' will be used to display an error if user leaves the field blank
  const [errorMessage, setErrorMessage] = useState("");

  // ----------------------------- AUTH / QUERY USER - Extract Logged in User's ID
  let userData = Auth.getProfile();
  // Execute useQuery method to return full user data (Using the extracted user _id above)
  const { loading, data } = useQuery(GET_ME, {
    variables: { id: userData.data._id },
  });

  // Execute this upon first page load return user information
  useEffect(() => {
    // Check if user is logged in
    let loggedIn = Auth.loggedIn();

    // If user is logged in, return their data and add it to the note state object
    if (loggedIn) {
      let userData = Auth.getProfile();
      setNote({ ...note, userId: userData.data._id });
    }
  }, []);

  // Wait until data fully loads up
  if (!loading) {
    // Main User Data (Full Data)
    console.log(data);
  }

  // ----------------------------- POST METHOD - Creating and uploading a new Note
  const postNote = async (e) => {
    e.preventDefault();
    if (note) {
      try {
        await addNote({
          variables: { noteToSave: note },
        });
        window.location.reload(false);
      } catch (e) {
        // Clear Form state
        setNote("");
      }
    } else {
      setErrorMessage("Please fill in field");
    }
  };

  // ----------------------------- DELETE METHOD - Deleting a Note
  const deleteNote = async (id) => {
    try {
      await removeNote({
        variables: { Id: id, userId: data.me._id },
      });
      window.location.reload(false);
    } catch (e) {
      console.log(e);
    }
  };

  // ----------------------------- PUT METHOD - Updating a Note
  const putNote = async (_id) => {
    if (newText) {
      try {
        await updateNote({
          variables: { _id, text: newText },
        });
        window.location.reload(false);
      } catch (e) {
        console.log(e);
      }
    } else {
      setNewTextErr("Please fill in field!");
    }
  };

  return (
    <div style={{ paddingLeft: "15px" }}>
      About Page
      <p style={{ marginBottom: "0", marginTop: "25px" }}>Add Notes</p>
      <form onSubmit={(e) => postNote(e)}>
        <input
          onChange={(e) => {
            setNote({ ...note, text: e.target.value });
            setErrorMessage("");
          }}
          type="text"
          placeholder="Add note"
        ></input>
        <button type="submit">Post</button>
        {errorMessage && <p>{errorMessage}</p>}
        {error && (
          <div id="error-message">
            Failed to add Notes. Possible Reason: No Network
          </div>
        )}
      </form>
      {/* Wait till data has loaded before displaying it */}
      {!loading && (
        <p style={{ marginTop: "25px" }}>
          User credentials - Email: {data.me.email} Username: {data.me.username}
        </p>
      )}
      {/* Wait till data has loaded before displaying it */}
      {!loading && (
        <ul style={{ marginTop: "25px", paddingLeft: "15px" }}>
          User notes:
          {data.me.notes.map((note, i) => (
            <li
              key={i}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "10px",
                margin: "10px 0",
              }}
            >
              <p style={{ margin: "0", textTransform: "capitalize" }}>
                {note.text}
              </p>

              {showEdit[0] && showEdit[1] == i && (
                <input
                  placeholder="New Text"
                  onChange={(e) => {
                    setNewtext(e.target.value.trim());
                    setNewTextErr("");
                  }}
                />
              )}
              {errorUpdate && <p>{errorUpdate}</p>}
              {/* Using a useState object (showEdit), only display the edit input to the message the user clicked edit on */}
              {!showEdit[0] ? (
                <button onClick={() => setShowEdit([true, i])}>Edit</button>
              ) : (
                showEdit[1] == i && (
                  <>
                    <button onClick={() => putNote(note._id)}>Confirm</button>
                    <button onClick={() => setShowEdit([false, ""])}>
                      Cancel
                    </button>
                  </>
                )
              )}
              <button onClick={() => deleteNote(note._id)}>Delete</button>
              {errorRemove && <p>{errorRemove}</p>}
            </li>
          ))}
        </ul>
      )}
      {newTextErr && <p>{newTextErr}</p>}
    </div>
  );
};

export default About;
