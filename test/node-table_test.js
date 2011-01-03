var sys = require('sys'), table = require('table').table({ 'columnWidths': [10, 20] });

table.setDefaultColumnAlignment(['left', 'center']).appendRow(['Node', 'Table'])
sys.puts(table.render());