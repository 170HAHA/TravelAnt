echo "Installing node packages..."
apt-get install -y g++
npm install -g express
#Kerberos required for mongoose
apt-get install -y libkrb5-dev
npm install -g mongoose

