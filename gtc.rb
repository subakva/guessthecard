require 'rubygems'
require 'sinatra'

set :public, 'public'

get '/' do
  redirect '/index.html'
end
