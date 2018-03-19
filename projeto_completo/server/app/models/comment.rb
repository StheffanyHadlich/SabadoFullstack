class Comment < ApplicationRecord
  belongs_to :user
  belongs_to :product
  belongs_to :parent, class_name: 'Comment'
  has_many :responses, class_name: 'Comment', foreign_key: 'parent_id' 
end
