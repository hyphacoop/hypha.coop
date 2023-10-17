source "https://rubygems.org"

# Hello! This is where you manage which Jekyll version is used to run.
# When you want to use a different version, change it below, save the
# file and run `bundle install`. Run Jekyll with `bundle exec`, like so:
#
#     bundle exec jekyll serve
#
# This will help ensure the proper Jekyll version is running.
# Happy Jekylling!
gem "jekyll", "~> 4.3.2"
gem "html-proofer"

gem "webrick", "~> 1.8"

group :jekyll_plugins do
  gem "jekyll-feed", 
      git: "https://github.com/hyphacoop/jekyll-feed", 
      ref: "8837225f79a4464cc3b936a1365130aa6db65180"
  gem 'jekyll-activity-pub', require: 'jekyll/activity_pub/commands'
end