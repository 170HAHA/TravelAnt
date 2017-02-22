echo "Installing vim and git..."
apt-get update
apt-get install -y git

/home/vagrant/travelant/mongo.sh
/home/vagrant/travelant/nodejs.sh
/home/vagrant/travelant/heroku.sh
/home/vagrant/travelant/npm.sh

echo "Cleanup..."
apt-get upgrade
apt-get autoremove
echo "Done!"

