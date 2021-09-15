import cookie from "cookie";
import { API_URL } from "@/config/index";

const registerApi = async (req, res) => {
  if (req.method === "POST") {
    const { username, email, password, phone, address } = req.body;
    const createUserInStrapi = await fetch(`${API_URL}/auth/local/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username,
        email,
        password,
        phone,
        address,
      }),
    });

    const data = createUserInStrapi.json();
    if (createUserInStrapi.ok) {
      //Set a Cookie for a week
      res.setHeader(
        "Set-Cookie",
        cookie.serialize("token", data.jwt, {
          httpOnly: true,
          secure: process.env.NODE_ENV !== "development",
          maxAge: 60 * 60 * 24 * 7,
          sameSite: "strict",
          path: "/",
        })
      );

      return res.status(200).json({ user: data.user });
    } else {
      return res.status(data.statusCode).json({
        message:
          "Email must not be exist before, and username must be unique, please check and try again!!",
      });
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).json({ message: `Method ${req.method} not allowed` });
  }
};

export default registerApi;
