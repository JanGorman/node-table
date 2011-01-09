var vows = require('vows'),
		assert = require('assert'),
		Table = require('table');

vows.describe('Table rendering').addBatch({
	'when rendering the table': {
		topic: function() {
			var table = Table.table({ 'columnWidths': [15, 20] });
			table
				.setDefaultColumnAlignment(['left', 'center'])
				.appendRow(['Node', 'Table'])
				.appendRow(['Second', 'Row'])
				.appendRow(['Third', 'Row'])
				.appendRow(["Fourth\nsecond line", 'Row']);
			return table.render();
		},
		'we get a nice looking table': function(topic) {
			var result = [
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
			];
			assert.equal(topic, result.join("\n"));
		}
	}
}).export(module);