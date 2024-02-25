FROM node:20
RUN mkdir -p /home/src/api
WORKDIR /home/src/web
COPY package*.json .
RUN npm ci
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "start" ]

