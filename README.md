# Telldus Live Dashboard
A project for visualizing data from sensors connected to Telldus cloud service made by Peter Ahlström in February 2021.

## Summary
The project consists of two part, a Node server and a client made with React. The server is a wrapper for the Telldus Cloud API for making requests and fetching sensor data. The client visualizes the data.

## Preparations
To access the Telldus Live API you need a Telldus account and an API key. Get it here: [https://api.telldus.com/keys/index](https://api.telldus.com/keys/index)

## Installation
After cloning the repository, navigate to the project directory and run:
``` sh
$ cd telldus-dashboard
$ npm install
```
This will install the dependencies for both the server and client.

## Config
Add your API keys to `config.json` in the `server/` folder. Here you can also change which port the server listen to.

## Run locally (development mode)
In the root directory run:
``` sh
$ npm start
```
This starts the server on port 3030(default).

Open a new terminal window, navigate to client directory and start the client development server:
``` sh
$ cd client
$ npm start
```
Open [http://localhost:3000](http://localhost:3000) to view the app in the browser.

## Build production code
### Server
Copy the contents of `server/` to a server and start the node server:
``` sh
$ npm start
```
Make sure the port (3030 by default) can be reached by the client.
### Client
To create an optimized build of the client code run:
``` sh
$ cd client
$ npm run build
```
The client production can now be found in the `build` folder, ready for publishing to a web server.  
#
#
# 
#
This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).