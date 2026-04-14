---
image: "/assets/images/social/dripline/2026-04-14-pollen-nectar-atmosphere-conf.webp"
title: "Pollen & Nectar"
author: Cole
date: 2026-04-14
acknowledgement:
excerpt: "Putting perceptual hashes to work on the ATmosphere"
---

Last month, Hypha member Udit and I attended [Atmosphere Conf](https://atmosphereconf.org/). We had a great time! Hanging out with people in person confirmed what we had been seeing across our feed for months: the Atmosphere is a vibrant and growing ecosystem we're excited to be a part of.

We made our first foray into the protocol in February with [spores.garden](https://spores.garden), our [digital garden game](https://hypha.coop/dripline/we-built-you-a-garden/), learning how to write lexicons and engage with the community. Emboldened by how easy it is to build on AT Protocol, we decided to explore a new direction for the conference.

We ended up doing a [lightning talk](https://www.youtube.com/watch?v=NqO90VL6NJ4) where we demoed our new projects [Nectar](https://nectar.hypha.coop/), an API for image search and Pollen, an image annotation browser extension. With Pollen, you can make claims about an image in a post (“this is my photo”, “this is AI”, etc.) and those claims will be shown to the user when that image is reposted, even with slight modifications.

<div class="flex items-center justify-center" style="width: 100%; height: 100%; position: relative; padding-bottom: 56.25%; overflow: hidden;">
    <iframe
        style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;"
        src="https://www.youtube.com/embed/NqO90VL6NJ4"
        title="YouTube video player"
        frameborder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        referrerpolicy="strict-origin-when-cross-origin"
        allowfullscreen>
    </iframe>
</div>

## Motivations

Before we get into the technical details, let's take a step back: why are we doing this project? The idea came out of our long-time collaboration with [Starling Lab](https://www.starlinglab.org/), an academic research lab that establishes trust in digital records. In the past we've [written about](https://hypha.coop/dripline/storing-metadata-at-starling-lab/) our metadata storage system, Authenticated Attributes, which allows journalists to make secure claims about their media files. Having our own custom, cryptographically-secured database to store metadata is a system that worked, but it had issues.

One major issue was identity. We had keypairs for each journalist or organization using our system, which was already tricky. But even when we managed the keys, we still had to provably link the public key to the person to establish trust; for example, by posting the key on the journalist's website or social media. This made for a manual and error-prone identity system, especially since we didn't have a specification to follow.

Another challenge was content matching. Our database was oriented around cryptographic hashes of media, so every piece of metadata would be in the form “person X says Y about file Z”. This is good for data integrity, to ensure that files are never modified. But it made applying Authenticated Attributes to social media impossible, because platforms compress images and remove metadata, and users screenshot and edit. The hashes never matched, and so the metadata we stored was not useful outside of our archival context.

As AT Protocol gained popularity, we realized it has a lot to offer from a digital trust standpoint: a standardized system that people already use, which handles identity, signatures, distribution, and storage. Furthermore, it has a large social network using it (Bluesky), so referencing social media images is a lot easier. The final piece of the puzzle is perceptual hashing, which we [covered](https://hypha.coop/dripline/similarity-at-scale-perceptual-hashing/) recently. This technique allows us to refer to image content itself, even if the underlying bytes are modified.

Putting metadata on AT Protocol—while useful—is pretty straightforward, amounting to simply storing JSON in a PDS. For our talk we wanted to take things a step further, and showcase what's possible once perceptual hashes are applied: matching metadata across images!

## Nectar

To make this possible, we created [Nectar](https://nectar.hypha.coop/): an API to search for similar images across AT Protocol. It indexes records that contain image blobs, and calculates the perceptual hash of each blob, discarding the image itself. It also indexes records that contain perceptual hashes themselves (in our [PFP](https://dasl.ing/pfp.html) format, a [DASL](https://dasl.ing) spec), and extracts the hash value.

Having a database full of these hashes allows for queries like “given this image, show me all the Bluesky posts that have similar images”. The API hashes the given image, and then queries the database for all the indexed records in the `app.bsky.feed.post` collection that have image blobs that are similar enough to the given image. Similarity is calculated using [Hamming distance](https://en.wikipedia.org/wiki/Hamming_distance) between perceptual hashes, and is accelerated through database indexing.

We think having an API like this enables a lot of interesting use cases. With Pollen, we explored one specific use inspired by our work at Starling Lab: fighting misinformation by adding context to images.

## Pollen

Pollen is our flagship demo of what Nectar makes possible, created in collaboration with [Starling Lab](https://www.starlinglab.org/). It's a browser extension that alters the Bluesky web interface, adding a small “Claim” button to images in a user's feed. This allows the user to make claims about images, entering them into a text box.

<figure class="pb4">
    <div class="flex flex-wrap justify-center items-start nl2 nr2">
        <div class="ph2 w-100 w-50-ns mb3 mb0-ns">
            <img class="w-100" src="{{ 'assets/images/posts/2026-04-14-pollen-nectar-atmosphere-1.png' | relative_url }}" alt="Bluesky post with an image and the Pollen Claim control highlighted in the interface."/>
        </div>
        <div class="ph2 w-100 w-50-ns">
            <img class="w-100" src="{{ 'assets/images/posts/2026-04-14-pollen-nectar-atmosphere-2.png' | relative_url }}" alt="Pollen dialog for entering a text claim about an image."/>
        </div>
    </div>
    <figcaption>
        Adding a claim to an image in the Bluesky web app with Pollen.
    </figcaption>
</figure>

That claim gets added to the user's repository, via the credentials we already have since the user is logged in to bsky.app. Here's an example of a real [claim record](https://pdsls.dev/at://did:plc:2j2ounbiyi3ftihronlw5qhj/coop.hypha.pollen.claim/3mhvxih6d2e2g):

```json
{
  "cid": {
    "$link": "bafkreibyapnszif4do2hmruy7nsmrfdhc75np3qypox75c46tpi2pe2lme"
  },
  "pfp": {
    "__pfp": "paeqeix3fx5nnv27yngyfeucikjug2qw6jtwdmtgnlgzglnmwfmzgvsq"
  },
  "$type": "coop.hypha.pollen.claim",
  "content": {
    "text": "Test",
    "$type": "coop.hypha.pollen.embed.text"
  },
  "subject": {
    "cid": "bafyreibpuy564ul7hp7thr5ajis3eqaikelqa26m2zvtpqqtv2ixnuvysi",
    "uri": "at://did:plc:m6rd3glyjmmmsvzcvomsvwsp/app.bsky.feed.post/3mgpq4mmjtk2d"
  },
  "createdAt": "2026-03-25T20:46:30.368Z"
}
```

This record lexicon (the schema) was carefully designed to hold some key information:

- The CID of the original image, for data integrity and provenance
- The [PFP](https://dasl.ing/pfp.html) (perceptual fingerprint – the perceptual hash) of the image, to match across image files
- An open union for claim content, just a simple text field in this case
  - This could be extended to support structured data like geolocation
- Subject: a “strong ref” to the original post the claim was made on, for provenance
  - This is optional, since not all claims will be made in reference to other records
  - For example an archive might want to publish metadata about the objects they have, before anyone posts them on Bluesky
- A creation timestamp – this is forgeable, but useful in most cases anyway

Compared to our previous work with Authenticated Attributes, this provides not just data integrity, but also a record of the visual content in the image, for matching later. We don't have a [trusted timestamp](https://www.makeworld.space/2023/09/time_for_timestamping.html) anymore, but this could be added in the future.

The final step in using Pollen is displaying that claim, even on different (but visually similar) images. This is where the Nectar API comes in. For every image the user sees while scrolling through their feed, that post is submitted to the Nectar API, and the hashes are returned. The extension then queries the API for any `coop.hypha.pollen.claim` records that have similar hashes. If there are any, they get displayed by the extension inline with the post. If the claim was originally made on a different post, extra information is displayed, like how visually similar the image is (according to the [PDQ](https://github.com/facebook/ThreatExchange/tree/main/pdq) algorithm) and a link to the original post.

<figure class="pb4">
    <div class="flex items-center justify-center" style="width: 100%;">
        <img class="w-100" src="{{ 'assets/images/posts/2026-04-14-pollen-nectar-atmosphere-3.png' | relative_url }}" alt="Bluesky post where a Pollen claim from a news organization contradicts the post author’s caption."/>
    </div>
    <figcaption>
        A user’s post is contradicted by a Pollen claim from a news organization (example).
    </figcaption>
</figure>

<figure class="pb4">
    <div class="flex items-center justify-center" style="width: 100%;">
        <img class="w-100" src="{{ 'assets/images/posts/2026-04-14-pollen-nectar-atmosphere-4.png' | relative_url }}" alt="Diagram of the Pollen service: Bluesky web app, browser extension, user PDS, and Nectar API."/>
    </div>
    <figcaption>
        Overview of the Pollen service architecture.
    </figcaption>
</figure>

Pollen is an experiment, but you can try it out today on [Firefox](https://addons.mozilla.org/en-CA/firefox/addon/pollen/) or [Chrome](https://chromewebstore.google.com/detail/pollen/jmhngilkjebnlamkkgfcamgapoojfclh?pli=1).

## Nectar in other contexts

Pollen is one use case, but other kinds of projects could be enabled by image search: social research, moderation, rights management, community notes, information integrity, and more.

Being able to connect similar images means you can track reposts across the network, and see how often certain images are being posted over time. This can be used for social research, to track the spread of misinformation, or for Trust and Safety, to moderate unwanted images.

Pollen allows for image claims in bsky.app, but there are [several](https://margin.at/) [other](https://semble.so/) ATmosphere applications that already support annotations on things like webpages. Nectar could allow these app users to annotate images directly, and see the annotations other users have made.

Finally, we see Nectar as a necessary component for integrating a [Community Notes](https://en.wikipedia.org/wiki/Community_Notes)-style feature into Bluesky, allowing notes to go beyond individual posts. Pollen is a demo, but true Community Notes would be really powerful for a social network of 40 million users.

---

If you'd like to use [Nectar](https://nectar.hypha.coop/) in your project or explore what's possible with Pollen, please [reach out](mailto:hello@hypha.coop)!
