class ImagesController < ApplicationController
  before_action :set_image, only: [:show, :update, :destroy]

  # GET /images
  def index
    @images = Image.all

    render json: @images
  end

  def get_image
    @image = Image.find_by(id: params[:id])
    if params[:thumb]
      send_file @image.img.path(:thumb), type: 'image/png', disposition: 'inline'
    else
      send_file @image.img.path, type: 'image/png', disposition: 'inline'
    end
    
  end
  
  # GET /images/1
  def show
    render json: @image
  end

  # POST /images
  def create
    if params[:file]
      @image = Image.new(
        img: params[:file]
      )
    else
      @image = Image.new(image_params)
    end

    if @image.save
      render json: @image, status: :created, location: @image
    else
      render json: @image.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /images/1
  def update
    if @image.update(image_params)
      render json: @image
    else
      render json: @image.errors, status: :unprocessable_entity
    end
  end

  # DELETE /images/1
  def destroy
    @image.destroy
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_image
      @image = Image.find(params[:id])
    end

    # Only allow a trusted parameter "white list" through.
    def image_params
      params.require(:image).permit(:filename)
    end
end
