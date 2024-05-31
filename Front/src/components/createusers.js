import { getUsers, deleteUser, updateUser, createUser } from '../services/user';
import { getRoles } from '../services/rol';

export const loadUsers = async (setUsers) => {
  try {
    const response = await getUsers();
    setUsers(response.data);
  } catch (error) {
    console.error('Error fetching users:', error);
  }
};

export const loadRoles = async (setRoles) => {
  try {
    const response = await getRoles();
    setRoles(response.data);
  } catch (error) {
    console.error('Error fetching roles:', error);
  }
};

export const deleteUserHandler = async (id_usuario, loadUsers) => {
  try {
    await deleteUser(id_usuario);
    loadUsers();
  } catch (error) {
    console.error('Error deleting user:', error);
  }
};

export const updateUserHandler = async (editedUser, editMode, createMode, loadUsers, setEditMode, setCreateMode) => {
  try {
    if (editMode) {
      await updateUser(editedUser.id_usuario, editedUser);
    } else if (createMode) {
      await createUser(editedUser);
    }
    loadUsers();
    setEditMode(false);
    setCreateMode(false);
  } catch (error) {
    console.error('Error updating/creating user:', error.response ? error.response.data : error.message);
  }
};
