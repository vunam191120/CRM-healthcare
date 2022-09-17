import { createServer, Model, trait, Factory } from 'miragejs';

const configServer = () => {
  createServer({
    models: {
      user: Model,
    },

    factories: {
      user: Factory.extend({
        id(i) {
          return `${i}`;
        },
        avatar(i) {
          return `avatar${i}.png`;
        },
        firstName(i) {
          return `Vu ${i}`;
        },
        lastName(i) {
          return `Nam ${i}`;
        },
        phone(i) {
          return `0123456${i}`;
        },
        role(i) {
          return `sale`;
        },
        gender() {
          return `Female`;
        },
        dateOfBirth() {
          return `02-09-1945`;
        },
        experiences() {
          return `100 years of sales`;
        },
        email(i) {
          return `sale${i}@gmail.com`;
        },
        password() {
          return `sale`;
        },
        withUsers: trait({
          afterCreate(list, server, num) {
            server.createList('user', 4, list);
          },
        }),
      }),
    },

    seeds(server) {
      server.create('user', {
        // id: 1,
        avatar: 'avatar1.png',
        firstName: 'Vu Hai',
        lastName: 'Nam',
        phone: '0971940618',
        role: 'Admin',
        gender: 'Male',
        dateOfBirth: '02-09-1945',
        experiences: '100 years of admin',
        email: 'admin@gmail.com',
        password: 'admin',
      });
      server.create('user', 'withUsers');
    },

    routes() {
      // User
      this.get('/users', (schema) => schema.users.all());

      this.get('/users/:userId', (schema, request) => {
        // const body = JSON.parse(request.requestBody);
        // console.log('Body at server', body);
        // console.log('Yay called');
        let { userId } = request.params;
        const user = schema.users.find(userId);
        if (user) {
          return {
            firstName: user.attrs.firstName,
            lastName: user.attrs.lastName,
            avatar: user.attrs.avatar,
            gender: user.attrs.gender,
            phone: user.attrs.phone,
            role: user.attrs.role,
            dateOfBirth: user.attrs.dateOfBirth,
            experiences: user.attrs.experiences,
            email: user.attrs.email,
            password: user.attrs.password,
          };
        } else {
          return {
            status: 404,
            message: `Cannot find the user with id ${userId}`,
          };
        }
      });

      this.post('/users/create', (schema, request) => {
        const newUser = {
          avatar: 'avatarCreate.png',
          firstName: 'Quoc',
          lastName: 'Anh',
          age: '24',
          phone: '11111111111',
          role: 'Back officer',
          gender: 'Male',
          dateOfBirth: '02-09-1945',
          experiences: '22 years of being a couch potato :D',
          address: 'Ha noi',
          email: 'baCreate@gmail.com',
          password: 'ba',
        };
        schema.users.create(newUser);
        return newUser;
      });

      this.put('/users/update/:userId', (schema, request) => {});

      this.post('/login', (schema, request) => {
        const { email, password } = JSON.parse(request.requestBody);
        const user = schema.users.findBy({
          email,
          password,
        });
        console.log(user);
        if (user) {
          return {
            status: 200,
            user: {
              firstName: user.attrs.firstName,
              lastName: user.attrs.lastName,
              avatar: user.attrs.avatar,
              gender: user.attrs.gender,
              phone: user.attrs.phone,
              role: user.attrs.role,
              dateOfBirth: user.attrs.dateOfBirth,
              experiences: user.attrs.experiences,
              email: user.attrs.email,
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
