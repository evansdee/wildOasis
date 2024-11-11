import { Link } from "react-router-dom";
import logo from "../src/asset/icon.png";

function Logo({ clss, sty }) {

  return (
    <Link to="/" className="logo" style={clss}>
      <img className="imgIcon" src={logo} alt="" /> WorldWise
    </Link>
  );
}

export default Logo;
