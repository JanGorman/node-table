vows    = require 'vows'
assert  = require 'assert'
Table   = require '../src/node-table'

vows.describe('Node-Table render test').addBatch(
  'when rendering the table':
    topic: ->
      table = new Table [15, 20, 80]
      table
        .setDefaultColumnAlignment(['left', 'center', 'right'])
        .appendRow(['Node', 'Table', 'adsasd'])
        .appendRow(['Second', 'Row', 'adsasd'])
        .appendRow(['Third', 'Row', 'ass'])
        .appendRow(["Fourth\nsecond line", 'Row', 'third column'])
        .appendRow(["Fourth\nsecond line", 'Row', 'third column'])
        .appendRow(["Fourth\nsecond line", 'Row', 'third column'])
        .appendRow(["Fourth\nsecond line", 'Row', 'third column'])
        .appendRow(["Fourth\nsecond line", 'Row', 'third column'])
        .appendRow(["Fourth\nsecond line", 'Row', 'third column'])
        .appendRow(["Fourth\nsecond line", 'Row', 'third column'])
        .appendRow(["Fourth\nsecond line", 'Row', 'third column'])
      table.render()
    'we get a nice looking table': (rendered) ->
      result = [
        '+---------------+--------------------+--------------------------------------------------------------------------------+'
        '|Node           |       Table        |                                                                          adsasd|'
        '|---------------+--------------------+--------------------------------------------------------------------------------|'
        '|Second         |        Row         |                                                                          adsasd|'
        '|---------------+--------------------+--------------------------------------------------------------------------------|'
        '|Third          |        Row         |                                                                             ass|'
        '|---------------+--------------------+--------------------------------------------------------------------------------|'
        '|Fourth         |        Row         |                                                                    third column|'
        '|second line    |                    |                                                                                |'
        '|---------------+--------------------+--------------------------------------------------------------------------------|'
        '|Fourth         |        Row         |                                                                    third column|'
        '|second line    |                    |                                                                                |'
        '|---------------+--------------------+--------------------------------------------------------------------------------|'
        '|Fourth         |        Row         |                                                                    third column|'
        '|second line    |                    |                                                                                |'
        '|---------------+--------------------+--------------------------------------------------------------------------------|'
        '|Fourth         |        Row         |                                                                    third column|'
        '|second line    |                    |                                                                                |'
        '|---------------+--------------------+--------------------------------------------------------------------------------|'
        '|Fourth         |        Row         |                                                                    third column|'
        '|second line    |                    |                                                                                |'
        '|---------------+--------------------+--------------------------------------------------------------------------------|'
        '|Fourth         |        Row         |                                                                    third column|'
        '|second line    |                    |                                                                                |'
        '|---------------+--------------------+--------------------------------------------------------------------------------|'
        '|Fourth         |        Row         |                                                                    third column|'
        '|second line    |                    |                                                                                |'
        '|---------------+--------------------+--------------------------------------------------------------------------------|'
        '|Fourth         |        Row         |                                                                    third column|'
        '|second line    |                    |                                                                                |'
        '+---------------+--------------------+--------------------------------------------------------------------------------+'
        ''
      ]
      assert.equal(rendered, result.join("\n"))
).export module