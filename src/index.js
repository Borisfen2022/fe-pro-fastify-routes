import Fastify from 'fastify';

import { users } from './users';

const fastify = Fastify({
  logger: true,
});
fastify.register(import('@fastify/cors'));
fastify.register(import('@fastify/multipart'), {
  addToBody: true,
});
fastify.register(import('@fastify/cookie'));

fastify.post('/uppercase', (request, reply) => {
  const text = request.body;
  if (text.toLowerCase().includes('fuck')) {
    reply.status(403).send('unresolved');
  } else {
    reply.status(200).send(text.toUpperCase());
  }
});

fastify.post('/lowercase', (request, reply) => {
  const text = request.body;
  if (text.toLowerCase().includes('fuck')) {
    reply.status(403).send('unresolved');
  } else {
    reply.status(200).send(text.toLowerCase());
  }
});

fastify.get('/user/:id', (request, reply) => {
  const { id } = request.params;

  const user = users[id];
  if (user) {
    reply.status(200).send(user);
  } else {
    reply.status(400).send('User not exist');
  }
});

fastify.get('/users', (request, reply) => {
  const { filter, value } = request.query;
  const userValues = Object.values(users);
  if (!filter || !value) {
    return reply.send(userValues);
  } else {
    const filteredUsers = userValues.filter((user) => {
      return user[filter].toString() === value;
    });
    reply.send(filteredUsers);
  }
});

export default fastify;