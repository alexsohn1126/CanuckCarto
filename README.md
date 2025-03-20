# CanuckCarto

[![ko-fi](https://ko-fi.com/img/githubbutton_sm.svg)](https://ko-fi.com/X8X31BROYE)

## Table of Contents

1. [Introduction](#introduction)
2. [Contributing](#contributing)
3. [Developing](#developing)
4. [Others](#others)

## Introduction

![CanuckCarto Logo](./public/logo.png)

Welcome to the Github repository for CanuckCarto! I made this website to allow Canadians who are boycotting United States companies.

First of all, thanks to OpenStreetMap for providing me with all this information, and Overpass API for making it easy to access these information.

Along with that, I also have created a very minimal Express Backend to provide an API for the location to brand mapping.

This project is hosted in a VPS by Servarica, a Montréal based VPS hosting company.

## Developing

To run this project (assuming you have cloned the repo):

Make sure to `chmod +x *.sh` to allow the scripts to run.

1. (Optional) Run `fetchData.sh`

- If some queries failed, you can retry queries by running `retryQuery.sh`, with the path to `.overpassql` files as arguments (as many as you want)

2. Run `processData.sh`.
3. Run `npm install` to download all the necesary packages
4. Run `npm run dev`. Now, you should be able to access `localhost:5173` to access the website.

This app uses Leaflet along with React. It uses this amazing package called [React Leaflet](https://react-leaflet.js.org/), which provides React components for Leaflet maps.

During the development, I have extensively used [Devenv](https://devenv.sh/) to manage project dependencies and scripts. This should be optional for developing or running this project locally. But just make sure that you have the packages installed in `devenv.nix`, under `packages` (such as `jq`).

I used shell scripts to automatically download and format data from [Overpass API](https://overpass-api.de/). It takes the list of shops in `./data/american_shops.json`, and separates it into chunks of 5 names per query, and we run them parallel so it goes faster. It is currently set to 4 parallel commands at the same time, but if you want to, you can increase it. However, I did encounter a rate limit error when I tried running 5 or more curl commands parallelly.

## Contributing

This is my personal project, but if you would like to contribute, or raise any concerns/issues, I will be glad to take it into consideration! For that, please create a new issue in this repository.

## Others

If you liked this project, please consider donating me via [Ko-Fi](https://ko-fi.com/alexsohn). I am also looking for a Junior software developer position, so if you would like to hire me, shoot me a message on [LinkedIn](https://ko-fi.com/alexsohn)!
