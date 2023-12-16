FROM python:3.10.6

ENV PYTHONUNBUFFERED 1

RUN mkdir /ArtShah
WORKDIR /ArtShah

# Копирование зависимостей приложения
COPY requirements.txt /ArtShah/
RUN pip install -r requirements.txt

# Копирование кода приложения в контейнер
COPY . /ArtShah/
