# Twitch Play Sounds

Twitch play sounds is a twitch-chatbot, that allows streamer to easily add and remove commands which plays certain sound effect to stream. 

## Requirements:

Project local json as database so no external database is needed.

* Node.JS (tested on LTS 10.16.0)
* NPM

## Setup:

1. Clone this repo.
2. Run `npm intall` in both `/client` and `/server`.
3. Rename `.env.example` to `.env` and change settings on your needs.
4. Run `npm run production` in `/server`.
* When running second time, only `npm run server` is needed.

## Usage:

Application opens (by default) to port 8080 so by going to `http://localhost:8080` you can access dashboard. After you get access to dashboard, go to `connections` tab and connect your twitch user into dashboard. When it's successfully connected, go to sounds manager and start adding sound effects. NOTE that only `.mp3` files are currently supported! After you have added command, open `http://localhost:8080/player` as tab or in OBS Browser.

## Images:

![Sound Manager](https://i.imgur.com/0ByIWs8.png)
![Connections](https://i.imgur.com/36DMmSL.png)
![Home](https://i.imgur.com/fJD9RjM.png)