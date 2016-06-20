Stream = require 'stream'

defaults =
  error_level: 'error'
  ops_level: 'info'
  request_level: 'info'
  response_level: 'info'
  other_level: 'info'

class GoodBunyan extends Stream.Writable

  constructor: (bunyan, config = {}) ->
    super({ objectMode: true, decodeStrings: false })

    @settings = Object.assign {}, defaults, config
    @bunyan = bunyan

    @error_level = @settings.error_level
    @ops_level = @settings.ops_level
    @request_level = @settings.request_level
    @response_level = @settings.response_level
    @other_level = @settings.other_level

  _write: (data, encoding, callback) ->
    event = data?.event

    if event is 'response'
      @bunyan[@response_level] event: event, data: data
    else if event is 'ops'
      @bunyan[@ops_level] event: event, data: data
    else if event is 'error'
      @bunyan[@error_level] event: event, data: data
    else if event is 'request' or event is 'log'
      @bunyan[@request_level] event: event, data: data
    else
      @bunyan[@other_level] event: event, data: data

    setImmediate callback

module.exports = GoodBunyan
