## v1.5.1 Update 02/12/25

Super quick update here—there are only a few visual changes to the site, but the codebase had a HUGE cleanup (which makes me feel great lol).

**BUG FIXES**

- Fixed issue where the card types were lost when going from 2P to 1P mode.
- Fixed issue where the board wouldn't properly refresh if images failed to load.

**SHOUTOUTS:**

**SoulSilver sponsors:** Arielle Lok, Bertie Vos, Jack Shwartz, Morgan Gallant & Anonymous.  
**HeartGold sponsors:** Ciaran Farah!

Happy early Valentine's Day <3

**\- XXL**

---

## v1.5.0 Update 12/30/24

HAPPY HOLIDAYS!!! I've missed you guys... I can't believe it's already been a year since PTCG-sim was launched — the past 365 days have brought incredible changes to my life, and it's all thanks to you guys <3

**NEW FEATURE**

- **Replay Mode:** You can now watch and analyze your games from start to finish! This feature is available in 1P mode and can be accessed through the "Options" button, in the same menu as Import/Export. Perfect for reviewing games, creating content, or sharing cool moments with friends.

**OTHER ADDITIONS/CHANGES**

- Added full macOS keybind support - all keyboard shortcuts should now work properly on Apple devices.
- Version number is now included in exports to ensure proper tracking of updates and backwards compatibility.
- Fixed damage counter bug where manually typing numbers would cause display issues.
- Expanded card database compatibility with many new cards, type updates, and improved compatibility with Limitless cards.

**COMING SOON**

- As many of you know, PTCG-sim was my first ever coding project. As such, the codebase has some very, VERY, questionable, gnarly, unfathomable, inexplicable code 😅. I've decided to completely revamp the simulator in the future - there's simply too much technical debt, but I'm incredibly proud of how far we've come!
- I'm also SUPER excited to dive deep into developing a game AI for the Pokemon TCG. If you're interested in collaborating on this, definitely reach out - I'd love to chat! 😀

**As always, a HUGE THANKS TO:**

**SoulSilver sponsors:** Bertie Vos, Jack Shwartz, Morgan Gallant & Anonymous.  
**HeartGold sponsors:** Arielle Lok.

Enjoy the holidays everyone, and cheers to 2025! 🍻

**\- XXL <3 :D**

---

## v1.4.0 Update 05/08/24

Yoyoyo! It's been a fat second guys — life has been busy, but I'm super happy to release this update 😀

**NEW FEATURE**

- **Importing/Exporting Game States (BETA):** You can now export your game state as a JSON file or custom URL!
- **JSON file:** This is great for saving/organizing games that you want to revisit in the future. JSON files supports importing in 2P, which means that it loads the game state for the opponent too. This is useful if a player has disconnected during a game\* or players want to analyze a game together.
  _\*The connected player MUST export the game BEFORE the other player rejoins, or else the game state will be reset and lost._
- **Custom URL:** This is great for sharing cool games with friends on social media! The link directly loads the game state, making it super accessible. Only 1P is supported.

**OTHER ADDITIONS/CHANGES**

- Hovering over the board buttons now explains its function (e.g., the refresh images and flip board buttons).
- "Change type" now supports changing type to Pokemon. Note that putting a card directly into play (i.e., putting it in an empty active or bench spot) still automatically changes the type of the card to Pokemon.
- "Refresh Images" button now refreshes the images of the deck and prizes in addition to all cards in play.
- Added a full screen button in the "Options" menu. Highly recommend playing in full screen!
- Added CubeKoga support for compatibility with SVE Basic Energies and Hidden Fates Shiny Vault.

**COMING SOON**

- Personal accounts to save decklists and user configurations.
- Ability to attach cards on the opponent's side.
- Ability to select multiple cards at once.
- Interactive battle log, so you can click on a log and rewind to a specific board state.

**HUUUUGE THANKS** (the sim servers are literally being run by your generosity):

**One-time sponsors:** Quentin Carlier.  
**SoulSilver sponsors:** Bertie Vos, Jack Shwartz, Morgan Gallant & Anonymous.  
**HeartGold sponsors:** Arielle Lok.

That's all for now! As always, please reach out if you have any suggestions.

**\- XXL <3 :D**

