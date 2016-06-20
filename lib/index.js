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
      this.bunyan[this.response_level]({
        event: event,
        data: data
      });
    } else if (event === 'ops') {
      this.bunyan[this.ops_level]({
        event: event,
        data: data
      });
    } else if (event === 'error') {
      this.bunyan[this.error_level]({
        event: event,
        data: data
      });
    } else if (event === 'request' || event === 'log') {
      this.bunyan[this.request_level]({
        event: event,
        data: data
      });
    } else {
      this.bunyan[this.other_level]({
        event: event,
        data: data
      });
    }
    return setImmediate(callback);
  };

  return GoodBunyan;

})(Stream.Writable);

module.exports = GoodBunyan;

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImluZGV4LmNvZmZlZSJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxJQUFBLDRCQUFBO0VBQUE7OztBQUFBLE1BQUEsR0FBUyxPQUFBLENBQVEsUUFBUjs7QUFFVCxRQUFBLEdBQ0U7RUFBQSxXQUFBLEVBQWEsT0FBYjtFQUNBLFNBQUEsRUFBVyxNQURYO0VBRUEsYUFBQSxFQUFlLE1BRmY7RUFHQSxjQUFBLEVBQWdCLE1BSGhCO0VBSUEsV0FBQSxFQUFhLE1BSmI7OztBQU1JOzs7RUFFUyxvQkFBQyxNQUFELEVBQVMsTUFBVDs7TUFBUyxTQUFTOztJQUM3Qiw0Q0FBTTtNQUFFLFVBQUEsRUFBWSxJQUFkO01BQW9CLGFBQUEsRUFBZSxLQUFuQztLQUFOO0lBRUEsSUFBQyxDQUFBLFFBQUQsR0FBWSxNQUFNLENBQUMsTUFBUCxDQUFjLEVBQWQsRUFBa0IsUUFBbEIsRUFBNEIsTUFBNUI7SUFDWixJQUFDLENBQUEsTUFBRCxHQUFVO0lBRVYsSUFBQyxDQUFBLFdBQUQsR0FBZSxJQUFDLENBQUEsUUFBUSxDQUFDO0lBQ3pCLElBQUMsQ0FBQSxTQUFELEdBQWEsSUFBQyxDQUFBLFFBQVEsQ0FBQztJQUN2QixJQUFDLENBQUEsYUFBRCxHQUFpQixJQUFDLENBQUEsUUFBUSxDQUFDO0lBQzNCLElBQUMsQ0FBQSxjQUFELEdBQWtCLElBQUMsQ0FBQSxRQUFRLENBQUM7SUFDNUIsSUFBQyxDQUFBLFdBQUQsR0FBZSxJQUFDLENBQUEsUUFBUSxDQUFDO0VBVmQ7O3VCQVliLE1BQUEsR0FBUSxTQUFDLElBQUQsRUFBTyxRQUFQLEVBQWlCLFFBQWpCO0FBQ04sUUFBQTtJQUFBLEtBQUEsa0JBQVEsSUFBSSxDQUFFO0lBRWQsSUFBRyxLQUFBLEtBQVMsVUFBWjtNQUNFLElBQUMsQ0FBQSxNQUFPLENBQUEsSUFBQyxDQUFBLGNBQUQsQ0FBUixDQUF5QjtRQUFBLEtBQUEsRUFBTyxLQUFQO1FBQWMsSUFBQSxFQUFNLElBQXBCO09BQXpCLEVBREY7S0FBQSxNQUVLLElBQUcsS0FBQSxLQUFTLEtBQVo7TUFDSCxJQUFDLENBQUEsTUFBTyxDQUFBLElBQUMsQ0FBQSxTQUFELENBQVIsQ0FBb0I7UUFBQSxLQUFBLEVBQU8sS0FBUDtRQUFjLElBQUEsRUFBTSxJQUFwQjtPQUFwQixFQURHO0tBQUEsTUFFQSxJQUFHLEtBQUEsS0FBUyxPQUFaO01BQ0gsSUFBQyxDQUFBLE1BQU8sQ0FBQSxJQUFDLENBQUEsV0FBRCxDQUFSLENBQXNCO1FBQUEsS0FBQSxFQUFPLEtBQVA7UUFBYyxJQUFBLEVBQU0sSUFBcEI7T0FBdEIsRUFERztLQUFBLE1BRUEsSUFBRyxLQUFBLEtBQVMsU0FBVCxJQUFzQixLQUFBLEtBQVMsS0FBbEM7TUFDSCxJQUFDLENBQUEsTUFBTyxDQUFBLElBQUMsQ0FBQSxhQUFELENBQVIsQ0FBd0I7UUFBQSxLQUFBLEVBQU8sS0FBUDtRQUFjLElBQUEsRUFBTSxJQUFwQjtPQUF4QixFQURHO0tBQUEsTUFBQTtNQUdILElBQUMsQ0FBQSxNQUFPLENBQUEsSUFBQyxDQUFBLFdBQUQsQ0FBUixDQUFzQjtRQUFBLEtBQUEsRUFBTyxLQUFQO1FBQWMsSUFBQSxFQUFNLElBQXBCO09BQXRCLEVBSEc7O1dBS0wsWUFBQSxDQUFhLFFBQWI7RUFkTTs7OztHQWRlLE1BQU0sQ0FBQzs7QUE4QmhDLE1BQU0sQ0FBQyxPQUFQLEdBQWlCIiwiZmlsZSI6ImluZGV4LmpzIiwic291cmNlUm9vdCI6Ii9zb3VyY2UvIiwic291cmNlc0NvbnRlbnQiOlsiU3RyZWFtID0gcmVxdWlyZSAnc3RyZWFtJ1xuXG5kZWZhdWx0cyA9XG4gIGVycm9yX2xldmVsOiAnZXJyb3InXG4gIG9wc19sZXZlbDogJ2luZm8nXG4gIHJlcXVlc3RfbGV2ZWw6ICdpbmZvJ1xuICByZXNwb25zZV9sZXZlbDogJ2luZm8nXG4gIG90aGVyX2xldmVsOiAnaW5mbydcblxuY2xhc3MgR29vZEJ1bnlhbiBleHRlbmRzIFN0cmVhbS5Xcml0YWJsZVxuXG4gIGNvbnN0cnVjdG9yOiAoYnVueWFuLCBjb25maWcgPSB7fSkgLT5cbiAgICBzdXBlcih7IG9iamVjdE1vZGU6IHRydWUsIGRlY29kZVN0cmluZ3M6IGZhbHNlIH0pXG5cbiAgICBAc2V0dGluZ3MgPSBPYmplY3QuYXNzaWduIHt9LCBkZWZhdWx0cywgY29uZmlnXG4gICAgQGJ1bnlhbiA9IGJ1bnlhblxuXG4gICAgQGVycm9yX2xldmVsID0gQHNldHRpbmdzLmVycm9yX2xldmVsXG4gICAgQG9wc19sZXZlbCA9IEBzZXR0aW5ncy5vcHNfbGV2ZWxcbiAgICBAcmVxdWVzdF9sZXZlbCA9IEBzZXR0aW5ncy5yZXF1ZXN0X2xldmVsXG4gICAgQHJlc3BvbnNlX2xldmVsID0gQHNldHRpbmdzLnJlc3BvbnNlX2xldmVsXG4gICAgQG90aGVyX2xldmVsID0gQHNldHRpbmdzLm90aGVyX2xldmVsXG5cbiAgX3dyaXRlOiAoZGF0YSwgZW5jb2RpbmcsIGNhbGxiYWNrKSAtPlxuICAgIGV2ZW50ID0gZGF0YT8uZXZlbnRcblxuICAgIGlmIGV2ZW50IGlzICdyZXNwb25zZSdcbiAgICAgIEBidW55YW5bQHJlc3BvbnNlX2xldmVsXSBldmVudDogZXZlbnQsIGRhdGE6IGRhdGFcbiAgICBlbHNlIGlmIGV2ZW50IGlzICdvcHMnXG4gICAgICBAYnVueWFuW0BvcHNfbGV2ZWxdIGV2ZW50OiBldmVudCwgZGF0YTogZGF0YVxuICAgIGVsc2UgaWYgZXZlbnQgaXMgJ2Vycm9yJ1xuICAgICAgQGJ1bnlhbltAZXJyb3JfbGV2ZWxdIGV2ZW50OiBldmVudCwgZGF0YTogZGF0YVxuICAgIGVsc2UgaWYgZXZlbnQgaXMgJ3JlcXVlc3QnIG9yIGV2ZW50IGlzICdsb2cnXG4gICAgICBAYnVueWFuW0ByZXF1ZXN0X2xldmVsXSBldmVudDogZXZlbnQsIGRhdGE6IGRhdGFcbiAgICBlbHNlXG4gICAgICBAYnVueWFuW0BvdGhlcl9sZXZlbF0gZXZlbnQ6IGV2ZW50LCBkYXRhOiBkYXRhXG5cbiAgICBzZXRJbW1lZGlhdGUgY2FsbGJhY2tcblxubW9kdWxlLmV4cG9ydHMgPSBHb29kQnVueWFuXG4iXX0=
