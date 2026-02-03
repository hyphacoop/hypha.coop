---
image: "/assets/images/social/dripline/2026-02-02-digital-trust-glossary.webp"
title: "Digital Trust Glossary"
author: Cole
date: 2026-02-02
acknowledgement: 
excerpt: "Ironing out definitions for integrity, authenticity, privacy, and more"
atUri: "at://did:plc:rxduhzsfgfpl2glle7vagcwl/site.standard.document/3mdw2srmu2m2z"
---

Here at Hypha, we talk about cryptography and digital trust a lot. We keep running into all these different terms in articles online, in your Bluesky posts, in our group chats. What's the difference between integrity and authenticity? Privacy and security? We keep misusing them, and you do too. So we thought it's time to iron out some definitions for all of us.

Each of these terms refer to how data (a photo, a DM, a webpage) gets processed, transformed, or handled by computer systems – all with the intent of making the source material or its delivery more trustworthy. We've written these definitions for programmers who have some cryptographic background, or people who already know what a [hash](https://samwho.dev/hashing) and MAC are. If you don't, hit up [Wikipedia](https://en.wikipedia.org/wiki/Message_authentication_code) for the short version or [Crypto 101](https://www.crypto101.io/) for the long version.

Note that a high quality trust system is going to combine all these elements together. Transport Layer Security (TLS), the 's' in https://, is an example that gets used repeatedly here because it combines many of these concepts to form a system that secures the entire web.

This glossary is designed to be read like a blog post. Take a look!

# Terms

## Digital Security

This is a very broad term, meaningless without context. It could encompass any of the techniques mentioned on this page, and beyond – such as the use of strong passwords by employees. In general it means "protection against the threats we are considering". When someone says "our system is secure", ask: "against what?". The proceeding entries in this glossary will show various ways to make things more secure, and the threats they protect against.

## Integrity

The first and most important building block of digital trust. Also called "data integrity". This means that the data has not been altered. It is exactly the same from creation to reception.

### Cryptography

The technologies used for data integrity are cryptographic hash functions and derivative constructs like message authentication codes (MAC). Think of SHA-256 or HMAC.

### Example

You receive the hash of a file over a trusted channel. Now when you receive the file over an untrusted channel, you can verify its integrity: that it's exactly the file you want, because the hash you calculated matches the hash you received. You could also receive the file from any source, even untrusted ones, because you can verify it's the correct file.

### In practice

Data integrity is key to how torrenting works. The .torrent file or magnet link contains the hash of the file(s), so when you download from seeders across the world, you can verify you got exactly what you asked for.

It's also part of any competent encryption system, including TLS. It prevents data from being modified in transit.

## Authenticity

We know data comes from the right source if a system provides authenticity; this means it offers a way to prove you are talking to the right person, organization, or machine. Also known as "authentication".

### Cryptography

This is achieved through digital signatures and public key cryptography. At a higher level, public key *infrastructure* connects authenticity to real world identities, in hierarchical (web certificate authorities) or peer to peer frameworks (web of trust, GPG).

### Example

You receive your friend's public key over a trusted channel. Now when you receive messages over an untrusted channel, you can be sure which messages are actually from them, by verifying the signature attached to the message. You could use [minisign](https://jedisct1.github.io/minisign/), for example.

### In practice

This is the part of TLS that proves you're actually talking to "google.com" and not someone else intercepting your connection. Your browser trusts a centralized group of signers, called "certificate authorities". They sign attestations that say "this is google.com's public key". Then when google.com signs its website data with that key, your browser accepts it. A malicious actor wouldn't be able to forge those signatures.

## Privacy

Also known as "confidentiality" or "secrecy", this means the data is not available to any unintended recipients. This could simply be that the data is not accessible, but it's often that the data has been sealed: like a box only your friend can open.

### Cryptography

Privacy is often achieved through encryption. It could be symmetric-key encryption (like AES or ChaCha20), where data is encrypted with a shared secret key. Or it could be asymmetric-key encryption (like RSA), where the data is encrypted using the other party's public key. In practice hybrid encryption is often used, where both these methods are combined.

### Example

You retrieve your friend's public key from a public place, like their website. You encrypt a file (using [age](https://github.com/FiloSottile/age), perhaps) and post it publicly, or send it through an untrusted channel. Even if others download the file, only your friend can decrypt it and read the original contents.

### In practice

Privacy is the final element of what TLS provides; why banking over the web is possible, for example. This is also why chatting on Signal is "private". Information is not revealed, even when others on the café wifi can watch your traffic.

## Verification & Validation

These are ambiguous and similar terms. They are often used interchangeably. In the context of digital trust, they usually refer to the process of checking that something has been done correctly. This could include:

* Hashing the data you received to check it matches the hash you expect  
* Checking the signature of the data matches the data and the public key you expect  
* Checking the timestamp is within an expected or allowed range

This is about whether the trust information provided matches expectations. If hashes, signatures, etc. are not verified, no digital trust can take place. When they are, we can move on to actually processing the content itself: showing a JPEG to the user, for example.

A more formal definition comes from [RFC 4949](https://datatracker.ietf.org/doc/html/rfc4949#page-331):

* Use "validate" when referring to a process intended to establish the soundness or correctness of a construct (e.g.,"certificate validation")  
* Use "verify" when referring to a process intended to test or prove the truth or accuracy of a fact or value (e.g., "authenticate")

This means a "valid signature" has the right data structure, encoding, etc., but a "verified signature" is one that is made by the correct public key for the correct message.

## Trusted Timestamping

Trusted Timestamping refers to techniques for proving data existed before a certain point in time. A blog post may read "Jan 16, 2023", but that requires you to trust the publisher, who may have forged the date. Trusted Timestamping allows you to trust a timestamp is correct without having to trust the content author.

There are two main techniques for this: having a trusted third party attest to the timestamp, or putting the data on a trustless system like a blockchain. You can read a detailed comparison in this [blog post](https://www.makeworld.space/2023/09/time_for_timestamping.html).

### Cryptography

Hash functions (data integrity) and signatures (authenticity) are combined to form this system.

### Example

A cryptographic hash function is used to reduce the data to a smaller number of bits. This hash is then submitted to a trusted third party, who returns a signed statement akin to "I saw this hash at this time". This signed statement is published, and anyone can verify the hash and signature if they have the original data.

Alternatively, the hash is submitted to a blockchain, to be irrevocably included in the timestamped ledger. Anyone can verify that this hash is there.

### In practice

Trusted Timestamping is widely used in industry to timestamp signatures, so they can still be validated even if the signing key is later leaked. Timestamp authority services are provided by reputable companies such as Apple or DigiCert.

If you'd like to try doing this yourself, you can use [OpenTimestamps](https://opentimestamps.org/) or [this tool](https://timestamp.stanford.edu/) from Stanford, or the [Proofmode](https://proofmode.org/) app.

## Content-addressing

The combination of hashing and storage. Instead of storing files or application data by semantic name or timestamp, content-addressed data is stored and referenced by the hash of its content. This has some advantages. Data is self-certifying, can be stored anywhere, and is automatically deduplicated. In exchange it's harder to explore, since every filename is just a string of seemingly random characters.

AKA "content-addressable storage" (CAS).

### Cryptography

Strong hash functions like SHA-256 or BLAKE3 are typically used. Specifications for hash and metadata encoding have been written, such as [DASL](https://dasl.ing/).

### Example

Content-addressing typically happens behind the scenes, since hashes aren't user-friendly. For example, when a social media browser needs to load an image from a post, the post provides the image's hash. The browser can query various sources for that hash, retrieve the file from any source that has it, verify it matches the hash, and display it to the user.

### In practice

IPFS and Bluesky use content-addressing to store user data and large files like images or videos.

## Digital Preservation

This could be as simple as a backup drive, or as complex as the Library of Congress. But a good archival system will go beyond copies and backups and instead include elements of digital trust. These might be:

* Hashes to reference content and ensure it hasn't changed  
* Signatures to stamp content: "we the archive sign off on this data as authentic"  
* Trusted Timestamping to prove content wasn't modified since archival  
* Content-addressed storage to deduplicate the files in the archive

Together these can help show the history of any item in the archive. For public archives with crucial information, making their data more trustworthy is increasingly important given the rise of AI generated content.

## Provenance

This term refers to the origin or source of a digital asset (like a JPEG), as well as its "[chain of custody](https://en.wikipedia.org/wiki/Chain_of_custody)". Provenance answers questions such as: When was this image created? How and when was it transformed? Who stored the data, and for how long? What other assets were involved in processing or creating it? It's equally applicable to a physical object in a museum, evidence in a court of law, or financial ledgers. A similar term is "data lineage".

Provenance doesn't have one definition or application. There are a variety of techniques for tracking the provenance of data, and they will differ across industries. It's especially important for archives.

### Cryptography

One cryptographic tool to help with provenance is Trusted Timestamping. This may involve a third party signing a hash of the file along with a timestamp, to attest to when it existed. It could also involve publishing the hash of the file to a trustless network like a blockchain.

Another cryptographic standard for this is [C2PA](https://c2pa.org/). It defines how to hash an image (or other media), sign a statement about how the image was edited, and then embed that signed statement into the image itself, so it travels with it on the web.

### Example

You see an image on social media, or posted on a news agency's website. Through UI elements on the image, you can see who created the image and when, as well as how it was edited in Photoshop. You can also upload the image to a third party website that verifies its authenticity.

This is mostly speculative. C2PA exists but is not yet widely used or deployed in user-facing settings.

### In practice

User-facing technologies for this are still being developed. You should be able to edit a photo with Photoshop today and then upload the photo to Adobe's [inspector](https://contentauthenticity.adobe.com/inspect) and see the provenance info, embedded in the image through C2PA. Another option would be to install [Proofmode](https://proofmode.org/) on your phone, which will collect provenance information for your photos.

*Hypha is always looking to [collaborate](http://hypha.coop/work) with leading teams on groundbreaking emerging technology. If that sounds like your team, feel free to reach out at hello@hypha.coop*
