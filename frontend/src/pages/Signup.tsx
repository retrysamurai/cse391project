import { useRef } from "react";
const URL = "http://127.0.0.1:4400/users/create";

export function Signup() {
  const nameRef = useRef<HTMLInputElement>(null);
  const phoneRef = useRef<HTMLInputElement>(null);
  const genderRef = useRef<HTMLInputElement>(null);
  const dobRef = useRef<HTMLInputElement>(null);
  const bloodGroupRef = useRef<HTMLInputElement>(null);
  const areaRef = useRef<HTMLInputElement>(null);
  const addressRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (e: any) => {
    e.preventDefault();

    // console.log(input);
    fetch(URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: nameRef.current?.value,
        phone: phoneRef.current?.value,
        gender: genderRef.current?.value,
        dob: dobRef.current?.value,
        bloodGroup: bloodGroupRef.current?.value,
        area: areaRef.current?.value,
        address: addressRef.current?.value,
        email: emailRef.current?.value,
        password: passwordRef.current?.value,
      }),
    })
      .then(() => {
        console.log("New user added");
        window.location.href = "/login";
      })
      .catch((err) => {
        console.log(`Error occured: ${err}`);
      });
  };

  return (
    <div className="container">
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Full Name" ref={nameRef} />
        <input type="text" placeholder="Phone No." ref={phoneRef} />
        <input type="text" placeholder="Gender" ref={genderRef} />
        <span className="dob">
          Date of Birth{" "}
          <input type="date" placeholder="Date of Birth" ref={dobRef} />
        </span>
        <input type="text" placeholder="Blood Group" ref={bloodGroupRef} />
        <input type="text" placeholder="Area" ref={areaRef} />
        <input type="text" placeholder="Address" ref={addressRef} />
        <input type="email" placeholder="Email" ref={emailRef} />
        <input type="password" placeholder="Password" ref={passwordRef} />
        <button type="submit">Signup</button>
      </form>
      <div className="links">
        <a href="/">Homepage</a>
        <a href="/login">Login</a>
      </div>
    </div>
  );
}
