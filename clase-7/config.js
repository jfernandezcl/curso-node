export const {
  PORT = 3000,
  SALT_ROUNDS = 10,
  SECRET_JWT__KEY = 'this-is-an- awesome-secret' // --> esto tiene que ser mucho más largo y será más seguro
} = process.env