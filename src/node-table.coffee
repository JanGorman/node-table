Util    = require './util'
Column  = require './column'
Row     = require './row'

class Table
  autoSeparateNone    = 0x0
  autoSeparateHeader  = 0x1
  autoSeparateFooter  = 0x2
  autoSeparateAll     = 0x3
  corner              = '+'
  horizontal          = '-'
  vertical            = '|'
  
  padding                 = 0
  tableColumnWidths       = null
  defaultColumnAlignment  = []
  rows                    = []
  autoSeparate            = autoSeparateAll
  
  repeat = Util.repeat
  
  constructor: (@columnWidths) ->
    
  setDefaultColumnAlignment: (alignment) ->
    defaultColumnAlignment = alignment
    this

  appendRow: (row) ->
    if row.length > tableColumnWidths.length
      throw new Error 'The row contains too many columns'
    
    data = row
    row = new Row()
    for item in data
      align = defaultColumnAlignment[_i] || null
      row.appendColumn new Column item, align
    rows[rows.length] = row
    this
  
  drawBorder: (result, columnWidths) ->
    result += corner
    for columnWidth in columnWidths
      result += repeat(horizontal, columnWidth) + corner
    result += "\n"
  
module.exports = Table