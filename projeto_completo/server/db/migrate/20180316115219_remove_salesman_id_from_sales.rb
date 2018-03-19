class RemoveSalesmanIdFromSales < ActiveRecord::Migration[5.1]
  def change
    remove_column :sales, :salesman_id, :bigint
  end
end
