---
title: 'Announcing Distributed.Press Social Inbox 1.0'
author: Hypha & Sutty
date: 2023-12-05
acknowledgement: 
excerpt: 'Our new feature brings social interactions to static websites on the decentralized web.'
---

  
### {{ page.excerpt }}

Hypha and [Sutty](https://sutty.nl/) are thrilled to announce the release of the Social Inbox, a new feature of [Distributed.Press](https://distributed.press/) that integrates a website's comment section with federated social media platforms like Mastodon. With the Social Inbox enabled, websites obtain their own account on the Fediverse, allowing it to automatically send out new posts to followers at the time of publication. When other users reply to posts, you can approve them to be published to the site as comments. The Social Inbox allows readers to directly engage with your posts where they already are, and gives publishers the ability to incorporate public dialogue into their websites.

## Failures of Existing Social Media

Big social media services, like X/Twitter and Instagram, centralize all control over the data, content, and interactions on their platforms. They moderate messages on their platforms with little transparency or accountability, leading to posts and entire accounts being censored with no explanation. Additionally, corporate social media platforms have an insatiable hunger for data. They surveil every aspect of our interactions — from what we post, what we "like", who we follow, to minute details of where our attention lingers. This data is used to feed their algorithms in order to maximize the influence, and therefore profitability, of the ads they show to their users. 

Their intrusive practices extend into the timeline itself, by manipulating what posts appear and inserting "suggested" content that we never ask to see. Major social media platforms regularly comply with government requests to hand over personal data without a court warrant. And we have witnessed how an entire social media network can be sold to a billionaire with no regard for the impact this would have on global public discourse. 

## ActivityPub: A Decentralized Alternative

In the face of the failures of existing social media platforms, there have been many attempts to build viable alternatives. Out of these, one of the most thriving networks is what is collectively called the Fediverse — an ecosystem of social media platforms that rely on the [ActivityPub social data standard](https://www.w3.org/TR/activitypub/). 

Instead of having a platform contain the accounts, messages, and interactions concentrated on one website, ActivityPub allows users with accounts on _different_ websites to communicate with each other. This is similar to how email works; you can send an email to someone else regardless of what email service they use. By enabling anyone to set up their own "instance" or social media server, ActivityPub allows people to decide who has control over their data. They can decide to host their own instance, or choose one from among the thousands of others who offer hosting services. The ActivityPub standard allows data to be hosted across thousands of different instances, while still being able to follow and send messages between them. 

One of the perennial problems with social media is content moderation. ActivityPub is distinct in that it allows each instance to decide for themselves how to moderate messages on their servers. This helps ensure that a given user or community can shape their own moderation policies, instead of an unaccountable, centralized authority. Fediverse instances can even decide to subscribe to community-curated blocklists, which can be actively shaped and used across many servers, by people who understand their community needs and agree on what kind of dialogue they would like to have or not have appear in their timelines.

As a result, the Fediverse continues to grow in its potential as a diversified network of interoperable social media applications.

## Social Inbox for the Decentralized Web

From its inception, Distributed.Press has incorporated existing decentralized web protocols to expand the possibilities of web publishing. It is important for us to incorporate ActivityPub into Distributed.Press given its flexibility and popular use as a social media protocol. 

Through our existing suite of tools, it's already possible to publish static [Jekyll](https://jekyllrb.com/) websites to the DWeb. With static websites, code and content are delivered to the browser as simple HTML/CSS files, without having to access an external server to load content. The benefit of static websites is that they load faster, do not use plug-ins that require constant updates, and tend to be more secure overall. We realized that we could lean on these features, while incorporating social interactions into websites using ActivityPub. 

So over the course of this year, we built the **Social Inbox**, which allows people to integrate their website with the Fediverse and to engage with readers there. [You can read more about the technical details of how the Social Inbox works](https://blog.mauve.moe/posts/distributed-press-social-inbox#how-the-inbox-works). 

With the Social Inbox enabled on your site, you can:

* **Post to the Fediverse**: New articles can be posted to the Fediverse where followers can read, re-post, favorite, and send replies.

* **Approve replies as comments**: When posts receive replies on the Fediverse, the website owner can approve them as reader comments that are then posted alongside the original article on the website.

* **Streamline moderation**: Approve messages and follow requests one-by-one, automate the process on your own, or subscribe to existing block lists. (For now, Distributed.Press subscribes to [GardenFence](https://github.com/gardenfence/blocklist/tree/main) to automatically block servers that have shown to be sources of hateful rhetoric, harassment, and spam.) 

* **Download your follower list**: If you would rather move your account to a different server, you can switch your Social Inbox instance very easily without needing to change the domain name for your site.

To see which Fediverse clients are compatible with the Social Inbox, you can follow this [Github issue](https://github.com/hyphacoop/social.distributed.press/issues/24).

For Mastodon and Pixelfed users: Please note that when someone follows your website's Fediverse account for the first time, they will receive new posts as they're published. That also means that they will not see any *previous* posts due to Mastodon not preemptively fetching the full lists of posts from our outbox. If this something you'd like to be addressed, you can comment on the [Mastodon issue tracker](https://github.com/mastodon/mastodon/issues/34), or work with us by chiming into [our issue tracker](https://github.com/hyphacoop/social.distributed.press/issues/24) to see what you can do to help.

## Sutty Integration

If you aren't able or interested in coding your way to creating a static website or implementing the Social Inbox yourself, we have also integrated it into [Sutty](https://sutty.nl/en), a content management system for static Jekyll websites. All you need to do is set up a website on their platform and enable the Social Inbox in the configuration panel. Then, you will see a panel that will allow you to approve/deny replies as comments to your posts.

All of Sutty's templates are compatible with the Social Inbox, in addition to the Magazine template, which is based on the layout of COMPOST magazine, our sister project. 

**For a step-by-step guide on how to use the Social Inbox with Sutty, check out this [demo video](https://youtu.be/ntTdIuC0bbM).**

If you're already on the Fediverse, you can search @dripline@hypha.coop from your instance and follow our posts! 

## Getting Started

There are a few ways to try out the Social Inbox:

* **Sutty**: Create a static website on Sutty and use the Social Inbox panel on their platform admin panel: https://sutty.nl/en/

* **Do it yourself**: Check out our documentation to see how you can set up the Social Inbox on your existing (or future) static website: https://docs.distributed.press/

* **Hire us to help**: If you already have a static website publishing pipeline, but want to publish to IPFS and Hypercore and implement the Social Inbox, get in touch with us at hello@distributed.press and we can help you out. :)

## What's Next

Our next area of focus is to make it easier for people to discover websites and blogs on the DWeb. Essentially, we're developing automation on top of Distributed Press that will announce newly published accounts in a format that can be subscribed to on the Fediverse. 

We also see the Social Inbox, particularly the Inbox Server, as a stepping stone towards further decentralization. We hope to make publishing and social media local-first and peer-to-peer(p2p) by creating paths to data storage that puts the data closer to the end user. For example, all the data related to your website and its social interactions could be hosted on your own computer, or another local server of your choosing. One of our next steps in this direction will be to create a p2p-enabled Fediverse client and a specification for loading ActivityPub content from p2p protocols.

Also, if you're a developer on another static site generator (that isn't Jekyll), [please reach out](mailto:hello@distributed.press) if you're interested in building a similar plug-in to integrate ActivityPub into your publishing workflow.

Stay tuned and thanks for reading! 

## Support Us!

Love what we do and want to help sustain this project? **[You can support us on Open Collective with a one-time gift or monthly donation.](https://opencollective.com/distributed-press)**

*~*~*~*~*

### About this project
Distributed.Press is a joint collaboration between two tech worker co-operatives, Hypha Worker Co-operative based in Toronto, Canada and Sutty based in Buenos Aires, Argentina.

The project is made possible through generous support from [Filecoin Foundation for the Decentralized Web](https://ffdweb.org/), Grant for the Web, and our supporters on [Open Collective](https://opencollective.com/compost). 

Distributed.Press is the sister project to COMPOST, a magazine about the digital commons. You can read our third issue of COMPOST here: https://three.compost.digital/

### Additional Links
* [The Distributed Press Social Inbox - How does it work?](https://blog.mauve.moe/posts/distributed-press-social-inbox)
* [A New Medium for Your Messages, from COMPOST Issue 03](https://three.compost.digital/distributed-press-a-new-medium-for-your-messages/)
* [Distributed Press Documentation](https://docs.distributed.press/)
* [Hypha Worker Co-op](https://hypha.coop)
* [Sutty](https://sutty.nl/en/)
* [Github issue for inbox](https://github.com/hyphacoop/distributed-press-organizing/issues/87)

