/**
 * @file guildCreate event
 * @author Sankarsan Kampa (a.k.a k3rn31p4nic)
 * @license MIT
 */

module.exports = guild => {
  guild.client.db.run('INSERT OR IGNORE INTO guildSettings (guildID) VALUES (?)', [ guild.id ]).catch(e => {
    guild.client.log.error(e);
  });

  guild.client.webhook.send('bastionLog', {
    color: guild.client.colors.GREEN,
    title: guild.client.strings.events(guild.language, 'guildCreate'),
    fields: [
      {
        name: 'Server Name',
        value: guild.name,
        inline: true
      },
      {
        name: 'Server ID',
        value: guild.id,
        inline: true
      },
      {
        name: 'Server Owner',
        value: guild.owner ? guild.owner.user.tag : 'Unknown',
        inline: true
      },
      {
        name: 'Server Owner ID',
        value: guild.ownerID,
        inline: true
      }
    ],
    thumbnail: {
      url: guild.icon ? guild.iconURL : `https://dummyimage.com/128/7289DA/FFFFFF/&text=${encodeURIComponent(guild.nameAcronym)}`
    },
    timestamp: new Date()
  });
};
