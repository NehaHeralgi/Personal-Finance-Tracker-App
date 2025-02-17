# Use official .NET SDK image to build and publish the app
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /app

# Copy everything and restore dependencies
COPY . ./
RUN dotnet restore

# Build the application
RUN dotnet publish -c Release -o /out

# Use ASP.NET Core runtime for the final image
FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS runtime
WORKDIR /app
COPY --from=build /out .

# Expose the port (same as in launchSettings.json)
EXPOSE 5000
EXPOSE 5001

# Start the application
ENTRYPOINT ["dotnet", "FinanceTracker.API.dll"]
