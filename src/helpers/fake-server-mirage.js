import { createServer, Model, trait, Factory } from 'miragejs';

const configServer = () => {
  createServer({
    models: {
      user: Model,
    },

    factories: {
      user: Factory.extend({
        data(i) {
          return {
            id: i,
            firstName: 'Vu',
            lastName: 'Name',
            age: '22',
            phone: '0971940618',
            role: 'Admin',
            address: 'Ha noi',
          };
        },
        withUsers: trait({
          afterCreate(server, num, list) {
            server.createList('user', num, { list });
          },
        }),
      }),
    },

    seeds(server) {
      server.create('user', {
        id: 1,
        avatar: 'avatar1.png',
        firstName: 'Vu',
        lastName: 'Nam',
        age: '22',
        phone: '0971940618',
        role: 'Admin',
        address: 'Xuan Mai',
        username: 'admin',
        password: 'admin',
      });
      server.create('user', {
        id: 2,
        avatar: 'avatar2.png',
        firstName: 'Quoc',
        lastName: 'Anh',
        age: '24',
        phone: '0971940618',
        role: 'Sale',
        address: 'Ha noi',
        username: 'sale',
        password: 'sale',
      });
    },

    routes() {
      // User
      this.get('/users', (schema) => schema.users.all());

      this.post('/login', (schema, request) => {
        const { username, password } = JSON.parse(request.requestBody);
        const user = schema.users.findBy({ username, password });
        if (user) {
          return {
            status: 200,
            user: {
              firstName: user.attrs.firstName,
              lastName: user.attrs.lastName,
              avatar: user.attrs.avatar,
              age: user.attrs.age,
              phone: user.attrs.phone,
              role: user.attrs.role,
              address: user.attrs.address,
              token: 'fake-jwt-tokey.eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9',
            },
          };
        } else {
          return {
            status: 401,
          };
        }
      });
    },
  });
};

export default configServer;
