sudo apt-get install gnupg

wget -qO - https://www.mongodb.org/static/pgp/server-4.4.asc | sudo apt-key add -

echo "deb http://repo.mongodb.org/apt/debian buster/mongodb-org/4.4 main" | sudo tee /etc/apt/sources.list.d/mongodb-org-4.4.list

sudo apt-get update

sudo apt-get install -y mongodb-org

INIT=$(ps --no-headers -o comm 1)

if [ "$INIT" == 'systemd' ]; then
	echo Starting with systemd
	sudo systemctl start mongod
	if [ "$?" = -1 ]; then
		sudo systemctl daemon-reload
		sudo systemctl start mongod
	fi
	sudo systemctl status mongod
	if [ "$?" = -1 ]; then
		sudo systemctl enable mongod
	fi
else
	echo Starting with service
	sudo service mongod start
	sudo service mongod status
fi
		
