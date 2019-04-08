# hack.chat server core

The [hack.chat](https://hack.chat/) chat service runs on a hackable (extendable & flexible) websocket server library. This is the core server. **Note:** This is not the chat server. This is a minimal boilerplate intended to jump start your own websocket based project. It provides the following features out of the box:

* **Hot Reload** - Update your server's code without disconnecting currently connected clients
* **Integrated Config Script** - An included "setup wizard" using Prompt style questions allow you to quickly deploy or distribute your application
* **Modules** - Server code is module-based, making development & debugging easier
* **Client Search Functions** - The `server.broadcast` method makes gathering target clients easy
* **Config Managment** - Arbitrary config data can be saved at any time and will be automatically reloaded on server start
* **Simple Stats** - Included stats engine tracks whatever you ask of it
* **Rate Limiter** - Built in ratelimiting prevents clients from preforming automated server floods
* **Stable and Graceful** - Field tested at 2k+ unique connected clients (each sending large amounts of data) with minimal lag. Module errors are reported but won't (typically) prevent the server from running
* **Module Hooks** - Pre and post processing hooks are available, allowing one module to change data before it reaches a different module, or to change outgoing data before it reaches the client

**Limitations:** Server only accepts JSON encoded communication. Each message must contain a `cmd` field. There is a built-in limit of 65,536 character messages. ( All of this is easily changed by modifying the `MainServer.js`). WSS is currently not supported out-of-the-box, requiring a reverse proxy. This may change in the future.

# Installation

## Prerequisites

- [node.js 8.10.0](https://nodejs.org/en/download/package-manager/#windows) or higher
- [npm 5.7.1](https://nodejs.org/en/download/package-manager/#windows) or higher

## Install & Setup

1. [Clone](https://help.github.com/articles/cloning-a-repository/) the repository: `https://github.com/hack-chat/hcServerCore.git`
2. Change the directory: `cd hcServerCore`
3. Install the dependencies: `npm install`
4. Launch: `npm run config`
5. Launch: `npm start`

## Development

Command modules are kept in `src\commands`. After adding or modifying a module, a connected client would send: `{ cmd: 'reload' }` for the changes to take effect.

This readme is a work in progress, for examples on how to work with the server, see the [main](https://github.com/hack-chat/main/tree/master/server/src/commands) repository.

## OOBE

If you were to follow the `Install & Setup` steps above, a simple way to test the server would be to open your favorite browser's development tools and paste the following:

```
let join = () => {
  window.ws = new WebSocket('ws://127.0.0.1:6060/');

  window.ws.onopen = () => {
    console.log('Connected.');
  }

  window.ws.onclose = () => {
    console.log('Lost Connection!');

    window.setTimeout(function () {
      join();
    }, 1);
  }

  window.ws.onmessage = (message) => {
    var args = JSON.parse(message.data);
    console.log(args);
  }
}

send = (data) => {
  if (window.ws && window.ws.readyState == window.ws.OPEN) {
    window.ws.send(JSON.stringify(data));
  }
}

join();
```

The only command supported out of the box is `echo`, which can be issued like:
`send({ cmd: 'echo', text: 'Hello cliche world!' })`

A hook is left in place allowing you to view how many message have been sent:
`send({ cmd: 'echo', text: 'messages-sent' })`

# Credits

* [**Marzavec**](https://github.com/marzavec) - *Initial work*
* [**MinusGix**](https://github.com/MinusGix) - *Base updates*
* [**Neel Kamath**](https://github.com/neelkamath) - *Base Documentation*
* [**Carlos Villavicencio**](https://github.com/po5i) - *Syntax Highlighting Integration*
* [**OpSimple**](https://github.com/OpSimple) - *Modules Added: dumb.js & speak.js*
* Andrew Belt, https://github.com/AndrewBelt, for original base work
* [wwandrew](https://github.com/wwandrew), for finding server flaws (including attack vectors) and submitting ~~___incredibly detailed___~~ bug reports
* [Everyone else](https://github.com/hack-chat/main/graphs/contributors) who participated in this project.

# License

This project is licensed under the [WTFPL License](LICENSE).
