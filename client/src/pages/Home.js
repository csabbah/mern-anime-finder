import React, { useState, useEffect } from "react";
import { FaRegSave, FaSave } from "react-icons/fa";

import { useMutation } from "@apollo/client";
import { ADD_ANIME } from "../utils/mutations";

import Auth from "../utils/auth";

const Home = () => {
  let loggedIn = Auth.loggedIn();

  const [addAnime, { error }] = useMutation(ADD_ANIME);

  const saveAnime = async (item) => {
    try {
      await addAnime({
        variables: item,
      });
    } catch (e) {
      console.log(e);
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
                <option value="16">16</option>
                <option value="17">17</option>
                <option value="18">18</option>
                <option value="19">19</option>
                <option value="20">20</option>
              </select>
            </>
          )}
        </div>
      </form>

      <ul className="main-wrapper">
        {data
          ? data.data.map((item, i) => {
              return (
                <li
                  className={`card ${
                    showMore[1] == i && showMore[0] ? "showDesc" : ""
                  }`}
                  key={i}
                >
                  <img
                    className="image"
                    src={item.image}
                    alt={item.title}
                  ></img>
                  <div className="card-wrapper">
                    <h5>{item.title.slice(0, 25)}...</h5>
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
                    </div>
                    <div className="interaction-wrapper">
                      {loggedIn ? (
                        <FaRegSave
                          onClick={() =>
                            saveAnime({
                              animeToSave: {
                                userId: Auth.getProfile().data._id,
                                genres: item.genres,
                                image: item.image,
                                link: item.link,
                                ranking: item.ranking.toString(),
                                title: item.title,
                                episodes: item.episodes.toString(),
                                status: item.status,
                                synopsis: item.synopsis,
                              },
                            })
                          }
                          className="save-icon"
                        />
                      ) : (
                        "Login/Signup to save Anime"
                      )}
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
            className={`${activePage == 1 ? "activePage" : ""}`}
          >
            {"<"}
          </button>
        )}
        {data &&
          data.data.length > 1 &&
          buttons.map((pageNum, i) => {
            return (
              <button
                className={`${activePage == i + 1 ? "activePage" : ""}`}
                onClick={() => {
                  setActivePage(i + 1);
                  setSubmitted(true);
                }}
                key={i + 1}
              >
                {pageNum + 1}
              </button>
            );
          })}
        {data && data.data.length > 1 && (
          <button
            onClick={() => {
              setActivePage(activePage + 1);
              setSubmitted(true);
            }}
            className={`${activePage == buttons.length ? "activePage" : ""}`}
          >
            {">"}
          </button>
        )}
      </div>
    </div>
  );
};

export default Home;
