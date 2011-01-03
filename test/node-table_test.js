// TODO Replace with a proper test
var sys = require('sys'), table = require('table').table({ 'columnWidths': [15, 20] });

table
	.setDefaultColumnAlignment(['left', 'center'])
	.appendRow(['Node', 'Table'])
	.appendRow(['Second', 'Row'])
	.appendRow(['Third', 'Row'])
	.appendRow(["Fourth\nsecond line", 'Row']);
sys.puts(table.render());