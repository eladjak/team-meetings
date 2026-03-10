# מדריך נגישות - HaDerech Team Meetings 👁️

## תכונות נגישות

### 1. תצוגה והתאמה אישית 🎨
- **גודל טקסט**: ניתן להגדיל/להקטין באמצעות כפתור A+ / A- בסרגל העליון
- **ניגודיות**: מצב רגיל / ניגודיות גבוהה / מצב כהה
- **הפחתת תנועה**: אפשרות לביטול אנימציות
- **כיווניות**: תמיכה מלאה ב-RTL

### 2. ניווט מקלדת ⌨️
- `Tab`: מעבר בין אלמנטים
- `Enter/Space`: הפעלת כפתורים
- `Esc`: סגירת חלונות
- `חצים`: ניווט בלוח השנה

### 3. תמיכה בקורא מסך 🔊
- תיאורים מלאים לכל אלמנט
- הכרזות על שינויי מצב
- תיאורי ARIA מותאמים

### 4. התראות והודעות 📢
- התראות קוליות
- התראות ויזואליות
- רטט במובייל

## למפתחים

### 1. שימוש בהוק הנגישות
javascript
const {
fontSize,
contrast,
reducedMotion,
changeFontSize,
toggleContrast,
toggleMotion
} = useAccessibility();

### 2. הוספת תיאורי ARIA

<button
aria-label="יצירת פגישה חדשה"
aria-describedby="newMeetingDesc"
>


### 3. בדיקות נגישות
- בדיקת WCAG 2.1
- בדיקת ניווט מקלדת
- בדיקת קורא מסך
- בדיקת ניגודיות

## משאבים
- [WCAG 2.1 Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)
- [WAI-ARIA Practices](https://www.w3.org/WAI/ARIA/apg/)
- [Material-UI Accessibility](https://mui.com/material-ui/guides/accessibility/)

