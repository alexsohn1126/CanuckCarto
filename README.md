# CanuckCarto

Check out the website [here](https://canuckcarto.ca/)

[![ko-fi](https://ko-fi.com/img/githubbutton_sm.svg)](https://ko-fi.com/X8X31BROYE) [<img src="public/discord-mark.svg" width="50" />](https://discord.gg/TTMSuJ8YwZ)

## Table of Contents

1. [Introduction](#introduction)
2. [Contributing](#contributing)
3. [Developing](#developing)
4. [Canadianness](#canadianness)
5. [Others](#others)

## Introduction

![CanuckCarto Logo](./public/logo.png)

Welcome to the Github repository for CanuckCarto! I made this website to allow Canadians who are boycotting United States companies.

First of all, thanks to OpenStreetMap for providing me with all this information, and Overpass API for making it easy to access these information.

Along with that, I also have created a very minimal Express Backend to provide an API for the location to brand mapping.

This project is hosted in a VPS by Servarica, a Montréal based VPS hosting company.

## Developing

To run this project (assuming you have cloned the repo):

Make sure to `chmod +x *.sh` to allow the scripts to run.

1. (Optional) Download and run your own Overpass API instance. Check [OSM wiki on installing and running](https://wiki.openstreetmap.org/wiki/Overpass_API/Installation) Overpass API.
2. (Optional) Run `fetchData.sh`
3. (Optional) Run `processData.sh`.
4. Run `npm install` to download all the necesary packages
5. Run `npm run dev`. Now, you should be able to access `localhost:5173` to access the website.

This app uses Leaflet along with React. It uses this amazing package called [React Leaflet](https://react-leaflet.js.org/), which provides React components for Leaflet maps.

During the development, I have extensively used [Devenv](https://devenv.sh/) to manage project dependencies and scripts. This should be optional for developing or running this project locally. But just make sure that you have the packages installed in `devenv.nix`, under `packages` (such as `jq`).

## Contributing

Please check out [CONTRIBUTING.md](CONTRIBUTING.md) on how to contribute to this project.

## Canadianness

To let the users know which businesses are Canadian, I have used a "Canadianness" scale, a number from 1 to 3.

I do not have a clear definition each of these categories, but here is my best justification for putting a company in one of those 3 categories.

- 3: The company is fully Canadian, or its parent company is fully Canadian.
- 2: The company is not Canadian, or partially Canadian. Or it has manufacturing facilities in Canada.
- 1: The company is not Canadian, nor does it have any manufacturing facilities in Canada.

Please note that the information I have written down may be completely inaccurate. If you think I am wrong, please check out [CONTRIBUTING.md](CONTRIBUTING.md) to see what you can do to help!

## Others

If you liked this project, please consider donating me via [Ko-Fi](https://ko-fi.com/alexsohn). I am also looking for a Junior software developer position, so if you would like to hire me, shoot me a message on [LinkedIn](https://ko-fi.com/alexsohn)!
