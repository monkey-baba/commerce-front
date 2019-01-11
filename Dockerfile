FROM node:10.13-alpine
MAINTAINER ZQian<zqiannnn@gmail.com>

WORKDIR /app

COPY . /app/

RUN rm -rf /app/node_modules

RUN npm install

ENV BACKEND=zuul
ENV PORT=80


EXPOSE 80

ENTRYPOINT ["npm"]

CMD ["run", "dev"]


