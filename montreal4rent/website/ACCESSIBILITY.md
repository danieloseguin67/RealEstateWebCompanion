# Accessibility Improvements for Montreal4Rent

## Overview
This document outlines the accessibility improvements made to the Montreal4Rent website to ensure a better experience for non-visual users (screen reader users) and keyboard-only users.

## Key Improvements Implemented

### 1. Home Page Accessibility

#### Semantic HTML & ARIA Landmarks
- **Hero Section**: Added `aria-label="Welcome banner"` and `role="presentation"` to decorative elements
- **Search Section**: Added `aria-label="Search and filter apartments"` for clear section identification
- **Featured Apartments**: Added `aria-label="Available apartments"` to identify the main content area
- **About Agent**: Added `aria-label="Contact information"` for the contact section

#### Interactive Elements
All buttons and links now have proper ARIA labels that describe their purpose:
- **Filter Toggle**: `aria-expanded`, `aria-controls`, and descriptive `aria-label`
- **View Details Button**: Includes apartment name in label
- **Book Tour Button**: Includes apartment name in label
- **Clear Filters**: Clear description of action

#### Form Accessibility
- All form inputs have explicit `<label>` elements with `for` attributes
- Select dropdowns have descriptive `aria-label` attributes
- Checkbox groups use `role="group"` with `aria-labelledby`
- Form controls have unique `id` attributes for proper label association

#### Live Regions (aria-live)
Screen readers will announce changes dynamically:
- **Loading State**: `role="status"` and `aria-live="polite"` announces when content is loading
- **Search Results**: `aria-live="polite"` on the apartments grid announces result changes
- **No Results Message**: `role="status"` and `aria-live="polite"` announces when no apartments match filters

This means the screen reader will pause and announce these updates instead of continuously reading through content.

#### Apartment Card Structure
Each apartment card includes:
- **Article Element**: Semantic `<article>` tag with `role="listitem"`
- **Comprehensive Label**: Full description including title, bedrooms, bathrooms, size, location, price, and availability
- **Image Alt Text**: Descriptive text like "Photo of [Apartment Name] in [Area]"
- **Definition List**: Proper `<dl>`, `<dt>`, `<dd>` structure for specifications
- **Hidden Labels**: Screen reader-only labels (`<dt class="sr-only">`) for icons
- **Status Badges**: Role and aria-label for availability and furnishing status

### 2. Global Accessibility Features

#### CSS Utilities
- **`.sr-only`**: Class for screen reader-only content (visually hidden but announced)
- **`.skip-link`**: Navigation skip link for keyboard users (when implemented)
- **Focus Styles**: High-contrast focus indicators (3px blue outline) for all interactive elements

