const express = require("express");
const app = express();
app.listen(() => console.log("Server started"));

app.use('/ping', (req, res) => {
  res.send(new Date());
});


const { Client, MessageActionRow, MessageButton, MessageEmbed, MessageSelectMenu, Intents } = require("discord.js");
const { token, prefix } = require('./config.json');

client = new Client({
  intents: [
    Intents.FLAGS.GUILDS,
    Intents.FLAGS.GUILD_MEMBERS,
    Intents.FLAGS.GUILD_BANS,
    Intents.FLAGS.GUILD_INTEGRATIONS,
    Intents.FLAGS.GUILD_WEBHOOKS,
    Intents.FLAGS.GUILD_INVITES,
    Intents.FLAGS.GUILD_VOICE_STATES,
    Intents.FLAGS.GUILD_PRESENCES,
    Intents.FLAGS.GUILD_MESSAGES,
    Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
    Intents.FLAGS.GUILD_MESSAGE_TYPING,
    Intents.FLAGS.DIRECT_MESSAGES,
    Intents.FLAGS.DIRECT_MESSAGE_REACTIONS,
    Intents.FLAGS.DIRECT_MESSAGE_TYPING,
  ],
  allowedMentions: { repliedUser: false }, ws: {
    properties: { $browser: "Discord iOS" }
  },
});

client.on('ready', () => {
  console.log(`${prefix}`)
  console.log(`${client.user.tag}`)
  client.user.setActivity (prefix+`help`, { type: 'STREAMING', url: 'https://www.twitch.tv/m6lp' })
});


client.on('messageCreate', message => {

    if (message.content === prefix + 'hi') {
        message.reply('hello')
    }

})


//Bot 

const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));
setInterval(async() => {
  const response = await fetch("https://vrr.gtik.repl.co");
},5000)

//ping
client.on("messageCreate", msg => {
  if (msg.content.startsWith(prefix + "ping"))
    msg.reply(`**:ping_pong: Pong ${client.ws.ping}ms**`).catch((err) => {
      console.log(err.message)
    });
})


//منشن البوت
            client.on("messageCreate", async (message) => {
             if (message.author.bot) return;

                if (message.content === `<@${client.user.id}>`) {

                  let Embed = new MessageEmbed()
                  .setAuthor(`${client.user.tag}`, client.user.avatarURL({ dynamic: true }))
                  .setColor('RANDOM')// حط هنا لون الامبد 
                  .setThumbnail(client.user.avatarURL({ dynamic: true }))
                  .setFooter(`${message.author.tag}`, message.author.avatarURL({ dynamic: true }))
                  .setTimestamp()
                  .setDescription(`**MY PREFIX IS ${prefix}**\n
                  **- | NAME : ${client.user.tag}**
                  **- | PING : ${client.ws.ping}** :signal_strength:
                  **- | DEVELOPER : <@621633393431412736>**`)// يمديك هنا تغير اي شيء


                  message.channel.send({ embeds: [Embed] })
                }
            })

//id
client.on("messageCreate", message  => {
    if(message.content === prefix + "id")
    { 
       let embed = new MessageEmbed()
    .setTitle(message.member.user.id)
    .setColor("#ff0000")
    .setFooter(`للعضو : ${message.member.user.tag}`)
    message.reply({ embeds: [embed]})
    }
})

//افتار

client.on("messageCreate", message  =>  {
  var cmd = message .content.split(' ')[0]
  if(cmd == prefix + "avatar" || cmd == "A" || cmd == "a") {
    let user = message.mentions.members.first() || message.guild.members.cache.get(message.content.split(' ')[1]) || message.member;
    
      var embed = new MessageEmbed()
   .setTitle('Download avatar')
   .setURL(user.user.avatarURL({dynamic : true, size : 512 })) 
    .setAuthor(`${message.guild.name}`, message.guild.iconURL({ dynamic: true }))
        
.setImage((user.user.avatarURL({dynamic : true, size : 512 })))
        
.setColor(message.guild.me.displayHexColor)
       .setTimestamp()
.setFooter(`${message.author.username}`, message.author.avatarURL({ dynamic: true}));
   message.reply({embeds: [embed]});
    }
});

//مسح

