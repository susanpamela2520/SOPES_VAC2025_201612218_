FROM python:3.8

WORKDIR /apiPython

COPY requirements.txt requirements.txt

RUN pip3 install -r requirements.txt

COPY . .

EXPOSE 4000

CMD ["python", "./main.py"]