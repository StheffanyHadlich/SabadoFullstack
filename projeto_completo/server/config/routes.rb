Rails.application.routes.draw do
  get 'images/get_image/:id', to: 'images#get_image'
  post 'products/delete/:id', to: 'products#delete'
  resources :images
  resources :comments
  resources :sales
  resources :products
  resources :users
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html

  root 'users#root'
end
