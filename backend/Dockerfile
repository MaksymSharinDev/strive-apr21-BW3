FROM node:14
WORKDIR /usr/src/backend
COPY package*.json ./
RUN npm install
RUN npm install -g puppeteer --unsafe-perm=true --allow-root
COPY . .
EXPOSE 5000
CMD ["node", "app.js"]

