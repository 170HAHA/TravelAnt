#!/bin/bash
apt-get install -y curl
curl -sL https://deb.nodesource.com/setup_4.x | sudo -E bash -
apt-get install -y nodejs

echo "Installing nodejs..."
if [ ! -e /usr/bin/npm ]; then
  echo "Installing npm manually. Probably in precise32"
  /home/vagrant/introHCI/nodejs_precise.sh
fi

