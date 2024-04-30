#
#  Docker instruction set for building a container.
#  Created On 30 April 2024
#

FROM joseluisq/static-web-server:2-alpine

WORKDIR /srv

COPY ./dist /srv

CMD [ "static-web-server", "-p", "8787", "-d", "/srv" ]