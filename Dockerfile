FROM node:lts AS base
WORKDIR /app

COPY package.json package-lock.json ./

FROM base AS build
# Install dependencies (includes native deps like better-sqlite3)
RUN npm ci

COPY . .
# Create the data directory for the database
RUN mkdir -p /app/data
RUN npm run build

FROM base AS runtime
WORKDIR /app

# Reinstall dependencies in runtime so native modules
# (like better-sqlite3) are compiled for the correct libc
COPY package.json package-lock.json ./
RUN npm ci --omit=dev

COPY --from=build /app/dist ./dist

# Move the drizzle directory to the runtime image
COPY --from=build /app/drizzle ./drizzle

# Move the litestream binary to the runtime image from the litestream image
# You can use a specific version of litestream by changing the tag
# COPY --from=litestream/litestream:0.3.13 /usr/local/bin/litestream /usr/local/bin/litestream
COPY --from=litestream/litestream:latest /usr/local/bin/litestream /usr/local/bin/litestream

# Move the run script and litestream config to the runtime image
COPY --from=build /app/scripts/run.sh run.sh
RUN chmod +x run.sh

COPY --from=build /app/litestream.yml /etc/litestream.yml

# Create the data directory at runtime as well
# (runtime is a fresh image, build-time dirs do not persist)
RUN mkdir -p /app/data

ENV HOST=0.0.0.0
ENV PORT=4321
ENV NODE_ENV=production

EXPOSE 4321
CMD ["sh", "run.sh"]
