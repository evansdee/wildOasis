import { Suspense, lazy } from "react";
// import Map from "../components/map";
// import SideBar from "../components/sidebar";
import User from "../components/user";
import styles from "./AppLayout.module.css";
import Loading from "../components/loading";

const Map = lazy(() => import("../components/map"));
const SideBar = lazy(() => import("../components/sidebar"));

function AppLayout() {
  return (
    <div className={styles.app}>
      <Suspense fallback={<Loading />}>
        <SideBar />
        <Map />
        <User />
      </Suspense>
    </div>
  );
}

export default AppLayout;
