FROM golang:latest AS builder

WORKDIR /backend

COPY go.mod go.sum ./
#RUN go mod download

COPY . .

# Fuerza el uso del proxy Go
ENV GOPROXY=https://proxy.golang.org,direct

RUN go build -o Main .

EXPOSE 3000

CMD ["./Main"]
