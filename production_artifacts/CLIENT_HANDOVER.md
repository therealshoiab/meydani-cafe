# Client Handover Documentation — Meydani Cafe Website

Dear Meydani Cafe Management,

We are pleased to hand over the complete, premium, responsive website developed for Meydani Cafe in Srinagar. The website is optimized for conversion, features seamless WhatsApp integrations, and has been updated with the design enhancements modeled after the AmberLeaf standard.

---

## 1. Web Coordinates
*   **Live Website URL**: [https://therealshoiab.github.io/meydani-cafe/](https://therealshoiab.github.io/meydani-cafe/)
*   **GitHub Repository**: [https://github.com/therealshoiab/meydani-cafe](https://github.com/therealshoiab/meydani-cafe)

---

## 2. Pages & Features Delivered

### Page 1: Home
- **Hero Banner**: Custom brand logo badge, animated headings, Google and Zomato rating trust badges, and direct action triggers.
- **Quick Info Bar**: Opening hours, landmark directions, and click-to-call phone triggers.
- **Culinary Motion (6 Videos in 2 Rows of 3)**: AmberLeaf-parity 9:16 cinematic video reels showcasing authentic Turkish preparation and ambiance with sound toggle and play badges.
- **Signature Dishes Showcase**: Bestseller tags, Veg/Non-Veg indicators, direct WhatsApp orders, and platform delivery triggers (Zomato in red, Swiggy in yellow/orange).
- **Reviews Marquee**: Continuous marquee featuring verified guest reviews.

### Page 2: Interactive Menu
- **Square (1:1) Food Photography**: Every single menu item (all 29 items) features a dedicated 1:1 square dish photo.
- **Veg & Non-Veg Square Badges**: Distinct green and red culinary badges with bestseller flags.
- **Order Triggers**: Instant "+ Add to WhatsApp Order", red Zomato delivery button, and yellow Swiggy delivery button for every item.
- **Search & Categorization**: Fast instant filtering across Turkish Kababs, Platters, Grills, Beverages, and Desserts.
- **Floating Cart & Multi-Platform Checkout**: Order via WhatsApp, Zomato, or Swiggy.

### Page 3: Photo & Video Gallery (AmberLeaf-Parity)
- **AmberLeaf Aesthetic Parity**: Complete gallery design mirroring the AmberLeaf showcase styled for Meydani Cafe's warm charcoal and gold theme.
- **Category Filter Tabs**: "All Media", "Photos", and "Videos" with count badges.
- **Interactive 3D Parallax Tilt**: Smooth gyro-style card tilting following cursor movement.
- **Hover-to-Play Video Previews**: Reels automatically preview muted on card hover.
- **Fullscreen Lightbox Modal**: High-res viewing with full play controls, keyboard navigation (left/right arrows, ESC), touch swipe support, and social links.

### Page 4: Unified Contact & Reservations (Merged Page)
- **Consolidated Layout**: All redundant elements (address, map, hours, telephone) merged into one clean master reference.
- **Dual-Mode Interactive Tabs**:
  - **Book A Table**: Date bounds, time slot selector, pax stepper, occasion dropdown, and special request field.
  - **Send Inquiry**: Direct message dispatcher for catering, corporate dinners, or private queries.
- **Example Placeholders**: Form inputs display user-specified examples (`name: Shoiab Mushtaq`, `number: 9419600518`).
- **Instant WhatsApp Dispatch**: Formats reservations and messages with emojis and sends them to the WhatsApp host desk (`+91 7780938743`).
- **Curbside Pickup Guide**: 3-step guide for express takeaway pickup on The Bund Road.
- **Interactive Google Map**: Embedded map with one-click "Get Directions" trigger.

### Page 5: About Us
- Narrative story on Turkish hospitality, traditional charcoal grills, and riverside dining along the Jhelum.
- Amenities grid mapping WiFi, AC, prayer room, parking, and river deck views.

### Page 6: Special Offers
- Promotional spotlights for Family Mandi Feast, Turkish Tea Samovar combos, and corporate catering packages.

---

## 3. How to Update Menu Items

All menu categories, dish names, pricing details, photos, and descriptions are read dynamically from a single data file:
1. Locate the file: [src/data/restaurant-data.json](file:///C:/Users/Baha/Documents/Meydani%20cafe/restaurant-website/src/data/restaurant-data.json).
2. Open it in any text editor.
3. Edit the entries inside the `"menu"` block. For example:
   ```json
   {
     "id": 1,
     "name": "Beyti Kabab",
     "category": "Mains",
     "price": 549,
     "description": "Ground lamb or beef, grilled on a skewer and served wrapped in a lavash...",
     "type": "Non-Veg",
     "tags": ["Bestseller", "Must-try"],
     "image": "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=600&auto=format&fit=crop&q=80"
   }
   ```
4. Save the file and push to GitHub. GitHub Actions deploys the updates automatically.

---

## 4. How to Replace Local Media & Videos

- **Videos & Gallery Images**: Located in `/public/images/`.
  - Video reels: `s1.mp4` through `s14.mp4`
  - Photos: `g1.jpg` through `g13.jpg`
  - To add or replace reels, place new MP4 files in this folder and reference them in [Gallery.jsx](file:///C:/Users/Baha/Documents/Meydani%20cafe/restaurant-website/src/pages/Gallery.jsx) or [Home.jsx](file:///C:/Users/Baha/Documents/Meydani%20cafe/restaurant-website/src/pages/Home.jsx).
- **Brand Logo**: Located at `/src/assets/logo.png` and `/public/images/logo.png`. Replace this file to update the logo site-wide.

---

## 5. Contact Configurations
*   **Host Desk WhatsApp**: `+91 7780938743` (for cart checkout, contact inquiries, and table reservations)
*   **Direct Inbound Phone**: `+91 8899058697` (click-to-call)
*   **Instagram Handle**: `@meydani_cafe1` ([https://www.instagram.com/meydani_cafe1/](https://www.instagram.com/meydani_cafe1/))
*   **Facebook Handle**: `meydanicafe1`

---

## 6. Monthly Maintenance Recommendations
1. **Menu Syncing**: Check pricing weekly against delivery apps (Zomato/Swiggy) to ensure consistency.
2. **Asset Backup**: Keep local copies of all custom food and ambiance photographs uploaded to the assets directory.
3. **Analytics Review**: Monitor visitors using GitHub repository insights or link the page to Google Analytics.
