#!/bin/bash
set -e 
echo "Configurando o ambiente para o Argus Dashboard..."

if ! id "argus" &>/dev/null; then
    echo "Criando usuário 'argus'..."
    useradd --system --no-create-home --shell /bin/false argus
fi
chown -R argus:argus /opt/argus

echo "Configurando ambiente virtual Python..."
python3 -m venv /opt/argus/backend/venv
/opt/argus/backend/venv/bin/pip install --upgrade pip
/opt/argus/backend/venv/bin/pip install -r /opt/argus/backend/requirements.txt

echo "Configurando o Nginx..."
rm -f /etc/nginx/sites-enabled/default
ln -sf /etc/nginx/sites-available/argus.conf /etc/nginx/sites-enabled/argus.conf

echo "Habilitando e iniciando o serviço do backend..."
systemctl daemon-reload
systemctl enable argus-backend.service
systemctl restart argus-backend.service
systemctl reload-or-restart nginx

echo "Instalação do Argus Dashboard concluída!"