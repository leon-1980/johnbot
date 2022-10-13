const express = require('express');

const app = express();

app.get('/', (req, res) => {
  res.send('Hello Express App')
});

app.listen(3000, () => {
  console.log('Server Started');
});

const Discord = require("discord.js");
const ms = require("ms");
const data = require("st.db");
const axios = require("axios");
const probot = require("probot-tax");
const { QuickDB } = require('quick.db');
const DB = new QuickDB()
const client = new Discord.Client ({
  intents: [
    Discord.Intents.FLAGS.GUILDS,
    Discord.Intents.FLAGS.GUILD_MESSAGES
  ]
});

const { MessageActionRow , MessageButton } = require('discord.js');

const { DiscordModal,ModalBuilder,ModalField } = require ('discord-modal');
DiscordModal(client)

const db = new data({path : "database.json"})

// تعديل مهم
const prefix = "-"; // حط البريفيكس اللي انت عايزه

const owner = ["621633393431412736","761658231981604865","999643171724214272"]; // اي دي الاونر اللي يقدر يتحكم في اوامر الاونر

require('events').EventEmitter.defaultMaxListeners = 9999999; // احذر لا تلعب في الكود ده

// تعديل مهم
client.on('ready', () => {
  console.log(`${client.user.tag}`)
  client.user.setActivity (prefix + `help`, { type: 'STREAMING', url: 'https://www.twitch.tv/m6lp' })
});


// ================================================================================
// PLAYING   1
// LISTENING 2
// WATCHING  3
// COMPETING 4
// ================================================================================
// online    1
// idle      2
// dnd       3
// offline   4
// ================================================================================

process.on("uncaughtException" , error => {
return;
})

process.on("unhandledRejection" , error => {
return;
})

process.on("rejectionHandled", error => {
return;
});

// Code Say
client.on("messageCreate", async message => {
if (message.author.bot) return;
if (!message.channel.guild) return;
if (message.content.startsWith(prefix + 'say')) {
    if (!message.member.permissions.has("ADMINISTRATOR")) {
  return message.reply("** 😕 You don't have permissions **"); 
}
if(!message.guild.me.permissions.has('ADMINISTRATOR')) {
  return message.reply(`** 😕 I couldn't edit the channel permissions. Please check my permissions and role position. **`);
}
let args = message.content.split(' ').slice(2).join(' ')
let argss = message.content.split(' ')
        let channel = message.mentions.channels.first() || message.guild.channels.cache.get(argss[1])
        let attach = message.attachments.first()
        if (!channel) return message.channel.send('** 😕 Please mention channel or id **');
        if (!args) return message.channel.send('** ❌ Please select a message **');
        message.delete()
      if (!attach) {
        channel.send({content: `${args}`});
} else {
        channel.send({content: `${args}`, files: [attach]});
}
    }
})

// Code Addemoji
client.on("messageCreate", message => {
if (message.content.startsWith(prefix + 'addemoji')) {
let args = message.content.split(' ')

if (!message.member.permissions.has("MANAGE_EMOJIS")) {
  return message.reply("** 😕 You don't have permissions **"); 
}
if(!message.guild.me.permissions.has('MANAGE_EMOJIS')) {
  return message.reply(`** 😕 I couldn't edit the channel permissions. Please check my permissions and role position. **`);
}

const emojis = args.join(" ").match(/<?(a)?:?(\w{2,32}):(\d{17,19})>?/gi);
if (!emojis)
  return message.reply("** ❌ please enter emoji **")
let emojisArra = []
emojis.forEach((emote) => {
  let emoji = Util.parseEmoji(emote);
  if (emoji.id) {
    const Link = `https://cdn.discordapp.com/emojis/${emoji.id}.${
      emoji.animated ? "gif" : "png" 
    }`;
    message.guild.emojis.create(`${Link}`, `${emoji.name}`).then((em) => {
        emojisArra.push(em.toString())
          if (emojis.length == emojisArra.length) {
      message.reply(`${emojisArra.map(e => e).join(',')} **Done add emoji**`)
      emojisArra = []
  }
    })
      .catch((error) => {
       message.reply("Error : " + error.message);
        console.log(error);
    });
  }
})
}
})  

// Code Ban
client.on("messageCreate", async message => {
    if (message.author.bot) return;
    let c = message.content.split(' ')
    if (c[0] == prefix + 'ban') {
        
if(!message.member.permissions.has("BAN_MEMBERS")) return message.reply(`** 😕 You don't have permission **`);
   if(!message.guild.me.permissions.has('BAN_MEMBERSS')) return message.reply(`** 😕 I couldn't edit the channel permissions. Please check my permissions and role position. **`);
      
    let argss = message.content.split(' ')
    let user = message.guild.members.cache.get(argss[1]) || message.mentions.members.first();
    if(!user) return message.reply(`** 😕 Please mention or id **`);
    if(user.roles.highest.position >= message.member.roles.highest.position && message.author.id !== message.guild.fetchowner().id) return message.reply(`** ❌ You can't ban this user**`);
      
    if(!user.bannable) return message.reply(`** ❌ You can't ban this user**`);
    await user.ban().catch(err => {console.log(err)});
     await message.reply(`✅ **${user.user.tag} banned from the server!**✈️`);
    }
}) 

// Code UnBan
client.on("messageCreate", async message => {
    if (message.author.bot) return;
    if (message.content.startsWith(prefix + 'unban')) {
      
if(!message.member.permissions.has("BAN_MEMBERS")) return message.reply(`** 😕 You don't have permission **`);
   if(!message.guild.me.permissions.has('BAN_MEMBERS')) return message.reply(`** 😕 I couldn't edit the channel permissions. Please check my permissions and role position. **`);
      
    let args = message.content.split(' ')
    let id = args[1];
    if(!id)  return message.reply(`** 😕 Please mention or id **`);
    if(isNaN(id)) {
       return message.reply(`** 😕 Please mention or id **`);
    } else {
message.guild.members.unban(id).then(mmm => {
        message.reply(`✅ ** ${mmm.tag} unbanned!**`)
      }).catch(err => message.reply(`**I can't find this member in bans list**`));
      }
    }
}) 

// Code All UnBan
client.on("messageCreate", async message =>{
    if(message.content.startsWith(prefix + "all-unban")) {
        if(!message.member.permissions.has("BAN_MEMBERS"))return;
        if(!message.guild.me.permissions.has("BAN_MEMBERS"))return;
        let bans = await message.guild.bans.fetch()
        if(!bans.size)return message.channel.send({content: `This server has no bans`})
        bans.forEach(ban => message.guild.members.unban(ban.user))
        message.reply({content: `Plese wait...`}).then(m => {
            setTimeout(() => {
            m.reply({content: `> **Done successfully unban from \`${bans.size}\` members!**`})
            m.delete()
            }, 4000)
        })
    }
})

