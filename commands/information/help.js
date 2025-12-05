const { MessageEmbed, MessageActionRow, MessageButton, MessageSelectMenu } = require('discord.js');

module.exports = {
    name: 'help',
    aliases: ['h','madat'],
    description: `Show's the help command.`,
    category: 'info',
    premium: false,
    run: async (client, message, args) => {
        let prefix = message.guild?.prefix || '&'; // default prefix if not set

        const query = args[0]; // Get the query (command name) from arguments

        if (query) {
            const command = client.commands.get(query) || client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(query));

            if (!command) {
                return message.reply('Command not found!');
            }

            const aliases = command.aliases && command.aliases.length > 0 ? `\`${command.aliases.join(', ')}\`` : 'None';
            const embed = new MessageEmbed()
                .setColor(client.color)
                .setDescription(command.description || 'No description available.');

            // Add fields sequentially
            embed.addField('Aliases', `\`${aliases}\``);
            
            // Check if the command has subcommands
            if (command.subcommand && command.subcommand.length > 0) {
                const subcommands = command.subcommand.map(subcmd => `\`${subcmd}\``).join(', ');
                embed.addField('Subcommands', subcommands);
            }
            
            if (typeof command.premium !== 'undefined') {
                embed.addField('Premium', command.premium ? `\`Yes\`` : `\`No\``);
            }
            
            embed.addField('Usage', `\`${prefix}${command.name}\``);

            // Set author, thumbnail, and footer
            embed.setAuthor(message.author.tag, message.author.displayAvatarURL({ dynamic: true }))
                .setThumbnail(client.user.displayAvatarURL({ dynamic: true }))
                .setFooter('Trick Is Love', 'https://cdn.discordapp.com/avatars/760143551920078861/a6f1e1989177fbb4c7f3d44498418d22.png?size=2048');

            return message.channel.send({ embeds: [embed] });
        }  
        // Create a MessageSelectMenu
        const selectMenu = new MessageSelectMenu()
            .setCustomId('categorySelect')
            .setPlaceholder('Harm Get Started!')
            .addOptions([
                {
                    label: 'AntiNuke',
                    value: 'antinuke',
                    description: 'Commands related to AntiNuke',
                },
                {
                    label: 'Moderation',
                    value: 'mod',
                    description: 'Commands related to Moderation',
                },
                {
                    label: 'Utility',
                    value: 'info',
                    description: 'Utility commands',
                },
                {
                    label: 'Welcomer',
                    value: 'welcomer',
                    description: 'Commands for Welcomer',
                },
                {
                    label: 'Reactionrole',
                    value: 'Reactionrole',
                    description: 'Commands for Reactionrole',
                },
                {
                    label: 'Ticket',
                    value: 'Ticket',
                    description: 'Commands for Ticket',
                },
                {
                    label: 'Voice',
                    value: 'voice',
                    description: 'Commands related to Voice',
                },
                {
                    label: 'Custom Role',
                    value: 'customrole',
                    description: 'Commands for Custom Roles',
                },
                {
                    label: 'Logging',
                    value: 'logging',
                    description: 'Commands for Logging',
                },
                {
                    label: 'Automod',
                    value: 'automod',
                    description: 'Commands for Automod',
                },
                {
                    label: 'Autorespond',
                    value: 'Autorespond',
                    description: 'Commands for Autorespond',
                },
                {
                    label: 'Giveaway',
                    value: 'Giveaway',
                    description: 'Commands for Giveaway',
                },
                {
                    label: 'Fun',
                    value: 'Fun',
                    description: 'Commands for Fun',
                },
                {
                    label: 'All Commands',
                    value: 'All Commands',
                    description: 'All Commands',
                }                                                 
            ]);

        // Buttons
        const buttons = new MessageActionRow().addComponents(
            new MessageButton()
                .setLabel('Invite Me')
                .setStyle('LINK')
                .setURL(`https://discord.com/api/oauth2/authorize?client_id=${client.user.id}&permissions=8&scope=bot`),
            new MessageButton()
                .setLabel('Support Me')
                .setStyle('LINK')
                .setURL('https://discord.gg/hindustani'),
            new MessageButton()
                .setCustomId('home')
                .setLabel('Home')
                .setStyle('SECONDARY'),
            new MessageButton()
                .setCustomId('delete')
                .setLabel('Delete')
                .setStyle('DANGER')
        );

        const initialEmbed = new MessageEmbed()
            .setColor(client.color)
            .setAuthor({
                name: `${client.user.username} Help Menu`,
                iconURL: client.user.displayAvatarURL({ dynamic: true })
            })
            .setThumbnail(message.author.displayAvatarURL({ dynamic: true }))
            .setDescription(
                `Hello ! I'm **${client.user.username}**, your all-in-one server management and security bot with powerful features.\n\n \<:dot:1433712610758627371> **Prefix for this server** \`${prefix}\`\n<:dot:1433712610758627371> **Total Commands: **\`${client.commands.size}\`\n<:dot:1433712610758627371>  **Type ${prefix}dangermode enable  to enhance security!**`)
            .addField('`<> - Required | () - Optional`', '\u200B', false)
            .addField(
                    '__Modules__',
                    `
                    <:emoji_1764751777627:1445698481409753241> **AntiNuke**
                    <:emoji_1764751781331:1445698496912162946> **Moderation**
                    <:emoji_1762537505269:1436411150160891976> **Utility**
                    <:emoji_1764751794423:1445698552184701009>  **Welcomer**
                    <:emoji_1764751797507:1445698564914155520> **Reaction Role**
                    <:emoji_1764751800598:1445698577803509932>  **Ticket**
                    <:emoji_1764751803942:1445698592105824268> **Voice**
                    <:emoji_1764752650666:1445702144597426176> **Customrole**
                    <:emoji_1764752658249:1445702175387816038>**Logging**
                    <:emoji_1764752660894:1445702187165679656> **Automod**
                    <:emoji_1764752664115:1445702215175114794>**Autorespond**
                    <:stolen_emoji:1445699901127135293> **Giveaway**
                    <:stolen_emoji:1445696905010221178> **Fun**
                    `,
                    false
                )
                .setThumbnail(client.user.displayAvatarURL({ dynamic: true }))
                .addField(
                    'Links',
                    `[Support](https://dsc.gg/rynxsupport) | [Invite Me](https://discord.com/api/oauth2/authorize?client_id=${client.user.id}&permissions=8&scope=bot)`,
                    true
                )
                .setFooter({
                    text: `Developed by r3tract0 </>.`,
                    iconURL: 'https://images-ext-1.discordapp.net/external/R5FaJYZtxJKRpud5nY_i3Vg4NVAkQuANcTuLOt3hckg/%3Fsize%3D2048/https/cdn.discordapp.com/avatars/1237086498076098762/a66bb0f21cdc7c397f3ab3bc87445d98.webp?width=662&height=662'
                });
                

        const helpMessage = await message.channel.send({ embeds: [initialEmbed], components: [new MessageActionRow().addComponents(selectMenu), buttons] });

        const collector = helpMessage.createMessageComponentCollector({
            filter: (i) => i.user.id === message.author.id,
            time: 120000
        });

        const updateEmbed = (embed, category, commands) => {
            embed.fields = []; // Clear the fields
            embed.setDescription(`**${category.charAt(0).toUpperCase() + category.slice(1)} Commands**\n${commands.join(', ')}`);
            return embed;
        };

        collector.on('collect', async (i) => {
            if (i.isButton()) {
                if (i.customId === 'home') {
                    await helpMessage.edit({ embeds: [initialEmbed] });
                    i.deferUpdate();
                } else if (i.customId === 'delete') {
                    await helpMessage.delete();
                    i.deferUpdate();
                }
            } else if (i.isSelectMenu()) {
                const category = i.values[0];
                let commands = [];
                switch (category) {
                    case 'antinuke':
                        commands = client.commands
                            .filter((x) => x.category && x.category === 'security')
                            .map((x) => `\`${x.name}\``);
                        break;
                    case 'mod':
                        commands = client.commands
                            .filter((x) => x.category && x.category === 'mod')
                            .map((x) => `\`${x.name}\``);
                        break;
                    case 'info':
                        commands = client.commands
                            .filter((x) => x.category && x.category === 'info')
                            .map((x) => `\`${x.name}\``);
                        break;
                    case 'welcomer':
                        commands = client.commands
                            .filter((x) => x.category && x.category === 'welcomer')
                            .map((x) => `\`${x.name}\``);
                        break;
                    case 'voice':
                        commands = client.commands
                            .filter((x) => x.category && x.category === 'voice')
                            .map((x) => `\`${x.name}\``);
                        break;
                    case 'automod':
                        commands = client.commands
                            .filter((x) => x.category && x.category === 'automod')
                            .map((x) => `\`${x.name}\``);
                        break;   
                    case 'customrole':
                        commands = client.commands
                            .filter((x) => x.category && x.category === 'customrole')
                            .map((x) => `\`${x.name}\``);
                        break;
                    case 'logging':
                        commands = client.commands
                            .filter((x) => x.category && x.category === 'logging')
                            .map((x) => `\`${x.name}\``);
                        break;
                    case 'Ticket':
                        commands = client.commands
                            .filter((x) => x.category && x.category === 'tic')
                            .map((x) => `\`${x.name}\``);
                        break; 
                    case 'Giveaway':
                        commands = client.commands
                            .filter((x) => x.category && x.category === 'give')
                            .map((x) => `\`${x.name}\``);
                        break;  
                    case 'Autorespond':
                        commands = client.commands
                            .filter((x) => x.category && x.category === 'autores')
                            .map((x) => `\`${x.name}\``);
                        break;  
                    case 'Fun':
                        commands = client.commands
                            .filter((x) => x.category && x.category === 'fun')
                            .map((x) => `\`${x.name}\``);
                        break; 
                    case 'Reactionrole':
                        commands = client.commands
                            .filter((x) => x.category && x.category === 'rrole')
                            .map((x) => `\`${x.name}\``);
                        break;  
                    case 'AI':
                        commands = client.commands
                            .filter((x) => x.category && x.category === 'ai')
                            .map((x) => `\`${x.name}\``);
                        break;                                                                                                
                                                
                }
                const updatedEmbed = updateEmbed(new MessageEmbed(initialEmbed), category, commands); // Create a new embed based on the initial one
                await helpMessage.edit({ embeds: [updatedEmbed] });
                i.deferUpdate();
            }
        });

        collector.on('end', collected => {
            if (collected.size === 0) {
                // Disable components after 60 seconds
                selectMenu.setDisabled(true);
                buttons.components.forEach(button => button.setDisabled(true));
                helpMessage.edit({ components: [new MessageActionRow().addComponents(selectMenu), buttons] });
            }
        });

        // Add a listener for interactions not belonging to the message author
        const otherUserCollector = helpMessage.createMessageComponentCollector({
            filter: (i) => i.user.id !== message.author.id,
            time: 120000
        });

        otherUserCollector.on('collect', async (i) => {
            await i.reply({ content: 'Bro, This is not your interaction.', ephemeral: true });
        });

        // Disable dropdown and buttons after 60 seconds
        setTimeout(async () => {
            selectMenu.setDisabled(true);
            buttons.components.forEach(button => button.setDisabled(true));
            await helpMessage.edit({ components: [new MessageActionRow().addComponents(selectMenu), buttons] });
            await helpMessage.edit({ embeds: [initialEmbed] });
        }, 120000);
    }
};
