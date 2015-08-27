FROM node:0.12

COPY . /src
RUN cd /src; npm install
EXPOSE 5000
CMD ["npm", "start"]
