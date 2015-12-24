# gooder-bunyan

A [hapi][0] [good-reporter][1] to [bunyan][2] logging adapter.

## Installation

``` bash
  $ npm install bunyan
  $ npm install good-bunyan
```

## Usage

To use the `GoodBunyan` transport in bunyan, you simply need to require it and
then either add it to an existing bunyan logger or pass an instance to a new
bunyan logger:

``` js
var GoodBunyan = require('gooder-bunyan');
var bunyan = require('bunyan');

server.register({
  register: require('good'),
  options: {
    reporters: [
      new GoodBunyan({
        ops: '*',
        request: '*',
        response: '*',
        log: '*',
        error: '*'
      }, bunyan)
    ]
  }
}, function(err) {
  if (err) {
    return server.log(['error'], 'good load error: ' + err);
  }
});
```

The following `options` are availble to configure `GoodBunyan`:

* __error_level:__ Map all good `error` events to this bunyan level (Default `error`).
* __ops_level:__ Map all good `ops` events to this bunyan level (Default `info`).
* __request_level:__ Map all good `request` events to this bunyan level (Default `info`).
* __response_level:__ Map all good `response` events to this bunyan level (Default `info`).
* __other_level:__ Map all other good events to this bunyan level (Default `info`).

[0]: http://hapijs.com
[1]: https://github.com/hapijs/good-reporter
[2]: https://github.com/trentm/node-bunyan
