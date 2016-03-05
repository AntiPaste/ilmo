FROM    frolvlad/alpine-python3

ENV     ENVIRONMENT docker
ENV     PYTHONPATH /

# Install SSL certificates
RUN     apk add --update build-base ca-certificates python-dev

# Copy the requirements file
COPY    ./ilmo/requirements.txt /ilmo/

# Install app dependencies
RUN     pip install -r /ilmo/requirements.txt

# Bundle the source
COPY    ./ilmo/ /ilmo/

# Copy the configuration
COPY    ./config/ /etc/ilmo/

# Expose port 8000
EXPOSE  8000

CMD     ["/usr/bin/python", "-m", "ilmo", "--config", "/etc/ilmo/docker.json"]
