type pointType = { i: number, j: number};
type worldType = {points : number };
type chemin ={};
type actorT = {
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

function tir(actor:actorType,aWorld: worldType):pointType{
    const points:pointType = {i:2,j:4};
    return points ;
}

const towers:actorType = {
    pos : {i:4,j:5},
    type : "tower",
    classe : {range : 5, speed: 1},
    actions : tir,
};

const world:worldType = {
    points:14,
}

export{
    pointType,
    worldType,
    actorType,
    towers,
    world,
    tir,
}