FROM node as build

RUN wget -q -O - https://dl-ssl.google.com/linux/linux_signing_key.pub | apt-key add -
RUN sh -c 'echo "deb [arch=amd64] http://dl.google.com/linux/chrome/deb/ stable main" >> /etc/apt/sources.list.d/google.list'
RUN apt-get update && apt-get install -yq google-chrome-stable

WORKDIR /app
COPY ./package.json /app/package.json
RUN npm install -g @angular/cli
RUN npm install
COPY . /app

# RUN ng test users-api --watch=false
RUN ng build users-api
# RUN ng test notifications-api --watch=false
RUN ng build notifications-api
# RUN ng test companies-api --watch=false
RUN ng build companies-api
RUN ng test utils --watch=false
RUN ng build utils
RUN ng test forms-ex --watch=false
RUN ng build forms-ex
# RUN ng test notification-utils --watch=false
RUN ng build notification-utils
RUN ng test auth-utils --watch=false
RUN ng build auth-utils
RUN ng test company-utils --watch=false
RUN ng build company-utils
# RUN ng test app --watch=false
RUN ng build app

FROM nginx
COPY --from=build /app/dist/app /usr/share/nginx/html
EXPOSE 80
ENTRYPOINT ["nginx", "-g", "daemon off;"]