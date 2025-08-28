#!/bin/bash
set -e

echo "Parando e desabilitando os serviços do Argus Dashboard..."

systemctl stop argus-backend.service || true
systemctl disable argus-backend.service || true

rm -f /etc/nginx/sites-enabled/argus.conf
if [ -f /etc/nginx/sites-available/default ]; then
    ln -sf /etc/nginx/sites-available/default /etc/nginx/sites-enabled/default
fi
systemctl reload-or-restart nginx || true

echo "Serviços do Argus Dashboard removidos."