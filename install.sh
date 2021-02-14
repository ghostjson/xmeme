sudo apt update

# install python3
sudo apt-get install -y python3

#install pip3
sudo apt-get install -y python3-pip

#install flask
sudo pip3 install flask

#ensuring add-apt-repository is installed
sudo apt-get install software-properties-common

#installing java
sudo add-apt-repository -y ppa:linuxuprising/java

sudo apt update

sudo apt install -y oracle-java15-installer

#install mysql

sudo apt install -y mysql-server

sudo mysql -e "CREATE USER 'xmemeuser'@'localhost' IDENTIFIED BY '1234';"

sudo mysql -e "GRANT ALL PRIVILEGES ON * . * TO 'xmemeuser'@'localhost' WITH GRANT OPTION;"

sudo mysql -e "FLUSH PRIVILEGES;"

sudo mysql -e "CREATE DATABASE xmeme;"