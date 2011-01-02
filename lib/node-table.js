module.exports = function(options) {
	var autoSeparateNone = 0x0,
		autoSeparateHeader = 0x1,
		autoSeparateFooter = 0x2,
		autoSeparateAll = 0x3,
		corner = '+',
		horizontal = '-';
	
	var table = {},
		Row = require('./row'),
		Column = require('./column'),
		padding = 0,
		rows = [],
		columnWidths = null,
		defaultColumnAlignment = [];
		autoSeparate = autoSeparateAll;
	
	// Ok to do this in node?
	String.prototype.repeat = function(n) {
		return new Array(n + 1).join(this);
	}
	Array.prototype.sum = function() {
		return (!this.length) ? 0 : this.slice(1).sum() + ((typeof this[0] === 'number') ? this[0] : 0);
	}
	
  table.config = function (key, value) {
    if (value !== undefined) {;
      switch (key) {
      	case 'columnWidths':
        	columnWidths = value;
        	break;
      }
    }
  }
	
	/**
	 * Append a row to the table
	 *
	 * @param {Array|Row} the row to append
	 */
	table.appendRow = function(row) {
		if (row.length > columnWidths.length) {
			throw new Error('The row contains too many columns');
		};
		
		var data = row;
		row = new Row();
		for (var i = 0, item; item = data[i]; i++) {
			var align = defaultColumnAlignment[i] || null;
			row.appendColumn(new Column().create({ 'content': item, 'align': align }));
			rows[rows.length] = row;
		}
		
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
		columnWidths = [10, 20];
		for (var i = 0, item; item = rows[i]; i++) {;
			if (columnWidths.length > 0) {
				var lastColumnWidths = columnWidths;
			};
			
			var renderedRow = item.render(columnWidths, padding);
			var columnWidths = item.getColumnWidths();
			var numColumns = columnWidths.length;
			
			if (i === 0) {
				result += corner;
				for (var j = 0, len = columnWidths.length; j < len; j++) {
					if (!isNaN(columnWidths[j]))
					{
						result += horizontal.repeat(columnWidths[j]) + corner;
					};
				}
				result += "\n";
			} else {
				// Check if we have to draw the row separator
				if (autoSeparate & autoSeparateAll) {
					drawSeparator = true;
				} else if (i === 1 && autoSeparate & autoSeparateHeader) {
					drawSeparator = true;
				} else if (i === (numRows - 1) && autoSeparate & autoSeparateFooter) {
					drawSeparator = false;
				}
	
				if (drawSeparator) {
					result += corner;
					
					currentUpperColumn = 
					currentLowerColumn =
					currentUpperWidth = 
					currentLowerWidth = 0;
					
					for (var j = 0, columnWidth; columnWidth = columnWidths[j]; j++) {
						result += horizontal.repeat(columnWidth);
						if (columnNum + 1 === totalNumColumns) {
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
					
					result += corner + "\n";
				}
			}
			result += renderedRow;
		
			// Last row? draw the table bottom
			if (i + 1 === numRows) {
				result += corner;
				for (var j = 0, len = columnWidths.length; j < len; j++) {
					if (!isNaN(columnWidths[j])) {
						result += horizontal.repeat(columnWidths[j]) + corner;
					}
				}
				result += "\n";
			};
		}
		
		return result;
	}
	
	if (!options || !options.columnWidths) {
		throw new Error('You need to set the column widths');
	}
	
	['columnWidths'].forEach( function(conf)
	{
		table.config(conf, options[conf]);
	} );
	
	return table;
}