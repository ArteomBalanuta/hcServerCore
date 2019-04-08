/*
  Description: Rebroadcasts any `text` to all connected clients
*/

// module support functions
const parseText = (text) => {
  // verifies user input is text
  if (typeof text !== 'string') {
    return false;
  }

  // strip newlines from beginning and end
  text = text.replace(/^\s*\n|^\s+$|\n\s*$/g, '');
  // replace 3+ newlines with just 2 newlines
  text = text.replace(/\n{3,}/g, "\n\n");

  return text;
};

// module main
exports.run = async (core, server, socket, data) => {
  // check user input
  let text = parseText(data.text);

  if (!text) {
    // lets not send objects or empty text, yea?
    return server.police.frisk(socket.remoteAddress, 13);
  }

  // check for spam
  let score = text.length / 83 / 4;
  if (server.police.frisk(socket.remoteAddress, score)) {
    return server.reply({
      cmd: 'echo',
      text: 'You are sending too much text. Wait a moment and try again.'
    }, socket);
  }

  // build chat payload
  let payload = {
    cmd: 'echo',
    text: text
  };

  // send text to all connected clients
  server.broadcast(payload, {});

  // stats are fun
  core.stats.increment('messages-sent');
};

// module hook functions
exports.initHooks = (server) => {
  server.registerHook('in', 'echo', this.commandCheckIn, 20);
};

// checks for { cmd: 'echo', text: 'messages-sent' } and returns `messages-sent`
exports.commandCheckIn = (core, server, socket, payload) => {
  if (typeof payload.text !== 'string') {
    return false;
  }

  if (payload.text === 'messages-sent') {
    server.reply({
      cmd: 'echo',
      text: `${(core.stats.get('messages-sent') || 0)} msgs`
    }, socket);

    return false;
  }

  return payload;
};

// module meta
exports.requiredData = ['text'];
exports.info = {
  name: 'echo',
  description: 'Broadcasts passed `text` field to all connected users',
  usage: `
    API: { cmd: 'echo', text: '<required text to send>' }`
};