// Code Kick
client.on("messageCreate", async message => {
    if (message.author.bot) return;
    if (message.content.startsWith(prefix + 'kick')) {
   if (!message.member.permissions.has("KICK_MEMBERS")) return message.reply(`** 😕 You don't have permissions **`);
    
  if (!message.guild.me.permissions.has('KICK_MEMBERS')) return message.reply(`** 😕 I couldn't edit the channel permissions. Please check my permissions and role position.**`);
  
    let id = message.content.split(' ').slice(1).join(' ')
    let user = message.mentions.members.first() || message.guild.members.cache.get(id)
    if (!user) return message.reply(`** 😕 Please mention or id **`)
    if(user.roles.highest.position > message.guild.members.resolve(message.author).roles.highest.position) return 
  message.reply(`** ❌ You can't ban this user **`)
    if(user.roles.highest.position > message.guild.members.resolve(client.user).roles.highest.position) return message.reply(`** ❌ You can't ban this user **`)
    user.kick().then(() => message.reply(`**✅ @${user.user.username} kicked from the server!**`)).catch(err => message.reply(err))
    }
}) 

// Code Mute
client.on("messageCreate", async message => {
if(message.author.bot || !message.guild) return;
    if (message.content.startsWith(prefix + 'mute')) { 
      
if(!message.member.permissions.has("MUTE_MEMBERS")) return message.reply(`** 😕 You don't have permission **`);
   if(!message.guild.me.permissions.has('MUTE_MEMBERS')) return message.reply(`** 😕 I couldn't edit the channel permissions. Please check my permissions and role position. **`);
      
let args = message.content.split(' ')
var member = message.mentions.members.first()||message.guild.members.cache.get(args[1])||message.guild.members.cache.find(m => m.user.username === args.slice(1));
if(!member) return message.reply(`** 😕 Please mention or id **`).catch(err => console.log(`No perms to type`))
let time = args[2];
if (member.id === message.author.id)return;
if (member.id === message.guild.me.id)return;
if(member.roles.highest.position > message.guild.members.resolve(client.user).roles.highest.position) return message.reply(`** ❌ I can't mute this user **`)
if(member.roles.highest.position > message.guild.members.resolve(message.author).roles.highest.position) return message.reply(`** ❌ You can't mute this user **`)
let mutedrole = message.guild.roles.cache.find(ro => ro.name === 'Muted')
if(!mutedrole) {
try {
var createdrole = await message.guild.roles.create({
data : {
name : 'Muted',
permissions: [],
}}).catch(err => message.reply(`** ❌ I Can't find muted role **
`))
message.guild.channels.cache.forEach(async (channel, id) => {
await channel.createOverwrite(createdrole, {SEND_MESSAGES: false,ADD_REACTIONS : false}).catch(err => console.log(`No perms to manage guild`))})} catch (err){
console.log('Error')}};
let muterole = message.guild.roles.cache.find(r => r.name === 'Muted')
member.roles.add(muterole).catch(err => {return console.log('err')})
db.set(`MutedMember_${member.id}`, 'True')
setTimeout(() => {
member.roles.remove(muterole).catch('');
db.set(`MutedMember_${member.id}`, 'False')
}, ms(time || '1h'))
message.reply(`✅** ${member.user.username} muted from text! 🤐**`).catch(err => console.log(`No perms to type`))
member.send({embeds: [new MessageEmbed().setAuthor({name: member.user.username, iconURL: member.user.avatarURL({dynamic: true})})
.setDescription(`**You have been muted from text in \`${message.guild.name}\`\nReason: \`${message.content.split(' ').slice(3) || 'No Reason Provived'}\`\nModerator: ${message.author}**`)
 .setColor(`2f3136`)
    .setFooter({ text: message.guild.name, iconURL: message.guild.iconURL({dynamic: true})})]})
    }
})

// Code UnMute
client.on("messageCreate", async message => {
if(message.author.bot || !message.guild) return;
    if (message.content.startsWith(prefix + 'unmute')) {
if(!message.member.permissions.has("MANAGE_ROLES")) return message.reply(`** 😕 You don't have permission **`);
   if(!message.guild.me.permissions.has('MANAGE_ROLES')) return message.reply(`** 😕 I couldn't edit the channel permissions. Please check my permissions and role position. **`);
      
let args = message.content.split(' ')
        var member = message.mentions.members.first()||message.guild.members.cache.get(args[1])||message.guild.members.cache.find(m => m.user.username === args.slice(1));
    if(!member) return message.reply(`** 😕 Please mention or id**`).catch(err => console.log(`No perms to type`))
    if (member.id === message.author.id)return;
      if (member.id === message.guild.me.id)return;
let muterole = message.guild.roles.cache.find(r => r.name === 'Muted')
if (!muterole) return; 
member.roles.remove(muterole)
message.reply(`✅ ** ${member.user.username} unmuted !**`) 
    }
})

// Code Clear
client.on("messageCreate",async message =>{
if (message.content.startsWith(prefix + "clear"))
 { 
message.delete({timeout: 0})
    if(!message.channel.guild) return message.reply(`** This Command For Servers Only**`); 
     if(!message.member.permissions.has('MANAGE_MASSAGE')) return message.reply(`** 😕 You don't have permissions **`); 
if(!message.guild.me.permissions.has('MANAGE_MASSAGE')) return message.reply(`** 😕 I couldn't edit the channel permissions. Please check my permissions and role position. **`);
    let args = message.content.split(" ").slice(1)
    let messagecount = parseInt(args);
    if (args > 100) return message.channel.send({content: `\`\`\`javascript
i cant delete more than 100 messages 
\`\`\``}).then(messages => messages.delete(5000))
if(!messagecount) messagecount = '100';
    message.channel.messages.fetch({limit: 100 }).then(e => {
    message.channel.send('Deleting messages.').then(function(e) {
    setTimeout(function() {
        message.channel.bulkDelete(messagecount).then(msgs => {
        let msgsize = msgs.size
    message.channel.send({content: `\`\`\`js
${msgsize} messages cleared
\`\`\``}).then(messages => {
setTimeout(() => {
    messages.delete()
}, 4000)
    })
    }).catch(err => 0)
    }, 600)
    })
    })
  }    
}); 

