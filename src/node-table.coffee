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

  render: ->
    if rows.length == 0
      throw new Error 'No rows added to the table yet'

    result = ''
    numRows = rows.length
    for row in rows
      if columnWidths
        lastColumnWidths = columnWidths
        
      renderedRow = row.render(tableColumnWidths, padding)
      columnWidths = row.getColumnWidths()
      numColumns = columnWidths.length

      if _i == 0
        result = drawBorder result, columnWidths
      else
        if autoSeparate & autoSeparateAll
          drawSeparator = true
        else if _i == 1 && autoSeparate & autoSeparateHeader
          drawSeparator = true
        else if _i == (numRows - 1) && autoSeparate & autoSeparateFooter
          drawSeparator = true
        else
          drawSeparator = false

        if drawSeparator
          result += vertical
          currentUpperColumn  = 0
          currentLowerColumn  = 0
          currentUpperWidth   = 0
          currentLowerWidth   = 0
          
          for columnWidth in tableColumnWidths
            result += repeat horizontal, columnWidth
            if _j + 1 == tableColumnWidths.length
              break
              
            connector = 0x0
            currentUpperWidth += columnWidth
            currentLowerWidth += columnWidth
            
            if lastColumnWidths[currentUpperColumn] == currentUpperWidth
              connector |= 0x1
              currentUpperColumn += 1
              currentUpperWidth = 0
            else
              currentUpperWidth += 1
              
            if columnWidths[currentLowerColumn] == currentLowerWidth
              connector |= 0x2
              currentLowerColumn += 1
              currentLowerWidth = 0
            else
              currentLowerWidth += 1
              
            switch connector
              when 0x0 then result += horizontal
              else result += corner
              
          result += vertical + "\n"
      
      result += renderedRow
      
      # Last row? Draw the table bottom
      if rowNum + 1 == numRows
        result = drawBorder result, columnWidths
      
    result

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