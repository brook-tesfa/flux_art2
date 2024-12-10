import React, { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { useAuthStore } from '../store/authStore';
import { Loader2, Camera } from 'lucide-react';

export const Profile = () => {
  const { user } = useAuthStore();
  const [loading, setLoading] = useState(false);
  const [fullName, setFullName] = useState(user?.user_metadata?.full_name || '');
  const [avatar, setAvatar] = useState(
    user?.user_metadata?.avatar_url || 
    `https://api.dicebear.com/7.x/avataaars/svg?seed=${user?.id}`
  );

  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setLoading(true);
      const { error } = await supabase.auth.updateUser({
        data: { full_name: fullName }
      });

      if (error) throw error;
      alert('Profile updated successfully!');
    } catch (error) {
      console.error('Error updating profile:', error);
      alert('Error updating profile');
    } finally {
      setLoading(false);
    }
  };

  const handleAvatarChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    try {
      setLoading(true);
      const file = e.target.files?.[0];
      if (!file) return;

      const fileExt = file.name.split('.').pop();
      const fileName = `${user?.id}-${Math.random()}.${fileExt}`;
      const filePath = `avatars/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('avatars')
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      const { data: { publicUrl } } = supabase.storage
        .from('avatars')
        .getPublicUrl(filePath);

      const { error: updateError } = await supabase.auth.updateUser({
        data: { avatar_url: publicUrl }
      });

      if (updateError) throw updateError;
      setAvatar(publicUrl);
    } catch (error) {
      console.error('Error uploading avatar:', error);
      alert('Error uploading avatar');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="max-w-2xl mx-auto px-4">
        <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-8 border border-gray-700">
          <h1 className="text-2xl font-bold mb-6">Profile Settings</h1>
          
          <div className="mb-8 relative w-32 h-32 mx-auto">
            <img
              src={avatar}
              alt="Profile"
              className="w-full h-full rounded-full object-cover"
            />
            <label className="absolute bottom-0 right-0 p-2 bg-purple-600 rounded-full cursor-pointer hover:bg-purple-700 transition-colors">
              <Camera className="w-5 h-5" />
              <input
                type="file"
                accept="image/*"
                onChange={handleAvatarChange}
                className="hidden"
              />
            </label>
          </div>

          <form onSubmit={handleUpdateProfile} className="space-y-6">
            <div>
              <label className="block text-sm font-medium mb-2">Email</label>
              <input
                type="email"
                value={user?.email}
                disabled
                className="w-full px-4 py-2 bg-gray-700/50 rounded-lg border border-gray-600 text-gray-300"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Full Name</label>
              <input
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="w-full px-4 py-2 bg-gray-700/50 rounded-lg border border-gray-600 focus:border-purple-500 focus:ring-1 focus:ring-purple-500"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 px-4 bg-purple-600 hover:bg-purple-700 rounded-lg font-medium transition-colors flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Updating...
                </>
              ) : (
                'Update Profile'
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};