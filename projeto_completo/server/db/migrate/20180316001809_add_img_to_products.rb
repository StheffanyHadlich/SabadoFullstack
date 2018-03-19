class AddImgToProducts < ActiveRecord::Migration[5.1]
  def change
    add_column :products, :img, :json
  end
end
