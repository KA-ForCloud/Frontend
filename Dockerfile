FROM node:alpine as builder
WORKDIR /app
ENV PATH /app/node_moduels/.bin:$PATH

COPY . /app/
RUN npm install --legacy-peer-deps
RUN npm run build

FROM nginx:latest
RUN rm -rf /etc/nginx/conf.d/default.conf
COPY ./nginx.conf /etc/nginx/conf.d/default.conf
COPY ./certificate.crt /etc/nginx/certificate.crt
COPY ./private.key /etc/nginx/private.key
COPY --from=builder /app/build /usr/share/nginx/html
EXPOSE 80 443
CMD [ "nginx", "-g", "daemon off;" ]