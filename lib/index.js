var GoodBunyan, Stream, defaults,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

Stream = require('stream');

defaults = {
  error_level: 'error',
  ops_level: 'info',
  request_level: 'info',
  response_level: 'info',
  other_level: 'info'
};

GoodBunyan = (function(superClass) {
  extend(GoodBunyan, superClass);

  function GoodBunyan(bunyan, config) {
    if (config == null) {
      config = {};
    }
    GoodBunyan.__super__.constructor.call(this, {
      objectMode: true,
      decodeStrings: false
    });
    this.settings = Object.assign({}, defaults, config);
    this.bunyan = bunyan;
    this.error_level = this.settings.error_level;
    this.ops_level = this.settings.ops_level;
    this.request_level = this.settings.request_level;
    this.response_level = this.settings.response_level;
    this.other_level = this.settings.other_level;
  }

  GoodBunyan.prototype._write = function(data, encoding, callback) {
    var event;
    event = data != null ? data.event : void 0;
    if (event === 'response') {
      this.bunyan[this.response_level].call(this.bunyan, {
        event: event,
        data: data
      });
    } else if (event === 'ops') {
      this.bunyan[this.ops_level].call(this.bunyan, {
        event: event,
        data: data
      });
    } else if (event === 'error') {
      this.bunyan[this.error_level].call(this.bunyan, {
        event: event,
        data: data
      });
    } else if (event === 'request' || event === 'log') {
      this.bunyan[this.request_level].call(this.bunyan, {
        event: event,
        data: data
      });
    } else {
      this.bunyan[this.other_level].call(this.bunyan, {
        event: event,
        data: data
      });
    }
    return setImmediate(callback);
  };

  return GoodBunyan;

})(Stream.Writable);

