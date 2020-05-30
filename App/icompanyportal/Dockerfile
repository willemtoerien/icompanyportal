FROM node as build

WORKDIR /app
COPY ./package.json /app/package.json
RUN npm install -g @angular/cli
RUN npm install
COPY . /app

# RUN ng test emailing-api --watch=false
RUN ng build emailing-api
# RUN ng build --watch=false
RUN npm run build:ssr

ENTRYPOINT ["npm", "run", "serve:ssr"]