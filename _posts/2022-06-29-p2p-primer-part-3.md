---
slug: p2p-primer-part-3
image: "/assets/images/social/dripline/2022-06-29-p2p-primer-part-3.webp"
title: 'Finding friends and staying safe: comparing peer discoverability and security in p2p networks'
author: Mauve
date: 2022-06-29
acknowledgement: 'Mauve is a tech enthusiast with a passion for decentralization. Among their many projects, they are currently developing Agregore, a web browser that combines different peer to peer protocols.'
excerpt: 'Part 3 of our P2P Primer'
atUri: "at://did:plc:rxduhzsfgfpl2glle7vagcwl/site.standard.document/3mdw2tkh2cn2t"
---

<figure>

<img
  src="{{ 'assets/images/posts/2022-06-29-sharing-offline-unsplash.jpg' | relative_url }}"
  alt="Take Sharing Offline. London Street art Shoreditch. Shot on film, Kodak Portra 800, Nikon FM2n"
/> 
<figcaption align = "left"><em>Photo by <a href="https://unsplash.com/@anniespratt?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Annie Spratt</a> on <a href="https://unsplash.com/?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Unsplash</a></em></figcaption>
    
</figure>


**In the third part of our series on peer to peer (P2P) protocols, Mauve compares the peer discoverability and security of BitTorrent, Interplanetary Film System (IPFS), Hypercore and Secure Scuttlebutt (SSB). Read [part 1 here](https://hypha.coop/dripline/p2p-primer-part-1/), [part 2 here](https://hypha.coop/dripline/p2p-primer-part-2/) and find the TL:DR [comparison chart here](https://hypha.coop/dripline/p2p-primer-part-1/).**

## Peer discovery overview

Content and data are all well and good, but in addition, you'll likely want to think about how peers connect to each other and actually load it. Important questions are whether you're okay with communities needing additional servers for reliability, whether [NAT hole punching](https://en.wikipedia.org/wiki/Hole_punching_(networking)) is necessary for things to work, and how much extra traffic you're okay with having for peer discovery. Because BitTorrent is more established than the other protocols discussed here, it’s used as a point of comparison throughout this section. 

### Peer Discovery - BitTorrent

BitTorrent has been around longer than all the other protocols in this list and as such has solved a lot of issues around content discovery. Initially, peers would be discovered using Tracker servers. Torrent files or magnet links would come with a set of servers to use for peer discovery along with built-in tracker servers that would come with some torrent clients. Peers that were looking for others around a given torrent file, would advertise themselves by sending their interest in a torrent to the tracker server, and peers searching for peers would ask the tracker for the list.

This, however, made it easy to censor torrents and the network at large. If a given tracker could be blocked or taken down, then peer discovery could be broken. In order to avoid this point of centralization, the [Mainline Distributed Hash Table](https://en.wikipedia.org/wiki/Mainline_DHT) was made to decentralize the peer discovery mechanism. Instead of a central server being used for peer discovery, peers would spread the load of storing advertisements and serving them with others across all participants. The more popular the mainline becomes, the harder it is to censor all of it.

<figure>

<img
  src="{{ '/assets/images/posts/2022-06-29-DHT_en.svg' | relative_url }}"
  alt="Distributed hash tables"
/>

<figcaption align = "left"><em>Image credit: <a href="https://en.wikipedia.org/wiki/Distributed_hash_table">Wikipedia</a></em></figcaption>
    
</figure>

In addition to finding peers online, BitTorrent also has a [Peer Exchange (PEX)](http://bittorrent.org/beps/bep_0011.html) protocol, where peers that are connected can exchange the IPs of these peers, which can span across trackers and skip the DHT.

Finally, BitTorrent also supports discovering peers on the local network via [BitTorrent LSD](http://bittorrent.org/beps/bep_0014.html) which works by sending [UDP multicast packets](http://www.steves-internet-guide.com/introduction-multicasting) to everyone on the local network and having peers listen for announcements from other computers on the same network. With this in place you don't even need a connection to the internet to exchange data, but can do so over any UDP multicast-supporting  IP network you have available.

One thing to note is that connecting peers between most home or corporate networks requires [NAT hole punching](https://en.wikipedia.org/wiki/Hole_punching_%28networking%29). This  lets the computer within a home network tell other computers on the internet what its public IP address and port are in order to establish a connection. BitTorrent enables this via a combination of [UPnP](https://en.wikipedia.org/wiki/Universal_Plug_and_Play) to specify ports on routers that support it, and the [NAT Hole Punching](http://bittorrent.org/beps/bep_0055.html) extension that can leverage connections to a mutual peer in order to connect two peers together.

Different BitTorrent clients will have different levels of support for this functionality, but most of the core libraries are good enough for establishing connections between most computers. One thing to note is that peer discovery happens per-infohash so your app will need to join several "swarms" and perform several rounds of advertisement in order to find peers for each dataset.
This can add up if you're loading hundreds of torrents on a single machine, particularly since you'll be establishing connections with a few peers at once in order to do adequate downloading and uploading. The protocol itself also doesn't provide the ability to reuse existing connections since each replication stream is per-torrent. Overall BitTorrent's content discovery is mature and reliable, but has some legacy issues that limit its potential.

*Final grade: A*

### Peer Discovery - IPFS

IPFS employs some of the same methods as BitTorrent, but has learned from BitTorrent’s implementation to add some of its own improvements. It takes a hyper-modular approach to networking within the [libp2p](https://libp2p.io/) library, which lets you swap out different peer discovery mechanisms, different network transport mechanisms, and different transport layer security libraries.

Unlike BitTorrent's network connections, libp2p connections are general purpose and can multiplex several streams of data over a single connection. This gives the potential to reuse connections between different parts of a program.  In addition to TCP and UDP for connecting peers, libp2p can seamlessly integrate other transports like QUIC. These can have better performance and security guarantees than TCP and WebRTC, and  can easily bridge web browsers to the rest of the network. In fact, there's even support for connecting peers over a device's [Bluetooth connection](https://berty.tech/blog/bluetooth-low-energy/).

Since IPFS focuses on arbitrary data via CIDs, data exchange is done at the CID level and is a separate step from peer discovery. This means that if you're looking for a new chunk of data, you can ask your existing peers if they have it before needing to search the DHT. Outside of this, IPFS is actually very hungry with network bandwidth since it will do content discovery for each piece of content in the Merkle Tree that you're loading up. This means that even if you're traversing a single dataset, you can quickly overtake the amount of traffic a torrent client does for peer discovery for several torrents at once.

Libp2p also hasn't had as much time to solve the NAT hole punching issue, so connecting two computers on home networks is typically not as reliable as BitTorrent. This has actually improved  recently as you can tell by [this announcement in March 2022](https://blog.ipfs.io/2022-01-20-libp2p-hole-punching/). Initially libp2p would try to rely on UPnP being available in order to open ports; the same as BitTorrent. More recently, they got first class support for NAT traversal via a combination of using [AutoNAT](https://github.com/libp2p/specs/blob/master/autonat/README.md) to determine if you are behind a NAT, and a [public relay node](https://docs.ipfs.io/concepts/glossary/#circuit-relay) to let the two peers talk to each other. This is close to what BitTorrent clients do, but using Libp2p features rather than extensions over torrent replication streams. As of  March 2022, you'll need to be explicitly enabled with the `Swarm.EnableHolePunching` configuration flag. Also note that NAT hole punching will only work with transports that use UDP, so TCP and WebRTC based connections will not benefit from this functionality. 

Also similar to BitTorrent, a lot of the peer discovery relies on the libp2p DHT. It uses the same routing algorithm as Mainline (Kademlia), but it uses a different format for encoding data and has different constraints on how peers can advertise themselves. As well, libp2p supports local peer discovery via [Multicast DNS, Aka ZeroConf, Aka Bonjour](http://multicastdns.org/), which is like the BitTorrent LSD protocol in that it uses UDP multicast to discover other peers. Unlike BitTorrent LSD, some operating systems like MacOS may have existing daemons running on the machine which are binding to the MDNS port and can interfere with an application's peer discovery process. Finally, you can offload some of your connectivity to relay nodes within the network for cases where it's unrealistic for two nodes to connect themselves. Do note that since IPFS is more recent than BitTorrent there's more variation between clients and applications based on which versions of specs they support. The most reliable metric is probably the Golang implementation, but Rust and JavaScript seem to be close seconds.

Overall, IPFS's network layer is extremely flexible and is good for projects that might want to customize what protocols are used to transmit data while being decently reliable. However, it's also the most network hungry out of the box, so you may need to tweak things depending on your deployment environment.

*Final grade: B*

### Peer Discovery - Hypercore

Hypercore encapsulates most of its network code inside the [Hyperswarm](https://github.com/hyperswarm/dht) module. They managed to get some hole punching tricks a bit earlier than libp2p so historically their peer discovery was a bit more reliable. Similarly to IPFS and BitTorrent, Hyperswarm uses a Kademlia based DHT with its own encoding scheme. A unique feature of the Hyperswarm DHT is that node IDs are dependent on their IP+port combos, which helps mitigate against Sybil attacks where a peer fakes their ID in order to get "closer" to a given content ID that they're trying to censor or track. This has the tradeoff of only allowing nodes that have stable IP+port combos in the DHT,  reducing overall nodes, but improving overall reliability of nodes. Unlike libp2p, the hole punching code runs entirely via DHT nodes; peers can use DHT nodes as relays to signal connections to other peers that a DHT node might know. This functionality has been improved in the latest release of Hyperswarm and hasn't been propagated to some apps like Agregore yet, so note that not all of the Hypercore ecosystem has gotten this functionality yet. Hyperswarm also makes use of MDNS for local peer discovery and has the same tradeoffs as libp2p. In fact, the JavaScript implementation of [multicast-dns](https://www.npmjs.com/package/multicast-dns) is reused between hyperswarm and js-libp2p.

The latest version of Hyperswarm brings built-in encryption for connections which integrates with DHT peer discovery. Generally, Hyperswarm combined with Hypercore is very efficient with its network usage and can connect peers reliably between different network configurations. Even though it's fairly modular, it doesn't give as fine grained control over the protocols used for connecting and the encryption schemes, so custom transports like Bluetooth would require a lot more work.

Similarly to BitTorrent, Hypercore discovers content based on entire datasets at once rather than individual bits of files. On top of that, it has aggressive connection reuse and can multiplex replicating multiple Hhypercores over a single replication stream. This means it can make efficient use of network resources by not being too chatty for peer discovery, and by reusing existing connections as much as possible.

*Final grade: A*

### Peer Discovery - SSB

Compared to the other protocols, SSB has a completely different approach to peer discoverability because  it considers DHTs a privacy risk. When you use a DHT for peer discovery, you expose your private IP address to the world. If somebody knows the ID of a piece of content, they can discover the home IP addresses of anyone who’s trying to seed or download that content by doing an IP lookup.

Instead of the DHT, SSB peer discovery relies on your social graph by using `pub` servers which act as always-online peers that follow and backup people's data, and `room` servers which act kind of like private trackers that can let peers exchange IP addresses if they've been granted access to the SSB room. This means that a user joining SSB for the first time won't be able to find data from others unless they can get a connection into somebody's social graph and start replicating data. More leeway is given when doing local-network peer discovery. Two computers can find each other using multicast UDP and present users with a UI to choose to replicate data with each other.

Some apps like Manyverse also offer the ability to connect two phones using Bluetooth for cases where there's no wifi infrastructure for them to discover each other. Similar to Hypercore, SSB can replicate several feeds over a single connection, and has some mechanisms for deduplicating connections. In addition to the connection deduplication, it makes use of a protocol called [Epidemic Broadcast Trees](https://github.com/ssbc/epidemic-broadcast-trees) that helps prune unnecessary connections within a swarm.

SSB's peer discovery is useful in that it preserves privacy better than DHT based alternatives, but it is limited for data that is "one to many," where consumers of content might not have a social connection to the producer of content.

*Final grade: B*

## Security  and  Privacy

The security and privacy implications of protocols is a key concern. This includes issues like whether an ISP or [Man In the Middle (MITM)](https://en.wikipedia.org/wiki/Man-in-the-middle_attack) can see or modify data that you're sending around; the metadata and data that you're leaking to the network when you share data; and whether content can be privately encrypted. One thing to note is that when considering [Information Theory](https://en.wikipedia.org/wiki/Information_theory) any data that you make available is hard to erase or recover once it's shared.

### Security - BitTorrent

BitTorrent places all of its security guarantees into the InfoHash: it tries to guarantee that content you've downloaded from peers is the same as the original dataset that was used to create the infohash. As it was originally configured, BitTorrent did not have any sort of content encryption, and network operators or snoops could intercept and modify any BitTorrent traffic. For example, this could give a network operator direct access to whatever files you were downloading or uploading. This issue has since been addressed via the [PE/MSE](https://en.wikipedia.org/wiki/BitTorrent_protocol_encryption) extension to the protocol that encrypts the replication stream between two peers. This means that most modern clients don't need to worry as much about MITMs intercepting their data. However, even with that in place, BitTorrent's privacy guarantees aren't great. Services and bots periodically scan the DHT for InfoHashes of content that also enables them to download metadata and content for any torrent. This means that any data you publish in a torrent is effectively public and if you want it to be more private, you will need to manually add layers of encryption to the files themselves.

Additionally, BitTorrent used [md5](https://en.wikipedia.org/wiki/MD5) for its hashing algorithm for Merkle Trees, which has since been proven to be insecure. That meant that all older torrents that used v1 of the protocols would potentially be vulnerable to peers lying about contents by generating md5 hash collisions. This has since been fixed in [BitTorrent v2](http://bittorrent.org/beps/bep_0052.html) by switching to the `SHA2-256` hash algorithm which has not yet been broken. With regards to content being cached, anything you publish might get backed up by third parties, who you cannot force to delete data that you don't want shared anymore.

Overall, you probably shouldn't use BitTorrent for storing anything you absolutely want private or haven't encrypted. This is in addition to the concerns about your IP address being easy to find if you're seeding some content. Some people have managed to avoid leaking their IP addresses when using BitTorrent by using the [i2p network](https://geti2p.net/en/docs/applications/bittorrent), but most torrents will not be available, and it requires connecting to trackers since i2p does not support a BitTorrent DHT.

*Final grade: C*

### Security - IPFS

IPFS has a slightly better approach to transport encryption with libp2p by making use of [TLS 1.3](https://www.ietf.org/blog/tls13/) or [Noise](https://noiseprotocol.org/) as a standard for connections. This makes it harder for MITMs to analyze the contents of a libp2p connection and prevents tampering of the connection. However, IPFS has similar privacy guarantees to BitTorrent in that any content published on the network can be discovered by scouring the DHT and attempting to load it from other peers. This is doubly troubling in that individual files are advertised on the DHT rather than entire datasets, so it's easier to find every single computer in the world trying to load the pdf of [Riot Medicine](https://riotmedicine.net/) for example.

You can take a similar approach to BitTorrent by encrypting individual files before sharing them (which is the approach taken by wrappers like [Textile.io](https://linktr.ee/textileio)), but you then lose the ability to share peers between datasets and to deduplicate content on disk out of the box. Another downside is that you cannot use this encryption on IPLD data if you want to be able to backup your content on a pinning service, since the service would no longer be able to see the tree structure.

Similar to BitTorrent, you probably shouldn't be storing anything you want kept private, and doubly you might want to think twice about announcing your IP address if you're worried about your government or copyright holders taking interest. Also similar to BitTorrent, you cannot force peers that have a copy of your data to delete it. Support for hiding IP addresses in IPFS has been attempted by integrating [TOR](https://www.torproject.org/), but most implementations are still [works in progress](https://github.com/berty/go-libp2p-tor-transport).

*Final grade: C*

### Security - Hypercore

Hyperswarm also makes use of the Noise protocol for replication and can prevent snooping and interception of p2p connections. However, it's a bit better for keeping content private as it takes a different approach to identifying content on the DHT; instead of advertising the public key for Hypercore, it advertises a hash of the public key called the "Discovery Key.'' Hpercore’s replication protocol then avoids revealing the public key to peers until they exchange  cryptographic proof that they know it already. This way if you can keep your public key secret, you can use the DHT to advertise data on the network.

The Discovery Key trick breaks down if you want to back up your data on a pinning service, since you would need to provide it with the public key to download data from the network. However, this can be further mitigated with built in encryption. When initializing a Hypercore, you can pass in an optional [Encryption Key](https://github.com/hypercore-protocol/hypercore-next#coreencryptionkey) that will encrypt all the content. This still allows storing complex data within a Hypercore because the raw SLEEP data representing the append-only log is still available to pinning services even if they cannot read the content that's inside. Specifically, unlike IPFS, you can encrypt the structure of your entire file tree while still being able to back it up.

The combination of the Discovery Key and Encryption Key makes it easier to justify storing private data within Hypercore-based apps without needing extra encryption at the application layer or sacrificing too much performance. The IP address leaking that's inherent to the other protocols is still there; if your public key (or discovery key) is known to be of interest, your home IP address can be detected by a third party.

As well, although Hypercore can support deleting content in a log, there is no way to tell other peers to delete the data. There has been talk about using I2P or TOR with Hyperswarm in the past, but as of March 2022, there is no working implementation.

*Final grade: B*

### Security - SSB

SSB has transport level encryption via the [Secret Handshake](http://scuttlebot.io/more/protocols/shs.pdf) protocol; this means that it protects against MITM attacks and keeps the connection between two peers encrypted. It has a similar approach to Hypercore where feeds are replicated only if both sides can prove that they already know what they are. This can be extended with additional verification of both peers so they also know where they sit in relation to their respective social graphs before deciding whether to replicate data.

Although there is the risk of random [Pubs](https://medium.com/@miguelmota/getting-started-with-secure-scuttlebut-e6b7d4c5ecfd) in your SSB social graph getting access to your IP address, it's generally better protected than the DHT-based approaches. In particular, apps like Manyverse let users explicitly opt-into replicating with Pubs. As well, the lack of content-based peer discovery means that the content you're loading will not be discoverable unless a person is within your social graph. For additional privacy, members of the community have created plugins for SSB that enable [TOR](https://handbook.scuttlebutt.nz/faq/misc/tor); this  associates a hidden service address with your account so that other TOR SSB users can connect to you directly.

Another peer discovery mechanism has been standardized recently which takes a middle ground between DHTs, Pubs, and Trackers, called [Rooms](https://www.manyver.se/blog/announcing-ssb-rooms/) which acts similarly to a tracker where users need to be explicitly invited in order to participate in gossiping with each other while they are both online and connected to the room.

Similar to the other protocols, content that's published on SSB stays on SSB as long as somebody out there has a copy. This is especially true for SSB since peers you replicate with will fully backup your feed and completely replicate it to anyone else who can load it. With other protocols you have a higher chance that data you produce will never be seen, but if you replicate with anybody, there's a guarantee that at least one backup is out there. On the whole, SSB is great for cases where you value IP privacy and you trust your social graph not to leak it. Its security can be further enhanced with TOR to avoid leaking your IP even to people you trust.

*Final grade: B*


The last part of this series, focussing on performance, implementations, and backups is up coming next.
