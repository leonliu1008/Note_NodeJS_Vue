# 使用官方的 Node.js 映像作為基礎
FROM node:14

# 設定工作目錄
WORKDIR /app

# 將 package.json 和 package-lock.json 複製到工作目錄
COPY package*.json ./

# 安裝相依套件
RUN npm install

# 複製所有內容到工作目錄
COPY . .

# 暴露容器的 8081 端口（Vue CLI 預設的開發端口）
EXPOSE 8081

# 啟動應用程序
CMD ["npm", "run", "serve"]