# Client Handover Documentation — Meydani Cafe Website

Dear Meydani Cafe Management,

We are pleased to hand over the complete, premium, responsive website developed for Meydani Cafe in Srinagar. The website is optimized for conversion, features seamless WhatsApp integrations, and has been validated against modern search engine and accessibility guidelines.

---

## 1. Web Coordinates
*   **Live Website URL**: [https://therealshoiab.github.io/meydani-cafe/](https://therealshoiab.github.io/meydani-cafe/)
*   **GitHub Repository**: [https://github.com/therealshoiab/meydani-cafe](https://github.com/therealshoiab/meydani-cafe)

---

## 2. Pages & Features Delivered

### Page 1: Home
- Hero banner with custom brand logo, animated title fades, and Google & Zomato rating trust badges.
- Quick Info strip showing opening hours, location landmarks, and click-to-call direct phone triggers.
- Signature Dishes showcase containing bestseller tags, direct WhatsApp order links, and quick order links for Zomato and Swiggy.
- Infinite scrolling Reviews marquee featuring verified client quotes.
- Instagram strip displaying 3 real, playable video reels embedded directly on the page.

### Page 2: Interactive Menu
- Real-time search bar and filter chips (All, Veg, Non-Veg, and categories).
- Quick Zomato and Swiggy direct links on every menu item card.
- Floating Shopping Cart that updates items, quantities, and prices dynamically.
- Checkout system featuring WhatsApp checkout (green branding), Zomato (red branding), and Swiggy (orange branding) direct order buttons.

### Page 3: Photo Gallery
- Grid displaying Ambiance, Food, and Reels categories loaded with 69 actual Instagram posts/reels playing directly on the page.
- Direct quick-link to open any post or reel in Instagram.
- "Load More" paginated performance control loading 12 items at a time to ensure lightning-fast initial page speed.
- Share CTA linking directly to your Instagram profile.

### Page 4: Table Reservations
- Interactive form restricting dates to valid dining boundaries (today + 30 days max).
- Stepper guest counter, occasion picker, and special request textareas.
- Compiles reservation details into a structured booking message and opens WhatsApp for instant confirmation.

### Page 5: About Us
- Narrative story showcasing Turkish grills, Jhelum riverside deck vibes, and Turkish hospitality pillars.
- Amenities grid mapping WiFi, AC, parking, and river views.

### Page 6: Contact & Timings
- Interactive Google Maps location embed frame.
- Weekly opening hours highlighting today's timings automatically.
- Copy-address clipboard utility.

### Page 7: Offers & Events
- Promotional blocks for Happy Hour, Weekend platters, and catering reservations with a direct WhatsApp coordination link.

---

## 3. How to Update Menu Items

All menu categories, dish names, pricing details, and descriptions are read dynamically from a single data file.
To add, edit, or delete items:
1. Locate the file: [src/data/restaurant-data.json](file:///C:/Users/Baha/Documents/Meydani%20cafe/restaurant-website/src/data/restaurant-data.json).
2. Open it in any text editor.
3. Edit the entries inside the `"menu"` block. For example:
   ```json
   {
     "name": "Adana Kabab",
     "price": 549,
     "description": "Ground lamb or beef, grilled on a skewer...",
     "type": "Non-Veg",
     "tags": ["Bestseller", "Must-try"]
   }
   ```
4. Save the file. The website updates automatically upon push.

---

## 4. How to Replace Placeholder Photos & Logos

- **Brand Logo**: The official brand logo is saved in the `/public/logo.png` and `/src/assets/logo.png` files. You can replace these files with any new PNG image using the same name (`logo.png`) to update the logo across the header and footer.
- **Photos**: Homepage featured images and hero banners are currently loaded from high-resolution, royalty-free URLs.
- To replace them with your own custom photographs:
  1. Save your photos inside the `/src/assets/` folder.
  2. Update the image reference paths inside [Home.jsx](file:///C:/Users/Baha/Documents/Meydani%20cafe/restaurant-website/src/pages/Home.jsx) or [About.jsx](file:///C:/Users/Baha/Documents/Meydani%20cafe/restaurant-website/src/pages/About.jsx) to point to your local assets (e.g. `import heroImage from '../assets/my-hero.jpg'`).

---

## 5. Contact Configurations
*   **Takeaway & Cart WhatsApp Number**: `+917780938743` (for cart checkout and reservations dispatch)
*   **Direct Inbound Call Hotline**: `+918899058697` (linked to click-to-call)
*   **Instagram Handle**: `@meydani_cafe1` (URLs: `https://www.instagram.com/meydani_cafe1/`)
*   **Facebook Handle**: `meydanicafe1`

---

## 6. Monthly Maintenance Recommendations
1. **Menu Syncing**: Check pricing weekly against delivery apps (Zomato/Swiggy) to ensure consistency.
2. **Asset Backup**: Keep local copies of all custom food and ambiance photographs uploaded to the assets directory.
3. **Analytics Review**: Monitor visitors using GitHub repository insights or link the page to Google Analytics.
