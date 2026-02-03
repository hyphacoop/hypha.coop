---
image: "/assets/images/social/dripline/2024-10-08-storing-metadata-at-starling-lab.webp"
title: "Hypha at the Starling Lab: storing metadata"
author: Cole
date: 2024-10-10
acknowledgement: "Cole is a probationary member at Hypha, and a software developer in the Data Provenance practice area."
excerpt: "Rewriting our data pipeline to use Authenticated Attributes"
atUri: "at://did:plc:rxduhzsfgfpl2glle7vagcwl/site.standard.document/3mdw2szhn6w23"
---

<figure class="pb4">
    <div class='flex items-center justify-center' style="width: 100%;">

        <img class="w-100" src="{{ 'assets/images/posts/2024-10-08_abandoned_filing_cabinet_by_helene_cyr.webp' | relative_url }}" alt="A rusty, abandoned filing cabinet with multiple drawers ajar, spilling out disorganized papers. The cabinet shows signs of significant wear and corrosion, with documents scattered on top and around it, showing signs of age and use."/>
    </div>
      <figcaption>
            Photo by <a href="https://www.stocksy.com/helenecyr">Helene Cyr</a> via <a href="https://www.stocksy.com/photo/4271317/abandoned-filing-cabinet">Stocksy</a>
    
        </figcaption>
</figure>

Hypha has worked with [The Starling Lab](https://hypha.coop/dripline/hypha-at-starling-lab/) since November 2022 to improve digital authenticity and data integrity in journalism, law, and history. One of the major tasks of the engineering team over the past summer has been to re-architect and build our data processing pipeline, to centre on our new metadata database: Authenticated Attributes.  

The previous data pipeline, termed *Starling Integrity*, had limited capabilities for retrieving authenticated information for public sharing, and did not support updating of archive metadata as new information emerged. For example, when an asset was registered on a blockchain or a related asset was archived, we wanted to make this new information linked to the original asset and discoverable. We found this difficult with Starling Integrity as it was an archiving pipeline that operated only on individual media assets, rather than collections or relationships. The system modeled archives as ZIP files containing well-defined JSON metadata, which while portable, quickly became too opaque and restrictive as we encountered new use cases since its initial development in early 2023.

<figure>
    <pre>
    <br>
    sha256(archive).zip  
        sha256(content).ext  
        sha256(content)-meta-content.json  
        sha256(content)-meta-recorder.json  
        proofs/  
            sha256(content).ext.authsign  
            sha256(content)-meta-content.json.authsign  
            sha256(content)-meta-recorder.json.authsign  
            sha256(content).ext.ots  
            sha256(content)-meta-content.json.ots  
            sha256(content)-meta-recorder.json.ots  
    </pre>
    <figcaption>
        The structure of a media asset archive produced by Starling Integrity.
    </figcaption>
</figure>

Separately, we had been working on the design and implementation of a new experimental database, an append-only log where each key-value pair, anchored on the hash of a media asset, is signed and [timestamped](https://dispatch.starlinglab.org/p/time-for-trusted-timestamping). We saw this as a way to store attested metadata about media in a way that was provable and attributable.  

This database would also function as an archive, allowing for eventual use in a court of law to prove facts with cryptography. For example, “at this time or before, journalist John Doe wrote this caption for the image". The legal system takes time, and using Authenticated Attributes allows us to lock in important metadata that researchers and journalists collect such as location, capture time, and subject names for when that time comes.  

<figure class="pb4">
    <div class='flex items-center justify-center' style="width: 100%;">

        <img class="w-100" src="{{ 'assets/images/posts/2024-10-08-authenticated_data_schema.png' | relative_url }}" alt="Slide titled 'Authenticated Data Schema' with a diagram and bullet points. The diagram shows a layered structure with a 'Timestamp,' 'Signature,' and 'Raw attestation' (including a CID and location), followed by 'Attestation CID,' 'Public key,' and 'Signature.' The final layer is 'Signature+Attestation CID' with 'Time proof data.' The bullet points explain that metadata is individually signed, timestamped, and stored as DAG-CBOR in IPFS, using SHA256 CIDv1. Digital signatures use Noble Crypto, encryption uses NaCl (xsalsa20-poly1305), and timestamping is done via OpenTimestamps." />
    </div>
    <figcaption>
        Authenticated Attributes stores a variety of information for each attribute
    </figcaption>
</figure>

More advanced usage will see various organizations (news media, independent photojournalists, bloggers) running their own instances of Authenticated Attributes, each publishing their own attributes for pieces of media. Consumers can then pull information from sources they trust, similar to how one subscribes to RSS feeds, and receive authenticated  attributes they can compare across sources. Media is keyed by its hash, so it's clear when publishers are publishing information about the exact same file.  

Authenticated Attributes supports several advanced features demanded by scenarios we’ve come across in the last two years at the Lab, such as attribute-level encryption, P2P replication of the database, search capabilities through attribute indexing, relationships among assets, and an HTTP API. You can see the details on [GitHub](https://github.com/starlinglab/authenticated-attributes).  

Once summer of 2024 rolled around, it became clear that the way to address our pipeline shortcomings was to build a new one. This pipeline would preserve current operational patterns for creating an archive, while using our new database as the central place to store metadata, instead of it being scattered across ZIP files. This time around, each attribute would be individually signed to support selective disclosure of information, and would be mutable but version-tracked. As we designed the architecture of the pipeline, the scope of the database expanded slightly, to hold other important project attributes, like logs of where files had been uploaded or registered. Everything was falling into place, with Authenticated Attributes as the source of truth.  

Our new data pipeline, imaginatively named [Starling Integrity v2](https://github.com/starlinglab/integrity-v2), consists of a couple of services for ingesting files, along with a suite of CLI tools, all written in Go. The CLI commands provide a convenient interface for all file and metadata operations, from encryption to export to standard formats such as [Verifiable Credentials](https://w3c.github.io/vc-data-model/) and [C2PA](https://c2pa.org/specifications). This allows employees even outside the engineering team to quickly find the data they need and to produce verifiable files for their publishing workflows.  

We've just started using this system for its first real-world project, and it's working smoothly so far. All of the metadata is easy to view and easy to change (with edit history!) when our journalist partners have updates. Being able to store relations between media files with a semantically rich vocabulary (e.g. redact, contextualize, encrypt) unlocks new data visualization opportunities for publishing of the project on the Web. Look out for Authenticated Attributes in the wild over the coming months!
