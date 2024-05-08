import "./App.css";
import { Provider } from "react-redux";
import store from "./reduxStore/store";
import { JobList } from "./components/jobList";

function App() {
  return (
    <div className="App">
      <Provider store={store}>
        <JobList />
      </Provider>
    </div>
  );
}

export default App;
