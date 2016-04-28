// ==UserScript==
// @name         Trimp Cheat Tool
// @namespace    http://puppy0cam.guppygalaxy.com/
// @version      0.1.5
// @description  access the cheat tool when you are playing Trimps.github.io please note that to avoid Kongregate cheating this cheat will not activate on the Kongregate version. access the cheat tool through the tampermonkey extension button. there are other functions but they are used to simplify the addition of future cheats.
// @author       puppy0cam
// @match        http://trimps.github.io/*
// @grant        none
// @grant        GM_registerMenuCommand
// @include      http://trimps.github.io/*
// @updateURL    http://puppy0cam.guppygalaxy.com/Trimp-Cheat/Trimps.user.js
// @downloadURL  http://puppy0cam.guppygalaxy.com/Trimp-Cheat/Trimps.user.js
// @run-at       document-end
// ==/UserScript==
/* jshint -W097 */
window.cheat = {};
if (window.game !== undefined) {
    window.cheat.fill = function (type, base) {
        if (!base) {
            if (window.game.heirlooms.Shield.storageSize.currentBonus > 0) {
                window.game.resources[type].owned = ((window.game.resources[type].max * (window.game.portal.Packrat.level * window.game.portal.Packrat.modifier)) * window.game.heirlooms.Shield.storageSize.currentBonus) + window.game.resources[type].max;
            } else {
                window.game.resources[type].owned = ((window.game.resources[type].max * (window.game.portal.Packrat.level * window.game.portal.Packrat.modifier)) + window.game.resources[type].max);
            }
        } else {
            if (window.game.heirlooms.Shield.storageSize.currentBonus > 0) {
                window.game.resources[type].owned = ((window.game.resources[base].max * (window.game.portal.Packrat.level * window.game.portal.Packrat.modifier)) + window.game.resources[base].max * window.game.heirlooms.Shield.storageSize.currentBonus);
            } else {
                window.game.resources[type].owned = ((window.game.resources[base].max * (window.game.portal.Packrat.level * window.game.portal.Packrat.modifier)) + window.game.resources[base].max);
            }
        }
    };
    window.cheat.mapResource = function () {
        window.createMap(1 + window.game.stats.zonesCleared.value, "puppy0cam Caves", "Depths", 2.6, 25, 0.75, false, "puppy0cam Caves");
    };
    window.cheat.ruinTheFun = function () {
        window.cheat.fill('food');
        window.cheat.fill('wood');
        window.cheat.fill('metal');
        window.cheat.fill('fragments', 'food');
        window.cheat.fill('science', 'food');
        window.cheat.fill('gems', 'food');
        window.cheat.fill('helium', 'food');
        window.game.resources.trimps.owned = window.game.resources.trimps.realMax();
    };
    window.cheat.buyStuff = function (thing) {
        window.buyBuilding(thing);
        window.cheat.ruinTheFun();
    };
    window.cheat.heirloomFinding = function () {
        window.game.heirlooms.rarityBreakpoints[8] = 200;
        window.game.heirlooms.rarities[9] = [];
        window.game.heirlooms.rarities[9][0] = -1;
        window.game.heirlooms.rarities[9][1] = -1;
        window.game.heirlooms.rarities[9][2] = -1;
        window.game.heirlooms.rarities[9][3] = -1;
        window.game.heirlooms.rarities[9][4] = 6000;
        window.game.heirlooms.rarities[9][5] = 3000;
        window.game.heirlooms.rarities[9][6] = 1000;
    };
    window.cheat.sellHeirloom = function () {
        if (window.game.global.heirloomsExtra[0] === undefined) {
            window.message("ALERT: you do not have an heirloom to sell!", "Notices");
        } else {
            window.selectHeirloom(window.game.global.heirloomsExtra.length - 1, 'heirloomsExtra', this);
            window.recycleHeirloom(true);
        }
    };
	window.game.badGuys.Improbability.loot = function (level) {
		if (!game.global.brokenPlanet) {
			planetBreaker();
		}
		var amt = rewardResource("helium", 5, level);
		game.global.totalHeliumEarned += amt;
		message("<span class='glyphicon glyphicon-oil'></span> You managed to steal " + prettify(amt) + " Helium canisters from that Improbability. That'll teach it.", "Loot");
		distributeToChallenges(amt);
		if (game.global.challengeActive === "Slow" && game.global.world === 120) {
			message("You have completed the Slow challenge! You have found the patterns for the Gambeson and the Arbalest!", "Notices");
			game.global.challengeActive = "";
			if (!game.global.slowDone) {
				unlockEquipment("Arbalest");
				unlockEquipment("Gambeson");
			}
			game.global.slowDone = true;
		} else if ((game.global.challengeActive === "Nom" && game.global.world === 145) || (game.global.challengeActive === "Toxicity" && game.global.world === 165) || ((game.global.challengeActive === "Watch" || game.global.challengeActive === "Lead") && game.global.world >= 180)) {
			var challenge = game.global.challengeActive;
			var reward = (game.challenges[challenge].heliumMultiplier) ? game.challenges[challenge].heliumMultiplier: 2;
			reward = game.challenges[challenge].heldHelium * reward;
			message("You have completed the " + challenge + " challenge! You have been rewarded with " + prettify(reward) + " Helium, and you may repeat the challenge.", "Notices");
			game.resources.helium.owned += reward;
			game.global.totalHeliumEarned += reward;
			game.challenges[challenge].heldHelium = 0;
			game.global.challengeActive = "";
		} else if (game.global.challengeActive === "Mapology" && game.global.world === 100) {
			message("You have completed the Mapology challenge! You have unlocked the 'Resourceful' Perk! Cheaper stuff!", "Notices");
			game.global.challengeActive = "";
			game.portal.Resourceful.locked = false;
			game.challenges.Mapology.abandon();
		}
	};
    window.extraHeirlooms.innerHTML = extraHeirlooms.innerHTML + '<div id="sellHeirlooms" class="noselect heirloomBtnActive heirBtn" onclick="window.cheat.sellHeirloom()">Sell one</div>';
    delete window.addItem;
    window.message("Trimp Cheats by puppy0cam loaded: to access the basic cheats open the tampermonkey extension button.", "Notices");
    window.message("to access the complex cheats you can use your browser's developer tools. the cheats are stored in 'cheat' as an object", "Notices");
}
GM_registerMenuCommand('Create Ideal Map', function () {
    window.cheat.mapResource();
}, 'M');
GM_registerMenuCommand('Sell an heirloom that is in your Extra Heirloom Tab', function () {
    window.cheat.sellHeirloom();
}, 'S');
GM_registerMenuCommand('Adjust Heirloom rarities', function () {
    window.cheat.heirloomFinding();
}, 'H');
GM_registerMenuCommand('Fill all resource storages', function () {
    window.cheat.ruinTheFun();
}, 'R');