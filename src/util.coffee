module.exports =
  repeat: (str, n) ->
    Array(n + 1).join str
    
  sum: array ->
    iterator = (pv, cv) -> pv + cv
    array.reduce iterator, 0