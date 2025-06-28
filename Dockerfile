FROM node:22-alpine

WORKDIR /app

# Copy hanya package.json dan lockfile dulu, untuk caching install
COPY package*.json ./

RUN npm install -g pnpm
RUN pnpm install
RUN pnpm run build

# Copy seluruh source code, termasuk folder pages/app
COPY . .

# Build setelah semua file lengkap ada

EXPOSE 5010

CMD ["pnpm", "run", "start"]