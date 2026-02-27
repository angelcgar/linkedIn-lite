const STORAGE_KEY = 'linkedin-lite-profile';

export function getProfile() {
  if (typeof window === 'undefined') return null;
  
  const data = localStorage.getItem(STORAGE_KEY);
  return data ? JSON.parse(data) : null;
}

export function saveProfile(profile) {
  if (typeof window === 'undefined') return;
  
  localStorage.setItem(STORAGE_KEY, JSON.stringify(profile));
}

export function updateProfile(updates) {
  const profile = getProfile();
  if (!profile) return null;
  
  const updatedProfile = { ...profile, ...updates };
  saveProfile(updatedProfile);
  
  return updatedProfile;
}

export function initializeProfile(defaultProfile) {
  if (typeof window === 'undefined') return;
  
  const existing = localStorage.getItem(STORAGE_KEY);
  if (!existing) {
    saveProfile(defaultProfile);
  }
}

export function addExperience(experience) {
  const profile = getProfile();
  if (!profile) return null;
  
  const newExperience = {
    id: `exp-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
    ...experience
  };
  
  profile.experience = [...(profile.experience || []), newExperience];
  saveProfile(profile);
  
  return profile;
}

export function removeExperience(experienceId) {
  const profile = getProfile();
  if (!profile) return null;
  
  profile.experience = profile.experience.filter(exp => exp.id !== experienceId);
  saveProfile(profile);
  
  return profile;
}

export function updateBio(bio) {
  return updateProfile({ bio });
}

export function updateSkills(skills) {
  return updateProfile({ skills });
}
