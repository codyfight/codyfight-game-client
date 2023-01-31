# codyfight-node-lib

A library for interacting with the game API of `https://game.codyfight.com/`.

Easily implement the Codyfight game actions.

## Install

```sh
npm install codyfight-node-lib -D
```

## Usage

The constructor of the class takes an optional parameter `apiURL`, which is a string that represents the URL of the API to be used. The default value is `https://game.codyfight.com/`.

import it with the following code:

```js
import codyfightNodeLib as GameAPI from 'codyfight-node-lib'


const gameAPI = new GameAPI(apiURL);
```

## API

## Methods

---

The API has the following public methods:

### getGameConstants

This method returns an object with the game constants.

```js
const constants = gameAPI.getGameConstants()
```

### init

This method initializes a game with the given parameters and returns a Promise that resolves to the data received from the API.

```js
const data = await gameAPI.init(ckey, mode, opponent)
```

### cast

This method casts a skill with the given parameters and returns a Promise that resolves to the data received from the API.

```js
const data = await gameAPI.cast(ckey, skill_id, x, y)
```

### move

This method moves a player with the given parameters and returns a Promise that resolves to the data received from the API.

```js
const data = await gameAPI.move(ckey, x, y)
```

### check

This method checks the status of a game with the given ckey and returns a Promise that resolves to the data received from the API.

```js
const data = await gameAPI.check(ckey)
```
