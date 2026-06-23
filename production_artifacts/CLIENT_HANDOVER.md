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
- Hero banner with animated title fades and Google & Zomato rating trust badges.
- Quick Info strip showing opening hours, location landmarks, and click-to-call direct phone triggers.
- Signature Dishes showcase containing bestseller tags and direct WhatsApp order links.
- Infinite scrolling Reviews marquee featuring verified client quotes.
- Instagram gallery placeholders linked to your official handle.

### Page 2: Interactive Menu
- Real-time search bar and filter chips (All, Veg, Non-Veg, and categories).
- Floating Shopping Cart that updates items, quantities, and prices dynamically.
- Checkout system that formats ordered dishes into a pre-filled text block and opens WhatsApp to place the order.

### Page 3: Photo Gallery
- Grid displaying Ambiance, Food, and Event categories.
- Immersive Lightbox overlay showing full-screen views with next/previous controls.
- Upload CTA linking directly to your Instagram profile.

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
- Promotional blocks for Happy Hour, Weekend platters, and catering reservations.
- Subscription form saving newsletter emails in local storage lists.

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

## 4. How to Replace Placeholder Photos

- Homepage featured images and hero banners are currently loaded from high-resolution, royalty-free URLs.
- To replace them with your own custom photographs:
  1. Save your photos inside the `/src/assets/` folder.
  2. Update the image reference paths inside [Home.jsx](file:///C:/Users/Baha/Documents/Meydani%20cafe/restaurant-website/src/pages/Home.jsx) or [About.jsx](file:///C:/Users/Baha/Documents/Meydani%20cafe/restaurant-website/src/pages/About.jsx) to point to your local assets (e.g. `import heroImage from '../assets/my-hero.jpg'`).

---

## 5. Contact Configurations
*   **Takeaway & Cart WhatsApp Number**: `+917780938743` (for cart checkout and reservations dispatch)
*   **Direct Inbound Call Hotline**: `+918899058697` (linked to click-to-call buttons)
*   **Instagram Handle**: `@meydani_cafe1`
*   **Facebook Handle**: `meydanicafe1`

---

## 6. Monthly Maintenance Recommendations
1. **Menu Syncing**: Check pricing weekly against delivery apps (Zomato/Swiggy) to ensure consistency.
2. **Newsletter Management**: Periodically extract registered emails from local storage (or link it to a database like Mailchimp).
3. **Asset Backup**: Keep local copies of all custom food and ambiance photographs uploaded to the assets directory.
