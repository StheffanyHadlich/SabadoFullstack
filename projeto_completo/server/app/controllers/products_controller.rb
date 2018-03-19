class ProductsController < ApplicationController
  before_action :set_product, only: [:show, :update, :destroy]

  # GET /products
  def index
    @products = Product.all
    @products = @products.where('user_id <> ?', params[:user_id].to_i) if params[:user_id]
    render json: @products, except: [:user_id, :created_at, :updated_at, :img, :imgbase], include: {user:  {only: [:id, :name]}, images: {only: [:id, :img_file_name]}}
  end

  # GET /products/1
  def show
    render json: @product, include: {user:  {only: [:id, :name]}, images: {only: [:id, :img_file_name]}}, except: [:user_id, :img, :imgbase, :sale_id]
  end

  # POST /products
  def create
    @product = Product.new(product_params)
    if !params[:product][:status] || params[:product][:status].nil? || params[:product][:status].empty?
      @product.status = 'Disponível'
    end
    if @product.save
      if params[:product][:image_id]
        image = Image.find(params[:product][:image_id])
        image.product_id = @product.id
        image.save
      end
      render json: @product, except: [:user_id, :created_at, :updated_at, :img, :imgbase], include: {user:  {only: [:id, :name]}, images: {only: [:id, :img_file_name]}}, status: :created, location: @product
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

  def delete
    @product = Product.find(params[:id])
    @product.destroy
  end

  # DELETE /products/1
  def destroy
    @product.images.each do |img|
      img.destroy
    end
    @product.destroy
  end

  def self.save_sale(id = -1, sale = nil)
    if id == -1 || sale.nil?
      return nil
    end
    p = Product.find(id)
    error = verify_avaliable(p)
    if !error.nil?
      return error
    end
    p.sale_id = sale.id
    p.status = 'Pagamento pendente'
    p.save
    return nil
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_product
      @product = Product.find(params[:id])
    end

    # Only allow a trusted parameter "white list" through.
    def product_params
      params.require(:product).permit(:name, :price, :description, :user_id, :status )
    end
    
    def self.verify_avaliable(product = nil)
      if product.nil?
        return "Produto #{product[:product_id]} não existe!"
      end
      if !product.sale_id.nil?
        return "Produto #{product.name} (id:#{product.id}) já vendido!"
      end
      if !product.status.include? 'Disponível'
        return "Produto #{product.name} (id:#{product.id}) não disponível!"
      end
      return nil
    end
end
