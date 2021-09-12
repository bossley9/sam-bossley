---
layout: layouts/thought
title: "Trials and Tribulations with OpenBSD (Part 2)"
desc: As I trudged through working with and setting up the various BSDs, I wanted to document my findings and why I will continue using OpenBSD in the future.
date: 2021-02-07 17:52:00
tags:
  - tech
---

In [my previous deep dive into the OpenBSD operating system](/public/thoughts/trials-and-tribulations-with-bsd) I talked a lot about the various benefits and drawbacks of using that operating system as a daily driver. Now that the new academic semester has been in session for several weeks, I've been using OpenBSD more regularly for schoolwork and have a more well-rounded view of the experience that is OpenBSD. While my last article formally introduced positives and negatives in an orderly fashion (denoted by section), I will use this article to simply describe my experiences and discoveries with specific software or libraries in no particular order. This will follow a more "narrative" format describing my experiences and whether I still believe OpenBSD is "worth it" as an operating system.

I will be discussing various technical topics pertaining to the system itself. If you're new to Unix systems, you may want to avert your eyes and skip straight to the conclusion. And with that, I'll jump right into the details.

## Unlocking Mutexes and Semaphores

If you've taken any low level computer science course, you're probably experiencing triggering flashbacks from the title alone.

While working with my favorite multimedia-handling programs such as [Newsboat](https://newsboat.org/) and [mpv](https://mpv.io/), I encountered an issue where the program would print the following mutex error on a graceful quit:

```sh
pthread_mutex_destroy on mutex with waiters!
```

I initially assumed the bug had some impact on media playback - however, my programs never crashed and media playback remained consistent.

After some researching, it seemed like I wasn't the [only one dealing with this issue](https://nanxiao.me/en/openbsd-gives-a-hint-on-forgetting-unlock-mutex/) - it appeared to be an operating system bug with its incorrect handling of unlocking mutexes. Similar to a memory leak, leaving a mutex locked or unlocked will not cause any issues in the short run; however, this can be detrimental to the system as a whole if overlooked, leading to freezes, data loss, or cold crashes of the system.

## Suppressing Core Dumps

OpenBSD's default system behaviour with crashing applications is to generate a core dump file in the directory it executed from. Core dumps are files that are created when a program crashes prematurely or a memory leaks exists. A core dump file contains a summary of all variables in memory at the time of the program crash in addition to specific code information on what line of code produced an error.

I initially was completely on board with the creation of the dump files (the more debugging tools at my disposal, the better). However, after generating multitudes of dump files, I became frustrated with the additional task of having to delete dump files I knew to be harmless. Many times, if I prematurely closed a window (which I seem to do very often with [bspwm](https://github.com/baskerville/bspwm)), that window would generate a crash dump file - even if _I was the one who caused the "crash"._

I first looked into preventing core dump files via the sysctl kernel parameter `kern.nosuidcoredump`. According to [the manual](https://man.openbsd.org/sysctl.2#KERN_NOSUIDCOREDUMP~2), setting `kern.nosuidcoredump` to 1 will prevent the creation of core dump files; however, the parameter only works when "changing user or group ID".

After a bit more head scratching and failed solution attempts, my intuition told me that the best way to prevent core dumps would be to limit the maximum size of the core dump files to 0 bytes. If the maximum dump file size is 0 bytes, the dump will not be created.

![LeVar Burton thinking](/public/thoughts/trials-trib-2-think.jpg)

Acting on my theory, I tried using ksh's `ulimit` property to set the core dump file size to 0 ([the "b" in "bash" stands for "bloat" - I know, I'm a ksh fanboy](https://en.wikipedia.org/wiki/KornShell)):

```sh
ulimit -c 0
```

The solution to limit core dump file sizes worked - but the effect was shell-specific. To make the change persistent across all shells, I edited `/etc/login.conf` with the following default configuration:

```sh
default:\
	:path=/usr/bin /bin /usr/sbin /sbin /usr/X11R6/bin /usr/local/bin /usr/local/sbin:\
	:umask=022:\
	:datasize-max=768M:\
	:datasize-cur=768M:\
	:maxproc-max=256:\
	:maxproc-cur=128:\
	:coredumpsize=0:\
	:openfiles-max=1024:\
	:openfiles-cur=512:\
	:stacksize-cur=4M:\
	:localcipher=blowfish,a:\
	:tc=auth-defaults:\
	:tc=auth-ftp-defaults:
```

The key in this default configuration is that the `coredumpsize` parameter is set to 0 (bytes). This completely prevented OpenBSD from generating pesky core dumps. This solution is also impermanent, meaning that I can reenable core dumps if desirable in the future.

## Dbus

I'm personally not a huge fan of notification-based or system-wide messaging systems such as [Dbus](https://en.wikipedia.org/wiki/D-Bus) because they induce [overstimulation](/public/thoughts/rss-comprehensive-overstimulation.pdf) and waste CPU cycles. I can understand the reasons why someone would want to use Dbus; however, I do not like to be bothered and waste CPU power so I usually disable it on every system I use (except Windows, which uses a messaging system that can never be turned off...).

Dbus on OpenBSD cannot be accessed normally with "dbus" or "dbus-daemon" as on most Unix systems. Instead, it uses OpenBSD's "messagebus" init service to propogate its notification system according to its manual page:

> The systemwide daemon is normally launched by an init script, standardly called simply "messagebus".

I find the reason behind this convention unapparent. Using this information, I disabled dbus using `rcctl` with `doas` for elevated privileges:

```sh
doas rcctl stop messagebus
doas rcctl disable messagebus
```

Thankfully, OpenBSD makes managing system services much easier than whatever issues [SystemD](https://nosystemd.org/) "claims" to solve.

> I'm kidding about SystemD. I know it's a very controversial topic in the world of Unix for power users such as myself but I do not care either way.

## GCC

OpenBSD ships with a default binary of gcc 4.2.1, a very outdated version. I assume they keep this version simply because it can be proven to be secure. I, on the other hand, needed a newer version to compile a few obscure software applications for bleeding-edge changes. I tried compiling the latest gcc version in [ports](https://www.openbsd.org/faq/ports/ports.html), only to encounter two issues:

> Compiling a compiler with an older version of itself to compile another program - the irony of it all...

1. I quickly ran out of partition space. As much as I love my business laptop, it only contains a 256 GB Nvme SSD for data storage space (I might upgrade in the future but I'd rather use an external disk for data longevity). My partition table follows the default partitioning scheme for OpenBSD (the output below was tailored using the program `df`):

   ```sh
   Filesystem     Size    Mounted on
   /dev/sdXX      986M    /
   /dev/sdXX      150G    /home
   /dev/sdXX      3.9G    /tmp
   /dev/sdXX      5.8G    /usr
   /dev/sdXX      986M    /usr/X11R6
   /dev/sdXX     19.4G    /usr/local
   /dev/sdXX      5.8G    /usr/obj
   /dev/sdXX      1.9G    /usr/src
   /dev/sdXX     28.8G    /var
   ```

   > I blocked out specific partition names with `XX` because it's technically a security hazard to reveal those to the internet. You never know who may be reading ;)

   Using the recommended installation instructions, I installed ports into `/usr/ports`. However, I missed a crucial detail - explicitly setting the working object directory, distribution directory, and package directory. Because I assumed I would never reach the 5.8 GB limit I had set for my `/usr` partition, my compilation ran for around 30 minutes before stopping completely and warning me the system ran out of disk space. I then had to restart the entire process after setting the following directories in `/etc/mk.conf`:

   ```sh
   WRKOBJDIR=/usr/obj/ports
   DISTDIR=/usr/distfiles
   PACKAGE_REPOSITORY=/usr/packages
   ```

   The separation of concerns not only makes ports compilation cleaner and more organized but it also allows a user to [make ports read-only for maximum security](https://www.openbsd.org/faq/ports/ports.html#PortsConfig).

2. Once the latest gcc version compiled, I was unable to find the installed binary. This was for a fairly intuitive reason - you should never replace the system compiler because it can damage the system and prevent the installation of future packages. [OpenBSD instead packages the newly compiled gcc compilers using the names "egcc", "eg++", and so on](http://openbsd-archive.7691.n7.nabble.com/how-to-upgrade-gcc-4-2-1-to-gcc-4-7-1-td222171.html) to prevent breakages.

   I just wish it told me somewhere about the package renaming - or maybe OpenBSD did tell me and I completely disregarded it.

   Fortunately, since I never perform any package installation as a non-administrative user, I created a symlink to egcc as gcc in my user's local bin file to allow me to type "gcc" as I normally would to use the new compiler:

   ```sh
   # I use these environment variables rather frequently
   BIN="/usr/local/bin"
   XDG_SCRIPT_HOME="${HOME}/.local/bin"

   ln -sf "${BIN}/egcc" "${XDG_SCRIPT_HOME}/bin/gcc"
   ln -sf "${BIN}/eg++" "${XDG_SCRIPT_HOME}/bin/g++"
   ```

## User-Agent Prejudice

As a student who will be working professionally in web development in the near future, it disappoints me when a website or company uses poor web development techniques to produce content.

This example is no exception.

My university requires me to use both Zoom and Outlook for classes and daily communication. I didn't think any issues would arise from using either on a BSD platform since both provide web application interfaces in the case that their client applications are unsupported. How wrong I was.

Opening Outlook for the first time in Firefox led me to a minimal text-based email interface that looked like it jumped straight out of the 90s. I initially thought I navigated to the wrong website and got hacked by a third party; in actuality, it turns out that Outlook reserves an alternative text-based interface intended for clients with poor internet connections called the "light" or "lite" version. This light version also displays whenever the client's operating system is not supported by Outlook - _even if the browser has the capability to display the content_. Even though my browser was capable of displaying the content of Outlook, it detected my operating system and decided it was unsupported and should display the light version of Outlook. This is the very definition of bad web design.

For those of you unaware of browser headers and browser security (I'm pointing at all the people using Google Chrome right now), (generally) all browsers send your hardware information to every site you access. A summary of this information is called a _user agent_, which usually comprises of your operating system, CPU architecture, browser version, engine, and other details. You can actually view your current user agent by [searching "what is my user agent?" on Google](https://www.google.com/search?q=what+is+my+user+agent).

> It's a **massive** privacy concern for browsers to send hardware information to websites - but that's a topic for another time.

The same applies for the Zoom web application - it does not allow an OpenBSD user to access Zoom meetings simply because of the name of its operating system and not whether the browser can physically support the software of the web application. This is poor web design. Instead of changing website content based on a client's _operating system_, a website should change content based on the client's _feature support_ or _device orientation_ - both of which are determined and reported by the browser itself.

To prove my point and demonstrate how ridiculous it is that Zoom and Outlook "don't work" on OpenBSD, I manually changed my Firefox configuration settings to trick websites into thinking I use a different operating system. You can do this in Firefox by overriding the user agent in `about:config` and setting the property `general.useragent.override` to the user agent of your choice. In my case, I chose `Mozilla/5.0 (X11; Linux amd64; rv:82.0) Gecko/20100101 Firefox/82.0` since it is the closest user agent to my computer architecture and browser version. Then I opened Outlook and Zoom, and guess what happened?

Both opened without issue. To stress this even more, I have been checking my university email and attending virtual lectures using both Outlook and Zoom for the past month. I have experienced no issues with either.

Operating system discrimination is real. It shouldn't matter what operating system you use if the feature support exists in the system. I don't understand why applications and websites discriminate based on these selectors.

To put it plainly - Microsoft produces terrible products. And Zoom too, apparently.

> I was going to say something using much stronger language but I decided to be family friendly :)

## Biber

[LaTeX](https://www.latex-project.org/) is single-handedly one of the greatest typing skills I have picked up in the past year (other than Vim) due to its versatility and ease of bibliography management when writing papers.

> In fact, I now use LaTeX to generate [my resume](/public/Sam_Bossley.pdf) instead of Google Docs because it gives me more creative control over the content. You can create macros, include comments - the possibilities are endless.

I have noticed that I heavily rely on [Biber](http://biblatex-biber.sourceforge.net/) for bibliography management. However, it is not included in the default package system nor the ports for OpenBSD. The only way to integrate Biber into OpenBSD is to compile the package manually with gmake or to run the perl binaries raw.

I attempted both. First, I tried compiling the sources with gmake only to run into a multitude of compiler errors. I decided it would be a headache to solve on my own and tried the more viable approach with the perl binaries. Perl, however, requires a lot of dependencies in order to run the Biber package. I could quite seem to get all the dependencies properly installed and I wasn't exactly sure what dependencies perl required me to use. Eventually I gave up and decided to do without Biber and use the native BibTex.

If you happen to also use OpenBSD and know what flags successfully compile Biber or how to install all perl dependencies for Biber, let me know :)

> Retrospective edit: I've decided to scrap using Biber altogether. The native BibTex binary preinstalled with LaTeX works perfectly fine for my needs. It can easily generate an APA-like formatting style which is all I really need for bibliographies. In other words - Biber only provides what I already have, so I have no reason to use it anymore.

## Proprietary Codecs

Due to the past four or five years of location and data sharing with Google (which I have long since abandoned for obvious privacy reasons), I have received a multitude Google Play rewards which I have applied to purchasing various movies on Youtube. I noticed that while I can watch various media and any Youtube video in browser, I seem to be unable to specifically watch Youtube movies in OpenBSD as a result of my browser being "unable to play the video".

![Youtube complaining about being unable to play a video](/public/thoughts/trials-trib-2-unable-to-play.jpg)

Funnily enough, clicking the "Learn more" hyperlink redirects me to a webpage that states "You have an up to date browser!" and nothing more. Very helpful, Google.

I performed a bit of testing and Google API searching to find the source of the issue: a missing video codec.

```
"errorCode": "fmt.noneavailable",
"errorMessage": "This video format is not supported.",
"Kx": "HTML5_NO_AVAILABLE_FORMATS_FALLBACK",
```

Codecs are a form of software that provide support for playback and recording of specific media formats. For example, you are probably most familiar with the mpeg h.264 codec, used for virtually all Youtube videos and `mp4` files.

But what codec is missing?

I used [radiantmediaplayer](https://www.radiantmediaplayer.com/docs/latest/test-codecs.html) to ultimately determine that I did not have AVC h.264 codec support. Since this is a fairly common codec, I was surprised to see a lack of support.

After searching the [Mozilla documentation](https://developer.mozilla.org/en-US/docs/Web/Media/Formats/Video_codecs#avc_h.264), I found the solution - _OpenBSD does not come preinstalled with any AVC codec support due to its proprietary nature_, as stated here:

> AVC is a proprietary format, however, and numerous patents are owned by multiple parties regarding its technologies. Commercial use of AVC media requires a license, though the MPEG LA patent pool does not require license fees for streaming internet video in AVC format as long as the video is free for end users...
>
> Firefox support for AVC is dependent upon the operating system's built-in or preinstalled codecs for AVC and its container in order to avoid patent concerns.

I can understand now exactly why OpenBSD does not come with AVC support and I respect their purity in free independent software.

However, after hours of investigation attempts to install the codec, I was unable to find a reliable method of installation and gave up.

## Java

Java is known as one of the most universal programming languages, available on virtually every device with claims of backwards compatibility in every version.

My friends and I wanted to start an [All The Mods 3 Remix](https://www.curseforge.com/minecraft/modpacks/all-the-mods-3-remix) server last week so I decided it would be a good time to try setting up a server with OpenBSD, seeing how [OpenBSD is built for http](https://bsd.plumbing/). The installation was fairly easy (easier than a Windows 10 fresh install, that is) and I was able to download the server files promptly. As desktop Minecraft runs on Java, I then installed OpenJDK 15 and attempted to run the server.

The success was short-lived. The server did not start and complained about Java runtime errors I did not recognize. As it turns out, I had to downgrade my Java version to an OpenJDK version compatible with Java version 8.

OpenBSD's Java version seems to be too new for standard applications. So much for backwards compatibility.

## Mktemp

As I have traveled along in my [ricing](https://github.com/bossley9/dotfiles) journey (which I will likely talk about in a separate article in the future), I have become preoccupied with optimizing temporary scripts to use the minimum amount of resources in the cleanest way possible. This includes optimizations such as moving temporary files to [tmpfs](https://en.wikipedia.org/wiki/Tmpfs) for RAM performance, utilizing [fifo pipes](https://man.openbsd.org/mkfifo) for data streams, and removing the need for temporary files altogether in some cases.

My travels brought me to a Unix utility I had never heard of previously called _mktemp_. Mktemp is a utility which solves a critical security hazard with temporary files. Let me illustrate the issue with an example.

Pretend a hacker knew that you were using the file called `data.txt` in the `/tmp` directory to store all your temporary data when browsing Google Chrome. This file might include data like cookies, browser session information, and passwords and login information. The hacker could simply read that file and gather all of your protected data without you even knowing.

Ok, let's use a more probable example. Most hackers wouldn't have read access to that specific temporary file... but they _might_ have access to the directory the temporary file is storyed in, `/tmp`. What this means is that the hacker could create a symlink from `/etc/password` to `/tmp/data.txt` with the following command:

```
ln -s /etc/password /tmp/data.txt
```

What this symlink does is connect the two files in such a way that anything written to `/tmp/data.txt` will be written to `/etc/password`. So what happens when you clear or write to the temporary file? Suddenly all passwords are erased and the hacker has complete access to anything on your machine.

How does mktemp solve this?

Mktemp scrambles the name of a temporary file by generating a name with a unique string whose length is defined by the user. For example, if the file is `/tmp/data.txt`, the mktemp file might be `/tmp/data.txt.1_4db03d2`. This ensures that even if a hacker knew you used mktemp to generate a unique temporary file from `/tmp/data.txt`, they could never guess the unique string attached to that particular file.

> It's important to note that mktemp's string generation is _truly unique_. It does not rely on process ID or system time other unique string generation techniques rely on, because these reliances can be exploited.

For evident reasons, I have converted all of my scripts utilizing temporary files to create tmp files through mktemp.

## Conclusion

This is the section everyone reading this article has been waiting for, anticipating the answer to this question:

_Is OpenBSD worth it?_

For the interested power user? Yes.

For the average user? No.

Why do I think OpenBSD is not the best operating system for the average user? Because it is too idealistic. OpenBSD aims to follow their own security goals and offer bleeding-edge Unix tools at the cost of user experience. As a result, sometimes programs break. Sometimes firmware is not available. Of course, it's a massive pain to get proprietary software to work (in fact, I don't even know if it's _possible_ to run proprietary software on OpenBSD because of their purist attitude). It is idealistic because we live in a proprietary-ruled software world. Everything has a price. Capitalism incentivizes companies to close-source their projects. Hide software behind paywalls. Enforce subscription services. The software world of 2021 is a poorly tied knot of conflicting ideas, and creating a single operating system with a purist mindset in hopes that everyone will pick up and follow is just not viable.

But my criticism is not meant to dismiss OpenBSD. As I mentioned previously, OpenBSD is an idealistic operating system. It does things right from the start. In a perfect world, OpenBSD would dominate the market of operating systems. But the reality is that we all use legacy and outdated systems and it's hard to transition to new software. While it is unlikely that the oligarchy of large tech companies will be able to smoothly transition to a new age of clean and updated software, I still maintain hopes the OpenBSD will grow into becoming a major operating system contender in the future. For these reasons, I will continue to use OpenBSD for the foreseeable future. And for all you idealistic power users, if you are looking for a powerful machine with the core philosophies of software in mind - you know which operating system I'd recommend.
