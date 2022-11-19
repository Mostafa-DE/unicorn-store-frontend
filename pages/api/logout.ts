import cookie from "cookie";

const logoutUserApi = async (req: any, res: any) => {
  if (req.method === "POST") {
    /*-------distroy cookie--------*/
    res.setHeader(
      "Set-Cookie",
      cookie.serialize("token", "", {
        httpOnly: true,
        secure: process.env.NODE_ENV != "development",
        expires: new Date(0),
        sameSite: "strict",
        path: "/",
      })
    );

    res.status(200).json({ message: "we hope you will back soon :( " });
    return;
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).json({ message: `Method ${req.method} not allowed` });
  }
};

export default logoutUserApi;
