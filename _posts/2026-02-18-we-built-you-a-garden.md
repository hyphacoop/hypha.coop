---
image: "/assets/images/social/dripline/2026-02-18-we-built-you-a-garden.webp"
title: "We built you a garden 🌼"
author: Lexa
date: 2026-02-18
acknowledgement: 
excerpt: "A web of interconnected personal sites built on ATProto for people who want to curate their digital space."
---

In fact, we built [digital gardens](https://maggieappleton.com/garden-history) for everyone on ATProto! Yours already exists—it's just waiting for you to plant something. Check out your corner of the internet [here](https://spores.garden/).

Digital gardening is about curating and contextualizing ideas on your own personal site. There are already ATProto apps for posting short-form thoughts, for writing longer pieces, for posting photos and videos, for streaming and for sharing events; in your garden, you can post new content and also repost the best of what you've published elsewhere.

The vision of spores.garden is a lightly social network of personal websites which let people express themselves as individuals. Thoughts in these gardens are planted, curated, and admired by a network of fellow humans, not by an algorithm.

The more we dug into this project, the more respect we gained for ATProto; it gave us a lot more to think about than a traditional web project. It was easy enough to build a site generator, but we got to take advantage of some of ATProto's unique properties to add some really fun features to spores.garden: a unique visual identity for each garden, the ability to pull in data from other apps, and semi-social experiences like linking to other gardens or following a trail of breadcrumbs to see what other users are looking at.

## Discover your unique garden

We didn't want to build Wordpress-on-ATproto. Every instance of spores.garden will have a unique colour palette, flower identicon, and isoline background generated specifically for you.

You can change your handle on Bluesky, you **can't** change your flower or theme on spores.garden.

If you signed up using Bluesky's default settings, your internet handle ends in `.bsky.social,` but you might see other people whose handles are something else (like me—I'm `lexa.fyi` and I'm a member of `hypha.coop`)! Those handles are names the user chooses, but your real identity on ATProto is hiding underneath that human-readable handle, as a "decentralized identifier" or "DID" which was generated when you first joined the protocol.

To generate your theme, we send that underlying DID through a hashing algorithm that deterministically generates your colour palette, flower, and isoline background. No two themes will be the same, and a given DID will always generate the same theme.

<figure class="pb4">
    <div class='flex items-center justify-center' style="width: 100%;">
        <img class="w-100" src="{{ 'assets/images/posts/2026-02-18-we-built-you-a-garden.webp' | relative_url }}" alt="Screenshot showing unique garden themes and flower identicons on spores.garden"/>
    </div>
    <figcaption>
        Every instance of spores.garden has a unique colour palette, flower identicon, and isoline background generated from your DID.
    </figcaption>
</figure>

## Plant your seeds by hand

Aside from generating the visual identity for a site, gardens are distinctly not algorithmic. Digital gardening is supposed to be manual, because selecting and curating meaningful content is a way of reclaiming your humanity on the web.

Everything you see in this network of personal sites was planted there by a human, with intention.

You can write new stuff on a garden, but you can also repost the best things you've posted elsewhere in the Atmosphere, like on Bluesky or Leaflet. Instead of each application having a database with all of its app-specific data, each ATProto user has a personal data repository hosted on a personal data server (PDS). That repository is a collection of all the data they own in the Atmosphere. Your personal repository is, obviously, *personal.* You and the applications you authorize are the only ones who can add or edit data records to the repository on your PDS, but anyone can view the contents.

That property makes it very easy to set up a new application because there is so much underlying data from each user already available—there's no "cold start" issue where users are unmotivated to join because they'll need to build up a presence from scratch again. As soon as you claim your garden, you're immediately able to pull in your own data and explore other gardens via the most recently updated gardens on the homepage.

## Follow the flowers

The homepage is, however, the most boring way to find new gardens. Instead of an endless scroll of hyperlinks, we chose to use people's unique flowers across the entire application as signposts leading you back to a garden.

When you visit someone's garden, you can collect their flower and have it show up on your site as a way of affiliating yourself with that person. Early blogs sometimes used a similar [webring](https://tedium.co/2020/11/20/webring-history/) concept to let viewers easily navigate throughout a network of similar websites.

You can also plant your own flower in someone else's garden as a sign that you have been there. These planted flowers act like a digital guestbook, with new visitors able to see who has been there before and follow the links back to those other gardens.

These properties are both enabled by a service called [*Constellation*](https://constellation.microcosm.blue/)*,* provided by a fellow Toronto-based ATProto nerd, Phil. Constellation takes advantage of ATProto records being publicly accessible and creates user-specific "backlinks" from the available information.

Imagine that Aspen follows Birch on Twitter/X. A 'follow' can be represented as a directional relationship between the Aspen entity and the Birch entity. Displaying a list of Birch's followers is as simple as querying for all directional connections between Birch and any other entity. They're probably stored in a single table in a single database.

Now imagine that Aspen follows Birch on **Bluesky**, where data is stored in one database for each person. There is no table to query for a list of Birch's followers because that information is scattered across all his followers' PDSs.

Instead, a 'follow' creates a record in Aspen's PDS saying "Aspen follows Birch". Birch's follower list can be shown to him via Constellation (or a similar indexer) scanning the 'firehose' (a stream of all data being created, edited, or deleted in ATProto) and keeping track of every follow record that mentions Birch. Those records are not saved in Birch's PDS, but they're formatted and presented as relevant information to him.

Having backlinks available solves what would otherwise be a really challenging problem—how do we accommodate social behaviour when everyone's data is completely siloed? Publicly accessible repositories indexed by a service like Constellation makes ATProto into something inherently social even when used for something ostensibly individual, like a personal website.

Anytime you see a flower, it's leading you back to someone's garden via Constellation backlinks.

## Search for spores hiding in plain sight

Collecting and planting flowers lead to a very social and intentional way of navigating a network of gardens. By collecting a flower, you're showcasing a link to someone else's work; by planting your own flower, you're saying "hey—come check out my stuff too!"

There is one additional way to explore in spores.garden, which is by finding, following, and stealing a **special spore.** Using the same deterministic algorithm that generates a theme from a user's DID, we also encoded the chance to receive a data record called a special spore. Like the unique flower, a given DID will always either generate or not generate a special spore—you can't manually create or delete one for yourself any more than you could modify the way your flower looks. Whether or not you generate a special spore is an inherent property of your DID when put through our hashing algorithm.

If Aspen generates a spore, her PDS contains the original special spore record and the spore is initially displayed in her garden. That spore is always "Aspen's spore" because it was generated by her DID. Roughly 1 out of every 10 DIDs will generate a spore.

When Birch visits Aspen's garden, he can steal it and add a record to his PDS that says "I stole Aspen's spore on February 10 at 10 AM". Later, if Cedar sees the spore on Birch's garden, they can steal it and add a record to their own PDS that says "I stole Aspen's spore on February 11 at 10 AM".

Anyone who looks at the spore in Cedar's garden can see where the spore has been because Cedar's record contains a reference to Aspen's DID, which then uses backlinks to produce a timestamp-ordered list of all other users who have interacted with Aspen's spore.

The game of stealing the spore *is* a fun, semi-entropic way to discover new gardens: holding a spore doesn't imply that you're affiliated with the original owner, nor anyone else who has previously held the spore. But honestly, we built it because it's cool.

It's both a social game that imitates a piece of data travelling through a network, *and* a record whose existence you can't spoof even though ATProto doesn't have a centralized authority or a decentralized network of peers validating what's happening in the network. The more competitive readers may be already theorizing that it's possible to write a script to constantly steal all of the spores in existence and you're not wrong; it's not a bullet-proof system. But…it's kind of like emptying out a Little Free Library in your neighbourhood without ever intending to read the books. Spores are meant to travel!

## Let the garden grow!

In a world increasingly run by algorithms and monolithic media companies, we wanted to recreate the feeling of the web being made up of small, personal, interconnected things rather than massive platforms. Spores is our way of bringing that into that world.

We chose to build it on ATProto because its features made it a great choice for the experience we wanted to create—playful, curated, human. From being able to use someone's DID as the basis for a fun visual identity to the creative social affordances of backlinks enabled by Constellation; it's a rich ecosystem with a lot of potential that we're excited to keep exploring. We've even added some [documentation](https://github.com/hyphacoop/spores.garden/blob/main/docs/layouts.md) for fellow experienced gardeners to add support for their own ATproto projects.

We can't wait to see what you grow! Claim your flower [here](https://spores.garden/).
