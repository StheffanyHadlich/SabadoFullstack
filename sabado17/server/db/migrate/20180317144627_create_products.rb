class CreateProducts < ActiveRecord::Migration[5.1]
  def change
    create_table :products do |t|
      t.string :name
      t.decimal :price, precision: 14, scale: 2
      t.text :description
      t.string :status

      t.timestamps
    end
  end
end
