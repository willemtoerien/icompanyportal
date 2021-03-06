# iCompanyPortal

## Contents

1. Introduction
1. Requirements
1. Prepare
1. Build
   1. API
   1. Apps

## 1. Introduction

iCompanyPortal is an ongoing project built from scratch with basic functionalities for a company portal. It was designed with a microservice architecture in mind. For a details on the architecture, you can see the [iCompanyPortal.pdf](https://github.com/willemtoerien/icompanyportal/blob/master/Documentation/iCompanyPortal.pdf) file. It uses the [c4model](https://c4model.com/) for views.

## 2. Requirements

In order to build the project you need to have the following software installed.

- [git-scm](https://git-scm.com/download/win)
- [Visual Studio Community](https://visualstudio.microsoft.com/vs/community/)
- [Visual Studio Code](https://code.visualstudio.com/)
- [Docker](https://docs.docker.com/docker-for-windows/install/)
- [Node.js](https://nodejs.org/en/)

## 3. Prepare

After you installed Git, the Visual Studio's and Docker, proceed to install [Microsoft SQL Server](https://hub.docker.com/_/microsoft-mssql-server).

```cmd
docker pull mcr.microsoft.com/mssql/server
docker run -e 'ACCEPT_EULA=Y' -e 'SA_PASSWORD=Password1*' -p 1433:1433 -d mcr.microsoft.com/mssql/server:2017-latest
```

## 4. Build

There are two parts of building the project: the API and the App.

### 4.1. API

To build the API's, simply open the iCompanyPortal.sln file and build it.

### 4.2 Apps

To build the APP, run the following in the terminal.

```cmd
npm install
npm install -g @angular/cli
npm run build:libraries
ng build app
ng build
```

Should you want to build and run the docker images.

For the functional application.

```cmd
npm run build:app
npm run run:app
```

For the SEO application.

```cmd
npm run build
npm run run
```
