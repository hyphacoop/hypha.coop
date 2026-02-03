---
image: "/assets/images/social/dripline/2022-10-25-p2p-primer-part-4.webp"
title: 'Check the specs: final thoughts on p2p options'
author: Mauve
date: 2022-10-25
acknowledgement: 'Mauve is a tech enthusiast with a passion for decentralization. Among their many projects, they are currently developing Agregore, a web browser that combines different peer to peer protocols.'
excerpt: 'Part 4 of our P2p Primer'
atUri: "at://did:plc:rxduhzsfgfpl2glle7vagcwl/site.standard.document/3mdw2tfq6cu27"
---

### {{ page.excerpt }}
<figure>
<img src='/assets/images/posts/2022-10-20-stay-connected.jpg' alt="a computer stencil with the words stay connected on the screen on a blue wooden background."/>
<figcaption>Photo by <a href="https://unsplash.com/@theeastlondonphotographer?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Ehimetalor Akhere Unuabona</a> on <a href="https://unsplash.com/collections/Y-eond4sz2I/dripline?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Unsplash</a>
  </figcaption>
</figure>


**In the fourth and final part of our series on peer to peer (P2P) protocols, Mauve compares the performance, implementation, and backup capabilities of BitTorrent, Interplanetary File System (IPFS), Hypercore and Secure Scuttlebutt (SSB). Read [part 1 here](https://hypha.coop/dripline/p2p-primer-part-1/), [part 2 here](https://hypha.coop/dripline/p2p-primer-part-2/) and [part 3 here](https://hypha.coop/dripline/p2p-primer-part-3/). Find the TL:DR [comparison chart here](https://hypha.coop/dripline/p2p-primer-part-1/).**


## Performance

One metric that's useful to consider when choosing protocols is overall performance. What feels "fast" when a user tries to load data? How hot will your computer get from loading data? How much network traffic can you expect, and how much data will be stored when using the protocol? 

### Performance - BitTorrent

BitTorrent performance is best described as "good enough." Its use of [uTP](https://www.libtorrent.org/utp.html) means that it won't hog bandwidth away from other applications. Most implementations are fairly optimized by now and it won’t use too much RAM or CPU when processing data; though this degrades as the number of files you're loading increases.

Loading all of Wikipedia over BitTorrent isn't viable due to the size that just the `.torrent` file metadata would need to be, in order to list all the files and individual chunks. Large datasets can be optimized by storing them into [SQLite databases](https://github.com/bittorrent/sqltorrent) within a torrent and sparsely loading chunks from the torrent on-demand. Similarly, network speeds are fast enough that you can stream a video from a decently-seeded torrent on-the-fly.

*Final Grade: C*

### Performance - IPFS

IPFS is often used for loading web content (e.g. images, web pages, videos), and the initial load time can vary depending on the data. Generally, anything using IPNS (InterPlanetary Name System) will take significantly longer to load (particularly without pubsub or DNSLink), and regular IPFS CIDs can vary based on the number of peers. One thing you can guarantee is that after the initial load, reloads will be almost instantaneous. An active IPFS node can noticeably start to use up resources as it will be talking to the network and will be processing data a lot more than other protocols.

Large datasets can perform better than BitTorrent since the HAMT (Hash Array Mapped Trie) structure of large folders allows you to load just a subset of the Merkle Tree for a dataset on the fly. Seeding a large dataset can be much more resource-intensive since by default each folder and each file chunk will need to be announced on the DHT (Distributed Hash Table) and the local network individually.

Performance with IPFS is something you might want to tune based on your application, but can yield decent results for medium-sized datasets just out of the box.

*Final Grade: C*

### Performance - Hypercore

Hypercore's data model and Hyperswarm's DHT are both optimized to reduce overall network traffic and Round Trip Time (the time from sending a packet to a peer, and getting a response back) for getting a range of data from a remote peer. As such, it performs well for querying large datasets with less delay than other protocols, but it can start to struggle as the number of Hypercores you're replicating grows. That is, if your application is loading hundreds of hypercores at once, you can start to run into bottlenecks with using file descriptors and in-flight network requests. Depending on how you structure your application, the initial load can be very fast, and subsequent loads are near-instantaneous. The load time is also boosted with in-memory caches that get automatically generated for Hypercores.

*Final Grade: A*

### Performance - SSB

SSB performance struggles the most among these protocols, in particular when using it in a social context where you're loading feeds from many peers. Its requirement of loading entire feeds from all peers means that the "initial load" will take a while as data is loaded and indexed into the local database. After the initial load, the local indexes of the database can make queries within your application fast enough to keep your application snappy. Thankfully, the community has been actively working on improving the performance pain points by creating new feed types and new indexing methods.


*Final Grade: D*

## Implementations

When building something on top of a protocol, or purely for personal preferences, it is important to know what programming languages and environments support a given protocol. If a protocol doesn't support your language or operating system of choice, it's often less viable for whatever use case, regardless of other tradeoffs.

### Implementations - BitTorrent

Since BitTorrent has been around for a while, it boasts having stable implementations in different programming languages as well as having stable specifications for loading data in between them. For example, you can be sure that if you're running a major operating system, there is a torrent client out there that will work well enough for your use case. For C++ enthusiasts, [libtorrent](https://www.libtorrent.org/) is the gold standard for building clients as it's feature rich and performant. This might also be your choice if you want to embed BitTorrent in a different programming language via [Foreign Function Interfaces](https://en.wikipedia.org/wiki/Foreign_function_interface).

Another useful implementation is [WebTorrent](https://webtorrent.io/desktop/), which enables web browsers to load torrents (if they have WebRTC-compatible seeders). This implementation works with Node.js in order to bridge the regular BitTorrent network with the WebRTC/browser-based network by running hybrid nodes that can do both. However, if you search for implementation in your language of choice, it probably exists albeit in various states of completion.

*Final Grade: A*

### Implementations - IPFS

IPFS has been leading the way among new protocols with publishing detailed specifications of how their protocol works, and has several active implementations. [Go-IPFS](https://github.com/ipfs/go-ipfs) is the most stable and "canonical" implementation of the protocol that contains all the bells and whistles from the spec and is written in the [Go](https://go.dev/) programming language. One of the tradeoffs to consider when using this implementation is that Go can be memory hungry and requires larger binary sizes when distributing applications due to its need to bundle the Go runtime libraries. However, this is most likely to be stable in all implementations and to get the most support from official sources.

[JS-IPFS](https://js.ipfs.io/) is a JavaScript implementation of IPFS that can work both inside web browsers, and [Node.js](https://nodejs.org/en/). Its stability is a bit behind go-ipfs, but it's a decent alternative and the only one if you're constrained to browser runtimes. [Rust IPFS](https://rustipfs.com/) is the newest implementation and has a focus on performance and efficiency. A lot of this efficiency comes from using the [Rust programming language](https://www.rust-lang.org/) that has a novel method of dealing with memory management and type systems to create very fast and memory safe code. It might be lagging behind go-ipfs in terms of overall features but it's certainly usable and even has an [embedded mode](https://github.com/ipfs-rust/ipfs-embed), which is meant to be run in highly constrained environments like IoT devices. [gomobile-IPFS](https://github.com/ipfs-shipyard/gomobile-ipfs) brings IPFS to iOS and Android by compiling Go to run natively and to generate bindings for Swift and Java.

Other programming languages have various degrees of support, but if you want to use IPFS and don't want to reimplement the entire specification, it's easy to use the [IPFS Daemon HTTP API](https://docs.ipfs.io/reference/http/api/), which can give your application access to all IPFS functionality using HTTP requests.

*Final Grade: A*

### Implementations - Hypercore

Hypercore Protocol only has a single canonical implementation in JavaScript with a focus on Node.js compatibility. You can also run parts of Hypercore in a web browser by compiling the codebase with tools like [Browserify](https://browserify.org/), using WebRTC to connect browser peers, and [relaying calls to the DHT](https://github.com/hyperswarm/dht-relay) using Websockets. There has also been some work on a [Rust](https://github.com/datrs) implementation, which made progress on the older version of the protocol used with the Dat CLI, but it has not yet reached a usable state.

*Final Grade: C*

### Implementations - SSB

The main implementation of Secure Scuttlebutt is in [Node.js](https://github.com/ssbc) with some bits [implemented in Rust](https://staltz.com/rust-for-mobile-not-yet.html) before reverting back to JavaScript. [Planetary](https://github.com/planetary-social/planetary-ios) is an SSB app for iOS which uses a [Go implementation](https://github.com/cryptoscope/ssb) of SSB. There is also a Rust implementation in the [Peachcloud](https://github.com/peachcloud/ssb) project that aims to be compatible with the rest of the ecosystem. Finally, the JavaScript version of SSB has also been used on both iOS and Android via [Manyverse](https://www.manyver.se/) by embedding it via [nodejs-mobile-react-native](https://github.com/janeasystems/nodejs-mobile-react-native).

*Final Grade: B*

## Backups (Seeding/Pinning/etc)

One issue that peer-to-peer based apps face is that if there is no peer online with a copy of some particular data then new peers will be unable to access it. This is usually solved by having "Super Peers," which are always online and will keep a backup of your data for you even when you're offline. Most systems can work without this functionality if peers can rely on being online at the same time frequently enough that they can sync, but backups are still an important feature.

### Backups - BitTorrent

BitTorrent typically uses [Seedboxes](https://hackernoon.com/how-to-use-a-seedbox-to-download-torrents-anonymously-and-fast), which are servers meant to stay online all the time to keep torrents seeded. There are many different implementations of Seedboxes out there; sometimes they take  the form of somebody running a torrent client from a command line on a server and connecting to it to add more torrents. This means that you have a lot of choice in how your backups run, but it comes at the cost of there not being standardized ways of backing up data.

*Final Grade: A*

### Backups - IPFS

IPFS improved on the concept of seedboxes with [pinning services](https://docs.ipfs.io/how-to/work-with-pinning-services/) that explicitly implement a minimal HTTP [API](https://ipfs.github.io/pinning-services-api-spec/). This means that different services like [Pinata](https://www.pinata.cloud/) and [Fleek](https://fleek.co/) can have their own method and payment systems for backing up IPFS data, but can also act as commodities that allow you to use different client applications to tell them to pin something. On top of the Seedbox concept, IPFS has a cryptocurrency called [Filecoin(FIL)](https://filecoin.io/) that makes it possible to automatically find peers on the network who can be paid in FIL to back up your data.

*Final Grade: A*

### Backups - Hypercore

Hypercore doesn't have a standard for pinning services at the moment. There are self-hosted services like [dat-store](https://github.com/RangerMauve/dat-store), which can be used to pin data onto remote machines, but they are community efforts. (Disclaimer I made dat-store 🤪).

*Final Grade: C*

### Backups - SSB

SSB relies on your social graph and on pubs to back up your data. Peers will fully replicate data for their friends and their friends of friends by default, so periodically connecting to a friend is enough to keep your data backed up. The reliability can be improved by using SSB pubs, which are like friends who live in the cloud. Adding a pub as a friend means they will always be online and capable of backing up your data and the data of your friends. Pubs in the SSB network can talk to each other to replicate data, so if people are mutual friends with pubs, they can potentially share data via the pub automatically.

*Final Grade: A*

## Conclusion

Hopefully, this series has given you insight into the differences and similarities between protocols and has suggested why there isn't one tool to use for every occasion; instead there are a series of tradeoffs, depending on what you want to do and why. If you're interested in building something decentralized, consider looking at what matters most to you and try playing around before settling on a final option.

For those that don't want to settle on a single protocol, check out useful cross-protocol projects such as [Distributed Press](https://distributed.press/) or the [Agregore Browser](https://agregore.mauve.moe/).


