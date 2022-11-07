import React, { useState, useEffect } from "react";

import { useMutation } from "@apollo/client";
import { REMOVE_ANIME } from "../utils/mutations";

import { useQuery } from "@apollo/client";
import { GET_ME } from "../utils/queries";

import Auth from "../utils/auth";

const SavedAnime = () => {
  const [removeAnime] = useMutation(REMOVE_ANIME);
  const [showMore, setShowMore] = useState([false, null]);

  let userData = Auth.getProfile();
  const { loading, data } = useQuery(GET_ME, {
    variables: { id: userData.data._id },
  });

  // ----------------------------- DELETE METHOD - Deleting a Note
  const deleteAnime = async (id) => {
    try {
      await removeAnime({
        variables: { Id: id, userId: data.me._id },
      });
      window.location.reload(false);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div className="main-save-wrapper">
      <div className="box">
        <div className="wave -one"></div>
        <div className="wave -two"></div>
        <div className="wave -three"></div>
      </div>
      <h3
        style={{
          color: "white",
          marginTop: "15px",
          marginBottom: "0",
        }}
      >
        Your saved Anime
      </h3>
      <ul className="main-wrapper">
        {!loading &&
          data &&
          data.me.savedAnime.map((item, i) => {
            return (
              <li
                className={`card saved ${
                  showMore[1] == i && showMore[0] ? "showDesc" : ""
                }`}
                key={i}
              >
                <img
                  className="image saved"
                  src={item.image}
                  alt={item.title}
                ></img>
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
                  </div>
                  <div style={{ marginTop: "15px" }}>
                    <button
                      style={{
                        marginRight: "10px",
                        backgroundColor: "#cc4f4f",
                        color: "white",
                      }}
                      onClick={() => deleteAnime(item._id)}
                    >
                      Delete
                    </button>
                    <a href={`/anime/${item.dataId}`}>View full Data</a>
                  </div>
                </div>
              </li>
            );
          })}
        {data && data.me.savedAnime.length == 0 ? (
          <p style={{ color: "white" }}>No Anime saved</p>
        ) : (
          ""
        )}
      </ul>
    </div>
  );
};

export default SavedAnime;
