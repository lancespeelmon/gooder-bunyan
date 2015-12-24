var GoodBunyan, GoodReporter, Hoek, SafeStringify, internals;

GoodReporter = require('good-reporter');

Hoek = require('hoek');

SafeStringify = require('json-stringify-safe');

internals = {
  defaults: {
    error_level: 'error',
    ops_level: 'info',
    request_level: 'info',
    response_level: 'info',
    other_level: 'info'
  }
};

GoodBunyan = (function() {
  function GoodBunyan(events, bunyan, options) {
    var settings;
    if (options == null) {
      options = {};
    }
    Hoek.assert(this.constructor === GoodBunyan, 'GoodBunyan must be created with new');
    Hoek.assert(bunyan, 'bunyan logger must not be null');
    settings = Hoek.applyToDefaults(internals.defaults, options);
    this.bunyan = bunyan;
    this.error_level = settings.error_level;
    this.ops_level = settings.ops_level;
    this.request_level = settings.request_level;
    this.response_level = settings.response_level;
    this.other_level = settings.other_level;
    GoodReporter.call(this, events, settings);
  }

  return GoodBunyan;

})();

Hoek.inherits(GoodBunyan, GoodReporter);

GoodBunyan.prototype._report = function(event, data) {
  if (event === 'response') {
    return this.bunyan[this.response_level]({
      event: event,
      data: data
    });
  } else if (event === 'ops') {
    return this.bunyan[this.ops_level]({
      event: event,
      data: data
    });
  } else if (event === 'error') {
    return this.bunyan[this.error_level]({
      event: event,
      data: data
    });
  } else if (event === 'request' || event === 'log') {
    return this.bunyan[this.request_level]({
      event: event,
      data: data
    });
  } else {
    return this.bunyan[this.other_level]({
      event: event,
      data: data
    });
  }
};

GoodBunyan.prototype.stop = function() {};

GoodBunyan.prototype.init = function(readstream, emitter, callback) {
  readstream.on('data', (function(_this) {
    return function(chunk) {
      return _this._handleEvent(chunk.event, chunk);
    };
  })(this));
  emitter.on('stop', (function(_this) {
    return function() {
      return _this.stop();
    };
  })(this));
  return callback(null);
};

module.exports = GoodBunyan;

