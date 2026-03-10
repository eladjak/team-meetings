/**
 * הגדרת בסיס נתונים למערכת ניהול פגישות
 * מותאם למבנה הנתונים הקיים ב-mockMeetings
 */

-- יצירת בסיס הנתונים
CREATE DATABASE team_meetings;
GO

USE team_meetings;
GO

-- טבלת צוותי פיתוח
CREATE TABLE development_groups (
    id INT IDENTITY(1,1) PRIMARY KEY,
    name NVARCHAR(100) NOT NULL,
    description NVARCHAR(MAX),
    color NVARCHAR(7),
    icon NVARCHAR(10)
);

-- טבלת חדרים
CREATE TABLE rooms (
    id INT IDENTITY(1,1) PRIMARY KEY,
    name NVARCHAR(100) NOT NULL,
    capacity INT,
    equipment NVARCHAR(MAX),
    location NVARCHAR(100),
    is_active BIT DEFAULT 1
);

-- טבלת משתמשים
CREATE TABLE users (
    id INT IDENTITY(1,1) PRIMARY KEY,
    name NVARCHAR(100) NOT NULL,
    email NVARCHAR(255) UNIQUE,
    development_group_id INT,
    is_active BIT DEFAULT 1,
    CONSTRAINT FK_Users_DevelopmentGroups 
        FOREIGN KEY (development_group_id) 
        REFERENCES development_groups(id)
);

-- טבלת פגישות
CREATE TABLE meetings (
    id INT IDENTITY(1,1) PRIMARY KEY,
    development_group_id INT,
    description NVARCHAR(MAX) NOT NULL,
    details NVARCHAR(MAX),
    start_time DATETIME NOT NULL,
    end_time DATETIME NOT NULL,
    room_id INT,
    status NVARCHAR(20) CHECK (status IN ('confirmed', 'pending', 'cancelled')) DEFAULT 'pending',
    priority NVARCHAR(20) CHECK (priority IN ('low', 'medium', 'high')) DEFAULT 'medium',
    recurring BIT DEFAULT 0,
    created_at DATETIME DEFAULT GETDATE(),
    CONSTRAINT FK_Meetings_DevelopmentGroups 
        FOREIGN KEY (development_group_id) 
        REFERENCES development_groups(id),
    CONSTRAINT FK_Meetings_Rooms 
        FOREIGN KEY (room_id) 
        REFERENCES rooms(id)
);

-- טבלת משתתפים בפגישה
CREATE TABLE meeting_participants (
    meeting_id INT,
    user_id INT,
    CONSTRAINT PK_MeetingParticipants PRIMARY KEY (meeting_id, user_id),
    CONSTRAINT FK_MeetingParticipants_Meetings 
        FOREIGN KEY (meeting_id) 
        REFERENCES meetings(id)
        ON DELETE CASCADE,
    CONSTRAINT FK_MeetingParticipants_Users 
        FOREIGN KEY (user_id) 
        REFERENCES users(id)
);

-- טבלת תגיות
CREATE TABLE tags (
    id INT IDENTITY(1,1) PRIMARY KEY,
    name NVARCHAR(50) UNIQUE NOT NULL
);

-- טבלת תגיות לפגישות
CREATE TABLE meeting_tags (
    meeting_id INT,
    tag_id INT,
    CONSTRAINT PK_MeetingTags PRIMARY KEY (meeting_id, tag_id),
    CONSTRAINT FK_MeetingTags_Meetings 
        FOREIGN KEY (meeting_id) 
        REFERENCES meetings(id)
        ON DELETE CASCADE,
    CONSTRAINT FK_MeetingTags_Tags 
        FOREIGN KEY (tag_id) 
        REFERENCES tags(id)
);

-- אינדקסים
CREATE INDEX IX_Meetings_StartTime ON meetings(start_time);
CREATE INDEX IX_Meetings_Status ON meetings(status);
CREATE INDEX IX_Meetings_DevelopmentGroup ON meetings(development_group_id);
CREATE INDEX IX_MeetingParticipants_User ON meeting_participants(user_id);

-- הכנסת נתוני דוגמה - צוותים
INSERT INTO development_groups (name, description, icon) VALUES
(N'UI Team', N'צוות פיתוח ממשק משתמש', N'💻'),
(N'Mobile Team', N'צוות פיתוח אפליקציות', N'📱'),
(N'React Team', N'צוות פיתוח React', N'⚛️'),
(N'Backend Team', N'צוות פיתוח צד שרת', N'🔧'),
(N'DevOps Team', N'צוות תשתיות', N'🛠️'),
(N'QA Team', N'צוות בדיקות', N'🔍'),
(N'Data Science Team', N'צוות מדע הנתונים', N'📊'),
(N'Security Team', N'צוות אבטחת מידע', N'🔒');

-- הכנסת נתוני דוגמה - חדרים
INSERT INTO rooms (name, capacity, equipment) VALUES
(N'Innovation Lab', 20, N'["מקרן", "לוח", "מערכת ועידה"]'),
(N'Red Room', 8, N'["מקרן", "לוח"]'),
(N'Green Room', 12, N'["מקרן", "לוח", "מערכת ועידה"]'),
(N'Blue Room', 10, N'["מקרן", "לוח"]'),
(N'New York Room', 15, N'["מקרן", "לוח", "מערכת ועידה"]'),
(N'Tokyo Room', 8, N'["מקרן", "לוח"]'),
(N'Quiet Room', 4, N'["לוח"]'),
(N'Brainstorm Room', 6, N'["לוח", "ציוד סיעור מוחות"]'),
(N'Large Board Room', 25, N'["מקרן", "לוח", "מערכת ועידה", "ציוד הקלטה"]');

-- הכנסת נתוני דוגמה - תגיות נפוצות
INSERT INTO tags (name) VALUES
(N'UI'), (N'UX'), (N'Design Review'), (N'Sprint Review'),
(N'Architecture'), (N'Performance'), (N'Security'),
(N'Backend'), (N'Frontend'), (N'Mobile'), (N'DevOps'),
(N'Testing'), (N'Planning'), (N'Review'), (N'Training');

GO

-- טריגר לעדכון זמן יצירה
CREATE TRIGGER TR_Meetings_UpdateTimestamp
ON meetings
AFTER UPDATE
AS
BEGIN
    UPDATE meetings 
    SET created_at = GETDATE()
    FROM meetings m
    INNER JOIN inserted i ON m.id = i.id;
END;
GO