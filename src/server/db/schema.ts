import {sql} from "drizzle-orm"
import {index, pgTableCreator, serial, timestamp, varchar} from "drizzle-orm/pg-core"

export const createTable = pgTableCreator((name) => `theodosis_${name}`)

// IMAGES **********************************************************************************************************************************
export const images = createTable(
  "image",
  {
    id: serial("id").primaryKey(),
    name: varchar("name", {length: 256}).notNull(),
    url: varchar("url", {length: 1024}).notNull(),
    createdAt: timestamp("created_at")
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
    updatedAt: timestamp("updatedAt"),
  },
  (example) => ({
    nameIndex: index("name_idx").on(example.name),
  })
)

// SERVICES ********************************************************************************************************************************
// export const services = createTable(
//   "service",
//   {
//     id: serial("id").primaryKey(),
//     name: varchar("name", {length: 256}).notNull(),
//     url: varchar("url", {length: 1024}).notNull(),
//     createdAt: timestamp("created_at")
//       .default(sql`CURRENT_TIMESTAMP`)
//       .notNull(),
//     updatedAt: timestamp("updatedAt"),
//   },
//   (example) => ({
//     nameIndex: index("name_idx").on(example.name),
//   })
// )

