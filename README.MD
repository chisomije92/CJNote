##CJ-NOTE CLI

This is a command line interface that launches on command, an interactive development environment that enables the user to write and document Javascript code conveniently.

![CJnote-client](https://user-images.githubusercontent.com/68636386/170349196-e76ce0da-b335-464b-9459-5fdab55fbcee.png)

## Table of contents

- [Table of contents](#table-of-contents)
- [Overview](#overview)
  - [Links](#links)
  - [Installation and Setup Instructions](#installation-and-setup-instructions)
- [My process](#my-process)
  - [Built with](#built-with)
- [Author](#author)

## Overview

### Links

- Repo: [Github repo](https://github.com/chisomije92/CJNote)
- NPM: [NPM package](https://www.npmjs.com/package/cjnote)

### Installation and Setup Instructions

**Installation:**
Run _npm install -g cjnote_ to install this package.

**usage**
On successful installation, run _cjnote serve_ to start up the application on port 4005.
Please note that _cjnote serve_ is the default command hence the command indicates the following:

- Default port becomes 4005 hence the app will start on that port i.e _http://localhost:4005/_
- Data will be stored as JSON format on file - _note.js_

To customize the port and/or filename, the following commands should be used instead:

- _cjnote serve [filename]_ - for example, _cjnote serve example.js_ will create and save data in specified file - _example.js_ in the directory on default port 4005.
- _cjnote serve --port [port]_ - for example, _cjnote serve --port 4050_ will start up the app on server _http://localhost:4050/_ but on store data in default file _note.js_
- _cjnote serve [filename] --port [port]_ - _cjnote serve example.js --port 4050_ will start up the app on server _http://localhost:4050/_ and save data in specified file _example.js_

In the event that you do not wish to install this package generally, you may run the command _npx cjnote serve_ to download and use the package instantly. Do note that the above rules on usage applies in this instance but the command starts with _npx_ instead rather than the package name.

## My process

### Built with

- Semantic HTML5 markup
- Flexbox
- CSS - For styles
- [React](https://reactjs.org/) - JS library
- [Typescript](https://www.typescriptlang.org/) - Ensure JS type safety
- [Esbuild](https://esbuild.github.io/) - Code bundler and transpiler
- [React Redux](https://react-redux.js.org/) - React redux
- [React MD Editor](https://www.npmjs.com/package/@uiw/react-md-editor) - React Markdown Editor
- [Monaco-Editor](https://www.npmjs.com/package/@monaco-editor/react) - Code editor
- [React-Resizable](https://www.npmjs.com/package/react-resizable) - Resize react components
- [localforage](https://localforage.github.io/localForage/) - JS library for storage
- [Commander](https://tj.github.io/commander.js/) - NodeJS CLI framework
- [ExpressJS](https://expressjs.com/) - NodeJS framework
- [Http proxy middleware](https://www.npmjs.com/package/http-proxy-middleware) - NodeJS proxy middleware
-

## Author

**Chisom Ijeomah**

- GitHub - [chisomije92](https://github.com/chisomije92)
- Twitter - [@devManiac92](https://www.twitter.com/@devManiac92)
