"use client";

import {
  BellIcon,
  Cog6ToothIcon,
  GlobeAltIcon,
  KeyIcon,
  ShieldCheckIcon,
  UserIcon,
} from "@heroicons/react/24/outline";

import { useState } from "react";

export default function SettingsPage() {
  const [notifications, setNotifications] = useState({
    email: true,
    sms: false,
    push: true,
  });

  const [security, setSecurity] = useState({
    twoFactor: false,
    sessionTimeout: "30",
    ipWhitelist: "",
  });

  return (
    <div className="p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Settings</h1>
        <p className="mt-2 text-gray-600">
          Manage your security center configuration
        </p>
      </div>

      <div className="space-y-6">
        {/* Notifications */}
        <div className="bg-white shadow rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <div className="flex items-center mb-4">
              <BellIcon className="h-6 w-6 text-gray-400 mr-3" />
              <h3 className="text-lg leading-6 font-medium text-gray-900">
                Notifications
              </h3>
            </div>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <label className="text-sm font-medium text-gray-700">
                    Email Notifications
                  </label>
                  <p className="text-sm text-gray-500">
                    Receive security alerts via email
                  </p>
                </div>
                <input
                  type="checkbox"
                  checked={notifications.email}
                  onChange={(e) =>
                    setNotifications((prev) => ({
                      ...prev,
                      email: e.target.checked,
                    }))
                  }
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <label className="text-sm font-medium text-gray-700">
                    SMS Notifications
                  </label>
                  <p className="text-sm text-gray-500">
                    Receive critical alerts via SMS
                  </p>
                </div>
                <input
                  type="checkbox"
                  checked={notifications.sms}
                  onChange={(e) =>
                    setNotifications((prev) => ({
                      ...prev,
                      sms: e.target.checked,
                    }))
                  }
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <label className="text-sm font-medium text-gray-700">
                    Push Notifications
                  </label>
                  <p className="text-sm text-gray-500">
                    Receive real-time notifications in browser
                  </p>
                </div>
                <input
                  type="checkbox"
                  checked={notifications.push}
                  onChange={(e) =>
                    setNotifications((prev) => ({
                      ...prev,
                      push: e.target.checked,
                    }))
                  }
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Security */}
        <div className="bg-white shadow rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <div className="flex items-center mb-4">
              <ShieldCheckIcon className="h-6 w-6 text-gray-400 mr-3" />
              <h3 className="text-lg leading-6 font-medium text-gray-900">
                Security
              </h3>
            </div>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <label className="text-sm font-medium text-gray-700">
                    Two-Factor Authentication
                  </label>
                  <p className="text-sm text-gray-500">
                    Add an extra layer of security to your account
                  </p>
                </div>
                <input
                  type="checkbox"
                  checked={security.twoFactor}
                  onChange={(e) =>
                    setSecurity((prev) => ({
                      ...prev,
                      twoFactor: e.target.checked,
                    }))
                  }
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Session Timeout (minutes)
                </label>
                <select
                  value={security.sessionTimeout}
                  onChange={(e) =>
                    setSecurity((prev) => ({
                      ...prev,
                      sessionTimeout: e.target.value,
                    }))
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                  <option value="15">15 minutes</option>
                  <option value="30">30 minutes</option>
                  <option value="60">1 hour</option>
                  <option value="120">2 hours</option>
                  <option value="480">8 hours</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  IP Whitelist
                </label>
                <textarea
                  value={security.ipWhitelist}
                  onChange={(e) =>
                    setSecurity((prev) => ({
                      ...prev,
                      ipWhitelist: e.target.value,
                    }))
                  }
                  placeholder="Enter IP addresses or ranges (one per line)"
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <p className="mt-1 text-sm text-gray-500">
                  Only these IP addresses will be allowed to access the
                  dashboard
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* User Profile */}
        <div className="bg-white shadow rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <div className="flex items-center mb-4">
              <UserIcon className="h-6 w-6 text-gray-400 mr-3" />
              <h3 className="text-lg leading-6 font-medium text-gray-900">
                User Profile
              </h3>
            </div>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Full Name
                </label>
                <input
                  type="text"
                  defaultValue="Administrator"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  defaultValue="admin@bmdrm.local"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>
          </div>
        </div>

        {/* API Keys */}
        <div className="bg-white shadow rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <div className="flex items-center mb-4">
              <KeyIcon className="h-6 w-6 text-gray-400 mr-3" />
              <h3 className="text-lg leading-6 font-medium text-gray-900">
                API Keys
              </h3>
            </div>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div>
                  <p className="text-sm font-medium text-gray-900">
                    Read-only API Key
                  </p>
                  <p className="text-sm text-gray-500">sk-...a1b2c3d4e5f6</p>
                </div>
                <div className="flex space-x-2">
                  <button className="text-sm text-blue-600 hover:text-blue-500">
                    Regenerate
                  </button>
                  <button className="text-sm text-red-600 hover:text-red-500">
                    Delete
                  </button>
                </div>
              </div>
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div>
                  <p className="text-sm font-medium text-gray-900">
                    Full Access API Key
                  </p>
                  <p className="text-sm text-gray-500">sk-...x9y8z7w6v5u4</p>
                </div>
                <div className="flex space-x-2">
                  <button className="text-sm text-blue-600 hover:text-blue-500">
                    Regenerate
                  </button>
                  <button className="text-sm text-red-600 hover:text-red-500">
                    Delete
                  </button>
                </div>
              </div>
              <button className="w-full flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500">
                Generate New API Key
              </button>
            </div>
          </div>
        </div>

        {/* System Info */}
        <div className="bg-white shadow rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <div className="flex items-center mb-4">
              <GlobeAltIcon className="h-6 w-6 text-gray-400 mr-3" />
              <h3 className="text-lg leading-6 font-medium text-gray-900">
                System Information
              </h3>
            </div>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <p className="text-sm font-medium text-gray-500">Version</p>
                <p className="text-sm text-gray-900">
                  BMDRM Security Center v1.0.0
                </p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">
                  Last Updated
                </p>
                <p className="text-sm text-gray-900">January 15, 2024</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Uptime</p>
                <p className="text-sm text-gray-900">7 days, 12 hours</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Status</p>
                <p className="text-sm text-green-600">Operational</p>
              </div>
            </div>
          </div>
        </div>

        {/* Save Button */}
        <div className="flex justify-end">
          <button className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
}
