module.exports = function(options) {
	var alignLeft = 'left',
		alignCenter = 'center',
		alignRight = 'right',
		padLeft = 'left',
		padCenter = 'center',
		padRight = 'right';

	var column = {},
		util = require('./util'),
		repeat = util.repeat,
		align = alignLeft,
		content = '',
		colspan = 1;
	
	pad = function(str, len, pad, padMode) {
		if (len + 1 >= str.length) {
			switch (padMode) {
				case padLeft:
					str = Array(len + 1 - str.length).join(pad) + str;
					break;
				case padCenter:
					var right = Math.ceil((padlen = len - str.length) / 2);
					var left = padlen - right;
					str = Array(left + 1).join(pad) + str + Array(right + 1).join(pad);
					break;
				case padRight:
					str = str + Array(len + 1 - str.length).join(pad);
					break;
			}
		}
		return str;
	}
	
	setConfig = function(key, value) {
		switch (key) {
			case 'content':
				content = value;
				break;
			case 'align':
				align = value;
				break;
			case 'colspan':
				colspan = value;
				break
		}
	};

	column.render = function(columnWidth, padding) {
		padding = padding || 0;
		columnWidth -= padding * 2;
		if (columnWidth < 1) {
			throw new Error('Padding ' + padding + ' is greater than the column width');
		}
		
		switch (align) {
			default:
			case alignLeft:
				padMode = padRight;
				break;
			case alignCenter:
				padMode = padCenter;
				break;
			case alignRight:
				padMode = padLeft;
				break;
		}

		var lines = content.split("\n");
		var paddedLines = [];
		for (var i = 0, item; item = lines[i]; i++) {
			paddedLines[paddedLines.length] = repeat(' ', padding) + pad(item, columnWidth, ' ', padMode) + repeat(' ', padding);
		}
		
		return paddedLines.join("\n");
	}

	column.getColspan = function() {
		return colspan;
	}
	
	if (!options) {
		throw new Error('You need to set the options when creating a column');
	}
	
	['content', 'align', 'colspan'].forEach(function(conf) {
		setConfig(conf, options[conf]);
	});
	
	return column;
}