import React, { useState, useEffect } from "react";

import { useMutation } from "@apollo/client";
import { REMOVE_ANIME } from "../utils/mutations";

import { useQuery } from "@apollo/client";
import { GET_ME } from "../utils/queries";

import Auth from "../utils/auth";

const About = () => {
  const [removeAnme, { errorRemove }] = useMutation(REMOVE_ANIME);

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
    }
  }, []);

  // Wait until data fully loads up
  if (!loading) {
    // Main User Data (Full Data)
    console.log(data);
  }

  // ----------------------------- DELETE METHOD - Deleting a Note
  // const deleteNote = async (id) => {
  //   try {
  //     await removeNote({
  //       variables: { Id: id, userId: data.me._id },
  //     });
  //     window.location.reload(false);
  //   } catch (e) {
  //     console.log(e);
  //   }
  // };

  return (
    <div style={{ paddingLeft: "15px" }}>
      About Page
      {/* {!loading && (
        <p style={{ marginTop: "25px" }}>
          User credentials - Email: {data.me.email} Username: {data.me.username}
        </p>
      )} */}
    </div>
  );
};

export default About;
