---
layout: layouts/thought
title: "Trials and Tribulations with OpenBSD"
desc: As I trudged through working with and setting up the various BSDs, I wanted to document my findings and why I will continue using OpenBSD in the future.
date: 2021-01-13 01:30:00
tags:
  - tech
---

Anyone who knows me is aware that I am constantly on the search for better software. Living in a technology-driven society, we should always look for stronger software that reinforces a user's capabilities whilst maximizing efficiency and following software standards (specifically [POSIX compliance](https://en.wikipedia.org/wiki/POSIX) and the [UNIX philosophy](https://en.wikipedia.org/wiki/Unix_philosophy#Origin)).

> I could go on and on about how MacOS, a UNIX-advertised system, doesn't even follow the UNIX philosophy, but I think I'd upset all the Apple fanboys.

I am quite frequently the victim of my peers' various software complaints:

_"why is this app so slow?"_, or

_"sometimes this program is so frustrating"_, or even

_"my computer keeps crashing"_ - to which I usually respond with -

_"then why are you still using it?"_

This is where I draw the line. If a program, system, or library is causing me pain and anguish, I will resort to finding a better alternative. It boggles my mind how people enjoy using extremely inefficient, glitchy programs, then complain about how awful they are.

This brings me to the primary topic of discussion - the various \*BSD operating systems. The [Berkeley Software Distribution (BSD)](https://en.wikipedia.org/wiki/Berkeley_Software_Distribution) was an operating system originally devised in Berkeley in the 80's as a direct port of the Unix system developed by Bell Labs. While the original BSD distribution has long since been discontinued, its various children operating systems make up nearly the entire world of operating systems.

In my search to find the perfect operating system, I never thought that I would say that OpenBSD is the closest match - in fact, I had assumed quite the opposite. In this article, I will explain my reasons as to why I think OpenBSD is a near perfect operating system, and why I will continue using OpenBSD for quite some time in the future. Since most people aren't very software-oriented, I will explain most of my logic on a surface level in hopes that some people might switch to using OpenBSD (and at the very least, question why they use a certain operating system as opposed to another).

Before I continue, I need to describe exactly what constitutes an operating system. In its simplest definition, an operating system is the collection of software, system libraries, base programs, and user interfaces which allow a system to be functional. The most popular operating systems running user devices today are MacOS, Windows (10), iOS, and Android, but there are a plethora of operating systems people never talked about such as GNU/Linux, GNU/Hurd ([rms approves](https://en.wikipedia.org/wiki/GNU_Hurd)), Solaris, FreeBSD, NetBSD, and OpenBSD. An operating system is most requently referred to when discussing how a device runs, what the interfaces look like, and what default programs come installed, but there's a lot more to operating systems than meets the eye.

So let's talk about OpenBSD and its various aspects! I'm not afraid to discuss the many successes and flaws of OpenBSD (no operating system will ever be perfect - and if you think your operating system is perfect, you're completely biased). I'll start by discussing the things OpenBSD does wonderfully (the "good"). Then I'll discuss things that are not ideal on OpenBSD (the "bad"). Finally, I'll discuss the many flaws of OpenBSD and factors that almost turned me away from OpenBSD entirely (the "ugly").

## The Good

### Hierarchy

Hierarchy is actually the sole reason I switched to OpenBSD and FreeBSD in the first place. Have you ever considered _how_ your files are organized on a device? How easy is it to find specific files? What makes the file system navigable?

One of Windows' greatest flaws is its file organization. As with most operating systems, Windows organizes its files based upon the separation of physical storage - two hard drives means that two file system drives will exist on the computer (usually it defaults to naming these `C:` and `D:`). However, each drive comprises of poor organization. Here's an example of the root directory of an average Windows drive.

![A standard Windows directory hierarchy with the root directory comprised of the folders "Program Files", "Program Files (x86)", "ProgramData", "Users", and "Windows"](/public/thoughts/trials-trib-hier-windows.png)

Let me ask this - if I wanted to find the files for Google Chrome, what folder would I look in? `Program Files/`? `Program Files (x86)/`? Or maybe even `ProgramData/`? And what's the difference between those folders anyways? If `Program Files/` contains most program files, why are the _file explorer_ files located in the `Windows/` folder?

I would be surprised if a regular Windows user could answer any of those questions. The truth is that the Windows file hierarchy is completely disorganized. There seem to be competing standards with legacy and modern file hierarchies.

> In fact, this is a major flaw with the Windows operating system in general - its adherance to the enterprise business model. Because of its target demographic, Windows is required to maintain both new computer architectures (`Program Files (x86)/`) as well as legacy 32-bit systems (`Program Files/`). This is also why most outdated desktop game applications (such as Steam) primarily work only on Windows, where old software is normalized. To read more about why enterprise software is a terrible system, [Arthur Rasmusson has written a beautiful article in which they claim that the enterprise business model "is the cancer killing the modern operating system"](https://telegra.ph/Why-OpenBSD-is-marginally-less-horrible-12-05).

> It just boggles my mind that the Steam client is STILL a 32-bit application when 64-bit computers were introduced in 2003 - but I understand that it's to maintain compatibility with their primary demographic - Windows users.

In stark contrast, the [file hierarchy of OpenBSD](https://man.openbsd.org/hier) is much easier to understand. In fact, could even be described with the term "intuitive" - something a legacy DOS system such as Windows could never achieve.

![A standard OpenBSD directory hierarchy - complete with manual pages for additional documentation in case it wasn't intuitive enough](/public/thoughts/trials-trib-hier-openbsd.png)

Instead of a lack of folder clarity, OpenBSD provides a multitude of root directory folders with specific purposes for each. For example, all binaries (executables) are placed in a `/bin` folder. All temporary files, buffers, and pipes are stored in `/tmp`. All user-specific files are contained within a `/usr` folder. All libraries are contained in `/lib`. All local files are stored in `/local`. Devices are managed in `/dev/`. Mountable devices are mounted in `/mnt`.

This organization is not simply a surface-level organization - _it's an entire system pattern_. Where would we find operating system core binaries? In `/bin`. What about system binaries (daemons)? In `/sbin`. What about system binaries executed by a user? `/usr/sbin`. Binaries local to a user? `/usr/local/bin`. User-specific libraries? `/usr/local/lib`. This is where GNU/Linux falls short - looking into `/bin` on a Linux system returns any binary from a game of solitaire to an SMTP daemon. OpenBSD triumphs in its thorough organization of the file system, making it easy for anyone to locate a specific file within the directory hierarchy without even having to search.

In the rare case that you still have trouble navigating or remembering the different directory paths for each category of files within the system, OpenBSD comes complete with a user manual, which I will discuss in the next section.

### Documentation

We live in a strange day and age where technology advances so fast that a commonly used device or software may become outdated or even useless in five years. As a result, the amount of people that don't understand the full complexity of how their software works has risen tremendously. How many times have you had to look up how to install some software? Install a device driver? Debug some technical issue? We look these things up in search engines because the sad truth is that most modern operating systems don't give documentation on how to use them. Modern Windows and MacOS rely heavily on their support teams to help individuals with questions about their system when users should be able to understand for themsevles how their devices and software works. Even specific software is not usually packaged with little if any documentation - no manuals on how things work. Most rising technologies rely on the fact that the younger generation can learn the technology well enough to retain that information.

This is an anti-pattern. Lack of documentation should not be reliant on the fact that the younger generations will understand how technology works. In addition, the lack of proper documentation leads to online forums and communities asking the same questions repeatedly.

OpenBSD is different. OpenBSD provides pre-installed manual pages that give detailed instructions and options for all core programs and essential utilities. I relied heavily on the documentation when I first installed OpenBSD and read manual page after manual page just to understand exactly how each core component functioned in the scope of the entire system. It was also helpful to read into the different command options for each program, as well as brief descriptions explaining the purpose of each. This solution is one of the best [RTFM](https://en.wikipedia.org/wiki/RTFM) solutions to a reoccurring problem of user incompetance or laziness. As a result, the OpenBSD foundation has virtually no forums for people to ask questions - not because they refuse to make one but that they have simply removed the need.

It also goes without saying that the OpenBSD manual is thorough. Not only does it provide detailed documentation, it additionally _maintains_ the documentation. Every manual pages is frequently updated according to the contents of the system and program. This is where GNU/Linux and MacOS fall away. Both include some limited form of documentation bundled with their operating system variants, but the manual pages are generally out of date. I can't tell you how many times I've tried to read a `man` page for Archlinux or MacOS Catalina only to find that half of the argument options don't actually work, or even say "deprecated - will remove from manual". Then I scroll to the bottom of the page to find that the manual page was last updated in 2002. It should be evident that documentation needs to be updated, but only OpenBSD seems to maintain their documentation willingly.

### FOSS

There are two types of professors - the professors who teach for recognition and tenure, and the professors who teach because they enjoy it. The world of software is no different. There are two types of developers - the developers who develop for money, and the developers who develop because they enjoy it. Based on these two groups, who do you think would make a better overall product?

I bring this up because it's such an underrated and underlooked aspect of all software - who is creating this software? _Why_ are they creating this software?

In any case, I am a firm believer in FOSS - _Free and Open Source Software_. I believe that software should be free and readily distributed to people. No one should have to pay for advancements in technology. Along the same vein, I believe that all software should be open source. No software product should have any reason to hide their source from the public. Open sourcing software allows not only for people to be able to self diagnose their issues ([unlike a certain fruit-themed company...](<https://en.wikipedia.org/wiki/Obfuscation_(software)>)) but it has the added benefit of community support for solving issues, bugs, and security vulnerabilities.

The entire source code of OpenBSD is free and readily available on [Github](https://github.com/openbsd/src) or [CVS](https://cvsweb.openbsd.org) for anyone to browse and contribute from the community. In fact, because OpenBSD is free software, it is wholly made _from_ the community. Every contribution is not made because someone paid them to. Instead, each contribution is made out of passion for the project. I am proud of the fact that my operating system is a community-built project grounded from passion and dedication. I doubt many people are willing to say that they are proud of the _for-profit_ corporate overlords that made their operating system.

> Forget what I just said. I forgot that Apple fanboys are everywhere.

### POSIX

When computers were first becoming commercial household items over 50 years ago, the world of software was like the wild wild west. People wrote programs that trampled on each other, destroyed themselves, and destroyed people's computers. There were no rules as to what software could do or how it should work - and each computer was different. Just because program X worked on Billy's computer didn't mean that program X would work on Sarah's computer. Even _today_ we still have an issue with cross compatibility of operating systems.

In 1988, a group of developers gathered together and said, "we need to develop a standard for all software to follow so that any computer can run the exact same software agnostic of operating system or system libraries." Thus, the POSIX (Portable Operating System Interface "X") standard was born. Most operating system developers agreed to follow this standard. However, over time, developers became lazy.

_"Why make software portable across every operating system if I can just make my own operating system, and software guaranteed to work on that system?"_ thought Bill Gates, and Windows was born.

_"Why make software portable across every operating system if I can just use fancy libraries that are really fast?"_ thought Steve Jobs, and Apple was born.

_"Why make software portable across every operating system if we can just make all our software compatible with GNU which is mostly POSIX-compliant?"_ thought Richard Stallman, and GNU/Linux was born.

I'm clearly exaggerating the reasonings behind each famous operating system but it doesn't change the fact that _each of these industry operating systems (including OpenBSD) have deviated from the standard_. Although some operating systems are not far removed from POSIX-compliance, each operating system should make it a priority to follow a common pattern and common standard. Without a standard, software will once again become the wild west programs breaking and changing other programs and operating systems inevitably failing.

OpenBSD aims to be as POSIX-compliant as readily possible. While compliance is not perfect, it is a priority and goal.

### License

If you know anything about BSD, you know exactly what this section pertains to - the BSD license. The BSD license is famous for its publicity in the 90s when [AT&T tried to sue UC Berkeley over software and lost](https://www.freebsd.org/doc/en_US.ISO8859-1/articles/bsdl-gpl/article.html). Since then, the license has grown into many variants. Its simplicity is what makes it so memorable. Try reading both licenses and seeing which one is easiest to understand.

- [The OpenBSD License](https://cvsweb.openbsd.org/src/share/misc/license.template?rev=HEAD)
- [GPL v3 License](https://opensource.org/licenses/gpl-3.0.html)

The BSD license is the most concise license of any, and says exactly what it needs to say. This license can be used for both open source and closed source projects alike.

And I know I am not the first to say - it is a true blessing to see such a simple license in an age where ten page user license agreements have become the norm.

### Security

The core focus of the OpenBSD operating system is security. They publicize everywhere - [_"Only two remote holes in the default install, in a heck of a long time!"_](https://www.openbsd.org/). In their goals, [their aim is to be the #1 most secure operating system](https://www.openbsd.org/goals.html) - to the extent of which I have never seen before I used OpenBSD.

I could go on and on about the security measures OpenBSD takes to ensure a basic level of security in their operating system but I would likely bore people. Instead, I'll talk about two fantastic developments they have added to ensure security in programs - [pledge](https://www.openbsd.org/) and [unveil](https://man.openbsd.org/unveil).

If you're very insistent on privacy on a computer, you probably know what telemetry is and how invasive it can be (and if not, you've probably heard me talk about telemetry all too much. Telemetry is the practice of _usage statistic sending_ by an application - in other words, an application sending your data to its parent company servers under the hood for usage statistics. Telemetry as a concept is inherently a security hazard - applications are able to read the data you input and send whatever statistics about your system, files, and usage to a company whenever it is scheduled to send data. While a lot of applications come with settings to disable telemetry, most applications come with telemetry enabled by default. Even still, some applications do not allow you to disable telemetry completely. How can telemetry be disabled? How does pledge solve this?

`pledge()` is a system call which makes an agreement between the operating system and the application running. The application is forced to make a virtual pledge, saying "I will only work within parameters X, Y, and Z. I will never use A for anything." Then, once the application is running, if the application breaks that pledge or runs outside the pledge's bounds, remote control of the application is handed over to the operating system to determine how to handle the rogue application (usually it responds by killing the application). This is an _essential_ feature that should be _required_ on all modern operating systems. The fact that operating systems have no control over rogue programs is a huge security hazard. For example, imagine if you downloaded a faulty version of your favorite app (Discord? I don't know what the cool kid app is nowadays) and it immediately began reading your password files and reading your ssh keys. Instead of being helpless, the operating system would be passed control to terminate the program before it read any file. If you think that example is extremely far-fetched, here's a more tangible example - imagine that you open Google Chrome and it immediately starts taking 4 GB of memory and your computer freezes. In the best case scenario, all you can do is wait until the computer unfreezes, or restart your computer. However, with pledge, OpenBSD's operating system has full dicatation over your application before it uses too much memory and freezes your computer - either by terminating Google Chrome or throttling its memory usage.

`unveil()` is another system call which additionally restricts the parameters with which a third-party program can run. Instead of passing control of an application to another handler, it works to protect your filesystem from unnecessary reading. For any UNIX system, all applications have complete access to your `$HOME` directory. This means that when you open any program, it has the ability to

- read files on your desktop
- read files in your downloads
- read your git configuration (and likely your Github password)
- read your ssh keys
- read your gpg public keys
- execute any files in your downloads
- insert rogue scripts into your `.bashrc` or `.xinitrc` - which will likely be undetected until the next time you reboot

_"But Sam,"_ you complain. _"I would never just download or run a program I didn't trust."_

What about browser addons and extensions? What about windows drivers? What about arbitrary application software updates? And how do you choose which programs you trust? I guarantee most people don't verify checksums when they download things such as Google Chrome or Zoom. Instead, they download an executable, immediately give it administrative access to their computer, then run it.

Yeah. That's insanely scary. Now that I've convinced you that applications reading your file system is a legitimate concern, how does unveil solve it?

Unveil restricts any executable's file system permissions at startup so it can only read certain files, write to other files, and execute another set of files. It is exclusive by nature, meaning that it by default assumes it should not be able to read, write, or execute any files in a given directory. For example, when I run Firefox on OpenBSD and try to upload a file from my `Documents/` folder, it won't let me, since it is only configured to read and write to the `Downloads/` folder.

I've given two clear examples of cases where OpenBSD resolves security concerns and cares about a user's privacy. OpenBSD is far superior to other operating systems for this quality alone.

## The Bad

### Branding

Where do I even begin? Let me preface by saying that software developers have a serious deficiency in graphic design.
Here are the modern logos for Archlinux, FreeBSD, MacOS, OpenBSD, and Windows side by side.

**Archlinux**
![The Archlinux logo](/public/thoughts/trials-trib-archlinux-logo.png)
**FreeBSD**
![The FreeBSD logo](/public/thoughts/trials-trib-freebsd-logo.png)
**MacOS/Apple**
![The MacOS Apple logo](/public/thoughts/trials-trib-apple-logo.png)
**OpenBSD**
![The OpenBSD logo](/public/thoughts/trials-trib-openbsd-logo.jpg)
**Windows**
![The Windows 10 logo](/public/thoughts/trials-trib-windows-logo.jpg)

In the words of Linguini from Ratatouille: ["It's not much, but... it's not much."](https://youtu.be/y2n5dLpETbM?t=200)

Although the OpenBSD logo (named "Puffy") is poor in design and severely outdated (not to mention mildly terrifying), some fans of the operating system have created more user-friendly icons:

![Patched Puffy](/public/thoughts/trials-trib-patched-puffy.png)
"Patched" Puffy, in celebration of the latest 6.8 release.

![Cartoon Puffy](/public/thoughts/trials-trib-cartoon-puffy.png)
A cartoon variant of Puffy to be the front face for the merch and artwork pages.

In addition, the OpenBSD community makes [amazing fanart and audio originals for each new release](https://www.openbsd.org/artwork.html) (and yes, I said audio originals).

### Desktop Focus

One of the bigger flaws of OpenBSD is its clear lack of focus for desktop support. Their primary target demographic is towards people who plan on using OpenBSD as a network server or local file server. On installation, it asks to set up all sorts of networking protocols. This can be especially jarring for a new user of OpenBSD. On a similar note, the package repositories contain more packages pertaining to networking than standard desktop applications, so a user is forced to build a lot of packages from source if they want a setup as custom as my current setup with OpenBSD.

### Compatibility Layers

In regards to backwards compatibility and legacy support, OpenBSD follows the same pattern MacOS follows - "update or get lost". As a result, legacy 32-bit applications such as the Steam client simply do not work on the architecture - which can be considered both a blessing and a curse.

In OpenBSD's defense, it does allow a Linux compatibility layer to port Steam and a limited suite of proprietary applications and games, which is better than MacOS's utter lack of support. But [the applications that can run on an operating system do not dictate how "good" an operating system is](https://www.reddit.com/r/linuxmemes/comments/kr2tyk/thats_the_truth/gi7nhqr?utm_source=share&utm_medium=web2x&context=3).

## The Ugly

### Security Stubbornness

OpenBSD has such a strong focus on being ultimately secure that it will wreak havoc in its path to achieve that goal. What do I mean by this?

When it comes to a battle between performance and security, security will always win. As a result, various facets of OpenBSD can feel sluggish. For example, the start up checks and file system checks take slightly longer than Archlinux (of course, OpenBSD will always be faster than Windows by a longshot). In addition, some applications use extra system calls and libraries for added security checks - slowing the applications ever so slightly.

However, this mentality of putting goals before usability can be hazardous. When I installed OpenBSD on my laptop, I had to manually download Intel firmware files for wireless internet support because Intel does not allow free distribution of the firmware files. Even with the correct firmware files, wireless connections with `dhclient` and `ifconfig` can be spotty at times because of all the overhead.

## Conclusion

I have only used OpenBSD for the good part of two weeks. In that time, I've been given the opportunity to experiment and be creative with my usage. While it has many flaws and irritating issues, OpenBSD is easily my favorite operating system of all of the ones I have used. I plan on continuing to use it in the future, so stay tuned! I may give an update on my opinions in a few months.
