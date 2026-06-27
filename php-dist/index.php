<?php
// ─── Contact form handler ─────────────────────────────────────────────────
$formResult = null;
if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['_form']) && $_POST['_form'] === 'contact') {
    $name    = trim(strip_tags($_POST['name']    ?? ''));
    $email   = trim(strip_tags($_POST['email']   ?? ''));
    $company = trim(strip_tags($_POST['company'] ?? ''));
    $brief   = trim(strip_tags($_POST['brief']   ?? ''));

    $errors = [];
    if ($name === '')                             $errors[] = 'name';
    if ($email === '' || !filter_var($email, FILTER_VALIDATE_EMAIL)) $errors[] = 'email';
    if ($brief === '')                            $errors[] = 'brief';

    if (empty($errors)) {
        $to      = 'info@waypointinnovation.co.za';
        $subject = 'New enquiry from ' . $name;
        $body    = "Name: $name\nEmail: $email\nCompany: $company\n\nProject brief:\n$brief";
        $headers = "From: noreply@waypointinnovation.co.za\r\nReply-To: $email";
        $sent    = @mail($to, $subject, $body, $headers);
        $formResult = $sent ? 'success' : 'error';
    } else {
        $formResult = 'validation';
    }

    // Stay on contact page after POST
    if ($formResult !== 'validation') {
        header('Location: ?page=contact&sent=' . $formResult);
        exit;
    }
}

// ─── Routing ──────────────────────────────────────────────────────────────
$page = $_GET['page'] ?? 'home';
$validPages = ['home', 'about', 'services', 'contact'];
if (!in_array($page, $validPages, true)) $page = 'home';

$sent = $_GET['sent'] ?? null;

// ─── Data ─────────────────────────────────────────────────────────────────
$industries = [
    [
        'id'           => 'automotive',
        'label'        => 'Automotive',
        'number'       => '01',
        'descriptor'   => 'Fabrication, jigs, fixtures and custom modifications.',
        'copy'         => 'We do fabrication, conceptual mechanical design and prototype development for automotive components, jigs, fixtures and test equipment. We also handle custom modifications and upgrades to vehicles, and work with manufacturers and accessory brands — including packaging design for RSI Smartcap Canopies and project work with Mercedes Benz.',
        'draftPending' => true,
    ],
    [
        'id'           => 'industrial',
        'label'        => 'Industrial',
        'number'       => '02',
        'descriptor'   => 'Production line equipment, processing machinery and structural fabrication.',
        'copy'         => 'We do fabrication, conceptual mechanical design and prototype development for industrial machinery and equipment, including production line equipment, processing machinery and structural fabrication. We also do modifications and upgrades to existing plant equipment.',
        'draftPending' => true,
    ],
    [
        'id'           => 'agricultural',
        'label'        => 'Agricultural',
        'number'       => '03',
        'descriptor'   => 'Tractor attachments, implements and agro-industrial equipment.',
        'copy'         => 'We do attachments for tractors, agricultural trailers and implements, plus modifications and upgrades to existing equipment. We also build agro-industrial products for vegetable processing and packaging plants.',
        'draftPending' => false,
    ],
];

$pageTitles = [
    'home'     => 'Waypoint Innovation — Fabrication &amp; Mechanical Engineering',
    'about'    => 'About | Waypoint Innovation',
    'services' => 'Services &amp; Industries | Waypoint Innovation',
    'contact'  => 'Contact | Waypoint Innovation',
];

$navLinks = [
    ['label' => 'Home',     'href' => '?page=home'],
    ['label' => 'About',    'href' => '?page=about'],
    ['label' => 'Services', 'href' => '?page=services'],
    ['label' => 'Contact',  'href' => '?page=contact'],
];

// ─── Helpers ──────────────────────────────────────────────────────────────
function h(string $s): string { return htmlspecialchars($s, ENT_QUOTES, 'UTF-8'); }

function navLink(string $label, string $href, string $currentPage): string {
    $key      = str_contains($href, 'page=') ? explode('=', $href)[1] : 'home';
    $isActive = $key === $currentPage;
    $style    = $isActive
        ? 'color:#fff;background:#000;border-radius:9999px;padding:8px 18px;'
        : 'color:#555553;border-radius:9999px;padding:8px 18px;transition:background .2s,color .2s;';
    $hover    = $isActive ? '' : 'onmouseover="this.style.background=\'rgba(0,0,0,.05)\';this.style.color=\'#000\'" onmouseout="this.style.background=\'transparent\';this.style.color=\'#555553\'"';
    return "<a href=\"$href\" style=\"font-family:var(--font-body);font-size:var(--text-xs);letter-spacing:.06em;white-space:nowrap;text-decoration:none;$style\" $hover>$label</a>";
}

