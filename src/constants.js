module.exports = {
    managerModes: { WAITING: 'WAITING', ANNOUNCED: 'ANNOUNCED', COLLECTING: 'COLLECTING', LIKETIME: 'LIKETIME' },

    roundHours: [15, 18, 21],
    hoursForNotifyingGroupRules: [10, 13, 17],

    groupRulesText: "group rules",

    announceText: "Next round starts in 20 minutes, please get ready to submit your account name. Do not post your username until I've said to or else you'll miss the round",
    announceMinutes: 20, //the announce time in minutes before round starts. It could be 1-59 

    startCollectingTextIntro: "Comment your Instagram @accountname now to get added to the next engagement round", //1
    startCollectingTextInstruction: "90 minutes left to comment your Instagram @accountname for inclusion in this engagement round", //2
    delay: 1500, //ms, delay between intro and instruction

    thirtyMinsLeftText: "30 minutes left to comment your Instagram @accountname for inclusion in this engagement round",
    tenMinsLeftText: "10 minutes left to comment your Instagram @accountname for inclusion in this engagement round",

    likeTimeText: "The round starts now! Copy and paste the username lists into your Instagram Direct Messages, then click through each account and like and leave a 3+ word comment on the most recent post for each account",
    likeEndText: "The round is closed, will check if everyone that joined the round liked/commented."
}