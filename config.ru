require File.join(File.dirname(__FILE__), 'gtc.rb')

disable :run
set :environment, :production
run Sinatra::Application
