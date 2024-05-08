import "./App.css";
import JobDetails from "./components/JobDetails";
import { Provider } from "react-redux";
import store from "./reduxStore/store";

function App() {
  return (
    <div className="App">
      <Provider store={store}>
        <JobDetails />
      </Provider>
    </div>
  );
}

export default App;