#### Focus Management
- Enhanced focus styles using `:focus-visible` (only shows for keyboard navigation)
- Focus-within support for card containers
- 3px outline with 2px offset for clear visibility
- Uses `--trust-navy` color (#2596be) for consistency

### 3. Screen Reader Behavior

#### How It Works Now
1. **Page Load**: Screen reader announces the page title and main sections
2. **Navigation**: Users can navigate by landmarks (sections with aria-labels)
3. **Interactive Elements**: Screen reader pauses at buttons and links, announces their purpose
4. **Dynamic Content**: When filters change or results load, announcements are made via aria-live regions
5. **Apartment Cards**: Each card is treated as a discrete item with a complete description

#### Example Screen Reader Flow
```
"Welcome banner, region"
"Find Your Perfect Home in Montreal"
[User navigates down]
"Search and filter apartments, region"
"Find Your Perfect Apartment"
"Show search filters, button, collapsed"
[User presses button]
"Search filters, region"
"Select neighborhood or area, combobox"
[User can interact with filter]
"Available apartments, region"
"Search results, list"
"Luxurious 2 Bedroom in Downtown, 2 bedrooms, 1 bathroom, 850 square feet, Downtown, 2500 dollars per month, Available, article"
"View details for Luxurious 2 Bedroom in Downtown, link"
"Book a tour for Luxurious 2 Bedroom in Downtown, button"
```

## Best Practices for Future Development

### When Adding New Components

1. **Use Semantic HTML**
   - `<article>` for self-contained content
   - `<section>` with `aria-label` for major page regions
   - `<nav>` for navigation sections
   - `<main>` for main content
   - `<aside>` for complementary content

2. **Add ARIA Labels**
   ```html
   <!-- Good -->
   <button aria-label="Close dialog">×</button>
   <section aria-label="Customer reviews">
   
   <!-- Bad -->
   <button>×</button>
   <div class="reviews">
   ```

3. **Use aria-live for Dynamic Content**
   ```html
   <!-- Polite: announces when user is idle -->
   <div aria-live="polite" role="status">3 new messages</div>
   
   <!-- Assertive: announces immediately (use sparingly) -->
   <div aria-live="assertive" role="alert">Error: Payment failed</div>
   ```

4. **Hide Decorative Content**
   ```html
   <!-- Icons that are purely decorative -->
   <i class="fas fa-bed" aria-hidden="true"></i>
   <span>2 Bedrooms</span>
   
   <!-- Background images -->
   <div class="hero-background" role="presentation" aria-hidden="true">
   ```

5. **Provide Alternative Text**
   ```html
   <!-- Images -->
   <img src="apartment.jpg" alt="Modern living room with large windows">
   
   <!-- Not just the filename -->
   <img src="IMG_1234.jpg" alt="IMG_1234"> <!-- Bad -->
   ```

### Testing Accessibility

#### Screen Reader Testing
- **Windows**: NVDA (free) or JAWS
- **Mac**: VoiceOver (built-in, press Cmd+F5)
- **Mobile**: TalkBack (Android) or VoiceOver (iOS)

#### Keyboard Navigation Testing
1. Use only Tab, Shift+Tab, Enter, Space, and Arrow keys
2. Ensure all interactive elements are reachable
3. Verify focus indicators are visible
4. Check that focus order is logical

#### Automated Testing Tools
- **axe DevTools**: Browser extension for accessibility testing
- **WAVE**: Web accessibility evaluation tool
- **Lighthouse**: Chrome DevTools accessibility audit

### Common Accessibility Pitfalls to Avoid

❌ **Don't Do This**:
```html
<!-- Generic link text -->
<a href="/apartment/1">Click here</a>

<!-- Missing labels -->
<input type="text" placeholder="Email">

<!-- Divs as buttons -->
<div onclick="openModal()">Open</div>

<!-- Empty alt attributes for important images -->
<img src="apartment.jpg" alt="">
```

✅ **Do This Instead**:
```html
<!-- Descriptive link text -->
<a href="/apartment/1">View details for Downtown Studio</a>

<!-- Proper labels -->
<label for="email">Email Address</label>
<input id="email" type="text" placeholder="example@email.com">

<!-- Actual buttons -->
<button onclick="openModal()" aria-label="Open apartment details">Open</button>

<!-- Descriptive alt text -->
<img src="apartment.jpg" alt="Modern studio apartment with city view">
```

## WCAG 2.1 Compliance

The implemented changes help meet WCAG 2.1 Level AA standards:

- ✅ **1.1.1 Non-text Content**: All images have alt text
- ✅ **1.3.1 Info and Relationships**: Proper semantic HTML and ARIA roles
- ✅ **2.1.1 Keyboard**: All functionality available via keyboard
- ✅ **2.4.3 Focus Order**: Logical tab order maintained
- ✅ **2.4.7 Focus Visible**: Clear focus indicators
- ✅ **3.2.4 Consistent Identification**: Interactive elements identified consistently
- ✅ **4.1.2 Name, Role, Value**: All form inputs properly labeled
- ✅ **4.1.3 Status Messages**: aria-live regions for dynamic content

## Additional Resources

- [WebAIM: Screen Reader Testing](https://webaim.org/articles/screenreader_testing/)
- [ARIA Authoring Practices Guide](https://www.w3.org/WAI/ARIA/apg/)
- [WCAG 2.1 Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)
- [MDN Web Docs: Accessibility](https://developer.mozilla.org/en-US/docs/Web/Accessibility)

## Support

For questions about accessibility or to report accessibility issues, please contact the development team or file an issue in the project repository.

---

**Last Updated**: February 20, 2026
**Implemented By**: Development Team
**Standards**: WCAG 2.1 Level AA
