class CreateImages < ActiveRecord::Migration[5.1]
  def change
    create_table :images do |t|
      t.string :contentType
      t.decimal :size, precision: 14, scale: 4
      t.text :img

      t.timestamps
    end
  end
end
