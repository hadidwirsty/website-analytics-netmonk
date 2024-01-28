FROM python:3.10-buster

RUN apt-get update

RUN mkdir app
WORKDIR /app

COPY . .

RUN pip install -r requirements.txt
