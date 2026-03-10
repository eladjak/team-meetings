# יישום נגישות - HaDerech Team Meetings 👁️

## 1. תשתית נגישות 🛠️

### הוקים ושירותים 
javascript
// src/hooks/useAccessibility.js
export const useAccessibility = () => {
const [fontSize, setFontSize] = useState(100);
const [highContrast, setHighContrast] = useState(false);
const [reducedMotion, setReducedMotion] = useState(false);
// ...
};
// src/hooks/useAriaAnnouncer.js
export const useAriaAnnouncer = () => {
const announce = (message) => {
// הכרזה על שינויים למשתמשי קורא מסך
};
};


### 2. רכיבי ממשק נגישים 🎨
javascript
// src/components/accessibility/AccessibilityMenu.jsx
<Menu>
<MenuItem>
<FontSizeControls />
</MenuItem>
<MenuItem>
<ContrastToggle />
</MenuItem>
<MenuItem>
<MotionToggle />
</MenuItem>
</Menu>


## 3. יישום בפועל 📋

### תמיכה בקורא מסך
- תיאורי ARIA לכל רכיב
- הכרזות על שינויי מצב
- תיאורים מלאים לפעולות

### ניווט מקלדת
- מיקוד ברור וגלוי
- קיצורי מקלדת מוגדרים
- ניווט לוגי

### התאמות תצוגה
- גדלי טקסט מותאמים
- ניגודיות גבוהה
- הפחתת אנימציות

## 4. בדיקות נגישות 🧪

### בדיקות אוטומטיות
javascript
// tests/accessibility/menu.test.js
describe('Accessibility Menu', () => {
it('should be keyboard navigable', () => {
// בדיקת ניווט מקלדת
});
it('should announce changes', () => {
// בדיקת הכרזות
});
});
Apply
Copy


### בדיקות ידניות
- מעבר על WCAG 2.1
- בדיקה עם קורא מסך
- בדיקת ניגודיות צבעים

## 5. רשימת תיוג לפיתוח 📝

### HTML סמנטי
- [ ] שימוש בתגיות סמנטיות
- [ ] מבנה כותרות נכון
- [ ] תיאורי alt לתמונות

### ARIA
- [ ] תפקידים (roles)
- [ ] תכונות (properties)
- [ ] מצבים (states)

### מקלדת
- [ ] מיקוד ברור
- [ ] סדר טאב הגיוני
- [ ] קיצורי דרך

### חזותי
- [ ] ניגודיות מספקת
- [ ] גודל טקסט מתכוונן
- [ ] אינדיקציות ברורות

## 6. משאבים נוספים 📚
- [WCAG 2.1 Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)
- [WAI-ARIA Practices](https://www.w3.org/WAI/ARIA/apg/)
- [Material-UI Accessibility](https://mui.com/material-ui/guides/accessibility/)