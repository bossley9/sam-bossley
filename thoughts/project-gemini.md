---
layout: layouts/thought
title: Project Gemini
desc: What is Project Gemini, and why is it the future of the internet?
date: 2021-09-02 00:17:00
tags:
  - suggestion
  - tech
---

Introducing Project Gemini, the best attempt at a "sane" internet.

## A History of Communication

When the fundamental framework for what we call the "internet" was first created in the 1980s and 1990s, no established methods of technological communication existed at the time. It was impossible for internet communication to function because no one knew _how_ to communicate without some preestablished format. Think of the internet like sending physical mail. The only reason mail works is because the world has established that mail should be wrapped in envelopes or packaging, have a stamp in the top right corner, have a return address in the top left corner, and the recipient's address in the center. Until the introduction of HTTP, communication on the internet was the wild west.

### HTTP

Hyper Text Transfer Protocol (HTTP) was the first internet communication protocol to take hold in the late 1980s. HTTP organized all internet communication into communication types (known as requests or request types) and statuses (known as status codes). Normal browsing of the internet retrieving server files (called "websites" or "sites") from a server was known as a GET request. Sending secure data to a server was known as a POST request. Updating data on a server was known as a PUT or PATCH request, and deleting data from a server was a DELETE request. If a request was successful, the status code of any request was 202. If server resources were moved to another place, the status code was 303. If the content of the server was restricted or forbidden by the user, the status code would be 403. Similarly, missing content would output a status of 404 (you've probably seen this before), and internal server errors would output 500 and above. HTTP established many communication protocol conventions we still use today - in fact, you can still find many HTTP websites on the internet by prepending a url with the protocol. For example, try navigating to the links below:

- [http://xinhuanet.com/](http://xinhuanet.com/)
- [http://go.com/](http://go.com/)

However, this approach garnered a lot of criticism. For one, it was inherently insecure - anyone could read your POST requests. In addition, it allowed any requests to be made, including malicious requests, tracking requests, and local storage. It's not a surprise that from its criticism sprang forth another protocol, Gopher.

### Gopher

Gopher was designed as a direct competitor of HTTP. Built around a file system hierarchical model, Gopher was direct, simple, and fast. It did not allow the transmission of multimedia and was designed solely for the processing of textual data through server files (called "gopher holes"). In many aspects, Gopher was a direct upgrade to the original clunky HTTP protocol - faster communication, better privacy, and more semantically accurate. However, by the early 2000s, Gopher was but a whisper. Why? HTTP was easier to use, more widespread, and allowed the sending of images and multimedia. The first images of the internet may have singlyhandedly caused the downfall of Gopher. While Gopher is not yet dead, it is only regularly used by enthusiasts and private companies.

### HTTPS (Ignoring Growing Problems)

Hyper Text Trasnfer Protocol Secure (HTTPS) was created from HTTP for a single purpose - to fix the glaring security vulnerabilities of HTTP. HTTPS was simply a reimplementation of HTTP using another security layer called TLS. However, this was expensive and hard to maintain in the early days. In fact, many of you probably remember the days in the early 2010s when only banking sites and government sites owned SSL certificates to use HTTPS. Fortunately, the superficial cost of HTTPS has minimized so dramatically that virtually all sites use HTTPS by default. Today it is more alarming to see an HTTP only site than an HTTPS site (this site natively serves from HTTPS as well). HTTPS is inherently more secure than HTTP (TLS 1.1 is better than no TLS handshake at all); however, it does nothing to address the painpoints of HTTP - namely, resource-intensive requests, its sluggish nature, and tracking telemetry capabilities.

## Project Gemini (The Prospective Future)

Project Gemini is the best present day attempt at reforming internet communication. Gemini is a new internel protocol created in mid 2019 which aims to combine the strengths of both HTTPS and Gopher to create a completely new protocol. Because Gemini was created so recently, it is able to utilize new technologies and years of experience with poor communication protocols. According to the Gemini Project's main page, Gemini is heavier than Gopher, lighter than the web, and takes user privacy very seriously. So then, what makes Gemini better than the protocols of the past?

I think the first tenet of Gemini that strikes me as very important is its adherence to privacy. Unlike HTTP and Gopher, Gemini is inherently secure, enforcing a TLS handshake _of version 1.2 or higher_ with every connection. Additionally, it saves resources by using a two digit status code as opposed to HTTP's unecessary three digit statuses. Gemini improves download and upload speeds by simplifying request headers from what used to be over 50 different response headers in HTTP into a simple single line Gemini response:

```
<STATUS><SPACE><META><CR><LF>
```

Gemini also resolves the issue of browser tracking and telemetry by removing the ability to create cookies. Cookies are local files that sites can store on your hard drive to record metadata or hardware information. In most cases, cookies are absolutely harmless, but cookies are inherently insecure and can be use to exploit a machine and track a user's browsing history. Instead, Gemini creates client certificates that are deleted immediately after use, acting as session cookies without tracking or telemetry.

Although all these features and enhancements of Gemini are appealing to me, the implicit feature of Gemini that interests me most is its strict focus on semantics and content before noise. Similar to Gopher, Gemini currently does not allow the transmission of multimedia and images.

At this point, I've probably lost you. _"But Sam, images are essential to the internet. Multimedia is what makes the internet amazing!"_

I agree. I think the internet would not be what it is today without media and data sharing. But is multimedia needed for everything? According to the Gemini Project, it does not aim to replace the web, but rather, compliment it. Take this article for example. Would you be surprised if I told you this article adheres to the Gemini specifications? This goes to show that a bloated and insecure HTTPS connection is not necessary for most content retrieved from the internet.

Similarly with the lack of multimedia, the Gemini specifications for server files (known as "gemini capsules") have a stricter, more semantic format. Instead of littering a paragraph of text with external links and images, links can only be located outside of paragraphs as a separate list. Notice how I follow this specification in this article myself. As I have demonstrated, removing links from within bodies of text reduces clutter and improves readability.

Finally, because the Gemini protocol is so innately simple, it leaves a much smaller data footprint than its HTTPS predecessor. Below is a short example of a simple server file ("website") in HTTPS's HTML:

```Sample HTML markdown
<!doctype html>
<html lang="en">
  <head></head>
  <body>
    <h1>My Website</h2>
    <p>Hello, my name is Sam. My website is cool. Some things I've read recently are:</p>
    <ul>
      <li>The Honjin Murders by Seishi Yokomizo</li>
      <li>The Alchemist by Paulo Coelho</li>
      <li>Tokyo Ghoul by Sui Ishida</li>
    </ul>
    <a href="/some-resource">citing my sources</a>
  </body>
</html>
```

Here is the same server file ("gemini capsule") in Gemini's Gemtext, almost reminiscent of Markdown:

```Sample Gemtext markdown
# My Website

Hello, my name is Sam. My website is cool. Some things I've read recently are:

* The Honjin Murders by Seishi Yokomizo
* The Alchemist by Paulo Coelho
* Tokyo Ghoul by Sui Ishida

=> /some-resource citing my sources
```

You can read more about the Gemini protocol specification below.

[https://gemini.circumlunar.space/docs/specification.gmi](https://gemini.circumlunar.space/docs/specification.gmi)

[https://gemini.circumlunar.space/docs/cheatsheet.gmi](https://gemini.circumlunar.space/docs/cheatsheet.gmi)

## Trying Gemini

Interested in trying out Gemini? Since Gemini has risen in popularity in the past few months alone, the amount of Gemini-focused clients and servers are growing rapidly. While Chrome or Firefox have yet to support the protocol, I imagine it's only a matter of time before the protocol is adopted (either natively or via proxies).

That being said, here are a few pieces of software I use currently:

- Ariane. Ariane is an Android Gemini browser app. They've recently updated it to allow theme customizations and page styling options. It does its job and does it well.
- Lagrange. Lagrange is a cross-platform Gemini browser client written in C. It's dead simple and looks really nice, and it's what I use on my desktop. It's pretty advanced as far as Gemini browsers go.

## Conclusion

You may have noticed that my website format has changed. As I've alluded to in my previous update post, I've been in the process of simplifying my site to be only what I want to convey and nothing more. This is in hopes that eventually I will be able to host this site as a Gemini capsule in the future. I plan on deprecating, updating, and possibly removing old posts in order to align with this goal (don't worry, I hope to move more visual content over to some video format - possibly Youtube or Odysee). As always, I keep my visibility public - you can view my website code at any time on my Github.

[https://github.com/bossley9/website](https://github.com/bossley9/website)

Project Gemini is an inspiring project that I hope grows in popularity and reach. I am excited to see what's in store for the internet in the near future.

> I guess I should just end every article I write with "I just love technology so much" and be done with it, huh?

EDIT: My Gemini capsule is live under the same domain :)

[gemini://sam.bossley.us](gemini://sam.bossley.us)
