type pointType = { i: number, j: number}
type worldType = {points : number }



type actorType = {
    pos: pointType,
    type : string,
    carac: number, //
    actions: {(actor:actorType,aWorld: worldType):pointType}
};

function tir(actor:actorType,aWorld: worldType):pointType{
    const points:pointType = {i:2,j:4};
    return points ;
}

const towers:actorType = {
    pos : {i:4,j:5},
    type : "tower",
    carac : 5,
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