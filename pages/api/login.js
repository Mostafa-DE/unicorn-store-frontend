import cookie from "cookie";
import { API_URL } from "@/config/index";

const loginApi = async (req, res) => {
  if (req.method === "POST") {
    const { identifier, password } = req.body;
    const loginUserInStrapi = await fetch(`${API_URL}/auth/local`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        identifier,
        password,
      }),
    });

    const data = loginUserInStrapi.json();
    if (loginUserInStrapi.ok) {
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
        message: "Email or password invalid, Please try again !!",
      });
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).json({ message: `Method ${req.method} not allowed` });
  }
};

export default loginApi;
