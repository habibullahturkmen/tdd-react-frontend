import SignUpPage from "./pages/SignUpPage";
import LanguageSelector from "./components/LanguageSelector";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import UserPage from "./pages/UserPage";

function App() {
  return (
    <div className="container">
    <div>
      <a href="/" title="Home">Hoaxify</a>
      <a href="/signup" title="Sign Up">Sign Up</a>
    </div>
      { window.location.pathname === "/" && <HomePage /> }
      { window.location.pathname === "/login" && <LoginPage /> }
      { window.location.pathname === "/signup" && <SignUpPage /> }
      { window.location.pathname.startsWith("/user/") && <UserPage /> }
      <LanguageSelector />
    </div>
  );
}

export default App;
