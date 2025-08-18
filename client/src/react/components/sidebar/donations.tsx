function Donations() {
  return (
    <div id="donationsPage">
      <h2>Sponsors & Donations</h2>

      <p>
        Hi everyone! I'm Michael/Xiao Xiao Long. I'm a 21-year-old from Guelph,
        Canada, who started programming in the fall of 2023. I've been playing
        the Pokémon TCG for over 8 years, and I spent the last 3 months building
        PTCG-sim, a free tool for the community to use to test and play our
        favorite card game.
      </p>

      <p>
        I publicly launched the sim on Christmas, and it has already grown an
        incredible community of players and developers. There's a lot more to
        do, and I could use as much help as I can get!
      </p>

      <p>
        Should you find joy in using the sim and wish to support its ongoing
        development, you can sponsor me/the project through one of the links
        below. However, please know that sponsorship is completely optional.
        Your enjoyment of the sim is contribution enough, and I'm thrilled to
        have you as part of our community 😀
      </p>

      <p>-XXL &lt;3</p>

      <h3>
        <a
          href="https://github.com/sponsors/xxmichaellong?o=esc"
          target="_blank"
          style={{ color: "rgb(91, 91, 173)", textDecoration: "underline" }}
        >
          Github Sponsors Link
        </a>
      </h3>
      <h3>
        <a
          href="https://www.paypal.com/donate/?hosted_button_id=VWFSCL73GDHF4"
          target="_blank"
          style={{ color: "rgb(91, 91, 173)", textDecoration: "underline" }}
        >
          Paypal Donation Link
        </a>
      </h3>

      <strong>SPONSOR TIERS</strong>
      <br />
      <br />
      <strong>$5/mo - SoulSilver Tier</strong>
      <ul
        style={{
          listStyleType: "disc",
          paddingLeft: "20px",
          marginTop: "10px",
          marginBottom: "20px",
        }}
      >
        <li style={{ fontSize: "16px", marginBottom: "10px" }}>
          Custom flair on Discord & open reign on self-nicknames.
        </li>
        <li style={{ fontSize: "16px", marginBottom: "10px" }}>
          Access to early beta testing.
        </li>
        <li style={{ fontSize: "16px", marginBottom: "10px" }}>
          Shoutout in every changelog during the time you are subscribed for.
        </li>
        <li style={{ fontSize: "16px", marginBottom: "10px" }}>
          Get a sponsor tag on your GitHub profile (if sponsoring via GitHub,
          not applicable for sponsors through PayPal. Currently in the process
          of getting my GH sponsor page approved 😛).
        </li>
        <li style={{ fontSize: "16px", marginBottom: "10px" }}>
          My eternal thanks!!!!!
        </li>
      </ul>

      <strong>$25/mo - HeartGold Tier</strong>
      <ul
        style={{
          listStyleType: "disc",
          paddingLeft: "20px",
          marginTop: "10px",
          marginBottom: "20px",
        }}
      >
        <li style={{ fontSize: "16px", marginBottom: "10px" }}>
          Receive all of the benefits of the previous tiers.
        </li>
        <li style={{ fontSize: "16px", marginBottom: "10px" }}>
          Access to an exclusive Discord channel for priority
          suggestions/feature proposals/troubleshooting support.
        </li>
      </ul>

      <strong>$100/mo - Platinum Tier</strong>
      <ul
        style={{
          listStyleType: "disc",
          paddingLeft: "20px",
          marginTop: "10px",
          marginBottom: "20px",
        }}
      >
        <li style={{ fontSize: "16px", marginBottom: "10px" }}>
          Receive all of the benefits of the previous tiers.
        </li>
        <li style={{ fontSize: "16px", marginBottom: "10px" }}>
          Seriously do not think anyone will subscribe to this, but I would be
          immensely grateful.
        </li>
        <li style={{ fontSize: "16px", marginBottom: "10px" }}>
          Direct access to me (I will give you my phone number).
        </li>
        <li style={{ fontSize: "16px", marginBottom: "10px" }}>
          I'll sign, kiss, and mail you a signed bulk card of your choice (if I
          have it lol).
        </li>
      </ul>

      <strong>$15 - One-time Donation</strong>
      <ul
        style={{
          listStyleType: "disc",
          paddingLeft: "20px",
          marginTop: "10px",
          marginBottom: "20px",
        }}
      >
        <li style={{ fontSize: "16px", marginBottom: "10px" }}>
          Shoutout in the next changelog.
        </li>
        <li style={{ fontSize: "16px", marginBottom: "10px" }}>
          My eternal thanks!!!!!
        </li>
      </ul>
    </div>
  );
}

export default Donations;
