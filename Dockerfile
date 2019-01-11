FROM node:10.13-alpine
MAINTAINER ZQian<zqiannnn@gmail.com>

WORKDIR /app

COPY . /app/

RUN rm -rf /app/node_modules

RUN npm install

ENV BACKEND_HOST=zuul
ENV BACKEND_PORT=5555
ENV PORT=80


EXPOSE 80

ENTRYPOINT ["npm"]

CMD ["run", "dev"]


