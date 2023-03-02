@echo off

set HOST=139.144.177.113
set USER=root
set PASS=67s6%aKhLdesdEh

ssh %USER%@%HOST% "cd /root/svelte; git clone https://github.com/Mareczekk2137/Krakon; cd ./Krakon; npm install; npm run build"
ssh root@139.144.177.113
67s6%aKhLdesdEh
cd /root/svelte
rm -r Krakon
git clone https://github.com/Mareczekk2137/Krakon
cd ./Krakon
npm install
npm run build
