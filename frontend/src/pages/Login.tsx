import { useEffect, useRef, useState } from "react";

function Redirect(props: { to: string }) {
  useEffect(() => {
    window.location.href = props.to;
  });
  return <></>;
}

export function Login() {
  const [hasToken, setHasToken] = useState(
    localStorage.getItem("token") !== null
  );

  const emailRef = useRef<HTMLInputElement>(null);
  const passRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (e: any) => {
    e.preventDefault();

    const options = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: emailRef.current?.value,
        password: passRef.current?.value,
      }),
    };

    fetch("http://localhost:4400/users/login", options)
      .then((response) => response.json())
      .then((response) => {
        if (response.token) {
          localStorage.setItem("token", response.token);
          localStorage.setItem("name", response.name);
          localStorage.setItem("phone", response.phone);
          localStorage.setItem("gender", response.gender);
          localStorage.setItem("bloodGroup", response.bloodGroup);
          localStorage.setItem("area", response.area);
          localStorage.setItem("address", response.address);
          localStorage.setItem("email", response.email);
          window.location.href = "/dashboard";
        } else {
          alert(response.error);
        }
      })
      .catch((err) => console.error(err));
  };

  return !hasToken ? (
    <div className="container">
      <form onSubmit={handleSubmit}>
        <input type="email" placeholder="Email" ref={emailRef} />
        <input type="password" placeholder="Password" ref={passRef} />
        <button type="submit">Login</button>
      </form>
      <div className="links">
        <a href="/">Homepage</a>
        <a href="/signup">Signup</a>
      </div>
    </div>
  ) : (
    <Redirect to="/dashboard" />
  );
}
