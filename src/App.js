import "./App.css";
import search from "./images/searchImg.png";
import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import moon from "./images/moon.svg";
import sun from "./images/sun.svg";
import location from "./images/location.svg";
import linkImg from "./images/linkImg.svg";
import twiter from "./images/twiter.svg";
import company from "./images/company.svg";

function App() {
  const [data, setData] = useState();
  const [user, setUser] = useState("octocat");
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [clickedMode, setClickedMode] = useState(false);
  const [noResult, setNoResult] = useState("");
  const [searchInputValue, setSearchInputValue] = useState("");

  const modeDivStyle = {
    backgroundColor: isDarkMode ? "#141D2F" : "#F2F2F2",
    color: isDarkMode ? "white" : "black",
  };

  // ratim dawera komentari

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const options = {
      day: "numeric",
      month: "short",
      year: "numeric",
    };
    const formattedDate = date.toLocaleDateString("en-US", options);
    return `joined ${formattedDate}`;
  };

  function toggleDarkMode() {
    setIsDarkMode(!isDarkMode);
    setClickedMode(!clickedMode);
  }

  function changeInputValue(e) {
    setSearchInputValue(e.target.value);
  }

  function searchClicked() {
    setUser(searchInputValue);
  }

  function keyPress(e) {
    if (e.code === "Enter") {
      searchClicked();
    }
  }

  useEffect(() => {
    axios
      .get(`https://api.github.com/users/${user}`)
      .then((response) => {
        setData(response.data);
        setNoResult("");
      })
      .catch((error) => {
        setNoResult("No result");
      });
  }, [user]);

  if (!data) return;
  return (
    <>
      <div className="mainCont" style={modeDivStyle}>
        <div className="inSideCont" style={modeDivStyle}>
          <header style={modeDivStyle}>
            <h1 style={modeDivStyle}>devfinder</h1>
            <div
              className="darkDiv"
              style={modeDivStyle}
              onClick={toggleDarkMode}
            >
              <p style={modeDivStyle}>
                {clickedMode === false ? "DARK" : "LIGHT"}
              </p>
              <img
                className="moonsun"
                src={clickedMode === false ? moon : sun}
                alt="sunmoon"
              />
            </div>
          </header>
          <div
            className="searchDiv"
            style={{
              backgroundColor: isDarkMode ? "#1E2A47" : "white",
              boxShadow: isDarkMode
                ? "none"
                : "0px 16px 30px -10px rgba(70, 95, 187, 0.322)",
            }}
          >
            <div className="searchDivInput">
              <img src={search} alt="search" />

              <input
                style={{
                  backgroundColor: isDarkMode ? "#1E2A47" : "white",
                  color: isDarkMode ? "white" : "black",
                }}
                type="search"
                placeholder="Search GitHub username.."
                value={searchInputValue}
                onChange={(e) => changeInputValue(e)}
                onFocus={(e) => (e.target.placeholder = "")}
                onKeyPress={(e) => keyPress(e)}
              />
            </div>
            <div className="warningDiv">
              <p className="warning">{noResult}</p>
              <button onClick={searchClicked}>Search</button>
            </div>
          </div>
          <div
            className="infoMainDiv"
            style={{
              backgroundColor: isDarkMode ? "#1E2A47" : "white",
              boxShadow: isDarkMode
                ? "none"
                : "0px 16px 30px -10px rgba(70, 95, 187, 0.322)",
            }}
          >
            <div className="div1">
              <img
                className="userImg"
                src={data.avatar_url ? data.avatar_url : ""}
                alt="userImg"
              />
              <div className="div1Right">
                <h2 style={{ color: isDarkMode ? "white" : "black" }}>
                  {data.name ? data.name : data.login}
                </h2>
                <h3 style={{ color: isDarkMode ? "white" : "black" }}>
                  {formatDate(data.created_at ? data.created_at : "No result")}
                </h3>
                <h4 style={{ color: isDarkMode ? "white" : "black" }}>
                  @{data.login ? data.login : "No result"}
                </h4>
              </div>
            </div>
            <div className="div2">
              <span style={{ color: isDarkMode ? "white" : "black" }}>
                {data.bio ? data.bio : "Not bio"}
              </span>
            </div>
            <div
              className="div3"
              style={{
                backgroundColor: isDarkMode ? "#141D2F" : "#F6F8FF",
              }}
            >
              <div className="div3in">
                <h5 style={{ color: isDarkMode ? "#4B6A9B" : "black" }}>
                  Repos
                </h5>
                <h6 style={{ color: isDarkMode ? "white" : "black" }}>
                  {data["public_repos"] ? data["public_repos"] : "0"}
                </h6>
              </div>
              <div className="div3in">
                <h5 style={{ color: isDarkMode ? "#4B6A9B" : "black" }}>
                  Followers
                </h5>
                <h6 style={{ color: isDarkMode ? "white" : "black" }}>
                  {data.followers ? data.followers : "0"}
                </h6>
              </div>
              <div className="div3in">
                <h5 style={{ color: isDarkMode ? "#4B6A9B" : "black" }}>
                  Following
                </h5>
                <h6 style={{ color: isDarkMode ? "white" : "black" }}>
                  {data.following ? data.following : "0"}
                </h6>
              </div>
            </div>
            <div className="div4">
              <div className="div4Left">
                <div className="div4Lefts">
                  <img className="location" src={location} alt="location" />
                  <p
                    style={{ color: isDarkMode ? "white" : "black" }}
                    className="intoText"
                  >
                    {data.location ? data.location : "Not location"}
                  </p>
                </div>
                <div className="div4Lefts">
                  <img className="linkImg" src={linkImg} alt="linkImg" />
                  <p
                    style={{ color: isDarkMode ? "white" : "black" }}
                    className="intoTextLink"
                  >
                    {data.blog ? data.blog : "Not blog"}
                  </p>
                </div>
              </div>
              <div className="div4Right">
                <div className="div4Rights">
                  <img className="twiter" src={twiter} alt="twiter" />
                  <p
                    style={{ color: isDarkMode ? "white" : "black" }}
                    className="intoText"
                  >
                    {data.twitter_username
                      ? data.twitter_username
                      : "Not Available"}
                  </p>
                </div>
                <div className="div4Rights">
                  <img className="company" src={company} alt="company" />
                  <p
                    style={{ color: isDarkMode ? "white" : "black" }}
                    className="intoText"
                  >
                    {data.company ? data.company : "Not company"}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
