# Etapa 1: build
FROM golang:1.24.3 AS builder

WORKDIR /app

COPY go.mod go.sum ./
RUN go mod download

COPY . .

RUN CGO_ENABLED=0 GOOS=linux go build -o docker-go

# Etapa 2: runtime
FROM alpine:latest

RUN apk --no-cache add ca-certificates

COPY --from=builder /app/docker-go /docker-go

EXPOSE 6000

ENTRYPOINT ["/docker-go"]