// Code Show
client.on("messageCreate", message =>{
if(message.content === prefix + "show") {
if(message.author.bot || !message.guild) return;
if(!message.member.permissions.has('MANAGE_CHANNELS')) return message.reply(`** 😕 You don't have permissions **`);
  
  if (!message.guild.me.permissions.has('MANAGE_CHANNELS')) return message.reply(`** 😕 I couldn't edit the channel permissions. Please check my permissions and role position.**`);
  
let everyone = message.guild.roles.cache.find(hyper => hyper.name === '@everyone');
message.channel.permissionOverwrites.edit(everyone, {
             VIEW_CHANNEL: true
            }).then(() => {
message.reply(`**✅ ${message.channel} Done show this room.**`)
})
}
}); 

// Code Hide
client.on("messageCreate", message =>{
if(message.content === prefix + "hide") {
if(message.author.bot || !message.guild) return;
if(!message.member.permissions.has('MANAGE_CHANNELS')) return message.reply(`** 😕 You don't have permissions **`); 
  
  if (!message.guild.me.permissions.has('MANAGE_CHANNELS')) return message.reply(`** 😕 I couldn't edit the channel permissions. Please check my permissions and role position.**`);

let everyone = message.guild.roles.cache.find(hyper => hyper.name === '@everyone');
message.channel.permissionOverwrites.edit(everyone, {
             VIEW_CHANNEL : false
            }).then(() => {
message.reply(`**✅ ${message.channel} Done hide this room.**`)
 })
}
}); 

// Code Lock
client.on("messageCreate", message =>{
  if(message.content == prefix + "lock") {
if(message.author.bot || !message.guild) return;
if(!message.member.permissions.has('MANAGE_CHANNELS')) return message.reply(`** 😕 You don't have permissions **`);
    
  if (!message.guild.me.permissions.has('MANAGE_CHANNELS')) return message.reply(`** 😕 I couldn't edit the channel permissions. Please check my permissions and role position.**`);
    
let everyone = message.guild.roles.cache.find(hyper => hyper.name === '@everyone');
message.channel.permissionOverwrites.edit(everyone, {
         SEND_MESSAGES : false
            }).then(() => {
  message.reply(`**🔒 ${message.channel} has been looked.** `) 
 })
}
});

// Code UnLock
client.on("messageCreate", message =>{
  if(message.content == prefix + "unlock") {
if(message.author.bot || !message.guild) return;
if(!message.member.permissions.has('MANAGE_CHANNELS')) return message.reply(`** 😕 You don't have permissions **`); 
    
  if (!message.guild.me.permissions.has('MANAGE_CHANNELS')) return message.reply(`** 😕 I couldn't edit the channel permissions. Please check my permissions and role position.**`);
    
let everyone = message.guild.roles.cache.find(hyper => hyper.name === '@everyone');
message.channel.permissionOverwrites.edit(everyone, {
          SEND_MESSAGES : true
            }).then(() => {
message.reply(`**🔓 ${message.channel} has been unlock.**`)
 })
}
});

// Code Banner
client.on('messageCreate', async (message) => {
    if(message.content.startsWith(prefix + 'banner')){
      let args = message.content.substring(prefix.length).split(" ");
      const user = message.mentions.users.first() || message.guild.members.cache.get(args[1]) || message.author;
      if (user) {
           try {
             const data = await axios.get(`https://discord.com/api/users/${user.id}`, {
                  headers: {
                        Authorization: `Bot ${process.env.token}`
               }
             }).then(d => d.data);
             if(data.banner){
               let url = data.banner.startsWith("a_")?".gif?size=4096":".png?size=4096";
               url = `https://cdn.discordapp.com/banners/${user.id}/${data.banner}${url}`;
               let embed = new Discord.MessageEmbed()
              .setTitle(`${user.tag} Banner`)
               .setDescription(`[Banner URL](${url})`)
               .setColor("WHITE")
               .setImage(url)
               .setFooter({ text: message.author.tag , iconURL: 
     message.author.displayAvatarURL({dynamic:true})})
               message.reply({ embeds: [embed] })
             } else {
               message.reply({ content: "❌ **User has no banner"})
             }
           } catch(e) {
             console.log(e)
           }
      }
}
})

// Code Timeout
client.on("messageCreate" , async message => {
  if(message.content.startsWith(prefix + "timeout")) {
  if(message.member.permissions.has("TIMEOYT_MEMBERS")) {
    let args = message.content.split(" ")
    let member = message.mentions.members.first() || message.guild.members.cache.get(args[1])
    if(!member) return message.reply("**Mention the user or him ID to shut him up !**")
    if(member.user.bot) return message.reply("**You can't mute a bot 🙄**");
    if(member.user == message.author) return message.reply("**You can't mute yourself 🙄**")
    if(!args[2]) return message.reply("**Please Specify the timer ❌**");
    if(!args[2].endsWith("s")) {
    if(!args[2].endsWith("m")) {
    if(!args[2].endsWith("h")) {
    if(!args[2].endsWith("d")) {
    if(!args[2].endsWith("w")) {
    return message.reply(`**Please Provide me a valid timer \`s / m / h / d / w\` ❌**`);
    }}}}}
    if(isNaN(args[2][0])) return message.reply("**That is not a number ❌ !**");
    let embed = new Discord.MessageEmbed()
    .setAuthor({ name: member.user.tag , iconURL: member.user.displayAvatarURL({dynamic:true})})
    .setDescription(`> **You are muted in** \`${message.guild.name}\` **for a ${args[2]}**\n> **Muted By : **${message.author}`)
    .setThumbnail(message.guild.iconURL())
    .setFooter({ text: message.author.tag , iconURL: message.author.displayAvatarURL({dynamic:true})})
 
   await member.timeout(ms(args[2]) , "صدقني انا لو اعرف هقلك")
   await message.reply(`**Done muted** \`${member.user.username}\` **for a ${args[2]}**`)
   await member.user.send({embeds:[embed]})
  }}
});

// Code Top Credits
client.on("messageCreate", (message) =>{
    if(message.content === prefix + 'top-credits') {
        axios.get('https://api.probot.io/top_credits')
        .then(({data}) => {
            message.reply(
            {
                embeds: [
                        {
                            author: {name: 'top 10 In Credits'},
                            title: "Top 10 Credit In Probot",
                            fields: [data.slice(0,10).map((e,i)=>{
                                return {
                                    name:`${i+1}- ${e.name}#${e.discriminator}`,
                                    value: `Credit: **${(e.credits/ 1000000).toLocaleString()}** Milion`,
                                    inline:true
                                }
                            })]
                        }
                    ]
            }    
            )
        })
    }
})

