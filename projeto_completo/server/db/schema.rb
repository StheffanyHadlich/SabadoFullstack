# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20180316183101) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "comments", force: :cascade do |t|
    t.bigint "user_id"
    t.bigint "product_id"
    t.text "text"
    t.bigint "parent_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["parent_id"], name: "index_comments_on_parent_id"
    t.index ["product_id"], name: "index_comments_on_product_id"
    t.index ["user_id"], name: "index_comments_on_user_id"
  end

  create_table "images", force: :cascade do |t|
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.bigint "user_id"
    t.bigint "product_id"
    t.string "filename"
    t.string "img_file_name"
    t.string "img_content_type"
    t.integer "img_file_size"
    t.datetime "img_updated_at"
    t.text "file"
    t.index ["product_id"], name: "index_images_on_product_id"
    t.index ["user_id"], name: "index_images_on_user_id"
  end

  create_table "products", force: :cascade do |t|
    t.bigint "user_id"
    t.string "name"
    t.decimal "price", precision: 14, scale: 2
    t.text "description"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.json "img"
    t.text "imgbase"
    t.string "status"
    t.bigint "sale_id"
    t.index ["sale_id"], name: "index_products_on_sale_id"
  end

  create_table "sales", force: :cascade do |t|
    t.bigint "buyer_id"
    t.decimal "price", precision: 14, scale: 2
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["buyer_id"], name: "index_sales_on_buyer_id"
  end

  create_table "users", force: :cascade do |t|
    t.string "name"
    t.string "email"
    t.string "passwd"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  add_foreign_key "comments", "products"
  add_foreign_key "comments", "users"
  add_foreign_key "images", "products"
  add_foreign_key "images", "users"
  add_foreign_key "products", "sales"
end
