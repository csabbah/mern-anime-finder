import React, { useState, useEffect } from "react";

import { useMutation } from "@apollo/client";
import { REMOVE_ANIME } from "../utils/mutations";

import { useQuery } from "@apollo/client";
import { GET_ME } from "../utils/queries";

import Auth from "../utils/auth";

const SavedAnime = () => {
  const [removeAnme, { errorRemove }] = useMutation(REMOVE_ANIME);
  const [showMore, setShowMore] = useState([false, null]);

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
      <div className="box">
        <div className="wave -one"></div>
        <div className="wave -two"></div>
        <div className="wave -three"></div>
      </div>
      <ul className="main-wrapper">
        {!loading &&
          data.me.savedAnime.map((item, i) => {
            return (
              <li
                className={`card ${
                  showMore[1] == i && showMore[0] ? "showDesc" : ""
                }`}
                key={i}
              >
                <img className="image" src={item.image} alt={item.title}></img>
                <div className="card-wrapper">
                  <h5>{item.title}</h5>
                  <div className="genre-wrapper">
                    {item.genres.map((genre, i) => {
                      return (
                        <p className={`genre-item ${genre}`} key={i}>
                          {genre}
                        </p>
                      );
                    })}
                    <p>
                      {item.synopsis.slice(
                        0,
                        showMore[1] == i && showMore[0] ? 350 : 50
                      )}
                      ...
                      <span
                        className="showMoreEl"
                        onClick={() =>
                          showMore[1] == i && showMore[0]
                            ? setShowMore([false, i])
                            : setShowMore([true, i])
                        }
                      >
                        {showMore[1] == i && showMore[0]
                          ? "Show Less"
                          : "Show More"}
                      </span>
                    </p>
                    <a href={`/anime/${item.dataId}`}>Full Data</a>
                    <a
                      href={item.link}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Source
                    </a>
                  </div>
                </div>
              </li>
            );
          })}
      </ul>
    </div>
  );
};

export default SavedAnime;
