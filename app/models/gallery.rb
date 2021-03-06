class Gallery < ActiveRecord::Base
  mount_uploader :image, ImageUploader
  belongs_to :activity

  validates :image, presence: true
end
