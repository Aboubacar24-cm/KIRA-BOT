const { zokou } = require("../framework/zokou");
const {getAllSudoNumbers,isSudoTableNotEmpty} = require("../bdd/sudo")
const conf = require("../set");

zokou({ nomCom: "proprio", categorie: "Général", reaction: "💞" }, async (dest, zk, commandeOptions) => {
    const { ms , mybotpic } = commandeOptions;
    
  const thsudo = await isSudoTableNotEmpty()

  if (thsudo) {
     let msg = `*KIRA-BOT Super-User*\n
     *Numero proprietaire\n* :
- 🌟 @${conf.NUMERO_OWNER}

------ *Autres sudos* -----\n`
     
 let sudos = await getAllSudoNumbers()

   for ( const sudo of sudos) {
    if (sudo) { // Vérification plus stricte pour éliminer les valeurs vides ou indéfinies
      sudonumero = sudo.replace(/[^0-9]/g, '');
      msg += `- 💼 @${sudonumero}\n`;
    } else {return}

   }   const ownerjid = conf.NUMERO_OWNER.replace(/[^0-9]/g) + "@s.whatsapp.net";
   const mentionedJid = sudos.concat([ownerjid])
   console.log(sudos);
   console.log(mentionedJid)
      zk.sendMessage(
        dest,
        {
          image : { url : 'https://telegra.ph/file/a65b31d0822efe8163655.jpg'},
          caption : msg,
          mentions : mentionedJid
        }
      )
  } else {
    const vcard =
        'BEGIN:VCARD\n' + // metadata of the contact card
        'VERSION:3.0\n' +
        'FN:' + conf.NOM_OWNER + '\n' + // full name
        'ORG:undefined;\n' + // the organization of the contact
        'TEL;type=CELL;type=VOICE;waid=' + conf.NUMERO_OWNER + ':+' + conf.NUMERO_OWNER + '\n' + // WhatsApp ID + phone number
        'END:VCARD';
    zk.sendMessage(dest, {
        contacts: {
            displayName: conf.NOM_OWNER,
            contacts: [{ vcard }],
        },
    },{quoted:ms});
  }
});

zokou({ nomCom: "developpeur", categorie: "Général", reaction: "💞" }, async (dest, zk, commandeOptions) => {
    const { ms, mybotpic } = commandeOptions;

    const devs = [
      { nom: "𓆩꧁𝕊𝔼ℂ𝕂𒆜𝐋𝐈𝐆𝐇𝐓 𝐘𝐀𝐆𝐀𝐌𝐈꧂𓆪", numero: "224664873993" },
      { nom: "᚛𝐒𝐤𝐢𝐥𝐥𝐒𝐞𝐧𝐬𝐞𝐢᚜", numero: "224620505291" },
      // Ajoute d'autres développeurs ici avec leur nom et numéro
    ];

    let message = "👋 Bienvenue chez 𝐊𝐈𝐑𝐀-𝐁𝐎𝐓 ! Voici les développeurs :\n\n";
    for (const dev of devs) {
      message += `----------------\n• ${dev.nom} : https://wa.me/${dev.numero}\n`;
    }
  var lien = mybotpic()
    if (lien.match(/\.(mp4|gif)$/i)) {
    try {
        zk.sendMessage(dest, { video: { url: lien }, caption:message }, { quoted: ms });
    }
    catch (e) {
        console.log("🥵🥵 Menu erreur " + e);
        repondre("🥵🥵 Menu erreur " + e);
    }
} 
// Vérification pour .jpeg ou .png
else if (lien.match(/\.(jpeg|png|jpg)$/i)) {
    try {
        zk.sendMessage(dest, { image: { url: lien }, caption:message }, { quoted: ms });
    }
    catch (e) {
        console.log("🥵🥵 Menu erreur " + e);
        repondre("🥵🥵 Menu erreur " + e);
    }
} 
else {
    repondre(lien)
    repondre("Le lien ne se termine ni par .mp4 ou .gif ni par .jpeg , jpg ou .png");
    
}
});

zokou({ nomCom: "support", categorie: "Général" }, async (dest, zk, commandeOptions) => {
  const { ms, repondre, auteurMessage, } = commandeOptions; 
 
  repondre("Veillez voir la discussion privé pour le lien svp ")
  await zk.sendMessage(auteurMessage,{text : `https://chat.whatsapp.com/GzWlp7NVuEY3WtCUWhvpu0`},{quoted :ms})

})

zokou({ nomCom: "channel", categorie: "Général" }, async (dest, zk, commandeOptions) => {
  const { ms, repondre, auteurMessage } = commandeOptions;

  if (commandeOptions.nomCom === "channel") {
    const channel = "nom_du_canal"; // Remplacez par le nom du canal où vous souhaitez envoyer le message
    const message = "Veillez voir la discussion privée pour le lien, s'il vous plaît.";

    await zk.sendMessage(channel, { text: message });
    repondre("Le message a été envoyé dans le canal spécifié.");
    await zk.sendMessage(auteurMessage, { text: `https://whatsapp.com/channel/0029VajRS9v89ingqpdJ611A` }, { quoted: ms });
  }
});
