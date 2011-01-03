## About

table is a component to create text based tables. This might be useful for text emails or to display tables in the CLI.

## Install

    npm install table

## Example

    var sys = require('sys'), table = require('table').table({ 'columnWidths': [15, 20] });

    table
    	.setDefaultColumnAlignment(['left', 'center'])
    	.appendRow(['Node', 'Table'])
    	.appendRow(['Second', 'Row'])
    	.appendRow(['Third', 'Row'])
    	.appendRow(["Fourth\nsecond line", 'Row']);
    sys.puts(table.render());
    
Results in a nice looking table:

    +---------------+--------------------+
    |Node           |       Table        |
    |---------------+--------------------|
    |Second         |        Row         |
    |---------------+--------------------|
    |Third          |        Row         |
    |---------------+--------------------|
    |Fourth         |        Row         |
    |second line    |                    |
    +---------------+--------------------+
    
Valid alignments are 'left', 'center' and 'right'.

## TODOs

* Handle Row Objects as well as arrays in appendRow
* Some proper testing