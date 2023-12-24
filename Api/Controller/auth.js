import { db } from "../db.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import cookieParser from "cookie-parser";
const cookie = cookieParser();

export const regitser = (req, res) => {
  const q = `select * from user where email = ? OR username = ?`;

  db.query(q, [req.body.email, req.body.username], (err, data) => {
    if (err) return res.status(500).json(err);

    if (data.length) return;
    res.status(404).send("User Already Exists");
    //PASSWORD
    const salt = async () => await bcrypt.genSalt(10);
    const hash = async () => bcrypt.hash(req.body.password.toString(), salt);
    var qu =
      "INSERT INTO user (`username`,`email`, `password`) VALUES (?, ? ,?) ";

    const VALUES = [req.body.username, req.body.email, hash];
    db.query(qu, VALUES, (err, result) => {
      if (err) return;
      console.log(err);

      if (result) return;
      res.json("User has been Created");
    });
  });
};

export const login = (req, res) => {
  const q = "select * from user where username = ?";

  db.query(q, [req.body.username], (err, result) => {
    console.log(req.body.username);
    if (err) return res.json("Error occured");
    if (result.length === 0) return res.status(409).send("User doesnot Exist");

    //CHECK PASSWORD
    const ispasswordcorrecct = bcrypt.compareSync(
      req.body.password.toString(),
      result[0].password
    );
    console.log(req.body.password);

    if (!ispasswordcorrecct)
      return res.status(404).send("Wrong password for username");

    const token = jwt.sign({ id: result[0].id }, "jwtkey");
    const { password, ...other } = result[0];
    res
      .cookie("access_token", token, {
        domain: "http://localhost:5173/",
        httpOnly: true,
        secure: true,
        maxAge: 3600000,
      })
      .status(200)
      .json(other);
  });
};
export const logOut = (req, res) => {
  res
    .clearCookie("access_token", {
      samesite: "none",
      secure: true,
    })
    .status(200)
    .json("Logout Successfuly");
};
