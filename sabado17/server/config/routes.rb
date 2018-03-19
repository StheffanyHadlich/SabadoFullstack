Rails.application.routes.draw do
  get 'images/get_image/:id', to: 'images#get_image'
  resources :products
  resources :images
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
