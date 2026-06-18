import Home from "./pages/Home"; // Changed from "./pages/Home" to match its actual location
// @ts-ignore
import "bootstrap/dist/css/bootstrap.min.css"; // Ensure Bootstrap CSS is imported

function App() {
  return (
    <div>
      <Home />
    </div>
  );
}

export default App;