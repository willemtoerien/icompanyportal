FROM node as build

WORKDIR /app
COPY ./package.json /app/package.json
RUN npm install -g @angular/cli
RUN npm install
COPY . /app

RUN ng build

FROM nginx
COPY --from=build /app/dist/app /usr/share/nginx/html
EXPOSE 80
ENTRYPOINT ["nginx", "-g", "daemon off;"]