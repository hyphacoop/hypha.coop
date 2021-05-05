# hypha.coop

[![Build Status](https://img.shields.io/travis/com/hyphacoop/hypha.coop/master.svg?label=master)](https://travis-ci.com/github/hyphacoop/hypha.coop/branches)
[![Build Status](https://img.shields.io/travis/com/hyphacoop/hypha.coop/staging.svg?label=staging)](https://travis-ci.com/github/hyphacoop/hypha.coop/branches)


## 🛠️ Technologies Used

- [**Tachyons.**][tachyons] Tachyons is a functional CSS library.
- [**Jekyll.**][jekyll] A static website generator.
- [**Travis CI**.][travis] Free cloud testing environment used for test and deploy.

## 💻 Development

1. Clone repository: `git clone https://github.com/hyphacoop/hypha.coop.git && cd hypha.coop`
2. Install Bundler gem: `gem install bundler`
3. Install dependancies: `bundle install`
4. Run locally: `bundle exec jekyll serve`
5. Visit your `localhost` on port `4000`: http://localhost:4000 or http://127.0.0.1:4000

## 🚀 Deployment

We auto-deploy `master` branch to [hypha.coop][website] and to the decentralized web with the [Distributed Press][distributed-press]. (See [`.travis.yml`][ci-conf] for how we use Travis CI to auto-deploy.)

## 🚧 Staging

We also auto-deploy `staging` branch to [staging.hypha.coop](https://staging.hypha.coop) on our staging server via Travis CI to test before commiting to `master` branch. 

## 📑 Attribution

- `favicon.ico`: [Rorschach Test](https://thenounproject.com/nicky.humphreys/collection/repeat-pattern/?i=871159) by Nicky Knicky from the Noun Project
- [Work Sans](https://github.com/weiweihuanghuang/Work-Sans) by Wei Huang

## 📃 License & Copyright

Copyright © 2020 Hypha Worker Co-operative Inc.

hypha.coop **code** at [hyphacoop/hypha.coop](https://github.com/hyphacoop/hypha.coop) is licensed under a [GNU General Public License v3.0](https://www.gnu.org/licenses/gpl.html). This program is free software: you can redistribute it and/or modify it under the terms of the [GNU General Public License](https://www.gnu.org/licenses/gpl.html) as published by the Free Software Foundation, version 3.0. A copy is distributed with the code at [`LICENSE`](./LICENSE).

Unless otherwise indicated, hypha.coop **content and documentation** is licensed under a [Creative Commons Attribution-ShareAlike 4.0 International License](http://creativecommons.org/licenses/by-sa/4.0/). 

<!-- Links -->
   [website]: https://hypha.coop
   [jekyll]: https://jekyllrb.com
   [tachyons]: http://tachyons.io
   [travis]: https://travis-ci.com/hyphacoop/hypha.coop
   [ci-conf]: /.travis.yml
   [distributed-press]: https://github.com/hyphacoop/api.distributed.press/
