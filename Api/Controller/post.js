import { db } from "./../db.js";
export const getpost = (req, res) => {
  const q = req.body.cat
    ? "select * from post where cat=?"
    : "select * from post";
  db.query(q, [req.body.cat], (err, results) => {
    if (err) return console.log(err);
    if (results) return res.json(results);
  });
};

//single
export const getsinglepost = (req, res) => {
  console.log(req.body.id);
  const q =
    "select * from post where post.id = ? ";
  db.query(q, [req.params.id], (err, result) => {
    if (err) return res.json("Error while joing tables");
    if (result) return res.json(result);
  });
};

export const addpost = (req, res) => {
  console.log(req.body);

  const q =
  "INSERT INTO post(`title`, `desc`, `img`, `cat`, `date`,`uid`) VALUES (?)";
  const values = [
    req.body.title,
    req.body.desc,
    req.body.img,
    req.body.cat,
    req.body.date,
    '1'
    

  ];
  db.query(
    q,
    [values],
    (err, results) => {
      
      if (err) return console.log(err);
      // res.status(404).json("Error while publshing the blog");
      if (results) return res.status(200).json("Successfully Published");
    }
  );


};
export const deletepost = (req, res) => {
  const q = req.params.id ? "DELETE from post where post.id = ?"  :"";
  db.query(q, [req.params.id], (err, result) => {
    if (err) return res.status(404).json("error while deletin");
    if (result) return res.status(200).json("Deleted Succesfuly");
  });
};
export const updatepost = (req, res) => {
  const q =
    "UPDATE POST set  `title` =?, `desc` =?, `cat` = ?, `img` = ? WHERE `id` = ?   ";

  const Values = [req.body.title, req.body.desc, req.body.cat, req.body.img];
  db.query(q, [Values], (err, results) => {
    if (err) return console.log(err);
    res.status(404).json("Error while publshing the blog");
    if (results) return res.status(200).json("Successfully Published");
  });
};
