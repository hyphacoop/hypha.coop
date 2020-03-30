# hypha.coop

[![Build Status](https://travis-ci.org/hyphacoop/hypha.coop.svg?branch=master)](https://travis-ci.org/hyphacoop/hypha.coop)

This repository holds the source code and static assets of [hypha.coop][website]. It's a fork of another theme (see below).

## :hammer_and_wrench: Technologies Used

- [**Bootstrap.**][bootstrap] Bootstrap is an open source toolkit for developing with HTML, CSS, and JS.
  - [**Theme: Coming Soon.**][template] a simple coming soon theme created by [Start Bootstrap][start-bootstrap].
- [**Jekyll.**][jekyll] A static website generator.
- [**Travis CI**.][travis] Free cloud testing environment used for test and deploy.

## :computer: Development

1. Clone repository: `git clone https://github.com/hyphacoop/hypha.coop.git && cd hypha.coop`
2. Install Bundler gem: `gem install bundler`
3. Install dependancies: `bundle install`
4. Run locally: `bundle exec jekyll serve`
5. Visit your `localhost` on port `4000`: http://localhost:4000 or http://127.0.0.1:4000

## :rocket: Deployment

We auto-deploy `master` branch to [hypha.coop][website] via Travis CI. (See [`.travis.yml`][ci-conf])

## :copyright: License & Copyright

Copyright 2013-2019 Blackrock Digital LLC. Code released under the [MIT](./LICENSE) license.

Additional customizations by ASoTNetworks, patcon.

<!-- Links -->
   [website]: https://hypha.coop
   [bootstrap]: http://getbootstrap.com/
   [template]: https://github.com/BlackrockDigital/startbootstrap-coming-soon
   [jekyll]: https://example.com
   [travis]: https://example.com
   [ci-conf]: /.travis.yml
   [start-bootstrap]: http://startbootstrap.com/
