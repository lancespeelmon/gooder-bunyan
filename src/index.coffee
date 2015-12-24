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

GoodBunyan::_report = (event, data) ->
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

GoodBunyan::stop = () ->
  return

GoodBunyan::init = (readstream, emitter, callback) ->
  readstream.on 'data', (chunk) =>
    @_handleEvent chunk.event, chunk

  emitter.on 'stop', () =>
    @stop()

  callback null

module.exports = GoodBunyan
