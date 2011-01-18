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
      for row, rowNum in rows
        if columnWidths
          lastColumnWidths = columnWidths
          
        renderedRow = row.render(@columnWidths, padding)
        columnWidths = row.getColumnWidths()
        numColumns = columnWidths.length
  
        if rowNum == 0
          result = drawBorder result, columnWidths
        else
          if autoSeparate & autoSeparateAll
            drawSeparator = true
          else if rowNum == 1 && autoSeparate & autoSeparateHeader
            drawSeparator = true
          else if rowNum == (numRows - 1) && autoSeparate & autoSeparateFooter
            drawSeparator = true
          else
            drawSeparator = false
  
          if drawSeparator
            result += vertical
            currentUpperColumn  = 0
            currentLowerColumn  = 0
            currentUpperWidth   = 0
            currentLowerWidth   = 0
            
            for columnWidth, columnNum in @columnWidths
              result += repeat horizontal, columnWidth
              if columnNum + 1 == @columnWidths.length
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
      if row.length > @columnWidths.length
        throw new Error 'The row contains too many columns'
      
      data = row
      row = new Row()
      for item, i in data
        align = defaultColumnAlignment[i] || null
        row.appendColumn new Column item, align
      rows[rows.length] = row
      this
    
    drawBorder: (result, columnWidths) ->
      result += corner
      for columnWidth in columnWidths
        result += repeat(horizontal, columnWidth) + corner
      result += "\n"
  
module.exports = Table