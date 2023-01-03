# hypha.coop
| Master | Staging |
| ------ | ------- |
|[![Build Status](https://github.com/hyphacoop/hypha.coop/actions/workflows/deploy.yml/badge.svg?branch=master)](https://github.com/hyphacoop/hypha.coop/actions)|[![Build Status](https://github.com/hyphacoop/hypha.coop/actions/workflows/deploy.yml/badge.svg?branch=staging)](https://github.com/hyphacoop/hypha.coop/actions)|


## 🛠️ Technologies Used

- [**Tachyons.**][tachyons] Tachyons is a functional CSS library.
- [**Jekyll.**][jekyll] A static website generator.
- [**GitHub Actions**.][gh-actions] GitHub CI automation.
- [**HTMLProofer.**][html-proofer] HTMLProofer is a set of tests to validate your HTML output.

## 💻 Development

If you do not have [rbenv](https://github.com/rbenv/rbenv) installed you should consider using it to manage your Ruby development environment. Specifically, using the system version of Ruby that ships with macOS will not work and rbenv will let you install and switch to other ones.

1. Clone repository: `git clone https://github.com/hyphacoop/hypha.coop.git && cd hypha.coop`
2. Install Bundler gem: `gem install bundler`
3. Install dependancies: `bundle install`
4. Run locally: `bundle exec jekyll serve --livereload`
5. Visit your `localhost` on port `4000`: http://localhost:4000 or http://127.0.0.1:4000

## 🚀 Deployment

We auto-deploy `master` branch to [hypha.coop][website] and to the decentralized web with the [Distributed Press][distributed-press]. (See [`deploy.yml`][actions-conf] for how we use GitHub Actions to auto-deploy.)

We use HTMLProofer to check the HTML output for syntax errors but does not actively check external links.

For links that no longer exist we update that link to an archived copy on [archive.org](https://archive.org)

## 🚧 Staging

We also auto-deploy `staging` branch to [staging.hypha.coop](https://staging.hypha.coop) on our staging server via GitHub Actions to test before commiting to `master` branch. 

Staging uses Let's Encrypt staging enviroment to allow for higher limits than their production environment. This allow us to redeploy sites on staging without hitting the limit of Let's Encrypt production. As a result when accessing staging you will be prompted about invalid certificate on your browser. More information on Let's Encrypt staging enviroment [here.](https://letsencrypt.org/docs/staging-environment/)

## 📑 Attribution

- `favicon.ico`: [Rorschach Test](https://thenounproject.com/nicky.humphreys/collection/repeat-pattern/?i=871159) by Nicky Knicky from the Noun Project
- [Work Sans](https://github.com/weiweihuanghuang/Work-Sans) by Wei Huang

## 📃 License & Copyright

Copyright © 2020-2021 Hypha Worker Co-operative Inc.

hypha.coop **code** at [hyphacoop/hypha.coop](https://github.com/hyphacoop/hypha.coop) is licensed under a [GNU General Public License v3.0](https://www.gnu.org/licenses/gpl.html). This program is free software: you can redistribute it and/or modify it under the terms of the [GNU General Public License](https://www.gnu.org/licenses/gpl.html) as published by the Free Software Foundation, version 3.0. A copy is distributed with the code at [`LICENSE`](./LICENSE).

Unless otherwise indicated, hypha.coop **content and documentation** is licensed under a [Creative Commons Attribution-ShareAlike 4.0 International License](http://creativecommons.org/licenses/by-sa/4.0/). 

<!-- Links -->
   [website]: https://hypha.coop
   [jekyll]: https://jekyllrb.com
   [tachyons]: http://tachyons.io
   [gh-actions]: https://docs.github.com/en/actions
   [actions-conf]: /.github/workflows/deploy.yml
   [distributed-press]: https://github.com/hyphacoop/api.distributed.press/
   [html-proofer]: https://github.com/gjtorikian/html-proofer/
