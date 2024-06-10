FROM debian:bookworm

# Set the locale 
RUN apt-get update && apt-get install -y locales && rm -rf /var/lib/apt/lists/* \
	&& localedef -i en_US -c -f UTF-8 -A /usr/share/locale/locale.alias en_US.UTF-8
ENV LANG en_US.utf8

# install vim and git and ffmpeg
RUN apt-get update && apt-get install -y vim git ffmpeg

# set working directory
WORKDIR /app/

# entrypoint
ENTRYPOINT ["/bin/bash"]
