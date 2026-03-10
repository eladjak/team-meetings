/**
 * מודל פגישה
 * מייצג את המבנה והלוגיקה של פגישה במערכת
 */

class Meeting {
  constructor({
    id,
    developmentGroupId,
    description,
    startTime,
    endTime,
    room,
    participants,
    status = 'pending',
    recurring = false
  }) {
    this.id = id;
    this.developmentGroupId = developmentGroupId;
    this.description = description;
    this.startTime = new Date(startTime);
    this.endTime = new Date(endTime);
    this.room = room;
    this.participants = participants;
    this.status = status;
    this.recurring = recurring;
  }

  // בדיקת התנגשות עם פגישה אחרת
  hasConflictWith(otherMeeting) {
    return (
      this.room === otherMeeting.room &&
      this.startTime < otherMeeting.endTime &&
      this.endTime > otherMeeting.startTime
    );
  }

  // המרה לפורמט JSON
  toJSON() {
    return {
      id: this.id,
      developmentGroupId: this.developmentGroupId,
      description: this.description,
      startTime: this.startTime.toISOString(),
      endTime: this.endTime.toISOString(),
      room: this.room,
      participants: this.participants,
      status: this.status,
      recurring: this.recurring
    };
  }
}

export default Meeting; 