?><!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title><?= $pageTitles[$page] ?></title>
  <meta name="description" content="Waypoint Innovation delivers fabrication, conceptual mechanical design and prototype development across automotive, industrial and agricultural sectors.">
  <link rel="icon" href="Images/Logo.png">
  <style>
    /* ── Reset & tokens ── */
    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

    :root {
      --color-black:     #000000;
      --color-red:       #ed3237;
      --color-white:     #ffffff;
      --color-off-white: #f5f5f3;
      --color-grey-100:  #f0f0ee;
      --color-grey-200:  #e0e0de;
      --color-grey-400:  #999997;
      --color-grey-600:  #555553;
      --color-grey-800:  #222220;

      --font-heading: 'Georgia', 'Times New Roman', serif;
      --font-body:    'Helvetica Neue', 'Arial', sans-serif;

      --text-xs:   clamp(.75rem,  .7rem  + .25vw, .8125rem);
      --text-sm:   clamp(.875rem, .82rem + .3vw,  1rem);
      --text-base: clamp(1rem,    .95rem + .3vw,  1.125rem);
      --text-lg:   clamp(1.125rem,1rem   + .6vw,  1.375rem);
      --text-xl:   clamp(1.5rem,  1.2rem + 1.2vw, 2.25rem);
      --text-2xl:  clamp(2rem,    1.5rem + 2vw,   3.5rem);
      --text-3xl:  clamp(3rem,    2rem   + 4vw,   6rem);

      --space-section: clamp(80px, 10vw, 160px);
      --space-block:   clamp(40px, 5vw,  80px);

      --container-max: 1320px;
      --container-pad: clamp(20px, 4vw, 72px);
    }

    html { background: var(--color-white); color: var(--color-black); font-family: var(--font-body); -webkit-font-smoothing: antialiased; scroll-behavior: smooth; }
    body { min-height: 100vh; overflow-x: hidden; }
    h1,h2,h3,h4,h5,h6 { font-family: var(--font-heading); line-height: .95; letter-spacing: -.02em; color: var(--color-black); }
    p  { font-family: var(--font-body); line-height: 1.7; color: var(--color-grey-600); }
    a  { color: inherit; text-decoration: none; }
    img { display: block; max-width: 100%; }
    ::selection { background: var(--color-red); color: var(--color-white); }
    :focus-visible { outline: 2px solid var(--color-red); outline-offset: 3px; }

    /* ── Skip link ── */
    .skip-link { position: absolute; top: -100%; left: 16px; z-index: 9999; background: var(--color-black); color: var(--color-white); padding: 8px 16px; font-size: var(--text-sm); }
    .skip-link:focus { top: 16px; }

    /* ── Container ── */
    .container { max-width: var(--container-max); margin: 0 auto; padding-left: var(--container-pad); padding-right: var(--container-pad); }

    /* ── Navigation ── */
    #nav-wrapper { position: fixed; top: 0; left: 0; right: 0; z-index: 50; display: flex; justify-content: center; padding-top: 16px; }
    #nav-pill {
      display: flex; align-items: center; gap: 0; height: 52px;
      padding: 0 6px 0 16px; max-width: 900px; width: calc(100% - 40px);
      background: rgba(255,255,255,.75); backdrop-filter: blur(16px); -webkit-backdrop-filter: blur(16px);
      border: 1px solid rgba(0,0,0,.07); border-radius: 9999px;
      box-shadow: 0 2px 12px rgba(0,0,0,.06);
      transition: background .35s ease, box-shadow .35s ease; overflow: hidden;
    }
    #nav-pill.scrolled { background: rgba(255,255,255,.92); box-shadow: 0 4px 24px rgba(0,0,0,.10); }
    #nav-logo { margin-right: 32px; flex-shrink: 0; display: flex; align-items: center; opacity: 1; transition: opacity .2s; }
    #nav-logo:hover { opacity: .7; }
    #nav-logo img { height: 34px; width: auto; object-fit: contain; }
    #nav-links { display: flex; align-items: center; gap: 2px; flex: 1; }
    #nav-cta {
      font-family: var(--font-body); font-size: var(--text-xs); letter-spacing: .06em;
      color: #fff; background: #000; border: 1px solid #000; border-radius: 9999px;
      padding: 8px 20px; margin-left: 8px; white-space: nowrap; flex-shrink: 0;
      transition: background .2s, border-color .2s; display: inline-flex; align-items: center;
    }
    #nav-cta:hover { background: #333; border-color: #333; }
    #nav-hamburger { display: none; flex-direction: column; gap: 5px; padding: 8px; margin-left: auto; background: none; border: none; cursor: pointer; }
    #nav-hamburger span { display: block; width: 20px; height: 1px; background: #000; transition: transform .3s ease, opacity .3s ease; }
    #mobile-menu {
      position: fixed; top: 0; left: 0; right: 0; z-index: 40;
      background: #fff; border-bottom: 1px solid var(--color-grey-200);
      padding-top: 80px; transform: translateY(-110%); opacity: 0;
      transition: transform .4s cubic-bezier(.16,1,.3,1), opacity .3s ease;
    }
    #mobile-menu.open { transform: translateY(0); opacity: 1; }
    #mobile-menu a { display: block; font-family: var(--font-heading); font-size: var(--text-xl); color: var(--color-black); border-bottom: 1px solid var(--color-grey-100); padding: 20px var(--container-pad); }
    #mobile-menu a.active { color: var(--color-red); }

    @media (max-width: 767px) {
      #nav-links, #nav-cta { display: none; }
      #nav-hamburger { display: flex; }
    }

    /* ── Grid helpers ── */
    .grid12 { display: grid; grid-template-columns: repeat(12, 1fr); gap: 32px; }
    @media (max-width: 767px) { .grid12 { gap: 20px; } }

    /* ── Section label ── */
    .section-label { font-family: var(--font-body); font-size: var(--text-xs); letter-spacing: .12em; text-transform: uppercase; color: var(--color-grey-400); margin-bottom: 24px; display: block; }
    .section-label.light { color: rgba(255,255,255,.4); }

    /* ── Red line ── */
    .red-line { width: 2px; height: 60px; background: var(--color-red); }

    /* ── Fade-up ── */
    .fade-up { opacity: 0; transform: translateY(24px); transition: opacity .6s ease, transform .6s ease; }
    .fade-up.visible { opacity: 1; transform: translateY(0); }

    /* ── Arrow link ── */
    .arrow-link { display: inline-flex; align-items: center; gap: 10px; font-family: var(--font-body); font-size: var(--text-sm); letter-spacing: .06em; color: var(--color-black); text-transform: uppercase; border: none; background: none; cursor: pointer; transition: gap .25s ease; }
    .arrow-link:hover { gap: 16px; }
    .arrow-link.light { color: rgba(255,255,255,.7); }
    .arrow-link.light:hover { color: #fff; }
    .arrow-link::after { content: '→'; font-size: 1.1em; }

    /* ── Hero ── */
    #hero { position: relative; height: 100svh; min-height: 560px; overflow: hidden; display: grid; grid-template-rows: 80px 1fr 320px; }
    #hero-img { position: absolute; top: -15%; left: 0; width: 100%; height: 130%; will-change: transform; }
    #hero-img img { width: 100%; height: 100%; object-fit: cover; object-position: center; }
    #hero-overlay { position: absolute; inset: 0; z-index: 1; background: linear-gradient(to bottom, rgba(0,0,0,.5) 0%, rgba(0,0,0,.2) 40%, rgba(0,0,0,.65) 100%); }
    #hero-content { position: relative; z-index: 2; display: flex; flex-direction: column; justify-content: center; width: 100%; }
    .hero-headline { font-family: var(--font-heading); font-size: clamp(2rem, 5vw, 5rem); line-height: .93; letter-spacing: -.03em; color: #fff; display: block; overflow: hidden; }
    .hero-sub { font-family: var(--font-body); font-size: clamp(.9rem, 1.2vw, 1.1rem); color: rgba(255,255,255,.75); line-height: 1.55; }
    .hero-divider { height: 1px; background: rgba(255,255,255,.2); margin-bottom: 20px; }
    .hero-vertical-text { font-family: var(--font-body); font-size: .65rem; letter-spacing: .15em; color: rgba(255,255,255,.45); writing-mode: vertical-rl; transform: rotate(180deg); text-transform: uppercase; }

    /* ── Sections ── */
    .section-offwhite { background: var(--color-off-white); padding: var(--space-section) 0; }
    .section-dark     { background: var(--color-grey-800); padding: var(--space-section) 0; }
    .section-black    { background: var(--color-black);    padding: var(--space-section) 0; }
    .section-white    { background: var(--color-white);    padding: var(--space-section) 0; }
    .section-relative { position: relative; overflow: hidden; }

    /* ── Industries list ── */
    .industry-row { display: block; border-top: 1px solid rgba(255,255,255,.1); padding: 28px 0; text-decoration: none; background: transparent; transition: background .2s ease; }
    .industry-row:hover { background: rgba(255,255,255,.05); }
    .industry-row:last-of-type + .industry-border { border-top: 1px solid rgba(255,255,255,.1); }

    /* ── CTA section ── */
    #cta-section { position: relative; overflow: hidden; }
    #cta-bg { position: absolute; inset: 0; }
    #cta-bg img { width: 100%; height: 100%; object-fit: cover; object-position: center; }
    #cta-overlay { position: absolute; inset: 0; background: rgba(0,0,0,.68); }
    #cta-content { position: relative; z-index: 1; padding: var(--space-section) 0; text-align: center; }
    .cta-btn { display: inline-block; font-family: var(--font-body); font-size: var(--text-base); background: var(--color-red); color: #fff; padding: 14px 40px; border-radius: 2px; transition: background .25s ease; letter-spacing: .02em; }
    .cta-btn:hover { background: #c02028; }
    .cta-phone { font-family: var(--font-body); font-size: var(--text-sm); color: rgba(255,255,255,.55); transition: color .25s ease; }
    .cta-phone:hover { color: #fff; }

    /* ── About hero ── */
    #about-hero { position: relative; overflow: hidden; padding-top: calc(88px + var(--space-section)); padding-bottom: var(--space-section); }
    #about-hero-img { position: absolute; top: -15%; left: 0; width: 100%; height: 130%; will-change: transform; }
    #about-hero-img img { width: 100%; height: 100%; object-fit: cover; }
    #about-hero-overlay { position: absolute; inset: 0; background: rgba(0,0,0,.70); z-index: 1; }
    #about-hero-content { position: relative; z-index: 2; }

    /* ── Services hero ── */
    .services-hero { background: var(--color-white); padding-top: calc(88px + var(--space-section)); padding-bottom: var(--space-section); }
    .pillar-grid { display: grid; grid-template-columns: repeat(3, 1fr); border-top: 1px solid var(--color-grey-200); }
    @media (max-width: 767px) { .pillar-grid { grid-template-columns: 1fr; } }
    .pillar { padding: 32px 0; }
    .pillar + .pillar { border-left: 1px solid var(--color-grey-200); padding-left: 32px; }

    /* ── Industry tabs ── */
    .tab-list { display: flex; border-bottom: 1px solid var(--color-grey-200); margin-bottom: 48px; }
    .tab-btn { font-family: var(--font-body); font-size: var(--text-sm); letter-spacing: .05em; color: var(--color-grey-400); padding: 16px 24px 16px 0; background: none; border: none; border-bottom: 2px solid transparent; cursor: pointer; transition: color .25s, border-color .25s; margin-bottom: -1px; }
    .tab-btn:hover { color: var(--color-black); }
    .tab-btn.active { color: var(--color-black); border-bottom-color: var(--color-red); }
    .tab-panel { display: none; }
    .tab-panel.active { display: block; }
    .draft-badge { display: inline-block; font-family: var(--font-body); font-size: var(--text-xs); background: var(--color-grey-100); color: var(--color-grey-400); padding: 3px 10px; border-radius: 2px; margin-bottom: 16px; letter-spacing: .05em; }
    .photo-grid { display: grid; grid-template-columns: repeat(3,1fr); gap: 12px; margin-top: var(--space-block); }
    @media (max-width: 640px) { .photo-grid { grid-template-columns: 1fr; } }
    @media (min-width:641px) and (max-width:767px) { .photo-grid { grid-template-columns: repeat(2,1fr); } }
    .photo-placeholder { background: var(--color-grey-100); border-radius: 2px; display: flex; align-items: center; justify-content: center; aspect-ratio: 4/3; }
    .photo-placeholder:nth-child(3n) { aspect-ratio: 3/4; }
    .photo-placeholder span { font-family: var(--font-body); font-size: var(--text-xs); color: var(--color-grey-400); letter-spacing: .08em; text-transform: uppercase; }

    /* ── Contact page ── */
    .contact-hero { background: var(--color-white); padding-top: calc(88px + var(--space-section)); padding-bottom: var(--space-block); }
    .contact-label { font-family: var(--font-body); font-size: var(--text-xs); letter-spacing: .1em; color: var(--color-grey-400); text-transform: uppercase; margin-bottom: 6px; }
    .contact-value-heading { font-family: var(--font-heading); font-size: var(--text-lg); color: var(--color-black); display: block; line-height: 1.2; transition: color .25s; }
    .contact-value-heading:hover { color: var(--color-red); }
    .contact-value-body { font-family: var(--font-body); font-size: var(--text-sm); color: var(--color-grey-600); line-height: 1.5; }

    /* ── Form ── */
    .form-field { display: flex; flex-direction: column; gap: 4px; }
    .form-label { font-family: var(--font-body); font-size: var(--text-xs); letter-spacing: .1em; color: var(--color-grey-400); text-transform: uppercase; }
    .form-input { width: 100%; border: none; border-bottom: 1px solid var(--color-grey-200); border-radius: 0; padding: 12px 0; font-family: var(--font-body); font-size: var(--text-base); background: transparent; color: var(--color-black); outline: none; appearance: none; transition: border-color .25s ease; }
    .form-input:focus { border-bottom-color: var(--color-black); }
    .form-input.error { border-bottom-color: var(--color-red); }
    textarea.form-input { resize: none; }
    .form-error { font-family: var(--font-body); font-size: var(--text-xs); color: var(--color-red); }
    .form-submit { font-family: var(--font-body); font-size: var(--text-base); background: var(--color-red); color: #fff; padding: 14px 40px; border-radius: 2px; border: none; cursor: pointer; letter-spacing: .02em; transition: background .25s ease; }
    .form-submit:hover { background: #c02028; }
    .form-success { padding: 40px 0; }
    .form-success-heading { font-family: var(--font-heading); font-size: var(--text-xl); color: var(--color-black); margin-bottom: 8px; }
    .form-success-body { font-family: var(--font-body); font-size: var(--text-base); color: var(--color-grey-600); }

    /* ── Approach steps ── */
    .step-row { border-top: 1px solid var(--color-grey-200); padding: 32px 0; }

    /* ── Footer ── */
    footer { background: var(--color-white); border-top: 1px solid var(--color-grey-200); }
    .footer-top { display: flex; flex-direction: column; gap: 24px; padding: var(--space-block) 0; }
    @media (min-width: 768px) { .footer-top { flex-direction: row; align-items: center; justify-content: space-between; } }
    .footer-logo img { height: 30px; width: auto; object-fit: contain; }
    .footer-logo { display: flex; align-items: center; opacity: 1; transition: opacity .2s; }
    .footer-logo:hover { opacity: .7; }
    .footer-nav { display: flex; flex-wrap: wrap; gap: 24px; }
    .footer-nav a { font-family: var(--font-body); font-size: var(--text-xs); letter-spacing: .08em; color: var(--color-grey-400); text-transform: uppercase; transition: color .25s ease; }
    .footer-nav a:hover { color: #000; }
    .footer-divider { height: 1px; background: var(--color-grey-200); }
    .footer-bottom { display: flex; flex-direction: column; gap: 12px; padding: 24px 0; }
    @media (min-width: 768px) { .footer-bottom { flex-direction: row; align-items: center; justify-content: space-between; } }
    .footer-copy { font-family: var(--font-body); font-size: var(--text-xs); color: var(--color-grey-400); }

    /* ── Col spans ── */
    .col-12 { grid-column: span 12; }
    .col-6  { grid-column: span 6; }
    .col-5  { grid-column: span 5; }
    .col-4  { grid-column: span 4; }
    .col-3  { grid-column: span 3; }
    @media (min-width: 768px) {
      .md-col-1  { grid-column: span 1; }
      .md-col-2  { grid-column: span 2; }
      .md-col-3  { grid-column: span 3; }
      .md-col-4  { grid-column: span 4; }
      .md-col-5  { grid-column: span 5; }
      .md-col-6  { grid-column: span 6; }
      .md-col-7  { grid-column: span 7; }
      .md-col-8  { grid-column: span 8; }
      .md-col-9  { grid-column: span 9; }
      .md-col-start-6  { grid-column-start: 6; }
      .md-col-start-7  { grid-column-start: 7; }
      .md-col-start-8  { grid-column-start: 8; }
      .md-col-start-9  { grid-column-start: 9; }
      .md-col-start-10 { grid-column-start: 10; }
      .md-hidden { display: none; }
    }
    @media (max-width: 767px) {
      .md-col-1, .md-col-2, .md-col-3, .md-col-4, .md-col-5, .md-col-6,
      .md-col-7, .md-col-8, .md-col-9 { grid-column: span 12; }
      .md-col-start-6, .md-col-start-7, .md-col-start-8, .md-col-start-9,
      .md-col-start-10 { grid-column-start: auto; }
      .sm-hidden { display: none; }
    }

    /* ── Utilities ── */
    .text-center { text-align: center; }
    .flex-center  { display: flex; align-items: center; justify-content: center; }
    .flex-col-center { display: flex; flex-direction: column; align-items: center; gap: 32px; }
    .flex-row-gap { display: flex; flex-direction: column; gap: 24px; align-items: center; }
    @media (min-width: 640px) { .flex-row-gap { flex-direction: row; } }
    .sr-only { position: absolute; width: 1px; height: 1px; padding: 0; margin: -1px; overflow: hidden; clip: rect(0,0,0,0); white-space: nowrap; border-width: 0; }
  </style>
</head>
<body>

<a href="#main-content" class="skip-link">Skip to main content</a>

<!-- ── Navigation ─────────────────────────────────────────────────────── -->
<div id="nav-wrapper">
  <div id="nav-pill">
    <a id="nav-logo" href="?page=home" aria-label="Waypoint Innovation home">
      <img src="Images/Logo.png" alt="Waypoint Innovation">
    </a>

    <nav id="nav-links" aria-label="Main navigation">
      <?php foreach ($navLinks as $link): ?>
        <?= navLink($link['label'], $link['href'], $page) ?>
      <?php endforeach; ?>
    </nav>

    <a href="?page=contact" id="nav-cta">Contact us</a>

    <button id="nav-hamburger" aria-label="Open menu" aria-expanded="false" aria-controls="mobile-menu">
      <span id="ham-1"></span>
      <span id="ham-2"></span>
      <span id="ham-3"></span>
    </button>
  </div>
</div>

<!-- Mobile menu -->
<div id="mobile-menu" aria-hidden="true">
  <nav aria-label="Mobile navigation">
    <?php foreach ($navLinks as $link): ?>
      <?php $key = explode('=', $link['href'])[1]; ?>
      <a href="<?= $link['href'] ?>" class="<?= $key === $page ? 'active' : '' ?>"><?= $link['label'] ?></a>
    <?php endforeach; ?>
  </nav>
</div>

<!-- ── Main content ───────────────────────────────────────────────────── -->
<main id="main-content">

<?php if ($page === 'home'): ?>
<!-- ════════════════════ HOME ════════════════════ -->

  <!-- Hero -->
  <section id="hero" aria-label="Hero">
    <div id="hero-img" aria-hidden="true">
      <img src="Images/IndustrialSilo .jpg" alt="Industrial silo fabrication">
    </div>
    <div id="hero-overlay" aria-hidden="true"></div>

    <div></div><!-- top spacer row -->

    <div id="hero-content">
      <div class="container">
        <div class="grid12" style="margin-bottom:20px;align-items:end">
          <div class="col-12 md-col-9">
            <span class="hero-headline" style="animation:slideUp .8s .2s both">Precision</span>
            <span class="hero-headline" style="animation:slideUp .8s .32s both">at every</span>
            <span class="hero-headline" style="animation:slideUp .8s .44s both">point.</span>
          </div>
          <div class="col-12 md-col-3 sm-hidden" style="display:flex;flex-direction:column;align-items:flex-end;gap:8px;padding-bottom:4px">
            <div class="red-line" style="animation:growDown .8s .7s both;transform-origin:top"></div>
            <span class="hero-vertical-text" style="animation:fadeIn .6s 1s both">Fabrication · Design · Prototyping</span>
          </div>
        </div>

        <div class="hero-divider" style="animation:expandWidth .8s .65s both;transform-origin:left"></div>

        <div class="grid12" style="align-items:center">
          <div class="col-12 md-col-6">
            <p class="hero-sub" style="animation:fadeUp .7s .85s both">
              Waypoint Innovation works where<br>precision and practicality meet.
            </p>
          </div>
          <div class="col-12 md-col-4 md-col-start-9" style="display:flex;justify-content:flex-end;margin-top:12px;animation:fadeRight .7s 1s both">
            <a href="?page=services" class="arrow-link light">See our work</a>
          </div>
        </div>
      </div>
    </div>

    <div></div><!-- bottom spacer row -->
  </section>

  <!-- Intro -->
  <section class="section-offwhite" aria-labelledby="intro-heading">
    <div class="container">
      <span class="section-label fade-up">About us</span>
      <div class="grid12" style="align-items:start">
        <div class="col-12 md-col-6" style="display:flex;flex-direction:column;gap:24px">
          <h2 id="intro-heading" class="fade-up" style="font-size:var(--text-2xl);line-height:.95;letter-spacing:-.02em">
            Engineering solutions for the real world.
          </h2>
          <p class="fade-up">
            Waypoint Innovation is a South African engineering firm specialising in
            fabrication, conceptual mechanical design and prototype development.
          </p>
          <p class="fade-up">
            We work across the automotive, industrial and agricultural sectors —
            building components, jigs, test equipment, machinery and attachments
            that need to perform in demanding conditions.
          </p>
          <div class="fade-up">
            <a href="?page=about" class="arrow-link">More about us</a>
          </div>
        </div>
        <div class="col-12 md-col-6 fade-up" style="padding-top:4px">
          <img src="Images/Tractor.jpg" alt="Agricultural tractor attachment work by Waypoint Innovation" style="width:80%;height:auto;border-radius:4px">
        </div>
      </div>
    </div>
  </section>

  <!-- Industries -->
  <section class="section-dark" aria-labelledby="industries-heading">
    <div class="container">
      <span class="section-label light">Industries</span>
      <h2 id="industries-heading" class="sr-only">Industries we serve</h2>
      <div>
        <?php foreach ($industries as $ind): ?>
          <a href="?page=services#<?= h($ind['id']) ?>" class="industry-row">
            <div class="grid12" style="align-items:center">
              <div class="col-12 md-col-1">
                <span style="font-family:var(--font-body);font-size:var(--text-xs);color:rgba(255,255,255,.3);letter-spacing:.05em"><?= h($ind['number']) ?></span>
              </div>
              <div class="col-12 md-col-4">
                <span style="font-family:var(--font-heading);font-size:var(--text-xl);color:#fff;line-height:1" class="ind-label"><?= h($ind['label']) ?></span>
              </div>
              <div class="col-12 md-col-5 md-col-start-6">
                <span style="font-family:var(--font-body);font-size:var(--text-sm);color:rgba(255,255,255,.5);line-height:1.5"><?= h($ind['descriptor']) ?></span>
              </div>
              <div class="col-12 md-col-2 sm-hidden" style="text-align:right">
                <span style="font-family:var(--font-body);font-size:var(--text-xs);color:rgba(255,255,255,.3);letter-spacing:.08em;text-transform:uppercase" class="ind-arrow">Details →</span>
              </div>
            </div>
          </a>
        <?php endforeach; ?>
        <div style="border-top:1px solid rgba(255,255,255,.1)"></div>
      </div>
    </div>
  </section>

  <!-- Client mention -->
  <section class="section-black" aria-label="Client work">
    <div class="container">
      <div class="grid12" style="align-items:center">
        <div class="col-12 md-col-6">
          <p style="font-family:var(--font-body);font-size:var(--text-sm);color:rgba(255,255,255,.35);letter-spacing:.08em;text-transform:uppercase;margin-bottom:20px">We have worked with</p>
          <h2 style="font-family:var(--font-heading);font-size:var(--text-2xl);line-height:.95;letter-spacing:-.02em;color:#fff;margin-bottom:16px">Mercedes Benz</h2>
          <div style="width:60px;height:1px;background:rgba(255,255,255,.1);margin-bottom:16px" aria-hidden="true"></div>
          <h2 style="font-family:var(--font-heading);font-size:var(--text-xl);line-height:1;letter-spacing:-.02em;color:rgba(255,255,255,.55)">RSI Smartcap Canopies</h2>
        </div>
        <div class="col-12 md-col-5 md-col-start-8">
          <p style="font-family:var(--font-body);font-size:var(--text-base);color:rgba(255,255,255,.45);line-height:1.7">
            Our work spans concept to completion — from packaging design to prototype components built to manufacturer specification.
          </p>
        </div>
      </div>
    </div>
  </section>

  <!-- CTA -->
  <?php include_once __DIR__ . '/cta-partial.php' ?>

<?php elseif ($page === 'about'): ?>
<!-- ════════════════════ ABOUT ════════════════════ -->

  <!-- About hero -->
  <section id="about-hero" aria-labelledby="about-heading">
    <div id="about-hero-img" aria-hidden="true">
      <img src="Images/Tools.jpg" alt="">
    </div>
    <div id="about-hero-overlay" aria-hidden="true"></div>
    <div id="about-hero-content">
      <div class="container">
        <span class="section-label light" style="animation:fadeIn .6s .1s both">About Waypoint Innovation</span>

        <div class="grid12" style="align-items:end;margin-bottom:48px">
          <div class="col-12 md-col-8">
            <span id="about-heading" class="sr-only">About Waypoint Innovation</span>
            <span style="font-family:var(--font-heading);font-size:clamp(2.31rem,3.1vw,4.62rem);line-height:.92;letter-spacing:-.03em;color:#fff;display:block;animation:slideUp .8s .2s both">Engineering built</span>
            <span style="font-family:var(--font-heading);font-size:clamp(2.31rem,3.1vw,4.62rem);line-height:.92;letter-spacing:-.03em;color:#fff;display:block;animation:slideUp .8s .32s both">on doing it</span>
            <span style="font-family:var(--font-heading);font-size:clamp(2.31rem,3.1vw,4.62rem);line-height:.92;letter-spacing:-.03em;color:#fff;display:block;animation:slideUp .8s .44s both">properly.</span>
          </div>
          <div class="col-12 md-col-3 md-col-start-10 sm-hidden" style="display:flex;flex-direction:column;align-items:flex-end;gap:12px;padding-bottom:8px">
            <div class="red-line" style="height:80px"></div>
          </div>
        </div>

        <div style="height:1px;background:rgba(255,255,255,.15);margin-bottom:48px;animation:expandWidth .7s .65s both;transform-origin:left"></div>

        <div class="grid12">
          <div class="col-12 md-col-5" style="animation:fadeUp .7s .8s both">
            <p style="font-family:var(--font-body);font-size:var(--text-base);color:rgba(255,255,255,.7);line-height:1.7">
              Waypoint Innovation is a South African engineering company. We do fabrication, conceptual mechanical design and prototype development — work that requires precision, practicality and an understanding of how things are actually made and used.
            </p>
          </div>
          <div class="col-12 md-col-5 md-col-start-7" style="animation:fadeUp .7s .95s both">
            <p style="font-family:var(--font-body);font-size:var(--text-base);color:rgba(255,255,255,.7);line-height:1.7">
              We are not a large firm. We keep our scope deliberate so that every project gets our full attention. The work we take on tends to be technically demanding — exactly where careful design and careful fabrication matter most.
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- Approach -->
  <section class="section-offwhite" aria-labelledby="approach-heading">
    <div class="container">
      <span class="section-label fade-up">How we work</span>
      <h2 id="approach-heading" class="sr-only">Our approach</h2>
      <div>
        <?php
        $steps = [
          ['number' => '01', 'title' => 'Understand the problem',        'desc' => 'Before anything is drawn or built, we spend time understanding what the component or system actually needs to do — and what it needs to survive.'],
          ['number' => '02', 'title' => 'Design with the end use in mind','desc' => 'Every design decision accounts for manufacturing, maintenance, and real-world operating conditions.'],
          ['number' => '03', 'title' => 'Build and refine',               'desc' => 'We fabricate, test and refine. Prototyping is part of how we validate — not an afterthought.'],
        ];
        foreach ($steps as $step):
        ?>
          <div class="step-row fade-up">
            <div class="grid12" style="align-items:start">
              <div class="col-12 md-col-1">
                <span style="font-family:var(--font-body);font-size:var(--text-xs);color:var(--color-grey-400);letter-spacing:.05em"><?= h($step['number']) ?></span>
              </div>
              <div class="col-12 md-col-4">
                <h3 style="font-family:var(--font-heading);font-size:var(--text-xl);color:var(--color-black);line-height:1.1"><?= h($step['title']) ?></h3>
              </div>
              <div class="col-12 md-col-6 md-col-start-7">
                <p style="font-family:var(--font-body);font-size:var(--text-base);color:var(--color-grey-600);line-height:1.7"><?= h($step['desc']) ?></p>
              </div>
            </div>
          </div>
        <?php endforeach; ?>
        <div style="border-top:1px solid var(--color-grey-200)"></div>
      </div>
    </div>
  </section>

  <!-- CTA -->
  <section id="cta-section" aria-label="Contact call to action">
    <div id="cta-bg" aria-hidden="true"><img src="Images/Factory.JPG" alt=""></div>
    <div id="cta-overlay" aria-hidden="true"></div>
    <div id="cta-content">
      <div class="container">
        <div class="flex-col-center">
          <p style="font-family:var(--font-body);font-size:var(--text-xs);letter-spacing:.15em;color:var(--color-red);text-transform:uppercase">Get in touch</p>
          <h2 style="font-family:var(--font-heading);font-size:var(--text-2xl);line-height:.95;letter-spacing:-.02em;color:#fff">Let&#8217;s discuss your project.</h2>
          <div class="flex-row-gap" style="margin-top:8px">
            <a href="?page=contact" class="cta-btn">Contact us</a>
            <a href="tel:#" class="cta-phone"><!-- TODO: replace with real phone number -->or call us directly</a>
          </div>
        </div>
      </div>
    </div>
  </section>

<?php elseif ($page === 'services'): ?>
<!-- ════════════════════ SERVICES ════════════════════ -->

  <!-- Services hero -->
  <section class="services-hero" aria-labelledby="services-heading">
    <div class="container">
      <span class="section-label">Services &amp; Industries</span>
      <div class="grid12" style="margin-bottom:64px">
        <div class="col-12 md-col-7">
          <h1 id="services-heading" style="font-family:var(--font-heading);font-size:var(--text-3xl);line-height:.92;letter-spacing:-.03em;color:var(--color-black)">
            Three sectors.<br>One standard<br>of work.
          </h1>
        </div>
        <div class="col-12 md-col-4 md-col-start-9" style="display:flex;align-items:flex-end">
          <p style="font-family:var(--font-body);font-size:var(--text-base);color:var(--color-grey-600);line-height:1.7">
            Fabrication, conceptual mechanical design and prototype development — applied across automotive, industrial and agricultural work.
          </p>
        </div>
      </div>

      <div class="pillar-grid">
        <?php
        $pillars = [
          ['title' => 'Fabrication',                   'desc' => 'Structural, mechanical and component fabrication to specification.'],
          ['title' => 'Conceptual Mechanical Design',   'desc' => 'From blank-sheet concept through to production-ready design intent.'],
          ['title' => 'Prototype Development',          'desc' => 'Physical prototypes built to validate design — engineered to perform, not just demonstrate.'],
        ];
        foreach ($pillars as $i => $pillar):
        ?>
          <div class="pillar <?= $i > 0 ? 'pillar' : '' ?>">
            <h2 style="font-family:var(--font-heading);font-size:var(--text-xl);color:var(--color-black);line-height:1.1;margin-bottom:12px"><?= h($pillar['title']) ?></h2>
            <p style="font-family:var(--font-body);font-size:var(--text-sm);color:var(--color-grey-600);line-height:1.6"><?= h($pillar['desc']) ?></p>
          </div>
        <?php endforeach; ?>
      </div>
    </div>
  </section>

  <!-- Industry tabs -->
  <section class="section-offwhite" aria-label="Industry details">
    <div class="container">
      <div class="tab-list" role="tablist" aria-label="Industries">
        <?php foreach ($industries as $ind): ?>
          <button
            class="tab-btn <?= $ind['id'] === 'automotive' ? 'active' : '' ?>"
            role="tab"
            aria-selected="<?= $ind['id'] === 'automotive' ? 'true' : 'false' ?>"
            aria-controls="panel-<?= h($ind['id']) ?>"
            id="tab-<?= h($ind['id']) ?>"
            data-tab="<?= h($ind['id']) ?>"
          ><?= h($ind['label']) ?></button>
        <?php endforeach; ?>
      </div>

      <?php foreach ($industries as $ind): ?>
        <div
          class="tab-panel <?= $ind['id'] === 'automotive' ? 'active' : '' ?>"
          id="panel-<?= h($ind['id']) ?>"
          role="tabpanel"
          aria-labelledby="tab-<?= h($ind['id']) ?>"
        >
          <div class="grid12">
            <div class="col-12 md-col-5">
              <h2 style="font-family:var(--font-heading);font-size:var(--text-3xl);line-height:.92;letter-spacing:-.03em;color:var(--color-black)"><?= h($ind['label']) ?></h2>
            </div>
            <div class="col-12 md-col-6 md-col-start-7">
              <?php if ($ind['draftPending']): ?>
                <span class="draft-badge">Draft — pending owner review</span>
              <?php endif; ?>
              <p style="font-family:var(--font-body);font-size:var(--text-base);color:var(--color-grey-600);line-height:1.75"><?= h($ind['copy']) ?></p>
            </div>
          </div>

          <div style="margin-top:var(--space-block)">
            <p style="font-family:var(--font-body);font-size:var(--text-xs);letter-spacing:.12em;color:var(--color-grey-400);text-transform:uppercase;margin-bottom:20px">Project photos</p>
            <div class="photo-grid">
              <?php for ($n = 1; $n <= 6; $n++): ?>
                <div class="photo-placeholder" aria-label="Project photo placeholder <?= $n ?>">
                  <span>Project photo</span>
                </div>
              <?php endfor; ?>
            </div>
          </div>
        </div>
      <?php endforeach; ?>
    </div>
  </section>

  <!-- CTA -->
  <section id="cta-section" aria-label="Contact call to action">
    <div id="cta-bg" aria-hidden="true"><img src="Images/Factory.JPG" alt=""></div>
    <div id="cta-overlay" aria-hidden="true"></div>
    <div id="cta-content">
      <div class="container">
        <div class="flex-col-center">
          <p style="font-family:var(--font-body);font-size:var(--text-xs);letter-spacing:.15em;color:var(--color-red);text-transform:uppercase">Get in touch</p>
          <h2 style="font-family:var(--font-heading);font-size:var(--text-2xl);line-height:.95;letter-spacing:-.02em;color:#fff">Let&#8217;s discuss your project.</h2>
          <div class="flex-row-gap" style="margin-top:8px">
            <a href="?page=contact" class="cta-btn">Contact us</a>
            <a href="tel:#" class="cta-phone"><!-- TODO: replace with real phone number -->or call us directly</a>
          </div>
        </div>
      </div>
    </div>
  </section>

<?php elseif ($page === 'contact'): ?>
<!-- ════════════════════ CONTACT ════════════════════ -->

  <section class="contact-hero" aria-labelledby="contact-heading">
    <div class="container">
      <span class="section-label">Get in touch</span>
      <h1 id="contact-heading" style="font-family:var(--font-heading);font-size:var(--text-3xl);line-height:.92;letter-spacing:-.03em;color:var(--color-black);margin-bottom:20px">
        Start a<br>conversation.
      </h1>
      <p style="font-family:var(--font-body);font-size:var(--text-base);color:var(--color-grey-600);line-height:1.7;max-width:400px">
        Tell us about your project.<br>We&#8217;ll respond promptly.
      </p>
    </div>
  </section>

  <section class="section-white" style="padding-top:0">
    <div class="container">
      <div class="grid12">
        <!-- Contact details -->
        <div class="col-12 md-col-3">
          <span class="section-label">Find us</span>
          <div style="display:flex;flex-direction:column;gap:32px">
            <div>
              <p class="contact-label">Phone</p>
              <!-- TODO: replace with real phone number -->
              <a href="tel:#" class="contact-value-heading">+27 XX XXX XXXX</a>
            </div>
            <div>
              <p class="contact-label">Email</p>
              <a href="mailto:info@waypointinnovation.co.za" class="contact-value-body" style="word-break:break-all;transition:color .25s" onmouseover="this.style.color='var(--color-red)'" onmouseout="this.style.color='var(--color-grey-600)'">
                info@waypointinnovation.co.za
              </a>
            </div>
            <div>
              <p class="contact-label">Location</p>
              <p class="contact-value-body">South Africa<!-- TODO: update with actual city/province --></p>
            </div>
            <div>
              <p class="contact-label">Response time</p>
              <p class="contact-value-body">Within 1–2 business days</p>
            </div>
          </div>
        </div>

        <!-- Divider -->
        <div class="col-12 md-col-1 sm-hidden" style="border-left:1px solid var(--color-grey-200);margin-left:50%" aria-hidden="true"></div>

        <!-- Form -->
        <div class="col-12 md-col-7 md-col-start-6">
          <?php if ($sent === 'success'): ?>
            <div class="form-success" role="status" aria-live="polite">
              <p class="form-success-heading"><span style="color:var(--color-red)">✓</span> Message sent.</p>
              <p class="form-success-body">We'll be in touch shortly.</p>
            </div>
          <?php elseif ($sent === 'error'): ?>
            <div style="padding:16px 0;color:var(--color-red);font-family:var(--font-body)">
              Something went wrong — please email us directly at <a href="mailto:info@waypointinnovation.co.za" style="color:var(--color-red)">info@waypointinnovation.co.za</a>.
            </div>
          <?php else: ?>
            <form method="POST" action="?page=contact" novalidate style="display:flex;flex-direction:column;gap:32px">
              <input type="hidden" name="_form" value="contact">

              <div class="form-field">
                <label for="name" class="form-label">Your name</label>
                <input id="name" name="name" type="text" autocomplete="name" class="form-input <?= in_array('name', $errors ?? [], true) ? 'error' : '' ?>" value="<?= h($_POST['name'] ?? '') ?>">
                <?php if (in_array('name', $errors ?? [], true)): ?>
                  <span class="form-error" role="alert">Your name is required</span>
                <?php endif; ?>
              </div>

              <div class="form-field">
                <label for="email" class="form-label">Email address</label>
                <input id="email" name="email" type="email" autocomplete="email" class="form-input <?= in_array('email', $errors ?? [], true) ? 'error' : '' ?>" value="<?= h($_POST['email'] ?? '') ?>">
                <?php if (in_array('email', $errors ?? [], true)): ?>
                  <span class="form-error" role="alert">A valid email address is required</span>
                <?php endif; ?>
              </div>

              <div class="form-field">
                <label for="company" class="form-label">Company <span style="font-weight:400;opacity:.6">(optional)</span></label>
                <input id="company" name="company" type="text" autocomplete="organization" class="form-input" value="<?= h($_POST['company'] ?? '') ?>">
              </div>

              <div class="form-field">
                <label for="brief" class="form-label">Tell us about the project</label>
                <textarea id="brief" name="brief" rows="4" class="form-input <?= in_array('brief', $errors ?? [], true) ? 'error' : '' ?>"><?= h($_POST['brief'] ?? '') ?></textarea>
                <?php if (in_array('brief', $errors ?? [], true)): ?>
                  <span class="form-error" role="alert">Please tell us about the project</span>
                <?php endif; ?>
              </div>

              <div>
                <button type="submit" class="form-submit">Send message</button>
              </div>
            </form>
          <?php endif; ?>
        </div>
      </div>
    </div>
  </section>

<?php endif; ?>

</main>

<!-- ── Footer ─────────────────────────────────────────────────────────── -->
<footer role="contentinfo">
  <div class="container">
    <div class="footer-top">
      <a href="?page=home" class="footer-logo" aria-label="Waypoint Innovation home">
        <img src="Images/Logo.png" alt="Waypoint Innovation">
      </a>
      <nav class="footer-nav" aria-label="Footer navigation">
        <?php foreach ($navLinks as $link): ?>
          <a href="<?= $link['href'] ?>"><?= $link['label'] ?></a>
        <?php endforeach; ?>
      </nav>
    </div>
    <div class="footer-divider"></div>
    <div class="footer-bottom">
      <p class="footer-copy">© <?= date('Y') ?> Waypoint Innovation. All rights reserved.</p>
      <p class="footer-copy">Fabrication · Mechanical Design · Prototype Development</p>
    </div>
  </div>
</footer>

<!-- ── Scripts ────────────────────────────────────────────────────────── -->
<style>
  @keyframes slideUp    { from { transform: translateY(110%); opacity: 0; } to { transform: translateY(0); opacity: 1; } }
  @keyframes fadeIn     { from { opacity: 0; } to { opacity: 1; } }
  @keyframes fadeUp     { from { opacity: 0; transform: translateY(16px); } to { opacity: 1; transform: translateY(0); } }
  @keyframes fadeRight  { from { opacity: 0; transform: translateX(16px); } to { opacity: 1; transform: translateX(0); } }
  @keyframes growDown   { from { transform: scaleY(0); } to { transform: scaleY(1); } }
  @keyframes expandWidth{ from { transform: scaleX(0); } to { transform: scaleX(1); } }
</style>

<script>
(function () {
  'use strict';

  // ── Navbar scroll effect ──
  var pill = document.getElementById('nav-pill');
  window.addEventListener('scroll', function () {
    pill.classList.toggle('scrolled', window.scrollY > 60);
  }, { passive: true });

  // ── Hamburger menu ──
  var hamburger = document.getElementById('nav-hamburger');
  var mobileMenu = document.getElementById('mobile-menu');
  var h1 = document.getElementById('ham-1');
  var h2 = document.getElementById('ham-2');
  var h3 = document.getElementById('ham-3');
  var menuOpen = false;

  if (hamburger) {
    hamburger.addEventListener('click', function () {
      menuOpen = !menuOpen;
      hamburger.setAttribute('aria-expanded', menuOpen);
      mobileMenu.setAttribute('aria-hidden', !menuOpen);
      mobileMenu.classList.toggle('open', menuOpen);
      document.body.style.overflow = menuOpen ? 'hidden' : '';
      h1.style.transform = menuOpen ? 'translateY(7px) rotate(45deg)' : '';
      h2.style.opacity   = menuOpen ? '0' : '1';
      h3.style.transform = menuOpen ? 'translateY(-7px) rotate(-45deg)' : '';
    });
  }

  // ── Hero parallax ──
  var heroImg = document.getElementById('hero-img');
  var aboutImg = document.getElementById('about-hero-img');
  if (heroImg || aboutImg) {
    window.addEventListener('scroll', function () {
      requestAnimationFrame(function () {
        var y = window.scrollY * 0.4;
        if (heroImg)  heroImg.style.transform  = 'translateY(' + y + 'px)';
        if (aboutImg) aboutImg.style.transform = 'translateY(' + y + 'px)';
      });
    }, { passive: true });
  }

  // ── Industry tab hover (home page rows) ──
  document.querySelectorAll('.industry-row').forEach(function (row) {
    var label = row.querySelector('.ind-label');
    var arrow = row.querySelector('.ind-arrow');
    row.addEventListener('mouseenter', function () {
      if (label) label.style.color = 'var(--color-red)';
      if (arrow) arrow.style.color = 'var(--color-red)';
    });
    row.addEventListener('mouseleave', function () {
      if (label) label.style.color = '#fff';
      if (arrow) arrow.style.color = 'rgba(255,255,255,.3)';
    });
  });

  // ── Industry tabs (services page) ──
  var tabBtns   = document.querySelectorAll('.tab-btn');
  var tabPanels = document.querySelectorAll('.tab-panel');
  tabBtns.forEach(function (btn) {
    btn.addEventListener('click', function () {
      var target = btn.getAttribute('data-tab');
      tabBtns.forEach(function (b) {
        b.classList.toggle('active', b === btn);
        b.setAttribute('aria-selected', b === btn ? 'true' : 'false');
      });
      tabPanels.forEach(function (p) {
        p.classList.toggle('active', p.id === 'panel-' + target);
      });
      // Scroll to anchor if URL has hash
      var anchor = document.getElementById(target);
      if (anchor) anchor.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  });

  // Open tab from URL hash (e.g. ?page=services#agricultural)
  var hash = window.location.hash.replace('#', '');
  if (hash) {
    var targetBtn = document.querySelector('[data-tab="' + hash + '"]');
    if (targetBtn) targetBtn.click();
  }

  // ── Fade-up on scroll ──
  var fadeEls = document.querySelectorAll('.fade-up');
  if ('IntersectionObserver' in window) {
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    fadeEls.forEach(function (el) { observer.observe(el); });
  } else {
    fadeEls.forEach(function (el) { el.classList.add('visible'); });
  }

  // ── Form input focus styles ──
  document.querySelectorAll('.form-input').forEach(function (input) {
    input.addEventListener('focus', function () { this.style.borderBottomColor = 'var(--color-black)'; });
    input.addEventListener('blur',  function () {
      if (!this.classList.contains('error')) this.style.borderBottomColor = '';
    });
  });
}());
</script>
</body>
</html>
