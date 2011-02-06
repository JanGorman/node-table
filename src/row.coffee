Util    = require './util'
Column  = require './column'

class Row
  vertical          = '|'
  
  repeat = Util.repeat
  sum = Util.sum
  
  constructor: ->
    @columnWidths = []
    @columns = []
  
  appendColumn: (column) ->
    @columns[@columns.length] = column
    this
    
  createColumn: (content, align, colspan) ->
    appendColumn new Column(content, align, colspan)
    this
    
  render: (columnWidths, padding) ->
    padding or= 0
    if @columns.length == 0
      appendColumn new Column

    rendered = []  
    colNum = maxHeight = 0
    for column in @columns
      colspan = column.getColspan()
      if colNum + colspan > columnWidths.length
        throw new Error 'There are too many columns'
      # array slicing has some annyoing limitations in JS
      slice = @betterSlice(columnWidths, colNum, colspan)
      columnWidth = (colspan - 1) + sum slice
      result = column.render(columnWidth, padding).split "\n"
      @columnWidths[@columnWidths.length] = columnWidth
      rendered[rendered.length] = result
      maxHeight = Math.max maxHeight, result.length
      colNum += colspan
      
    if colNum < columnWidths.length
      remainingWidth = (columnWidths.length - colNum - 1) + sum(columnWidths.slice colNum)
      rendered[rendered.length] = [repeat(' ', remainingWidth)]
      @columnWidths[@columnWidths.length] = remainingWidth

    # Add the rendered rows to the result
    result = ''
    line = 0
    while line < maxHeight
      result += vertical
      for item in rendered
        if item[line]
          result += item[line]
        else
          result += repeat ' ', item[0].length
        result += vertical
      result += "\n"  
      line++

    result
    
  betterSlice: (array, offset, length) ->
    if !length
      slice = array.slice offset
    else if length >= 0
      slice = array.slice offset, (offset + length)
    else
      slice = array.slice offset, length;
    slice
      
  getColumnWidths: ->
    @columnWidths
  
module.exports = Row