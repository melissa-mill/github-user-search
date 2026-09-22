import "./App.css";
import UserData from "./components/UserData";
import { useState } from "react";
import { searchUser } from "./services/api";
import linkBrokenIcon from "./assets/link-broken.svg";
import loadingIcon from "./assets/loading.svg";

function App() {
  const [searchTerm, setSearchTerm] = useState("");
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [theme, setTheme] = useState("dark");

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "dark" ? "light" : "dark"));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!searchTerm.trim()) {
      setSearchTerm("");
      return;
    }

    setLoading(true);
    setUser(null);
    setError(null);

    try {
      const response = await searchUser(searchTerm.trim());

      setSearchTerm(searchTerm.trim());
      setUser(response.data);
    } catch (e) {
      if (e.status === 404) {
        setError("User not found");
      } else {
        setError("Oops! Something went wrong");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={theme === "dark" ? "dark" : ""}>
      <div className="bg-white dark:bg-gray-800 text-[#746f6f] dark:text-[#d8d8d8] h-screen">
        <div className="flex justify-between w-3/5 m-auto mb-4 pt-12">
          <h1 className="font-bold">devfinder</h1>
          <button
            type="button"
            className="theme-btn text-sm"
            onClick={toggleTheme}
            aria-label="Toggle theme"
          >
            {theme === "dark" ? "Light 🌞" : "Dark 🌛"}
          </button>
        </div>
        <form
          id="search-form"
          onSubmit={handleSubmit}
          className="flex w-3/5 m-auto mb-4 bg-[#f6f8fa] dark:bg-gray-700 rounded-lg p-2"
        >
          <input
            id="search-input"
            name="search-input"
            type="text"
            placeholder="Search GitHub username..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full"
          />
          <button
            disabled={!searchTerm || loading}
            type="submit"
            className="search-btn w-24 text-sm text-white font-semibold bg-sky-500 p-2 rounded-lg"
          >
            Search
          </button>
        </form>

        {error && (
          <div className="w-fit m-auto text-lg text-center">
            <img
              src={linkBrokenIcon}
              alt="Link broken icon"
              width={28}
              height={28}
              loading="lazy"
              className="float-left contrast-0 dark:contrast-100 dark:invert mr-2"
            />
            {error}
          </div>
        )}

        {loading ? (
          <div className="loading w-fit m-auto text-lg text-center">
            <img
              src={loadingIcon}
              alt="Link broken icon"
              width={28}
              height={28}
              loading="lazy"
              className="float-left contrast-0 dark:contrast-100 dark:invert mr-2"
            />
            Loading...
          </div>
        ) : (
          user &&
          !error && (
            <UserData
              name={user.name}
              imgUrl={user.avatar_url}
              creationDate={user.created_at}
              username={user.login}
              bio={user.bio}
              repos={user.public_repos}
              followers={user.followers}
              following={user.following}
              location={user.location}
              twitter={user.twitter_username}
              blog={user.blog}
              company={user.company}
            />
          )
        )}
      </div>
    </div>
  );
}

export default App;
