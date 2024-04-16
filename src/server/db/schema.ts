import {relations, sql} from "drizzle-orm"

import {integer, pgTable, real, serial, text, timestamp, varchar} from "drizzle-orm/pg-core"

// CONTACT *********************************************************************************************************************************
export const contacts = pgTable("contact", {
  id: serial("id").primaryKey(),
  name: varchar("name", {length: 256}).notNull(),
  logoId: integer("logo_id").references(() => images.id),
  email: text("email").unique().notNull(),
  phone: text("phone").notNull(),
  street: text("street").notNull(),
  zipcode: text("zipcode").notNull(),
  city: text("city").notNull(),
  lat: real("lat").notNull(),
  lng: real("lng").notNull(),
  instagram: text("instagram"),
  youtube: text("youtube"),
  facebook: text("facebook"),
  createdAt: timestamp("created_at")
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
  updatedAt: timestamp("updatedAt"),
})

export const contactsRelations = relations(contacts, ({one}) => ({
  logo: one(images, {
    fields: [contacts.logoId],
    references: [images.id],
  }),
}))

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
  excerpt: text("excerpt").notNull(),
  content: text("content"),
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