//# sourceMappingURL=data:application/json;base64,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S0FBSyxDQUFDLEtBQXBCLEVBQTJCLEtBQTNCO0lBRG9CO0VBQUEsQ0FBQSxDQUFBLENBQUEsSUFBQSxDQUF0QjtFQUdBLE9BQU8sQ0FBQyxFQUFSLENBQVcsTUFBWCxFQUFtQixDQUFBLFNBQUEsS0FBQTtXQUFBLFNBQUE7YUFDakIsS0FBQyxDQUFBLElBQUQsQ0FBQTtJQURpQjtFQUFBLENBQUEsQ0FBQSxDQUFBLElBQUEsQ0FBbkI7U0FHQSxRQUFBLENBQVMsSUFBVDtBQVBpQjs7QUFTbkIsTUFBTSxDQUFDLE9BQVAsR0FBaUIiLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiL3NvdXJjZS8iLCJzb3VyY2VzQ29udGVudCI6WyJHb29kUmVwb3J0ZXIgPSByZXF1aXJlICdnb29kLXJlcG9ydGVyJ1xuSG9layA9IHJlcXVpcmUgJ2hvZWsnXG5TYWZlU3RyaW5naWZ5ID0gcmVxdWlyZSAnanNvbi1zdHJpbmdpZnktc2FmZSdcblxuaW50ZXJuYWxzID1cbiAgZGVmYXVsdHM6XG4gICAgZXJyb3JfbGV2ZWw6ICdlcnJvcidcbiAgICBvcHNfbGV2ZWw6ICdpbmZvJ1xuICAgIHJlcXVlc3RfbGV2ZWw6ICdpbmZvJ1xuICAgIHJlc3BvbnNlX2xldmVsOiAnaW5mbydcbiAgICBvdGhlcl9sZXZlbDogJ2luZm8nXG5cbmNsYXNzIEdvb2RCdW55YW5cbiAgY29uc3RydWN0b3I6IChldmVudHMsIGJ1bnlhbiwgb3B0aW9ucyA9IHt9KSAtPlxuICAgIEhvZWsuYXNzZXJ0IEBjb25zdHJ1Y3RvciA9PSBHb29kQnVueWFuLCAnR29vZEJ1bnlhbiBtdXN0IGJlIGNyZWF0ZWQgd2l0aCBuZXcnXG4gICAgSG9lay5hc3NlcnQgYnVueWFuLCAnYnVueWFuIGxvZ2dlciBtdXN0IG5vdCBiZSBudWxsJ1xuICAgIHNldHRpbmdzID0gSG9lay5hcHBseVRvRGVmYXVsdHMgaW50ZXJuYWxzLmRlZmF1bHRzLCBvcHRpb25zXG4gICAgQGJ1bnlhbiA9IGJ1bnlhblxuICAgIEBlcnJvcl9sZXZlbCA9IHNldHRpbmdzLmVycm9yX2xldmVsXG4gICAgQG9wc19sZXZlbCA9IHNldHRpbmdzLm9wc19sZXZlbFxuICAgIEByZXF1ZXN0X2xldmVsID0gc2V0dGluZ3MucmVxdWVzdF9sZXZlbFxuICAgIEByZXNwb25zZV9sZXZlbCA9IHNldHRpbmdzLnJlc3BvbnNlX2xldmVsXG4gICAgQG90aGVyX2xldmVsID0gc2V0dGluZ3Mub3RoZXJfbGV2ZWxcbiAgICBHb29kUmVwb3J0ZXIuY2FsbCB0aGlzLCBldmVudHMsIHNldHRpbmdzXG5cbkhvZWsuaW5oZXJpdHMgR29vZEJ1bnlhbiwgR29vZFJlcG9ydGVyXG5cbkdvb2RCdW55YW46Ol9yZXBvcnQgPSAoZXZlbnQsIGRhdGEpIC0+XG4gIGlmIGV2ZW50IGlzICdyZXNwb25zZSdcbiAgICBAYnVueWFuW0ByZXNwb25zZV9sZXZlbF0gZXZlbnQ6IGV2ZW50LCBkYXRhOiBkYXRhXG4gIGVsc2UgaWYgZXZlbnQgaXMgJ29wcydcbiAgICBAYnVueWFuW0BvcHNfbGV2ZWxdIGV2ZW50OiBldmVudCwgZGF0YTogZGF0YVxuICBlbHNlIGlmIGV2ZW50IGlzICdlcnJvcidcbiAgICBAYnVueWFuW0BlcnJvcl9sZXZlbF0gZXZlbnQ6IGV2ZW50LCBkYXRhOiBkYXRhXG4gIGVsc2UgaWYgZXZlbnQgaXMgJ3JlcXVlc3QnIG9yIGV2ZW50IGlzICdsb2cnXG4gICAgQGJ1bnlhbltAcmVxdWVzdF9sZXZlbF0gZXZlbnQ6IGV2ZW50LCBkYXRhOiBkYXRhXG4gIGVsc2VcbiAgICBAYnVueWFuW0BvdGhlcl9sZXZlbF0gZXZlbnQ6IGV2ZW50LCBkYXRhOiBkYXRhXG5cbkdvb2RCdW55YW46OnN0b3AgPSAoKSAtPlxuICByZXR1cm5cblxuR29vZEJ1bnlhbjo6aW5pdCA9IChyZWFkc3RyZWFtLCBlbWl0dGVyLCBjYWxsYmFjaykgLT5cbiAgcmVhZHN0cmVhbS5vbiAnZGF0YScsIChjaHVuaykgPT5cbiAgICBAX2hhbmRsZUV2ZW50IGNodW5rLmV2ZW50LCBjaHVua1xuXG4gIGVtaXR0ZXIub24gJ3N0b3AnLCAoKSA9PlxuICAgIEBzdG9wKClcblxuICBjYWxsYmFjayBudWxsXG5cbm1vZHVsZS5leHBvcnRzID0gR29vZEJ1bnlhblxuIl19
