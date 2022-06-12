import SignUpPage from "./pages/SignUpPage";
import LanguageSelector from "./components/LanguageSelector";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";

function App() {
  return (
    <div className="container">
      { window.location.pathname === "/" && <HomePage /> }
      { window.location.pathname === "/login" && <LoginPage /> }
      { window.location.pathname === "/signup" && <SignUpPage /> }
      <LanguageSelector />
    </div>
  );
}

export default App;
