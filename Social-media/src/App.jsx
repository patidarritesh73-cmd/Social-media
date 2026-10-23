import "./App.css";
import { useEffect, useState } from "react";
import Footer from "./components/Footer";
import Header from "./components/Header";
import PostList from "./components/PostList";
import Sidebar from "./components/Sidebar";
import CreatePost from "./components/CreatePost";
import FeedInsights from "./components/FeedInsights";
import PostListProvider from "./store/post-list-store";

function App() {
  const [selectedTab, setSelectedTab] = useState("Home");
  const [searchTerm, setSearchTerm] = useState("");
  const [feedMode, setFeedMode] = useState("latest");
  const [theme, setTheme] = useState(
    () => window.localStorage.getItem("social-theme") || "light"
  );

  useEffect(() => {
    window.localStorage.setItem("social-theme", theme);
  }, [theme]);

  return (
    <PostListProvider>
      <div className="app-shell" data-theme={theme}>
        <div className="app-layout">
          <Sidebar selectedTab={selectedTab} setSelectedTab={setSelectedTab} />
          <div className="workspace">
            <Header
              selectedTab={selectedTab}
              searchTerm={searchTerm}
              setSearchTerm={setSearchTerm}
              theme={theme}
              onToggleTheme={() =>
                setTheme((currentTheme) =>
                  currentTheme === "light" ? "dark" : "light"
                )
              }
            />
            <main className="page-content">
              <div className="feed-layout" hidden={selectedTab !== "Home"}>
                <section className="feed-column" aria-label="Community feed">
                  <div className="welcome-banner">
                    <h1>A little space for good ideas.</h1>
                    <p>
                      Catch up with the community, share what you are learning,
                      and find something new to explore.
                    </p>
                  </div>
                  <div className="feed-heading">
                    <div>
                      <h2>Your community</h2>
                      <p>Thoughts and conversations from everyone.</p>
                    </div>
                    <div className="feed-tabs" aria-label="Feed order">
                      <button
                        type="button"
                        className={feedMode === "latest" ? "active" : ""}
                        aria-pressed={feedMode === "latest"}
                        onClick={() => setFeedMode("latest")}
                      >
                        Latest
                      </button>
                      <button
                        type="button"
                        className={feedMode === "popular" ? "active" : ""}
                        aria-pressed={feedMode === "popular"}
                        onClick={() => setFeedMode("popular")}
                      >
                        Popular
                      </button>
                    </div>
                  </div>
                  <PostList searchTerm={searchTerm} feedMode={feedMode} />
                </section>
                <FeedInsights />
              </div>
              <div hidden={selectedTab !== "Create Post"}>
                <CreatePost
                  onPostCreated={() => {
                    setSelectedTab("Home");
                    setSearchTerm("");
                    setFeedMode("latest");
                  }}
                />
              </div>
              <Footer />
            </main>
          </div>
        </div>
      </div>
    </PostListProvider>
  );
}

export default App;
