import React, { useState, useEffect } from "react";
import { FaRegSave } from "react-icons/fa";

import { useMutation } from "@apollo/client";
import { ADD_ANIME } from "../utils/mutations";

import { useQuery } from "@apollo/client";
import { GET_ME } from "../utils/queries";

import Auth from "../utils/auth";

const Home = () => {
  let loggedIn = Auth.loggedIn();

  const [addAnime] = useMutation(ADD_ANIME);
  const [notification, setNotification] = useState([false, ""]);

  // Extract the users saved anime data and push it to a global variable
  let userSavedAnime = [];
  const ExtractSavedAnime = (userId) => {
    const { loading, data } = useQuery(GET_ME, {
      variables: { id: userId },
    });

    if (!loading) {
      data.me.savedAnime.forEach((anime) => {
        userSavedAnime.push(anime);
      });
    }
  };

  // If user is logged in, execute above function using the users ID
  if (loggedIn) {
    let userData = Auth.getProfile();
    ExtractSavedAnime(userData.data._id);
  }

  // Check users saved anime against the one they are currently trying to save
  const checkAnime = (chosenItem) => {
    let isAlreadySaved = false;
    userSavedAnime.forEach((anime) => {
      if (anime.dataId === chosenItem.animeToSave.dataId) {
        isAlreadySaved = true;
      }
    });
    return isAlreadySaved;
  };

  const saveAnime = async (item) => {
    if (checkAnime(item)) {
      setNotification([true, "Anime already saved!"]);
      setTimeout(() => {
        setNotification([false, "Anime already saved!"]);
      }, 3000);
    } else {
      try {
        await addAnime({
          variables: item,
        });
        setNotification([true, "Anime added to profile!"]);
        setTimeout(() => {
          setNotification([false, "Anime added to profile!"]);
        }, 3000);
      } catch (e) {
        console.log(e);
      }
    }
  };

  const [data, setData] = useState("");
  const [buttons, setButtons] = useState([]);
  const [activePage, setActivePage] = useState(1);
  const [dataPerPage, setDataPerPage] = useState(10);

  const [searchTerm, setSearchTerm] = useState("");
  const [showMore, setShowMore] = useState([false, null]);

  const searchAnime = () => {
    setShowMore([false, null]);
    const options = {
      method: "GET",
      headers: {
        "X-RapidAPI-Key": "ffae5646afmshec63d61fbd07b2fp17ee73jsn3371d91d22c0",
        "X-RapidAPI-Host": "anime-db.p.rapidapi.com",
      },
    };

    fetch(
      `https://anime-db.p.rapidapi.com/anime?page=${activePage}&size=${dataPerPage}&search=${searchTerm}&genres=Fantasy%2CDrama&sortBy=ranking&sortOrder=asc`,
      options
    )
      .then((response) => response.json())
      .then((response) => {
        setData(response);
        // Convert buttons into an array based on value, i.e., if value is '3', create '[0,1,2]'
        setButtons(Array.from(Array(response.meta.totalPage).keys()));
      })
      .catch((err) => console.error(err));

    return setSubmitted(false);
  };

  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (submitted) {
      searchAnime();
    }
  });

  return (
    <div className="outer-wrapper">
      <h5 className={`notification ${notification[0] ? "active" : ""}`}>
        {notification[1]}
      </h5>

      <div className="box">
        <div className="wave -one"></div>
        <div className="wave -two"></div>
        <div className="wave -three"></div>
      </div>
      <form onSubmit={(e) => e.preventDefault()} className="search-controls">
        <input
          className="inputData"
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Demon Slayer, MHA..."
        ></input>
        <div className="control-inner">
          <button type="submit" onClick={() => setSubmitted(true)}>
            Search
          </button>
          {data && data.data.length > 1 && (
            <>
              <button
                onClick={() => {
                  window.location.reload(false);
                }}
              >
                Clear
              </button>
              <select
                onChange={(e) => {
                  setDataPerPage(e.target.value);
                  setActivePage(1);
                  setSubmitted(true);
                }}
                id="dropdown"
              >
                <option value="perPage">Data per page</option>
                <option value="10">10</option>
                <option value="12">12</option>
                <option value="13">13</option>
                <option value="14">14</option>
                <option value="15">15</option>
              </select>
            </>
          )}
        </div>
      </form>

      <ul className="main-wrapper">
        {data
          ? data.data.map((item, i) => {
              const {
                image,
                title,
                genres,
                synopsis,
                link,
                _id,
                ranking,
                episodes,
                status,
              } = item;
              return (
                <li
                  className={`card ${
                    showMore[1] === i && showMore[0] ? "showDesc" : ""
                  }`}
                  key={i}
                >
                  <img className="image" src={image} alt={title}></img>
                  <div className="card-wrapper">
                    <h5>{title}</h5>
                    <div className="genre-wrapper">
                      {genres.map((genre, i) => {
                        if (i >= 3) {
                          return "";
                        }
                        return (
                          <p className={`genre-item ${genre}`} key={i}>
                            {genre}
                          </p>
                        );
                      })}
                    </div>
                    <div className="desc-wrapper">
                      {synopsis.length === 0 ? (
                        <span>No Description</span>
                      ) : (
                        <>
                          {synopsis.slice(
                            0,
                            showMore[1] === i && showMore[0] ? 350 : 50
                          )}
                          ...
                          <span
                            className="showMoreEl"
                            onClick={() =>
                              showMore[1] === i && showMore[0]
                                ? setShowMore([false, i])
                                : setShowMore([true, i])
                            }
                          >
                            {showMore[1] === i && showMore[0]
                              ? "Show Less"
                              : "Show More"}
                          </span>
                        </>
                      )}
                    </div>
                    <div
                      className={`interaction-wrapper ${
                        !loggedIn && "not-logged"
                      }`}
                    >
                      {loggedIn ? (
                        <div
                          onClick={() => {
                            saveAnime({
                              animeToSave: {
                                dataId: _id,
                                userId: Auth.getProfile().data._id,
                                genres: genres,
                                image: image,
                                link: link,
                                ranking: ranking.toString(),
                                title: title,
                                episodes: episodes.toString(),
                                status: status,
                                synopsis: synopsis,
                              },
                            });
                            document.querySelector(`.icon-${i}`).remove();
                          }}
                          className={`save-wrapper icon-${i}`}
                          style={{ display: "flex", marginRight: "15px" }}
                        >
                          <span style={{ marginRight: "3px" }}>Save</span>
                          <FaRegSave className="save-icon" />
                        </div>
                      ) : (
                        <p
                          style={{
                            marginTop: "10px",
                            marginBottom: "8px",
                            textDecoration: "underline",
                          }}
                        >
                          Login to save Anime
                        </p>
                      )}
                      <a href={`/anime/${item._id}`}>View full data</a>
                    </div>
                  </div>
                </li>
              );
            })
          : ""}
        {data && data.data.length < 1 ? (
          <p style={{ color: "white" }}>No Data Found!</p>
        ) : (
          ""
        )}
      </ul>
      <div className="pages-wrapper">
        {data && data.data.length > 1 && (
          <button
            onClick={() => {
              setActivePage(activePage - 1);
              setSubmitted(true);
            }}
            className={`${activePage === 1 ? "activePage" : ""}`}
          >
            {"<"}
          </button>
        )}
        {data &&
          data.data.length > 1 &&
          buttons.map((pageNum, i) => {
            if (i < 10) {
              return (
                <button
                  className={`${activePage === i + 1 ? "activePage" : ""}`}
                  onClick={() => {
                    setActivePage(i + 1);
                    setSubmitted(true);
                  }}
                  key={i + 1}
                >
                  {pageNum + 1}
                </button>
              );
            }
            return "";
          })}
        {data && data.data.length > 1 && (
          <button
            onClick={() => {
              setActivePage(activePage + 1);
              setSubmitted(true);
            }}
            className={`${activePage === buttons.length ? "activePage" : ""}`}
          >
            {">"}
          </button>
        )}
      </div>
    </div>
  );
};

export default Home;
