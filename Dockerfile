FROM node:16.20-alpine3.18 as base
RUN npm i -g pnpm

FROM base as build
# 设置工作目录
WORKDIR /usr/src/app

# 复制依赖文件并安装依赖
COPY package*.json ./
RUN pnpm install

# 复制应用程序代码
COPY . .

# 暴露应用程序监听的端口
EXPOSE 80

# 定义容器启动时的命令
CMD ["pnpm", "start"]
