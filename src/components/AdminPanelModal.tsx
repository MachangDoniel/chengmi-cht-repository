import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { User, UserRole } from '../types';
import {
  ShieldCheck,
  UserCheck,
  UserX,
  Plus,
  X,
  Sliders,
  Eye,
  Key,
  Database,
  History,
  AlertCircle,
  FileCheck
} from 'lucide-react';

interface AdminPanelModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AdminPanelModal: React.FC<AdminPanelModalProps> = ({ isOpen, onClose }) => {
  const {
    currentUser,
    users,
    auditLogs,
    effectiveRole,
    simulatedRole,
    setSimulatedRole,
    updateUserRole,
    createUser,
    deleteUser,
  } = useAuth();

  const [activeTab, setActiveTab] = useState<'users' | 'testing' | 'audit'>('users');

  // New User Form State
  const [isAddingUser, setIsAddingUser] = useState(false);
  const [newName, setNewName] = useState('');
  const [newEmail, setNewEmail] = useState('');
  const [newRole, setNewRole] = useState<UserRole>('researcher');
  const [newInstitution, setNewInstitution] = useState('');
  const [newPassword, setNewPassword] = useState('');

  if (!isOpen) return null;

  const handleCreateUser = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName.trim() || !newEmail.trim()) {
      alert('Name and Email are required.');
      return;
    }

    createUser({
      name: newName.trim(),
      email: newEmail.trim().toLowerCase(),
      role: newRole,
      institution: newInstitution.trim() || 'Chittagong Hill Tracts Historical Research Initiative',
      canViewSensitive: ['super_admin', 'archivist', 'researcher'].includes(newRole),
      canPublish: ['super_admin', 'archivist'].includes(newRole),
      canManageUsers: newRole === 'super_admin',
      passwordHash: newPassword || 'ChtSecret#2025',
    });

    setIsAddingUser(false);
    setNewName('');
    setNewEmail('');
    setNewInstitution('');
    setNewPassword('');
  };

  const roleDescriptions: Record<UserRole, string> = {
    super_admin: 'Full clearance: manage users, view all restricted archives, edit timeline, publish dispatches.',
    archivist: 'High clearance: view all sensitive records, verify submissions, upload archives, publish dispatches.',
    researcher: 'Academic clearance: decrypt sensitive customary/land records, view full citations, submit research.',
    contributor: 'Field clearance: upload public archive drafts. Sensitive records remain locked.',
    public_reader: 'Visitor clearance: read public archives and timeline only. Restricted records are locked.',
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-[#FBF9F5] dark:bg-stone-900 border border-stone-300 dark:border-stone-700 rounded-2xl max-w-4xl w-full max-h-[92vh] overflow-y-auto p-6 sm:p-8 space-y-6 shadow-2xl text-stone-900 dark:text-stone-100 transition-colors">
        {/* Header */}
        <div className="flex items-start justify-between border-b border-stone-200 dark:border-stone-800 pb-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-xs font-mono font-bold text-amber-900 dark:text-amber-400 uppercase tracking-widest">
              <ShieldCheck className="w-4 h-4 text-emerald-700 dark:text-emerald-400" />
              <span>Administrative Console & Role Simulation</span>
            </div>
            <h2 className="text-2xl font-serif font-black text-stone-900 dark:text-stone-100">
              Admin Governance & Testing Panel
            </h2>
            <p className="text-xs font-serif text-stone-600 dark:text-stone-400">
              Manage user roles, verify sensitive record clearance, and simulate user views across all 5 authority tiers.
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-stone-400 hover:text-stone-800 dark:hover:text-stone-200 rounded-lg transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Credentials Reminder Box */}
        <div className="p-4 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-300 dark:border-emerald-800/80 rounded-xl flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs font-serif text-emerald-950 dark:text-emerald-200">
          <div className="space-y-0.5">
            <div className="font-bold flex items-center gap-1.5 text-emerald-900 dark:text-emerald-300 text-sm">
              <Key className="w-4 h-4 text-emerald-800 dark:text-emerald-400" />
              <span>Configured Test Admin Credentials</span>
            </div>
            <p className="text-emerald-800 dark:text-emerald-300">
              Email: <code className="bg-emerald-100/80 dark:bg-emerald-900/60 px-1.5 py-0.5 rounded font-mono font-bold">donieltripura121@gmail.com</code> · Password: <code className="bg-emerald-100/80 dark:bg-emerald-900/60 px-1.5 py-0.5 rounded font-mono font-bold">Qazxsw@121</code>
            </p>
          </div>
          <span className="text-[11px] font-sans font-bold text-emerald-800 dark:text-emerald-300 bg-white/80 dark:bg-emerald-900/80 border border-emerald-300 dark:border-emerald-700 px-2.5 py-1 rounded-full">
            Super Admin Status
          </span>
        </div>

        {/* Tab Navigation */}
        <div className="flex items-center gap-2 border-b border-stone-200 dark:border-stone-800 text-xs font-serif font-semibold">
          <button
            onClick={() => setActiveTab('users')}
            className={`pb-2.5 px-3 transition-colors cursor-pointer ${
              activeTab === 'users'
                ? 'border-b-2 border-stone-900 dark:border-amber-400 text-stone-900 dark:text-white font-bold'
                : 'text-stone-500 dark:text-stone-400 hover:text-stone-800 dark:hover:text-stone-200'
            }`}
          >
            User Role Management ({users.length})
          </button>
          <button
            onClick={() => setActiveTab('testing')}
            className={`pb-2.5 px-3 transition-colors cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'testing'
                ? 'border-b-2 border-stone-900 dark:border-amber-400 text-stone-900 dark:text-white font-bold'
                : 'text-stone-500 dark:text-stone-400 hover:text-stone-800 dark:hover:text-stone-200'
            }`}
          >
            <Sliders className="w-3.5 h-3.5" />
            <span>Role Testing & Simulation</span>
            {simulatedRole && (
              <span className="w-2 h-2 rounded-full bg-amber-600 animate-pulse" />
            )}
          </button>
          <button
            onClick={() => setActiveTab('audit')}
            className={`pb-2.5 px-3 transition-colors cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'audit'
                ? 'border-b-2 border-stone-900 dark:border-amber-400 text-stone-900 dark:text-white font-bold'
                : 'text-stone-500 dark:text-stone-400 hover:text-stone-800 dark:hover:text-stone-200'
            }`}
          >
            <History className="w-3.5 h-3.5" />
            <span>Archival Security Audit Log</span>
          </button>
        </div>

        {/* TAB 1: User Role Management */}
        {activeTab === 'users' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <p className="text-xs font-serif text-stone-600">
                Grant or revoke clearance levels for researchers, circle archivists, and contributors.
              </p>
              <button
                onClick={() => setIsAddingUser(true)}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-white bg-stone-900 hover:bg-stone-800 rounded transition-colors cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Register New Researcher</span>
              </button>
            </div>

            {/* Users Table */}
            <div className="overflow-x-auto border border-stone-200 dark:border-stone-700 rounded-xl bg-white dark:bg-stone-850">
              <table className="w-full text-left text-xs font-serif">
                <thead className="bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300 font-sans uppercase tracking-wider text-[11px] border-b border-stone-200 dark:border-stone-700">
                  <tr>
                    <th className="py-2.5 px-4">Researcher Name</th>
                    <th className="py-2.5 px-4">Email</th>
                    <th className="py-2.5 px-4">Institution</th>
                    <th className="py-2.5 px-4">Clearance Role</th>
                    <th className="py-2.5 px-4">Sensitive Access</th>
                    <th className="py-2.5 px-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-100 dark:divide-stone-800">
                  {users.map((u) => (
                    <tr key={u.id} className="hover:bg-stone-50/60 dark:hover:bg-stone-800/50 transition-colors">
                      <td className="py-3 px-4 font-semibold text-stone-900 dark:text-stone-100">
                        {u.name}
                        {u.email === 'donieltripura121@gmail.com' && (
                          <span className="ml-1.5 text-[10px] bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 px-1.5 py-0.5 rounded font-sans font-normal border border-emerald-300 dark:border-emerald-800">
                            Primary Admin
                          </span>
                        )}
                      </td>
                      <td className="py-3 px-4 font-mono text-stone-600 dark:text-stone-400 text-[11px]">
                        {u.email}
                      </td>
                      <td className="py-3 px-4 text-stone-600 dark:text-stone-400 truncate max-w-[160px]">
                        {u.institution || '—'}
                      </td>
                      <td className="py-3 px-4">
                        <select
                          value={u.role}
                          onChange={(e) => updateUserRole(u.id, e.target.value as UserRole)}
                          disabled={u.email === 'donieltripura121@gmail.com'}
                          className="px-2 py-1 bg-stone-50 dark:bg-stone-800 border border-stone-300 dark:border-stone-700 rounded text-xs font-serif text-stone-800 dark:text-stone-200 cursor-pointer disabled:opacity-50"
                        >
                          <option value="super_admin">Super Admin</option>
                          <option value="archivist">Senior Archivist</option>
                          <option value="researcher">Academic Researcher</option>
                          <option value="contributor">Field Contributor</option>
                          <option value="public_reader">Public Reader</option>
                        </select>
                      </td>
                      <td className="py-3 px-4">
                        {['super_admin', 'archivist', 'researcher'].includes(u.role) ? (
                          <span className="text-emerald-700 dark:text-emerald-400 font-semibold flex items-center gap-1">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 dark:bg-emerald-400" />
                            <span>Granted</span>
                          </span>
                        ) : (
                          <span className="text-stone-400 dark:text-stone-500">Locked</span>
                        )}
                      </td>
                      <td className="py-3 px-4 text-right">
                        {u.email !== 'donieltripura121@gmail.com' && (
                          <button
                            onClick={() => deleteUser(u.id)}
                            className="text-stone-400 hover:text-red-700 dark:hover:text-red-400 p-1 transition-colors cursor-pointer"
                            title="Remove User"
                          >
                            <UserX className="w-4 h-4" />
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Add User Modal / Form Drawer */}
            {isAddingUser && (
              <div className="p-5 bg-white dark:bg-stone-850 border border-stone-300 dark:border-stone-700 rounded-xl space-y-4">
                <div className="flex items-center justify-between border-b border-stone-200 dark:border-stone-750 pb-2">
                  <h4 className="text-sm font-serif font-bold text-stone-900 dark:text-stone-100">
                    Register New Archival Contributor
                  </h4>
                  <button
                    onClick={() => setIsAddingUser(false)}
                    className="text-xs text-stone-400 hover:text-stone-700 dark:hover:text-stone-200 cursor-pointer"
                  >
                    Cancel
                  </button>
                </div>

                <form onSubmit={handleCreateUser} className="space-y-3 text-xs font-serif">
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-stone-700 dark:text-stone-300 font-semibold mb-1">Full Name *</label>
                      <input
                        type="text"
                        placeholder="e.g., Chandra Mohan Tripura"
                        value={newName}
                        onChange={(e) => setNewName(e.target.value)}
                        className="w-full px-3 py-1.5 bg-stone-50 dark:bg-stone-800 border border-stone-300 dark:border-stone-700 rounded text-stone-900 dark:text-stone-100"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-stone-700 dark:text-stone-300 font-semibold mb-1">Email *</label>
                      <input
                        type="email"
                        placeholder="e.g., c.tripura@heritage.org"
                        value={newEmail}
                        onChange={(e) => setNewEmail(e.target.value)}
                        className="w-full px-3 py-1.5 bg-stone-50 dark:bg-stone-800 border border-stone-300 dark:border-stone-700 rounded text-stone-900 dark:text-stone-100"
                        required
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-3">
                    <div>
                      <label className="block text-stone-700 dark:text-stone-300 font-semibold mb-1">Clearance Role</label>
                      <select
                        value={newRole}
                        onChange={(e) => setNewRole(e.target.value as UserRole)}
                        className="w-full px-3 py-1.5 bg-stone-50 dark:bg-stone-800 border border-stone-300 dark:border-stone-700 rounded text-stone-900 dark:text-stone-100 cursor-pointer"
                      >
                        <option value="researcher">Academic Researcher</option>
                        <option value="archivist">Senior Archivist</option>
                        <option value="contributor">Field Contributor</option>
                        <option value="public_reader">Public Reader</option>
                        <option value="super_admin">Super Admin</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-stone-700 dark:text-stone-300 font-semibold mb-1">Affiliation / Tribe</label>
                      <input
                        type="text"
                        placeholder="e.g. University of Dhaka"
                        value={newInstitution}
                        onChange={(e) => setNewInstitution(e.target.value)}
                        className="w-full px-3 py-1.5 bg-stone-50 dark:bg-stone-800 border border-stone-300 dark:border-stone-700 rounded text-stone-900 dark:text-stone-100"
                      />
                    </div>

                    <div>
                      <label className="block text-stone-700 dark:text-stone-300 font-semibold mb-1">Password</label>
                      <input
                        type="text"
                        placeholder="e.g. Secret#2025"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        className="w-full px-3 py-1.5 bg-stone-50 dark:bg-stone-800 border border-stone-300 dark:border-stone-700 rounded text-stone-900 dark:text-stone-100 font-mono"
                      />
                    </div>
                  </div>

                  <div className="flex justify-end gap-2 pt-2">
                    <button
                      type="button"
                      onClick={() => setIsAddingUser(false)}
                      className="px-3 py-1 text-xs text-stone-600 dark:text-stone-400 hover:bg-stone-100 dark:hover:bg-stone-800 rounded cursor-pointer"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-4 py-1 text-xs font-semibold text-white bg-stone-900 dark:bg-amber-700 hover:bg-stone-800 dark:hover:bg-amber-600 rounded cursor-pointer"
                    >
                      Register User
                    </button>
                  </div>
                </form>
              </div>
            )}
          </div>
        )}

        {/* TAB 2: Testing & Role Simulation */}
        {activeTab === 'testing' && (
          <div className="space-y-6">
            <div className="p-4 bg-amber-50 dark:bg-amber-950/40 border border-amber-300 dark:border-amber-800/80 rounded-xl text-xs font-serif text-amber-950 dark:text-amber-200 space-y-1">
              <div className="font-bold uppercase tracking-wider text-[11px] flex items-center gap-1.5 text-amber-900 dark:text-amber-300">
                <Sliders className="w-4 h-4 text-amber-800 dark:text-amber-400" />
                <span>Immediate Role Simulator For Testing</span>
              </div>
              <p>
                Click any role below to simulate how the website behaves for that user level. This allows the administrator to verify that sensitive customary records are properly shielded from public visitors, and that research and archivist privileges work as designed.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {(['super_admin', 'archivist', 'researcher', 'contributor', 'public_reader'] as UserRole[]).map((role) => {
                const isActive = effectiveRole === role;
                return (
                  <div
                    key={role}
                    className={`p-5 rounded-xl border transition-all cursor-pointer ${
                      isActive
                        ? 'bg-amber-50/50 dark:bg-amber-950/40 border-amber-600 dark:border-amber-500 ring-2 ring-amber-600/20 shadow-md'
                        : 'bg-white dark:bg-stone-800 border-stone-200 dark:border-stone-700 hover:border-stone-400 dark:hover:border-stone-500'
                    }`}
                    onClick={() => setSimulatedRole(role === currentUser?.role ? null : role)}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-serif font-bold text-sm text-stone-900 dark:text-stone-100 uppercase tracking-wide">
                        {role.replace('_', ' ')}
                      </span>
                      {isActive && (
                        <span className="text-[10px] font-sans font-bold bg-amber-800 text-white px-2 py-0.5 rounded-full">
                          Currently Active
                        </span>
                      )}
                    </div>
                    <p className="text-xs font-serif text-stone-600 dark:text-stone-400 leading-relaxed">
                      {roleDescriptions[role]}
                    </p>
                    <div className="mt-3 pt-2 border-t border-stone-100 dark:border-stone-700 flex items-center justify-between text-[11px] font-serif">
                      <span className="text-stone-400 dark:text-stone-500">
                        {['super_admin', 'archivist', 'researcher'].includes(role) ? 'Sensitive Records: Visible' : 'Sensitive Records: Redacted'}
                      </span>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setSimulatedRole(role === currentUser?.role ? null : role);
                        }}
                        className="font-sans font-bold text-amber-900 dark:text-amber-400 hover:underline cursor-pointer"
                      >
                        {isActive ? 'Reset to Default' : `Switch to ${role}`}
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>

            {simulatedRole && (
              <div className="flex justify-end pt-2">
                <button
                  onClick={() => setSimulatedRole(null)}
                  className="px-4 py-2 text-xs font-semibold text-stone-800 dark:text-stone-200 bg-stone-200 dark:bg-stone-800 hover:bg-stone-300 dark:hover:bg-stone-700 rounded-lg cursor-pointer transition-colors"
                >
                  Exit Role Simulation & Return to Real Account
                </button>
              </div>
            )}
          </div>
        )}

        {/* TAB 3: Archival Security Audit Log */}
        {activeTab === 'audit' && (
          <div className="space-y-4">
            <p className="text-xs font-serif text-stone-600 dark:text-stone-400">
              Chronological log of sensitive record inspections, authentication events, and administrative interventions.
            </p>

            <div className="border border-stone-200 dark:border-stone-700 rounded-xl bg-white dark:bg-stone-850 overflow-hidden max-h-96 overflow-y-auto">
              <table className="w-full text-left text-xs font-serif">
                <thead className="bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300 font-sans uppercase tracking-wider text-[11px] border-b border-stone-200 dark:border-stone-700 sticky top-0">
                  <tr>
                    <th className="py-2.5 px-4">Timestamp</th>
                    <th className="py-2.5 px-4">User</th>
                    <th className="py-2.5 px-4">Action & Log Detail</th>
                    <th className="py-2.5 px-4">Security Tier</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-100 dark:divide-stone-800">
                  {auditLogs.map((log) => (
                    <tr key={log.id} className="hover:bg-stone-50/60 dark:hover:bg-stone-800/50">
                      <td className="py-2.5 px-4 font-mono text-[11px] text-stone-500 dark:text-stone-400 whitespace-nowrap">
                        {new Date(log.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
                      </td>
                      <td className="py-2.5 px-4 font-semibold text-stone-800 dark:text-stone-200 whitespace-nowrap">
                        {log.userEmail}
                      </td>
                      <td className="py-2.5 px-4 text-stone-700 dark:text-stone-300">
                        {log.action}
                      </td>
                      <td className="py-2.5 px-4 whitespace-nowrap">
                        <span className={`text-[10px] font-sans font-medium px-2 py-0.5 rounded-full ${
                          log.sensitivity === 'restricted'
                            ? 'bg-amber-100 dark:bg-amber-950 text-amber-900 dark:text-amber-300 border border-amber-300 dark:border-amber-800'
                            : 'bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-400'
                        }`}>
                          {log.sensitivity.toUpperCase()}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Modal Footer */}
        <div className="flex justify-end pt-4 border-t border-stone-200 dark:border-stone-800">
          <button
            onClick={onClose}
            className="px-5 py-2 text-xs font-semibold text-stone-800 dark:text-stone-200 bg-stone-200 dark:bg-stone-800 hover:bg-stone-300 dark:hover:bg-stone-700 rounded-lg transition-colors cursor-pointer"
          >
            Close Administration Panel
          </button>
        </div>
      </div>
    </div>
  );
};