//كود مانع بوتات | Antibots code
client.on(`messageCreate`, async msg => {
if(msg.content === prefix + "antibots on"){
  if (!owner.includes(message.author.id)) return message.channel.send(`**هذا الامر خاص بي اونر البوت فقط**`)
  if(!msg.guild.me.permissions.has(`KICK_MEMBERS`))return msg.reply({content: `:x: this command requires me to have \`kickmembers\` permission `})
  db.set(`antibots_${msg.guild.id}`, "TRUE")
  await msg.reply({content: `:white_check_mark: Antibots Protection is now **Enabled**`})
}else if(msg.content === prefix + "antibots off"){
   if (!owner.includes(message.author.id)) return message.channel.send(`**هذا الامر خاص بي اونر البوت فقط**`)
  if(!msg.guild.me.permissions.has(`KICK_MEMBERS`))return msg.reply({content: `:x: this command requires me to have \`kickmembers\` permission `})
  db.set(`antibots_${msg.guild.id}`, "FALSE")
  await msg.reply({content: `:white_check_mark: Antibots Protection is now **Disabled**`})
}else if(msg.content === prefix + "antibots"){
    if (!owner.includes(message.author.id)) return message.channel.send(`**هذا الامر خاص بي اونر البوت فقط**`)
  if(!msg.guild.me.permissions.has(`KICK_MEMBERS`))return msg.reply({content: `:x: this command requires me to have \`kickmembers\` permission `})
  msg.reply({content: `:x: **Invaild Syntax** \n ${prefix}antibots [on,off]`})
}
  
})
client.on('guildMemberAdd', async member => {
const antibots = await db.get(`antibots_${member.guild.id}`)
if(antibots === "TRUE"){
  if(member.user.bot)return member.kick()
}else return;
})

//Role add & Role remove | اضافة او ازالة رتبه 
client.on('messageCreate', async message => {
 if (!message.content.startsWith(prefix) || message.author.bot) return;
  const args = message.content.slice(prefix.length).trim().split(/ +/);
  const command = args.shift().toLowerCase();
  if (command === "role") {
    if (!args[1]) return await message.channel.send({content: `**${prefix}role <user> <role>**`});
    
    let member = message.guild.members.cache.get(args[0]) || 
    message.mentions.members.first(); 
    let role = message.guild.roles.cache.get(args[1]) || message.guild.roles.cache.find(r => message.content.split(" ").slice(1).join(" ").toLowerCase().includes(r.name.toLowerCase())) || message.mentions.roles.first()

    if (!member) return await message.channel.send({content: `**I can't find this member.**`});
     if (!role) return await message.channel.send({content: `**I can't find this role.**`});

    if (member.roles.cache.has(role.id)) {
      await member.roles.remove(role.id);
      await message.channel.send({content: `**Done Removed**`});
    }else{
      await member.roles.add(role.id);
      await message.channel.send({content: `**Done Added**`});
    }
  }
})

// كود ضرائب بروبوت | code probot tax 
client.on("messageCreate", message => {
    if(message.content.startsWith( prefix + 'tax')) {
    let args = message.content.split(" ").slice(1).join(" ");
    if(!args) return message.reply({ content: 'يرجاء حط المبلغ الذي تريد تعرف ضرائب حقه' })
    let embed = new Discord.MessageEmbed()
    .setColor('BLUE')
    .addFields(
      {
      name:"`المبلغ بدون ضرائب:`", value:`**${args}**`
 
    },
    {
      name:"`المبلغ بي الضرائب:`", value:`**${probot.taxs(args)}**`
 
    },

 
    )
     .setFooter({ text: message.author.tag , iconURL: 
     message.author.displayAvatarURL({dynamic:true})})
    .setTimestamp()
 
        message.channel.send({ embeds: [embed] });
        }
});  

// تعديل مهم
// Code Fedbacks
client.on("messageCreate", message => {
  if(message.content.startsWith(prefix + "fedback")){
    const args = message.content.split(" ").slice(1).join(" ")
    if(!args) return message.channel.send({ content: "اكتب تقيمك" })
    var fedbackchannel = message.guild.channels.cache.find(channel => channel.name === "1029707368260448266"); // اسم الروم
    const embed = new Discord.MessageEmbed()
    .setTitle("New Fedback :heart_eyes:")
    .setThumbnail(`${message.author.avatarURL({dynamic : true})}`)
    .setDescription(`${args}`)
    .setFooter({ text: message.author.tag , iconURL: 
     message.author.displayAvatarURL({dynamic:true})})
    message.channel.send({ content: "شكرا لتفيمك" })
fedbackchannel.send({ embeds: [embed] }).then(message => {
  message.react(":heart:")
})
  }
});

// Code Members Status
client.on('messageCreate',async message => {
    if(message.content == prefix + 'members') {
    let online = message.guild.members.cache.filter(members => members.user.bot === false  && members.presence?.status === 'online').size
    let dnd = message.guild.members.cache.filter(members => members.user.bot === false  && members.presence?.status === 'dnd').size
    let offline = message.guild.members.cache.filter(members => members.user.bot === false  && members.presence?.status === 'offline').size
    let idle = message.guild.members.cache.filter(members => members.user.bot === false  && members.presence?.status === 'idle').size
    let members = message.guild.members.cache.filter(members => members.user.bot === false).size
    const embed = new Discord.MessageEmbed()
    .setAuthor({name: message.author.tag,iconURL: message.author.avatarURL({dynamic:true})})
    .setColor('BLUE')
    .setThumbnail(message.guild.iconURL({ dynamic: true }))
    .addField('Members', `**\`${members}\`**`, true)
    .addField('Online', `**\`${online}\`**`, true)
    .addField('DND', `**\`${dnd}\`**`, true)
    .addField('Idle', `**\`${idle}\`**`, true)
    .addField('Offline', `**\`${offline}\`**`, true)
    .setTimestamp()
    message.reply({embeds: [embed]})
    }
});

// Code Hide All
client.on('messageCreate', message =>{
    if(message.content === prefix + "hide-all") {
    if(message.author.bot || !message.guild) return;
    if(!message.member.permissions.has('MANAGE_CHANNELS')) 
    return message.reply(`**ليس لديك الصلاحية ! 🙄 **`);
    let everyone = message.guild.roles.cache.find(hyper => hyper.name === '@everyone');
        message.guild.channels.cache.forEach((channel) => {
            channel.permissionOverwrites.create(everyone, {VIEW_CHANNEL: false}).then(() => {
      });
    })
    message.channel.send(`تم اخفاء جميع الرومات`)
    }
});

// Code Show All
client.on('messageCreate', message =>{
    if(message.content === prefix + "show-all") {
    if(message.author.bot || !message.guild) return;
    if(!message.member.permissions.has('MANAGE_CHANNELS')) 
    return message.reply(`**ليس لديك الصلاحية ! 🙄 **`);
    let everyone = message.guild.roles.cache.find(hyper => hyper.name === '@everyone');
        message.guild.channels.cache.forEach((channel) => {
            channel.permissionOverwrites.create(everyone, {VIEW_CHANNEL: true}).then(() => {
      });
    })
    message.channel.send(`تم اظهار جميع الرومات`)
    }
});

