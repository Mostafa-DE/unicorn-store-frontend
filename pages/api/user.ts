import cookie from "cookie";
import { API_URL } from "@/config/index";

const existUserApi = async (req, res) => {
  if (req.method === "GET") {
    if (!req.headers.cookie) {
      return res.status(403).json({ message: "Not Authorized" });
    }
    const { token } = cookie.parse(req.headers.cookie);

    const getUserFromStrapi = await fetch(`${API_URL}/users/me`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const user = await getUserFromStrapi.json();
    if (getUserFromStrapi.ok) {
      res.status(200).json({ user });
    }
  } else {
    res.setHeader("Allow", ["GET"]);
    res.status(405).json({ message: `Method ${req.method} not allowed` });
  }
};

export default existUserApi;