client.on("messageCreate",async message =>{
  var cmd = message .content.split(' ')[0]
  if(cmd == prefix + "clear" || cmd == "مسح") { 
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


//حمياه
//1
client.on("messageCreate", Alex => {
  if(Alex.content.startsWith( 'كس امك'))
Alex.delete().catch((err) => {
   console.log(err.message)
   });
}) 
//2
client.on("messageCreate", Alex => {
  if(Alex.content.startsWith( 'كسمك'))
Alex.delete().catch((err) => {
   console.log(err.message)
   });
}) 
//3
client.on("messageCreate", Alex => {
  if(Alex.content.startsWith( 'ks amk'))
Alex.delete().catch((err) => {
   console.log(err.message)
   });
}) 
//4
client.on("messageCreate", Alex => {
  if(Alex.content.startsWith( 'ksamk'))
Alex.delete().catch((err) => {
   console.log(err.message)
   });
}) 

//tkt

const CategoryID = "1029726677447745656"

client.on("channelCreate", async channel => {
if (channel.type === "GUILD_TEXT" && channel.name.startsWith("ticket-") && channel.parent.id === CategoryID) {

await new Promise(r => setTimeout(r, 2000))

channel.send("**Hello.., New Customer Here ! @everyone**")

}
});

client.on('messageCreate', async message => {
  if(message.content.startsWith(prefix + 'create')){
    const Permission = message.member.permissions.has("MANAGE_CHANNELS");
    const BotPermission = message.guild.me.permissions.has("MANAGE_CHANNELS")
    const args = message.content.trim().split(' ');
    const channelName = args[1];
    if(!Permission) return message.reply(`**You Don't Have Permission To Create a Channel!**`)
    if(!BotPermission) return message.reply(`**I Don't Have Permission To Create a Channel!**`)
    if(!channelName) return message.reply(`Please enter a name of the channel you want to create!`)
    await message.guild.channels.create(channelName)
    .then(ch => {
        message.reply(`✅ | ${ch} Channel has been created!`)
      }).catch((error) => {message.reply(error.message) && console.log(error.message)})
  }
})
//ssss
client.on("messageCreate", async message => {
    if (message.author.bot) return;
if (!message.channel.guild) return;
  var cmd = message .content.split(' ')[0]
  if(cmd == prefix + "lock" || cmd == "ق" || cmd == "قفل") {
                    const permission = message.member.permissions.has("MANAGE_CHANNELS");
                const guilds = message.guild.me.permissions.has("MANAGE_CHANNELS");

                if (!permission)
                        return message.reply(
                                { content: ":x: **You don't have permission to use this command**", ephemeral: true }
                        ).catch((err) => {
                                console.log(`i couldn't reply to the message: ` + err.message)
                        })

                if (!guilds) return message.reply({ content: `:rolling_eyes: **I couldn't edit the channel permissions. Please check my permissions and role position.**`, ephemeral: true }).catch((err) => {
                        console.log(`i couldn't reply to the message: ` + err.message)
                })
                let everyone = message.guild.roles.cache.find(hyper => hyper.name === '@everyone');
                message.channel.permissionOverwrites.edit(everyone, {
                        SEND_MESSAGES: false
                }).then(() => {
                        message.reply({ content: `:lock: **${message.channel.name} has been looked.** `, ephemeral: true }).catch((err) => {
                                console.log(`i couldn't reply to the message: ` + err.message)
                        })
                })
        }
});

client.on("messageCreate", async message => {
    if (message.author.bot) return;
if (!message.channel.guild) return;
  var cmd = message .content.split(' ')[0]
  if(cmd == prefix + "unlock" || cmd == "ف" || cmd == "فتح") {
                const permission = message.member.permissions.has("MANAGE_CHANNELS");
                const guilds = message.guild.me.permissions.has("MANAGE_CHANNELS");

                if (!permission)
                        return message.reply(
                                { content: ":x: **You don't have permission to use this command**", ephemeral: true }
                        ).catch((err) => {
                                console.log(`i couldn't reply to the message: ` + err.message)
                        })

                if (!guilds) return message.reply({ content: `:rolling_eyes: **I couldn't change the channel permissions. Please check my permissions.**`, ephemeral: true }).catch((err) => {
                        console.log(`i couldn't reply to the message: ` + err.message)
                })
                let everyone = message.guild.roles.cache.find(hyper => hyper.name === '@everyone');
                message.channel.permissionOverwrites.edit(everyone, {
                        SEND_MESSAGES: true
                }).then(() => {
                        message.reply({ content: `:unlock: **<#${message.channel.id}> has been unlocked.**`, ephemeral: true })
                })
    }
});



//طرد

client.on("messageCreate", async message => {
    if (message.author.bot) return;
      var cmd = message .content.split(' ')[0]
  if(cmd == prefix + "kick" || cmd == "برا" || cmd == prefix + "طرد") {
      
      if (!message.member.permissions.has("BAN_MEMBERS")) return;
  message.reply(`** 😕 You don't have permissions **`)
      
    let id = message.content.split(' ').slice(1).join(' ')
    let user = message.mentions.members.first() || message.guild.members.cache.get(id)
    if (!user) return message.reply(`** 😕 Please mention member or id**`)
    if(user.roles.highest.position > message.guild.members.resolve(client.user).roles.highest.position) return message.reply(`** ❌ You can't ban this user **`)
    user.kick().then(() => message.reply(`**✅@${user.user.username} kicked from the server!**`)).catch(err => message.reply(err))
    }
})

//ميوت

client.on("messageCreate", async message => {
    if (message.author.bot) return;
if (!message.channel.guild) return;
    if (message.content.startsWith(prefix + 'mute')) {
 
                let args = message.content.split(" ").slice(1).join(" ");
      
                const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
        var time = args[1]
        if (!time) time = '24h'
 
                const permission = message.member.permissions.has("MANAGE_ROLES");
                const guilds = message.guild.me.permissions.has("MANAGE_ROLES");
 
                if (!permission)
                        return message.reply(
                                { content: ":x: **You don't have permission to use this command**", ephemeral: true }
                        ).catch((err) => {
                                console.log(`i couldn't reply to the message: ` + err.message)
                        })
             
 
              if (!args[0]) return message.reply({ content: `:rolling_eyes: **Please mention member or id**`, ephemeral: true }).catch((err) => {
                        console.log(`i couldn't reply to the message: ` + err.message)
                })
 
                if (!member) return message.reply({ content: `:rolling_eyes: **I can't find this member**`, ephemeral: true }).catch((err) => {
                        console.log(`i couldn't reply to the message: ` + err.message)
                })         
 
                if (member.id === message.member.id)
                        return message.reply({ content: `:rolling_eyes: **You can't mute ${member.user.username}**`, ephemeral: true }).catch((err) => {
                                console.log(`i couldn't reply to the message: ` + err.message)
                        })
 
                if (message.member.roles.highest.position < member.roles.highest.position)
                        return message.reply({
                                content:
                                        `:rolling_eyes: **You can't mute ${member.user.username} have higher role than you**`
                                , ephemeral: true
                        }).catch((err) => {
                                console.log(`i couldn't reply to the message: ` + err.message)
                        })
 
                if (!guilds) return message.reply({ content: `:rolling_eyes: **I couldn't mute that user. Please check my permissions and role position.**`, ephemeral: true }).catch((err) => {
                        console.log(`i couldn't reply to the message: ` + err.message)
                })
 
                let muteRole = message.guild.roles.cache.find((role) => role.name == "Mute");
                if (!muteRole) {
                        message.guild.roles.create({
            name: "Mute",
                        }).then((createRole) => {
                                message.guild.channels.cache.filter((c) => c.type == "GUILD_TEXT").forEach(c => {
                                        c.permissionOverwrites.edit(createRole, {
                                                SEND_MESSAGES: false,
        ADD_REACTIONS: false                                 
                                        })
                                })
                                message.reply({ content: `:x: **Muted role is not created. please run the command again.**`, ephemeral: true }).catch((err) => {
                                        console.log(`i couldn't reply to the message: ` + err.message)
                                })
                        })
                } else {
                        message.guild.members.cache.get(member.id)?.roles.add(muteRole);
                        message.reply({ content: `:white_check_mark: **${member.user.username} muted from the text! :zipper_mouth:**`, ephemeral: true }).catch((err) => {
                                console.log(`i couldn't reply to the message: ` + err.message)
                  })
                          db.set(`MutedMember_${member.id}`, 'True')
                  
  setTimeout(async () => {
    await member.roles.remove(muteRole)
  db.set(`MutedMember_${member.id}`, 'False')  
      message.reply({ content: `:white_check_mark: **${member.user.username} Is now unmuted!**`, ephemeral: true }).catch((err) => {
                                console.log(`i couldn't reply to the message: ` + err.message)
                        })
  }, ms(time));
                }
        }
});

//فك المويت

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
//بان

client.on("messageCreate", async message => {
    if (message.author.bot) return;
    let c = message.content.split(' ')
    if (c[0] == prefix + 'ban') {
        if(!message.member.permissions.has("BAN_MEMBERS")) return message.reply(`** 😕 You don't have permissions **`);
    if(!message.guild.me.permissions.has("BAN_MEMBERS")) return;
      
    let argss = message.content.split(' ')
    let user = message.guild.members.cache.get(argss[1]) || message.mentions.members.first();
    if(!user) return message.reply(`** 😕 Please mention member or id **`);
 if(user.roles.highest.position > message.member.roles.highest.position && message.author.id !== message.guild.fetchOwner().id) return message.reply(`** ❌ You can't ban this user**`);
      
    if(!user.bannable) return message.reply(`** ❌ You can't ban this user**`);
    await user.ban().catch(err => {console.log(err)});
     await message.reply(`✅**${user.user.tag} banned from the server!**✈️`);
    }
}) 

client.on("messageCreate", async message => {
    if (message.author.bot) return;
    if (message.content.startsWith(prefix + 'unban')) {
if(!message.member.permissions.has("BAN_MEMBERS")) return message.reply(`** 😕 You don't have permissions **`);
if(!message.guild.me.permissions.has("BAN_MEMBERS")) return;
    let args = message.content.split(' ')
    let id = args[1];
    if(!id)  return message.reply(`** 😕 Please mention member or id **`);
    if(isNaN(id)) {
       return message.reply(`** 😕 Please mention member or id **`);
    } else {
message.guild.members.unban(id).then(mmm => {
        message.reply(`✅** ${mmm.tag} unbanned!**`)
      }).catch(err => message.reply(`**I can't find this member in bans list**`));
      }
    }
}) 


//user
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

//رول الدخول 

    client.on('guildMemberAdd', rolemember => {
      if (rolemember.guild.id === "1029726676785053696")//Server Id
      {
        const role = rolemember.guild.roles.cache.find(rol => rol.id == '1029734547908202597');//role id 
        rolemember.roles.add(role).catch(e => { return console.log(`not add auto role`) })
      }
    });

//انذار


//help

client.on("messageCreate", message => {
  if(message.author.bot || message.channel.type === "dm") return;
  let args = message.content.split(" ");
  if(args[0] === prefix+"help") {
    let menu = new MessageSelectMenu()
      .setCustomId(`help_${message.author.id}`)
      .setPlaceholder("Choose a category")
      .addOptions([{
                            label: 'information',
                            description: 'To view the information ',
                            value: '1',
              emoji: '992056774335135864',
                        },
          {
                            label: 'Admin',
                            description: 'To display admin commands ',
                            value: '2',
              emoji: '992056774335135864',
                        },
                        {
                            label: 'General',
                            description: 'To display general commands ',
                            value: '3',
              emoji: '992056774335135864',
                        },
                            
                        {
                            label: 'Welcome',
                            description: 'To display music commands ',
                            value: '4',
              emoji: '992056774335135864',
            },
                            
                        {
                            label: 'Delete',
                            description: 'Delete messages list ',
                            value: '5',
              emoji: '992056774335135864',
            }])
    
    let row = new MessageActionRow()
      .addComponents([menu]);
 
    let button = new MessageActionRow()
 
        .addComponents(
            new MessageButton()
  .setStyle('LINK')
  .setLabel('Invite Bot')
  .setURL(`https://discord.com/oauth2/authorize?client_id=${client.user.id}&permissions=8&scope=bot%20applications.commands`))
    
       .addComponents(
            new MessageButton()
  .setStyle('LINK')
  .setLabel('Server Support')
  .setURL(`https://discord.gg/b9wySVyxSG`))
 
 
    let embed = new MessageEmbed()
    
.setImage(`https://cdn.discordapp.com/avatars/1029728935161892937/a4f72170ddabe3cdf829e6dfd235139b.webp`)
       .setColor(message.member.displayHexColor)
      .setTimestamp()
    message.reply({ embeds:[embed], components:[row, button] }).then( msg => {
      let filter = b => b.user.id === message.author.id && b.customId === `help_${message.author.id}`;
      let collector = msg.createMessageComponentCollector({ filter:filter, componentType: 'SELECT_MENU', time:120000 });
      collector.on("collect", (b) => {
        if(b.values[0] === "1") {
              
      const { version: djsversion } = require("discord.js");
    const { version } = require("./package.json");
            let days = Math.floor(client.uptime / 86400000);
          let hours = Math.floor(client.uptime / 3600000) % 24;
          let minutes = Math.floor(client.uptime / 60000) % 60;
          let seconds = Math.floor(client.uptime / 1000) % 60;    
    let embed_1 = new MessageEmbed()
 
  .setAuthor(`Information Bot:`, client.user.displayAvatarURL({dynamic : true})) 
      .setColor(message.guild.me.displayHexColor) 
      .setTimestamp()
        .addFields([
    {
    name: `Bot:`,
    value: `\`\`\`Version: v${version}
Name: ${client.user.tag}
Id: ${client.user.id}
Users: ${client.guilds.cache
          .reduce((a, b) => a + b.memberCount, 0)
          .toLocaleString()}
Guilds Count: ${client.guilds.cache.size.toLocaleString()}
Node.js version: ${process.version}
discord js version: v${djsversion}
Platform: ${process.platform}\`\`\``
},
    {
    name: `Server:`,
    value: `\`\`\`Bot Prefix: ${prefix}
Bot Language: English\`\`\``  
 
}, 
      {
      name: `System:`, 
      value: `\`\`\`Ping: ${client.ws.ping}ms
Uptime: ${seconds}s ${minutes}m ${hours}h ${days}d\`\`\``
}
]) 
          b.update({ embeds:[embed_1], components:[row, button] }).catch(err => {});
        } else if(b.values[0] === "2") {
      let embed_1 = new MessageEmbed()
        
  .setAuthor(`Admin Commands:`, client.user.displayAvatarURL({dynamic : true}))
      .setColor(message.guild.me.displayHexColor) 
      .setTimestamp()
        .addFields([
    {
      name: `${prefix}قفل | ق`, 
      value: `قفل الشات`
},
    {
      name: `${prefix}فنح | ف`, 
      value: `فتح الشات`  
 
}, 
      {
      name: `${prefix}mute`, 
      value: `اعطاء ميوت`
},
     {
      name: `${prefix}unmute`, 
      value: `فك ميوت`
},
     {
      name: `${prefix}kick | ${prefix}طرد | برا`, 
      value: `طرد العضو`
},
     {
      name: `${prefix}clear | مسح `, 
      value: `مسح الشات`
},
     {
      name: `${prefix}say`, 
      value: `رساله يارسله البوت`
},
               {
      name: `${prefix}create`, 
      value: `انشاء شات كتابي`
},
])
          b.update({ embeds:[embed_1], components:[row, button] }).catch(err => {});
  } else if(b.values[0] === "3") {
let embed_1 = new MessageEmbed()
            
   .setAuthor(`General Commands:`, client.user.displayAvatarURL({dynamic : true}))
      .setColor(message.guild.me.displayHexColor) 
      .setTimestamp()
        .addFields([
    {
      name: `${prefix}avatar | A`, 
      value: `اضهار الافتار`
},
    {
      name: `${prefix}id`, 
      value: `كشف الحساب`  
 
}, 
      {
      name: `${prefix}id`, 
      value: `Description`
}
])
  b.update({ embeds:[embed_1], components:[row, button] }).catch(err => {});
        } else if(b.values[0] === "4") {
let embed_1 = new MessageEmbed()
      
  .setAuthor(`Welcome Commands:`, client.user.displayAvatarURL({dynamic : true}))
      .setColor(message.guild.me.displayHexColor) 
      .setTimestamp()
        .addFields([
    {
      name: `${prefix}set-channel`, 
      value: `لتعين روم الترحيب`
},
    {
      name: `${prefix}set-message`, 
      value: `لتعين رسالة الترحيب`  
 
},
              {
      name: `${prefix}welcome [ on/off ]`, 
      value:  `لتفعيل وضع الترحيب او ايقافه`  
 
},
      {
      name: `
[user] - منشن الشخص المُضاف
[userName] - اسم الشخص المُضاف بدون منشن
[memberCount] - عدد الاعضاء داخل السيرفر
[server] - اسم السيرفر
[inviter] - منشن الشخص الداعي
[inviterName] - اسم الشخص الداعي
      `, 
      value:  `مثال -set-message Welcome To [server]
      [user] 
      By [inviter]`  

}
])
          b.update({ embeds:[embed_1], components:[row, button] }).catch(err => {})
  } else if(b.values[0] === "5") {
          msg.delete().catch(err => {});
          message.delete().catch(err => {});
        }
      });
    });
  }
});



//تست
  
client.login(token);
