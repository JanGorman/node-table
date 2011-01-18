Util    = require './util'
Column  = require './column'

class Row
  columns         = []
  rowColumnWidths = []
  vertical        = '|'
  
  repeat = Util.repeat
  sum = Util.sum
  
  appendColumn: (column) ->
    columns[columns.length] = column
    this
    
  createColumn: (content, options) ->
    # maybe just give the options directly
    align = null
    colspan = null
    if options
      ['align', 'colspan'].forEach((conf) ->
        switch conf
          when 'align' then align = options[conf]
          when 'colspan' then colspan = options[colspan]
      )
    appendColumn new Column(content, align, colspan)
    this
    
  render: (columnWidths, padding) ->
    padding = padding || 0
    if columns.length == 0
      appendColumn new Column()

    rendered = []  
    colNum = maxHeight = 0
    for column in columns
      colspan = column.getColspan() || 1
      if colNum + colspan > columnWidths.length
        throw new Error 'There are too many columns'
      slice = if colNum + 1 == columnWidths.length then columnWidths.slice(colNum) else columnWidths.slice(colNum, colspan)
      columnWidth = (colspan - 1) + sum slice
      result = column.render(columnWidth, padding).split "\n"
      rowColumnWidths[rowColumnWidths.length] = columnWidth
      rendered[rendered.length] = result
      maxHeight = Math.max maxHeight, result.length
      colNum += colspan
      
    if colNum < columnWidths.length
      remainingWidth = (columnWidths.length - colNum - 1) + sum(columnWidths.slice colNum)
      rendered[rendered.length] = [repeat(' ', remainingWidth)]
      rowColumnWidths[rowColumnWidths.length] = remainingWidth

    # Add the rendered rows to the result
    result = ''
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
      
  getRowColumnWidths: ->
    rowColumnWidths
  
module.exports = Row