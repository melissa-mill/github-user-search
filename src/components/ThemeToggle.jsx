function ThemeToggle({ theme, toggleTheme }) {
  return (
    <button
      type="button"
      className="theme-btn text-xs uppercase cursor-pointer"
      onClick={() => toggleTheme()}
      aria-label="Toggle theme"
    >
      {theme === "dark" ? "Light 🌞" : "Dark 🌛"}
    </button>
  );
}

export default ThemeToggle;
