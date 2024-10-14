#See https://aka.ms/customizecontainer to learn how to customize your debug container and how Visual Studio uses this Dockerfile to build your images for faster debugging.

FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS base
WORKDIR /app
EXPOSE 80
EXPOSE 443

FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /src
COPY ["{{COMPANY_NAME}}.{{MICROSERVICE_NAME}}.{{SERVICE_NAME}}.WebApi/{{COMPANY_NAME}}.{{MICROSERVICE_NAME}}.{{SERVICE_NAME}}.WebApi.csproj", "src/{{COMPANY_NAME}}.{{MICROSERVICE_NAME}}.{{SERVICE_NAME}}.WebApi/"]
RUN dotnet restore "src/{{COMPANY_NAME}}.{{MICROSERVICE_NAME}}.{{SERVICE_NAME}}.WebApi/{{COMPANY_NAME}}.{{MICROSERVICE_NAME}}.{{SERVICE_NAME}}.WebApi.csproj"
COPY . .
WORKDIR "/src/{{COMPANY_NAME}}.{{MICROSERVICE_NAME}}.{{SERVICE_NAME}}.WebApi"
RUN dotnet build "{{COMPANY_NAME}}.{{MICROSERVICE_NAME}}.{{SERVICE_NAME}}.WebApi.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "{{COMPANY_NAME}}.{{MICROSERVICE_NAME}}.{{SERVICE_NAME}}.WebApi.csproj" -c Release -o /app/publish /p:UseAppHost=false

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "{{COMPANY_NAME}}.{{MICROSERVICE_NAME}}.{{SERVICE_NAME}}.WebApi.dll"]