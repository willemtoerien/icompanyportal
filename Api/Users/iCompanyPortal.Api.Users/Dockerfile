#See https://aka.ms/containerfastmode to understand how Visual Studio uses this Dockerfile to build your images for faster debugging.

FROM mcr.microsoft.com/dotnet/core/aspnet:3.1-buster-slim AS base
WORKDIR /app
EXPOSE 80
EXPOSE 443

FROM mcr.microsoft.com/dotnet/core/sdk:3.1-buster AS build
WORKDIR /src
COPY ["Api/Users/iCompanyPortal.Api.Users/iCompanyPortal.Api.Users.csproj", "Api/Users/iCompanyPortal.Api.Users/"]
COPY ["Api/Users/iCompanyPortal.Api.Users.Shared/iCompanyPortal.Api.Users.Shared.csproj", "Api/Users/iCompanyPortal.Api.Users.Shared/"]
COPY ["Api/Shared/iCompanyPortal.Api.Shared/iCompanyPortal.Api.Shared.csproj", "Api/Shared/iCompanyPortal.Api.Shared/"]
COPY ["Api/Companies/iCompanyPortal.Api.Companies.Client/iCompanyPortal.Api.Companies.Client.csproj", "Api/Companies/iCompanyPortal.Api.Companies.Client/"]
COPY ["Api/Shared/iCompanyPortal.Api.HttpHelpers/iCompanyPortal.Api.HttpHelpers.csproj", "Api/Shared/iCompanyPortal.Api.HttpHelpers/"]
COPY ["Api/Notifications/iCompanyPortal.Api.Notifications.Client/iCompanyPortal.Api.Notifications.Client.csproj", "Api/Notifications/iCompanyPortal.Api.Notifications.Client/"]
COPY ["Api/Users/iCompanyPortal.Api.Users.Client/iCompanyPortal.Api.Users.Client.csproj", "Api/Users/iCompanyPortal.Api.Users.Client/"]
COPY ["Api/Emailing/iCompanyPortal.Api.Emailing.Client/iCompanyPortal.Api.Emailing.Client.csproj", "Api/Emailing/iCompanyPortal.Api.Emailing.Client/"]
RUN dotnet restore "Api/Users/iCompanyPortal.Api.Users/iCompanyPortal.Api.Users.csproj"
COPY . .
WORKDIR "/src/Api/Users/iCompanyPortal.Api.Users"
RUN dotnet build "iCompanyPortal.Api.Users.csproj" -c Release -o /app/build
RUN dotnet test "iCompanyPortal.Api.Users.UnitTests.csproj" -c Release

FROM build AS publish
RUN dotnet publish "iCompanyPortal.Api.Users.csproj" -c Release -o /app/publish

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "iCompanyPortal.Api.Users.dll"]