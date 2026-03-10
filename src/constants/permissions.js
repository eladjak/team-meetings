/**
 * הגדרות הרשאות ותפקידים במערכת
 */

export const PERMISSIONS = {
  // הרשאות צפייה
  VIEW_CALENDAR: 'view_calendar',
  VIEW_MEETINGS: 'view_meetings',
  VIEW_REPORTS: 'view_reports',
  
  // הרשאות עריכה
  CREATE_MEETING: 'create_meeting',
  EDIT_MEETING: 'edit_meeting',
  DELETE_MEETING: 'delete_meeting',
  
  // הרשאות ניהול
  MANAGE_TEAMS: 'manage_teams',
  MANAGE_ROOMS: 'manage_rooms',
  MANAGE_USERS: 'manage_users',
  
  // הרשאות מערכת
  SYSTEM_ADMIN: 'system_admin',
  MANAGE_SETTINGS: 'manage_settings'
};

export const ROLES = {
  ADMIN: {
    name: 'מנהל מערכת',
    permissions: Object.values(PERMISSIONS)
  },
  MANAGER: {
    name: 'מנהל',
    permissions: [
      PERMISSIONS.VIEW_CALENDAR,
      PERMISSIONS.VIEW_MEETINGS,
      PERMISSIONS.VIEW_REPORTS,
      PERMISSIONS.CREATE_MEETING,
      PERMISSIONS.EDIT_MEETING,
      PERMISSIONS.DELETE_MEETING,
      PERMISSIONS.MANAGE_TEAMS,
      PERMISSIONS.MANAGE_ROOMS
    ]
  },
  USER: {
    name: 'משתמש',
    permissions: [
      PERMISSIONS.VIEW_CALENDAR,
      PERMISSIONS.VIEW_MEETINGS,
      PERMISSIONS.CREATE_MEETING
    ]
  },
  GUEST: {
    name: 'אורח',
    permissions: [
      PERMISSIONS.VIEW_CALENDAR,
      PERMISSIONS.VIEW_MEETINGS
    ]
  }
};

// פונקציות עזר
export const hasPermission = (userRole, permission) => {
  console.log('permissions: Checking permission:', { userRole, permission });
  return ROLES[userRole]?.permissions.includes(permission) || false;
};

export const getRolePermissions = (role) => {
  console.log('permissions: Getting permissions for role:', role);
  return ROLES[role]?.permissions || [];
}; 