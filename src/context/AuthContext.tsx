import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, UserRole, AuditLogItem, SensitivityLevel } from '../types';
import { INITIAL_USERS } from '../data/userData';

interface AuthContextType {
  currentUser: User | null;
  effectiveRole: UserRole;
  simulatedRole: UserRole | null;
  setSimulatedRole: (role: UserRole | null) => void;
  users: User[];
  auditLogs: AuditLogItem[];
  login: (email: string, password: string) => Promise<{ success: boolean; message: string }>;
  logout: () => void;
  updateUserRole: (userId: string, newRole: UserRole) => void;
  createUser: (userData: Omit<User, 'id' | 'createdDate'>) => void;
  deleteUser: (userId: string) => void;
  canAccessSensitive: () => boolean;
  canPublishCMS: () => boolean;
  canUploadArchive: () => boolean;
  canManageUsers: () => boolean;
  logAudit: (action: string, sensitivity: SensitivityLevel, recordId?: string) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const USERS_STORAGE_KEY = 'chengmi_cht_users_v1';
const AUTH_STORAGE_KEY = 'chengmi_cht_auth_session_v1';
const AUDIT_STORAGE_KEY = 'chengmi_cht_audit_logs_v1';

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [users, setUsers] = useState<User[]>(() => {
    try {
      const stored = localStorage.getItem(USERS_STORAGE_KEY);
      if (stored) return JSON.parse(stored);
    } catch {
      // fallback
    }
    return INITIAL_USERS;
  });

  const [currentUser, setCurrentUser] = useState<User | null>(() => {
    try {
      const stored = localStorage.getItem(AUTH_STORAGE_KEY);
      if (stored) return JSON.parse(stored);
    } catch {
      // fallback
    }
    return null;
  });

  const [simulatedRole, setSimulatedRole] = useState<UserRole | null>(null);

  const [auditLogs, setAuditLogs] = useState<AuditLogItem[]>(() => {
    try {
      const stored = localStorage.getItem(AUDIT_STORAGE_KEY);
      if (stored) return JSON.parse(stored);
    } catch {
      // fallback
    }
    return [
      {
        id: 'aud-001',
        timestamp: new Date(Date.now() - 3600000 * 24).toISOString(),
        userEmail: 'donieltripura121@gmail.com',
        action: 'System Initialized: 1900 CHT Regulation & Mong Royal Records cataloged',
        sensitivity: 'public',
      },
      {
        id: 'aud-002',
        timestamp: new Date(Date.now() - 3600000 * 5).toISOString(),
        userEmail: 'donieltripura121@gmail.com',
        action: 'Access Granted: Declassified 1947 Boundary Deliberation Record (RAD-BND-1947)',
        sensitivity: 'declassified',
        recordId: 'arch-004'
      }
    ];
  });

  useEffect(() => {
    try {
      localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(users));
    } catch (e) {
      console.warn('Storage failed', e);
    }
  }, [users]);

  useEffect(() => {
    try {
      if (currentUser) {
        localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(currentUser));
      } else {
        localStorage.removeItem(AUTH_STORAGE_KEY);
      }
    } catch (e) {
      console.warn('Auth session storage failed', e);
    }
  }, [currentUser]);

  useEffect(() => {
    try {
      localStorage.setItem(AUDIT_STORAGE_KEY, JSON.stringify(auditLogs));
    } catch (e) {
      console.warn('Audit logs storage failed', e);
    }
  }, [auditLogs]);

  const effectiveRole: UserRole = simulatedRole || (currentUser ? currentUser.role : 'public_reader');

  const logAudit = (action: string, sensitivity: SensitivityLevel, recordId?: string) => {
    const newLog: AuditLogItem = {
      id: `aud-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
      timestamp: new Date().toISOString(),
      userEmail: currentUser?.email || 'Anonymous Visitor',
      action,
      recordId,
      sensitivity,
    };
    setAuditLogs(prev => [newLog, ...prev.slice(0, 49)]);
  };

  const login = async (email: string, password: string): Promise<{ success: boolean; message: string }> => {
    // Normalization
    const cleanEmail = email.trim().toLowerCase();
    
    // Check credentials against registered users
    const matched = users.find(u => u.email.toLowerCase() === cleanEmail);
    if (!matched) {
      return { success: false, message: 'Invalid credentials. User email not found in archival registry.' };
    }

    if (matched.passwordHash && matched.passwordHash !== password) {
      logAudit(`Failed authentication attempt for email: ${cleanEmail}`, 'restricted');
      return { success: false, message: 'Incorrect password. Please verify your administrative credentials.' };
    }

    setCurrentUser(matched);
    setSimulatedRole(null); // Reset any previous test simulation on real login
    logAudit(`Authenticated session established: ${matched.name} (${matched.role})`, 'public');
    return { success: true, message: `Welcome back, ${matched.name}. Archival clearance level: ${matched.role.toUpperCase()}.` };
  };

  const logout = () => {
    if (currentUser) {
      logAudit(`User signed out: ${currentUser.email}`, 'public');
    }
    setCurrentUser(null);
    setSimulatedRole(null);
  };

  const updateUserRole = (userId: string, newRole: UserRole) => {
    setUsers(prev => prev.map(u => {
      if (u.id === userId) {
        const updated = {
          ...u,
          role: newRole,
          canViewSensitive: ['super_admin', 'archivist', 'researcher'].includes(newRole),
          canPublish: ['super_admin', 'archivist'].includes(newRole),
          canManageUsers: newRole === 'super_admin',
        };
        logAudit(`Admin updated role of ${u.name} (${u.email}) to ${newRole}`, 'restricted');
        return updated;
      }
      return u;
    }));

    // If updating current user
    if (currentUser && currentUser.id === userId) {
      setCurrentUser(prev => prev ? { ...prev, role: newRole } : null);
    }
  };

  const createUser = (userData: Omit<User, 'id' | 'createdDate'>) => {
    const newUser: User = {
      ...userData,
      id: `usr-${Date.now()}`,
      createdDate: new Date().toISOString().split('T')[0],
      canViewSensitive: ['super_admin', 'archivist', 'researcher'].includes(userData.role),
      canPublish: ['super_admin', 'archivist'].includes(userData.role),
      canManageUsers: userData.role === 'super_admin',
    };
    setUsers(prev => [newUser, ...prev]);
    logAudit(`New researcher created: ${newUser.name} with clearance: ${newUser.role}`, 'public');
  };

  const deleteUser = (userId: string) => {
    const target = users.find(u => u.id === userId);
    if (target?.email === 'donieltripura121@gmail.com') {
      alert('The primary Super Admin account cannot be deleted.');
      return;
    }
    setUsers(prev => prev.filter(u => u.id !== userId));
    logAudit(`User removed from registry: ${target?.name} (${target?.email})`, 'restricted');
  };

  const canAccessSensitive = () => {
    return ['super_admin', 'archivist', 'researcher'].includes(effectiveRole);
  };

  const canPublishCMS = () => {
    return ['super_admin', 'archivist'].includes(effectiveRole);
  };

  const canUploadArchive = () => {
    return ['super_admin', 'archivist', 'researcher', 'contributor'].includes(effectiveRole);
  };

  const canManageUsers = () => {
    return effectiveRole === 'super_admin';
  };

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        effectiveRole,
        simulatedRole,
        setSimulatedRole,
        users,
        auditLogs,
        login,
        logout,
        updateUserRole,
        createUser,
        deleteUser,
        canAccessSensitive,
        canPublishCMS,
        canUploadArchive,
        canManageUsers,
        logAudit,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
