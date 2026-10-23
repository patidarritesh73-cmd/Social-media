import { FiCompass, FiEdit3 } from "react-icons/fi";

const Sidebar = ({ selectedTab, setSelectedTab }) => {
  return (
    <aside className="sidebar">
      <a
        href="#home"
        className="brand"
        onClick={(event) => {
          event.preventDefault();
          setSelectedTab("Home");
        }}
      >
        <span className="brand-mark" aria-hidden="true">
          s
        </span>
        <span>smalltalk</span>
      </a>
      <p className="sidebar-caption">Explore</p>
      <nav className="side-nav" aria-label="Main navigation">
        <button
          type="button"
          className={selectedTab === "Home" ? "active" : ""}
          aria-current={selectedTab === "Home" ? "page" : undefined}
          onClick={() => setSelectedTab("Home")}
        >
          <FiCompass aria-hidden="true" />
          Community feed
        </button>
        <button
          type="button"
          className={selectedTab === "Create Post" ? "active" : ""}
          aria-current={selectedTab === "Create Post" ? "page" : undefined}
          onClick={() => setSelectedTab("Create Post")}
        >
          <FiEdit3 aria-hidden="true" />
          Write a post
        </button>
      </nav>
      <div className="sidebar-note">
        <strong>Frontend preview</strong>
        This preview uses sample posts saved in this browser. Your backend
        team can connect the same screens to the live API later.
      </div>
    </aside>
  );
};

export default Sidebar;
