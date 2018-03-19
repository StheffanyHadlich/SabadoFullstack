class SalesController < ApplicationController
  before_action :set_sale, only: [:show, :update, :destroy]

  # GET /sales
  def index
    @sales = Sale.all

    render json: @sales
  end

  # GET /sales/1
  def show
    render json: @sale, include: {products: {only: [:id, :name, user: {only: [:id, :name]}]}}, except: [:buyer_id]
  end

  # POST /sales
  def create
    error = 0
    Sale.transaction do
      @sale = Sale.new(sale_params)
      if @sale.save
        error = save_cart(params[:sale][:cart], @sale)
        if !error.nil?
          puts error
          render json: error, status: :unprocessable_entity
          raise ActiveRecord::Rollback, error
        end
        render json: @sale, status: :created, location: @sale
      else
        render json: error, status: :unprocessable_entity
        raise ActiveRecord::Rollback, @sale.errors
      end
    end
  end

  # PATCH/PUT /sales/1
  def update
    if @sale.update(sale_params)
      render json: @sale
    else
      render json: @sale.errors, status: :unprocessable_entity
    end
  end

  # DELETE /sales/1
  def destroy
    @sale.destroy
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_sale
      @sale = Sale.find(params[:id])
    end

    # Only allow a trusted parameter "white list" through.
    def sale_params
      params.require(:sale).permit(:buyer_id, :price)
    end

    def save_cart(cart = nil, sale = nil)
      if cart.nil? || sale.nil?
        return "Nenhuma lista enviada!"
      end
      cart.each do |product|
        error = ProductsController.save_sale(product[:id], sale)
        if !error.nil?
          return error
        end
      end
      return nil
    end

    
    

end
