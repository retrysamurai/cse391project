import { useRef } from "react";
const URL = "http://127.0.0.1:4400/users/create";

export function Signup() {
  const nameRef = useRef<HTMLInputElement>(null);
  const phoneRef = useRef<HTMLInputElement>(null);
  const genderRef = useRef<HTMLSelectElement>(null);
  const dobRef = useRef<HTMLInputElement>(null);
  const bloodGroupRef = useRef<HTMLSelectElement>(null);
  const areaRef = useRef<HTMLInputElement>(null);
  const addressRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (e: any) => {
    e.preventDefault();

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
        <input type="text" placeholder="Full Name" ref={nameRef} required />
        <input type="text" placeholder="Phone No." ref={phoneRef} required />
        <span className="spans">
          Gender{" "}
          <select ref={genderRef} required>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
        </span>
        <span className="spans">
          Date of Birth{" "}
          <input
            type="date"
            placeholder="Date of Birth"
            ref={dobRef}
            required
          />
        </span>
        <span className="spans">
          Blood Group{" "}
          <select ref={bloodGroupRef} required>
            <option value="A+ve">A +ve</option>
            <option value="B+ve">B +ve</option>
            <option value="O+ve">O +ve</option>
            <option value="AB+ve">AB +ve</option>
            <option value="A-ve">A -ve</option>
            <option value="B-ve">B -ve</option>
            <option value="O-ve">O -ve</option>
            <option value="AB-ve">AB -ve</option>
          </select>
        </span>
        <input type="text" placeholder="Area" ref={areaRef} required />
        <input type="text" placeholder="Address" ref={addressRef} required />
        <input type="email" placeholder="Email" ref={emailRef} required />
        <input
          type="password"
          placeholder="Password"
          ref={passwordRef}
          required
        />
        <button type="submit">Signup</button>
      </form>
      <div className="links">
        <a href="/">Homepage</a>
        <a href="/login">Login</a>
      </div>
    </div>
  );
}
