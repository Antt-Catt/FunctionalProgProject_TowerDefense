type pointType = { i: number, j: number};
type worldType = {points : number };
type chemin ={};
/*type actorT = {
    range : number,
    speed : number,

};
type actorM = {
    life : number,
    speed : number,

};

type actorType = {
    pos: pointType,
    type : string,
    classe : actorT | actorM
    actions: {(actor:actorType,aWorld: worldType):pointType} | {(actor:actorType,aWorld: worldType, aPath:chemin):pointType}
};

const towers:actorType = {
    pos : {i:4,j:5},
    type : "tower",
    classe : {range : 5, speed: 1},
    actions : tir,
};

function tir(actor:actorType,aWorld: worldType):pointType{
    const points:pointType = {i:2,j:4};
    return points ;
}*/

type Actor = {
    position : pointType;
    characteristics : Record<string, any>; //pour des infos plus specifiques, par ex les tours : attaque de zone ou unique, ralentir etc.
    type : 'enemy' | 'tower';
}

type Action = (actor: Actor, world: worldType) => any;

type Enemy = Actor &  {
    type : 'enemy';
    health: number;
    speed: number;
    actions: {
        move: Action;
        // attack: Action;
    }
}

type Tower = Actor & {
    type : 'tower';
    damage : number;
    range : number;
    cooldown : number;
    actions: {
        attack: Action;
    }
}

const towers: Tower = {
    type : 'tower',
    position : {i:2,j:4},
    characteristics : {attack : 'unique'},
    damage : 10,
    range : 3,
    cooldown : 1,
    actions : {
        attack : towerAttack,
    }
};

function towerAttack() {
    
}

const world:worldType = {
    points:14,
}

export{
    pointType,
    worldType,
    towers,
    world,
}