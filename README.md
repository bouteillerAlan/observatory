# Observatory

## Why ?
The purpose of this platform is to allow any player with an API key to see where the characters linked to the API key are in the history of Guild Wars 2.

## Historical
A [first project](https://github.com/bouteillerAlan/SpyHistory) was born after a discussion with the [LBM](https://www.lebusmagique.fr/). This first project corresponded more to a beta. This one has more vocation to be a v1.

## Summary
- [known bug](#known-bug)
- [env file](#env-file)
- [Available Scripts](#available-scripts)
  - [yarn start](#yarn-start)
  - [yarn test](#yarn-test)
  - [yarn build](#yarn-build)
- [API V2 GuildWars 2 documentation](#api-v2-guildwars-2-documentation)
  - [usage](#usage)
  - [locale](#locale)
  - [bulk expansion](#bulk-expansion)
  - [authentication](#authentication)
- [Path generation function](#path-generation-function)

### Know bug
  - `infinite redirect #24` [🔗](https://github.com/bouteillerAlan/observatory/issues/24)

### Env file
name
```
# dev
.env.developement

# prod
.env
```

content
```
REACT_APP_API_URL= the gw2 api url (https://api.guildwars2.com/V2/)
```

### Available Scripts

In the project directory, you can run:

#### `yarn start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

#### `yarn test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

#### `yarn build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### API V2 GuildWars 2 documentation
[source](https://api.guildwars2.com/v2)

#### Usage

The API follows the general pattern of enumerating possible values of the
subsequent path segment, with the fully qualified path yielding a json object
of the type being enumerated.

For example, /v2/colors will yield :

```
[1, 2, 3, ... ]
```

which can be used to create the fully qualified path of :
```
/v2/colors/1
```

Key :
 - l : locale aware (via ``?lang=<langId>``)
 - d : currently disabled
 - a : requires authentication

The following paths are exposed by this API :
 - /v2/account [a]
 - /v2/account/achievements [a]
 - /v2/account/bank [a]
 - /v2/account/dailycrafting [a]
 - /v2/account/dungeons [a]
 - /v2/account/dyes [a]
 - /v2/account/finishers [a]
 - /v2/account/gliders [a]
 - /v2/account/home
 - /v2/account/home/cats [a]
 - /v2/account/home/nodes [a]
 - /v2/account/inventory [a]
 - /v2/account/luck [a]
 - /v2/account/mail [d,a]
 - /v2/account/mailcarriers [a]
 - /v2/account/mapchests [a]
 - /v2/account/masteries [a]
 - /v2/account/mastery/points [a]
 - /v2/account/materials [a]
 - /v2/account/minis [a]
 - /v2/account/mounts
 - /v2/account/mounts/skins [a]
 - /v2/account/mounts/types [a]
 - /v2/account/novelties [a]
 - /v2/account/outfits [a]
 - /v2/account/pvp/heroes [a]
 - /v2/account/raids [a]
 - /v2/account/recipes [a]
 - /v2/account/skins [a]
 - /v2/account/titles [a]
 - /v2/account/wallet [a]
 - /v2/account/worldbosses [a]
 - /v2/achievements [l]
 - /v2/achievements/categories [l]
 - /v2/achievements/daily
 - /v2/achievements/daily/tomorrow
 - /v2/achievements/groups [l]
 - /v2/adventures [l,d]
 - /v2/adventures/:id/leaderboards [d]
 - /v2/adventures/:id/leaderboards/:board/:region [d]
 - /v2/backstory/answers [l]
 - /v2/backstory/questions [l]
 - /v2/build
 - /v2/characters [a]
 - /v2/characters/:id/backstory [a]
 - /v2/characters/:id/core [a]
 - /v2/characters/:id/crafting [a]
 - /v2/characters/:id/dungeons [d,a]
 - /v2/characters/:id/equipment [a]
 - /v2/characters/:id/heropoints [a]
 - /v2/characters/:id/inventory [a]
 - /v2/characters/:id/quests [a]
 - /v2/characters/:id/recipes [a]
 - /v2/characters/:id/sab [a]
 - /v2/characters/:id/skills [a]
 - /v2/characters/:id/specializations [a]
 - /v2/characters/:id/training [a]
 - /v2/colors [l]
 - /v2/commerce/delivery [a]
 - /v2/commerce/exchange
 - /v2/commerce/listings
 - /v2/commerce/prices
 - /v2/commerce/transactions [a]
 - /v2/continents [l]
 - /v2/createsubtoken [a]
 - /v2/currencies [l]
 - /v2/dailycrafting
 - /v2/dungeons [l]
 - /v2/emblem
 - /v2/events [l,d]
 - /v2/events-state [d]
 - /v2/files
 - /v2/finishers [l]
 - /v2/gemstore/catalog [l,d]
 - /v2/gliders [l]
 - /v2/guild/:id [a]
 - /v2/guild/:id/log [a]
 - /v2/guild/:id/members [a]
 - /v2/guild/:id/ranks [a]
 - /v2/guild/:id/stash [a]
 - /v2/guild/:id/storage [a]
 - /v2/guild/:id/teams [a]
 - /v2/guild/:id/treasury [a]
 - /v2/guild/:id/upgrades [a]
 - /v2/guild/permissions [l]
 - /v2/guild/search
 - /v2/guild/upgrades [l]
 - /v2/home
 - /v2/home/cats
 - /v2/home/nodes
 - /v2/items [l]
 - /v2/itemstats [l]
 - /v2/legends
 - /v2/mailcarriers [l]
 - /v2/mapchests
 - /v2/maps [l]
 - /v2/masteries [l]
 - /v2/materials [l]
 - /v2/minis [l]
 - /v2/mounts
 - /v2/mounts/skins [l]
 - /v2/mounts/types [l]
 - /v2/novelties [l]
 - /v2/outfits [l]
 - /v2/pets [l]
 - /v2/professions [l]
 - /v2/pvp
 - /v2/pvp/amulets [l]
 - /v2/pvp/games [a]
 - /v2/pvp/heroes [l]
 - /v2/pvp/ranks [l]
 - /v2/pvp/rewardtracks [l,d]
 - /v2/pvp/runes [l,d]
 - /v2/pvp/seasons [l]
 - /v2/pvp/seasons/:id/leaderboards
 - /v2/pvp/seasons/:id/leaderboards/:board/:region
 - /v2/pvp/sigils [l,d]
 - /v2/pvp/standings [a]
 - /v2/pvp/stats [a]
 - /v2/quaggans
 - /v2/quests [l]
 - /v2/races [l]
 - /v2/raids [l]
 - /v2/recipes
 - /v2/recipes/search
 - /v2/skills [l]
 - /v2/skins [l]
 - /v2/specializations [l]
 - /v2/stories [l]
 - /v2/stories/seasons [l]
 - /v2/titles [l]
 - /v2/tokeninfo [a]
 - /v2/traits [l]
 - /v2/vendors [l,d]
 - /v2/worldbosses
 - /v2/worlds [l]
 - /v2/wvw/abilities [l]
 - /v2/wvw/matches
 - /v2/wvw/matches/overview
 - /v2/wvw/matches/scores
 - /v2/wvw/matches/stats
 - /v2/wvw/matches/stats/:id/guilds/:guild_id
 - /v2/wvw/matches/stats/:id/teams/:team/top/kdr
 - /v2/wvw/matches/stats/:id/teams/:team/top/kills
 - /v2/wvw/objectives [l]
 - /v2/wvw/ranks [l]
 - /v2/wvw/rewardtracks [l,d]
 - /v2/wvw/upgrades [l]

#### Locale

APIs which are locale aware accept the ``?lang=<langId>`` option. For example :
```
/v2/colors/1?lang=fr
```

Possible locale ``langId`` values include :
  - en
  - es
  - de
  - fr
  - zh

#### Bulk expansion

Many APIs offer bulk expansion. APIs that offer bulk expansion will provide a list of 
possible IDs when no parameters are provided. As set of ids can be then be resolved into
objects via one of four methods. The simplest is by specifying multiple ids via query
parameter, as in :
```
/v2/colors?ids=1,2,3
```

Individual ids may also be requested via
 - ``/v2/colors/1``
 - ``/v2/colors?id=1``

Some endpoints support returning all resources. To do this, one may also specify ``all``
to expand all ids. For example :
```
/v2/colors?ids=all
```

> Not all APIs support the ``all`` keyword as it may be too expensive.

Another approach to bulk expansion is through pages.  Use the ``?page=<page#>``
parameter to specify the requeste page.  Optionally, you can also provide
a ``&page_size=<page size>`` value to adjust to your preferred page size.

Sample usage is:
```
/v2/colors?page=0&page_size=10
```

Pay attention to response headers which provide additional metadata about
the underlying collection, pagination info, and links.

#### Authentication

APIs which require authentication need to be passed an API key belonging to
the account to be accessed. The API key must have the appropriate permissions
associated with it (``/v2/tokeninfo`` can be used to inspect key permissions). Keys
can be generated on the ArenaNet account site.

Keys can be passed either via query parameter or HTTP header. Our servers do
not support preflighted CORS requests, so if your application is running
in the user's browser you'll need to user the query parameter.

To pass via query parameter, include ``?access_token=<API key>`` in your request.

To pass via HTTP header, include ``Authorization: Bearer <API key>``.

### Path generation function
🚀 this function generates the paths that connect the different blocks of the story

📁 `src/function/sharedFunction.ts`

```ts
/**
 * generate the arrow for the map
 * @Param {HTMLElement} idFrom arrow start
 * @Param {HTMLElement} idTo arrow end
 * @Param {HTMLElement} idLine the arrow element (have any type because tslint...)
 * @Param {boolean} gORr if the quest is done or not
 * @Param {boolean} grey if the quest is blocked or not
 * @Return {void} return nothing update the DOM
 */
function gArrow(idFrom: any, idTo: any, idLine: any, gORr: boolean, grey: boolean): void {...}
```

### Data map
💡 these 3 files allow you to set up the entire application tree in terms of data.

📁 `src/data`

#### back stories
🚀 set each unauthorized id for each back story choice

📁 `src/data/backStories.tsx`

💡 why ?
> The player's choices only impact certain parts of the quests and most seasons are unaffected by the choices.
> It is therefore simpler to say which one is forbidden than to list all the authorized quests.

#### quests list

🚨 Due to the explanation given below this file must be kept up to date at the same time as the latest Guild Wars 2 episode releases.
  If a better solution exists you can create an issue on this repo or a pr.

🚀 the display is generated automatically thanks to the table. They must be built according to the desired view

📁 `src/data/backStories.tsx`

💡 why ?
> The guild wars 2 API does not allow to know with precision the order of the quests.
> In particular if a quest offers a choice between several quests at its end.

⚙ content
- list of all quests id before 2 choices in the game
- list of all quests id before 3 choices in the game
- list of all quests id before 5 choices in the game
- list of all quests for durmand
- list of all quests for whisper
- list of all quests for vigil
- list of all quests in the game in the form `{pid: 0, id: 77}`

#### link for external content
🚀 Allows to : 
- put a link to the site of the "Le Bus Magique" and a wiki, in English and / or French for the seasons
  ```json
  'A515A1D3-4BD7-4594-AE30-2C5D05FF5960': {
    'fr': {
      'link': 'https://www.lebusmagique.fr/pages/succes/chroniques/s2/',
      'wiki': '',
    },
    'eng': {
      'link': '',
      'wiki': 'https://wiki.guildwars2.com/wiki/Living_World_Season_2',
    },
  },
  ```
- put a link to the "magic bus" site, a video and a wiki, in English and / or French for episodes and quests
  ```json
  '87': {
    'fr': {
      'link': 'https://www.lebusmagique.fr/pages/gw2-pof/domaine-de-kourna/',
      'video': 'https://www.youtube.com/watch?v=BSQMv-hYUW8',
      'wiki': 'https://wiki-fr.guildwars2.com/wiki/Longue_vie_%C3%A0_la_liche',
    },
    'eng': {
      'link': '',
      'video': '',
      'wiki': 'https://wiki.guildwars2.com/wiki/Long_Live_the_Lich',
    },
  },
  ```

📁 `src/data/tutorials.tsx`
