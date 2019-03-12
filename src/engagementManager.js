const {
    managerModes,
    groupRulesText,
    hoursForNotifyingGroupRules,
    roundHours,
    announceMinutes,
    announceText,
    delay,
    startCollectingTextIntro,
    startCollectingTextInstruction,
    thirtyMinsLeftText,
    tenMinsLeftText,
    likeTimeText,
    likeEndText } = require('./constants');

const { getMinutesDiff, getUserListMessage } = require('./helpers');

class EngagementManager {
    constructor(annotateFunction, annotateHTMLFunction, isDebug) {
        if (!annotateFunction || !annotateHTMLFunction) {
            throw 'Management is impossible without tool of annotation!';
        }

        this.annotate = annotateFunction;
        this.annotateHTML = annotateHTMLFunction;
        this.currentMode = managerModes.WAITING;
        this.collectingStartTime = null;
        this.likeStartTime = null;
        this.candidates = [];

        this.isDebug = !!isDebug;
    }

    addCandidate(name) {
        this.candidates.push(name);
    }

    start() {
        console.log('[Enagement Manager] has been started!');
        console.log(`[Enagement Manager] Number constants: hoursForNotifyingGroupRules: ${hoursForNotifyingGroupRules}, roundHours: ${roundHours}, announceMinutes: ${announceMinutes}`);

        const intervalDelay = 1000 * 20; //run each 20sec
        const manage = () => {
            let timeNow = new Date();
            let currentHour = timeNow.getHours();
            let currentMin = timeNow.getMinutes();

            console.log(`[Enagement Manager] interval running. Current Mode = ${this.currentMode}, H = ${currentHour}, M = ${currentMin}`);

            switch (this.currentMode) {
                //In case the manager is waiting, 
                case managerModes.WAITING: {
                    //now is 0 minute and hour equals to HourForNotifyingGroupRules
                    //let's annotates rules
                    let needToSendRules = currentMin === 0 && hoursForNotifyingGroupRules.includes(currentHour);
                    //otherwise if curent time is announceMinutes
                    //the manager makes announcement
                    let needToAnnounce = roundHours.includes(currentHour + 1) && currentMin === announceMinutes;

                    //set all bools in true for easy debug
                    if (this.isDebug) {
                        needToAnnounce = needToSendRules = true;
                    }

                    if (needToSendRules) {
                        this.annotate(groupRulesText);
                    }
                    if (needToAnnounce) {
                        this.annotate(announceText);
                        this.currentMode = managerModes.ANNOUNCED;
                    }
                    break;
                }
                case managerModes.ANNOUNCED: {
                    //if round is close and the manager announced it
                    //we need to wait for exact round's hour
                    let needToStartCollecting = roundHours.includes(currentHour) && currentMin == 0;

                    //set all bools in true for easy debug
                    if (this.isDebug) {
                        needToStartCollecting = true;
                    }

                    if (needToStartCollecting) {
                        this.collectingStartTime = timeNow;
                        setTimeout(() => {
                            this.annotate(startCollectingTextInstruction);
                        }, delay); //we need to show people intro text and after a little delay send main info. it's just for beauty
                        this.annotate(startCollectingTextIntro);
                        this.currentMode = managerModes.COLLECTING;
                    }
                    break;
                }
                case managerModes.COLLECTING: {
                    //okay. now it's collecting time. we need just keep attention on minutes
                    let minutesFromStart = getMinutesDiff(timeNow, this.collectingStartTime);

                    let needToAnnoutate30MinsLeft = minutesFromStart === 60;
                    let needToAnnoutate10MinsLeft = minutesFromStart === 80;
                    let needToFinishCollecting = minutesFromStart === 90;

                    //set all bools in true for easy debug
                    if (this.isDebug) {
                        needToFinishCollecting = needToAnnoutate10MinsLeft = needToAnnoutate30MinsLeft = true;
                    }

                    if (needToAnnoutate30MinsLeft) {//before 30 mins 60
                        this.annotate(thirtyMinsLeftText);
                    }
                    if (needToAnnoutate10MinsLeft) {//before 10 mins 80
                        this.annotate(tenMinsLeftText);
                    }
                    if (needToFinishCollecting) {//finish collecting. now is like time
                        this.collectingStartTime = null;

                        this.currentMode = managerModes.LIKETIME;
                        this.annotate(likeTimeText);

                        this.likeStartTime = timeNow;

                        setTimeout(() => {
                            var list = getUserListMessage(this.candidates);
                            this.annotateHTML(list);
                        }, 1500);
                    }
                    break;
                }
                //if now is like time
                case managerModes.LIKETIME: {
                    //just check that now is not more than 60 min after starting like time
                    let needToFinishLikeTime = getMinutesDiff(timeNow, this.likeStartTime) >= 60;

                    //set all bools in true for easy debug
                    if (this.isDebug) {
                        needToFinishLikeTime = true;
                    }

                    if (needToFinishLikeTime) {
                        this.currentMode = managerModes.WAITING;
                        this.candidates = [];
                        this.annotate(likeEndText);
                        this.likeStartTime = null;
                    }
                    break;
                }
                default:
                    break;
            }
        }
        manage();

        setInterval(manage, intervalDelay);
    }
}

module.exports = EngagementManager;