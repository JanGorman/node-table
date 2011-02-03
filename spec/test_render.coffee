vows    = require 'vows'
assert  = require 'assert'
Table   = require '../src/node-table'

vows.describe('Node-Table render test').addBatch(
  'when rendering the table':
    topic: ->
      table = new Table [15, 20, 100]
      table
        .setDefaultColumnAlignment(['left', 'center', 'right'])
        .appendRow(['Node', 'Table', 'adsasd'])
        .appendRow(['Second', 'Row', 'adsasd'])
        .appendRow(['Third', 'Row', 'ass'])
        .appendRow(["Fourth\nsecond line", 'Row', 'foobar'])
        .appendRow(["Fourth\nsecond line", 'Row', 'foobar'])
        .appendRow(["Fourth\nsecond line", 'Row', 'foobar'])
        .appendRow(["Fourth\nsecond line", 'Row', 'foobar'])
        .appendRow(["Fourth\nsecond line", 'Row', 'foobar'])
        .appendRow(["Fourth\nsecond line", 'Row', 'foobar'])
        .appendRow(["Fourth\nsecond line", 'Row', 'foobar'])
        .appendRow(["Fourth\nsecond line", 'Row', 'foobar'])
      table.render()
    'we get a nice looking table': (rendered) ->
      console.log rendered
      result = [
        '+---------------+--------------------+'
        '|Node           |       Table        |'
        '|---------------+--------------------|'
        '|Second         |        Row         |'
        '|---------------+--------------------|'
        '|Third          |        Row         |'
        '|---------------+--------------------|'
        '|Fourth         |        Row         |'
        '|second line    |                    |'
        '+---------------+--------------------+'
        ''
      ]
      assert.equal(rendered, result.join("\n"))
).export module