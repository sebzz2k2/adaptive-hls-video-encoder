FROM debian:bookworm

# Set the locale 
RUN apt-get update && apt-get install -y locales && rm -rf /var/lib/apt/lists/* \
	&& localedef -i en_US -c -f UTF-8 -A /usr/share/locale/locale.alias en_US.UTF-8
ENV LANG en_US.utf8

# Install vim, git, and ffmpeg
RUN apt-get update && apt-get install -y vim git ffmpeg

# Set working directory
WORKDIR /app/

# Copy the conversion script into the container
COPY convert.sh /app/convert.sh
RUN chmod +x /app/convert.sh

# Entrypoint
ENTRYPOINT ["/bin/bash"]

