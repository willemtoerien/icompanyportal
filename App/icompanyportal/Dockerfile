FROM node as build

RUN wget -q -O - https://dl-ssl.google.com/linux/linux_signing_key.pub | apt-key add -
RUN sh -c 'echo "deb [arch=amd64] http://dl.google.com/linux/chrome/deb/ stable main" >> /etc/apt/sources.list.d/google.list'
RUN apt-get update && apt-get install -yq google-chrome-stable

WORKDIR /app
COPY ./package.json /app/package.json
RUN npm install -g @angular/cli
RUN npm install
COPY . /app

# RUN ng test emailing-api --watch=false
RUN ng build emailing-api
RUN ng test utils --watch=false
RUN ng build utils
RUN ng test forms-ex --watch=false
RUN ng build forms-ex
# RUN ng build --watch=false
RUN npm run build:ssr

ENTRYPOINT ["npm", "run", "serve:ssr"]