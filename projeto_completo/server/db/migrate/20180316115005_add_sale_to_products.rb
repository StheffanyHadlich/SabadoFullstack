class AddSaleToProducts < ActiveRecord::Migration[5.1]
  def change
    add_reference :products, :sale, foreign_key: true
  end
end
