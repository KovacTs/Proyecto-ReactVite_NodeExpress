// migrations/xxxxxxxxxxxxx_create-users-table.js
exports.up = pgm => {
  pgm.createTable('usuarios', {
    id: 'id', // Esto crea un SERIAL PRIMARY KEY
    name: { type: 'varchar(100)', notNull: true },
    email: { type: 'varchar(100)', notNull: true, unique: true },
    password: { type: 'varchar(100)', notNull: true },
    created_at: {
      type: 'timestamp with time zone',
      notNull: true,
      default: pgm.func('current_timestamp'),
    },
  });
};

exports.down = pgm => {
  pgm.dropTable('usuarios');
};
