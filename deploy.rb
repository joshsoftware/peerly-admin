# deploy.rb

require 'mina/bundler'
require 'mina/npm'
require 'mina/deploy'
require 'mina/git'

set :user, 'ubuntu'
set :repository, 'https://github.com/joshsoftware/peerly-admin'

set :shared_files, [ 
  '.env'
]

task :staging do
  set :deploy_to, '/www/peerly-admin'
  set :domain, 'pg-stage-intranet.joshsoftware.com'
  set :branch, 'Dev'
  command %{source ~/.nvm/nvm.sh}
end

task :setup do

	command %{mkdir -p "#{fetch(:deploy_to)}/releases"}

end

task :deploy do
	deploy do

			# Clone the repository if it doesnt exist
			invoke :'git:clone'
			invoke :'deploy:link_shared_paths'

			# Install dependencies and build the project
			command 'npm install'
			command 'npm run build'

			on :launch do
				command 'sudo systemctl reload nignx'
			end
		
	end
end

