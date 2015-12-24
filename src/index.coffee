GoodReporter = require 'good-reporter'
Hoek = require 'hoek'
SafeStringify = require 'json-stringify-safe'

internals =
  defaults:
    error_level: 'error'
    ops_level: 'info'
    request_level: 'info'
    response_level: 'info'
    other_level: 'info'

class GoodBunyan
  constructor: (events, bunyan, options = {}) ->
    Hoek.assert @constructor == GoodBunyan, 'GoodBunyan must be created with new'
    Hoek.assert bunyan, 'bunyan logger must not be null'
    settings = Hoek.applyToDefaults internals.defaults, options
    @bunyan = bunyan
    @error_level = settings.error_level
    @ops_level = settings.ops_level
    @request_level = settings.request_level
    @response_level = settings.response_level
    @other_level = settings.other_level
    GoodReporter.call this, events, settings

Hoek.inherits GoodBunyan, GoodReporter

GoodBunyan::_logResponse = (event, tags=[]) ->
  query = if event.query then JSON.stringify(event.query) else ''
  responsePayload = ''
  if typeof event.responsePayload == 'object' and event.responsePayload
    responsePayload = 'response payload: ' + SafeStringify event.responsePayload
  @bunyan[@response_level] "[#{tags}], " + Hoek.format '%s: %s %s %s %s (%sms) %s',
    event.instance,
    event.method,
    event.path,
    query,
    event.statusCode,
    event.responseTime,
    responsePayload

GoodBunyan::_report = (event, data) ->
  if event == 'response'
    @_logResponse data, data.tags
  else if event == 'ops'
    @bunyan[@ops_level] Hoek.format 'memory: %sMb, uptime (seconds): %s, load: %s',
      Math.round(data.proc.mem.rss / (1024 * 1024)),
      data.proc.uptime,
      data.os.load
  else if event == 'error'
    @bunyan[@error_level] 'message: ' + data.error.message + ' stack: ' + data.error.stack
  else if event == 'request' or event == 'log'
    @bunyan[@request_level] 'data: ' + if typeof data.data == 'object' then SafeStringify(data.data) else data.data
  # Event that is unknown to good-console, try a default.
  else if data.data
    @bunyan[@other_level] 'data: ' + if typeof data.data == 'object' then SafeStringify(data.data) else data.data
  else
    @bunyan[@other_level] 'data: (none)'

GoodBunyan::stop = () ->
  return

GoodBunyan::init = (readstream, emitter, callback) ->
  readstream.on 'data', (chunk) =>
    @_handleEvent chunk.event, chunk

  emitter.on 'stop', () =>
    @stop()

  callback null

module.exports = GoodBunyan
