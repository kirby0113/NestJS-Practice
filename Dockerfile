# ローカルと合わせておく
FROM node:16.14.0-alpine

# 任意のtime zone設定にする
ENV TZ=Asia/Tokyo
RUN apk --no-cache add tzdata && \
    ln -snf /usr/share/zoneinfo/$TZ /etc/localtime && echo $TZ > /etc/timezone

WORKDIR /

COPY package.json .
COPY package-lock.json .
COPY tsconfig.build.json ./
COPY tsconfig.json ./

RUN npm ci

EXPOSE 3000

ENTRYPOINT [ "npm", "run", "build:deploy" ]