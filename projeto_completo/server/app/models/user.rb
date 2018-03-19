class User < ApplicationRecord
    has_many :sales, class_name: 'Sale', foreign_key: 'salesman_id'
    has_many :buys, class_name: 'Sale', foreign_key: 'buyer_id'
    has_many :products, class_name: 'Product', foreign_key: 'user_id'
    has_many :comments
end
