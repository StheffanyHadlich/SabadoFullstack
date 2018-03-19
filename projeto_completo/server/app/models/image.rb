class Image < ApplicationRecord
    has_attached_file :img, styles: { medium: "300x300>", thumb: "100x100>" }, default_url: "/images/:style/missing.png" 
    validates_attachment :img, presence: true 
    do_not_validate_attachment_file_type :img
    

end