// تعديل مهم
// Code line 
client.on('messageCreate', message => {
    if (message.content.startsWith("خط")) {
    if (!owner.includes(message.author.id)) return message.channel.send(`**هذا الامر خاص بي اونر البوت فقط**`)
        message.delete();
        message.channel.send({files: [""]})
    }
})

// تعديل مهم
// Code Auto Line
client.on("messageCreate", message => {
if(message.author.bot) return;
if(message.channel.id == "") { /// اي دي روم الخط
message.channel.send("") /// رابط الخط
} else { return; }
})

// Code Auto Reply
client.on("messageCreate", message => {
if (message.content == "السلام عليكم"){
message.reply("عليكم السلام")
}})

// Code Reply Mention Bot
client.on("messageCreate", message => { 
 if(message.content === `<@${client.user.id}>`) { 
 message.reply({ content: `**Welcome im ${client.user.tag} My Prefix is ${prefix}**`})
   }
});

// تعديل مهم
// Auto Reaction
// https://getemoji.com/ موقع ايموجي
client.on("messageCreate", async message => {
  if (message.guild.id != "1029699986335744011") return; // اي دي السيرفر
  if (message.channel.id != "") return; // اي دي الروم
  if(message.author.id === client.user.id) return;
     message.react("👍") // حط الايموجي اللي انت عايزه
     message.react("👎") // حط الايموجي اللي انت عايزه
}
  
)

// تعديل مهم
// Code Suggestion
let sug = ["","","","",""]; // حط اي دي روم الاقتراحات
let line = ""; // حط رابط الخط
client.on("messageCreate", function(message) {
        let args = message.content.split(",");
  if (message.author.bot) return;
if(sug.includes(message.channel.id)) {
    message.delete()
    const embed = new Discord.MessageEmbed()
.setAuthor({name: message.author.tag,iconURL: 
 message.author.avatarURL({dynamic:true})})
.setColor(`RANDOM`)
.setThumbnail(message.guild.iconURL({ dynamic: true }))
.setDescription(`> **${args}**`)
.setTimestamp()
let attachm = message.attachments.first()
if (attachm) {
    embed.setImage(attachm.proxyURL)
}  
message.channel.send({ embeds: [embed] }).then(msg => {
 msg.react(`👍`).then(() => {
 msg.react('👎')
})
message.channel.send({files: [line]});
})
.catch(console.error) 
}
});  

// Code Dmuser
client.on('messageCreate', async (message) => {
  if(message.content.startsWith(prefix + "dmuser")) {
    const user = message.mentions.members.first()
    let args = message.content.split(`${user}`).slice(1).join(" ");
    let args3 = message.content.split("").slice(1);
    let embed4 = new Discord.MessageEmbed()
    .setDescription("**حدث خطا ما ! ... , الرجاء اكتب `الرسالة` ❌**")
    .setColor('BLUE')
 if (!args || !args3) {
   return message.reply({embeds: [embed4]})
 }
    let embed = new Discord.MessageEmbed()
   .setTitle("New Message ✉️")
   .setDescription(`Message : **${args}**\nSent By : **${message.author}**`)
    let embed2 = new Discord.MessageEmbed()
    .setDescription(`**تم ارسال الرساله من قبل <@${message.author.id}> لـ ${user}**`)
    .setColor('BLUE')
    let embed3 = new Discord.MessageEmbed()
    .setDescription("**تعذر إرسال الرسالة , الرجاء التاكد من عدم قفل `الخاص` 🔒**")
    .setColor('BLUE')
                                                                  
const user2 = client.users.cache.get(`${user.id}`).send({embeds: [embed]}).then(async () => {
message.reply({embeds: [embed2]})}).catch(() => message.reply({embeds: [embed3]}))
    
   
  }
})

// Code Developer
client.on("messageCreate", message => {
  if (message.content == prefix + 'developer') {
    let embed = new Discord.MessageEmbed()
      .setTitle("\`WELCOM\`")
      .addField(`**Developer Bot Owner Info**`, `*

🏆丨\`Owner : Kevin Tube Gamer#1866\`

🆔丨\`ID Discord : 621633393431412736\`

💫丨\`AEG : 17\`

👑丨\`Profile By\` <@621633393431412736>
        `)
      .setFooter({ text: message.author.tag , iconURL: 
     message.author.displayAvatarURL({dynamic:true})})
      .setTimestamp()
      .setColor('RANDOM')
    message.channel.send({ embeds: [embed] });
  }
})

// Code Ping
client.on('messageCreate', message => {
  if (message.content === prefix + 'ping') {
    message.channel.send({ content:`**Ping is ${client.ws.ping}**` })
  }
})

// Code User
client.on("messageCreate", message => {
    if(message.content.startsWith(prefix + "user")){
  let embed = new Discord.MessageEmbed()
  .setColor("RANDOM")
  .setAuthor({name: message.author.tag,iconURL: 
   message.author.avatarURL({dynamic:true})})
  .setThumbnail(message.author.avatarURL())
  .setFooter({ text: message.author.tag , iconURL: 
   message.author.displayAvatarURL({dynamic:true})})
  .setTitle("Info User")
  .addField('``Name``', ` ${message.author.tag} `, true)
  .addField('``ID``', ` ${message.author.id} `, true)  
  .addField('``Created At``', ` ${message.author.createdAt.toLocaleString()} `, true)
  .setTimestamp(); 
  message.channel.send({ embeds: [embed] })
  }
  });  

// Code Avatar & Avatar Server
client.on("messageCreate", message => {
if(message.content.startsWith(prefix + "avatar")){
const nibo = message.mentions.members.first() || message.member;
var args = message.content.split(" ").slice(1);
if(args == "server"){
   const embed = new Discord.MessageEmbed()
        .setAuthor({name: message.author.tag,iconURL: 
         message.author.avatarURL({dynamic:true})})
.setDescription(`**Link as**\n[Server Avatar](${nibo.guild.iconURL({ dynamic: true })})`)
        .setColor("RANDOM")
        .setImage(nibo.guild.iconURL({ dynamic: true }))
        message.channel.send({ embeds: [embed] });
} else {
        const embed = new Discord.MessageEmbed()
        .setAuthor({name: message.author.tag,iconURL: 
         message.author.avatarURL({dynamic:true})})
.setDescription(`**Link As**\n[Download Avatar](https://cdn.discordapp.com/avatars/${message.author.id}/${message.author.avatar}.png)`)
        .setColor("RANDOM")
        .setImage(nibo.user.avatarURL({ dynamic: true }))
        .setFooter({ text: message.author.tag , iconURL: 
        message.author.displayAvatarURL({dynamic:true})})
        message.channel.send({ embeds: [embed] });
}
}
});  

