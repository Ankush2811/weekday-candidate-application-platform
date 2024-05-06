import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import RootLayout from "./Components/RootLayout";
import { Provider } from "react-redux";
import store from "./reduxStore/store";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Provider store={store}>
          <Routes>
            <Route path="/" element={<RootLayout />} />
          </Routes>
        </Provider>
      </BrowserRouter>
    </div>
  );
}

export default App;