---

## v1.3.2 Mini Update 02/28/24

**NOTE! Decklists from Fukuako were updated due to an issue with the original images used. Please re-download any decklists prior to Feb 28 [here](https://drive.google.com/drive/folders/1Vk04FldAH9dTzOI38O_KCUP4zPhm6pyn?usp=sharing). See v1.3.1 announcement for more details.**

**NEW FEATURE**

- **Refresh Button:** Press the refresh button '↻' or use the keybind 'r' to refresh cards in play. This is useful for when cards fail to load (e.g., custom images, new cards, etc.) or aren't appearing in the correct position.

**BUG FIXES**

- Fixed issue where card images would momentarily appear before updating to the card back, exposing the card to the opponent.
- Fixed issue where CSV files wouldn't import properly after editing the file.
- Undo button should be less laggy, especially after a lot of moves have been made.

**COMING SOON**

- Personal accounts to save decklists and user configurations.
- Importing/exporting game states and entire games.
- Ability to attach cards on the opponent's side.
- Ability to select multiple cards at once.
- Interactive battle log, so you can click on a log and rewind to a specific board state.

**BIG THANKS:** (the sim is run by your generosity!!):

**One-time sponsors:** Vu Thach.  
**SoulSilver sponsors:** Bertie Vos, Jack Shwartz, Morgan Gallant & Anonymous.  
**HeartGold sponsors:** Arielle Lok.

More to come soon! If you have any features or suggestions, please message me and/or join the Discord.

**\- XXL <3**

---

## v1.3.1 Announcement 02/26/24

Hi 😀 Two quick things:

- **Fukuako Decklists:** Looking to test the upcoming format? I've made a folder containing the top 16 decks from the Champions League Fukuako, which took place in Japan earlier this month. All of the decklists are in English and can be found [here](https://drive.google.com/drive/folders/1Vk04FldAH9dTzOI38O_KCUP4zPhm6pyn?usp=sharing). Simply download the decklist(s) and upload them on the Import tab or the Deck Builder. Also, check out new English proxies [here](https://www.justinbasil.com/proxies/sv5).
- **Cube Koga Support:** PTCG-sim now has full support for decklist imports from [Cube Koga](https://cubekoga.net/) thanks to the work of Cealgair. Set codes for POP series, several promo sets, and select cases from Limitless should be patched. Please export from Cube Koga using the PTCGO export option.

A bigger update is on the way. Hope everyone and their pets (if you have any) are doing superb!!

**\- XXL <3**

---

## v1.3.0 Update 02/12/24

Hi everyone! This is a small update but I hope y'all like the new features + stylistic improvements 😀

**NEW FEATURES**

- **Custom Backgrounds:** Upload custom backgrounds or switch to a themed background in the Settings tab.
- **Visual Deck Builder:** Build, edit, and upload your own decks to PTCG-sim! Shoutout to [Tish](https://twitter.com/TishingoTish) for working hard on this initiative.
- **Set Code Support:** Added set code support when importing decklists for sets prior to HGSS, as well as POP series, SI, and RM, courtesy of Cealgair.

**BUG FIXES**

- The 'user disconnected' message no longer appears when a user leaves a room in 2P.
- Spectators can now properly view cards in play.
- Attached cards left in play (from the bench) are no longer automatically moved to the active zone.

**COMING SOON**

- Integrated deck builder/editor and personal accounts to save decklists and user configurations.
- Ability to attach cards on the opponent's side.
- Ability to select multiple cards at once.
- Interactive battle log, so you can click on a log and rewind to a specific board state.

**THANKS AGAIN** (the sim is run by your generosity!!):

**SoulSilver sponsors:** Bertie Vos, Jack Shwartz, Morgan Gallant & Anonymous.  
**HeartGold sponsors:** Arielle Lok.

As always, I appreciate any feedback and/or suggestions. Until next time!

**\- XXL <3**

---

## v1.2.0 Update 01/21/24

This update was HUGE. Proud to have pushed it; lots of requested changes have been implemented, and I'm relieved to release them. Also, [my Github Sponsors page](https://github.com/sponsors/xxmichaellong?o=esc) was finally approved if you want to support the continuous open-source development of the sim!

**HUGE SHOUTOUTS** (the sim is run by your generosity!!!):

**One-time sponsors:** Robert Weidman, Jay Cristiano, Robin Schulz, & Song You.  
**SoulSilver sponsors:** Bertie Vos, Jack Shwartz, Morgan Gallant & Anonymous.  
**HeartGold sponsors:** Arielle Lok <3.

**NEW FEATURES**

- **Coaching Mode/Safe Play:** Enable the 'Flip Board' function for 2P so you can switch to your student's POV and tutor/analyze their play! Also, flipping the board now automatically reveals the opponent's hand and hides your own hand — this feature can be turned on for 1P mode as well (see Settings) for authentic solo testing.
- **Spectator Mode:** Enable Spectator mode in 2P so you can watch and comment on games!
- **2 Player Undo:** Undo moves in 2P using the 'Undo' button or 'u' keybind.
- **Custom Card Backs:** Import your own card backs on the Import page.
- **Change Card Language:** Change the language of cards on the Import page.
- **Save Current Deck:** Save your decklist after play/testing on the Import page.

**OTHER ADDITIONS/CHANGES**

- “Shuffle to Bottom” button added when viewing cards from the top or bottom of the deck (e.g. to handle the ability of Metang from Temporal Forces).
- Ability/effect toggle added to the keybinds and right-click menu of cards in the Stadium and Discard (for cards like Ho-Oh EX).
- 'Sort' toggle added for the Hand.
- Tools are now attached sideways when in play.
- “Shuffle Deck” keybind now automatically closes the view of the Deck (if open).
- Special energies with the same name as basic energy cards (e.g. Metal Energy from past sets like Neo Genesis) are now properly imported.

**BUG FIXES**

- Added alt/option key support for macOS devices using keybinds.
- Fixed bug where you could import deck for opponent in 2P.
- Rotating cards now only rotates the Pokémon and not the Tool or Energy cards attached.
- Prize cards on the opponent's side now automatically resize when resizing the board.
- Improved loading speed of card backs.

**COMING SOON**

- Ability to attach cards on the opponent's side (e.g., Head Ringer).
- Ability to select multiple cards at once.
- Visual deck editor.
- Interactive battle log, so you can click on a log and rewind to a specific board state.

So happy to be working on this and to have so much love from the community. I need some sleep doe.

**\- XXL <3333**

---

## v1.1.0 Update 01/12/24

Welcome to the new year! I've been working through some major fixes and adding new features to PTCG-sim. I'm pretty stoked to be getting the sim polished up.

I've also created a [donation page](https://www.paypal.com/donate/?hosted_button_id=VWFSCL73GDHF4) if you want to support my journey in building open-source tools for tabletop card games (entirely optional, but greatly appreciated). More on this below!

Now, let's get into v1.1.0:

**MAJOR CHANGES**

- **Open source:** The PTCG-sim repo is now [open-source on GitHub!](https://github.com/xxmichaellong/ptcg-sim) I'm currently figuring out the best way to go about receiving contributions, but in the meantime, feel free to explore the codebase and play around with the sim. I'm happy to answer any questions and I'm always open to suggestions.
- **Fixed desync issues:** This has been continuously reported since launch, and a lot of work was put into finding a solution to players disconnecting/reconnecting and seeing different/no cards being put in play. The main issue stemmed from one or both players losing connection. Now, any moves that are missed on either side will automatically be updated upon reconnection. If you continue to see any more problems re: desyncing, please report it on the #bugs-and-suggestions channel.
- **Undo button:** There is now the option to undo your last move, and it is stackable (ie. you can undo X times to undo your last X moves). This is currently only available in 1P mode, but will soon be implemented for 2P.

**BUG FIXES**

- Fixed issue where you couldn't drag cards from the "view cards" or "attached cards" zone to the board zone.
- Fixed highlighting of bench zone when hovering a card from active to bench.
- Fixed positioning of cards when reloading the board.
- Fixed positioning of special condition markers when certain images are appended.
- Fixed bug where the Escape key did not work for exiting the full preview of an image on the opponent's side.
- Fixed battlelog message when viewing top cards of the opponent's deck when playing from the opponent's side.
- Added a battlelog message for when you look through a deck (yours or your opponents).
- Battlelog message changed from "P1 setup" to "P1 drew 7 cards and set aside 6 prizes".
- Added reveal/hide card button to right-click menu.
- The name of a face-down card will now not be revealed in the battlelog when you change its type.
- Cards are defaulted to “Pokemon” when they are played onto the bench/active (ie. if you put a Trainer onto the bench, it will be identified as a Pokemon).
- The “play random card” mechanic has been changed to play a random card faceDown on the board (for cards like Empoleon lvl X).
- Updated some legacy decklists that had incorrect decklist entries or were missing cards.
- Updated the visuals of some containers in dark-mode (decklist book, full-decklist view).
- New logo and card back! Shoutout to [Joe Myerscough](https://twitter.com/The_EPSD) for creating these for the sim - they look awesome!!!

**COMING SOON**

- Ability to change custom card backs.
- Ability to change the language of cards.
- Ability to select multiple cards at once.
- Ability to attach cards on opponent's side (e.g. Head Ringer).
- Changing how tools are currently appended for better user visual experience.
- Adding a visual deck editor.
- Using more user-friendly expansion codes instead of ptcg.io's naming (note: we're currently using that as that is how we pull the data for the older cards).

**DONATION TIERS**

**$5/mo - SoulSilver Tier**

- Custom flair on Discord & open reign on self-nicknames.
- Access to early beta testing.
- Shoutout in every changelog during the time you are subscribed for.
- Get a sponsor tag on your GitHub profile (if sponsoring via GitHub, not applicable for sponsors through PayPal. Currently in the process of getting my GH sponsor page approved 😛).
- My eternal thanks!!!!!

**$25/mo - HeartGold Tier**

- Receive all of the benefits of the previous tiers.
- Access to an exclusive Discord channel for priority suggestions/feature proposals/troubleshooting support.

**$100/mo - Platinum Tier**

- Receive all of the benefits of the previous tiers.
- Seriously do not think anyone will subscribe to this, but I would be immensely grateful.
- Direct access to me (I will give you my phone number).
- I'll sign, kiss, and mail you a signed bulk card of your choice (if I have it lol).

**$15 - One-time Donation**

- Shoutout in the next changelog.
- My eternal thanks!!!!!

Thanks to everyone who has continuously been playing and reporting bugs on #bugs-and-suggestions. Please continue providing as much feedback as you can!

With love,

**\-XXL <3**

---

## v1.0.1 Update 12/31/2023

Happy New Year's Eve! This is a small update reworking some features and patching bugs. Thanks to everyone on Discord/Twitter for the feedback — keep 'em coming!

**NEW FEATURES**

- Right-click menu for your opponent's hand now has an option to reveal a random card from their hand (e.g. for attacks like Astonish).
- Revealing and hiding cards are now two separate keybinds, alt + z and z. When revealing a card from your hand, the game will prompt you to hide the card from your opponent when finished revealing.
- Deck/Discard/Lost Zone button headers are now frozen at the top when scrolling.
- The UI and UX of dragging and clicking on cards should now be easier and more intuitive.
- Changing card type now has keybinds (alt + e, alt + t, and alt + p).
- When viewing cards from top/bottom of your opponent's deck, images are now right-side-up.

**BUG FIXES**

- Changing card types now properly updates on the opponent's side in 2P.
- In the right-click menu, the submenus for “Move card” and “Change type” now display to the right to prevent overlap.
- Battle log now properly conceals the name of a hidden card when dragging to a new zone.
- Any cards in the stadium zone are now properly removed upon reset.
- Decklist menu now resizes based on window size.
- Decklist errors from the HS era are now fixed.
- Classification errors of cards from the Hidden Fates expansion are now fixed.

**COMING SOON**

- Fixing desync issues and adding a refresh/resync feature.
- Attaching cards on the opponent's side (e.g. Head Ringer).
- Custom card backs.
- Selecting multiple cards at once.
- Feature to draw arrows to/from cards.

And that's all for 2023, folks. See you next year!!!

**\-XXL <3**

---

## v1.0.0 Update 12/29/2023

Hi everyone! Thank you all for your support during PTCG-sim's launch. The feedback and general reception has been overwhelming (in a great way), and I'm happy that so many people in the community are finding great usage out of the sim. If you haven't already, **[join our Discord server here](https://discord.gg/jMfhQa38mh)** to receive the latest updates, report bugs, find matches, share decklists, and more! You can also read the previous Changelog (v0.9.1) following the below.

**Without further ado, let's dive right into v1.0.0:**

**DECK SUPPORT**

- **Legacy Formats:** All expansions prior to 2011 have been added. A spreadsheet containing all information related to cards, including decklist syntax for PTCG-sim imports, will be available in the Discord server.
- **Decklist Library:** Popular legacy decklists have now been added to the library. We'd like to extend our thanks to [Jason K](https://jklaczPokémon.com/) for being an awesome Pokémon archivist.
- **Import/Export Decks:** Importing a deck now breaks down cards by quantity, name, type, and image URL. Decklists can also now be saved using the “Save” button to export CSV files.
- **Custom Image Imports:** With the above feature, you can now upload your own image URLs. This means every card is now supported on PTCG-sim!

**BUG FIXES**

- Fixed issue where stadium toggle doesn't disappear on reset.

**COMING SOON**

- Selecting multiple cards at once.
- Attaching cards on opponent's side (e.g. Head Ringer).
- Fixing appending/overlap issues.

There have been reports of desyncing issues. We're looking into this - if you've experienced anything similar, please share on our Discord server in the #bugs-and-suggestions channel!

I'll continue adding new features to the sim + fixing bugs as they come up. Wishing you all a happy new year and see you at the next update!

**\-XXL <3**

---

## v0.9.1 Update 12/28/2023

**Rotating Stadium/Pokémon BREAK Cards:** You can now rotate cards using the keybind \[r\]. This can be used for dual stadiums (e.g. Parallel City) as well as special conditions.

**Resetting Conditions:** Evolving Pokémon now removes ability counters, special conditions, and rotates Pokémon upright.

**Active/Benched Pokémon Switching:** Moving the active Pokémon to a target bench Pokémon now automatically switches the target Pokémon to the active zone. Battle log messages are also fixed.

**Revealing/Hiding versus Looking/Covering Cards:** The process of flipping over cards is now divided into two types: revealing/hiding will show for both players (e.g. Town Map, Blacephalon UNB) while looking/covering only shows for the user who triggered the action (e.g. Hisuian Heavy Ball). Cards like Sidney/Grabber can work either by looking at/revealing the opponent's hand, or the opponent revealing their cards.  
**NOTE:** To put a face-down card from your hand in play, hide it in your hand using \[z\], and then move the card into play. Starting a turn will automatically reveal cards in play.

**Attaching Pokémon:** There is now a "Change type" function that can be accessed by right-clicking on cards in the active/bench. Changing a Pokémon to a tool/energy type (e.g. Electrode EVO, Klefki STS) enables the correct attachment to other cards.

**Leaving cards in play:** There is now a "Leave cards in play" button when dealing with attached cards to make handling cards like Devolution Spray easier.

**Prizes Sizing:** Prizes now adjust size if a 7th prize is added (e.g. Xurkitree GX).

- Added option button in the bottom right to clear battle log and export battle log.
- Added confused special condition marker ("c").
- Added hand count display.
- Added keybinds/right-click for moving cards from the board into the hand, lost zone, and shuffling into the deck.
- Drag & drop to deck now appends the card to the top of the deck instead of the bottom.
- You can now drag & drop the top card of your discard and lost zone into other zones.
- The name of the Pokémon whose ability was used is now recorded in the battle log.
- Selected card is no longer de-selected when adding damage counters/special conditions/rotating/revealing/hiding, making it easier to handle card actions.
- Fixed resizing issue of active/bench cards when resizing window.
- Fixed GX/VSTAR bug in 2P mode; resetting/using GX/VSTAR now properly updates both player's boards.
- Fixed issue where spamming "v" while viewing a card would append multiple full-screen cards.

**Coming later this week:**

- Adding all expansions prior to 2011.
- Custom image imports.
- Selecting multiple cards at once.
- Attaching cards on opponent's side (e.g. Head Ringer).

**Thank you to everyone for the support these past three days. I'm going to continue working hard to add new features and fix bugs! Come say hi in the Discord channel :)**

**\-XXL**
