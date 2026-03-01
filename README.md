<div align="center">

<img src="https://cdn.discordapp.com/attachments/placeholder/ego-bot-logo.png" alt="Ego Bot Logo" width="200" height="200">

# 🤖 Ego Bot

**A Powerful, Modular Discord Moderation Bot**

[![License](https://img.shields.io/badge/License-Apache%202.0-blue.svg)](https://opensource.org/licenses/Apache-2.0)
[![Discord.js](https://img.shields.io/badge/Discord.js-v14-5865F2?logo=discord&logoColor=white)](https://discord.js.org/)
[![Node.js](https://img.shields.io/badge/Node.js-v18+-339933?logo=node.js&logoColor=white)](https://nodejs.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB-v6-47A248?logo=mongodb&logoColor=white)](https://www.mongodb.com/)

[Features](#-features) • [Installation](#-installation) • [Configuration](#-configuration) • [Commands](#-commands) • [Contributing](#-contributing)

</div>

---

## ✨ Features

<table>
<tr>
<td width="50%">

### 🛡️ **Advanced Moderation**
- Ban, kick, warn, mute, timeout
- Temporary bans with auto-expiry
- Warning system with case IDs
- Mass moderation actions
- Mod logs integration

</td>
<td width="50%">

### ⚡ **Dual Command System**
- Prefix commands (`!help`)
- Slash commands (`/help`)
- No-prefix for authorized users
- Server-specific prefixes
- Command cooldowns

</td>
</tr>
<tr>
<td width="50%">

### 🔒 **Server Security**
- Channel lock/unlock
- Server lockdown mode
- Slowmode management
- Role-based permissions
- Hierarchy protection

</td>
<td width="50%">

### 🎵 **Music Ready**
- Lavalink integration
- High-quality audio
- Queue management
- Playlist support
- 24/7 uptime capable

</td>
</tr>
</table>

### 🗄️ **Database Powered**
- MongoDB for persistence
- Guild-specific settings
- User infraction history
- Scalable architecture

---

## 🚀 Installation

### Prerequisites

| Requirement | Version | Download |
|-------------|---------|----------|
| Node.js | ≥18.x | [nodejs.org](https://nodejs.org/) |
| MongoDB | ≥6.x | [mongodb.com](https://www.mongodb.com/) |
| Discord Bot Token | - | [Discord Developer Portal](https://discord.com/developers/applications) |

### Quick Start

```bash
# 1. Clone the repository
git clone https://github.com/iamrexedits/Ego.git
cd Ego

# 2. Install dependencies
npm install

# 3. Configure environment
cp .env.example .env
# Edit .env with your credentials

# 4. Configure authorized users
# Edit nplist.js and add your Discord ID

# 5. Start the bot
npm start

# Or use development mode with auto-reload
npm run dev
