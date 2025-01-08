# HMRDiscordBot
A general-use chat-bot for a the social platform 'Discord' complete with many features

## Pre-requisites
Make sure to have these already installed on your computer:
- node.js
- npm 

## Setup
1. Install all Dependencies using
```
npm i
```
### Optional
You can use nodemon to seamlessly modify command files and restart the application whenever you press CTRL+S when saving a file.

## Running the application
Use this from the base folder
```
node .
```

### ALTERNATIVE: Using Nodemon
Use this to start the process:
```
nodemon . --ignore ./config.json --ignore ./deploy-commands.js --ignore ./data/economy/economy.json --ignore ./data/economy/items.json --ignore ./data/economy/econSettings.json
```
