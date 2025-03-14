export interface UserData {
  username: string;
  password: string;
  fullName: string;
  email: string;
  dateOfBirth: string;
}

const STORAGE_KEY = 'registered_users';

export const saveUserData = (userData: UserData): void => {
  try {
    // Get existing users
    const existingUsersJSON = localStorage.getItem(STORAGE_KEY);
    const existingUsers = existingUsersJSON ? JSON.parse(existingUsersJSON) : [];
    
    // Add new user
    existingUsers.push(userData);
    
    // Save back to localStorage
    localStorage.setItem(STORAGE_KEY, JSON.stringify(existingUsers));
    
    console.log('User data saved successfully');
  } catch (error) {
    console.error('Error saving user data:', error);
  }
};

export const getUserByUsername = (username: string): UserData | undefined => {
  try {
    const usersJSON = localStorage.getItem(STORAGE_KEY);
    if (!usersJSON) return undefined;
    
    const users: UserData[] = JSON.parse(usersJSON);
    return users.find(user => user.username === username);
  } catch (error) {
    console.error('Error retrieving user data:', error);
    return undefined;
  }
};

export const getAllUsers = (): UserData[] => {
  try {
    const usersJSON = localStorage.getItem(STORAGE_KEY);
    return usersJSON ? JSON.parse(usersJSON) : [];
  } catch (error) {
    console.error('Error retrieving all users:', error);
    return [];
  }
};
