class RemoveImgFromImages < ActiveRecord::Migration[5.1]
  def change
    remove_column :images, :img, :text
  end
end
