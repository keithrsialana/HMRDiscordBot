# HMRDiscordBot
Creating a chatbot for a the social platform 'Discord'

## Setup
On the event that the project does not already include the required modules, download these modules.

Note: Some API calls didn't have the option to recieve requests from the request module, so axios was needed to fix this problem.
```
npm install discord.js request axios
```
### Optional
You can use nodemon to seamlessly modify command files and restart the application whenever you press CTRL+S when saving a file.


## Running the application
Use this from the base folder
```
node .
```

### ALTERNATIVE: Using NodeMon
Use this to start the process:
```
nodemon . --ignore ./config.json --ignore ./deploy-commands.js --ignore ./data/economy/economy.json --ignore ./data/economy/items.json --ignore ./data/economy/econSettings.json
```
