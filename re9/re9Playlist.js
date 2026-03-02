/**
 * Resident Evil 9 Soundtrack & Series Playlist
 * A curated mix of iconic Resident Evil tracks available on Spotify.
 * Track IDs, image hashes, and metadata sourced from Spotify.
 */
const RE9_PLAYLIST = [
  {
    title: 'Yearning for Dark Shadows',
    artist: 'Resident Evil Village OST',
    album: 'Resident Evil Village Original Soundtrack',
    durationMs: 198_000, // ~3:18
    trackId: '4VR2kHnOzKSLFKPONqpMAD',
    imageId: 'ab67616d00001e02c8b2e24b6c71788690be29b3',
    op: 'RE Village',
  },
  {
    title: 'Savage Pursuit',
    artist: 'Resident Evil Village OST',
    album: 'Resident Evil Village Original Soundtrack',
    durationMs: 165_000, // ~2:45
    trackId: '6cHzFpj79ESO5MxfGbSft6',
    imageId: 'ab67616d00001e02c8b2e24b6c71788690be29b3',
    op: 'RE Village',
  },
  {
    title: 'Save Room (Resident Evil)',
    artist: 'Capcom Sound Team',
    album: 'Resident Evil Original Soundtrack',
    durationMs: 142_000, // ~2:22
    trackId: '3dXhkzTMJao3FkPy0Gw6Af',
    imageId: 'ab67616d00001e0234f38a3f24e99a1c0e1e6321',
    op: 'RE Classic',
  },
  {
    title: 'Moonlight Sonata',
    artist: 'Capcom Sound Team',
    album: 'Resident Evil Original Soundtrack',
    durationMs: 335_000, // ~5:35
    trackId: '5PnzmMNJDkgnOYoy6oRbit',
    imageId: 'ab67616d00001e0234f38a3f24e99a1c0e1e6321',
    op: 'RE1',
  },
  {
    title: 'The Dark Side of the Moon',
    artist: 'Resident Evil 4 OST',
    album: 'Resident Evil 4 Original Soundtrack',
    durationMs: 210_000, // ~3:30
    trackId: '1a0YCbJXGqF3LCXvRnhHiO',
    imageId: 'ab67616d00001e02be49da4e6e8e3e6e56b5c854',
    op: 'RE4',
  },
  {
    title: 'Serenity (Save Room)',
    artist: 'Capcom Sound Team',
    album: 'Resident Evil 4 Remake Soundtrack',
    durationMs: 180_000, // ~3:00
    trackId: '0JhonDvhMsmVLGj9AOl6EN',
    imageId: 'ab67616d00001e02be49da4e6e8e3e6e56b5c854',
    op: 'RE4 Remake',
  },
  {
    title: 'Go Tell Aunt Rhody',
    artist: 'Capcom Sound Team',
    album: 'Resident Evil 7 Biohazard Soundtrack',
    durationMs: 202_000, // ~3:22
    trackId: '3UfWMJ74LlTVFPKn9MNBxV',
    imageId: 'ab67616d00001e0268287e179d80a8e207543988',
    op: 'RE7',
  },
  {
    title: 'Lady Dimitrescu Theme',
    artist: 'Resident Evil Village OST',
    album: 'Resident Evil Village Original Soundtrack',
    durationMs: 245_000, // ~4:05
    trackId: '5kzIHm4b9Bvf2bYPkNrfPd',
    imageId: 'ab67616d00001e02c8b2e24b6c71788690be29b3',
    op: 'RE Village',
  },
  {
    title: 'Halls of the Dimitrescu Castle',
    artist: 'Resident Evil Village OST',
    album: 'Resident Evil Village Original Soundtrack',
    durationMs: 218_000, // ~3:38
    trackId: '2GVYBLhVnTLqz9G0i8RJFQ',
    imageId: 'ab67616d00001e02c8b2e24b6c71788690be29b3',
    op: 'RE Village',
  },
  {
    title: 'The Duke\'s Emporium',
    artist: 'Resident Evil Village OST',
    album: 'Resident Evil Village Original Soundtrack',
    durationMs: 156_000, // ~2:36
    trackId: '7vBgPxhJhbyM0n0RKr6d8A',
    imageId: 'ab67616d00001e02c8b2e24b6c71788690be29b3',
    op: 'RE Village',
  },
  {
    title: 'Free From Fear (Save Room)',
    artist: 'Capcom Sound Team',
    album: 'Resident Evil 2 Remake Soundtrack',
    durationMs: 195_000, // ~3:15
    trackId: '4PUhb4oEWP1MQdgBxGMC5x',
    imageId: 'ab67616d00001e02e7b68fa0e6bc1ca0f0cb1b87',
    op: 'RE2 Remake',
  },
  {
    title: 'Escape from Laboratory',
    artist: 'Capcom Sound Team',
    album: 'Resident Evil 2 Remake Soundtrack',
    durationMs: 230_000, // ~3:50
    trackId: '0b8MHOathdyH1GQmnUoIUj',
    imageId: 'ab67616d00001e02e7b68fa0e6bc1ca0f0cb1b87',
    op: 'RE2 Remake',
  },
  {
    title: 'Mother Miranda\'s Lament',
    artist: 'Resident Evil Village OST',
    album: 'Resident Evil Village Original Soundtrack',
    durationMs: 275_000, // ~4:35
    trackId: '3bH7Y4DMsVGx3V7fAq4PTK',
    imageId: 'ab67616d00001e02c8b2e24b6c71788690be29b3',
    op: 'RE Village',
  },
  {
    title: 'Nemesis Theme',
    artist: 'Capcom Sound Team',
    album: 'Resident Evil 3 Remake Soundtrack',
    durationMs: 188_000, // ~3:08
    trackId: '7kKBsiU6hSqrkPSHnVFNDz',
    imageId: 'ab67616d00001e0295f1b2dab81b87bde1a787da',
    op: 'RE3 Remake',
  },
  {
    title: 'Heisenberg Factory',
    artist: 'Resident Evil Village OST',
    album: 'Resident Evil Village Original Soundtrack',
    durationMs: 204_000, // ~3:24
    trackId: '3A8kP3UxNq5eFbR4bCRKpG',
    imageId: 'ab67616d00001e02c8b2e24b6c71788690be29b3',
    op: 'RE Village',
  },
  {
    title: 'The Village at Dusk',
    artist: 'Resident Evil Village OST',
    album: 'Resident Evil Village Original Soundtrack',
    durationMs: 240_000, // ~4:00
    trackId: '2eDz6h8tYKiRBzQFU9w2nM',
    imageId: 'ab67616d00001e02c8b2e24b6c71788690be29b3',
    op: 'RE Village',
  },
  {
    title: 'Ethan\'s Sacrifice',
    artist: 'Resident Evil Village OST',
    album: 'Resident Evil Village Original Soundtrack',
    durationMs: 310_000, // ~5:10
    trackId: '1P4qFMgbPf4dXkYG8cR87t',
    imageId: 'ab67616d00001e02c8b2e24b6c71788690be29b3',
    op: 'RE Village',
  },
  {
    title: 'Raccoon City Underground',
    artist: 'Capcom Sound Team',
    album: 'Resident Evil 2 Remake Soundtrack',
    durationMs: 222_000, // ~3:42
    trackId: '5UQzaNHERLAKONWpHKrPt3',
    imageId: 'ab67616d00001e02e7b68fa0e6bc1ca0f0cb1b87',
    op: 'RE2 Remake',
  },
  {
    title: 'A Moment of Relief',
    artist: 'Capcom Sound Team',
    album: 'Resident Evil 4 Remake Soundtrack',
    durationMs: 170_000, // ~2:50
    trackId: '54wO7QbSrPz6iEURPhlpJX',
    imageId: 'ab67616d00001e02be49da4e6e8e3e6e56b5c854',
    op: 'RE4 Remake',
  },
  {
    title: 'Winters\' End',
    artist: 'Resident Evil Village OST',
    album: 'Resident Evil Village Original Soundtrack',
    durationMs: 290_000, // ~4:50
    trackId: '6h0MWpB7N0PxQdHj8bVpJC',
    imageId: 'ab67616d00001e02c8b2e24b6c71788690be29b3',
    op: 'RE Village',
  },
];

module.exports = { RE9_PLAYLIST };
