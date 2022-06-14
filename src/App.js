import SignUpPage from "./pages/SignUpPage";
import LanguageSelector from "./components/LanguageSelector";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import UserPage from "./pages/UserPage";
import { useTranslation } from "react-i18next";
import { useState } from "react";

function App() {
  const { t } = useTranslation();

  const [path, setPath ] = useState(window.location.pathname);

  const onClickLink = (event) => {
    event.preventDefault();
    const path = event.target.attributes.href.value;
    window.history.pushState({}, "", path);
    setPath(path);
  }

  return (
    <>
      <nav className="navbar navbar-expand navbar-light bg-light shadow-sm">
        <div className="container">
          <a className="navbar-brand" href="/" title="Home" onClick={ onClickLink }>Hoaxify</a>
          <ul className="navbar-nav">
            <a className="nav-link" href="/signup" title="Sign Up" onClick={ onClickLink }>{ t("signUp") }</a>
            <a className="nav-link" href="/login" title="Login" onClick={ onClickLink }>{ t("login") }</a>
          </ul>
        </div>
      </nav>
      <div className="container">
        { path === "/" && <HomePage /> }
        { path === "/login" && <LoginPage /> }
        { path === "/signup" && <SignUpPage /> }
        { path.startsWith("/user/") && <UserPage /> }
        <LanguageSelector />
      </div>
    </>
  );
}

export default App;
