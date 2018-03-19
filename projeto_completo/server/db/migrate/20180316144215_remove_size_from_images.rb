class RemoveSizeFromImages < ActiveRecord::Migration[5.1]
  def change
    remove_column :images, :size, :decimal, precision: 14, scale: 4
  end
end
