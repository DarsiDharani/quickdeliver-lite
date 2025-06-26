import axios from "axios";

export async function login(email, password) {
  const res = await axios.post(
    "https://quickdeliver-lite.onrender.com/api/auth/login",
    { email, password },
    { withCredentials: true }
  );
  return res.data;
}

export async function register({ name, email, password,phone, role }) {
  const res = await axios.post(
    "https://quickdeliver-lite.onrender.com/api/auth/register",
    { name, email, password,phone, role },
    { withCredentials: true }
  );
  return res.data;
}

export async function logout() {
  await axios.post("https://quickdeliver-lite.onrender.com/api/auth/logout", {}, { withCredentials: true });
}
