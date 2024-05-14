const router = require("express").Router();
const todoVue = require("../models").Todo;
const multer = require("multer");
const cors = require("cors");

// 在路由上使用 CORS 中間件
router.use(cors());

router.use((req, res, next) => {
  console.log("CRUD route 正在接受一個require..");
  next();
});

router.get("/", async (req, res) => {
  return res.send("CRUD ToDo List!");
});

router.get("/api/todoapp/GetNote", async (req, res) => {
  try {
    const result = await todoVue.find({});
    // console.log(result);
    return res.send(result);
  } catch (e) {
    console.log(e);
    return res.status(500).send("Internal Server Error");
  }
});

router.post("/api/todoapp/AddNote", multer().none(), async (req, res) => {
  try {
    // 讀取collection裡面的數量
    const numOfDocs = await todoVue.countDocuments();
    // 建立新的文檔
    const newNote = new todoVue({
      id: (numOfDocs + 1).toString(),
      description: req.body.newNotes,
    });
    // console.log(newNote);
    //插入新的文檔
    let saveNote = await newNote.save();
    console.log(saveNote);
    return res.json("Add Successfully");
  } catch (e) {
    console.error("Add note failed:", e);
    return res.status(500).send("Internal Server Error");
  }
});

router.put("/api/todoapp/updateNote", async (req, res) => {
  // console.log(req.query);
  try {
    let updateResult = await todoVue.findOneAndUpdate(
      {
        id: req.query.id,
      },
      {
        $set: { description: req.query.description },
      }
    );
    // console.log(updateResult);
    res.json("Update Successfully");
  } catch (e) {
    console.log("Update Error : " + e);
    return res.status(500).send("Update Error : " + e);
  }
});

router.delete("/api/todoapp/DeleteNote", async (req, res) => {
  // console.log(req.query.id);
  try {
    let deleteResult = await todoVue.deleteOne({
      id: req.query.id,
    });
    // console.log(deleteResult);
    res.json("Delete Successfully");
  } catch (e) {
    console.log("delete Error : " + e);
    return res.status(500).send("delete Error : " + e);
  }
});

module.exports = router;
