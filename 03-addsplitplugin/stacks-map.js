const ServerlessPluginSplitStacks = require('serverless-plugin-split-stacks');
const stacksMap = ServerlessPluginSplitStacks.stacksMap;

module.exports = {
  'AWS::Lambda::Version': { destination: 'Lambda' },
  'AWS::Lambda::Function': { destination: 'Lambda' },
  'AWS::Lambda::Permission': { destination: 'Lambda' },
}