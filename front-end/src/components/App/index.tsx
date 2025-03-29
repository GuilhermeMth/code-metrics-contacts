import { BrowserRouter } from "react-router";
import { Header } from "../Layout";
import Routes from "../Routes";
import styles from "./styles.module.css";

function App() {
  return (
    <BrowserRouter>
      <div className={styles.wrapper}>
        <Header />
        <Routes />
      </div>
    </BrowserRouter>
  );
}

export default App;
