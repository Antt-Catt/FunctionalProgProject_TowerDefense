
type actorType = {
    pos: pointType,
    type : string,
    carac: number,
    actions: {(actor:actorType,aWorld: worldType):pointType}
}; //i, j position, s speed attack, t attack type


const towers :actorType = {
    pos : 0,
    type : "tower",
    carac : 5,
    actions : function (tower:actorType, world: worldType):
};