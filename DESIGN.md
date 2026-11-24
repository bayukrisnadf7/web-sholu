# Sholu visual system

The landing page introduces the real application. Use the supplied screens as the principal imagery, with a calm, spacious layout that keeps the product legible.

- Preserve the deep navy primary color `#070346`, off-white background `#fdfcfe`, and restrained lavender accents from the application.
- Use Lora for the wordmark and major headings; DM Sans for body text and controls. Maintain readable contrast, balanced heading wraps, and tracking no tighter than -0.04em.
- Use generous section spacing, plain text groups, and thin dividers. Avoid repeated section kickers, decorative arches, icon tiles, nested cards, and gradient decoration.
- Primary actions use navy with a 12px radius. EN/ID uses a compact segmented control with a clearly selected state; gallery controls use an underline.
- Display the original application screenshots without redraws. Retain their aspect ratio and provide localized alternative text.
- Collapse navigation below 900px and content columns below 600px. Keep EN/ID visible beside the mobile menu; support 320px screens without horizontal scrolling.
- Preserve visible keyboard focus, 44px touch targets, native disclosures and dialog behavior, and reduced-motion support.

The hero is text-only, with centered tagline, supporting copy, and actions. Keep app screenshots in the experience sections.

Navbar, centered hero, and the three-item feature strip together fill at least one small viewport height. The feature strip sits at the bottom of that first screen; content can grow naturally on short screens or with enlarged text.

The closing section uses two columns: left-aligned copy and demo action on the left, download QR on the right. The QR caption stays within its 200px image width with an 8px gap. Use a square image frame to hide empty vertical margins while retaining the QR quiet zone. Stack the columns below 600px.

Scroll motion uses the vendored Scroll Craft runtime (`src/vendor/scrollcraft`) with one fixed WebGL sand canvas behind the entire page, from navbar to footer. Sections remain transparent so the same landscape stays visible rather than restarting per section. Lavender dunes, stable grain cells and slow wind reference SalatBuddy's procedural sand. Global scroll distance in viewport units drives the wind continuously in both directions; a bounded swell changes the dune height without saturating at the end of the hero. Keep the reading area quiet and the original screenshots/QR opaque.

Scroll Craft separately supplies hero and screenshot parallax plus one-time copy entrances in the guide and personalization sections. No pinning, hidden text or added scroll distance. Render the global shader at 30 fps with DPR capped at 1.5; pause when the tab is hidden. Reduced motion renders a static scene, and WebGL failure retains the quiet page fallback. The page scroll runtime is independent of WebGL availability.
