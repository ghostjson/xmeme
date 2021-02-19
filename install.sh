sudo apt update

# install python3
sudo apt-get install -y python3

#install pip3
sudo apt-get install -y python3-pip

#install flask
sudo pip3 install flask

#installing java
sudo apt-get install -y software-properties-common

wget -qO - https://adoptopenjdk.jfrog.io/adoptopenjdk/api/gpg/key/public | sudo apt-key add -
sudo add-apt-repository --yes https://adoptopenjdk.jfrog.io/adoptopenjdk/deb/
sudo apt-get install -y adoptopenjdk-15-hotspot


#install mysql

sudo apt install -y mysql-server

sudo mysql -e "CREATE USER 'xmemeuser'@'localhost' IDENTIFIED BY '1234';"

sudo mysql -e "GRANT ALL PRIVILEGES ON * . * TO 'xmemeuser'@'localhost' WITH GRANT OPTION;"

sudo mysql -e "FLUSH PRIVILEGES;"

sudo mysql -e "CREATE DATABASE xmeme;"
