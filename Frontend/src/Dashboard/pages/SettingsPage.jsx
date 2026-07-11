import React from 'react';
import { ThemeToggle } from '../../components/ThemeToggle';

export const SettingsPage = () => {
  return (
    <div className="p-6 h-full">
      <h1 className="text-2xl font-semibold mb-6 text-foreground">Settings</h1>
      
      <div className="max-w-2xl space-y-6">
        <div className="bg-card border border-border p-6 rounded-2xl flex items-center justify-between">
          <div>
            <h3 className="font-medium text-foreground">Theme</h3>
            <p className="text-sm text-muted-foreground">Switch between light, dark, and system modes.</p>
          </div>
          <ThemeToggle variant="full" />
        </div>
      </div>
    </div>
  );
};
