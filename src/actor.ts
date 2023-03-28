type actorType = {
    pos: pointType
    actions: {(anActor: actorType, aWorld: worldType):pointType}
}; //i, j position, s speed attack, t attack type