// Code SetNick
client.on("messageCreate", message => {
    if (message.content.startsWith(prefix + "setnick")) {
      if (!message.member.permissions.has("MANAGE NICKNAMES")) return message.reply({ content: "You Dont Have Permission" })
      const args = message.content.slice(prefix.length).trim().split(/ +/g);
      let member = message.mentions.users.first() || message.guild.members.cache.get(args[1]) || message.guild.members.cache.find(r => r.user.username === args[1])
      if (!member) return message.reply({ content: `Type User Example: ${prefix}setnick @user` })
      let nick = message.content.split(" ").slice(2).join(" ")
      let g = message.guild.members.cache.get(member.id)
      if (!nick) {
        g.setNickname(member.username)
      }
      g.setNickname(nick)
      const l = g.nickname || member.username
      let embed = new Discord.MessageEmbed()
        .setAuthor({name: message.author.tag,iconURL: 
         message.author.avatarURL({dynamic:true})})
        .setThumbnail(message.member.user.avatarURL({ dynamic: true }))
        .setTitle("New NickName:")
        .addField(`User Nick Change`, `${member}`, true)
        .addField(`Befor:`, `**${l}**`, true)
        .addField(`After:`, `**${nick}**`, true)


        .setFooter({ text: message.author.tag , iconURL: 
         message.author.displayAvatarURL({dynamic:true})})
        .setTimestamp()
      message.channel.send({ embeds: [embed] })
    }
})  

// Code invite
client.on("messageCreate", message => {
if(message.content == (prefix + "invite")) {
let embed = new Discord.MessageEmbed()
.setAuthor({name: message.author.tag,iconURL: 
message.author.avatarURL({dynamic:true})})
.setTitle(`:arrow_right: Invite Me`)
.setURL(`https://discord.com/api/oauth2/authorize?client_id=${client. user.id}&permissions=0&scope=bot`)
.setTimestamp()
message.channel.send({ embeds: [embed] })
message.react(`☑`)
}
});

// Code Warn
client.on("messageCreate", message => {
if(message.content.startsWith(prefix + "warn")) {
if(!message.member.permissions.has("MUTE_MEMBERS")) return message.channel.send({ content: `>>> \`\`\`You Don't have the permission ` });
 let args = message.content.split(" ").slice(1);
 
    var user = message.mentions.users.first();
    var reason = args.slice(1).join(' ');
    const embed = new Discord.MessageEmbed()
        .setColor('RANDOM')
        .setTimestamp();
 
    if (!user) {
        embed.addField("**منشن الشخص** ", ` ${message.author.tag}?`)
            .setTimestamp();
        return message.channel.send({ embeds: [embed] });
    } if (!reason) {
        embed.addField("**لماذا تريد اعطاء الشخص أنذار** ? ", ` ${user.tag}?`)
        return message.channel.send({ embeds: [embed] });
    }
    embed.addField("**تم ارسال الانذار** ", ` ${user.tag}!`)
        .setTimestamp();
    message.channel.send({ embeds: [embed] });
    const embed1 = new Discord.MessageEmbed()
        .setColor('RANDOM')
        .setTimestamp()
        .addField("لقد اخذت انذار", `
 
          السبب : **${reason}**`)
        .setFooter({ text: message.author.tag , iconURL: 
     message.author.displayAvatarURL({dynamic:true})})
    user.send({ embeds: [embed1] });
    message.delete();
}
});  

// Code Apply
client.on("messageCreate" , message => {
    if(message.content.startsWith(prefix + "set-channel")) {
    if (!owner.includes(message.author.id)) return message.channel.send(`**هذا الامر خاص بي اونر البوت فقط**`)
        let channel = message.mentions.channels.first()
        if(!channel) return message.reply(":x: **Mention a channel**")
        db.set(`channel_${message.guild.id}` , channel.id)
        message.reply("**Done added this channel to the DB ✅**")
    }
});

client.on("messageCreate" , message => {
  if(message.content.startsWith(prefix + "set-role")) {
  if (!owner.includes(message.author.id)) return message.channel.send(`**هذا الامر خاص بي اونر البوت فقط**`)
    let r = message.content.split(" ").slice(1).join(" ")
    let role = message.guild.roles.cache.find(r=> r.id == r)
    if(!r) {
      if(!role) {
        message.reply(":x: **Specify a role id**")
      }
    }
    db.set(`role_${message.guild.id}` , r)
    message.reply("**Done added this role to the DB ✅**")
  }
});

client.on("messageCreate" , message => {
  if(message.content.startsWith(prefix + "set-highrole")) {
  if (!owner.includes(message.author.id)) return message.channel.send(`**هذا الامر خاص بي اونر البوت فقط**`)
    let r = message.content.split(" ").slice(1).join(" ")
    let role = message.guild.roles.cache.find(r=> r.id == r)
    if(!r) {
      if(!role) {
        message.reply(":x: **Specify a role id**")
      }
    }
    db.set(`rolehigh_${message.guild.id}` , r)
    message.reply("**Done added this role to the DB ✅**")
  }
});

client.on("messageCreate" , message => {
  if(message.content == prefix + "setup") {
  if (!owner.includes(message.author.id)) return message.channel.send(`**هذا الامر خاص بي اونر البوت فقط**`)
    if(!db.has(`channel_${message.guild.id}`)) {
      if(!db.has(`role_${message.guild.id}`)) {
        if(!db.has(`rolehigh_${message.guild.id}`)) {
        return  message.reply(`**Specify first !**\n**\`set-channel\`,\`set-role\`,\`set-highrole\`**`)
        }
      }
    }
    let row = new Discord.MessageActionRow().addComponents(
    new Discord.MessageButton()
    .setCustomId("apply")
    .setLabel("Click Here")
    .setStyle("SUCCESS")
    )
    let embed = new Discord.MessageEmbed()
    .setAuthor({name:message.guild.name , iconUrl :message.guild.iconURL()})
    .setTitle("**نموذج التقديم :**")
    .setDescription("**اضغط على الزر لاظهار نموذج التقديم لك**")
    .setColor("#00ff00")
    message.delete()
    message.channel.send({components:[row] , embeds:[embed]})
  }
});

