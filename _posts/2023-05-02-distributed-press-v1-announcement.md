---
image: "/assets/images/social/dripline/2023-05-02-distributed-press-v1-announcement.webp"
title: 'Distributed Press v1 Announcement'
author: Mauve
date: 2023-04-25
acknowledgement: 'Mauve is a tech enthusiast with a passion for decentralization. They work on Distributed Press, as well as Agregore, a web browser that combines different peer to peer protocols.'
excerpt: 'Distributed Press, a tool developed by Hypha, has undergone a major rewrite. We are excited to share the latest version.'
atUri: "at://did:plc:rxduhzsfgfpl2glle7vagcwl/site.standard.document/3mdw2tc6uuo25"
---

<figure>
<img style="padding-bottom: 2rem;"
  src="{{ 'assets/images/posts/2023-04-25-logo-distributedpress-grey.webp' | relative_url }}"
  alt="Distributed Press Logo"
/>   
</figure>

### {{ page.excerpt }}
Thanks to a grant and support from the [Filecoin Foundation for the Decentralized Web](https://www.ffdweb.org/) and after months of working away on v1 of Distributed.Press, we're happy to announce that it's ready to be tried and tested!

## What is it?

For those who aren't in the loop, [distributed.press](https://distributed.press/) is a tool developed at Hypha that makes it easy to publish static websites to the [Distributed Web](https://getdweb.net/). Specifically, it gives you an HTTP API to send <a href="https://en.wikipedia.org/wiki/Tar_(computing)">tar archive files</a>, which it will then extract and publish onto [IPFS](https://ipfs.tech/) and [Holepunch](https://holepunch.to/) (formerly hypercore-protocol). It also comes with a custom DNS server, making it easier to set up custom domain names for your sites.

## Project Overhaul

This has involved a [major rewrite](https://github.com/hyphacoop/api.distributed.press/pull/48) in how Distributed Press works under the hood.

It's now easier to set up DNS records across all our supported protocols via the [DNSLink](https://www.dnslink.io/) specification and Distributed.Press's newly built-in DNS server. 

We've changed how peer-to-peer (P2P) protocols are integrated so that we can easily add new ones like BitTorrent or Earthstar. We have also reworked the way we publish to [IPFS](https://www.ipfs.tech/) so that new updates can be published to the network almost instantaneously without needing to wait for DNS updates. And we have upgraded our [Hypercore](https://github.com/hypercore-protocol) integration to use the newly rebranded [Holepunch](https://holepunch.to/) libraries which adds significant performance and reliability improvements.

If you're part of a community that does P2P file transfer and would like to see your protocol integrated, open up an issue on [our GitHub repo](https://github.com/hyphacoop/api.distributed.press/issues/new?assignees=&labels=&template=support_new_protocol.md&title=Support+new+protocol%3A+) with information about your protocol and we can chat about integration from there.

## Sutty CMS

As part of this effort we have been working with [Sutty](https://sutty.nl/en/) on integrating Distributed.Press into their Content Management System (CMS) and using it to have a graphical front-end for editing sites.

<figure>

<img
  src="{{ 'assets/images/posts/2023-04-25-dp-publish-to-dweb-toggle.png' | relative_url }}"
  alt="publish toggle screencap"
/>

<figcaption align = "left"><em>Screenshot of "Publish to DWeb" toggle in the Sutty CMS</em></figcaption>
    
</figure>

Sutty generates [static web sites](https://en.wikipedia.org/wiki/Static_web_page) using [Jekyll themes](https://jekyllrb.com/) and a dynamically generated front-end for themes. With the Sutty CMS, you can use a graphical, user-friendly interface to author posts and customize your site, and then enable their Distributed.Press integration to have Sutty publish your site to IPFS and Hypercore in addition to the HTTP version.

We have a small walk-through on how to publish a site with Sutty in our [documentation](https://docs.distributed.press/deployment/sutty). We encourage groups seeking more customized themes to reach out to them directly.

## GitHub Publishing

In addition to Sutty, you can also add Distributed.Press to your existing [GitHub Actions](https://docs.github.com/en/actions) publishing flow. This works well if you're already publishing a static website in a continuous integration to HTTP or even if you've been publishing to a single protocol like IPFS. In order to "DWeb-ify" your site, you just need a Distributed.Press instance and to take an [extra step](https://github.com/marketplace/actions/publish-to-distributed-press) to upload your static site folder over HTTPS.

You can find more detailed documentation on [our new docs website](https://docs.distributed.press).

If you'd like to integrate Distributed.Press into other continuous integration environments or are having trouble setting it up yourself, you can reach out to us by [email](mailto: hello@distributed.press) or open an issue on [Github](https://github.com/hyphacoop/distributed.press).

You can also check out the [auto-generated swagger interface](https://api.distributed.press/v1/docs/static/index.html). 

## Documentation

Speaking of which, we have a new [documentation website](https://docs.distributed.press/) built with Next.js. We've added some information on how Distributed.Press works as well as steps to self-deploy your own instance and upload data to it.

## COMPOST Magazine

This initial release is coming out as we finalize our third issue of COMPOST Magazine. We've been developing a new theme for Sutty based directly on COMPOST, so that our authors can write their pieces within the CMS, as well as ensure that we can deploy and serve COMPOST reliably across different protocols.

Make sure to subscribe to [the COMPOST mailing list](https://lists.hypha.coop/cgi-bin/mailman/listinfo/compost) as well as follow [COMPOST on Twitter](https://twitter.com/COMPOSTmag) and [the Fediverse](https://social.coop/@compost) to get notified as soon as it's out. 

If you have any questions or want to explore collaborations, feel free to [reach out to us](mailto:hello@distributed.press).

<figure>

<img
  src="{{ 'assets/images/posts/2023-04-25-supporters.png' | relative_url }}"
  alt="Distributed Press supporter list"
/>

<figcaption align = "left"><em>Our partners and supporters</em></figcaption>
    
</figure>

