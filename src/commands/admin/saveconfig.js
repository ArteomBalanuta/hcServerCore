/*
  Description: Writes the current config to disk
*/

// module main
exports.run = async (core, server, socket, data) => {
  // attempt save, notify of failure
  if (!core.configManager.save()) {
    return server.reply({
      cmd: 'echo',
      text: 'Failed to save config, check logs.'
    }, client);
  }

  // return success message
  server.reply({
    cmd: 'echo',
    text: 'Config saved!'
  }, socket);
};

// module meta
exports.info = {
  name: 'saveconfig',
  description: 'Writes the current config to disk',
  usage: `
    API: { cmd: 'saveconfig' }`
};
