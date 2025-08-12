/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.alterTable("catatan", function (tabel) {
    tabel.text("keterangan").nullable();
    tabel.boolean("status").defaultTo(true);
    tabel.timestamp("deleted_at").nullable();
    tabel.timestamps(true, true);
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.alterTable("catatan", function (tabel) {
    tabel.dropColumn("keterangan");
    tabel.dropColumn("status");
    tabel.dropColumn("deleted_at");
    tabel.dropTimestamps();
  });
};
