/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.alterTable("catatan", function (table) {
    table.string("kategori").nullable();
    table.text("keterangan").nullable();
    table.boolean("status").defaultTo(true);
    table.timestamp("deleted_at").nullable();
    table.timestamps(true, true); // created_at & updated_at
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.alterTable("catatan", function (table) {
    table.dropColumn("kategori");
    table.dropColumn("keterangan");
    table.dropColumn("status");
    table.dropColumn("deleted_at");
    table.dropTimestamps();
  });
};
