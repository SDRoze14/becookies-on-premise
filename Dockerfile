FROM node:10.12.0-alpine

ADD . .

RUN apk add --no-cache git

RUN npm cache clean --force
RUN npm install
RUN npm run build

# Expose the app port
EXPOSE 3000

# Start the app
ENTRYPOINT ["npm", "start"]
