import { useEffect, useState } from "react";
import Nav from "../components/nav-page";
import style from "./Login.module.css";
import { useAuth } from "../src/FakeApi";
import { useNavigate } from "react-router-dom";

function LogIn() {
  const [dets, setDets] = useState({
    email: "evan@jjjg.ocom",
    pass: "qwerty",
  });

  const navigate = useNavigate()
  const {login,isAuth} = useAuth()

  function man(e) {
    const { name, value } = e.target;

    setDets((prev) => ({ ...prev, [name]: value }));
  }

  useEffect(()=>{
    if(isAuth) navigate("/applayout",{replace:true})
  },[isAuth,navigate])

  function handleSubmit(e){
    e.preventDefault()

    if(dets.email && dets.pass)  login(dets)
  }
  return (
    <div className={`${style.login}`}>
      <Nav />
      <form action="" onSubmit={handleSubmit}>
        <label htmlFor="log">
          Log In <br />
          <input
            type="text"
            id="log"
            name="email"
            value={dets.email}
            onChange={man}
          />
        </label>
        <label htmlFor="pass">
          Password <br />
          <input
            type="password"
            id="pass"
            name="pass"
            value={dets.pass}
            onChange={man}
          />
        </label>
        <br />
        <button>Log In</button>
      </form>
    </div>
  );
}

export default LogIn;
