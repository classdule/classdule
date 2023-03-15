FROM node:18

WORKDIR /app/server

COPY package.json ./
COPY pnpm-lock.yaml ./

RUN npm install -g pnpm
RUN pnpm install

COPY . .

RUN pnpm build
RUN pnpm prisma:generate

EXPOSE 3000

CMD ["pnpm", "start"]