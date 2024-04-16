import {relations, sql} from "drizzle-orm"
import {integer, pgTable, serial, timestamp, varchar} from "drizzle-orm/pg-core"

// IMAGES **********************************************************************************************************************************
export const images = pgTable("image", {
  id: serial("id").primaryKey(),
  name: varchar("name", {length: 256}).notNull(),
  url: varchar("url", {length: 1024}).notNull(),
  createdAt: timestamp("created_at")
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
  updatedAt: timestamp("updatedAt"),
})

// SERVICES ********************************************************************************************************************************
export const services = pgTable("service", {
  id: serial("id").primaryKey(),
  name: varchar("name", {length: 256}).notNull(),
  imageId: integer("image_id")
    .notNull()
    .references(() => images.id),
  createdAt: timestamp("created_at")
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
  updatedAt: timestamp("updatedAt"),
})

export const servicesRelations = relations(services, ({one}) => ({
  image: one(images, {
    fields: [services.imageId],
    references: [images.id],
  }),
}))
