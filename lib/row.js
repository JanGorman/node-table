module.exports = function() {
	var row = {},
		Column = require('./column'),
		columns = [],
		columnWidths = [],
		vertical = '|';
	
	/**
	 * Append a column to the row
	 *
	 * @param {Column} The column to append
	 */
	row.appendColumn = function(column) {
		columns[columns.length] = column;
		return this;
	};
	
	/**
	 * Create a new column
	 *
	 * @param {String} The rows content
	 * @param {Object} options
	 */
	row.createColumn = function(content, options) {
		// TODO Extract options nicer
		var align, colspan = null;
		if (options !== null) {
			align = options['align'] || null;
			colspan = options['colspan'] || null;
		};
		this.appendColumn(new Column().createColumn({'content': content, 'align': align, 'colspan': colspan}));
		return this;
	};
	
	row.render = function(columnWidths, padding) {
		padding = padding || 0;
		
		if (columns.length === 0) {
			this.appendColumn(new Column().createColumn({}));
		};

		var rendered = [],
			maxHeight = 0,
			colNum = 0;
		for (var i = 0, item; item = columns[i]; i++) {
			var colSpan = item.getColspan();
			if (colNum + colspan > columnWidths.length) {
				throw new Error('There are too many columns');
			};
			var columnWidth = (colSpan - 1) + columnWidths.slice(colNum, colSpan).sum();
			var result = column.render(columnWidth, padding).split("\n");
			columnWidths[columnWidths.length] = columnWidth;
			rendered[rendered.length] = result;
			maxHeight = Math.max(maxHeight, result.length);
			colNum += colSpan;
		}
		
		if (colNum < columnWidths.length) {
			var remainingWidth = (columnWidths.length - colNum - 1) + columnWidths.slice(colNum).sum();
			rendered[rendered.length] = [' '.repeat(remainingWidth)];
			columnWidths[columnWidths.length] = remainingWidth;
		};
	
		// Add rendered rows to the result
		var result = '';
		for (var line = 0; line < maxHeight; line++) {
			result += vertical;
			for (var i = 0, item; item = rendered[i]; i++) {
				if (item) {
					result += item;
				} else {
					result += ' '.repeat(item[0].length);
				}
			}
			result += "\n";
		}
		
		return result;
	};
	
	row.getColumnWidths = function() {
		return columnWidths;
	};
	
	return row;
};