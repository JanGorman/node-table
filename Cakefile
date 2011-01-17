{exec, spawn} = require 'child_process'

handleError = (err) ->
  if err
    console.log err.stack
    
print = (data) -> console.log data.toString().trim()

option 's', '--spec', 'Use Vows spec mode'

task 'build', 'Compile node-table CoffeeScript to JavaScript', ->
  exec 'mkdir -p lib && ln -sf ../src/node-table.desc lib && coffee -c -o lib src', handleError
  
task 'clean', 'Remove generated JavaScript files', ->
  exec 'rm -rf lib', handleError
  
task 'test', 'Test the application', ->
  args = [
    
  ]
  args.unshift '--spec' if options.spec
  
  vows = spawn 'vows', args
  vows.stdout.on 'data', print
  vows.stderr.on 'data', print
  
task 'dev', 'Continuous compilation', ->
  coffee = spawn 'coffee', '-wc --bare -o lib src'.split(' ')
  coffee.stdout.on 'data', print
  coffee.stderr.on 'data', print