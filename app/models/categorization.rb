class Categorization < ActiveRecord::Base
  belongs_to :activity
  belongs_to :category
end
