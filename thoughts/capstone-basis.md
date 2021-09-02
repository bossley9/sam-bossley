---
layout: layouts/thought
title: Capstone (Basis)
desc: This post is an overview of my basis of understanding with Unity and an assignment I completed to demonstrate my ability to handle the capstone assignment
date: 2021-01-20 00:38:00
tags:
  - tech
  - video game
  - school
---

As part of the progression of my capstone this semester, I was tasked with demonstrating my Unity toolset capabilities through an individual project. I was given the following goals:

- Complete the basic [Roll-a-Ball Unity tutorial](https://learn.unity.com/project/roll-a-ball).
- Change the player sphere to other object(s) from the course assets and have the power-ups change which object is displayed.

With any three of the following additional goals:

1. Automatically place the power-ups in a script at start-up.
2. Create a power-up manager that spawns new power-ups and deletes them after a brief time. Have several span locations.
3. Create a NPC that wanders and then goes for power-ups (perhaps after a brief delay).
4. Add a particle effect to the player's motion. Replace cube power-ups with particle systems.

With these goals in mind, I decided to complete 1, 2, and 4 because 1 and 2 functioned well together and I have had experience using particle systems beforehand.

My summarized goals were as follows, sorted according to the order in which I completed each:

1. Complete the Roll-a-Ball tutorial.
2. Dynamically position pickups on start.
3. Create a Powerup manager that spawns powerups and deletes them after a brief time.
4. Use the course assets to represent the sphere and pickups.
5. Add particle effects to player and pickups.

## Progression

### 1. Complete the Roll-a-Ball tutorial.

I created a new Unity project using the LTS (Long Term Support) version _2019.4.18f1_. The Roll-a-ball tutorial was fairly straightforward and all scripts and prefabs were simple enough to create. However, I found it strange that most of the game logic was dependent on the script of the player. Player controller logic should be kept separate from score management and pickup spawning. I decided to work on organizing the logic first by position the pickups on start.

The final result of the tutorial is picture below.

![A Unity window of the cyan sphere in a square area space with 12 yellow cube-shaped floating objects](/public/thoughts/capstone-basis-tutorial.jpg)

### 2. Dynamically position pickups on start.

At this point, I decided that a major cleanup of scripts was in order. I first created a _ScoreManager_ `GameObject` containing a _Score_ script. This script manages score completely with methods such as `GetScore()`, `SetScore(int newScore)`, `SetScoreToWin(int newScore)`, and `ResetScores()`. With all score management delegated to the _ScoreManager_, the score can be maintained regardless of the player or pickup objects in the viewport at any given moment. The _ScoreManager_ also manages how the score is displayed, and the win state of the game.

I additionally decided to delegate all start functionality into a `GameObject` called `Startup`. This is connected to a _Startup_ script which sets the initial score values of the _ScoreManager_, spawns the pickups, and sets up the _PowerupManager_ (which I'll discuss later). In addition to the previously explained `GameObject`s, it also takes public variables for a pickup `prefab`, a pair of lower and upper bound vectors, and an `integer` pertaining to the number of pickups. The lower and upper bound vectors define the area in which the pickups are allowed to generate, and on start, the script will loop over the number of pickups and choose a random point within the lower and upper bound to spawn the pickup.

By randomly generating a starting position for each pickup at start time, the pickups will be dynamically placed with each play and each play will be completely different from the one before it.

![A random placing of pickups in a specific location](/public/thoughts/capstone-basis-rand-loc-1.jpg)
![A different random placing of pickups in a specific location](/public/thoughts/capstone-basis-rand-loc-2.jpg)

### 3. Create a Powerup manager that spawns powerups and deletes them after a brief time.

The next goal was to create powerups that spawn and disappear briefly. As most powerups function, I wanted to make it so that the powerup would disappear with a cooldown before reappearing if the player got the powerup. Each powerup would give the player a boost in rolling speed.

I first made the speed extensible by adding a powerup multiplier to the movement force. This way, if a powerup is touched, the multiplier can be increased to increase the movement speed.

I then created a _PowerupManager_ `GameObject` with a _PowerupManager_ script component. The _PowerupManager_ contains a max number of powerups that can be present at one time in a game (referred to by a public `maxNumPowerups` variable). It spawns the powerups by populating a powerup array of size `maxNumPowerups`. At the same time, it creates a `float` array with the same number of indices, used for the cooldown time.

During gameplay, the powerups will spawn and the timers for each powerup will count down to zero. If the timer of a powerup is zero, the powerup will be set to inactive and (after a brief waiting period) respawn in a new location. The locations of each powerup is randomized similar to the pickups.

If the player touches a powerup, it will immediately disappear, skipping the count down and granting the player a speed multiplier.

![A powerup in the editor world](/public/thoughts/capstone-basis-powerup.jpg)

### 4. Use the course assets to represent the sphere and pickups.

For course assets, I decided to use a Unity package called [_Street Prop Items_](https://assetstore.unity.com/packages/3d/props/exterior/street-prop-items-71194) to represent the player, pickup, and powerup assets. I chose this package because it contained a number of small items that could be used in place of the spheres and cubes. The other packages I found were generally environment packages (e.g. world scenes, houses) and character models.

Since there were no rounded objects that might roll in a similar fashion as a sphere, I chose a wooden crate to represent the main player. I chose a fire hydrant to represent the pickups since they are easily noticeable. Finally, I chose a bright orange traffic cone to represent all powerups because they stand out and emphasize the powerups. I had to tweak the rotation script of the original Roll-a-ball tutorial to only spin along the Y-axis.

![The Unity viewport with fire hydrant pickups, traffic cone powerups and a wooden crate player](/public/thoughts/capstone-basis-traffic.jpg)

### 5. Add particle effects to player and pickups.

Since I have had previous experience with particle systems in programs such as [Blender](https://www.blender.org/) and [Unreal Engine](https://www.unrealengine.com/en-US/), I speculated that particle systems and emission in Unity would be very similar - and I was right.

The particle system component is comprised of different attributes which affect the appearance of a particle system, such as the number of particles, the lifetime of a particle, the velocity of a particle, and over lifetime variables (how a certain particle attribute changes over its "lifetime").

To make matters simple, I used similar particle system components for both the player `GameObject` and the pickup `GameObject`s. Both used a simple material in the shape of a square, slow particles, and a shrinking size over lifetime.

For the pickups I reused the original player sphere material to make it appear as if the fire hydrants were spraying water. I reused the fire hydrant material for the player particles and enlarged them to make it seem as if the crate is lifting dirt as it moves across the area.

![The final product](/public/thoughts/capstone-basis-particles.jpg)

## Conclusion

This concludes my demonstration. All scripts were written using `C#` and all testing and Unity editing was done on a Windows 10 operating system.
