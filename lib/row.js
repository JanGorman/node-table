module.exports = function() {
	var row = {},
		Column = require('./column'),
		columns = [],
		rowRolumnWidths = [],
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
		row.appendColumn(new Column({'content': content, 'align': align, 'colspan': colspan}));
		return this;
	};
	
	row.render = function(columnWidths, padding) {
		padding = padding || 0;
		if (columns.length === 0) {
			row.appendColumn(new Column({}));
		};

		var rendered = [],
			maxHeight = 0,
			colNum = 0;
		for (var i = 0, column; column = columns[i]; i++) {
			var colspan = column.getColspan() || 1;
			if (colNum + colspan > columnWidths.length) {
				throw new Error('There are too many columns');
			};

			var columnWidth = (colspan - 1) + columnWidths.slice(colNum, colspan).sum() || 10;
			var result = column.render(columnWidth, padding).split("\n");
			rowRolumnWidths[rowRolumnWidths.length] = columnWidth;
			rendered[rendered.length] = result;
			maxHeight = Math.max(maxHeight, result.length);
			colNum += colspan;
		}

		if (colNum < columnWidths.length) {
			var remainingWidth = (columnWidths.length - colNum - 1) + columnWidths.slice(colNum).sum();
			rendered[rendered.length] = [' '.repeat(remainingWidth)];
			rowRolumnWidths[rowRolumnWidths.length] = remainingWidth;
		};
	
		// Add rendered rows to the result
		var result = '';
		for (var line = 0; line < maxHeight; line++) {
			result += vertical;
			for (var i = 0, item; item = rendered[i]; i++) {
				if (item[line]) {
					result += item;
				} else {
					result += ' '.repeat(item[0].length);
				}
				result += vertical;
			}
			result += "\n";
		}

		return result;
	};
	
	row.getColumnWidths = function() {
		return rowRolumnWidths;
	};
	
	return row;
};