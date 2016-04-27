window.cheat.fill = function(type, base) {
    if (!base) {
        if (window.game.heirlooms.Shield.storageSize.currentBonus > 0) {
            window.game.resources[type].owned = ((window.game.resources[type].max * (window.game.portal.Packrat.level * window.game.portal.Packrat.modifier)) * window.game.heirlooms.Shield.storageSize.currentBonus) + window.game.resources[type].max;
        } else {
            window.game.resources[type].owned = ((window.game.resources[type].max * (window.game.portal.Packrat.level * window.game.portal.Packrat.modifier)) + window.game.resources[type].max);
        };
    } else {    
        if (window.game.heirlooms.Shield.storageSize.currentBonus > 0) {
            window.game.resources[type].owned = ((window.game.resources[base].max * (window.game.portal.Packrat.level * window.game.portal.Packrat.modifier)) + window.game.resources[base].max * window.game.heirlooms.Shield.storageSize.currentBonus);
        } else {
            window.game.resources[type].owned = ((window.game.resources[base].max * (window.game.portal.Packrat.level * window.game.portal.Packrat.modifier)) + window.game.resources[base].max);
        }
    }
}
window.cheat.mapResource = function() {
    window.createMap(1 + window.game.stats.zonesCleared.value, "puppy0cam Caves", "Depths", 2.6, 25, 0.75, false, "puppy0cam Caves");
}
window.cheat.ruinTheFun = function() {
    window.cheat.fill('food');
    window.cheat.fill('wood');
    window.cheat.fill('metal');
    window.cheat.fill('fragments', 'food');
    window.cheat.fill('science', 'food');
    window.cheat.fill('gems', 'food');
    window.cheat.fill('helium', 'food');
    window.game.resources.trimps.owned = window.game.resources.trimps.realMax();
}
window.cheat.buyStuff = function(thing) {
    window.cheat.buyBuilding(thing);
    window.cheat.ruinTheFun();
}
window.cheat.heirloomFinding = function() {
    window.game.heirlooms.rarityBreakpoints[8] = 200;
    window.game.heirlooms.rarities[9] = [];
    window.game.heirlooms.rarities[9][0] = -1;
    window.game.heirlooms.rarities[9][1] = -1;
    window.game.heirlooms.rarities[9][2] = -1;
    window.game.heirlooms.rarities[9][3] = -1;
    window.game.heirlooms.rarities[9][4] = 6000;
    window.game.heirlooms.rarities[9][5] = 3000;
    window.game.heirlooms.rarities[9][6] = 1000;
}
window.cheat.sellHeirloom = function() {
    if (window.game.global.heirloomsExtra[0] == undefined) {
        window.message("ALERT: you do not have an heirloom to sell!", "Notices");
    } else {
        window.selectHeirloom(window.game.global.heirloomsExtra.length - 1, 'heirloomsExtra', this);
        window.recycleHeirloom(true);
    }
}
window.extraHeirlooms.innerHTML = extraHeirlooms.innerHTML + '<div id="sellHeirlooms" class="noselect heirloomBtnActive heirBtn" onclick="sellHeirloom()">Sell one</div>';
