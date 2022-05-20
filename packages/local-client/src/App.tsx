import "bulmaswatch/superhero/bulmaswatch.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import { Provider } from "react-redux";
import store from "./state";

import { startService } from "./bundler";
import CellList from "./components/cell-list";

function App() {
  startService();

  return (
    <Provider store={store}>
      <div>
        <h1>Test</h1>
        <CellList />
      </div>
    </Provider>
  );
}

export default App;
