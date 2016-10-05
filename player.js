
exports = module.exports = {

  VERSION: 'Superstar poker js-player',

  bet: function (gamestate) {

  'use strict';

    //
    // gamestate contains info about the state of the game.
    // check the documentation at https://bot-poker.herokuapp.com/wiki#gamestate for further info about the data structure.

    var gsMock = {
        "tournamentId": "56ec25834c87d903006f3f8b",
        "game": 1,
        "round": 1,
        "spinCount": 0,
        "sb": 25,
        "buyin": 500,
        "pot": 75,
        "sidepots": [],
        "commonCards": [],
        "players": [
            {
                "id": 0,
                "name": "Arale",
                "status": "active",
                "cards": [
                    {
                        "rank": "K",
                        "type": "C"
                    },
                    {
                        "rank": "2",
                        "type": "H"
                    }
                ],
                "chips": 500,
                "chipsBet": 0
            },
            {
                "id": 1,
                "name": "Marvin",
                "status": "out",
                "cards": [
                    {
                        "rank": "10",
                        "type": "S"
                    },
                    {
                        "rank": "7",
                        "type": "D"
                    }
                ],
                "chips": 500,
                "chipsBet": 0
            },
            {
                "id": 2,
                "name": "R2D2",
                "status": "folded",
                "cards": [
                    {
                        "rank": "9",
                        "type": "H"
                    },
                    {
                        "rank": "J",
                        "type": "H"
                    }
                ],
                "chips": 500,
                "chipsBet": 0
            },
            {
                "id": 3,
                "name": "Bender",
                "status": "active",
                "cards": [
                    {
                        "rank": "A",
                        "type": "S"
                    },
                    {
                        "rank": "6",
                        "type": "S"
                    }
                ],
                "chips": 475,
                "chipsBet": 25
            },
            {
                "id": 4,
                "name": "Emilio",
                "status": "active",
                "cards": [
                    {
                        "rank": "3",
                        "type": "D"
                    },
                    {
                        "rank": "4",
                        "type": "S"
                    }
                ],
                "chips": 450,
                "chipsBet": 50
            }
        ],
        "db": 2,
        "me": 1,
        "callAmount": 50,
        "minimumRaiseAmount": 100
    };

    var cards = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'];

    var gs = gamestate,
        bet = 0;

    var me = gs.players[gs.me];
    var mycards = me.cards;
    var mycard1 = me.cards[0];
    var mycard2 = me.cards[1];

    var currentstep = gs.commonCards.length;

    var allcards = mycards.concat(gs.commonCards);

    function groupByRank(cards){

        return cards.reduce(function (acc, curr) {
            if (typeof acc[curr.rank] == 'undefined') {
                acc[curr.rank] = 1;
            } else {
                acc[curr.rank] += 1;
            }
            return acc;
        }, {});
    }

    function hasPair(cards){
        var g = groupByRank(cards);
        for (var i in g) {
            if(g[i] === 2) return true;
        }
        return false;
    }

    function hasPairServed(){
        return mycard1.rank == mycard2.rank
    }

    function hasDoublePair(cards){
        var g = groupByRank(cards);
        return cards.length >= 4 && cards.length === Object.keys(g).length + 2;
    }

    function hasTris(cards){
        var g = groupByRank(cards);
        for (var i in g) {
            if(g[i] === 3) return true;
        }
        return false;
    }

    function hasFull(cards){
        if(hasPair(cards) && hasTris(cards)) return true
        else return false
    }

    function hasPoker(cards){
        var g = groupByRank(cards);

        for (var i in g) {
            if(g[i] === 4) return true;
        }

        return false;
    }

    function numRank(card){
        return cards.indexOf(card) + 2;
    }

    // do not fold if cards are not shit
    if( numRank(mycard1.rank) + numRank(mycard2.rank) > 8 && currentstep == 0 )
        bet = gs.callAmount;

    // bet if doppia coppia
    if(hasPairServed())
        bet = gs.callAmount;

    // bet if cards value is more than 20
    if( numRank(mycard1.rank) + numRank(mycard2.rank) > 20 ){
        bet = gs.callAmount;
    }

    if( hasPair(allcards) ){
        bet = gs.callAmount;
    }

    if( hasDoublePair(allcards) ){
        bet = gs.minimumRaiseAmount;
    }

    if( hasTris(allcards)){
        bet = gs.minimumRaiseAmount * 2;
    }

    if( hasPoker(allcards) ){
        bet = me.chips;
    }

    if (currentstep == 1){

    } else if(currentstep == 2){



    } else if(currentstep == 3){



    }

    console.log(bet);

    return bet;

  }

};
