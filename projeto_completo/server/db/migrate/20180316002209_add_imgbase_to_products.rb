class AddImgbaseToProducts < ActiveRecord::Migration[5.1]
  def change
    add_column :products, :imgbase, :text
  end
end