client.on('interactionCreate', async interaction => {
	if (!interaction.isButton()) return;
	if (interaction.customId === 'apply') {
     let role = db.get(`role_${interaction.guild.id}`)
     let user = db.get(`user_${interaction.member.id}`)  
     if(user) return interaction.reply({content : "You are already in the apply list !" , ephemeral:true})
     if(interaction.member.roles.cache.some(r=>r.id == role)) return interaction.reply({content : "You are already a staff !" , ephemeral:true}) 
    
		const modal = new ModalBuilder()
			.setCustomId('modal')
			.setTitle('نموذج التقديم')
            .addComponents(
	        new ModalField()
			.setCustomId('name')
			.setLabel("اسمك بي الكامل | مع العمر | و من اي دولة")
            .setRequired(true)
            .setPlaceholder("ادخل البيانات هنا")
			.setStyle('PARAGRAPH'),
    
	        new ModalField()
			.setCustomId('age')
			.setLabel("ذكر او انثى | و هل لديك سيرفر")
            .setRequired(true)
            .setPlaceholder("ادخل البيانات هنا")
			.setStyle('PARAGRAPH'),
    
            new ModalField()
			.setCustomId('dis')
            .setRequired(true)
            .setPlaceholder("ادخل البيانات هنا")
			.setLabel("هل انت ادارة في سيرفر اخر")
			.setStyle('PARAGRAPH'),

            new ModalField()
			.setCustomId('job')
            .setRequired(true)
            .setPlaceholder("ادخل البيانات هنا")
			.setLabel("كيف تقدرتساعدنا السيرفر | وهل انت قد المسولية")
			.setStyle('PARAGRAPH')
            )
		await client.modal.open(interaction , modal);
	}
});

client.on('modalSubmitInteraction', async interaction => {
    if(interaction.customId == "modal") {
     let ch = db.get(`channel_${interaction.guild.id}`)
     let channel = interaction.guild.channels.cache.find(c => c.id == ch)
     const name = interaction.fields.getTextInputValue("name")
     const age = interaction.fields.getTextInputValue("age")
     const dis = interaction.fields.getTextInputValue("dis")
     const job = interaction.fields.getTextInputValue("job")
     let row = new MessageActionRow().addComponents(
       new Discord.MessageButton()
       .setLabel("قبول ✅")
       .setCustomId("acc")
       .setStyle("SUCCESS"),
       new Discord.MessageButton()
       .setLabel("رفض ❎")
       .setCustomId("dec")
       .setStyle("DANGER")
     )
     interaction.reply({content:"Done sending your application form !" , ephemeral:true})
     db.set(`user_${interaction.member.id}` , interaction.member.id)
     channel.send({content:`**تقديم جديد من | <@${interaction.member.id}>**\n** اسمك بي الكامل | مع العمر | و من اي دولة | ${name}**\n** ذكر او انثى | و هل لديك سيرفر | ${age}**\n** هل انت ادارة في سيرفر اخر | ${dis}**\n** كيف تقدرتساعدنا السيرفر | وهل انت قد المسولية | ${job}**` , components:[row]}).then(m=> {
     db.set(`userm_${interaction.member.id}` , m.id)
     })
   }
});

client.on("interactionCreate" , interaction => {
  if(interaction.isButton()) {
    if(interaction.customId == "acc") {
      let high = db.get(`rolehigh_${interaction.guild.id}`)
      let role1 = db.get(`role_${interaction.guild.id}`)
      if(!interaction.member.roles.cache.some(r=>r.id == high)) return interaction.reply({content:"You Are Not A High Staff !" , ephemeral:true})
      let filter = m => m.author.id == interaction.member.id
      const collector = interaction.channel.createMessageCollector({ filter , max : 1 , time: 15000 });
      interaction.reply("**ارسل ايدي الشخص ...**")
      collector.on("collect" , m => {
        let member = interaction.guild.members.cache.find(r=>r.id == m.content)
        let m1 = db.get(`userm_${m.content}`)
        let m2 = interaction.channel.messages.cache.find(m=> m.id == m1)
        let user = db.get(`user_${m.content}`)
        if(!user) {
          if(!m1) {
            m.delete()
            interaction.editReply({content:`**هذا الشخص لم يقدم من قبل ❌ ${interaction.member}**`}).then(s=> {
              setTimeout(() => {
                s.delete()
              } , 5000);
            })
         }}
        if(user) {
          if(m1) {
              let role = interaction.guild.roles.cache.find(r=>r.id == role1)
              m2.edit({content:`**تقديم مقبول من : ${member} ✅**` , components:[]})
              interaction.deleteReply()
              member.roles.add([role]).catch(err=>{})
              member.send(`**لقد تم قبول تقديمك ! 🥳**`)
              db.delete(`user_${m.content}`)
              db.delete(`userm_${m.content}`)
              m.delete()
        }}
      });
    }    
    if(interaction.customId == "dec") {
      let high = db.get(`rolehigh_${interaction.guild.id}`)
      if(!interaction.member.roles.cache.some(r=>r.id == high)) return interaction.reply({content:"You Are Not A High Staff !" , ephemeral:true})
      let filter = m => m.author.id == interaction.member.id
      const collector = interaction.channel.createMessageCollector({ filter , max : 1 , time: 15000 });
      interaction.reply("**ارسل ايدي الشخص ...**")
      collector.on("collect" , m => {
        let member = interaction.guild.members.cache.find(r=>r.id == m.content)
        let m1 = db.get(`userm_${m.content}`)
        let m2 = interaction.channel.messages.cache.find(m=> m.id == m1)
        let user = db.get(`user_${m.content}`)
        if(!user) {
          if(!m1) {
            m.delete()
            interaction.editReply({content:`**هذا الشخص لم يقدم من قبل ❌ ${interaction.member}**`}).then(s=> {
              setTimeout(() => {
                s.delete()
              } , 5000);
            })
         }}
        if(user) {
          if(m1) {
            m2.edit({content:`**تقديم مرفوض من : ${member} ❌**` , components:[]})
            interaction.deleteReply()
            member.send(`**لقد تم رفض تقديمك ! 😥**`)
            db.delete(`user_${m.content}`)
            db.delete(`userm_${m.content}`)
            m.delete()
        }}
      });
    }
  }
});

