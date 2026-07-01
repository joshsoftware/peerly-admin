# deploy.rb
require 'mina/bundler'
require 'mina/deploy'
require 'mina/git'

set :user, 'ubuntu'
set :repository, 'https://github.com/joshsoftware/peerly-admin'
set :shared_files, [ 
  '.env'
]

# Define environments
task :production do
	set :deploy_to, '/www/peerly-admin'
	set :domain, 'intranet.joshsoftware.com'
	set :branch, 'Dev'
end

task :staging do
  set :deploy_to, '/www/peerly-admin'
  set :domain, 'pg-stage-intranet.joshsoftware.com'
  set :branch, 'Dev'
end

task :setup do
	command %{mkdir -p "#{fetch(:deploy_to)}/releases"}
end

# Main deploy task
task :deploy do
	deploy do
		# Clone the repository if it doesn't exist
		invoke :'git:clone'
		invoke :'deploy:link_shared_paths'
		# Install dependencies and build the project
		command %{source ~/.nvm/nvm.sh && npm install && npm run build}
		on :launch do
			command 'sudo systemctl reload nginx'
		end
	end
end