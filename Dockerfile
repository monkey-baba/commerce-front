FROM node:10.13-alpine
MAINTAINER ZQian<zqiannnn@gmail.com>

WORKDIR /app

COPY . /app/

RUN rm -rf node_modules
RUN npm install

ENV BACKEND=zuul


EXPOSE 9527

ENTRYPOINT ["npm"]

CMD ["run", "dev"]


