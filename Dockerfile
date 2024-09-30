FROM node:21-alpine

RUN apk add --no-cache ffmpeg

WORKDIR /app

COPY package.json tsconfig.json ./

RUN npm install

COPY src ./src

RUN npm run build

# Expose the port
EXPOSE 3000

# Define the command to run the app
CMD ["npm", "run", "dev"]
# CMD ["sleep", "infinity"]