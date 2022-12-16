import { useState } from "react";

export function Navbar() {
  const [hasToken, SetHasToken] = useState(
    localStorage.getItem("token") !== null
  );

  const logout = (e: any) => {
    e.preventDefault();
    if (hasToken) {
      localStorage.removeItem("token");
      localStorage.removeItem("name");
      localStorage.removeItem("phone");
      localStorage.removeItem("gender");
      localStorage.removeItem("bloodGroup");
      localStorage.removeItem("area");
      localStorage.removeItem("address");
      localStorage.removeItem("email");
      window.location.href = "/login";
    }
  };
  return (
    <nav>
      <div className="logo"></div>
      <div className="btns">
        <a href="/dashboard">Dashboard</a>
        <a href="/profile">Profile</a>
        <button onClick={logout}>LOGOUT</button>
      </div>
    </nav>
  );
}
