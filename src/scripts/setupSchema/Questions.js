/**
  * This object contains Prompt ( https://www.npmjs.com/package/prompt ) style
  * questions that the SetupWizard will require an answer to. Questions are asked
  * in the order they are specified here.
  *
  * The resulting config.json file will be used by the server, accessed by the
  * name specified. IE, a valid use is; config.adminName
  *
  */

const Questions = {
  properties: {
    websocketPort: {
      type: 'integer',
      message: 'The port may only be a number!',
      description: 'Websocket Port',
      default: '6060'
    }
  }
}

module.exports = Questions;
