FROM node:8.12-alpine
MAINTAINER ZQian<zqiannnn@gmail.com>

WORKDIR /app

COPY . /app/

RUN rm -rf node_modules
RUN npm install


EXPOSE 9527

ENTRYPOINT ["npm"]

CMD ["run", "sit"]


