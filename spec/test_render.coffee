vows    = require 'vows'
assert  = require 'assert'
Table   = require 'table'

suite = vows.describe 'Node-Table render test'

batches =
  'when rendering the table':
    topic: ->
      table = new Table [15, 20]
      table
        .setDefaultColumnAlignment(['left', 'center'])
        .appendRow(['Node', 'Table'])
        .appendRow(['Second', 'Row'])
        .appendRow(['Third', 'Row'])
        .appendRow(["Fourth\nsecond line", 'Row'])
      table.render()
    'we get a nice looking table': (topic) ->
      result = [
        '+---------------+--------------------+',
        '|Node           |       Table        |',
        '|---------------+--------------------|',
        '|Second         |        Row         |',
        '|---------------+--------------------|',
        '|Third          |        Row         |',
        '|---------------+--------------------|',
        '|Fourth         |        Row         |',
        '|second line    |                    |',
        '+---------------+--------------------+',
        ''
      ]
      assert.equals(topic, result.join("\n"))
      
for batch in batches
  suite = suite.addBatch batch
  
suite.export module