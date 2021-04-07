FROM archlinux:latest
LABEL maintainer="lynx-roleplay <lynxrp.team@gmail.com>"

WORKDIR /app
COPY . /app

RUN pacman -Sy --noconfirm npm nodejs sudo --needed
RUN npm i
RUN ip -o route get to 8.8.8.8 | sed -n 's/.*src \([0-9.]\+\).*/\1/p'

CMD [ "npm", "start" ]