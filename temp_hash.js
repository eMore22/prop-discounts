// temp_hash.js
import bcrypt from 'bcryptjs';

// IMPORTANT: Use the actual plain-text password you are currently using to log in.
async function hashCurrentPassword() {
  const plainPassword = "test123"; 
  // Generate a hash using a standard salt round (10)
  const hashedPassword = await bcrypt.hash(plainPassword, 10); 
  console.log("Your new secure hash is:");
  console.log(hashedPassword);
}

hashCurrentPassword();