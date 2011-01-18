Util    = require './util'

class Column
  alignLeft    = 'left'
  alignCenter  = 'center'
  alignRight   = 'right'
  padLeft      = 'left'
  padCenter    = 'center'
  padRight     = 'right'
  
  repeat = Util.repeat
  
  constructor: (@content, @align, @colspan) ->
  
  getColspan: ->
    @colspan
    
  pad: (str, len, pad, padMode) ->
    if len + 1 >= str.length
      switch padMode
        when padLeft then Array(len + 1 - str.length).join(pad) + str
        when padCenter then (
          right = Math.ceil((padlen = len - str.length) / 2)
          left = padlen - right
          Array(left + 1).join(pad) + str + Array(right + 1).join(pad)
        )
        when padRight then str + Array(len + 1 - str.length).join(pad);
  
  render: (columnWidth, padding) ->
    padding = padding || 0
    columnWidth -= padding * 2
    if columnWidth < 1
      throw new Error """Padding #{padding} is greater than the column width"""
    
    switch @align
      when alignLeft then padMode = padRight
      when alignCenter then padMode = padCenter
      when alignRight then padMode = padLeft
      else padMode = padRight

    lines = @content.split "\n"
    paddedLines = []
    for item in lines
      paddedLines.push( repeat(' ', padding) + @pad(item, columnWidth, ' ', padMode) + repeat(' ', padMode))
    paddedLines.join("\n")
  
module.exports = Column