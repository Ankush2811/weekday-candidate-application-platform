import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./reduxStore/store";
import JobList from './components/jobList'

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Provider store={store}>
          <Routes>
            <Route path="/" element={<JobList />} />
          </Routes>
        </Provider>
      </BrowserRouter>
    </div>
  );
}

export default App;
