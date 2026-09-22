import "./App.css";
import SearchForm from "./components/SearchForm";
import UserData from "./components/UserData";
import ThemeToggle from "./components/ThemeToggle";
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
      <div className="bg-white dark:bg-gray-800 text-[#746f6f] dark:text-[#d8d8d8] h-full md:h-screen py-12">
        <div className="flex justify-between w-4/5 md:w-3/5 m-auto mb-4">
          <h1 className="font-bold">devfinder</h1>
          <ThemeToggle theme={theme} toggleTheme={toggleTheme} />
        </div>
        <SearchForm
          loading={loading}
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          handleSubmit={handleSubmit}
        />

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
          user && !error && <UserData user={user} />
        )}
      </div>
    </div>
  );
}

export default App;
