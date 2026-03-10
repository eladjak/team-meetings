/**
 * הוק לניהול הרשאות משתמשים
 * מאפשר בדיקת הרשאות ותפקידים
 * 
 * @module usePermissions
 */

import { useState, useEffect, useCallback } from 'react';

// הגדרת סוגי הרשאות
export const Permissions = {
  VIEW_CALENDAR: 'view_calendar',
  CREATE_MEETING: 'create_meeting',
  EDIT_MEETING: 'edit_meeting',
  DELETE_MEETING: 'delete_meeting',
  MANAGE_TEAMS: 'manage_teams',
  MANAGE_USERS: 'manage_users',
  ADMIN: 'admin'
};

// הגדרת תפקידים והרשאות
const ROLES = {
  ADMIN: [
    Permissions.VIEW_CALENDAR,
    Permissions.CREATE_MEETING,
    Permissions.EDIT_MEETING,
    Permissions.DELETE_MEETING,
    Permissions.MANAGE_TEAMS,
    Permissions.MANAGE_USERS,
    Permissions.ADMIN
  ],
  MANAGER: [
    Permissions.VIEW_CALENDAR,
    Permissions.CREATE_MEETING,
    Permissions.EDIT_MEETING,
    Permissions.DELETE_MEETING,
    Permissions.MANAGE_TEAMS
  ],
  USER: [
    Permissions.VIEW_CALENDAR,
    Permissions.CREATE_MEETING
  ]
};

export const usePermissions = (userRole = 'USER') => {
  const [permissions, setPermissions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // טעינת הרשאות המשתמש
  useEffect(() => {
    console.log('usePermissions: Loading permissions for role:', userRole);
    
    try {
      const rolePermissions = ROLES[userRole.toUpperCase()] || ROLES.USER;
      setPermissions(rolePermissions);
      setIsLoading(false);
    } catch (err) {
      console.error('usePermissions: Error loading permissions:', err);
      setError(err);
      setIsLoading(false);
    }
  }, [userRole]);

  /**
   * בדיקת הרשאה ספציפית
   * @param {string} permission - ההרשאה לבדיקה
   * @returns {boolean} האם למשתמש יש את ההרשאה
   */
  const hasPermission = useCallback((permission) => {
    console.log('usePermissions: Checking permission:', permission);
    return permissions.includes(permission);
  }, [permissions]);

  /**
   * בדיקת מספר הרשאות
   * @param {string[]} requiredPermissions - רשימת ההרשאות לבדיקה
   * @returns {boolean} האם למשתמש יש את כל ההרשאות
   */
  const hasPermissions = useCallback((requiredPermissions) => {
    console.log('usePermissions: Checking multiple permissions:', requiredPermissions);
    return requiredPermissions.every(permission => permissions.includes(permission));
  }, [permissions]);

  /**
   * בדיקה האם המשתמש מנהל
   * @returns {boolean} האם המשתמש מנהל
   */
  const isAdmin = useCallback(() => {
    return hasPermission(Permissions.ADMIN);
  }, [hasPermission]);

  return {
    permissions,
    hasPermission,
    hasPermissions,
    isAdmin,
    isLoading,
    error
  };
}; 