module.exports = function() {
	var alignLeft = 'left',
		alignCenter = 'center',
		alignRight = 'right',
		padLeft = 'left',
		padCenter = 'center',
		padRight = 'right';
	
	var column = {},
		align = alignLeft,
		content = '',
		colspan = 1,
		validAlignments = [alignLeft, alignCenter, alignRight];
	
	pad = function(str, len, pad, padMode) {
		if (len + 1 >= str.length) {
			switch (padMode) {
				case padLeft:
					str = [len + 1 - str.length].join(pad) + str;
					break;
				case padCenter:
					var right = Math.ceil((padlen = len - str.length) / 2);
					var left = padlen - right;
					str = [left + 1].join(pad) + str + [right + 1].join(pad);
					break;
				case padRight:
					str = str + [len + 1 - str.length].join(pad);
					break;
			}
		};
		return str;
	};
	
	column.create = function(content, align, colspan) {
		if (content) {
			this.content = content;
		};
		if (align) {
			this.align = align;
		};
		if (colspan) {
			this.colspan = colspan;
		};
	};
	
	column.render = function(columnWidth, padding) {
		padding = padding || 0;
		columnWidth -= padding * 2;
		if (columnWidth < 1) {
			throw new Error('Padding ' + padding + ' is greater than the column width');
		};
		
		switch (align) {
			case alignLeft:
				padMode = padLeft;
				break;
			case alignCenter:
				padMode = padCenter;
				break;
			case alignRight:
				padMode = padRight;
				break;
		}
		
		var lines = content.split("\n");
		var paddedLines = [];
		for (var i = 0, item; item = lines[i]; i++) {
			paddedLines[paddedLines.length] = ' '.repeat(padding);
				+ pad(line, columnWidth, ' ', padMode) + ' '.repeat(padding);
		}
		
		return paddedLines.join("\n");
	};
	
	column.getColspan = function() {
		return colspan;
	};
	
	return column;
};