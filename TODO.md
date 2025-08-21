- [x] It would be good to have ZoneId and ZoneIndex on the Card, but it requires the BoardState to obtain them, and the BoardState depends on Card.

# UI

- [ ] Rotate the card slightly when an ability is used rather than the marker (config option)
- [ ] 3D dice for the coin toss

## Mobile

# Game Play

## Game options

At game start, offer:

- Number or prizes/deck size (to allow pre-release testing)
- Enable lost zone
- Enable VSTAR/GX
- Allow open hands

# Network

- [ ] Restore socket.io

# Auth

## [ ] Generate an access token for each user at the time they join the game.

One will have scope `p1.<roomId>` and the other `p2.<roomId>` these tokens give authorization to play as Player 1 or Player 2 respectively in the room with ID `roomId`. The token will have no expiry, as the room is unlikely to be used for more than an hour?
