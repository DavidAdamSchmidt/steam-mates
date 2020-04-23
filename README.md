# SteamMates

SteamMates is a web application that helps you find the best games you and your friends can play together on Steam.

The project is still in development. You can find the newest stable version on the `master` branch, or checkout any of the other branches to see future improvements and/or upcoming features.

**Current features include:**
* Steam OpenID 2.0 authentication.
* Selecting up to 3 friends.
* Displaying commonly owned multiplayer and/or co-op games.
* Rating games on a 1-5 scale.
* Filtering and ordering games by multiple criteria.
* Displaying detailed info of each game on a separate page.

## Demo

A deployed version is available at https://steammates.azurewebsites.net/

## Getting Started

### Required Technologies
* [.NET Core 3.1](https://dotnet.microsoft.com/download/dotnet-core/3.1)
* [Node.js](https://nodejs.org/en/)
* [Microsoft SQL Server](https://www.microsoft.com/en-us/sql-server/sql-server-downloads)

### Steam Requirements

To use the application, you need a **Steam account** and a **Steam Web API Key**.

#### Registering a Steam account

If you don't have a Steam account yet, you can [register](https://store.steampowered.com/join) one for free.

#### Requesting a Steam Web API Key

After logging in to Steam with your account, you can [request](https://steamcommunity.com/dev/apikey) a Steam Web API Key from Valve (enter `localhost` in the _Domain Name_ field). Please note that this key can not be shared with anyone and protecting it is your own responsibility. For more information, see [Steam Web API Terms of Use](https://steamcommunity.com/dev/apiterms).

### Setup

1. Clone the repository.
2. Open the project in Visual Studio 2019 or Rider.
3. Setup the database.
    * Visual Studio 2019:
        * Select _Tools -> NuGet Package Manager -> Package Manager Console_.
        * Execute the following command:
            ```
            Update-Database
            ```
    * Rider:
        * Open the CLI.
        * Install `dotnet ef`:
            ```
            dotnet tool install --global dotnet-ef
            ```
        * Execute the following command in the project's directory:
            ```
            dotnet ef database update
            ```
4. Open your [User Secrets](https://docs.microsoft.com/en-us/aspnet/core/security/app-secrets) file.
    * Visual Studio 2019:
        * In the _Solution Explorer_, right-click on the project and select _Manage User Secrets_.
    * Rider:
        * Install the [.NET Core User Secrets](https://plugins.jetbrains.com/plugin/10183--net-core-user-secrets) plugin.
        * In the _Solution Explorer_, right-click on the project and select _Tools -> Open Project User Secrets_.
5. Add your Steam Web API Key to secrets.json:
    ```json
    {
      "SteamApiKey": "YOUR API KEY"
    }
    ```
6. Run the `IIS Express` profile.

## Planned Features
* Hiding games and friends upon demand.
* Allow force-refreshing libraries and tags (these are cached on the server).
* Option to remove existing ratings.
* Improved game comparison with friends.
