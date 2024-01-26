# Usa la imagen oficial de Python
FROM python:3.10.4-alpine3.15

# Establece el directorio de trabajo en la carpeta del proyecto
WORKDIR /usr/src/app

# Copia el archivo de requisitos al contenedor
COPY requirements.txt ./

# Instala las dependencias
RUN pip install --no-cache-dir -r requirements.txt

# Copia el contenido del proyecto al contenedor
COPY . .

# Puerto en el que Django se ejecutará
EXPOSE 8000

# Comando para ejecutar el servidor de desarrollo de Django
CMD ["python", "django_defensoria_universitaria/manage.py", "runserver", "0.0.0.0:8000"]





