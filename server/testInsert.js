const mongoose = require("mongoose");
const { Schema } = mongoose;

// 定义 schema
const todoSchema = new Schema({
  id: { type: String },
  description: {
    type: String,
  },
});

// 创建 todo 模型
const Todo = mongoose.model("todoVue", todoSchema);

// 连接数据库
const dbName = "mongodb://127.0.0.1:27017/todoVueDB";
mongoose
  .connect(dbName)
  .then(() => {
    console.log("成功連接到MongoDB!");

    // 插入新数据
    const newData = {
      id: "1",
      description: "Test Add",
    };

    Todo.create(newData)
      .then((result) => {
        console.log("成功插入資料:", result);
      })
      .catch((error) => {
        console.error("插入資料失敗:", error);
      })
      .finally(() => {
        // 断开数据库连接
        mongoose.disconnect();
      });
  })
  .catch((error) => {
    console.error("连接 MongoDB 失败:", error);
  });
