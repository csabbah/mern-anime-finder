# mern-book-search - July 12th 2022 - Carlos Sabbah

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## Table of Contents

- [Description](#Description)
- [Installation](#Installation)
- [Local Usage](#Local-Usage)
- [Links](#Links)
- [Questions](#Questions)
- [License](#License)

##

## Description

This MERN stack application allows users to save, search up and view recommended Anime shows using data fetch via Anime DB API (https://rapidapi.com/brian.rofiq/api/anime-db/). Deployed to Vercel server and using Apollo Client, MongoDB and Mongoose, all transactions made are stored with high level authentication via tokens and JTW-decode to allow for secure access and unique data specific to each users.

## Installation

1. To install application, clone the main project via the HTTP or SSH link on github.

```
git clone
```

2. Once cloned, open the project folder in your text editor and run the following command in terminal to install all dependencies.
   Important note - You will need to run the below command in the 'root', 'client' and 'server' directory paths.

```
npm install
```

## Local-Usage

Create an '.env' file at the root directory, add 'MONGODB_URI=' followed by a valid MongoDB link via MongoAtlas. Then at the root path, run:

```
npm install
```

After all dependencies are installed, run this command:

```
npm run develop
```

## Links

[Link to live application](https://mern-anime-finder.vercel.app/)

## Built With

- React
- Apollo Client
- GraphQL
- Json web token
- Jwt-decode
- MongoDB
- Mongoose
- React-bootstrap
- Bootstrap
- Express
- Node.js
- Bcrypt
- Faker
- localStorage
- JSX / JavaScript
- HTML
- CSS

## Questions

[My portfolio](https://csabbah.github.io/Carlos-Sabbah-portfolio/)

To view my other repositories:
[Github](https://github.com/csabbah)

If you have questions about this application or general inquiry, please reach out to me via email: carlossabbah@hotmail.com

## License

This project is covered under the MIT License.
