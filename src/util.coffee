module.exports =
  repeat: (str, n) ->
    Array(n + 1).join str
    
  sum: array ->
    iterator = (pv, cv) -> pv + cv
    array.reduce iterator, 0

# exports.repeat = function(str, n) {
#   return Array(n + 1).join(str);
# };
# 
# exports.sum = function(array) {
#   return array.reduce(function(pv, cv) { return pv + cv }, 0);
# };