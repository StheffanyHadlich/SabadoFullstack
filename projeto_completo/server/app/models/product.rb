class Product < ApplicationRecord
    belongs_to :user
    references :sale
    has_many :comments
    has_many :images
    
end
