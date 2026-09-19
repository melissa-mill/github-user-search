import "./App.css";
import UserData from "./components/UserData";
import { useState } from "react";
import { searchUser } from "./services/api";

function App() {
  const [searchTerm, setSearchTerm] = useState("");
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

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
    <>
      <div>
        <h1>devfinder</h1>
        <div className="theme-btn"></div>
      </div>
      <form id="search-form" onSubmit={handleSubmit}>
        <input
          id="search-input"
          name="search-input"
          type="text"
          placeholder="Search GitHub username..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button disabled={!searchTerm || loading} type="submit" className="search-btn">
          Search
        </button>
      </form>

      {error && <div>{error}</div>}

      {loading ? (
        <div className="loading">Loading...</div>
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
    </>
  );
}

export default App;
