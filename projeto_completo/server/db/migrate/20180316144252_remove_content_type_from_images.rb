class RemoveContentTypeFromImages < ActiveRecord::Migration[5.1]
  def change
    remove_column :images, :contentType, :string
  end
end
