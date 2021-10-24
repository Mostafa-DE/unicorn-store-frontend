import cookie from "cookie";
import { API_URL } from "@/config/index";

const registerApi = async (req, res) => {
  if (req.method === "POST") {
    const {
      username,
      email,
      password,
      phone,
      firstName,
      lastName,
      address,
      deliveryPhone,
      city,
      building,
    } = req.body;
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
        firstName,
        lastName,
        address,
        deliveryPhone,
        city,
        building,
      }),
    });

    const data = await createUserInStrapi.json();
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

      res.status(200).json({ user: data.user });
    } else {
      res.status(data.statusCode).json({
        message:
          "إسم المستخدم أو البريد الإلكتروني مستخدم من قبل, إذا كنت متأكد من أن البريد الإلكتروني غير مستخدم من قبل, يرجى المحاولة بإستخدام إسم مستخدم آخر أو قم بإضافة أرقام على آخر إسم المستخدم",
      });
    }
    res.status(200).json({});
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).json({ message: `Method ${req.method} not allowed` });
  }
};

export default registerApi;
