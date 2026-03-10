# מפרט API - HaDerech Team Meetings 🔌

## כללי
- Base URL: `http://localhost:3010/api`
- פורמט: JSON
- אימות: Bearer Token
- קידוד: UTF-8

## Endpoints

### פגישות 📅

#### קבלת כל הפגישות 

http
GET /meetings


**פרמטרים אופציונליים:**
- `startDate`: תאריך התחלה
- `endDate`: תאריך סיום
- `teamId`: מזהה צוות
- `status`: סטטוס פגישה

**תגובה:**
json
{
"meetings": [
{
"id": 1,
"description": "פגישת צוות",
"startTime": "2024-01-01T09:00:00",
"endTime": "2024-01-01T10:00:00",
"room": "חדר הרצל",
"teamId": 1,
"participants": [...]
}
]
}

#### יצירת פגישה חדשה

http
POST /meetings

**גוף הבקשה:**

json
{
"description": "פגישת צוות",
"startTime": "2024-01-01T09:00:00",
"endTime": "2024-01-01T10:00:00",
"room": "חדר הרצל",
"teamId": 1,
"participants": [1, 2, 3]
}


### משתמשים 👥

#### קבלת כל המשתמשים

http
GET /users


#### עדכון משתמש

http
PUT /users/:id


### צוותים 👥

#### קבלת כל הצוותים

http
GET /teams


## קודי שגיאה

| קוד | משמעות |
|-----|---------|
| 400 | בקשה לא תקינה |
| 401 | לא מורשה |
| 403 | אין הרשאה |
| 404 | לא נמצא |
| 409 | התנגשות |
| 500 | שגיאת שרת |

## דוגמאות

### יצירת פגישה

javascript
const response = await fetch('/api/meetings', {
method: 'POST',
headers: {
'Content-Type': 'application/json',
'Authorization': 'Bearer <token>'
},
body: JSON.stringify({
description: 'פגישת צוות',
startTime: '2024-01-01T09:00:00',
endTime: '2024-01-01T10:00:00',
room: 'חדר הרצל',
teamId: 1,
participants: [1, 2, 3]
})
});


## אבטחה 🔒
- שימוש ב-HTTPS
- אימות באמצעות JWT
- Rate Limiting
- CORS מוגדר
- Validation על כל קלט
