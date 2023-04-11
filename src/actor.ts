import * as Tile from "./tile.js";
import * as World from "./world.js";
import * as Point from "./point.js";

const nil = {};
function isEmpty<T>(l:Array<T>){
    return l === nil;
}

type Actor = {
    position : Point.Point;
    characteristics : Record<string, string | number>; //pour des infos plus specifiques, par ex les tours : attaque de zone ou unique, ralentir etc.
    type : 'enemy' | 'tower';
}

type Action = (actor: Actor, world: World.World) => Point.Point;

type Enemy = Actor & {
    type : 'enemy';
    health: number;
    speed: number;
    actions: {
        move: Action;
        // attack: Action;
    }
    path: Array<Point.Point>;
}

type Tower = Actor & {
    type : 'tower';
    damage : number;
    range : number;
    cooldown : number;
    shootable : Array<Point.Point>;
    actions: {
        attack: Action;
    }
}

function getActorType(actor: Actor): Enemy | Tower {
    if (actor.type === "enemy")
        return actor as Enemy;
    else
        return actor as Tower;
}

function TowerAttack(){
    return {x:0, y:0};
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



function distance_manhattan(r : number, A :Point.Point, B : Point.Point):boolean {
    return ( Math.abs(B.x - A.pos.x) + Math.abs(B.y - A.pos.y) <= r );
}

function moveActor( BradPitt : Enemy ) : Point.Point {
    return BradPitt.path[0];
}

//Le moteur ( normalement ) doit faire un map sur cette fonction, afin de pouvoir bouger toutes les plantes polluées.

function reachable(l : Array<Point.Point>,p : Point.Point, r : number){
    const perimeter : Array<Point.Point> = [];
    function reachableRec(l : Array<Point.Point>, t :Array<Point.Point>, p : Point.Point, r : number):Array<Point.Point>{
        if (isEmpty(l))
            return t;
        else
        {
            const head : Point.Point = l[0];
            if (distance_manhattan(r, head, p))
            {
                t = [...t, head];
            }
            return reachableRec(l.slice(1,l.length) ,t ,p ,r );
        }
    }
    return reachableRec(l, perimeter, p, r);
}

export {
    distance_manhattan,
    towers,
};
// const action: Action = (Enemies)

// function foo(tipe: Actor){
//     if (tipe.type === 'enemy'){

//     }
// }