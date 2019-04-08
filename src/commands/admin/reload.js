/*
  Description: Clears and resets the command modules, outputting any errors
*/

// module main
exports.run = async (core, server, socket, data) => {
  // do command reload and store results
  let loadResult = core.dynamicImports.reloadDirCache();
  loadResult += core.commands.loadCommands();

  // clear and rebuild all module hooks
  server.loadHooks();

  // build reply based on reload results
  if (loadResult == '') {
    loadResult = `Reloaded ${core.commands.commands.length} commands, 0 errors`;
  } else {
    loadResult = `Reloaded ${core.commands.commands.length} commands, error(s):
      ${loadResult}`;
  }

  // reply with results
  server.reply({
    cmd: 'echo',
    text: loadResult
  }, socket);
};

// module meta
exports.info = {
  name: 'reload',
  description: '(Re)loads any new commands into memory, outputs errors if any',
  usage: `
    API: { cmd: 'reload' }`
};
