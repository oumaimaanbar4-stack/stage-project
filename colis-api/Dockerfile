FROM php:8.2-apache

# Enable Apache URL rewrite module
RUN a2enmod rewrite

# Install MySQL extensions for PHP
RUN docker-php-ext-install pdo pdo_mysql mysqli

# Copy backend files into Apache web root
COPY . /var/www/html/

EXPOSE 80