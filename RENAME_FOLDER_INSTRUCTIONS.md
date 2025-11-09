# 📁 Folder Rename Instructions

## How to Rename Folder from "daddy" to "culture-connect"

### ⭐ Option 1: Using File Explorer (Easiest - Recommended)

1. **Close VS Code/Cursor and all terminals** that are using this folder
2. **Open File Explorer**
3. **Navigate** to: `C:\Users\sambh\OneDrive\Desktop\`
4. **Right-click** on the `daddy` folder
5. **Select** "Rename" (or press F2)
6. **Type** `culture-connect` and press Enter
7. **Reopen** VS Code/Cursor and open the `culture-connect` folder

**That's it!** ✅

### Option 2: Using PowerShell (Quick Command)

1. **Close VS Code/Cursor and all terminals**
2. **Open PowerShell** (regular PowerShell is fine, no admin needed)
3. **Run these commands**:
   ```powershell
   cd C:\Users\sambh\OneDrive\Desktop
   Rename-Item -Path "daddy" -NewName "culture-connect"
   ```
4. **Reopen** VS Code/Cursor and open the `culture-connect` folder

### Option 3: Using Command Prompt

1. **Close VS Code/Cursor and all terminals**
2. **Open Command Prompt**
3. **Run these commands**:
   ```cmd
   cd C:\Users\sambh\OneDrive\Desktop
   ren daddy culture-connect
   ```
4. **Reopen** VS Code/Cursor and open the `culture-connect` folder

## ✅ After Renaming

### 1. Update Your Workspace
- Close VS Code/Cursor
- Reopen and select the new `culture-connect` folder as your workspace
- Or use: `File > Open Folder > culture-connect`

### 2. Regenerate package-lock.json (Optional)
The `package-lock.json` file references the old folder name, but this won't affect functionality. If you want to clean it up:

```powershell
# Delete old package-lock.json
Remove-Item package-lock.json

# Regenerate it (this will use "culture-connect" from package.json)
npm install
```

### 3. Verify Everything Works
- Test that your dev servers still start:
  ```powershell
  npm run dev:backend
  npm run dev:frontend
  ```
- Check that all paths still work correctly

## 📝 Notes

- ✅ All package.json files already use "culture-connect" as the name
- ✅ No code files reference the folder name "daddy"
- ✅ The only reference is in `package-lock.json` (auto-generated, safe to regenerate)
- ✅ All configuration files use relative paths, so they'll work after renaming
- ✅ Git history will be preserved after renaming

## 🚨 Important

- **Close all terminals and editors** before renaming to avoid file locking issues
- **Make sure no processes** are using files in the folder
- **After renaming**, you may need to:
  - Update any shortcuts or bookmarks
  - Update your Git remote URL if you have one configured
  - Restart any running development servers

## ✅ Verification

After renaming, verify:
- [ ] Folder is renamed to `culture-connect`
- [ ] VS Code/Cursor opens the new folder correctly
- [ ] `npm run dev:backend` works
- [ ] `npm run dev:frontend` works
- [ ] Git still works (if using Git)

That's it! Your folder is now named "culture-connect" 🎉

