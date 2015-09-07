FROM node:0.12

ADD . /src
WORKDIR /src
RUN npm install
EXPOSE 5000
CMD ["npm", "start"]
