class RemoveProductFromSales < ActiveRecord::Migration[5.1]
  def change
    remove_reference :sales, :product, foreign_key: true
  end
end
