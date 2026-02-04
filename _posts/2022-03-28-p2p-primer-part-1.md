---
slug: p2p-primer-part-1
image: "/assets/images/social/dripline/2022-03-28-p2p-primer-part-1.webp"
title: 'Taking the Mauve Pill: Exploring Alternatives to the Centralized Web'
author: Mauve
date: 2022-03-28
acknowledgement: 'Mauve is a tech enthusiast with a passion for decentralization. Among their many projects, they are currently developing Agregore, a web browser that combines different peer to peer protocols together.'
excerpt: 'A Peer to Peer Primer: Comparing Protocols'
atUri: "at://did:plc:rxduhzsfgfpl2glle7vagcwl/site.standard.document/3mdw2tn2yc72x"
---

<img
  src="{{ '/assets/images/posts/2022-03-24-logos.png' | relative_url }}"
  alt="A collection of peer to peer logos"
  width="45%"
/>

Peer to peer (P2P) protocols make it easier to build decentralized applications that can work without any extra server or network infrastructure. They provide more privacy and resilience than centralized platforms, and reduce the barrier to building applications that enable people to share data. However, there are a few to choose from, and it can be daunting to figure out which one is right for your use case.

This post compares several peer to peer protocols, looking at how they work and the tradeoffs to consider when choosing what to use. We will specifically be looking at [BitTorrent](https://www.bittorrent.org/index.html), [Interplanetary File System (IPFS)](https://ipfs.io/), [Secure Scuttlebutt (SSB)](https://scuttlebutt.nz/) and [Hypercore](https://hypercore-protocol.org/) since they have been around for a while and have some similarities that make them easy to compare. We’ll explore how each protocol handles content, links, data models, peer discoverability, security, performance, implementations, and backups. Since that’s a lot to cover in one post, we’ll focus on links and content here; stay tuned for three additional posts. We’ve also included a chart that compares each protocol discussed in this series. Although this comparison is subjective, we hope it’s a useful reference when thinking through which protocol might work best for a particular project.

This post is aimed at people wanting to use these protocols who have basic knowledge about how peer to peer systems work already. If you see a new term, click the links for further reading or [search about it online](https://duckduckgo.com/).

|                      | BitTorrent | Interplanetary File System | Hypercore | Secure Scuttlebutt |
| -------------------- | :--------: | :-------------------------------: | :-------: | :----------------------: |
| Content              | 🇦          | 🇧                                | 🇩         | 🇦                       |
| Links                | 🇨          | 🇦                                | 🇧         | 🇨                       |
| Data Model           | 🇧          | 🇦                                | 🇦         | 🇧                       |
| Mutability           | 🇩          | 🇧                                | 🇦         | 🇦                       |
| Peer Discoverability | 🇦          | 🇧                                | 🇦         | 🇧                       |
| Security             | 🇨          | 🇨                                | 🇧         | 🇧                       |
| Performance          | 🇨          | 🇨                                | 🇦         | 🇩                       |
| Implementations      | 🇦          | 🇦                                | 🇨         | 🇧                       |
| Backups              | 🇦          | 🇦                                | 🇨         | 🇦                       |
{:.mbtablestyle}

*Mauve grades protocols (don’t @ them if you disagree)*

## Content

Each P2P protocol focuses on different types of content and ways of accessing them. We discuss these below and give a final grade.

### Content - BitTorrent

BitTorrent has strong associations with internet piracy where projects like The Pirate Bay are used to upload illegal copies of copyrighted content to bypass restrictions such as DRM or lack of access. However, BitTorrent is frequently used to distribute datasets for things like Linux ISO images, [scientific data](https://pubmed.ncbi.nlm.nih.gov/20418944/), and other legitimate data sharing use cases. It's also being used in applications like [PeerTube](https://joinpeertube.org/), which allow independent content creators to share the bandwidth costs of viewing videos. BitTorrent has also been used by archiving groups like [The Internet Archive](https://archive.org/) in order to distribute archives of content that's our digital history.

Since BitTorrent has been around for a long time, it's well known and there's a lot of content out there to explore.

*Final Grade: A*

### Content - Interplanetary File System (IPFS)

IPFS has been building buzz among blockchain communities by acting as a decentralized file storage alternative to central file servers for things like [Non-Fungible Tokens (NFT)](https://docs.ipfs.io/how-to/mint-nfts-with-ipfs/) and various bits of web content such as [COMPOST](https://ipfs.io/ipns/two.compost.digital/). Its high level APIs have also been used with tools like [WebRecorder](https://webrecorder.net/about) to make it easier to archive content and preserve it in immutable records while deduplicating file content whenever possible.

*Final Grade: B*

### Content - Hypercore

Although Hypercore has a lot of content published in the [Beaker Browser](https://beakerbrowser.com/), much of it is now incompatible with newer versions of Hypercore. Outside of that, there are apps that build on top of the lower level bits of Hypercore like Mapeo or Cabal that share content among specific groups.

*Final Grade: D*

### Content - SSB

Most content on SSB is locked away in people's social graphs and can only be accessed if you get introduced into these networks; for example, by joining Manyverse. However, there are public [viewers](https://viewer.scuttlebot.io/) that offer a glimpse into content that people have chosen to make public.

*Final Grade: A*

## Links: Small But Critical Infrastructure

One of the first things people see when interacting with P2P protocols is how data can be linked to them. Most people are using these protocols for loading content from peer to peer networks, and probably don't think too hard about what the links actually mean. But links are important to consider because the link structure can start to tell you about the different ways the protocols work and some of the constraints in how they can be used. Most of the protocols here have registered URI schemes with [IANA](https://www.iana.org/assignments/uri-schemes/uri-schemes.xhtml), which gives straightforward paths for integrating with different applications without worrying about conflicts.

### Links - BitTorrent

BitTorrent uses links that use the `magnet:` [URI scheme](https://en.wikipedia.org/wiki/Magnet_URI_scheme) by specifying a property that links to the `urn:btih` (BitTorrent InfoHash) for a given Torrent. The standard is used by several other content networks like Kazaa and eDonkey, which were popular file sharing networks that aren't as active these days. The link format can contain extra information like `tracker` servers for  discovering other peers with data and metadata; this lets you know whether a torrent is "private" without needing to download the torrent itself. One thing to note is that magnet links are [URIs](https://en.wikipedia.org/wiki/Uniform_Resource_Identifier), which can identify a torrent, but are not suitable to use as browser [URLs](https://en.wikipedia.org/wiki/URL) because they do not have a “hostname” property that browsers could use as a “origin” to associate things like cookies and permissions with. As well, URI cannot be used for navigating between files inside a given torrent. To address some of the drawbacks of using URI, there's been some talk about standardizing  a [bittorrent://](https://github.com/bittorrent/bittorrent.org/issues/92) URL format that would better integrate with browsers and link to specific data, rather than entire torrents.

*Final Grade: C*

### Links - IPFS

IPFS has a couple of approaches to links. Primarily they use [Content Identifiers, a.k.a. CIDs,](https://docs.ipfs.io/concepts/content-addressing/#cid-conversion) with two ways of turning them into links. `/ipfs/{CID}/` style URLs, which can be easily converted to paths within [IPFS gateways](https://docs.ipfs.io/concepts/ipfs-gateway/) were initially fairly common. These mirror the underlying [Libp2p multi-address format](https://github.com/multiformats/multiaddr#protocols) and rely on paths with a "type" prefix. 

More recently, IPFS has been using `ipfs://{CID}` URLs that have had some growing pains based on the encoding of the CID. At first, IPFS was using the case-sensitive CIDv0 spec,  based on the [Base58 Bitcoin encoding](https://learnmeabitcoin.com/technical/base58); but this caused problems with loading IPFS URLs in browsers since the `hostname` portion of a URL is case insensitive and generally gets converted to lowercase when parsed within a browser. To mitigate this, IPFS started migrating to CIDv1 which defaults to `base32` encoding, using all lowercase characters. There's still some growing pains when people try to use CIDv0 style links that are the default in older tools, so if your webpage has a URL that starts with `Qm`, consider updating it with a [CID inspector](https://cid.ipfs.io/). In addition to IPFS links, there are also `IPNS` (InterPlanetary Name System) links that can make use of public keys or DNS (Domain Name Server) names instead of CIDs, like `ipns://{Public Key or DNS}/`. The DNS functionality comes from the [DNSLink](https://www.dnslink.io/) standard.

*Final Grade: A*

### Links - Hypercore

Hypercore’s URL standard has changed over time, primarily guided by innovations in the [Dat CLI](https://docs.dat.foundation/docs/cli-intro) and by Paul Frazee's [Beaker Browser](https://beakerbrowser.com/). Initially, the ecosystem used `dat://{public key}/` URLs where the `public key` was 64 hex characters representing a 32 byte public key. This was extended to specify a `version` in the URL using the `dat://{public key}+{version}/` syntax, and also to specify a [DNS name](https://www.npmjs.com/package/hyper-dns) in the URL. Then in [2020](https://blog.datproject.org/dat-protocol-renamed-hypercore-protocol/), the core team working on the Hypercore Protocol part of the Dat ecosystem split off to do their own thing, and the URL scheme was changed to use the `hyper://` name instead of `dat://`. This URL format is problematic because the `hostname` portion is technically invalid according to the URL standard since it uses 64 characters; the maximum allowed length is 63. Luckily, browsers and many other tools like Node.js happily consume the full length of the key, but the community might need to switch from `hex` encoding to something like IPFS' `base32` encoding in order to better conform with existing standards.

*Final Grade: B*

### Links - Secure Scuttlebutt (SSB)

Secure ScuttleButt is a bit of an outlier in that people generally interact with its data via an app like [Manyverse](https://www.manyver.se/), which abstracts the linking of data to an extent. Under the hood, however, SSB has two methods of linking to data: [Cypherlinks](https://handbook.scuttlebutt.nz/concepts/link) and [SSB URI](https://github.com/ssb-ngi-pointer/ssb-uri-spec). The Cypherlink spec seems to have evolved for the #hashtag syntax that SSB uses to link to "channels'' (a.k.a. “tags” in other social media platforms), and adds three new types: `@feed` to link to a specific person or “feed,” `%message` to link to a message, and `&blob` to link to a blob. This syntax is unique among P2P protocols, and is generally only used when rendering Markdown in apps like [Patchwork](https://github.com/ssbc/patchwork) or Manyverse. The latest innovations are URIs that make use of the ssb: URI scheme, and a "type" like “message,” “feed,” or “blob;” (for example ssb:message/sha256/<MSGID>, ssb:identity/fusion/<KEY>, ssb:feed/bendybutt-v1/<FEEDID>`.) SSB URIs are the "latest and greatest'' in linking structures and put effort into being forward compatible with changes to how SSB feeds are encoded and distributed. However, not all SSB apps such as Patchwork make use of these links (as of March 2022) so you might need to revert to Cypherlinks depending on what you're using.

*Final Grade: C*


*Stay tuned for the next post in the series, which will compare data models and mutability.* 

