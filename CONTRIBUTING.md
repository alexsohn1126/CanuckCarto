## How to Contribute

Welcome! If you are reading this, thank you for even considering to help this project grow further.

Currently, I need a lot of help labelling companies.

### If you are a non tech-savvy person

If you are unfamiliar with Github, please follow these steps:

1. Create an issue in [Github Issues](https://github.com/alexsohn1126/CanuckCarto/issues). You will need to create a Github account for this. See the top-right corner for a `Sign up` button.

2. Add a title for the change that you propose, and create it! I will try my best to respond to all of these issues.

### Documentation for a more tech-savvy person

#### Data folder

[The data folder](https://github.com/alexsohn1126/CanuckCarto/tree/master/data) contains everything that the website uses to display the information about a business.

##### `companies.json`

`companies.json` contains all of the companies that has a custom information about them.

`companies.json` contains these informations about a company:

- `description`: Mandatory. The description of the shop. Include where it is headquartered, whether it is a canadian company or something else.

- `source`: Mandatory. Where did you find this information? Currently, you can only put one link in here.

- `imageFile`: Optional. The link to the image we show users when they click on this company's marker.

- `imageAttribution`: Optional. If you have set imageFile to something, you MUST indicate the source here. This must be an HTML text, with an [anchor tag](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/a) linking to the source of the image.

Bonus points if you indicate which license the photo is under! I recommend searching through [Wikimedia Commons](https://commons.wikimedia.org/wiki/Main_Page) for the photo first. Most of my photos are from there, as they make it super easy to use the images.

- `canadianness`: Mandatory. This lets the user know how "Canadian" the company is. This changes how a company is rendered in the map. Please check out the section on "Canadianness" [README.md](README.md) on how to decide on this.

##### `shopToCompany.json`

`shopToCompany.json` deals alias of a company that we may see in the dataset.

For instance, a supermarket "ABC" might have a garden centre, which is listed as "ABC Garden Centre" in the database. We want to map this shop to the supermarket "ABC". This is what that JSON is responsible for.

The key of each entry in `shopToCompany.json` is alias in the dataset for an existing company that is listed in `companies.json`.

#### Osm-data Folder

`osm-data` folder contains everything that came from [OpenStreetMap](https://www.openstreetmap.org/about) contributors. Shoutout to them for making all of these data accessible to anyone around the world.

##### `raw-data.json`

`raw-data.json` contains the location of every business, shops in Canada, containing around 200k datapoints. It is a result of running an [Overpass API](https://wiki.openstreetmap.org/wiki/Overpass_API) query over Canada. You can see the query that I used in `fetchData.sh`.

Since this file is relatively large and contains a lot of data (~60MB), I have downloaded Canadian OSM data from [geofabrik.de](https://download.geofabrik.de/north-america/canada.html).

Then, I followed [OSM wiki on installing and running](https://wiki.openstreetmap.org/wiki/Overpass_API/Installation) queries locally.

Alternatively, you could run the query in [overpass-turbo.eu](https://overpass-turbo.eu/), however, I do not recommend it. Not only it will take long, it may overload the API for other people.

##### `processed-data.json`

`processed-data.json` is a processed version of `raw-data.json`. It is formatted to fit into [the GEOJSON Format](https://datatracker.ietf.org/doc/html/rfc7946). This is because `supercluster`, the NPM package that we use to optimize rendering of 200k datapoints use GEOJSON. It represents every shop as a GEOJSON point feature.

The process of processing `raw-data.json` to `processed-data.json` can be found in `processData.sh`. It uses [`jq`](https://jqlang.org/) to format the JSON into the GEOJSON format.

### Contributing for a more tech-savvy person

If you are reading this, congrats! You now know a lot more about this project.

I will try to respond to every PR/Issues that I can.
