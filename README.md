# HMRDiscordBot

A General-Use Chat-Bot for Discord

## Table of Contents

* [About](#about)
* [Features](#features)
* [Pre-requisites](#pre-requisites)
* [Setup](#setup)
* [Running the Application](#running-the-application)
* [Using Nodemon](#using-nodemon)
* [License](#license)

## About

HMRDiscordBot is a general-use chat-bot designed for the social platform Discord. It is built with a variety of features to enhance user experience and provide a comprehensive set of tools for server management.

## Features
*   Command handling
*   Event handling
*   User management
*   Server management
*   Economy system
*   Item management

## Pre-requisites

Before running the application, ensure you have the following installed on your computer:

*   Node.js
*   npm (Node Package Manager)

## Setup

1.  Install all dependencies using the following command:
    ```
    npm i
    ```

## Running the Application

To start the application, navigate to the base folder and run the following command:
```
node .
```

### ALTERNATIVE: Using Nodemon

To use Nodemon for seamless modification and restarting of the application, run the following command:
```
nodemon . --ignore ./config.json --ignore ./deploy-commands.js --ignore ./data/economy/economy.json --ignore ./data/economy/items.json --ignore ./data/economy/econSettings.json
```

## License
-------

HMRDiscordBot is licensed under the [MIT License](https://opensource.org/licenses/MIT).