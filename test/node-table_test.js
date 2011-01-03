var sys = require('sys'), table = require('table').table({ 'columnWidths': [10, 20] });

table.setDefaultColumnAlignment(['left', 'center']).appendRow(['Node', 'Table']).appendRow(['second', 'row']);
sys.puts(table.render());