module.exports = GoodBunyan;

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImluZGV4LmNvZmZlZSJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxJQUFBLDRCQUFBO0VBQUE7OztBQUFBLE1BQUEsR0FBUyxPQUFBLENBQVEsUUFBUjs7QUFFVCxRQUFBLEdBQ0U7RUFBQSxXQUFBLEVBQWEsT0FBYjtFQUNBLFNBQUEsRUFBVyxNQURYO0VBRUEsYUFBQSxFQUFlLE1BRmY7RUFHQSxjQUFBLEVBQWdCLE1BSGhCO0VBSUEsV0FBQSxFQUFhLE1BSmI7OztBQU1JOzs7RUFFUyxvQkFBQyxNQUFELEVBQVMsTUFBVDs7TUFBUyxTQUFTOztJQUM3Qiw0Q0FBTTtNQUFFLFVBQUEsRUFBWSxJQUFkO01BQW9CLGFBQUEsRUFBZSxLQUFuQztLQUFOO0lBRUEsSUFBQyxDQUFBLFFBQUQsR0FBWSxNQUFNLENBQUMsTUFBUCxDQUFjLEVBQWQsRUFBa0IsUUFBbEIsRUFBNEIsTUFBNUI7SUFDWixJQUFDLENBQUEsTUFBRCxHQUFVO0lBRVYsSUFBQyxDQUFBLFdBQUQsR0FBZSxJQUFDLENBQUEsUUFBUSxDQUFDO0lBQ3pCLElBQUMsQ0FBQSxTQUFELEdBQWEsSUFBQyxDQUFBLFFBQVEsQ0FBQztJQUN2QixJQUFDLENBQUEsYUFBRCxHQUFpQixJQUFDLENBQUEsUUFBUSxDQUFDO0lBQzNCLElBQUMsQ0FBQSxjQUFELEdBQWtCLElBQUMsQ0FBQSxRQUFRLENBQUM7SUFDNUIsSUFBQyxDQUFBLFdBQUQsR0FBZSxJQUFDLENBQUEsUUFBUSxDQUFDO0VBVmQ7O3VCQVliLE1BQUEsR0FBUSxTQUFDLElBQUQsRUFBTyxRQUFQLEVBQWlCLFFBQWpCO0FBQ04sUUFBQTtJQUFBLEtBQUEsa0JBQVEsSUFBSSxDQUFFO0lBRWQsSUFBRyxLQUFBLEtBQVMsVUFBWjtNQUNFLElBQUMsQ0FBQSxNQUFPLENBQUEsSUFBQyxDQUFBLGNBQUQsQ0FBZ0IsQ0FBQyxJQUF6QixDQUE4QixJQUFDLENBQUEsTUFBL0IsRUFBdUM7UUFBQSxLQUFBLEVBQU8sS0FBUDtRQUFjLElBQUEsRUFBTSxJQUFwQjtPQUF2QyxFQURGO0tBQUEsTUFFSyxJQUFHLEtBQUEsS0FBUyxLQUFaO01BQ0gsSUFBQyxDQUFBLE1BQU8sQ0FBQSxJQUFDLENBQUEsU0FBRCxDQUFXLENBQUMsSUFBcEIsQ0FBeUIsSUFBQyxDQUFBLE1BQTFCLEVBQWtDO1FBQUEsS0FBQSxFQUFPLEtBQVA7UUFBYyxJQUFBLEVBQU0sSUFBcEI7T0FBbEMsRUFERztLQUFBLE1BRUEsSUFBRyxLQUFBLEtBQVMsT0FBWjtNQUNILElBQUMsQ0FBQSxNQUFPLENBQUEsSUFBQyxDQUFBLFdBQUQsQ0FBYSxDQUFDLElBQXRCLENBQTJCLElBQUMsQ0FBQSxNQUE1QixFQUFvQztRQUFBLEtBQUEsRUFBTyxLQUFQO1FBQWMsSUFBQSxFQUFNLElBQXBCO09BQXBDLEVBREc7S0FBQSxNQUVBLElBQUcsS0FBQSxLQUFTLFNBQVQsSUFBc0IsS0FBQSxLQUFTLEtBQWxDO01BQ0gsSUFBQyxDQUFBLE1BQU8sQ0FBQSxJQUFDLENBQUEsYUFBRCxDQUFlLENBQUMsSUFBeEIsQ0FBNkIsSUFBQyxDQUFBLE1BQTlCLEVBQXNDO1FBQUEsS0FBQSxFQUFPLEtBQVA7UUFBYyxJQUFBLEVBQU0sSUFBcEI7T0FBdEMsRUFERztLQUFBLE1BQUE7TUFHSCxJQUFDLENBQUEsTUFBTyxDQUFBLElBQUMsQ0FBQSxXQUFELENBQWEsQ0FBQyxJQUF0QixDQUEyQixJQUFDLENBQUEsTUFBNUIsRUFBb0M7UUFBQSxLQUFBLEVBQU8sS0FBUDtRQUFjLElBQUEsRUFBTSxJQUFwQjtPQUFwQyxFQUhHOztXQUtMLFlBQUEsQ0FBYSxRQUFiO0VBZE07Ozs7R0FkZSxNQUFNLENBQUM7O0FBOEJoQyxNQUFNLENBQUMsT0FBUCxHQUFpQiIsImZpbGUiOiJpbmRleC5qcyIsInNvdXJjZVJvb3QiOiIvc291cmNlLyIsInNvdXJjZXNDb250ZW50IjpbIlN0cmVhbSA9IHJlcXVpcmUgJ3N0cmVhbSdcblxuZGVmYXVsdHMgPVxuICBlcnJvcl9sZXZlbDogJ2Vycm9yJ1xuICBvcHNfbGV2ZWw6ICdpbmZvJ1xuICByZXF1ZXN0X2xldmVsOiAnaW5mbydcbiAgcmVzcG9uc2VfbGV2ZWw6ICdpbmZvJ1xuICBvdGhlcl9sZXZlbDogJ2luZm8nXG5cbmNsYXNzIEdvb2RCdW55YW4gZXh0ZW5kcyBTdHJlYW0uV3JpdGFibGVcblxuICBjb25zdHJ1Y3RvcjogKGJ1bnlhbiwgY29uZmlnID0ge30pIC0+XG4gICAgc3VwZXIoeyBvYmplY3RNb2RlOiB0cnVlLCBkZWNvZGVTdHJpbmdzOiBmYWxzZSB9KVxuXG4gICAgQHNldHRpbmdzID0gT2JqZWN0LmFzc2lnbiB7fSwgZGVmYXVsdHMsIGNvbmZpZ1xuICAgIEBidW55YW4gPSBidW55YW5cblxuICAgIEBlcnJvcl9sZXZlbCA9IEBzZXR0aW5ncy5lcnJvcl9sZXZlbFxuICAgIEBvcHNfbGV2ZWwgPSBAc2V0dGluZ3Mub3BzX2xldmVsXG4gICAgQHJlcXVlc3RfbGV2ZWwgPSBAc2V0dGluZ3MucmVxdWVzdF9sZXZlbFxuICAgIEByZXNwb25zZV9sZXZlbCA9IEBzZXR0aW5ncy5yZXNwb25zZV9sZXZlbFxuICAgIEBvdGhlcl9sZXZlbCA9IEBzZXR0aW5ncy5vdGhlcl9sZXZlbFxuXG4gIF93cml0ZTogKGRhdGEsIGVuY29kaW5nLCBjYWxsYmFjaykgLT5cbiAgICBldmVudCA9IGRhdGE/LmV2ZW50XG5cbiAgICBpZiBldmVudCBpcyAncmVzcG9uc2UnXG4gICAgICBAYnVueWFuW0ByZXNwb25zZV9sZXZlbF0uY2FsbCBAYnVueWFuLCBldmVudDogZXZlbnQsIGRhdGE6IGRhdGFcbiAgICBlbHNlIGlmIGV2ZW50IGlzICdvcHMnXG4gICAgICBAYnVueWFuW0BvcHNfbGV2ZWxdLmNhbGwgQGJ1bnlhbiwgZXZlbnQ6IGV2ZW50LCBkYXRhOiBkYXRhXG4gICAgZWxzZSBpZiBldmVudCBpcyAnZXJyb3InXG4gICAgICBAYnVueWFuW0BlcnJvcl9sZXZlbF0uY2FsbCBAYnVueWFuLCBldmVudDogZXZlbnQsIGRhdGE6IGRhdGFcbiAgICBlbHNlIGlmIGV2ZW50IGlzICdyZXF1ZXN0JyBvciBldmVudCBpcyAnbG9nJ1xuICAgICAgQGJ1bnlhbltAcmVxdWVzdF9sZXZlbF0uY2FsbCBAYnVueWFuLCBldmVudDogZXZlbnQsIGRhdGE6IGRhdGFcbiAgICBlbHNlXG4gICAgICBAYnVueWFuW0BvdGhlcl9sZXZlbF0uY2FsbCBAYnVueWFuLCBldmVudDogZXZlbnQsIGRhdGE6IGRhdGFcblxuICAgIHNldEltbWVkaWF0ZSBjYWxsYmFja1xuXG5tb2R1bGUuZXhwb3J0cyA9IEdvb2RCdW55YW5cbiJdfQ==
