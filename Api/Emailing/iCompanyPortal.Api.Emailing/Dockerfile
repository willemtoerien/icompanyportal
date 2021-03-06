#See https://aka.ms/containerfastmode to understand how Visual Studio uses this Dockerfile to build your images for faster debugging.

FROM mcr.microsoft.com/dotnet/core/aspnet:3.1-buster-slim AS base
WORKDIR /app
EXPOSE 80
EXPOSE 443

FROM mcr.microsoft.com/dotnet/core/sdk:3.1-buster AS build
WORKDIR /src
COPY ["Api/Emailing/iCompanyPortal.Api.Emailing/iCompanyPortal.Api.Emailing.csproj", "Api/Emailing/iCompanyPortal.Api.Emailing/"]
COPY ["Api/Shared/iCompanyPortal.Api.Shared/iCompanyPortal.Api.Shared.csproj", "Api/Shared/iCompanyPortal.Api.Shared/"]
COPY ["Api/Emailing/iCompanyPortal.Api.Emailing.Client/iCompanyPortal.Api.Emailing.Client.csproj", "Api/Emailing/iCompanyPortal.Api.Emailing.Client/"]
COPY ["Api/Shared/iCompanyPortal.Api.HttpHelpers/iCompanyPortal.Api.HttpHelpers.csproj", "Api/Shared/iCompanyPortal.Api.HttpHelpers/"]
RUN dotnet restore "Api/Emailing/iCompanyPortal.Api.Emailing/iCompanyPortal.Api.Emailing.csproj"
COPY . .
WORKDIR "/src/Api/Emailing/iCompanyPortal.Api.Emailing"
RUN dotnet build "iCompanyPortal.Api.Emailing.csproj" -c Release -o /app/build
RUN dotnet test "iCompanyPortal.Api.Emailing.UnitTests.csproj" -c Release

FROM build AS publish
RUN dotnet publish "iCompanyPortal.Api.Emailing.csproj" -c Release -o /app/publish

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "iCompanyPortal.Api.Emailing.dll"]
