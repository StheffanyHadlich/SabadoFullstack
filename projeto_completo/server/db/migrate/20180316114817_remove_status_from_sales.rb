class RemoveStatusFromSales < ActiveRecord::Migration[5.1]
  def change
    remove_column :sales, :status, :string
  end
end
