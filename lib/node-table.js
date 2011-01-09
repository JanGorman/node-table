module.exports = function(options) {
	var autoSeparateNone = 0x0,
		autoSeparateHeader = 0x1,
		autoSeparateFooter = 0x2,
		autoSeparateAll = 0x3,
		corner = '+',
		horizontal = '-',
		vertical = '|';
	
	var table = {},
		util = require('./util'),
		repeat = util.repeat,
		Row = require('./row'),
		Column = require('./column'),
		padding = 0,
		rows = [],
		tableColumnWidths = null,
		defaultColumnAlignment = [];
		autoSeparate = autoSeparateAll;
	
  table.config = function (key, value) {
    if (value !== undefined) {;
      switch (key) {
      	case 'columnWidths':
        	tableColumnWidths = value;
        	break;
      }
    }
  }
	
	table.setDefaultColumnAlignment = function(alignment) {
		defaultColumnAlignment = alignment;
		return table;
	};
	
	/**
	 * Append a row to the table
	 *
	 * @param {Array|Row} the row to append
	 */
	table.appendRow = function(row) {
		if (row.length > tableColumnWidths.length) {
			throw new Error('The row contains too many columns');
		};
		
		var data = row;
		row = new Row();
		for (var i = 0, item; item = data[i]; i++) {
			var align = defaultColumnAlignment[i] || null;
			row.appendColumn(new Column({ 'content': item, 'align': align }));
		}
		
		rows[rows.length] = row;
		
		return table;
	};
	
	/**
	 * Render the table
	 */
	table.render = function() {
		if (rows.length === 0) {
			throw new Error('No rows added to the table yet');
		};

		var result = '';
		var numRows = rows.length;
		for (var rowNum = 0, row; row = rows[rowNum]; rowNum++) {
			if (columnWidths) {
				var lastColumnWidths = columnWidths;
			};
			var renderedRow = row.render(tableColumnWidths, padding);
			var columnWidths = row.getColumnWidths();
			var numColumns = columnWidths.length;
			
			if (rowNum === 0) {
				// Start with a border
				result = drawBorder(result, columnWidths);
			} else {
				// Check if we have to draw the row separator
				if (autoSeparate & autoSeparateAll) {
					drawSeparator = true;
				} else if (rowNum === 1 && autoSeparate & autoSeparateHeader) {
					drawSeparator = true;
				} else if (rowNum === (numRows - 1) && autoSeparate & autoSeparateFooter) {
					drawSeparator = true;
				} else {
					drawSeparator = false;
				}
	
				if (drawSeparator) {
					result += vertical;
					
					var currentUpperColumn = 
						currentLowerColumn =
						currentUpperWidth = 
						currentLowerWidth = 0;
					for (var columnNum = 0, columnWidth; columnWidth = tableColumnWidths[columnNum]; columnNum++) {
						result += repeat(horizontal, columnWidth);
						if (columnNum + 1 === tableColumnWidths.length) {
							break;
						}
					
						connector = 0x0;
						currentUpperWidth += columnWidth;
						currentLowerWidth += columnWidth;

						if (lastColumnWidths[currentUpperColumn] === currentUpperWidth) {
							connector |= 0x1;
							currentUpperColumn += 1;
							currentUpperWidth = 0;
						} else {
							currentUpperWidth += 1;
						};
					
						if (columnWidths[currentLowerColumn] === currentLowerWidth) {
							connector |= 0x2;
							currentLowerColumn += 1;
							currentLowerWidth = 0;
						} else {
							currentLowerWidth += 1;
						};

						switch (connector) {
							case 0x0:
								result += horizontal;
								break;
							default:
								result += corner;
						}
					}
					result += vertical + "\n";
				}
			}
			result += renderedRow;
		
			// Last row? Draw the table bottom
			if (rowNum + 1 === numRows) {
				result = drawBorder(result, columnWidths);
			};
		}
		
		return result;
	}
	
	drawBorder = function(result, columnWidths) {
		result += corner;
		for (var j = 0, columnWidth; columnWidth = columnWidths[j]; j++) {
			result += repeat(horizontal, columnWidth) + corner;
		}
		return result + "\n";
	};
	
	if (!options || !options.columnWidths) {
		throw new Error('You need to set the column widths');
	}
	
	['columnWidths'].forEach( function(conf)
	{
		table.config(conf, options[conf]);
	} );
	
	return table;
}