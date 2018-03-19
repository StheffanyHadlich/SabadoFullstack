class ProductsController < ApplicationController
  before_action :set_product, only: [:show, :update, :destroy]

  # GET /products
  def index
    @products = Product.all
    @products = @products.where('user_id <> ?', params[:user_id].to_i) if params[:user_id]
    render json: @products, except: [:created_at, :updated_at], images: {only: [:id, :img_file_name]}
  end

  # GET /products/1
  def show
    render json: @product, except: [:created_at, :updated_at], images: {only: [:id, :img_file_name]}
  end

  # POST /products
  def create
    @product = Product.new(product_params)
    if !params[:product][:status] || params[:product][:status].empty?
      @product.status = 'Disponível'
    end

    if @product.save
      if params[:product][:image_id]
        image = Image.find(params[:product][:image_id])
        image.product_id = @product.id
        image.save
      end
      render json: @product, status: :created, location: @product
    else
      render json: @product.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /products/1
  def update
    if @product.update(product_params)
      render json: @product
    else
      render json: @product.errors, status: :unprocessable_entity
    end
  end

  # DELETE /products/1
  def destroy
    @product.destroy
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_product
      @product = Product.find(params[:id])
    end

    # Only allow a trusted parameter "white list" through.
    def product_params
      params.require(:product).permit(:name, :price, :description, :status)
    end
end
