class CreateSales < ActiveRecord::Migration[5.1]
  def change
    create_table :sales do |t|
      t.references :salesman
      t.references :buyer
      t.references :product, foreign_key: true
      t.decimal :price, precision: 14, scale: 2
      t.string :status

      t.timestamps
    end
  end
end
