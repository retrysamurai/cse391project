import { useEffect, useRef, useState } from "react";
const USER_GET_URL = "http://127.0.0.1:4400/users/get";
// const REQ_GET_URL = "http://127.0.0.1:4400/request/get";
const REQ_POST_URL = "http://127.0.0.1:4400/request/create";
const DON_GET_URL = "http://127.0.0.1:4400/donate/get";
const DON_POST_URL = "http://127.0.0.1:4400/donate/create";
const DON_UPDTE_URL = "http://127.0.0.1:4400/donate/update";
import { Navbar } from "../components/Navbar";

interface User {
  _id: string;
  userId: string;
  name: string;
  phone: string;
  gender: string;
  bloodGroup: string;
  area: string;
  address: string;
  email: string;
  __v: number;
}

interface Donate {
  _id: string;
  donateId: string;
  receiverId: string;
  bloodGroup: string;
  donationDate: string;
  donationBank: string;
}

export function Dashboard() {
  const bloodGroupRef = useRef<HTMLSelectElement>(null);
  const donateRef = useRef<HTMLSelectElement>(null);

  const [hasToken, setHasToken] = useState(
    localStorage.getItem("token") !== null
  );

  const [userList, setUserList] = useState<User[]>([]);
  const [donList, setDonList] = useState<Donate[]>([]);

  const fetchUsers = () => {
    const link = new URL(USER_GET_URL);
    if (
      bloodGroupRef.current?.value !== undefined &&
      bloodGroupRef.current?.value !== "all"
    ) {
      link.searchParams.append("bloodGroup", bloodGroupRef.current?.value);
    }

    fetch(link, { method: "GET" })
      .then((response) => response.json())
      .then((response) => {
        setUserList(response.users);
      })
      .catch((err) => console.error(err));
  };

  const fetchDonates = () => {
    fetch(DON_GET_URL, { method: "GET" })
      .then((response) => response.json())
      .then((response) => {
        setDonList(response.donateBloods);
      })
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    fetchUsers();
    fetchDonates();
  }, []);

  const processReq = (user: User) => {
    fetch(REQ_POST_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("token") as string,
      },
      body: JSON.stringify({
        responderId: user.userId,
        reqBloodGroup: localStorage.getItem("bloodGroup"),
        resBloodGroup: user.bloodGroup,
        area: user.area,
        reqDate: new Date(),
      }),
    });
  };

  const processDon = () => {
    fetch(DON_UPDTE_URL, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("token") as string,
      },
      body: JSON.stringify({
        receiverId: localStorage.getItem("userId"),
      }),
    });
  };

  const processDonate = (e: any) => {
    e.preventDefault();

    fetch(DON_POST_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("token") as string,
      },
      body: JSON.stringify({
        bloodGroup: localStorage.getItem("bloodGroup"),
        donationDate: new Date(),
        donationBank: donateRef.current?.value,
      }),
    });
  };

  return hasToken ? (
    <div className="container">
      <Navbar />
      <div className="main-panel">
        <div className="sidebar">
          <div className="image"></div>
          <p>Welcome, {localStorage.getItem("name")}</p>
          <p>Blood Group: {localStorage.getItem("bloodGroup")}</p>
          <p>Last donated</p>
          <div className="requests">
            {donList
              .filter((data) => data.receiverId !== null)
              .map((data) => (
                <div className="card" key={data._id}>
                  <p>{data.donateId}</p>
                  <p>{data.bloodGroup}</p>
                  <p>{data.donationBank}</p>
                  <p>{data.donationDate}</p>
                  <button onClick={() => processDon()}>RECEIVE</button>
                </div>
              ))}
          </div>
          <form>
            <label>Donate to a Blood Bank</label>
            <select name="donate-bank" ref={donateRef}>
              <option value="" disabled selected>
                Choose a Blood Bank
              </option>
              <option value="Gulshan 1 Blood Bank">Gulshan 1 Blood Bank</option>
              <option value="Gulshan 2 Blood Bank">Gulshan 2 Blood Bank</option>
              <option value="Banani Blood Bank">Banani Blood Bank</option>
              <option value="Mohakhali Blood Bank">Mohakhali Blood Bank</option>
              <option value="Uttara Blood Bank">Uttara Blood Bank</option>
              <option value="Dhanmondi Blood Bank">Dhanmondi Blood Bank</option>
              <option value="Lalmatia Blood Bank">Lalmatia Blood Bank</option>
              <option value="Muhammadpur Blood Bank">
                Muhammadpur Blood Bank
              </option>
              <option value="Shahjadpur Blood Bank">
                Shahjadpur Blood Bank
              </option>
            </select>
            <button type="submit" onClick={processDonate}>
              Donate
            </button>
          </form>
        </div>
        <div className="forms">
          <div className="req-form">
            <p className="title">
              Request for{" "}
              <span className="blood">
                Bl{""}
                <span>
                  <img src="/images/blood.png" />
                </span>
                {""}
                od
              </span>
            </p>
            <form>
              <label>Filter by Blood Group:</label>
              <select
                name="blood-group"
                ref={bloodGroupRef}
                onChange={fetchUsers}
              >
                <option value="all">Any</option>
                <option value="A+ve">A +ve</option>
                <option value="B+ve">B +ve</option>
                <option value="O+ve">O +ve</option>
                <option value="AB+ve">AB +ve</option>
                <option value="A-ve">A -ve</option>
                <option value="B-ve">B -ve</option>
                <option value="O-ve">O -ve</option>
                <option value="AB-ve">AB -ve</option>
              </select>
            </form>
            <div className="users">
              {userList
                .filter(
                  (data) => data.userId !== localStorage.getItem("userId")
                )
                .map((data) => (
                  <div className="card" key={data._id}>
                    <p>Name: {data.name}</p>
                    <p>Blood Group: {data.bloodGroup}</p>
                    <p>Phone No.: {data.phone}</p>
                    <p>Area: {data.area}</p>
                    <p>Email: {data.email}</p>
                    <button onClick={() => processReq(data)}>REQUEST</button>
                  </div>
                ))}
            </div>
          </div>
          <div className="donate-form"></div>
        </div>
      </div>
    </div>
  ) : (
    <div className="container">
      <h1>You are not authorized to access this page without logging in</h1>
      <a href="/login">Login</a>
    </div>
  );
}
