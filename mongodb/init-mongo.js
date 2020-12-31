db.createUser({
  user: 'increment-svc-db-user',
  pwd: 'incrementsvcpassword',
  roles: [
    {
      role: 'readWrite',
      db: 'increment-svc-db',
    },
  ],
});
