module.exports = function(options) {
	var autoSeparateNone = 0x0,
		autoSeparateHeader = 0x1,
		autoSeparateFooter = 0x2,
		autoSeparateAll = 0x3;
	
	var table = {},
		Row = require('row'),
		Column = require('column'),
		rows = [],
		columnWidths = [],
		defaultColumnAlignment = [],
		autoSeparate = autoSeparateAll;
	
	// Ok to do this in node?
	String.prototype.repeat = function(n) {
		return [n + 1].join(this);
	};
	Array.prototype.sum = function() {
		return (!this.length) ? 0 : this.slice(1).sum() + ((typeof this[0] === 'number') ? this[0] : 0);
	};
	
	/**
	 * Append a row to the table
	 *
	 * @param {Array|Row} the row to append
	 */
	table.appendRow = function(row) {
		if (!Array.isArray(row)) {
			// something useful
		};
		
		if (row.length > columnWidths.length) {
			// something useful
		};
		
		var data = row;
		row = new Row();
		for (var i = 0, item; item = row[i]; i++) {
			var align = defaultColumnAlignment[i] || null; // necessary?
			row.appendColumn(new Column(item, align));
		}
		
		rows[rows.length] = row;
		
		return this;
	};
	
	/**
	 * Render the table
	 */
	table.render = function() {
		
	};
	
	
	return table;
};