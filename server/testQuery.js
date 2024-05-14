const mongoose = require("mongoose");
const todoVue = require("./models").Todo;
const Student = require("./models").Student;

const dbName = "mongodb://127.0.0.1:27017/todoVueDB";
// const dbName = "mongodb://127.0.0.1:27017/exampleDB";
(async () => {
  try {
    await mongoose.connect(dbName);
    console.log("成功連接到MongoDB!");

    // 执行查询
    const result = await todoVue.find({}).exec();
    console.log("查詢成功:", result);

    // 断开数据库连接
    await mongoose.disconnect();
  } catch (err) {
    console.error("連接 MongoDB 失敗:", err);
  }
})();
