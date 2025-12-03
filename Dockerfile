# -----------------------------------------------------------
# ÉTAPE 1 : Build du Frontend (Assets React/Vite)
# -----------------------------------------------------------
FROM node:20-alpine as frontend

WORKDIR /app

# Copie des fichiers de dépendances pour le cache
COPY package.json package-lock.json ./
RUN npm ci

# Copie du code source et compilation
COPY . .
RUN npm run build

# -----------------------------------------------------------
# ÉTAPE 2 : Build du Backend (Laravel / PHP 8.4)
# -----------------------------------------------------------
# On utilise la version 8.4 pour correspondre à ton 'sail/runtimes/8.4'
FROM serversideup/php:8.4-fpm-nginx

# Optimisation des performances PHP pour la prod
ENV PHP_OPCACHE_ENABLE=1

# Dossier de travail standard
WORKDIR /var/www/html

ENV APACHE_DOCUMENT_ROOT /var/www/html/public

ENV APACHE_DOCUMENT_ROOT /var/www/html/public

# 2. Modifie la config Apache pour utiliser ce dossier
RUN sed -ri -e 's!/var/www/html!${APACHE_DOCUMENT_ROOT}!g' /etc/apache2/sites-available/*.conf
RUN sed -ri -e 's!/var/www/html!${APACHE_DOCUMENT_ROOT}!g' /etc/apache2/apache2.conf /etc/apache2/conf-available/*.conf

# 3. Active le mod_rewrite (OBLIGATOIRE pour les routes Laravel)
RUN a2enmod rewrite

# Passage en root pour la copie et les permissions
USER root

# Copie de l'intégralité du code source Laravel
COPY . .

# -- POINT CRUCIAL --
# Récupération des assets compilés (build) depuis l'étape 1

COPY --from=frontend /app/public/build /var/www/html/public/build

# Ajustement des permissions pour l'utilisateur de l'image (webuser)

RUN chown -R webuser:webuser /var/www/html

# Passage en utilisateur standard pour l'installation des paquets
USER webuser

# Installation des dépendances PHP (Mode Production)
# --no-dev : Exclut PHPUnit, Mockery, etc.
RUN composer install --no-dev --no-interaction --prefer-dist --optimize-autoloader

# L'image serversideup lance automatiquement Nginx et PHP-FPM
# sur le port 8080,

