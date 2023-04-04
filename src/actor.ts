
import { sortAndDeduplicateDiagnostics } from "typescript";
type Tile = { i: number, j: number,pos: pointType};
type pointType = { x: number, y: number};
type worldType = {points : number };

const nil = {};
function isEmpty<T>(l:Array<T>){
    return l === nil;
}
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

type Action = (actor: Actor, world: worldType) => number;

type Enemy = Actor & { 
    type : 'enemy';
    health: number;
    speed: number;
    actions: {
        move: Action;
        // attack: Action;
    }
    path: Array<pointType>;
}

type Tower = Actor & {
    type : 'tower';
    damage : number;
    range : number;
    cooldown : number;
    shootable : Array<Tile>;
    actions: {
        attack: Action;
    }
}
function TowerAttack(){
    return 0;
}
const towers: Tower = {
    type : 'tower',
    position : {x:2,y:4},
    characteristics : {attack : 'unique'},
    damage : 10,
    range : 3,
    cooldown : 1,
    shootable : [],
    actions : {
        attack : TowerAttack,
    }
};


    
function distance_manhattan(r : number, A :Tile, B : pointType):boolean {
    return ( Math.abs(B.x - A.pos.x) + Math.abs(B.y - A.pos.y) <= r );
}

function moveActor( BradPitt : Enemy ) : Enemy {
	 function move(l : Array<Tile>) : Array<Tile> {      
	     return l.slice(1, l.length);
	     }	     
	     const newPath : Array<Tile> = move(BradPitt.path);
	     const GeorgesClooney : Enemy = {...BradPitt, path : newPath, position : newPath[0] };
	     return GeorgesClooney;
}

//Le moteur ( normalement ) doit faire un map sur cette fonction, afin de pouvoir bouger toutes les plantes polluées. 

function reachable(l : Array<Tile>,p : pointType, r : number){
    const perimeter : Array<Tile> = [];
    function reachableRec(l : Array<Tile>, t :Array<Tile>, p : pointType, r : number):Array<Tile>{
        if (isEmpty(l))
            return t;
        else 
        {
            const head : Tile = l[0];
            if (distance_manhattan(r, head, p))
            {
                t = [...t, head];
            }
            return reachableRec(l.slice(1,l.length) ,t ,p ,r );
        }
    }
    return reachableRec(l, perimeter, p, r);
}
// const action: Action = (Enemies)

// function foo(tipe: Actor){
//     if (tipe.type === 'enemy'){ 

//     }
// }

const world:worldType = {
    points:14,
}

export{
    pointType,
    worldType,
    towers,
    world,
}