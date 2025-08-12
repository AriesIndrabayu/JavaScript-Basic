/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable("catatan", (table) => {
    table.increments("id");
    table.text("isi");
    table.string("kategori");
  });
};
exports.down = function (knex) {
  return knex.schema.dropTable("catatan");
};
