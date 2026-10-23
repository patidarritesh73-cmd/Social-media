import { FiSearch, FiSun, FiMoon } from "react-icons/fi";

const Header = ({
  selectedTab,
  searchTerm,
  setSearchTerm,
  theme,
  onToggleTheme,
}) => {
  return (
    <header className="topbar">
      <div className="topbar-title">
        <span>A thoughtful corner of the internet</span>
        <strong>{selectedTab === "Home" ? "Community" : "Create a post"}</strong>
      </div>
      <div className="topbar-actions">
        {selectedTab === "Home" && (
          <label className="search-box">
            <FiSearch aria-hidden="true" />
            <input
              type="search"
              value={searchTerm}
              onChange={(event) => setSearchTerm(event.target.value)}
              placeholder="Search posts or tags"
              aria-label="Search posts or tags"
            />
          </label>
        )}
        <button
          type="button"
          className="icon-button"
          onClick={onToggleTheme}
          aria-label={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
          title={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
        >
          {theme === "light" ? <FiMoon /> : <FiSun />}
        </button>
      </div>
    </header>
  );
};

export default Header;