// تعديل مهم
// Code Reaction Roles
let channel = "1029707886508658718" // ايدي روم لوق
client.on("messageCreate", async  message =>{ 
if(message.content.startsWith(prefix + 'reaction-roles')) {
message.delete();
if(message.author.bot) return;
if (!owner.includes(message.author.id)) return message.channel.send(`**هذا الامر خاص بي اونر البوت فقط**`)
const row = new Discord.MessageActionRow()
.addComponents(
new Discord.MessageButton()
.setStyle('SECONDARY')
.setEmoji("") // ايدي الايموجي مثل الشرح
.setCustomId('TEST1'),
new Discord.MessageButton()
.setStyle('SECONDARY')
.setEmoji("") // ايدي الايموجي مثل الشرح
.setCustomId('TEST2'),
new Discord.MessageButton()
.setStyle('SECONDARY')
.setEmoji("") // ايدي الايموجي مثل الشرح
.setCustomId('TEST3'),
new Discord.MessageButton()
.setStyle('SECONDARY')
.setEmoji("") // ايدي الايموجي مثل الشرح
.setCustomId('TEST4'),
new Discord.MessageButton()
.setStyle('SECONDARY')
.setEmoji("") // ايدي الايموجي مثل الشرح
.setCustomId('TEST5')
)
message.channel.send({content:`
> اختار لعبتك من تحت يا صديقي
`,components: [row]})
}
})
client.on('interactionCreate', async button => {
if (button.customId === "TEST1") {
let role = "" // ايدي رتبة الاولة
let channellog = client.channels.cache.get(channel)
let member = button.guild.members.cache.get(button.member.id)
let rolW = button.guild.members.cache.get(button.member.id).roles.cache.get(role)
if (rolW) {
member.roles.remove(role)
const Remove = new Discord.MessageEmbed()
.setAuthor({name: `${button.member.user.tag}`, iconURL: button.member.user.avatarURL({dynamic:true})})
.setDescription(`> **Done Remove Role <@&${role}> From ${button.member}**`)
.setColor('ff0000')
await button.reply({content: `Done Remove <@&${role}>`, ephemeral: true})
await channellog.send({embeds:[Remove]})
}
if (!rolW) {
member.roles.add(role)
const Give = new Discord.MessageEmbed()
.setAuthor({name: `${button.member.user.tag}`, iconURL: button.member.user.avatarURL({dynamic:true})})
.setDescription(`> **Done Add Role <@&${role}> To ${button.member}**`)
.setColor('ffe600')
await button.reply({content: `Done Give <@&${role}>`,ephemeral: true})
await channellog.send({embeds: [Give]})
}}
if (button.customId === "TEST2") {
    let channellog = client.channels.cache.get(channel)
let role = "" // ايدي رتبة ثانية
let member = button.guild.members.cache.get(button.member.id)
let rolW = button.guild.members.cache.get(button.member.id).roles.cache.get(role)
if (rolW) {
member.roles.remove(role)
const Remove = new Discord.MessageEmbed()
.setAuthor({name: `${button.member.user.tag}`, iconURL: button.member.user.avatarURL({dynamic:true})})
.setDescription(`> **Done Remove Role <@&${role}> From ${button.member}**`)
.setColor('ff0000')
await button.reply({content: `Done Remove <@&${role}>`, ephemeral: true})
await channellog.send({embeds:[Remove]})
}
if (!rolW) {
let channellog = client.channels.cache.get(channel)
member.roles.add(role)
const Give = new Discord.MessageEmbed()
.setAuthor({name: `${button.member.user.tag}`, iconURL: button.member.user.avatarURL({dynamic:true})})
.setDescription(`> **Done Add Role <@&${role}> To ${button.member}**`)
.setColor('ffe600')
await button.reply({content: `Done Give <@&${role}>`,ephemeral: true})
await channellog.send({embeds: [Give]})
}}
if(button.customId === "TEST3") {
let channellog = client.channels.cache.get(channel)
let role = "" // ايدي رتبة ثالثة
let member = button.guild.members.cache.get(button.member.id)
let rolW = button.guild.members.cache.get(button.member.id).roles.cache.get(role)
if (rolW) {
member.roles.remove(role)
const Remove = new Discord.MessageEmbed()
.setAuthor({name: `${button.member.user.tag}`, iconURL: button.member.user.avatarURL({dynamic:true})})
.setDescription(`> **Done Remove Role <@&${role}> From ${button.member}**`)
.setColor('ff0000')
await button.reply({content: `Done Remove <@&${role}>`, ephemeral: true})
await channellog.send({embeds:[Remove]})
}
if (!rolW) {     
member.roles.add(role)
const Give = new Discord.MessageEmbed()
.setAuthor({name: `${button.member.user.tag}`, iconURL: button.member.user.avatarURL({dynamic:true})})
.setDescription(`> **Done Add Role <@&${role}> To ${button.member}**`)
.setColor('ffe600')
await button.reply({content: `Done Give <@&${role}>`,ephemeral: true})
await channellog.send({embeds: [Give]})
}}
if(button.customId === "TEST4") {
let channellog = client.channels.cache.get(channel)
let role = "" // ايدي رتبة رابعة
let member = button.guild.members.cache.get(button.member.id)
let rolW = button.guild.members.cache.get(button.member.id).roles.cache.get(role)
if (rolW) {
member.roles.remove(role)
const Remove = new Discord.MessageEmbed()
.setAuthor({name: `${button.member.user.tag}`, iconURL: button.member.user.avatarURL({dynamic:true})})
.setDescription(`> **Done Remove Role <@&${role}> From ${button.member}**`)
.setColor('ff0000')
await button.reply({content: `Done Remove <@&${role}>`, ephemeral: true})
await channellog.send({embeds:[Remove]})
}
if (!rolW) {     
member.roles.add(role)
const Give = new Discord.MessageEmbed()
.setAuthor({name: `${button.member.user.tag}`, iconURL: button.member.user.avatarURL({dynamic:true})})
.setDescription(`> **Done Add Role <@&${role}> To ${button.member}**`)
.setColor('ffe600')
await button.reply({content: `Done Give <@&${role}>`,ephemeral: true})
await channellog.send({embeds: [Give]})
}}
if(button.customId === "TEST5") {
let channellog = client.channels.cache.get(channel)
let role = "" // ايدي رتبة خامسة
let member = button.guild.members.cache.get(button.member.id)
let rolW = button.guild.members.cache.get(button.member.id).roles.cache.get(role)
if (rolW) {
member.roles.remove(role)
const Remove = new Discord.MessageEmbed()
.setAuthor({name: `${button.member.user.tag}`, iconURL: button.member.user.avatarURL({dynamic:true})})
.setDescription(`> **Done Remove Role <@&${role}> From ${button.member}**`)
.setColor('ff0000')
await button.reply({content: `Done Remove <@&${role}>`, ephemeral: true})
await channellog.send({embeds:[Remove]})
}
if (!rolW) {     
member.roles.add(role)
const Give = new Discord.MessageEmbed()
.setAuthor({name: `${button.member.user.tag}`, iconURL: button.member.user.avatarURL({dynamic:true})})
.setDescription(`> **Done Add Role <@&${role}> To ${button.member}**`)
.setColor('ffe600')
await button.reply({content: `Done Give <@&${role}>`,ephemeral: true})
await channellog.send({embeds: [Give]})
}}
})

client.login(process.env.token).catch((error) => {
console.warn("\033[31m Token Invalid")
})
